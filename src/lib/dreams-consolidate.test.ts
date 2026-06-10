/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
 */

import assert from "node:assert/strict";
import { curateContent, type AccessStats } from "../../scripts/dreams-consolidate.js";
import { cslItemToMemory, memoryToCslJson } from "./citation-memory.js";
import type { CslItem } from "./csl.js";

const item: CslItem = {
  id: "anthropic-sitemap:research:clio",
  type: "article",
  title: "Clio",
  abstract: "Insights.",
};
const mem = cslItemToMemory(item);
const stats: AccessStats = {
  accesses: 5,
  agents: 2,
  first_at: "2026-06-01T00:00:00.000Z",
  last_at: "2026-06-09T00:00:00.000Z",
};

const curated = curateContent(mem.content, stats);
assert.ok(curated.includes("## curation"));
assert.ok(curated.includes("dreams-curated from 5 access(es) by 2 agent(s)"));

// csl-json block survives curation verbatim (skill invariant)
assert.deepEqual(memoryToCslJson(curated), item);

// idempotent: re-dreaming with the same stats changes nothing
assert.equal(curateContent(curated, stats), curated);

// re-dreaming with NEW stats replaces (not stacks) the curation section
const again = curateContent(curated, { ...stats, accesses: 9 });
assert.equal(again.match(/## curation/g)?.length, 1);
assert.ok(again.includes("9 access(es)"));
assert.deepEqual(memoryToCslJson(again), item);

console.log("dreams-consolidate.test.ts OK");
