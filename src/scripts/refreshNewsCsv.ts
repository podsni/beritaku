import * as cheerio from "cheerio";
import { GoogleDecoder } from "google-news-url-decoder";
import { CsvArticleStore } from "../modules/news/csvArticleStore";
import { NewsService } from "../modules/news/newsService";
import { defaultNewsSources } from "../modules/news/sourceRegistry";
import type { NewsArticle, NewsSource } from "../modules/news/types";

const csvPath = Bun.env.NEWS_CSV_PATH ?? "data/news-cache.csv";
const articleStore = new CsvArticleStore(csvPath);

const newsService = new NewsService({
  sources: defaultNewsSources,
  fetchText,
  cacheTtlMs: 0,
  articleStore,
  onSourceError: logSourceError,
});

// Sequential queue lock for CloakBrowser to prevent launching multiple Chromium instances in parallel
let cloakBrowserMutex = Promise.resolve();

function acquireMutex(): Promise<() => void> {
  let release: () => void = () => {};
  const nextLock = new Promise<void>((resolve) => {
    release = resolve;
  });
  const wait = cloakBrowserMutex.then(() => release);
  cloakBrowserMutex = nextLock;
  return wait;
}

// 1. Build lookup map of already decoded/scraped articles from existing CSV
const cachedArticlesMap = new Map<string, NewsArticle>();
for (const src of defaultNewsSources) {
  try {
    const articles = await articleStore.readArticles(src);
    for (const article of articles) {
      const key = `${src.id}:${article.title}`;
      cachedArticlesMap.set(key, article);
    }
  } catch {
    // Ignore if file doesn't exist yet
  }
}

// 2. Fetch fresh top headlines from RSS feeds
const result = await newsService.getTopHeadlines({
  country: "id",
  category: "all",
  page: 1,
  pageSize: 10_000,
  offset: 0,
});

// 3. Separate articles into already resolved vs needing processing
const articlesToProcessBySource = new Map<string, NewsArticle[]>();
const updatedArticles: NewsArticle[] = [];

for (const article of result.articles) {
  const key = `${article.source.id}:${article.title}`;
  const cached = cachedArticlesMap.get(key);

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

// Assemble final articles list and write to CSV
const finalArticles = [
  ...updatedArticles,
  ...scrapeResults,
  ...remaining.map((art) => ({
    ...art,
    urlToImage:
      art.urlToImage ||
      `https://tse1.mm.bing.net/th?q=${encodeURIComponent(art.title)}`,
  })),
];
await articleStore.writeArticles(finalArticles);

void Bun.write(
  Bun.stdout,
  `Saved ${finalArticles.length} articles to ${csvPath} (${updatedArticles.length} from cache, ${scrapeResults.length} scraped, ${remaining.length} deferred)\n`,
);

async function fetchText(url: string): Promise<string> {
  return timeoutPromise(
    (async () => {
      try {
        return await fetchDirectText(url);
      } catch (error) {
        // Only fall back to CloakBrowser for Cloudflare-protected domains like PinterPolitik
        const requiresCloak =
          url.includes("pinterpolitik.com") && !url.includes("news.google.com");
        if (Bun.env.CLOAK_BROWSER === "1" && requiresCloak) {
          return await fetchWithCloakBrowser(url);
        }
        throw error;
      }
    })(),
    25_000,
    `Fetching text timed out`,
  );
}

async function fetchDirectText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}

async function fetchWithCloakBrowser(url: string): Promise<string> {
  const release = await acquireMutex();
  try {
    const cloakBrowser = await dynamicImport("cloakbrowser");
    const launch = cloakBrowser.launch;
    if (!isCloakLaunch(launch)) {
      throw new Error("cloakbrowser package does not expose launch()");
    }

    const browser = await launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto(url, {
        timeout: 20_000,
        waitUntil: "domcontentloaded",
      });

      return await page.content();
    } finally {
      await browser.close();
    }
  } finally {
    release();
  }
}

async function dynamicImport(
  specifier: string,
): Promise<Record<string, unknown>> {
  return import(specifier) as Promise<Record<string, unknown>>;
}

interface CloakPage {
  goto(
    url: string,
    options: { readonly timeout: number; readonly waitUntil: string },
  ): Promise<unknown>;
  content(): Promise<string>;
}

interface CloakBrowser {
  newPage(): Promise<CloakPage>;
  close(): Promise<unknown>;
}

function isCloakLaunch(
  value: unknown,
): value is (options: { readonly headless: boolean }) => Promise<CloakBrowser> {
  return typeof value === "function";
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
