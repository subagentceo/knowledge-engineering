/**
 * @cite cowork/schemas/envelope.ts
 * @cite cowork/schemas/envelope.zod.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import { makeEnvelope, type Envelope, type DurableTask, type Transition } from "./envelope.js";
import {
  envelopeSchema,
  durableTaskSchema,
  transitionSchema,
  envelopeTypeSchema,
  envelopeStateSchema,
  mailboxRecordSchema,
  queueRecordSchema,
  e2MRecordSchema,
  operatorEnvelopeSchema,
} from "./envelope.zod.js";

describe("envelopeTypeSchema", () => {
  test("accepts all 7 types", () => {
    for (const t of ["task", "ack", "result", "escalate", "notify", "summary", "operator"]) {
      assert.equal(envelopeTypeSchema.parse(t), t);
    }
  });

  test("rejects invalid type", () => {
    assert.throws(() => envelopeTypeSchema.parse("invalid"));
  });
});

describe("envelopeStateSchema", () => {
  test("accepts all 4 states", () => {
    for (const s of ["pending", "read", "actioned", "archived"]) {
      assert.equal(envelopeStateSchema.parse(s), s);
    }
  });
});

describe("envelopeSchema", () => {
  const valid = {
    _type: "envelope" as const,
    id: "test-id",
    envelope_type: "task" as const,
    from: "product-management-coworker",
    to: "eng-coworker",
    subject: "Do the thing",
    at: "2026-06-22T00:00:00Z",
    state: "pending" as const,
  };

  test("accepts minimal valid envelope", () => {
    const e = envelopeSchema.parse(valid);
    assert.equal(e._type, "envelope");
    assert.equal(e.envelope_type, "task");
  });

  test("accepts envelope with optional fields", () => {
    const e = envelopeSchema.parse({
      ...valid,
      priority: 5,
      thread_id: "thread-1",
      reply_to: "prev-id",
      payload: { key: "value" },
      requires_decision: true,
      decision_options: ["approve", "deny"],
      ack_required: true,
      expires_at: "2026-07-01T00:00:00Z",
    });
    assert.equal(e.priority, 5);
    assert.equal(e.requires_decision, true);
  });

  test("rejects wrong _type", () => {
    assert.throws(() => envelopeSchema.parse({ ...valid, _type: "task" }));
  });

  test("priority is 1-5 union", () => {
    for (const p of [1, 2, 3, 4, 5]) {
      envelopeSchema.parse({ ...valid, priority: p });
    }
    assert.throws(() => envelopeSchema.parse({ ...valid, priority: 0 }));
    assert.throws(() => envelopeSchema.parse({ ...valid, priority: 6 }));
  });
});

describe("durableTaskSchema", () => {
  const valid = {
    _type: "task" as const,
    id: "task-1",
    queue: "engineering",
    subject: "Build feature",
    state: "pending" as const,
    created_at: "2026-06-22T00:00:00Z",
    updated_at: "2026-06-22T00:00:00Z",
  };

  test("accepts minimal valid task", () => {
    const t = durableTaskSchema.parse(valid);
    assert.equal(t._type, "task");
    assert.equal(t.state, "pending");
  });

  test("accepts all 5 states", () => {
    for (const s of ["pending", "in_progress", "completed", "blocked", "failed"]) {
      durableTaskSchema.parse({ ...valid, state: s });
    }
  });

  test("rejects invalid state", () => {
    assert.throws(() => durableTaskSchema.parse({ ...valid, state: "cancelled" }));
  });

  test("ke_fit_score 1-5 union", () => {
    for (const k of [1, 2, 3, 4, 5]) {
      durableTaskSchema.parse({ ...valid, ke_fit_score: k });
    }
    assert.throws(() => durableTaskSchema.parse({ ...valid, ke_fit_score: 0 }));
  });
});

describe("transitionSchema", () => {
  test("accepts valid transition", () => {
    const t = transitionSchema.parse({
      _type: "transition",
      id: "task-1",
      at: "2026-06-22T00:00:00Z",
      event: "claim",
      prior_state: "pending",
      new_state: "in_progress",
      owner: "eng-coworker",
    });
    assert.equal(t._type, "transition");
    assert.equal(t.event, "claim");
  });

  test("accepts all transition events", () => {
    for (const e of ["claim", "complete", "block", "unblock", "fail", "retry", "ack", "read"]) {
      transitionSchema.parse({
        _type: "transition",
        id: "t1",
        at: "2026-06-22T00:00:00Z",
        event: e,
      });
    }
  });
});

describe("discriminated unions", () => {
  test("mailboxRecordSchema accepts envelope", () => {
    mailboxRecordSchema.parse({
      _type: "envelope",
      id: "e1",
      envelope_type: "notify",
      from: "product-management-coworker",
      to: "engineering-coworker",
      subject: "hi",
      at: "2026-06-22T00:00:00Z",
      state: "pending",
    });
  });

  test("mailboxRecordSchema accepts transition", () => {
    mailboxRecordSchema.parse({
      _type: "transition",
      id: "t1",
      at: "2026-06-22T00:00:00Z",
    });
  });

  test("queueRecordSchema accepts task", () => {
    queueRecordSchema.parse({
      _type: "task",
      id: "t1",
      queue: "engineering-coworker",
      subject: "work",
      state: "pending",
      created_at: "2026-06-22T00:00:00Z",
      updated_at: "2026-06-22T00:00:00Z",
    });
  });

  test("e2MRecordSchema accepts all three", () => {
    e2MRecordSchema.parse({ _type: "envelope", id: "e1", envelope_type: "ack", from: "a", to: "b", subject: "s", at: "now", state: "pending" });
    e2MRecordSchema.parse({ _type: "task", id: "t1", queue: "q", subject: "s", state: "pending", created_at: "now", updated_at: "now" });
    e2MRecordSchema.parse({ _type: "transition", id: "x", at: "now" });
  });
});

describe("operatorEnvelopeSchema", () => {
  test("accepts operator envelope", () => {
    operatorEnvelopeSchema.parse({
      _type: "envelope",
      id: "op1",
      envelope_type: "operator",
      from: "product-management-coworker",
      to: "operator",
      subject: "Decision needed",
      at: "2026-06-22T00:00:00Z",
      state: "pending",
      requires_decision: true,
    });
  });

  test("rejects non-operator envelope_type", () => {
    assert.throws(() =>
      operatorEnvelopeSchema.parse({
        _type: "envelope",
        id: "op1",
        envelope_type: "task",
        from: "product-management-coworker",
        to: "operator",
        subject: "s",
        at: "now",
        state: "pending",
        requires_decision: true,
      }),
    );
  });

  test("rejects non-operator recipient", () => {
    assert.throws(() =>
      operatorEnvelopeSchema.parse({
        _type: "envelope",
        id: "op1",
        envelope_type: "operator",
        from: "product-management-coworker",
        to: "eng-coworker",
        subject: "s",
        at: "now",
        state: "pending",
        requires_decision: true,
      }),
    );
  });
});

describe("makeEnvelope()", () => {
  test("creates valid envelope", () => {
    const e = makeEnvelope("product-management-coworker", "engineering-coworker", "task", { data: 1 });
    assert.equal(e._type, "envelope");
    assert.equal(e.from, "product-management-coworker");
    assert.equal(e.to, "engineering-coworker");
    assert.equal(e.envelope_type, "task");
    assert.equal(e.state, "pending");
    assert.equal(e.priority, 3);
    assert.deepEqual(e.payload, { data: 1 });
    envelopeSchema.parse(e);
  });

  test("default subject includes type and sender", () => {
    const e = makeEnvelope("product-management-coworker", "engineering-coworker", "notify");
    assert.ok(e.subject.includes("notify"));
    assert.ok(e.subject.includes("product-management-coworker"));
  });

  test("overrides apply", () => {
    const e = makeEnvelope("product-management-coworker", "engineering-coworker", "task", undefined, {
      subject: "Custom subject",
      priority: 5,
    });
    assert.equal(e.subject, "Custom subject");
    assert.equal(e.priority, 5);
  });

  test("result validates against zod schema", () => {
    const e = makeEnvelope("product-management-coworker", "operator", "operator", { urgent: true }, {
      requires_decision: true,
      decision_options: ["yes", "no"],
    });
    envelopeSchema.parse(e);
  });
});
