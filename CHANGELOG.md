# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **HTML Adapter**: Support for parsing news from HTML pages using Cheerio, used for sources without active RSS feeds (e.g., Kompas Home, Kompas Tren).
- **CSV Article Store**: Persistent local storage for news articles in CSV format to ensure high availability.
- **Source Fallback**: Automatic fallback to the last known articles from CSV cache when a source fetch fails or is blocked.
- **New News Sources**: Expanded support to over 30 Indonesian news sources, including Project Multatuli, Tirto, Detik, CNN Indonesia, and many others.
- **Refresh Script**: New utility `bun run refresh:news` to scrape latest articles and update the local CSV cache.
- **Google News Fallback**: Domain-based Google News RSS integration for sources with restricted or hidden native feeds.
- **New Dependencies**: Added `cheerio`, `csv-parse`, and `csv-stringify`.

### Changed
- **Registry Overhaul**: Completely updated `sourceRegistry.ts` with more comprehensive source metadata and adapter configurations.
- **News Service**: Enhanced `NewsService` to handle multiple adapter types and article storage.
- **Documentation**: Updated `README.md` with new features, source list, and usage instructions for the refresh script.
- **Test Suite**: Expanded `index.test.ts` to cover HTML parsing, CSV fallback, and the expanded source registry.

### Fixed
- Improved error handling and logging for failing news sources.
- Standardized source IDs and categories across the registry.
