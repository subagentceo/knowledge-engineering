/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite vendor/anthropic-sitemap/research/team/economic-research.md
 */

import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  corpus,
  searchCitations,
  citationsByYear,
  citationsByTeam,
} from "../mcp/lanes/citations.js";
import type { CslItem } from "./csl.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

const items: CslItem[] = [
  {
    id: "anthropic-sitemap:research:clio",
    type: "article",
    title: "Clio: privacy-preserving insights",
    abstract: "How people use Claude across economic sectors.",
    issued: { "date-parts": [[2024, 12, 12]] },
  },
  {
    id: "anthropic-sitemap:research:team:economic-research",
    type: "article",
    title: "Economic Research",
    issued: { "date-parts": [[2024, 1, 1]] },
  },
  { id: "cloudflare:developers.cloudflare.com:workers:index", type: "webpage", title: "Workers" },
];

// all terms must match; ranking is deterministic (id order)
assert.equal(searchCitations(items, "economic", 10).length, 2);
assert.deepEqual(
  searchCitations(items, "economic privacy-preserving", 10).map((i) => i.id),
  ["anthropic-sitemap:research:clio"],
);
assert.equal(searchCitations(items, "", 10).length, 0);
assert.equal(searchCitations(items, "economic", 1).length, 1);

assert.deepEqual(citationsByYear(items), { "2024": 2 });

assert.deepEqual(
  citationsByTeam(items, "economic-research").map((i) => i.id),
  ["anthropic-sitemap:research:team:economic-research"],
);
assert.equal(citationsByTeam(items, "alignment").length, 0);

// the memoized live corpus loads and is queryable
const live = corpus(REPO_ROOT);
assert.ok(live.length > 5000);
assert.ok(corpus(REPO_ROOT) === live); // memoized
assert.ok(searchCitations(live, "economic research", 5).length > 0);

console.log("citations-lane.test.ts OK");
