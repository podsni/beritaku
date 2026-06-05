import { describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createApp } from "./app";
import { CsvArticleStore } from "./modules/news/csvArticleStore";
import { defaultNewsSources } from "./modules/news/sourceRegistry";

const indonesiaRssFixture = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ANTARA News</title>
    <item>
      <title>Ekonomi Indonesia tumbuh stabil</title>
      <link>https://example.com/ekonomi-indonesia</link>
      <description>Pemerintah menyebut ekonomi nasional tetap stabil.</description>
      <pubDate>Fri, 05 Jun 2026 10:00:00 GMT</pubDate>
      <author>redaksi@example.com</author>
      <enclosure url="https://example.com/ekonomi.jpg" type="image/jpeg" />
    </item>
    <item>
      <title>Teknologi AI dipakai layanan publik</title>
      <link>https://example.com/teknologi-ai</link>
      <description>Layanan publik mulai mengadopsi teknologi AI.</description>
      <pubDate>Fri, 05 Jun 2026 09:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

const cnnRssFixture = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CNN Indonesia</title>
    <item>
      <title>Kebijakan publik baru diumumkan</title>
      <link>https://example.com/kebijakan-publik</link>
      <description>Pemerintah mengumumkan kebijakan publik terbaru.</description>
      <pubDate>Fri, 05 Jun 2026 11:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

const kompasHtmlFixture = `<!doctype html>
<html>
  <body>
    <article>
      <a href="https://www.kompas.com/tren/read/2026/06/05/070000000/daftar-berita-trending-hari-ini">
        Daftar Berita Trending Hari Ini dari Kompas Tren
      </a>
    </article>
  </body>
</html>`;

function createTestApp() {
  return createApp({
    cacheTtlMs: 0,
    sources: [
      {
        id: "antara",
        name: "ANTARA News",
        category: "general",
        country: "id",
        language: "id",
        url: "https://www.antaranews.com",
        rssUrl: "https://example.com/antara.xml",
      },
      {
        id: "cnn-indonesia",
        name: "CNN Indonesia",
        category: "general",
        country: "id",
        language: "id",
        url: "https://www.cnnindonesia.com",
        rssUrl: "https://example.com/cnn.xml",
      },
      {
        id: "kompas-tren",
        name: "Kompas.com Tren",
        category: "general",
        country: "id",
        language: "id",
        url: "https://www.kompas.com/tren",
        rssUrl: "https://example.com/kompas-tren.html",
        feedType: "html",
      },
    ],
    fetchText: async (url) => {
      if (url.endsWith("/cnn.xml")) {
        return cnnRssFixture;
      }

      if (url.endsWith("/kompas-tren.html")) {
        return kompasHtmlFixture;
      }

      return indonesiaRssFixture;
    },
  });
}

