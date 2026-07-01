/**
 * e2m-mcp — envelope-to-mailbox MCP server.
 *
 * Extends the existing mailbox MCP (src/mcp/lanes/mailbox.ts) with:
 *   - Typed DurableTask envelope writing to per-domain JSONL queues
 *   - Agent-to-agent mailbox routing (cowork/data/mailbox/<agent>.jsonl)
 *   - State machine transition appending (dogfoods task-state-machine.ts)
 *   - Domain queues: design | engineering | product-management | project-management | data |
 *     sales | finance | legal | marketing | operations | human-resources | agent-resources
 *
 * Storage: append-only JSONL. Last line per task_id = current state.
 * Version-controllable: all files are plain text, git-diffable.
 *
 * Tools:
 *   envelope_write   — validate + append a DurableTask envelope to its domain queue
 *   envelope_read    — read all envelopes from a domain queue (with optional state filter)
 *   task_transition  — append a state transition for a task (claim/complete/block/fail/retry)
 *   mailbox_send     — send a typed message from one agent to another
 *   mailbox_recv     — read unacked messages for an agent
 *   mailbox_ack      — mark a message as acked
 *   queue_status     — summary of all domain queues (pending/in_progress/blocked/completed counts)
 *
 * @cite src/mcp/lanes/mailbox.ts           (mailbox pattern — extends, not replaces)
 * @cite src/mcp/mailbox-types.ts           (RawEnvelope, MessageType, TaskPayload)
 * @cite cowork/templates/task-state-machine.ts  (DurableTask, TaskState, transition)
 * @cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md
 * @cite docs/architecture/mailbox-mcp-design.md
 */

import * as fs   from "node:fs";
import * as path from "node:path";
import * as rl   from "node:readline";
import { randomUUID } from "node:crypto";
import { McpServer }   from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z }           from "zod";

// ── Domain queue config ───────────────────────────────────────────────────────

const QUEUE_DIR   = process.env.E2M_QUEUE_DIR
  ?? path.join(process.cwd(), "cowork", "data", "queues");
const MAILBOX_DIR = process.env.E2M_MAILBOX_DIR
  ?? path.join(process.cwd(), "cowork", "data", "mailbox");

const DOMAINS = [
  "design", "engineering", "product-management", "project-management", "data",
  "sales", "finance", "legal", "marketing", "operations", "human-resources", "agent-resources",
] as const;
export type Domain = typeof DOMAINS[number];

function ensureDirs(): void {
  fs.mkdirSync(QUEUE_DIR,   { recursive: true });
  fs.mkdirSync(MAILBOX_DIR, { recursive: true });
}

function queuePath(domain: Domain): string {
  return path.join(QUEUE_DIR, `${domain}.jsonl`);
}
function mailboxPath(agentId: string): string {
  const safe = agentId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(MAILBOX_DIR, `${safe}.jsonl`);
}

function appendLine(filePath: string, obj: unknown): void {
  ensureDirs();
  fs.appendFileSync(filePath, JSON.stringify(obj) + "\n", "utf8");
}

/** @cite cowork/scripts/mailbox-schema-validate.py (scan() — per-line JSONDecodeError isolation, not a crash) */
function readLines(filePath: string): unknown[] {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, "utf8");
  const rows: unknown[] = [];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    try {
      rows.push(JSON.parse(line));
    } catch (err) {
      console.error(`[readLines] skipping malformed JSON at ${filePath}:${i + 1}: ${(err as Error).message}`);
    }
  }
  return rows;
}

/** Latest-line-wins collapse: for each task_id, keep only the last row. */
function collapseById<T extends { id: string }>(rows: T[]): T[] {
  const map = new Map<string, T>();
  for (const row of rows) map.set(row.id, row);
  return [...map.values()];
}

/**
 * Recency-ordered collapse: sorts by `at` before collapsing so callers that
 * merge rows from multiple files (e.g. mailbox_recv's own-mailbox + broadcast
 * streams) get true latest-wins instead of last-array-position-wins. Falls
 * back to stable array order when `at` is absent/equal.
 */
function collapseByIdRecency<T extends { id: string; at?: string }>(rows: T[]): T[] {
  const sorted = rows
    .map((row, index) => ({ row, index }))
    .sort((a, b) => {
      const at = (a.row.at ?? "").localeCompare(b.row.at ?? "");
      return at !== 0 ? at : a.index - b.index;
    })
    .map(({ row }) => row);
  return collapseById(sorted);
}

