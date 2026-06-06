import { Hono } from "hono";
import { CsvArticleStore } from "./modules/news/csvArticleStore";
import { SqliteArticleStore } from "./modules/news/sqliteArticleStore";
import { createNewsRoutes } from "./modules/news/newsRoutes";
import { NewsService } from "./modules/news/newsService";
import { defaultNewsSources } from "./modules/news/sourceRegistry";
import type {
  FetchText,
  NewsArticleStore,
  NewsSource,
} from "./modules/news/types";
import { fetchNewsText } from "./shared/http/fetchNewsText";
import { createWebRoutes } from "./modules/web/webRoutes";

export interface CreateAppOptions {
  readonly sources?: readonly NewsSource[];
  readonly fetchText?: FetchText;
  readonly cacheTtlMs?: number;
  readonly articleStore?: NewsArticleStore;
}

export function createApp(options: CreateAppOptions = {}): Hono {
  const newsService = new NewsService({
    sources: options.sources ?? defaultNewsSources,
    fetchText: options.fetchText ?? fetchNewsText,
    cacheTtlMs: options.cacheTtlMs ?? 300_000,
    articleStore:
      options.articleStore ??
      (Bun.env.USE_SQLITE === "1" || Bun.env.NEWS_SQLITE_PATH !== undefined
        ? new SqliteArticleStore(
            Bun.env.NEWS_SQLITE_PATH ?? "data/news-cache.sqlite",
          )
        : new CsvArticleStore(Bun.env.NEWS_CSV_PATH ?? "data/news-cache.csv")),
    onSourceError: logSourceError,
  });

  const app = new Hono();

  app.route("/", createWebRoutes());
  app.get("/health", (c) => c.json({ status: "ok" }));
  app.route("/v2", createNewsRoutes(newsService));

  return app;
}

function logSourceError(source: NewsSource, error: unknown): void {
  void Bun.write(
    Bun.stderr,
    `Failed to load news source ${source.id}: ${formatUnknownError(error)}\n`,
  );
}

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
