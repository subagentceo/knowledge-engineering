/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents
 *
 * Claude Managed Agents — canonical type-safe data model
 * Generated: 2026-06-02
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * OBSIDIAN KNOWLEDGE GRAPH — HIERARCHY
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Organization
 * └── Workspace
 *     ├── Agent (versioned: v1, v2, …)
 *     │   └── Session
 *     │       ├── SessionThread (primary + sub-threads)
 *     │       │   └── SessionEvent (user.* / agent.* / session.* / span.*)
 *     │       └── SessionResource
 *     │           ├── FileResource       → File (file_...)
 *     │           ├── GitHubRepositoryResource
 *     │           └── MemoryStoreResource → MemoryStore (memstore_...)
 *     ├── Environment (cloud | self_hosted)
 *     ├── Vault (vlt_...)
 *     │   └── VaultCredential (vcrd_...) [mcp_oauth | static_bearer]
 *     ├── MemoryStore (memstore_...)
 *     │   └── Memory (path-addressed)
 *     │       └── MemoryVersion (memver_...)
 *     ├── Skill (skill_...)
 *     ├── File (file_...)
 *     └── Dream (drm_...)
 *         ├── inputs:  MemoryStore[] | Session[]
 *         └── outputs: MemoryStore[] (synthesised knowledge)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * RAG / KNOWLEDGE GRAPH NOTES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Memories form the persistent knowledge layer for agents:
 *   - Up to 8 MemoryStores per session, max 2000 memories each, 100 KB per entry
 *   - Addressed by path (e.g. "/preferences/formatting.md") — tree-structured KV
 *   - Optimistic concurrency via content_sha256
 *   - MemoryVersions retained 30 days (recent versions always kept)
 *
 * Dreams synthesise across multiple sessions / memory stores:
 *   - Input: 1-100 sessions OR memory stores (mixed)
 *   - Output: writes synthesised memories into a target MemoryStore
 *   - Model runs autonomously; requires beta header "dreaming-2026-04-21"
 *   - Ideal for cross-session consolidation, knowledge graph maintenance,
 *     periodic summarisation, preference extraction, and RAG index refresh
 *
 * Recommended RAG pipeline:
 *   Session(s) → Dream → MemoryStore (canonical KB) → mounted into next Session
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CURL EXAMPLES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * # Required headers for all requests:
 * #   anthropic-beta: managed-agents-2026-04-01
 * # Additional for Dreams:
 * #   anthropic-beta: managed-agents-2026-04-01,dreaming-2026-04-21
 * # Additional for Files:
 * #   anthropic-beta: managed-agents-2026-04-01,files-api-2025-04-14
 *
 * # Create an agent
 * curl -X POST https://api.anthropic.com/v1/agents \
 *   -H "x-api-key: $CLAUDE_OAUTH_TOKEN" \
 *   -H "anthropic-beta: managed-agents-2026-04-01" \
 *   -d '{"name":"my-agent","model":{"id":"claude-sonnet-4-6"},"tools":[],"mcp_servers":[],"skills":[]}'
 *
 * # Create a session
 * curl -X POST https://api.anthropic.com/v1/sessions \
 *   -H "x-api-key: $CLAUDE_OAUTH_TOKEN" \
 *   -H "anthropic-beta: managed-agents-2026-04-01" \
 *   -d '{"agent":{"type":"agent","id":"agent_...","version":1},"environment_id":"env_..."}'
 *
 * # Send a message (SSE stream)
 * curl -X POST https://api.anthropic.com/v1/sessions/{id}/events \
 *   -H "x-api-key: $CLAUDE_OAUTH_TOKEN" \
 *   -H "anthropic-beta: managed-agents-2026-04-01" \
 *   -H "Accept: text/event-stream" \
 *   -d '{"type":"user.message","content":[{"type":"text","text":"Hello"}]}'
 *
 * # Create a Dream
 * curl -X POST https://api.anthropic.com/v1/dreams \
 *   -H "x-api-key: $CLAUDE_OAUTH_TOKEN" \
 *   -H "anthropic-beta: managed-agents-2026-04-01,dreaming-2026-04-21" \
 *   -d '{"inputs":[{"type":"memory_store","memory_store_id":"memstore_..."}],"outputs":[{"type":"memory_store","memory_store_id":"memstore_..."}],"model":{"id":"claude-sonnet-4-6"}}'
 *
 * # Upload a file
 * curl -X POST https://api.anthropic.com/v1/files \
 *   -H "x-api-key: $CLAUDE_OAUTH_TOKEN" \
 *   -H "anthropic-beta: managed-agents-2026-04-01,files-api-2025-04-14" \
 *   -F "file=@./document.pdf"
 */

import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// BETA HEADERS
// ─────────────────────────────────────────────────────────────────────────────

export const BETA_MANAGED_AGENTS = "managed-agents-2026-04-01" as const;
export const BETA_DREAMING = "dreaming-2026-04-21" as const;
export const BETA_FILES = "files-api-2025-04-14" as const;

