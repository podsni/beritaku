import type { NewsSource, PublicNewsSource } from "./types";

export const defaultNewsSources: readonly NewsSource[] = [
  {
    id: "antara-general",
    name: "ANTARA News",
    description: "ANTARA News Indonesia RSS source",
    url: "https://www.antaranews.com",
    rssUrl: "https://www.antaranews.com/rss/terkini.xml",
    category: "general",
    language: "id",
    country: "id",
  },
  {
    id: "antara-business",
    name: "ANTARA Ekonomi",
    description: "ANTARA economy RSS source",
    url: "https://www.antaranews.com/ekonomi",
    rssUrl: "https://www.antaranews.com/rss/ekonomi.xml",
    category: "business",
    language: "id",
    country: "id",
  },
  {
    id: "antara-sports",
    name: "ANTARA Olahraga",
    description: "ANTARA sports RSS source",
    url: "https://www.antaranews.com/olahraga",
    rssUrl: "https://www.antaranews.com/rss/olahraga.xml",
    category: "sports",
    language: "id",
    country: "id",
  },
  {
    id: "antara-technology",
    name: "ANTARA Tekno",
    description: "ANTARA technology RSS source",
    url: "https://www.antaranews.com/tekno",
    rssUrl: "https://www.antaranews.com/rss/tekno.xml",
    category: "technology",
    language: "id",
    country: "id",
  },
  {
    id: "antara-entertainment",
    name: "ANTARA Hiburan",
    description: "ANTARA entertainment RSS source",
    url: "https://www.antaranews.com/hiburan",
    rssUrl: "https://www.antaranews.com/rss/hiburan.xml",
    category: "entertainment",
    language: "id",
    country: "id",
  },
];

export function toPublicSource(source: NewsSource): PublicNewsSource {
  return {
    id: source.id,
    name: source.name,
    description: source.description ?? `${source.name} Indonesia RSS source`,
    url: source.url,
    category: source.category,
    language: source.language,
    country: source.country,
  };
}
