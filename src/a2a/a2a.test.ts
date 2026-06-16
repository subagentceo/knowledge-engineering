/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/structured-outputs.md
 * @tdd green
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import { EnvelopeSchema } from "./envelope.js";
import { createA2AHook, A2AError } from "./hook.js";
import { ENTITY_REGISTRY, resolveEntity } from "./entities.js";

const NavPayload = z.object({ accountId: z.string() }).strict();
const hook = createA2AHook({
  payloads: { "cf.nav.v1": NavPayload },
  now: () => "2026-06-04T00:00:00Z",
  newId: () => "msg_000000000000",
});

test("emit stamps protocol/v/id/ts and validates", () => {
  const env = hook.emit({
    channel: "agent",
    role: "producer",
    from: { kind: "agent", id: "nav-extractor" },
    to: { kind: "agent", id: "route-planner" },
    intent: "extract.nav",
    correlationId: "msg_req000000001",
    payload: { mode: "result", schemaRef: "cf.nav.v1", data: { accountId: "abc" } },
  });
  assert.equal(env.protocol, "a2a");
  assert.equal(env.id, "msg_000000000000");
  assert.equal(env.payload.mode, "result");
});

test("producer result without correlationId is rejected", () => {
  assert.throws(
    () =>
      EnvelopeSchema.parse({
        protocol: "a2a",
        v: 1,
        id: "msg_000000000000",
        ts: "2026-06-04T00:00:00Z",
        channel: "agent",
        role: "producer",
        from: { kind: "agent", id: "a" },
        to: { kind: "agent", id: "b" },
        intent: "extract.nav",
        status: "ok",
        payload: { mode: "result", schemaRef: "cf.nav.v1", data: {} },
      }),
    /correlationId/,
  );
});

test("status:error must pair with payload.mode:error", () => {
  assert.throws(
    () =>
      EnvelopeSchema.parse({
        protocol: "a2a",
        v: 1,
        id: "msg_000000000000",
        ts: "2026-06-04T00:00:00Z",
        channel: "agent",
        role: "consumer",
        from: { kind: "agent", id: "a" },
        to: { kind: "agent", id: "b" },
        intent: "extract.nav",
        status: "error",
        payload: { mode: "result", schemaRef: "cf.nav.v1", data: {} },
      }),
    /status:error/,
  );
});

test("unknown schemaRef throws SCHEMA_UNKNOWN", () => {
  assert.throws(
    () =>
      hook.parseIn({
        protocol: "a2a",
        v: 1,
        id: "msg_000000000000",
        ts: "2026-06-04T00:00:00Z",
        channel: "agent",
        role: "consumer",
        from: { kind: "agent", id: "a" },
        to: { kind: "agent", id: "b" },
        intent: "extract.nav",
        status: "ok",
        payload: { mode: "event", schemaRef: "nope.v9", data: {} },
      }),
    (err: unknown) => err instanceof A2AError && err.code === "SCHEMA_UNKNOWN",
  );
});

test("operator render produces markdown, agent render produces json", () => {
  const base = {
    channel: "operator" as const,
    role: "producer" as const,
    from: { kind: "agent" as const, id: "x" },
    to: { kind: "operator" as const, id: "max" },
    intent: "extract.nav",
    correlationId: "msg_req000000001",
    payload: { mode: "result" as const, schemaRef: "cf.nav.v1", data: { accountId: "abc" } },
  };
  const opEnv = hook.emit(base);
  assert.match(hook.render(opEnv), /\*\*extract\.nav\*\*/);
  const agentEnv = hook.emit({ ...base, channel: "agent" });
  assert.equal(hook.render(agentEnv).startsWith("{"), true);
});

test("entity registry resolves canonical ids and has no dupes", () => {
  assert.equal(
    resolveEntity(ENTITY_REGISTRY, "skills.overview"),
    "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview.md",
  );
  assert.equal(resolveEntity(ENTITY_REGISTRY, "does.not.exist"), null);
  const ids = ENTITY_REGISTRY.entities.map((e) => e.id);
  assert.equal(new Set(ids).size, ids.length);
});
