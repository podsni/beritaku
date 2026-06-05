declare module "google-news-url-decoder" {
  export interface DecodeResult {
    readonly status: boolean;
    readonly decoded_url: string;
  }
  export class GoogleDecoder {
    constructor();
    decode(url: string): Promise<DecodeResult>;
    decodeUrl(url: string): Promise<DecodeResult>;
    decodeBatch(urls: readonly string[]): Promise<readonly DecodeResult[]>;
  }
}
