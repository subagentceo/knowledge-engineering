/**
 * @tdd green
 * @cite data/models/kimball_ddl.sql
 * @cite rubrics/phase-0.md
 *
 * TDD tests for scripts/lib/cube-guard.ts.
 *
 * RED:    SQL missing @cube block before CREATE TABLE → fails
 * GREEN:  Properly annotated SQL → passes
 * REFACTOR: @cube.measure missing type: annotation → fails
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { checkSql } from "./cube-guard.js";

// ── RED scenario ─────────────────────────────────────────────────────────────
// CREATE TABLE dw.foo with no preceding @cube name= block → missing-cube-block
test("RED: CREATE TABLE dw.* without @cube block fails", () => {
  const sql = `
-- some comment without cube annotation
CREATE TABLE IF NOT EXISTS dw.foo (
    id BIGINT PRIMARY KEY
);
`.trim();
  const findings = checkSql(sql, "test.sql");
  const cubeFindings = findings.filter((f) => f.reason === "missing-cube-block");
  assert.ok(cubeFindings.length > 0, "expected missing-cube-block finding");
});

// ── GREEN scenario ────────────────────────────────────────────────────────────
// Proper @cube name=...version=...type=... block + @cube.measure with type:count
test("GREEN: properly annotated SQL with type: passes", () => {
  const sql = `
-- @cube name=DimFoo version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.foo
-- @cube.description  Test dimension.
-- @cube.measure      row_count  COUNT(*)  type:count
-- @cube.dimension    id  BIGINT pk
CREATE TABLE IF NOT EXISTS dw.foo (
    id BIGINT PRIMARY KEY
);
`.trim();
  const findings = checkSql(sql, "test.sql");
  assert.equal(
    findings.length,
    0,
    `expected 0 findings, got: ${JSON.stringify(findings)}`,
  );
});

// ── REFACTOR scenario ─────────────────────────────────────────────────────────
// @cube.measure line without type: annotation → invalid-measure-type
test("REFACTOR: @cube.measure without type: annotation fails", () => {
  const sql = `
-- @cube name=DimBar version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.bar
-- @cube.measure      row_count  COUNT(*)
CREATE TABLE IF NOT EXISTS dw.bar (
    id BIGINT PRIMARY KEY
);
`.trim();
  const findings = checkSql(sql, "test.sql");
  const typeFindings = findings.filter((f) => f.reason === "invalid-measure-type");
  assert.ok(typeFindings.length > 0, "expected invalid-measure-type finding");
  assert.ok(
    typeFindings[0].detail.includes("missing type:"),
    `expected 'missing type:' in detail, got: ${typeFindings[0].detail}`,
  );
});
