import { createApp } from "./app";

const app = createApp();
const port = Number(Bun.env.PORT ?? 3000);

Bun.serve({
  port,
  fetch: app.fetch,
});

void Bun.write(
  Bun.stdout,
  `News API Indonesia listening on http://localhost:${port}\n`,
);
