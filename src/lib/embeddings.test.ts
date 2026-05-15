/**
 * Citations:
 *   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 *
 * Note: the related operator runbook docs/operator-runbooks/cli-only-unblock-path.md
 * provides additional context but is not a vendor/seeds/rubrics citation per the
 * citation-guard policy (scripts/lib/citation-guard.ts).
 *
 * Shape tests only — does not load the actual @xenova/transformers model
 * (that's a 25MB ONNX download on first run; defer to integration tests
 * or the Phase 11.C semantic-grep PR).
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { DIMENSION, MODEL_ID, cosineSimilarity, resetForTests } from "./embeddings.js";

test("MODEL_ID pins all-MiniLM-L6-v2", () => {
  assert.equal(MODEL_ID, "Xenova/all-MiniLM-L6-v2");
});

test("DIMENSION matches the model's output (384)", () => {
  assert.equal(DIMENSION, 384);
});

test("cosineSimilarity is 1 for identical unit vectors", () => {
  const a = new Float32Array([1, 0, 0]);
  const b = new Float32Array([1, 0, 0]);
  assert.equal(cosineSimilarity(a, b), 1);
});

test("cosineSimilarity is 0 for orthogonal unit vectors", () => {
  const a = new Float32Array([1, 0, 0]);
  const b = new Float32Array([0, 1, 0]);
  assert.equal(cosineSimilarity(a, b), 0);
});

test("cosineSimilarity is NaN for mismatched lengths", () => {
  const a = new Float32Array([1, 0, 0]);
  const b = new Float32Array([1, 0]);
  assert.ok(Number.isNaN(cosineSimilarity(a, b)));
});

test("resetForTests clears the cached pipeline (no-throw)", () => {
  resetForTests();
});
