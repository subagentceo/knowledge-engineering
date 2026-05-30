/**
 * @cite vendor/anthropics/code.claude.com/docs/en/sub-agents.md
 * upstream (not yet mirrored — crawl to add):
 *   https://code.claude.com/docs/en/agent-teams.md
 *   https://code.claude.com/docs/en/agent-view.md
 *   https://code.claude.com/docs/en/workflows.md
 *
 * Zod model + enums for the Claude Code sub-agent / agent-team / agent-view /
 * workflow surface. This is the TypeScript half of the cross-language contract;
 * src/agent/cowork/team_models.py mirrors it field-for-field in pydantic so the
 * orchestrator (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1) and the SwiftUI
 * agent-view surface read the same shapes.
 *
 * Field set is verbatim from the sub-agents.md "Supported frontmatter fields"
 * table: name, description, tools, model, skills, mcpServers, permissionMode,
 * isolation.
 */

import { z } from "zod";

// sub-agents.md `model`: sonnet | opus | haiku | <full id> | inherit (default inherit).
// Aliases are a closed set; a full model ID is also accepted, so the field is
// a union of the alias enum and a free string.
export const SubagentModelAlias = z.enum(["sonnet", "opus", "haiku", "inherit"]);
export type SubagentModelAlias = z.infer<typeof SubagentModelAlias>;
export const SubagentModel = z.union([SubagentModelAlias, z.string()]);
export type SubagentModel = z.infer<typeof SubagentModel>;

// sub-agents.md `permissionMode` (verbatim): default | acceptEdits | auto |
// dontAsk | bypassPermissions | plan.
export const PermissionMode = z.enum([
  "default",
  "acceptEdits",
  "auto",
  "dontAsk",
  "bypassPermissions",
  "plan",
]);
export type PermissionMode = z.infer<typeof PermissionMode>;

// sub-agents.md `memory`: user | project | local.
export const MemoryScope = z.enum(["user", "project", "local"]);
export type MemoryScope = z.infer<typeof MemoryScope>;

// sub-agents.md `effort`: low | medium | high | xhigh | max.
export const Effort = z.enum(["low", "medium", "high", "xhigh", "max"]);
export type Effort = z.infer<typeof Effort>;

// sub-agents.md `color` (task list / transcript display color).
export const SubagentColor = z.enum([
  "red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan",
]);
export type SubagentColor = z.infer<typeof SubagentColor>;

// sub-agents.md `isolation`: worktree (only documented value)
export const Isolation = z.enum(["worktree"]);
export type Isolation = z.infer<typeof Isolation>;

// sub-agents.md "Choose the subagent scope": managed | cli | project | user | plugin
export const SubagentScope = z.enum(["managed", "cli", "project", "user", "plugin"]);
export type SubagentScope = z.infer<typeof SubagentScope>;

const NAME_RE = /^[a-z][a-z0-9-]*$/; // "lowercase letters and hyphens"

/**
 * A subagent definition = one .claude/agents/<name>.md frontmatter block.
 * Field set verbatim from sub-agents.md "Supported frontmatter fields":
 * only `name` and `description` are required.
 */
export const SubagentDefinition = z.object({
  name: z.string().regex(NAME_RE, "lowercase letters and hyphens only"),
  description: z.string().min(1),
  tools: z.array(z.string()).optional(), // omitted ⇒ inherit all main-thread tools
  disallowedTools: z.array(z.string()).optional(), // denylist applied before tools
  model: SubagentModel.optional(), // omitted ⇒ inherit
  permissionMode: PermissionMode.optional(),
  maxTurns: z.number().int().positive().optional(),
  skills: z.array(z.string()).optional(),
  mcpServers: z.array(z.string()).optional(),
  memory: MemoryScope.optional(),
  background: z.boolean().optional(),
  effort: Effort.optional(),
  isolation: Isolation.optional(),
  color: SubagentColor.optional(),
  initialPrompt: z.string().optional(),
  scope: SubagentScope.optional(),
});
export type SubagentDefinition = z.infer<typeof SubagentDefinition>;

// ── agent-teams.md ────────────────────────────────────────────────────────
// Task list states (verbatim): pending | in progress | completed.
export const TeamTaskState = z.enum(["pending", "in_progress", "completed"]);
export type TeamTaskState = z.infer<typeof TeamTaskState>;

// teammateMode (settings): in-process | tmux | auto
export const TeammateMode = z.enum(["in-process", "tmux", "auto"]);
export type TeammateMode = z.infer<typeof TeammateMode>;

// Architecture roles: team lead vs teammate.
export const TeamRole = z.enum(["lead", "teammate"]);
export type TeamRole = z.infer<typeof TeamRole>;

