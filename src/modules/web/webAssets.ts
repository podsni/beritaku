export const appCss = `
:root {
  color-scheme: light;
  --ink: #17201b;
  --muted: #66746b;
  --line: #d8ded6;
  --paper: #f7f4ea;
  --surface: #fffdf6;
  --charcoal: #19231f;
  --mint: #d8f35d;
  --tomato: #e85d42;
  --sky: #7cc7d8;
  --shadow: 0 24px 80px rgb(25 35 31 / 14%);
}

body.dark-theme {
  color-scheme: dark;
  --ink: #e2e8f0;
  --muted: #94a3b8;
  --line: #334155;
  --paper: #0f172a;
  --surface: #1e293b;
  --charcoal: #020617;
  --mint: #38bdf8;
  --tomato: #fb7185;
  --sky: #60a5fa;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
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
  background:
    linear-gradient(90deg, rgb(25 35 31 / 5%) 1px, transparent 1px),
    linear-gradient(0deg, rgb(25 35 31 / 4%) 1px, transparent 1px), var(--paper);
  background-size: 36px 36px;
  font-family: "Plus Jakarta Sans", "Avenir Next", "Gill Sans", sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-theme {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px), var(--paper);
  background-size: 36px 36px;
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
  border-right: 1px solid rgb(255 255 255 / 12%);
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
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.3rem;
  font-weight: 800;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 1.05rem;
}

.brand small {
  margin-top: 2px;
  color: rgb(244 240 223 / 70%);
}

.endpoint-nav {
  display: grid;
  gap: 8px;
}

.endpoint-nav a {
  padding: 10px 12px;
  color: rgb(244 240 223 / 78%);
  text-decoration: none;
  border: 1px solid rgb(244 240 223 / 14%);
  border-radius: 8px;
}

.endpoint-nav a:hover {
  color: #fff;
  border-color: var(--mint);
  transform: translateX(2px);
}

.rail-note {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: auto;
  padding: 14px;
  color: rgb(244 240 223 / 76%);
  background: rgb(255 255 255 / 7%);
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  line-height: 1.4;
}

.pulse {
  flex: 0 0 auto;
  width: 9px;
  height: 9px;
  margin-top: 5px;
  background: var(--mint);
  border-radius: 999px;
  box-shadow: 0 0 0 6px rgb(216 243 93 / 16%);
}

.workspace {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 36px;
}

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
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
p {
  overflow-wrap: anywhere;
}

h1 {
  max-width: 780px;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.6rem, 7vw, 6.8rem);
  line-height: 0.92;
  letter-spacing: 0;
}

h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.45rem;
  letter-spacing: 0;
}

.lead {
  max-width: 720px;
  margin: 18px 0 0;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.65;
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
  background: rgb(255 253 246 / 72%);
  border: 1px solid var(--line);
  border-radius: 8px;
}

body.dark-theme .stat-tile {
  background: rgb(30 41 59 / 74%);
}

.stat-tile span,
.stat-tile small {
  display: block;
}

.stat-tile span {
  color: var(--charcoal);
  font-size: 1.2rem;
  font-weight: 900;
  line-height: 1.1;
}

body.dark-theme .stat-tile span {
  color: var(--ink);
}

.stat-tile small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 0.74rem;
  font-weight: 800;
}

.signal-card,
.panel,
.doc-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
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
  border: 1px solid var(--charcoal);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 900;
}

.signal-card strong {
  position: relative;
  display: block;
  max-width: 220px;
  margin-top: 72px;
  font-size: 1.45rem;
  line-height: 1.05;
}

.signal-card small {
  position: relative;
  margin-top: 10px;
  color: var(--muted);
}

.panel {
  padding: 24px;
}

.panel-heading {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22px;
}

#request-url {
  max-width: 100%;
  padding: 10px 12px;
  overflow-x: auto;
  color: #fbf8ed;
  white-space: nowrap;
  background: var(--charcoal);
  border-radius: 8px;
}

.request-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr)) auto;
  gap: 12px;
  align-items: end;
}

.quick-presets {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: -4px 0 18px;
}

.preset-chip {
  min-height: 38px;
  padding: 0 12px;
  color: var(--ink);
  background: rgb(124 199 216 / 12%);
  border: 1px solid rgb(124 199 216 / 34%);
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.84rem;
  font-weight: 850;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.preset-chip:hover {
  border-color: var(--sky);
  transform: translateY(-1px);
}

.preset-chip.active {
  color: var(--charcoal);
  background: var(--mint);
  border-color: var(--charcoal);
}

label {
  display: grid;
  gap: 6px;
  min-width: 0;
}

label span {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
}

input,
select {
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  transition: all 0.2s ease;
}

input:focus,
select:focus {
  outline: 3px solid rgb(124 199 216 / 38%);
  border-color: var(--sky);
}

/* Custom Searchable Select */
.custom-select-wrapper {
  position: relative;
  display: grid;
  gap: 6px;
  min-width: 0;
}

.custom-select {
  position: relative;
  width: 100%;
  user-select: none;
}

.custom-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-select-trigger:focus-within,
.custom-select.open .custom-select-trigger {
  outline: 3px solid rgb(124 199 216 / 38%);
  border-color: var(--sky);
}

.custom-select-trigger span {
  font-size: 0.95rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-chevron {
  color: var(--muted);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.custom-select.open .select-chevron {
  transform: rotate(180deg);
}

.custom-select-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  max-height: 350px;
  overflow: hidden;
}

body.dark-theme .custom-select-dropdown {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  background: #1f2723;
  border-color: #2e3b35;
}

.custom-select.open .custom-select-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.custom-select-search-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--line);
  background: rgba(25, 35, 31, 0.01);
}

body.dark-theme .custom-select-search-container {
  border-bottom-color: #2e3b35;
}

.dropdown-search-icon {
  color: var(--muted);
  flex-shrink: 0;
}

#sources-search-input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 4px 0;
  min-height: auto;
  font-size: 0.9rem;
  color: var(--ink);
}

#sources-search-input:focus {
  outline: none;
  border: none;
}

.custom-select-options {
  list-style: none;
  margin: 0;
  padding: 6px 0;
  overflow-y: auto;
  flex-grow: 1;
}

.custom-select-group-header {
  padding: 6px 12px;
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(25, 35, 31, 0.02);
  position: sticky;
  top: 0;
  z-index: 10;
}

body.dark-theme .custom-select-group-header {
  background: #252e2a;
}

.custom-select-option {
  padding: 8px 16px;
  font-size: 0.92rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.15s ease, color 0.15s ease;
  color: var(--ink);
}

.custom-select-option:hover,
.custom-select-option.hovered {
  background: rgba(124, 199, 216, 0.08);
  color: var(--sky);
}

body.dark-theme .custom-select-option:hover,
body.dark-theme .custom-select-option.hovered {
  background: rgba(124, 199, 216, 0.15);
}

.custom-select-option.selected {
  font-weight: 700;
  background: rgba(124, 199, 216, 0.12);
  color: var(--sky);
}

.custom-select-option.hidden,
.custom-select-option.lang-filtered-hidden {
  display: none !important;
}

.custom-select-group.hidden {
  display: none !important;
}

.custom-select-no-results {
  padding: 16px;
  text-align: center;
  font-size: 0.88rem;
  color: var(--muted);
}

.primary-action,
.ghost-action {
  min-height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-action {
  color: #fff;
  background: var(--tomato);
  border: 1px solid #b8402c;
}

.primary-action:hover {
  filter: brightness(0.96);
  transform: translateY(-1px);
}

.ghost-action {
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--line);
}

.ghost-action:hover {
  background: rgba(25, 35, 31, 0.04);
}

body.dark-theme .ghost-action:hover {
  background: rgba(255, 255, 255, 0.08);
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  margin-top: auto;
  background: transparent;
  color: rgb(244 240 223 / 78%);
  border: 1px solid rgb(244 240 223 / 14%);
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle-btn:hover {
  color: #fff;
  border-color: var(--mint);
  background: rgb(255 255 255 / 6%);
}

.result-area {
  margin-top: 16px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
  background: var(--surface);
}

.result-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  min-height: 54px;
  padding: 8px 16px;
  background: rgba(25, 35, 31, 0.02);
  border-bottom: 1px solid var(--line);
}

.toolbar-status-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

#request-status {
  color: var(--muted);
  font-weight: 800;
  font-size: 0.85rem;
}

.result-toolbar .ghost-action {
  color: var(--charcoal);
  border-color: var(--line);
}

.result-toolbar .ghost-action:hover {
  background: rgba(25, 35, 31, 0.04);
}

pre {
  margin: 0;
  overflow-x: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

#response-output {
  min-height: 260px;
  max-height: 520px;
  padding: 18px;
  color: #f6f0dc;
  line-height: 1.55;
}

#tab-content-json {
  background: #151d1a;
  border-radius: 0 0 8px 8px;
}

/* Tabs */
.tab-group {
  display: flex;
  gap: 4px;
  background: rgba(25, 35, 31, 0.05);
  padding: 4px;
  border-radius: 8px;
  border: 1px solid var(--line);
}

.tab-btn {
  padding: 6px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--muted);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.tab-btn:hover {
  color: var(--ink);
}

.tab-btn.active {
  background: #fff;
  color: var(--charcoal);
  box-shadow: 0 2px 4px rgba(25, 35, 31, 0.08);
}

/* Empty feed state */
.reader-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: var(--muted);
}

.reader-empty-icon {
  position: relative;
  width: 52px;
  height: 52px;
  margin-bottom: 16px;
  background: var(--surface);
  border: 2px solid var(--line);
  border-radius: 8px;
  animation: float-icon 4s ease-in-out infinite;
}

.reader-empty-icon::before,
.reader-empty-icon::after {
  position: absolute;
  right: 10px;
  left: 10px;
  height: 2px;
  content: "";
  background: var(--muted);
  border-radius: 999px;
}

.reader-empty-icon::before {
  top: 17px;
  box-shadow: 0 8px 0 var(--muted), 0 16px 0 var(--muted);
}

.reader-empty-icon::after {
  top: 10px;
  right: auto;
  width: 8px;
  height: 32px;
  background: var(--sky);
}

.reader-empty h3 {
  margin: 0 0 8px 0;
  font-family: Georgia, serif;
  color: var(--charcoal);
  font-size: 1.35rem;
  font-weight: 700;
}

.reader-empty p {
  margin: 0;
  max-width: 480px;
  font-size: 0.95rem;
  line-height: 1.6;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}

/* Feed Header Bar */
.feed-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px 8px 24px;
  background: var(--surface);
  border-bottom: 1px solid rgba(25, 35, 31, 0.05);
}

.feed-search-box {
  position: relative;
  flex-grow: 1;
  max-width: 400px;
}

.feed-search-box .search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

#feed-search-input {
  width: 100%;
  height: 40px;
  padding: 0 16px 0 38px;
  font-size: 0.9rem;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: #fff;
  transition: all 0.25s ease;
}

#feed-search-input:focus {
  outline: none;
  border-color: var(--sky);
  box-shadow: 0 0 0 3px rgb(124 199 216 / 20%);
}

.feed-language-filter {
  display: flex;
  gap: 6px;
}

.lang-tag {
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-tag:hover {
  border-color: var(--charcoal);
  color: var(--charcoal);
}

.lang-tag.active {
  background: var(--charcoal);
  color: #fff;
  border-color: var(--charcoal);
}

/* Feed Footer / Load More */
.feed-footer {
  display: flex;
  justify-content: center;
  padding: 24px 24px 40px 24px;
  background: var(--surface);
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 24px;
  border-radius: 23px;
  background: var(--surface);
  border: 2px solid var(--charcoal);
  color: var(--charcoal);
  font-weight: 900;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(25, 35, 31, 0.05);
}

.load-more-btn:hover {
  background: var(--charcoal);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(25, 35, 31, 0.12);
}

.load-more-btn:active {
  transform: translateY(0);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.spinner {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

/* News feed grid */
.news-feed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 24px;
  background: var(--surface);
}

.news-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  content-visibility: auto;
  contain-intrinsic-size: 360px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgb(25 35 31 / 8%);
  border-color: var(--sky);
}

.card-img-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: rgba(25, 35, 31, 0.03);
  overflow: hidden;
}

.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .card-img-container img {
  transform: scale(1.04);
}

.card-img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Georgia, serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

/* Gradients for source default logo fallbacks */
.grad-1 { background: linear-gradient(135deg, var(--sky), var(--mint)); }
.grad-2 { background: linear-gradient(135deg, var(--tomato), var(--sky)); }
.grad-3 { background: linear-gradient(135deg, var(--mint), var(--tomato)); }
.grad-4 { background: linear-gradient(135deg, var(--charcoal), var(--sky)); }
.grad-5 { background: linear-gradient(135deg, var(--tomato), var(--charcoal)); }

.card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 18px;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.78rem;
  font-weight: 700;
}

.card-source-badge {
  padding: 3px 8px;
  color: var(--charcoal);
  background: var(--mint);
  border: 1px solid var(--charcoal);
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 800;
}

.card-time {
  color: var(--muted);
}

.card-title {
  margin: 0 0 10px 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.18rem;
  font-weight: 800;
  line-height: 1.35;
  color: var(--charcoal);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Immersive Reader Modal */
.reader-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.reader-modal[aria-hidden="false"] {
  opacity: 1;
  pointer-events: auto;
}

.reader-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(25, 35, 31, 0.45);
  backdrop-filter: blur(8px);
}

.reader-modal-container {
  position: relative;
  width: min(840px, 100% - 24px);
  height: min(88vh, 100vh - 48px);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 32px 64px rgba(25, 35, 31, 0.18);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateY(30px);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.reader-modal[aria-hidden="false"] .reader-modal-container {
  transform: translateY(0);
}

/* Control Bar */
.reader-control-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: rgba(25, 35, 31, 0.02);
  border-bottom: 1px solid var(--line);
  z-index: 10;
}

.reader-ctrl-left,
.reader-ctrl-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.close-reader-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--charcoal);
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-reader-btn:hover {
  background: var(--line);
}

.ctrl-btn {
  padding: 6px 12px;
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--charcoal);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.ctrl-btn:hover {
  border-color: var(--charcoal);
}

/* TTS Group styling */
.tts-group {
  display: flex;
  gap: 4px;
}

.tts-btn {
  background: var(--mint);
  border-color: var(--charcoal);
}

.tts-btn.playing {
  background: var(--tomato);
  color: #fff;
  border-color: #b8402c;
  animation: pulse-border 1.5s infinite;
}

@keyframes pulse-border {
  0% { box-shadow: 0 0 0 0 rgba(232, 93, 66, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(232, 93, 66, 0); }
  100% { box-shadow: 0 0 0 0 rgba(232, 93, 66, 0); }
}

.font-sizer {
  display: flex;
  gap: 2px;
  background: rgba(25, 35, 31, 0.05);
  padding: 2px;
  border-radius: 8px;
  border: 1px solid var(--line);
}

.font-sizer .ctrl-btn {
  border: none;
  background: transparent;
  padding: 6px 10px;
  border-radius: 6px;
}

.font-sizer .ctrl-btn:hover {
  background: rgba(255,255,255,0.7);
}

.reader-themes {
  display: flex;
  gap: 6px;
  border-left: 1px solid var(--line);
  padding-left: 12px;
}

.theme-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.theme-dot-light { background: #fbf8f0; border-color: #d8ded6; }
.theme-dot-sepia { background: #f4ecd8; border-color: #e0d0b0; }
.theme-dot-dark { background: #141a18; border-color: #2b3a34; }

.theme-dot.active {
  border-color: var(--tomato);
  transform: scale(1.15);
}

/* Progress indicator bar */
.reader-progress-wrapper {
  width: 100%;
  height: 3px;
  background: rgba(25, 35, 31, 0.05);
}

.reader-progress-fill {
  width: 0%;
  height: 100%;
  background: var(--tomato);
  transition: width 0.1s ease;
}

/* Modal Content area */
.reader-scroll-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 40px 60px;
  scroll-behavior: smooth;
  background: var(--reader-bg, #fff);
  color: var(--reader-text, var(--ink));
  transition: background 0.3s ease, color 0.3s ease;
}

@media (max-width: 768px) {
  .reader-scroll-area {
    padding: 24px 20px;
  }
  .reader-control-bar {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
}

.reader-body {
  max-width: 660px;
  margin: 0 auto;
  --reader-font-size: 1.15rem;
}

/* Font settings */
.reader-body.serif-font {
  font-family: 'Lora', Georgia, serif;
}

.reader-body.sans-font {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

/* Themes */
.reader-body.theme-light {
  --reader-bg: #fbf8f0;
  --reader-text: #19231f;
  --reader-title-color: #19231f;
  --reader-meta-color: #66746b;
}

.reader-body.theme-sepia {
  --reader-bg: #f4ecd8;
  --reader-text: #4e3629;
  --reader-title-color: #3b2519;
  --reader-meta-color: #7d6c5c;
}

.reader-body.theme-dark {
  --reader-bg: #141a18;
  --reader-text: #e0e6e3;
  --reader-title-color: #fff;
  --reader-meta-color: #8c9c93;
}

/* Article inside reader elements */
.reader-article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--reader-meta-color);
}

.reader-article-source {
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--mint);
  color: var(--charcoal);
  border: 1px solid var(--charcoal);
  font-weight: 800;
  font-size: 0.75rem;
}

.reader-article-title {
  margin: 0 0 20px 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--reader-title-color);
}

.reader-article-author {
  font-size: 0.9rem;
  margin-bottom: 24px;
  color: var(--reader-meta-color);
  border-bottom: 1px solid var(--line);
  padding-bottom: 16px;
}

.reader-article-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}

.reader-body p {
  font-size: var(--reader-font-size);
  line-height: 1.8;
  margin: 0 0 24px 0;
}

/* Beautiful Editorial Drop-Cap for Serif Lora Font */
.reader-body.serif-font p.article-body-p:first-of-type::first-letter {
  font-size: 4.5rem;
  font-weight: 800;
  float: left;
  line-height: 0.85;
  margin-top: 6px;
  margin-right: 12px;
  font-family: 'Playfair Display', Georgia, serif;
  color: var(--tomato);
}

.reader-body p.article-lead {
  font-size: calc(var(--reader-font-size) * 1.12);
  line-height: 1.6;
  font-weight: 600;
  color: var(--reader-title-color);
  opacity: 0.95;
  border-left: 3px solid var(--sky);
  padding-left: 16px;
  margin-bottom: 28px;
}

.reader-body a.original-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 20px;
  background: var(--tomato);
  color: #fff;
  border: 1px solid #b8402c;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.reader-body a.original-link-btn:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
}

/* Fix background scroll block */
body.reader-open {
  overflow: hidden;
}

.source-summary {
  margin-top: 14px;
  padding: 12px 14px;
  color: var(--muted);
  background: rgb(124 199 216 / 14%);
  border: 1px solid rgb(124 199 216 / 34%);
  border-radius: 8px;
  line-height: 1.5;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.doc-card {
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 20px;
}

.doc-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.doc-card pre {
  padding: 14px;
  color: #f6f0dc;
  background: var(--charcoal);
  border-radius: 8px;
  line-height: 1.5;
}

.doc-card code {
  color: var(--tomato);
}

.error-method {
  color: #fff;
  background: var(--tomato);
}

/* Shimmer Loader & Optimization properties */
.reader-modal-container {
  will-change: transform, opacity;
}

.news-card {
  contain: layout;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(90deg, var(--line) 25%, rgba(25, 35, 31, 0.08) 50%, var(--line) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

body.dark-theme .skeleton-shimmer {
  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
  background-size: 200% 100%;
}

.news-card.skeleton {
  pointer-events: none;
  cursor: default;
  border-color: var(--line);
}

.skeleton-badge {
  display: inline-block;
  width: 80px;
  height: 18px;
  border-radius: 4px;
}

.skeleton-time {
  display: inline-block;
  width: 60px;
  height: 14px;
  border-radius: 4px;
}

.skeleton-title {
  width: 90%;
  height: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
}

.skeleton-title-short {
  width: 60%;
  height: 20px;
  margin-bottom: 16px;
  border-radius: 4px;
}

.skeleton-desc {
  width: 100%;
  height: 14px;
  margin-bottom: 6px;
  border-radius: 4px;
}

.skeleton-desc-short {
  width: 75%;
  height: 14px;
  border-radius: 4px;
}

.card-img-container.loading {
  background: linear-gradient(90deg, rgba(25, 35, 31, 0.03) 25%, rgba(25, 35, 31, 0.08) 50%, rgba(25, 35, 31, 0.03) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite linear;
}

@media (max-width: 980px) {
  .api-shell {
    grid-template-columns: 1fr;
  }

  .rail {
    position: static;
    height: auto;
  }

  .endpoint-nav {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .endpoint-nav a {
    text-align: center;
  }

  .masthead,
  .docs-grid {
    grid-template-columns: 1fr;
  }

  .request-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .rail,
  .workspace,
  .panel,
  .doc-card {
    padding: 18px;
  }

  .endpoint-nav,
  .request-grid {
    grid-template-columns: 1fr;
  }

  .panel-heading {
    display: grid;
  }

  .primary-action,
  .ghost-action {
    width: 100%;
  }

  .result-toolbar {
    display: grid;
    gap: 8px;
  }

  /* Make reader full screen on mobile for premium look */
  .reader-modal-container {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    border: none;
  }

  /* Compact headers on mobile */
  .reader-control-bar {
    padding: 10px 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .reader-ctrl-right {
    gap: 8px;
  }

  /* Compact feed search bar on mobile */
  .feed-header-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 16px 18px 8px 18px;
  }

  .feed-search-box {
    max-width: 100%;
  }

  .feed-language-filter {
    justify-content: flex-start;
  }
}

@media (max-width: 520px) {
  h1 {
    font-size: 2.45rem;
    line-height: 1;
  }

  .lead {
    font-size: 0.98rem;
  }

  .endpoint-stats {
    grid-template-columns: 1fr;
  }

  .quick-presets {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .preset-chip {
    width: 100%;
  }

  .news-feed-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 14px;
  }

  .tab-group,
  .toolbar-status-actions {
    width: 100%;
  }

  .tab-btn {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  /* Hide text labels on mobile to prevent clipping */
  .btn-text {
    display: none;
  }

  .close-reader-btn {
    padding: 8px;
  }

  .ctrl-btn {
    padding: 8px;
  }

  .reader-themes {
    padding-left: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

export const appJs = `
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

