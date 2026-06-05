/* eslint-disable no-console */
import * as cheerio from "cheerio";

async function main() {
  // A sample Google News link for IDN Times
  const googleNewsUrl =
    "https://news.google.com/rss/articles/CBMivgFBVV95cUxNT0J5QjZfZVhSUGV4WWlqZXZEdFhHZlBTa2JZQS1LeXBtaExKd0xvMXRmWVFUX040cUtZUFF5YzZsY2dfM3BIZHNJTm5ZNkNja190WFZ6UFNUUFY0TTVjc2lrQmFib08zWmY0cFQ1cEt2ekp0aHRBalVra1JiaVdYYklxUTdXQ1FnVXh4UnJoSHRIZzZQT0VJbmNydnZrTjZsS2ZQeWhvcFl5cmMwbXRFQnIwTUNpYi1sRVkwWkVn0gHDAUFVX3lxTE9sN0hyVndsalBQYW9UT3RkcllwekFvVlFlSGNXa2JaLXhDUFBTQV94dGI0MkJUTFJJdjY4WlVQZEttdjkwanI3b2VoekVQQm5odTNzbmItNnQ3Wk52RV9rSldDU3RrQ0Jzc3V0NUxFbG5vQnI3dndyczJQeDN0c0VFS2t0Zk50RmlWdGxxdkJvNFlLRTFTVldPeHNoY1NITWJjd0NXZ0xMb29wLTJsRTdnZlR4bjh4YXJUOVJkTEdEWnJGMA?oc=5";

  console.log("Fetching Google News URL...");
  try {
    const response = await fetch(googleNewsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    console.log("Status:", response.status, response.statusText);
    const html = await response.text();
    console.log("HTML length:", html.length);

    // Check if we can find the real URL in noscript refresh tag
    const $ = cheerio.load(html);
    const refreshMeta = $('meta[http-equiv="refresh"]').attr("content");
    console.log("Refresh meta content:", refreshMeta);

    let targetUrl = response.url; // fallback to the redirect url
    if (refreshMeta) {
      const match = refreshMeta.match(/url=(.+)/i);
      if (match && match[1]) {
        targetUrl = match[1];
        console.log("Extracted Target URL:", targetUrl);
      }
    }

    if (targetUrl) {
      console.log("\nFetching target page to extract og:image...");
      const targetResponse = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
      const targetHtml = await targetResponse.text();
      const $target = cheerio.load(targetHtml);
      const ogImage =
        $target('meta[property="og:image"]').attr("content") ||
        $target('meta[name="twitter:image"]').attr("content");
      console.log("Extracted og:image:", ogImage);
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

main().catch(console.error);
