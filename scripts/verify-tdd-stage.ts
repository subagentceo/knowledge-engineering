/**
 * verify:tdd — assert every test file added in the last 7 days
 * carries an `@tdd <red|green|refactor>` stage tag.
 *
 * Strategy (founder primitive P3 loops + P4 harness-thins):
 *   1. `git log --since=7days --diff-filter=A --name-only --pretty=format:` to
 *      list newly-added files.
 *   2. Filter to *.test.[mc]?[jt]sx? under scripts/lib/, src/lib/, infra/cloudflare/src/.
 *   3. For each, read source and parse the @tdd tag.
 *   4. Fail with a per-file report if any are missing or invalid.
 *
 * Older test files (before the convention started) are silently
 * grandfathered — the 7-day filter handles this. The CONVENTION_START_ISO
 * constant in the file pins the cutoff for re-runs from a clean repo.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite scripts/lib/tdd-stage.ts
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parseTddStage } from "./lib/tdd-stage.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const TEST_DIR_PREFIXES = [
  "scripts/lib/",
  "src/lib/",
  "infra/cloudflare/src/",
  "src/agent/",
];

const TEST_FILE_RE = /\.test\.[mc]?[jt]sx?$/;

const CONVENTION_START_ISO = "2026-05-15T13:00:00Z";

function recentlyAddedTests(): string[] {
  const since = `--since=${CONVENTION_START_ISO}`;
  const cmd = `git log ${since} --diff-filter=A --name-only --pretty=format:`;
  let out: string;
  try {
    out = execSync(cmd, { cwd: REPO_ROOT, encoding: "utf8" });
  } catch {
    return [];
  }
  const paths = new Set<string>();
  for (const line of out.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (!TEST_FILE_RE.test(trimmed)) continue;
    if (!TEST_DIR_PREFIXES.some((p) => trimmed.startsWith(p))) continue;
    paths.add(trimmed);
  }
  return [...paths].sort();
}

/**
 * OPM5: belt-and-suspenders for the dropped-on-rebase hole.
 * `recentlyAddedTests` uses `--diff-filter=A`, so a test file whose @tdd
 * header is dropped while resolving an add/add conflict (it's no longer
 * "added" relative to the rebased base) slips past — exactly what happened
 * to blog-extract-fidelity.test.ts on the 2026-05-29 train. This returns
 * test files *modified on this branch* (any change status, vs origin/main),
 * so the tag is re-asserted on touched files without flagging grandfathered
 * ones elsewhere in the tree.
 */
function branchModifiedTests(): string[] {
  let out: string;
  try {
    const base = execSync("git merge-base HEAD origin/main", { cwd: REPO_ROOT }).toString().trim();
    out = execSync(`git diff --name-only ${base}..HEAD`, { cwd: REPO_ROOT, encoding: "utf8" });
  } catch {
    return [];
  }
  const paths = new Set<string>();
  for (const line of out.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (!TEST_FILE_RE.test(trimmed)) continue;
    if (!TEST_DIR_PREFIXES.some((p) => trimmed.startsWith(p))) continue;
    paths.add(trimmed);
  }
  return [...paths].sort();
}

function main(): void {
  // Union of newly-added (convention-window) and branch-modified test files.
  // The added-set keeps "new tests must declare a stage"; the modified-set
  // (OPM5) closes the dropped-on-rebase hole on files this branch touched.
  const tests = [...new Set([...recentlyAddedTests(), ...branchModifiedTests()])].sort();
  if (tests.length === 0) {
    console.log("verify:tdd — no test files added or modified in the convention window; trivially green");
    process.exit(0);
  }

  const missing: string[] = [];
  for (const rel of tests) {
    const abs = resolve(REPO_ROOT, rel);
    if (!existsSync(abs)) continue; // file may have been moved/deleted later
    const src = readFileSync(abs, "utf8");
    const stage = parseTddStage(src);
    if (stage === null) missing.push(rel);
  }

  console.log("");
  console.log(`verify:tdd — convention window from ${CONVENTION_START_ISO}`);
  console.log(`  ${tests.length} test file(s) added`);

  if (missing.length === 0) {
    console.log(`  ✓ all carry a valid @tdd <red|green|refactor> tag`);
    process.exit(0);
  }

  console.error("");
  console.error(`  ✗ ${missing.length} test file(s) missing @tdd tag:`);
  for (const f of missing) console.error(`    - ${f}`);
  console.error("");
  console.error("Add a JSDoc header to each:");
  console.error("  /** @tdd red */   (or green / refactor)");
  process.exit(1);
}

main();
