/**
 * Outcome-driven eval harness for OPR2 — third_party/ upstream submodules.
 *
 * Conditional assertion shape:
 *   - For each documented submodule, check `git submodule status <path>`.
 *   - If the submodule is not initialized (status prefix `-`) or the
 *     entry doesn't appear in `.gitmodules` yet, log SKIPPED — this
 *     eval ships BEFORE OPR2 (#191) lands, by design.
 *   - If the submodule IS initialized, assert the pinned SHA matches
 *     the documented pin and that `.gitmodules` records the expected
 *     upstream URL.
 *
 * The eval starts catching drift the moment OPR2 merges — without
 * requiring a coupled change to this file.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/best-practices.md
 * @cite seeds/citations/define-outcomes.md
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

interface ExpectedSubmodule {
  path: string;
  sha: string;
  url: string;
}

// Pins documented on draft PR #191 (OPR2). When OPR2 lands, the
// submodules below MUST be initialized at these exact SHAs.
const EXPECTED: ExpectedSubmodule[] = [
  {
    path: "third_party/workerd",
    sha: "71b97eca06de73c9d0d4bd2dc5d76511c1c07b93",
    url: "https://github.com/cloudflare/workerd",
  },
  {
    path: "third_party/workers-sdk",
    sha: "a3fa623f2abf192e57d876c727bfa107aa297ec9",
    url: "https://github.com/cloudflare/workers-sdk",
  },
  {
    path: "third_party/dynamic-workflows",
    sha: "9726985af886698e85e90e3f044daf6dfcea2c1d",
    url: "https://github.com/cloudflare/dynamic-workflows",
  },
];

let passed = 0;
let failed = 0;
let skipped = 0;

function check(name: string, fn: () => "ok" | "skip"): void {
  try {
    const result = fn();
    if (result === "skip") {
      skipped += 1;
      console.log(`  • SKIP ${name}`);
    } else {
      passed += 1;
      console.log(`  ✓ ${name}`);
    }
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

/**
 * Returns the submodule-status line for `path`, or `null` if the path
 * isn't a registered submodule. Status line format (per git-submodule(1)):
 *
 *     [ -+U]<sha> <path> [(<describe>)]
 *
 * - leading `-` means not initialized
 * - leading `+` means SHA differs from index
 * - leading `U` means merge conflicts
 * - leading ' ' (space) means clean
 */
function submoduleStatus(path: string): string | null {
  try {
    const out = execFileSync("git", ["submodule", "status", path], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return out.length === 0 ? null : out;
  } catch {
    // Not a known submodule path — `git submodule status <path>` exits
    // non-zero. Treat as "not present yet".
    return null;
  }
}

function parseSha(statusLine: string): { sha: string; initialized: boolean } {
  // First char encodes init state; SHA follows (40 hex chars).
  const prefix = statusLine.charAt(0);
  const initialized = prefix !== "-";
  // Drop the prefix char (or space) then take the first whitespace-delimited token.
  const rest = statusLine.slice(1).trim();
  const sha = rest.split(/\s+/)[0] ?? "";
  return { sha, initialized };
}

console.log("third_party/ submodule pin eval (OPR2-EVAL)\n");

const gitmodulesPath = resolve(REPO_ROOT, ".gitmodules");
const gitmodulesExists = existsSync(gitmodulesPath);
const gitmodulesContent = gitmodulesExists
  ? readFileSync(gitmodulesPath, "utf8")
  : "";

if (!gitmodulesExists) {
  console.log(
    "  • .gitmodules absent — OPR2 (#191) has not landed yet; all submodule assertions will SKIP",
  );
}

for (const entry of EXPECTED) {
  const status = submoduleStatus(entry.path);

  check(`submodule pin: ${entry.path}`, () => {
    if (!gitmodulesExists || status === null) {
      return "skip";
    }
    const { sha, initialized } = parseSha(status);
    if (!initialized) {
      return "skip";
    }
    if (sha !== entry.sha) {
      throw new Error(
        `pinned SHA drift\n      expected: ${entry.sha}\n      got:      ${sha}`,
      );
    }
    return "ok";
  });

  check(`.gitmodules records upstream URL: ${entry.path}`, () => {
    if (!gitmodulesExists) {
      return "skip";
    }
    // Submodule path may not yet be registered even if .gitmodules exists
    // (partial OPR2 rollout). Skip in that case rather than fail.
    const pathRe = new RegExp(`path\\s*=\\s*${entry.path.replace(/\//g, "\\/")}`);
    if (!pathRe.test(gitmodulesContent)) {
      return "skip";
    }
    // Match the URL on any line — .gitmodules sections are small, this
    // is sufficient given the path check above scopes us to the right
    // submodule's neighborhood.
    if (!gitmodulesContent.includes(entry.url)) {
      throw new Error(
        `upstream URL not found in .gitmodules\n      expected: ${entry.url}`,
      );
    }
    return "ok";
  });
}

console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped`);
if (failed > 0) process.exit(1);
