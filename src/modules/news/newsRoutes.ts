import { Hono } from "hono";
import { errorResponse } from "../../shared/http/responses";
import { parseEverythingQuery, parseTopHeadlinesQuery } from "./newsQueries";
import type { NewsService } from "./newsService";

export function createNewsRoutes(newsService: NewsService): Hono {
  const routes = new Hono();

  routes.get("/top-headlines/sources", (c) => {
    return c.json({
      status: "ok",
      sources: newsService.listSources(),
    });
  });

  routes.get("/top-headlines", async (c) => {
    try {
      const query = parseTopHeadlinesQuery(c.req.query());
      const result = await newsService.getTopHeadlines(query);

      return c.json({
        status: "ok",
        totalResults: result.totalResults,
        articles: result.articles,
      });
    } catch (error) {
      return errorResponse(c, error);
    }
  });

  routes.get("/everything", async (c) => {
    try {
      const query = parseEverythingQuery(c.req.query());
      const result = await newsService.searchEverything(query);

      return c.json({
        status: "ok",
        totalResults: result.totalResults,
        articles: result.articles,
      });
    } catch (error) {
      return errorResponse(c, error);
    }
  });

  return routes;
}