// Call on startup
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

    // Add "No results" element
    const noResults = document.createElement("div");
    noResults.className = "custom-select-no-results";
    noResults.style.display = "none";
    noResults.textContent = "Media tidak ditemukan";
    optionsContainer.appendChild(noResults);

    // Setup interactive handlers for option clicks
    setupCustomSelectHandlers();

    const publishers = new Set(
      availableSources.map((source) => source.id.split("-")[0]),
    );
    sourceSummary.textContent =
      availableSources.length +
      " source aktif dari " +
      publishers.size +
      " grup media. Pilih satu media, atau gunakan Semua media untuk agregasi penuh.";
    updateEndpointStats();
    syncRequestUrl();
  } catch (error) {
    sourceSummary.textContent =
      "Daftar media belum bisa dimuat. Explorer tetap bisa memakai sources=all.";
    updateEndpointStats();
  }
}

function setupCustomSelectHandlers() {
  const customSelect = document.querySelector("#custom-sources-select");
  if (!customSelect) return;
  const trigger = customSelect.querySelector(".custom-select-trigger");
  const selectedText = customSelect.querySelector("#selected-source-text");
  const searchInput = customSelect.querySelector("#sources-search-input");
  const options = customSelect.querySelectorAll(".custom-select-option");
  const headers = customSelect.querySelectorAll(".custom-select-group-header");
  const noResults = customSelect.querySelector(".custom-select-no-results");
  const hiddenInput = document.querySelector("#sourcesInput");
  const languageSelect = document.querySelector("#languageSelect");

  if (!trigger || !selectedText || !searchInput || !hiddenInput) return;

  let activeIndex = -1;

  const getVisibleOptions = () => {
    return Array.from(options).filter(
      (opt) =>
        !opt.classList.contains("hidden") &&
        !opt.classList.contains("lang-filtered-hidden"),
    );
  };

  const highlightActive = (visibleOpts) => {
    visibleOpts.forEach((opt, idx) => {
      if (idx === activeIndex) {
        opt.classList.add("hovered");
        opt.scrollIntoView({ block: "nearest" });
      } else {
        opt.classList.remove("hovered");
      }
    });
  };

  // Toggle open
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    customSelect.classList.toggle("open");
    if (customSelect.classList.contains("open")) {
      searchInput.value = "";
      activeIndex = -1;
      options.forEach((o) => o.classList.remove("hovered"));
      searchInput.dispatchEvent(new Event("input"));
      searchInput.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    customSelect.classList.remove("open");
  });

  customSelect.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Handle option selection
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      options.forEach((o) => {
        o.classList.remove("selected");
        o.classList.remove("hovered");
      });
      opt.classList.add("selected");
      selectedText.textContent = opt.textContent;
      hiddenInput.value = opt.getAttribute("data-value");
      customSelect.classList.remove("open");
      
      // Sync language select if a specific source is selected
      const group = opt.getAttribute("data-group");
      if (group && languageSelect) {
        languageSelect.value = group;
        languageSelect.dispatchEvent(new Event("change"));
      }
      
      // Trigger native change event so Hono updates request URL
      hiddenInput.dispatchEvent(new Event("change"));
    });
  });

  // Keyboard navigation on search input
  searchInput.addEventListener("keydown", (e) => {
    const visibleOpts = getVisibleOptions();
    if (visibleOpts.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % visibleOpts.length;
      highlightActive(visibleOpts);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + visibleOpts.length) % visibleOpts.length;
      highlightActive(visibleOpts);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < visibleOpts.length) {
        visibleOpts[activeIndex].click();
      }
    } else if (e.key === "Escape") {
      customSelect.classList.remove("open");
    }
  });

  // Filter options based on language selection
  const filterByLanguage = () => {
    const lang = languageSelect ? languageSelect.value : "all";
    options.forEach((opt) => {
      const val = opt.getAttribute("data-value");
      if (val === "all") return;
      const group = opt.getAttribute("data-group");
      
      if (lang === "all" || (lang === "id" && group === "id") || (lang === "en" && group === "en")) {
        opt.classList.remove("lang-filtered-hidden");
      } else {
        opt.classList.add("lang-filtered-hidden");
        // Deselect if it was selected and is now filtered out
        if (opt.classList.contains("selected")) {
          opt.classList.remove("selected");
          const allOpt = customSelect.querySelector(".custom-select-option[data-value='all']");
          if (allOpt) {
            allOpt.classList.add("selected");
            selectedText.textContent = "Semua media";
            hiddenInput.value = "all";
            hiddenInput.dispatchEvent(new Event("change"));
          }
        }
      }
    });
    
    // Update headers visibility too
    headers.forEach((header) => {
      const group = header.getAttribute("data-group");
      if (lang === "all" || (lang === "id" && group === "id") || (lang === "en" && group === "en")) {
        header.style.display = "";
      } else {
        header.style.display = "none";
      }
    });
  };

  if (languageSelect) {
    languageSelect.addEventListener("change", filterByLanguage);
  }

  // Filter options on search typing
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase().trim();
    const lang = languageSelect ? languageSelect.value : "all";
    let visibleCount = 0;
    activeIndex = -1;
    options.forEach((o) => o.classList.remove("hovered"));

    const visibleInGroup = { id: 0, en: 0 };

    options.forEach((opt) => {
      const val = opt.getAttribute("data-value");
      if (val === "all") {
        if (filter === "") {
          opt.classList.remove("hidden");
          visibleCount++;
        } else {
          opt.classList.add("hidden");
        }
        return;
      }

      // Check if it's already filtered out by language
      const isLangHidden = opt.classList.contains("lang-filtered-hidden");
      if (isLangHidden) {
        opt.classList.add("hidden");
        return;
      }

      const text = opt.textContent.toLowerCase();
      const group = opt.getAttribute("data-group");
      if (text.includes(filter)) {
        opt.classList.remove("hidden");
        visibleCount++;
        if (group) visibleInGroup[group]++;
      } else {
        opt.classList.add("hidden");
      }
    });

    // Show/hide group headers based on item visibility
    headers.forEach((header) => {
      const group = header.getAttribute("data-group");
      const isLangMatch = lang === "all" || (lang === "id" && group === "id") || (lang === "en" && group === "en");
      if (isLangMatch && (filter === "" || (group && visibleInGroup[group] > 0))) {
        header.style.display = "";
      } else {
        header.style.display = "none";
      }
    });

    // Show/hide no results text
    if (visibleCount === 0) {
      noResults.style.display = "";
    } else {
      noResults.style.display = "none";
    }
  });
}

