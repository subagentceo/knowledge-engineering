/**
 * Structural self-test for the merge-train workflows.
 *
 * The ORC4 incident — auto-rebase silently not firing because its
 * permissions block was wrong — would have been caught by an assertion
 * on the shape of the workflow file itself. This test encodes the
 * structural contract: presence of triggers and permissions blocks for
 * auto-rebase.yml, auto-label.yml, auto-merge.yml.
 *
 * Skip-not-fail when a workflow file is absent: this test is
 * designed to land safely even if a sibling workflow PR is reverted.
 * Missing file => SKIP, not FAIL.
 *
 * Pure regex over the file body — no yaml parser dependency, per the
 * repo's minimal-deps posture.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/best-practices.md
 * @cite seeds/citations/define-outcomes.md
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

let passed = 0;
let failed = 0;
let skipped = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    const e = err as Error;
    if (e.message === "SKIP") {
      skipped += 1;
      console.log(`  - ${name} (SKIP)`);
      return;
    }
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${e.message}`);
  }
}

function loadOrSkip(relPath: string): string {
  const p = resolve(process.cwd(), relPath);
  if (!existsSync(p)) throw new Error("SKIP");
  return readFileSync(p, "utf8");
}

function assertMatch(body: string, re: RegExp, label: string): void {
  if (!re.test(body)) throw new Error(`expected to match ${label}: ${re}`);
}

// ─── auto-rebase.yml ────────────────────────────────────────────────
const REBASE = ".github/workflows/auto-rebase.yml";

check("auto-rebase: permissions has contents: write", () => {
  const body = loadOrSkip(REBASE);
  assertMatch(body, /permissions:[\s\S]*?contents:\s*write/, "contents: write");
});

check("auto-rebase: permissions has pull-requests: write", () => {
  const body = loadOrSkip(REBASE);
  assertMatch(
    body,
    /permissions:[\s\S]*?pull-requests:\s*write/,
    "pull-requests: write",
  );
});

check("auto-rebase: triggers on push to main", () => {
  const body = loadOrSkip(REBASE);
  // Accept either flow or block yaml: `branches: [main]` or `branches:\n  - main`
  assertMatch(
    body,
    /on:[\s\S]*?push:[\s\S]*?branches:\s*(\[\s*main\s*\]|(?:\n\s*-\s*main))/,
    "push.branches: [main]",
  );
});

// ─── auto-label.yml ─────────────────────────────────────────────────
const LABEL = ".github/workflows/auto-label.yml";

check("auto-label: triggers on pull_request opened/ready_for_review", () => {
  const body = loadOrSkip(LABEL);
  assertMatch(body, /on:[\s\S]*?pull_request:/, "pull_request trigger");
  assertMatch(body, /types:\s*\[[^\]]*opened[^\]]*\]/, "types includes opened");
  assertMatch(
    body,
    /types:\s*\[[^\]]*ready_for_review[^\]]*\]/,
    "types includes ready_for_review",
  );
});

check("auto-label: permissions has pull-requests: write", () => {
  const body = loadOrSkip(LABEL);
  assertMatch(
    body,
    /permissions:[\s\S]*?pull-requests:\s*write/,
    "pull-requests: write",
  );
});

// ─── auto-merge.yml ─────────────────────────────────────────────────
const MERGE = ".github/workflows/auto-merge.yml";

check("auto-merge: triggers on pull_request_target", () => {
  const body = loadOrSkip(MERGE);
  assertMatch(body, /on:[\s\S]*?pull_request_target:/, "pull_request_target");
});

check("auto-merge: permissions has pull-requests: write", () => {
  const body = loadOrSkip(MERGE);
  assertMatch(
    body,
    /permissions:[\s\S]*?pull-requests:\s*write/,
    "pull-requests: write",
  );
});

check("auto-merge: permissions has contents: write", () => {
  const body = loadOrSkip(MERGE);
  assertMatch(
    body,
    /permissions:[\s\S]*?contents:\s*write/,
    "contents: write",
  );
});

console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped`);
if (failed > 0) process.exit(1);
