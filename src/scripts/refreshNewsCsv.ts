import { CsvArticleStore } from "../modules/news/csvArticleStore";
import { NewsService } from "../modules/news/newsService";
import { defaultNewsSources } from "../modules/news/sourceRegistry";
import type { NewsSource } from "../modules/news/types";

const csvPath = Bun.env.NEWS_CSV_PATH ?? "data/news-cache.csv";
const articleStore = new CsvArticleStore(csvPath);

const newsService = new NewsService({
  sources: defaultNewsSources,
  fetchText,
  cacheTtlMs: 0,
  articleStore,
  onSourceError: logSourceError,
});

const result = await newsService.getTopHeadlines({
  country: "id",
  category: "all",
  page: 1,
  pageSize: 10_000,
  offset: 0,
});

await articleStore.writeArticles(result.articles);

void Bun.write(
  Bun.stdout,
  `Saved ${result.articles.length} articles to ${csvPath}\n`,
);

async function fetchText(url: string): Promise<string> {
  try {
    return await fetchDirectText(url);
  } catch (error) {
    if (Bun.env.CLOAK_BROWSER !== "1") {
      throw error;
    }

    return fetchWithCloakBrowser(url);
  }
}

async function fetchDirectText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "beritaku-news-api/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}

async function fetchWithCloakBrowser(url: string): Promise<string> {
  const cloakBrowser = await dynamicImport("cloakbrowser");
  const launch = cloakBrowser.launch;
  if (!isCloakLaunch(launch)) {
    throw new Error("cloakbrowser package does not expose launch()");
  }

  const browser = await launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(url, {
      timeout: 60_000,
      waitUntil: "networkidle",
    });

    return await page.content();
  } finally {
    await browser.close();
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
