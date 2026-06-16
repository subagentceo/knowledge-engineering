/**
 * scripts/branch/generate.ts — emit a canonical branch name from the active
 * session state, modeled on the anthropics/claude-code <user>/<ticket>-<desc>
 * convention.
 *
 * Resolves the git user from `git config user.name` (override with --user).
 * Prints the branch name on stdout so it composes:
 *   git checkout -b "$(tsx scripts/branch/generate.ts --issue 12 --desc 'add retry')"
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/worktrees.md
 * @cite src/lib/branch-topology.ts
 */

import { execSync } from "node:child_process";
import { generateBranch } from "../../src/lib/branch-topology.js";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function gitUser(): string {
  const explicit = arg("user");
  if (explicit) return explicit;
  try {
    return execSync("git config user.name", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

const issue = arg("issue");
const desc = arg("desc") ?? arg("description");

if (!issue || !desc) {
  console.error(
    "usage: tsx scripts/branch/generate.ts --issue <n|KNOW-n> --desc <free text> [--user name]",
  );
  process.exit(2);
}

console.log(generateBranch({ user: gitUser(), issue, description: desc }));
