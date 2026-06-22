/**
 * @cite cowork/templates/task-state-machine.ts
 * @cite cowork/coworkers/manifest.json
 * @cite cowork/apps/mail/AGENTS.md
 *
 * Canonical Zod schemas for sales-coworker typed outputs.
 * Every emit path (success + failure) references these schemas.
 */
import { z } from "zod";

/** Success result emitted on task completion. */
export const SalesTaskResult = z.object({
  task_id: z.string().uuid(),
  verdict: z.enum(["pass", "fail"]),
  state_transition: z.string(),
  result: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("draft"),
      draft_id: z.string().uuid(),
      to: z.string(),
      status: z.literal("queued_for_review"),
    }),
    z.object({
      type: z.literal("cost"),
      cost_id: z.string().uuid(),
      vendor: z.string(),
      amount: z.number(),
      currency: z.string(),
      cadence: z.enum(["one-time", "monthly", "annual"]),
    }),
    z.object({
      type: z.literal("research"),
      research_id: z.string().uuid(),
      findings: z.array(z.string()),
    }),
  ]),
  routed_to: z.array(z.string()),
});

/** Failure envelope written to engineering.jsonl as DurableTask. */
export const SalesTaskError = z.object({
  id: z.string().uuid(),
  queue: z.literal("engineering"),
  subject: z.string(),
  state: z.literal("pending"),
  ke_fit_score: z.number().int().min(1).max(5),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  error: z.object({
    skill: z.literal("sales-coworker"),
    dimension: z.string(),
    score: z.number().int(),
    threshold: z.number().int(),
    evidence: z.string(),
    fix: z.string(),
    resolvable: z.boolean(),
    error_type: z.enum([
      "mailbox_read_fail",
      "invalid_payload",
      "draft_write_fail",
      "finance_append_fail",
    ]),
    suggested_skill: z.string(),
  }),
});

/** Mail draft row appended to cowork/apps/mail/queued_drafts.jsonl. */
export const MailDraft = z.object({
  id: z.string().uuid(),
  to: z.string(),
  cc: z.array(z.string()).optional(),
  subject: z.string(),
  body_md: z.string(),
  status: z.literal("queued"),
  requested_by: z.string(),
  queued_at: z.string().datetime(),
  thread_id: z.string().optional(),
});

/** Finance cost row appended to cowork/data/queues/finance.jsonl. */
export const FinanceCostEntry = z.object({
  id: z.string().uuid(),
  vendor: z.string(),
  amount: z.number(),
  currency: z.string().default("USD"),
  cadence: z.enum(["one-time", "monthly", "annual"]),
  date: z.string(),
  requested_by: z.literal("sales-coworker"),
  created_at: z.string().datetime(),
});

export type SalesTaskResultType = z.infer<typeof SalesTaskResult>;
export type SalesTaskErrorType = z.infer<typeof SalesTaskError>;
export type MailDraftType = z.infer<typeof MailDraft>;
export type FinanceCostEntryType = z.infer<typeof FinanceCostEntry>;
