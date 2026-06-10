/**
 * a2a task envelopes (B25) — typed I/O for orchestrator ⇄ worktree agents.
 *
 * Every dispatched agent receives a TaskEnvelope and reports a TaskResult
 * (as its final message AND as a repo-mail body under a ```task-result
 * fence), so multi-agent runs stay machine-checkable end to end. Mirrors
 * the a2a message/task split (src/a2a/) at the orchestration layer.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite https://github.com/a2aproject/a2a-js
 */

import { z } from "zod";

export const TaskEnvelope = z.object({
  envelope: z.literal("task/v1"),
  batch_id: z.string().regex(/^B\d+$/),
  jira_key: z.string().regex(/^[A-Z]+-\d+$/).optional(),
  title: z.string().min(1),
  worktree: z.literal(true),
  instructions: z.string().min(1),
  acceptance: z.array(z.string().min(1)).min(1), // rubric criteria, testable
  report_to: z.object({
    mail_agent: z.string().min(1), // recipient for the TaskResult mail
    thread_id: z.string().min(1),
  }),
});
export type TaskEnvelope = z.infer<typeof TaskEnvelope>;

export const TaskResult = z.object({
  envelope: z.literal("task-result/v1"),
  batch_id: z.string().regex(/^B\d+$/),
  status: z.enum(["done", "blocked", "failed"]),
  branch: z.string().min(1),
  commit: z.string().regex(/^[0-9a-f]{7,40}$/).optional(),
  acceptance_evidence: z.array(z.string().min(1)).min(1),
  notes: z.string().optional(),
});
export type TaskResult = z.infer<typeof TaskResult>;

const RESULT_FENCE = /```task-result\n([\s\S]*?)\n```/;

/** Extract + validate a TaskResult from an agent's final message / mail body. */
export function parseTaskResult(text: string): TaskResult {
  const m = text.match(RESULT_FENCE);
  if (m?.[1] === undefined) throw new Error("agent-envelope: no task-result fence in report");
  return TaskResult.parse(JSON.parse(m[1]));
}
