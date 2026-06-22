#!/usr/bin/env node
// e2m .mcpb — typed envelope/mailbox/team coordination for the 2026 operational plan.
//
// The 4-protocol peer paradigm's e2m-mcp lane as a Desktop Extension: typed Envelope/DurableTask/
// Transition/Team objects with structured I/O, over append-only JSONL (latest-line-wins). operator is a
// first-class participant (mailbox + queue). Scope: the operational-plan data root (DATA_DIR).
//
// @cite cowork/schemas/envelope.ts            (canonical typed objects)
// @cite coworkers/projects/2026/operational-plan/e2m-mcp/agents.ts  (15-agent registry)
// @cite https://coworkers.subagentknowledge.com/#protocols

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { homedir } from "node:os";
import { randomUUID } from "node:crypto";

const ROOT = resolve(
  process.env.DATA_DIR ??
    join(homedir(), "knowledge-engineering", "coworkers", "projects", "2026", "operational-plan", "data"),
);
const MBOX = join(ROOT, "mailbox");
const QUEUE = join(ROOT, "queues");
for (const d of [MBOX, QUEUE]) if (!existsSync(d)) mkdirSync(d, { recursive: true });
const SAFE = /^[a-z0-9-]+$/;

// ── typed objects (mirror cowork/schemas/envelope.ts) ──────────────────────────
const priority = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);
const Envelope = z.object({
  _type: z.literal("envelope").default("envelope"),
  id: z.string().default(() => randomUUID()),
  envelope_type: z.enum(["task", "ack", "result", "escalate", "notify", "summary", "operator"]),
  from: z.string(), to: z.string(), subject: z.string(),
  at: z.string().default(() => new Date().toISOString()),
  state: z.enum(["pending", "read", "actioned", "archived"]).default("pending"),
  priority: priority.optional(), thread_id: z.string().optional(), reply_to: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  requires_decision: z.boolean().optional(), decision_options: z.array(z.string()).optional(),
});
const DurableTask = z.object({
  _type: z.literal("task").default("task"),
  id: z.string().default(() => randomUUID()),
  queue: z.string(), subject: z.string(),
  state: z.enum(["pending", "in_progress", "completed", "blocked", "failed"]).default("pending"),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
  from: z.string().optional(), owner: z.string().optional(), ke_fit_score: priority.optional(),
  depends_on: z.array(z.string()).optional(), payload: z.record(z.string(), z.unknown()).optional(),
  evaluator: z.object({ pass_if: z.array(z.string()), fail_if: z.array(z.string()).optional() }).optional(),
});

// ── the 15-agent registry + the operational-plan team (the "cowork" typed object) ──
const FNS = ["operator", "product", "project", "finance", "legal"];
const TIERS = ["manager", "coworker", "subagent"];
const AGENTS = FNS.flatMap((fn) => TIERS.map((tier) => ({
  id: `${fn}-${tier}`, fn, tier, email: `${fn}-${tier}@subagentknowledge.com`,
})));
const TEAMS = {
  "operational-plan": ["product-manager", "project-manager", "finance-manager", "legal-manager"],
};

const agentPath = (id) => { if (!SAFE.test(id)) throw new Error("bad agent id"); return join(MBOX, `${id}.jsonl`); };
const queuePath = (q) => { if (!SAFE.test(q)) throw new Error("bad queue"); return join(QUEUE, `${q}.jsonl`); };
const append = (p, obj) => appendFileSync(p, JSON.stringify(obj) + "\n");
const readJsonl = (p) => existsSync(p) ? readFileSync(p, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)) : [];
const latest = (rows) => { const m = new Map(); for (const r of rows) m.set(r.id, r); return [...m.values()]; };
const ok = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj) }], structuredContent: obj });

const server = new McpServer({ name: "e2m", version: "0.1.0" });

server.registerTool("envelope_write",
  { description: "Append a typed DurableTask to its queue JSONL.", inputSchema: { task: z.record(z.string(), z.unknown()) } },
  async ({ task }) => { const t = DurableTask.parse(task); append(queuePath(t.queue), t); return ok({ ok: true, id: t.id, queue: t.queue }); });

server.registerTool("envelope_read",
  { description: "Read a queue's DurableTasks (latest-line-wins), optional state filter.", inputSchema: { queue: z.string(), state: z.string().optional() } },
  async ({ queue, state }) => { let rows = latest(readJsonl(queuePath(queue)).filter((r) => r._type === "task")); if (state) rows = rows.filter((r) => r.state === state); return ok(rows); });

server.registerTool("task_transition",
  { description: "Append a state transition for a task.", inputSchema: { queue: z.string(), task_id: z.string(), event: z.string(), owner: z.string().optional(), result: z.record(z.string(), z.unknown()).optional() } },
  async ({ queue, task_id, event, owner, result }) => { append(queuePath(queue), { _type: "transition", id: task_id, at: new Date().toISOString(), event, owner, result }); return ok({ ok: true, task_id, event }); });

server.registerTool("mailbox_send",
  { description: "Send a typed Envelope to an agent's mailbox.", inputSchema: { envelope: z.record(z.string(), z.unknown()) } },
  async ({ envelope }) => { const e = Envelope.parse(envelope); append(agentPath(e.to), e); return ok({ ok: true, id: e.id, to: e.to }); });

server.registerTool("mailbox_recv",
  { description: "Read an agent's envelopes (optionally only unacked/pending).", inputSchema: { agent: z.string(), pending_only: z.boolean().optional() } },
  async ({ agent, pending_only }) => { let rows = readJsonl(agentPath(agent)).filter((r) => r._type === "envelope"); if (pending_only) rows = rows.filter((r) => r.state === "pending"); return ok(rows); });

server.registerTool("mailbox_ack",
  { description: "Acknowledge an envelope (append a read transition).", inputSchema: { agent: z.string(), id: z.string() } },
  async ({ agent, id }) => { append(agentPath(agent), { _type: "transition", id, at: new Date().toISOString(), event: "read", read_by: agent }); return ok({ ok: true, id, acked_by: agent }); });

server.registerTool("agent_directory",
  { description: "The 15-agent registry (5 functions x 3 tiers) + the named teams.", inputSchema: {} },
  async () => ok({ agents: AGENTS, teams: TEAMS }));

server.registerTool("team_dispatch",
  { description: "Fan one Envelope out to every member of a named team (the cowork coordination primitive).", inputSchema: { team: z.string(), envelope: z.record(z.string(), z.unknown()) } },
  async ({ team, envelope }) => {
    const members = TEAMS[team]; if (!members) throw new Error(`unknown team ${team}`);
    const sent = members.map((m) => { const e = Envelope.parse({ ...envelope, to: m, id: randomUUID() }); append(agentPath(m), e); return { to: m, id: e.id }; });
    return ok({ ok: true, team, sent });
  });

await server.connect(new StdioServerTransport());