/** One entry of the team config `members` array: name, agent ID, agent type. */
export const TeamMember = z.object({
  name: z.string(),
  agentId: z.string(),
  agentType: z.string(), // a subagent definition name, or the built-in "claude"
  role: TeamRole.default("teammate"),
});
export type TeamMember = z.infer<typeof TeamMember>;

/** Shared task; deps gate claiming (pending + unresolved deps ⇒ unclaimable). */
export const TeamTask = z.object({
  id: z.string(),
  subject: z.string(),
  state: TeamTaskState.default("pending"),
  owner: z.string().optional(), // teammate name, empty ⇒ unclaimed
  dependsOn: z.array(z.string()).default([]),
  // optional bridge to the operator's Jira backlog (SCRUM-N)
  jiraKey: z.string().regex(/^[A-Z]+-\d+$/).optional(),
});
export type TeamTask = z.infer<typeof TeamTask>;

/** ~/.claude/teams/{team-name}/config.json — runtime state owned by the lead. */
export const TeamConfig = z.object({
  name: z.string(),
  members: z.array(TeamMember),
  teammateMode: TeammateMode.default("auto"),
});
export type TeamConfig = z.infer<typeof TeamConfig>;

// ── agent-view.md ─────────────────────────────────────────────────────────
// Session state (verbatim from "Read session state"):
// working | needs_input | idle | completed | failed | stopped
export const SessionState = z.enum([
  "working",
  "needs_input",
  "idle",
  "completed",
  "failed",
  "stopped",
]);
export type SessionState = z.infer<typeof SessionState>;

// Process-liveness shape (icon): alive | exited | loop_sleeping
export const ProcessShape = z.enum(["alive", "exited", "loop_sleeping"]);
export type ProcessShape = z.infer<typeof ProcessShape>;

// PR status colors (verbatim): yellow | green | purple | grey
export const PullRequestStatus = z.enum(["yellow", "green", "purple", "grey"]);
export type PullRequestStatus = z.infer<typeof PullRequestStatus>;

/** `claude agents --json` row: pid, cwd, kind, startedAt, sessionId, name, status. */
export const AgentSession = z.object({
  sessionId: z.string(),
  name: z.string(),
  state: SessionState,
  shape: ProcessShape.default("alive"),
  cwd: z.string(),
  kind: z.string(), // session | exec | loop
  startedAt: z.string(), // ISO-8601
  summary: z.string().optional(), // Haiku-class one-line row summary
  prNumber: z.number().int().optional(),
  prStatus: PullRequestStatus.optional(),
  pinned: z.boolean().default(false),
});
export type AgentSession = z.infer<typeof AgentSession>;

// ── workflows.md ──────────────────────────────────────────────────────────
/** `meta` block: name + description required; phases optional. */
export const WorkflowPhaseMeta = z.object({
  title: z.string(),
  detail: z.string().optional(),
  model: SubagentModelAlias.optional(),
});
export type WorkflowPhaseMeta = z.infer<typeof WorkflowPhaseMeta>;

export const WorkflowMeta = z.object({
  name: z.string(),
  description: z.string(),
  whenToUse: z.string().optional(),
  phases: z.array(WorkflowPhaseMeta).default([]),
});
export type WorkflowMeta = z.infer<typeof WorkflowMeta>;

/** Live progress per phase, shown in /workflows: agent count, tokens, elapsed. */
export const WorkflowPhaseProgress = z.object({
  title: z.string(),
  agentCount: z.number().int().default(0),
  tokensTotal: z.number().int().default(0),
  elapsedMs: z.number().int().default(0),
});
export type WorkflowPhaseProgress = z.infer<typeof WorkflowPhaseProgress>;

export const WorkflowRunState = z.enum(["running", "paused", "completed", "stopped"]);
export type WorkflowRunState = z.infer<typeof WorkflowRunState>;

export const WorkflowRun = z.object({
  runId: z.string().regex(/^wf_[a-z0-9-]{6,}$/),
  meta: WorkflowMeta,
  state: WorkflowRunState.default("running"),
  phases: z.array(WorkflowPhaseProgress).default([]),
});
export type WorkflowRun = z.infer<typeof WorkflowRun>;

/**
 * The one object the SwiftUI agent-view surface renders: the team, its shared
 * task list (Jira-bridged), the live agent sessions, and any workflow runs.
 * Emitting this as JSON is what lets the Swift app "follow along".
 */
export const OrchestratorView = z.object({
  team: TeamConfig,
  tasks: z.array(TeamTask),
  sessions: z.array(AgentSession),
  workflows: z.array(WorkflowRun).default([]),
  generatedAt: z.string(), // ISO-8601, stamped by the emitter
});
export type OrchestratorView = z.infer<typeof OrchestratorView>;
