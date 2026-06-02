/**
 * mailbox.ts — agent-to-agent mailbox MCP lane.
 *
 * 7 tools: mailbox_send, mailbox_recv, mailbox_peek, mailbox_ack,
 *          mailbox_thread, mailbox_outcome, mailbox_task_sync
 *
 * Storage: JSONL per agent under MAILBOX_DIR (.claude/mailbox/).
 * Append-only invariant: status updates are new lines, never mutations.
 * Last line for a given message_id wins during read.
 *
 * @cite docs/architecture/mailbox-mcp-design.md
 * @cite src/mcp/lanes/telemetry.ts   (JSONL + tool registration pattern)
 * @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../bridge-utils.js";
import {
  type RawEnvelope,
  type AnyMailboxMessage,
  type MessageStatus,
  RawEnvelope as RawEnvelopeSchema,
  OutcomePayload,
  TaskPayload,
  MessageType,
} from "../mailbox-types.js";

const MAILBOX_DIR = process.env.MAILBOX_DIR
  ?? path.join(process.cwd(), ".claude", "mailbox");
const TASK_LEDGER = process.env.TASK_LEDGER_JSONL
  ?? path.join(MAILBOX_DIR, "_task_ledger.jsonl");

// ─── storage helpers ─────────────────────────────────────────────────────────

function ensureDir(): void {
  fs.mkdirSync(MAILBOX_DIR, { recursive: true });
}

function agentPath(agentId: string): string {
  ensureDir();
  const safe = agentId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(MAILBOX_DIR, `${safe}.jsonl`);
}

function broadcastPath(): string {
  ensureDir();
  return path.join(MAILBOX_DIR, "_broadcast.jsonl");
}

async function readRaw(filePath: string): Promise<RawEnvelope[]> {
  if (!fs.existsSync(filePath)) return [];
  // last line for a given id wins — status updates
  const byId = new Map<string, RawEnvelope>();
  const rl = readline.createInterface({ input: fs.createReadStream(filePath) });
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const parsed = RawEnvelopeSchema.parse(JSON.parse(line));
      byId.set(parsed.id, parsed);
    } catch { /* skip malformed */ }
  }
  return [...byId.values()];
}

function isExpired(msg: RawEnvelope): boolean {
  if (!msg.ttl_ms) return false;
  return Date.now() - new Date(msg.timestamp).getTime() > msg.ttl_ms;
}

function appendRaw(filePath: string, record: object): void {
  fs.appendFileSync(filePath, JSON.stringify(record) + "\n", "utf-8");
}

function makeId(): string {
  return `msg_${randomUUID().replace(/-/g, "")}`;
}

// ─── lane registration ───────────────────────────────────────────────────────

