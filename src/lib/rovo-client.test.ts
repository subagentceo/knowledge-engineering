/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
 * @tdd green
 *
 * RovoClient covers the typed fetch surface against a stubbed global fetch:
 * the three endpoints, query-string assembly, and the error path. No network.
 */

import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { RovoClient } from "./rovo-client.js";
import { listTools, getTool, checkAccess } from "./rovo-catalog.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

/** Stub fetch; capture the URL/init the client sends and return `body` as JSON. */
function stubFetch(body: unknown, ok = true, status = 200) {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    return {
      ok,
      status,
      json: async () => body,
      text: async () => JSON.stringify(body),
    } as Response;
  }) as typeof fetch;
  return calls;
}

test("listTools builds the query string and validates the envelope", async () => {
  const calls = stubFetch(listTools({ permission: "write_delete" }));
  const client = new RovoClient("http://x");
  const page = await client.listTools({ permission: "write_delete", limit: 10, afterId: "add_comment" });
  assert.equal(page.data.length, 3);
  const url = calls[0]!.url;
  assert.ok(url.includes("permission=write_delete"));
  assert.ok(url.includes("limit=10"));
  assert.ok(url.includes("after_id=add_comment"));
});

test("listTools with no params hits the bare path", async () => {
  const calls = stubFetch(listTools());
  await new RovoClient("http://x").listTools();
  assert.equal(calls[0]!.url, "http://x/v1/tools");
});

test("getTool fetches by id and validates the Tool shape", async () => {
  const calls = stubFetch(getTool("rovo_search"));
  const tool = await new RovoClient("http://x").getTool("rovo_search");
  assert.equal(tool.permission, "read_only");
  assert.equal(calls[0]!.url, "http://x/v1/tools/rovo_search");
});

test("checkAccess POSTs the body and validates the response", async () => {
  const calls = stubFetch(checkAccess({ tool_id: "add_comment", allowed: ["read_only"] }));
  const res = await new RovoClient("http://x").checkAccess({
    tool_id: "add_comment",
    allowed: ["read_only"],
  });
  assert.equal(res.allowed, false);
  assert.equal(calls[0]!.init?.method, "POST");
  assert.match(String(calls[0]!.init?.body), /add_comment/);
});

test("a non-OK response throws on every method", async () => {
  stubFetch({ error: "boom" }, false, 500);
  const client = new RovoClient("http://x");
  await assert.rejects(() => client.listTools());
  await assert.rejects(() => client.getTool("get_issue"));
  await assert.rejects(() => client.checkAccess({ tool_id: "get_issue", allowed: [] }));
});

test("default baseUrl is localhost:8000", async () => {
  const calls = stubFetch(getTool("get_projects"));
  await new RovoClient().getTool("get_projects");
  assert.ok(calls[0]!.url.startsWith("http://localhost:8000/"));
});
