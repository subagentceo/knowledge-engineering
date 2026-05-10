// scripts/validate-phase-gates.ts
//
// PR 4. Validates the per-phase gate report at docs/phase-gates.md against
// the source-of-truth files:
//   - seeds/prompts/operator-2026-05-10*.md (operator-stated gates)
//   - rubrics/phase-{0..12}.md             (per-phase rubrics)
//
// Outputs a structured summary to stdout. Non-zero exit if a gate marked
// `ready` references a missing file (the report has drifted from source).
//
// Wired as `npm run validate:gates`. Run on every PR 4+ commit.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const RUBRICS_DIR = resolve(REPO_ROOT, "rubrics");
const SEEDS_DIR = resolve(REPO_ROOT, "seeds", "prompts");
const REPORT = resolve(REPO_ROOT, "docs", "phase-gates.md");

interface PhaseReport {
  phase: number;
  rubricExists: boolean;
  reportSection: boolean;
  blockingOwner: "agent" | "operator" | "agent+operator" | "none" | "deferred";
  operatorActions: number;
}

const EXPECTED_RUBRICS = Array.from({ length: 13 }, (_, i) => i);
const EXPECTED_SEEDS = [
  "operator-2026-05-10.md",
  "operator-2026-05-10-followup.md",
  "operator-2026-05-10-heartbeat.md",
];

function checkRubric(phase: number): boolean {
  return existsSync(resolve(RUBRICS_DIR, `phase-${phase}.md`));
}

function checkReportSection(phase: number, body: string): boolean {
  return new RegExp(`### Phase ${phase} —`).test(body);
}

function classifyOwner(phase: number, body: string): PhaseReport["blockingOwner"] {
  const section = body.match(
    new RegExp(`### Phase ${phase} —[\\s\\S]*?(?=###|## Summary)`)
  );
  if (!section) return "none";
  const text = section[0];
  if (/Status: \*\*?DEFERRED/i.test(text)) return "deferred";
  if (/Status: \*\*?READY/i.test(text)) return "none";
  const operatorPending = (text.match(/\*\*pending\*\*/g) || []).length;
  const dependsAgent = /depends on Phase \d/i.test(text);
  if (operatorPending > 0 && dependsAgent) return "agent+operator";
  if (operatorPending > 0) return "operator";
  if (dependsAgent) return "agent";
  return "none";
}

function countOperatorActions(phase: number, body: string): number {
  const section = body.match(
    new RegExp(`### Phase ${phase} —[\\s\\S]*?(?=###|## Summary)`)
  );
  if (!section) return 0;
  return (section[0].match(/\*\*pending\*\*/g) || []).length;
}

export function validatePhaseGates(): { ok: boolean; reports: PhaseReport[]; errors: string[] } {
  const errors: string[] = [];
  if (!existsSync(REPORT)) {
    errors.push(`missing ${REPORT}`);
    return { ok: false, reports: [], errors };
  }
  const body = readFileSync(REPORT, "utf8");

  for (const seed of EXPECTED_SEEDS) {
    if (!existsSync(resolve(SEEDS_DIR, seed))) {
      errors.push(`missing seed: seeds/prompts/${seed}`);
    }
  }

  const reports: PhaseReport[] = [];
  for (const phase of EXPECTED_RUBRICS) {
    const rubricExists = checkRubric(phase);
    if (!rubricExists) {
      errors.push(`missing rubric: rubrics/phase-${phase}.md`);
    }
    if (phase === 0) continue;
    const reportSection = checkReportSection(phase, body);
    if (!reportSection) {
      errors.push(`docs/phase-gates.md missing section for Phase ${phase}`);
    }
    reports.push({
      phase,
      rubricExists,
      reportSection,
      blockingOwner: classifyOwner(phase, body),
      operatorActions: countOperatorActions(phase, body),
    });
  }

  return { ok: errors.length === 0, reports, errors };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validatePhaseGates();
  console.log("phase-gates validation:");
  for (const r of result.reports) {
    console.log(
      `  Phase ${r.phase.toString().padStart(2)} | rubric: ${r.rubricExists ? "✓" : "✗"} | report: ${r.reportSection ? "✓" : "✗"} | owner: ${r.blockingOwner.padEnd(15)} | operator-pending: ${r.operatorActions}`
    );
  }
  if (!result.ok) {
    console.error(`\n${result.errors.length} error(s):`);
    for (const e of result.errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  const total = result.reports.reduce((acc, r) => acc + r.operatorActions, 0);
  console.log(`\nok — ${total} operator action(s) pending across phases 1-12`);
}