// ── Envelope schema (canonical DurableTask + evaluator) ───────────────────────

const EvaluatorBlock = z.object({
  pass_if: z.array(z.string()).min(1),
  fail_if: z.array(z.string()).min(1),
});

const TaskStateEnum = z.enum(["pending", "in_progress", "blocked", "completed", "failed"]);
const DomainEnum    = z.enum(DOMAINS);
const TaskEventEnum = z.enum(["claim", "complete", "block", "unblock", "fail", "retry"]);

export const Envelope = z.object({
  _type:           z.literal("task").default("task"),   // required by DurableTask canon (envelope.ts)
  id:              z.string().uuid().default(() => randomUUID()),
  queue:           DomainEnum,
  subject:         z.string().min(1).max(80),
  description:     z.string().max(200).optional(),
  state:           TaskStateEnum.default("pending"),
  owner:           z.string().optional(),
  ke_fit_score:    z.number().int().min(1).max(5).optional(),
  estimated_hours: z.number().positive().optional(),
  due_date:        z.string().optional(),        // YYYY-MM-DD
  depends_on:      z.array(z.string().uuid()).default([]),
  blocks:          z.array(z.string().uuid()).default([]),
  jira_key:        z.string().regex(/^[A-Z]+-\d+$/).optional(),
  evaluator:       EvaluatorBlock.optional(),
  created_at:      z.string().default(() => new Date().toISOString()),
  updated_at:      z.string().default(() => new Date().toISOString()),
  result:          z.record(z.string(), z.unknown()).optional(),
  error:           z.string().optional(),
});
export type Envelope = z.infer<typeof Envelope>;

// Transition row — appended on every state change
const TransitionRow = z.object({
  id:          z.string().uuid(),               // same as task id
  _type:       z.literal("transition"),
  event:       TaskEventEnum,
  prior_state: TaskStateEnum,
  new_state:   TaskStateEnum,
  owner:       z.string().optional(),
  error:       z.string().optional(),
  at:          z.string().default(() => new Date().toISOString()),
});
type TransitionRow = z.infer<typeof TransitionRow>;

// ── Mailbox message schema ────────────────────────────────────────────────────

const MailboxMessageTypeEnum = z.enum([
  "task", "outcome", "interrupt", "dispatch", "routine", "ping", "ack",
]);

// Legacy message `type` → canonical envelope_type (cowork/standards/mailbox-envelope-canon.md)
const ENVELOPE_TYPE_OF: Record<string, string> = {
  task: "task", outcome: "result", interrupt: "escalate",
  dispatch: "task", routine: "task", ping: "notify", ack: "ack",
};

// Canonical mailbox envelope shape (cowork/schemas/envelope.ts). Named distinctly
// from the `Envelope` DurableTask type above (line 91) to avoid a collision.
type MailboxEnvelopeType = "task" | "ack" | "result" | "escalate" | "notify" | "summary" | "operator";
interface MailboxEnvelope {
  _type: "envelope";
  id: string;
  envelope_type: MailboxEnvelopeType;
  from: string;
  to: string;
  subject: string;
  at: string;
  state: "pending" | "read" | "actioned" | "archived";
  thread_id?: string;
  payload?: Record<string, unknown>;
  ack_required?: boolean;
}

const MailboxMessage = z.object({
  id:          z.string().uuid().default(() => randomUUID()),
  from:        z.string(),
  to:          z.union([z.string(), z.literal("broadcast")]),
  thread_id:   z.string().optional(),
  type:        MailboxMessageTypeEnum,
  subject:     z.string().max(120),
  body:        z.string().optional(),
  payload:     z.record(z.string(), z.unknown()).optional(),
  ack_required: z.boolean().default(false),
  status:      z.enum(["pending", "acked", "expired"]).default("pending"),
  sent_at:     z.string().default(() => new Date().toISOString()),
});
type MailboxMessage = z.infer<typeof MailboxMessage>;

// ── State transition helpers ──────────────────────────────────────────────────

const VALID_TRANSITIONS: Record<string, { from: string[]; to: string }> = {
  claim:    { from: ["pending"],      to: "in_progress" },
  complete: { from: ["in_progress"],  to: "completed"   },
  block:    { from: ["in_progress"],  to: "blocked"     },
  unblock:  { from: ["blocked"],      to: "in_progress" },
  fail:     { from: ["in_progress"],  to: "failed"      },
  retry:    { from: ["failed"],       to: "pending"     },
};

