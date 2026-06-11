/**
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/github-actions.md
 * @cite seeds/citations/fable-5-pricing.md
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  BANNED_CI_NUDGE_RE,
  findApiKeyIntroductions,
  findBannedCommitSubjects,
  findTestHeaderGaps,
  renderReviewSummary,
} from "./deterministic-review.ts";

test("flags an added ANTHROPIC_API_KEY assignment in code paths", () => {
  const diff = [
    "+++ b/src/oauth/token.ts",
    "+const key = ANTHROPIC_API_KEY = process.env.SECRET;",
  ].join("\n");
  const findings = findApiKeyIntroductions(diff);
  assert.equal(findings.length, 1);
  assert.match(findings[0].rule, /oauth-only/);
});

test("ignores ANTHROPIC_API_KEY mentions in docs, vendor, seeds, and markdown", () => {
  const diff = [
    "+++ b/docs/runbook.md",
    "+ANTHROPIC_API_KEY=never-set-this",
    "+++ b/vendor/anthropics/x.md",
    "+ANTHROPIC_API_KEY: rejected",
  ].join("\n");
  assert.equal(findApiKeyIntroductions(diff).length, 0);
});

test("ignores test-file fixtures", () => {
  const diff = [
    "+++ b/src/lib/env-sanitize.test.ts",
    "+const fixture = { ANTHROPIC_API_KEY: 'must-be-rejected' };",
  ].join("\n");
  assert.equal(findApiKeyIntroductions(diff).length, 0);
});

test("ignores context and removed lines", () => {
  const diff = [
    "+++ b/src/lib/foo.ts",
    " ANTHROPIC_API_KEY=context",
    "-ANTHROPIC_API_KEY=removed",
  ].join("\n");
  assert.equal(findApiKeyIntroductions(diff).length, 0);
});

test("flags test files missing citation or tdd headers", () => {
  // Fixture tags are built by concatenation so citation-guard doesn't parse
  // these literals as real citation directives in this file's source.
  const cite = "@" + "cite";
  const findings = findTestHeaderGaps([
    { path: "src/lib/a.test.ts", content: `/** @tdd green\n * ${cite} vendor/x.md */` },
    { path: "src/lib/b.test.ts", content: "/** no headers */" },
  ]);
  assert.equal(findings.length, 2);
  assert.ok(findings.every((f) => f.detail.startsWith("src/lib/b.test.ts")));
});

test("BANNED_CI_NUDGE_RE matches the OPM3 anti-pattern set", () => {
  for (const s of [
    "chore: nudge CI (OCIRETRIG)",
    "ci: re-trigger ci after cascade",
    "chore(ci): kick ci",
  ]) {
    assert.ok(BANNED_CI_NUDGE_RE.test(s), s);
  }
  assert.ok(!BANNED_CI_NUDGE_RE.test("feat(cost): deterministic pricing (O1)"));
  assert.equal(findBannedCommitSubjects(["chore: nudge CI (OCIRETRIG)"]).length, 1);
});

test("summary is deterministic and reflects findings", () => {
  const clean = renderReviewSummary([]);
  assert.match(clean, /No findings/);
  assert.equal(clean, renderReviewSummary([]));
  const dirty = renderReviewSummary([{ rule: "r", detail: "d" }]);
  assert.match(dirty, /1 finding/);
  assert.match(dirty, /\*\*r\*\* — d/);
});
