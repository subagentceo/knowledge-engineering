/**
 * vendor_cache_stats lane (KAN-12) — tiered-cache health through the
 * knowledge bridge. Aggregates L3 warehouse truth (dw.fact_cache_hits ×
 * dw.dim_cache_key, semantic_cache row count) and live L2 Redis state
 * (DBSIZE), degrading per source: each block is null when its backing
 * store is unreachable rather than failing the tool.
 *
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/docs/develop/build-server.md
 * @cite data/models/alloydb/fact_cache_hits.yaml
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonResult } from "../bridge-utils.js";
import {
  shapeCacheStats,
  type CacheStats,
  type HotKeyStatRow,
  type TierRollupRow,
} from "../../lib/cache-stats.js";

export interface CacheStatsReport {
  warehouse: CacheStats | null;
  redis: { keys: number } | null;
  l3_entries: number | null;
}

export function buildCacheStatsReport(input: {
  tierRows: TierRollupRow[] | null;
  hotRows: HotKeyStatRow[] | null;
  redisKeys: number | null;
  l3Entries: number | null;
}): CacheStatsReport {
  return {
    warehouse:
      input.tierRows === null
        ? null
        : shapeCacheStats(input.tierRows, input.hotRows ?? []),
    redis: input.redisKeys === null ? null : { keys: input.redisKeys },
    l3_entries: input.l3Entries,
  };
}

export function registerCacheStats(server: McpServer): void {
  server.tool(
    "vendor_cache_stats",
    "Tiered semantic-cache health: per-tier (L1/L2/L3) hit ratios and hottest keys from dw.fact_cache_hits, live Redis L2 key count, and L3 semantic_cache row count. Sources that are unreachable report null instead of failing.",
    {},
    async () => {
      let tierRows: TierRollupRow[] | null = null;
      let hotRows: HotKeyStatRow[] | null = null;
      let l3Entries: number | null = null;
      if (process.env.DATABASE_URL !== undefined || process.env.PGHOST !== undefined) {
        try {
          const { default: pg } = await import("pg");
          const pool = new pg.Pool(
            process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
          );
          try {
            const tiers = await pool.query(
              `SELECT tier, SUM(hits)::bigint AS hits, SUM(misses)::bigint AS misses,
                      SUM(promotions)::bigint AS promotions
               FROM dw.fact_cache_hits GROUP BY 1`,
            );
            tierRows = tiers.rows.map((r) => ({
              tier: String(r.tier),
              hits: Number(r.hits),
              misses: Number(r.misses),
              promotions: Number(r.promotions),
            }));
            const hot = await pool.query(
              `SELECT d.cache_key, d.lane, SUM(f.hits)::bigint AS hits
               FROM dw.fact_cache_hits f
               JOIN dw.dim_cache_key d ON d.surrogate_key = f.cache_key_sk AND d.is_current
               GROUP BY 1, 2 ORDER BY 3 DESC LIMIT 10`,
            );
            hotRows = hot.rows.map((r) => ({
              cache_key: String(r.cache_key),
              lane: r.lane === null ? null : String(r.lane),
              hits: Number(r.hits),
            }));
            const l3 = await pool.query("SELECT COUNT(*)::bigint AS n FROM semantic_cache");
            l3Entries = Number(l3.rows[0]?.n ?? 0);
          } finally {
            await pool.end();
          }
        } catch {
          // warehouse unreachable — report null blocks
        }
      }

      let redisKeys: number | null = null;
      if (process.env.REDIS_URL !== undefined) {
        try {
          const { createClient } = await import("redis");
          const nodeRedis = createClient({ url: process.env.REDIS_URL });
          nodeRedis.on("error", () => {});
          try {
            await nodeRedis.connect();
            redisKeys = await nodeRedis.dbSize();
          } finally {
            await nodeRedis.disconnect();
          }
        } catch {
          // L2 unreachable — report null block
        }
      }

      return jsonResult(buildCacheStatsReport({ tierRows, hotRows, redisKeys, l3Entries }));
    },
  );
}
