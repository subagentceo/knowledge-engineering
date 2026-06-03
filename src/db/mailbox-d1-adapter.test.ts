/**
 * Tests for src/db/mailbox-d1-adapter.ts — Cloudflare D1-backed async mailbox adapter.
 *
 * Uses an in-memory Map mock of the D1 binding to avoid any real DB connection.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import {
  D1MailboxStore,
  appendMailboxEvent,
  type D1Database,
  type D1PreparedStatement,
} from "./mailbox-d1-adapter.js";
import type { RawEnvelope } from "../mcp/mailbox-types.js";

// ─── local mini-DSL ──────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void | Promise<void>): Promise<void> {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      passed += 1;
      console.log(`  ✓ ${name}`);
    })
    .catch((err) => {
      failed += 1;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    });
}

function assertEqual(actual: unknown, expected: unknown, msg?: string): void {
  if (actual !== expected) {
    throw new Error(msg ?? `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertThrows(fn: () => unknown, re: RegExp): void {
  try {
    fn();
  } catch (err) {
    if (!re.test((err as Error).message)) {
      throw new Error(`error message ${JSON.stringify((err as Error).message)} did not match ${re}`);
    }
    return;
  }
  throw new Error(`expected throw matching ${re}, but no error was raised`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function assertRejects(p: Promise<unknown>, re: RegExp): Promise<void> {
  try {
    await p;
  } catch (err) {
    if (!re.test((err as Error).message)) {
      throw new Error(`rejection ${JSON.stringify((err as Error).message)} did not match ${re}`);
    }
    return;
  }
  throw new Error(`expected rejection matching ${re}, but promise resolved`);
}

// ─── mock D1 binding ──────────────────────────────────────────────────────────

/**
 * In-memory tables keyed by table name → primary-key → row.
 * exec() is a DDL no-op; tables are initialised lazily on first access.
 * prepare(sql).bind(...args).run() / .all() / .first() dispatches on SQL prefix.
 */
