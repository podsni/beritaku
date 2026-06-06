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
    expect(html).toContain("portal-refresh-btn");
    expect(html).toContain("portal-refresh-status");
    expect(html).toContain("json-response-shell");
    expect(html).toContain("json-response-code");
    expect(html).toContain("response-copy-json");
    expect(html).toContain("docs-response-schema");
    expect(html).toContain("docs-best-practices");
    expect(html).toContain('data-category="politics"');
    expect(html).toContain('data-category="health"');
    expect(html).toContain("category-mode");
    expect(html).toContain("scalar-api-reference");
    expect(html).toContain("docs-api-maturity");
    expect(html).toContain("docs-category-guide");
    expect(html).toContain("tab-scalar");
    expect(html).toContain("view-scalar");
    expect(html).toContain("sidebar-toggle");
    expect(html).toContain("Scalar API Reference");
    expect(html).toContain("scalar-fullpage");
    expect(html).toContain("scalar-compact-header");
    expect(html).toContain("scalar-shell-actions");
    expect(html).toContain(
      "https://cdn.jsdelivr.net/npm/@scalar/api-reference",
    );

    expect(css).toContain("grid-template-columns: repeat(3, minmax(0, 1fr))");
    expect(css).toContain("@media (max-width: 520px)");
    expect(css).toContain("content-visibility: auto");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain(".json-token-key");
    expect(css).toContain(".playground-metric-strip");
    expect(css).toContain(".scalar-docs-shell");
    expect(css).toContain(".category-guide-grid");
    expect(css).toContain(".api-shell.sidebar-collapsed");
    expect(css).toContain("body.dark-theme .scalar-docs-shell");
    expect(css).toContain("@media (max-width: 900px)");
    expect(css).toContain(".workspace.scalar-workspace");
    expect(css).toContain(".scalar-fullpage");
    expect(css).toContain(".scalar-compact-header");
    expect(css).toContain("height: calc(100vh - 96px)");

    expect(js).toContain("applyPreset");
    expect(js).toContain("AbortController");
    expect(js).toContain('img.decoding = "async"');
    expect(js).toContain("updateEndpointStats");
    expect(js).toContain("renderJsonResponse");
    expect(js).toContain("syntaxHighlightJson");
    expect(js).toContain("updateJsonMeta");
    expect(js).toContain("refresh=true");
    expect(js).toContain("PORTAL_AUTO_REFRESH_MS");
    expect(js).toContain("fetchPortalJson");
    expect(js).toContain("smartCategoryMap");
    expect(js).toContain("initializeScalarDocs");
    expect(js).toContain("tabScalar");
    expect(js).toContain("sidebarToggle");
    expect(js).toContain("applySidebarState");
    expect(js).toContain("syncScalarTheme");
    expect(js).toContain("scalar-workspace");
  });

  test("serves an OpenAPI document for Scalar API documentation", async () => {
    const app = createTestApp();
    const response = await app.request("/openapi.json");
    const spec = (await response.json()) as {
      readonly openapi: string;
      readonly info: {
        readonly title: string;
      };
      readonly paths: Record<
        string,
        {
          readonly get: {
            readonly parameters: readonly unknown[];
          };
        }
      >;
    };

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(spec.openapi).toBe("3.1.0");
    expect(spec.info.title).toBe("Beritaku News API");
    expect(spec.paths["/v2/top-headlines"]!.get.parameters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "category",
          schema: expect.objectContaining({
            enum: expect.arrayContaining([
              "all",
              "general",
              "business",
              "sports",
              "technology",
              "entertainment",
            ]),
          }),
        }),
      ]),
    );
    expect(spec.paths["/v2/everything"]!.get.parameters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "q",
        }),
      ]),
    );
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

  test("filters everything results by category without requiring a long sources list", async () => {
    const app = createApp({
      cacheTtlMs: 0,
      articleStore: {
        readArticles: async () => [],
        writeArticles: async () => {},
      },
      sources: [
        {
          id: "general-source",
          name: "General Source",
          category: "general",
          country: "id",
          language: "id",
          url: "https://example.com/general",
          rssUrl: "https://example.com/general.xml",
        },
        {
          id: "technology-source",
          name: "Technology Source",
          category: "technology",
          country: "id",
          language: "id",
          url: "https://example.com/technology",
          rssUrl: "https://example.com/technology.xml",
        },
      ],
      fetchText: async (url) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${url}</title>
    <item>
      <title>AI dipakai untuk layanan publik ${url.includes("technology") ? "tekno" : "umum"}</title>
      <link>${url.replace(".xml", "/artikel")}</link>
      <description>Berita AI dari ${url}.</description>
      <pubDate>Fri, 05 Jun 2026 12:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`,
    });

    const response = await app.request(
      "/v2/everything?q=AI&category=technology",
    );
    const payload = (await response.json()) as {
      readonly totalResults: number;
      readonly articles: readonly {
        readonly source: { readonly id: string };
      }[];
    };

    expect(response.status).toBe(200);
    expect(payload.totalResults).toBe(1);
    expect(payload.articles[0]?.source.id).toBe("technology-source");
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

  test("keeps a parsed CSV source index for repeated store reads", async () => {
    const directory = await mkdtemp(join(tmpdir(), "beritaku-news-"));
    const csvPath = join(directory, "news-cache.csv");
    const articleStore = new CsvArticleStore(csvPath);

    try {
      await articleStore.writeArticles([
        {
          source: { id: "source-a", name: "Source A" },
          author: null,
          title: "Artikel Source A",
          description: "Cache source A.",
          url: "https://example.com/a",
          urlToImage: null,
          publishedAt: "2026-06-05T07:00:00.000Z",
          content: "Cache source A.",
        },
        {
          source: { id: "source-b", name: "Source B" },
          author: null,
          title: "Artikel Source B",
          description: "Cache source B.",
          url: "https://example.com/b",
          urlToImage: null,
          publishedAt: "2026-06-05T08:00:00.000Z",
          content: "Cache source B.",
        },
      ]);

      const firstRead = await articleStore.readArticles({
        id: "source-a",
        name: "Source A",
        category: "general",
        country: "id",
        language: "id",
        url: "https://example.com/a",
        rssUrl: "https://example.com/a.xml",
      });

      await rm(csvPath, { force: true });

      const secondRead = await articleStore.readArticles({
        id: "source-b",
        name: "Source B",
        category: "general",
        country: "id",
        language: "id",
        url: "https://example.com/b",
        rssUrl: "https://example.com/b.xml",
      });

      expect(firstRead.map((article) => article.title)).toEqual([
        "Artikel Source A",
      ]);
      expect(secondRead.map((article) => article.title)).toEqual([
        "Artikel Source B",
      ]);
    } finally {
      await rm(directory, { force: true, recursive: true });
    }
  });

  test("refreshes top headlines from the live source instead of serving stored cold-cache articles", async () => {
    const directory = await mkdtemp(join(tmpdir(), "beritaku-news-"));
    const csvPath = join(directory, "news-cache.csv");
    const articleStore = new CsvArticleStore(csvPath);

    try {
      await articleStore.writeArticles([
        {
          source: { id: "live-source", name: "Live Source" },
          author: null,
          title: "Berita lama dari cache lokal",
          description: "Artikel lama yang tersimpan sebelum refresh.",
          url: "https://example.com/old",
          urlToImage: null,
          publishedAt: "2026-06-04T07:00:00.000Z",
          content: "Artikel lama yang tersimpan sebelum refresh.",
        },
      ]);

      const app = createApp({
        cacheTtlMs: 300_000,
        articleStore,
        sources: [
          {
            id: "live-source",
            name: "Live Source",
            category: "general",
            country: "id",
            language: "id",
            url: "https://example.com/live",
            rssUrl: "https://example.com/live.xml",
          },
        ],
        fetchText: async () => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Live Source</title>
    <item>
      <title>Berita terbaru dari sumber langsung</title>
      <link>https://example.com/new</link>
      <description>Artikel terbaru yang harus muncul di portal.</description>
      <pubDate>Fri, 05 Jun 2026 12:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`,
      });

      const response = await app.request(
        "/v2/top-headlines?country=id&sources=live-source&refresh=true",
      );

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        status: "ok",
        totalResults: 1,
        articles: [
          {
            source: { id: "live-source", name: "Live Source" },
            author: null,
            title: "Berita terbaru dari sumber langsung",
            description: "Artikel terbaru yang harus muncul di portal.",
            url: "https://example.com/new",
            urlToImage: null,
            publishedAt: "2026-06-05T12:00:00.000Z",
            content: "Artikel terbaru yang harus muncul di portal.",
          },
        ],
      });
    } finally {
      await rm(directory, { force: true, recursive: true });
    }
  });

  test("limits concurrent live refreshes so the portal does not overload the server", async () => {
    let activeFetches = 0;
    let maxActiveFetches = 0;
    const sources = Array.from({ length: 12 }, (_, index) => ({
      id: `source-${index}`,
      name: `Source ${index}`,
      category: "general" as const,
      country: "id" as const,
      language: "id" as const,
      url: `https://example.com/source-${index}`,
      rssUrl: `https://example.com/source-${index}.xml`,
    }));

    const app = createApp({
      cacheTtlMs: 0,
      articleStore: {
        readArticles: async () => [],
        writeArticles: async () => {},
      },
      sources,
      fetchText: async (url) => {
        activeFetches += 1;
        maxActiveFetches = Math.max(maxActiveFetches, activeFetches);

        await Bun.sleep(10);
        activeFetches -= 1;

        const sourceId = url.match(/source-\d+/)?.[0] ?? "source-unknown";
        return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${sourceId}</title>
    <item>
      <title>Artikel terbaru ${sourceId}</title>
      <link>https://example.com/${sourceId}/artikel</link>
      <description>Berita terbaru dari ${sourceId}.</description>
      <pubDate>Fri, 05 Jun 2026 12:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;
      },
    });

    const response = await app.request(
      "/v2/top-headlines?country=id&category=all&pageSize=20&refresh=true",
    );

    expect(response.status).toBe(200);
    expect(maxActiveFetches).toBeLessThanOrEqual(6);
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

  test("default registry includes technology blogs parsed from OPML", () => {
    const sourceIds = new Set(defaultNewsSources.map((source) => source.id));

    for (const requiredBlog of [
      "blog-simonwillison-net",
      "blog-jeffgeerling-com",
      "blog-krebsonsecurity-com",
      "blog-antirez-com",
    ]) {
      expect(sourceIds.has(requiredBlog)).toBe(true);
      const source = defaultNewsSources.find((s) => s.id === requiredBlog);
      expect(source).toBeDefined();
      expect(source?.category).toBe("technology");
      expect(source?.language).toBe("en");
    }
  });

  test("SqliteArticleStore writes and reads articles correctly", async () => {
    const { SqliteArticleStore } =
      await import("./modules/news/sqliteArticleStore");
    const testDbPath = "data/test-news-cache.sqlite";
    const cleanupTestDb = async () => {
      for (const path of [
        testDbPath,
        `${testDbPath}-shm`,
        `${testDbPath}-wal`,
      ]) {
        await rm(path, { force: true });
      }
    };

    await cleanupTestDb();

    const store = new SqliteArticleStore(testDbPath);
    const mockArticle = {
      source: {
        id: "test-source",
        name: "Test Source",
      },
      author: "Test Author",
      title: "Test Title",
      description: "Test Description",
      url: "https://example.com/test",
      urlToImage: "https://example.com/test.jpg",
      publishedAt: "2026-06-05T00:00:00Z",
      content: "Test Content",
    };

    await store.writeArticles([mockArticle]);

    const read = await store.readArticles({
      id: "test-source",
      name: "Test Source",
      description: "Test Source Description",
      url: "https://example.com/test-source",
      rssUrl: "https://example.com/test-source/rss",
      category: "general",
      language: "id",
      country: "id",
    });
    expect(read.length).toBe(1);
    expect(read[0]).toEqual(mockArticle);

    await cleanupTestDb();
  }, 20000);
});
