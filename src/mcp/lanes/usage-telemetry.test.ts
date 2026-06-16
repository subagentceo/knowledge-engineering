/**
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 * @cite vendor/anthropics/code.claude.com/docs/en/costs.md
 * @tdd green
 *
 * Mock-fetch tests for the usage-telemetry bridge lane. Exercises the three
 * query tools (usage_cost_daily, usage_sessions, usage_requests), the
 * limit-defaulting + URL construction in queryWorker, and the non-ok error path.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

process.env["OTEL_QUERY_BASE_URL"] = "https://telemetry.test.example";

let lastFetchUrl: string | undefined;
let mockResponseBody: unknown = { rows: [] };
let mockOk = true;
let mockStatus = 200;
let mockStatusText = "OK";

// @ts-ignore — override global fetch for tests
globalThis.fetch = async (url: string) => {
  lastFetchUrl = url;
  return {
    ok: mockOk,
    status: mockStatus,
    text: async () => mockStatusText,
    json: async () => mockResponseBody,
  };
};

const handlers = new Map<string, Function>();
const mockServer = {
  tool: (name: string, _desc: string, _schema: unknown, handler: Function) =>
    handlers.set(name, handler),
};

const { registerUsageTelemetry } = await import("./usage-telemetry.js");
registerUsageTelemetry(mockServer as any);

const call = async (name: string, args: object) => {
  const result = await handlers.get(name)!(args);
  return JSON.parse(result.content[0].text);
};

const reset = () => {
  mockOk = true;
  mockStatus = 200;
  mockResponseBody = { rows: [] };
  lastFetchUrl = undefined;
};

test("registers all three usage_* tools", () => {
  assert.deepEqual(
    [...handlers.keys()].sort(),
    ["usage_cost_daily", "usage_requests", "usage_sessions"],
  );
});

test("usage_cost_daily hits /query/daily with provided limit", async () => {
  reset();
  mockResponseBody = { rows: [{ date: "2026-06-14", model: "claude-opus", cost_usd: 1.23 }] };
  const out = await call("usage_cost_daily", { limit: 25 });
  assert.equal(lastFetchUrl, "https://telemetry.test.example/query/daily?limit=25");
  assert.equal(out.rows[0].cost_usd, 1.23);
});

test("usage_cost_daily defaults limit to 100 when omitted", async () => {
  reset();
  await call("usage_cost_daily", {});
  assert.equal(lastFetchUrl, "https://telemetry.test.example/query/daily?limit=100");
});

test("usage_sessions hits /query/sessions", async () => {
  reset();
  mockResponseBody = { rows: [{ session_id: "s1", total_cost_usd: 0.5 }] };
  const out = await call("usage_sessions", { limit: 10 });
  assert.equal(lastFetchUrl, "https://telemetry.test.example/query/sessions?limit=10");
  assert.equal(out.rows[0].session_id, "s1");
});

test("usage_sessions defaults limit to 100 when omitted", async () => {
  reset();
  await call("usage_sessions", {});
  assert.equal(lastFetchUrl, "https://telemetry.test.example/query/sessions?limit=100");
});

test("usage_requests hits /query/requests", async () => {
  reset();
  mockResponseBody = { rows: [{ request_id: "req_1", model: "claude-haiku" }] };
  const out = await call("usage_requests", { limit: 5 });
  assert.equal(lastFetchUrl, "https://telemetry.test.example/query/requests?limit=5");
  assert.equal(out.rows[0].request_id, "req_1");
});

test("usage_requests defaults limit to 100 when omitted", async () => {
  reset();
  await call("usage_requests", {});
  assert.equal(lastFetchUrl, "https://telemetry.test.example/query/requests?limit=100");
});

test("non-ok worker response throws with status text", async () => {
  reset();
  mockOk = false;
  mockStatus = 503;
  mockStatusText = "service unavailable";
  await assert.rejects(
    () => call("usage_cost_daily", { limit: 1 }),
    /claude-telemetry worker error: 503 service unavailable/,
  );
});
