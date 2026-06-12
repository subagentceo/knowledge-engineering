// Citations:
//   @cite rubrics/phase-13.md (O7)
//   @cite ../../data/models/alloydb/dim_memory.yaml

import { strict as assert } from "node:assert";
import { test } from "vitest";

import { filterMemories, memoryStats, type MemoryRow } from "../src/memory-browser.js";

const ingest: MemoryRow = {
  memory_path: "/citations/anthropic-sitemap-research-clio.md",
  curation_source: "ingest",
  csl_id: "anthropic-sitemap:research:clio",
  effective_from: "2026-06-09T00:00:00.000Z",
  versions: 1,
};
const dreamed: MemoryRow = {
  memory_path: "/citations/anthropic-sitemap-research-team-economic-research.md",
  curation_source: "dreams",
  csl_id: "anthropic-sitemap:research:team:economic-research",
  effective_from: "2026-06-10T00:00:00.000Z",
  versions: 2,
};
const rows = [ingest, dreamed];

test("memoryStats counts totals, dreamed, and multi-version", () => {
  assert.deepEqual(memoryStats(rows), { total: 2, dreamed: 1, multiVersion: 1 });
  assert.deepEqual(memoryStats([]), { total: 0, dreamed: 0, multiVersion: 0 });
});

test("filterMemories matches path and csl id; source: form filters curation", () => {
  assert.deepEqual(filterMemories(rows, ""), rows);
  assert.deepEqual(filterMemories(rows, "clio"), [ingest]);
  assert.deepEqual(filterMemories(rows, "team:economic"), [dreamed]);
  assert.deepEqual(filterMemories(rows, "source:dreams"), [dreamed]);
  assert.deepEqual(filterMemories(rows, "source:ingest"), [ingest]);
  assert.equal(filterMemories(rows, "nope").length, 0);
});
