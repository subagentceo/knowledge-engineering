// scripts/warm-semantic-cache.ts
//
// Dogfoods the semantic-cache skill at full-corpus scope: enumerates every
// tracked vendor/ markdown file (src/lib/vendor-corpus.ts), extracts a
// CSL item per doc, and persists the lot into the durable tier:
//
//   semantic_cache — via DurableStore.persistVolatile() (the same runtime
//                    promotion path agents use mid-session; entries are
//                    seeded at the promotion threshold)
//   csl_items      — full-corpus citation rows for researcher queries
//                    (the frontend's citations.json stays research-only;
//                    the postgres table carries the whole corpus)
//
// Usage: npm run cache:warm            (requires DATABASE_URL or local socket)
//        npm run cache:warm -- --stats (dry run: per-vendor counts only)
//
// @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
// @cite https://github.com/citation-style-language/schema

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCorpusItems } from "../src/lib/vendor-corpus.js";
import { DurableStore, PROMOTE_AFTER_HITS } from "../src/cache/durable-store.js";
import { detachCacheEventSink, flushCacheEvents, initCacheEvents } from "../src/cache/events.js";
import { CslItem } from "../src/lib/csl.js";
import { CSL_ITEMS_DDL } from "./ingest-citations.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function main(): Promise<void> {
  const { items, stats } = buildCorpusItems(REPO_ROOT);
  const vendors = Object.entries(stats.byVendor).sort((a, b) => b[1] - a[1]);
  console.log(`corpus: ${stats.total} markdown files across ${vendors.length} vendors`);
  for (const [vendor, count] of vendors.slice(0, 10)) {
    console.log(`  ${String(count).padStart(6)}  ${vendor}`);
  }

  if (process.argv.includes("--stats")) return;

  const { default: pg } = await import("pg");
  const pool = new pg.Pool(
    process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
  );
  try {
    const store = new DurableStore(pool);
    await store.init();
    await pool.query(readFileSync(resolve(REPO_ROOT, "data", "models", "alloydb_events_ddl.sql"), "utf8"));
    // KAN-4 follow-up: without an attached sink the L3 set/promote
    // events buffer in-process and drop — the warehouse never fills.
    await initCacheEvents(pool);
    const agentId = process.env.KE_AGENT_ID ?? "warm-semantic-cache";
    const promoted = await store.persistVolatile(
      items.map((item) => ({
        key: `csl:${item.id}`,
        value: item,
        sourcePath: item.source,
        hits: PROMOTE_AFTER_HITS,
      })),
      CslItem,
      async (entry) => {
        await pool.query(
          `INSERT INTO dw.events_cache_promotion (cache_key, source_path, agent_id, hits)
           VALUES ($1, $2, $3, $4)`,
          [entry.key, entry.sourcePath ?? null, agentId, entry.hits ?? 0],
        );
      },
    );
    console.log(`semantic_cache: promoted ${promoted} entries (events_cache_promotion appended)`);

    await pool.query(CSL_ITEMS_DDL);
    for (const item of items) {
      await pool.query(
        `INSERT INTO csl_items (id, type, title, item, source_path, issued_year)
         VALUES ($1, $2, $3, $4::jsonb, $5, $6)
         ON CONFLICT (id) DO UPDATE
           SET type = EXCLUDED.type, title = EXCLUDED.title,
               item = EXCLUDED.item, source_path = EXCLUDED.source_path,
               issued_year = EXCLUDED.issued_year, ingested_at = now()`,
        [
          item.id,
          item.type,
          item.title,
          JSON.stringify(item),
          item.source ?? "",
          item.issued?.["date-parts"]?.[0]?.[0] ?? null,
        ],
      );
    }
    console.log(`csl_items: upserted ${items.length} rows`);
    const flushed = await flushCacheEvents();
    console.log(`events_cache_access: flushed ${flushed} event(s)`);
  } finally {
    detachCacheEventSink();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
