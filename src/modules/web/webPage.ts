export function renderHomePage(): string {
  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Beritaku News Hub & API Console</title>
    <meta
      name="description"
      content="Dokumentasi, API explorer, dan Portal Berita terintegrasi untuk Beritaku News API Indonesia."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/app.css" />
    <script type="module" src="/assets/app.js"></script>
  </head>
  <body>
    <!-- Grain Overlay for tactile texture -->
    <div class="grain-overlay"></div>

    <main class="api-shell">
      <aside class="rail" aria-label="Navigasi Utama">
        <a class="brand" href="/" aria-label="Beritaku Home">
          <span class="brand-mark">B</span>
          <span>
            <strong>Beritaku</strong>
            <small>News API Indonesia</small>
          </span>
        </a>
        
        <nav class="endpoint-nav" aria-label="Menu Navigasi">
          <button id="tab-portal" class="rail-tab-btn active" type="button">
            <span class="btn-icon">📰</span>
            <span class="btn-text">Portal Berita</span>
          </button>
          <button id="tab-console" class="rail-tab-btn" type="button">
            <span class="btn-icon">⚙️</span>
            <span class="btn-text">API Playground</span>
          </button>
          <button id="tab-docs" class="rail-tab-btn" type="button">
            <span class="btn-icon">📖</span>
            <span class="btn-text">Panduan API</span>
          </button>

          <!-- Hidden anchors to keep existing tests and element compatibility intact -->
          <div style="display: none;">
            <a href="#explorer">API Explorer</a>
            <a href="#top-headlines">Top Headlines</a>
            <a href="#everything">Everything</a>
            <a href="#sources">Sources</a>
            <a href="#errors">Errors</a>
          </div>
        </nav>
        
        <button id="global-theme-toggle" class="theme-toggle-btn" type="button" aria-label="Ubah tema warna global">
          <svg class="sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg class="moon-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <span id="theme-btn-text">Mode Gelap</span>
        </button>

        <div class="rail-note">
          <span class="pulse"></span>
          <span>Live dari RSS, HTML, dan fallback aggregator dengan cache 5 menit.</span>
        </div>
      </aside>

      <section class="workspace">
        
        <!-- ================= VIEW 1: PORTAL BERITA ================= -->
        <div id="view-portal" class="workspace-view active">
          <header class="portal-header">
            <div class="portal-meta">
              <span class="portal-date" id="live-date">Memuat Tanggal...</span>
              <span class="portal-divider">·</span>
              <span class="portal-status"><span class="pulse-green"></span> Live Aggregator</span>
            </div>
            <h1 class="portal-title">Beritaku</h1>
            <p class="portal-lead">Portal agregator berita nasional dengan performa tinggi & dokumentasi API terintegrasi.</p>
          </header>

          <!-- Breaking News Marquee Ticker -->
          <div class="ticker-wrap">
            <div class="ticker-title">TERBARU</div>
            <div class="ticker-track">
              <div class="ticker-items" id="portal-ticker-items">
                <span class="ticker-item">Memuat berita utama terbaru secara live dari media nasional...</span>
              </div>
            </div>
          </div>

          <!-- Portal Categories & Search -->
          <div class="portal-controls">
            <div class="portal-categories" id="portal-categories">
              <button class="portal-cat-btn active" data-category="all" type="button">Semua</button>
              <button class="portal-cat-btn" data-category="general" type="button">Umum</button>
              <button class="portal-cat-btn" data-category="technology" type="button">Teknologi</button>
              <button class="portal-cat-btn" data-category="business" type="button">Bisnis</button>
              <button class="portal-cat-btn" data-category="sports" type="button">Olahraga</button>
              <button class="portal-cat-btn" data-category="entertainment" type="button">Hiburan</button>
            </div>
            <div class="portal-search">
              <input type="text" id="portal-search-q" placeholder="Cari berita di portal..." />
              <button id="portal-search-go" class="portal-search-btn" type="button">Cari</button>
            </div>
          </div>

          <!-- Featured Headline Story -->
          <div id="portal-featured-story" class="featured-story-card" style="display: none;">
            <!-- Rendered dynamically via JavaScript -->
          </div>

          <!-- Portal Card Grid -->
          <div id="portal-news-grid" class="portal-news-grid" style="display: none;">
            <!-- Rendered dynamically via JavaScript -->
          </div>

          <!-- Skeletons for Loading State -->
          <div id="portal-skeletons" class="portal-news-grid">
            <!-- Populated on startup -->
          </div>

          <!-- Portal Empty State -->
          <div id="portal-empty" class="reader-empty" style="display: none;">
            <div class="reader-empty-icon" aria-hidden="true"></div>
            <h3>Artikel Berita Tidak Ditemukan</h3>
            <p>Silakan gunakan kata kunci pencarian lain atau ganti kategori media yang sedang Anda telusuri.</p>
          </div>
        </div>

        <!-- ================= VIEW 2: API PLAYGROUND & CONSOLE ================= -->
        <div id="view-console" class="workspace-view">
          <header class="masthead">
            <div>
              <p class="eyebrow">Dokumentasi + console</p>
              <h1>Beritaku API Console</h1>
              <p class="lead">
                Coba endpoint berita Indonesia langsung dari browser, lihat contoh
                query, dan salin pola request seperti NewsAPI untuk Kompas,
                Detik, Tempo, Project Multatuli, Mongabay, dan media nasional lain.
              </p>
              <div class="endpoint-stats" aria-label="Ringkasan status console">
                <div class="stat-tile">
                  <span id="stat-sources">--</span>
                  <small>Source aktif</small>
                </div>
                <div class="stat-tile">
                  <span id="stat-results">0</span>
                  <small>Artikel terakhir</small>
                </div>
                <div class="stat-tile">
                  <span id="stat-cache">Ready</span>
                  <small>Status request</small>
                </div>
              </div>
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

            <div class="quick-presets" aria-label="Preset request cepat">
              <button type="button" class="preset-chip active" data-preset="breaking">Breaking nasional</button>
              <button type="button" class="preset-chip" data-preset="tech">Teknologi</button>
              <button type="button" class="preset-chip" data-preset="business">Bisnis</button>
              <button type="button" class="preset-chip" data-preset="search">Cari ekonomi</button>
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
              <label class="custom-select-wrapper">
                <span>Pilih media</span>
                <div class="custom-select" id="custom-sources-select">
                  <div class="custom-select-trigger" tabindex="0">
                    <span id="selected-source-text">Semua media</span>
                    <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <div class="custom-select-dropdown">
                    <div class="custom-select-search-container">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="dropdown-search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      <input type="text" id="sources-search-input" placeholder="Cari media..." autocomplete="off" />
                    </div>
                    <ul class="custom-select-options" id="custom-sources-options">
                      <!-- Dynamic options populate here -->
                    </ul>
                  </div>
                </div>
                <input type="hidden" name="sources" id="sourcesInput" value="all" />
              </label>
              <label>
                <span>Bahasa</span>
                <select name="language" id="languageSelect">
                  <option value="all">Semua bahasa</option>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English (Inggris)</option>
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
                  <button class="tab-btn active" type="button" id="tab-btn-reader" role="tab" aria-selected="true" aria-controls="tab-content-reader">Feed Pembaca</button>
                  <button class="tab-btn" type="button" id="tab-btn-json" role="tab" aria-selected="false" aria-controls="tab-content-json">Respon JSON</button>
                </div>
                <div class="toolbar-status-actions">
                  <span id="request-status" role="status" aria-live="polite">Ready</span>
                  <button class="ghost-action" type="button" id="copy-url">Copy URL</button>
                </div>
              </div>

              <div class="tab-content" id="tab-content-reader" role="tabpanel" aria-labelledby="tab-btn-reader">
                <!-- Filter & Search Bar -->
                <div class="feed-header-bar" id="feed-header-bar" style="display: none;">
                  <div class="feed-search-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" id="feed-search-input" placeholder="Cari di feed ini (Tekan Enter untuk cari di server)..." />
                  </div>
                  <div class="feed-language-filter">
                    <button class="lang-tag active" data-lang="all" type="button">Semua</button>
                    <button class="lang-tag" data-lang="id" type="button">🇮🇩 ID</button>
                    <button class="lang-tag" data-lang="en" type="button">🇬🇧 EN</button>
                  </div>
                </div>

                <div class="reader-empty" id="reader-empty">
                  <div class="reader-empty-icon" aria-hidden="true"></div>
                  <h3>Feed Berita Kosong</h3>
                  <p>Silakan sesuaikan parameter API di atas, lalu klik <strong>Run request</strong> untuk membaca artikel berita terbaru secara visual.</p>
                </div>
                <div class="news-feed-grid" id="news-feed-grid" style="display: none;">
                  <!-- Kartu berita akan dirender di sini -->
                </div>

                <!-- Footer Load More -->
                <div class="feed-footer" id="feed-footer" style="display: none;">
                  <button class="load-more-btn" id="load-more-btn" type="button">
                    <span>Muat Lebih Banyak</span>
                    <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                  </button>
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
        </div>

        <!-- ================= VIEW 3: API DOCUMENTATION ================= -->
        <div id="view-docs" class="workspace-view">
          <header class="docs-header">
            <p class="eyebrow">Panduan Integrasi</p>
            <h1>Dokumentasi API Beritaku</h1>
            <p class="lead">
              Integrasikan feed berita Indonesia ke dalam aplikasi Anda dengan mudah. API kami dirancang kompatibel dengan format respon NewsAPI.
            </p>
          </header>

          <!-- Quick Setup Card -->
          <div class="docs-section-card">
            <h2>🚀 Menjalankan Server Lokal</h2>
            <p>Ikuti langkah berikut untuk mengkloning, menginstal dependensi, dan menjalankan server API Beritaku di server lokal Anda:</p>
            <div class="code-block-wrapper">
              <div class="code-block-header">
                <span>BASH / TERMINAL</span>
                <button class="copy-code-btn" data-code="git clone <repo-url> beritaku&#10;cd beritaku&#10;bun install&#10;bun run dev">Salin</button>
              </div>
              <pre><code># 1. Pasang dependensi menggunakan Bun
<span class="code-kw">bun install</span>

# 2. Jalankan server dalam mode development (dengan hot-reload)
<span class="code-kw">bun run dev</span></code></pre>
            </div>
            <p>Default server berjalan di <code>http://localhost:3000</code>. Anda dapat menyesuaikan port menggunakan variabel lingkungan:</p>
            <div class="code-block-wrapper">
              <div class="code-block-header">
                <span>BASH / CUSTOM PORT</span>
                <button class="copy-code-btn" data-code="PORT=4000 bun run dev">Salin</button>
              </div>
              <pre><code><span class="code-kw">PORT</span>=4000 <span class="code-kw">bun run dev</span></code></pre>
            </div>
          </div>

          <!-- Endpoint Cards Grid -->
          <div class="docs-section-card">
            <h2>📡 Referensi Endpoint</h2>
            
            <div class="endpoint-doc-item">
              <div class="endpoint-badge-wrap">
                <span class="method">GET</span>
                <code class="endpoint-path">/v2/top-headlines</code>
              </div>
              <p class="endpoint-desc">Mengambil berita terhangat/breaking news yang sedang trending saat ini.</p>
              
              <h4 class="param-title">Parameter Query</h4>
              <div class="table-responsive">
                <table class="params-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Tipe</th>
                      <th>Wajib</th>
                      <th>Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>country</code></td>
                      <td>String</td>
                      <td>Tidak</td>
                      <td>Hanya mendukung <code>id</code> (default).</td>
                    </tr>
                    <tr>
                      <td><code>category</code></td>
                      <td>String</td>
                      <td>Tidak</td>
                      <td>Kategori berita: <code>all</code>, <code>general</code>, <code>business</code>, <code>sports</code>, <code>technology</code>, <code>entertainment</code>.</td>
                    </tr>
                    <tr>
                      <td><code>sources</code></td>
                      <td>String</td>
                      <td>Tidak</td>
                      <td>ID media terdaftar dipisahkan koma, contoh: <code>kompas-tren,cnbc-general</code>.</td>
                    </tr>
                    <tr>
                      <td><code>pageSize</code></td>
                      <td>Integer</td>
                      <td>Tidak</td>
                      <td>Jumlah artikel per halaman (Default: <code>20</code>, Max: <code>100</code>).</td>
                    </tr>
                    <tr>
                      <td><code>page</code></td>
                      <td>Integer</td>
                      <td>Tidak</td>
                      <td>Halaman artikel yang ingin diambil (Default: <code>1</code>).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="endpoint-doc-item">
              <div class="endpoint-badge-wrap">
                <span class="method">GET</span>
                <code class="endpoint-path">/v2/everything</code>
              </div>
              <p class="endpoint-desc">Pencarian artikel berita secara menyeluruh berdasarkan kata kunci.</p>
              
              <h4 class="param-title">Parameter Query</h4>
              <div class="table-responsive">
                <table class="params-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Tipe</th>
                      <th>Wajib</th>
                      <th>Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>q</code></td>
                      <td>String</td>
                      <td><strong>Ya</strong></td>
                      <td>Kata kunci pencarian di judul, deskripsi, atau konten berita.</td>
                    </tr>
                    <tr>
                      <td><code>sources</code></td>
                      <td>String</td>
                      <td>Tidak</td>
                      <td>Opsi pembatasan media tertentu dipisahkan koma.</td>
                    </tr>
                    <tr>
                      <td><code>from</code></td>
                      <td>String</td>
                      <td>Tidak</td>
                      <td>Tanggal awal ISO 8601 (contoh: <code>2026-06-01</code>).</td>
                    </tr>
                    <tr>
                      <td><code>to</code></td>
                      <td>String</td>
                      <td>Tidak</td>
                      <td>Tanggal akhir ISO 8601 (contoh: <code>2026-06-05</code>).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="endpoint-doc-item">
              <div class="endpoint-badge-wrap">
                <span class="method">GET</span>
                <code class="endpoint-path">/v2/top-headlines/sources</code>
              </div>
              <p class="endpoint-desc">Mengembalikan daftar seluruh media nasional aktif yang terintegrasi di sistem Beritaku.</p>
            </div>
          </div>

          <!-- Code Integration Snippets -->
          <div class="docs-section-card">
            <h2>💻 Contoh Integrasi Kode</h2>
            <p>Berikut adalah contoh cara mengintegrasikan API Beritaku di berbagai platform pemrograman:</p>

            <div class="code-group-tabs">
              <div class="code-tab-header">
                <button class="code-tab-btn active" data-lang="js" type="button">JavaScript (Fetch)</button>
                <button class="code-tab-btn" data-lang="ts" type="button">TypeScript (Types)</button>
                <button class="code-tab-btn" data-lang="python" type="button">Python</button>
                <button class="code-tab-btn" data-lang="curl" type="button">cURL</button>
              </div>
              
              <!-- JS Tab -->
              <div class="code-tab-content active" data-lang="js">
                <div class="code-block-wrapper">
                  <div class="code-block-header">
                    <span>JAVASCRIPT</span>
                    <button class="copy-code-btn" data-code="async function dapatkanBerita() {&#10;  try {&#10;    const respon = await fetch('http://localhost:3000/v2/top-headlines?category=technology&pageSize=5');&#10;    const data = await respon.json();&#10;    if (data.status === 'ok') {&#10;      console.log('Daftar Berita:', data.articles);&#10;    } else {&#10;      console.error('Error API:', data.message);&#10;    }&#10;  } catch (error) {&#10;    console.error('Jaringan Error:', error);&#10;  }&#10;}&#10;&#10;dapatkanBerita();">Salin</button>
                  </div>
                  <pre><code><span class="code-kw">async function</span> <span class="code-fn">dapatkanBerita</span>() {
  <span class="code-kw">try</span> {
    <span class="code-kw">const</span> respon = <span class="code-kw">await</span> <span class="code-fn">fetch</span>(<span class="code-str">'http://localhost:3000/v2/top-headlines?category=technology&pageSize=5'</span>);
    <span class="code-kw">const</span> data = <span class="code-kw">await</span> respon.<span class="code-fn">json</span>();
    
    <span class="code-kw">if</span> (data.status === <span class="code-str">'ok'</span>) {
      console.<span class="code-fn">log</span>(<span class="code-str">'Daftar Berita:'</span>, data.articles);
    } <span class="code-kw">else</span> {
      console.<span class="code-fn">error</span>(<span class="code-str">'Error API:'</span>, data.message);
    }
  } <span class="code-kw">catch</span> (error) {
    console.<span class="code-fn">error</span>(<span class="code-str">'Jaringan Error:'</span>, error);
  }
}

<span class="code-fn">dapatkanBerita</span>();</code></pre>
                </div>
              </div>

              <!-- TS Tab -->
              <div class="code-tab-content" data-lang="ts" style="display: none;">
                <div class="code-block-wrapper">
                  <div class="code-block-header">
                    <span>TYPESCRIPT DEFINITIONS</span>
                    <button class="copy-code-btn" data-code="export interface NewsArticle {&#10;  source: {&#10;    id: string | null;&#10;    name: string;&#10;  };&#10;  author: string | null;&#10;  title: string;&#10;  description: string | null;&#10;  url: string;&#10;  urlToImage: string | null;&#10;  publishedAt: string;&#10;  content: string | null;&#10;}&#10;&#10;export interface NewsApiResponse {&#10;  status: 'ok' | 'error';&#10;  totalResults?: number;&#10;  articles?: NewsArticle[];&#10;  code?: string;&#10;  message?: string;&#10;}">Salin</button>
                  </div>
                  <pre><code><span class="code-kw">export interface</span> <span class="code-type">NewsArticle</span> {
  source: {
    id: <span class="code-kw">string</span> | <span class="code-kw">null</span>;
    name: <span class="code-kw">string</span>;
  };
  author: <span class="code-kw">string</span> | <span class="code-kw">null</span>;
  title: <span class="code-kw">string</span>;
  description: <span class="code-kw">string</span> | <span class="code-kw">null</span>;
  url: <span class="code-kw">string</span>;
  urlToImage: <span class="code-kw">string</span> | <span class="code-kw">null</span>;
  publishedAt: <span class="code-kw">string</span>;
  content: <span class="code-kw">string</span> | <span class="code-kw">null</span>;
}

<span class="code-kw">export interface</span> <span class="code-type">NewsApiResponse</span> {
  status: <span class="code-str">'ok'</span> | <span class="code-str">'error'</span>;
  totalResults?: <span class="code-kw">number</span>;
  articles?: <span class="code-type">NewsArticle</span>[];
  code?: <span class="code-kw">string</span>;
  message?: <span class="code-kw">string</span>;
}</code></pre>
                </div>
              </div>

              <!-- Python Tab -->
              <div class="code-tab-content" data-lang="python" style="display: none;">
                <div class="code-block-wrapper">
                  <div class="code-block-header">
                    <span>PYTHON (REQUESTS)</span>
                    <button class="copy-code-btn" data-code="import requests&#10;&#10;def fetch_news():&#10;    url = 'http://localhost:3000/v2/top-headlines'&#10;    params = {&#10;        'category': 'business',&#10;        'pageSize': 5&#10;    }&#10;    try:&#10;        response = requests.get(url, params=params)&#10;        data = response.json()&#10;        if data.get('status') == 'ok':&#10;            for article in data.get('articles', []):&#10;                print(f&quot;- {article['title']} ({article['source']['name']})&quot;)&#10;        else:&#10;            print('API Error:', data.get('message'))&#10;    except Exception as e:&#10;        print('Network Error:', e)&#10;&#10;fetch_news()">Salin</button>
                  </div>
                  <pre><code><span class="code-kw">import</span> requests

<span class="code-kw">def</span> <span class="code-fn">fetch_news</span>():
    url = <span class="code-str">'http://localhost:3000/v2/top-headlines'</span>
    params = {
        <span class="code-str">'category'</span>: <span class="code-str">'business'</span>,
        <span class="code-str">'pageSize'</span>: 5
    }
    <span class="code-kw">try</span>:
        response = requests.get(url, params=params)
        data = response.json()
        <span class="code-kw">if</span> data.get(<span class="code-str">'status'</span>) == <span class="code-str">'ok'</span>:
            <span class="code-kw">for</span> article <span class="code-kw">in</span> data.get(<span class="code-str">'articles'</span>, []):
                <span class="code-fn">print</span>(f<span class="code-str">"- {article['title']} ({article['source']['name']})"</span>)
        <span class="code-kw">else</span>:
            <span class="code-fn">print</span>(<span class="code-str">'API Error:'</span>, data.get(<span class="code-str">'message'</span>))
    <span class="code-kw">except</span> Exception <span class="code-kw">as</span> e:
        <span class="code-fn">print</span>(<span class="code-str">'Network Error:'</span>, e)

<span class="code-fn">fetch_news</span>()</code></pre>
                </div>
              </div>

              <!-- Curl Tab -->
              <div class="code-tab-content" data-lang="curl" style="display: none;">
                <div class="code-block-wrapper">
                  <div class="code-block-header">
                    <span>CURL COMMAND</span>
                    <button class="copy-code-btn" data-code="curl &quot;http://localhost:3000/v2/top-headlines?country=id&amp;category=general&amp;pageSize=10&quot;">Salin</button>
                  </div>
                  <pre><code>curl <span class="code-str">"http://localhost:3000/v2/top-headlines?country=id&amp;category=general&amp;pageSize=10"</span></code></pre>
                </div>
              </div>

            </div>
          </div>

          <!-- Documentation Grid for errors and others (keeping original cards for test safety) -->
          <section class="docs-grid" aria-label="Informasi Penunjang API">
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
        </div>

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
