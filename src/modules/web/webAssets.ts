export const appCss = `
:root {
  color-scheme: light;
  --ink: #111613;
  --muted: #5a6660;
  --line: #e2e8e4;
  --paper: #fbf9f4;
  --surface: #ffffff;
  --charcoal: #121815;
  --mint: #bada55;
  --tomato: #d33c20;
  --sky: #4facc1;
  --shadow: 0 16px 48px rgba(18, 24, 21, 0.06);
  --font-serif: "Lora", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", sans-serif;
  --font-display: "Playfair Display", Georgia, serif;
}

body.dark-theme {
  color-scheme: dark;
  --ink: #f1f5f3;
  --muted: #8e9e96;
  --line: #2e3b35;
  --paper: #0c0f0d;
  --surface: #131a16;
  --charcoal: #070908;
  --mint: #c6ea59;
  --tomato: #f05238;
  --sky: #6bcfe5;
  --shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  color: var(--ink);
  background: var(--paper);
  font-family: var(--font-sans);
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  overflow-x: hidden;
}

/* Subtle editorial grain background */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  content: "";
  opacity: 0.04;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

button,
input,
select {
  font: inherit;
}

code,
pre {
  font-family: "SFMono-Regular", "Cascadia Code", "Liberation Mono", monospace;
}

.api-shell {
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr);
  min-height: 100vh;
}

/* Left sidebar rail design */
.rail {
  position: sticky;
  top: 0;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: 100vh;
  padding: 28px;
  color: #f4f0df;
  background: var(--charcoal);
  border-right: 1px solid rgb(255 255 255 / 8%);
  z-index: 10;
}

.brand {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  color: var(--charcoal);
  background: var(--mint);
  border: 2px solid #f4f0df;
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  transition: transform 0.3s ease;
}

.brand:hover .brand-mark {
  transform: rotate(-5deg) scale(1.05);
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand small {
  margin-top: 2px;
  color: rgb(244 240 223 / 60%);
  font-size: 0.75rem;
}

.endpoint-nav {
  display: grid;
  gap: 10px;
}

/* Rail custom buttons styled as sidebar links */
.rail-tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  color: rgb(244 240 223 / 75%);
  background: transparent;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.rail-tab-btn:hover {
  color: #ffffff;
  border-color: var(--mint);
  background: rgba(255, 255, 255, 0.04);
  transform: translateX(4px);
}

.rail-tab-btn.active {
  color: var(--charcoal);
  background: var(--mint);
  border-color: var(--mint);
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(186, 218, 85, 0.25);
}

.rail-note {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: auto;
  padding: 14px;
  color: rgb(244 240 223 / 70%);
  background: rgb(255 255 255 / 4%);
  border: 1px solid rgb(255 255 255 / 6%);
  border-radius: 8px;
  font-size: 0.78rem;
  line-height: 1.4;
}

.pulse {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  margin-top: 4px;
  background: var(--mint);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgb(186 218 85 / 15%);
  animation: pulseAnim 2s infinite;
}

@keyframes pulseAnim {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgb(186 218 85 / 40%); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgb(186 218 85 / 0%); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgb(186 218 85 / 0%); }
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  color: #f4f0df;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s;
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #f4f0df;
}

/* Workspace wrapper */
.workspace {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 40px;
  height: 100vh;
  overflow-y: auto;
}

/* Multiview tab switching visibility */
.workspace-view {
  display: none;
  animation: viewFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.workspace-view.active {
  display: block;
}

@keyframes viewFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ================== NEWS PORTAL STYLES ================== */
.portal-header {
  border-bottom: 2px double var(--line);
  padding-bottom: 20px;
  margin-bottom: 24px;
  text-align: center;
}

.portal-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
  margin-bottom: 12px;
}

.portal-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pulse-green {
  display: inline-block;
  width: 7px;
  height: 7px;
  background: var(--tomato);
  border-radius: 50%;
  animation: pulseGreen 1.5s infinite;
}

@keyframes pulseGreen {
  0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(211, 60, 32, 0.4); }
  70% { transform: scale(1); box-shadow: 0 0 0 4px rgba(211, 60, 32, 0); }
  100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(211, 60, 32, 0); }
}

.portal-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  margin: 0;
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.portal-lead {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  margin: 8px 0 0;
  color: var(--muted);
}

/* Breaking News Ticker */
.ticker-wrap {
  display: flex;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  height: 40px;
  margin-bottom: 28px;
  box-shadow: var(--shadow);
}

.ticker-title {
  background: var(--tomato);
  color: white;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 0 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
}

.ticker-track {
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.ticker-items {
  display: flex;
  white-space: nowrap;
  animation: marquee 25s linear infinite;
  padding-left: 20px;
  gap: 40px;
}

.ticker-items:hover {
  animation-play-state: paused;
}

.ticker-item {
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
  color: var(--ink);
}

.ticker-item:hover {
  color: var(--tomato);
  text-decoration: underline;
}

@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

/* Controls Bar */
.portal-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.portal-categories {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.portal-cat-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--muted);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.portal-cat-btn:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.portal-cat-btn.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}

.portal-search {
  display: flex;
  gap: 8px;
  min-width: 280px;
}

.portal-search input {
  flex: 1;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 0.88rem;
  outline: none;
  transition: border 0.2s;
}

.portal-search input:focus {
  border-color: var(--ink);
}

.portal-search-btn {
  padding: 8px 16px;
  background: var(--ink);
  color: var(--paper);
  border: none;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
}

.portal-search-btn:hover {
  opacity: 0.9;
}

/* Featured Story Card (News Portal Headline) */
.featured-story-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 36px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(18, 24, 21, 0.12);
}

.featured-img-wrap {
  position: relative;
  overflow: hidden;
  min-height: 320px;
}

.featured-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-story-card:hover .featured-img-wrap img {
  transform: scale(1.03);
}

.featured-img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 800;
  color: white;
}

.featured-content {
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-meta {
  display: flex;
  gap: 12px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.featured-badge {
  color: var(--tomato);
}

.featured-time {
  color: var(--muted);
}

.featured-title {
  font-family: var(--font-display);
  font-size: 2.1rem;
  line-height: 1.15;
  margin: 0 0 16px 0;
  font-weight: 800;
}

.featured-desc {
  font-family: var(--font-serif);
  font-size: 1.02rem;
  line-height: 1.5;
  color: var(--muted);
  margin: 0 0 24px 0;
}

.featured-read-btn {
  width: max-content;
  padding: 10px 20px;
  background: var(--ink);
  color: var(--paper);
  border: none;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.featured-read-btn:hover {
  opacity: 0.9;
}

/* Regular Card Grid */
.portal-news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

.portal-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: var(--shadow);
}

.portal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(18, 24, 21, 0.09);
}

.card-img-wrap {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
  background: rgba(0,0,0,0.05);
}

.card-img-wrap img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.portal-card:hover .card-img-wrap img {
  transform: scale(1.04);
}

.card-img-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
}

.portal-card .card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.portal-card .card-meta {
  display: flex;
  gap: 10px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.portal-card .card-badge {
  color: var(--tomato);
}

.portal-card .card-time {
  color: var(--muted);
}

.portal-card .card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1.22;
  margin: 0 0 10px 0;
  font-weight: 800;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.portal-card .card-desc {
  font-family: var(--font-serif);
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--muted);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Gradients for image fallbacks */
.grad-1 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.grad-2 { background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%); }
.grad-3 { background: linear-gradient(135deg, #f35f5f 0%, #f7db70 100%); }
.grad-4 { background: linear-gradient(135deg, #13f1fc 0%, #0470dc 100%); }
.grad-5 { background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); }

/* Skeletons */
.skeleton .skeleton-shimmer {
  background: linear-gradient(90deg, var(--line) 25%, var(--paper) 50%, var(--line) 75%);
  background-size: 200% 100%;
  animation: loadingShimmer 1.5s infinite;
}

.skeleton .skeleton-badge {
  display: inline-block;
  width: 60px;
  height: 12px;
  border-radius: 4px;
}

.skeleton .skeleton-time {
  display: inline-block;
  width: 80px;
  height: 12px;
  border-radius: 4px;
}

.skeleton .skeleton-title {
  width: 90%;
  height: 18px;
  border-radius: 4px;
  margin-top: 10px;
}

.skeleton .skeleton-desc {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  margin-top: 10px;
}

@keyframes loadingShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}


/* ================== API CONSOLE & EXPLORER ================== */
.masthead {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--tomato);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

h1, h2, p {
  overflow-wrap: anywhere;
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.05;
  margin: 0;
  font-weight: 800;
}

h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
}

.lead {
  max-width: 720px;
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.6;
}

.endpoint-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  max-width: 620px;
  margin-top: 22px;
}

.stat-tile {
  min-width: 0;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
}

.stat-tile span,
.stat-tile small {
  display: block;
}

.stat-tile span {
  color: var(--ink);
  font-size: 1.2rem;
  font-weight: 900;
  line-height: 1.1;
}

.stat-tile small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 0.74rem;
  font-weight: 700;
}

.signal-card,
.panel,
.doc-card,
.docs-section-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.signal-card {
  position: relative;
  display: grid;
  align-content: end;
  min-height: 220px;
  padding: 24px;
  overflow: hidden;
}

.signal-card::before {
  position: absolute;
  inset: 18px 18px auto auto;
  width: 118px;
  height: 118px;
  content: "";
  background:
    linear-gradient(90deg, transparent 46%, var(--charcoal) 47% 53%, transparent 54%),
    linear-gradient(0deg, transparent 46%, var(--charcoal) 47% 53%, transparent 54%),
    var(--mint);
  border: 2px solid var(--charcoal);
  border-radius: 8px;
  transform: rotate(8deg);
}

.signal-card span,
.method {
  width: max-content;
  padding: 5px 8px;
  color: var(--charcoal);
  background: var(--mint);
  border-radius: 6px;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
}

.signal-card strong {
  display: block;
  margin-top: 24px;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.signal-card small {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 600;
}

.panel {
  margin-bottom: 32px;
  overflow: hidden;
}

.panel-heading {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 28px;
  border-bottom: 1px solid var(--line);
}

#request-url {
  display: block;
  padding: 8px 14px;
  color: var(--tomato);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  word-break: break-all;
}

.quick-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 18px 28px;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
}

.preset-chip {
  padding: 6px 12px;
  color: var(--muted);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-chip:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.preset-chip.active {
  color: var(--paper);
  background: var(--ink);
  border-color: var(--ink);
}

.request-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding: 28px;
  border-bottom: 1px solid var(--line);
}

.request-grid label {
  display: block;
}

.request-grid span {
  display: block;
  margin-bottom: 6px;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.request-grid select,
.request-grid input {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
}

.request-grid select:focus,
.request-grid input:focus {
  border-color: var(--ink);
}

.primary-action {
  grid-column: span 3;
  width: 100%;
  height: 48px;
  color: var(--charcoal);
  background: var(--mint);
  border: 1px solid var(--charcoal);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgb(216 243 93 / 16%);
  transition: all 0.2s;
}

.primary-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgb(216 243 93 / 28%);
}

.result-area {
  background: var(--paper);
}

.result-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.tab-group {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--paper);
  border-radius: 8px;
}

.tab-btn {
  padding: 8px 16px;
  color: var(--muted);
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  color: var(--ink);
  background: var(--surface);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.toolbar-status-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

#request-status {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--muted);
}

.ghost-action {
  padding: 8px 14px;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.ghost-action:hover {
  background: var(--surface);
  border-color: var(--ink);
}

.tab-content {
  padding: 28px;
  content-visibility: auto;
}

#response-output {
  margin: 0;
  padding: 24px;
  color: #c9d1d9;
  background: #0d1117;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.source-summary {
  padding: 18px 28px;
  background: var(--surface);
  border-top: 1px solid var(--line);
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.5;
}

.source-summary strong {
  color: var(--ink);
}

/* Custom Multiselect elements */
.custom-select-wrapper {
  position: relative;
}

.custom-select {
  position: relative;
  width: 100%;
}

.custom-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 0 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--ink);
  cursor: pointer;
  user-select: none;
  outline: none;
}

.custom-select-trigger:focus {
  border-color: var(--ink);
}

.select-chevron {
  flex: 0 0 auto;
  color: var(--muted);
  transition: transform 0.2s;
}

.custom-select.open .select-chevron {
  transform: rotate(180deg);
}

.custom-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: none;
}

.custom-select.open .custom-select-dropdown {
  display: block;
}

.custom-select-search-container {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid var(--line);
}

.dropdown-search-icon {
  color: var(--muted);
  margin-right: 8px;
  flex: 0 0 auto;
}

.custom-select-search-container input {
  border: none !important;
  height: auto !important;
  padding: 4px 0 !important;
  font-size: 0.85rem !important;
  background: transparent !important;
}

.custom-select-options {
  max-height: 220px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
}

.custom-select-option {
  padding: 10px 14px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  color: var(--ink);
}

.custom-select-option:hover {
  background: var(--paper);
}

.custom-select-option.selected {
  background: var(--mint);
  color: var(--charcoal);
  font-weight: 700;
}

.custom-select-group-header {
  padding: 8px 14px 4px;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--paper);
}

.custom-select-no-results {
  padding: 14px;
  font-size: 0.82rem;
  color: var(--muted);
  text-align: center;
}

/* Feed visual header */
.feed-header-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.feed-search-box {
  position: relative;
  width: 300px;
}

.feed-search-box .search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.feed-search-box input {
  width: 100%;
  height: 38px;
  padding: 0 12px 0 38px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 0.82rem;
  color: var(--ink);
  outline: none;
}

.feed-search-box input:focus {
  border-color: var(--ink);
}

.feed-language-filter {
  display: flex;
  gap: 6px;
}

.lang-tag {
  padding: 6px 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--muted);
}

.lang-tag:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.lang-tag.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}

/* Reader empty state */
.reader-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.reader-empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  background:
    radial-gradient(circle at 50% 50%, var(--mint) 30%, transparent 35%),
    linear-gradient(90deg, var(--line) 46%, var(--muted) 47% 53%, var(--line) 54%);
  background-size: 100% 100%, 8px 100%;
  border: 2px solid var(--line);
  border-radius: 50%;
  opacity: 0.7;
}

.reader-empty h3 {
  font-family: var(--font-display);
  font-size: 1.45rem;
  margin: 0 0 10px;
}

.reader-empty p {
  max-width: 420px;
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.news-feed-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

/* API Explorer Card */
.news-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.card-img-container {
  position: relative;
  padding-bottom: 52%;
  overflow: hidden;
  background: var(--paper);
}

.card-img-container img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-img-container.loading::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(90deg, var(--line) 25%, var(--paper) 50%, var(--line) 75%);
  background-size: 200% 100%;
  animation: loadingShimmer 1.5s infinite;
}

.card-body {
  display: flex;
  flex-direction: column;
  padding: 18px;
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.card-source-badge {
  color: var(--tomato);
}

.card-time {
  color: var(--muted);
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.25;
  margin: 0 0 10px;
  font-weight: 800;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--muted);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Footer load more button wrapper */
.feed-footer {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--ink);
}

.load-more-btn:hover {
  border-color: var(--ink);
  background: var(--paper);
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}


/* ================== API DOCUMENTATION VIEW ================== */
.docs-header {
  border-bottom: 1px solid var(--line);
  padding-bottom: 24px;
  margin-bottom: 32px;
}

.docs-section-card {
  padding: 32px;
  margin-bottom: 32px;
}

.docs-section-card h2 {
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 12px;
}

.endpoint-doc-item {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.endpoint-badge-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.endpoint-badge-wrap .method {
  font-size: 0.75rem;
  padding: 4px 10px;
}

.endpoint-path {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--tomato);
}

.endpoint-desc {
  font-family: var(--font-serif);
  font-size: 0.98rem;
  color: var(--muted);
  margin-top: 0;
  margin-bottom: 20px;
}

.param-title {
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 18px 0 8px 0;
  color: var(--ink);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.params-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.88rem;
}

.params-table th, 
.params-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
}

.params-table th {
  background: var(--paper);
  font-weight: 700;
  color: var(--ink);
}

.params-table tbody tr:last-child td {
  border-bottom: none;
}

.params-table code {
  color: var(--tomato);
  font-size: 0.82rem;
  font-weight: 700;
}

/* Code Group Tabs */
.code-group-tabs {
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
}

.code-tab-header {
  display: flex;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  padding: 0 10px;
}

.code-tab-btn {
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #8b949e;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.code-tab-btn:hover {
  color: #c9d1d9;
}

.code-tab-btn.active {
  color: var(--mint);
  border-bottom-color: var(--mint);
}

.code-tab-content {
  padding: 20px;
}

.code-block-wrapper {
  position: relative;
  background: #0d1117;
  border-radius: 6px;
}

.code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #161b22;
  border-radius: 6px 6px 0 0;
  font-size: 0.72rem;
  font-weight: 700;
  color: #8b949e;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #21262d;
}

.copy-code-btn {
  padding: 4px 8px;
  background: #21262d;
  border: 1px solid #30363d;
  color: #c9d1d9;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 600;
}

.copy-code-btn:hover {
  background: #30363d;
}

.code-block-wrapper pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #c9d1d9;
}

/* Code highlight syntax elements */
.code-kw { color: #ff7b72; font-weight: bold; }
.code-fn { color: #d2a8ff; }
.code-str { color: #a5d6ff; }
.code-type { color: #ff9b5e; }

.docs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.doc-card {
  padding: 24px;
}

.doc-card h2 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin: 12px 0 8px;
  font-weight: 800;
}

.doc-card p {
  margin: 0 0 16px;
  color: var(--muted);
  font-size: 0.85rem;
  line-height: 1.5;
}

.doc-card pre {
  margin: 0;
  padding: 12px 14px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.78rem;
  overflow-x: auto;
  word-break: break-all;
  white-space: pre-wrap;
}

.error-method {
  background: var(--tomato);
  color: white;
}


/* ================== IMMERSIVE READER MODAL ================== */
.reader-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.reader-modal[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
}

.reader-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(18, 24, 21, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.reader-modal-container {
  position: relative;
  width: min(820px, 95vw);
  height: 90vh;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 32px 96px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;
  transform: translateY(24px) scale(0.98);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.reader-modal[aria-hidden="false"] .reader-modal-container {
  transform: translateY(0) scale(1);
}

.reader-control-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
  flex: 0 0 auto;
}

.reader-ctrl-left {
  display: flex;
  align-items: center;
}

.close-reader-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.close-reader-btn:hover {
  border-color: var(--ink);
  background: var(--surface);
}

.reader-ctrl-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ctrl-btn {
  padding: 8px 12px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--ink);
}

.ctrl-btn:hover {
  border-color: var(--ink);
  background: var(--surface);
}

.tts-group {
  display: flex;
  gap: 4px;
}

.tts-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tts-stop-btn {
  color: var(--tomato);
  border-color: rgba(211, 60, 32, 0.2);
}

.font-sizer {
  display: flex;
  gap: 2px;
}

.font-btn {
  padding: 6px 10px;
}

.reader-themes {
  display: flex;
  gap: 6px;
  padding-left: 6px;
  border-left: 1px solid var(--line);
}

.theme-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
}

.theme-dot:hover {
  transform: scale(1.15);
}

.theme-dot.active {
  border-color: var(--tomato);
}

.theme-dot-light { background: #ffffff; border: 1px solid #d8ded6; }
.theme-dot-sepia { background: #f4ecd8; }
.theme-dot-dark { background: #1a1a1a; }

.reader-progress-wrapper {
  height: 3px;
  width: 100%;
  background: var(--line);
  position: relative;
  flex: 0 0 auto;
}

.reader-progress-fill {
  height: 100%;
  width: 0%;
  background: var(--tomato);
  transition: width 0.1s;
}

.reader-scroll-area {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 40px 60px;
}

.reader-body {
  max-width: 660px;
  margin: 0 auto;
}

/* Reader Typography Styles */
.reader-body.serif-font {
  font-family: var(--font-serif);
}

.reader-body.sans-font {
  font-family: var(--font-sans);
}

/* Reader Themes */
.reader-body.theme-light {
  --reader-bg: var(--surface);
  --reader-ink: var(--ink);
  --reader-muted: var(--muted);
}

.reader-body.theme-sepia {
  --reader-bg: #f4ecd8;
  --reader-ink: #3c3220;
  --reader-muted: #6e6046;
}

.reader-body.theme-dark {
  --reader-bg: #12161a;
  --reader-ink: #e3e8ec;
  --reader-muted: #94a3b0;
}

.reader-scroll-area:has(.theme-sepia) { background: #f4ecd8; }
.reader-scroll-area:has(.theme-dark) { background: #12161a; }
.reader-scroll-area:has(.theme-light) { background: var(--surface); }

.reader-article-meta {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--reader-muted);
  margin-bottom: 12px;
}

.reader-article-source {
  color: var(--tomato);
}

.reader-article-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 2.8rem);
  line-height: 1.15;
  color: var(--reader-ink);
  margin: 0 0 16px 0;
  font-weight: 800;
}

.reader-article-author {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--reader-muted);
  margin-bottom: 24px;
  border-bottom: 1px dashed var(--line);
  padding-bottom: 14px;
}

.reader-article-img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 24px;
  object-fit: cover;
  max-height: 360px;
}

.article-lead {
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 600;
  color: var(--reader-ink);
  margin-bottom: 24px;
}

.article-body-p {
  font-size: var(--article-font-size, 18px);
  line-height: 1.68;
  color: var(--reader-ink);
  margin-bottom: 20px;
}

.original-link-btn {
  display: inline-block;
  padding: 12px 28px;
  background: var(--tomato);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(211, 60, 32, 0.2);
  transition: all 0.2s;
}

.original-link-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(211, 60, 32, 0.35);
}


/* ================== RESPONSIVE MEDIA QUERIES ================== */
@media (max-width: 1024px) {
  .api-shell {
    grid-template-columns: 1fr;
  }
  
  .rail {
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid var(--line);
    padding: 20px;
    gap: 16px;
  }
  
  .endpoint-nav {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  
  .workspace {
    padding: 24px;
    height: auto;
    overflow-y: visible;
  }
}

@media (max-width: 768px) {
  .masthead {
    grid-template-columns: 1fr;
  }
  
  .featured-story-card {
    grid-template-columns: 1fr;
  }
  
  .featured-img-wrap {
    min-height: 220px;
  }
  
  .featured-content {
    padding: 24px;
  }
  
  .request-grid {
    grid-template-columns: 1fr;
  }
  
  .primary-action {
    grid-column: span 1;
  }
  
  .news-feed-grid {
    grid-template-columns: 1fr;
  }
  
  .docs-grid {
    grid-template-columns: 1fr;
  }
  
  .reader-scroll-area {
    padding: 24px;
  }
}

@media (max-width: 520px) {
  .endpoint-nav {
    grid-template-columns: 1fr;
  }
  
  .portal-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .portal-search {
    min-width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export const appJs = `
