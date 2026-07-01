/**
 * @cite frontend/cowork-worker/src/shell.ts
 * @cite frontend/cowork-worker/src/queue-snapshot.ts
 * @cite cowork/scripts/queue-snapshot.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import { renderQueuesPage, coworkShell } from "../src/shell.js";
import type { QueueSnapshot } from "../src/queue-snapshot.js";

describe("renderQueuesPage — populated snapshot", () => {
  const snapshot: QueueSnapshot = {
    at: "2026-06-30T12:00:00.000Z",
    domains: {
      engineering: { pending: 126, in_progress: 0, blocked: 0, completed: 2, failed: 0, unknown: 0 },
      sales: { pending: 8, in_progress: 0, blocked: 0, completed: 0, failed: 1, unknown: 0 },
      "project-management": { pending: 19, in_progress: 0, blocked: 1, completed: 1, failed: 0, unknown: 0 },
    },
  };

  test("renders a table row for every domain in the snapshot", () => {
    const html = renderQueuesPage(snapshot);
    assert.ok(html.includes("engineering"));
    assert.ok(html.includes("sales"));
    assert.ok(html.includes("project-management"));
  });

  test("renders pending/in_progress/blocked/completed/failed counts", () => {
    const html = renderQueuesPage(snapshot);
    assert.ok(html.includes("126"), "missing engineering pending count");
    assert.ok(html.includes(">2<"), "missing engineering completed count");
    assert.ok(html.includes(">1<"), "missing blocked/completed count");
  });

  test("renders the snapshot's at timestamp", () => {
    const html = renderQueuesPage(snapshot);
    assert.ok(html.includes(snapshot.at));
  });

  test("does not render the no-snapshot-yet state", () => {
    const html = renderQueuesPage(snapshot);
    assert.ok(!html.includes("no snapshot yet"));
  });
});

describe("renderQueuesPage — null/empty snapshot", () => {
  test("shows a clear 'no snapshot yet' state", () => {
    const html = renderQueuesPage(null);
    assert.ok(html.includes("no snapshot yet"));
  });

  test("renders no table rows", () => {
    const html = renderQueuesPage(null);
    assert.ok(!html.includes("<table>"));
  });

  test("still renders a valid HTML document", () => {
    const html = renderQueuesPage(null);
    assert.ok(html.startsWith("<!DOCTYPE html>"));
    assert.ok(html.includes("</html>"));
  });
});

describe("coworkShell — /queues nav link", () => {
  test("nav includes a /queues link", () => {
    const html = coworkShell({ COWORKERS_HOST: "coworkers.subagentknowledge.com" }, null);
    assert.ok(html.includes('href="/queues"'), "missing /queues nav link");
  });
});
