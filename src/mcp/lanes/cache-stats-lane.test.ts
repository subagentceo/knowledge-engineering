/**
 * @tdd green
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/docs/develop/build-server.md
 * @cite seeds/citations/define-outcomes.md
 *
 * Report assembly for the vendor_cache_stats bridge tool
 * (contract: data/models/alloydb/fact_cache_hits.yaml).
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCacheStatsReport } from "./cache-stats-lane.js";

test("all sources reachable: warehouse shaped, redis + l3 counts carried", () => {
  const report = buildCacheStatsReport({
    tierRows: [{ tier: "L2", hits: 8, misses: 2, promotions: 1 }],
    hotRows: [{ cache_key: "ke:vendor:a", lane: "vendor", hits: 8 }],
    redisKeys: 42,
    l3Entries: 7,
  });
  assert.ok(report.warehouse !== null);
  assert.equal(report.warehouse.tiers.length, 3);
  const l2 = report.warehouse.tiers.find((t) => t.tier === "L2");
  assert.ok(l2 !== undefined && l2.hit_ratio === 0.8);
  assert.deepEqual(report.redis, { keys: 42 });
  assert.equal(report.l3_entries, 7);
});

test("unreachable sources degrade to null blocks, never throw", () => {
  const report = buildCacheStatsReport({
    tierRows: null,
    hotRows: null,
    redisKeys: null,
    l3Entries: null,
  });
  assert.equal(report.warehouse, null);
  assert.equal(report.redis, null);
  assert.equal(report.l3_entries, null);
});

test("warehouse without hot rows still shapes tiers", () => {
  const report = buildCacheStatsReport({
    tierRows: [],
    hotRows: null,
    redisKeys: null,
    l3Entries: 0,
  });
  assert.ok(report.warehouse !== null);
  assert.deepEqual(report.warehouse.hottest_keys, []);
});
