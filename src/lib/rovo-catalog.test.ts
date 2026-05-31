/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
 * @tdd green
 *
 * Rovo tool-catalog contract: schema validity, the Claude-API list envelope,
 * cursor pagination, and the checkAccess permission gate. Design provenance:
 * docs/reference/rovo-api-and-orchestrator-blueprint.md (the decomposed
 * claude-in-chrome blueprint).
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  Permission,
  ToolId,
  Tool,
  ToolList,
  CATALOG,
  listTools,
  getTool,
  checkAccess,
} from "./rovo-catalog.ts";

test("catalog has 19 tools, all schema-valid", () => {
  assert.equal(CATALOG.length, 19);
  for (const t of CATALOG) Tool.parse(t);
});

test("every tool id is unique and a valid ToolId", () => {
  const ids = CATALOG.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) ToolId.parse(id);
});

test("permission tiers match the live Rovo grouping (5 interactive, 11 read_only, 3 write_delete)", () => {
  const count = (p: Permission) => CATALOG.filter((t) => t.permission === p).length;
  assert.equal(count("interactive"), 5);
  assert.equal(count("read_only"), 11);
  assert.equal(count("write_delete"), 3);
});

test("listTools returns a valid Claude-API list envelope", () => {
  const page = listTools();
  ToolList.parse(page);
  assert.equal(page.data.length, 19);
  assert.equal(page.has_more, false);
  assert.equal(page.first_id, "create_issue");
  assert.equal(page.last_id, "create_issue_link");
});

test("listTools filters by permission", () => {
  const page = listTools({ permission: "write_delete" });
  assert.equal(page.data.length, 3);
  assert.ok(page.data.every((t) => t.permission === "write_delete"));
});

test("listTools cursor-paginates with limit + after_id + has_more", () => {
  const first = listTools({ limit: 5 });
  assert.equal(first.data.length, 5);
  assert.equal(first.has_more, true);
  const next = listTools({ limit: 5, after_id: first.last_id! });
  assert.equal(next.data[0]!.id, "get_current_user_info");
  assert.notEqual(next.data[0]!.id, first.data[0]!.id);
});

test("listTools clamps limit to [1,100]", () => {
  assert.equal(listTools({ limit: 0 }).data.length, 1);
  assert.equal(listTools({ limit: 999 }).data.length, 19);
});

test("listTools throws on an unknown after_id", () => {
  assert.throws(() => listTools({ after_id: "create_issue", permission: "write_delete" }));
});

test("getTool retrieves by id and returns null for unknown", () => {
  assert.equal(getTool("rovo_search")?.permission, "read_only");
  // Exercise the runtime null path with a value outside the ToolId union.
  assert.equal(getTool("nope" as ToolId), null);
});

test("checkAccess gates a tool against the granted permission set", () => {
  // write_delete tool denied when only read_only is granted.
  assert.deepEqual(checkAccess({ tool_id: "add_comment", allowed: ["read_only"] }), {
    tool_id: "add_comment",
    permission: "write_delete",
    allowed: false,
  });
  // allowed when its tier is in the set.
  assert.equal(
    checkAccess({ tool_id: "get_issue", allowed: ["interactive", "read_only"] }).allowed,
    true,
  );
  // empty grant denies everything.
  assert.equal(checkAccess({ tool_id: "get_projects", allowed: [] }).allowed, false);
});
