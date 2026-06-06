export function createOpenApiSpec(baseUrl: string) {
  return {
    openapi: "3.1.0",
    info: {
      title: "Beritaku News API",
      version: "2.0.0",
      description:
        "API agregator berita Indonesia dengan format response NewsAPI-like, source registry, cache fallback, dan pencarian lintas media.",
    },
    servers: [
      {
        url: baseUrl,
        description: "Server aktif",
      },
    ],
    tags: [
      {
        name: "News",
        description: "Endpoint artikel berita Indonesia.",
      },
      {
        name: "Sources",
        description: "Registry media berita yang tersedia.",
      },
    ],
    paths: {
      "/v2/top-headlines": {
        get: {
          tags: ["News"],
          summary: "Top headlines Indonesia",
          description:
            "Mengambil berita terbaru berdasarkan kategori utama, media, bahasa, dan pagination.",
          parameters: [
            {
              name: "country",
              in: "query",
              required: false,
              schema: {
                type: "string",
                enum: ["id"],
                default: "id",
              },
              description: "Kode negara. Saat ini hanya mendukung Indonesia.",
            },
            categoryParameter(
              "Kategori backend yang diterima langsung oleh endpoint top headlines.",
            ),
            sourcesParameter(),
            languageParameter(),
            refreshParameter(),
            pageParameter(),
            pageSizeParameter(),
          ],
          responses: articleListResponses(),
        },
      },
      "/v2/everything": {
        get: {
          tags: ["News"],
          summary: "Search everything",
          description:
            "Mencari artikel berdasarkan kata kunci, kategori utama, media, rentang tanggal, bahasa, dan pagination.",
          parameters: [
            {
              name: "q",
              in: "query",
              required: false,
              schema: {
                type: "string",
                example: "politik ekonomi AI",
              },
              description:
                "Kata kunci pencarian. Kategori pintar frontend memakai parameter ini.",
            },
            categoryParameter(
              "Kategori backend opsional. Gunakan q untuk kategori pintar seperti politik, kesehatan, pendidikan, dan lingkungan.",
            ),
            sourcesParameter(),
            {
              name: "from",
              in: "query",
              required: false,
              schema: {
                type: "string",
                format: "date",
                example: "2026-06-01",
              },
              description: "Tanggal awal publikasi.",
            },
            {
              name: "to",
              in: "query",
              required: false,
              schema: {
                type: "string",
                format: "date",
                example: "2026-06-07",
              },
              description: "Tanggal akhir publikasi.",
            },
            {
              name: "sortBy",
              in: "query",
              required: false,
              schema: {
                type: "string",
                enum: ["publishedAt"],
                default: "publishedAt",
              },
              description: "Urutan hasil. Saat ini stabil di publishedAt.",
            },
            languageParameter(),
            refreshParameter(),
            pageParameter(),
            pageSizeParameter(),
          ],
          responses: articleListResponses(),
        },
      },
      "/v2/top-headlines/sources": {
        get: {
          tags: ["Sources"],
          summary: "Source registry",
          description:
            "Mengembalikan daftar media aktif beserta kategori, bahasa, negara, URL, dan deskripsi.",
          responses: {
            "200": {
              description: "Daftar source aktif",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["status", "sources"],
                    properties: {
                      status: {
                        type: "string",
                        enum: ["ok"],
                      },
                      sources: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/NewsSource",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        NewsArticle: {
          type: "object",
          required: [
            "source",
            "author",
            "title",
            "description",
            "url",
            "urlToImage",
            "publishedAt",
            "content",
          ],
          properties: {
            source: {
              type: "object",
              required: ["id", "name"],
              properties: {
                id: {
                  type: "string",
                  example: "antara-general",
                },
                name: {
                  type: "string",
                  example: "ANTARA News",
                },
              },
            },
            author: nullableString("Nama penulis jika tersedia."),
            title: {
              type: "string",
              example: "Judul berita terbaru",
            },
            description: nullableString("Ringkasan artikel."),
            url: {
              type: "string",
              format: "uri",
            },
            urlToImage: nullableString("URL gambar utama jika tersedia."),
            publishedAt: nullableString("Waktu publikasi ISO 8601."),
            content: nullableString("Konten ringkas yang sudah dinormalisasi."),
          },
        },
        NewsSource: {
          type: "object",
          required: [
            "id",
            "name",
            "description",
            "url",
            "category",
            "language",
            "country",
          ],
          properties: {
            id: {
              type: "string",
              example: "kompas-tren",
            },
            name: {
              type: "string",
              example: "Kompas.com Tren",
            },
            description: {
              type: "string",
            },
            url: {
              type: "string",
              format: "uri",
            },
            category: categorySchema(),
            language: {
              type: "string",
              enum: ["id", "en"],
            },
            country: {
              type: "string",
              enum: ["id"],
            },
          },
        },
        ErrorResponse: {
          type: "object",
          required: ["status", "code", "message"],
          properties: {
            status: {
              type: "string",
              enum: ["error"],
            },
            code: {
              type: "string",
              example: "parameterInvalid",
            },
            message: {
              type: "string",
              example:
                "category must be one of: all, general, business, sports, technology, entertainment",
            },
          },
        },
      },
    },
  };
}

function categoryParameter(description: string) {
  return {
    name: "category",
    in: "query",
    required: false,
    schema: categorySchema(true),
    description,
  };
}

function categorySchema(includeAll = false) {
  const values = [
    "general",
    "business",
    "sports",
    "technology",
    "entertainment",
  ];

  return {
    type: "string",
    enum: includeAll ? ["all", ...values] : values,
    default: includeAll ? "all" : "general",
  };
}

function sourcesParameter() {
  return {
    name: "sources",
    in: "query",
    required: false,
    schema: {
      type: "string",
      example: "kompas-tren,cnbc-general",
    },
    description:
      "ID source dipisahkan koma. Kosongkan atau isi all untuk memakai semua media.",
  };
}

function languageParameter() {
  return {
    name: "language",
    in: "query",
    required: false,
    schema: {
      type: "string",
      enum: ["all", "id", "en"],
      default: "all",
    },
    description: "Filter bahasa artikel.",
  };
}

function refreshParameter() {
  return {
    name: "refresh",
    in: "query",
    required: false,
    schema: {
      type: "boolean",
      default: false,
    },
    description:
      "Paksa refresh live source. Gunakan hati-hati untuk request luas.",
  };
}

function pageParameter() {
  return {
    name: "page",
    in: "query",
    required: false,
    schema: {
      type: "integer",
      minimum: 1,
      default: 1,
    },
    description: "Nomor halaman.",
  };
}

function pageSizeParameter() {
  return {
    name: "pageSize",
    in: "query",
    required: false,
    schema: {
      type: "integer",
      minimum: 1,
      maximum: 100,
      default: 20,
    },
    description: "Jumlah artikel per halaman.",
  };
}

function articleListResponses() {
  return {
    "200": {
      description: "Daftar artikel berhasil diambil.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["status", "totalResults", "articles"],
            properties: {
              status: {
                type: "string",
                enum: ["ok"],
              },
              totalResults: {
                type: "integer",
                minimum: 0,
              },
              articles: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/NewsArticle",
                },
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Parameter request tidak valid.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ErrorResponse",
          },
        },
      },
    },
  };
}

function nullableString(description: string) {
  return {
    oneOf: [
      {
        type: "string",
      },
      {
        type: "null",
      },
    ],
    description,
  };
}
