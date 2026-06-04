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
    ],
    fetchText: async () => indonesiaRssFixture,
  });
}

describe("News API Indonesia", () => {
  test("returns NewsAPI-like top headlines for Indonesia RSS sources", async () => {
    const app = createTestApp();
    const response = await app.request(
      "/v2/top-headlines?country=id&pageSize=1",
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
      ],
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
