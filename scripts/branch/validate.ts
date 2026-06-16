/**
 * scripts/branch/validate.ts — fail-fast validator for the canonical branch
 * topology. Used by the pre-push hook and the CI guard (PR3).
 *
 * Validates the current branch (or --name <branch>) and, when a commit range
 * is given (--range <base>..<head>), asserts every commit carries a
 * Claude-Session trailer for branch->commit->PR->telemetry traceability.
 *
 * Exit 0 = conforming; exit 1 = drift (with actionable messages).
 *
 * Usage:
 *   tsx scripts/branch/validate.ts                       # current branch
 *   tsx scripts/branch/validate.ts --name feat/KNOW-1/u/a-b-c
 *   tsx scripts/branch/validate.ts --range origin/main..HEAD
 *
 * @cite src/lib/branch-topology.ts
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 */

import { execSync } from "node:child_process";
import {
  validateBranch,
  parseSessionTrailer,
  JIRA_BOARD,
} from "../../src/lib/branch-topology.js";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function currentBranch(): string {
  return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
}

const name = arg("name") ?? currentBranch();

// Protected refs are exempt — only feature branches must conform.
const EXEMPT = new Set(["main", "HEAD"]);
// WHY claude/: Claude Code auto-generates branch names (claude/<random>) that
// can't conform to the KENG-NNNN-description topology. Exempt them so CI
// doesn't block infra PRs from agent sessions.
const EXEMPT_PREFIX = ["release-please--", "dependabot/", "claude/"];
const exempt =
  EXEMPT.has(name) || EXEMPT_PREFIX.some((p) => name.startsWith(p));

let failed = false;

if (exempt) {
  console.log(`✓ branch "${name}" is exempt (protected/bot ref)`);
} else {
  const errs = validateBranch(name);
  if (errs.length === 0) {
    console.log(`✓ branch "${name}" conforms to <git-user>/${JIRA_BOARD}-<n>-<kebab-description>`);
  } else {
    failed = true;
    console.error(`✗ branch "${name}" violates the canonical topology:`);
    for (const e of errs) console.error(`  - [${e.code}] ${e.message}`);
  }
}

// Optional: require the Claude-Session trailer on each commit in a range.
const range = arg("range");
if (range && !exempt) {
  const log = execSync(`git log --format=%H%x00%B%x1e ${range}`, { encoding: "utf8" });
  const commits = log.split("\x1e").map((c) => c.trim()).filter(Boolean);
  for (const c of commits) {
    const [sha, ...rest] = c.split("\x00");
    const body = rest.join("\x00");
    if (!parseSessionTrailer(body)) {
      failed = true;
      console.error(
        `✗ commit ${sha.slice(0, 8)} is missing a "Claude-Session:" trailer (required for traceability)`,
      );
    }
  }
  if (!failed) console.log(`✓ all commits in ${range} carry a Claude-Session trailer`);
}

process.exit(failed ? 1 : 0);
