import { XMLParser } from "fast-xml-parser";
import type { NewsArticle, NewsSource } from "./types";

export class RssAdapter {
  private readonly parser = new XMLParser({
    attributeNamePrefix: "@_",
    ignoreAttributes: false,
    parseAttributeValue: false,
    parseTagValue: false,
    trimValues: true,
  });

  parse(xml: string, source: NewsSource): NewsArticle[] {
    const parsed = asRecord(this.parser.parse(xml));
    const rss = asRecord(parsed.rss);
    const channel = asRecord(rss.channel);
    const items = toArray(channel.item);

    return items.flatMap((item) => {
      const article = this.parseItem(asRecord(item), source);
      return article === null ? [] : [article];
    });
  }

  private parseItem(
    item: Record<string, unknown>,
    source: NewsSource,
  ): NewsArticle | null {
    const title = cleanText(getText(item.title));
    const url = cleanText(getText(item.link));

    if (title === null || url === null) {
      return null;
    }

    const description = cleanText(getText(item.description));
    const content = cleanText(getText(item["content:encoded"])) ?? description;

    return {
      source: {
        id: source.id,
        name: source.name,
      },
      author: cleanText(getText(item.author) ?? getText(item["dc:creator"])),
      title,
      description,
      url,
      urlToImage: getImageUrl(item),
      publishedAt: parseDate(
        getText(item.pubDate) ??
          getText(item.published) ??
          getText(item.updated),
      ),
      content,
    };
  }
}

function getImageUrl(item: Record<string, unknown>): string | null {
  const enclosure = asRecord(item.enclosure);
  const mediaContent = asRecord(item["media:content"]);
  const mediaThumbnail = asRecord(item["media:thumbnail"]);

  return (
    cleanText(getText(enclosure["@_url"])) ??
    cleanText(getText(mediaContent["@_url"])) ??
    cleanText(getText(mediaThumbnail["@_url"]))
  );
}

function parseDate(value: string | undefined): string | null {
  if (value === undefined) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function cleanText(value: string | undefined): string | null {
  if (value === undefined) {
    return null;
  }

  const cleaned = value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > 0 ? cleaned : null;
}

function getText(value: unknown): string | undefined {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  const record = asRecord(value);
  if (record["#text"] !== undefined) {
    return getText(record["#text"]);
  }

  return undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function toArray(value: unknown): readonly unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null) {
    return [];
  }

  return [value];
}
