/**
 * Bridge lane: support.claude.com.
 *
 * The support site is an Intercom help center. Articles are organized into
 * collections such as `14445694-claude-code`, `15399129-connectors`, etc.
 *
 * Tools:
 *   support_collections - list known collection slugs (curated; the upstream
 *                         site does not expose a stable JSON index)
 *   support_collection  - fetch a collection page and parse article links
 *   support_article     - fetch a specific article by URL or slug
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchHtml, fetchText, jsonResult } from "../bridge-utils.js";

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
    const url = `${BASE}${match[1]}`;
    if (seen.has(url)) continue;
    seen.add(url);
    const title = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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
    "Fetch a specific support article. Accepts a full https://support.claude.com/en/articles/<id-slug> URL or the bare '<id>-<slug>' fragment.",
    { target: z.string().min(1) },
    async ({ target }) => {
      const ref = target.startsWith("http")
        ? target.replace(`${BASE}/en/articles/`, "")
        : target;
      const url = `${BASE}/en/articles/${ref}`;
      const html = await fetchText(url);
      return jsonResult({ source: url, ref, html });
    }
  );
}
