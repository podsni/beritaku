import * as cheerio from "cheerio";
import { parse } from "csv-parse/sync";
import { GoogleDecoder } from "google-news-url-decoder";
import { CsvArticleStore } from "../modules/news/csvArticleStore";
import { SqliteArticleStore } from "../modules/news/sqliteArticleStore";
import { NewsService } from "../modules/news/newsService";
import { defaultNewsSources } from "../modules/news/sourceRegistry";
import type { NewsArticle, NewsSource } from "../modules/news/types";
import { fetchNewsText } from "../shared/http/fetchNewsText";

const csvPath = Bun.env.NEWS_CSV_PATH ?? "data/news-cache.csv";
const sqlitePath = Bun.env.NEWS_SQLITE_PATH ?? "data/news-cache.sqlite";

const csvStore = new CsvArticleStore(csvPath);
const sqliteStore = new SqliteArticleStore(sqlitePath);

const newsService = new NewsService({
  sources: defaultNewsSources,
  fetchText,
  cacheTtlMs: 0,
  articleStore: csvStore,
  onSourceError: logSourceError,
});

// 1. Build lookup map of already decoded/scraped articles (prefer SQLite if exists, otherwise CSV)
const allExistingArticles: NewsArticle[] = [];
const cachedArticlesMap = new Map<string, NewsArticle>();
const cachedArticlesByUrl = new Map<string, NewsArticle>();

const sqliteFile = Bun.file(sqlitePath);
if (await sqliteFile.exists()) {
  try {
    const { Database } = await import("bun:sqlite");
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
      const article: NewsArticle = {
        source: {
          id: row.source_id,
          name: row.source_name,
        },
        author: row.author,
        title: row.title,
        description: row.description,
        url: row.url,
        urlToImage: row.url_to_image,
        publishedAt: row.published_at,
        content: row.content,
      };
      allExistingArticles.push(article);

      const titleKey = `${article.source.id}:${article.title.toLowerCase().trim()}`;
      cachedArticlesMap.set(titleKey, article);
      if (article.url && !article.url.includes("news.google.com")) {
        cachedArticlesByUrl.set(article.url.trim(), article);
      }
    }
    db.close();
  } catch (error) {
    void Bun.write(
      Bun.stderr,
      `Warning: could not read existing SQLite for cache lookup: ${formatUnknownError(error)}\n`,
    );
  }
} else {
  try {
    const file = Bun.file(csvPath);
    if (await file.exists()) {
      interface CsvRecord {
        sourceId: string;
        sourceName: string;
        author?: string;
        title: string;
        description?: string;
        url: string;
        urlToImage?: string;
        publishedAt?: string;
        content?: string;
      }
      const records = parse(await file.text(), {
        columns: true,
        skip_empty_lines: true,
      }) as CsvRecord[];

      for (const record of records) {
        const article: NewsArticle = {
          source: {
            id: record.sourceId,
            name: record.sourceName,
          },
          author: record.author || null,
          title: record.title,
          description: record.description || null,
          url: record.url,
          urlToImage: record.urlToImage || null,
          publishedAt: record.publishedAt || null,
          content: record.content || null,
        };
        allExistingArticles.push(article);

        const titleKey = `${article.source.id}:${article.title.toLowerCase().trim()}`;
        cachedArticlesMap.set(titleKey, article);
        if (article.url && !article.url.includes("news.google.com")) {
          cachedArticlesByUrl.set(article.url.trim(), article);
        }
      }
    }
  } catch (error) {
    void Bun.write(
      Bun.stderr,
      `Warning: could not read existing CSV for cache lookup: ${formatUnknownError(error)}\n`,
    );
  }
}

// 2. Fetch fresh top headlines from RSS feeds
const result = await newsService.getTopHeadlines({
  country: "id",
  category: "all",
  refresh: true,
  page: 1,
  pageSize: 1_000_000,
  offset: 0,
});

// 3. Separate articles into already resolved vs needing processing
const articlesToProcessBySource = new Map<string, NewsArticle[]>();
const updatedArticles: NewsArticle[] = [];

for (const article of result.articles) {
  const titleKey = `${article.source.id}:${article.title.toLowerCase().trim()}`;
  let cached = cachedArticlesMap.get(titleKey);
  if (!cached && article.url && !article.url.includes("news.google.com")) {
    cached = cachedArticlesByUrl.get(article.url.trim());
  }

  if (cached !== undefined && !cached.url.includes("news.google.com")) {
    // Reuse cached decoded URL and image (fallback to Bing thumbnail if cache is missing it)
    updatedArticles.push({
      ...article,
      url: cached.url,
      urlToImage:
        cached.urlToImage ||
        `https://tse1.mm.bing.net/th?q=${encodeURIComponent(article.title)}`,
    });
  } else {
    // Group unresolved articles by their source ID
    const sourceId = article.source.id;
    let list = articlesToProcessBySource.get(sourceId);
    if (list === undefined) {
      list = [];
      articlesToProcessBySource.set(sourceId, list);
    }
    list.push(article);
  }
}

// 4. Prioritize: take the top N unresolved articles per source
const N = 25; // Process up to 25 newest unresolved articles per source
const toScrape: NewsArticle[] = [];
const remaining: NewsArticle[] = [];

for (const list of articlesToProcessBySource.values()) {
  // Articles in the list are already sorted by date (newest first)
  const sourceToScrape = list.slice(0, N);
  const sourceRemaining = list.slice(N);

  toScrape.push(...sourceToScrape);
  remaining.push(...sourceRemaining);
}

// 5. Batch process Google News URL decoding and image scraping
const decoder = new GoogleDecoder();

const CONCURRENCY = 15;
const scrapeResults: NewsArticle[] = [];

