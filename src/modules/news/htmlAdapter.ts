import * as cheerio from "cheerio";
import type { NewsArticle, NewsSource } from "./types";

const minimumHeadlineLength = 24;
const maximumArticlesPerHtmlSource = 30;

export class HtmlAdapter {
  parse(html: string, source: NewsSource): NewsArticle[] {
    const articles: NewsArticle[] = [];
    const seenUrls = new Set<string>();
    const $ = cheerio.load(html);

    for (const element of $("a[href]").toArray()) {
      const anchor = $(element);
      const url = normalizeArticleUrl(anchor.attr("href"), source);
      const title = cleanText(anchor.text());

      if (
        url === null ||
        !matchesArticlePath(url, source) ||
        title === null ||
        title.length < minimumHeadlineLength ||
        seenUrls.has(url)
      ) {
        continue;
      }

      seenUrls.add(url);
      articles.push({
        source: {
          id: source.id,
          name: source.name,
        },
        author: null,
        title,
        description: null,
        url,
        urlToImage: null,
        publishedAt: null,
        content: null,
      });

      if (articles.length >= maximumArticlesPerHtmlSource) {
        break;
      }
    }

    return articles;
  }
}

function matchesArticlePath(url: string, source: NewsSource): boolean {
  if (
    source.articlePathIncludes === undefined ||
    source.articlePathIncludes.length === 0
  ) {
    return true;
  }

  const pathname = new URL(url).pathname;
  return source.articlePathIncludes.some((pathPart) =>
    pathname.includes(pathPart),
  );
}

function normalizeArticleUrl(
  value: string | undefined,
  source: NewsSource,
): string | null {
  if (value === undefined || value.startsWith("#")) {
    return null;
  }

  try {
    const url = new URL(decodeHtml(value), source.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return belongsToSourceHost(url.hostname, new URL(source.url).hostname)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function belongsToSourceHost(articleHost: string, sourceHost: string): boolean {
  const articleDomain = stripWww(articleHost);
  const sourceDomain = stripWww(sourceHost);
  return (
    articleDomain === sourceDomain || articleDomain.endsWith(`.${sourceDomain}`)
  );
}

function stripWww(hostname: string): string {
  return hostname.replace(/^www\./i, "");
}

function cleanText(value: string | undefined): string | null {
  if (value === undefined) {
    return null;
  }

  const cleaned = decodeHtml(value)
    .replace(/<script\b[\s\S]*?<\/script>/giu, " ")
    .replace(/<style\b[\s\S]*?<\/style>/giu, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.length > 0 ? cleaned : null;
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
