/**
 * @tdd green
 * @cite rubrics/phase-0.md  (frontmatter + numbered-criteria precedent)
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 *
 * Unit tests for scripts/lib/allowlist.ts — the URL allowlist gate that
 * powers the crawler. Covers all five evaluation-order branches plus the
 * primary OBLOGS2 use case (bare-index allow_urls bypass).
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { inAllowlist, type AllowlistConfig } from "./allowlist.js";

const base: AllowlistConfig = {
  allow_prefixes: ["https://claude.com/blog/", "https://claude.com/pricing/"],
};

test("A1: bare prefix-match — allow", () => {
  assert.equal(inAllowlist("https://claude.com/blog/post-1", base), true);
});

test("A2: no prefix match — reject", () => {
  assert.equal(inAllowlist("https://claude.com/random", base), false);
});

test("A3: deny_prefixes wins over allow_prefixes", () => {
  const cfg: AllowlistConfig = {
    ...base,
    deny_prefixes: ["https://claude.com/blog/feed"],
  };
  assert.equal(inAllowlist("https://claude.com/blog/feed/rss", cfg), false);
  assert.equal(inAllowlist("https://claude.com/blog/post-1", cfg), true);
});

test("A4: deny_urls wins over allow_prefixes", () => {
  const cfg: AllowlistConfig = {
    ...base,
    deny_urls: ["https://claude.com/blog/private-draft"],
  };
  assert.equal(inAllowlist("https://claude.com/blog/private-draft", cfg), false);
  // Children of the denied exact URL must still pass:
  assert.equal(inAllowlist("https://claude.com/blog/private-draft-other", cfg), true);
});

test("OBLOGS2-1: allow_urls bypasses prefix gate (bare-index URL)", () => {
  const cfg: AllowlistConfig = {
    ...base,
    allow_urls: ["https://claude.com/pricing"],
  };
  // `/pricing` (no slash) is not matched by `/pricing/` prefix — but
  // allow_urls hits it exactly.
  assert.equal(inAllowlist("https://claude.com/pricing", cfg), true);
  // Sub-pages still go through prefix gate, not allow_urls:
  assert.equal(inAllowlist("https://claude.com/pricing/max", cfg), true);
  // Adjacent /pricing-foo must NOT be accepted just because /pricing is
  // in allow_urls — this is the over-match risk we're avoiding.
  assert.equal(inAllowlist("https://claude.com/pricing-foo", cfg), false);
});

test("OBLOGS2-2: deny still wins over allow_urls", () => {
  const cfg: AllowlistConfig = {
    ...base,
    allow_urls: ["https://claude.com/blog"],
    deny_prefixes: ["https://claude.com/blog"],
  };
  // Even though /blog is exactly in allow_urls, the deny_prefix kills it.
  assert.equal(inAllowlist("https://claude.com/blog", cfg), false);
});

test("OBLOGS2-3: deny_urls wins over allow_urls", () => {
  const cfg: AllowlistConfig = {
    ...base,
    allow_urls: ["https://claude.com/pricing"],
    deny_urls: ["https://claude.com/pricing"],
  };
  assert.equal(inAllowlist("https://claude.com/pricing", cfg), false);
});

test("OBLOGS2-4: allow_urls is exact-match, not prefix", () => {
  const cfg: AllowlistConfig = {
    allow_prefixes: [],
    allow_urls: ["https://claude.com/pricing"],
  };
  assert.equal(inAllowlist("https://claude.com/pricing", cfg), true);
  // `/pricing/max` is NOT in allow_urls and there's no prefix — reject.
  assert.equal(inAllowlist("https://claude.com/pricing/max", cfg), false);
});

test("A5: empty allow_prefixes + no allow_urls — reject everything", () => {
  const cfg: AllowlistConfig = { allow_prefixes: [] };
  assert.equal(inAllowlist("https://claude.com/anything", cfg), false);
});
