import { badRequest } from "./errors";

export interface Pagination {
  readonly page: number;
  readonly pageSize: number;
  readonly offset: number;
}

export function parsePagination(query: Record<string, string>): Pagination {
  const page = parsePositiveInteger(query.page, "page", 1);
  const pageSize = parsePositiveInteger(query.pageSize, "pageSize", 20, 100);

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
  };
}

function parsePositiveInteger(
  rawValue: string | undefined,
  name: string,
  defaultValue: number,
  maxValue?: number,
): number {
  if (rawValue === undefined || rawValue === "") {
    return defaultValue;
  }

  const value = Number(rawValue);
  if (!Number.isInteger(value) || value < 1) {
    throw badRequest("parameterInvalid", `${name} must be a positive integer`);
  }

  if (maxValue !== undefined && value > maxValue) {
    throw badRequest(
      "parameterInvalid",
      `${name} must be less than or equal to ${maxValue}`,
    );
  }

  return value;
}
