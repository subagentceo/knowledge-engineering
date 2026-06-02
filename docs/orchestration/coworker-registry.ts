/**
 * coworker-registry.ts — canonical typed registry of all managed-coworkers
 * and managed-subagents for the knowledge-engineering autonomous loop.
 *
 * SemVer target: v0.4.0 (first minor bump adding orchestration primitives)
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 * @cite subagentplugins/claude-plugins-official/plugins/feature-dev/commands/feature-dev.md
 * @cite subagentplugins/knowledge-work-plugins/engineering/CONNECTORS.md
 */
import { z } from "zod";

// ─── SemVer outcome ID ────────────────────────────────────────────────────────

export const SemVerOutcomeId = z.string().regex(
  /^v\d+\.\d+\.\d+-O\d+$/,
  "must match v{MAJOR}.{MINOR}.{PATCH}-O{N}"
);
export type SemVerOutcomeId = z.infer<typeof SemVerOutcomeId>;

// ─── Connector categories (from knowledge-work-plugins/engineering/CONNECTORS.md) ──

export const ConnectorCategory = z.enum([
  "engineering",   // alloydb-client, redis-client, neon-client, pg-client
  "data",          // crawl-vendors, citation-extract, seed-writer
  "knowledge",     // prompt-eval, rubric-scorer, vendor-mirror
  "security",      // security-guidance hook, osv-scanner
  "finance",       // stripe-client, cost-gate — SEPARATE agent, never merged
  "design",        // UI mockups, brand tokens — SEPARATE agent, never merged
  "infra",         // CF Workers, KV, Queues, D1 provisioning
  "comms",         // mailbox, slack, github-comments
]);
export type ConnectorCategory = z.infer<typeof ConnectorCategory>;

// ─── Connector consensus policy ──────────────────────────────────────────────

export const ConsensusPolicy = z.discriminatedUnion("type", [
  z.object({ type: z.literal("unanimous"), quorum: z.literal(3) }),
  z.object({ type: z.literal("majority"), quorum: z.literal(2) }),
  z.object({ type: z.literal("single"),   quorum: z.literal(1) }),
]);

export const ConnectorSpec = z.object({
  id:          z.string(),
  displayName: z.string(),
  category:    ConnectorCategory,
  consensus:   ConsensusPolicy,
  cfKvKey:     z.string().optional(), // kv-coworker-votes key path
  sourcePath:  z.string().optional(), // local src/ path
});
export type ConnectorSpec = z.infer<typeof ConnectorSpec>;

// ─── Managed subagent (plugin → CF Worker) ────────────────────────────────────

export const SubagentStatus = z.enum(["planned", "scaffolded", "deployed", "active"]);

export const ManagedSubagent = z.object({
  id:           z.string(),
  displayName:  z.string(),
  semver:       z.string(),           // target version this ships in
  outcomeId:    SemVerOutcomeId,
  sourcePath:   z.string(),           // subagentplugins/... path
  cfWorkerName: z.string(),           // ke-{name} — fresh, verify absent first
  cfAccountId:  z.literal("e6294e3ea89f8207af387d459824aaae"),
  category:     ConnectorCategory,
  status:       SubagentStatus,
  connectors:   z.array(z.string()), // ConnectorSpec ids required
  description:  z.string(),
});
export type ManagedSubagent = z.infer<typeof ManagedSubagent>;

// ─── Managed coworker (knowledge-work-plugin → conditional on connector setup) ─

export const CoworkerStatus = z.enum(["planned", "prompt-written", "eval-scored", "active"]);

export const ManagedCoworker = z.object({
  id:              z.string(),
  displayName:     z.string(),
  semver:          z.string(),
  outcomeId:       SemVerOutcomeId,
  sourcePath:      z.string(),
  category:        ConnectorCategory,
  status:          CoworkerStatus,
  requiredConnectors: z.array(z.string()), // must be consensus-approved before activation
  promptPath:      z.string().optional(),   // docs/prompts/coworker-{id}.md
  evalPath:        z.string().optional(),   // docs/prompts/coworker-{id}.eval.md
  iteratePath:     z.string().optional(),   // docs/prompts/coworker-{id}.iterate.md
  description:     z.string(),
});
export type ManagedCoworker = z.infer<typeof ManagedCoworker>;

// ─── Loop tick task ──────────────────────────────────────────────────────────

export const LoopTickStatus = z.enum(["pending", "in_progress", "verify_gate", "blocked", "merged"]);

