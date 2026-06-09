/**
 * Bridge lane: citations (B1 — knowledge-engineering-citation-service).
 *
 * Vends CSL-JSON citations from the vendor mirror to research-team agents.
 * Offline-first like the vendor lane: the corpus is built in-process from
 * tracked vendor/ markdown (src/lib/vendor-corpus.ts) and memoized; no
 * database round-trip on the MCP path. The postgres warehouse
 * (dw.rpt_citations_by_year etc.) remains the analytical surface.
 *
 * Tools:
 *   citations_search   - rank corpus items by query terms (title/abstract/id)
 *   citations_get      - one CSL item by id, ready to paste as a citation
 *   citations_by_year  - publication-year histogram (research lane)
 *   citations_by_team  - items attributed to a research team page
 *
 * Citations (in test files):
 *   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 *   @cite vendor/anthropic-sitemap/research/team/economic-research.md
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../bridge-utils.js";
import { buildCorpusItems } from "../../lib/vendor-corpus.js";
import type { CslItem } from "../../lib/csl.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

let corpusCache: CslItem[] | undefined;

export function corpus(repoRoot: string = REPO_ROOT): CslItem[] {
  corpusCache ??= buildCorpusItems(repoRoot).items;
  return corpusCache;
}

export function searchCitations(items: CslItem[], query: string, limit: number): CslItem[] {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 0);
  if (terms.length === 0) return [];
  const scored = items
    .map((item) => {
      const haystack = `${item.title} ${item.abstract ?? ""} ${item.id}`.toLowerCase();
      const hits = terms.filter((t) => haystack.includes(t)).length;
      return { item, hits };
    })
    .filter((s) => s.hits === terms.length);
  return scored
    .sort((a, b) => a.item.id.localeCompare(b.item.id))
    .slice(0, limit)
    .map((s) => s.item);
}

export function citationsByYear(items: CslItem[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of items) {
    const year = item.issued?.["date-parts"]?.[0]?.[0];
    if (year === undefined) continue;
    out[String(year)] = (out[String(year)] ?? 0) + 1;
  }
  return out;
}

export function citationsByTeam(items: CslItem[], team: string): CslItem[] {
  const prefix = `anthropic-sitemap:research:team:${team}`;
  return items.filter((i) => i.id.startsWith(prefix));
}

export function registerCitations(server: McpServer): void {
  server.tool(
    "citations_search",
    "Search the mirrored citation corpus (CSL-JSON items extracted from vendor/). All query terms must match title, abstract, or id. Returns up to `limit` items.",
    { query: z.string().min(1), limit: z.number().int().min(1).max(50).default(10) },
    async ({ query, limit }) => jsonResult({ items: searchCitations(corpus(), query, limit) })
  );

  server.tool(
    "citations_get",
    "Fetch one CSL-JSON citation item by its id (e.g. anthropic-sitemap:research:clio). The item loads unchanged into citeproc/Zotero and maps onto Claude citations blocks.",
    { id: z.string().min(1) },
    async ({ id }) => {
      const item = corpus().find((i) => i.id === id);
      return jsonResult(item !== undefined ? { item } : { error: `unknown citation id: ${id}` });
    }
  );

  server.tool(
    "citations_by_year",
    "Publication-year histogram over the citation corpus (only items with a parsed issued date).",
    {},
    async () => jsonResult({ years: citationsByYear(corpus()) })
  );

  server.tool(
    "citations_by_team",
    "Citations attributed to an Anthropic research team page (economic-research, alignment, interpretability, societal-impacts).",
    { team: z.string().min(1) },
    async ({ team }) => jsonResult({ items: citationsByTeam(corpus(), team) })
  );
}
