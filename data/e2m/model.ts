/**
 * e2m-ts data model — the typed source the postgres ERD is generated from.
 * zod schemas + enums, versioned with semver. One entity here = one `tables/<entity>.sql` file.
 *
 * @semver  bump MAJOR on a breaking column/enum change, MINOR on additive, PATCH on docs/semantics.
 * @cite    cowork/schemas/envelope.ts · coworkers/projects/2026/operational-plan/e2m-mcp/agents.ts
 */
import { z } from "zod";

export const EM_MODEL_VERSION = "1.0.0" as const;

// ── enums ──────────────────────────────────────────────────────────────────────
export const AgentFunction = z.enum(["operator", "product", "project", "finance", "legal", "engineering", "design", "data"]);
export const AgentTier = z.enum(["manager", "coworker", "subagent"]);
export const EnvelopeType = z.enum(["task", "ack", "result", "escalate", "notify", "summary", "operator"]);
export const EnvelopeState = z.enum(["pending", "read", "actioned", "archived"]);
export const TaskState = z.enum(["pending", "in_progress", "completed", "blocked", "failed"]);
export const TransitionEvent = z.enum(["claim", "complete", "block", "unblock", "fail", "retry", "ack", "read"]);

// ── entities ───────────────────────────────────────────────────────────────────
export const Agent = z.object({
  id: z.string(),                 // `${fn}-${tier}`
  fn: AgentFunction,
  tier: AgentTier,
  email: z.string().email(),
});

export const Team = z.object({
  id: z.string(),
  name: z.string(),
});

export const TeamMember = z.object({
  team_id: z.string(),
  agent_id: z.string(),
});

export const Envelope = z.object({
  id: z.string().uuid(),
  envelope_type: EnvelopeType,
  from_agent: z.string(),
  to_agent: z.string(),
  subject: z.string(),
  at: z.string().datetime(),
  state: EnvelopeState,
  thread_id: z.string().uuid().nullable(),
  payload: z.record(z.string(), z.unknown()).nullable(),
});

export const DurableTask = z.object({
  id: z.string().uuid(),
  queue: z.string(),
  subject: z.string(),
  state: TaskState,
  from_agent: z.string().nullable(),
  owner: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  evaluator: z.record(z.string(), z.unknown()).nullable(),
  payload: z.record(z.string(), z.unknown()).nullable(),
});

export const Transition = z.object({
  id: z.string().uuid(),          // parent task/envelope id
  at: z.string().datetime(),
  event: TransitionEvent,
  owner: z.string().nullable(),
  result: z.record(z.string(), z.unknown()).nullable(),
});

export type Agent = z.infer<typeof Agent>;
export type Team = z.infer<typeof Team>;
export type Envelope = z.infer<typeof Envelope>;
export type DurableTask = z.infer<typeof DurableTask>;
export type Transition = z.infer<typeof Transition>;
