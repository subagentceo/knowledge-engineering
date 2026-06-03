# mailbox-mcp — design spec

refs:
  - src/mcp/lanes/telemetry.ts              # JSONL append pattern + McpServer.tool registration shape
  - src/mcp/bridge-server.ts                # lane registration pattern (registerX(server))
  - src/mcp/bridge-utils.ts                 # jsonResult helper
  - apps/analytics-dashboard/cost/src/claude-cost-poller.ts  # AgentSessionCost / COSTS_JSONL
  - .claude/skills/llms-crud/managed-agents-models.ts        # OutcomeEvaluation, SessionEventEnvelope IDs
  - docs/architecture/knowledge-engineering-erd.md           # TASK_ENVELOPE / VERIFY_VERDICT shape
  - vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md

---

## tl;dr

agent-to-agent communication today flows through the SDK's `session_thread` + `agent.thread_message_sent/received` events — synchronous, within a session.
cross-session, cross-agent communication has no canonical channel.
`mailbox-mcp` fills that gap: a JSONL-backed MCP server that lets any agent send typed messages to any other agent, carry outcomes/tasks/test-results/cost-records as structured payloads, and serve as a version-controllable audit log for agent progress.

storage is `.claude/mailbox/{agent_id}.jsonl` — same pattern as `COSTS_JSONL` in the cost poller.
no external db, no redis, no broker. files are git-committable.

---

## design rationale

### actor model / erlang mailbox mapping

| erlang concept          | mailbox-mcp equivalent                                                      |
|-------------------------|-----------------------------------------------------------------------------|
| process pid             | `agent_id` (string, prefixed `agent_` per managed-agents-models.ts)        |
| mailbox (per-process)   | `.claude/mailbox/{agent_id}.jsonl`                                          |
| `send(Pid, Msg)`        | `mailbox_send` tool                                                         |
| `receive`               | `mailbox_recv` (FIFO, marks in-flight, returns one message)                 |
| selective receive       | `mailbox_peek` with `type` filter                                           |
| monitor / ack           | `ack_required` flag + `mailbox_ack`                                         |
| broadcast `{all, Msg}`  | `to: "broadcast"` — written to a shared `_broadcast.jsonl` spool            |
| message passing atomicity | append-only JSONL — each line is an atomic record, never mutated          |

### why JSONL not sqlite / redis

- zero-dependency: `node:fs` + `node:readline` only (same as telemetry lane)
- version-controllable: each JSONL file is a append-only log; `git diff` shows new messages
- inspect-without-tooling: `tail -f .claude/mailbox/agent_verifier.jsonl`
- same operational model as `COSTS_JSONL` — one proven pattern, no new infra surface

### mcp tool pattern (from telemetry.ts)

```ts
server.tool(
  "tool_name",
  "description",
  { /* zod shape for args */ },
  async (args) => { return jsonResult({ ... }); }
)
```

all 7 mailbox tools follow this exact shape, registered via `registerMailbox(server: McpServer)`.

---

<deliverables>
  <file>src/mcp/lanes/mailbox.ts</file>           <!-- lane implementation -->
  <file>src/mcp/lanes/mailbox.test.ts</file>       <!-- cite-headed tests -->
  <file>src/mcp/mailbox-server.ts</file>           <!-- standalone stdio server (optional) -->
  <!-- bridge-server.ts: add registerMailbox(server) -->
</deliverables>

<constraints>
  - no external db; storage = JSONL per agent under MAILBOX_DIR env var
  - MAILBOX_DIR defaults to .claude/mailbox (relative to cwd, same posture as COSTS_JSONL)
  - broadcast messages spool to _broadcast.jsonl; mailbox_recv returns broadcast + agent-specific
  - mailbox_recv marks messages in-flight by setting status="in_flight" in the line (rewrite last line trick is NOT used — append a status-update line instead, preserving append-only invariant)
  - ttl_ms: mailbox_recv and mailbox_peek silently skip expired messages; mailbox_purge_expired can be called manually
  - ack_required=false messages auto-complete on recv
  - thread_id groups messages for mailbox_thread; correlates with SDK sth_ IDs
  - payload generic <T> is serialised as JSON; Zod schemas below are the canonical payload types
  - all tool names prefixed mailbox_ to avoid collision with other lanes
  - cite header in every test file: @cite docs/architecture/mailbox-mcp-design.md
</constraints>

---

## zod schemas