export const LoopTickTask = z.object({
  id:           SemVerOutcomeId,
  title:        z.string(),
  assignee:     z.string(),           // coworker id
  branch:       z.string(),           // feat/{semver}-{slug}
  commitPrefix: z.string(),           // "feat(mailbox):" | "fix(swift):" etc.
  status:       LoopTickStatus,
  blockedBy:    z.array(SemVerOutcomeId).default([]),
  evidencePaths: z.array(z.string()).default([]),
  commitSha:    z.string().optional(),
  prNumber:     z.number().int().optional(),
});
export type LoopTickTask = z.infer<typeof LoopTickTask>;

// ─── Registry data ───────────────────────────────────────────────────────────

export const CONNECTORS: ConnectorSpec[] = [
  { id: "neon-client",    displayName: "Neon Postgres",    category: "engineering", consensus: { type: "majority",   quorum: 2 }, sourcePath: "src/db/neon-client.ts" },
  { id: "alloydb-client", displayName: "AlloyDB Omni",     category: "engineering", consensus: { type: "majority",   quorum: 2 }, sourcePath: "src/db/alloydb-client.ts" },
  { id: "redis-client",   displayName: "DragonflyDB/Redis", category: "engineering", consensus: { type: "majority",   quorum: 2 }, sourcePath: "src/db/redis-client.ts" },
  { id: "cf-kv",          displayName: "Cloudflare KV",    category: "infra",       consensus: { type: "single",     quorum: 1 }, cfKvKey: "connectors/infra/cf-kv" },
  { id: "cf-d1",          displayName: "Cloudflare D1",    category: "infra",       consensus: { type: "single",     quorum: 1 }, cfKvKey: "connectors/infra/cf-d1" },
  { id: "mailbox-lane",   displayName: "MCP Mailbox Lane", category: "comms",       consensus: { type: "single",     quorum: 1 }, sourcePath: "src/mcp/lanes/mailbox.ts" },
  { id: "telemetry-lane", displayName: "MCP Telemetry",    category: "data",        consensus: { type: "single",     quorum: 1 }, sourcePath: "src/mcp/lanes/telemetry.ts" },
  { id: "security-hook",  displayName: "Security Guidance", category: "security",   consensus: { type: "unanimous",  quorum: 3 } },
];

export const MANAGED_SUBAGENTS: ManagedSubagent[] = [
  {
    id: "swift-lsp",
    displayName: "Swift LSP Subagent",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O1",
    sourcePath: "subagentplugins/claude-plugins-official/plugins/swift-lsp",
    cfWorkerName: "ke-subagent-swift-lsp",
    cfAccountId: "e6294e3ea89f8207af387d459824aaae",
    category: "engineering",
    status: "planned",
    connectors: [],
    description: "sourcekit-lsp attach + go-to-def + inline diagnostics for Swift SPM packages",
  },
  {
    id: "feature-dev",
    displayName: "Feature Dev Subagent",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O2",
    sourcePath: "subagentplugins/claude-plugins-official/plugins/feature-dev",
    cfWorkerName: "ke-subagent-feature-dev",
    cfAccountId: "e6294e3ea89f8207af387d459824aaae",
    category: "engineering",
    status: "planned",
    connectors: ["neon-client", "mailbox-lane", "telemetry-lane"],
    description: "7-phase orchestrated workflow: code-explorer×3, code-architect×3, code-reviewer×3",
  },
  {
    id: "pr-review",
    displayName: "PR Review Subagent",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O3",
    sourcePath: "subagentplugins/claude-plugins-official/plugins/pr-review-toolkit",
    cfWorkerName: "ke-subagent-pr-review",
    cfAccountId: "e6294e3ea89f8207af387d459824aaae",
    category: "engineering",
    status: "planned",
    connectors: ["mailbox-lane"],
    description: "6-agent parallel PR review: comment-analyzer, pr-test-analyzer, silent-failure-hunter, type-design-analyzer, code-reviewer, code-simplifier",
  },
  {
    id: "commit-commands",
    displayName: "Commit Commands Subagent",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O4",
    sourcePath: "subagentplugins/claude-plugins-official/plugins/commit-commands",
    cfWorkerName: "ke-subagent-commit",
    cfAccountId: "e6294e3ea89f8207af387d459824aaae",
    category: "engineering",
    status: "planned",
    connectors: [],
    description: "/commit and /commit-push-pr with conventional commit enforcement and (O<N>) suffix",
  },
  {
    id: "security-guidance",
    displayName: "Security Guidance Subagent",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O5",
    sourcePath: "subagentplugins/claude-plugins-official/plugins/security-guidance",
    cfWorkerName: "ke-subagent-security",
    cfAccountId: "e6294e3ea89f8207af387d459824aaae",
    category: "security",
    status: "planned",
    connectors: ["security-hook"],
    description: "always-on hook: OWASP top-10 scan, secret leak detection, blocks on high-severity",
  },
  {
    id: "ralph-loop",
    displayName: "Ralph Iterate Subagent",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O6",
    sourcePath: "subagentplugins/claude-plugins-official/plugins/ralph-loop",
    cfWorkerName: "ke-subagent-ralph",
    cfAccountId: "e6294e3ea89f8207af387d459824aaae",
    category: "engineering",
    status: "planned",
    connectors: [],
    description: "stop-hook while-loop: iterate until severity_high_findings == 0",
  },
];

