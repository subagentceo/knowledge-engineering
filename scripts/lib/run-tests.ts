// scripts/lib/run-tests.ts
//
// Phase 1.A. Tiny test runner that discovers *.test.ts files under
// scripts/lib/ and infra/cloudflare/src/ and runs each via tsx in a
// subprocess. The lone reason this exists: we have @cite-headered tests
// (asserted by scripts/lib/citation-guard.ts) but no test framework
// (defer until a real need arises). Hand-rolled runner is simpler than
// jest/vitest setup and avoids transitive-dep surface.
//
// Exit non-zero if any test file exits non-zero.
//
// Wired as `npm run verify:libs`. Chained into the top-level `verify`
// target.

import { spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

const TEST_DIRS = [
  resolve(REPO_ROOT, "scripts", "lib"),
  resolve(REPO_ROOT, "src", "lib"),
  resolve(REPO_ROOT, "src", "agent"),
  resolve(REPO_ROOT, "infra", "cloudflare", "src"),
  // cowork/schemas is not under src|scripts|infra, so it needs an explicit
  // entry — scoped to this subdir only, not the whole cowork/ tree, to
  // avoid sweeping in unrelated cowork/data, cowork/artifacts, etc.
  resolve(REPO_ROOT, "cowork", "schemas"),
];

function listTests(dir: string): string[] {
  let entries: ReturnType<typeof readdirSync>;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out: string[] = [];
  for (const entry of entries) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      // Phase G (O-G10): recurse into subdirectories so tests beside
      // schemas/, routines/, etc. are auto-discovered.
      if (entry.name === "node_modules") continue;
      out.push(...listTests(path));
      continue;
    }
    if (entry.isFile() && /\.test\.[mc]?[jt]sx?$/.test(entry.name)) {
      out.push(path);
    }
  }
  return out.sort();
}

async function runOne(path: string): Promise<{ path: string; code: number }> {
  return new Promise((res) => {
    const child = spawn("npx", ["tsx", path], { stdio: "inherit" });
    child.on("close", (code) => res({ path, code: code ?? 1 }));
  });
}

async function main(): Promise<void> {
  const tests = TEST_DIRS.flatMap(listTests);
  if (tests.length === 0) {
    console.log("run-tests: no test files found (trivially green)");
    return;
  }
  console.log(`run-tests: ${tests.length} file(s)\n`);
  const failures: string[] = [];
  for (const t of tests) {
    const { code } = await runOne(t);
    if (code !== 0) failures.push(t);
  }
  if (failures.length > 0) {
    console.error(`\nrun-tests: ${failures.length} of ${tests.length} test file(s) failed`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`\nrun-tests: ${tests.length} of ${tests.length} test file(s) passed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