// ── MCP server ────────────────────────────────────────────────────────────────

const server = new McpServer({ name: "e2m-mcp", version: "0.1.0" });

// ── envelope_write ────────────────────────────────────────────────────────────

server.tool(
  "envelope_write",
  "Validate and append a DurableTask envelope to its domain JSONL queue.",
  {
    envelope: z.record(z.string(), z.unknown())
      .describe("DurableTask envelope object (will be validated against Envelope schema)"),
  },
  ({ envelope }) => {
    const parsed = Envelope.parse(envelope);
    appendLine(queuePath(parsed.queue), parsed);
    return {
      content: [{ type: "text", text: JSON.stringify({ ok: true, id: parsed.id, queue: parsed.queue }) }],
    };
  },
);

// ── envelope_read ─────────────────────────────────────────────────────────────

server.tool(
  "envelope_read",
  "Read current task state from a domain JSONL queue (latest-line-wins per id).",
  {
    domain: DomainEnum.describe("Domain queue to read"),
    state:  TaskStateEnum.optional().describe("Filter by state (omit for all)"),
    limit:  z.number().int().min(1).max(500).default(50).describe("Max rows to return"),
  },
  ({ domain, state, limit }) => {
    const rows = readLines(queuePath(domain)) as Envelope[];
    // collapse to latest state per id (transitions overwrite)
    const collapsed = collapseById(rows.filter(r => (r as any)._type !== "transition"));
    const filtered  = state ? collapsed.filter(r => r.state === state) : collapsed;
    const top       = filtered.slice(0, limit);
    return {
      content: [{ type: "text", text: JSON.stringify({ domain, total: collapsed.length, rows: top }) }],
    };
  },
);

// ── task_transition ───────────────────────────────────────────────────────────

server.tool(
  "task_transition",
  "Append a state transition for a task. Validates the transition is legal.",
  {
    domain:  DomainEnum.describe("Domain queue containing the task"),
    task_id: z.string().uuid().describe("Task UUID"),
    event:   TaskEventEnum.describe("Transition event"),
    owner:   z.string().optional().describe("Agent claiming the task (for 'claim' event)"),
    error:   z.string().optional().describe("Error message (for 'block' or 'fail' events)"),
    result:  z.record(z.string(), z.unknown()).optional().describe("Result payload (for 'complete')"),
  },
  ({ domain, task_id, event, owner, error, result }) => {
    // Find current state
    const rows = readLines(queuePath(domain)) as (Envelope | TransitionRow)[];
    // Last row for this id is current
    const taskRows = rows.filter(r => r.id === task_id);
    if (taskRows.length === 0) throw new Error(`task ${task_id} not found in ${domain}`);
    const last = taskRows[taskRows.length - 1];
    const currentState = (last as any).new_state ?? (last as Envelope).state ?? "pending";

    const t = VALID_TRANSITIONS[event];
    if (!t) throw new Error(`unknown event: ${event}`);
    if (!t.from.includes(currentState)) {
      throw new Error(`illegal: ${currentState} --${event}--> (allowed from: ${t.from.join(", ")})`);
    }

    const row = TransitionRow.parse({
      id: task_id, _type: "transition", event,
      prior_state: currentState, new_state: t.to,
      owner, error, at: new Date().toISOString(),
    });
    appendLine(queuePath(domain), row);

    // Also write updated envelope row so collapse works cleanly
    const envelope = rows.find(r => r.id === task_id && (r as any)._type !== "transition") as Envelope;
    if (envelope) {
      const updated = { ...envelope, state: t.to, owner: owner ?? envelope.owner, error, result, updated_at: new Date().toISOString() };
      appendLine(queuePath(domain), updated);
    }

    return {
      content: [{ type: "text", text: JSON.stringify({ ok: true, task_id, event, new_state: t.to }) }],
    };
  },
);

// ── mailbox_send ──────────────────────────────────────────────────────────────

