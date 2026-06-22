/**
 * @cite frontend/calendar-worker/src/manifest.ts
 * @cite frontend/calendar-worker/src/calendar.app.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import {
  QUEUE_DIR,
  DOMAINS,
  ACTIONS,
  HSTS,
  secure,
  queuePath,
} from "../src/manifest.js";

describe("constants", () => {
  test("QUEUE_DIR points to cowork/data/queues", () => {
    assert.equal(QUEUE_DIR, "cowork/data/queues");
  });

  test("DOMAINS has 12 domain queues", () => {
    assert.equal(DOMAINS.length, 12);
    assert.ok(DOMAINS.includes("engineering"));
    assert.ok(DOMAINS.includes("legal"));
    assert.ok(DOMAINS.includes("compliance"));
    assert.ok(DOMAINS.includes("agent-resources"));
  });

  test("DOMAINS are unique", () => {
    assert.equal(new Set(DOMAINS).size, DOMAINS.length);
  });

  test("ACTIONS has 3 calendar actions", () => {
    assert.deepEqual([...ACTIONS], ["list_events", "check_availability", "create_event"]);
  });
});

describe("queuePath", () => {
  test("builds path from domain", () => {
    assert.equal(queuePath("engineering"), "cowork/data/queues/engineering.jsonl");
  });

  test("handles compound domain names", () => {
    assert.equal(queuePath("product-management"), "cowork/data/queues/product-management.jsonl");
  });
});

describe("secure()", () => {
  test("adds HSTS header", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("strict-transport-security"), HSTS);
  });

  test("adds x-site for calendar domain", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("x-site"), "calendar.subagentknowledge.com");
  });
});
