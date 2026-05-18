/**
 * Eval harness for OPR4: agent-skills + terragrunt + knowledge-work-plugins
 * batch of 8 submodules under third_party/ (PR #193).
 *
 * Conditional assertion: each submodule is checked via `git submodule status`.
 *   - Leading `-` (not initialized) → SKIPPED (not failed). PR #193 is still
 *     under operator review; main does not yet have these initialized.
 *   - Leading ` ` (space, clean) → ASSERT pinned SHA matches expected.
 *   - Any other leading char (`+` modified, `U` conflicts) → FAIL.
 *
 * For `third_party/terragrunt`, if initialized, additionally assert the
 * checkout is exactly tag `v1.0.4` via `git describe --tags --exact-match`.
 *
 * Outcome: OPR4-EVAL — outcome-driven eval lives in this repo and runs as
 * part of `npm run verify:libs`, independent of PR #193's merge state.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/best-practices.md
 * @cite seeds/citations/define-outcomes.md
 */

import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

interface Submodule {
  path: string;
  expectedSha: string;
  /** Optional exact tag to assert via `git describe --tags --exact-match HEAD`. */
  tag?: string;
}

const SUBMODULES: Submodule[] = [
  { path: "third_party/redis-agent-skills", expectedSha: "4eaff191fcb830b64b6ac05bb8ef0ee067c73a9f" },
  { path: "third_party/neon-agent-skills", expectedSha: "b76e344eae92119f1aea3f73865c4ddbb1f4df1e" },
  { path: "third_party/cloudflare-skills", expectedSha: "60147cbb773649eadca89cee92b4e0caf02234b4" },
  { path: "third_party/agentskills-spec", expectedSha: "2d3e01f590f68bee2cb76a3200823e93b2cc9eaa" },
  { path: "third_party/hashicorp-agent-skills", expectedSha: "43ca9b0cde131e20a129c106bc9f6b6f9f1e5c9a" },
  { path: "third_party/atlassian-mcp-server", expectedSha: "9b52fb18e184edc307ce33f8bf4cdf148dedf1f2" },
  { path: "third_party/terragrunt", expectedSha: "f844a3d37f7ba5a6a3e0fd3e9a7860c15c4cc606", tag: "v1.0.4" },
  { path: "third_party/anthropics-knowledge-work-plugins", expectedSha: "a0fda662dd52f2704c43a57ea38ff7de647b013f" },
];

let passed = 0;
let failed = 0;
let skipped = 0;

function check(name: string, fn: () => "skipped" | void): void {
  try {
    const r = fn();
    if (r === "skipped") {
      skipped += 1;
      console.log(`  ○ ${name} (SKIPPED — not initialized)`);
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

function submoduleStatus(path: string): { leadChar: string; sha: string } | null {
  // `git submodule status <path>` — output formats:
  //   "-<sha> <path>"     not initialized
  //   " <sha> <path> ..." clean / matches index
  //   "+<sha> <path> ..." checked out differs from index
  //   "U<sha> <path>"     merge conflicts
  // If the path is not a registered submodule, git exits non-zero.
  let raw: string;
  try {
    raw = execFileSync("git", ["submodule", "status", path], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    return null;
  }
  const line = raw.split("\n").find((l) => l.length > 0);
  if (!line) return null;
  const leadChar = line[0];
  // SHA is chars 1..41
  const sha = line.slice(1, 41);
  return { leadChar, sha };
}

console.log("OPR4 eval: 8-submodule batch (agent-skills + terragrunt + kwp)\n");

for (const sm of SUBMODULES) {
  check(sm.path, () => {
    const status = submoduleStatus(sm.path);
    if (status === null) {
      // Not a registered submodule yet (PR #193 not merged). Treat as SKIPPED.
      return "skipped";
    }
    if (status.leadChar === "-") {
      return "skipped";
    }
    if (status.leadChar === " ") {
      if (status.sha !== sm.expectedSha) {
        throw new Error(
          `pinned SHA mismatch: expected ${sm.expectedSha}, got ${status.sha}`,
        );
      }
      if (sm.tag) {
        const described = execFileSync(
          "git",
          ["-C", sm.path, "describe", "--tags", "--exact-match", "HEAD"],
          { cwd: REPO_ROOT, encoding: "utf8" },
        ).trim();
        if (described !== sm.tag) {
          throw new Error(`tag mismatch: expected ${sm.tag}, got ${described}`);
        }
      }
      return;
    }
    throw new Error(
      `unexpected submodule status leading char '${status.leadChar}' for ${sm.path} (modified or in conflict)`,
    );
  });
}

console.log(
  `\nresult: ${passed} asserted, ${skipped} skipped, ${failed} failed (of ${SUBMODULES.length} submodules)`,
);

if (failed > 0) {
  process.exit(1);
}