// Tab switcher functionality
function switchTab(tab) {
  if (tab === "reader") {
    tabBtnReader.classList.add("active");
    tabBtnReader.setAttribute("aria-selected", "true");
    tabBtnJson.classList.remove("active");
    tabBtnJson.setAttribute("aria-selected", "false");
    tabContentReader.style.display = "block";
    tabContentJson.style.display = "none";
  } else {
    tabBtnJson.classList.add("active");
    tabBtnJson.setAttribute("aria-selected", "true");
    tabBtnReader.classList.remove("active");
    tabBtnReader.setAttribute("aria-selected", "false");
    tabContentJson.style.display = "block";
    tabContentReader.style.display = "none";
  }
}

tabBtnReader.addEventListener("click", () => switchTab("reader"));
tabBtnJson.addEventListener("click", () => switchTab("json"));

// Format relative date helper in Indonesian
function formatRelativeTime(isoString) {
  if (!isoString) return "Baru saja";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (isNaN(diffMs)) return "Baru saja";
    
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Baru saja";
    if (diffMin < 60) return diffMin + " menit yang lalu";
    if (diffHr < 24) return diffHr + " jam yang lalu";
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return diffDays + " hari yang lalu";
    
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch (e) {
    return "Baru saja";
  }
}

// Filter loaded articles by language & search keyword
function applyFiltersAndRender() {
  let filtered = activeFeedArticles;
  
  // Apply language filter
  if (selectedLanguage !== "all") {
    filtered = activeFeedArticles.filter(article => {
      const src = availableSources.find(s => s.id === article.source.id);
      const lang = src ? src.language : "id";
      return lang === selectedLanguage;
    });
  }
  
  // Apply search keyword filter
  const searchVal = feedSearchInput.value.trim().toLowerCase();
  if (searchVal !== "") {
    filtered = filtered.filter(article => {
      const title = (article.title || "").toLowerCase();
      const desc = (article.description || "").toLowerCase();
      return title.includes(searchVal) || desc.includes(searchVal);
    });
  }
  
  renderArticles(filtered);
  
  // Show / hide Load More footer based on overall page index
  if (activeFeedArticles.length < totalResults) {
    feedFooter.style.display = "flex";
  } else {
    feedFooter.style.display = "none";
  }
}

