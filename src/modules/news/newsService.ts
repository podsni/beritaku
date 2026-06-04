import { badRequest } from "../../shared/http/errors";
import { TimedCache } from "./newsCache";
import { RssAdapter } from "./rssAdapter";
import { toPublicSource } from "./sourceRegistry";
import type {
  EverythingQuery,
  FetchText,
  NewsArticle,
  NewsSource,
  PublicNewsSource,
  TopHeadlinesQuery,
} from "./types";

export interface NewsServiceOptions {
  readonly sources: readonly NewsSource[];
  readonly fetchText: FetchText;
  readonly cacheTtlMs: number;
  readonly onSourceError?: (source: NewsSource, error: unknown) => void;
}

export class NewsService {
  private readonly adapter = new RssAdapter();
  private readonly cache: TimedCache<readonly NewsArticle[]>;

  constructor(private readonly options: NewsServiceOptions) {
    this.cache = new TimedCache(options.cacheTtlMs);
  }

  listSources(): PublicNewsSource[] {
    return this.options.sources.map(toPublicSource);
  }

  async getTopHeadlines(query: TopHeadlinesQuery): Promise<NewsSearchResult> {
    const sources = this.options.sources.filter(
      (source) =>
        source.country === query.country && source.category === query.category,
    );

    const articles = await this.fetchArticles(sources);
    const sortedArticles = sortByPublishedAt(articles);
    return {
      totalResults: sortedArticles.length,
      articles: paginate(sortedArticles, query.offset, query.pageSize),
    };
  }

  async searchEverything(query: EverythingQuery): Promise<NewsSearchResult> {
    const sources = this.resolveEverythingSources(query.sources);
    const articles = await this.fetchArticles(sources);
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
  ): readonly NewsSource[] {
    if (sourceIds === undefined || sourceIds.length === 0) {
      return this.options.sources;
    }

    const sourcesById = new Map(
      this.options.sources.map((source) => [source.id, source]),
    );
    return sourceIds.map((sourceId) => {
      const source = sourcesById.get(sourceId);
      if (source === undefined) {
        throw badRequest("parameterInvalid", `unknown source: ${sourceId}`);
      }
      return source;
    });
  }

  private async fetchArticles(
    sources: readonly NewsSource[],
  ): Promise<readonly NewsArticle[]> {
    const settledArticles = await Promise.all(
      sources.map(async (source) => {
        try {
          return await this.fetchSourceArticles(source);
        } catch (error) {
          this.options.onSourceError?.(source, error);
          return [];
        }
      }),
    );

    return dedupeByUrl(settledArticles.flat());
  }

  private async fetchSourceArticles(
    source: NewsSource,
  ): Promise<readonly NewsArticle[]> {
    const cached = this.cache.get(source.id);
    if (cached !== undefined) {
      return cached;
    }

    const xml = await this.options.fetchText(source.rssUrl);
    const articles = this.adapter.parse(xml, source);
    this.cache.set(source.id, articles);
    return articles;
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

function dedupeByUrl(articles: readonly NewsArticle[]): NewsArticle[] {
  const articlesByUrl = new Map<string, NewsArticle>();
  for (const article of articles) {
    if (!articlesByUrl.has(article.url)) {
      articlesByUrl.set(article.url, article);
    }
  }

  return [...articlesByUrl.values()];
}
