/**
 * Bridge lane: support.claude.com.
 *
 * The support site is an Intercom help center. Articles are organized into
 * collections such as `14445694-claude-code`, `15399129-connectors`, etc.
 *
 * Phase E (O-E4): the 341 EN articles live at vendor/claude-support/ via
 * the support-mdfirst transform (O-E1) + sitemap-driven crawl (O-E2/E3).
 * support_article routes through mirrorOrFetch so the mirror serves by
 * default; live HTTP is fallback only. A new support_search tool exposes
 * the mirror manifest to the model for title-substring lookup without
 * round-tripping the help-center HTML.
 *
 * Tools:
 *   support_collections - list known collection slugs (curated; the upstream
 *                         site does not expose a stable JSON index)
 *   support_collection  - fetch a collection page and parse article links
 *   support_article     - fetch a specific article (mirror-first)
 *   support_search      - text-match article titles from the mirror manifest
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchHtml, fetchText, jsonResult, mirrorOrFetch } from "../bridge-utils.js";
import { getVendor } from "../../lib/vendor-manifests.js";

const BASE = "https://support.claude.com";

const KNOWN_COLLECTIONS: ReadonlyArray<{ slug: string; title: string }> = [
  { slug: "14445694-claude-code", title: "Claude Code" },
  { slug: "15399129-connectors", title: "Connectors" },
  { slug: "16163169-claude-desktop", title: "Claude Desktop" },
  { slug: "9387370-team-and-enterprise-plans", title: "Team and Enterprise plans" },
  { slug: "4078531-claude", title: "Claude (consumer)" },
  { slug: "4078534-privacy-and-legal", title: "Privacy and legal" },
  { slug: "4078535-safeguards", title: "Safeguards" },
];

function parseArticles(html: string, collectionSlug: string): Array<{ url: string; title: string }> {
  const seen = new Set<string>();
  const out: Array<{ url: string; title: string }> = [];
  // Article links look like /en/articles/<id>-<slug> on Intercom collection pages.
  const articleRe = /<a[^>]+href="(\/en\/articles\/[0-9]+-[a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = articleRe.exec(html)) !== null) {
    const slug = match[1] ?? "";
    const rawTitle = match[2] ?? "";
    if (!slug) continue;
    const url = `${BASE}${slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    const title = rawTitle.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!title) continue;
    out.push({ url, title });
  }
  return out;
}

export function registerSupportClaude(server: McpServer): void {
  server.tool(
    "support_collections",
    "List the curated set of support.claude.com collection slugs we recognize. Each entry is the slug used by the bridge tools.",
    {},
    async () =>
      jsonResult({
        source: `${BASE}/en/collections`,
        collections: KNOWN_COLLECTIONS,
      })
  );

  server.tool(
    "support_collection",
    "Fetch a collection page and return the article links it lists. `slug` is e.g. '14445694-claude-code'.",
    { slug: z.string().min(1) },
    async ({ slug }) => {
      const url = `${BASE}/en/collections/${slug}`;
      const html = await fetchHtml(url);
      const articles = parseArticles(html, slug);
      return jsonResult({ source: url, slug, count: articles.length, articles });
    }
  );

  server.tool(
    "support_article",
    "Fetch a specific support article. Accepts a full https://support.claude.com/en/articles/<id-slug> URL or the bare '<id>-<slug>' fragment. Mirror-first; allowlist-enforced HTTP fallback (rejects URLs outside support.claude.com/en/articles/).",
    { target: z.string().min(1) },
    async ({ target }) => {
      const ref = target.startsWith("http")
        ? target.replace(`${BASE}/en/articles/`, "")
        : target;
      const url = `${BASE}/en/articles/${ref}`;
      // Phase 4 C3: allowlist enforcement. Reject URLs outside the
      // support.claude.com/en/articles/ prefix so the tool can't be
      // weaponized to fetch arbitrary URLs via the support_article
      // surface.
      if (!url.startsWith(`${BASE}/en/articles/`)) {
        throw new Error(`AllowlistError: ${url} outside ${BASE}/en/articles/`);
      }
      const r = await mirrorOrFetch(url, fetchText);
      return jsonResult({ source: r.source, vendor: r.vendor, url, ref, html: r.body });
    }
  );

  server.tool(
    "support_search",
    "Text-match support.claude.com article titles against the local mirror manifest. Returns URL + slug-derived title for each hit, no HTTP required. Sourced from vendor/claude-support/urls.md (341 EN articles).",
    {
      text: z.string().min(1).describe("Substring to match against the article slug (case-insensitive)."),
      limit: z.number().int().positive().max(50).default(10),
    },
    async ({ text, limit }) => {
      const manifest = getVendor("claude-support");
      const needle = text.toLowerCase();
      const hits: Array<{ url: string; title: string }> = [];
      if (manifest) {
        for (const url of manifest.urlSet) {
          // /en/articles/<id>-<title-slug> → title derived from slug
          const m = url.match(/\/en\/articles\/[0-9]+-(.+)$/);
          if (!m) continue;
          const slug = m[1] ?? "";
          const title = slug.replace(/-/g, " ");
          if (!title.toLowerCase().includes(needle)) continue;
          hits.push({ url, title });
          if (hits.length >= limit) break;
        }
      }
      return jsonResult({
        source: "vendor/claude-support/urls.md",
        query: text,
        total_in_mirror: manifest?.urlSet.size ?? 0,
        hits,
      });
    }
  );
}
