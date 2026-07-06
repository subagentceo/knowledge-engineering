/**
 * Covers the pure queue/mailbox path + collapse helpers exported from
 * server.ts. Does NOT exercise the McpServer/stdio wiring - server.ts guards
 * its `server.connect(transport)` call behind a main-module check specifically
 * so this file can import the helpers without starting a live MCP server.
 *
 * @tdd green
 * @cite cowork/mcp/e2m-mcp/server.ts
 */
import { sep } from "node:path";
import {
  queuePath,
  mailboxPath,
  collapseById,
  collapseByIdRecency,
} from "./server.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

function assertEqual(actual: unknown, expected: unknown, msg?: string): void {
  if (actual !== expected) {
    throw new Error(msg ?? `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertDeepEqual(actual: unknown, expected: unknown, msg?: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    throw new Error(msg ?? `expected ${e}, got ${a}`);
  }
}

// ── queuePath / mailboxPath ───────────────────────────────────────────────────

check("queuePath: joins domain into QUEUE_DIR as <domain>.jsonl", () => {
  const p = queuePath("engineering");
  assertEqual(p.endsWith(`${sep}engineering.jsonl`), true);
});

check("mailboxPath: joins agentId into MAILBOX_DIR as <agentId>.jsonl", () => {
  const p = mailboxPath("product-management-coworker");
  assertEqual(p.endsWith(`${sep}product-management-coworker.jsonl`), true);
});

check("mailboxPath: sanitizes unsafe characters in agentId", () => {
  const p = mailboxPath("agent/../etc");
  assertEqual(p.includes(".."), false, "path traversal segments must be stripped");
  assertEqual(p.endsWith(`${sep}agent____etc.jsonl`), true);
});

// ── collapseById ──────────────────────────────────────────────────────────────

check("collapseById: keeps only the last row per id", () => {
  const rows = [
    { id: "a", state: "pending" },
    { id: "b", state: "pending" },
    { id: "a", state: "completed" },
  ];
  const result = collapseById(rows);
  assertEqual(result.length, 2);
  assertEqual(result.find((r) => r.id === "a")?.state, "completed");
  assertEqual(result.find((r) => r.id === "b")?.state, "pending");
});

check("collapseById: empty input returns empty array", () => {
  assertDeepEqual(collapseById([]), []);
});

// ── collapseByIdRecency ───────────────────────────────────────────────────────

check("collapseByIdRecency: sorts by `at` before collapsing, not array order", () => {
  const rows = [
    { id: "a", at: "2026-01-02T00:00:00Z", state: "later" },
    { id: "a", at: "2026-01-01T00:00:00Z", state: "earlier" },
  ];
  // Array order says "later" comes first, but `at` says "earlier" precedes
  // "later" chronologically - collapse must keep the chronologically last one.
  const result = collapseByIdRecency(rows);
  assertEqual(result.length, 1);
  assertEqual(result[0].state, "later");
});

check("collapseByIdRecency: falls back to stable array order when `at` is absent", () => {
  const rows = [
    { id: "a", state: "first" },
    { id: "a", state: "second" },
  ];
  const result = collapseByIdRecency(rows);
  assertEqual(result[0].state, "second");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
