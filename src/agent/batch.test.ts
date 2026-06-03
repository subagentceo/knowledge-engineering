/**
 * @tdd green
 * @cite vendor/claude-sitemap/blog/message-batches-api.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/rate-limits-api.md
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { submitBatch, pollBatch, collectBatch } from "./batch.ts";
import type { BatchRequest, BatchStatus, BatchResult } from "./batch.ts";

const FAKE_TOKEN = "oauth-tok-test";

const STUB_REQUEST: BatchRequest = {
  custom_id: "req-1",
  params: {
    model: "claude-opus-4-5",
    max_tokens: 256,
    messages: [{ role: "user", content: "Hello" }],
  },
};

const STUB_STATUS: BatchStatus = {
  id: "msgbatch_abc123",
  processing_status: "in_progress",
  request_counts: { processing: 1, succeeded: 0, errored: 0, canceled: 0, expired: 0 },
  created_at: "2026-06-03T00:00:00Z",
  ended_at: null,
  expires_at: "2026-06-04T00:00:00Z",
};

function mockFetch(status: number, body: unknown): typeof fetch {
  return async (input, init) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    const method = init?.method ?? "GET";
    const headers = (init?.headers ?? {}) as Record<string, string>;
    const bodyStr = typeof init?.body === "string" ? init.body : undefined;
    return {
      ok: status >= 200 && status < 300,
      status,
      url,
      method,
      requestHeaders: headers,
      requestBody: bodyStr,
      json: async () => body,
      text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
    } as unknown as Response;
  };
}

function capturingFetch(
  status: number,
  body: unknown,
): { fetchFn: typeof fetch; captured: { url: string; method: string; headers: Record<string, string>; body?: unknown }[] } {
  const captured: { url: string; method: string; headers: Record<string, string>; body?: unknown }[] = [];
  const fetchFn: typeof fetch = async (input, init) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    const method = init?.method ?? "GET";
    const reqHeaders = (init?.headers ?? {}) as Record<string, string>;
    let parsedBody: unknown;
    if (typeof init?.body === "string") {
      try { parsedBody = JSON.parse(init.body); } catch { parsedBody = init.body; }
    }
    captured.push({ url, method, headers: reqHeaders, body: parsedBody });
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
      text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
    } as unknown as Response;
  };
  return { fetchFn, captured };
}

test("submitBatch — happy path: correct URL, method, body, auth header; returns BatchStatus", async () => {
  const { fetchFn, captured } = capturingFetch(200, STUB_STATUS);
  const result = await submitBatch(FAKE_TOKEN, [STUB_REQUEST], fetchFn);

  assert.equal(captured.length, 1);
  const req = captured[0]!;
  assert.equal(req.url, "https://api.anthropic.com/v1/messages/batches");
  assert.equal(req.method, "POST");
  assert.equal(req.headers["authorization"], `Bearer ${FAKE_TOKEN}`);
  assert.deepEqual((req.body as { requests: BatchRequest[] }).requests, [STUB_REQUEST]);
  assert.deepEqual(result, STUB_STATUS);
});

test("submitBatch — non-2xx throws with status code in message", async () => {
  const fetchFn = mockFetch(429, { error: "rate limited" });
  await assert.rejects(
    () => submitBatch(FAKE_TOKEN, [STUB_REQUEST], fetchFn),
    (err: Error) => {
      assert.ok(err.message.includes("429"), `expected 429 in: ${err.message}`);
      return true;
    },
  );
});

test("pollBatch — happy path: GET /v1/messages/batches/{id}, returns status", async () => {
  const { fetchFn, captured } = capturingFetch(200, STUB_STATUS);
  const result = await pollBatch(FAKE_TOKEN, "msgbatch_abc123", fetchFn);

  const req = captured[0]!;
  assert.equal(req.url, "https://api.anthropic.com/v1/messages/batches/msgbatch_abc123");
  assert.equal(req.method, "GET");
  assert.equal(req.headers["authorization"], `Bearer ${FAKE_TOKEN}`);
  assert.deepEqual(result, STUB_STATUS);
});

test("collectBatch — happy path: parses multi-line JSONL body, returns BatchResult[]", async () => {
  const results: BatchResult[] = [
    { custom_id: "req-1", result: { type: "succeeded", message: { content: [{ type: "text", text: "Hi" }] } } },
    { custom_id: "req-2", result: { type: "errored", error: { type: "server_error", message: "oops" } } },
  ];
  const jsonl = results.map((r) => JSON.stringify(r)).join("\n");
  const fetchFn = mockFetch(200, jsonl);

  const out = await collectBatch(FAKE_TOKEN, "msgbatch_abc123", fetchFn);
  assert.deepEqual(out, results);
});

test("collectBatch — empty results: returns []", async () => {
  const fetchFn = mockFetch(200, "");
  const out = await collectBatch(FAKE_TOKEN, "msgbatch_abc123", fetchFn);
  assert.deepEqual(out, []);
});

test("collectBatch — non-2xx throws", async () => {
  const fetchFn = mockFetch(500, { error: "internal error" });
  await assert.rejects(
    () => collectBatch(FAKE_TOKEN, "msgbatch_abc123", fetchFn),
    (err: Error) => {
      assert.ok(err.message.includes("500"), `expected 500 in: ${err.message}`);
      return true;
    },
  );
});

test("pollBatch / collectBatch — invalid batchId throws TypeError before any fetch", async () => {
  const neverFetch: typeof fetch = () => { throw new Error("fetch should not be called"); };
  await assert.rejects(
    () => pollBatch(FAKE_TOKEN, "../../etc/passwd", neverFetch),
    (err: Error) => err instanceof TypeError && err.message.includes("invalid batchId"),
  );
  await assert.rejects(
    () => collectBatch(FAKE_TOKEN, "no-msgbatch-prefix", neverFetch),
    (err: Error) => err instanceof TypeError && err.message.includes("invalid batchId"),
  );
});
