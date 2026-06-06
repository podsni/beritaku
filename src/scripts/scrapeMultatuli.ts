/* eslint-disable no-console */
import { launchPersistentContext } from "cloakbrowser";
import { CsvArticleStore } from "../modules/news/csvArticleStore";
import { SqliteArticleStore } from "../modules/news/sqliteArticleStore";
import { parse } from "csv-parse/sync";
import type { NewsArticle } from "../modules/news/types";
import { Database } from "bun:sqlite";
import type { BrowserContext } from "playwright-core";

const csvPath = "data/news-cache.csv";
const sqlitePath = "data/news-cache.sqlite";
const csvStore = new CsvArticleStore(csvPath);
const sqliteStore = new SqliteArticleStore(sqlitePath);

interface WpPost {
  readonly id: number;
  readonly lang?: string;
  readonly link: string;
  readonly title?: { readonly rendered?: string };
  readonly excerpt?: { readonly rendered?: string };
  readonly content?: { readonly rendered?: string };
  readonly date_gmt?: string;
  readonly _embedded?: {
    readonly "wp:featuredmedia"?: readonly { readonly source_url?: string }[];
    readonly author?: readonly { readonly name?: string }[];
  };
}

function cleanHtml(html: string): string {
  if (!html) return "";
  // Strip HTML tags
  let text = html.replace(/<[^>]*>/g, "");
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&hellip;/g, "...")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, "...");
  return text.trim();
}

