/**
 * @cite vendor/claude-sitemap/urls.md
 */
/**
 * Bridge lane: claude.com/blog.
 *
 * Tools:
 *   blog_index   - list posts on https://www.claude.com/blog
 *   blog_fetch   - fetch a specific post by URL or slug
 *   blog_search  - text-match index titles
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchHtml, fetchText, jsonResult, mirrorOrFetch, normalizeSlug } from "../bridge-utils.js";

const BASE = "https://www.claude.com";
const INDEX_URL = `${BASE}/blog`;

interface IndexEntry {
  title: string;
  url: string;
}

function parseIndex(html: string): IndexEntry[] {
  const seen = new Set<string>();
  const out: IndexEntry[] = [];
  const anchorRe = /<a[^>]+href="(\/blog\/[a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRe.exec(html)) !== null) {
    const slug = match[1] ?? "";
    const rawInner = match[2] ?? "";
    if (!slug) continue;
    const url = `${BASE}${slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    const inner = rawInner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!inner) continue;
    out.push({ url, title: inner });
  }
  return out;
}

export function registerClaudeBlog(server: McpServer): void {
  server.tool(
    "blog_index",
    "List posts on https://www.claude.com/blog. Returns title + url for each post discovered on the index page.",
    {},
    async () => {
      const html = await fetchHtml(INDEX_URL);
      const entries = parseIndex(html);
      return jsonResult({ source: INDEX_URL, count: entries.length, entries });
    }
  );

  server.tool(
    "blog_fetch",
    "Fetch a specific Claude blog post. Accepts a full https://www.claude.com/blog/<slug> URL or the slug alone. Mirror-first; falls back to live HTTP.",
    { target: z.string().min(1) },
    async ({ target }) => {
      const slug = normalizeSlug(target, `${BASE}/blog/`);
      const url = `${BASE}/blog/${slug}`;
      const r = await mirrorOrFetch(url, fetchText);
      return jsonResult({ source: r.source, vendor: r.vendor, url, slug, html: r.body });
    }
  );

  server.tool(
    "blog_search",
    "Text-match the Claude blog index titles. Case-insensitive substring search.",
    { text: z.string().min(1), limit: z.number().int().positive().max(50).default(10) },
    async ({ text, limit }) => {
      const html = await fetchHtml(INDEX_URL);
      const needle = text.toLowerCase();
      const hits = parseIndex(html)
        .filter((e) => e.title.toLowerCase().includes(needle))
        .slice(0, limit);
      return jsonResult({ source: INDEX_URL, query: text, hits });
    }
  );
}
