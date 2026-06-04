import { mkdir } from "node:fs/promises";
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
  constructor(private readonly csvPath: string) {}

  async readArticles(source: NewsSource): Promise<readonly NewsArticle[]> {
    const file = Bun.file(this.csvPath);
    if (!(await file.exists())) {
      return [];
    }

    const records = parse(await file.text(), {
      columns: true,
      skip_empty_lines: true,
    }) as CsvArticleRecord[];

    return records
      .filter((record) => record.sourceId === source.id)
      .map(recordToArticle);
  }

  async writeArticles(articles: readonly NewsArticle[]): Promise<void> {
    await mkdir(dirname(this.csvPath), { recursive: true });
    const records = articles.map(articleToRecord);
    const csv = stringify(records, {
      columns: [...csvColumns],
      header: true,
    });

    await Bun.write(this.csvPath, csv);
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

function emptyToNull(value: string): string | null {
  return value.length > 0 ? value : null;
}
