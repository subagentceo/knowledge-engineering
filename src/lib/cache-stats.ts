/**
 * cache-stats.json feed shape — per-tier hit ratios + hottest keys from
 * dw.fact_cache_hits, published to frontend/public/ by dw:load
 * (scripts/load-citation-warehouse.ts) the same way as
 * vendor-stats.json. Consumed by the subagentknowledge.com cache panel
 * (KAN-11) and the vendor_cache_stats MCP tool (KAN-12).
 *
 * @cite data/models/alloydb/fact_cache_hits.yaml
 */

export interface TierRollupRow {
  tier: string;
  hits: number;
  misses: number;
  promotions: number;
}

export interface HotKeyStatRow {
  cache_key: string;
  lane: string | null;
  hits: number;
}

export interface CacheStats {
  generated_at: string;
  tiers: Array<{
    tier: string;
    hits: number;
    misses: number;
    promotions: number;
    hit_ratio: number;
  }>;
  hottest_keys: HotKeyStatRow[];
}

export const TIER_ORDER = ["L1", "L2", "L3"] as const;

export function shapeCacheStats(
  tierRows: TierRollupRow[],
  hotRows: HotKeyStatRow[],
  now: Date = new Date(),
): CacheStats {
  const byTier = new Map(tierRows.map((r) => [r.tier, r]));
  return {
    generated_at: now.toISOString(),
    tiers: TIER_ORDER.map((tier) => {
      const r = byTier.get(tier) ?? { tier, hits: 0, misses: 0, promotions: 0 };
      const total = r.hits + r.misses;
      return {
        tier,
        hits: r.hits,
        misses: r.misses,
        promotions: r.promotions,
        hit_ratio: total === 0 ? 0 : Number((r.hits / total).toFixed(4)),
      };
    }),
    hottest_keys: [...hotRows].sort((a, b) => b.hits - a.hits).slice(0, 10),
  };
}