// Tab View Switcher Variables
const tabPortal = document.querySelector("#tab-portal");
const tabConsole = document.querySelector("#tab-console");
const tabDocs = document.querySelector("#tab-docs");

const viewPortal = document.querySelector("#view-portal");
const viewConsole = document.querySelector("#view-console");
const viewDocs = document.querySelector("#view-docs");

function switchView(viewName) {
  if (tabPortal) tabPortal.classList.toggle("active", viewName === "portal");
  if (tabConsole) tabConsole.classList.toggle("active", viewName === "console");
  if (tabDocs) tabDocs.classList.toggle("active", viewName === "docs");
  
  if (viewPortal) viewPortal.classList.toggle("active", viewName === "portal");
  if (viewConsole) viewConsole.classList.toggle("active", viewName === "console");
  if (viewDocs) viewDocs.classList.toggle("active", viewName === "docs");

  // Scroll workspace to top
  const workspace = document.querySelector(".workspace");
  if (workspace) workspace.scrollTop = 0;
}

if (tabPortal) tabPortal.addEventListener("click", () => switchView("portal"));
if (tabConsole) tabConsole.addEventListener("click", () => switchView("console"));
if (tabDocs) tabDocs.addEventListener("click", () => switchView("docs"));

// Set Live Date in Portal Header
function updateLiveDate() {
  const dateEl = document.querySelector("#live-date");
  if (!dateEl) return;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = new Date().toLocaleDateString('id-ID', options);
}
updateLiveDate();

