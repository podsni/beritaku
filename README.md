# Beritaku News API

NewsAPI-like JSON API untuk berita Indonesia. Server berjalan di Bun + Hono dan mengambil berita dari RSS media Indonesia melalui adapter modular.

## Menjalankan API

```bash
bun install
bun src/index.ts
```

Default server berjalan di `http://localhost:3000`. Port bisa diubah dengan environment variable:

```bash
PORT=4000 bun src/index.ts
```

## Endpoint

### Health

```bash
curl http://localhost:3000/health
```

### Top Headlines

```bash
curl "http://localhost:3000/v2/top-headlines?country=id&category=general&pageSize=10&page=1"
```

Query yang didukung:

- `country`: hanya `id`
- `category`: `general`, `business`, `sports`, `technology`, `entertainment`
- `pageSize`: default `20`, maksimum `100`
- `page`: default `1`

### Everything

```bash
curl "http://localhost:3000/v2/everything?q=ekonomi&sources=antara-general&pageSize=10"
```

Query yang didukung:

- `q`: cari di judul, deskripsi, atau konten
- `sources`: daftar source dipisahkan koma
- `from`: tanggal awal
- `to`: tanggal akhir
- `sortBy`: hanya `publishedAt`
- `pageSize`: default `20`, maksimum `100`
- `page`: default `1`

### Sources

```bash
curl http://localhost:3000/v2/top-headlines/sources
```

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
- `src/modules/news`: route, service, RSS adapter, source registry, query parser, cache.
- `src/shared/http`: helper error, response, dan pagination.

## Quality Commands

```bash
bun test
bun run check:fast
bun run check
```
