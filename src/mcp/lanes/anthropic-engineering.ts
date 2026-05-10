/**
 * Bridge lane: anthropic.com/engineering.
 *
 * Tools:
 *   engineering_index   - fetch and parse the engineering index page
 *   engineering_fetch   - fetch a specific engineering post by URL/slug
 *   engineering_search  - text-match the index titles + descriptions
 *
 * All sources are public; no auth required at the lane level.
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchHtml, fetchText, jsonResult, mirrorOrFetch, normalizeSlug } from "../bridge-utils.js";

const BASE = "https://www.anthropic.com";
const INDEX_URL = `${BASE}/engineering`;

interface IndexEntry {
  title: string;
  url: string;
  blurb?: string;
}

function parseIndex(html: string): IndexEntry[] {
  // The engineering index lists posts as <a href="/engineering/<slug>"> with a
  // surrounding card. We pull anchor + nearest text without a full DOM parser
  // so the lane stays dependency-light.
  const seen = new Set<string>();
  const out: IndexEntry[] = [];
  const anchorRe = /<a[^>]+href="(\/engineering\/[a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRe.exec(html)) !== null) {
    const url = `${BASE}${match[1]}`;
    if (seen.has(url)) continue;
    seen.add(url);
    const inner = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!inner) continue;
    out.push({ url, title: inner });
  }
  return out;
}

export function registerAnthropicEngineering(server: McpServer): void {
  server.tool(
    "engineering_index",
    "List posts on https://www.anthropic.com/engineering. Returns title + url for each post discovered on the index page.",
    {},
    async () => {
      const html = await fetchHtml(INDEX_URL);
      const entries = parseIndex(html);
      return jsonResult({ source: INDEX_URL, count: entries.length, entries });
    }
  );

  server.tool(
    "engineering_fetch",
    "Fetch a specific engineering post. Accepts either a full https://www.anthropic.com/engineering/<slug> URL or the slug alone. Mirror-first: returns local body when present (source:'mirror'), else falls back to live HTTP (source:'http').",
    { target: z.string().min(1) },
    async ({ target }) => {
      const slug = normalizeSlug(target, `${BASE}/engineering/`);
      const url = `${BASE}/engineering/${slug}`;
      const r = await mirrorOrFetch(url, fetchText);
      return jsonResult({ source: r.source, vendor: r.vendor, url, slug, html: r.body });
    }
  );

  server.tool(
    "engineering_search",
    "Text-match the engineering index titles. Case-insensitive substring search; returns the matching entries.",
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
