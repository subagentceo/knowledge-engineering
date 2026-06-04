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

// ── v0.4.0 → v0.5.0 loop task registry ───────────────────────────────────────
//
// Each LoopTask = one branch / one commit / one PR. Selection is deterministic:
// lowest semver in `pending` whose `dependsOn` are all in OutcomeRegistry.achievedIds().
// Cited refs: docs/decisions/2026-06-03-multi-agent-infrastructure.md (OMA1),
// docs/prompts/loop-improvements-2026-06-03.md, seeds/prompts/loop-orchestrator.md.

export const LoopTaskStatusSchema = z.enum([
  "pending",
  "in_progress",
  "achieved",
  "blocked",
]);
export type LoopTaskStatus = z.infer<typeof LoopTaskStatusSchema>;

export const LoopTaskSchema = z.object({
  semver: z.string(),
  title: z.string(),
  category: z.enum(["loop", "data", "prompt", "infra", "security", "swift"]),
  priority: z.number().int(),
  status: LoopTaskStatusSchema,
  dependsOn: z.array(z.string()),
  coworker: z.enum([
    "coworker-feature-dev",
    "coworker-data",
    "coworker-prompt",
    "coworker-security",
    "coworker-verifier",
  ]),
  description: z.string(),
});

export type LoopTask = z.infer<typeof LoopTaskSchema>;

export const V040_LOOP_TASKS: LoopTask[] = [
  {
    semver: "v0.5.0-O1",
    title: "ke-loop-orchestrator CCR routine wired and firing",
    category: "loop",
    priority: 0,
    status: "achieved",
    dependsOn: ["2026-06-03-O3", "2026-06-03-O10"],
    coworker: "coworker-feature-dev",
    description:
      "Wire the ke-loop-orchestrator CCR RemoteTrigger to fire on 60-minute cadence, seed prompt loaded from seeds/prompts/loop-orchestrator.md, env env_01Cz5mzNxXr5yJBqmJGdky7u, dispatching coworkers per V040_LOOP_TASKS. Tick emits mailbox_outcome JSONL lines per subtask. Closes meta-task: the orchestrator orchestrating itself.",
  },
  {
    semver: "v0.5.0-O2",
    title: "ke-coworker-data CCR routine (vendor mirror refresh every 4h)",
    category: "data",
    priority: 1,
    status: "achieved",
    dependsOn: ["2026-06-03-O3"],
    coworker: "coworker-data",
    description:
      "Stand up ke-coworker-data CCR routine on a 4h cron. Reads vendor/ mirror manifest, re-crawls drifted surfaces via scripts/crawl-vendors.ts, opens one PR per refreshed vendor with the citation-guard-safe (O<N>) commit subject. Idempotent: a clean re-crawl produces no PR.",
  },
  {
    semver: "v0.5.0-O3",
    title: "ke-coworker-prompt CCR routine (rewrites prompts with opus-4-8 eval loop)",
    category: "prompt",
    priority: 2,
    status: "achieved",
    dependsOn: ["2026-06-03-O3"],
    coworker: "coworker-prompt",
    description:
      "Stand up ke-coworker-prompt CCR routine. Iterates seeds/prompts/*.md, runs each through the structured-prompt-evaluator skill (12-criterion rubric), proposes a rewrite via opus-4-8, A/B-evals old vs new on a 5-case test bench, opens a PR if the rewrite scores higher on weighted total.",
  },
  {
    semver: "v0.5.0-O4",
    title: "connector consensus via D1 (knowledge-graph-lane majority quorum landed)",
    category: "infra",
    priority: 3,
    status: "achieved",
    dependsOn: ["2026-06-03-O3", "2026-06-03-O4"],
    coworker: "coworker-feature-dev",
    description:
      "Implement the majority-quorum consensus path for connectorRegistry entries whose consensus.type === \"majority\" (currently knowledge-graph-lane, quorum 2). Reads from 2-of-N D1 replicas, returns the agreed payload, logs disagreements to a divergence table. Backed by a Cloudflare D1 binding on the Worker.",
  },
  {
    semver: "v0.5.0-O5",
    title: "cross-session KG writes via mailbox D1 adapter",
    category: "infra",
    priority: 4,
    status: "achieved",
    dependsOn: ["2026-06-03-O3", "2026-06-03-O4"],
    coworker: "coworker-feature-dev",
    description:
      "Replace the JSONL mailbox at .claude/mailbox/agent_orchestrator.jsonl with a D1-backed adapter that fans out to the JSONL file for local debugging AND persists to a `mailbox_events` table. Enables cross-session KG reads in the orchestrator's read-state phase without re-parsing the full JSONL.",
  },
  {
    semver: "v0.5.0-O6",
    title: "coworker-verifier: dogfood pr-review-toolkit on every PR",
    category: "security",
    priority: 5,
    status: "achieved",
    dependsOn: ["2026-06-03-O3", "2026-06-03-O10"],
    coworker: "coworker-verifier",
    description:
      "Stand up ke-coworker-verifier CCR routine triggered on pull_request.opened / .synchronize. Runs the pr-review-toolkit (code-review skill) at effort=medium, posts inline comments via `gh pr comment`, and labels the PR with `verifier-approved` or `verifier-changes-requested`. Must not block automerge — advisory only.",
  },
];

for (const t of V040_LOOP_TASKS) {
  LoopTaskSchema.parse(t);
}

export function getLoopTask(semver: string): LoopTask | undefined {
  return V040_LOOP_TASKS.find((t) => t.semver === semver);
}

export function nextUnblockedLoopTask(
  achievedIds: Set<string>,
): LoopTask | undefined {
  const candidates = V040_LOOP_TASKS.filter(
    (t) =>
      t.status === "pending" && t.dependsOn.every((d) => achievedIds.has(d)),
  );
  if (candidates.length === 0) return undefined;
  return candidates.reduce((best, t) =>
    t.priority < best.priority ? t : best,
  );
}
