/**
 * @cite vendor/anthropics/code.claude.com/docs/en/github-actions.md
 * @tdd green
 *
 * OSEC1 — parity table + verifier behavior
 * Refs: docs/decisions/2026-05-17-secrets-parity.md
 * Refs: docs/data/secrets-parity.json
 * Refs: scripts/verify-secrets-parity.ts
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { check } from "./secrets-parity.js";

const raw = readFileSync("docs/data/secrets-parity.json", "utf8");
const table = JSON.parse(raw);

const POSTURES = new Set(["REQUIRED", "OPTIONAL", "FORBIDDEN", "NA"]);

test("parity table has expected shape", () => {
  assert.equal(typeof table.version, "number");
  assert.ok(Array.isArray(table.secrets));
  assert.ok(table.secrets.length >= 6);
  for (const row of table.secrets) {
    assert.equal(typeof row.name, "string");
    for (const k of ["local", "gh_repo", "gh_org", "cloud_env"]) {
      assert.ok(POSTURES.has(row[k]), `row ${row.name}.${k}=${row[k]}`);
    }
    assert.equal(typeof row.rationale, "string");
  }
});

test("ANTHROPIC_API_KEY is FORBIDDEN on every plane (OAuth-only invariant)", () => {
  const row = table.secrets.find((r: { name: string }) => r.name === "ANTHROPIC_API_KEY");
  assert.ok(row, "ANTHROPIC_API_KEY row must exist");
  assert.equal(row.local, "FORBIDDEN");
  assert.equal(row.gh_repo, "FORBIDDEN");
  assert.equal(row.gh_org, "FORBIDDEN");
  assert.equal(row.cloud_env, "FORBIDDEN");
});

test("CLAUDE_CODE_OAUTH_TOKEN is REQUIRED on all four planes", () => {
  const row = table.secrets.find(
    (r: { name: string }) => r.name === "CLAUDE_CODE_OAUTH_TOKEN",
  );
  assert.ok(row);
  assert.equal(row.local, "REQUIRED");
  assert.equal(row.gh_repo, "REQUIRED");
  assert.equal(row.gh_org, "REQUIRED");
  assert.equal(row.cloud_env, "REQUIRED");
});

test("verifier flags missing REQUIRED", () => {
  const violations = check(
    table,
    new Set(["CLAUDE_CODE_OAUTH_TOKEN"]),
    new Set(["CLAUDE_CODE_OAUTH_TOKEN"]),
    new Set(),
  );
  const orgViolations = violations.filter((v) => v.plane === "gh_org");
  assert.ok(
    orgViolations.length >= 4,
    "expected missing-on-org violations for at least 4 REQUIRED secrets",
  );
  for (const v of orgViolations) {
    assert.equal(v.observed, "ABSENT");
    assert.equal(v.posture, "REQUIRED");
  }
});

test("verifier flags present FORBIDDEN", () => {
  const violations = check(
    table,
    new Set(["ANTHROPIC_API_KEY", "CLAUDE_CODE_OAUTH_TOKEN"]),
    new Set(["CLAUDE_CODE_OAUTH_TOKEN"]),
    new Set(["CLAUDE_CODE_OAUTH_TOKEN"]),
  );
  const forbiddenOnLocal = violations.find(
    (v) => v.secret === "ANTHROPIC_API_KEY" && v.plane === "local",
  );
  assert.ok(forbiddenOnLocal, "expected ANTHROPIC_API_KEY local-present violation");
  assert.equal(forbiddenOnLocal.posture, "FORBIDDEN");
  assert.equal(forbiddenOnLocal.observed, "PRESENT");
});

test("verifier passes when all REQUIRED present and no FORBIDDEN", () => {
  const pick = (plane: "local" | "gh_repo" | "gh_org"): Set<string> =>
    new Set<string>(
      table.secrets
        .filter((r: Record<string, string>) => r[plane] === "REQUIRED")
        .map((r: { name: string }) => r.name),
    );
  const violations = check(table, pick("local"), pick("gh_repo"), pick("gh_org"));
  assert.equal(
    violations.length,
    0,
    `expected no violations, got: ${JSON.stringify(violations)}`,
  );
});
