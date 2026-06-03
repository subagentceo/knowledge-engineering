/**
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite src/mcp/lanes/comms.ts
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

// ─── mock fetch ───────────────────────────────────────────────────────────────

let lastFetchUrl: string | undefined;
let lastFetchBody: unknown;
let mockResponseBody: unknown = { ok: true, ts: "1234567890.000001" };

// @ts-ignore — override global fetch for tests
globalThis.fetch = async (url: string, init?: RequestInit) => {
  lastFetchUrl = url;
  lastFetchBody = init?.body ? JSON.parse(init.body as string) : undefined;
  return {
    ok: true,
    json: async () => mockResponseBody,
  };
};

// ─── lightweight mock McpServer ───────────────────────────────────────────────

const handlers = new Map<string, Function>();
const mockServer = {
  tool: (name: string, _desc: string, _schema: unknown, handler: Function) =>
    handlers.set(name, handler),
};

const { registerComms } = await import("./comms.js");
registerComms(mockServer as any);

const call = async (name: string, args: object) => {
  const result = await handlers.get(name)!(args);
  return JSON.parse(result.content[0].text);
};

// ─── tests ────────────────────────────────────────────────────────────────────

test("comms_notify_outcome achieved: posts correct Slack text", async () => {
  process.env["SLACK_BOT_TOKEN"] = "xoxb-test-token";
  process.env["SLACK_CHANNEL_ID"] = "C0TEST1234";

  const result = await call("comms_notify_outcome", {
    outcome_id: "v0.4.0-O1",
    status: "achieved",
    title: "feat(comms): Slack comms lane",
    branch: "alexzh/KENG-1057",
    pr_number: 42,
    commit_sha: "abcdef1234567890",
    cost_usd: 0.0123,
    cache_hit_rate: 87.5,
  });

  assert.equal(result.posted, true);
  assert.ok(lastFetchUrl?.includes("chat.postMessage"));
  const body = lastFetchBody as { channel: string; text: string };
  assert.equal(body.channel, "C0TEST1234");
  assert.ok(body.text.includes("✓ v0.4.0-O1 merged to main"));
  assert.ok(body.text.includes("feat(comms): Slack comms lane"));
  assert.ok(body.text.includes("abcdef12"));
  assert.ok(body.text.includes("$0.0123"));
  assert.ok(body.text.includes("88%"));
});

test("comms_notify_outcome blocked: posts warning text", async () => {
  process.env["SLACK_BOT_TOKEN"] = "xoxb-test-token";
  process.env["SLACK_CHANNEL_ID"] = "C0TEST1234";

  const result = await call("comms_notify_outcome", {
    outcome_id: "v0.4.0-O2",
    status: "blocked",
    title: "some task",
    blocked_reason: "CI failed on lint",
    evidence: ["test-failure.log", "lint-errors.txt"],
  });

  assert.equal(result.posted, true);
  const body = lastFetchBody as { text: string };
  assert.ok(body.text.includes("⚠ v0.4.0-O2 BLOCKED"));
  assert.ok(body.text.includes("CI failed on lint"));
  assert.ok(body.text.includes("test-failure.log"));
});

test("comms_notify_outcome no-op when SLACK_BOT_TOKEN not set", async () => {
  delete process.env["SLACK_BOT_TOKEN"];
  delete process.env["SLACK_CHANNEL_ID"];

  lastFetchUrl = undefined;

  const result = await call("comms_notify_outcome", {
    outcome_id: "v0.4.0-O3",
    status: "achieved",
    title: "some task",
  });

  assert.equal(result.posted, true, "no-op path should return ok:true");
  assert.equal(lastFetchUrl, undefined, "fetch must not be called without token");
});

test("comms_notify_blocked: posts blocked message", async () => {
  process.env["SLACK_BOT_TOKEN"] = "xoxb-test-token";
  process.env["SLACK_CHANNEL_ID"] = "C0TEST1234";

  const result = await call("comms_notify_blocked", {
    outcome_id: "v0.4.0-O4",
    reason: "dependency conflict",
    evidence: ["package-lock.json diff"],
  });

  assert.equal(result.posted, true);
  const body = lastFetchBody as { text: string };
  assert.ok(body.text.includes("⚠ v0.4.0-O4 BLOCKED"));
  assert.ok(body.text.includes("dependency conflict"));
  assert.ok(body.text.includes("package-lock.json diff"));
});

test("comms_post: sends arbitrary text", async () => {
  process.env["SLACK_BOT_TOKEN"] = "xoxb-test-token";
  process.env["SLACK_CHANNEL_ID"] = "C0TEST1234";

  const result = await call("comms_post", { text: "hello agent-ops" });
  assert.equal(result.posted, true);
  const body = lastFetchBody as { text: string };
  assert.equal(body.text, "hello agent-ops");
});

test("comms_read_feedback: returns messages from conversations.history", async () => {
  process.env["SLACK_BOT_TOKEN"] = "xoxb-test-token";
  process.env["SLACK_CHANNEL_ID"] = "C0TEST1234";

  mockResponseBody = {
    ok: true,
    messages: [{ text: "operator msg 1", ts: "1" }, { text: "operator msg 2", ts: "2" }],
  };

  const result = await call("comms_read_feedback", { limit: 5 });
  assert.equal(result.count, 2);
  assert.ok(lastFetchUrl?.includes("conversations.history"));

  // restore
  mockResponseBody = { ok: true, ts: "1234567890.000001" };
});
