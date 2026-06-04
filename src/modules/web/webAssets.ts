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
  font-family: "Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif;
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
  grid-template-columns: repeat(5, minmax(0, 1fr)) auto;
  gap: 12px;
  align-items: end;
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
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
}

input:focus,
select:focus {
  outline: 3px solid rgb(124 199 216 / 38%);
  border-color: var(--sky);
}

.primary-action,
.ghost-action {
  min-height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  font-weight: 900;
  cursor: pointer;
}

.primary-action {
  color: #fff;
  background: var(--tomato);
  border: 1px solid #b8402c;
}

.primary-action:hover {
  filter: brightness(0.96);
}

.ghost-action {
  color: var(--charcoal);
  background: transparent;
  border: 1px solid var(--line);
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
  font-size: 3.5rem;
  margin-bottom: 16px;
  animation: float-icon 4s ease-in-out infinite;
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
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
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
`;

export const appJs = `
const form = document.querySelector("#api-form");
const endpoint = document.querySelector("#endpoint");
const category = document.querySelector("#category");
const query = document.querySelector("#q");
const sourcesInput = document.querySelector("#sourcesInput");
const pageSize = document.querySelector("#pageSize");
const requestUrl = document.querySelector("#request-url");
const requestStatus = document.querySelector("#request-status");
const responseOutput = document.querySelector("#response-output");
const copyUrl = document.querySelector("#copy-url");
const sourceSummary = document.querySelector("#source-summary");

// Tab Switcher Elements
const tabBtnReader = document.querySelector("#tab-btn-reader");
const tabBtnJson = document.querySelector("#tab-btn-json");
const tabContentReader = document.querySelector("#tab-content-reader");
const tabContentJson = document.querySelector("#tab-content-json");

// News Feed Elements
const newsFeedGrid = document.querySelector("#news-feed-grid");
const readerEmpty = document.querySelector("#reader-empty");

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

let availableSources = [];
let currentArticles = [];
let activeArticle = null;
let ttsUtterance = null;
let isTtsPlaying = false;
let isTtsPaused = false;

// Caching options
const apiCache = new Map();
const CACHE_TTL_MS = 60000; // 1 minute client-side cache

// Reader Typography Options
let currentFontSize = 18; // default in px
let isSerif = true;
let currentTheme = "light";

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

  if (path !== "/v2/top-headlines/sources" && pageSize.value.trim() !== "") {
    params.set("pageSize", pageSize.value.trim());
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

  category.closest("label").hidden = !showCategory;
  query.closest("label").hidden = !showSearch;
  sourcesInput.closest("label").hidden = !showSources;
  pageSize.closest("label").hidden = !showPageSize;
  syncRequestUrl();
}

export async function loadSources() {
  try {
    const response = await fetch("/v2/top-headlines/sources");
    const payload = await response.json();
    availableSources = payload.sources ?? [];

    sourcesInput.textContent = "";
    sourcesInput.append(createSourceOption("all", "Semua media"));

    for (const source of availableSources) {
      sourcesInput.append(
        createSourceOption(source.id, source.name + " - " + source.category),
      );
    }

    const publishers = new Set(
      availableSources.map((source) => source.id.split("-")[0]),
    );
    sourceSummary.textContent =
      availableSources.length +
      " source aktif dari " +
      publishers.size +
      " grup media. Pilih satu media, atau gunakan Semua media untuk agregasi penuh.";
    syncRequestUrl();
  } catch (error) {
    sourceSummary.textContent =
      "Daftar media belum bisa dimuat. Explorer tetap bisa memakai sources=all.";
  }
}

function createSourceOption(value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
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
  
  let contentHtml = "";
  contentHtml += '<div class="reader-article-meta">';
  contentHtml += '  <span class="reader-article-source">' + sourceName + '</span>';
  contentHtml += '  <span>' + formattedTime + '</span>';
  contentHtml += '</div>';
  contentHtml += '<h1 class="reader-article-title">' + article.title + '</h1>';
  contentHtml += '<div class="reader-article-author">' + authorText + '</div>';
  
  if (article.urlToImage) {
    contentHtml += '<img class="reader-article-img" src="' + article.urlToImage + '" alt="' + article.title + '" onerror="this.style.display=\\'none\\';" />';
  }
  
  if (article.description) {
    contentHtml += '<p class="article-lead">' + article.description + '</p>';
  }
  
  if (article.content) {
    // Clean trailing bracket [+123 chars] from NewsAPI content response
    const cleanContent = article.content.replace(/\\s*\\[\\+\\d+\\s+chars\\]$/, "");
    if (cleanContent.trim() && cleanContent !== article.description) {
      const paragraphs = cleanContent.split(/\\n+/).filter(p => p.trim());
      paragraphs.forEach(p => {
        contentHtml += '<p class="article-body-p">' + p + '</p>';
      });
    }
  } else if (!article.description) {
    contentHtml += '<p class="article-body-p">Konten teks lengkap tidak tersedia untuk artikel ini.</p>';
  }
  
  contentHtml += '<div style="margin-top: 40px; text-align: center;">';
  contentHtml += '  <a class="original-link-btn" href="' + article.url + '" target="_blank" rel="noopener noreferrer">';
  contentHtml += '    Baca Selengkapnya di ' + sourceName + ' ↗';
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
  
  // Reset audio on fresh requests
  stopTts();
  
  // Check local cache
  const now = Date.now();
  if (apiCache.has(path)) {
    const cached = apiCache.get(path);
    if (now - cached.timestamp < CACHE_TTL_MS) {
      requestStatus.textContent = "OK 200 (Cached)";
      responseOutput.textContent = JSON.stringify(cached.payload, null, 2);
      if (cached.payload.articles) {
        currentArticles = cached.payload.articles;
        renderArticles(currentArticles);
        switchTab("reader");
      } else {
        currentArticles = [];
        renderArticles([]);
        switchTab("json");
      }
      return;
    }
  }

  requestStatus.textContent = "Loading";
  responseOutput.textContent = "Mengambil data...";
  
  // Show visual loader in reader feed
  newsFeedGrid.style.display = "none";
  readerEmpty.style.display = "flex";
  readerEmpty.querySelector("h3").textContent = "Memuat Berita...";
  readerEmpty.querySelector("p").textContent = "Sedang mengambil dan mengagregasi data dari media Indonesia...";

  try {
    const response = await fetch(path);
    const payload = await response.json();
    requestStatus.textContent = response.ok ? "OK " + response.status : "Error " + response.status;
    responseOutput.textContent = JSON.stringify(payload, null, 2);
    
    if (response.ok) {
      // Store in cache
      apiCache.set(path, {
        timestamp: now,
        payload: payload
      });
      
      if (payload.articles) {
        currentArticles = payload.articles;
        renderArticles(currentArticles);
        switchTab("reader");
      } else {
        currentArticles = [];
        renderArticles([]);
        switchTab("json");
      }
    } else {
      currentArticles = [];
      renderArticles([]);
      switchTab("json");
    }
  } catch (error) {
    requestStatus.textContent = "Network error";
    responseOutput.textContent = error instanceof Error ? error.message : String(error);
    currentArticles = [];
    renderArticles([]);
    switchTab("json");
  }
}

form.addEventListener("submit", runApiRequest);
endpoint.addEventListener("change", syncFields);
category.addEventListener("change", syncRequestUrl);
query.addEventListener("input", syncRequestUrl);
sourcesInput.addEventListener("change", syncRequestUrl);
pageSize.addEventListener("input", syncRequestUrl);

copyUrl.addEventListener("click", async () => {
  const absoluteUrl = new URL(buildRequestPath(), window.location.origin).toString();
  await navigator.clipboard.writeText(absoluteUrl);
  requestStatus.textContent = "URL copied";
});

syncFields();
void loadSources();

window.addEventListener("beforeunload", () => {
  stopTts();
});
`;
