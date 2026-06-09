/**
 * mailbox-types.ts — Zod schemas for the agent-to-agent mailbox MCP.
 *
 * @cite docs/architecture/mailbox-mcp-design.md
 * @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts  (CostRecordPayload mirrors AgentSessionCost)
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */
import { z } from "zod";

// ─── envelope primitives ─────────────────────────────────────────────────────

export const MessageType = z.enum([
  "outcome", "task", "test_result", "cost_record", "artifact", "ping",
]);
export type MessageType = z.infer<typeof MessageType>;

export const MessageStatus = z.enum([
  "pending", "in_flight", "acked", "expired", "failed",
]);
export type MessageStatus = z.infer<typeof MessageStatus>;

// Generic envelope factory — parameterised on payload schema
export const makeMailboxMessage = <T extends z.ZodTypeAny>(payloadSchema: T) =>
  z.object({
    id: z.string(),
    from: z.string(),
    to: z.union([z.string(), z.literal("broadcast")]),
    thread_id: z.string().optional(),
    timestamp: z.string().datetime(),
    type: MessageType,
    payload: payloadSchema,
    ack_required: z.boolean().default(false),
    ttl_ms: z.number().int().positive().optional(),
    status: MessageStatus.default("pending"),
  });

export type MailboxMessageShape = {
  id: string;
  from: string;
  to: string;
  thread_id?: string;
  timestamp: string;
  type: MessageType;
  payload: unknown;
  ack_required: boolean;
  ttl_ms?: number;
  status: MessageStatus;
};

// ─── outcome payload ─────────────────────────────────────────────────────────

export const OutcomeStatus = z.enum(["pending", "achieved", "failed"]);
export type OutcomeStatus = z.infer<typeof OutcomeStatus>;

export const EvidenceItem = z.union([
  z.string(),
  z.object({ metric: z.string(), value: z.number(), unit: z.string().optional(), at: z.string().datetime() }),
]);
export type EvidenceItem = z.infer<typeof EvidenceItem>;

export const OutcomePayload = z.object({
  outcome_id: z.string(),
  description: z.string(),
  status: OutcomeStatus,
  evidence: z.array(EvidenceItem).default([]),
});
export type OutcomePayload = z.infer<typeof OutcomePayload>;

// ─── task payload ─────────────────────────────────────────────────────────────

export const TaskStatus = z.enum(["pending", "in_progress", "blocked", "completed", "failed"]);
export type TaskStatus = z.infer<typeof TaskStatus>;

export const TaskPriority = z.enum(["low", "medium", "high", "critical"]);
export type TaskPriority = z.infer<typeof TaskPriority>;

export const TaskPayload = z.object({
  task_id: z.string(),
  title: z.string().max(255),
  description: z.string().optional(),
  status: TaskStatus.default("pending"),
  priority: TaskPriority.default("medium"),
  parent_task_id: z.string().optional(),
  assignee_agent_id: z.string().optional(),
  due_at: z.string().datetime().optional(),
});
export type TaskPayload = z.infer<typeof TaskPayload>;

// ─── test result payload ──────────────────────────────────────────────────────

export const TestResultPayload = z.object({
  test_file: z.string(),
  passed: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  skipped: z.number().int().nonnegative(),
  duration_ms: z.number().nonnegative(),
  cite: z.string().optional(),
  runner: z.enum(["vitest", "jest", "node", "custom"]).optional(),
  error_summary: z.string().optional(),
});
export type TestResultPayload = z.infer<typeof TestResultPayload>;

// ─── cost record payload (mirrors AgentSessionCost) ──────────────────────────

export const CostRecordPayload = z.object({
  session_id: z.string(),
  model: z.string(),
  workspace_id: z.string().optional(),
  service_tier: z.enum(["standard", "batch", "priority", "flex"]).optional(),
  context_window: z.enum(["0-200k", "200k-1M"]).optional(),
  uncached_input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  cache_read_input_tokens: z.number().int().nonnegative(),
  cache_creation_input_tokens: z.number().int().nonnegative(),
  cost_usd: z.number().nonnegative(),
  pr_number: z.number().int().optional(),
  branch: z.string().optional(),
});
export type CostRecordPayload = z.infer<typeof CostRecordPayload>;

// ─── artifact payload ─────────────────────────────────────────────────────────

export const ArtifactType = z.enum(["prompt", "eval", "schema", "cost_report", "design_doc", "rubric"]);
export type ArtifactType = z.infer<typeof ArtifactType>;

export const ArtifactPayload = z.object({
  artifact_type: ArtifactType,
  path: z.string(),
  sha256: z.string().length(64),
  size_bytes: z.number().int().nonnegative(),
  description: z.string().optional(),
  mime_type: z.string().optional(),
});
export type ArtifactPayload = z.infer<typeof ArtifactPayload>;

// ─── concrete message schemas ─────────────────────────────────────────────────

export const OutcomeMessage    = makeMailboxMessage(OutcomePayload);
export const TaskMessage       = makeMailboxMessage(TaskPayload);
export const TestResultMessage = makeMailboxMessage(TestResultPayload);
export const CostMessage       = makeMailboxMessage(CostRecordPayload);
export const ArtifactMessage   = makeMailboxMessage(ArtifactPayload);
export const PingMessage       = makeMailboxMessage(z.object({ nonce: z.string().optional() }));

// Discriminated union used for deserialisation
export const AnyMailboxMessage = z.union([
  OutcomeMessage, TaskMessage, TestResultMessage, CostMessage, ArtifactMessage, PingMessage,
]);
export type AnyMailboxMessage = z.infer<typeof AnyMailboxMessage>;

// Raw envelope for reading (permissive — payload parsed separately)
export const RawEnvelope = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  thread_id: z.string().optional(),
  timestamp: z.string(),
  type: MessageType,
  payload: z.unknown(),
  ack_required: z.boolean(),
  ttl_ms: z.number().optional(),
  status: MessageStatus,
});
export type RawEnvelope = z.infer<typeof RawEnvelope>;

// ─── version-controlled repo mail (send_mail / receive_mail) ─────────────────
//
// Modernized mailbox primitive: mail that lives IN the repository under
// mail/<recipient>/{inbox,read}/<id>.json, committed like any other change.
// Modeled on the Cloudflare agents email lifecycle (send → route → deliver →
// read) but the transport is git: agents on different loop schedules —
// scheduled ticks and responsive hop functions alike — exchange durable,
// reviewable messages across sessions via commits instead of a live broker.
//
// @cite vendor/cloudflare/developers.cloudflare.com/email-service/llms.txt

export const RepoMailStatus = z.enum(["queued", "delivered", "read", "archived"]);
export type RepoMailStatus = z.infer<typeof RepoMailStatus>;

export const RepoMail = z.object({
  id: z.string(),
  from: z.string(),
  to: z.union([z.string(), z.literal("broadcast")]),
  subject: z.string().min(1),
  body: z.string().min(1), // markdown
  thread_id: z.string().optional(),
  reply_to: z.string().optional(), // id of the mail being answered
  timestamp: z.string().datetime(),
  status: RepoMailStatus.default("delivered"),
  labels: z.array(z.string()).default([]),
});
export type RepoMail = z.infer<typeof RepoMail>;
