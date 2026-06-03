/**
 * session-2026-06-03.ts — loop tick outcomes for the 2026-06-03 session.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 * @cite vendor/claude-sitemap/blog/message-batches-api.md
 */

import { z } from "zod";

export const SessionOutcomeSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["achieved", "pending", "failed"]),
  category: z.enum(["telemetry", "ci", "swift", "prompt", "vendor", "data", "sdk", "infra"]),
  evidence: z.array(z.string()),
  cite: z.array(z.string()),
  cost_session_id: z.string().optional(),
  commit_sha: z.string().optional(),
});

export type SessionOutcome = z.infer<typeof SessionOutcomeSchema>;

export const outcomes: SessionOutcome[] = [
  {
    id: "2026-06-03-O1",
    title: "Anthropic Batches API client — submitBatch/pollBatch/collectBatch (Phase 11.B, #42)",
    status: "achieved",
    category: "sdk",
    evidence: [
      "src/agent/batch.ts",
      "src/agent/batch.test.ts",
      "package.json",
    ],
    cite: [
      "vendor/claude-sitemap/blog/message-batches-api.md",
      "vendor/anthropics/platform.claude.com/docs/en/manage-claude/rate-limits-api.md",
    ],
    commit_sha: "5af2ae6",
  },
];

for (const o of outcomes) {
  SessionOutcomeSchema.parse(o);
}
