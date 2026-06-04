export const newsCategories = [
  "general",
  "business",
  "sports",
  "technology",
  "entertainment",
] as const;

export type NewsCategory = (typeof newsCategories)[number];
export type NewsCountry = "id";
export type NewsLanguage = "id";

export interface NewsSource {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly url: string;
  readonly rssUrl: string;
  readonly category: NewsCategory;
  readonly language: NewsLanguage;
  readonly country: NewsCountry;
}

export interface PublicNewsSource {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly category: NewsCategory;
  readonly language: NewsLanguage;
  readonly country: NewsCountry;
}

export interface NewsArticle {
  readonly source: {
    readonly id: string;
    readonly name: string;
  };
  readonly author: string | null;
  readonly title: string;
  readonly description: string | null;
  readonly url: string;
  readonly urlToImage: string | null;
  readonly publishedAt: string | null;
  readonly content: string | null;
}

export interface TopHeadlinesQuery {
  readonly country: NewsCountry;
  readonly category: NewsCategory;
  readonly page: number;
  readonly pageSize: number;
  readonly offset: number;
}

export interface EverythingQuery {
  readonly q?: string;
  readonly sources?: readonly string[];
  readonly from?: Date;
  readonly to?: Date;
  readonly sortBy: "publishedAt";
  readonly page: number;
  readonly pageSize: number;
  readonly offset: number;
}

export type FetchText = (url: string) => Promise<string>;
