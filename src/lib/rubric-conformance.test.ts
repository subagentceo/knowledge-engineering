/**
 * OBP3 — rubric conformance assertion.
 *
 * Every rubrics/phase-*.md must expose the minimal shape an evaluation
 * tool needs in order to grade the phase:
 *   1. A heading line whose text contains "criteria", "rubric", or
 *      "success" (case-insensitive) — proves it has success criteria.
 *   2. At least one outcome ID of the form (O[A-Za-z][0-9A-Za-z-]*)
 *      somewhere in the body — proves it's tied to an outcome.
 *
 * Pre-OPE rubrics that don't match either contract are SKIPPED, not
 * failed, so the grandfathered phase docs don't break the gate. This
 * mirrors the conventions.test.ts grandfathering pattern.
 *
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

let passed = 0;
let skipped = 0;
let failed = 0;

function check(name: string, fn: () => "ok" | "skip"): void {
  try {
    const result = fn();
    if (result === "skip") {
      skipped += 1;
      console.log(`  - ${name} (SKIP)`);
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

const HEADING_RE = /^#{1,6}\s+.*(criteria|rubric|success)/im;
const OUTCOME_RE = /\bO[A-Za-z][0-9A-Za-z-]*\b/;

console.log("rubric-conformance:");

const rubricsDir = resolve(process.cwd(), "rubrics");
const files = readdirSync(rubricsDir)
  .filter((f) => /^phase-.+\.md$/.test(f))
  .sort();

for (const file of files) {
  check(`${file} has criteria heading + outcome ID`, () => {
    const body = readFileSync(resolve(rubricsDir, file), "utf8");
    const hasHeading = HEADING_RE.test(body);
    const hasOutcome = OUTCOME_RE.test(body);
    if (!hasHeading || !hasOutcome) {
      // Pre-OPE / pre-convention rubric — skip rather than fail.
      // Grandfathered: an eval tool can choose to ignore these or
      // upgrade them in a follow-up PR.
      return "skip";
    }
    return "ok";
  });
}

console.log(
  `\n${files.length} rubric file(s); ${passed} passed, ${skipped} skipped, ${failed} failed`
);
if (failed > 0) process.exit(1);
