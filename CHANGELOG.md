# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.8.0] — 2026-06-07

### Added

- **`fetchNewsText` Utility** (`src/shared/http/fetchNewsText.ts`): Extracted shared HTTP fetch logic into a dedicated module. Supports configurable timeouts (`directTimeoutMs`, `browserTimeoutMs`, `overallTimeoutMs`), pluggable `fetchImpl`, and optional browser fallback via `cloakbrowser`. A mutex ensures sequential browser launches.
- **Browser Fallback with Auto-detection**: `fetchNewsText` automatically falls back to `cloakbrowser` on HTTP 401/403/408/429/451/503 errors or Cloudflare 5xx ranges. Google News URLs are always excluded from browser fallback.
- **Dual-Store Refresh Script**: `refreshNewsCsv.ts` now writes to **both** `data/news-cache.csv` and `data/news-cache.sqlite` simultaneously on every refresh run, keeping both stores in sync.
- **Smart Cache Merge in Refresh**: Existing articles from SQLite (preferred) or CSV are loaded first. Fresh feed articles are matched by title key or decoded URL — cached decoded URLs are reused, preventing redundant Google News decoding.
- **Per-Source Scrape Prioritization**: Refresh script processes up to 25 newest unresolved articles per source with concurrency 15, then defers the rest with a Bing thumbnail fallback.
- **Expanded Indonesian Sources**: Registry now includes `kompas-id-general` (Kompas.id via Google News), `bbc-indonesia` (BBC Bahasa Indonesia RSS), `cnbc-ekonomi`, `detik-finance`, `kompas-tekno`, `merdeka-tekno`, `cna-business`, and `cna-sports`.
- **Expanded International Sources**: Added `bloomberg-asia-business`, `wsj-business`, `cnbc-world-business`, `rt-general`, `aljazeera-general`, `dw-general`, `the-diplomat-general`, `war-on-the-rocks-general`, `historytoday-general`, `nbcnews-general`, `economist-business`, `forbes-business`, `nature-technology`.
- **Crypto & Finance Sources**: Added `cryptowave-business` (Indonesia) and `bloomberg-crypto-business`.
- **Sports Sources**: Added `goal-indonesia-sports`, `goal-global-sports`, `athletic-football-sports`, `coaches-voice-sports`.
- **Cultural & Lifestyle Sources**: Added `mojok-general`, `indoprogress-general`, `sejuk-general`, `pinterpolitik-general`, `historia-general`.
- **Media Lokal Malang Raya & Jawa Timur**: Added `tugumalang-general`, `malangtimes-general`, `malang-post-general`, `radarmalang-general`, `suryamalang-general`, `suara-surabaya-general`, `jatim-times-general`.
- **Wired Multi-Category Sources**: Added `wired-general`, `wired-business`, `wired-sports`, `wired-entertainment` alongside existing `wired-technology`.
- **Extended Test Suite** (`src/index.test.ts`): Added 134 lines of new tests covering `fetchNewsText` (direct fetch, browser fallback, timeout, mutex), source registry completeness, category filtering in `/v2/everything`, CSV store edge cases, and article deduplication in the refresh flow.
- **`LISTMEDIA.md`**: New document listing all 110+ source IDs organized by category, with source URLs, feed methods (RSS/HTML/Google News), and language.
- **Detailed `README.md`**: Fully rewritten with parameter tables for all endpoints, architecture directory tree, environment variable reference, refresh cache workflow, and category-grouped source listing.

### Changed

- **`src/app.ts`**: Replaced inline `fetch()` call with `fetchNewsText` from the new shared module. Storage selection logic is now cleaner with explicit `USE_SQLITE` env check.
- **`src/scripts/refreshNewsCsv.ts`**: Major overhaul — added SQLite read-back for existing articles, concurrent scraping workers, per-source article cap (N=25), deduplication by title key and URL, and dual CSV+SQLite write at the end.
- **`src/modules/news/rssAdapter.ts`**: Improved `media:group` extraction for Atom entries; added HTML `<img>` fallback extraction in both `parseItem` and `parseAtomEntry`.
- **`src/modules/news/sourceRegistry.ts`**: Added 30+ new source definitions. All new international sources explicitly set `language: "en"`. All new local Indonesian sources explicitly set `language: "id"`.

### Fixed

- **Google News URL Not Re-decoded**: Refresh script now correctly identifies cached vs. uncached articles and avoids re-decoding URLs that were already resolved in a previous run.
- **Missing Images for Google News Articles**: Fallback to Bing thumbnail (`tse1.mm.bing.net/th?q=...`) is applied consistently for any article without an `og:image`.
- **Atom Feed Image Extraction**: Fixed edge case where `media:thumbnail` or `media:content` inside `media:group` was not extracted for Atom entries.
- **Duplicate Articles in Cache**: Deduplication now uses both `title-key` (source_id + title) and `url` to prevent the same article appearing twice after a refresh.

### Added

