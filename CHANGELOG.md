# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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
- **Visual News Feed**: Interactive card-based UI in the explorer console with lazy-loaded images, Indonesian date formatting, and source-specific fallbacks.
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

- **Registry Overhaul**: Completely updated `sourceRegistry.ts` with more comprehensive source metadata, language support, and adapter configurations.
- **News Service**: Enhanced `NewsService` to handle multiple adapter types, article storage, and intelligent source filtering.
- **Documentation**: Updated `README.md` with new features, source list, and usage instructions for the refresh script.
- **Test Suite**: Expanded `index.test.ts` to cover HTML parsing, CSV fallback, and the expanded source registry.
- **Typography**: Switched default UI font to "Plus Jakarta Sans" for improved readability.

### Fixed

- Improved error handling and logging for failing news sources.
- Standardized source IDs and categories across the registry.
- Fixed image resolution for various Indonesian media outlets.
