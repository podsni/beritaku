import { describe, expect, test } from "bun:test";
import { createApp } from "./app";

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
    ],
    fetchText: async (url) =>
      url.endsWith("/cnn.xml") ? cnnRssFixture : indonesiaRssFixture,
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

  test("returns NewsAPI-like top headlines for Indonesia RSS sources", async () => {
    const app = createTestApp();
    const response = await app.request(
      "/v2/top-headlines?country=id&pageSize=1",
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: "ok",
      totalResults: 3,
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
      totalResults: 3,
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
      ],
    });
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
});