// API Explorer Form and Elements
const form = document.querySelector("#api-form");
const endpoint = document.querySelector("#endpoint");
const category = document.querySelector("#category");
const query = document.querySelector("#q");
const sourcesInput = document.querySelector("#sourcesInput");
const languageSelect = document.querySelector("#languageSelect");
const pageSize = document.querySelector("#pageSize");
const requestUrl = document.querySelector("#request-url");
const requestStatus = document.querySelector("#request-status");
const responseOutput = document.querySelector("#response-output");
const copyUrl = document.querySelector("#copy-url");
const sourceSummary = document.querySelector("#source-summary");
const quickPresets = document.querySelector(".quick-presets");
const presetButtons = document.querySelectorAll(".preset-chip");
const statSources = document.querySelector("#stat-sources");
const statResults = document.querySelector("#stat-results");
const statCache = document.querySelector("#stat-cache");

// Tab Switcher Elements
const tabBtnReader = document.querySelector("#tab-btn-reader");
const tabBtnJson = document.querySelector("#tab-btn-json");
const tabContentReader = document.querySelector("#tab-content-reader");
const tabContentJson = document.querySelector("#tab-content-json");

// News Feed Elements
const newsFeedGrid = document.querySelector("#news-feed-grid");
const readerEmpty = document.querySelector("#reader-empty");
const feedHeaderBar = document.querySelector("#feed-header-bar");
const feedSearchInput = document.querySelector("#feed-search-input");
const langTags = document.querySelectorAll(".lang-tag");
const loadMoreBtn = document.querySelector("#load-more-btn");
const feedFooter = document.querySelector("#feed-footer");

