# Beritaku News API

**Beritaku** adalah NewsAPI-compatible JSON API untuk berita Indonesia dan internasional, dibangun di atas **Bun + Hono**. Server mengambil berita dari sumber modular: RSS langsung, adapter HTML berbasis Cheerio untuk halaman tanpa feed aktif, dan fallback Google News RSS untuk media yang feed langsungnya tidak tersedia atau terblokir.

Tersedia lebih dari **110 source ID** dari 100+ media, mencakup media nasional, independen, investigasi, lokal, dan internasional — plus blog teknologi dinamis dari OPML.

---

## Daftar Isi

- [Menjalankan API](#menjalankan-api)
- [Frontend Docs Console](#frontend-docs-console)
- [Endpoint](#endpoint)
  - [Health](#health)
  - [Top Headlines](#top-headlines)
  - [Everything](#everything)
  - [Sources](#sources)
- [Response Format](#response)
- [Daftar Media](#daftar-media)
- [Arsitektur](#struktur)
- [Refresh Cache](#refresh-cache)
- [Environment Variables](#environment-variables)
- [Quality Commands](#quality-commands)

---

## Menjalankan API

```bash
bun install
bun run dev
```

Default server berjalan di `http://localhost:3000`. Port bisa diubah via environment variable:

```bash
PORT=4000 bun run dev
```

Untuk mode production-like lokal:

```bash
bun run start
```

---

## Frontend Docs Console

Buka `http://localhost:3000` setelah server berjalan. Frontend menyediakan:

- **API Explorer** — jalankan request langsung dari browser, lengkap dengan dropdown source dan kategori.
- **Dokumentasi endpoint** — `top-headlines`, `everything`, dan `sources` dengan penjelasan parameter.
- **Scalar API Reference** — dokumentasi interaktif berbasis OpenAPI 3.1, tersedia di `/openapi.json`.
- **Generator URL** — buat URL request dan salin ke clipboard.
- **Panel JSON** — tampilkan hasil response tanpa perlu tool tambahan.
- **News Feed Portal** — tampilan visual berita dengan dukungan dark mode, bookmark, TTS, dan pencarian.

---

## Endpoint

### Health

```bash
curl http://localhost:3000/health
```

Response:

```json
{ "status": "ok" }
```

---

### Top Headlines

```bash
curl "http://localhost:3000/v2/top-headlines?country=id&category=all&sources=kompas-tren&pageSize=10&page=1"
```

**Query parameters:**

| Parameter | Tipe | Default | Deskripsi |
|-----------|------|---------|-----------|
| `country` | string | — | Hanya mendukung `id` |
| `category` | string | `all` | `all`, `general`, `business`, `sports`, `technology`, `entertainment` |
| `sources` | string | — | `all` atau daftar source ID dipisahkan koma, misal: `kompas-tren,detik-general` |
| `pageSize` | number | `20` | Maksimum `100` |
| `page` | number | `1` | Halaman ke- |

---

### Everything

```bash
curl "http://localhost:3000/v2/everything?q=ekonomi&sources=antara-general,cnbc-general&pageSize=10"
```

**Query parameters:**

| Parameter | Tipe | Default | Deskripsi |
|-----------|------|---------|-----------|
| `q` | string | — | Cari di judul, deskripsi, atau konten |
| `sources` | string | — | `all` atau daftar source ID dipisahkan koma |
| `category` | string | — | Filter berdasarkan kategori tanpa perlu source ID |
| `from` | string | — | Tanggal awal (ISO 8601) |
| `to` | string | — | Tanggal akhir (ISO 8601) |
| `sortBy` | string | `publishedAt` | Hanya `publishedAt` yang didukung |
| `pageSize` | number | `20` | Maksimum `100` |
| `page` | number | `1` | Halaman ke- |

---

### Sources

```bash
curl http://localhost:3000/v2/top-headlines/sources
```

Mengembalikan daftar semua source yang tersedia beserta metadata (id, name, description, url, category, language, country).

---

## Response

Response sukses mengikuti format dasar NewsAPI:

```json
{
  "status": "ok",
  "totalResults": 1,
  "articles": [
    {
      "source": { "id": "antara-general", "name": "ANTARA News" },
      "author": null,
      "title": "Judul berita",
      "description": "Ringkasan berita",
      "url": "https://example.com/berita",
      "urlToImage": "https://example.com/gambar.jpg",
      "publishedAt": "2026-06-07T03:00:00.000Z",
      "content": "Ringkasan berita"
    }
  ]
}
```

Response error:

```json
{
  "status": "error",
  "code": "parameterInvalid",
  "message": "country must be id"
}
```

---

## Daftar Media

Daftar lengkap semua source ID tersedia di **[LISTMEDIA.md](./LISTMEDIA.md)**.

Ringkasan cepat per kategori:

### 🇮🇩 Media Nasional Indonesia (General)
`kompas-home`, `kompas-tren`, `kompas-id-general`, `antara-general`, `tempo-general`, `detik-general`, `cnn-general`, `cnbc-general`, `jakpost-general`, `kumparan-general`, `liputan6-general`, `katadata-general`, `idntimes-general`, `tribunnews-general`, `narasi-general`, `republika-general`, `suara-general`, `asumsi-general`, `viva-general`, `merdeka-general`, `bisnis-general`, `jawapos-general`, `goodnewsfromindonesia-general`, `mojok-general`, `indoprogress-general`

### 🔍 Media Investigasi & Independen
`project-multatuli-general`, `project-multatuli-english`, `alinea-general`, `validnews-general`, `kbr-general`, `tirto-general`, `context-general`, `betahita-general`, `mongabay-general`, `sejuk-general`, `pinterpolitik-general`, `historia-general`, `nationalgeographic-general`

### 💼 Bisnis & Ekonomi
`antara-business`, `tempo-business`, `cnn-business`, `cnbc-business`, `cnbc-ekonomi`, `detik-finance`, `liputan6-business`, `cryptowave-business`, `bloomberg-business`, `bloomberg-asia-business`, `bloomberg-crypto-business`, `wsj-business`, `economist-business`, `forbes-business`

### 💻 Teknologi
`antara-technology`, `tempo-technology`, `detik-technology`, `cnn-technology`, `cnbc-technology`, `liputan6-technology`, `techinasia-indonesia`, `dailysocial-technology`, `kompas-tekno`, `merdeka-tekno`, `hackernews-technology`, `thehackernews-technology`, `theverge-technology`, `techcrunch-technology`, `wired-technology`, `nature-technology`

### ⚽ Olahraga
`antara-sports`, `tempo-sports`, `detik-sports`, `cnn-sports`, `liputan6-sports`, `goal-indonesia-sports`, `cna-sports`, `athletic-football-sports`, `coaches-voice-sports`, `goal-global-sports`, `wired-sports`

### 🎭 Hiburan & Gaya Hidup
`antara-entertainment`, `tempo-entertainment`, `cnn-entertainment`, `cnbc-entertainment`, `liputan6-entertainment`, `wired-entertainment`

### 📍 Media Lokal Daerah
`suara-surabaya-general`, `jatim-times-general`, `tugumalang-general`, `malangtimes-general`, `malang-post-general`, `radarmalang-general`, `suryamalang-general`

### 🌍 Internasional
`bbc-general`, `bbc-indonesia`, `cna-general`, `cna-business`, `nytimes-general`, `guardian-general`, `cnn-edition-general`, `reuters-general`, `aljazeera-general`, `nbcnews-general`, `rt-general`, `dw-general`, `the-diplomat-general`, `war-on-the-rocks-general`

---

## Catatan Sumber

| Metode | Media |
|--------|-------|
| **RSS Langsung** | ANTARA, Tempo, Detik, CNN Indonesia, CNBC Indonesia, Liputan6, Katadata, VIVA, Merdeka, Project Multatuli, Alinea, KBR, Mongabay, Republika, Kumparan, DailySocial, BBC Indonesia, CNA, TechCrunch, The Verge, Hacker News, The Hacker News, Al Jazeera, NBC News, RT, The Diplomat, Nature, SEJUK, IndoPROGRESS, Tugu Malang, BBC World, The Guardian, NY Times |
| **HTML Adapter** | Kompas.com, Kompas.com Tren, Context.id, Betahita.id, The Jakarta Post |
| **Google News RSS** | Tirto, Validnews, Tech in Asia, IDN Times, Tribunnews, Bisnis.com, Narasi, Suara.com, Asumsi, Kompas Tekno, Merdeka Tekno, Bloomberg, Reuters, Forbes, Economist, WSJ, DW, dan semua media lokal daerah |

Jika source gagal dimuat, API otomatis membaca artikel terakhir dari CSV/SQLite lokal agar endpoint tetap bisa mengembalikan hasil.

---

## Struktur

```
src/
├── app.ts                        # Hono app factory, konfigurasi storage
├── index.ts                      # Bun server entrypoint
├── index.test.ts                 # Test suite lengkap
├── modules/
│   ├── news/
│   │   ├── sourceRegistry.ts     # Registry 110+ source media
│   │   ├── newsService.ts        # Core service: fetch, cache, filter
│   │   ├── newsRoutes.ts         # Route handler v2 endpoints
│   │   ├── newsQueries.ts        # Query parser & validator
│   │   ├── rssAdapter.ts         # RSS/Atom feed parser
│   │   ├── htmlAdapter.ts        # HTML Cheerio scraper
│   │   ├── csvArticleStore.ts    # Penyimpanan CSV lokal
│   │   ├── sqliteArticleStore.ts # Penyimpanan SQLite (bun:sqlite)
│   │   ├── newsCache.ts          # In-memory cache TTL
│   │   └── types.ts              # Type definitions
│   └── web/
│       └── webRoutes.ts          # Halaman frontend, assets, OpenAPI
├── scripts/
│   └── refreshNewsCsv.ts         # Script refresh + decode URL Google News
├── shared/
│   └── http/
│       └── fetchNewsText.ts      # HTTP fetch dengan browser fallback
└── types/
```

---

## Refresh Cache

Untuk memperbarui artikel dari semua feed dan menyimpannya ke CSV + SQLite lokal:

```bash
bun run refresh:news
```

- **Default CSV**: `data/news-cache.csv`
- **Default SQLite**: `data/news-cache.sqlite`

Lokasi bisa diubah via environment variable:

```bash
NEWS_CSV_PATH=data/news-cache.csv NEWS_SQLITE_PATH=data/news.sqlite bun run refresh:news
```

Script ini akan:
1. Membaca cache lama dari SQLite (atau CSV jika SQLite belum ada).
2. Fetch artikel terbaru dari semua RSS/HTML feed.
3. Decode URL Google News ke URL artikel asli.
4. Scrape `og:image` untuk artikel yang belum punya gambar.
5. Menyimpan hasil gabungan (deduped) ke CSV dan SQLite.

Jika source memblokir fetch biasa, instal CloakBrowser opsional dan jalankan:

```bash
bun add -d cloakbrowser
CLOAK_BROWSER=1 bun run refresh:news
```

---

## Environment Variables

| Variable | Default | Deskripsi |
|----------|---------|-----------|
| `PORT` | `3000` | Port server |
| `NEWS_CSV_PATH` | `data/news-cache.csv` | Lokasi file CSV cache |
| `NEWS_SQLITE_PATH` | `data/news-cache.sqlite` | Lokasi file SQLite cache |
| `USE_SQLITE` | — | Set `1` untuk paksa pakai SQLite storage |
| `CLOAK_BROWSER` | — | Set `1` untuk aktifkan browser fallback (`cloakbrowser`) |
| `MAX_ARTICLES_CAP` | `1000000` | Jumlah maksimum artikel yang disimpan di cache |

---

## Quality Commands

```bash
bun test             # Jalankan test suite
bun run check:fast   # Lint (oxlint) + format check (oxfmt) — cepat
bun run check        # Full: tsgo typecheck + oxlint + oxfmt
bun run fix          # Auto-fix lint dan format
bun run fmt          # Format saja
bun run typecheck    # TypeScript typecheck via tsgo
```

---

## Dokumentasi API

Dokumentasi endpoint lengkap dengan contoh integrasi JavaScript, Python, TypeScript, dan cURL tersedia di **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**.

Definisi OpenAPI 3.1 tersedia di endpoint:

```bash
curl http://localhost:3000/openapi.json
```