export const MANAGED_COWORKERS: ManagedCoworker[] = [
  {
    id: "coworker-dev-chain",
    displayName: "Dev Chain Coworker",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O7",
    sourcePath: "subagentplugins/knowledge-work-plugins/engineering",
    category: "engineering",
    status: "planned",
    requiredConnectors: ["neon-client", "mailbox-lane", "security-hook"],
    promptPath: "docs/prompts/coworker-dev-chain.md",
    evalPath: "docs/prompts/coworker-dev-chain.eval.md",
    iteratePath: "docs/prompts/coworker-dev-chain.iterate.md",
    description: "8-step dev chain: security_hook → swift_lsp → feature_dev → security_scan → commit → pr_review → commit_push_pr → ralph_iterate",
  },
  {
    id: "coworker-data",
    displayName: "Data Coworker",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O8",
    sourcePath: "subagentplugins/knowledge-work-plugins/engineering",
    category: "data",
    status: "planned",
    requiredConnectors: ["telemetry-lane"],
    description: "vendor mirror refresh, changelog harvest, citation extraction — runs npm run crawl:vendor",
  },
  {
    id: "coworker-prompt",
    displayName: "Prompt Coworker",
    semver: "0.4.0",
    outcomeId: "v0.4.0-O9",
    sourcePath: "subagentplugins/knowledge-work-plugins/engineering",
    category: "knowledge",
    status: "planned",
    requiredConnectors: [],
    promptPath: "docs/prompts/coworker-prompt-chain.md",
    description: "structured prompt write → 12-criterion eval → opus-4-8 iterate until score ≥ 80/100",
  },
];

// ─── v0.4.0 loop tick backlog ────────────────────────────────────────────────

export const V040_LOOP_TASKS: LoopTickTask[] = [
  {
    id: "v0.4.0-O1",
    title: "Swift LSP subagent scaffold + CF Worker stub",
    assignee: "coworker-feature-dev",
    branch: "feat/v0.4.0-swift-lsp-subagent",
    commitPrefix: "feat(swift-lsp):",
    status: "pending",
    blockedBy: [],
    evidencePaths: [
      "src/subagents/swift-lsp/index.ts",
      "src/subagents/swift-lsp/worker.ts",
    ],
  },
  {
    id: "v0.4.0-O2",
    title: "Feature-dev subagent scaffold + CF Worker stub",
    assignee: "coworker-feature-dev",
    branch: "feat/v0.4.0-feature-dev-subagent",
    commitPrefix: "feat(feature-dev):",
    status: "pending",
    blockedBy: [],
    evidencePaths: [
      "src/subagents/feature-dev/index.ts",
      "src/subagents/feature-dev/worker.ts",
    ],
  },
  {
    id: "v0.4.0-O7",
    title: "Dev-chain coworker prompt + eval (score ≥ 80/100)",
    assignee: "coworker-prompt",
    branch: "feat/v0.4.0-coworker-dev-chain-prompt",
    commitPrefix: "feat(prompt):",
    status: "pending",
    blockedBy: [],
    evidencePaths: [
      "docs/prompts/coworker-dev-chain.md",
      "docs/prompts/coworker-dev-chain.eval.md",
    ],
  },
  {
    id: "v0.4.0-O8",
    title: "CoworkerDashboard SSE stream + CF KV consensus panel (Swift)",
    assignee: "coworker-feature-dev",
    branch: "feat/v0.4.0-coworker-dashboard-sse",
    commitPrefix: "feat(coworker-dashboard):",
    status: "pending",
    blockedBy: ["v0.4.0-O1"],
    evidencePaths: [
      "apps/coworker-dashboard/Sources/CoworkerDashboard/Store.swift",
      "apps/coworker-dashboard/Sources/CoworkerDashboard/Views.swift",
    ],
  },
];

// ─── Runtime validation ───────────────────────────────────────────────────────

for (const c of CONNECTORS)        ConnectorSpec.parse(c);
for (const s of MANAGED_SUBAGENTS) ManagedSubagent.parse(s);
for (const w of MANAGED_COWORKERS) ManagedCoworker.parse(w);
for (const t of V040_LOOP_TASKS)   LoopTickTask.parse(t);
