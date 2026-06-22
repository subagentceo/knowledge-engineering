/**
 * @cite frontend/plan-worker/src/manifest.ts
 * @cite https://www.agent-native.com/docs/template-plan
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import {
  DOMAINS,
  PLAN_STATES,
  ACTIONS,
  HSTS,
  secure,
  queuePath,
} from "../src/manifest.js";

describe("constants", () => {
  test("DOMAINS has 13 domain queues", () => {
    assert.equal(DOMAINS.length, 13);
    assert.ok(DOMAINS.includes("engineering"));
    assert.ok(DOMAINS.includes("product-management"));
    assert.ok(DOMAINS.includes("marketing"));
  });

  test("DOMAINS are unique", () => {
    assert.equal(new Set(DOMAINS).size, DOMAINS.length);
  });

  test("PLAN_STATES lifecycle", () => {
    assert.deepEqual([...PLAN_STATES], ["draft", "active", "paused", "completed", "archived"]);
  });

  test("ACTIONS has 4 plan actions", () => {
    assert.deepEqual([...ACTIONS], ["list_plans", "get_plan", "create_plan", "update_plan_status"]);
  });
});

describe("queuePath", () => {
  test("builds path from domain", () => {
    assert.equal(queuePath("engineering"), "cowork/data/queues/engineering.jsonl");
  });
});

describe("secure()", () => {
  test("adds HSTS header", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("strict-transport-security"), HSTS);
  });

  test("adds x-site for plan domain", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("x-site"), "plan.subagentknowledge.com");
  });

  test("preserves body and status", async () => {
    const r = secure(new Response("body", { status: 200 }));
    assert.equal(r.status, 200);
    assert.equal(await r.text(), "body");
  });
});
