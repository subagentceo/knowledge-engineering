/**
 * Tiered-cache SLO evaluation (KAN-14) — closes the KAN-4 chain.
 *
 * Pure judgement over the cache-stats feed shape: each tier gets an
 * SLO verdict. Tiers without enough traffic report "no-data" rather
 * than failing, so the guardrail is meaningful on fresh databases and
 * strict once real traffic exists. dw:load prints the verdicts; the
 * verify chain asserts the evaluator's behavior, not live numbers.
 *
 * Thresholds: L1 is the in-process tier and should absorb most reads
 * once warmed (dreams pass, KAN-9); L2 Redis catches cross-process
 * reuse; L3 is the durable floor where misses mean "never learned".
 *
 * @cite data/models/alloydb/fact_cache_hits.yaml
 */

import type { CacheStats } from "./cache-stats.js";

export const MIN_OPS_FOR_SLO = 100;

export const TIER_SLO: Record<string, number> = {
  L1: 0.5,
  L2: 0.3,
  L3: 0.1,
};

export interface TierSloVerdict {
  tier: string;
  status: "ok" | "breach" | "no-data";
  hit_ratio: number;
  threshold: number;
  ops: number;
}

export function evaluateCacheSlo(stats: CacheStats): TierSloVerdict[] {
  return stats.tiers.map((t) => {
    const ops = t.hits + t.misses;
    const threshold = TIER_SLO[t.tier] ?? 0;
    return {
      tier: t.tier,
      status: ops < MIN_OPS_FOR_SLO ? "no-data" : t.hit_ratio >= threshold ? "ok" : "breach",
      hit_ratio: t.hit_ratio,
      threshold,
      ops,
    };
  });
}

export function formatSloLine(verdicts: TierSloVerdict[]): string {
  return verdicts
    .map((v) =>
      v.status === "no-data"
        ? `${v.tier} no-data(${v.ops} ops)`
        : `${v.tier} ${v.status} (${(v.hit_ratio * 100).toFixed(1)}% vs ${(v.threshold * 100).toFixed(0)}%)`,
    )
    .join("; ");
}
