/**
 * session-2026-06-03.ts — loop tick outcomes for the 2026-06-03 session.
 *
 * Two sub-sessions:
 *   1. v0.4.1 infrastructure landing — KG lane, mailbox adapter, comms lane,
 *      OMA1 ADR, subagent CF Worker scaffolds, Batches API client.
 *   2. Backlog drain + structural CI fix — OAUTO17 close/reopen rescue job
 *      in `.github/workflows/auto-rebase.yml` (PR #327) plus the 4 backlog
 *      merges and the alloydb test fix (#309).
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
  {
    id: "2026-06-03-O3",
    title: "OMA1 ADR — three-tier autonomous loop (CCR → Agent() → SubagentStop)",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/decisions/2026-06-03-multi-agent-infrastructure.md",
      "seeds/memory/heartbeat/last-tick.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/multi-agent.md",
    ],
    commit_sha: "PR-322",
  },
  {
    id: "2026-06-03-O4",
    title: "SQLite/D1 mailbox storage adapter — Node 20 createRequire workaround",
    status: "achieved",
    category: "infra",
    evidence: [
      "src/db/mailbox-store.ts",
      "src/db/mailbox-store.test.ts",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
    ],
    commit_sha: "PR-321",
  },
  {
    id: "2026-06-03-O5",
    title: "Slack comms MCP lane — 4 tools; bridge-server expected=43",
    status: "achieved",
    category: "infra",
    evidence: [
      "src/mcp/lanes/comms.ts",
      "src/mcp/bridge-server.ts",
      "scripts/verify.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
    ],
    commit_sha: "PR-323",
  },
  {
    id: "2026-06-03-O6",
    title: "Subagent CF Worker scaffolds — swift-lsp, feature-dev, pr-review, commit, security, ralph",
    status: "achieved",
    category: "swift",
    evidence: [
      "src/subagents/feature-dev/worker.ts",
      "src/subagents/pr-review/worker.ts",
      "src/subagents/commit-commands/worker.ts",
      "src/subagents/security-guidance/worker.ts",
      "src/subagents/ralph-loop/worker.ts",
      "infra/workers/subagents.toml",
      "docs/orchestration/coworker-registry.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
    ],
    commit_sha: "PR-324",
  },
  {
    id: "2026-06-03-O7",
    title: "Vendor mirror decomposition — claude.com product pages as tracked sources",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/claude-sitemap/product/claude-opus-4-8.md",
      "vendor/claude-sitemap/product/claude-security.md",
      "vendor/claude-sitemap/product/claude-skills.md",
      "vendor/claude-sitemap/product/cowork.md",
      "docs/reference/modelcontextprotocol-repos.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
    ],
    commit_sha: "PR-312",
  },
  {
    id: "2026-06-03-O8",
    title: "gitignore — screenshots/ + webpages/ scratch dirs untracked",
    status: "achieved",
    category: "infra",
    evidence: [
      ".gitignore",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
    ],
    commit_sha: "PR-306",
  },
  {
    id: "2026-06-03-O9",
    title: "Bash allowlist broadened — stop parallel-tool-call cancellation",
    status: "achieved",
    category: "ci",
    evidence: [
      ".claude/settings.json",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
    ],
    commit_sha: "PR-310",
  },
  {
    id: "2026-06-03-O10",
    title: "OAUTO17 — auto-rebase rescue job closes/reopens BLOCKED PRs missing branch-guard",
    status: "achieved",
    category: "ci",
    evidence: [
      ".github/workflows/auto-rebase.yml",
    ],
    cite: [
      "seeds/citations/github-actions-best-practices-2026-05-18.md",
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
    ],
    commit_sha: "PR-327",
  },
  {
    id: "2026-06-03-O11",
    title: "alloydb-branch test fix — assertThrows helper replaces bare assert.throws (PR #309)",
    status: "achieved",
    category: "ci",
    evidence: [
      "src/lib/turbopuffer-alloydb-bridge.test.ts",
    ],
    cite: [
      "seeds/citations/neon-branching.md",
    ],
    commit_sha: "PR-309",
  },
  {
    id: "2026-06-03-O12",
    title: "Structured prompt — 6 ci-loop lessons formatted for the autonomous agent loop",
    status: "achieved",
    category: "prompt",
    evidence: [
      "docs/prompts/loop-improvements-2026-06-03.md",
    ],
    cite: [
      ".claude/skills/structured-prompt-formatter/SKILL.md",
      "seeds/citations/programmatic-tool-calling.md",
      "seeds/citations/github-actions-best-practices-2026-05-18.md",
    ],
  },
  {
    id: "2026-06-03-O13",
    title: "Outcome registry — register O3-O13 covering v0.4.1 infra + backlog drain + OAUTO17",
    status: "achieved",
    category: "infra",
    evidence: [
      "docs/outcomes/session-2026-06-03.ts",
      "docs/outcomes/session-2026-06-03.test.ts",
      "docs/outcomes/index.ts",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
  },
  {
    id: "2026-06-03-O14",
    title: "T5 OAUTO17 drain — closed superseded #331; close+reopen+auto-merge on #340/#345/#311/#339",
    status: "achieved",
    category: "ci",
    evidence: [
      ".claude/mailbox/agent_orchestrator.jsonl",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/memory/heartbeat/last-tick.md",
    ],
  },
  {
    id: "2026-06-03-O15",
    title: "v0.5.0-O1 CCR routine config — src/lib/routines/loop-orchestrator-routine.ts + tests + setup script (PR #346)",
    status: "achieved",
    category: "infra",
    evidence: [
      "src/lib/routines/loop-orchestrator-routine.ts",
      "src/lib/routines/loop-orchestrator-routine.test.ts",
      "scripts/setup-loop-orchestrator.ts",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/routines.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
    commit_sha: "49835ca5",
  },
  {
    id: "2026-06-03-O16",
    title: "v0.5.0-O2 CCR routine config — ke-coworker-data 4h vendor-mirror refresh (PR #349 claude/v0.5.0-O2-coworker-data-ccr)",
    status: "achieved",
    category: "data",
    evidence: [
      "src/lib/routines/coworker-data-routine.ts",
      "src/lib/routines/coworker-data-routine.test.ts",
      "scripts/setup-coworker-data.ts",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/routines.md",
      "seeds/prompts/loop-orchestrator.md",
    ],
    commit_sha: "060c1fa4",
  },
];

for (const o of outcomes) {
  SessionOutcomeSchema.parse(o);
}
