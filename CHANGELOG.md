# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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
