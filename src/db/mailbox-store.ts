/**
 * mailbox-store.ts — SQLite-backed (D1-compatible) storage adapter for the agent mailbox.
 *
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite src/mcp/lanes/mailbox.ts
 * @cite src/mcp/mailbox-types.ts
 *
 * Uses the Node.js built-in `node:sqlite` module (Node >=22.5.0).
 * Schema is D1-compatible: plain SQL, no RETURNING, no JSON functions in DDL.
 * WAL mode enabled for concurrent read performance.
 */

import { DatabaseSync } from "node:sqlite";
import * as os from "node:os";
import * as path from "node:path";
import type { RawEnvelope, TaskPayload } from "../mcp/mailbox-types.js";

const DB_PATH = process.env.MAILBOX_DB_PATH
  ?? path.join(os.tmpdir(), "ke-mailbox.db");

const DDL = `
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  from_agent TEXT NOT NULL,
  to_agent TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  thread_id TEXT,
  ack_required INTEGER DEFAULT 0,
  ttl_ms INTEGER,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_to_status ON messages(to_agent, status);
CREATE INDEX IF NOT EXISTS idx_thread ON messages(thread_id) WHERE thread_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS consensus_votes (
  connector_id TEXT NOT NULL,
  coworker_id TEXT NOT NULL,
  voted_at TEXT NOT NULL,
  PRIMARY KEY (connector_id, coworker_id)
);

CREATE TABLE IF NOT EXISTS task_ledger (
  task_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  parent_task_id TEXT,
  assignee_agent_id TEXT,
  due_at TEXT,
  updated_by TEXT,
  updated_at TEXT NOT NULL
);
`;

export interface MailboxStore {
  upsertMessage(msg: RawEnvelope): void;
  getPendingMessages(toAgent: string, limit: number): RawEnvelope[];
  peekMessage(toAgent: string): RawEnvelope | null;
  ackMessage(messageId: string, status: string): boolean;
  getThreadMessages(threadId: string): RawEnvelope[];
  broadcastMessage(msg: RawEnvelope): void;
  upsertTask(task: TaskPayload & { updated_by?: string; updated_at?: string }): void;
}

function rowToEnvelope(row: Record<string, unknown>): RawEnvelope {
  return {
    id: row.id as string,
    from: row.from_agent as string,
    to: row.to_agent as string,
    type: row.type as RawEnvelope["type"],
    status: row.status as RawEnvelope["status"],
    thread_id: row.thread_id as string | undefined,
    ack_required: (row.ack_required as number) === 1,
    ttl_ms: row.ttl_ms as number | undefined,
    payload: JSON.parse(row.payload as string) as unknown,
    timestamp: row.created_at as string,
  };
}

function isExpired(msg: RawEnvelope): boolean {
  if (!msg.ttl_ms) return false;
  return Date.now() - new Date(msg.timestamp).getTime() > msg.ttl_ms;
}

export class SqliteMailboxStore implements MailboxStore {
  private readonly db: DatabaseSync;

  constructor(dbPath: string = DB_PATH) {
    this.db = new DatabaseSync(dbPath);
    // WAL mode for concurrent reads alongside writes
    this.db.exec("PRAGMA journal_mode=WAL;");
    this.db.exec(DDL);
  }

  upsertMessage(msg: RawEnvelope): void {
    const now = new Date().toISOString();
    this.db.prepare(`
      INSERT INTO messages
        (id, from_agent, to_agent, type, status, thread_id, ack_required, ttl_ms, payload, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        status = excluded.status,
        updated_at = excluded.updated_at
    `).run(
      msg.id,
      msg.from,
      msg.to,
      msg.type,
      msg.status,
      msg.thread_id ?? null,
      msg.ack_required ? 1 : 0,
      msg.ttl_ms ?? null,
      JSON.stringify(msg.payload),
      msg.timestamp ?? now,
      now,
    );
  }

  getPendingMessages(toAgent: string, limit: number): RawEnvelope[] {
    const rows = this.db.prepare(`
      SELECT * FROM messages
      WHERE to_agent = ? AND status = 'pending'
      ORDER BY created_at ASC
      LIMIT ?
    `).all(toAgent, limit) as Record<string, unknown>[];

    return rows.map(rowToEnvelope).filter(m => !isExpired(m));
  }

  peekMessage(toAgent: string): RawEnvelope | null {
    const row = this.db.prepare(`
      SELECT * FROM messages
      WHERE to_agent = ? AND status = 'pending'
      ORDER BY created_at ASC
      LIMIT 1
    `).get(toAgent) as Record<string, unknown> | undefined;

    if (!row) return null;
    const msg = rowToEnvelope(row);
    return isExpired(msg) ? null : msg;
  }

  ackMessage(messageId: string, status: string): boolean {
    const result = this.db.prepare(`
      UPDATE messages SET status = ?, updated_at = ?
      WHERE id = ?
    `).run(status, new Date().toISOString(), messageId);
    return (result.changes as number) > 0;
  }

  getThreadMessages(threadId: string): RawEnvelope[] {
    const rows = this.db.prepare(`
      SELECT * FROM messages
      WHERE thread_id = ?
      ORDER BY created_at ASC
    `).all(threadId) as Record<string, unknown>[];

    return rows.map(rowToEnvelope);
  }

  broadcastMessage(msg: RawEnvelope): void {
    // broadcast target stored as 'broadcast' in to_agent
    this.upsertMessage({ ...msg, to: "broadcast" });
  }

  upsertTask(task: TaskPayload & { updated_by?: string; updated_at?: string }): void {
    const now = new Date().toISOString();
    this.db.prepare(`
      INSERT INTO task_ledger
        (task_id, title, description, status, priority, parent_task_id, assignee_agent_id, due_at, updated_by, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(task_id) DO UPDATE SET
        title = excluded.title,
        description = excluded.description,
        status = excluded.status,
        priority = excluded.priority,
        parent_task_id = excluded.parent_task_id,
        assignee_agent_id = excluded.assignee_agent_id,
        due_at = excluded.due_at,
        updated_by = excluded.updated_by,
        updated_at = excluded.updated_at
    `).run(
      task.task_id,
      task.title,
      task.description ?? null,
      task.status ?? "pending",
      task.priority ?? "medium",
      task.parent_task_id ?? null,
      task.assignee_agent_id ?? null,
      task.due_at ?? null,
      task.updated_by ?? null,
      task.updated_at ?? now,
    );
  }
}

let _store: SqliteMailboxStore | undefined;

export function getSqliteStore(): SqliteMailboxStore {
  _store ??= new SqliteMailboxStore();
  return _store;
}
