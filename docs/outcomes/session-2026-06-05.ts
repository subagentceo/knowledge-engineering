/**
 * session-2026-06-05.ts — loop tick outcomes for the 2026-06-05 session.
 *
 * Tick T1 (tick id: 2026-06-05-T1).
 *   - 2026-06-05-O1: PR #370 rescue — auto-merge enabled (all checks green, was blocked)
 *   - 2026-06-05-O2: t12-1 — OMA vendor docs (README + architecture + api-reference + governance-schema)
 *   - 2026-06-05-O3: t10-2 + t11-5 — domain-product-map + agent-surface-gap architecture docs
 *   - 2026-06-05-O4: Heartbeat tick 2026-06-05-T1
 *
 * Tick T2 (tick id: 2026-06-05-T2).
 *   - 2026-06-05-O5: t14-5 — @modelcontextprotocol/hono MCP server scaffold (src/mcp-hono/server.ts)
 *   - 2026-06-05-O6: t13-4 — 300+ connectors catalog (vendor/connectors/catalog.json + README)
 *   - 2026-06-05-O7: Heartbeat tick 2026-06-05-T2
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
    id: "2026-06-05-O5",
    title: "t14-5 — src/mcp-hono/server.ts: Hono HTTP transport for MCP bridge (coworker-feature-dev)",
    status: "achieved",
    category: "sdk",
    evidence: [
      "src/mcp-hono/server.ts",
      "src/mcp-hono/server.test.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "29c67f3",
  },
  {
    id: "2026-06-05-O6",
    title: "t13-4 — 300+ connectors catalog: vendor/connectors/catalog.json + README (329 connectors, 25 categories)",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/connectors/catalog.json",
      "vendor/connectors/README.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "088fdb4",
  },
  {
    id: "2026-06-05-O7",
    title: "Heartbeat tick 2026-06-05-T2 — PRs #397/#370 rescued, t13-4 achieved (PR #400), t14-5 in_progress, t12-2 blocked",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },

  {
    id: "2026-06-05-O1",
    title: "PR #370 rescue — enabled auto-merge (all checks green, was blocked for >10h)",
    status: "achieved",
    category: "ci",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-05-O2",
    title: "t12-1 — OMA vendor docs: README + architecture + api-reference + governance-schema",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/open-managed-agents/README.md",
      "vendor/open-managed-agents/architecture.md",
      "vendor/open-managed-agents/api-reference.md",
      "vendor/open-managed-agents/governance-schema.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "91d2f0a",
  },
  {
    id: "2026-06-05-O3",
    title: "t10-2 + t11-5 — docs/architecture: domain-product-map + agent-surface-gap",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/architecture/domain-product-map.md",
      "docs/architecture/agent-surface-gap.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "f074114",
  },
  {
    id: "2026-06-05-O4",
    title: "Heartbeat tick 2026-06-05-T1 — PR #370 rescued, O2+O3 dispatched, outcomes registered",
    status: "achieved",
    category: "infra",
    evidence: [
      "seeds/memory/heartbeat/last-tick.md",
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
  },
];

for (const o of outcomes) {
  SessionOutcomeSchema.parse(o);
}
