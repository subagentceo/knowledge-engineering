/**
 * @cite frontend/cowork-worker/src/shell.ts
 * @cite frontend/cowork-worker/src/queue-snapshot.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import { coworkShell, type CoworkShellEnv } from "../src/shell.js";
import { COWORKERS } from "../src/manifest.js";
import type { QueueSnapshot } from "../src/queue-snapshot.js";

const FAKE_ENV: CoworkShellEnv = {
  COWORKERS_HOST: "coworkers.subagentknowledge.com",
};

describe("coworkShell — populated snapshot", () => {
  const snapshot: QueueSnapshot = {
    at: "2026-06-30T12:00:00.000Z",
    domains: Object.fromEntries(
      COWORKERS.map(cw => [cw.domain, { pending: 4, in_progress: 1, blocked: 0, completed: 2, failed: 0, unknown: 0 }]),
    ),
  };

  test("renders live pending/done badges for every coworker", () => {
    const html = coworkShell(FAKE_ENV, snapshot);
    for (const cw of COWORKERS) {
      assert.ok(html.includes(cw.id), `missing card for ${cw.id}`);
    }
    assert.ok(html.includes("4 pending"), "missing live pending badge");
    assert.ok(html.includes("2 done"), "missing live completed badge");
  });

  test("renders the snapshot's at timestamp", () => {
    const html = coworkShell(FAKE_ENV, snapshot);
    assert.ok(html.includes(snapshot.at), "missing snapshot at timestamp");
  });

  test("does not render the no-snapshot fallback text", () => {
    const html = coworkShell(FAKE_ENV, snapshot);
    assert.ok(!html.includes("no live snapshot yet"));
  });
});

describe("coworkShell — empty/null snapshot", () => {
  test("falls back to model-only badge per coworker", () => {
    const html = coworkShell(FAKE_ENV, null);
    for (const cw of COWORKERS) {
      assert.ok(html.includes(cw.id), `missing card for ${cw.id}`);
      assert.ok(html.includes(cw.model), `missing model badge for ${cw.id}`);
    }
  });

  test("shows the no-snapshot-yet note", () => {
    const html = coworkShell(FAKE_ENV, null);
    assert.ok(html.includes("no live snapshot yet"));
  });

  test("does not render pending/done badges", () => {
    const html = coworkShell(FAKE_ENV, null);
    assert.ok(!html.includes(" pending<"));
    assert.ok(!html.includes(" done<"));
  });

  test("handles snapshot present but missing this domain's key (graceful per-domain fallback)", () => {
    const partialSnapshot: QueueSnapshot = { at: "2026-06-30T12:00:00.000Z", domains: {} };
    const html = coworkShell(FAKE_ENV, partialSnapshot);
    for (const cw of COWORKERS) {
      assert.ok(html.includes(cw.model), `missing model fallback badge for ${cw.id}`);
    }
  });
});
