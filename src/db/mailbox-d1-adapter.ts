/**
 * mailbox-d1-adapter.ts — Cloudflare D1-backed async mailbox adapter.
 *
 * Async counterpart to SqliteMailboxStore; runs in Workers/D1 edge runtime.
 * Schema is a superset of mailbox-store.ts DDL, adding mailbox_events for
 * cross-session KG write fanout (v0.5.0-O5).
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import type { RawEnvelope, TaskPayload } from "../mcp/mailbox-types.js";

// ─── D1 binding types (local, no @cloudflare/workers-types needed) ────────────

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ success: boolean; changes?: number }>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<{ count: number }>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<{ results: T[] }[]>;
}

// ─── DDL ──────────────────────────────────────────────────────────────────────

const MESSAGES_DDL = `
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
`;

const CONSENSUS_DDL = `
CREATE TABLE IF NOT EXISTS consensus_votes (
  connector_id TEXT NOT NULL,
  coworker_id TEXT NOT NULL,
  voted_at TEXT NOT NULL,
  PRIMARY KEY (connector_id, coworker_id)
);
`;

const TASK_LEDGER_DDL = `
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

const MAILBOX_EVENTS_DDL = `
CREATE TABLE IF NOT EXISTS mailbox_events (
  id TEXT PRIMARY KEY,
  from_agent TEXT NOT NULL,
  to_agent TEXT NOT NULL,
  event_type TEXT NOT NULL,
  semver TEXT,
  status TEXT NOT NULL,
  summary TEXT,
  evidence TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_semver ON mailbox_events(semver) WHERE semver IS NOT NULL;
`;

// ─── row → envelope ───────────────────────────────────────────────────────────

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

// ─── D1MailboxStore ───────────────────────────────────────────────────────────

export class D1MailboxStore {
  private readonly db: D1Database;
  private tableReady: Promise<void> | undefined;

  constructor(db: D1Database) {
    this.db = db;
  }

  private async ensureTables(): Promise<void> {
    this.tableReady ??= this.createTable();
    return this.tableReady;
  }

  async createTable(): Promise<void> {
    await this.db.exec(MESSAGES_DDL);
    await this.db.exec(CONSENSUS_DDL);
    await this.db.exec(TASK_LEDGER_DDL);
    await this.db.exec(MAILBOX_EVENTS_DDL);
  }

  async upsertMessage(msg: RawEnvelope): Promise<void> {
    await this.ensureTables();
    const now = new Date().toISOString();
    await this.db
      .prepare(`
        INSERT INTO messages
          (id, from_agent, to_agent, type, status, thread_id, ack_required, ttl_ms, payload, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          status = excluded.status,
          updated_at = excluded.updated_at
      `)
      .bind(
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
      )
      .run();
  }

  async getPendingMessages(toAgent: string, limit: number): Promise<RawEnvelope[]> {
    await this.ensureTables();
    const { results } = await this.db
      .prepare(`
        SELECT * FROM messages
        WHERE to_agent = ? AND status = 'pending'
        ORDER BY created_at ASC
        LIMIT ?
      `)
      .bind(toAgent, limit)
      .all<Record<string, unknown>>();

    return results.map(rowToEnvelope).filter(m => !isExpired(m));
  }

  async peekMessage(toAgent: string): Promise<RawEnvelope | null> {
    await this.ensureTables();
    const row = await this.db
      .prepare(`
        SELECT * FROM messages
        WHERE to_agent = ? AND status = 'pending'
        ORDER BY created_at ASC
        LIMIT 1
      `)
      .bind(toAgent)
      .first<Record<string, unknown>>();

    if (!row) return null;
    const msg = rowToEnvelope(row);
    return isExpired(msg) ? null : msg;
  }

  async ackMessage(messageId: string, status: string): Promise<boolean> {
    await this.ensureTables();
    const result = await this.db
      .prepare(`
        UPDATE messages SET status = ?, updated_at = ?
        WHERE id = ?
      `)
      .bind(status, new Date().toISOString(), messageId)
      .run();
    return (result.changes ?? 0) > 0;
  }

  async getThreadMessages(threadId: string): Promise<RawEnvelope[]> {
    await this.ensureTables();
    const { results } = await this.db
      .prepare(`
        SELECT * FROM messages
        WHERE thread_id = ?
        ORDER BY created_at ASC
      `)
      .bind(threadId)
      .all<Record<string, unknown>>();

    return results.map(rowToEnvelope);
  }

  async broadcastMessage(msg: RawEnvelope): Promise<void> {
    // broadcast target stored as 'broadcast' in to_agent
    await this.upsertMessage({ ...msg, to: "broadcast" });
  }

  async upsertTask(task: TaskPayload & { updated_by?: string; updated_at?: string }): Promise<void> {
    await this.ensureTables();
    const now = new Date().toISOString();
    await this.db
      .prepare(`
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
      `)
      .bind(
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
      )
      .run();
  }
}

// ─── appendMailboxEvent ───────────────────────────────────────────────────────

export async function appendMailboxEvent(
  db: D1Database,
  event: {
    id: string;
    from_agent: string;
    to_agent: string;
    event_type: string;
    semver?: string;
    status: string;
    summary?: string;
    evidence?: string;
  },
): Promise<void> {
  await db
    .prepare(`
      INSERT INTO mailbox_events
        (id, from_agent, to_agent, event_type, semver, status, summary, evidence, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO NOTHING
    `)
    .bind(
      event.id,
      event.from_agent,
      event.to_agent,
      event.event_type,
      event.semver ?? null,
      event.status,
      event.summary ?? null,
      event.evidence ?? null,
      new Date().toISOString(),
    )
    .run();
}
