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
import { maybeAccessLogger } from "../../lib/memory-access-log.js";
import { cslItemToMemory, memoryPathFor } from "../../lib/citation-memory.js";
import BM25 from "wink-bm25-text-search";
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

// B15 — BM25 volatile tier over the corpus (same engine as src/cache/lru-bm25.ts).
// Built lazily on first ranked query; counters surface usage via search meta.
type BM25Engine = ReturnType<typeof BM25>;
let engine: BM25Engine | undefined;
export const searchCounters = { bm25: 0, fallback: 0 };

function bm25Engine(items: CslItem[]): BM25Engine {
  if (engine !== undefined) return engine;
  const e = BM25();
  e.defineConfig({ fldWeights: { title: 2, body: 1 } });
  e.definePrepTasks([(t: string) => t.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 1)]);
  items.forEach((item, i) => {
    e.addDoc({ title: item.title, body: `${item.abstract ?? ""} ${item.id}` }, String(i));
  });
  e.consolidate();
  engine = e;
  return e;
}

/** BM25-ranked search with substring fallback for id-shaped queries. */
export function rankedSearch(items: CslItem[], query: string, limit: number): CslItem[] {
  if (query.includes(":")) {
    searchCounters.fallback += 1;
    return searchCitations(items, query, limit);
  }
  const hits = bm25Engine(items).search(query) as unknown as Array<[string, number]>;
  if (hits.length === 0) {
    searchCounters.fallback += 1;
    return searchCitations(items, query, limit);
  }
  searchCounters.bm25 += 1;
  return hits.slice(0, limit).flatMap(([idx]) => {
    const item = items[Number(idx)];
    return item === undefined ? [] : [item];
  });
}

// B13: fire-and-forget access logging; vending never blocks on the warehouse
function logAccess(items: CslItem[]): void {
  void maybeAccessLogger()
    .then((logger) => logger?.record(items.map((i) => i.id)))
    .catch(() => undefined);
}

// B19 — memory tools (memory.md path+content shape) over dw.dim_memory.
// memory_read falls back to a corpus-derived memory when postgres is absent;
// memory_write requires postgres (allowed_operations: scd2_rewrite).
async function pgPool(): Promise<import("pg").Pool | null> {
  if (process.env.DATABASE_URL === undefined && process.env.PGHOST === undefined) return null;
  const { default: pg } = await import("pg");
  return new pg.Pool(
    process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
  );
}

export function registerCitations(server: McpServer): void {
  server.tool(
    "citations_search",
    "Search the mirrored citation corpus (CSL-JSON items extracted from vendor/). BM25-ranked (title boosted) with substring fallback for id-shaped queries. Returns up to `limit` items plus ranking meta.",
    { query: z.string().min(1), limit: z.number().int().min(1).max(50).default(10) },
    async ({ query, limit }) => {
      const items = rankedSearch(corpus(), query, limit);
      logAccess(items);
      return jsonResult({ items, meta: { ...searchCounters } });
    }
  );

  server.tool(
    "citations_get",
    "Fetch one CSL-JSON citation item by its id (e.g. anthropic-sitemap:research:clio). The item loads unchanged into citeproc/Zotero and maps onto Claude citations blocks.",
    { id: z.string().min(1) },
    async ({ id }) => {
      const item = corpus().find((i) => i.id === id);
      if (item !== undefined) logAccess([item]);
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
    "memory_read",
    "Read a citation memory (managed-agents path+content shape). Reads dw.dim_memory's current row when postgres is configured (logging the access); otherwise derives the memory from the mirrored corpus. Accepts a memory path (/citations/<slug>.md) or a csl id.",
    { path_or_id: z.string().min(1) },
    async ({ path_or_id }) => {
      const pool = await pgPool();
      if (pool !== null) {
        try {
          const { rows } = await pool.query(
            `SELECT memory_path, content, csl_id, curation_source FROM dw.dim_memory
             WHERE is_current AND (memory_path = $1 OR csl_id = $1) LIMIT 1`,
            [path_or_id],
          );
          const row = rows[0];
          if (row !== undefined) {
            if (typeof row.csl_id === "string") logAccess([{ id: row.csl_id } as CslItem]);
            return jsonResult({ memory: row, source: "warehouse" });
          }
        } finally {
          await pool.end();
        }
      }
      const item = corpus().find(
        (i) => i.id === path_or_id || memoryPathFor(i.id) === path_or_id,
      );
      if (item === undefined) return jsonResult({ error: `unknown memory: ${path_or_id}` });
      return jsonResult({ memory: cslItemToMemory(item), source: "corpus" });
    }
  );

  server.tool(
    "memory_write",
    "Write a citation memory version (SCD II: closes the current row, inserts curation_source='agent'). Requires postgres (dim_memory allowed_operations: scd2_rewrite). Body is markdown; preserve the csl-json block when editing an existing memory.",
    { path: z.string().regex(/^\/citations\/[a-z0-9._-]+\.md$/), content: z.string().min(1) },
    async ({ path, content }) => {
      const pool = await pgPool();
      if (pool === null) {
        return jsonResult({ error: "memory_write requires postgres (DATABASE_URL/PGHOST)" });
      }
      try {
        await pool.query("BEGIN");
        const { rows } = await pool.query(
          `UPDATE dw.dim_memory SET row_effective_to = NOW(), is_current = FALSE
           WHERE memory_path = $1 AND is_current RETURNING csl_id`,
          [path],
        );
        await pool.query(
          `INSERT INTO dw.dim_memory (memory_path, content, csl_id, curation_source)
           VALUES ($1, $2, $3, 'agent')`,
          [path, content, rows[0]?.csl_id ?? null],
        );
        await pool.query("COMMIT");
        return jsonResult({ written: path, superseded: rows.length > 0 });
      } catch (err) {
        await pool.query("ROLLBACK");
        throw err;
      } finally {
        await pool.end();
      }
    }
  );

  server.tool(
    "citations_by_team",
    "Citations attributed to an Anthropic research team page (economic-research, alignment, interpretability, societal-impacts).",
    { team: z.string().min(1) },
    async ({ team }) => jsonResult({ items: citationsByTeam(corpus(), team) })
  );
}