// Immersive Reader Modal Elements
const readerModal = document.querySelector("#reader-modal");
const readerOverlay = document.querySelector("#reader-modal-overlay");
const closeReader = document.querySelector("#close-reader");
const readerBody = document.querySelector("#reader-article-body");
const progressFill = document.querySelector("#reader-progress-fill");
const scrollArea = document.querySelector(".reader-scroll-area");

// Reader Control Elements
const ttsPlayBtn = document.querySelector("#tts-play");
const ttsStopBtn = document.querySelector("#tts-stop");
const ttsBtnText = document.querySelector("#tts-btn-text");
const btnFontDec = document.querySelector("#btn-font-dec");
const btnFontInc = document.querySelector("#btn-font-inc");
const btnFontFamily = document.querySelector("#btn-font-family");
const themeDots = document.querySelectorAll(".theme-dot");

// Global Dark Mode Theme Toggle
const themeToggleBtn = document.querySelector("#global-theme-toggle");
const themeBtnText = document.querySelector("#theme-btn-text");
const sunIcon = themeToggleBtn ? themeToggleBtn.querySelector(".sun-icon") : null;
const moonIcon = themeToggleBtn ? themeToggleBtn.querySelector(".moon-icon") : null;

function applySavedGlobalTheme() {
  if (!themeToggleBtn) return;
  const savedTheme = localStorage.getItem("global-theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (sunIcon) sunIcon.style.display = "inline-block";
    if (moonIcon) moonIcon.style.display = "none";
    if (themeBtnText) themeBtnText.textContent = "Mode Terang";
  } else {
    document.body.classList.remove("dark-theme");
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "inline-block";
    if (themeBtnText) themeBtnText.textContent = "Mode Gelap";
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    if (isDark) {
      localStorage.setItem("global-theme", "dark");
      if (sunIcon) sunIcon.style.display = "inline-block";
      if (moonIcon) moonIcon.style.display = "none";
      if (themeBtnText) themeBtnText.textContent = "Mode Terang";
    } else {
      localStorage.setItem("global-theme", "light");
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "inline-block";
      if (themeBtnText) themeBtnText.textContent = "Mode Gelap";
    }
  });
}

applySavedGlobalTheme();

let availableSources = [];
let currentArticles = [];
let activeArticle = null;
let ttsUtterance = null;
let isTtsPlaying = false;
let isTtsPaused = false;

// Query and Pagination State
let currentQueryUrl = "";
let currentPage = 1;
let totalResults = 0;
let selectedLanguage = "all";
let activeFeedArticles = [];
let activeRequestController = null;

// Caching options
const apiCache = new Map();
const CACHE_TTL_MS = 60000; // 1 minute client-side cache

// Reader Typography Options
let currentFontSize = 18; // default in px
let isSerif = true;
let currentTheme = "light";

function setRequestStatus(message) {
  requestStatus.textContent = message;
  if (statCache) {
    statCache.textContent = message;
  }
}

function updateEndpointStats(payload) {
  if (statSources) {
    statSources.textContent =
      availableSources.length === 0 ? "--" : String(availableSources.length);
  }

  if (statResults) {
    const resultCount = payload && typeof payload.totalResults === "number"
      ? payload.totalResults
      : activeFeedArticles.length;
    statResults.textContent = String(resultCount);
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function buildRequestPath() {
  const path = endpoint.value;
  const params = new URLSearchParams();

  if (path === "/v2/top-headlines") {
    params.set("country", "id");
    params.set("category", category.value);
    params.set("sources", sourcesInput.value);
  }

  if (path === "/v2/everything") {
    if (query.value.trim() !== "") {
      params.set("q", query.value.trim());
    }
    params.set("sources", sourcesInput.value);
  }

  if (path !== "/v2/top-headlines/sources") {
    if (languageSelect.value !== "all") {
      params.set("language", languageSelect.value);
    }
    if (pageSize.value.trim() !== "") {
      params.set("pageSize", pageSize.value.trim());
    }
  }

  const queryString = params.toString();
  return queryString === "" ? path : path + "?" + queryString;
}

function syncRequestUrl() {
  requestUrl.textContent = buildRequestPath();
}

function syncFields() {
  const path = endpoint.value;
  const showCategory = path === "/v2/top-headlines";
  const showSearch = path === "/v2/everything";
  const showSources = path !== "/v2/top-headlines/sources";
  const showPageSize = path !== "/v2/top-headlines/sources";
  const showLanguage = path !== "/v2/top-headlines/sources";

  category.closest("label").hidden = !showCategory;
  query.closest("label").hidden = !showSearch;
  sourcesInput.closest("label").hidden = !showSources;
  languageSelect.closest("label").hidden = !showLanguage;
  pageSize.closest("label").hidden = !showPageSize;
  syncRequestUrl();
}

function applyPreset(preset) {
  presetButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.preset === preset);
  });

  sourcesInput.value = "all";
  languageSelect.value = "all";
  pageSize.value = "12";

  if (preset === "tech") {
    endpoint.value = "/v2/top-headlines";
    category.value = "technology";
    query.value = "";
  } else if (preset === "business") {
    endpoint.value = "/v2/top-headlines";
    category.value = "business";
    query.value = "";
  } else if (preset === "search") {
    endpoint.value = "/v2/everything";
    category.value = "all";
    query.value = "ekonomi";
  } else {
    endpoint.value = "/v2/top-headlines";
    category.value = "all";
    query.value = "";
  }

  const selectedText = document.querySelector("#selected-source-text");
  if (selectedText) {
    selectedText.textContent = "Semua media";
  }

  const customSelect = document.querySelector("#custom-sources-select");
  if (customSelect) {
    customSelect.querySelectorAll(".custom-select-option").forEach((option) => {
      option.classList.toggle(
        "selected",
        option.getAttribute("data-value") === "all",
      );
    });
  }

  syncFields();
}