```ts
// @cite docs/architecture/mailbox-mcp-design.md
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts (AgentSessionCost embed)
// @cite .claude/skills/llms-crud/managed-agents-models.ts (OutcomeEvaluation, ID prefixes)
import { z } from "zod";

// ─── envelope ────────────────────────────────────────────────────────────────

export const MessageType = z.enum([
  "outcome",
  "task",
  "test_result",
  "cost_record",
  "artifact",
  "ping",
]);
export type MessageType = z.infer<typeof MessageType>;

export const MessageStatus = z.enum([
  "pending",    // written, not yet recv'd
  "in_flight",  // recv'd, ack not yet sent
  "acked",      // acked by recipient
  "expired",    // ttl_ms elapsed
  "failed",     // terminal error
]);
export type MessageStatus = z.infer<typeof MessageStatus>;

export const MailboxMessage = <T extends z.ZodTypeAny>(payloadSchema: T) =>
  z.object({
    id: z.string(),                             // "msg_" + crypto.randomUUID()
    from: z.string(),                           // agent_id (agent_ prefix)
    to: z.union([z.string(), z.literal("broadcast")]),
    thread_id: z.string().optional(),           // correlate with sth_ IDs
    timestamp: z.string().datetime(),           // ISO 8601
    type: MessageType,
    payload: payloadSchema,
    ack_required: z.boolean().default(false),
    ttl_ms: z.number().int().positive().optional(),
    status: MessageStatus.default("pending"),
  });

export type MailboxMessage<T> = {
  id: string;
  from: string;
  to: string | "broadcast";
  thread_id?: string;
  timestamp: string;
  type: z.infer<typeof MessageType>;
  payload: T;
  ack_required: boolean;
  ttl_ms?: number;
  status: z.infer<typeof MessageStatus>;
};

// ─── outcome payload ──────────────────────────────────────────────────────────
// mirrors OutcomeEvaluation from managed-agents-models.ts; adds description + evidence

export const OutcomeStatus = z.enum(["pending", "achieved", "failed"]);
export type OutcomeStatus = z.infer<typeof OutcomeStatus>;

export const EvidenceItem = z.union([
  z.string(),                                   // file path
  z.object({                                    // metric snapshot
    metric: z.string(),
    value: z.number(),
    unit: z.string().optional(),
    at: z.string().datetime(),
  }),
]);
export type EvidenceItem = z.infer<typeof EvidenceItem>;

export const OutcomePayload = z.object({
  outcome_id: z.string().startsWith("outc_"),   // managed-agents ID
  description: z.string(),
  status: OutcomeStatus,
  evidence: z.array(EvidenceItem).default([]),
});
export type OutcomePayload = z.infer<typeof OutcomePayload>;

// ─── task payload ─────────────────────────────────────────────────────────────
// mirrors SDK TaskCreate; parent_task_id enables DAG (TASK_ENVELOPE.blockedBy pattern)

export const TaskStatus = z.enum([
  "pending",
  "in_progress",
  "blocked",
  "completed",
  "failed",
]);
export type TaskStatus = z.infer<typeof TaskStatus>;

export const TaskPriority = z.enum(["low", "medium", "high", "critical"]);
export type TaskPriority = z.infer<typeof TaskPriority>;

export const TaskPayload = z.object({
  task_id: z.string(),                          // caller-assigned, e.g. "task_" + uuid
  title: z.string().max(255),
  description: z.string().optional(),
  status: TaskStatus.default("pending"),
  priority: TaskPriority.default("medium"),
  parent_task_id: z.string().optional(),        // DAG edge
  assignee_agent_id: z.string().optional(),
  due_at: z.string().datetime().optional(),
});
export type TaskPayload = z.infer<typeof TaskPayload>;

// ─── test result payload ──────────────────────────────────────────────────────

export const TestResultPayload = z.object({
  test_file: z.string(),                        // repo-relative path
  passed: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  skipped: z.number().int().nonnegative(),
  duration_ms: z.number().nonnegative(),
  cite: z.string().optional(),                  // @cite source for the test file
  runner: z.enum(["vitest", "jest", "node", "custom"]).optional(),
  error_summary: z.string().optional(),
});
export type TestResultPayload = z.infer<typeof TestResultPayload>;

// ─── cost record payload ──────────────────────────────────────────────────────
// embeds AgentSessionCost fields inline (no import cycle — copy shape, not reference)

export const CostRecordPayload = z.object({
  session_id: z.string(),
  model: z.string(),
  workspace_id: z.string().optional(),
  service_tier: z.enum(["standard", "batch", "priority", "flex"]).optional(),
  context_window: z.enum(["0-200k", "200k-1M"]).optional(),
  uncached_input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  cache_read_input_tokens: z.number().int().nonnegative(),
  cache_creation_input_tokens: z.number().int().nonnegative(),
  cost_usd: z.number().nonnegative(),
  pr_number: z.number().int().optional(),
  branch: z.string().optional(),
});
export type CostRecordPayload = z.infer<typeof CostRecordPayload>;

// ─── artifact payload ─────────────────────────────────────────────────────────

export const ArtifactType = z.enum([
  "prompt",
  "eval",
  "schema",
  "cost_report",
  "design_doc",
  "rubric",
]);
export type ArtifactType = z.infer<typeof ArtifactType>;

export const ArtifactPayload = z.object({
  artifact_type: ArtifactType,
  path: z.string(),                             // repo-relative path
  sha256: z.string().length(64),                // hex SHA-256 of file content
  size_bytes: z.number().int().nonnegative(),
  description: z.string().optional(),
  mime_type: z.string().optional(),
});
export type ArtifactPayload = z.infer<typeof ArtifactPayload>;

// ─── concrete message types ───────────────────────────────────────────────────

export const OutcomeMessage   = MailboxMessage(OutcomePayload);
export const TaskMessage      = MailboxMessage(TaskPayload);
export const TestResultMessage = MailboxMessage(TestResultPayload);
export const CostMessage      = MailboxMessage(CostRecordPayload);
export const ArtifactMessage  = MailboxMessage(ArtifactPayload);
export const PingMessage      = MailboxMessage(z.object({ nonce: z.string().optional() }));

// discriminated union for deserialisation
export const AnyMailboxMessage = z.union([
  OutcomeMessage,
  TaskMessage,
  TestResultMessage,
  CostMessage,
  ArtifactMessage,
  PingMessage,
]);
export type AnyMailboxMessage = z.infer<typeof AnyMailboxMessage>;
```

