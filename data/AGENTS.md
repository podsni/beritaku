# Repository Guidelines

## Project Structure & Module Organization

Beritaku is a Bun + TypeScript news API built on Hono. Runtime code lives in
`src/`: `src/index.ts` starts the server, `src/app.ts` builds the Hono app, and
`src/modules/news/` contains routes, query parsing, source registry, RSS/HTML
adapters, caching, and CSV fallback storage. Web console assets and routes live
in `src/modules/web/`. Shared response, error, and pagination helpers are in
`src/shared/http/`. Tests currently use `src/index.test.ts`. Data snapshots are
stored in `data/news-cache.csv`; refresh tooling is in
`src/scripts/refreshNewsCsv.ts`.

## Build, Test, and Development Commands

- `bun install`: install dependencies from `bun.lock`.
- `bun run dev`: run the API locally with hot reload on port `3000` by default.
- `PORT=4000 bun run dev`: run locally on a custom port.
- `bun run start`: start the production-like local server.
- `bun test`: run Bun tests.
- `bun run refresh:news`: refresh `data/news-cache.csv`.
- `bun run bench`: execute `scripts/bench.sh`.
- `bun run check:fast`: run lint and format checks during development.
- `bun run check`: run typecheck, lint, and format checks before finishing.
- `bun run fix`: apply supported lint fixes and formatting.

## Coding Style & Naming Conventions

Use TypeScript ES modules with strict typing. Prefer `const`, avoid `var`, and
do not introduce `any` unless there is a narrow, justified boundary. Keep source
files camelCase, classes and interfaces PascalCase, and route/service modules
named by responsibility, for example `newsRoutes.ts` or `CsvArticleStore`.
Formatting is owned by `oxfmt` with an 80-column print width; linting is owned
by `oxlint`. Treat all lint warnings as work to fix.

## Testing Guidelines

Use `bun:test` with colocated `*.test.ts` files under `src/`. Prefer fixture
data and injected dependencies over live network calls, matching the existing
`createApp` test pattern. Add tests for new routes, parsers, adapters, cache
behavior, and CSV fallback behavior. Run `bun test` for test changes and
`bun run check` before declaring work complete.

## Commit & Pull Request Guidelines

Recent history mostly uses Conventional Commit style such as
`feat: add HTML adapter...`; follow that pattern with concise, imperative
subjects. Pull requests should describe user-visible changes, list verification
commands run, link related issues, and include screenshots when the web console
changes.

## Agent-Specific Instructions

Respect the zero-warning policy. Do not edit generated caches or unrelated dirty
files unless the task requires it. If source fetching changes, document any new
environment variables such as `NEWS_CSV_PATH` or `CLOAK_BROWSER`.
