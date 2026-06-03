/**
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/mcp.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { existsSync, readFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

// ─── temp mailbox dir — must be set before importing the lane ─────────────────

const tmpDir = mkdtempSync(join(tmpdir(), "mailbox-test-"));
process.env.MAILBOX_DIR = tmpDir;
process.env.TASK_LEDGER_JSONL = join(tmpDir, "_task_ledger.jsonl");

const { registerMailbox } = await import("./mailbox.js");

// ─── lightweight mock McpServer ───────────────────────────────────────────────

const handlers = new Map<string, Function>();
const mockServer = {
  tool: (name: string, _desc: string, _schema: unknown, handler: Function) =>
    handlers.set(name, handler),
};
registerMailbox(mockServer as any);

const call = async (name: string, args: object) => {
  const result = await handlers.get(name)!(args);
  return JSON.parse(result.content[0].text);
};

// ─── tests ────────────────────────────────────────────────────────────────────

test("mailbox_send + mailbox_recv round-trip: send ping, recv returns it, second recv returns null", async () => {
  const { message_id } = await call("mailbox_send", {
    from: "orchestrator",
    to: "agent_a",
    type: "ping",
    payload: { nonce: "hello" },
    ack_required: false,
  });
  assert.ok(message_id, "message_id assigned");

  const { message } = await call("mailbox_recv", { agent_id: "agent_a" });
  assert.ok(message, "message received");
  assert.equal(message.id, message_id);
  assert.equal(message.type, "ping");
  assert.deepEqual(message.payload, { nonce: "hello" });

  const { message: second } = await call("mailbox_recv", { agent_id: "agent_a" });
  assert.equal(second, null, "queue is empty after first recv");
});

test("mailbox_peek does not consume: peek 3 times, still 1 pending message", async () => {
  const { message_id } = await call("mailbox_send", {
    from: "orchestrator",
    to: "agent_peek",
    type: "ping",
    payload: { nonce: "peek-test" },
    ack_required: true,
  });
  assert.ok(message_id);

  for (let i = 0; i < 3; i++) {
    const { messages, total_pending } = await call("mailbox_peek", { agent_id: "agent_peek" });
    assert.equal(total_pending, 1, `peek ${i + 1} should still show 1 pending`);
    assert.equal(messages.length, 1);
  }
});

test("mailbox_ack: send, recv (in-flight), ack → peek returns 0 pending", async () => {
  const { message_id } = await call("mailbox_send", {
    from: "orchestrator",
    to: "agent_ack",
    type: "ping",
    payload: { nonce: "ack-test" },
    ack_required: true,
  });

  const { message } = await call("mailbox_recv", { agent_id: "agent_ack" });
  assert.ok(message, "should receive in-flight message");
  assert.equal(message.id, message_id);

  const ackResult = await call("mailbox_ack", {
    agent_id: "agent_ack",
    message_id,
    status: "acked",
  });
  assert.equal(ackResult.acked, true);

  const { total_pending } = await call("mailbox_peek", { agent_id: "agent_ack" });
  assert.equal(total_pending, 0, "no pending messages after ack");
});

test("mailbox_outcome shorthand: writes outcome to recipient JSONL, recv returns type=outcome payload", async () => {
  const { message_id, outcome_id } = await call("mailbox_outcome", {
    from: "verifier",
    to: "agent_outcome_recv",
    outcome_id: "outcome_001",
    description: "Phase 3 gate passed",
    status: "achieved",
    evidence: ["rubrics/phase-3.md green"],
  });
  assert.ok(message_id);
  assert.equal(outcome_id, "outcome_001");

  const { message } = await call("mailbox_recv", { agent_id: "agent_outcome_recv" });
  assert.ok(message);
  assert.equal(message.type, "outcome");
  assert.equal(message.payload.outcome_id, "outcome_001");
  assert.equal(message.payload.status, "achieved");
  assert.equal(message.payload.description, "Phase 3 gate passed");
});

test("mailbox_task_sync: syncs to ledger + notifies assignee", async () => {
  const { task_id: returned_task_id, synced, message_id } = await call("mailbox_task_sync", {
    from: "orchestrator",
    task_id: "task_001",
    title: "Ship the verifier",
    description: "Run npm run verify and confirm green",
    status: "pending",
    priority: "high",
    assignee_agent_id: "agent_assignee",
  });
  assert.equal(returned_task_id, "task_001");
  assert.equal(synced, true);
  assert.ok(message_id, "assignee notification message_id present");

  // _task_ledger.jsonl must contain the task
  const ledger = process.env.TASK_LEDGER_JSONL!;
  assert.ok(existsSync(ledger), "ledger file created");
  const lines = readFileSync(ledger, "utf-8").split("\n").filter(Boolean);
  const lastEntry = JSON.parse(lines[lines.length - 1]!);
  assert.equal(lastEntry.task_id, "task_001");
  assert.equal(lastEntry.title, "Ship the verifier");

  // assignee must receive a task-type message
  const { message } = await call("mailbox_recv", { agent_id: "agent_assignee" });
  assert.ok(message, "assignee receives notification");
  assert.equal(message.type, "task");
  assert.equal(message.payload.task_id, "task_001");
});

test("TTL expiry: send with ttl_ms=1, sleep 5ms, recv returns null", async () => {
  await call("mailbox_send", {
    from: "orchestrator",
    to: "agent_ttl",
    type: "ping",
    payload: { nonce: "ttl-test" },
    ack_required: false,
    ttl_ms: 1,
  });

  await sleep(5);

  const { message } = await call("mailbox_recv", { agent_id: "agent_ttl" });
  assert.equal(message, null, "expired message not delivered");
});

test("broadcast: send to 'broadcast', two different agents recv the same message", async () => {
  const { message_id } = await call("mailbox_send", {
    from: "orchestrator",
    to: "broadcast",
    type: "ping",
    payload: { nonce: "broadcast-test" },
    ack_required: false,
  });
  assert.ok(message_id);

  const { message: msgA } = await call("mailbox_recv", { agent_id: "agent_bcast_1" });
  assert.ok(msgA, "agent_bcast_1 receives broadcast");
  assert.equal(msgA.id, message_id);

  const { message: msgB } = await call("mailbox_recv", { agent_id: "agent_bcast_2" });
  assert.ok(msgB, "agent_bcast_2 receives same broadcast");
  assert.equal(msgB.id, message_id);
});

test("mailbox_thread: send 3 messages with same thread_id from different agents, thread returns all 3 sorted by timestamp", async () => {
  const THREAD = `thread_${Date.now()}`;

  await call("mailbox_send", {
    from: "agent_x",
    to: "agent_thread_recv",
    type: "ping",
    payload: { nonce: "t1" },
    thread_id: THREAD,
    ack_required: false,
  });
  await sleep(2);
  await call("mailbox_send", {
    from: "agent_y",
    to: "agent_thread_recv",
    type: "ping",
    payload: { nonce: "t2" },
    thread_id: THREAD,
    ack_required: false,
  });
  await sleep(2);
  await call("mailbox_send", {
    from: "agent_z",
    to: "agent_thread_recv",
    type: "ping",
    payload: { nonce: "t3" },
    thread_id: THREAD,
    ack_required: false,
  });

  const { messages, agent_count } = await call("mailbox_thread", { thread_id: THREAD });
  assert.equal(messages.length, 3, "thread returns all 3 messages");
  assert.deepEqual(
    messages.map((m: { payload: { nonce: string } }) => m.payload.nonce),
    ["t1", "t2", "t3"],
    "messages sorted by timestamp ascending"
  );
  assert.ok(agent_count >= 1, "agent_count reported");
});

// ─── cleanup ──────────────────────────────────────────────────────────────────

process.on("exit", () => {
  try { rmSync(tmpDir, { recursive: true, force: true }); } catch { /* best-effort */ }
});
