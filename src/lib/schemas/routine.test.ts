/**
 * Tests for src/lib/schemas/routine.ts — the typed data model for
 * claude.ai Code Routines (remote triggers).
 *
 * Outcome OR1: schema parses every documented routine option and
 * rejects shapes that would be rejected by the live API, so callers
 * can construct create/update bodies with compile-time + runtime
 * confidence instead of free-form objects.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite src/lib/schemas/crawl-config.test.ts
 */
import {
  AllowedToolSchema,
  CronScheduleSchema,
  EndedReasonSchema,
  EnvironmentKindSchema,
  McpConnectionSchema,
  ModelIdSchema,
  RoutineCreateBodySchema,
  RoutineListResponseSchema,
  RoutineRecordSchema,
  RoutineUpdateBodySchema,
  RunOnceScheduleSchema,
  parseRoutineCreateBody,
  parseRoutineListResponse,
  parseRoutineUpdateBody,
} from "./routine.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("routine schema:");

// -- enums -----------------------------------------------------------------

check("ModelIdSchema accepts the three documented model IDs", () => {
  for (const m of [
    "claude-opus-4-7",
    "claude-sonnet-4-6",
    "claude-haiku-4-5-20251001",
  ]) {
    ModelIdSchema.parse(m);
  }
});

check("ModelIdSchema rejects unknown model ids", () => {
  if (ModelIdSchema.safeParse("gpt-4").success) throw new Error("accepted");
});

check("AllowedToolSchema covers core tools", () => {
  for (const t of [
    "Bash",
    "Read",
    "Write",
    "Edit",
    "Glob",
    "Grep",
    "WebFetch",
    "TaskCreate",
  ]) {
    AllowedToolSchema.parse(t);
  }
});

check("AllowedToolSchema rejects unknown tools", () => {
  if (AllowedToolSchema.safeParse("DropTable").success)
    throw new Error("accepted");
});

check("EnvironmentKindSchema has bridge + anthropic_cloud", () => {
  EnvironmentKindSchema.parse("bridge");
  EnvironmentKindSchema.parse("anthropic_cloud");
  if (EnvironmentKindSchema.safeParse("local").success)
    throw new Error("accepted");
});

check("EndedReasonSchema accepts run_once_fired", () => {
  EndedReasonSchema.parse("run_once_fired");
});

// -- MCP -------------------------------------------------------------------

check("McpConnectionSchema accepts a well-formed connection", () => {
  McpConnectionSchema.parse({
    connector_uuid: "cc400e6c-13c1-496a-b17f-38e7bccf4e56",
    name: "Slack",
    url: "https://mcp.slack.com/mcp",
  });
});

check("McpConnectionSchema rejects names with dots or spaces", () => {
  const bad = {
    connector_uuid: "cc400e6c-13c1-496a-b17f-38e7bccf4e56",
    name: "google.calendar",
    url: "https://calendarmcp.googleapis.com/mcp/v1",
  };
  if (McpConnectionSchema.safeParse(bad).success) throw new Error("accepted");
});

check("McpConnectionSchema rejects non-url url", () => {
  const bad = {
    connector_uuid: "cc400e6c-13c1-496a-b17f-38e7bccf4e56",
    name: "Slack",
    url: "not-a-url",
  };
  if (McpConnectionSchema.safeParse(bad).success) throw new Error("accepted");
});

// -- schedule one-of -------------------------------------------------------

check("CronScheduleSchema accepts a 5-field cron expression", () => {
  CronScheduleSchema.parse({ cron_expression: "0 9 * * 1-5" });
});

check("RunOnceScheduleSchema accepts an RFC3339 Z timestamp", () => {
  RunOnceScheduleSchema.parse({ run_once_at: "2026-12-01T09:00:00Z" });
});

// -- create body -----------------------------------------------------------