function makeMockD1(): { db: D1Database; tables: Map<string, Map<string, Record<string, unknown>>> } {
  const tables = new Map<string, Map<string, Record<string, unknown>>>();

  function getTable(name: string): Map<string, Record<string, unknown>> {
    if (!tables.has(name)) tables.set(name, new Map());
    return tables.get(name)!;
  }

  function makePrepared(sql: string): D1PreparedStatement {
    let boundValues: unknown[] = [];

    const stmt: D1PreparedStatement = {
      bind(...values: unknown[]): D1PreparedStatement {
        boundValues = values;
        return stmt;
      },

      async run(): Promise<{ success: boolean; changes?: number }> {
        const s = sql.trim().toUpperCase();

        if (s.startsWith("INSERT INTO MESSAGES")) {
          const tbl = getTable("messages");
          const [id, from_agent, to_agent, type, status, thread_id, ack_required, ttl_ms, payload, created_at, updated_at] = boundValues;
          const key = id as string;
          if (tbl.has(key) && s.includes("ON CONFLICT")) {
            const existing = tbl.get(key)!;
            tbl.set(key, { ...existing, status, updated_at });
            return { success: true, changes: 1 };
          }
          tbl.set(key, { id, from_agent, to_agent, type, status, thread_id, ack_required, ttl_ms, payload, created_at, updated_at });
          return { success: true, changes: 1 };
        }

        if (s.startsWith("UPDATE MESSAGES")) {
          const tbl = getTable("messages");
          // bind order: status, updated_at, id
          const [newStatus, updated_at, id] = boundValues;
          const key = id as string;
          if (!tbl.has(key)) return { success: true, changes: 0 };
          const row = tbl.get(key)!;
          tbl.set(key, { ...row, status: newStatus, updated_at });
          return { success: true, changes: 1 };
        }

        if (s.startsWith("INSERT INTO TASK_LEDGER")) {
          const tbl = getTable("task_ledger");
          const [task_id, title, description, status, priority, parent_task_id, assignee_agent_id, due_at, updated_by, updated_at] = boundValues;
          const key = task_id as string;
          if (tbl.has(key) && s.includes("ON CONFLICT")) {
            const existing = tbl.get(key)!;
            tbl.set(key, { ...existing, title, description, status, priority, parent_task_id, assignee_agent_id, due_at, updated_by, updated_at });
          } else {
            tbl.set(key, { task_id, title, description, status, priority, parent_task_id, assignee_agent_id, due_at, updated_by, updated_at });
          }
          return { success: true, changes: 1 };
        }

        if (s.startsWith("INSERT INTO MAILBOX_EVENTS")) {
          const tbl = getTable("mailbox_events");
          const [id, from_agent, to_agent, event_type, semver, status, summary, evidence, created_at] = boundValues;
          const key = id as string;
          if (!tbl.has(key)) {
            tbl.set(key, { id, from_agent, to_agent, event_type, semver, status, summary, evidence, created_at });
          }
          return { success: true, changes: 1 };
        }

        return { success: true, changes: 0 };
      },

      async all<T = Record<string, unknown>>(): Promise<{ results: T[] }> {
        const s = sql.trim().toUpperCase();

        if (s.includes("FROM MESSAGES") && s.includes("WHERE TO_AGENT") && s.includes("STATUS = 'PENDING'")) {
          const tbl = getTable("messages");
          const [toAgent, limit] = boundValues;
          const rows = [...tbl.values()]
            .filter(r => r.to_agent === toAgent && r.status === "pending")
            .sort((a, b) => (a.created_at as string).localeCompare(b.created_at as string))
            .slice(0, limit as number);
          return { results: rows as T[] };
        }

        if (s.includes("FROM MESSAGES") && s.includes("WHERE THREAD_ID")) {
          const tbl = getTable("messages");
          const [threadId] = boundValues;
          const rows = [...tbl.values()]
            .filter(r => r.thread_id === threadId)
            .sort((a, b) => (a.created_at as string).localeCompare(b.created_at as string));
          return { results: rows as T[] };
        }

        return { results: [] };
      },

      async first<T = Record<string, unknown>>(): Promise<T | null> {
        const s = sql.trim().toUpperCase();

        if (s.includes("FROM MESSAGES") && s.includes("WHERE TO_AGENT") && s.includes("STATUS = 'PENDING'")) {
          const tbl = getTable("messages");
          const [toAgent] = boundValues;
          const rows = [...tbl.values()]
            .filter(r => r.to_agent === toAgent && r.status === "pending")
            .sort((a, b) => (a.created_at as string).localeCompare(b.created_at as string));
          return (rows[0] as T) ?? null;
        }

        return null;
      },
    };

    return stmt;
  }

  const db: D1Database = {
    prepare(query: string): D1PreparedStatement {
      return makePrepared(query);
    },
    async exec(_query: string): Promise<{ count: number }> {
      return { count: 0 };
    },
    async batch<T = unknown>(statements: D1PreparedStatement[]): Promise<{ results: T[] }[]> {
      return Promise.all(statements.map(s => s.run() as Promise<{ results: T[] }>));
    },
  };

  return { db, tables };
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function makeEnvelope(overrides: Partial<RawEnvelope> = {}): RawEnvelope {
  return {
    id: `msg_test_${Math.random().toString(36).slice(2)}`,
    from: "agent-orchestrator",
    to: "agent-verifier",
    type: "ping",
    status: "pending",
    ack_required: false,
    payload: { nonce: "test" },
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

// ─── test suite ───────────────────────────────────────────────────────────────

console.log("mailbox-d1-adapter:");

await check("upsertMessage inserts a row into the messages table", async () => {
  const { db, tables } = makeMockD1();
  const store = new D1MailboxStore(db);
  const msg = makeEnvelope();
  await store.upsertMessage(msg);
  const tbl = tables.get("messages");
  if (!tbl) throw new Error("messages table not created");
  const row = tbl.get(msg.id);
  if (!row) throw new Error("row not found after upsertMessage");
  assertEqual(row.to_agent as string, "agent-verifier");
  assertEqual(row.status as string, "pending");
});

await check("getPendingMessages returns only pending rows for the target agent", async () => {
  const { db } = makeMockD1();
  const store = new D1MailboxStore(db);
  const msgA = makeEnvelope({ to: "agent-verifier", status: "pending" });
  // insert acked message directly (status already set to acked)
  const msgB = makeEnvelope({ to: "agent-verifier", status: "acked" });
  const msgC = makeEnvelope({ to: "agent-other", status: "pending" });
  await store.upsertMessage(msgA);
  await store.upsertMessage(msgB);
  await store.upsertMessage(msgC);
  const results = await store.getPendingMessages("agent-verifier", 10);
  assertEqual(results.length, 1, `expected 1 pending for agent-verifier, got ${results.length}`);
  assertEqual(results[0].id, msgA.id);
});

await check("ackMessage updates status and returns true for existing id", async () => {
  const { db } = makeMockD1();
  const store = new D1MailboxStore(db);
  const msg = makeEnvelope();
  await store.upsertMessage(msg);
  const result = await store.ackMessage(msg.id, "acked");
  assertEqual(result, true, "ackMessage should return true for existing message");
  const pending = await store.getPendingMessages("agent-verifier", 10);
  assertEqual(pending.length, 0, "no pending messages after ack");
});

await check("ackMessage returns false for a missing id", async () => {
  const { db } = makeMockD1();
  const store = new D1MailboxStore(db);
  const result = await store.ackMessage("msg_nonexistent_xyz", "acked");
  assertEqual(result, false, "ackMessage should return false when id is not found");
});

await check("broadcastMessage stores message with to_agent='broadcast'", async () => {
  const { db, tables } = makeMockD1();
  const store = new D1MailboxStore(db);
  const msg = makeEnvelope({ to: "agent-verifier" });
  await store.broadcastMessage(msg);
  const tbl = tables.get("messages");
  if (!tbl) throw new Error("messages table not created");
  const row = tbl.get(msg.id);
  if (!row) throw new Error("broadcast row not found");
  assertEqual(row.to_agent as string, "broadcast", "to_agent must be 'broadcast'");
});

await check("appendMailboxEvent inserts a row into the mailbox_events table", async () => {
  const { db, tables } = makeMockD1();
  const eventId = `evt_${Math.random().toString(36).slice(2)}`;
  await appendMailboxEvent(db, {
    id: eventId,
    from_agent: "orchestrator",
    to_agent: "verifier",
    event_type: "outcome_achieved",
    semver: "0.5.0",
    status: "achieved",
    summary: "all gates green",
    evidence: JSON.stringify({ pr: 42 }),
  });
  const tbl = tables.get("mailbox_events");
  if (!tbl) throw new Error("mailbox_events table not created");
  const row = tbl.get(eventId);
  if (!row) throw new Error("event row not found after appendMailboxEvent");
  assertEqual(row.event_type as string, "outcome_achieved");
  assertEqual(row.semver as string, "0.5.0");
  assertEqual(row.status as string, "achieved");
});

// ─── summary ─────────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