server.tool(
  "mailbox_send",
  "Send a typed message from one agent to another (or broadcast). Appended to recipient's JSONL.",
  {
    from:         z.string().describe("Sender agent id"),
    to:           z.union([z.string(), z.literal("broadcast")]).describe("Recipient agent id or 'broadcast'"),
    type:         MailboxMessageTypeEnum.describe("Message type"),
    subject:      z.string().max(120).describe("Message subject"),
    body:         z.string().optional().describe("Message body"),
    payload:      z.record(z.string(), z.unknown()).optional().describe("Structured payload"),
    ack_required: z.boolean().default(false).describe("Require ack before sender continues"),
    thread_id:    z.string().optional().describe("Thread correlation id"),
  },
  ({ from, to, type, subject, body, payload, ack_required, thread_id }) => {
    const msg = MailboxMessage.parse({ from, to, type, subject, body, payload, ack_required, thread_id });
    const dest = to === "broadcast" ? "_broadcast" : to;
    // Canonical Envelope only (cowork/schemas/envelope.ts, additionalProperties:false) —
    // no legacy MailboxMessage fields (type/body/status/sent_at) on the wire.
    const envelope: MailboxEnvelope = {
      _type: "envelope",
      id: msg.id,
      envelope_type: (ENVELOPE_TYPE_OF[type] ?? "notify") as MailboxEnvelopeType,
      from: msg.from,
      to: dest,
      subject: msg.subject,
      at: msg.sent_at,
      state: "pending",
      ...(thread_id ? { thread_id } : {}),
      ...(msg.payload || msg.body
        ? { payload: { ...(msg.payload ?? {}), ...(msg.body ? { body: msg.body } : {}) } }
        : {}),
      ...(msg.ack_required ? { ack_required: msg.ack_required } : {}),
    };
    appendLine(mailboxPath(dest), envelope);
    return {
      content: [{ type: "text", text: JSON.stringify({ ok: true, message_id: msg.id, to: dest }) }],
    };
  },
);

// ── mailbox_recv ──────────────────────────────────────────────────────────────

server.tool(
  "mailbox_recv",
  "Read unacked messages for an agent from its mailbox JSONL.",
  {
    agent_id: z.string().describe("Agent id to read mailbox for"),
    limit:    z.number().int().min(1).max(100).default(20),
    type:     MailboxMessageTypeEnum.optional().describe("Filter by message type"),
  },
  ({ agent_id, limit, type }) => {
    const msgs  = readLines(mailboxPath(agent_id)) as MailboxEnvelope[];
    const bcast = readLines(mailboxPath("_broadcast")) as MailboxEnvelope[];
    const all   = collapseByIdRecency([...msgs, ...bcast]);
    const envelopeType = type ? ENVELOPE_TYPE_OF[type] : undefined;
    const pending = all
      .filter(m => m.state === "pending" && (!envelopeType || m.envelope_type === envelopeType))
      .slice(0, limit);
    return {
      content: [{ type: "text", text: JSON.stringify({ agent_id, count: pending.length, messages: pending }) }],
    };
  },
);

// ── mailbox_ack ───────────────────────────────────────────────────────────────

server.tool(
  "mailbox_ack",
  "Ack a message — appends an ack row to the mailbox JSONL.",
  {
    agent_id:   z.string().describe("Agent id receiving the ack"),
    message_id: z.string().uuid().describe("Message id to ack"),
    note:       z.string().optional().describe("Optional ack note"),
  },
  ({ agent_id, message_id, note }) => {
    const now = new Date().toISOString();
    // Canonical transition record (cowork/standards/mailbox-envelope-canon.md)
    const ack = {
      _type: "transition" as const, id: message_id, event: "ack" as const,
      status: "acked", acked_by: agent_id, acked_at: now, at: now, note,
    };
    appendLine(mailboxPath(agent_id), ack);
    return {
      content: [{ type: "text", text: JSON.stringify({ ok: true, message_id, acked_by: agent_id }) }],
    };
  },
);

// ── queue_status ──────────────────────────────────────────────────────────────

server.tool(
  "queue_status",
  "Summary counts (pending/in_progress/blocked/completed/failed) for all domain queues.",
  {},
  () => {
    ensureDirs();
    const summary: Record<string, Record<string, number>> = {};
    for (const domain of DOMAINS) {
      const rows    = readLines(queuePath(domain)) as Envelope[];
      const current = collapseById(rows.filter(r => (r as any)._type !== "transition"));
      const counts: Record<string, number> = { pending: 0, in_progress: 0, blocked: 0, completed: 0, failed: 0 };
      for (const t of current) {
        // readLines skips schema validation — guard against unexpected/missing state instead of silently NaN-ing a new key
        if (TaskStateEnum.safeParse(t.state).success) counts[t.state]++;
        else counts.unknown = (counts.unknown ?? 0) + 1;
      }
      summary[domain] = counts;
    }
    return {
      content: [{ type: "text", text: JSON.stringify({ queues: summary, at: new Date().toISOString() }) }],
    };
  },
);

// ── Start ─────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