---

## mcp tools (7 tools)

```yaml
tools:
  mailbox_send:
    description: >
      Enqueue a typed message to a named agent or to "broadcast".
      Writes one JSON line to .claude/mailbox/{to}.jsonl (or _broadcast.jsonl).
    args:
      from:         string  # agent_id of sender
      to:           string  # agent_id or "broadcast"
      type:         MessageType
      payload:      object  # validated against type-specific Zod schema
      thread_id:    string? # correlate with session thread
      ack_required: boolean # default false
      ttl_ms:       number? # expiry in ms from timestamp
    returns:
      message_id:   string  # "msg_" + uuid
      written_to:   string  # path of JSONL file

  mailbox_recv:
    description: >
      Pop the next pending (non-expired) message for this agent.
      FIFO across senders. Checks agent-specific JSONL then _broadcast.jsonl.
      Marks message in-flight (appends status-update line).
      ack_required=false messages auto-complete immediately.
    args:
      agent_id:     string  # which agent's mailbox to read
      type_filter:  MessageType? # selective receive — only messages of this type
    returns:
      message:      AnyMailboxMessage | null  # null if mailbox empty

  mailbox_peek:
    description: >
      List pending messages without consuming them.
      Returns up to `limit` messages; does not mutate state.
    args:
      agent_id:     string
      limit:        number  # default 20, max 100
      type_filter:  MessageType?
    returns:
      messages:     AnyMailboxMessage[]
      total_pending: number

  mailbox_ack:
    description: >
      Acknowledge a message as completed or failed.
      Appends a status-update line to the JSONL. Idempotent.
    args:
      agent_id:     string
      message_id:   string
      status:       "acked" | "failed"
      note:         string? # optional completion note
    returns:
      acked:        boolean
      message_id:   string

  mailbox_thread:
    description: >
      Return all messages in a thread (by thread_id), across all agents.
      Scans all JSONL files under MAILBOX_DIR. Sorted by timestamp.
    args:
      thread_id:    string
      include_broadcast: boolean # default true
    returns:
      messages:     AnyMailboxMessage[]
      agent_count:  number  # how many agents participated

  mailbox_outcome:
    description: >
      Shorthand: send an OutcomePayload and auto-ack on receipt.
      Sets ack_required=false, type="outcome".
      Designed for agent→orchestrator outcome reporting.
    args:
      from:         string  # agent_id of sender
      to:           string  # orchestrator agent_id or "broadcast"
      outcome_id:   string  # outc_ prefix
      description:  string
      status:       "pending" | "achieved" | "failed"
      evidence:     EvidenceItem[]  # file paths or metric snapshots
      thread_id:    string?
    returns:
      message_id:   string

  mailbox_task_sync:
    description: >
      Sync a TaskPayload to the shared task ledger (TASK_LEDGER_JSONL).
      Validates against TaskPayload Zod schema. Upserts by task_id.
      Also enqueues a task message to the assignee_agent_id if set.
    args:
      from:         string
      task_id:      string
      title:        string
      description:  string?
      status:       TaskStatus
      priority:     TaskPriority
      parent_task_id: string?
      assignee_agent_id: string?
      due_at:       string?  # ISO 8601
    returns:
      task_id:      string
      synced:       boolean
      message_id:   string?  # set if assignee notified
```

