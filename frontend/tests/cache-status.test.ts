// Citations:
//   @cite rubrics/phase-13.md (O7)
//   @cite ../../data/models/alloydb/fact_cache_hits.yaml

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  hitRatioPct,
  ratioBarWidth,
  TIER_LABELS,
  type TierStat,
} from "../src/cache-status.js";

const tier = (t: string, hit_ratio: number): TierStat => ({
  tier: t,
  hits: 10,
  misses: 5,
  promotions: 1,
  hit_ratio,
});

test("hitRatioPct formats to one decimal", () => {
  assert.equal(hitRatioPct(tier("L1", 0.3333)), "33.3%");
  assert.equal(hitRatioPct(tier("L2", 1)), "100.0%");
  assert.equal(hitRatioPct(tier("L3", 0)), "0.0%");
});

test("ratioBarWidth scales 0..1 to px with a 2px floor and clamping", () => {
  assert.equal(ratioBarWidth(0), 2);
  assert.equal(ratioBarWidth(1), 220);
  assert.equal(ratioBarWidth(0.5), 110);
  assert.equal(ratioBarWidth(-3), 2);
  assert.equal(ratioBarWidth(7), 220);
});

test("all three tiers have human labels", () => {
  for (const t of ["L1", "L2", "L3"]) {
    assert.ok(TIER_LABELS[t] !== undefined && TIER_LABELS[t].length > 0);
  }
});
