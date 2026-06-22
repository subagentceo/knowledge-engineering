/**
 * Typed outcome contracts for all 5 cowork/ domain agents.
 * Each contract defines the Zod schema for a passing task result.
 * The test runner grades agent output against these schemas atomically.
 *
 * @cite cowork/agents/manifest.json
 * @cite cowork/mcp/e2m-mcp/server.ts         (Envelope, EvaluatorBlock)
 * @cite cowork/templates/task-state-machine.ts (DurableTask, TaskState)
 * @cite https://www.agent-native.com/docs/template-mail (draft-queue pattern)
 */

import { z } from "zod";

// ── Shared primitives ─────────────────────────────────────────────────────────

export const TaskStateEnum = z.enum(["pending", "in_progress", "blocked", "completed", "failed"]);
export const DomainEnum    = z.enum(["design", "engineering", "product-management", "data", "sales", "finance"]);

export const EvaluatorBlock = z.object({
  pass_if: z.array(z.string()).min(1),
  fail_if: z.array(z.string()).min(1),
});

/** Every agent turn must emit exactly this shape as its terminal output. */
export const AgentOutcome = z.object({
  agent_id:         z.string(),
  task_id:          z.string().uuid(),
  domain:           DomainEnum,
  verdict:          z.enum(["pass", "fail", "blocked"]),
  score:            z.string().regex(/^\d+\/\d+$/),       // e.g. "2/2"
  state_transition: z.object({
    from:  TaskStateEnum,
    to:    TaskStateEnum,
    event: z.enum(["claim", "complete", "block", "fail"]),
  }),
  result:           z.record(z.string(), z.unknown()).optional(),
  error:            z.string().optional(),
  next_task:        z.object({               // only when verdict != pass
    queue:    DomainEnum,
    subject:  z.string().max(80),
    evaluator: EvaluatorBlock,
  }).optional(),
  evaluated_at:     z.string(),
});
export type AgentOutcome = z.infer<typeof AgentOutcome>;

// ── Domain-specific result contracts ─────────────────────────────────────────

/** product-management-coworker: scheduled task registration */
export const PmScheduledTaskResult = z.object({
  task_id:  z.string().min(1),
  cron:     z.string().regex(/^[\d*]+ [\d*]+ [\d*]+ [\d*]+ [\d*]+$/),
  next_run: z.string().min(1),
});

/** product-management-coworker: envelope routing result */
export const PmRoutingResult = z.object({
  envelopes_dispatched: z.number().int().min(1),
  queues:               z.array(DomainEnum),
  mailbox_messages_sent: z.number().int().min(0),
});

/** design-agent: token audit result */
export const DesignTokenAuditResult = z.object({
  audited:     z.number().int().min(1),
  fixed:       z.number().int().min(0),
  drift_items: z.array(z.object({
    file:    z.string(),
    token:   z.string(),
    found:   z.string(),
    correct: z.string(),
  })),
  pass:        z.boolean(),               // true when drift_items.length === 0
});

/** design-agent: artifact creation result */
export const DesignArtifactResult = z.object({
  file:           z.string().regex(/\.html$/),
  token_compliant: z.boolean(),
  sections:       z.array(z.string()).min(1),
});

/** engineering-agent: file write result */
export const EngineeringFileResult = z.object({
  files:           z.array(z.string()).min(1),
  compile_check:   z.enum(["pass", "skip", "fail"]),
  lint_check:      z.enum(["pass", "skip", "fail"]),
  api_key_present: z.literal(false),       // HARD: must be false — never ANTHROPIC_API_KEY
});

/** data-agent: SQL seed result */
export const DataSeedResult = z.object({
  table:      z.string().regex(/^dw\./),
  row_count:  z.number().int().min(1),
  file:       z.string().regex(/\.sql$/),
  verified:   z.boolean(),                // true when COUNT(*) matches expected
});

/** data-agent: YAML DDL result */
export const DataDdlResult = z.object({
  file:        z.string().regex(/\.yaml$/),
  table_kind:  z.enum(["fact", "dimension"]),
  scd_type:    z.number().int().min(0).max(2),
  grain:       z.string().min(1),
});

/** sales-agent: mail draft result */
export const SalesDraftResult = z.object({
  draft_id:       z.string().uuid(),
  to:             z.string().email(),
  subject:        z.string().min(1),
  status:         z.literal("queued"),    // NEVER "sent" without operator approval
  queued_at:      z.string(),
  file:           z.literal("cowork/apps/mail/queued_drafts.jsonl"),
});

/** sales-agent: finance cost tracking result */
export const FinanceCostResult = z.object({
  vendor:    z.string().min(1),
  amount:    z.number().positive(),
  currency:  z.string().length(3),        // ISO 4217
  date:      z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category:  z.enum(["infrastructure", "api", "tooling", "outreach", "other"]),
  file:      z.literal("cowork/data/queues/finance.jsonl"),
});

// ── Atomic pass/fail evaluator ────────────────────────────────────────────────

/**
 * Grade an agent outcome against its evaluator block.
 * Returns { pass: boolean, failures: string[] }.
 * Exits atomically — any single fail_if match = overall failure.
 *
 * @cite cowork/templates/task-state-machine.ts (evaluator.pass_if pattern)
 */
export function evaluateOutcome(
  outcome: AgentOutcome,
  passIf:  string[],
  failIf:  string[],
  resultJson: string,
): { pass: boolean; failures: string[]; passes: string[] } {
  const failures: string[] = [];
  const passes:   string[] = [];

  // Check every fail_if condition against the result JSON
  for (const condition of failIf) {
    const keywords = condition.toLowerCase().split(/\s+/);
    const resultLower = resultJson.toLowerCase();
    // Simple keyword presence check — agents must NOT produce these
    if (keywords.some(kw => kw.length > 3 && resultLower.includes(kw))) {
      failures.push(`FAIL: fail_if matched — "${condition}"`);
    }
  }

  // Check every pass_if condition
  for (const condition of passIf) {
    const resultLower = resultJson.toLowerCase();
    const keywords = condition.toLowerCase().replace(/['"]/g, "").split(/\s+/);
    // Heuristic: all non-stop-words must appear in result
    const stopWords = new Set(["and", "or", "the", "a", "is", "in", "to", "for"]);
    const meaningful = keywords.filter(k => k.length > 2 && !stopWords.has(k));
    if (meaningful.every(kw => resultLower.includes(kw))) {
      passes.push(`PASS: "${condition}"`);
    } else {
      failures.push(`FAIL: pass_if not met — "${condition}"`);
    }
  }

  return { pass: failures.length === 0, failures, passes };
}