export const BETA_HEADERS = {
  base: [BETA_MANAGED_AGENTS],
  dreams: [BETA_MANAGED_AGENTS, BETA_DREAMING],
  files: [BETA_MANAGED_AGENTS, BETA_FILES],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ID PREFIX CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export const ID_PREFIXES = {
  agent: "agent_",
  environment: "env_",
  session: "sesn_",
  sessionThread: "sth_",
  sessionEvent: "sevt_",
  sessionResource: "sesrsc_",
  memoryStore: "memstore_",
  memory: "mem_",
  memoryVersion: "memver_",
  vault: "vlt_",
  vaultCredential: "vcrd_",
  dream: "drm_",
  file: "file_",
  skill: "skill_",
  outcome: "outc_",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// RATE LIMITS
// ─────────────────────────────────────────────────────────────────────────────

export const RATE_LIMITS = {
  create: 300, // req/min
  read: 600,   // req/min
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MODEL IDs
// ─────────────────────────────────────────────────────────────────────────────

export const ModelId = z.enum([
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-opus-4-6",
  "claude-sonnet-4-6",
  "claude-haiku-4-5",
]);
export type ModelId = z.infer<typeof ModelId>;

export const DreamModelId = z.enum([
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-sonnet-4-6",
]);
export type DreamModelId = z.infer<typeof DreamModelId>;

export const ModelSpeed = z.enum(["standard", "fast"]);
export type ModelSpeed = z.infer<typeof ModelSpeed>;

export const ModelRef = z.object({
  id: ModelId,
  speed: ModelSpeed.optional(),
});
export type ModelRef = z.infer<typeof ModelRef>;

export const DreamModelRef = z.object({
  id: DreamModelId,
});
export type DreamModelRef = z.infer<typeof DreamModelRef>;

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT BLOCKS
// ─────────────────────────────────────────────────────────────────────────────

export const TextBlock = z.object({
  type: z.literal("text"),
  text: z.string(),
});
export type TextBlock = z.infer<typeof TextBlock>;

export const ImageBlock = z.object({
  type: z.literal("image"),
  source: z.object({
    type: z.literal("base64"),
    media_type: z.string(),
    data: z.string(),
  }),
});
export type ImageBlock = z.infer<typeof ImageBlock>;

export const ContentBlock = z.discriminatedUnion("type", [TextBlock, ImageBlock]);
export type ContentBlock = z.infer<typeof ContentBlock>;

// ─────────────────────────────────────────────────────────────────────────────
// PERMISSION POLICY
// ─────────────────────────────────────────────────────────────────────────────

export const AlwaysAllow = z.object({ type: z.literal("always_allow") });
export type AlwaysAllow = z.infer<typeof AlwaysAllow>;

export const AlwaysAsk = z.object({ type: z.literal("always_ask") });
export type AlwaysAsk = z.infer<typeof AlwaysAsk>;

export const PermissionPolicy = z.discriminatedUnion("type", [AlwaysAllow, AlwaysAsk]);
export type PermissionPolicy = z.infer<typeof PermissionPolicy>;

// ─────────────────────────────────────────────────────────────────────────────
// TOOLS
// ─────────────────────────────────────────────────────────────────────────────

export const BuiltinToolName = z.enum([
  "bash", "read", "write", "edit", "glob", "grep", "web_fetch", "web_search",
]);
export type BuiltinToolName = z.infer<typeof BuiltinToolName>;

export const ToolsetDefaultConfig = z.object({
  permission_policy: PermissionPolicy.optional(),
  enabled: z.boolean().optional(),
});
export type ToolsetDefaultConfig = z.infer<typeof ToolsetDefaultConfig>;

export const ToolConfig = z.object({
  name: BuiltinToolName,
  permission_policy: PermissionPolicy.optional(),
  enabled: z.boolean().optional(),
});
export type ToolConfig = z.infer<typeof ToolConfig>;

export const MCPToolConfig = z.object({
  name: z.string(),
  permission_policy: PermissionPolicy.optional(),
  enabled: z.boolean().optional(),
});
export type MCPToolConfig = z.infer<typeof MCPToolConfig>;

export const AgentToolset20260401 = z.object({
  type: z.literal("agent_toolset_20260401"),
  default_config: ToolsetDefaultConfig.optional(),
  configs: z.array(ToolConfig).optional(),
});
export type AgentToolset20260401 = z.infer<typeof AgentToolset20260401>;

export const MCPToolset = z.object({
  type: z.literal("mcp_toolset"),
  mcp_server_name: z.string(),
  default_config: ToolsetDefaultConfig.optional(),
  configs: z.array(MCPToolConfig).optional(),
});
export type MCPToolset = z.infer<typeof MCPToolset>;

// JSONSchema — permissive recursive type
export type JSONSchema = {
  type?: string;
  properties?: Record<string, JSONSchema>;
  items?: JSONSchema;
  required?: string[];
  description?: string;
  enum?: unknown[];
  [key: string]: unknown;
};
export const JSONSchema: z.ZodType<JSONSchema> = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    properties: z.record(JSONSchema).optional(),
    items: JSONSchema.optional(),
    required: z.array(z.string()).optional(),
    description: z.string().optional(),
    enum: z.array(z.unknown()).optional(),
  }).passthrough()
);

export const CustomTool = z.object({
  type: z.literal("custom"),
  name: z.string(),
  description: z.string(),
  input_schema: JSONSchema,
});
export type CustomTool = z.infer<typeof CustomTool>;

export const Tool = z.union([AgentToolset20260401, MCPToolset, CustomTool]);
export type Tool = z.infer<typeof Tool>;

// ─────────────────────────────────────────────────────────────────────────────
// MCP SERVER
// ─────────────────────────────────────────────────────────────────────────────

export const MCPServer = z.object({
  type: z.literal("url"),
  name: z.string().min(1).max(255),
  url: z.string().max(2048),
});
export type MCPServer = z.infer<typeof MCPServer>;

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────────────

export const AnthropicSkillRef = z.object({
  type: z.literal("anthropic"),
  skill_id: z.string(),
});
export type AnthropicSkillRef = z.infer<typeof AnthropicSkillRef>;

export const CustomSkillRef = z.object({
  type: z.literal("custom"),
  skill_id: z.string(),
  version: z.string(),
});
export type CustomSkillRef = z.infer<typeof CustomSkillRef>;

export const SkillRef = z.discriminatedUnion("type", [AnthropicSkillRef, CustomSkillRef]);
export type SkillRef = z.infer<typeof SkillRef>;

