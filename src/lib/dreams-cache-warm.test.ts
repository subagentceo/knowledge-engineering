/**
 * @tdd green
 * @cite seeds/citations/dreams.md
 * @cite seeds/citations/define-outcomes.md
 *
 * Warm-list selection for the KAN-9 dreams L2 warming pass
 * (scripts/dreams-consolidate.ts over dw.fact_cache_hits).
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { pickWarmList, type HotKeyRow } from "../../scripts/dreams-consolidate.js";

const row = (key: string, hits: number): HotKeyRow => ({
  cache_key: key,
  payload: { k: key },
  hits,
});

test("hottest keys first", () => {
  const out = pickWarmList([row("a", 1), row("b", 9), row("c", 4)]);
  assert.deepEqual(out.map((r) => r.cache_key), ["b", "c", "a"]);
});

test("zero-hit keys are dropped", () => {
  const out = pickWarmList([row("a", 0), row("b", 2)]);
  assert.deepEqual(out.map((r) => r.cache_key), ["b"]);
});

test("capped at limit", () => {
  const rows = Array.from({ length: 250 }, (_, i) => row(`k${i}`, i + 1));
  assert.equal(pickWarmList(rows).length, 100);
  assert.equal(pickWarmList(rows, 7).length, 7);
  const top = pickWarmList(rows, 1)[0];
  assert.ok(top !== undefined && top.cache_key === "k249");
});

test("empty input yields empty list", () => {
  assert.deepEqual(pickWarmList([]), []);
});
