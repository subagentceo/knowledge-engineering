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
 * Tick T5 (tick id: 2026-06-04-T5).
 *   - 2026-06-04-O7: OMA OAuth patch + watchman audit_container.py (PR #378)
 *   - 2026-06-04-O8: Firehose triage — 89 tasks into Phase 0-3 lanes (PR #380, UNRESOLVED-03)
 *   - 2026-06-04-O9: Plan-as-code ProjectPlan schema (PR #379, UNRESOLVED-04)
 *   - 2026-06-04-O10: Neon removal + polyrepo ADRs (PR #377 merged)
 *   - 2026-06-04-O11: Heartbeat tick T5 record
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
  {
    id: "2026-06-04-O5",
    title: "Phase 0 KG ingestion pipeline — SQLite schema + harvest-admonitions + ingest-vendor-pages + verify-kg",
    status: "achieved",
    category: "data",
    evidence: [
      "infra/sqlite/kg-session-schema.sql",
      "scripts/harvest-admonitions.ts",
      "scripts/ingest-vendor-pages.ts",
      "scripts/verify-kg.ts",
      "https://github.com/subagentceo/knowledge-engineering/pull/364",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "e41bb7d",
  },
  {
    id: "2026-06-04-O6",
    title: "OAUTO18 loop fix — stop rescue-blocked-prs infinite loop when required checks present",
    status: "achieved",
    category: "ci",
    evidence: [
      ".github/workflows/auto-rebase.yml",
      "https://github.com/subagentceo/knowledge-engineering/pull/372",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "7a9c6b2",
  },
  {
    id: "2026-06-04-O7",
    title: "OMA OAuth patch + watchman audit_container.py — t12-2 ANTHROPIC_API_KEY→CLAUDE_CODE_OAUTH_TOKEN",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/open-managed-agents/oauth-patch.md",
      "scripts/audit_container.py",
      "https://github.com/subagentceo/knowledge-engineering/pull/378",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-04-O8",
    title: "Firehose triage — 87 tasks triaged into Phase 0-3 lanes (UNRESOLVED-03)",
    status: "achieved",
    category: "data",
    evidence: [
      "docs/firehose/triage-2026-06-04.md",
      "docs/pending.md",
      "https://github.com/subagentceo/knowledge-engineering/pull/380",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-04-O9",
    title: "Plan-as-code ProjectPlan Zod schema + SQLite DDL (UNRESOLVED-04)",
    status: "achieved",
    category: "infra",
    evidence: [
      "src/lib/schemas/project-plan.ts",
      "src/lib/schemas/project-plan.test.ts",
      "infra/sqlite/project-plans-schema.sql",
      "https://github.com/subagentceo/knowledge-engineering/pull/379",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-04-O10",
    title: "Neon removal + polyrepo ADRs — AlloyDB Omni replacement (PR #377 merged)",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/decisions/2026-06-04-neon-removed-alloydb-omni-replacement.md",
      "docs/decisions/2026-06-04-polyrepo-engineering-adoption.md",
      "https://github.com/subagentceo/knowledge-engineering/pull/377",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    commit_sha: "847c224",
  },
  {
    id: "2026-06-04-O11",
    title: "Heartbeat tick T5 — O7-O10 registered, PRs #378/#379/#380 in CI",
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
    id: "2026-06-04-O12",
    title: "UNRESOLVED-05 Phase 1-8 TS MCP lanes — graphql-lane (kg_graphql_query) + code-mode-lane (code_mode_batch) + GraphQL SDL",
    status: "achieved",
    category: "infra",
    evidence: [
      "https://github.com/subagentceo/knowledge-engineering/pull/383",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/programmatic-tool-calling.md",
    ],
    commit_sha: "2c39383",
  },
  {
    id: "2026-06-04-O13",
    title: "Heartbeat tick T6 — OAUTO17 drain (#370/#378/#379/#380/#382) + O12 registered",
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
    id: "2026-06-04-O16",
    title: "@anthropic-ai npm catalog v2 — 12 packages + dxt/napi docs (t14-1, t14-3)",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/anthropic-ai-npm/packages.json",
      "vendor/anthropic-ai-npm/napi-packages.md",
      "vendor/anthropic-ai-npm/dxt.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
    commit_sha: "54d343b",
  },
  {
    id: "2026-06-04-O17",
    title: "Heartbeat tick T8 — OAUTO17 drain (#383 merged, #387/#379/#370 rebasing; #389 dirty) + O16 npm catalog dispatched",
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
