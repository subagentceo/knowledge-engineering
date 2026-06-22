/**
 * T1 — Durable task state machine.
 *
 * Canonical Zod contract shared by the TypeScript orchestrator, the Rust
 * priority-queue (via JSON deserialization), and the Python Pydantic mirror.
 * Every state transition is a pure function — no side effects here.
 *
 * State diagram:
 *   pending ──claim──▶ in_progress ──complete──▶ completed
 *                          │
 *                          └──block───▶ blocked ──unblock──▶ in_progress
 *                          └──fail────▶ failed  ──retry───▶ pending
 *
 * @cite src/agent/team/subagent-schema.ts  (TeamTask, TeamTaskState — upstream)
 * @cite src/mcp/ext-tasks/index.ts         (pgdurable task queue MCP)
 * @cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md
 */

import { z } from "zod";

// ── States ────────────────────────────────────────────────────────────────────

export const TaskState = z.enum([
  "pending",
  "in_progress",
  "blocked",
  "completed",
  "failed",
]);
export type TaskState = z.infer<typeof TaskState>;

// ── Events (discriminated union) ──────────────────────────────────────────────

export const TaskEvent = z.discriminatedUnion("type", [
  z.object({ type: z.literal("claim"),    owner: z.string() }),
  z.object({ type: z.literal("complete"), result: z.record(z.string(), z.unknown()).optional() }),
  z.object({ type: z.literal("block"),    reason: z.string(), blockedBy: z.array(z.string()).default([]) }),
  z.object({ type: z.literal("unblock") }),
  z.object({ type: z.literal("fail"),     error: z.string() }),
  z.object({ type: z.literal("retry") }),
]);
export type TaskEvent = z.infer<typeof TaskEvent>;

// ── Priority scoring dimensions ───────────────────────────────────────────────

export const PriorityScore = z.object({
  urgency:             z.number().min(0).max(100),  // due_date proximity
  impact:              z.number().min(0).max(100),  // ke_fit_score × domain weight
  dependency_unblock:  z.number().min(0).max(100),  // downstream tasks unblocked
  effort_efficiency:   z.number().min(0).max(100),  // impact / estimated_hours
  staleness:           z.number().min(0).max(100),  // days since last transition
  total:               z.number().min(0).max(100),  // weighted sum
});
export type PriorityScore = z.infer<typeof PriorityScore>;

const WEIGHTS = {
  urgency:            0.30,
  impact:             0.25,
  dependency_unblock: 0.20,
  effort_efficiency:  0.15,
  staleness:          0.10,
} as const;

export function computeScore(dims: Omit<PriorityScore, "total">): PriorityScore {
  const total =
    dims.urgency            * WEIGHTS.urgency +
    dims.impact             * WEIGHTS.impact +
    dims.dependency_unblock * WEIGHTS.dependency_unblock +
    dims.effort_efficiency  * WEIGHTS.effort_efficiency +
    dims.staleness          * WEIGHTS.staleness;
  return { ...dims, total: Math.round(total * 10) / 10 };
}

// ── Durable task shape ────────────────────────────────────────────────────────

export const DurableTask = z.object({
  id:              z.string().uuid(),
  queue:           z.string().default("cowork"),
  subject:         z.string().min(1),
  description:     z.string().optional(),
  state:           TaskState.default("pending"),
  owner:           z.string().optional(),
  depends_on:      z.array(z.string()).default([]),
  blocks:          z.array(z.string()).default([]),
  domain:          z.enum(["product-management", "data", "engineering", "design"]).optional(),
  ke_fit_score:    z.number().int().min(1).max(5).optional(),
  estimated_hours: z.number().positive().optional(),
  due_date:        z.string().optional(),           // ISO-8601 date
  jira_key:        z.string().regex(/^[A-Z]+-\d+$/).optional(),
  priority_score:  PriorityScore.optional(),
  created_at:      z.string(),                      // ISO-8601
  updated_at:      z.string(),
  result:          z.record(z.string(), z.unknown()).nullable().optional(),
  error:           z.string().optional(),
});
export type DurableTask = z.infer<typeof DurableTask>;

// ── Transition table (pure, throws on illegal transition) ─────────────────────

type Transition = {
  from: TaskState[];
  to:   TaskState;
  guard?: (task: DurableTask, event: TaskEvent) => string | null; // returns error msg or null
};

const TRANSITIONS: Record<TaskEvent["type"], Transition> = {
  claim:    { from: ["pending"],             to: "in_progress" },
  complete: { from: ["in_progress"],         to: "completed"   },
  block:    { from: ["in_progress"],         to: "blocked"     },
  unblock:  { from: ["blocked"],             to: "in_progress" },
  fail:     { from: ["in_progress"],         to: "failed"      },
  retry:    { from: ["failed"],              to: "pending"     },
};

export function transition(
  task: DurableTask,
  event: TaskEvent,
): DurableTask {
  const t = TRANSITIONS[event.type];
  if (!t.from.includes(task.state)) {
    throw new Error(
      `illegal transition: ${task.state} --${event.type}--> (allowed from: ${t.from.join(", ")})`
    );
  }

  const now = new Date().toISOString();
  const patch: Partial<DurableTask> = { state: t.to, updated_at: now };

  switch (event.type) {
    case "claim":    patch.owner = event.owner; break;
    case "complete": patch.result = event.result ?? null; break;
    case "block":    patch.error = event.reason; break;
    case "fail":     patch.error = event.error; break;
    case "retry":    patch.error = undefined; patch.owner = undefined; break;
  }

  return DurableTask.parse({ ...task, ...patch });
}

// ── Urgency helper ────────────────────────────────────────────────────────────

export function urgencyScore(task: DurableTask, now = new Date()): number {
  if (!task.due_date) return 30; // no due date → neutral
  const daysLeft = (new Date(task.due_date).getTime() - now.getTime()) / 86_400_000;
  if (daysLeft < 0)  return 100; // overdue
  if (daysLeft < 1)  return 95;
  if (daysLeft < 3)  return 80;
  if (daysLeft < 7)  return 60;
  if (daysLeft < 14) return 40;
  return 20;
}

export function stalenessScore(task: DurableTask, now = new Date()): number {
  const daysSince = (now.getTime() - new Date(task.updated_at).getTime()) / 86_400_000;
  return Math.min(100, Math.round(daysSince * 5)); // 20 days stale = 100
}
