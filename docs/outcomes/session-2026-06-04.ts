/**
 * session-2026-06-04.ts — loop tick outcomes for the 2026-06-04 session.
 *
 * Tick T9 (tick id: 2026-06-04-T1).
 *   - 2026-06-04-O1: V040_LOOP_TASKS registry cleanup (O5+O6 marked achieved)
 *   - 2026-06-04-O2: Session outcome file created + index.ts updated
 *   - 2026-06-04-O3: Heartbeat last-tick.md updated for tick T9
 *
 * Tick T10 (tick id: 2026-06-04-T2).
 *   - 2026-06-04-O4: Registry consistency fix — coworker-registry.ts O5+O6 status set to "achieved"
 *   - 2026-06-04-O3: Heartbeat updated (was pending from T9)
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
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
    id: "2026-06-04-O1",
    title: "V040_LOOP_TASKS registry cleanup — v0.5.0-O5 and v0.5.0-O6 marked achieved",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/orchestration/coworker-registry.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-04-O2",
    title: "Session outcome file registered — session-2026-06-04.ts + test + index.ts updated",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/outcomes/session-2026-06-04.ts",
      "docs/outcomes/session-2026-06-04.test.ts",
      "docs/outcomes/index.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-04-O3",
    title: "Heartbeat tick T10 — last-tick.md updated with T10 state and next actions",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
  {
    id: "2026-06-04-O4",
    title: "Registry consistency fix — coworker-registry.ts v0.5.0-O5+O6 set to achieved",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/orchestration/coworker-registry.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
];

for (const o of outcomes) {
  SessionOutcomeSchema.parse(o);
}
