/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  LoopTaskSchema,
  V040_LOOP_TASKS,
  getLoopTask,
  nextUnblockedLoopTask,
} from "./coworker-registry.ts";

describe("V040_LOOP_TASKS", () => {
  it("every task parses against LoopTaskSchema", () => {
    for (const t of V040_LOOP_TASKS) {
      LoopTaskSchema.parse(t);
    }
  });

  it("no two tasks share the same semver", () => {
    const semvers = V040_LOOP_TASKS.map((t) => t.semver);
    const unique = new Set(semvers);
    assert.equal(unique.size, semvers.length, "duplicate semver in V040_LOOP_TASKS");
  });

  it("priorities are unique within v0.5.0", () => {
    const v050 = V040_LOOP_TASKS.filter((t) => t.semver.startsWith("v0.5.0-"));
    const priorities = v050.map((t) => t.priority);
    const unique = new Set(priorities);
    assert.equal(unique.size, priorities.length, "duplicate priority within v0.5.0");
  });

  it("getLoopTask returns the matching task or undefined", () => {
    const found = getLoopTask("v0.5.0-O1");
    assert.ok(found);
    assert.equal(found?.semver, "v0.5.0-O1");
    assert.equal(getLoopTask("v9.9.9-O99"), undefined);
  });

  it("nextUnblockedLoopTask returns the lowest-priority unblocked task", () => {
    const achieved = new Set<string>(["2026-06-03-O3", "2026-06-03-O10"]);
    const next = nextUnblockedLoopTask(achieved);
    assert.ok(next, "expected a candidate when O3 + O10 are achieved");
    assert.equal(next?.semver, "v0.5.0-O1");
  });

  it("nextUnblockedLoopTask returns undefined when nothing is unblocked", () => {
    const achieved = new Set<string>();
    const next = nextUnblockedLoopTask(achieved);
    assert.equal(next, undefined);
  });

  it("nextUnblockedLoopTask skips tasks with unmet dependencies", () => {
    const achieved = new Set<string>(["2026-06-03-O3"]);
    const next = nextUnblockedLoopTask(achieved);
    assert.ok(next);
    assert.notEqual(
      next?.semver,
      "v0.5.0-O1",
      "v0.5.0-O1 requires O10 which is not yet achieved",
    );
    assert.equal(
      next?.semver,
      "v0.5.0-O2",
      "v0.5.0-O2 only depends on O3 and has next-lowest priority",
    );
  });
});
