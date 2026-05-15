/**
 * PR webhook event handler — classifier for `<github-webhook-activity>`
 * payloads delivered to long-running orchestrator sessions.
 *
 * Phase I (mid-session dogfood iteration). Codifies what the
 * orchestrator (this Claude session) has been doing turn-by-turn
 * manually: when a webhook comment arrives in chat as a
 * `<untrusted_external_data source="pr_comment">…</…>` block, decide
 * whether the event is actionable.
 *
 * Pre-this module, every webhook tick produced the same
 * boilerplate reply ("Recurring G14 vendor_pages drift; no action").
 * Centralising the classifier means: future orchestrators (or a
 * routine) get a typed decision instead of re-reading the payload
 * each time.
 *
 * The "listen to PR activity" primitive lives in
 * `mcp__github__subscribe_pr_activity`. This module is the consumer
 * side — once a session is subscribed, the events arrive as system
 * messages and this classifier produces the next-action decision.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite vendor/anthropics/code.claude.com/docs/en/whats-new/2026-w15.md
 * @cite rubrics/phase-I.md
 *
 * Pure functions; no I/O. The session-level subscription + the
 * actual reply machinery live in the orchestrator turn handler.
 */
import { z } from "zod";

export const PrEventKindSchema = z.enum([
  "neon-branch-ready",
  "schema-diff-drift",
  "schema-diff-clean",
  "ci-status",
  "review-comment",
  "merged",
  "unknown",
]);
export type PrEventKind = z.infer<typeof PrEventKindSchema>;

export const PrActionSchema = z.enum([
  // No reply needed; orchestrator should yield silently.
  "skip",
  // Reply with an explanation (e.g. "this is the known G14 drift").
  "explain",
  // Open a fix branch / commit / push.
  "fix",
  // Manual investigation needed — surface to operator.
  "escalate",
]);
export type PrAction = z.infer<typeof PrActionSchema>;

export interface PrEvent {
  kind: PrEventKind;
  prNumber: number | null;
  /** True iff the upstream is github-actions[bot] / claude-bot / similar automation. */
  fromBot: boolean;
  /** Free-form extracted summary the classifier surfaces to the caller. */
  summary: string;
  /** Raw input retained for debugging + downstream tools. */
  raw: string;
}

export interface PrDecision {
  action: PrAction;
  /** One-line rationale fit for an end-of-turn status report. */
  reason: string;
}

/**
 * Parse a webhook activity block as it arrives in the chat
 * transcript. Tolerates the wrapper `<github-webhook-activity>` tag
 * and the `<untrusted_external_data>` nested block.
 *
 * Returns `kind: "unknown"` rather than throwing — orchestrator
 * loops should never crash on a webhook shape they haven't seen.
 */
export function parseWebhook(text: string): PrEvent {
  const raw = text;
  const prMatch = text.match(/PR:\s*[^\s/]+\/[^\s#]+#(\d+)/);
  const prNumber = prMatch?.[1] ? Number(prMatch[1]) : null;
  const authorMatch = text.match(/Author:\s*([^\s\n]+)/);
  const author = authorMatch?.[1] ?? "";
  const fromBot = /\[bot\]$|^github-actions|^claude-bot/i.test(author);

  if (/has been merged/i.test(text) || /Outcome:\s*merged/i.test(text)) {
    return { kind: "merged", prNumber, fromBot, summary: `PR #${prNumber} merged`, raw };
  }
  if (/Neon branch ready/i.test(text)) {
    return {
      kind: "neon-branch-ready",
      prNumber,
      fromBot,
      summary: `Neon preview branch ready for PR #${prNumber}`,
      raw,
    };
  }
  if (/Neon Schema Diff/i.test(text) || /schema diff/i.test(text)) {
    const driftsVendorPages = /CREATE TABLE public\.vendor_pages/.test(text);
    return {
      kind: driftsVendorPages ? "schema-diff-drift" : "schema-diff-clean",
      prNumber,
      fromBot,
      summary: driftsVendorPages
        ? `vendor_pages drift (tracked under G14)`
        : `schema diff clean`,
      raw,
    };
  }
  if (/CI failure|workflow_run|run_id/i.test(text)) {
    return { kind: "ci-status", prNumber, fromBot, summary: `CI status update`, raw };
  }
  // Default — a non-bot comment with body content is treated as a review comment
  // worth attention. Otherwise we mark it unknown.
  if (!fromBot && prNumber !== null) {
    return {
      kind: "review-comment",
      prNumber,
      fromBot,
      summary: `Review comment from ${author}`,
      raw,
    };
  }
  return { kind: "unknown", prNumber, fromBot, summary: `unrecognized webhook`, raw };
}

/**
 * Decide what to do with a parsed event. Pairs with `parseWebhook`
 * so callers can do `decide(parseWebhook(text))`. Encodes the
 * informational vs actionable boundary the orchestrator has been
 * drawing manually turn after turn.
 *
 * `O-G14` references the long-standing vendor_pages schema-diff drift
 * tracked as a separate follow-up; that drift fires on every PR but
 * is not introduced by any PR currently in flight.
 */
export function decide(event: PrEvent): PrDecision {
  switch (event.kind) {
    case "merged":
      return { action: "skip", reason: "PR merged; session auto-unsubscribed" };
    case "neon-branch-ready":
      return { action: "skip", reason: "informational; Neon preview ready" };
    case "schema-diff-drift":
      return { action: "skip", reason: "recurring vendor_pages drift (tracked under G14)" };
    case "schema-diff-clean":
      return { action: "skip", reason: "schema clean" };
    case "ci-status":
      return { action: "fix", reason: "CI signal received; orchestrator should investigate logs + fix" };
    case "review-comment":
      return {
        action: "explain",
        reason: `review comment from non-bot; orchestrator should reply or fix`,
      };
    case "unknown":
      return {
        action: "escalate",
        reason: "unrecognized webhook shape; orchestrator should surface to operator",
      };
  }
}
