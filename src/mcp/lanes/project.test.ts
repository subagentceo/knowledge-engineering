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

import { parseLogOutput, parsePorcelain } from "./project.js";

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

test("parseLogOutput returns empty array for empty output", () => {
  assert.deepEqual(parseLogOutput(""), []);
});

test("parseLogOutput parses a single commit line", () => {
  const r = parseLogOutput("abc1234|feat: add thing (O1)|alex|2026-05-15T10:00:00Z");
  assert.equal(r.length, 1);
  assert.deepEqual(r[0], {
    sha: "abc1234",
    subject: "feat: add thing (O1)",
    author: "alex",
    timestamp: "2026-05-15T10:00:00Z",
  });
});

test("parseLogOutput preserves pipes embedded in subject", () => {
  const r = parseLogOutput("def5678|feat: support a|b|c separator (O2)|admin|2026-05-15T11:00:00Z");
  assert.equal(r.length, 1);
  assert.equal(r[0]!.sha, "def5678");
  assert.equal(r[0]!.subject, "feat: support a|b|c separator (O2)");
  assert.equal(r[0]!.author, "admin");
  assert.equal(r[0]!.timestamp, "2026-05-15T11:00:00Z");
});

test("parseLogOutput handles multiple commits", () => {
  const stdout =
    "aaa|first|alex|2026-05-15T10:00:00Z\n" +
    "bbb|second|admin|2026-05-15T11:00:00Z\n" +
    "ccc|third|alex|2026-05-15T12:00:00Z";
  const r = parseLogOutput(stdout);
  assert.equal(r.length, 3);
  assert.deepEqual(
    r.map((c) => c.sha),
    ["aaa", "bbb", "ccc"]
  );
});

test("parseLogOutput skips malformed lines (missing pipes)", () => {
  const stdout =
    "valid|subject|alex|2026-05-15T10:00:00Z\n" +
    "no-pipes-at-all\n" +
    "one|pipe\n" +
    "two|pipes|only\n";
  const r = parseLogOutput(stdout);
  assert.equal(r.length, 1);
  assert.equal(r[0]!.sha, "valid");
});