- **Scalar API Reference Integration**: Integrated Scalar's premium API documentation experience into the portal with complete endpoint testing and documentation.
- **OpenAPI 3.1 Specification**: Added a comprehensive OpenAPI definition available at `/openapi.json` to support machine-readable API discovery.
- **Interactive JSON Explorer**: New client-side JSON renderer with syntax highlighting and deep link support in the API console.
- **Enhanced API Console UI**: Re-designed the documentation interface with a collapsable sidebar, improved category guides, and better responsive behavior.
- **SQLite Article Storage**: High-performance persistence layer using `bun:sqlite` for news articles, with automatic WAL mode and efficient indexing.
- **Automatic Portal Refresh**: Integrated auto-refresh capability for the news portal with a dedicated "Live" status indicator and manual refresh controls.
- **Advanced Tech Blog Sources**: Expanded news registry with high-quality engineering and security blogs (Simon Willison, Jeff Geerling, Krebs on Security, etc.) parsed from curated OPML.
- **Project Multatuli Scraper**: New robust scraper using `cloakbrowser` to bypass protections and ingest complete historical archives from Project Multatuli's WordPress API.
- **Category Filtering in Everything API**: Added support for filtering by `category` in the `v2/everything` endpoint without requiring explicit source IDs.
- **Improved CSV Store Performance**: Implemented in-memory indexing and `mtime`-based cache invalidation for the `CsvArticleStore`.
- **Atom Feed Support**: Enhanced `RssAdapter` to support Atom syndication format.
- **Improved Media Extraction**: Added robust image extraction from `media:group` tags and HTML content fallback for RSS feeds.
- **Global News Expansion**: Added international sources like BBC World, NYT, The Guardian, and Hacker News.
- **Enhanced Indonesian Sources**: Expanded registry with BBC Indonesia, CNBC Ekonomi, Detik Finance, and more.
- **Dark Mode**: Complete dark theme implementation for the API explorer and news feed with system preference support.
- **Advanced UI Components**:
  - **Searchable Selects**: Custom dropdowns with filtering for news sources and categories.
  - **Quick Presets**: Interactive chips for rapid API parameter configuration.
  - **Performance Dashboard**: Real-time stats visualization for API endpoints in the console.
- **Advanced News Decoding**: Integrated `google-news-url-decoder` and `cloakbrowser` for resilient article link resolution and fetching.
- **Search & Discovery Improvements**:
  - **Keyword Highlighting**: Integrated visual highlighting for search terms within titles and descriptions in the news feed.
  - **Search Status Banner**: New interactive banner showing active search queries with a quick "Hapus Pencarian" option.
  - **Cross-Filter Support**: Users can now search within specific categories and within their saved bookmarks.
  - **New Sources**: Added "Project Multatuli English" and "National Geographic Indonesia" to the registry.
- **Advanced News Portal Features**:
  - **Reading Time Estimation**: Automatic calculation of estimated reading time for all articles.
  - **Article Bookmarking**: Complete system to save/bookmark favorite articles locally with a dedicated "Tersimpan" filter view.
  - **Social Sharing**: One-click functionality to copy article links to the clipboard for easy sharing.
  - **Infinite Pagination**: "Load More" capability for the news portal to explore more articles without refreshing.
  - **Interactive Feedback**: Integrated animated toast notification system for user actions like saving or sharing.
- **Advanced UI Refinements**:
  - **Editorial Design**: Re-designed the API explorer with a refined editorial aesthetic, including a grain overlay and high-contrast typography.
  - **Sidebar Rail**: New sticky navigation sidebar for switching between API endpoints and views.
  - **Searchable Selects v2**: Completely re-designed searchable selects with smoother animations and better accessibility.
  - **Typography Overhaul**: Integrated "Playfair Display" for headings and "Lora" for article reading to provide a premium feel.
- **API Documentation**: Added comprehensive `API_DOCUMENTATION.md` with integration guides for JavaScript, Python, and TypeScript, plus cURL examples.
- **Utility Test Scripts**: Added specialized scripts in `src/scripts/` for testing base64 encoding, URL decoding, and mutex behavior.
- **Immersive Article Reader**: Premium distraction-free reading mode for articles with:
  - **Text-to-Speech (TTS)**: Integrated voice narration to listen to articles.
  - **Typography Controls**: Adjustable font sizes and choice between Serif/Sans-serif fonts.
  - **Themes**: Multiple reading modes including Light, Sepia (comfort), and Dark (night).
  - **Progress Tracking**: Reading progress indicator and intuitive navigation.
- **UX Enhancements**: New tabbed interface in the API explorer to switch between visual feed and raw JSON responses.
- **HTML Adapter**: Support for parsing news from HTML pages using Cheerio, used for sources without active RSS feeds (e.g., Kompas Home, Kompas Tren).
- **CSV Article Store**: Persistent local storage for news articles in CSV format to ensure high availability.
- **Source Fallback**: Automatic fallback to the last known articles from CSV cache when a source fetch fails or is blocked.
- **New News Sources**: Expanded support to over 40 Indonesian and international news sources.
- **Refresh Script**: New utility `bun run refresh:news` to scrape latest articles and update the local CSV cache.
- **Google News Fallback**: Domain-based Google News RSS integration for sources with restricted or hidden native feeds.
- **New Dependencies**: Added `cheerio`, `csv-parse`, `csv-stringify`, `cloakbrowser`, `google-news-url-decoder`, and `playwright-core`.

### Changed

- **Unified Storage Architecture**: Refactored `src/app.ts` to support dynamic switching between SQLite and CSV storage based on environment configuration.
- **Service Resiliency**: Updated `NewsService` to better handle concurrent live refreshes and avoid server overloading.
- **Registry Overhaul**: Completely updated `sourceRegistry.ts` with more comprehensive source metadata, language support, and adapter configurations.
- **News Service**: Enhanced `NewsService` to handle multiple adapter types, article storage, and intelligent source filtering.
- **Documentation**: Updated `README.md` with new features, source list, and usage instructions for the refresh script.
- **Test Suite**: Expanded `index.test.ts` to cover HTML parsing, CSV fallback, and the expanded source registry.
- **Typography**: Switched default UI font to "Plus Jakarta Sans" for improved readability.

### Fixed

- **Performance**: Implemented in-memory indexing and `mtime`-based cache invalidation for the `CsvArticleStore`.
- Improved error handling and logging for failing news sources.
- Standardized source IDs and categories across the registry.
- Fixed image resolution for various Indonesian media outlets.
- Enhanced pagination logic and error handling across news routes.
- Removed redundant test scripts.
