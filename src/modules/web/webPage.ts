export function renderHomePage(): string {
  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Beritaku API Console</title>
    <meta
      name="description"
      content="Dokumentasi dan API explorer untuk Beritaku News API Indonesia."
    />
    <link rel="stylesheet" href="/assets/app.css" />
    <script type="module" src="/assets/app.js"></script>
  </head>
  <body>
    <main class="api-shell">
      <aside class="rail" aria-label="Navigasi dokumentasi API">
        <a class="brand" href="/" aria-label="Beritaku API Console">
          <span class="brand-mark">B</span>
          <span>
            <strong>Beritaku</strong>
            <small>News API Indonesia</small>
          </span>
        </a>
        <nav class="endpoint-nav" aria-label="Endpoint API">
          <a href="#explorer">API Explorer</a>
          <a href="#top-headlines">Top Headlines</a>
          <a href="#everything">Everything</a>
          <a href="#sources">Sources</a>
          <a href="#errors">Errors</a>
        </nav>
        <div class="rail-note">
          <span class="pulse"></span>
          <span>Live dari RSS, HTML, dan fallback aggregator dengan cache 5 menit.</span>
        </div>
      </aside>

      <section class="workspace">
        <header class="masthead">
          <div>
            <p class="eyebrow">Dokumentasi + console</p>
            <h1>Beritaku API Console</h1>
            <p class="lead">
              Coba endpoint berita Indonesia langsung dari browser, lihat contoh
              query, dan salin pola request seperti NewsAPI untuk Kompas,
              Detik, Tempo, Project Multatuli, Mongabay, dan media nasional lain.
            </p>
          </div>
          <div class="signal-card" aria-label="Ringkasan kemampuan API">
            <span>API v2</span>
            <strong>Indonesia-first news feed</strong>
            <small>Top headlines, search, source registry</small>
          </div>
        </header>

        <section id="explorer" class="panel explorer-panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">Try it</p>
              <h2>API Explorer</h2>
            </div>
            <code id="request-url">/v2/top-headlines?country=id&amp;category=all&amp;sources=all&amp;pageSize=10</code>
          </div>

          <form class="request-grid" id="api-form">
            <label>
              <span>Endpoint</span>
              <select name="endpoint" id="endpoint">
                <option value="/v2/top-headlines">Top headlines</option>
                <option value="/v2/everything">Everything</option>
                <option value="/v2/top-headlines/sources">Sources</option>
              </select>
            </label>
            <label>
              <span>Category</span>
              <select name="category" id="category">
                <option value="all">All categories</option>
                <option value="general">General</option>
                <option value="business">Business</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </label>
            <label>
              <span>Search</span>
              <input name="q" id="q" placeholder="ekonomi, AI, olahraga" />
            </label>
            <label>
              <span>Pilih media</span>
              <select name="sources" id="sourcesInput">
                <option value="all">Semua media</option>
              </select>
            </label>
            <label>
              <span>Page size</span>
              <input name="pageSize" id="pageSize" type="number" min="1" max="100" value="10" />
            </label>
            <button class="primary-action" type="submit">Run request</button>
          </form>

          <div class="result-area">
            <div class="result-toolbar">
              <span id="request-status">Ready</span>
              <button class="ghost-action" type="button" id="copy-url">Copy URL</button>
            </div>
            <pre id="response-output">Pilih parameter, lalu jalankan request.</pre>
          </div>
          <div class="source-summary" id="source-summary">
            Memuat daftar media...
          </div>
        </section>

        <section class="docs-grid" aria-label="Dokumentasi endpoint">
          <article id="top-headlines" class="doc-card">
            <span class="method">GET</span>
            <h2>/v2/top-headlines</h2>
            <p>
              Berita terbaru Indonesia berdasarkan kategori dan media. Gunakan
              <code>category=all</code> dan <code>sources=all</code> untuk
              mengambil semua media, atau pilih <code>kompas-tren</code> untuk
              halaman trending Kompas.
            </p>
            <pre>curl "http://localhost:3000/v2/top-headlines?country=id&amp;category=all&amp;sources=kompas-tren&amp;pageSize=10"</pre>
          </article>

          <article id="everything" class="doc-card">
            <span class="method">GET</span>
            <h2>/v2/everything</h2>
            <p>
              Cari artikel dari semua source atau source tertentu. Mendukung
              <code>q</code>, <code>sources</code>, <code>from</code>, <code>to</code>, dan pagination.
            </p>
            <pre>curl "http://localhost:3000/v2/everything?q=ekonomi&amp;sources=antara-general,cnbc-general"</pre>
          </article>

          <article id="sources" class="doc-card">
            <span class="method">GET</span>
            <h2>/v2/top-headlines/sources</h2>
            <p>
              Daftar source Indonesia yang aktif di registry backend. Source
              bisa berupa RSS langsung, adapter HTML Cheerio, fallback Google
              News RSS, atau CSV fallback dari refresh terakhir saat sumber
              sedang diblokir.
            </p>
            <pre>curl "http://localhost:3000/v2/top-headlines/sources"</pre>
          </article>

          <article id="errors" class="doc-card">
            <span class="method error-method">ERR</span>
            <h2>Error shape</h2>
            <p>
              Error dibuat konsisten agar mudah ditangani frontend atau client
              lain.
            </p>
            <pre>{
  "status": "error",
  "code": "parameterInvalid",
  "message": "country must be id"
}</pre>
          </article>
        </section>
      </section>
    </main>
  </body>
</html>`;
}
