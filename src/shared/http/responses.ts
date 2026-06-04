import type { Context } from "hono";
import { isHttpError } from "./errors";

export function errorResponse(c: Context, error: unknown): Response {
  if (isHttpError(error)) {
    return c.json(
      {
        status: "error",
        code: error.code,
        message: error.message,
      },
      error.status,
    );
  }

  return c.json(
    {
      status: "error",
      code: "serverError",
      message: "Unexpected server error",
    },
    500,
  );
}