// ─────────────────────────────────────────────────────────────────────────────
// MULTIAGENT
// ─────────────────────────────────────────────────────────────────────────────

export const MultiagentRosterAgentEntry = z.object({
  type: z.literal("agent"),
  id: z.string(),
  version: z.number().int().positive().optional(),
});
export type MultiagentRosterAgentEntry = z.infer<typeof MultiagentRosterAgentEntry>;

export const MultiagentRosterSelfEntry = z.object({
  type: z.literal("self"),
});
export type MultiagentRosterSelfEntry = z.infer<typeof MultiagentRosterSelfEntry>;

export const MultiagentRosterEntry = z.union([
  z.string(),
  MultiagentRosterAgentEntry,
  MultiagentRosterSelfEntry,
]);
export type MultiagentRosterEntry = z.infer<typeof MultiagentRosterEntry>;

export const MultiagentConfig = z.object({
  type: z.literal("coordinator"),
  agents: z.array(MultiagentRosterEntry),
});
export type MultiagentConfig = z.infer<typeof MultiagentConfig>;

// ─────────────────────────────────────────────────────────────────────────────
// AGENT
// ─────────────────────────────────────────────────────────────────────────────

export const AgentRef = z.object({
  type: z.literal("agent"),
  id: z.string(),
  version: z.number().int().positive(),
});
export type AgentRef = z.infer<typeof AgentRef>;

