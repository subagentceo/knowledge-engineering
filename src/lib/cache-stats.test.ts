/**
 * @tdd green
 * @cite seeds/citations/define-outcomes.md
 * @cite seeds/citations/dreams.md
 *
 * Feed shape: src/lib/cache-stats.ts over dw.fact_cache_hits
 * (contract: data/models/alloydb/fact_cache_hits.yaml).
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { shapeCacheStats, TIER_ORDER } from "./cache-stats.js";

const NOW = new Date("2026-06-12T12:00:00Z");

test("all three tiers always present, in L1/L2/L3 order", () => {
  const out = shapeCacheStats([], [], NOW);
  assert.deepEqual(out.tiers.map((t) => t.tier), [...TIER_ORDER]);
  for (const t of out.tiers) assert.equal(t.hit_ratio, 0);
  assert.equal(out.generated_at, NOW.toISOString());
});

test("hit_ratio = hits / (hits + misses), 4 decimal places", () => {
  const out = shapeCacheStats(
    [{ tier: "L2", hits: 1, misses: 2, promotions: 0 }],
    [],
    NOW,
  );
  const l2 = out.tiers.find((t) => t.tier === "L2");
  assert.ok(l2 !== undefined);
  assert.equal(l2.hit_ratio, 0.3333);
  assert.equal(l2.misses, 2);
});

test("hottest keys sorted desc and capped at 10", () => {
  const hot = Array.from({ length: 15 }, (_, i) => ({
    cache_key: `ke:x:${i}`,
    lane: "x",
    hits: i,
  }));
  const out = shapeCacheStats([], hot, NOW);
  assert.equal(out.hottest_keys.length, 10);
  const first = out.hottest_keys[0];
  assert.ok(first !== undefined && first.hits === 14);
});

test("unknown tiers in input are ignored, not invented", () => {
  const out = shapeCacheStats([{ tier: "L9", hits: 5, misses: 0, promotions: 0 }], [], NOW);
  assert.deepEqual(out.tiers.map((t) => t.tier), ["L1", "L2", "L3"]);
  assert.ok(out.tiers.every((t) => t.hits === 0));
});
