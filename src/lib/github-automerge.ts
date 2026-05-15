/**
 * Typed automerge helper — Phase I, outcome O-I2.
 *
 * The chassis applies the `automerge` label and enables auto-merge
 * through five different shells today (inline `gh pr create --label`,
 * pr-babysitter env-var default, refresh-vendors templates, heartbeat
 * SKILL.md prescription, this orchestrator's per-PR
 * `mcp__github__issue_write` call). Per Phase I research agent C,
 * there is no helper abstraction over either operation today.
 *
 * This module is the missing abstraction. It is **pure** — no MCP
 * calls, no fetches, no shell. The caller injects an `McpExecutor`
 * that wraps the actual MCP tools; consumers (orchestrator turns,
 * routines, tests) provide their own executor. Mocking is one line
 * of code instead of a process spawn.
 *
 * The "ready to merge" decision encodes the gate the human reviewer
 * (or the orchestrator) was making manually:
 *   - all required check runs report `success` (skipped is fine if
 *     the workflow gates on a missing secret)
 *   - no required check is in_progress or queued
 *   - no check has conclusion `failure` / `cancelled` / `timed_out`
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 * @cite vendor/anthropics/code.claude.com/docs/en/whats-new/2026-w15.md (autofix-pr engine)
 * @cite rubrics/phase-I.md
 */
import { z } from "zod";

export const MergeMethodSchema = z.enum(["MERGE", "SQUASH", "REBASE"]);
export type MergeMethod = z.infer<typeof MergeMethodSchema>;

export const CheckConclusionSchema = z.enum([
  "success",
  "failure",
  "cancelled",
  "timed_out",
  "skipped",
  "neutral",
  "action_required",
  "stale",
]);
export type CheckConclusion = z.infer<typeof CheckConclusionSchema>;

export const CheckStatusSchema = z.enum([
  "queued",
  "in_progress",
  "completed",
  "waiting",
  "requested",
  "pending",
]);
export type CheckStatus = z.infer<typeof CheckStatusSchema>;

export const CheckRunSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  status: CheckStatusSchema,
  conclusion: CheckConclusionSchema.nullable().optional(),
});
export type CheckRun = z.infer<typeof CheckRunSchema>;

export const AutomergeReadinessSchema = z.object({
  ready: z.boolean(),
  reason: z.string(),
  failing: z.array(z.string()),
  pending: z.array(z.string()),
});
export type AutomergeReadiness = z.infer<typeof AutomergeReadinessSchema>;

/**
 * Caller-injected MCP shape. Real callers wire to:
 *   - mcp__github__enable_pr_auto_merge
 *   - mcp__github__issue_write (labels: [...])
 *   - mcp__github__pull_request_read (method: get_check_runs)
 * Tests inject in-memory mocks.
 */
export interface McpExecutor {
  enableAutoMerge(prNumber: number, mergeMethod: MergeMethod): Promise<void>;
  applyLabels(prNumber: number, labels: string[]): Promise<void>;
  getCheckRuns(prNumber: number): Promise<CheckRun[]>;
}

/**
 * Inspect check runs + decide whether the PR is ready to auto-merge.
 * Pure function over its input — no executor needed for the decision
 * itself.
 */
export function classifyChecks(runs: ReadonlyArray<CheckRun>): AutomergeReadiness {
  if (runs.length === 0) {
    return { ready: false, reason: "no check runs reported", failing: [], pending: [] };
  }
  const failing: string[] = [];
  const pending: string[] = [];
  for (const r of runs) {
    if (r.status !== "completed") {
      pending.push(r.name);
      continue;
    }
    // status === completed
    const c = r.conclusion ?? null;
    if (c === "failure" || c === "cancelled" || c === "timed_out" || c === "action_required") {
      failing.push(r.name);
    }
    // skipped + neutral + success are all OK for merge
  }
  if (failing.length > 0) {
    return {
      ready: false,
      reason: `${failing.length} check(s) failing`,
      failing,
      pending,
    };
  }
  if (pending.length > 0) {
    return {
      ready: false,
      reason: `${pending.length} check(s) still pending`,
      failing,
      pending,
    };
  }
  return { ready: true, reason: "all checks green", failing, pending };
}

/**
 * High-level: apply the automerge label and enable auto-merge on
 * the PR if all checks are green. Returns a discriminated result so
 * callers can log/act on the outcome.
 */
export async function autoMergeIfGreen(
  executor: McpExecutor,
  prNumber: number,
  options?: { mergeMethod?: MergeMethod; label?: string },
): Promise<
  | { action: "merged" }
  | { action: "queued"; reason: string }
  | { action: "skipped"; reason: string; failing: string[]; pending: string[] }
> {
  const method: MergeMethod = options?.mergeMethod ?? "SQUASH";
  const label = options?.label ?? "automerge";
  const runs = await executor.getCheckRuns(prNumber);
  const readiness = classifyChecks(runs);
  if (!readiness.ready) {
    return {
      action: "skipped",
      reason: readiness.reason,
      failing: readiness.failing,
      pending: readiness.pending,
    };
  }
  // Apply the label first so the auto-merge workflow sees it.
  await executor.applyLabels(prNumber, [label]);
  await executor.enableAutoMerge(prNumber, method);
  return { action: "queued", reason: "auto-merge enabled; awaiting branch protection" };
}
