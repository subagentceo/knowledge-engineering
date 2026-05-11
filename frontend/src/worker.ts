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

    // Everything else (including /vendor-manifest.json and the SPA
    // shell) goes through the static-asset binding directly.
    return env.ASSETS.fetch(request);
  },
};
