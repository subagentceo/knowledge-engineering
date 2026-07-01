/**
 * @cite frontend/coworkers-worker/src/shell.ts
 * @cite frontend/coworkers-worker/src/queue-snapshot.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import { coworkersPage, type CoworkersShellEnv } from "../src/shell.js";
import { COWORKERS } from "../src/manifest.js";
import type { QueueSnapshot } from "../src/queue-snapshot.js";

const FAKE_ENV: CoworkersShellEnv = {
  COWORK_HOST: "cowork.subagentknowledge.com",
};

describe("coworkersPage — populated snapshot", () => {
  const snapshot: QueueSnapshot = {
    at: "2026-06-30T12:00:00.000Z",
    domains: Object.fromEntries(
      COWORKERS.map(cw => [cw.domain, { pending: 5, in_progress: 2, blocked: 0, completed: 3, failed: 0, unknown: 0 }]),
    ),
  };

  test("renders live pending/done badges for every coworker card", () => {
    const html = coworkersPage(FAKE_ENV, snapshot);
    for (const cw of COWORKERS) {
      assert.ok(html.includes(`id="${cw.id}"`), `missing card for ${cw.id}`);
    }
    assert.ok(html.includes("5 pending"), "missing live pending badge");
    assert.ok(html.includes("3 done"), "missing live completed badge");
  });

  test("renders the snapshot's at timestamp", () => {
    const html = coworkersPage(FAKE_ENV, snapshot);
    assert.ok(html.includes(snapshot.at), "missing snapshot at timestamp");
  });

  test("does not render the no-snapshot fallback text", () => {
    const html = coworkersPage(FAKE_ENV, snapshot);
    assert.ok(!html.includes("no live snapshot yet"));
  });
});

describe("coworkersPage — empty/null snapshot", () => {
  test("falls back to model-tier badge per coworker", () => {
    const html = coworkersPage(FAKE_ENV, null);
    for (const cw of COWORKERS) {
      assert.ok(html.includes(`id="${cw.id}"`), `missing card for ${cw.id}`);
    }
    // model-tier badges (opus/haiku/sonnet) still present in fallback mode
    assert.ok(/model-badge[^>]*>(opus|haiku|sonnet)</.test(html), "missing model-tier fallback badge");
  });

  test("shows the no-snapshot-yet note", () => {
    const html = coworkersPage(FAKE_ENV, null);
    assert.ok(html.includes("no live snapshot yet"));
  });

  test("does not render pending/done badges", () => {
    const html = coworkersPage(FAKE_ENV, null);
    assert.ok(!html.includes(" pending<"));
    assert.ok(!html.includes(" done<"));
  });

  test("handles snapshot present but missing this domain's key (graceful per-domain fallback)", () => {
    const partialSnapshot: QueueSnapshot = { at: "2026-06-30T12:00:00.000Z", domains: {} };
    const html = coworkersPage(FAKE_ENV, partialSnapshot);
    assert.ok(/model-badge[^>]*>(opus|haiku|sonnet)</.test(html), "missing model-tier fallback badge");
    assert.ok(!html.includes(" pending<"));
  });
});
