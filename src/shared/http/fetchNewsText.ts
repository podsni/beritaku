export interface FetchNewsTextOptions {
  readonly browserLaunch?: BrowserLaunch;
  readonly browserTimeoutMs?: number;
  readonly directTimeoutMs?: number;
  readonly enableBrowserFallback?: boolean;
  readonly fetchImpl?: FetchImplementation;
  readonly overallTimeoutMs?: number;
}

export interface BrowserPage {
  goto(
    url: string,
    options: { readonly timeout: number; readonly waitUntil: string },
  ): Promise<unknown>;
  content(): Promise<string>;
}

export interface BrowserInstance {
  newPage(): Promise<BrowserPage>;
  close(): Promise<unknown>;
}

export type BrowserLaunch = (options: {
  readonly headless: boolean;
}) => Promise<BrowserInstance>;

type FetchImplementation = (
  url: string,
  init: {
    readonly headers: Record<string, string>;
    readonly signal: AbortSignal;
  },
) => Promise<Response>;

let cloakBrowserMutex = Promise.resolve();

export async function fetchNewsText(
  url: string,
  options: FetchNewsTextOptions = {},
): Promise<string> {
  return timeoutPromise(
    fetchNewsTextWithoutOverallTimeout(url, options),
    options.overallTimeoutMs ?? 25_000,
    "Fetching text timed out",
  );
}

async function fetchNewsTextWithoutOverallTimeout(
  url: string,
  options: FetchNewsTextOptions,
): Promise<string> {
  try {
    return await fetchDirectText(url, options);
  } catch (error) {
    if (!shouldUseBrowserFallback(url, error, options.enableBrowserFallback)) {
      throw error;
    }

    return fetchWithBrowser(url, options);
  }
}

async function fetchDirectText(
  url: string,
  options: FetchNewsTextOptions,
): Promise<string> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const response = await fetchImpl(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    signal: AbortSignal.timeout(options.directTimeoutMs ?? 15_000),
  });

  if (!response.ok) {
    throw new HttpFetchError(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  return response.text();
}

async function fetchWithBrowser(
  url: string,
  options: FetchNewsTextOptions,
): Promise<string> {
  const release = await acquireMutex();
  try {
    const launch = options.browserLaunch ?? (await loadCloakBrowserLaunch());
    const browser = await launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto(url, {
        timeout: options.browserTimeoutMs ?? 20_000,
        waitUntil: "domcontentloaded",
      });

      return await page.content();
    } finally {
      await browser.close();
    }
  } finally {
    release();
  }
}

async function loadCloakBrowserLaunch(): Promise<BrowserLaunch> {
  const cloakBrowser = (await import("cloakbrowser")) as {
    readonly launch?: unknown;
  };

  if (typeof cloakBrowser.launch !== "function") {
    throw new Error("cloakbrowser package does not expose launch()");
  }

  return cloakBrowser.launch as BrowserLaunch;
}

function shouldUseBrowserFallback(
  url: string,
  error: unknown,
  enabled: boolean | undefined,
): boolean {
  if (!isBrowserFallbackEnabled(enabled) || url.includes("news.google.com")) {
    return false;
  }

  if (error instanceof HttpFetchError) {
    return (
      [401, 403, 408, 429, 451, 503].includes(error.status) ||
      (error.status >= 520 && error.status <= 530)
    );
  }

  return error instanceof Error;
}

function isBrowserFallbackEnabled(enabled: boolean | undefined): boolean {
  return enabled ?? Bun.env.CLOAK_BROWSER === "1";
}

function acquireMutex(): Promise<() => void> {
  let release: () => void = () => {};
  const nextLock = new Promise<void>((resolve) => {
    release = resolve;
  });
  const wait = cloakBrowserMutex.then(() => release);
  cloakBrowserMutex = nextLock;
  return wait;
}

class HttpFetchError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

function timeoutPromise<T>(
  promise: Promise<T>,
  ms: number,
  errMsg: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(errMsg));
    }, ms);

    promise
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}
