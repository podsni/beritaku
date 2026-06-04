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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
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
              <div class="tab-group" role="tablist">
                <button class="tab-btn active" type="button" id="tab-btn-reader" role="tab" aria-selected="true" aria-controls="tab-content-reader">📖 Feed Pembaca</button>
                <button class="tab-btn" type="button" id="tab-btn-json" role="tab" aria-selected="false" aria-controls="tab-content-json">💻 Respon JSON</button>
              </div>
              <div class="toolbar-status-actions">
                <span id="request-status">Ready</span>
                <button class="ghost-action" type="button" id="copy-url">Copy URL</button>
              </div>
            </div>

            <div class="tab-content" id="tab-content-reader" role="tabpanel" aria-labelledby="tab-btn-reader">
              <div class="reader-empty" id="reader-empty">
                <div class="reader-empty-icon">📰</div>
                <h3>Feed Berita Kosong</h3>
                <p>Silakan sesuaikan parameter API di atas, lalu klik <strong>Run request</strong> untuk membaca artikel berita terbaru secara visual.</p>
              </div>
              <div class="news-feed-grid" id="news-feed-grid" style="display: none;">
                <!-- Kartu berita akan dirender di sini -->
              </div>
            </div>

            <div class="tab-content" id="tab-content-json" role="tabpanel" aria-labelledby="tab-btn-json" style="display: none;">
              <pre id="response-output">Pilih parameter, lalu jalankan request.</pre>
            </div>
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

    <!-- Immersive Article Reader Modal -->
    <div class="reader-modal" id="reader-modal" aria-hidden="true" role="dialog">
      <div class="reader-modal-overlay" id="reader-modal-overlay"></div>
      <div class="reader-modal-container">
        <header class="reader-control-bar">
          <div class="reader-ctrl-left">
            <button class="close-reader-btn" id="close-reader" aria-label="Tutup artikel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              <span class="btn-text">Tutup</span>
            </button>
          </div>
          
          <div class="reader-ctrl-right">
            <!-- Audio Listener (TTS) -->
            <div class="tts-group">
              <button class="ctrl-btn tts-btn" id="tts-play" title="Dengarkan artikel">
                <svg class="tts-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                <svg class="tts-pause-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                <span id="tts-btn-text">Dengarkan</span>
              </button>
              <button class="ctrl-btn tts-stop-btn" id="tts-stop" title="Hentikan suara" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16"></rect></svg>
              </button>
            </div>
            
            <!-- Font sizing controls -->
            <div class="font-sizer">
              <button class="ctrl-btn font-btn" id="btn-font-dec" title="Perkecil huruf">A-</button>
              <button class="ctrl-btn font-btn" id="btn-font-inc" title="Perbesar huruf">A+</button>
            </div>
            
            <!-- Font Style (Serif / Sans) -->
            <button class="ctrl-btn style-btn" id="btn-font-family" title="Ubah Gaya Huruf">Serif</button>
            
            <!-- Theme dot indicators -->
            <div class="reader-themes">
              <button class="theme-dot theme-dot-light active" data-theme="light" title="Tema Terang (Kertas)"></button>
              <button class="theme-dot theme-dot-sepia" data-theme="sepia" title="Tema Sepia (Mata Nyaman)"></button>
              <button class="theme-dot theme-dot-dark" data-theme="dark" title="Tema Gelap (Malam)"></button>
            </div>
          </div>
        </header>

        <!-- Progress Indicator -->
        <div class="reader-progress-wrapper">
          <div class="reader-progress-fill" id="reader-progress-fill"></div>
        </div>

        <div class="reader-scroll-area">
          <article class="reader-body serif-font theme-light" id="reader-article-body">
            <!-- Dinamis diisi lewat JavaScript -->
          </article>
        </div>
      </div>
    </div>
  </body>
</html>`;
}
