// scripts/load-citation-warehouse.ts
//
// Loads the economic-research citation warehouse (data/models/alloydb_citations_ddl.sql)
// from the csl_items table populated by ingest-citations/warm-semantic-cache:
//
//   1. validate every data/models/alloydb/*.yaml against the semantics
//      contract (src/lib/table-semantics.ts) — fail closed before touching SQL
//   2. apply DDL; SCD II upsert dw.dim_research_doc from the research lane
//      (anthropic-sitemap research pages + _pdfs first, per the focus order)
//   3. append dw.fact_doc_ingest rows for this run (grain: doc × run)
//   4. full-refresh dw.rpt_citations_by_year
//   5. emit frontend/public/table-semantics.json so the SPA can highlight
//      the alloydb table architecture without a DB round-trip
//
// Wired as `npm run dw:load`. Idempotent for dims/rpt; facts append per run.
//
// @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
// @cite data/models/kimball_ddl.sql

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseTableSemantics, validateInheritance } from "../src/lib/table-semantics.js";
import { buildCorpusItems } from "../src/lib/vendor-corpus.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ALLOYDB_DIR = resolve(REPO_ROOT, "data", "models", "alloydb");
const DDL_PATH = resolve(REPO_ROOT, "data", "models", "alloydb_citations_ddl.sql");
const VENDOR_DDL_PATH = resolve(REPO_ROOT, "data", "models", "alloydb_vendor_ddl.sql");
const MEMORY_DDL_PATH = resolve(REPO_ROOT, "data", "models", "alloydb_memory_ddl.sql");
const MEMORIES_JSON = resolve(REPO_ROOT, "frontend", "public", "memories.json");
const TEAM_STATS_JSON = resolve(REPO_ROOT, "frontend", "public", "team-stats.json");
const OUT_JSON = resolve(REPO_ROOT, "frontend", "public", "table-semantics.json");
const VENDOR_STATS_JSON = resolve(REPO_ROOT, "frontend", "public", "vendor-stats.json");