// Load More Button Event Handler
loadMoreBtn.addEventListener("click", async () => {
  currentPage++;
  loadMoreBtn.disabled = true;
  loadMoreBtn.querySelector(".spinner").style.display = "inline";
  
  const separator = currentQueryUrl.includes("?") ? "&" : "?";
  const paginatedPath = currentQueryUrl + separator + "page=" + currentPage;
  
  try {
    const response = await fetch(paginatedPath);
    const payload = await response.json();
    
    if (response.ok && payload.articles) {
      activeFeedArticles = activeFeedArticles.concat(payload.articles);
      applyFiltersAndRender();
    }
  } catch (error) {
    console.error("Load more failed", error);
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.querySelector(".spinner").style.display = "none";
  }
});

// Instant search inside the visual feed, and Enter for server-side search
feedSearchInput.addEventListener("input", applyFiltersAndRender);
feedSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const val = feedSearchInput.value.trim();
    if (val !== "") {
      endpoint.value = "/v2/everything";
      query.value = val;
      syncFields();
      form.dispatchEvent(new Event("submit"));
    }
  }
});

// Language Filter Tags Event Handlers
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
    title2.className = "skeleton-title-short skeleton-shimmer";
    
    const desc1 = document.createElement("div");
    desc1.className = "skeleton-desc skeleton-shimmer";
    
    const desc2 = document.createElement("div");
    desc2.className = "skeleton-desc-short skeleton-shimmer";
    
    cardBody.appendChild(meta);
    cardBody.appendChild(title1);
    cardBody.appendChild(title2);
    cardBody.appendChild(desc1);
    cardBody.appendChild(desc2);
    
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
  
  // Reset scroll and progress
  scrollArea.scrollTop = 0;
  progressFill.style.width = "0%";
  
  // Show modal
  readerModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("reader-open");
}