export async function loadSources() {
  try {
    const response = await fetch("/v2/top-headlines/sources");
    const payload = await response.json();
    availableSources = payload.sources ?? [];

    const optionsContainer = document.querySelector("#custom-sources-options");
    if (!optionsContainer) return;
    optionsContainer.innerHTML = "";

    // Add "Semua media"
    const allOption = document.createElement("li");
    allOption.className = "custom-select-option selected";
    allOption.setAttribute("data-value", "all");
    allOption.textContent = "Semua media";
    optionsContainer.appendChild(allOption);

    // Group elements
    const idSources = availableSources.filter(s => s.language !== "en");
    const enSources = availableSources.filter(s => s.language === "en");

    if (idSources.length > 0) {
      const idHeader = document.createElement("div");
      idHeader.className = "custom-select-group-header";
      idHeader.setAttribute("data-group", "id");
      idHeader.textContent = "🇮🇩 Bahasa Indonesia";
      optionsContainer.appendChild(idHeader);

      idSources.forEach(source => {
        const opt = document.createElement("li");
        opt.className = "custom-select-option";
        opt.setAttribute("data-value", source.id);
        opt.setAttribute("data-group", "id");
        opt.textContent = source.name + " - " + source.category;
        optionsContainer.appendChild(opt);
      });
    }

    if (enSources.length > 0) {
      const enHeader = document.createElement("div");
      enHeader.className = "custom-select-group-header";
      enHeader.setAttribute("data-group", "en");
      enHeader.textContent = "🇬🇧 English";
      optionsContainer.appendChild(enHeader);

      enSources.forEach(source => {
        const opt = document.createElement("li");
        opt.className = "custom-select-option";
        opt.setAttribute("data-value", source.id);
        opt.setAttribute("data-group", "en");
        opt.textContent = source.name + " - " + source.category;
        optionsContainer.appendChild(opt);
      });
    }

    const sourceCountStr = availableSources.length + " media";
    sourceSummary.innerHTML = "Backend registry memuat <strong>" + sourceCountStr + "</strong> terdaftar.";
    updateEndpointStats();
  } catch (error) {
    sourceSummary.textContent = "Gagal memuat media: " + (error instanceof Error ? error.message : String(error));
  }
}

// Custom select dropdown interactions
const selectTrigger = document.querySelector(".custom-select-trigger");
const customSelect = document.querySelector(".custom-select");
const searchInput = document.querySelector("#sources-search-input");
const optionsList = document.querySelector("#custom-sources-options");

if (selectTrigger) {
  selectTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    customSelect.classList.toggle("open");
    if (customSelect.classList.contains("open") && searchInput) {
      searchInput.focus();
    }
  });

  selectTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      customSelect.classList.toggle("open");
      if (customSelect.classList.contains("open") && searchInput) {
        searchInput.focus();
      }
    }
  });
}

document.addEventListener("click", () => {
  if (customSelect) customSelect.classList.remove("open");
});

if (searchInput) {
  searchInput.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  searchInput.addEventListener("input", (e) => {
    const filter = e.target.value.toLowerCase().trim();
    const options = optionsList.querySelectorAll(".custom-select-option");
    const headers = optionsList.querySelectorAll(".custom-select-group-header");
    let hasResults = false;

    // Remove existing "no results" message
    const existingNoRes = optionsList.querySelector(".custom-select-no-results");
    if (existingNoRes) existingNoRes.remove();

    options.forEach(opt => {
      const txt = opt.textContent.toLowerCase();
      const match = txt.includes(filter);
      opt.style.display = match ? "block" : "none";
      if (match) hasResults = true;
    });

    headers.forEach(h => {
      const group = h.getAttribute("data-group");
      const matchedCount = optionsList.querySelectorAll(".custom-select-option[data-group='" + group + "']:not([style*='display: none'])").length;
      h.style.display = matchedCount > 0 ? "block" : "none";
    });

    if (!hasResults && filter !== "") {
      const noRes = document.createElement("div");
      noRes.className = "custom-select-no-results";
      noRes.textContent = "Media tidak ditemukan";
      optionsList.appendChild(noRes);
    }
  });
}

if (optionsList) {
  optionsList.addEventListener("click", (e) => {
    const item = e.target.closest(".custom-select-option");
    if (!item) return;

    const val = item.getAttribute("data-value");
    const label = item.textContent.split(" - ")[0];

    sourcesInput.value = val;
    const selectedSourceText = document.querySelector("#selected-source-text");
    if (selectedSourceText) selectedSourceText.textContent = label;

    optionsList.querySelectorAll(".custom-select-option").forEach(opt => {
      opt.classList.toggle("selected", opt === item);
    });

    customSelect.classList.remove("open");
    syncRequestUrl();
  });
}

// Tab reader vs json switcher in playground results
function switchTab(tab) {
  if (tab === "reader") {
    tabBtnReader.classList.add("active");
    tabBtnReader.setAttribute("aria-selected", "true");
    tabBtnJson.classList.remove("active");
    tabBtnJson.setAttribute("aria-selected", "false");
    tabContentReader.style.display = "block";
    tabContentJson.style.display = "none";
  } else {
    tabBtnReader.classList.remove("active");
    tabBtnReader.setAttribute("aria-selected", "false");
    tabBtnJson.classList.add("active");
    tabBtnJson.setAttribute("aria-selected", "true");
    tabContentReader.style.display = "none";
    tabContentJson.style.display = "block";
  }
}

tabBtnReader.addEventListener("click", () => switchTab("reader"));
tabBtnJson.addEventListener("click", () => switchTab("json"));

// Format ISO date to human relative format
function formatRelativeTime(isoString) {
  if (!isoString) return "Baru saja";
  try {
    const published = new Date(isoString);
    const now = new Date();
    const diffMs = now - published;

    if (isNaN(diffMs) || diffMs < 0) return "Baru saja";

    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return diffMins <= 1 ? "1 menit lalu" : diffMins + " menit lalu";

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return diffHours <= 1 ? "1 jam lalu" : diffHours + " jam lalu";

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays <= 7) return diffDays <= 1 ? "Kemarin" : diffDays + " hari lalu";

    // Format fallback date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return published.toLocaleDateString('id-ID', options);
  } catch (err) {
    return "Baru saja";
  }
}

// Apply visual filters on raw console articles array
function applyFiltersAndRender() {
  let filtered = [...activeFeedArticles];

  // Apply visual search query filter inside feed
  const queryVal = feedSearchInput.value.toLowerCase().trim();
  if (queryVal !== "") {
    filtered = filtered.filter(art => {
      const matchTitle = (art.title || "").toLowerCase().includes(queryVal);
      const matchDesc = (art.description || "").toLowerCase().includes(queryVal);
      const matchContent = (art.content || "").toLowerCase().includes(queryVal);
      return matchTitle || matchDesc || matchContent;
    });
  }

  // Apply language tags filtering
  if (selectedLanguage !== "all") {
    filtered = filtered.filter(art => {
      const lang = art.language || "id";
      return lang === selectedLanguage;
    });
  }

  // Handle load-more pagination
  const articlesCountToRender = Math.min(currentPage * 10, filtered.length);
  const articlesToRender = filtered.slice(0, articlesCountToRender);

  renderArticles(articlesToRender);

  // Toggle load more visibility
  if (filtered.length > articlesCountToRender) {
    feedFooter.style.display = "flex";
  } else {
    feedFooter.style.display = "none";
  }
}

loadMoreBtn.addEventListener("click", () => {
  const spinner = loadMoreBtn.querySelector(".spinner");
  const btnTxt = loadMoreBtn.querySelector("span");
  if (spinner) spinner.style.display = "inline-block";
  if (btnTxt) btnTxt.textContent = "Loading...";

  setTimeout(() => {
    currentPage += 1;
    applyFiltersAndRender();
    if (spinner) spinner.style.display = "none";
    if (btnTxt) btnTxt.textContent = "Muat Lebih Banyak";
  }, 350);
});

// Search input within visual console feed
feedSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Check if query exists in feed, otherwise we query the everything endpoint
    const queryVal = feedSearchInput.value.trim();
    if (queryVal !== "" && activeFeedArticles.length > 0) {
      const matchInFeed = activeFeedArticles.some(art =>
        (art.title || "").toLowerCase().includes(queryVal.toLowerCase()) ||
        (art.description || "").toLowerCase().includes(queryVal.toLowerCase())
      );
      if (!matchInFeed) {
        // Run full backend search instead
        endpoint.value = "/v2/everything";
        query.value = queryVal;
        syncFields();
        form.requestSubmit();
        return;
      }
    }
    currentPage = 1;
    applyFiltersAndRender();
  }
});

// Lang Filter Tags inside console Visual Feed
langTags.forEach(tag => {
  tag.addEventListener("click", () => {
    langTags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");
    selectedLanguage = tag.dataset.lang;
    applyFiltersAndRender();
  });
});

