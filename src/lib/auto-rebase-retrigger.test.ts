/**
 * @tdd green
 *
 * OAUTO12 / ORC7 — auto-rebase must re-dispatch required workflows after
 * gh pr update-branch, because GITHUB_TOKEN-triggered pushes do not fire
 * downstream workflows (anti-recursion). Without this, PRs stay BLOCKED
 * forever once rebased.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/github-actions.md
 *
 * Live-only references (not under vendor/seeds/rubrics — plain comments):
 *   - .github/workflows/auto-rebase.yml — file under test
 *   - .github/workflows/verify.yml      — file under test
 *   - .github/workflows/osv-scanner.yml — file under test
 *   - docs/decisions/2026-05-17-auto-merge-recovery.md — ADR for this fix
 */

import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const autoRebase = readFileSync(".github/workflows/auto-rebase.yml", "utf8");
const verify = readFileSync(".github/workflows/verify.yml", "utf8");
const osv = readFileSync(".github/workflows/osv-scanner.yml", "utf8");

test("auto-rebase redispatches verify after successful update-branch", () => {
  assert.match(
    autoRebase,
    /gh\s+workflow\s+run\s+verify\.yml\s+--ref/,
    "auto-rebase.yml must call `gh workflow run verify.yml --ref <branch>` after update-branch",
  );
});

test("auto-rebase redispatches osv-scanner after successful update-branch", () => {
  assert.match(
    autoRebase,
    /gh\s+workflow\s+run\s+osv-scanner\.yml\s+--ref/,
    "auto-rebase.yml must call `gh workflow run osv-scanner.yml --ref <branch>` after update-branch",
  );
});

test("the redispatch lives inside the success branch of update-branch", () => {
  // Find the `if gh pr update-branch` block and assert the dispatches are in it,
  // not in the else/failure path.
  const successBlock = autoRebase.match(
    /if\s+gh\s+pr\s+update-branch[\s\S]*?else/,
  );
  assert.ok(successBlock, "could not locate update-branch success block");
  assert.match(successBlock[0], /gh\s+workflow\s+run\s+verify\.yml/);
  assert.match(successBlock[0], /gh\s+workflow\s+run\s+osv-scanner\.yml/);
});

test("verify.yml declares workflow_dispatch so redispatch can succeed", () => {
  assert.match(
    verify,
    /^\s*workflow_dispatch:/m,
    "verify.yml must declare workflow_dispatch under on:",
  );
});

test("osv-scanner.yml declares workflow_dispatch so redispatch can succeed", () => {
  assert.match(
    osv,
    /^\s*workflow_dispatch:/m,
    "osv-scanner.yml must declare workflow_dispatch under on:",
  );
});
