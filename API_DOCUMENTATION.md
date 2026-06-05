# Dokumentasi Integrasi & Penggunaan API Beritaku

Selamat datang di Panduan Integrasi **Beritaku News API**. Dokumen ini menjelaskan cara menjalankan server, detail endpoint API, parameter query, format respon, dan contoh kode integrasi di berbagai bahasa pemrograman.

---

## 🚀 Menjalankan Server Lokal

Aplikasi Beritaku berjalan menggunakan runtime **Bun** dan kerangka kerja **Hono** untuk performa yang optimal.

### Langkah Instalasi & Menjalankan

1. **Pasang dependensi proyek:**

   ```bash
   bun install
   ```

2. **Jalankan server lokal dalam mode development (dengan hot-reload):**

   ```bash
   bun run dev
   ```

   _Secara default, server akan berjalan di alamat `http://localhost:3000`._

3. **Menjalankan pada port kustom:**
   Jika ingin menggunakan port lain (misal `4000`), gunakan variabel lingkungan `PORT`:

   ```bash
   PORT=4000 bun run dev
   ```

4. **Menjalankan dalam mode produksi lokal:**
   ```bash
   bun run start
   ```

### Pembaruan Fallback CSV (News Cache)

Jika beberapa sumber media memblokir koneksi HTTP biasa, API akan menggunakan data fallback lokal dari `data/news-cache.csv`. Perbarui file cache ini secara periodik menggunakan perintah:

```bash
bun run refresh:news
```

Untuk menggunakan browser automation mode (CloakBrowser) jika fetch biasa diblokir:

```bash
CLOAK_BROWSER=1 bun run refresh:news
```

---

## 📡 Referensi Endpoint API

Seluruh endpoint API berada di bawah prefix `/v2`.

### 1. `GET /v2/top-headlines`

Mengambil artikel berita terbaru yang sedang trending/hangat berdasarkan kategori atau media tertentu.

#### Parameter Query:

| Parameter  | Tipe    | Wajib | Keterangan                                                                                 |
| :--------- | :------ | :---- | :----------------------------------------------------------------------------------------- |
| `country`  | String  | Tidak | Negara target. Hanya mendukung `id` (default).                                             |
| `category` | String  | Tidak | Kategori: `all` (default), `general`, `business`, `sports`, `technology`, `entertainment`. |
| `sources`  | String  | Tidak | Batasan ID media tertentu dipisahkan koma, contoh: `kompas-tren,cnbc-general`.             |
| `pageSize` | Integer | Tidak | Jumlah artikel per halaman (Default: `20`, Maksimum: `100`).                               |
| `page`     | Integer | Tidak | Halaman pagination (Default: `1`).                                                         |

---

### 2. `GET /v2/everything`

Pencarian artikel secara menyeluruh dari seluruh basis data dan agregator berita berdasarkan kata kunci.

#### Parameter Query:

| Parameter  | Tipe    | Wajib  | Keterangan                                                       |
| :--------- | :------ | :----- | :--------------------------------------------------------------- |
| `q`        | String  | **Ya** | Kata kunci pencarian (mencari di judul, deskripsi, atau konten). |
| `sources`  | String  | Tidak  | Batasan ID media tertentu dipisahkan koma.                       |
| `from`     | String  | Tidak  | Batas tanggal awal ISO 8601 (contoh: `2026-06-01`).              |
| `to`       | String  | Tidak  | Batas tanggal akhir ISO 8601 (contoh: `2026-06-05`).             |
| `pageSize` | Integer | Tidak  | Jumlah artikel per halaman (Default: `20`, Maksimum: `100`).     |
| `page`     | Integer | Tidak  | Halaman pagination (Default: `1`).                               |

---

### 3. `GET /v2/top-headlines/sources`

Mengambil daftar media nasional aktif yang terdaftar di dalam sistem registri backend Beritaku.

_Tidak membutuhkan parameter query._

---

## 📦 Format Respon JSON

### Respon Sukses (HTTP 200 OK)

Format respon sukses dirancang mirip dengan NewsAPI standar:

```json
{
  "status": "ok",
  "totalResults": 2,
  "articles": [
    {
      "source": {
        "id": "antara-general",
        "name": "ANTARA News"
      },
      "author": "Redaksi Antara",
      "title": "Ekonomi Indonesia tumbuh stabil di kuartal kedua",
      "description": "Pemerintah melaporkan pertumbuhan ekonomi nasional tetap stabil.",
      "url": "https://www.antaranews.com/berita/ekonomi-indonesia-tumbuh-stabil",
      "urlToImage": "https://www.antaranews.com/images/ekonomi.jpg",
      "publishedAt": "2026-06-05T10:00:00.000Z",
      "content": "Pemerintah menyebut ekonomi nasional tetap stabil di tengah ketidakpastian global..."
    }
  ]
}
```

### Respon Error (HTTP 400/500)

Jika parameter tidak sesuai, API mengembalikan respon error berstruktur:

```json
{
  "status": "error",
  "code": "parameterInvalid",
  "message": "country must be id"
}
```

---

## 💻 Contoh Integrasi Kode

### 1. JavaScript (ES6 Fetch)

```javascript
async function ambilBerita() {
  const url =
    "http://localhost:3000/v2/top-headlines?category=technology&pageSize=5";
  try {
    const respon = await fetch(url);
    const data = await respon.json();

    if (data.status === "ok") {
      console.log("Artikel:", data.articles);
    } else {
      console.error("API Error:", data.message);
    }
  } catch (error) {
    console.error("Gagal memuat berita:", error);
  }
}

ambilBerita();
```

### 2. Python

```python
import requests

def dapatkan_berita():
    url = 'http://localhost:3000/v2/top-headlines'
    params = {
        'category': 'business',
        'pageSize': 5
    }
    try:
        response = requests.get(url, params=params)
        data = response.json()
        if data.get('status') == 'ok':
            for article in data.get('articles', []):
                print(f"- {article['title']} ({article['source']['name']})")
        else:
            print("API Error:", data.get('message'))
    except Exception as e:
        print("Network Error:", e)

dapatkan_berita()
```

### 3. TypeScript Type Definition

```typescript
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: "ok" | "error";
  totalResults?: number;
  articles?: NewsArticle[];
  code?: string;
  message?: string;
}
```

### 4. cURL

```bash
curl "http://localhost:3000/v2/top-headlines?country=id&category=general&pageSize=10"
```
