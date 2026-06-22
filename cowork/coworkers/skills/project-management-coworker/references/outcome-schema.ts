/**
 * outcome-schema.ts — type contracts for everything project-management-coworker emits.
 *
 * @cite cowork/schemas/envelope.ts            (canonical Envelope / DurableTask)
 * @cite cowork/templates/task-state-machine.ts (TaskState, VALID_TRANSITIONS)
 * @cite cowork/mcp/e2m-mcp/server.ts          (envelope_write / task_transition / mailbox_send)
 *
 * Another agent (or the e2m-mcp server) validates against these before a row lands
 * in a durable queue. If a payload does not parse, it never gets written — failures
 * surface as a typed FailureTask (below) instead of a silent drop.
 */
import { z } from "zod";

export const TaskState = z.enum(["pending", "in_progress", "blocked", "completed", "failed"]);

/** A normal outcome we append to the project-management queue on task completion. */
export const OutcomeEnvelope = z.object({
  _type: z.literal("task"),
  id: z.string().uuid(),
  queue: z.literal("project-management"),
  subject: z.string().max(160),
  state: TaskState,
  owner: z.literal("project-management-coworker"),
  ke_fit_score: z.number().int().min(1).max(5),
  result: z.record(z.string(), z.unknown()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

/** A state transition row (pending→in_progress→completed, or →failed/→blocked). */
export const TransitionRow = z.object({
  _type: z.literal("transition"),
  id: z.string().uuid(),
  event: z.enum(["claim", "complete", "block", "unblock", "fail", "retry"]),
  prior_state: TaskState,
  new_state: TaskState,
  owner: z.string().optional(),
  error: z.string().optional(),
  at: z.string(),
});

/**
 * What we write to cowork/data/queues/engineering.jsonl when a tracked task fails
 * or a cadence script errors. This is the durability contract: every failure is a
 * resolvable, routable task — never a swallowed error.
 */
export const FailureTask = z.object({
  _type: z.literal("task"),
  id: z.string().uuid(),
  queue: z.literal("engineering"),
  subject: z.string(),
  state: z.literal("failed"),
  ke_fit_score: z.number().int().min(1).max(5),
  created_at: z.string(),
  updated_at: z.string(),
  error: z.object({
    resolvable: z.boolean(),
    error_type: z.enum(["host_unavailable", "schema_invalid", "dependency_blocked", "script_error", "unknown"]),
    suggested_skill: z.string(),
    detail: z.string(),
  }),
});

export type OutcomeEnvelope = z.infer<typeof OutcomeEnvelope>;
export type TransitionRow = z.infer<typeof TransitionRow>;
export type FailureTask = z.infer<typeof FailureTask>;
