/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
 */

import assert from "node:assert/strict";
import { cslItemToMemory, memoryPathFor, memoryToCslJson, MemoryRecord } from "./citation-memory.js";
import type { CslItem } from "./csl.js";

const item: CslItem = {
  id: "anthropic-sitemap:research:clio",
  type: "article",
  title: "Clio: privacy-preserving insights",
  abstract: "How people use Claude.",
  publisher: "Anthropic",
  URL: "https://www.anthropic.com/research/clio",
  issued: { "date-parts": [[2024, 12, 12]] },
};

assert.equal(memoryPathFor(item.id), "/citations/anthropic-sitemap-research-clio.md");

const mem = cslItemToMemory(item);
assert.ok(MemoryRecord.safeParse(mem).success);
assert.equal(mem.curation_source, "ingest");
assert.ok(mem.content.startsWith("# Clio: privacy-preserving insights"));
assert.ok(mem.content.includes("(2024) — Anthropic — https://www.anthropic.com/research/clio"));

// round trip: the canonical CSL block survives the memory shape
assert.deepEqual(memoryToCslJson(mem.content), item);

// undated, URL-less items still produce valid memories
const bare = cslItemToMemory({ id: "x:_pdfs:abc", type: "document", title: "Paper" });
assert.ok(MemoryRecord.safeParse(bare).success);
assert.deepEqual(memoryToCslJson(bare.content), { id: "x:_pdfs:abc", type: "document", title: "Paper" });

// fail closed: no csl-json block
assert.throws(() => memoryToCslJson("# nothing here"));
// fail closed: bad path shape never validates
assert.equal(MemoryRecord.safeParse({ ...mem, path: "citations/x.md" }).success, false);

console.log("citation-memory.test.ts OK");
