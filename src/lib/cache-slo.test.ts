/**
 * @tdd green
 * @cite seeds/citations/define-outcomes.md
 * @cite seeds/citations/dreams.md
 *
 * SLO guardrail: src/lib/cache-slo.ts over the cache-stats feed
 * (contract: data/models/alloydb/fact_cache_hits.yaml). Closes the
 * KAN-4 chain (KAN-14).
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { shapeCacheStats } from "./cache-stats.js";
import { evaluateCacheSlo, formatSloLine, MIN_OPS_FOR_SLO, TIER_SLO } from "./cache-slo.js";

const NOW = new Date("2026-06-12T12:00:00Z");

function statsWith(tier: string, hits: number, misses: number) {
  return shapeCacheStats([{ tier, hits, misses, promotions: 0 }], [], NOW);
}

test("below MIN_OPS the verdict is no-data, never breach", () => {
  const verdicts = evaluateCacheSlo(statsWith("L1", 1, MIN_OPS_FOR_SLO - 2));
  const l1 = verdicts.find((v) => v.tier === "L1");
  assert.ok(l1 !== undefined && l1.status === "no-data");
});

test("at volume, ratio >= threshold is ok and below is breach", () => {
  const okStats = statsWith("L2", 60, 40); // 0.6 >= 0.3
  const okL2 = evaluateCacheSlo(okStats).find((v) => v.tier === "L2");
  assert.ok(okL2 !== undefined && okL2.status === "ok");

  const badStats = statsWith("L2", 10, 90); // 0.1 < 0.3
  const badL2 = evaluateCacheSlo(badStats).find((v) => v.tier === "L2");
  assert.ok(badL2 !== undefined && badL2.status === "breach");
});

test("every tier carries its configured threshold", () => {
  const verdicts = evaluateCacheSlo(shapeCacheStats([], [], NOW));
  assert.equal(verdicts.length, 3);
  for (const v of verdicts) {
    assert.equal(v.threshold, TIER_SLO[v.tier]);
    assert.equal(v.status, "no-data");
  }
});

test("formatSloLine renders all tiers compactly", () => {
  const line = formatSloLine(evaluateCacheSlo(statsWith("L1", 200, 100)));
  assert.ok(line.includes("L1 ok (66.7% vs 50%)"));
  assert.ok(line.includes("L2 no-data"));
  assert.ok(line.includes("L3 no-data"));
});
