/* eslint-disable no-console */
import * as cheerio from "cheerio";

async function main() {
  const googleNewsUrl =
    "https://news.google.com/rss/articles/CBMivgFBVV95cUxNT0J5QjZfZVhSUGV4WWlqZXZEdFhHZlBTa2JZQS1LeXBtaExKd0xvMXRmWVFUX040cUtZUFF5YzZsY2dfM3BIZHNJTm5ZNkNja190WFZ6UFNUUFY0TTVjc2lrQmFib08zWmY0cFQ1cEt2ekp0aHRBalVra1JiaVdYYklxUTdXQ1FnVXh4UnJoSHRIZzZQT0VJbmNydnZrTjZsS2ZQeWhvcFl5cmMwbXRFQnIwTUNpYi1sRVkwWkVn0gHDAUFVX3lxTE9sN0hyVndsalBQYW9UT3RkcllwekFvVlFlSGNXa2JaLXhDUFBTQV94dGI0MkJUTFJJdjY4WlVQZEttdjkwanI3b2VoekVQQm5odTNzbmItNnQ3Wk52RV9rSldDU3RrQ0Jzc3V0NUxFbG5vQnI3dndyczJQeDN0c0VFS2t0Zk50RmlWdGxxdkJvNFlLRTFTVldPeHNoY1NITWJjd0NXZ0xMb29wLTJsRTdnZlR4bjh4YXJUOVJkTEdEWnJGMA?oc=5";

  console.log("Fetching Google News URL...");
  try {
    const response = await fetch(googleNewsUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Look at all anchors
    const links: string[] = [];
    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href && (href.startsWith("http") || href.includes("idntimes"))) {
        links.push(href);
      }
    });

    console.log("Found links in anchors:", links.slice(0, 10));

    // Search for any absolute URLs in the script or text matching standard domains
    const regex = /https?:\/\/[^\s"'<>]+/g;
    const matches = html.match(regex) || [];
    const externalMatches = matches.filter(
      (url) => !url.includes("google.com") && !url.includes("gstatic.com"),
    );
    console.log(
      "Found external URL matches in raw HTML:",
      [...new Set(externalMatches)].slice(0, 10),
    );
  } catch (e) {
    console.error("Error:", e);
  }
}

main().catch(console.error);
