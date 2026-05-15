/**
 * verify:coverage — Phase B coverage threshold gate.
 *
 * Reads `coverage/lcov.info` produced by `c8 tsx scripts/lib/run-tests.ts`
 * and asserts every covered file is ≥ the current threshold.
 *
 * Ratchet: starts at 70%; raised to 80% and then 90% in subsequent PRs
 * once the codebase backfills tests. The threshold lives in the env var
 * `KE_COVERAGE_THRESHOLD` (default 70) so CI can override per-phase.
 *
 * **Pre-existing-baseline allowlist.** Four files exist today below 70%
 * (`PRE_EXISTING_BELOW_THRESHOLD`). They are EXEMPT from the gate so this
 * PR can land the tooling; G8 backfills tests for each and removes them
 * from the allowlist. Adding new entries requires a comment + outcome ID.
 *
 * Per founder primitive P4 (harness-thins) + directive D4 (≤300 LOC):
 * pure orchestration that defers to scripts/lib/coverage-parser.ts.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite scripts/lib/coverage-parser.ts
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parseLcov, filesBelowThreshold } from "./lib/coverage-parser.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const LCOV_PATH = resolve(REPO_ROOT, "coverage", "lcov.info");

const DEFAULT_THRESHOLD = 70;

// Pre-existing files below threshold at Phase B introduction (2026-05-15).
// G8 backfills tests and removes each from this list. Do NOT add new
// entries without an outcome ID + dated comment.
const PRE_EXISTING_BELOW_THRESHOLD = new Set<string>([
  "scripts/lib/citation-guard.ts", // O-G8 — CLI script, needs invocation harness test
  "scripts/lib/neon-client.ts",    // O-G8 — has partial test (42%), backfill the rest
  // 2026-05-15: src/lib/cache-control.ts + src/lib/docs-fetch.ts removed
  // from this list by Phase G item O-G8 (this PR). Sibling tests
  // landed in src/lib/cache-control.test.ts + src/lib/docs-fetch.test.ts.
]);

function readThreshold(): number {
  const raw = process.env["KE_COVERAGE_THRESHOLD"];
  if (!raw) return DEFAULT_THRESHOLD;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0 || n > 100) return DEFAULT_THRESHOLD;
  return n;
}

function relativize(absPath: string): string {
  const prefix = `${REPO_ROOT}/`;
  return absPath.startsWith(prefix) ? absPath.slice(prefix.length) : absPath;
}

function main(): void {
  const threshold = readThreshold();

  if (!existsSync(LCOV_PATH)) {
    console.error(`verify:coverage — coverage/lcov.info not found at ${LCOV_PATH}`);
    console.error("Run `npm run verify:coverage` (NOT this script directly) to produce it.");
    process.exit(2);
  }
  const body = readFileSync(LCOV_PATH, "utf8");
  const files = parseLcov(body);

  if (files.length === 0) {
    console.error("verify:coverage — lcov.info parsed to 0 files; c8 misconfigured?");
    process.exit(3);
  }

  const allFailures = filesBelowThreshold(files, threshold);
  const realFailures = allFailures.filter(
    (f) => !PRE_EXISTING_BELOW_THRESHOLD.has(relativize(f.path)),
  );
  const exempt = allFailures.filter((f) =>
    PRE_EXISTING_BELOW_THRESHOLD.has(relativize(f.path)),
  );

  console.log("");
  console.log(`verify:coverage — threshold ${threshold}%`);
  console.log(`  ${files.length} file(s) parsed`);
  console.log(`  ${realFailures.length} below threshold (non-exempt)`);
  console.log(`  ${exempt.length} below threshold but pre-existing-baseline-exempt`);

  if (exempt.length > 0) {
    console.log("");
    console.log("Exempt (pre-existing-baseline; tracked under O-G8):");
    for (const f of exempt) {
      console.log(`  ⏸ ${f.percent}%  ${relativize(f.path)}`);
    }
  }

  if (realFailures.length === 0) {
    const avg = Math.round(files.reduce((a, f) => a + f.percent, 0) / files.length);
    console.log("");
    console.log(`  ✓ no new regression; mean coverage ${avg}%`);
    process.exit(0);
  }

  console.error("");
  console.error("New files below threshold (gate fails):");
  for (const f of realFailures) {
    console.error(`  ✗ ${f.percent}%  ${relativize(f.path)}  (${f.hits}/${f.lines} lines)`);
  }
  process.exit(1);
}

main();

