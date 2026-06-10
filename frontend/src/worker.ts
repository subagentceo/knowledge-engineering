// frontend/src/worker.ts
//
// Phase 13.B+ (O7). Public-facing Cloudflare Worker for outcomesdk.com.
// Serves the Vite-built bundle + the vendor/ markdown tree as static
// assets via the ASSETS binding (declared in wrangler.jsonc).
//
// Routes:
//   GET /vendor/<vendor>/<path>   → static asset (markdown, raw text)
//   GET /vendor-manifest.json     → static asset (built by build-vendor-manifest.ts)
//   GET *                          → static asset; falls back to index.html
//                                    via wrangler.jsonc's not_found_handling
//                                    "single-page-application".

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  SITE_NAME: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Vendor markdown is served raw with a markdown content-type so
    // the frontend's fetch (Accept: text/markdown) gets a clean
    // body to feed marked.
    if (url.pathname.startsWith("/vendor/") && url.pathname.endsWith(".md")) {
      const r = await env.ASSETS.fetch(request);
      if (!r.ok) return r;
      const body = await r.text();
      return new Response(body, {
        headers: {
          "content-type": "text/markdown; charset=utf-8",
          "cache-control": "public, max-age=300",
          "x-site": env.SITE_NAME,
        },
      });
    }

    // B17 — stable per-citation URLs: /cite/<csl-id> returns one CSL-JSON
    // item (low-token, crawlable; the paid content unit for pay-per-crawl).
    if (url.pathname.startsWith("/cite/")) {
      const id = decodeURIComponent(url.pathname.slice("/cite/".length));
      const feed = await env.ASSETS.fetch(new Request(new URL("/citations.json", url.origin)));
      if (!feed.ok) return new Response("citations feed unavailable", { status: 503 });
      const items = (await feed.json()) as Array<{ id: string }>;
      const item = items.find((i) => i.id === id);
      if (item === undefined) return new Response("unknown citation id", { status: 404 });
      return new Response(JSON.stringify(item, null, 2) + "\n", {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "public, max-age=3600",
          "link": '<https://github.com/citation-style-language/schema>; rel="describedby"',
          "x-site": env.SITE_NAME,
        },
      });
    }

    // Everything else (including /vendor-manifest.json and the SPA
    // shell) goes through the static-asset binding directly.
    return env.ASSETS.fetch(request);
  },
};