// Render skeletons shimmer loaders during active requests
function renderSkeletons() {
  newsFeedGrid.textContent = "";
  readerEmpty.style.display = "none";
  newsFeedGrid.style.display = "grid";
  
  for (let i = 0; i < 6; i++) {
    const card = document.createElement("article");
    card.className = "news-card skeleton";
    
    const imgContainer = document.createElement("div");
    imgContainer.className = "card-img-container skeleton-shimmer";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    const meta = document.createElement("div");
    meta.className = "card-meta";
    
    const badge = document.createElement("span");
    badge.className = "skeleton-badge skeleton-shimmer";
    
    const time = document.createElement("span");
    time.className = "skeleton-time skeleton-shimmer";
    
    meta.appendChild(badge);
    meta.appendChild(time);
    
    const title1 = document.createElement("div");
    title1.className = "skeleton-title skeleton-shimmer";
    
    const title2 = document.createElement("div");
    title2.className = "skeleton-title skeleton-shimmer";
    title2.style.width = "75%";
    
    const desc1 = document.createElement("div");
    desc1.className = "skeleton-desc skeleton-shimmer";
    
    cardBody.appendChild(meta);
    cardBody.appendChild(title1);
    cardBody.appendChild(title2);
    cardBody.appendChild(desc1);
    
    card.appendChild(imgContainer);
    card.appendChild(cardBody);
    
    newsFeedGrid.appendChild(card);
  }
}

// Render visual articles cards
function renderArticles(articles) {
  newsFeedGrid.textContent = "";
  
  if (!articles || articles.length === 0) {
    newsFeedGrid.style.display = "none";
    readerEmpty.style.display = "flex";
    readerEmpty.querySelector("h3").textContent = "Tidak ada berita ditemukan";
    readerEmpty.querySelector("p").textContent = "Coba ubah kata kunci pencarian atau pilih kategori media yang lain.";
    return;
  }
  
  readerEmpty.style.display = "none";
  newsFeedGrid.style.display = "grid";
  
  articles.forEach((article, index) => {
    const card = document.createElement("article");
    card.className = "news-card";
    
    // Image container
    const imgContainer = document.createElement("div");
    imgContainer.className = "card-img-container";
    
    const sourceName = (article.source && article.source.name) || "Media";
    const cleanTitle = article.title || "Tanpa Judul";
    
    if (article.urlToImage) {
      const img = document.createElement("img");
      imgContainer.className = "card-img-container loading";
      img.src = article.urlToImage;
      img.alt = cleanTitle;
      img.loading = "lazy";
      img.decoding = "async";
      img.onload = () => {
        imgContainer.classList.remove("loading");
      };
      img.onerror = () => {
        imgContainer.classList.remove("loading");
        imgContainer.innerHTML = '<div class="card-img-fallback grad-' + ((index % 5) + 1) + '">' + sourceName[0] + '</div>';
      };
      imgContainer.appendChild(img);
    } else {
      imgContainer.innerHTML = '<div class="card-img-fallback grad-' + ((index % 5) + 1) + '">' + sourceName[0] + '</div>';
    }
    
    // Body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    const meta = document.createElement("div");
    meta.className = "card-meta";
    
    const sourceBadge = document.createElement("span");
    sourceBadge.className = "card-source-badge";
    sourceBadge.textContent = sourceName;
    
    const timeText = document.createElement("span");
    timeText.className = "card-time";
    timeText.textContent = formatRelativeTime(article.publishedAt);
    
    meta.appendChild(sourceBadge);
    meta.appendChild(timeText);
    
    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = cleanTitle;
    
    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = article.description || "Klik untuk membaca selengkapnya.";
    
    cardBody.appendChild(meta);
    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    
    card.appendChild(imgContainer);
    card.appendChild(cardBody);
    
    card.addEventListener("click", () => {
      openReaderModal(article);
    });
    
    newsFeedGrid.appendChild(card);
  });
}

// Immersive Reader Modal Actions
function openReaderModal(article) {
  activeArticle = article;
  stopTts();
  
  const sourceName = (article.source && article.source.name) || "Media Indonesia";
  const formattedTime = formatRelativeTime(article.publishedAt);
  const authorText = article.author ? "Oleh: " + article.author : "Redaksi Beritaku";
  const titleText = escapeHtml(article.title || "Tanpa Judul");
  const sourceText = escapeHtml(sourceName);
  const safeUrl = escapeAttribute(article.url || "#");
  
  let contentHtml = "";
  contentHtml += '<div class="reader-article-meta">';
  contentHtml += '  <span class="reader-article-source">' + sourceText + '</span>';
  contentHtml += '  <span>' + escapeHtml(formattedTime) + '</span>';
  contentHtml += '</div>';
  contentHtml += '<h1 class="reader-article-title">' + titleText + '</h1>';
  contentHtml += '<div class="reader-article-author">' + escapeHtml(authorText) + '</div>';
  
  if (article.urlToImage) {
    contentHtml += '<img class="reader-article-img" src="' + escapeAttribute(article.urlToImage) + '" alt="' + titleText + '" loading="lazy" decoding="async" onerror="this.style.display=\\'none\\';" />';
  }
  
  if (article.description) {
    contentHtml += '<p class="article-lead">' + escapeHtml(article.description) + '</p>';
  }
  
  if (article.content) {
    // Clean trailing bracket [+123 chars] from NewsAPI content response
    const cleanContent = article.content.replace(/\\s*\\[\\+\\d+\\s+chars\\]$/, "");
    if (cleanContent.trim() && cleanContent !== article.description) {
      const paragraphs = cleanContent.split(/\\n+/).filter(p => p.trim());
      paragraphs.forEach(p => {
        contentHtml += '<p class="article-body-p">' + escapeHtml(p) + '</p>';
      });
    }
  } else if (!article.description) {
    contentHtml += '<p class="article-body-p">Konten teks lengkap tidak tersedia untuk artikel ini.</p>';
  }
  
  contentHtml += '<div style="margin-top: 40px; text-align: center;">';
  contentHtml += '  <a class="original-link-btn" href="' + safeUrl + '" target="_blank" rel="noopener noreferrer">';
  contentHtml += '    Baca Selengkapnya di ' + sourceText + ' ↗';
  contentHtml += '  </a>';
  contentHtml += '</div>';
  
  readerBody.innerHTML = contentHtml;
  
  // Set reader styling values
  readerBody.className = "reader-body " + (isSerif ? "serif-font" : "sans-font") + " theme-" + currentTheme;
  readerBody.style.setProperty("--article-font-size", currentFontSize + "px");
  
  // Sync dots
  themeDots.forEach(d => {
    d.classList.toggle("active", d.dataset.theme === currentTheme);
  });
  
  // Open modal
  readerModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  
  // Reset scroll
  scrollArea.scrollTop = 0;
  progressFill.style.width = "0%";
}

function closeReaderModal() {
  stopTts();
  readerModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeArticle = null;
}

closeReader.addEventListener("click", closeReaderModal);
readerOverlay.addEventListener("click", closeReaderModal);

// Track modal scroll to draw top progress line
scrollArea.addEventListener("scroll", () => {
  const scrollH = scrollArea.scrollHeight - scrollArea.clientHeight;
  if (scrollH > 0) {
    const pct = (scrollArea.scrollTop / scrollH) * 100;
    progressFill.style.width = pct + "%";
  }
});

// Font Sizer actions
btnFontDec.addEventListener("click", () => {
  if (currentFontSize > 14) {
    currentFontSize -= 2;
    readerBody.style.setProperty("--article-font-size", currentFontSize + "px");
  }
});

btnFontInc.addEventListener("click", () => {
  if (currentFontSize < 28) {
    currentFontSize += 2;
    readerBody.style.setProperty("--article-font-size", currentFontSize + "px");
  }
});

// Font toggle Sans vs Serif
btnFontFamily.addEventListener("click", () => {
  isSerif = !isSerif;
  if (isSerif) {
    readerBody.classList.remove("sans-font");
    readerBody.classList.add("serif-font");
    btnFontFamily.textContent = "Serif";
  } else {
    readerBody.classList.remove("serif-font");
    readerBody.classList.add("sans-font");
    btnFontFamily.textContent = "Sans";
  }
});

