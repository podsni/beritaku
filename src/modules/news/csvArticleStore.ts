import { mkdir, stat } from "node:fs/promises";
import { dirname } from "node:path";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import type { NewsArticle, NewsArticleStore, NewsSource } from "./types";

const csvColumns = [
  "sourceId",
  "sourceName",
  "author",
  "title",
  "description",
  "url",
  "urlToImage",
  "publishedAt",
  "content",
] as const;

type CsvArticleRecord = Record<(typeof csvColumns)[number], string>;

export class CsvArticleStore implements NewsArticleStore {
  private cachedIndex:
    | {
        readonly mtimeMs: number;
        readonly articlesBySourceId: Map<string, readonly NewsArticle[]>;
      }
    | undefined;

  constructor(private readonly csvPath: string) {}

  async readArticles(source: NewsSource): Promise<readonly NewsArticle[]> {
    const articlesBySourceId = await this.readArticleIndex();
    return articlesBySourceId.get(source.id) ?? [];
  }

  async writeArticles(articles: readonly NewsArticle[]): Promise<void> {
    await mkdir(dirname(this.csvPath), { recursive: true });
    const records = articles.map(articleToRecord);
    const csv = stringify(records, {
      columns: [...csvColumns],
      header: true,
    });

    await Bun.write(this.csvPath, csv);
    const { mtimeMs } = await stat(this.csvPath);
    this.cachedIndex = {
      mtimeMs,
      articlesBySourceId: groupArticlesBySourceId(articles),
    };
  }

  private async readArticleIndex(): Promise<
    Map<string, readonly NewsArticle[]>
  > {
    let mtimeMs: number;
    try {
      mtimeMs = (await stat(this.csvPath)).mtimeMs;
    } catch {
      return this.cachedIndex?.articlesBySourceId ?? new Map();
    }

    if (this.cachedIndex?.mtimeMs === mtimeMs) {
      return this.cachedIndex.articlesBySourceId;
    }

    const records = parse(await Bun.file(this.csvPath).text(), {
      columns: true,
      skip_empty_lines: true,
    }) as CsvArticleRecord[];

    const articlesBySourceId = groupArticlesBySourceId(
      records.map(recordToArticle),
    );
    this.cachedIndex = { mtimeMs, articlesBySourceId };
    return articlesBySourceId;
  }
}

function articleToRecord(article: NewsArticle): CsvArticleRecord {
  return {
    sourceId: article.source.id,
    sourceName: article.source.name,
    author: article.author ?? "",
    title: article.title,
    description: article.description ?? "",
    url: article.url,
    urlToImage: article.urlToImage ?? "",
    publishedAt: article.publishedAt ?? "",
    content: article.content ?? "",
  };
}

function recordToArticle(record: CsvArticleRecord): NewsArticle {
  return {
    source: {
      id: record.sourceId,
      name: record.sourceName,
    },
    author: emptyToNull(record.author),
    title: record.title,
    description: emptyToNull(record.description),
    url: record.url,
    urlToImage: emptyToNull(record.urlToImage),
    publishedAt: emptyToNull(record.publishedAt),
    content: emptyToNull(record.content),
  };
}

function groupArticlesBySourceId(
  articles: readonly NewsArticle[],
): Map<string, readonly NewsArticle[]> {
  const articlesBySourceId = new Map<string, NewsArticle[]>();

  for (const article of articles) {
    const existingArticles = articlesBySourceId.get(article.source.id);
    if (existingArticles === undefined) {
      articlesBySourceId.set(article.source.id, [article]);
    } else {
      existingArticles.push(article);
    }
  }

  return articlesBySourceId;
}

function emptyToNull(value: string): string | null {
  return value.length > 0 ? value : null;
}