async function fetchPageWithRetry(
  ctx: BrowserContext,
  pageIndex: number,
  maxRetries = 3,
): Promise<WpPost[]> {
  const url = `https://projectmultatuli.org/wp-json/wp/v2/posts?per_page=100&page=${pageIndex}&_embed=wp:featuredmedia,author`;
  let attempt = 0;
  while (attempt < maxRetries) {
    attempt++;
    const page = await ctx.newPage();
    try {
      console.log(`[Page ${pageIndex}] Fetching attempt ${attempt}...`);
      const response = await page.goto(url, {
        timeout: 60000,
        waitUntil: "domcontentloaded",
      });

      if (!response || response.status() !== 200) {
        throw new Error(
          `Invalid status: ${response ? response.status() : "no response"}`,
        );
      }

      const bodyText = await page.evaluate(() => {
        const doc = (
          globalThis as unknown as {
            document?: { body?: { textContent?: string } };
          }
        ).document;
        return doc?.body?.textContent ?? "";
      });

      await page.close();

      if (!bodyText) {
        throw new Error("Empty body content");
      }

      const posts = JSON.parse(bodyText) as WpPost[];
      if (!Array.isArray(posts)) {
        throw new Error("Response is not an array");
      }

      console.log(
        `[Page ${pageIndex}] Successfully fetched ${posts.length} posts.`,
      );
      return posts;
    } catch (err) {
      console.error(`[Page ${pageIndex}] Attempt ${attempt} failed:`, err);
      try {
        await page.close();
      } catch {
        // Ignore close error on failed page
      }
      if (attempt >= maxRetries) {
        throw err;
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  return [];
}

async function main() {
  console.log("Loading existing articles for merging...");
  const allExistingArticles: NewsArticle[] = [];

  // Try reading from SQLite first
  try {
    const db = new Database(sqlitePath);
    interface SqliteRow {
      readonly source_id: string;
      readonly source_name: string;
      readonly author: string | null;
      readonly title: string;
      readonly description: string | null;
      readonly url: string;
      readonly url_to_image: string | null;
      readonly published_at: string | null;
      readonly content: string | null;
    }
    const rows = db.query("SELECT * FROM articles").all() as SqliteRow[];
    for (const row of rows) {
      allExistingArticles.push({
        source: { id: row.source_id, name: row.source_name },
        author: row.author,
        title: row.title,
        description: row.description,
        url: row.url,
        urlToImage: row.url_to_image,
        publishedAt: row.published_at,
        content: row.content,
      });
    }
    db.close();
    console.log(`Loaded ${allExistingArticles.length} articles from SQLite.`);
  } catch (error) {
    console.log("Could not read SQLite, trying CSV fallback:", error);
    try {
      const csvFile = Bun.file(csvPath);
      if (await csvFile.exists()) {
        const fileText = await csvFile.text();
        interface CsvRecord {
          readonly sourceId: string;
          readonly sourceName: string;
          readonly author?: string;
          readonly title: string;
          readonly description?: string;
          readonly url: string;
          readonly urlToImage?: string;
          readonly publishedAt?: string;
          readonly content?: string;
        }
        const records = parse(fileText, {
          columns: true,
          skip_empty_lines: true,
        }) as CsvRecord[];
        for (const record of records) {
          allExistingArticles.push({
            source: { id: record.sourceId, name: record.sourceName },
            author: record.author || null,
            title: record.title,
            description: record.description || null,
            url: record.url,
            urlToImage: record.urlToImage || null,
            publishedAt: record.publishedAt || null,
            content: record.content || null,
          });
        }
        console.log(`Loaded ${allExistingArticles.length} articles from CSV.`);
      }
    } catch (csvErr) {
      console.log("Could not read CSV either:", csvErr);
    }
  }

  console.log("Launching CloakBrowser to bypass Cloudflare protection...");
  const ctx = await launchPersistentContext({
    userDataDir: "./scratch/chrome-profile-multatuli",
    headless: true,
  });

  const page1 = ctx.pages()[0] || (await ctx.newPage());
  const page1Url = `https://projectmultatuli.org/wp-json/wp/v2/posts?per_page=100&page=1&_embed=wp:featuredmedia,author`;

  console.log("Fetching Page 1 to discover total pages...");
  const response1 = await page1.goto(page1Url, {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });

  if (!response1 || response1.status() !== 200) {
    await ctx.close();
    throw new Error(
      `Failed to fetch Page 1. Status: ${response1 ? response1.status() : "no response"}`,
    );
  }

  const headers = response1.headers();
  const totalPosts = parseInt(headers["x-wp-total"] || "0", 10);
  const totalPages = parseInt(headers["x-wp-totalpages"] || "0", 10);
  console.log(
    `WordPress reports total posts: ${totalPosts}, total pages: ${totalPages}`,
  );

  const body1 = await page1.evaluate(() => {
    const doc = (
      globalThis as unknown as {
        document?: { body?: { textContent?: string } };
      }
    ).document;
    return doc?.body?.textContent ?? "";
  });
  await page1.close();

  if (!body1) {
    await ctx.close();
    throw new Error("Empty body content on Page 1");
  }

  const page1Posts = JSON.parse(body1) as WpPost[];
  if (!Array.isArray(page1Posts)) {
    await ctx.close();
    throw new Error("Page 1 response is not an array");
  }

  const allRawPosts = [...page1Posts];

  // Fetch remaining pages in parallel
  if (totalPages > 1) {
    console.log(`Fetching remaining ${totalPages - 1} pages in parallel...`);
    const promises: Promise<WpPost[]>[] = [];
    for (let p = 2; p <= totalPages; p++) {
      promises.push(fetchPageWithRetry(ctx, p));
    }
    const results = await Promise.all(promises);
    for (const pagePosts of results) {
      allRawPosts.push(...pagePosts);
    }
  }

  console.log("Closing browser...");
  await ctx.close();

  console.log(
    `Total raw posts fetched from WordPress API: ${allRawPosts.length}`,
  );

  const scrapedArticles: NewsArticle[] = [];
  for (const post of allRawPosts) {
    const isEnglish = post.lang === "en";
    const sourceId = isEnglish
      ? "project-multatuli-english"
      : "project-multatuli-general";
    const sourceName = isEnglish
      ? "Project Multatuli English"
      : "Project Multatuli";

    const title = cleanHtml(post.title?.rendered ?? "");
    const description = cleanHtml(post.excerpt?.rendered ?? "");
    const content = cleanHtml(post.content?.rendered ?? "");
    const urlLink = post.link;

    let urlToImage: string | null = null;
    if (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"][0]
    ) {
      urlToImage = post._embedded["wp:featuredmedia"][0].source_url || null;
    }

    let author: string | null = null;
    if (post._embedded && post._embedded.author && post._embedded.author[0]) {
      author = post._embedded.author[0].name || null;
    }
    if (!author) {
      author = "Project Multatuli";
    }

    let publishedAt: string | null = null;
    if (post.date_gmt) {
      publishedAt = new Date(post.date_gmt + "Z").toISOString();
    }

    scrapedArticles.push({
      source: { id: sourceId, name: sourceName },
      author,
      title,
      description: description || content.substring(0, 200),
      url: urlLink,
      urlToImage,
      publishedAt,
      content: content || null,
    });
  }

  console.log(`Processed ${scrapedArticles.length} articles.`);

  if (scrapedArticles.length === 0) {
    console.log(
      "No articles were scraped. Aborting merge to prevent corruption.",
    );
    return;
  }

  // Merge and deduplicate
  const mergedMap = new Map<string, NewsArticle>();
  const mergedByUrl = new Map<string, NewsArticle>();

  const addArticle = (art: NewsArticle) => {
    const key = `${art.source.id}:${art.title.toLowerCase().trim()}`;
    mergedMap.set(key, art);
    if (art.url) {
      mergedByUrl.set(art.url.trim(), art);
    }
  };

  // Add all existing articles
  for (const art of allExistingArticles) {
    addArticle(art);
  }

  // Add/overwrite with newly scraped articles
  for (const art of scrapedArticles) {
    addArticle(art);
  }

  const allMergedArticles = Array.from(mergedMap.values());
  console.log(
    `Total merged articles across all sources: ${allMergedArticles.length}`,
  );

  // Write to SQLite
  console.log("Saving to SQLite database...");
  await sqliteStore.writeArticles(allMergedArticles);

  // Write to CSV
  console.log("Saving to CSV file...");
  await csvStore.writeArticles(allMergedArticles);

  console.log(
    "Project Multatuli scraping and database merging finished successfully!",
  );
}

main().catch(console.error);