---

## storage layout

```
.claude/mailbox/
  agent_orchestrator.jsonl     # messages TO orchestrator
  agent_npm-research.jsonl     # messages TO npm-research
  agent_verifier.jsonl         # messages TO verifier
  agent_crawl-curator.jsonl    # messages TO crawl-curator
  _broadcast.jsonl             # broadcast messages (all agents receive)
  _task_ledger.jsonl           # canonical task ledger (mailbox_task_sync)
```

env vars:
- `MAILBOX_DIR` — default `.claude/mailbox` (relative to cwd, created on first write)
- `TASK_LEDGER_JSONL` — default `${MAILBOX_DIR}/_task_ledger.jsonl`

JSONL invariants:
- each line = one JSON object = one `AnyMailboxMessage`
- status updates are appended as additional lines (append-only; no line mutation)
- last status line for a given `message_id` wins during read
- expired messages (ttl_ms) are skipped silently during recv/peek

---

## integration points

| existing pattern | mailbox integration |
|---|---|
| `telemetry_record_cost` in telemetry.ts | after recording, call `mailbox_outcome` with `cost_record` payload to notify orchestrator |
| `COSTS_JSONL` in cost poller | `CostRecordPayload` mirrors `AgentSessionCost` fields exactly; poller can emit mailbox messages |
| `OutcomeEvaluation` in managed-agents-models.ts | `OutcomePayload.outcome_id` uses same `outc_` prefix; `mailbox_outcome` wraps `user.define_outcome` flow |
| `TASK_ENVELOPE.blockedBy` DAG in ERD | `TaskPayload.parent_task_id` + `mailbox_task_sync` replaces ad-hoc task tracking |
| session thread message events | `thread_id` in `MailboxMessage` correlates with `sth_` IDs from SDK |
| bridge-server.ts lane registration | `registerMailbox(server)` added as lane 9 |

---

## implementation sketch (lane shape)

```ts
// src/mcp/lanes/mailbox.ts
// @cite docs/architecture/mailbox-mcp-design.md
// @cite src/mcp/lanes/telemetry.ts
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts

import * as fs from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonResult } from "../bridge-utils.js";
// schemas imported from shared types file (src/mcp/mailbox-types.ts)

const MAILBOX_DIR = process.env.MAILBOX_DIR ?? path.join(process.cwd(), ".claude/mailbox");

function mailboxPath(agentId: string): string {
  fs.mkdirSync(MAILBOX_DIR, { recursive: true });
  const safe = agentId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(MAILBOX_DIR, `${safe}.jsonl`);
}

async function readMessages(filePath: string): Promise<AnyMailboxMessage[]> {
  if (!fs.existsSync(filePath)) return [];
  const messages = new Map<string, AnyMailboxMessage>();
  const rl = readline.createInterface({ input: fs.createReadStream(filePath) });
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const msg = JSON.parse(line) as AnyMailboxMessage;
      messages.set(msg.id, msg); // last line for id wins (status updates)
    } catch { /* skip */ }
  }
  return [...messages.values()];
}

function appendMessage(filePath: string, msg: AnyMailboxMessage): void {
  fs.appendFileSync(filePath, JSON.stringify(msg) + "\n", "utf-8");
}

export function registerMailbox(server: McpServer): void {
  server.tool("mailbox_send", /* ... */);
  server.tool("mailbox_recv", /* ... */);
  server.tool("mailbox_peek", /* ... */);
  server.tool("mailbox_ack",  /* ... */);
  server.tool("mailbox_thread", /* ... */);
  server.tool("mailbox_outcome", /* ... */);
  server.tool("mailbox_task_sync", /* ... */);
}
```

---

## open questions

1. **concurrency**: JSONL append is atomic on POSIX (single `appendFileSync` call < pipe buffer ~4KB). for agents running in parallel on the same host this is safe. multi-host requires a lock file or replace with sqlite WAL — out of scope for v1.
2. **broadcast fan-out**: current design writes to `_broadcast.jsonl` and all agents scan it on recv. alternative: fan-out on send (write to each agent's JSONL). fan-out removes cross-agent scan but increases write amplification. punt to v1.1.
3. **`mailbox_purge_expired`**: not in the 7 tools. add as an 8th if TTL-heavy workloads need it. cron `/schedule`-able.
4. **persistence across sessions**: JSONL files persist across sessions by design. agents restarting pick up unacked messages. orchestrator should call `mailbox_peek` on startup to drain stale in-flight messages (re-set to pending after configurable timeout).
5. **SDK thread_id correlation**: `thread_id` in the envelope is typed `string?` not `string.startsWith("sth_")` to allow non-SDK callers. tighten to `sth_` prefix in v1.1 when SDK thread IDs are always available.
