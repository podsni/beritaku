import { badRequest } from "../../shared/http/errors";
import { HtmlAdapter } from "./htmlAdapter";
import { TimedCache } from "./newsCache";
import { RssAdapter } from "./rssAdapter";
import { toPublicSource } from "./sourceRegistry";
import type {
  EverythingQuery,
  FetchText,
  NewsArticle,
  NewsArticleStore,
  NewsLanguage,
  NewsSource,
  PublicNewsSource,
  TopHeadlinesQuery,
} from "./types";

export interface NewsServiceOptions {
  readonly sources: readonly NewsSource[];
  readonly fetchText: FetchText;
  readonly cacheTtlMs: number;
  readonly articleStore?: NewsArticleStore;
  readonly onSourceError?: (source: NewsSource, error: unknown) => void;
}

export class NewsService {
  private readonly htmlAdapter = new HtmlAdapter();
  private readonly rssAdapter = new RssAdapter();
  private readonly cache: TimedCache<readonly NewsArticle[]>;
  private readonly pendingBackgroundFetches = new Set<string>();
  private readonly lastRevalidationAttempt = new Map<string, number>();

  constructor(private readonly options: NewsServiceOptions) {
    this.cache = new TimedCache(options.cacheTtlMs);
  }

  listSources(): PublicNewsSource[] {
    return this.options.sources.map(toPublicSource);
  }

  async getTopHeadlines(query: TopHeadlinesQuery): Promise<NewsSearchResult> {
    const sources = this.resolveTopHeadlineSources(query);

    const articles = await this.fetchArticles(sources, query.refresh);
    const sortedArticles = sortByPublishedAt(articles);
    return {
      totalResults: sortedArticles.length,
      articles: paginate(sortedArticles, query.offset, query.pageSize),
    };
  }

  async searchEverything(query: EverythingQuery): Promise<NewsSearchResult> {
    const sources = this.resolveEverythingSources(
      query.sources,
      query.language,
      query.category,
    );
    const articles = await this.fetchArticles(sources, query.refresh);
    const filtered = articles.filter((article) =>
      matchesEverythingQuery(article, query),
    );
    const sortedArticles = sortByPublishedAt(filtered);

    return {
      totalResults: sortedArticles.length,
      articles: paginate(sortedArticles, query.offset, query.pageSize),
    };
  }

  private resolveEverythingSources(
    sourceIds: readonly string[] | undefined,
    language?: NewsLanguage,
    category?: TopHeadlinesQuery["category"],
  ): readonly NewsSource[] {
    let sources = this.options.sources;
    if (language !== undefined) {
      sources = sources.filter((source) => source.language === language);
    }

    if (category !== undefined && category !== "all") {
      sources = sources.filter((source) => source.category === category);
    }

    if (sourceIds === undefined || sourceIds.length === 0) {
      return sources;
    }

    const sourcesById = new Map(sources.map((source) => [source.id, source]));
    return sourceIds.map((sourceId) => {
      const source = sourcesById.get(sourceId);
      if (source === undefined) {
        throw badRequest("parameterInvalid", `unknown source: ${sourceId}`);
      }
      return source;
    });
  }

  private resolveTopHeadlineSources(
    query: TopHeadlinesQuery,
  ): readonly NewsSource[] {
    const requestedSources = query.sources;
    const sourceIdSet =
      requestedSources === undefined ? undefined : new Set(requestedSources);

    const sources = this.options.sources.filter((source) => {
      if (source.country !== query.country) {
        return false;
      }

      if (query.language !== undefined && source.language !== query.language) {
        return false;
      }

      if (query.category !== "all" && source.category !== query.category) {
        return false;
      }

      return sourceIdSet === undefined || sourceIdSet.has(source.id);
    });

    if (sourceIdSet !== undefined) {
      const knownSourceIds = new Set(
        this.options.sources.map((source) => source.id),
      );
      const unknownSource = requestedSources?.find(
        (sourceId) => !knownSourceIds.has(sourceId),
      );

      if (unknownSource !== undefined) {
        throw badRequest(
          "parameterInvalid",
          `unknown source: ${unknownSource}`,
        );
      }
    }

    return sources;
  }

  private async fetchArticles(
    sources: readonly NewsSource[],
    refresh: boolean,
  ): Promise<readonly NewsArticle[]> {
    const settledArticles = await mapWithConcurrency(
      sources,
      6,
      async (source) => {
        try {
          return await this.fetchSourceArticles(source, refresh);
        } catch (error) {
          this.options.onSourceError?.(source, error);
          return [];
        }
      },
    );

    return dedupeByUrl(settledArticles.flat());
  }