function validCreateBody(): unknown {
  return {
    name: "demo",
    cron_expression: "0 9 * * 1-5",
    enabled: true,
    job_config: {
      ccr: {
        environment_id: "env_01StJ1RxquC16d9uxBoANG6R",
        session_context: {
          model: "claude-sonnet-4-6",
          sources: [
            {
              git_repository: {
                url: "https://github.com/subagentceo/knowledge-engineering",
              },
            },
          ],
          allowed_tools: ["Bash", "Read", "Write"],
        },
        events: [
          {
            data: {
              uuid: "11111111-1111-4111-8111-111111111111",
              session_id: "",
              type: "user",
              parent_tool_use_id: null,
              message: { content: "hello", role: "user" },
            },
          },
        ],
      },
    },
  };
}

check("RoutineCreateBodySchema accepts a canonical cron routine", () => {
  RoutineCreateBodySchema.parse(validCreateBody());
});

check("RoutineCreateBodySchema accepts a one-shot run_once_at routine", () => {
  const body = validCreateBody() as Record<string, unknown>;
  delete body.cron_expression;
  body.run_once_at = "2026-12-01T09:00:00Z";
  RoutineCreateBodySchema.parse(body);
});

check("RoutineCreateBodySchema rejects when neither schedule is set", () => {
  const body = validCreateBody() as Record<string, unknown>;
  delete body.cron_expression;
  if (RoutineCreateBodySchema.safeParse(body).success)
    throw new Error("accepted");
});

check("RoutineCreateBodySchema rejects when BOTH schedules are set", () => {
  const body = validCreateBody() as Record<string, unknown>;
  body.run_once_at = "2026-12-01T09:00:00Z";
  if (RoutineCreateBodySchema.safeParse(body).success)
    throw new Error("accepted");
});

check("RoutineCreateBodySchema requires at least one allowed_tool", () => {
  const body = validCreateBody() as Record<string, unknown>;
  const jc = body.job_config as Record<string, Record<string, Record<string, unknown>>>;
  (jc.ccr.session_context as Record<string, unknown>).allowed_tools = [];
  if (RoutineCreateBodySchema.safeParse(body).success)
    throw new Error("accepted");
});

check("parseRoutineCreateBody round-trips via JSON", () => {
  const body = parseRoutineCreateBody(JSON.stringify(validCreateBody()));
  if (body.name !== "demo") throw new Error("name");
});

// -- update body -----------------------------------------------------------

check("RoutineUpdateBodySchema accepts an empty partial update", () => {
  RoutineUpdateBodySchema.parse({});
});

check("RoutineUpdateBodySchema accepts clear_mcp_connections", () => {
  RoutineUpdateBodySchema.parse({ clear_mcp_connections: true });
});

check("parseRoutineUpdateBody parses enable toggle", () => {
  const r = parseRoutineUpdateBody(JSON.stringify({ enabled: false }));
  if (r.enabled !== false) throw new Error("enabled");
});

// -- list response ---------------------------------------------------------

check("RoutineListResponseSchema accepts an empty list", () => {
  RoutineListResponseSchema.parse({ data: [], has_more: false });
});

check("parseRoutineListResponse handles a single record", () => {
  const record = {
    trigger_id: "trg_abc123",
    name: "demo",
    cron_expression: "0 9 * * 1-5",
    enabled: true,
    job_config: (validCreateBody() as { job_config: unknown }).job_config,
  };
  const r = parseRoutineListResponse(
    JSON.stringify({ data: [record], has_more: false }),
  );
  if (r.data.length !== 1) throw new Error("length");
  if (r.data[0]!.trigger_id !== "trg_abc123") throw new Error("trigger_id");
});

check("RoutineRecordSchema tolerates ended_reason on terminal routines", () => {
  RoutineRecordSchema.parse({
    trigger_id: "trg_abc123",
    name: "demo",
    run_once_at: "2026-12-01T09:00:00Z",
    enabled: false,
    ended_reason: "run_once_fired",
    job_config: (validCreateBody() as { job_config: unknown }).job_config,
  });
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
