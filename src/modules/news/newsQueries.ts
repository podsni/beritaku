import { badRequest } from "../../shared/http/errors";
import { parsePagination } from "../../shared/http/pagination";
import {
  newsCategories,
  type EverythingQuery,
  type NewsCategory,
  type NewsCategoryFilter,
  type TopHeadlinesQuery,
} from "./types";

export function parseTopHeadlinesQuery(
  query: Record<string, string>,
): TopHeadlinesQuery {
  if (query.country !== undefined && query.country !== "id") {
    throw badRequest("parameterInvalid", "country must be id");
  }

  const category = parseCategory(query.category ?? "general");
  const sources = parseSources(query.sources);
  const pagination = parsePagination(query);

  return {
    country: "id",
    category,
    sources,
    ...pagination,
  };
}

export function parseEverythingQuery(
  query: Record<string, string>,
): EverythingQuery {
  const pagination = parsePagination(query);
  const sources = parseSources(query.sources);

  if (query.sortBy !== undefined && query.sortBy !== "publishedAt") {
    throw badRequest("parameterInvalid", "sortBy must be publishedAt");
  }

  return {
    q: normalizeOptionalString(query.q),
    sources,
    from: parseOptionalDate(query.from, "from"),
    to: parseOptionalDate(query.to, "to"),
    sortBy: "publishedAt",
    ...pagination,
  };
}

function parseCategory(value: string): NewsCategoryFilter {
  if (value === "all") {
    return "all";
  }

  if (newsCategories.includes(value as NewsCategory)) {
    return value as NewsCategory;
  }

  throw badRequest(
    "parameterInvalid",
    `category must be one of: all, ${newsCategories.join(", ")}`,
  );
}

function parseSources(
  value: string | undefined,
): readonly string[] | undefined {
  const normalized = normalizeOptionalString(value);
  if (normalized === undefined) {
    return undefined;
  }

  const sources = normalized
    .split(",")
    .map((source) => source.trim())
    .filter((source) => source.length > 0);

  if (sources.length === 0 || sources.includes("all")) {
    return undefined;
  }

  return sources;
}

function parseOptionalDate(
  value: string | undefined,
  name: string,
): Date | undefined {
  const normalized = normalizeOptionalString(value);
  if (normalized === undefined) {
    return undefined;
  }

  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    throw badRequest("parameterInvalid", `${name} must be a valid date`);
  }

  return date;
}

function normalizeOptionalString(
  value: string | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}
