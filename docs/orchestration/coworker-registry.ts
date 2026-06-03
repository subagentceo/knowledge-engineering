/**
 * coworker-registry.ts — canonical registry of MANAGED_SUBAGENTS and
 * ConnectorDescriptors for the knowledge-engineering autonomous loop.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import { z } from "zod";

// ── managed subagent registry (CF Worker scaffolds) ───────────────────────────

export const SubagentStatusSchema = z.enum([
  "planned",
  "scaffolded",
  "active",
  "deprecated",
]);

export type SubagentStatus = z.infer<typeof SubagentStatusSchema>;

export const ManagedSubagentSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  cfWorkerName: z.string(),
  sourcePath: z.string(),
  category: z.enum(["swift", "dev", "review", "git", "security", "loop"]),
  semver: z.string(),
  description: z.string(),
  status: SubagentStatusSchema,
});

export type ManagedSubagent = z.infer<typeof ManagedSubagentSchema>;

export const MANAGED_SUBAGENTS: ManagedSubagent[] = [
  {
    id: "swift-lsp",
    displayName: "Swift LSP Agent",
    cfWorkerName: "ke-subagent-swift-lsp",
    sourcePath: "src/subagents/swift-lsp/index.ts",
    category: "swift",
    semver: "0.4.0",
    description:
      "Provides Swift language-server protocol support and macOS SDK intelligence for the subagent dashboard build loop.",
    status: "scaffolded",
  },
  {
    id: "feature-dev",
    displayName: "Feature Dev Agent",
    cfWorkerName: "ke-subagent-feature-dev",
    sourcePath: "src/subagents/feature-dev/index.ts",
    category: "dev",
    semver: "0.4.0",
    description:
      "Implements feature-branch changes end-to-end: reads the pending queue, writes code, opens a PR, and emits an outcome record.",
    status: "scaffolded",
  },
  {
    id: "pr-review",
    displayName: "PR Review Agent",
    cfWorkerName: "ke-subagent-pr-review",
    sourcePath: "src/subagents/pr-review/index.ts",
    category: "review",
    semver: "0.4.0",
    description:
      "Reviews open PRs via claude-code-review integration, posts inline comments, and approves or requests changes.",
    status: "scaffolded",
  },
  {
    id: "commit-commands",
    displayName: "Commit Commands Agent",
    cfWorkerName: "ke-subagent-commit-commands",
    sourcePath: "src/subagents/commit-commands/index.ts",
    category: "git",
    semver: "0.4.0",
    description:
      "Enforces commit conventions (O<N> suffix, Conventional Commits) and auto-fixes messages that fail the convention test.",
    status: "scaffolded",
  },
  {
    id: "security-guidance",
    displayName: "Security Guidance Agent",
    cfWorkerName: "ke-subagent-security-guidance",
    sourcePath: "src/subagents/security-guidance/index.ts",
    category: "security",
    semver: "0.4.0",
    description:
      "Scans new dependencies via OSV, flags CVEs, and proposes remediations as PR comments before merge.",
    status: "scaffolded",
  },
  {
    id: "ralph-loop",
    displayName: "Ralph Loop Agent",
    cfWorkerName: "ke-subagent-ralph-loop",
    sourcePath: "src/subagents/ralph-loop/index.ts",
    category: "loop",
    semver: "0.4.0",
    description:
      "The outermost autonomous orchestration loop: reads last-tick.md, dispatches sub-agents via the mailbox, and writes the next heartbeat tick.",
    status: "scaffolded",
  },
];

for (const subagent of MANAGED_SUBAGENTS) {
  ManagedSubagentSchema.parse(subagent);
}

// ── connector descriptor registry (MCP lanes) ────────────────────────────────

export type ConnectorCategory =
  | "engineering"
  | "blog"
  | "support"
  | "llms"
  | "vendor"
  | "project"
  | "search"
  | "telemetry"
  | "mailbox"
  | "comms"
  | "knowledge-graph";

export type ConsensusPolicy =
  | { type: "single"; quorum: 1 }
  | { type: "majority"; quorum: number }
  | { type: "unanimous"; quorum: number };

export interface ConnectorDescriptor {
  id: string;
  displayName: string;
  category: ConnectorCategory;
  consensus: ConsensusPolicy;
  sourcePath: string;
}

export const connectorRegistry: ConnectorDescriptor[] = [
  {
    id: "anthropic-engineering-lane",
    displayName: "Anthropic Engineering Docs",
    category: "engineering",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/anthropic-engineering.ts",
  },
  {
    id: "claude-blog-lane",
    displayName: "Claude Blog",
    category: "blog",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/claude-blog.ts",
  },
  {
    id: "support-claude-lane",
    displayName: "Support Claude",
    category: "support",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/support-claude.ts",
  },
  {
    id: "llms-txt-lane",
    displayName: "LLMs.txt Namespaces",
    category: "llms",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/llms-txt.ts",
  },
  {
    id: "vendor-lane",
    displayName: "Vendor Doc Mirrors",
    category: "vendor",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/vendor.ts",
  },
  {
    id: "project-lane",
    displayName: "Project Files",
    category: "project",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/project.ts",
  },
  {
    id: "search-tools-lane",
    displayName: "Search Tools",
    category: "search",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/search-tools.ts",
  },
  {
    id: "telemetry-lane",
    displayName: "Telemetry",
    category: "telemetry",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/telemetry.ts",
  },
  {
    id: "mailbox-lane",
    displayName: "Agent Mailbox",
    category: "mailbox",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/mailbox.ts",
  },
  {
    id: "knowledge-graph-lane",
    displayName: "Knowledge Graph (D1)",
    category: "knowledge-graph",
    consensus: { type: "majority", quorum: 2 },
    sourcePath: "src/mcp/lanes/knowledge-graph.ts",
  },
  {
    id: "slack-lane",
    displayName: "Slack Comms Lane",
    category: "comms",
    consensus: { type: "single", quorum: 1 },
    sourcePath: "src/mcp/lanes/comms.ts",
  },
];

export function getConnector(id: string): ConnectorDescriptor | undefined {
  return connectorRegistry.find((c) => c.id === id);
}

export function connectorsByCategory(category: ConnectorCategory): ConnectorDescriptor[] {
  return connectorRegistry.filter((c) => c.category === category);
}