export const Agent = z.object({
  id: z.string().startsWith("agent_"),
  type: z.literal("agent"),
  name: z.string(),
  model: ModelRef,
  system: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tools: z.array(Tool),
  mcp_servers: z.array(MCPServer),
  skills: z.array(SkillRef),
  multiagent: MultiagentConfig.nullable().optional(),
  metadata: z.record(z.string()),
  version: z.number().int().positive(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  archived_at: z.string().datetime().nullable(),
});
export type Agent = z.infer<typeof Agent>;

export const AgentCreateInput = Agent.omit({
  id: true,
  type: true,
  version: true,
  created_at: true,
  updated_at: true,
  archived_at: true,
}).partial({
  system: true,
  description: true,
  tools: true,
  mcp_servers: true,
  skills: true,
  multiagent: true,
  metadata: true,
});
export type AgentCreateInput = z.infer<typeof AgentCreateInput>;

// ─────────────────────────────────────────────────────────────────────────────
// ENVIRONMENT
// ─────────────────────────────────────────────────────────────────────────────

export const PackageManagers = z.object({
  apt: z.array(z.string()).optional(),
  cargo: z.array(z.string()).optional(),
  gem: z.array(z.string()).optional(),
  go: z.array(z.string()).optional(),
  npm: z.array(z.string()).optional(),
  pip: z.array(z.string()).optional(),
});
export type PackageManagers = z.infer<typeof PackageManagers>;

export const UnrestrictedNetwork = z.object({ type: z.literal("unrestricted") });
export type UnrestrictedNetwork = z.infer<typeof UnrestrictedNetwork>;

export const LimitedNetwork = z.object({
  type: z.literal("limited"),
  allowed_hosts: z.array(z.string()).optional(),
  allow_mcp_servers: z.boolean().optional(),
  allow_package_managers: z.boolean().optional(),
});
export type LimitedNetwork = z.infer<typeof LimitedNetwork>;

export const NetworkConfig = z.discriminatedUnion("type", [UnrestrictedNetwork, LimitedNetwork]);
export type NetworkConfig = z.infer<typeof NetworkConfig>;

export const CloudConfig = z.object({
  type: z.literal("cloud"),
  packages: PackageManagers.optional(),
  networking: NetworkConfig.optional(),
});
export type CloudConfig = z.infer<typeof CloudConfig>;

export const SelfHostedConfig = z.object({
  type: z.literal("self_hosted"),
});
export type SelfHostedConfig = z.infer<typeof SelfHostedConfig>;

export const EnvironmentConfig = z.discriminatedUnion("type", [CloudConfig, SelfHostedConfig]);
export type EnvironmentConfig = z.infer<typeof EnvironmentConfig>;

export const Environment = z.object({
  id: z.string().startsWith("env_"),
  type: z.literal("environment"),
  name: z.string(),
  config: EnvironmentConfig,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  archived_at: z.string().datetime().nullable(),
});
export type Environment = z.infer<typeof Environment>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION RESOURCES
// ─────────────────────────────────────────────────────────────────────────────

export const MemoryStoreAccess = z.enum(["read_write", "read_only"]);
export type MemoryStoreAccess = z.infer<typeof MemoryStoreAccess>;

export const FileResource = z.object({
  type: z.literal("file"),
  file_id: z.string().startsWith("file_"),
  mount_path: z.string().optional(),
});
export type FileResource = z.infer<typeof FileResource>;

export const GitHubRepositoryResource = z.object({
  type: z.literal("github_repository"),
  url: z.string().url(),
  mount_path: z.string().optional(),
  authorization_token: z.string(),
});
export type GitHubRepositoryResource = z.infer<typeof GitHubRepositoryResource>;

export const MemoryStoreResource = z.object({
  type: z.literal("memory_store"),
  memory_store_id: z.string().startsWith("memstore_"),
  access: MemoryStoreAccess.optional(),
  instructions: z.string().max(4096).optional(),
});
export type MemoryStoreResource = z.infer<typeof MemoryStoreResource>;

export const SessionResource = z.discriminatedUnion("type", [
  FileResource,
  GitHubRepositoryResource,
  MemoryStoreResource,
]);
export type SessionResource = z.infer<typeof SessionResource>;

// ─────────────────────────────────────────────────────────────────────────────
// OUTCOME EVALUATION
// ─────────────────────────────────────────────────────────────────────────────

export const OutcomeResult = z.enum([
  "satisfied",
  "needs_revision",
  "max_iterations_reached",
  "failed",
  "interrupted",
]);
export type OutcomeResult = z.infer<typeof OutcomeResult>;

export const OutcomeEvaluation = z.object({
  outcome_id: z.string().startsWith("outc_"),
  result: OutcomeResult,
  explanation: z.string().optional(),
});
export type OutcomeEvaluation = z.infer<typeof OutcomeEvaluation>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION
// ─────────────────────────────────────────────────────────────────────────────

export const SessionStatus = z.enum(["idle", "running", "rescheduling", "terminated"]);
export type SessionStatus = z.infer<typeof SessionStatus>;

export const Session = z.object({
  id: z.string().startsWith("sesn_"),
  type: z.literal("session"),
  agent: AgentRef,
  environment_id: z.string().startsWith("env_"),
  status: SessionStatus,
  title: z.string().nullable().optional(),
  vault_ids: z.array(z.string().startsWith("vlt_")).optional(),
  resources: z.array(SessionResource).optional(),
  metadata: z.record(z.string()).optional(),
  outcome_evaluations: z.array(OutcomeEvaluation).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  archived_at: z.string().datetime().nullable(),
});
export type Session = z.infer<typeof Session>;

export const SessionCreateInput = z.object({
  agent: AgentRef,
  environment_id: z.string().startsWith("env_"),
  title: z.string().nullable().optional(),
  vault_ids: z.array(z.string().startsWith("vlt_")).optional(),
  resources: z.array(SessionResource).optional(),
  metadata: z.record(z.string()).optional(),
});
export type SessionCreateInput = z.infer<typeof SessionCreateInput>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION THREAD
// ─────────────────────────────────────────────────────────────────────────────

export const SessionThread = z.object({
  id: z.string().startsWith("sth_"),
  type: z.literal("session_thread"),
  session_id: z.string().startsWith("sesn_"),
  agent: z.object({
    name: z.string(),
    id: z.string().startsWith("agent_"),
    version: z.number().int().positive(),
  }),
  status: SessionStatus,
  parent_thread_id: z.string().startsWith("sth_").nullable(),
  archived_at: z.string().datetime().nullable(),
});
export type SessionThread = z.infer<typeof SessionThread>;

// ─────────────────────────────────────────────────────────────────────────────
// STOP REASON
// ─────────────────────────────────────────────────────────────────────────────

export const EndTurnStopReason = z.object({ type: z.literal("end_turn") });
export type EndTurnStopReason = z.infer<typeof EndTurnStopReason>;

export const RequiresActionStopReason = z.object({
  type: z.literal("requires_action"),
  event_ids: z.array(z.string()),
});
export type RequiresActionStopReason = z.infer<typeof RequiresActionStopReason>;

export const MaxTokensStopReason = z.object({ type: z.literal("max_tokens") });
export type MaxTokensStopReason = z.infer<typeof MaxTokensStopReason>;

export const StopReason = z.discriminatedUnion("type", [
  EndTurnStopReason,
  RequiresActionStopReason,
  MaxTokensStopReason,
]);
export type StopReason = z.infer<typeof StopReason>;

// ─────────────────────────────────────────────────────────────────────────────
// MODEL USAGE
// ─────────────────────────────────────────────────────────────────────────────

export const ModelUsage = z.object({
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  cache_creation_input_tokens: z.number().int().nonnegative(),
  cache_read_input_tokens: z.number().int().nonnegative(),
});
export type ModelUsage = z.infer<typeof ModelUsage>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION ERROR
// ─────────────────────────────────────────────────────────────────────────────

export const SessionError = z.object({
  type: z.string(),
  message: z.string().optional(),
});
export type SessionError = z.infer<typeof SessionError>;

// ─────────────────────────────────────────────────────────────────────────────
// RUBRICS (for define_outcome)
// ─────────────────────────────────────────────────────────────────────────────

export const TextRubric = z.object({
  type: z.literal("text"),
  content: z.string(),
});
export type TextRubric = z.infer<typeof TextRubric>;

export const FileRubric = z.object({
  type: z.literal("file"),
  file_id: z.string().startsWith("file_"),
});
export type FileRubric = z.infer<typeof FileRubric>;

export const Rubric = z.discriminatedUnion("type", [TextRubric, FileRubric]);
export type Rubric = z.infer<typeof Rubric>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION EVENTS (user → agent)
// ─────────────────────────────────────────────────────────────────────────────

export const UserMessageEvent = z.object({
  type: z.literal("user.message"),
  content: z.array(ContentBlock),
  session_thread_id: z.string().startsWith("sth_").optional(),
});
export type UserMessageEvent = z.infer<typeof UserMessageEvent>;

export const UserInterruptEvent = z.object({
  type: z.literal("user.interrupt"),
  session_thread_id: z.string().startsWith("sth_").optional(),
});
export type UserInterruptEvent = z.infer<typeof UserInterruptEvent>;

export const UserCustomToolResultEvent = z.object({
  type: z.literal("user.custom_tool_result"),
  custom_tool_use_id: z.string(),
  content: z.array(ContentBlock),
});
export type UserCustomToolResultEvent = z.infer<typeof UserCustomToolResultEvent>;

export const UserToolConfirmationEvent = z.object({
  type: z.literal("user.tool_confirmation"),
  tool_use_id: z.string(),
  result: z.enum(["allow", "deny"]),
  deny_message: z.string().optional(),
});
export type UserToolConfirmationEvent = z.infer<typeof UserToolConfirmationEvent>;

export const UserDefineOutcomeEvent = z.object({
  type: z.literal("user.define_outcome"),
  description: z.string(),
  rubric: Rubric,
  max_iterations: z.number().int().min(1).max(20).default(3).optional(),
});
export type UserDefineOutcomeEvent = z.infer<typeof UserDefineOutcomeEvent>;

export const UserToolResultEvent = z.object({
  type: z.literal("user.tool_result"),
  // self-hosted only — payload varies
});
export type UserToolResultEvent = z.infer<typeof UserToolResultEvent>;

export const UserEvent = z.discriminatedUnion("type", [
  UserMessageEvent,
  UserInterruptEvent,
  UserCustomToolResultEvent,
  UserToolConfirmationEvent,
  UserDefineOutcomeEvent,
  UserToolResultEvent,
]);
export type UserEvent = z.infer<typeof UserEvent>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION EVENTS (agent → user)
// ─────────────────────────────────────────────────────────────────────────────

export const AgentMessageEvent = z.object({
  type: z.literal("agent.message"),
  content: z.array(ContentBlock),
  session_thread_id: z.string().startsWith("sth_").optional(),
});
export type AgentMessageEvent = z.infer<typeof AgentMessageEvent>;

export const AgentThinkingEvent = z.object({
  type: z.literal("agent.thinking"),
  thinking: z.string(),
});
export type AgentThinkingEvent = z.infer<typeof AgentThinkingEvent>;

export const AgentToolUseEvent = z.object({
  type: z.literal("agent.tool_use"),
  id: z.string(),
  name: z.string(),
  input: z.record(z.unknown()),
});
export type AgentToolUseEvent = z.infer<typeof AgentToolUseEvent>;

export const AgentToolResultEvent = z.object({
  type: z.literal("agent.tool_result"),
  tool_use_id: z.string(),
  content: z.array(ContentBlock),
});
export type AgentToolResultEvent = z.infer<typeof AgentToolResultEvent>;

export const AgentMCPToolUseEvent = z.object({
  type: z.literal("agent.mcp_tool_use"),
  id: z.string(),
  name: z.string(),
  mcp_server_name: z.string(),
  input: z.record(z.unknown()),
});
export type AgentMCPToolUseEvent = z.infer<typeof AgentMCPToolUseEvent>;

export const AgentMCPToolResultEvent = z.object({
  type: z.literal("agent.mcp_tool_result"),
  tool_use_id: z.string(),
  content: z.array(ContentBlock),
});
export type AgentMCPToolResultEvent = z.infer<typeof AgentMCPToolResultEvent>;

export const AgentCustomToolUseEvent = z.object({
  type: z.literal("agent.custom_tool_use"),
  id: z.string(),
  name: z.string(),
  input: z.record(z.unknown()),
});
export type AgentCustomToolUseEvent = z.infer<typeof AgentCustomToolUseEvent>;

export const AgentThreadContextCompactedEvent = z.object({
  type: z.literal("agent.thread_context_compacted"),
});
export type AgentThreadContextCompactedEvent = z.infer<typeof AgentThreadContextCompactedEvent>;

export const AgentThreadMessageReceivedEvent = z.object({
  type: z.literal("agent.thread_message_received"),
  from_session_thread_id: z.string().startsWith("sth_"),
  from_agent_name: z.string(),
  content: z.array(ContentBlock),
});
export type AgentThreadMessageReceivedEvent = z.infer<typeof AgentThreadMessageReceivedEvent>;

export const AgentThreadMessageSentEvent = z.object({
  type: z.literal("agent.thread_message_sent"),
  to_session_thread_id: z.string().startsWith("sth_"),
  to_agent_name: z.string(),
  content: z.array(ContentBlock),
});
export type AgentThreadMessageSentEvent = z.infer<typeof AgentThreadMessageSentEvent>;

export const AgentEvent = z.discriminatedUnion("type", [
  AgentMessageEvent,
  AgentThinkingEvent,
  AgentToolUseEvent,
  AgentToolResultEvent,
  AgentMCPToolUseEvent,
  AgentMCPToolResultEvent,
  AgentCustomToolUseEvent,
  AgentThreadContextCompactedEvent,
  AgentThreadMessageReceivedEvent,
  AgentThreadMessageSentEvent,
]);
export type AgentEvent = z.infer<typeof AgentEvent>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION LIFECYCLE EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SessionStatusRunningEvent = z.object({ type: z.literal("session.status_running") });
export const SessionStatusIdleEvent = z.object({
  type: z.literal("session.status_idle"),
  stop_reason: StopReason,
});
export const SessionStatusRescheduledEvent = z.object({ type: z.literal("session.status_rescheduled") });
export const SessionStatusTerminatedEvent = z.object({ type: z.literal("session.status_terminated") });
export const SessionDeletedEvent = z.object({ type: z.literal("session.deleted") });
export const SessionUpdatedEvent = z.object({
  type: z.literal("session.updated"),
  // partial session fields that changed
}).passthrough();
export const SessionErrorEvent = z.object({
  type: z.literal("session.error"),
  error: SessionError,
});
export const SessionThreadCreatedEvent = z.object({
  type: z.literal("session.thread_created"),
  session_thread_id: z.string().startsWith("sth_"),
  agent_name: z.string(),
});
export const SessionThreadStatusRunningEvent = z.object({
  type: z.literal("session.thread_status_running"),
  session_thread_id: z.string().startsWith("sth_"),
});
export const SessionThreadStatusIdleEvent = z.object({
  type: z.literal("session.thread_status_idle"),
  session_thread_id: z.string().startsWith("sth_"),
  agent_name: z.string(),
  stop_reason: StopReason,
});
export const SessionThreadStatusRescheduledEvent = z.object({
  type: z.literal("session.thread_status_rescheduled"),
  session_thread_id: z.string().startsWith("sth_"),
});
export const SessionThreadStatusTerminatedEvent = z.object({
  type: z.literal("session.thread_status_terminated"),
  session_thread_id: z.string().startsWith("sth_"),
});

export type SessionStatusRunningEvent = z.infer<typeof SessionStatusRunningEvent>;
export type SessionStatusIdleEvent = z.infer<typeof SessionStatusIdleEvent>;
export type SessionStatusRescheduledEvent = z.infer<typeof SessionStatusRescheduledEvent>;
export type SessionStatusTerminatedEvent = z.infer<typeof SessionStatusTerminatedEvent>;
export type SessionDeletedEvent = z.infer<typeof SessionDeletedEvent>;
export type SessionUpdatedEvent = z.infer<typeof SessionUpdatedEvent>;
export type SessionErrorEvent = z.infer<typeof SessionErrorEvent>;
export type SessionThreadCreatedEvent = z.infer<typeof SessionThreadCreatedEvent>;
export type SessionThreadStatusRunningEvent = z.infer<typeof SessionThreadStatusRunningEvent>;
export type SessionThreadStatusIdleEvent = z.infer<typeof SessionThreadStatusIdleEvent>;
export type SessionThreadStatusRescheduledEvent = z.infer<typeof SessionThreadStatusRescheduledEvent>;
export type SessionThreadStatusTerminatedEvent = z.infer<typeof SessionThreadStatusTerminatedEvent>;

export const SessionLifecycleEvent = z.discriminatedUnion("type", [
  SessionStatusRunningEvent,
  SessionStatusIdleEvent,
  SessionStatusRescheduledEvent,
  SessionStatusTerminatedEvent,
  SessionDeletedEvent,
  SessionUpdatedEvent,
  SessionErrorEvent,
  SessionThreadCreatedEvent,
  SessionThreadStatusRunningEvent,
  SessionThreadStatusIdleEvent,
  SessionThreadStatusRescheduledEvent,
  SessionThreadStatusTerminatedEvent,
]);
export type SessionLifecycleEvent = z.infer<typeof SessionLifecycleEvent>;

// ─────────────────────────────────────────────────────────────────────────────
// SPAN (OBSERVABILITY) EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export const SpanModelRequestStartEvent = z.object({ type: z.literal("span.model_request_start") });
export const SpanModelRequestEndEvent = z.object({
  type: z.literal("span.model_request_end"),
  model_usage: ModelUsage,
});
export const SpanOutcomeEvaluationStartEvent = z.object({
  type: z.literal("span.outcome_evaluation_start"),
  outcome_id: z.string().startsWith("outc_"),
  iteration: z.number().int().positive(),
});
export const SpanOutcomeEvaluationOngoingEvent = z.object({
  type: z.literal("span.outcome_evaluation_ongoing"),
  outcome_id: z.string().startsWith("outc_"),
});
export const SpanOutcomeEvaluationEndEvent = z.object({
  type: z.literal("span.outcome_evaluation_end"),
  outcome_evaluation_start_id: z.string(),
  outcome_id: z.string().startsWith("outc_"),
  result: OutcomeResult,
  explanation: z.string(),
  iteration: z.number().int().positive(),
  usage: ModelUsage,
});

export type SpanModelRequestStartEvent = z.infer<typeof SpanModelRequestStartEvent>;
export type SpanModelRequestEndEvent = z.infer<typeof SpanModelRequestEndEvent>;
export type SpanOutcomeEvaluationStartEvent = z.infer<typeof SpanOutcomeEvaluationStartEvent>;
export type SpanOutcomeEvaluationOngoingEvent = z.infer<typeof SpanOutcomeEvaluationOngoingEvent>;
export type SpanOutcomeEvaluationEndEvent = z.infer<typeof SpanOutcomeEvaluationEndEvent>;

export const SpanEvent = z.discriminatedUnion("type", [
  SpanModelRequestStartEvent,
  SpanModelRequestEndEvent,
  SpanOutcomeEvaluationStartEvent,
  SpanOutcomeEvaluationOngoingEvent,
  SpanOutcomeEvaluationEndEvent,
]);
export type SpanEvent = z.infer<typeof SpanEvent>;

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSITE EVENT UNION
// ─────────────────────────────────────────────────────────────────────────────

export const AnySessionEvent = z.union([UserEvent, AgentEvent, SessionLifecycleEvent, SpanEvent]);
export type AnySessionEvent = z.infer<typeof AnySessionEvent>;

// ─────────────────────────────────────────────────────────────────────────────
// SESSION EVENT ENVELOPE (SSE / stored)
// ─────────────────────────────────────────────────────────────────────────────

export const SessionEventEnvelope = z.object({
  id: z.string().startsWith("sevt_"),
  type: z.literal("session_event"),
  session_id: z.string().startsWith("sesn_"),
  session_thread_id: z.string().startsWith("sth_").nullable().optional(),
  event: AnySessionEvent,
  created_at: z.string().datetime(),
});
export type SessionEventEnvelope = z.infer<typeof SessionEventEnvelope>;

// ─────────────────────────────────────────────────────────────────────────────
// MEMORY STORE
// ─────────────────────────────────────────────────────────────────────────────

export const MEMORY_STORE_LIMITS = {
  maxStoresPerSession: 8,
  maxMemoriesPerStore: 2000,
  maxMemorySizeBytes: 100_000, // ~100 KB / ~25k tokens
} as const;

export const MemoryStore = z.object({
  id: z.string().startsWith("memstore_"),
  type: z.literal("memory_store"),
  name: z.string(),
  description: z.string().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  archived_at: z.string().datetime().nullable(),
});
export type MemoryStore = z.infer<typeof MemoryStore>;

export const Memory = z.object({
  id: z.string().startsWith("mem_"),
  type: z.literal("memory"),
  path: z.string(), // e.g. "/preferences/formatting.md"
  content: z.string().optional(), // present on retrieve, absent on list
  content_sha256: z.string(), // optimistic concurrency token
  memory_store_id: z.string().startsWith("memstore_"),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Memory = z.infer<typeof Memory>;

export const MemoryVersionOperation = z.enum(["create", "update", "delete", "redact"]);
export type MemoryVersionOperation = z.infer<typeof MemoryVersionOperation>;

export const MemoryVersion = z.object({
  id: z.string().startsWith("memver_"),
  type: z.literal("memory_version"),
  memory_id: z.string().startsWith("mem_"),
  memory_store_id: z.string().startsWith("memstore_"),
  operation: MemoryVersionOperation,
  content: z.string().nullable().optional(), // null if redacted
  content_sha256: z.string(),
  created_at: z.string().datetime(),
});
export type MemoryVersion = z.infer<typeof MemoryVersion>;

// ─────────────────────────────────────────────────────────────────────────────
// VAULT + CREDENTIALS
// ─────────────────────────────────────────────────────────────────────────────

export const VAULT_LIMITS = {
  maxCredentialsPerVault: 20,
} as const;

export const Vault = z.object({
  id: z.string().startsWith("vlt_"),
  type: z.literal("vault"),
  display_name: z.string(),
  metadata: z.record(z.string()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  archived_at: z.string().datetime().nullable(),
});
export type Vault = z.infer<typeof Vault>;

export const CredentialAuthType = z.enum(["mcp_oauth", "static_bearer"]);
export type CredentialAuthType = z.infer<typeof CredentialAuthType>;

export const VaultCredential = z.object({
  id: z.string().startsWith("vcrd_"),
  type: z.literal("vault_credential"),
  vault_id: z.string().startsWith("vlt_"),
  display_name: z.string().optional(),
  auth_type: CredentialAuthType,
  mcp_server_url: z.string().url(), // immutable after creation, one per URL per vault
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  archived_at: z.string().datetime().nullable(),
  // secret fields (access_token, refresh_token, etc.) are write-only, never returned
});
export type VaultCredential = z.infer<typeof VaultCredential>;

// Write-only credential payloads (never returned by API)

export const TokenEndpointAuthNone = z.object({ type: z.literal("none") });
export const TokenEndpointAuthClientSecretBasic = z.object({
  type: z.literal("client_secret_basic"),
  client_secret: z.string(),
});
export const TokenEndpointAuthClientSecretPost = z.object({
  type: z.literal("client_secret_post"),
  client_secret: z.string(),
});
export const TokenEndpointAuth = z.discriminatedUnion("type", [
  TokenEndpointAuthNone,
  TokenEndpointAuthClientSecretBasic,
  TokenEndpointAuthClientSecretPost,
]);
export type TokenEndpointAuth = z.infer<typeof TokenEndpointAuth>;

export const MCPOAuthRefresh = z.object({
  token_endpoint: z.string().url(),
  client_id: z.string(),
  scope: z.string().optional(),
  refresh_token: z.string(),
  token_endpoint_auth: TokenEndpointAuth,
});
export type MCPOAuthRefresh = z.infer<typeof MCPOAuthRefresh>;

export const MCPOAuthCreate = z.object({
  type: z.literal("mcp_oauth"),
  mcp_server_url: z.string().url(),
  access_token: z.string(),
  expires_at: z.string().datetime().optional(),
  refresh: MCPOAuthRefresh.optional(),
});
export type MCPOAuthCreate = z.infer<typeof MCPOAuthCreate>;

export const StaticBearerCreate = z.object({
  type: z.literal("static_bearer"),
  mcp_server_url: z.string().url(),
  token: z.string(),
});
export type StaticBearerCreate = z.infer<typeof StaticBearerCreate>;

export const CredentialCreateInput = z.discriminatedUnion("type", [MCPOAuthCreate, StaticBearerCreate]);
export type CredentialCreateInput = z.infer<typeof CredentialCreateInput>;

// Credential validation

export const MCPProbeHttpResponse = z.object({
  status_code: z.number().int(),
  content_type: z.string().optional(),
  body: z.string().optional(),
  body_truncated: z.boolean(),
});
export type MCPProbeHttpResponse = z.infer<typeof MCPProbeHttpResponse>;

export const VaultCredentialValidation = z.object({
  type: z.literal("vault_credential_validation"),
  credential_id: z.string().startsWith("vcrd_"),
  vault_id: z.string().startsWith("vlt_"),
  validated_at: z.string().datetime(),
  has_refresh_token: z.boolean(),
  status: z.enum(["valid", "invalid", "unknown"]),
  mcp_probe: z.object({
    method: z.string(),
    http_response: MCPProbeHttpResponse.optional(),
  }).optional(),
  refresh: z.object({
    status: z.enum(["no_refresh_token", "success", "failed"]),
    http_response: z.object({ status_code: z.number().int() }).optional(),
  }).optional(),
});
export type VaultCredentialValidation = z.infer<typeof VaultCredentialValidation>;

// ─────────────────────────────────────────────────────────────────────────────
// DREAM
// ─────────────────────────────────────────────────────────────────────────────

export const DreamStatus = z.enum(["pending", "running", "completed", "failed", "canceled"]);
export type DreamStatus = z.infer<typeof DreamStatus>;

export const DreamErrorType = z.enum([
  "timeout",
  "internal_error",
  "memory_store_org_limit_exceeded",
  "input_memory_store_too_large",
  "input_memory_store_unavailable",
  "input_session_unavailable",
]);
export type DreamErrorType = z.infer<typeof DreamErrorType>;

export const DreamError = z.object({
  type: DreamErrorType,
});
export type DreamError = z.infer<typeof DreamError>;

export const MemoryStoreInput = z.object({
  type: z.literal("memory_store"),
  memory_store_id: z.string().startsWith("memstore_"),
});
export type MemoryStoreInput = z.infer<typeof MemoryStoreInput>;

export const SessionsInput = z.object({
  type: z.literal("sessions"),
  session_ids: z.array(z.string().startsWith("sesn_")).min(1).max(100),
});
export type SessionsInput = z.infer<typeof SessionsInput>;

export const DreamInput = z.discriminatedUnion("type", [MemoryStoreInput, SessionsInput]);
export type DreamInput = z.infer<typeof DreamInput>;

export const MemoryStoreOutput = z.object({
  type: z.literal("memory_store"),
  memory_store_id: z.string().startsWith("memstore_"),
});
export type MemoryStoreOutput = z.infer<typeof MemoryStoreOutput>;

export const DreamOutput = MemoryStoreOutput;
export type DreamOutput = z.infer<typeof DreamOutput>;

export const Dream = z.object({
  id: z.string().startsWith("drm_"),
  type: z.literal("dream"),
  status: DreamStatus,
  inputs: z.array(DreamInput),
  outputs: z.array(DreamOutput),
  model: DreamModelRef,
  instructions: z.string().max(4096).nullable().optional(),
  session_id: z.string().startsWith("sesn_").nullable(),
  created_at: z.string().datetime(),
  ended_at: z.string().datetime().nullable(),
  archived_at: z.string().datetime().nullable(),
  usage: ModelUsage,
  error: DreamError.nullable(),
});
export type Dream = z.infer<typeof Dream>;

export const DreamCreateInput = z.object({
  inputs: z.array(DreamInput).min(1),
  outputs: z.array(DreamOutput).min(1),
  model: DreamModelRef,
  instructions: z.string().max(4096).optional(),
});
export type DreamCreateInput = z.infer<typeof DreamCreateInput>;

// ─────────────────────────────────────────────────────────────────────────────
// FILE (Files API)
// ─────────────────────────────────────────────────────────────────────────────

export const File = z.object({
  id: z.string().startsWith("file_"),
  filename: z.string(),
  size: z.number().int().nonnegative(),
  created_at: z.string().datetime(),
  scope_id: z.string().startsWith("sesn_").optional(), // session-scoped if present
});
export type File = z.infer<typeof File>;

// ─────────────────────────────────────────────────────────────────────────────
// WEBHOOK
// ─────────────────────────────────────────────────────────────────────────────

export const WebhookEventType = z.enum([
  "session.status_run_started",
  "session.status_idled",
  "session.status_rescheduled",
  "session.status_terminated",
  "session.thread_created",
  "session.thread_idled",
  "session.thread_terminated",
  "session.outcome_evaluation_ended",
  "vault.created",
  "vault.archived",
  "vault.deleted",
  "vault_credential.created",
  "vault_credential.archived",
  "vault_credential.deleted",
  "vault_credential.refresh_failed",
]);
export type WebhookEventType = z.infer<typeof WebhookEventType>;

export const WebhookEventEnvelope = z.object({
  type: z.literal("event"),
  id: z.string(),
  created_at: z.string().datetime(),
  data: z.object({
    type: WebhookEventType,
    id: z.string(),
    organization_id: z.string(),
    workspace_id: z.string(),
  }),
});
export type WebhookEventEnvelope = z.infer<typeof WebhookEventEnvelope>;

// ─────────────────────────────────────────────────────────────────────────────
// SELF-HOSTED: WORK ITEMS + QUEUE
// ─────────────────────────────────────────────────────────────────────────────

export const WorkItemState = z.enum(["queued", "claimed", "completed", "stopped"]);
export type WorkItemState = z.infer<typeof WorkItemState>;

export const WorkItem = z.object({
  id: z.string(),
  type: z.literal("work_item"),
  environment_id: z.string().startsWith("env_"),
  data: z.object({
    id: z.string().startsWith("sesn_"),
    type: z.literal("session"),
  }),
  state: WorkItemState,
});
export type WorkItem = z.infer<typeof WorkItem>;

export const WorkQueueStats = z.object({
  type: z.literal("work_queue_stats"),
  depth: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
  oldest_queued_at: z.string().datetime().nullable(),
  workers_polling: z.number().int().nonnegative(),
});
export type WorkQueueStats = z.infer<typeof WorkQueueStats>;

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATED LIST RESPONSE (generic)
// ─────────────────────────────────────────────────────────────────────────────

export const PaginatedList = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    has_more: z.boolean(),
    first_id: z.string().nullable(),
    last_id: z.string().nullable(),
  });
export type PaginatedList<T> = {
  data: T[];
  has_more: boolean;
  first_id: string | null;
  last_id: string | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// CONVENIENCE CONST MAPS
// ─────────────────────────────────────────────────────────────────────────────

/** All model IDs that support Dreams */
export const DREAM_CAPABLE_MODELS: readonly DreamModelId[] = [
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-sonnet-4-6",
] as const;

/** All user-sendable event types */
export const USER_EVENT_TYPES = [
  "user.message",
  "user.interrupt",
  "user.custom_tool_result",
  "user.tool_confirmation",
  "user.define_outcome",
  "user.tool_result",
] as const;

/** All agent-emitted event types */
export const AGENT_EVENT_TYPES = [
  "agent.message",
  "agent.thinking",
  "agent.tool_use",
  "agent.tool_result",
  "agent.mcp_tool_use",
  "agent.mcp_tool_result",
  "agent.custom_tool_use",
  "agent.thread_context_compacted",
  "agent.thread_message_received",
  "agent.thread_message_sent",
] as const;

/** All span / observability event types */
export const SPAN_EVENT_TYPES = [
  "span.model_request_start",
  "span.model_request_end",
  "span.outcome_evaluation_start",
  "span.outcome_evaluation_ongoing",
  "span.outcome_evaluation_end",
] as const;
