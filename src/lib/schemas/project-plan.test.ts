/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite src/lib/schemas/project-plan.ts
 */
import { ProjectPlanSchema, PlanPhaseSchema } from "./project-plan.js";

function assertEqual<T>(actual: T, expected: T, msg: string): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`FAIL ${msg}: got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)}`);
  }
}

function assertThrows(fn: () => unknown, msg: string): void {
  let threw = false;
  try { fn(); } catch { threw = true; }
  if (!threw) throw new Error(`FAIL ${msg}: expected throw`);
}

const VALID_PHASE = {
  id: "phase-0",
  title: "Foundational KG",
  description: "Build knowledge graph pipeline",
  status: "pending" as const,
  dependsOn: [],
  tasks: [{
    id: "t14-1",
    title: "npm package catalog",
    priority: "high" as const,
    status: "pending" as const,
    dependsOn: [],
    operatorGated: false,
  }],
};

const VALID_PLAN = {
  id: "2026-06-04-plan-v1",
  title: "Phase 0-3 execution plan",
  version: "0.5.0",
  status: "active" as const,
  createdAt: "2026-06-04T00:00:00Z",
  updatedAt: "2026-06-04T00:00:00Z",
  phases: [VALID_PHASE],
  metadata: {
    sourceDoc: "docs/firehose/2026-06-03.md",
    outcomeIds: ["2026-06-04-O9"],
  },
};

PlanPhaseSchema.parse(VALID_PHASE);
const parsed = ProjectPlanSchema.parse(VALID_PLAN);
assertEqual(parsed.id, "2026-06-04-plan-v1", "plan id");
assertEqual(parsed.phases.length, 1, "phase count");
assertEqual(parsed.phases[0].tasks.length, 1, "task count");

assertThrows(() => ProjectPlanSchema.parse({ ...VALID_PLAN, status: "unknown" }), "invalid status rejects");
assertThrows(() => ProjectPlanSchema.parse({ ...VALID_PLAN, phases: "not-array" }), "invalid phases rejects");

console.log("project-plan schema: OK");
