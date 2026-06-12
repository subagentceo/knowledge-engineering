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

// B13/KAN-13 — AccessLogger appends one fact row per current memory plus
// one raw events_memory_access row per requested id, hermetic fake pg
{
  const { AccessLogger } = await import("./memory-access-log.js");
  const calls: Array<{ text: string; values: unknown[] }> = [];
  const logger = new AccessLogger(
    {
      async query(text: string, values: unknown[] = []) {
        calls.push({ text, values });
        if (text.includes("events_memory_access")) return { rows: [] };
        const ids = values[2] as string[];
        return { rows: ids.filter((i) => i !== "missing").map(() => ({ memory_sk: 1 })) };
      },
    },
    "test-agent",
  );
  assert.equal(await logger.record([]), 0);
  assert.equal(calls.length, 0);
  const n = await logger.record(["anthropic-sitemap:research:clio", "missing"]);
  assert.equal(n, 1);
  assert.equal(calls[0]?.values[0], "test-agent");
  assert.match(String(calls[0]?.values[1]), /^202\d{5}$/);
  // raw event stream gets every requested id, matched or not
  assert.equal(calls.length, 2);
  assert.ok(calls[1]?.text.includes("dw.events_memory_access"));
  assert.deepEqual(calls[1]?.values, ["test-agent", ["anthropic-sitemap:research:clio", "missing"]]);
}

// B15 — BM25 ranking over the live corpus; id-shaped queries fall back
{
  const { rankedSearch, searchCounters } = await import("../mcp/lanes/citations.js");
  const before = { ...searchCounters };
  const ranked = rankedSearch(live, "economic index report", 5);
  assert.ok(ranked.length > 0 && ranked.length <= 5);
  assert.ok(ranked[0]?.title.toLowerCase().includes("economic"));
  assert.equal(searchCounters.bm25, before.bm25 + 1);
  const viaId = rankedSearch(live, "research:team:economic", 5);
  assert.ok(viaId.every((i) => i.id.includes("research:team:economic")));
  assert.equal(searchCounters.fallback, before.fallback + 1);
}

console.log("citations-lane.test.ts OK");
