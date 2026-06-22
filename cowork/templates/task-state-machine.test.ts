/**
 * @cite cowork/templates/task-state-machine.ts
 * @cite cowork/schemas/envelope.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import {
  TaskState,
  TaskEvent,
  DurableTask,
  computeScore,
  transition,
  urgencyScore,
  stalenessScore,
} from "./task-state-machine.js";

function makeTask(overrides: Partial<DurableTask> = {}): DurableTask {
  return DurableTask.parse({
    id: "00000000-0000-4000-8000-000000000001",
    queue: "engineering",
    subject: "Test task",
    state: "pending",
    created_at: "2026-06-20T00:00:00Z",
    updated_at: "2026-06-20T00:00:00Z",
    ...overrides,
  });
}

describe("TaskState enum", () => {
  test("accepts all valid states", () => {
    for (const s of ["pending", "in_progress", "blocked", "completed", "failed"]) {
      assert.equal(TaskState.parse(s), s);
    }
  });

  test("rejects invalid state", () => {
    assert.throws(() => TaskState.parse("invalid"));
  });
});

describe("transition()", () => {
  test("pending -> claim -> in_progress", () => {
    const t = makeTask({ state: "pending" });
    const result = transition(t, { type: "claim", owner: "eng-coworker" });
    assert.equal(result.state, "in_progress");
    assert.equal(result.owner, "eng-coworker");
  });

  test("in_progress -> complete -> completed", () => {
    const t = makeTask({ state: "in_progress" });
    const result = transition(t, { type: "complete", result: { ok: true } });
    assert.equal(result.state, "completed");
    assert.deepEqual(result.result, { ok: true });
  });

  test("in_progress -> block -> blocked", () => {
    const t = makeTask({ state: "in_progress" });
    const result = transition(t, { type: "block", reason: "waiting on dep" });
    assert.equal(result.state, "blocked");
    assert.equal(result.error, "waiting on dep");
  });

  test("blocked -> unblock -> in_progress", () => {
    const t = makeTask({ state: "blocked" });
    const result = transition(t, { type: "unblock" });
    assert.equal(result.state, "in_progress");
  });

  test("in_progress -> fail -> failed", () => {
    const t = makeTask({ state: "in_progress" });
    const result = transition(t, { type: "fail", error: "timeout" });
    assert.equal(result.state, "failed");
    assert.equal(result.error, "timeout");
  });

  test("failed -> retry -> pending", () => {
    const t = makeTask({ state: "failed", error: "timeout" });
    const result = transition(t, { type: "retry" });
    assert.equal(result.state, "pending");
    assert.equal(result.error, undefined);
    assert.equal(result.owner, undefined);
  });

  test("illegal transition throws", () => {
    const t = makeTask({ state: "pending" });
    assert.throws(
      () => transition(t, { type: "complete" }),
      /illegal transition/,
    );
  });

  test("cannot claim from completed", () => {
    const t = makeTask({ state: "completed" });
    assert.throws(() => transition(t, { type: "claim", owner: "x" }));
  });

  test("cannot block from pending", () => {
    const t = makeTask({ state: "pending" });
    assert.throws(() => transition(t, { type: "block", reason: "nope" }));
  });
});

describe("computeScore()", () => {
  test("all zeros produces zero total", () => {
    const s = computeScore({
      urgency: 0, impact: 0, dependency_unblock: 0,
      effort_efficiency: 0, staleness: 0,
    });
    assert.equal(s.total, 0);
  });

  test("all 100s produces 100 total", () => {
    const s = computeScore({
      urgency: 100, impact: 100, dependency_unblock: 100,
      effort_efficiency: 100, staleness: 100,
    });
    assert.equal(s.total, 100);
  });

  test("weights sum to 1.0", () => {
    const s = computeScore({
      urgency: 50, impact: 50, dependency_unblock: 50,
      effort_efficiency: 50, staleness: 50,
    });
    assert.equal(s.total, 50);
  });

  test("urgency-only scenario", () => {
    const s = computeScore({
      urgency: 100, impact: 0, dependency_unblock: 0,
      effort_efficiency: 0, staleness: 0,
    });
    assert.equal(s.total, 30);
  });
});

describe("urgencyScore()", () => {
  const now = new Date("2026-06-22T12:00:00Z");

  test("no due_date returns 30 (neutral)", () => {
    const t = makeTask();
    assert.equal(urgencyScore(t, now), 30);
  });

  test("overdue returns 100", () => {
    const t = makeTask({ due_date: "2026-06-20" });
    assert.equal(urgencyScore(t, now), 100);
  });

  test("due today (midnight) at noon is overdue -> 100", () => {
    const t = makeTask({ due_date: "2026-06-22" });
    assert.equal(urgencyScore(t, now), 100);
  });

  test("due tomorrow returns 95", () => {
    const t = makeTask({ due_date: "2026-06-23" });
    assert.equal(urgencyScore(t, now), 95);
  });

  test("due in 2 days returns 80", () => {
    const t = makeTask({ due_date: "2026-06-24" });
    assert.equal(urgencyScore(t, now), 80);
  });

  test("due in 5 days returns 60", () => {
    const t = makeTask({ due_date: "2026-06-27" });
    assert.equal(urgencyScore(t, now), 60);
  });

  test("due in 10 days returns 40", () => {
    const t = makeTask({ due_date: "2026-07-02" });
    assert.equal(urgencyScore(t, now), 40);
  });

  test("due in 30 days returns 20", () => {
    const t = makeTask({ due_date: "2026-07-22" });
    assert.equal(urgencyScore(t, now), 20);
  });
});

describe("stalenessScore()", () => {
  const now = new Date("2026-06-22T12:00:00Z");

  test("just updated returns 0", () => {
    const t = makeTask({ updated_at: "2026-06-22T12:00:00Z" });
    assert.equal(stalenessScore(t, now), 0);
  });

  test("1 day stale returns 5", () => {
    const t = makeTask({ updated_at: "2026-06-21T12:00:00Z" });
    assert.equal(stalenessScore(t, now), 5);
  });

  test("20+ days stale caps at 100", () => {
    const t = makeTask({ updated_at: "2026-05-01T00:00:00Z" });
    assert.equal(stalenessScore(t, now), 100);
  });
});

describe("DurableTask zod schema", () => {
  test("accepts valid task", () => {
    const t = DurableTask.parse({
      id: "00000000-0000-4000-8000-000000000001",
      queue: "engineering",
      subject: "Valid task",
      state: "pending",
      created_at: "2026-06-20T00:00:00Z",
      updated_at: "2026-06-20T00:00:00Z",
    });
    assert.equal(t.subject, "Valid task");
    assert.deepEqual(t.depends_on, []);
  });

  test("rejects empty subject", () => {
    assert.throws(() => DurableTask.parse({
      id: "00000000-0000-4000-8000-000000000001",
      queue: "engineering",
      subject: "",
      state: "pending",
      created_at: "2026-06-20T00:00:00Z",
      updated_at: "2026-06-20T00:00:00Z",
    }));
  });

  test("rejects invalid uuid", () => {
    assert.throws(() => DurableTask.parse({
      id: "not-a-uuid",
      queue: "engineering",
      subject: "Bad ID",
      state: "pending",
      created_at: "2026-06-20T00:00:00Z",
      updated_at: "2026-06-20T00:00:00Z",
    }));
  });

  test("ke_fit_score clamped 1-5", () => {
    assert.throws(() => DurableTask.parse({
      id: "00000000-0000-4000-8000-000000000001",
      queue: "engineering",
      subject: "Bad KE",
      state: "pending",
      created_at: "2026-06-20T00:00:00Z",
      updated_at: "2026-06-20T00:00:00Z",
      ke_fit_score: 0,
    }));
    assert.throws(() => DurableTask.parse({
      id: "00000000-0000-4000-8000-000000000001",
      queue: "engineering",
      subject: "Bad KE",
      state: "pending",
      created_at: "2026-06-20T00:00:00Z",
      updated_at: "2026-06-20T00:00:00Z",
      ke_fit_score: 6,
    }));
  });
});
