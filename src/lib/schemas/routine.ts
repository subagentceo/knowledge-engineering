/**
 * zod schema for claude.ai Code Routines (a.k.a. remote triggers).
 *
 * A Routine is a recurring or one-shot remote Claude Code session
 * spawned by the claude.ai control plane. Each fire creates an isolated
 * CCR (Claude Code Remote) environment with its own git checkout, tool
 * surface, and optional MCP connections.
 *
 * This schema is the canonical typed data model for the routine create/
 * update body shape that POST /v1/code/triggers accepts. Authoritative
 * source: the RemoteTrigger tool's create body documented in the
 * bundled `schedule` skill, cross-referenced with empirical responses
 * from GET /v1/code/triggers.
 *
 * Enums collect every documented configurable option so callers can
 * type-narrow against valid values rather than free-form strings.
 *
 * @cite seeds/posture/session-start.xml (OAuth-only invariant; the
 *       sessions spawned by routines inherit the same posture)
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/**
 * Models available for the spawned CCR session. Schedule skill default
 * is `claude-sonnet-4-6`. Opus is selectable when the routine warrants
 * a stronger model; Haiku for cheap/fast scheduled checks.
 *
 * Mirrors the model IDs in the environment block of CLAUDE sessions
 * (Opus 4.7 / Sonnet 4.6 / Haiku 4.5). Update when Anthropic releases
 * a new generation.
 */
export const ModelIdSchema = z.enum([
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001",
]);
export type ModelId = z.infer<typeof ModelIdSchema>;

/**
 * Tools that the remote session is allowed to call. The CCR runtime
 * gates tool invocations against this allowlist; tools absent here
 * return a permission error at call time. Use the smallest set that
 * lets the routine complete its job.
 */
export const AllowedToolSchema = z.enum([
  "Bash",
  "Read",
  "Write",
  "Edit",
  "MultiEdit",
  "Glob",
  "Grep",
  "WebFetch",
  "WebSearch",
  "NotebookEdit",
  "TodoWrite",
  "Task",
  "TaskCreate",
  "TaskGet",
  "TaskList",
  "TaskOutput",
  "TaskStop",
  "TaskUpdate",
]);
export type AllowedTool = z.infer<typeof AllowedToolSchema>;

/**
 * CCR environment kind. `bridge` runs on a developer's local machine
 * via the Claude Code bridge process. `anthropic_cloud` runs in
 * Anthropic-managed cloud infrastructure.
 *
 * The kind is informational on the routine body (the `environment_id`
 * is what binds the routine to an environment); the enum is included
 * so callers selecting an environment from a list can filter by kind.
 */
export const EnvironmentKindSchema = z.enum(["bridge", "anthropic_cloud"]);
export type EnvironmentKind = z.infer<typeof EnvironmentKindSchema>;

/**
 * Reasons the runtime reports when a routine has stopped firing.
 * Observed values from list responses; `run_once_fired` is the
 * documented terminal state for one-shot routines that have run.
 */
export const EndedReasonSchema = z.enum([
  "run_once_fired",
  "disabled_by_user",
  "manual_stop",
]);
export type EndedReason = z.infer<typeof EndedReasonSchema>;

/**
 * Event types in the seed `events` array. Today routines accept a
 * single `user` event whose `message.content` is the initial prompt.
 * Future event types (system, tool_result preload) would land here.
 */
export const EventTypeSchema = z.enum(["user"]);
export type EventType = z.infer<typeof EventTypeSchema>;

/**
 * Message role inside a routine seed event. Mirrors the role taxonomy
 * the underlying claude.ai message schema uses.
 */
export const MessageRoleSchema = z.enum(["user", "assistant", "system"]);
export type MessageRole = z.infer<typeof MessageRoleSchema>;

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------

/**
 * A git source attached to the spawned session. The CCR clones each
 * source into the working tree before invoking the prompt. Multiple
 * sources are allowed but the routine's primary working repo is the
 * first one.
 */
export const GitRepositorySourceSchema = z.object({
  git_repository: z.object({
    url: z.url(),
    /** Optional branch override; defaults to the repo's default branch. */
    branch: z.string().min(1).optional(),
  }),
});
export type GitRepositorySource = z.infer<typeof GitRepositorySourceSchema>;

/**
 * Seed event for the spawned session. The `events` array is replayed
 * before the agent starts — today only a single `user` event holding
 * the initial prompt is used.
 */
export const SeedEventSchema = z.object({
  data: z.object({
    /** Fresh lowercase v4 UUID; must be unique per event. */
    uuid: z.uuid(),
    /** Empty string at create time; populated by the runtime. */
    session_id: z.string(),
    type: EventTypeSchema,
    parent_tool_use_id: z.null(),
    message: z.object({
      content: z.string().min(1),
      role: MessageRoleSchema,
    }),
  }),
});
export type SeedEvent = z.infer<typeof SeedEventSchema>;

/**
 * Session context for the CCR. This is where the routine's "what
 * resources does the agent see" answer lives: model choice, git
 * sources to clone, and the tool allowlist.
 */
export const SessionContextSchema = z.object({
  model: ModelIdSchema,
  sources: z.array(GitRepositorySourceSchema).min(1),
  allowed_tools: z.array(AllowedToolSchema).min(1),
});
export type SessionContext = z.infer<typeof SessionContextSchema>;

/**
 * The CCR job config — the spawnable specification. `environment_id`
 * is the foreign key into the user's available environments (bridge or
 * anthropic_cloud).
 */
