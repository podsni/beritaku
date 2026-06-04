# Beritaku News API

NewsAPI-like JSON API untuk berita Indonesia. Server berjalan di Bun + Hono dan mengambil berita dari source modular: RSS langsung, adapter HTML untuk halaman depan/trending, dan fallback Google News RSS untuk media yang feed langsungnya tidak tersedia.

## Menjalankan API

```bash
bun install
bun run dev
```

Default server berjalan di `http://localhost:3000`. Port bisa diubah dengan environment variable:

```bash
PORT=4000 bun run dev
```

Untuk mode production-like lokal:

```bash
bun run start
```

Untuk memperbarui fallback CSV lokal:

```bash
bun run refresh:news
```

Default CSV disimpan di `data/news-cache.csv`. Lokasi bisa diganti:

```bash
NEWS_CSV_PATH=data/news-cache.csv bun run refresh:news
```

Jika source memblokir fetch biasa, install CloakBrowser secara opsional lalu jalankan refresh dengan browser mode:

```bash
bun add -d cloakbrowser
CLOAK_BROWSER=1 bun run refresh:news
```

## Frontend Docs Console

Buka halaman berikut setelah server berjalan:

```text
http://localhost:3000
```

Frontend ini berisi:

- API Explorer untuk menjalankan request langsung dari browser.
- Dokumentasi endpoint `top-headlines`, `everything`, dan `sources`.
- Dropdown media dengan opsi `Semua media` atau satu source tertentu.
- Generator URL request dan tombol copy URL.
- Panel response JSON agar hasil API bisa dicek tanpa tool tambahan.

## Endpoint

### Health

```bash
curl http://localhost:3000/health
```

### Top Headlines

```bash
curl "http://localhost:3000/v2/top-headlines?country=id&category=all&sources=kompas-tren&pageSize=10&page=1"
```

Query yang didukung:

- `country`: hanya `id`
- `category`: `all`, `general`, `business`, `sports`, `technology`, `entertainment`
- `sources`: `all` atau daftar source id dipisahkan koma, misalnya `kompas-tren,detik-general`
- `pageSize`: default `20`, maksimum `100`
- `page`: default `1`

### Everything

```bash
curl "http://localhost:3000/v2/everything?q=ekonomi&sources=antara-general,cnbc-general&pageSize=10"
```

Query yang didukung:

- `q`: cari di judul, deskripsi, atau konten
- `sources`: `all` atau daftar source id dipisahkan koma
- `from`: tanggal awal
- `to`: tanggal akhir
- `sortBy`: hanya `publishedAt`
- `pageSize`: default `20`, maksimum `100`
- `page`: default `1`

### Sources

```bash
curl http://localhost:3000/v2/top-headlines/sources
```

Media default yang tersedia:

- Kompas.com (`kompas-home`, `kompas-tren`)
- ANTARA News
- Tempo
- Project Multatuli
- Alinea.id
- Validnews
- KBR
- Detik.com
- CNN Indonesia
- Context.id
- Tech in Asia Indonesia
- DailySocial.id
- Tirto.id
- CNBC Indonesia
- The Jakarta Post
- Kumparan
- Liputan6.com
- Katadata.co.id
- IDN Times
- Tribunnews.com
- Bisnis.com
- Narasi
- Republika
- Suara.com
- Asumsi.co
- VIVA.co.id
- Merdeka.com
- Mongabay Indonesia
- Betahita.id
- CNA Indonesia

Catatan source:

- Kompas homepage dan Kompas Tren memakai adapter HTML karena endpoint RSS publik yang dicek tidak aktif.
- Project Multatuli, Alinea.id, KBR, DailySocial.id, Mongabay Indonesia, Detik, Liputan6, Katadata, VIVA, Merdeka, Antara, CNN Indonesia, CNBC Indonesia, Tempo, Republika, dan CNA memakai RSS langsung.
- Context.id dan Betahita.id memakai adapter HTML berbasis Cheerio.
- Tirto, Validnews, Tech in Asia Indonesia, Kumparan, IDN Times, Tribunnews, Bisnis.com, Narasi, Suara, dan Asumsi memakai fallback Google News RSS berbasis domain karena feed langsungnya tidak tersedia atau terblokir saat dicek.
- Saat source gagal dimuat, API mencoba membaca artikel terakhir dari CSV lokal agar endpoint tetap bisa mengembalikan hasil.

## Response

Response sukses mengikuti bentuk dasar NewsAPI:

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
      "urlToImage": null,
      "publishedAt": "2026-06-05T10:00:00.000Z",
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

## Struktur

- `src/app.ts`: Hono app factory untuk runtime dan test.
- `src/index.ts`: Bun server entrypoint.
- `src/modules/news`: route, service, RSS adapter, HTML/Cheerio adapter, CSV article store, source registry, query parser, cache.
- `src/scripts/refreshNewsCsv.ts`: refresh source dan simpan snapshot artikel ke CSV.
- `src/modules/web`: halaman docs console, CSS, JavaScript, dan route asset frontend.
- `src/shared/http`: helper error, response, dan pagination.

## Quality Commands

```bash
bun test
bun run check:fast
bun run check
```
