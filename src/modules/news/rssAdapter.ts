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

    // Check if it's Atom feed
    if (parsed.feed) {
      const feed = asRecord(parsed.feed);
      const entries = toArray(feed.entry);
      return entries.flatMap((entry) => {
        const article = this.parseAtomEntry(asRecord(entry), source);
        return article === null ? [] : [article];
      });
    }

    // Standard RSS feed
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

  private parseAtomEntry(
    entry: Record<string, unknown>,
    source: NewsSource,
  ): NewsArticle | null {
    const title = cleanText(getText(entry.title));
    const url = getAtomLink(entry.link);

    if (title === null || url === null) {
      return null;
    }

    const summary = cleanText(getText(entry.summary));
    const content = cleanText(getText(entry.content)) ?? summary;

    // Author
    const authorRecord = asRecord(entry.author);
    const author = cleanText(
      getText(authorRecord.name) ?? getText(entry.author),
    );

    // Get image
    const mediaGroup = asRecord(entry["media:group"]);
    let urlToImage =
      extractUrlFromMedia(entry.enclosure) ??
      extractUrlFromMedia(entry["media:content"]) ??
      extractUrlFromMedia(entry["media:thumbnail"]) ??
      extractUrlFromMedia(mediaGroup["media:content"]) ??
      extractUrlFromMedia(mediaGroup["media:thumbnail"]);

    if (!urlToImage) {
      const htmlContent = getText(entry.content) ?? getText(entry.summary);
      if (htmlContent) {
        urlToImage = extractImgSrcFromHtml(htmlContent);
      }
    }

    return {
      source: {
        id: source.id,
        name: source.name,
      },
      author,
      title,
      description: summary ?? content,
      url,
      urlToImage,
      publishedAt: parseDate(
        getText(entry.published) ??
          getText(entry.updated) ??
          getText(entry.issued),
      ),
      content: content ?? summary ?? "",
    };
  }
}

function getImageUrl(item: Record<string, unknown>): string | null {
  // 1. Direct RSS media tags
  const directUrl =
    extractUrlFromMedia(item.enclosure) ??
    extractUrlFromMedia(item["media:content"]) ??
    extractUrlFromMedia(item["media:thumbnail"]) ??
    cleanText(getText(item.img));

  if (directUrl) return directUrl;

  // 2. CNN-style media group tags
  const mediaGroup = asRecord(item["media:group"]);
  const groupUrl =
    extractUrlFromMedia(mediaGroup["media:content"]) ??
    extractUrlFromMedia(mediaGroup["media:thumbnail"]);

  if (groupUrl) return groupUrl;

  // 3. Fallback: Parse HTML description or content:encoded for <img> tags
  const htmlContent =
    getText(item["content:encoded"]) ?? getText(item.description);
  if (htmlContent) {
    const src = extractImgSrcFromHtml(htmlContent);
    if (src) return src;
  }

  return null;
}

function extractImgSrcFromHtml(html: string | null): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!match || !match[1]) return null;
  return decodeHtml(match[1]);
}

function getAtomLink(linkVal: unknown): string | null {
  if (linkVal === undefined || linkVal === null) return null;
  if (Array.isArray(linkVal)) {
    for (const link of linkVal) {
      const record = asRecord(link);
      const rel = getText(record["@_rel"]);
      if (!rel || rel === "alternate") {
        const href = cleanText(getText(record["@_href"]));
        if (href) return href;
      }
    }
    if (linkVal.length > 0) {
      const first = asRecord(linkVal[0]);
      return cleanText(getText(first["@_href"]));
    }
    return null;
  }
  const record = asRecord(linkVal);
  return cleanText(getText(record["@_href"]));
}

function extractUrlFromMedia(value: unknown): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    let bestUrl: string | null = null;
    let maxWidth = 0;

    for (const subItem of value) {
      const record = asRecord(subItem);
      const url = cleanText(getText(record["@_url"]) ?? getText(record.url));
      if (url) {
        const widthAttr = getText(record["@_width"]) ?? getText(record.width);
        const width = widthAttr ? parseInt(widthAttr, 10) : 0;
        if (width > maxWidth) {
          maxWidth = width;
          bestUrl = url;
        } else if (!bestUrl) {
          bestUrl = url;
        }
      }
    }

    if (!bestUrl && value.length > 0) {
      const lastItem = asRecord(value[value.length - 1]);
      bestUrl = cleanText(getText(lastItem["@_url"]) ?? getText(lastItem.url));
    }

    return bestUrl;
  }

  const record = asRecord(value);
  return cleanText(getText(record["@_url"]) ?? getText(record.url));
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

  const cleaned = decodeHtml(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > 0 ? cleaned : null;
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_entity, codepoint: string) =>
      decodeCodepoint(Number.parseInt(codepoint, 10)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_entity, codepoint: string) =>
      decodeCodepoint(Number.parseInt(codepoint, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function decodeCodepoint(codepoint: number): string {
  if (!Number.isFinite(codepoint)) {
    return "";
  }

  try {
    return String.fromCodePoint(codepoint);
  } catch {
    return "";
  }
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
