import { Database } from "bun:sqlite";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import type { NewsArticle, NewsArticleStore, NewsSource } from "./types";

export class SqliteArticleStore implements NewsArticleStore {
  private readonly db: Database;

  constructor(private readonly dbPath: string) {
    this.db = new Database(dbPath);
    this.init();
  }

  private init() {
    this.db.run("PRAGMA journal_mode = WAL");
    this.db.run("PRAGMA synchronous = NORMAL");
    this.db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        source_id TEXT NOT NULL,
        source_name TEXT NOT NULL,
        author TEXT,
        title TEXT NOT NULL,
        description TEXT,
        url TEXT NOT NULL,
        url_to_image TEXT,
        published_at TEXT,
        content TEXT,
        PRIMARY KEY (source_id, title)
      )
    `);
    this.db.run(`
      CREATE INDEX IF NOT EXISTS idx_articles_published 
      ON articles (published_at DESC)
    `);
  }

  async readArticles(source: NewsSource): Promise<readonly NewsArticle[]> {
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

    const rows = this.db
      .query(
        "SELECT * FROM articles WHERE source_id = $source_id ORDER BY published_at DESC",
      )
      .all({
        $source_id: source.id,
      }) as SqliteRow[];

    return rows.map((row) => ({
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
    }));
  }

  async writeArticles(articles: readonly NewsArticle[]): Promise<void> {
    // Ensure parent directory exists
    await mkdir(dirname(this.dbPath), { recursive: true });

    const insert = this.db.prepare(`
      INSERT INTO articles (source_id, source_name, author, title, description, url, url_to_image, published_at, content)
      VALUES ($source_id, $source_name, $author, $title, $description, $url, $url_to_image, $published_at, $content)
      ON CONFLICT(source_id, title) DO UPDATE SET
        source_name = excluded.source_name,
        author = COALESCE(excluded.author, author),
        description = COALESCE(excluded.description, description),
        url = CASE WHEN excluded.url LIKE '%news.google.com%' THEN url ELSE excluded.url END,
        url_to_image = COALESCE(excluded.url_to_image, url_to_image),
        published_at = COALESCE(excluded.published_at, published_at),
        content = COALESCE(excluded.content, content)
    `);

    const transaction = this.db.transaction((items: readonly NewsArticle[]) => {
      for (const article of items) {
        insert.run({
          $source_id: article.source.id,
          $source_name: article.source.name,
          $author: article.author ?? null,
          $title: article.title,
          $description: article.description ?? null,
          $url: article.url,
          $url_to_image: article.urlToImage ?? null,
          $published_at: article.publishedAt ?? null,
          $content: article.content ?? null,
        });
      }
    });

    transaction(articles);
  }
}