function closeReaderModal() {
  stopTts();
  readerModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("reader-open");
  activeArticle = null;
}

closeReader.addEventListener("click", closeReaderModal);
readerOverlay.addEventListener("click", closeReaderModal);

// Close modal on Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && readerModal.getAttribute("aria-hidden") === "false") {
    closeReaderModal();
  }
});

// Font size configurations
function applyFontSize(size) {
  currentFontSize = Math.max(14, Math.min(32, size));
  readerBody.style.setProperty("--reader-font-size", currentFontSize + "px");
  localStorage.setItem("reader-font-size", currentFontSize);
}

btnFontDec.addEventListener("click", () => applyFontSize(currentFontSize - 1));
btnFontInc.addEventListener("click", () => applyFontSize(currentFontSize + 1));

// Load initial font size
const savedSize = localStorage.getItem("reader-font-size");
if (savedSize) {
  applyFontSize(parseInt(savedSize, 10));
} else {
  applyFontSize(18);
}

// Font family configurations
function applyFontFamily(serif) {
  isSerif = serif;
  if (isSerif) {
    readerBody.classList.remove("sans-font");
    readerBody.classList.add("serif-font");
    btnFontFamily.textContent = "Serif";
  } else {
    readerBody.classList.remove("serif-font");
    readerBody.classList.add("sans-font");
    btnFontFamily.textContent = "Sans";
  }
  localStorage.setItem("reader-font-serif", isSerif);
}

