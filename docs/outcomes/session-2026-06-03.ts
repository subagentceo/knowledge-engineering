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
  {
    id: "2026-06-03-O2",
    title: "platform-engineering plugin OPE1 test — closes #175 (v0.4.0-OPE1)",
    status: "achieved",
    category: "infra",
    evidence: [
      "src/lib/platform-engineering-plugin.test.ts",
      "plugins/platform-engineering/.claude-plugin/plugin.json",
      "plugins/platform-engineering/.mcp.json",
      "plugins/platform-engineering/skills/turbopuffer-embeddings/SKILL.md",
      "src/lib/turbopuffer-alloydb-bridge.ts",
      "src/lib/voyage-client.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "76e16bc",
  },
];

for (const o of outcomes) {
  SessionOutcomeSchema.parse(o);
}
