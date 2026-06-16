// scripts/dreams-consolidate.ts
//
// B3 — dreams consolidation for the citation memory-store. Reflects on
// accumulated access facts to curate memories (the dreams pattern: reflect
// on past sessions, rewrite memory, surface insights):
//
//   1. aggregate dw.fact_memory_access per current memory
//   2. for memories at/above --min-accesses (default 3, mirroring the
//      cache promotion threshold), rewrite dim_memory content with a
//      "## curation" section (access stats + first/last seen) — SCD II:
//      close the old row, insert curation_source='dreams'
//   3. report counts; idempotent — already-curated rows with no new
//      accesses are skipped
//
// Wired as `npm run dreams:consolidate`. Recurring cadence via the
// /schedule bridge (see .claude/skills/dreams-consolidate/SKILL.md).
//
// @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
// @cite data/models/alloydb/fact_memory_access.yaml
// @cite data/models/alloydb/fact_cache_hits.yaml (KAN-9 L2 warming)

export interface AccessStats {
  accesses: number;
  agents: number;
  first_at: string;
  last_at: string;
}

export interface HotKeyRow {
  cache_key: string;
  payload: unknown;
  hits: number;
}

/**
 * Pure selection: hottest keys first, zero-hit keys dropped, capped at
 * `limit` so a warming pass never floods L1 (64 MiB) or Redis L2.
 */
export function pickWarmList(rows: HotKeyRow[], limit = 100): HotKeyRow[] {
  return rows
    .filter((r) => r.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, limit);
}

const CURATION_RE = /\n## curation\n[\s\S]*$/;

/**
 * Pure rewrite: append (or replace) the curation section. The csl-json
 * block and human summary above it are preserved verbatim, so
 * memoryToCslJson round-trips before and after dreaming.
 */
export function curateContent(content: string, stats: AccessStats): string {
  const base = content.replace(CURATION_RE, "");
  return [
    base.trimEnd(),
    "",
    "## curation",
    `dreams-curated from ${stats.accesses} access(es) by ${stats.agents} agent(s)`,
    `first ${stats.first_at} — last ${stats.last_at}`,
  ].join("\n");
}

async function main(): Promise<void> {
  const flagIdx = process.argv.indexOf("--min-accesses");
  const minAccesses = flagIdx === -1 ? 3 : Number(process.argv[flagIdx + 1]);
  if (!Number.isInteger(minAccesses) || minAccesses < 1) {
    throw new Error(`dreams: invalid --min-accesses ${process.argv[flagIdx + 1]}`);
  }
  const { default: pg } = await import("pg");
  const pool = new pg.Pool(
    process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
  );
  try {
    // L2 warming below emits cache events — sink them to the warehouse.
    const { initCacheEvents } = await import("../src/cache/events.js");
    await initCacheEvents(pool);
    const { rows } = await pool.query(
      `SELECT d.surrogate_key, d.memory_path, d.content, d.csl_id,
              SUM(f.access_count)::bigint AS accesses,
              COUNT(DISTINCT f.agent_id)::bigint AS agents,
              MIN(f.accessed_at) AS first_at, MAX(f.accessed_at) AS last_at
       FROM dw.dim_memory d
       JOIN dw.fact_memory_access f ON f.memory_sk = d.surrogate_key
       WHERE d.is_current
       GROUP BY 1, 2, 3, 4
       HAVING SUM(f.access_count) >= $1`,
      [minAccesses],
    );
    let curated = 0;
    for (const r of rows) {
      const next = curateContent(String(r.content), {
        accesses: Number(r.accesses),
        agents: Number(r.agents),
        first_at: new Date(r.first_at as string).toISOString(),
        last_at: new Date(r.last_at as string).toISOString(),
      });
      if (next === r.content) continue; // no new signal since last dream
      await pool.query("BEGIN");
      await pool.query(
        `UPDATE dw.dim_memory SET row_effective_to = NOW(), is_current = FALSE
         WHERE surrogate_key = $1`,
        [r.surrogate_key],
      );
      await pool.query(
        `INSERT INTO dw.dim_memory (memory_path, content, csl_id, curation_source)
         VALUES ($1, $2, $3, 'dreams')`,
        [r.memory_path, next, r.csl_id],
      );
      await pool.query("COMMIT");
      curated += 1;
    }
    console.log(
      `dreams: ${rows.length} memory(ies) at >=${minAccesses} accesses; curated ${curated} (SCD II)`,
    );

    // KAN-9: warm Redis L2 with the hottest cached knowledge so the next
    // session's reads resolve volatile instead of round-tripping to L3.
    // Heat comes from fact_cache_hits; payloads from semantic_cache.
    if (!process.argv.includes("--skip-warm")) {
      const hot = await pool.query(
        `SELECT s.key AS cache_key, s.payload, SUM(f.hits)::bigint AS hits
         FROM dw.fact_cache_hits f
         JOIN dw.dim_cache_key d ON d.surrogate_key = f.cache_key_sk AND d.is_current
         JOIN semantic_cache s ON s.key = d.cache_key
         GROUP BY 1, 2`,
      );
      const warmList = pickWarmList(
        hot.rows.map((r) => ({
          cache_key: String(r.cache_key),
          payload: r.payload,
          hits: Number(r.hits),
        })),
      );
      if (warmList.length === 0) {
        console.log("dreams: no hot cache keys to warm");
      } else {
        const { createClient } = await import("redis");
        const { toRedisLike } = await import("../src/lib/redis-adapter.js");
        const { set } = await import("../src/cache/lru-bm25.js");
        const nodeRedis = createClient({ url: process.env.REDIS_URL ?? "redis://127.0.0.1:6379" });
        nodeRedis.on("error", () => {});
        try {
          await nodeRedis.connect();
          const redis = toRedisLike(nodeRedis);
          for (const entry of warmList) {
            await set(redis, entry.cache_key, entry.payload);
          }
          console.log(`dreams: warmed L2 with ${warmList.length} hot key(s) (curation_source=dreams)`);
        } catch (err) {
          console.log(`dreams: L2 warm skipped — ${(err as Error).message}`);
        } finally {
          await nodeRedis.disconnect();
        }
      }
    }
  } finally {
    const { detachCacheEventSink, flushCacheEvents } = await import("../src/cache/events.js");
    await flushCacheEvents().catch(() => undefined);
    detachCacheEventSink();
    await pool.end();
  }
}

const invokedDirectly =
  process.argv[1] !== undefined &&
  import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "");
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
