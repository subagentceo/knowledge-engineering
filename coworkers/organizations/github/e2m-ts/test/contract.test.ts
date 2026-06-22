import { test } from "node:test";
import assert from "node:assert/strict";
import { parse, safeParse, type Envelope } from "../src/index.ts";

test("envelope round-trips through parse", () => {
  const env: Envelope = {
    _type: "envelope",
    id: "11111111-1111-1111-1111-111111111111",
    envelope_type: "operator",
    from: "product-manager",
    to: "operator",
    subject: "OP1 kickoff",
    at: "2026-06-20T02:00:00Z",
    state: "pending",
    requires_decision: true,
  };
  const parsed = parse(env);
  assert.equal(parsed._type, "envelope");
  assert.deepEqual(parsed, env);
});

test("a durable task parses", () => {
  const r = parse({
    _type: "task",
    id: "t1",
    queue: "engineering",
    subject: "scaffold e2m-ts",
    state: "in_progress",
    created_at: "2026-06-20T02:00:00Z",
    updated_at: "2026-06-20T02:05:00Z",
  });
  assert.equal(r._type, "task");
});

test("a contract violation fails (no throw via safeParse)", () => {
  const res = safeParse({ _type: "envelope", id: "x" });
  assert.equal(res.success, false);
});
