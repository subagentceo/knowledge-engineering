/**
 * @tdd green
 *
 * OAUTO13 — structural self-test for the two Claude Code Action workflows.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/github-actions.md
 *
 * Live-only references (not under vendor/seeds/rubrics, so plain comments):
 *   - .github/workflows/claude-code-review.yml — the file under test
 *   - .github/workflows/claude.yml             — the file under test
 *   - https://github.com/anthropics/claude-code-action/blob/main/docs/security.md
 *   - https://github.com/anthropics/claude-code-action/blob/main/action.yml
 */

import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const REVIEW = readFileSync(".github/workflows/claude-code-review.yml", "utf8");
const CLAUDE = readFileSync(".github/workflows/claude.yml", "utf8");

// ─── OAuth-only invariant (OSEC1) ─────────────────────────────────────────

test("both workflows use CLAUDE_CODE_OAUTH_TOKEN, NOT ANTHROPIC_API_KEY", () => {
  for (const [name, body] of [["review", REVIEW], ["claude", CLAUDE]] as const) {
    assert.match(body, /claude_code_oauth_token:\s*\$\{\{\s*secrets\.CLAUDE_CODE_OAUTH_TOKEN/, `${name}: missing OAuth token wiring`);
    assert.equal(body.match(/anthropic_api_key:/), null, `${name}: ANTHROPIC_API_KEY forbidden per OSEC1`);
  }
});

// ─── Model selection (operator directive 2026-05-18) ──────────────────────

test("both workflows pin --model claude-sonnet-4-6", () => {
  for (const [name, body] of [["review", REVIEW], ["claude", CLAUDE]] as const) {
    assert.match(body, /--model\s+claude-sonnet-4-6/, `${name}: must pin Sonnet 4.6`);
  }
});

// ─── Security: wildcards forbidden on public repo ─────────────────────────

test("no allowed_bots: '*' or exclude/include wildcards (public-repo invocation risk)", () => {
  // Per docs/security.md: "Prefer an explicit list over '*'. Only list App names you trust."
  for (const [name, body] of [["review", REVIEW], ["claude", CLAUDE]] as const) {
    assert.equal(
      body.match(/allowed_bots:\s*['"]\*['"]/),
      null,
      `${name}: allowed_bots: '*' is forbidden on public repos`,
    );
    assert.equal(
      body.match(/allowed_non_write_users:\s*['"]\*['"]/),
      null,
      `${name}: allowed_non_write_users: '*' is forbidden`,
    );
  }
});

// ─── Security: no pull_request_target / workflow_run pwn-request triggers ─

test("neither workflow uses pull_request_target or workflow_run", () => {
  for (const [name, body] of [["review", REVIEW], ["claude", CLAUDE]] as const) {
    assert.equal(body.match(/^\s*pull_request_target:/m), null, `${name}: pull_request_target forbidden`);
    assert.equal(body.match(/^\s*workflow_run:/m), null, `${name}: workflow_run forbidden`);
  }
});

// ─── claude-code-review.yml: must NOT have contents:write (PR-event escalation) ─

test("claude-code-review: contents permission is read (not write)", () => {
  // Find the permissions: block and check contents value
  const m = REVIEW.match(/permissions:\s*\n((?:\s{4,}\S[^\n]*\n)+)/);
  assert.ok(m, "must have permissions: block");
  assert.match(m[1], /contents:\s*read\b/, "PR-review workflow must have contents: read, not write");
});

// ─── claude-code-review.yml: pull-requests must be write (action posts comments) ─

test("claude-code-review: pull-requests: write (action posts inline + sticky comments)", () => {
  const m = REVIEW.match(/permissions:\s*\n((?:\s{4,}\S[^\n]*\n)+)/);
  assert.ok(m);
  assert.match(m[1], /pull-requests:\s*write\b/, "review action requires write to post comments");
});

// ─── claude.yml: all three need write (interactive flows) ─────────────────

test("claude.yml: contents/pull-requests/issues all have write permission", () => {
  const m = CLAUDE.match(/permissions:\s*\n((?:\s{4,}\S[^\n]*\n)+)/);
  assert.ok(m, "must have permissions: block");
  for (const perm of ["contents", "pull-requests", "issues"]) {
    assert.match(m[1], new RegExp(`${perm}:\\s*write\\b`), `interactive flow needs ${perm}: write`);
  }
});

// ─── claude.yml: must keep the @claude trigger filter ─────────────────────

test("claude.yml gates execution on @claude mention", () => {
  assert.match(CLAUDE, /contains\(github\.event\.comment\.body,\s*['"]@claude['"]\)/);
  assert.match(CLAUDE, /contains\(github\.event\.review\.body,\s*['"]@claude['"]\)/);
});

// ─── code-review plugin invocation correctness ────────────────────────────

test("claude-code-review invokes the code-review plugin slash command without --comment flag", () => {
  // The action posts comments natively for v1 PR-review workflows; passing
  // --comment is a CLI-only flag for local invocation and is a no-op (at
  // best) when passed via plugin slash-command in the action.
  assert.match(REVIEW, /\/code-review:code-review.+pull\/\$\{\{\s*github\.event\.pull_request\.number\s*\}\}/);
  assert.equal(REVIEW.match(/\/code-review:code-review.+--comment/), null, "no --comment flag (handled natively by action)");
});

// ─── Sticky comment + classify + fix-links on the review workflow ─────────

test("claude-code-review enables sticky/classify/fix-links for clean PR UX", () => {
  assert.match(REVIEW, /use_sticky_comment:\s*true/);
  assert.match(REVIEW, /classify_inline_comments:\s*true/);
  assert.match(REVIEW, /include_fix_links:\s*true/);
});

// ─── Bot-noise exclusion uses explicit list, not wildcard ─────────────────

test("claude-code-review excludes dependabot+renovate explicitly (no wildcard)", () => {
  assert.match(REVIEW, /exclude_comments_by_actor:\s*['"]dependabot\[bot\],renovate\[bot\]['"]/);
});

// ─── Action version pin ────────────────────────────────────────────────────

test("both workflows pin anthropics/claude-code-action@v1 (GA, not @main or @beta)", () => {
  for (const [name, body] of [["review", REVIEW], ["claude", CLAUDE]] as const) {
    assert.match(body, /anthropics\/claude-code-action@v1\b/, `${name}: must pin @v1`);
    assert.equal(body.match(/anthropics\/claude-code-action@(main|beta|v0)/), null, `${name}: @main/@beta/@v0 forbidden`);
  }
});

// ─── OAUTO1 tolerance preserved (until SDK access confirmed stable) ───────

test("claude-code-review keeps continue-on-error: true (OAUTO1 SDK-access tolerance)", () => {
  assert.match(REVIEW, /continue-on-error:\s*true/, "OAUTO1 tolerance must remain until SDK access verified stable on alex-jadecli");
});
