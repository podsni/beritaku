/* eslint-disable no-console */
import { GoogleDecoder } from "google-news-url-decoder";

async function main() {
  const googleNewsUrl =
    "https://news.google.com/rss/articles/CBMivgFBVV95cUxNT0J5QjZfZVhSUGV4WWlqZXZEdFhHZlBTa2JZQS1LeXBtaExKd0xvMXRmWVFUX040cUtZUFF5YzZsY2dfM3BIZHNJTm5ZNkNja190WFZ6UFNUUFY0TTVjc2lrQmFib08zWmY0cFQ1cEt2ekp0aHRBalVra1JiaVdYYklxUTdXQ1FnVXh4UnJoSHRIZzZQT0VJbmNydnZrTjZsS2ZQeWhvcFl5cmMwbXRFQnIwTUNpYi1sRVkwWkVn0gHDAUFVX3lxTE9sN0hyVndsalBQYW9UT3RkcllwekFvVlFlSGNXa2JaLXhDUFBTQV94dGI0MkJUTFJJdjY4WlVQZEttdjkwanI3b2VoekVQQm5odTNzbmItNnQ3Wk52RV9rSldDU3RrQ0Jzc3V0NUxFbG5vQnI3dndyczJQeDN0c0VFS2t0Zk50RmlWdGxxdkJvNFlLRTFTVldPeHNoY1NITWJjd0NXZ0xMb29wLTJsRTdnZlR4bjh4YXJUOVJkTEdEWnJGMA?oc=5";

  console.log("Decoding Google News URL...");
  try {
    const decoder = new GoogleDecoder();
    const decoded = await decoder.decode(googleNewsUrl);
    console.log("Decoded target URL:", decoded);
  } catch (e) {
    console.error("Decoding error:", e);
  }
}

main().catch(console.error);
