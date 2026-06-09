/**
 * Conventions test — asserts THIS PR's commits follow the
 * Conventional-Commits discipline documented in docs/CONVENTIONS.md.
 *
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
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
 * Conventional-Commits subject pattern.
 *
 * Per docs/CONVENTIONS.md § "Commit format":
 *
 *   <type>(<scope>?): <subject>
 *
 * - type ∈ {feat, fix, perf, refactor, chore, docs, test, build, ci, revert}
 * - scope is optional
 * - Breaking-change marker "!" after type or scope is allowed
 * - Optional trailing `(#<digits>)` tolerated — GitHub squash-merge appends it
 */
const CONVENTIONAL_RE = /^(feat|fix|perf|refactor|chore|docs|test|build|ci|revert)(\([^)]+\))?!?:\s+\S.*(\s+\(#[0-9]+\))?\s*$/;

/**
 * Merge-commit subjects start with `Merge ` or `merge:` — we skip these
 * since they're created by `git merge` not by humans.
 */
const MERGE_RE = /^(Merge |merge:)/;

/**
 * Bot-authored subjects that the convention does not bind. Dependabot's
 * `chore(deps)(deps):` format has two scopes and no outcome ID (it's
 * generated server-side, not by Claude). Same for release-please:
 * "chore(main): release …" is the bot's own format. Exempting these
 * keeps the gate honest about what Claude controls vs what GitHub Apps
 * emit, without requiring a force-push to bot branches.
 */
const BOT_RE = /^chore\(deps\)\(deps\):|^chore\(main\): release /;

/**
 * Banned anti-pattern (OPM3, from the 2026-05-29 merge-train post-mortem):
 * empty "nudge CI" commits. The train carried 5–10 of these per branch
 * (`chore: nudge CI (OCIRETRIG)`, `drain CI`, `re-trigger CI after cascade`,
 * `serial drain <n>`), forcing a squash on 3 of 5 PRs. CI re-triggers belong
 * to `gh run rerun` / `gh pr update-branch`, never to empty commits. These
 * subjects are conventional (they DO end with an outcome id), so CONVENTIONAL_RE
 * passes them — this rule rejects them explicitly so the habit can't return.
 */
const BANNED_RE =
  /\(OCIRETRIG\)|^(chore|ci)(\([^)]*\))?:\s*(nudge|drain|re-?trigger|serial drain|kick|poke|bump)\b.*\bci\b/i;

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
  // date. Strategy order (each falls back if the prior throws):
  //   1. merge-base with origin/main (requires `fetch-depth: 0`)
  //   2. last 20 commits on HEAD
  //   3. last 1 commit on HEAD (always available, even shallow)
  // If all paths fail, return [] — the test prints "no post-convention
  // commits" rather than crashing on checkout-shape mismatches.
  const filter = `--since=${CONVENTION_START_ISO}`;
  const attempts: Array<() => string> = [
    () => {
      const base = execSync("git merge-base HEAD origin/main", { cwd: REPO_ROOT })
        .toString()
        .trim();
      return execSync(`git log ${filter} ${base}..HEAD --pretty=format:%s`, { cwd: REPO_ROOT }).toString();
    },
    () => execSync(`git log ${filter} -n 20 --pretty=format:%s`, { cwd: REPO_ROOT }).toString(),
    () => execSync(`git log ${filter} -n 1 --pretty=format:%s`, { cwd: REPO_ROOT }).toString(),
  ];
  for (const attempt of attempts) {
    try {
      const out = attempt();
      return out.split("\n").filter((s) => s.length > 0);
    } catch {
      // fall through to the next strategy
    }
  }
  return [];
}

// ────────────────────────────────────────────────────────────────────
// Tests

check("OPM3: BANNED_RE catches CI-nudge anti-pattern", () => {
  const banned = [
    "chore: nudge CI",
    "chore: drain CI",
    "chore: re-trigger CI after cascade",
    "chore: serial drain 278 ci",
    "ci: kick ci",
  ];
  for (const s of banned) {
    if (!BANNED_RE.test(s)) throw new Error(`BANNED_RE should reject: ${s}`);
  }
});

check("OPM3: BANNED_RE does not over-match legitimate commits", () => {
  const allowed = [
    "feat(preflight): mirror ruleset gates locally",
    "fix(ci): correct verify.yml node version pin",
    "ci: gate Claude CI/CD behind org kill switch",
    "chore(deps)(deps): bump the github-actions-all group",
  ];
  for (const s of allowed) {
    if (BANNED_RE.test(s)) throw new Error(`BANNED_RE should NOT reject: ${s}`);
  }
});

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
const nonMerge = subjects.filter((s) => !MERGE_RE.test(s) && !BOT_RE.test(s));

// If zero post-convention commits exist on this branch (pre-convention
// PRs being merged forward), there's nothing to assert — the
// convention only binds commits authored after CONVENTION_START_ISO.
// Print a status line so the run isn't silent, but don't fail.
if (nonMerge.length === 0) {
  console.log(`  • no post-convention commits to check (all grandfathered before ${CONVENTION_START_ISO})`);
}

for (const subject of nonMerge) {
  check(`commit subject conforms to convention: ${subject.slice(0, 60)}${subject.length > 60 ? "..." : ""}`, () => {
    if (BANNED_RE.test(subject)) {
      throw new Error(
        `banned empty CI-nudge commit (OPM3) — re-trigger CI with \`gh run rerun\` or ` +
          `\`gh pr update-branch\`, never an empty commit. Squash it out.\n      got: ${subject}`,
      );
    }
    if (!CONVENTIONAL_RE.test(subject)) {
      throw new Error(
        `subject doesn't match <type>(<scope>?): <subject>\n      got: ${subject}`,
      );
    }
  });
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
