/**
 * coworker-registry.ts — canonical registry of MANAGED_SUBAGENTS for the
 * knowledge-engineering autonomous loop.
 *
 * Each entry maps a subagent ID to its CF Worker deploy target, source path,
 * category, and lifecycle status. The loop reads this file to decide which
 * scaffolds are ready to fill in.
 *
 * @cite docs/PROJECT.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import { z } from "zod";

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

// Validate at import time — fail fast on any registry corruption.
for (const subagent of MANAGED_SUBAGENTS) {
  ManagedSubagentSchema.parse(subagent);
}