export const CcrJobConfigSchema = z.object({
  environment_id: z.string().min(1),
  session_context: SessionContextSchema,
  events: z.array(SeedEventSchema).min(1),
});
export type CcrJobConfig = z.infer<typeof CcrJobConfigSchema>;

export const JobConfigSchema = z.object({
  ccr: CcrJobConfigSchema,
});
export type JobConfig = z.infer<typeof JobConfigSchema>;

/**
 * An MCP server attached to the routine. `connector_uuid` references a
 * claude.ai connector the user has installed; `name` must match
 * `^[a-zA-Z0-9_-]+$` (dots and spaces are rejected by the API).
 */
export const McpConnectionSchema = z.object({
  connector_uuid: z.uuid(),
  name: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9_-]+$/, "MCP name must be [a-zA-Z0-9_-]"),
  url: z.url(),
});
export type McpConnection = z.infer<typeof McpConnectionSchema>;

// ---------------------------------------------------------------------------
// Schedule (one-of: cron_expression | run_once_at)
// ---------------------------------------------------------------------------

/**
 * Cron schedule. Five-field UTC cron. Minimum interval is 1 hour;
 * sub-hour patterns (`*\/30 * * * *` etc.) are rejected by the API.
 */
export const CronScheduleSchema = z.object({
  cron_expression: z.string().min(1),
  run_once_at: z.undefined().optional(),
});

/**
 * One-shot schedule. RFC3339 UTC timestamp; must be in the future at
 * create time. After firing, the routine auto-disables and reports
 * `ended_reason: "run_once_fired"`.
 */
export const RunOnceScheduleSchema = z.object({
  run_once_at: z.iso.datetime({ offset: false }),
  cron_expression: z.undefined().optional(),
});

export const ScheduleSchema = z.union([
  CronScheduleSchema,
  RunOnceScheduleSchema,
]);
export type Schedule = z.infer<typeof ScheduleSchema>;

// ---------------------------------------------------------------------------
// Create / Update bodies
// ---------------------------------------------------------------------------

/**
 * Body for POST /v1/code/triggers (create). Exactly one of
 * `cron_expression` or `run_once_at` is required; this schema enforces
 * that via a `superRefine`.
 */
export const RoutineCreateBodySchema = z
  .object({
    name: z.string().min(1),
    cron_expression: z.string().min(1).optional(),
    run_once_at: z.iso.datetime({ offset: false }).optional(),
    enabled: z.boolean().default(true),
    job_config: JobConfigSchema,
    mcp_connections: z.array(McpConnectionSchema).optional(),
  })
  .superRefine((val, ctx) => {
    const hasCron = typeof val.cron_expression === "string";
    const hasOnce = typeof val.run_once_at === "string";
    if (hasCron === hasOnce) {
      ctx.addIssue({
        code: "custom",
        message:
          "exactly one of cron_expression or run_once_at must be set",
        path: ["cron_expression"],
      });
    }
  });
export type RoutineCreateBody = z.infer<typeof RoutineCreateBodySchema>;

/**
 * Body for POST /v1/code/triggers/{id} (partial update). All fields
 * optional. `clear_mcp_connections: true` removes all attached MCP
 * connectors in one call.
 */
export const RoutineUpdateBodySchema = z.object({
  name: z.string().min(1).optional(),
  cron_expression: z.string().min(1).optional(),
  run_once_at: z.iso.datetime({ offset: false }).optional(),
  enabled: z.boolean().optional(),
  job_config: JobConfigSchema.optional(),
  mcp_connections: z.array(McpConnectionSchema).optional(),
  clear_mcp_connections: z.boolean().optional(),
});
export type RoutineUpdateBody = z.infer<typeof RoutineUpdateBodySchema>;

// ---------------------------------------------------------------------------
// Server-side response shape (GET list/get)
// ---------------------------------------------------------------------------

/**
 * Routine as the server returns it. Includes the server-assigned
 * `trigger_id`, audit timestamps, and `ended_reason` for routines that
 * have stopped firing. Fields here are the union of what GET responses
 * have been observed to include.
 */
export const RoutineRecordSchema = z.object({
  trigger_id: z.string().min(1),
  name: z.string().min(1),
  cron_expression: z.string().optional(),
  run_once_at: z.string().optional(),
  enabled: z.boolean(),
  ended_reason: EndedReasonSchema.optional(),
  job_config: JobConfigSchema,
  mcp_connections: z.array(McpConnectionSchema).optional(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  next_run_at: z.iso.datetime({ offset: true }).optional(),
  last_run_at: z.iso.datetime({ offset: true }).optional(),
});
export type RoutineRecord = z.infer<typeof RoutineRecordSchema>;

export const RoutineListResponseSchema = z.object({
  data: z.array(RoutineRecordSchema),
  has_more: z.boolean(),
});
export type RoutineListResponse = z.infer<typeof RoutineListResponseSchema>;

// ---------------------------------------------------------------------------
// Parsers (mirror crawl-config.ts ergonomics)
// ---------------------------------------------------------------------------

export function parseRoutineCreateBody(body: string): RoutineCreateBody {
  return RoutineCreateBodySchema.parse(JSON.parse(body));
}

export function parseRoutineUpdateBody(body: string): RoutineUpdateBody {
  return RoutineUpdateBodySchema.parse(JSON.parse(body));
}

export function parseRoutineListResponse(body: string): RoutineListResponse {
  return RoutineListResponseSchema.parse(JSON.parse(body));
}
