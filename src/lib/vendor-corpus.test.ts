/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  corpusPathToUrl,
  corpusDocToCslItem,
  listCorpus,
  vendorOf,
} from "./vendor-corpus.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// host embedded in the mirror tree
assert.equal(
  corpusPathToUrl("vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md"),
  "https://platform.claude.com/docs/en/build-with-claude/citations",
);
// hostless mirror with a VENDOR_HOSTS mapping
assert.equal(
  corpusPathToUrl("vendor/anthropic-sitemap/research/clio.md"),
  "https://www.anthropic.com/research/clio",
);
// unmapped hostless vendor → no URL, never guessed
assert.equal(corpusPathToUrl("vendor/sift/some/page.md"), undefined);
assert.equal(corpusPathToUrl("vendor/anthropic-sitemap/_pdfs/abc.md"), undefined);

assert.equal(vendorOf("vendor/cloudflare/workers/index.md"), "cloudflare");
assert.equal(vendorOf("src/lib/csl.ts"), undefined);

// non-anthropic vendors become type=webpage with vendor as publisher
const item = corpusDocToCslItem(
  "vendor/openfeature/docs/reference/intro.md",
  "# OpenFeature Intro\n\nOpenFeature is an open specification that provides a vendor-agnostic, community-driven API for feature flagging.",
);
assert.equal(item.type, "webpage");
assert.equal(item.publisher, "openfeature");
assert.equal(item.title, "OpenFeature Intro");

// git-aware enumeration: non-empty, all under vendor/, no third_party
const corpus = listCorpus(REPO_ROOT);
assert.ok(corpus.length > 1000);
assert.ok(corpus.every((p) => p.startsWith("vendor/") && p.endsWith(".md")));
assert.ok(corpus.includes("vendor/anthropic-sitemap/research/clio.md"));

console.log(`vendor-corpus.test.ts OK (${corpus.length} corpus files)`);
