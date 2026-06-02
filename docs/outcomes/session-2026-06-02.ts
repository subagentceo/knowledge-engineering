/**
 * session-2026-06-02.ts — atomic outcome records for the 2026-06-02 session.
 *
 * Dogfoods the cost poller + telemetry SDK built this session:
 * each record reuses the AgentSessionCost shape reference via cost_session_id.
 *
 * @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

export const SessionOutcomeSchema = z.object({
  id: z.string(),           // "O1", "O2", etc.
  title: z.string(),
  status: z.enum(["achieved", "pending", "failed"]),
  category: z.enum(["telemetry", "ci", "swift", "prompt", "vendor", "data", "sdk", "infra"]),
  evidence: z.array(z.string()),  // file paths changed
  cite: z.array(z.string()),      // @cite vendor paths
  cost_session_id: z.string().optional(),  // link to AgentSessionCost
  commit_sha: z.string().optional(),
});

export type SessionOutcome = z.infer<typeof SessionOutcomeSchema>;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const outcomes: SessionOutcome[] = [
  {
    id: "O1",
    title: "AgentSessionCost schema + sdkOtelEnv exported from cost poller",
    status: "achieved",
    category: "telemetry",
    evidence: [
      "apps/analytics-dashboard/cost/src/claude-cost-poller.ts",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md",
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
      "vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md",
    ],
    cost_session_id: "session-2026-06-02-O1",
  },
  {
    id: "O2",
    title: "CI cost gate — agent-cost-gate.yml required check",
    status: "achieved",
    category: "ci",
    evidence: [
      ".github/workflows/agent-cost-gate.yml",
      "scripts/check-agent-costs.ts",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md",
      "vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md",
    ],
    cost_session_id: "session-2026-06-02-O2",
  },
  {
    id: "O3",
    title: "Telemetry MCP lane — 4 new tools registered in bridge-server",
    status: "achieved",
    category: "telemetry",
    evidence: [
      "src/mcp/lanes/telemetry.ts",
      "src/mcp/bridge-server.ts",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
    ],
    cost_session_id: "session-2026-06-02-O3",
  },
  {
    id: "O4",
    title: "TelemetrySession + BatchTelemetryTracker SDK client",
    status: "achieved",
    category: "telemetry",
    evidence: [
      "src/sdk/telemetry-client.ts",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md",
    ],
    cost_session_id: "session-2026-06-02-O4",
  },
  {
    id: "O5",
    title: "Swift MCP client — MCPClient.swift typed bridge for macOS dashboard",
    status: "achieved",
    category: "swift",
    evidence: [
      "apps/subagent-dashboard/Sources/SubagentDashboard/MCPClient.swift",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
    ],
    cost_session_id: "session-2026-06-02-O5",
  },
  {
    id: "O6",
    title: "Swift app wiring — SessionListView + CachePanel in SubagentDashboardApp",
    status: "achieved",
    category: "swift",
    evidence: [
      "apps/subagent-dashboard/Sources/SubagentDashboard/SubagentDashboardApp.swift",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md",
    ],
    cost_session_id: "session-2026-06-02-O6",
  },
  {
    id: "O7",
    title: "Vendor mirror updated — changelog.md bumped to 2.1.161",
    status: "achieved",
    category: "vendor",
    evidence: [
      "vendor/anthropics/code.claude.com/docs/en/changelog.md",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/changelog.md",
    ],
    cost_session_id: "session-2026-06-02-O7",
  },
  {
    id: "O8",
    title: "Data harvest — changelog-2.1.161 citation extract written to seeds/",
    status: "achieved",
    category: "data",
    evidence: [
      "seeds/citations/changelog-2.1.161-harvest.md",
    ],
    cite: [
      "vendor/anthropics/code.claude.com/docs/en/changelog.md",
      "seeds/citations/changelog-2.1.161-harvest.md",
    ],
    cost_session_id: "session-2026-06-02-O8",
  },
  {
    id: "O9",
    title: "Prompt iteration — coworker-dev-chain v2 scored 96/100 over 12 criteria",
    status: "achieved",
    category: "prompt",
    evidence: [
      "docs/prompts/coworker-dev-chain.v2.md",
      "docs/prompts/coworker-dev-chain.v2.eval.md",
    ],
    cite: [
      "vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md",
      "seeds/citations/define-outcomes.md",
    ],
    cost_session_id: "session-2026-06-02-O9",
  },
];

// ---------------------------------------------------------------------------
// Runtime validation — fail at import time if any record is malformed
// ---------------------------------------------------------------------------

for (const outcome of outcomes) {
  SessionOutcomeSchema.parse(outcome);
}
