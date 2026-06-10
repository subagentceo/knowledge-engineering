/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite vendor/anthropic-sitemap/research/team/economic-research.md
 */

import assert from "node:assert/strict";
import {
  CitationsDocumentBlock,
  cslItemToDocumentBlock,
  vendCitations,
} from "./citations-vending.js";
import type { CslItem } from "./csl.js";

const item: CslItem = {
  id: "anthropic-sitemap:research:clio",
  type: "article",
  title: "Clio: privacy-preserving insights",
  abstract: "How people use Claude across sectors.",
  publisher: "Anthropic",
  URL: "https://www.anthropic.com/research/clio",
  issued: { "date-parts": [[2024, 12, 12]] },
};

const block = cslItemToDocumentBlock(item);
assert.ok(CitationsDocumentBlock.safeParse(block).success);
assert.equal(block.citations.enabled, true);
assert.equal(block.source.data, "How people use Claude across sectors.");
assert.equal(
  block.context,
  "csl_id: anthropic-sitemap:research:clio; publisher: Anthropic; issued: 2024; url: https://www.anthropic.com/research/clio",
);

// abstract-less items fall back to title; sparse provenance stays valid
const bare = cslItemToDocumentBlock({ id: "x:_pdfs:abc", type: "document", title: "Paper" });
assert.equal(bare.source.data, "Paper");
assert.equal(bare.context, "csl_id: x:_pdfs:abc");

// batch vending: all-enabled by construction (the all-or-none API rule)
const batch = vendCitations([item, { id: "y", type: "webpage", title: "Y" }]);
assert.equal(batch.length, 2);
assert.ok(batch.every((b) => b.citations.enabled === true));

console.log("citations-vending.test.ts OK");
