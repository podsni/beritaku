/* eslint-disable no-console */
import { launchPersistentContext } from "cloakbrowser";

async function main() {
  console.log("Launching CloakBrowser with persistent context...");
  const ctx = await launchPersistentContext({
    userDataDir: "./scratch/chrome-profile",
    headless: true,
  });
  console.log("Browser launched successfully!");

  try {
    const page = ctx.pages()[0] || (await ctx.newPage());
    console.log("Navigating to PinterPolitik...");
    try {
      await page.goto("https://www.pinterpolitik.com/", {
        timeout: 20000,
        waitUntil: "domcontentloaded",
      });
      console.log("Navigation completed.");
    } catch (gotoError) {
      console.log(
        "Navigation timed out or failed, but continuing to inspect page content...",
        gotoError,
      );
    }
    console.log("Waiting 5 seconds for page rendering...");
    await new Promise((r) => setTimeout(r, 5000));
    const finalUrl = page.url();
    const title = await page.title();
    const content = await page.content();
    console.log("Final URL:", finalUrl);
    console.log("Title:", title);
    console.log("HTML content length:", content.length);
    console.log("HTML Snippet:", content.substring(0, 1000));
  } catch (e) {
    console.error("General error:", e);
  } finally {
    console.log("Closing browser...");
    await ctx.close();
    console.log("Browser closed.");
  }
}

main().catch(console.error);
