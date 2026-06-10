// Citations:
//   @cite rubrics/phase-13.md (O7)
//   @cite ../../data/models/alloydb/fact_vendor_crawl.yaml

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  barWidth,
  datedSharePct,
  topVendors,
  totals,
  type VendorStat,
} from "../src/service-status.js";

const stat = (vendor: string, doc_count: number, dated_share = 0): VendorStat => ({
  vendor,
  host: `${vendor}.example`,
  doc_count,
  dated_count: Math.round(doc_count * dated_share),
  dated_share,
});

const stats = [stat("aws", 201), stat("claude-sitemap", 1766), stat("anthropics", 1627)];

test("topVendors sorts by doc_count desc and truncates to n", () => {
  assert.deepEqual(
    topVendors(stats, 2).map((s) => s.vendor),
    ["claude-sitemap", "anthropics"],
  );
  assert.equal(topVendors(stats, 10).length, 3);
  assert.deepEqual(topVendors(stats, 0), []);
  // input untouched
  assert.equal(stats[0]?.vendor, "aws");
});

test("totals sums docs and counts vendors", () => {
  assert.deepEqual(totals(stats), { vendors: 3, docs: 3594 });
  assert.deepEqual(totals([]), { vendors: 0, docs: 0 });
});

test("datedSharePct formats share as one-decimal percentage", () => {
  assert.equal(datedSharePct(stat("x", 418, 0.8828)), "88.3% dated");
  assert.equal(datedSharePct(stat("x", 10, 0)), "0.0% dated");
});

test("barWidth scales against max with a 2px floor", () => {
  assert.equal(barWidth(1766, 1766), 220);
  assert.equal(barWidth(883, 1766), 110);
  assert.equal(barWidth(1, 1766), 2);
  assert.equal(barWidth(5, 0), 2);
});