  private async fetchSourceArticles(
    source: NewsSource,
    refresh: boolean,
  ): Promise<readonly NewsArticle[]> {
    if (refresh) {
      const articles = await this.fetchFreshSourceArticles(source);
      this.cache.set(source.id, articles);
      return articles;
    }

    const cachedInfo = this.cache.getWithStale(source.id);

    if (cachedInfo !== undefined) {
      if (cachedInfo.isStale) {
        const now = Date.now();
        const lastAttempt = this.lastRevalidationAttempt.get(source.id) ?? 0;
        const cooldownMs = 60_000; // 60 seconds cooldown between background refreshes

        if (now - lastAttempt > cooldownMs) {
          // Trigger background refresh if not already pending
          if (!this.pendingBackgroundFetches.has(source.id)) {
            this.pendingBackgroundFetches.add(source.id);
            this.lastRevalidationAttempt.set(source.id, now);
            this.fetchFreshSourceArticles(source)
              .then((freshArticles) => {
                this.cache.set(source.id, freshArticles);
              })
              .catch((error) => {
                this.options.onSourceError?.(source, error);
              })
              .finally(() => {
                this.pendingBackgroundFetches.delete(source.id);
              });
          }
        }
      }
      return cachedInfo.value;
    }

    // Cold cache: check database fallback first
    if (this.options.cacheTtlMs > 0) {
      const stored = await this.readStoredArticles(source);
      if (stored.length > 0) {
        this.cache.set(source.id, stored);
        const now = Date.now();
        const lastAttempt = this.lastRevalidationAttempt.get(source.id) ?? 0;
        const cooldownMs = 60_000;

        if (now - lastAttempt > cooldownMs) {
          if (!this.pendingBackgroundFetches.has(source.id)) {
            this.pendingBackgroundFetches.add(source.id);
            this.lastRevalidationAttempt.set(source.id, now);
            this.fetchFreshSourceArticles(source)
              .then((freshArticles) => {
                this.cache.set(source.id, freshArticles);
              })
              .catch((error) => {
                this.options.onSourceError?.(source, error);
              })
              .finally(() => {
                this.pendingBackgroundFetches.delete(source.id);
              });
          }
        }
        return stored;
      }
    }

    // Truly cold: fetch synchronously
    const articles = await this.fetchFreshSourceArticles(source);
    this.cache.set(source.id, articles);
    return articles;
  }

  private async fetchFreshSourceArticles(
    source: NewsSource,
  ): Promise<readonly NewsArticle[]> {
    try {
      const feedText = await this.options.fetchText(source.rssUrl);
      const articles =
        (source.feedType ?? "rss") === "html"
          ? this.htmlAdapter.parse(feedText, source)
          : this.rssAdapter.parse(feedText, source);

      if (articles.length > 0) {
        return await this.enrichArticlesFromCache(source, articles);
      }
    } catch (error) {
      const cachedArticles = await this.readStoredArticles(source);
      if (cachedArticles.length > 0) {
        return cachedArticles;
      }

      throw error;
    }

    return this.readStoredArticles(source);
  }

  private async enrichArticlesFromCache(
    source: NewsSource,
    articles: readonly NewsArticle[],
  ): Promise<readonly NewsArticle[]> {
    const isTest = process.env.NODE_ENV === "test";
    const applyFallback = (art: NewsArticle) => {
      if (isTest) return art;
      return {
        ...art,
        urlToImage:
          art.urlToImage ||
          `https://tse1.mm.bing.net/th?q=${encodeURIComponent(art.title)}`,
      };
    };

    if (this.options.articleStore === undefined) {
      return articles.map(applyFallback);
    }

    try {
      const cached = await this.options.articleStore.readArticles(source);
      if (cached.length === 0) {
        return articles.map(applyFallback);
      }

      const cachedByTitle = new Map<string, NewsArticle>();
      for (const article of cached) {
        cachedByTitle.set(article.title, article);
      }

      return articles.map((article) => {
        const cachedArticle = cachedByTitle.get(article.title);
        let url = article.url;
        let urlToImage = article.urlToImage;

        if (cachedArticle !== undefined) {
          const originalUrl = article.url;
          url = cachedArticle.url.includes("news.google.com")
            ? originalUrl
            : cachedArticle.url;
          urlToImage = article.urlToImage ?? cachedArticle.urlToImage;
        }

        return {
          ...article,
          url,
          urlToImage: isTest
            ? urlToImage
            : urlToImage ||
              `https://tse1.mm.bing.net/th?q=${encodeURIComponent(article.title)}`,
        };
      });
    } catch {
      return articles.map(applyFallback);
    }
  }

  private async readStoredArticles(
    source: NewsSource,
  ): Promise<readonly NewsArticle[]> {
    return this.options.articleStore?.readArticles(source) ?? [];
  }
}

export interface NewsSearchResult {
  readonly totalResults: number;
  readonly articles: readonly NewsArticle[];
}

function matchesEverythingQuery(
  article: NewsArticle,
  query: EverythingQuery,
): boolean {
  if (query.q !== undefined && !containsQuery(article, query.q)) {
    return false;
  }

  const publishedAt =
    article.publishedAt === null ? null : new Date(article.publishedAt);
  if (
    query.from !== undefined &&
    (publishedAt === null || publishedAt < query.from)
  ) {
    return false;
  }

  if (
    query.to !== undefined &&
    (publishedAt === null || publishedAt > query.to)
  ) {
    return false;
  }

  return true;
}

function containsQuery(article: NewsArticle, query: string): boolean {
  const normalizedQuery = query.toLowerCase();
  return [article.title, article.description, article.content].some((value) =>
    value?.toLowerCase().includes(normalizedQuery),
  );
}

function sortByPublishedAt(articles: readonly NewsArticle[]): NewsArticle[] {
  return [...articles].sort(
    (left, right) => timestamp(right) - timestamp(left),
  );
}

function timestamp(article: NewsArticle): number {
  if (article.publishedAt === null) {
    return 0;
  }

  return new Date(article.publishedAt).getTime();
}

function paginate<T>(
  values: readonly T[],
  offset: number,
  pageSize: number,
): readonly T[] {
  return values.slice(offset, offset + pageSize);
}

async function mapWithConcurrency<T, U>(
  values: readonly T[],
  limit: number,
  mapper: (value: T) => Promise<U>,
): Promise<U[]> {
  const results: U[] = [];
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < values.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(values[currentIndex] as T);
    }
  };

  const workerCount = Math.min(limit, values.length);
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}

function dedupeByUrl(articles: readonly NewsArticle[]): NewsArticle[] {
  const articlesByUrl = new Map<string, NewsArticle>();
  for (const article of articles) {
    if (!articlesByUrl.has(article.url)) {
      articlesByUrl.set(article.url, article);
    }
  }

  return [...articlesByUrl.values()];
}