// Theme switches
themeDots.forEach(dot => {
  dot.addEventListener("click", () => {
    themeDots.forEach(d => d.classList.remove("active"));
    dot.classList.add("active");
    currentTheme = dot.dataset.theme;
    
    // remove previous themes classes
    readerBody.classList.remove("theme-light", "theme-sepia", "theme-dark");
    readerBody.classList.add("theme-" + currentTheme);
  });
});

// TTS Speech Synthesis Engine
function playTts() {
  if (!activeArticle) return;
  
  // Pause resume handling
  if (isTtsPlaying && isTtsPaused) {
    window.speechSynthesis.resume();
    isTtsPaused = false;
    toggleTtsUI(true);
    return;
  }
  
  window.speechSynthesis.cancel();
  
  // Collate text to speak
  const sourceName = (activeArticle.source && activeArticle.source.name) || "Media";
  const title = activeArticle.title || "";
  const desc = activeArticle.description || "";
  const content = activeArticle.content ? activeArticle.content.replace(/\\s*\\[\\+\\d+\\s+chars\\]$/, "") : "";
  
  const textChunks = [
    "Artikel berita dari " + sourceName,
    title,
    desc,
    content
  ].filter(t => t.trim() !== "");
  
  const utteranceText = textChunks.join(". ");
  ttsUtterance = new SpeechSynthesisUtterance(utteranceText);
  
  // Try to find indonesian voice if available
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(v => v.lang.startsWith("id") || v.lang.includes("ID"));
  if (idVoice) {
    ttsUtterance.voice = idVoice;
  }
  
  ttsUtterance.onend = () => {
    stopTts();
  };
  
  ttsUtterance.onerror = () => {
    stopTts();
  };
  
  isTtsPlaying = true;
  isTtsPaused = false;
  window.speechSynthesis.speak(ttsUtterance);
  toggleTtsUI(true);
}

function pauseTts() {
  if (isTtsPlaying && !isTtsPaused) {
    window.speechSynthesis.pause();
    isTtsPaused = true;
    toggleTtsUI(false);
  }
}

function stopTts() {
  window.speechSynthesis.cancel();
  isTtsPlaying = false;
  isTtsPaused = false;
  toggleTtsUI(false);
}

function toggleTtsUI(active) {
  const playIcon = ttsPlayBtn.querySelector(".tts-play-icon");
  const pauseIcon = ttsPlayBtn.querySelector(".tts-pause-icon");
  
  if (active) {
    if (playIcon) playIcon.style.display = "none";
    if (pauseIcon) pauseIcon.style.display = "inline-block";
    ttsBtnText.textContent = "Jeda Suara";
    ttsStopBtn.style.display = "inline-block";
  } else {
    if (playIcon) playIcon.style.display = "inline-block";
    if (pauseIcon) pauseIcon.style.display = "none";
    ttsBtnText.textContent = isTtsPaused ? "Lanjutkan" : "Dengarkan";
    ttsStopBtn.style.display = isTtsPaused ? "inline-block" : "none";
  }
}

ttsPlayBtn.addEventListener("click", () => {
  if (isTtsPlaying && !isTtsPaused) {
    pauseTts();
  } else {
    playTts();
  }
});

ttsStopBtn.addEventListener("click", stopTts);

// Optional trigger voice synthesis update (mainly chrome/safari)
if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

// Override runApiRequest to load visual articles
export async function runApiRequest(event) {
  event.preventDefault();
  const path = buildRequestPath();
  const requestStartedAt = Date.now();
  
  // Reset audio and pagination on fresh requests
  stopTts();
  currentPage = 1;
  currentQueryUrl = path;
  
  // Clear feed search text
  feedSearchInput.value = "";
  
  // Sync active language pill with query language
  const reqLang = languageSelect.value;
  langTags.forEach(t => t.classList.remove("active"));
  const matchingTag = document.querySelector(".lang-tag[data-lang='" + reqLang + "']");
  if (matchingTag) {
    matchingTag.classList.add("active");
    selectedLanguage = reqLang;
  } else {
    const allTag = document.querySelector(".lang-tag[data-lang='all']");
    if (allTag) allTag.classList.add("active");
    selectedLanguage = "all";
  }
  
  // Check local cache
  const now = Date.now();
  if (apiCache.has(path)) {
    const cached = apiCache.get(path);
    if (now - cached.timestamp < CACHE_TTL_MS) {
      setRequestStatus("OK 200 (Cached)");
      responseOutput.textContent = JSON.stringify(cached.payload, null, 2);
      updateEndpointStats(cached.payload);
      
      if (cached.payload.articles) {
        activeFeedArticles = cached.payload.articles;
        totalResults = cached.payload.totalResults ?? 0;
        
        feedHeaderBar.style.display = "flex";
        applyFiltersAndRender();
        switchTab("reader");
      } else {
        activeFeedArticles = [];
        totalResults = 0;
        feedHeaderBar.style.display = "none";
        feedFooter.style.display = "none";
        renderArticles([]);
        switchTab("json");
      }
      return;
    }
  }

  if (activeRequestController) {
    activeRequestController.abort();
  }

  const requestController = new AbortController();
  activeRequestController = requestController;
  setRequestStatus("Loading");
  responseOutput.textContent = "Mengambil data...";
  
  // Show visual loader skeletons in reader feed
  renderSkeletons();
  feedHeaderBar.style.display = "none";
  feedFooter.style.display = "none";
  switchTab("reader");

  try {
    const response = await fetch(path, {
      signal: requestController.signal,
    });
    const payload = await response.json();
    const elapsedMs = Date.now() - requestStartedAt;
    setRequestStatus(
      response.ok
        ? "OK " + response.status + " · " + elapsedMs + "ms"
        : "Error " + response.status,
    );
    responseOutput.textContent = JSON.stringify(payload, null, 2);
    updateEndpointStats(payload);
    
    if (response.ok) {
      apiCache.set(path, {
        timestamp: now,
        payload: payload
      });
      
      if (payload.articles) {
        activeFeedArticles = payload.articles;
        totalResults = payload.totalResults ?? 0;
        
        feedHeaderBar.style.display = "flex";
        applyFiltersAndRender();
        switchTab("reader");
      } else {
        activeFeedArticles = [];
        totalResults = 0;
        feedHeaderBar.style.display = "none";
        feedFooter.style.display = "none";
        renderArticles([]);
        switchTab("json");
      }
    } else {
      activeFeedArticles = [];
      totalResults = 0;
      feedHeaderBar.style.display = "none";
      feedFooter.style.display = "none";
      renderArticles([]);
      switchTab("json");
    }
  } catch (error) {
    if (requestController.signal.aborted) {
      return;
    }

    setRequestStatus("Network error");
    responseOutput.textContent = error instanceof Error ? error.message : String(error);
    activeFeedArticles = [];
    totalResults = 0;
    feedHeaderBar.style.display = "none";
    feedFooter.style.display = "none";
    renderArticles([]);
    switchTab("json");
  } finally {
    if (activeRequestController === requestController) {
      activeRequestController = null;
    }
  }
}

form.addEventListener("submit", runApiRequest);
endpoint.addEventListener("change", syncFields);
category.addEventListener("change", syncRequestUrl);
query.addEventListener("input", syncRequestUrl);
sourcesInput.addEventListener("change", syncRequestUrl);
languageSelect.addEventListener("change", syncRequestUrl);
pageSize.addEventListener("input", syncRequestUrl);
quickPresets.addEventListener("click", (event) => {
  const button = event.target.closest(".preset-chip");
  if (button) {
    applyPreset(button.dataset.preset);
  }
});

copyUrl.addEventListener("click", async () => {
  const absoluteUrl = new URL(buildRequestPath(), window.location.origin).toString();
  await navigator.clipboard.writeText(absoluteUrl);
  setRequestStatus("URL copied");
});

updateEndpointStats();
syncFields();
void loadSources();

window.addEventListener("beforeunload", () => {
  stopTts();
});


// ================== NEWS PORTAL CONTROLLER LOGIC ==================
let portalArticles = [];