async function main(): Promise<void> {
  const tables = readdirSync(ALLOYDB_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .sort()
    .map((f) => parseTableSemantics(readFileSync(resolve(ALLOYDB_DIR, f), "utf8")));
  validateInheritance(tables);
  console.log(`semantics: ${tables.length} contracts valid`);

  mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(tables, null, 2) + "\n");
  console.log(`semantics: wrote frontend/public/table-semantics.json`);

  if (process.argv.includes("--no-pg")) return;

  const { default: pg } = await import("pg");
  const pool = new pg.Pool(
    process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
  );
  try {
    await pool.query(readFileSync(DDL_PATH, "utf8"));
    const runAt = new Date();
    const dateKey = Number(
      `${runAt.getUTCFullYear()}${String(runAt.getUTCMonth() + 1).padStart(2, "0")}${String(runAt.getUTCDate()).padStart(2, "0")}`,
    );

    // SCD II: close changed current rows, then insert missing/changed versions
    await pool.query(`
      UPDATE dw.dim_research_doc d
      SET row_effective_to = NOW(), is_current = FALSE
      FROM csl_items c
      WHERE d.csl_id = c.id AND d.is_current
        AND c.id LIKE 'anthropic-sitemap:%'
        AND (d.title IS DISTINCT FROM c.title
          OR d.url IS DISTINCT FROM (c.item->>'URL'))`);
    const dim = await pool.query(`
      INSERT INTO dw.dim_research_doc (csl_id, title, doc_type, url, research_team, issued_date)
      SELECT c.id, c.title, c.type, c.item->>'URL',
             CASE WHEN c.id LIKE 'anthropic-sitemap:research:team:%'
                  THEN split_part(c.id, ':', 4) END,
             CASE WHEN c.issued_year IS NOT NULL
                  THEN make_date(c.issued_year,
                       COALESCE((c.item->'issued'->'date-parts'->0->>1)::int, 1),
                       COALESCE((c.item->'issued'->'date-parts'->0->>2)::int, 1)) END
      FROM csl_items c
      WHERE c.id LIKE 'anthropic-sitemap:%'
        AND (c.id LIKE 'anthropic-sitemap:research%' OR c.id LIKE 'anthropic-sitemap:_pdfs%')
        AND NOT EXISTS (
          SELECT 1 FROM dw.dim_research_doc d WHERE d.csl_id = c.id AND d.is_current)
      RETURNING surrogate_key`);
    console.log(`dim_research_doc: ${dim.rowCount} new SCD-II rows`);

    const fact = await pool.query(
      `INSERT INTO dw.fact_doc_ingest (doc_sk, date_key, ingest_run_at, markdown_bytes, fields_extracted)
       SELECT d.surrogate_key, $1, $2,
              octet_length(c.item::text),
              (c.item ? 'title')::int + (c.item ? 'abstract')::int
            + (c.item ? 'issued')::int + (c.item ? 'URL')::int
       FROM dw.dim_research_doc d
       JOIN csl_items c ON c.id = d.csl_id
       WHERE d.is_current`,
      [dateKey, runAt],
    );
    console.log(`fact_doc_ingest: appended ${fact.rowCount} rows (grain: doc × run)`);

    await pool.query("BEGIN");
    await pool.query("TRUNCATE dw.rpt_citations_by_year");
    const rpt = await pool.query(`
      INSERT INTO dw.rpt_citations_by_year (issued_year, doc_count, dated_share)
      SELECT EXTRACT(YEAR FROM d.issued_date)::smallint,
             COUNT(DISTINCT d.csl_id),
             COUNT(DISTINCT d.csl_id)::numeric
               / NULLIF((SELECT COUNT(*) FROM dw.dim_research_doc WHERE is_current), 0)
      FROM dw.dim_research_doc d
      WHERE d.is_current AND d.issued_date IS NOT NULL
      GROUP BY 1`);
    await pool.query("COMMIT");
    console.log(`rpt_citations_by_year: refreshed ${rpt.rowCount} year rows (load_type: full)`);

    // B4 — full-corpus vendor stage: SCD I dim_vendor + per-run crawl facts
    await pool.query(readFileSync(VENDOR_DDL_PATH, "utf8"));
    const { items: corpusItems, stats } = buildCorpusItems(REPO_ROOT);
    const corpusByVendor = new Map<string, { docs: number; dated: number; host: string | null }>();
    for (const item of corpusItems) {
      const vendor = item.source?.match(/^vendor\/([^/]+)\//)?.[1];
      if (vendor === undefined) continue;
      const entry = corpusByVendor.get(vendor) ?? { docs: 0, dated: 0, host: null };
      entry.docs += 1;
      if (item.issued !== undefined) entry.dated += 1;
      if (entry.host === null && item.URL !== undefined) entry.host = new URL(item.URL).host;
      corpusByVendor.set(vendor, entry);
    }
    for (const [vendor, v] of corpusByVendor) {
      await pool.query(
        `INSERT INTO dw.dim_vendor (vendor_name, host, doc_count, last_loaded_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (vendor_name) DO UPDATE
           SET host = EXCLUDED.host, doc_count = EXCLUDED.doc_count,
               last_loaded_at = EXCLUDED.last_loaded_at`,
        [vendor, v.host, v.docs, runAt],
      );
      await pool.query(
        `INSERT INTO dw.fact_vendor_crawl (vendor_name, date_key, loaded_at, doc_count, dated_count)
         VALUES ($1, $2, $3, $4, $5)`,
        [vendor, dateKey, runAt, v.docs, v.dated],
      );
    }
    console.log(
      `dim_vendor: ${corpusByVendor.size} vendors (SCD I); fact_vendor_crawl: +${corpusByVendor.size} rows over ${stats.total} docs`,
    );

    // B12 feed: memory browser — current dim_memory rows + version counts
    await pool.query(readFileSync(MEMORY_DDL_PATH, "utf8"));
    const memories = await pool.query(`
      SELECT d.memory_path, d.curation_source, d.csl_id,
             d.row_effective_from AS effective_from,
             (SELECT COUNT(*) FROM dw.dim_memory h WHERE h.memory_path = d.memory_path) AS versions
      FROM dw.dim_memory d
      WHERE d.is_current
      ORDER BY d.memory_path`);
    writeFileSync(
      MEMORIES_JSON,
      JSON.stringify(
        memories.rows.map((r) => ({
          memory_path: r.memory_path,
          curation_source: r.curation_source,
          csl_id: r.csl_id,
          effective_from: new Date(r.effective_from as string).toISOString(),
          versions: Number(r.versions),
        })),
        null,
        2,
      ) + "\n",
    );
    console.log(`semantics: wrote frontend/public/memories.json (${memories.rowCount} memories)`);

    // B14: rpt refreshes (load_type: full) + static feeds
    await pool.query("BEGIN");
    await pool.query("TRUNCATE dw.rpt_citations_by_team");
    const team = await pool.query(`
      INSERT INTO dw.rpt_citations_by_team (research_team, doc_count)
      SELECT research_team, COUNT(DISTINCT csl_id)
      FROM dw.dim_research_doc WHERE is_current AND research_team IS NOT NULL
      GROUP BY 1`);
    await pool.query("TRUNCATE dw.rpt_vendor_freshness");
    const fresh = await pool.query(`
      INSERT INTO dw.rpt_vendor_freshness (vendor_name, last_loaded_at, load_runs, latest_doc_count)
      SELECT vendor_name, MAX(loaded_at), COUNT(*),
             (ARRAY_AGG(doc_count ORDER BY loaded_at DESC))[1]
      FROM dw.fact_vendor_crawl GROUP BY 1`);
    await pool.query("COMMIT");
    const teams = await pool.query("SELECT research_team, doc_count FROM dw.rpt_citations_by_team ORDER BY doc_count DESC");
    writeFileSync(TEAM_STATS_JSON, JSON.stringify(teams.rows, null, 2) + "\n");
    console.log(`rpt_citations_by_team: ${team.rowCount} rows; rpt_vendor_freshness: ${fresh.rowCount} rows; wrote team-stats.json`);

    // B6 feed: static per-vendor stats for the frontend visualizations
    const vendorStats = [...corpusByVendor.entries()]
      .map(([vendor, v]) => ({
        vendor,
        host: v.host,
        doc_count: v.docs,
        dated_count: v.dated,
        dated_share: v.docs === 0 ? 0 : Number((v.dated / v.docs).toFixed(4)),
      }))
      .sort((a, b) => b.doc_count - a.doc_count);
    writeFileSync(VENDOR_STATS_JSON, JSON.stringify(vendorStats, null, 2) + "\n");
    console.log(`semantics: wrote frontend/public/vendor-stats.json (${vendorStats.length} vendors)`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