btnFontFamily.addEventListener("click", () => applyFontFamily(!isSerif));

// Load initial font family
const savedSerif = localStorage.getItem("reader-font-serif");
if (savedSerif !== null) {
  applyFontFamily(savedSerif === "true");
} else {
  applyFontFamily(true);
}

// Theme configurations
function applyTheme(theme) {
  currentTheme = theme;
  readerBody.classList.remove("theme-light", "theme-sepia", "theme-dark");
  readerBody.classList.add("theme-" + theme);
  
  themeDots.forEach(dot => {
    if (dot.dataset.theme === theme) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
  localStorage.setItem("reader-theme", theme);
}

themeDots.forEach(dot => {
  dot.addEventListener("click", (e) => {
    applyTheme(e.target.dataset.theme);
  });
});

// Load initial theme
const savedTheme = localStorage.getItem("reader-theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

// Reading progress bar
scrollArea.addEventListener("scroll", () => {
  const scrollTop = scrollArea.scrollTop;
  const scrollHeight = scrollArea.scrollHeight - scrollArea.clientHeight;
  const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressFill.style.width = progressPercent + "%";
});

// Audio Web Speech TTS Reader
function playTts() {
  if (!activeArticle) return;
  
  if (isTtsPaused) {
    window.speechSynthesis.resume();
    isTtsPlaying = true;
    isTtsPaused = false;
    updateTtsUi();
    return;
  }
  
  window.speechSynthesis.cancel(); // stop any current speech
  
  const title = activeArticle.title || "";
  const source = "Sumber berita, " + ((activeArticle.source && activeArticle.source.name) || "tidak diketahui");
  const description = activeArticle.description || "";
  
  const text = title + ". " + source + ". " + description;
  
  ttsUtterance = new SpeechSynthesisUtterance(text);
  ttsUtterance.lang = "id-ID";
  
  // Fetch id voice if available
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith("id") || v.lang.startsWith("id-ID"));
  if (voice) {
    ttsUtterance.voice = voice;
  }
  
  ttsUtterance.onend = () => {
    stopTts();
  };
  
  ttsUtterance.onerror = () => {
    stopTts();
  };
  
  window.speechSynthesis.speak(ttsUtterance);
  isTtsPlaying = true;
  isTtsPaused = false;
  updateTtsUi();
}

function pauseTts() {
  if (isTtsPlaying) {
    window.speechSynthesis.pause();
    isTtsPlaying = false;
    isTtsPaused = true;
    updateTtsUi();
  }
}

function stopTts() {
  window.speechSynthesis.cancel();
  ttsUtterance = null;
  isTtsPlaying = false;
  isTtsPaused = false;
  updateTtsUi();
}

function updateTtsUi() {
  const playIcon = document.querySelector(".tts-play-icon");
  const pauseIcon = document.querySelector(".tts-pause-icon");
  
  if (isTtsPlaying) {
    ttsPlayBtn.classList.add("playing");
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
    ttsBtnText.textContent = "Jeda";
    ttsStopBtn.style.display = "inline-flex";
  } else if (isTtsPaused) {
    ttsPlayBtn.classList.remove("playing");
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
    ttsBtnText.textContent = "Lanjutkan";
    ttsStopBtn.style.display = "inline-flex";
  } else {
    ttsPlayBtn.classList.remove("playing");
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
    ttsBtnText.textContent = "Dengarkan";
    ttsStopBtn.style.display = "none";
  }
}

ttsPlayBtn.addEventListener("click", () => {
  if (isTtsPlaying) {
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
      // Store in cache
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
`;
