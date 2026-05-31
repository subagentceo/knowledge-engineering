/**
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/todo-tracking.md
 * @tdd red
 *
 * The pure todo-state reducer, extracted from TodoTracker so the merge logic
 * (TodoWrite replace-all vs TaskCreate/TaskUpdate upsert, ordering, progress
 * counts) is testable without driving the Agent SDK query() stream.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { TodoState } from "./todo-state.ts";

test("replaceAll seeds the list in order and assigns ids when missing", () => {
  const s = new TodoState();
  s.replaceAll([
    { content: "a", activeForm: "doing a", status: "pending" },
    { content: "b", activeForm: "doing b", status: "in_progress" },
  ]);
  const list = s.list();
  assert.deepEqual(list.map((t) => t.content), ["a", "b"]);
  assert.ok(list.every((t) => typeof t.id === "string" && t.id.length > 0));
});

test("replaceAll preserves an explicit id", () => {
  const s = new TodoState();
  s.replaceAll([{ id: "x1", content: "a", activeForm: "doing a", status: "pending" }]);
  assert.equal(s.list()[0]!.id, "x1");
});

test("replaceAll clears any prior state", () => {
  const s = new TodoState();
  s.replaceAll([{ content: "old", activeForm: "o", status: "completed" }]);
  s.replaceAll([{ content: "new", activeForm: "n", status: "pending" }]);
  assert.deepEqual(s.list().map((t) => t.content), ["new"]);
});

test("upsert inserts a new task at the end of the order", () => {
  const s = new TodoState();
  s.upsert("t1", { content: "first", activeForm: "doing first", status: "pending" });
  s.upsert("t2", { content: "second", activeForm: "doing second", status: "pending" });
  assert.deepEqual(s.list().map((t) => t.id), ["t1", "t2"]);
});

test("upsert patches an existing task without reordering or duplicating", () => {
  const s = new TodoState();
  s.upsert("t1", { content: "first", activeForm: "doing first", status: "pending" });
  s.upsert("t2", { content: "second", activeForm: "doing second", status: "pending" });
  s.upsert("t1", { status: "completed" });
  const list = s.list();
  assert.equal(list.length, 2);
  assert.deepEqual(list.map((t) => t.id), ["t1", "t2"]); // order stable
  assert.equal(list.find((t) => t.id === "t1")!.status, "completed");
  assert.equal(list.find((t) => t.id === "t1")!.content, "first"); // content preserved
});

test("upsert of a brand-new id fills sensible defaults", () => {
  const s = new TodoState();
  s.upsert("t9", { content: "only content" });
  const t = s.list()[0]!;
  assert.equal(t.status, "pending");
  assert.equal(t.activeForm, "only content"); // falls back to content
});

test("progress reports completed / in_progress / total", () => {
  const s = new TodoState();
  s.replaceAll([
    { content: "a", activeForm: "a", status: "completed" },
    { content: "b", activeForm: "b", status: "in_progress" },
    { content: "c", activeForm: "c", status: "pending" },
  ]);
  assert.deepEqual(s.progress(), { completed: 1, inProgress: 1, total: 3 });
});

test("an empty state has zero progress and an empty list", () => {
  const s = new TodoState();
  assert.deepEqual(s.progress(), { completed: 0, inProgress: 0, total: 0 });
  assert.deepEqual(s.list(), []);
});
