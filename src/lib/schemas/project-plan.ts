/**
 * src/lib/schemas/project-plan.ts — Phase -1 plan-as-code schema
 *
 * Typed Zod schema for serializing agent project plans. Enables plan diffing,
 * version tracking in D1/SQLite, and LLM-structured-output generation.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 * @cite infra/sqlite/project-plans-schema.sql
 */
import { z } from "zod";

export const PlanStatusSchema = z.enum(["draft", "active", "archived", "superseded"]);
export type PlanStatus = z.infer<typeof PlanStatusSchema>;

export const PlanPhaseSchema = z.object({
  id: z.string(),          // e.g. "phase-0", "phase-1"
  title: z.string(),
  description: z.string(),
  status: z.enum(["pending", "in_progress", "done", "blocked"]),
  dependsOn: z.array(z.string()),  // phase IDs
  tasks: z.array(z.object({
    id: z.string(),               // e.g. "t14-1"
    title: z.string(),
    priority: z.enum(["critical", "high", "medium", "low"]),
    status: z.enum(["pending", "in_progress", "done", "blocked"]),
    dependsOn: z.array(z.string()),
    files: z.array(z.string()).optional(),
    operatorGated: z.boolean().default(false),
    outcomeId: z.string().optional(),  // links to SessionOutcome id
  })),
});

export type PlanPhase = z.infer<typeof PlanPhaseSchema>;

export const ProjectPlanSchema = z.object({
  id: z.string(),           // e.g. "2026-06-04-plan-v1"
  title: z.string(),
  version: z.string(),      // semver
  status: PlanStatusSchema,
  createdAt: z.string(),    // ISO timestamp
  updatedAt: z.string(),    // ISO timestamp
  phases: z.array(PlanPhaseSchema),
  metadata: z.object({
    sessionId: z.string().optional(),
    sourceDoc: z.string().optional(),   // e.g. "docs/firehose/2026-06-03.md"
    outcomeIds: z.array(z.string()),     // achieved outcome IDs this plan targets
  }),
});

export type ProjectPlan = z.infer<typeof ProjectPlanSchema>;

export function validatePlan(plan: unknown): ProjectPlan {
  return ProjectPlanSchema.parse(plan);
}
