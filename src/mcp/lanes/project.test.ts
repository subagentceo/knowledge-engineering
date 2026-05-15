/**
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/mcp.md
 * @cite seeds/posture/session-start.xml
 * @tdd green
 *
 * Pure-function tests for parsePorcelain. The MCP tool registration
 * path is intentionally not exercised here — it's a 3-line wrapper
 * over execFileSync + the pure parser, and the existing lanes follow
 * the same "test the pure logic" convention (see embeddings.test.ts).
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { parsePorcelain } from "./project.js";

test("parsePorcelain returns has_drift=false for empty output", () => {
  const r = parsePorcelain("");
  assert.equal(r.has_drift, false);
  assert.deepEqual(r.modified, []);
  assert.deepEqual(r.untracked, []);
  assert.deepEqual(r.deleted, []);
  assert.deepEqual(r.staged, []);
});

test("parsePorcelain classifies untracked files (?? marker)", () => {
  const r = parsePorcelain("?? new-file.ts\n?? docs/draft.md\n");
  assert.deepEqual(r.untracked, ["new-file.ts", "docs/draft.md"]);
  assert.equal(r.has_drift, true);
});

test("parsePorcelain classifies working-tree modifications ( M)", () => {
  const r = parsePorcelain(" M src/lib/foo.ts\n M README.md\n");
  assert.deepEqual(r.modified, ["src/lib/foo.ts", "README.md"]);
  assert.deepEqual(r.staged, []);
  assert.equal(r.has_drift, true);
});

test("parsePorcelain classifies staged additions (A ) as staged", () => {
  const r = parsePorcelain("A  src/lib/new.ts\n");
  assert.deepEqual(r.staged, ["src/lib/new.ts"]);
  assert.deepEqual(r.modified, []);
});

test("parsePorcelain classifies deletions (both index and worktree)", () => {
  const r = parsePorcelain("D  removed-from-index.ts\n D removed-from-worktree.ts\n");
  assert.deepEqual(r.deleted, ["removed-from-index.ts", "removed-from-worktree.ts"]);
});

test("parsePorcelain handles renames (keeps new path)", () => {
  const r = parsePorcelain("R  old-name.ts -> new-name.ts\n");
  assert.deepEqual(r.staged, ["new-name.ts"]);
});

test("parsePorcelain handles staged-and-then-modified (MM)", () => {
  const r = parsePorcelain("MM src/lib/bar.ts\n");
  assert.deepEqual(r.staged, ["src/lib/bar.ts"]);
  assert.deepEqual(r.modified, ["src/lib/bar.ts"]);
});

test("parsePorcelain ignores malformed short lines", () => {
  const r = parsePorcelain("ab\nx\n\n M valid.ts\n");
  assert.deepEqual(r.modified, ["valid.ts"]);
});