describe("News API Indonesia", () => {
  test("serves the API documentation and explorer frontend", async () => {
    const app = createTestApp();
    const response = await app.request("/");
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
    expect(html).toContain("Beritaku API Console");
    expect(html).toContain("API Explorer");
    expect(html).toContain("Semua media");
    expect(html).toContain("Pilih media");
    expect(html).toContain("/assets/app.css");
    expect(html).toContain("/assets/app.js");
  });

  test("serves frontend assets for the documentation page", async () => {
    const app = createTestApp();
    const cssResponse = await app.request("/assets/app.css");
    const jsResponse = await app.request("/assets/app.js");

    expect(cssResponse.status).toBe(200);
    expect(cssResponse.headers.get("content-type")).toContain("text/css");
    expect(await cssResponse.text()).toContain(".api-shell");

    expect(jsResponse.status).toBe(200);
    expect(jsResponse.headers.get("content-type")).toContain("javascript");
    const js = await jsResponse.text();
    expect(js).toContain("runApiRequest");
    expect(js).toContain("loadSources");
  });

  test("serves responsive frontend enhancements for the API console", async () => {
    const app = createTestApp();
    const pageResponse = await app.request("/");
    const cssResponse = await app.request("/assets/app.css");
    const jsResponse = await app.request("/assets/app.js");

    const html = await pageResponse.text();
    const css = await cssResponse.text();
    const js = await jsResponse.text();

    expect(html).toContain("quick-presets");
    expect(html).toContain("endpoint-stats");
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("Breaking nasional");

    expect(css).toContain("grid-template-columns: repeat(3, minmax(0, 1fr))");
    expect(css).toContain("@media (max-width: 520px)");
    expect(css).toContain("content-visibility: auto");
    expect(css).toContain("prefers-reduced-motion: reduce");

    expect(js).toContain("applyPreset");
    expect(js).toContain("AbortController");
    expect(js).toContain('img.decoding = "async"');
    expect(js).toContain("updateEndpointStats");
  });

  test("returns NewsAPI-like top headlines for Indonesia RSS sources", async () => {
    const app = createTestApp();
    const response = await app.request(
      "/v2/top-headlines?country=id&pageSize=1",
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: "ok",
      totalResults: 4,
      articles: [
        {
          source: { id: "cnn-indonesia", name: "CNN Indonesia" },
          author: null,
          title: "Kebijakan publik baru diumumkan",
          description: "Pemerintah mengumumkan kebijakan publik terbaru.",
          url: "https://example.com/kebijakan-publik",
          urlToImage: null,
          publishedAt: "2026-06-05T11:00:00.000Z",
          content: "Pemerintah mengumumkan kebijakan publik terbaru.",
        },
      ],
    });
  });

  test("parses Kompas trending HTML source as top headlines", async () => {
    const app = createTestApp();
    const response = await app.request(
      "/v2/top-headlines?country=id&category=all&sources=kompas-tren&pageSize=10",
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: "ok",
      totalResults: 1,
      articles: [
        {
          source: { id: "kompas-tren", name: "Kompas.com Tren" },
          author: null,
          title: "Daftar Berita Trending Hari Ini dari Kompas Tren",
          description: null,
          url: "https://www.kompas.com/tren/read/2026/06/05/070000000/daftar-berita-trending-hari-ini",
          urlToImage: null,
          publishedAt: null,
          content: null,
        },
      ],
    });
  });

  test("filters top headlines by selected media source", async () => {
    const app = createTestApp();
    const response = await app.request(
      "/v2/top-headlines?country=id&sources=antara&pageSize=10",
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: "ok",
      totalResults: 2,
      articles: [
        {
          source: { id: "antara", name: "ANTARA News" },
          author: "redaksi@example.com",
          title: "Ekonomi Indonesia tumbuh stabil",
          description: "Pemerintah menyebut ekonomi nasional tetap stabil.",
          url: "https://example.com/ekonomi-indonesia",
          urlToImage: "https://example.com/ekonomi.jpg",
          publishedAt: "2026-06-05T10:00:00.000Z",
          content: "Pemerintah menyebut ekonomi nasional tetap stabil.",
        },
        {
          source: { id: "antara", name: "ANTARA News" },
          author: null,
          title: "Teknologi AI dipakai layanan publik",
          description: "Layanan publik mulai mengadopsi teknologi AI.",
          url: "https://example.com/teknologi-ai",
          urlToImage: null,
          publishedAt: "2026-06-05T09:00:00.000Z",
          content: "Layanan publik mulai mengadopsi teknologi AI.",
        },
      ],
    });
  });

  test("can return all media and all categories for top headlines", async () => {
    const app = createTestApp();
    const response = await app.request(
      "/v2/top-headlines?country=id&category=all&sources=all&pageSize=10",
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      status: "ok",
      totalResults: 4,
    });
  });

  test("filters everything results by query and source", async () => {
    const app = createTestApp();
    const response = await app.request("/v2/everything?q=AI&sources=antara");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: "ok",
      totalResults: 1,
      articles: [
        {
          source: { id: "antara", name: "ANTARA News" },
          author: null,
          title: "Teknologi AI dipakai layanan publik",
          description: "Layanan publik mulai mengadopsi teknologi AI.",
          url: "https://example.com/teknologi-ai",
          urlToImage: null,
          publishedAt: "2026-06-05T09:00:00.000Z",
          content: "Layanan publik mulai mengadopsi teknologi AI.",
        },
      ],
    });
  });

  test("returns configured Indonesia news sources", async () => {
    const app = createTestApp();
    const response = await app.request("/v2/top-headlines/sources");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: "ok",
      sources: [
        {
          id: "antara",
          name: "ANTARA News",
          description: "ANTARA News Indonesia RSS source",
          url: "https://www.antaranews.com",
          category: "general",
          language: "id",
          country: "id",
        },
        {
          id: "cnn-indonesia",
          name: "CNN Indonesia",
          description: "CNN Indonesia Indonesia RSS source",
          url: "https://www.cnnindonesia.com",
          category: "general",
          language: "id",
          country: "id",
        },
        {
          id: "kompas-tren",
          name: "Kompas.com Tren",
          description: "Kompas.com Tren Indonesia RSS source",
          url: "https://www.kompas.com/tren",
          category: "general",
          language: "id",
          country: "id",
        },
      ],
    });
  });

  test("falls back to stored CSV articles when a source is blocked", async () => {
    const directory = await mkdtemp(join(tmpdir(), "beritaku-news-"));
    const csvPath = join(directory, "news-cache.csv");
    const articleStore = new CsvArticleStore(csvPath);

    try {
      await articleStore.writeArticles([
        {
          source: { id: "blocked-source", name: "Blocked Source" },
          author: null,
          title: "Liputan mendalam tetap tersedia dari cache CSV",
          description: "Artikel fallback saat website sumber sedang memblokir.",
          url: "https://example.com/blocked/deep-report",
          urlToImage: null,
          publishedAt: "2026-06-05T07:00:00.000Z",
          content: "Artikel fallback saat website sumber sedang memblokir.",
        },
      ]);

      const app = createApp({
        cacheTtlMs: 0,
        articleStore,
        sources: [
          {
            id: "blocked-source",
            name: "Blocked Source",
            category: "general",
            country: "id",
            language: "id",
            url: "https://example.com/blocked",
            rssUrl: "https://example.com/blocked.xml",
          },
        ],
        fetchText: async () => {
          throw new Error("blocked");
        },
      });

      const response = await app.request(
        "/v2/top-headlines?country=id&sources=blocked-source",
      );

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        status: "ok",
        totalResults: 1,
        articles: [
          {
            source: { id: "blocked-source", name: "Blocked Source" },
            author: null,
            title: "Liputan mendalam tetap tersedia dari cache CSV",
            description:
              "Artikel fallback saat website sumber sedang memblokir.",
            url: "https://example.com/blocked/deep-report",
            urlToImage: null,
            publishedAt: "2026-06-05T07:00:00.000Z",
            content: "Artikel fallback saat website sumber sedang memblokir.",
          },
        ],
      });
    } finally {
      await rm(directory, { force: true, recursive: true });
    }
  });

  test("returns NewsAPI-like errors for invalid query parameters", async () => {
    const app = createTestApp();
    const response = await app.request("/v2/top-headlines?country=us");

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      status: "error",
      code: "parameterInvalid",
      message: "country must be id",
    });
  });

  test("default registry includes requested Indonesian media", () => {
    const sourceIds = new Set(defaultNewsSources.map((source) => source.id));

    for (const requiredSource of [
      "kompas-home",
      "kompas-tren",
      "tempo-general",
      "detik-general",
      "cnn-general",
      "tirto-general",
      "cnbc-general",
      "jakpost-general",
      "kumparan-general",
      "liputan6-general",
      "katadata-general",
      "idntimes-general",
      "tribunnews-general",
      "bisnis-general",
      "antara-general",
      "narasi-general",
      "republika-general",
      "suara-general",
      "asumsi-general",
      "viva-general",
      "merdeka-general",
      "project-multatuli-general",
      "alinea-general",
      "validnews-general",
      "kbr-general",
      "context-general",
      "techinasia-indonesia",
      "dailysocial-technology",
      "mongabay-general",
      "betahita-general",
    ]) {
      expect(sourceIds.has(requiredSource)).toBe(true);
    }
  });
});