async function loadPortalNews(cat = 'all', q = '') {
  const portalSkeletons = document.querySelector("#portal-skeletons");
  const portalNewsGrid = document.querySelector("#portal-news-grid");
  const portalFeatured = document.querySelector("#portal-featured-story");
  const portalEmpty = document.querySelector("#portal-empty");
  const tickerItems = document.querySelector("#portal-ticker-items");

  // Show skeletons
  if (portalSkeletons) portalSkeletons.style.display = "grid";
  if (portalNewsGrid) portalNewsGrid.style.display = "none";
  if (portalFeatured) portalFeatured.style.display = "none";
  if (portalEmpty) portalEmpty.style.display = "none";

  try {
    let url = "/v2/top-headlines?country=id&pageSize=30";
    if (cat && cat !== "all") {
      url += "&category=" + cat;
    }
    if (q && q.trim() !== "") {
      url = "/v2/everything?q=" + encodeURIComponent(q.trim()) + "&pageSize=30";
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (portalSkeletons) portalSkeletons.style.display = "none";

    if (data.articles && data.articles.length > 0) {
      portalArticles = data.articles;
      
      // Populate breaking marquee ticker (first 8 headlines)
      if (tickerItems) {
        tickerItems.innerHTML = "";
        const tickerArticles = portalArticles.slice(0, 8);
        tickerArticles.forEach(art => {
          const item = document.createElement("span");
          item.className = "ticker-item";
          item.textContent = "🔥 " + (art.title || "Berita Utama") + " (" + (art.source ? art.source.name : "Media") + ")";
          item.addEventListener("click", () => openReaderModal(art));
          tickerItems.appendChild(item);
        });
      }

      // Render lead story (index 0)
      const featured = portalArticles[0];
      if (portalFeatured && featured) {
        renderPortalFeatured(featured);
        portalFeatured.style.display = "grid";
      }

      // Render other stories in grid
      const gridArticles = portalArticles.slice(1);
      if (portalNewsGrid) {
        renderPortalGrid(gridArticles);
        portalNewsGrid.style.display = "grid";
      }
    } else {
      if (portalEmpty) portalEmpty.style.display = "flex";
    }
  } catch (err) {
    console.error("Error loading news portal:", err);
    if (portalSkeletons) portalSkeletons.style.display = "none";
    if (portalEmpty) {
      portalEmpty.style.display = "flex";
      portalEmpty.querySelector("h3").textContent = "Gagal Mengambil Berita";
      portalEmpty.querySelector("p").textContent = "Terjadi kegagalan jaringan saat menghubungi server backend.";
    }
  }
}

function renderPortalFeatured(article) {
  const portalFeatured = document.querySelector("#portal-featured-story");
  if (!portalFeatured) return;

  const sourceName = (article.source && article.source.name) || "Media";
  const cleanTitle = article.title || "Tanpa Judul";
  const timeStr = formatRelativeTime(article.publishedAt);
  const descText = article.description || "Klik untuk membaca selengkapnya.";
  const imgUrl = article.urlToImage;

  let imgHtml = "";
  if (imgUrl) {
    imgHtml = '<div class="featured-img-wrap">' +
              '  <img src="' + escapeAttribute(imgUrl) + '" alt="' + escapeAttribute(cleanTitle) + '" loading="lazy" />' +
              '</div>';
  } else {
    imgHtml = '<div class="featured-img-wrap">' +
              '  <div class="featured-img-fallback grad-1">' + sourceName[0] + '</div>' +
              '</div>';
  }

  portalFeatured.innerHTML = imgHtml + 
    '<div class="featured-content">' +
    '  <div class="featured-meta">' +
    '    <span class="featured-badge">' + escapeHtml(sourceName) + '</span>' +
    '    <span class="featured-time">' + escapeHtml(timeStr) + '</span>' +
    '  </div>' +
    '  <h2 class="featured-title">' + escapeHtml(cleanTitle) + '</h2>' +
    '  <p class="featured-desc">' + escapeHtml(descText) + '</p>' +
    '  <button class="featured-read-btn" type="button">Baca Selengkapnya →</button>' +
    '</div>';

  portalFeatured.onclick = () => openReaderModal(article);
}

function renderPortalGrid(articles) {
  const portalNewsGrid = document.querySelector("#portal-news-grid");
  if (!portalNewsGrid) return;
  portalNewsGrid.innerHTML = "";

  articles.forEach((article, index) => {
    const card = document.createElement("article");
    card.className = "portal-card";
    
    const sourceName = (article.source && article.source.name) || "Media";
    const cleanTitle = article.title || "Tanpa Judul";
    const timeStr = formatRelativeTime(article.publishedAt);
    const imgUrl = article.urlToImage;
    const descText = article.description || "Klik untuk membaca berita selengkapnya.";

    let imgHtml = "";
    if (imgUrl) {
      imgHtml = '<div class="card-img-wrap">' +
                '  <img src="' + escapeAttribute(imgUrl) + '" alt="' + escapeAttribute(cleanTitle) + '" loading="lazy" />' +
                '</div>';
    } else {
      imgHtml = '<div class="card-img-wrap">' +
                '  <div class="card-img-fallback grad-' + ((index % 5) + 1) + '">' + sourceName[0] + '</div>' +
                '</div>';
    }

    card.innerHTML = imgHtml +
      '<div class="card-body">' +
      '  <div class="card-meta">' +
      '    <span class="card-badge">' + escapeHtml(sourceName) + '</span>' +
      '    <span class="card-time">' + escapeHtml(timeStr) + '</span>' +
      '  </div>' +
      '  <h3 class="card-title">' + escapeHtml(cleanTitle) + '</h3>' +
      '  <p class="card-desc">' + escapeHtml(descText) + '</p>' +
      '</div>';

    card.onclick = () => openReaderModal(article);
    portalNewsGrid.appendChild(card);
  });
}

function renderPortalSkeletons() {
  const portalSkeletons = document.querySelector("#portal-skeletons");
  if (!portalSkeletons) return;
  portalSkeletons.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const card = document.createElement("div");
    card.className = "portal-card skeleton";
    
    card.innerHTML = 
      '<div class="card-img-wrap skeleton-shimmer"></div>' +
      '<div class="card-body">' +
      '  <div class="card-meta">' +
      '    <span class="skeleton-badge skeleton-shimmer"></span>' +
      '    <span class="skeleton-time skeleton-shimmer"></span>' +
      '  </div>' +
      '  <div class="skeleton-title skeleton-shimmer" style="height:20px; width:85%;"></div>' +
      '  <div class="skeleton-title skeleton-shimmer" style="height:20px; width:60%; margin-top:6px;"></div>' +
      '  <div class="skeleton-desc skeleton-shimmer" style="margin-top:14px;"></div>' +
      '</div>';
    portalSkeletons.appendChild(card);
  }
}

// Portal Search actions
const portalSearchQ = document.querySelector("#portal-search-q");
const portalSearchGo = document.querySelector("#portal-search-go");

if (portalSearchGo && portalSearchQ) {
  portalSearchGo.addEventListener("click", () => {
    const queryVal = portalSearchQ.value;
    document.querySelectorAll(".portal-cat-btn").forEach(btn => btn.classList.remove("active"));
    void loadPortalNews(null, queryVal);
  });
  portalSearchQ.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const queryVal = portalSearchQ.value;
      document.querySelectorAll(".portal-cat-btn").forEach(btn => btn.classList.remove("active"));
      void loadPortalNews(null, queryVal);
    }
  });
}

// Category Pills click handlers
document.querySelectorAll(".portal-cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".portal-cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (portalSearchQ) portalSearchQ.value = "";
    void loadPortalNews(btn.dataset.category, null);
  });
});

// Setup Code Block Tabs inside Integration Guide
document.querySelectorAll(".code-tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    const parent = btn.closest(".docs-section-card");
    
    // Toggle active state on buttons
    parent.querySelectorAll(".code-tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    // Toggle active state on code view blocks
    parent.querySelectorAll(".code-tab-content").forEach(c => {
      c.style.display = c.dataset.lang === lang ? "block" : "none";
    });
  });
});

// Copy Code Buttons logic
document.querySelectorAll(".copy-code-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const codeText = btn.getAttribute("data-code");
    try {
      await navigator.clipboard.writeText(codeText);
      const originalText = btn.textContent;
      btn.textContent = "Disalin!";
      btn.style.background = "#2ea44f";
      btn.style.borderColor = "#2ea44f";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.borderColor = "";
      }, 2000);
    } catch (err) {
      console.error("Gagal menyalin kode:", err);
    }
  });
});

// Load Portal news on startup
renderPortalSkeletons();
void loadPortalNews();
`;
