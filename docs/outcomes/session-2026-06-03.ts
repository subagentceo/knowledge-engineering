/**
 * session-2026-06-03.ts — outcome records for the 2026-06-03 loop tick.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 * @cite docs/orchestration/coworker-registry.ts
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
    id: "O1",
    title: "Phase 6.B-B closeout — rubrics/phase-6.md C3 partial DONE + pending.md refreshed",
    status: "achieved",
    category: "infra",
    evidence: [
      "rubrics/phase-6.md",
      "docs/pending.md",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md",
      "seeds/prompts/subagent-verifier.md",
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
    ],
  },
  {
    id: "O2",
    title: "Session outcome registry created for 2026-06-03",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/outcomes/session-2026-06-03.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "O3",
    title: "Heartbeat last-tick updated — 2026-06-03T00 tick recorded",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
    ],
  },
];

for (const outcome of outcomes) {
  SessionOutcomeSchema.parse(outcome);
}
