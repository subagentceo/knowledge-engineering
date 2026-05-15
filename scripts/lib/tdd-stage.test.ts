/**
 * @cite seeds/posture/session-start.xml
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @tdd green
 *
 * Phase B / O-B2 — TDD-stage tag parser.
 *
 * Tests parse the `@tdd <red|green|refactor>` tag from a test file's
 * docblock header. Inline fixtures only — no disk I/O.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { parseTddStage, isValidTddStage } from "./tdd-stage.js";

test("parses @tdd red from docblock", () => {
  const src = "/**\n * @tdd red\n */";
  assert.equal(parseTddStage(src), "red");
});

test("parses @tdd green from docblock", () => {
  const src = "/**\n * @tdd green\n */";
  assert.equal(parseTddStage(src), "green");
});

test("parses @tdd refactor from docblock", () => {
  const src = "/**\n * @tdd refactor\n */";
  assert.equal(parseTddStage(src), "refactor");
});

test("returns null when tag is absent", () => {
  // Fixture intentionally does NOT contain "@tdd" — parser should return null.
  const src = "/**\n * some unrelated docblock content\n */";
  assert.equal(parseTddStage(src), null);
});

test("ignores invalid stage values", () => {
  const src = "/**\n * @tdd yellow\n */";
  assert.equal(parseTddStage(src), null);
});

test("is case-sensitive on the tag (`@TDD` does NOT match)", () => {
  const src = "/**\n * @TDD red\n */";
  assert.equal(parseTddStage(src), null);
});

test("isValidTddStage accepts red/green/refactor; rejects others", () => {
  assert.equal(isValidTddStage("red"), true);
  assert.equal(isValidTddStage("green"), true);
  assert.equal(isValidTddStage("refactor"), true);
  assert.equal(isValidTddStage("yellow"), false);
  assert.equal(isValidTddStage(""), false);
});

test("only the first @tdd tag in the file is read", () => {
  const src = "/**\n * @tdd red\n */\n// later: @tdd green\n";
  assert.equal(parseTddStage(src), "red");
});
