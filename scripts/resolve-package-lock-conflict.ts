/**
 * scripts/resolve-package-lock-conflict.ts
 *
 * Codifies the chassis-wide package-lock.json conflict primitive
 * (2026-05-15). When a PR's merge into main produces a conflict in
 * `package-lock.json`, the canonical resolution is to:
 *
 *   1. Resolve package.json conflicts manually (intent-bearing).
 *   2. Reset the lock to main's version.
 *   3. Regenerate via `npm install` against the merged package.json.
 *   4. Stage the result.
 *
 * This script bundles steps 2-4. Step 1 (package.json) must already be
 * resolved by the caller — the script asserts no markers remain there
 * before proceeding.
 *
 * Idempotent: safe to run on a clean tree (exits 0 with "no conflict").
 *
 * @cite docs/decisions/2026-05-15-package-lock-primitive.md
 * @cite seeds/posture/session-start.xml `<discipline><package-lock-resolution>`
 */
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const PACKAGE_JSON = resolve(REPO_ROOT, "package.json");
const PACKAGE_LOCK = resolve(REPO_ROOT, "package-lock.json");

const MARKER_RE = /^(<{7}|={7}|>{7})/m;

function hasConflictMarkers(path: string): boolean {
  if (!existsSync(path)) return false;
  return MARKER_RE.test(readFileSync(path, "utf8"));
}

function run(cmd: string, args: string[]): { code: number; stdout: string; stderr: string } {
  const r = spawnSync(cmd, args, { cwd: REPO_ROOT, encoding: "utf8" });
  return {
    code: r.status ?? 1,
    stdout: r.stdout ?? "",
    stderr: r.stderr ?? "",
  };
}

export function resolveLockConflict(): { action: "noop" | "regenerated"; reason: string } {
  // Pre-condition: package.json must already be conflict-free.
  if (hasConflictMarkers(PACKAGE_JSON)) {
    throw new Error(
      "package.json still contains merge conflict markers. Resolve them first " +
        "(package.json is intent-bearing; the helper only regenerates the lock).",
    );
  }

  // If the lock has no markers AND no unmerged-files entry, nothing to do.
  const lockHasMarkers = hasConflictMarkers(PACKAGE_LOCK);
  const statusResult = run("git", ["ls-files", "--unmerged", "package-lock.json"]);
  const isUnmerged = statusResult.stdout.trim().length > 0;

  if (!lockHasMarkers && !isUnmerged) {
    return { action: "noop", reason: "no conflict markers; nothing to regenerate" };
  }

  // Step 2: reset lock to main's version.
  const checkout = run("git", ["checkout", "origin/main", "--", "package-lock.json"]);
  if (checkout.code !== 0) {
    throw new Error(
      `git checkout origin/main -- package-lock.json failed: ${checkout.stderr.trim()}`,
    );
  }

  // Step 3: regenerate via npm install against merged package.json.
  const npmInstall = run("npm", ["install"]);
  if (npmInstall.code !== 0) {
    throw new Error(
      `npm install failed (regenerate lock from merged package.json): ${npmInstall.stderr.trim()}`,
    );
  }

  // Step 4: stage the regenerated lock.
  const add = run("git", ["add", "package-lock.json"]);
  if (add.code !== 0) {
    throw new Error(`git add package-lock.json failed: ${add.stderr.trim()}`);
  }

  return {
    action: "regenerated",
    reason: "lock reset to origin/main; regenerated via npm install; staged",
  };
}

// Entry point — only run if invoked directly, not when imported.
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const result = resolveLockConflict();
    console.log(`resolve-package-lock-conflict — ${result.action}`);
    console.log(`  ${result.reason}`);
    process.exit(0);
  } catch (err) {
    console.error(`resolve-package-lock-conflict — FAIL`);
    console.error(`  ${(err as Error).message}`);
    process.exit(1);
  }
}