async function scrapeWorker(queue: NewsArticle[]) {
  while (queue.length > 0) {
    const article = queue.shift();
    if (!article) break;

    let resolvedUrl = article.url;
    let resolvedImage = article.urlToImage;

    try {
      // A. Decode Google News URL
      if (resolvedUrl.includes("news.google.com")) {
        const decoded = await timeoutPromise(
          decoder.decode(resolvedUrl),
          10_000,
          "Google News URL decoding timed out",
        );
        if (decoded && decoded.status && decoded.decoded_url) {
          resolvedUrl = decoded.decoded_url;
        }
      }

      // B. Scrape og:image if missing
      if (!resolvedImage && resolvedUrl) {
        const html = await fetchText(resolvedUrl);
        const $ = cheerio.load(html);
        const ogImage =
          $('meta[property="og:image"]').attr("content") ??
          $('meta[name="twitter:image"]').attr("content") ??
          $('meta[property="twitter:image"]').attr("content") ??
          $('link[rel="image_src"]').attr("href");

        if (ogImage) {
          if (ogImage.startsWith("/")) {
            try {
              const urlObj = new URL(resolvedUrl);
              resolvedImage = urlObj.origin + ogImage;
            } catch {
              resolvedImage = ogImage;
            }
          } else {
            resolvedImage = ogImage;
          }
        }
      }
    } catch (error) {
      void Bun.write(
        Bun.stderr,
        `Error processing article "${article.title}" (${article.source.id}): ${formatUnknownError(error)}\n`,
      );
    }

    // Fallback to Bing thumbnail if still no image
    const finalImage =
      resolvedImage ||
      `https://tse1.mm.bing.net/th?q=${encodeURIComponent(article.title)}`;

    scrapeResults.push({
      ...article,
      url: resolvedUrl,
      urlToImage: finalImage,
    });
  }
}

if (toScrape.length > 0) {
  void Bun.write(
    Bun.stdout,
    `Decoding and scraping images for ${toScrape.length} new/unresolved articles with concurrency ${CONCURRENCY}...\n`,
  );
  const queue = [...toScrape];
  const workers = Array.from({ length: CONCURRENCY }, () =>
    scrapeWorker(queue),
  );
  await Promise.all(workers);
}

// Assemble, merge, and deduplicate all fresh & historical articles
const finalMap = new Map<string, NewsArticle>();

function addOrUpdate(article: NewsArticle) {
  const titleKey = `${article.source.id}:${article.title.toLowerCase().trim()}`;
  const urlKey = article.url ? article.url.trim() : "";

  const existing = finalMap.get(titleKey);
  if (existing) {
    const newIsDecoded = !article.url.includes("news.google.com");
    const oldIsDecoded = !existing.url.includes("news.google.com");

    if (newIsDecoded || !oldIsDecoded) {
      finalMap.set(titleKey, {
        ...existing,
        ...article,
        url: newIsDecoded ? article.url : existing.url,
        urlToImage:
          (newIsDecoded ? article.urlToImage : existing.urlToImage) ||
          article.urlToImage ||
          existing.urlToImage,
      });
    }
    return;
  }

  // Check if we already have this article by URL (if it is a decoded/final URL)
  if (urlKey && !urlKey.includes("news.google.com")) {
    for (const existingArt of finalMap.values()) {
      if (existingArt.url.trim() === urlKey) {
        return;
      }
    }
  }

  finalMap.set(titleKey, article);
}

// 1. Add all existing historical articles first
for (const art of allExistingArticles) {
  addOrUpdate(art);
}

// 2. Add/Overwrite with already resolved fresh articles
for (const art of updatedArticles) {
  addOrUpdate(art);
}

// 3. Add newly scraped articles
for (const art of scrapeResults) {
  addOrUpdate(art);
}

// 4. Add deferred articles (which have fallback image/url)
for (const art of remaining) {
  const fallbackArt: NewsArticle = {
    ...art,
    urlToImage:
      art.urlToImage ||
      `https://tse1.mm.bing.net/th?q=${encodeURIComponent(art.title)}`,
  };
  addOrUpdate(fallbackArt);
}

// Sort all articles by publishedAt descending, so the newest articles are always first
const sortedArticles = Array.from(finalMap.values()).sort((left, right) => {
  const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : 0;
  const rightTime = right.publishedAt
    ? new Date(right.publishedAt).getTime()
    : 0;
  return rightTime - leftTime;
});

// Cap total size of fallback DB (defaults to 1,000,000 articles)
const MAX_ARTICLES = Number(Bun.env.MAX_ARTICLES_CAP ?? "1000000");
const cappedArticles = sortedArticles.slice(0, MAX_ARTICLES);

await csvStore.writeArticles(cappedArticles);
await sqliteStore.writeArticles(cappedArticles);

void Bun.write(
  Bun.stdout,
  `Successfully updated CSV and SQLite databases:
- Total articles stored: ${cappedArticles.length} (capped at ${MAX_ARTICLES})
- Freshly retrieved from feeds: ${result.articles.length} (${updatedArticles.length} cache hits, ${scrapeResults.length} newly scraped, ${remaining.length} deferred)
- Preserved historical articles: ${cappedArticles.length - result.articles.length}
- Deduplicated all entries by title and URL.\n`,
);

async function fetchText(url: string): Promise<string> {
  return fetchNewsText(url);
}

function logSourceError(source: NewsSource, error: unknown): void {
  void Bun.write(
    Bun.stderr,
    `Failed to refresh ${source.id}: ${formatUnknownError(error)}\n`,
  );
}

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function timeoutPromise<T>(
  promise: Promise<T>,
  ms: number,
  errMsg: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(errMsg));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
