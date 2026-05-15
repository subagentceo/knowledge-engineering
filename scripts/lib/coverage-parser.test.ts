/**
 * @cite seeds/posture/session-start.xml
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @tdd green
 *
 * Phase B / O-B3 — lcov.info parser for the coverage threshold gate.
 *
 * Pure-function test suite. We parse fixture lcov fragments inline (no
 * disk I/O) so the test is fast and order-independent.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  parseLcov,
  filesBelowThreshold,
  type FileCoverage,
} from "./coverage-parser.js";

const FIXTURE_OK = [
  "TN:",
  "SF:/repo/src/lib/posture.ts",
  "LF:100",
  "LH:95",
  "end_of_record",
  "TN:",
  "SF:/repo/src/lib/embeddings.ts",
  "LF:50",
  "LH:48",
  "end_of_record",
  "",
].join("\n");

const FIXTURE_BELOW = [
  "TN:",
  "SF:/repo/src/lib/foo.ts",
  "LF:100",
  "LH:20",
  "end_of_record",
  "",
].join("\n");

test("parseLcov returns one entry per SF record", () => {
  const files = parseLcov(FIXTURE_OK);
  assert.equal(files.length, 2);
});

test("parseLcov computes statement coverage % per file", () => {
  const files = parseLcov(FIXTURE_OK);
  const posture = files.find((f) => f.path.endsWith("posture.ts"));
  const emb = files.find((f) => f.path.endsWith("embeddings.ts"));
  assert.ok(posture);
  assert.ok(emb);
  assert.equal(posture.lines, 100);
  assert.equal(posture.hits, 95);
  assert.equal(posture.percent, 95);
  assert.equal(emb.percent, 96);
});

test("parseLcov returns [] for empty input", () => {
  assert.deepEqual(parseLcov(""), []);
});

test("parseLcov handles zero LF (no lines instrumented) as 100%", () => {
  const zero = "TN:\nSF:/repo/src/lib/empty.ts\nLF:0\nLH:0\nend_of_record\n";
  const f = parseLcov(zero);
  assert.equal(f[0]!.percent, 100);
});

test("filesBelowThreshold returns nothing when all files pass", () => {
  const files = parseLcov(FIXTURE_OK);
  assert.deepEqual(filesBelowThreshold(files, 70), []);
});

test("filesBelowThreshold returns failing files with their %", () => {
  const files = parseLcov(FIXTURE_BELOW);
  const failed = filesBelowThreshold(files, 70);
  assert.equal(failed.length, 1);
  assert.equal(failed[0]!.percent, 20);
});

test("filesBelowThreshold at exact threshold passes (>=)", () => {
  const exact: ReadonlyArray<FileCoverage> = [
    { path: "x.ts", lines: 100, hits: 70, percent: 70 },
  ];
  assert.deepEqual(filesBelowThreshold(exact, 70), []);
});
