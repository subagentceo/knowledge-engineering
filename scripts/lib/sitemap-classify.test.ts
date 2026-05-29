/**
 * @tdd green
 * @cite rubrics/phase-0.md  (frontmatter + numbered-criteria precedent)
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 *
 * Unit tests for scripts/lib/sitemap-classify.ts — the three-way URL
 * classifier that powers the audit script.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { classify } from "./sitemap-classify.js";
import { type AllowlistConfig } from "./allowlist.js";

const base: AllowlistConfig = {
  allow_prefixes: ["https://claude.com/blog/", "https://claude.com/pricing/"],
};

test("C1: prefix-match → allowed", () => {
  assert.equal(classify("https://claude.com/blog/post-1", base), "allowed");
});

test("C2: no rule matches → uncovered (distinct from denied)", () => {
  assert.equal(classify("https://claude.com/random", base), "uncovered");
});

test("C3: deny_prefixes match → denied (not uncovered)", () => {
  const cfg: AllowlistConfig = {
    ...base,
    deny_prefixes: ["https://claude.com/blog/feed"],
  };
  assert.equal(classify("https://claude.com/blog/feed/rss", cfg), "denied");
});

test("C4: deny_urls match → denied", () => {
  const cfg: AllowlistConfig = {
    ...base,
    deny_urls: ["https://claude.com/blog/private-draft"],
  };
  assert.equal(classify("https://claude.com/blog/private-draft", cfg), "denied");
});

test("C5: allow_urls bare-index → allowed (OBLOGS2 bypass)", () => {
  const cfg: AllowlistConfig = {
    ...base,
    allow_urls: ["https://claude.com/pricing"],
  };
  assert.equal(classify("https://claude.com/pricing", cfg), "allowed");
});

test("C6: deny still wins over allow_urls", () => {
  const cfg: AllowlistConfig = {
    ...base,
    allow_urls: ["https://claude.com/blog"],
    deny_prefixes: ["https://claude.com/blog"],
  };
  assert.equal(classify("https://claude.com/blog", cfg), "denied");
});

test("C7: empty config → uncovered for any URL", () => {
  const cfg: AllowlistConfig = { allow_prefixes: [] };
  assert.equal(classify("https://example.com/anything", cfg), "uncovered");
});
