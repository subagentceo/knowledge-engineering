/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import type { RawEnvelope } from "../mcp/mailbox-types.js";

// node:sqlite requires Node >=22.5.0; skip gracefully on older CI runners (Node 20)
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 5)) {
  console.log("SKIP mailbox-store tests (node:sqlite requires Node >=22.5.0)");
  process.exit(0);
}

// Dynamic imports so the static analysis doesn't attempt to load node:sqlite at parse time
const { default: assert } = await import("node:assert/strict");
const { default: os } = await import("node:os");
const { default: path } = await import("node:path");
const { default: fs } = await import("node:fs");
const { randomUUID } = await import("node:crypto");
const { SqliteMailboxStore } = await import("./mailbox-store.js");

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
  const m3 = makeEnvelope();

  store.upsertMessage(m1);
  store.upsertMessage(m2);
  store.upsertMessage(m3);

  const thread = store.getThreadMessages(tid);
  assert.equal(thread.length, 2);
  const ids = thread.map((m: RawEnvelope) => m.id);
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

  store.upsertTask({
    task_id: "TASK-001",
    title: "Test task",
    status: "in_progress",
    priority: "high",
    updated_by: "orchestrator",
  });

  fs.unlinkSync(db);
  console.log("PASS task ledger upsert");
}

console.log("All mailbox-store tests passed.");
