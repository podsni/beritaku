export type ErrorStatus = 400 | 404 | 500 | 502;

export class HttpError extends Error {
  readonly code: string;
  readonly status: ErrorStatus;

  constructor(status: ErrorStatus, code: string, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
  }
}

export function badRequest(code: string, message: string): HttpError {
  return new HttpError(400, code, message);
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
