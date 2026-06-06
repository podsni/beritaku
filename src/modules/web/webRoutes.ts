import { Hono } from "hono";
import { appCss, appJs } from "./webAssets";
import { createOpenApiSpec } from "./openApiSpec";
import { renderHomePage } from "./webPage";

export function createWebRoutes(): Hono {
  const routes = new Hono();

  routes.get("/", (c) => {
    return c.html(renderHomePage());
  });

  routes.get("/assets/app.css", (c) => {
    return c.body(appCss, 200, {
      "content-type": "text/css; charset=utf-8",
    });
  });

  routes.get("/assets/app.js", (c) => {
    return c.body(appJs, 200, {
      "content-type": "text/javascript; charset=utf-8",
    });
  });

  routes.get("/openapi.json", (c) => {
    const origin = new URL(c.req.url).origin;

    return c.json(createOpenApiSpec(origin));
  });

  return routes;
}