export function registerMailbox(server: McpServer): void {

  // ── mailbox_send ────────────────────────────────────────────────────────────
  server.tool(
    "mailbox_send",
    "Enqueue a typed message to a named agent or to 'broadcast'. Writes one JSON line to .claude/mailbox/{to}.jsonl.",
    {
      from: z.string().describe("agent_id of sender"),
      to: z.string().describe("agent_id of recipient or 'broadcast'"),
      type: MessageType,
      payload: z.record(z.unknown()).describe("message payload — validated against type schema"),
      thread_id: z.string().optional(),
      ack_required: z.boolean().optional().default(false),
      ttl_ms: z.number().int().positive().optional(),
    },
    async ({ from, to, type, payload, thread_id, ack_required = false, ttl_ms }) => {
      const id = makeId();
      const msg: RawEnvelope = {
        id, from, to, thread_id, type: type as RawEnvelope["type"],
        timestamp: new Date().toISOString(),
        payload, ack_required, ttl_ms,
        status: "pending",
      };
      const dest = to === "broadcast" ? broadcastPath() : agentPath(to);
      appendRaw(dest, msg);
      return jsonResult({ message_id: id, written_to: dest });
    },
  );

  // ── mailbox_recv ────────────────────────────────────────────────────────────
  server.tool(
    "mailbox_recv",
    "Pop the next pending message for this agent. FIFO. Checks agent-specific JSONL then _broadcast. Marks in-flight.",
    {
      agent_id: z.string(),
      type_filter: MessageType.optional(),
    },
    async ({ agent_id, type_filter }) => {
      const files = [agentPath(agent_id), broadcastPath()];
      for (const file of files) {
        const msgs = await readRaw(file);
        const candidate = msgs.find(m =>
          m.status === "pending" &&
          !isExpired(m) &&
          (!type_filter || m.type === type_filter)
        );
        if (!candidate) continue;
        // Append in-flight status update
        const update: Partial<RawEnvelope> & { id: string; status: MessageStatus } = {
          id: candidate.id, status: "in_flight",
        };
        if (!candidate.ack_required) update.status = "acked";
        appendRaw(file, { ...candidate, status: update.status });
        return jsonResult({ message: candidate });
      }
      return jsonResult({ message: null });
    },
  );

  // ── mailbox_peek ────────────────────────────────────────────────────────────
  server.tool(
    "mailbox_peek",
    "List pending messages without consuming. Returns up to limit messages, does not mutate state.",
    {
      agent_id: z.string(),
      limit: z.number().int().min(1).max(100).optional().default(20),
      type_filter: MessageType.optional(),
    },
    async ({ agent_id, limit = 20, type_filter }) => {
      const files = [agentPath(agent_id), broadcastPath()];
      const all: RawEnvelope[] = [];
      for (const file of files) {
        const msgs = await readRaw(file);
        all.push(...msgs.filter(m =>
          m.status === "pending" && !isExpired(m) &&
          (!type_filter || m.type === type_filter)
        ));
      }
      all.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      return jsonResult({ messages: all.slice(0, limit), total_pending: all.length });
    },
  );

  // ── mailbox_ack ─────────────────────────────────────────────────────────────
  server.tool(
    "mailbox_ack",
    "Acknowledge a message as completed or failed. Appends a status-update line. Idempotent.",
    {
      agent_id: z.string(),
      message_id: z.string(),
      status: z.enum(["acked", "failed"]),
      note: z.string().optional(),
    },
    async ({ agent_id, message_id, status, note }) => {
      const file = agentPath(agent_id);
      const msgs = await readRaw(file);
      const original = msgs.find(m => m.id === message_id);
      if (!original) return jsonResult({ acked: false, message_id, error: "not found" });
      appendRaw(file, { ...original, status, note });
      return jsonResult({ acked: true, message_id, status });
    },
  );

  // ── mailbox_thread ──────────────────────────────────────────────────────────
  server.tool(
    "mailbox_thread",
    "Return all messages in a thread_id, across all agents. Scans all JSONL under MAILBOX_DIR.",
    {
      thread_id: z.string(),
      include_broadcast: z.boolean().optional().default(true),
    },
    async ({ thread_id, include_broadcast = true }) => {
      ensureDir();
      const files = fs.readdirSync(MAILBOX_DIR)
        .filter(f => f.endsWith(".jsonl") && (include_broadcast || !f.startsWith("_broadcast")))
        .map(f => path.join(MAILBOX_DIR, f));
      const results: RawEnvelope[] = [];
      const seen = new Set<string>();
      for (const file of files) {
        const msgs = await readRaw(file);
        for (const m of msgs) {
          if (m.thread_id === thread_id && !seen.has(m.id)) {
            seen.add(m.id);
            results.push(m);
          }
        }
      }
      results.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      const agents = new Set(results.map(m => m.to));
      return jsonResult({ messages: results, agent_count: agents.size });
    },
  );

  // ── mailbox_outcome ─────────────────────────────────────────────────────────
  server.tool(
    "mailbox_outcome",
    "Shorthand: send an OutcomePayload (type=outcome, ack_required=false). Designed for agent→orchestrator reporting.",
    {
      from: z.string(),
      to: z.string(),
      outcome_id: z.string(),
      description: z.string(),
      status: z.enum(["pending", "achieved", "failed"]),
      evidence: z.array(z.union([
        z.string(),
        z.object({ metric: z.string(), value: z.number(), unit: z.string().optional(), at: z.string().datetime() }),
      ])).optional().default([]),
      thread_id: z.string().optional(),
    },
    async ({ from, to, outcome_id, description, status, evidence = [], thread_id }) => {
      const payload = OutcomePayload.parse({ outcome_id, description, status, evidence });
      const id = makeId();
      const msg: RawEnvelope = {
        id, from, to, thread_id, type: "outcome",
        timestamp: new Date().toISOString(),
        payload, ack_required: false, status: "pending",
      };
      const dest = to === "broadcast" ? broadcastPath() : agentPath(to);
      appendRaw(dest, msg);
      return jsonResult({ message_id: id, outcome_id, status });
    },
  );

  // ── mailbox_task_sync ────────────────────────────────────────────────────────
  server.tool(
    "mailbox_task_sync",
    "Sync a TaskPayload to the shared task ledger (_task_ledger.jsonl). Upserts by task_id. Notifies assignee if set.",
    {
      from: z.string(),
      task_id: z.string(),
      title: z.string().max(255),
      description: z.string().optional(),
      status: z.enum(["pending", "in_progress", "blocked", "completed", "failed"]).optional().default("pending"),
      priority: z.enum(["low", "medium", "high", "critical"]).optional().default("medium"),
      parent_task_id: z.string().optional(),
      assignee_agent_id: z.string().optional(),
      due_at: z.string().datetime().optional(),
    },
    async ({ from, task_id, title, description, status = "pending", priority = "medium",
             parent_task_id, assignee_agent_id, due_at }) => {
      const task = TaskPayload.parse({
        task_id, title, description, status, priority, parent_task_id, assignee_agent_id, due_at,
      });
      ensureDir();
      appendRaw(TASK_LEDGER, { ...task, updated_by: from, updated_at: new Date().toISOString() });

      let message_id: string | undefined;
      if (assignee_agent_id) {
        const id = makeId();
        const notification: RawEnvelope = {
          id, from, to: assignee_agent_id, type: "task",
          timestamp: new Date().toISOString(),
          payload: task, ack_required: false, status: "pending",
        };
        appendRaw(agentPath(assignee_agent_id), notification);
        message_id = id;
      }
      return jsonResult({ task_id, synced: true, message_id });
    },
  );
}
