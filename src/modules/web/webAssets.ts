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
  background: #151d1a;
  border-radius: 8px;
}

.result-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  padding: 8px 10px 8px 16px;
  color: #f6f0dc;
  border-bottom: 1px solid rgb(255 255 255 / 12%);
}

#request-status {
  color: var(--mint);
  font-weight: 800;
}

.result-toolbar .ghost-action {
  color: #f6f0dc;
  border-color: rgb(255 255 255 / 16%);
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

let availableSources = [];

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
      " feed aktif dari " +
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

export async function runApiRequest(event) {
  event.preventDefault();
  const path = buildRequestPath();
  requestStatus.textContent = "Loading";
  responseOutput.textContent = "Mengambil data...";

  try {
    const response = await fetch(path);
    const payload = await response.json();
    requestStatus.textContent = response.ok ? "OK " + response.status : "Error " + response.status;
    responseOutput.textContent = JSON.stringify(payload, null, 2);
  } catch (error) {
    requestStatus.textContent = "Network error";
    responseOutput.textContent = error instanceof Error ? error.message : String(error);
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
`;
