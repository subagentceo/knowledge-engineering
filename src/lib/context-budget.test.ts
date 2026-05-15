/**
 * Citations:
 *   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/context-windows.md
 *   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/token-counting.md
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  DEFAULT_BUDGET_TOKENS,
  buildReport,
  estimateTokensCheap,
  formatReport,
} from "./context-budget.js";

test("estimateTokensCheap rounds up by length/4", () => {
  assert.equal(estimateTokensCheap(""), 0);
  assert.equal(estimateTokensCheap("abcd"), 1);
  assert.equal(estimateTokensCheap("abcde"), 2);
  assert.equal(estimateTokensCheap("a".repeat(400)), 100);
});

test("DEFAULT_BUDGET_TOKENS targets Opus 4.7 1M context", () => {
  assert.equal(DEFAULT_BUDGET_TOKENS, 1_000_000);
});

test("buildReport sums bytes + tokens across seeds", () => {
  const r = buildReport([
    { name: "a", content: "abcd" },
    { name: "b", content: "ab" },
  ]);
  assert.equal(r.rows.length, 2);
  assert.equal(r.totalBytes, 6);
  assert.equal(r.totalTokens, estimateTokensCheap("abcd") + estimateTokensCheap("ab"));
  assert.ok(r.totalPercent > 0);
});

test("buildReport honors a custom budget", () => {
  const r = buildReport([{ name: "x", content: "a".repeat(40) }], 100);
  assert.equal(r.budget, 100);
  assert.equal(r.totalTokens, 10);
  assert.equal(r.totalPercent, 10);
});

test("buildReport accepts an injected token estimator", () => {
  const r = buildReport(
    [{ name: "x", content: "ignored" }],
    1000,
    () => 42,
  );
  assert.equal(r.rows[0].tokens, 42);
});

test("formatReport renders a TOTAL line", () => {
  const r = buildReport([{ name: "x", content: "abcd" }]);
  const out = formatReport(r);
  assert.match(out, /TOTAL/);
  assert.match(out, /budget:/);
});

test("buildReport handles a zero budget without dividing by zero", () => {
  const r = buildReport([{ name: "x", content: "abcd" }], 0);
  assert.equal(r.totalPercent, 0);
  assert.equal(r.rows[0].percentOfBudget, 0);
});
