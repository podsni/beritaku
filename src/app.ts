import { Hono } from "hono";
import { createNewsRoutes } from "./modules/news/newsRoutes";
import { NewsService } from "./modules/news/newsService";
import { defaultNewsSources } from "./modules/news/sourceRegistry";
import type { FetchText, NewsSource } from "./modules/news/types";

export interface CreateAppOptions {
  readonly sources?: readonly NewsSource[];
  readonly fetchText?: FetchText;
  readonly cacheTtlMs?: number;
}

export function createApp(options: CreateAppOptions = {}): Hono {
  const newsService = new NewsService({
    sources: options.sources ?? defaultNewsSources,
    fetchText: options.fetchText ?? fetchText,
    cacheTtlMs: options.cacheTtlMs ?? 300_000,
    onSourceError: logSourceError,
  });

  const app = new Hono();

  app.get("/health", (c) => c.json({ status: "ok" }));
  app.route("/v2", createNewsRoutes(newsService));

  return app;
}

async function fetchText(url: string): Promise<string> {
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

function logSourceError(source: NewsSource, error: unknown): void {
  void Bun.write(
    Bun.stderr,
    `Failed to load RSS source ${source.id}: ${formatUnknownError(error)}\n`,
  );
}

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
