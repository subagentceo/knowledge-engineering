/**
 * Conventions test — asserts THIS PR's commits follow the outcome-driven
 * Conventional-Commits discipline documented in docs/CONVENTIONS.md.
 *
 * Outcome: O3 — Test asserts the convention is followed by this PR's
 * commits and that the citation source exists.
 *
 * Discipline:
 *   - Every commit subject MUST match: <type>(<scope>?): <subject> (O<N>)
 *   - The trailing (O<N>) is the outcome ID.
 *   - At least one commit cites a vendor/-sourced extract (this file's
 *     header asserts the citation chain is valid).
 *
 * Citations (per docs/CONVENTIONS.md rule: tests cite their canonical source):
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 *
 * Cross-references (not part of the citation-guard scope: must point at
 * vendor/, seeds/, or rubrics/):
 *
 *   - docs/CONVENTIONS.md — the convention this test enforces
 *   - https://www.conventionalcommits.org/ — upstream spec
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

/**
 * Conventional-Commits subject pattern with the repo-specific outcome-id
 * suffix.
 *
 * Per docs/CONVENTIONS.md § "Commit format":
 *
 *   <type>(<scope>): <subject> (O<N>)
 *
 * - type ∈ {feat, fix, perf, refactor, chore, docs, test, build, ci, revert}
 * - scope is optional and bracketed by parens
 * - subject ends with "(O<N>)" — at least one outcome ID
 * - Breaking-change marker "!" after type or scope is allowed
 */
const CONVENTIONAL_RE = /^(feat|fix|perf|refactor|chore|docs|test|build|ci|revert)(\([^)]+\))?!?:\s+.+\s+\(O[0-9A-Za-z]+(,\s*O[0-9A-Za-z]+)*\)\s*$/;

/**
 * Merge-commit subjects start with `Merge ` or `merge:` — we skip these
 * since they're created by `git merge` not by humans.
 */
const MERGE_RE = /^(Merge |merge:)/;

/**
 * The convention (docs/CONVENTIONS.md + this test) landed in PR #76,
 * merged to main as commit 304e231 at 2026-05-15T04:30:00Z. Commits
 * authored BEFORE that date are grandfathered — the convention only
 * binds going forward.
 *
 * Without this gate, every PR opened before #76 merged would fail
 * because its existing commits predate the rule.
 */
const CONVENTION_START_ISO = "2026-05-15T04:30:00Z";

function commitsOnThisBranch(): string[] {
  // Commits on the current branch since it diverged from origin/main,
  // filtered to those authored at or after the convention's start
  // date. In CI, GITHUB_BASE_REF gives the base; locally, we compare
  // to origin/main. Falls back to HEAD~5..HEAD if the merge-base
  // lookup fails.
  try {
    const base = execSync("git merge-base HEAD origin/main", { cwd: REPO_ROOT })
      .toString()
      .trim();
    const subjects = execSync(
      `git log --since=${CONVENTION_START_ISO} ${base}..HEAD --pretty=format:%s`,
      { cwd: REPO_ROOT },
    )
      .toString()
      .split("\n")
      .filter((s) => s.length > 0);
    return subjects;
  } catch {
    return execSync(
      `git log --since=${CONVENTION_START_ISO} HEAD~5..HEAD --pretty=format:%s`,
      { cwd: REPO_ROOT },
    )
      .toString()
      .split("\n")
      .filter((s) => s.length > 0);
  }
}

// ────────────────────────────────────────────────────────────────────
// Tests

check("citation source exists in seeds/citations/", () => {
  const citation = resolve(REPO_ROOT, "seeds/citations/define-outcomes.md");
  if (!existsSync(citation)) throw new Error(`missing ${citation}`);
  const body = readFileSync(citation, "utf8");
  if (!body.includes("vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md")) {
    throw new Error("citation source doesn't reference the vendor/-mirrored canonical doc");
  }
});

check("vendor-mirrored canonical doc exists", () => {
  const canonical = resolve(
    REPO_ROOT,
    "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
  );
  if (!existsSync(canonical)) {
    throw new Error(`missing vendor mirror at ${canonical}`);
  }
});

check("CONVENTIONS.md exists and references the citation chain", () => {
  const path = resolve(REPO_ROOT, "docs/CONVENTIONS.md");
  if (!existsSync(path)) throw new Error(`missing ${path}`);
  const body = readFileSync(path, "utf8");
  if (!body.includes("seeds/citations/define-outcomes.md")) {
    throw new Error("CONVENTIONS.md doesn't cite seeds/citations/define-outcomes.md");
  }
  if (!body.includes("vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md")) {
    throw new Error("CONVENTIONS.md doesn't cite the vendor mirror");
  }
});

check(".github/pull_request_template.md exists and requires Closes/Refs", () => {
  const path = resolve(REPO_ROOT, ".github/pull_request_template.md");
  if (!existsSync(path)) throw new Error(`missing ${path}`);
  const body = readFileSync(path, "utf8");
  if (!body.includes("Closes #") || !body.includes("Refs #")) {
    throw new Error("PR template doesn't include both Closes # and Refs # placeholders");
  }
});

// Branch commits — assert every non-merge subject ends with (O<N>).
const subjects = commitsOnThisBranch();
const nonMerge = subjects.filter((s) => !MERGE_RE.test(s));

// If zero post-convention commits exist on this branch (pre-convention
// PRs being merged forward), there's nothing to assert — the
// convention only binds commits authored after CONVENTION_START_ISO.
// Print a status line so the run isn't silent, but don't fail.
if (nonMerge.length === 0) {
  console.log(`  • no post-convention commits to check (all grandfathered before ${CONVENTION_START_ISO})`);
}

for (const subject of nonMerge) {
  check(`commit subject conforms to convention: ${subject.slice(0, 60)}${subject.length > 60 ? "..." : ""}`, () => {
    if (!CONVENTIONAL_RE.test(subject)) {
      throw new Error(
        `subject doesn't match <type>(<scope>?): <subject> (O<N>)\n      got: ${subject}`,
      );
    }
  });
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
