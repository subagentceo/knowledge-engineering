/**
 * Asserts the repo's Remote Control posture per ORC1:
 *   (a) no `.claude/settings*.json` under this repo sets
 *       `disableRemoteControl: true` — the absence of that managed
 *       setting is the chassis invariant this PR introduces.
 *   (b) the `rc` npm script exists in package.json and points at
 *       `claude remote-control` with `--capacity 32 --spawn worktree`.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/remote-control.md
 * @cite vendor/anthropics/code.claude.com/docs/en/settings.md
 * @cite seeds/citations/define-outcomes.md
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

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

const repoRoot = resolve(new URL("../..", import.meta.url).pathname);

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "vendor",
  "third_party",
  "dist",
  "coverage",
  ".wrangler",
]);

function findClaudeSettings(dir: string, out: string[]): void {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    let st: ReturnType<typeof statSync>;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (entry === ".claude") {
        // Collect any settings*.json directly under .claude
        let inner: string[];
        try {
          inner = readdirSync(full);
        } catch {
          continue;
        }
        for (const f of inner) {
          if (f.startsWith("settings") && f.endsWith(".json")) {
            out.push(join(full, f));
          }
        }
      } else {
        findClaudeSettings(full, out);
      }
    }
  }
}

console.log("remote-control-posture:");

check("no .claude/settings*.json sets disableRemoteControl: true", () => {
  const files: string[] = [];
  findClaudeSettings(repoRoot, files);
  for (const file of files) {
    if (!existsSync(file)) continue;
    const raw = readFileSync(file, "utf8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      throw new Error(`${file}: invalid JSON — ${(err as Error).message}`);
    }
    const obj = parsed as Record<string, unknown> | null;
    if (obj && obj.disableRemoteControl === true) {
      throw new Error(
        `${file}: disableRemoteControl=true is forbidden by ORC1`,
      );
    }
  }
});

check("package.json defines an rc script targeting claude remote-control", () => {
  const pkgPath = join(repoRoot, "package.json");
  if (!existsSync(pkgPath)) throw new Error("package.json not found");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as {
    scripts?: Record<string, string>;
  };
  const rc = pkg.scripts?.rc;
  if (!rc) throw new Error("scripts.rc is missing");
  if (!rc.includes("claude remote-control")) {
    throw new Error(`scripts.rc does not invoke claude remote-control: ${rc}`);
  }
  if (!rc.includes("--capacity 32")) {
    throw new Error(`scripts.rc missing --capacity 32: ${rc}`);
  }
  if (!rc.includes("--spawn worktree")) {
    throw new Error(`scripts.rc missing --spawn worktree: ${rc}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
