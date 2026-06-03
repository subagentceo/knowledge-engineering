/**
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite src/db/mailbox-store.ts
 * @cite src/mcp/mailbox-types.ts
 */

import * as assert from "node:assert/strict";
import * as os from "node:os";
import * as path from "node:path";
import * as fs from "node:fs";
import { randomUUID } from "node:crypto";
import { SqliteMailboxStore } from "./mailbox-store.js";
import type { RawEnvelope } from "../mcp/mailbox-types.js";

function tmpDb(): string {
  return path.join(os.tmpdir(), `ke-mailbox-test-${randomUUID()}.db`);
}

function makeEnvelope(overrides: Partial<RawEnvelope> = {}): RawEnvelope {
  return {
    id: `msg_${randomUUID().replace(/-/g, "")}`,
    from: "agent-a",
    to: "agent-b",
    type: "ping",
    status: "pending",
    ack_required: false,
    payload: { nonce: "test" },
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

// ── insert + query ────────────────────────────────────────────────────────────

{
  const db = tmpDb();
  const store = new SqliteMailboxStore(db);

  const msg = makeEnvelope();
  store.upsertMessage(msg);

  const results = store.getPendingMessages("agent-b", 10);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, msg.id);
  assert.equal(results[0].status, "pending");
  assert.deepEqual(results[0].payload, { nonce: "test" });

  fs.unlinkSync(db);
  console.log("PASS insert+query");
}

// ── ack ───────────────────────────────────────────────────────────────────────

{
  const db = tmpDb();
  const store = new SqliteMailboxStore(db);

  const msg = makeEnvelope();
  store.upsertMessage(msg);

  const acked = store.ackMessage(msg.id, "acked");
  assert.equal(acked, true);

  const pending = store.getPendingMessages("agent-b", 10);
  assert.equal(pending.length, 0);

  const notFound = store.ackMessage("msg_nonexistent", "acked");
  assert.equal(notFound, false);

  fs.unlinkSync(db);
  console.log("PASS ack");
}

// ── TTL expiry ────────────────────────────────────────────────────────────────

{
  const db = tmpDb();
  const store = new SqliteMailboxStore(db);

  // already expired: timestamp 10s ago, TTL 1ms
  const expired = makeEnvelope({
    id: `msg_${randomUUID().replace(/-/g, "")}`,
    ttl_ms: 1,
    timestamp: new Date(Date.now() - 10_000).toISOString(),
  });
  store.upsertMessage(expired);

  const results = store.getPendingMessages("agent-b", 10);
  assert.equal(results.length, 0, "expired message must be filtered");

  const peeked = store.peekMessage("agent-b");
  assert.equal(peeked, null, "peek on expired must return null");

  fs.unlinkSync(db);
  console.log("PASS TTL expiry");
}

// ── thread retrieval ──────────────────────────────────────────────────────────

{
  const db = tmpDb();
  const store = new SqliteMailboxStore(db);

  const tid = `thread_${randomUUID().replace(/-/g, "")}`;
  const m1 = makeEnvelope({ thread_id: tid });
  const m2 = makeEnvelope({ thread_id: tid, from: "agent-b", to: "agent-a" });
  const m3 = makeEnvelope(); // no thread_id

  store.upsertMessage(m1);
  store.upsertMessage(m2);
  store.upsertMessage(m3);

  const thread = store.getThreadMessages(tid);
  assert.equal(thread.length, 2);
  const ids = thread.map(m => m.id);
  assert.ok(ids.includes(m1.id));
  assert.ok(ids.includes(m2.id));
  assert.ok(!ids.includes(m3.id));

  fs.unlinkSync(db);
  console.log("PASS thread retrieval");
}

// ── broadcast ─────────────────────────────────────────────────────────────────

{
  const db = tmpDb();
  const store = new SqliteMailboxStore(db);

  const msg = makeEnvelope({ to: "broadcast" });
  store.broadcastMessage(msg);

  const results = store.getPendingMessages("broadcast", 10);
  assert.equal(results.length, 1);
  assert.equal(results[0].to, "broadcast");

  fs.unlinkSync(db);
  console.log("PASS broadcast");
}

// ── task ledger upsert ────────────────────────────────────────────────────────

{
  const db = tmpDb();
  const store = new SqliteMailboxStore(db);

  store.upsertTask({
    task_id: "TASK-001",
    title: "Test task",
    status: "pending",
    priority: "high",
    updated_by: "orchestrator",
  });

  // upsert again with new status
  store.upsertTask({
    task_id: "TASK-001",
    title: "Test task",
    status: "in_progress",
    priority: "high",
    updated_by: "orchestrator",
  });

  // if we can upsert without error, pass — we'd need a direct query to verify status
  // but the store doesn't expose a getTask. Verify no exception thrown.
  fs.unlinkSync(db);
  console.log("PASS task ledger upsert");
}

console.log("All mailbox-store tests passed.");
