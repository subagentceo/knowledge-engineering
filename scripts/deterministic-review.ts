// deterministic-review.ts (CLI) — runs the O-CICD1 fallback review on a PR diff.
//
// Usage: npx tsx scripts/deterministic-review.ts --base <sha> --head <sha>
// Prints a markdown summary (suitable for $GITHUB_STEP_SUMMARY) and exits 1
// when findings exist. Same (base, head) → same output, byte for byte.
//
// @cite vendor/anthropics/code.claude.com/docs/en/github-actions.md

import { execFileSync } from "node:child_process";

import {
  findApiKeyIntroductions,
  findBannedCommitSubjects,
  findTestHeaderGaps,
  renderReviewSummary,
} from "../src/lib/deterministic-review.ts";

function git(...args: string[]): string {
  return execFileSync("git", args, {
    encoding: "utf8",
    // Vendor crawl PRs can carry >64 MiB diffs (PR #465 hit 67 MB).
    maxBuffer: 1024 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
}

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const base = arg("base");
const head = arg("head");
if (!base || !head) {
  console.error("Usage: deterministic-review.ts --base <sha> --head <sha>");
  process.exit(1);
}

const diff = git("diff", base, head);

const changedTestFiles = git("diff", "--name-only", base, head)
  .split("\n")
  .filter((f) => /^src\/.*\.test\.ts$/.test(f))
  .flatMap((path) => {
    try {
      return [{ path, content: git("show", `${head}:${path}`) }];
    } catch {
      return []; // deleted at head
    }
  });

const subjects = git("log", "--format=%s", `${base}..${head}`)
  .split("\n")
  .filter(Boolean);

const findings = [
  ...findApiKeyIntroductions(diff),
  ...findTestHeaderGaps(changedTestFiles),
  ...findBannedCommitSubjects(subjects),
];

console.log(renderReviewSummary(findings));
process.exit(findings.length === 0 ? 0 : 1);
