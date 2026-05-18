/**
 * @cite vendor/cloudflare/secrets-store.md
 * @tdd green
 *
 * OSEC3 — cf-token-mint CLI shape + template validity + no-leak
 * Refs: docs/decisions/2026-05-17-cf-token-mint.md
 * Refs: scripts/secret-mint/cf-token-mint.ts
 * Refs: infra/cloudflare/token-templates/edit-cloudflare-workers.json
 */

import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const SCRIPT = "scripts/secret-mint/cf-token-mint.ts";
const TEMPLATES_DIR = "infra/cloudflare/token-templates";

test("cf-token-mint script exists and declares all documented CLI flags", () => {
  const body = readFileSync(SCRIPT, "utf8");
  // parseArgs option keys: bare identifiers (template:) for valid JS names,
  // quoted strings ("secret-name":) for hyphenated names. Accept either.
  const checks: Array<[string, RegExp]> = [
    ["template", /\btemplate\s*:/],
    ["secret-name", /"secret-name"\s*:/],
    ["account", /\baccount\s*:/],
    ["runtime", /\bruntime\s*:/],
    ["dry-run", /"dry-run"\s*:/],
  ];
  for (const [name, re] of checks) {
    assert.match(body, re, `missing flag declaration: ${name}`);
  }
});

test("cf-token-mint never writes the minted value to disk or stdout", () => {
  const body = readFileSync(SCRIPT, "utf8");
  // Forbidden patterns: any console.log/writeFile/appendFile mentioning value
  const forbidden = [
    /console\.log\([^)]*value/,
    /writeFileSync\([^)]*value/,
    /appendFileSync\([^)]*value/,
    /writeFile\([^)]*value/,
  ];
  for (const re of forbidden) {
    assert.equal(
      body.match(re),
      null,
      `OSEC3-3 violation: script appears to leak value via ${re}`,
    );
  }
  // Sanity: should use stderr for status messages, not stdout
  assert.match(body, /console\.error\(/, "expected console.error for status logging");
});

test("at least one token template exists", () => {
  const files = readdirSync(TEMPLATES_DIR).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 1, "expected at least one template JSON");
});

test("every template uses permission_groups_named (not raw UUIDs)", () => {
  const files = readdirSync(TEMPLATES_DIR).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    const t = JSON.parse(readFileSync(`${TEMPLATES_DIR}/${f}`, "utf8"));
    assert.ok(Array.isArray(t.policies), `${f}: policies must be array`);
    for (const p of t.policies) {
      assert.ok(
        Array.isArray(p.permission_groups_named),
        `${f}: every policy must use permission_groups_named (human-readable), not raw UUIDs`,
      );
      assert.equal(
        p.permission_groups,
        undefined,
        `${f}: raw permission_groups forbidden in templates (use _named)`,
      );
    }
  }
});

test("edit-cloudflare-workers template has the expected OSEC2 scope shape", () => {
  const t = JSON.parse(
    readFileSync(`${TEMPLATES_DIR}/edit-cloudflare-workers.json`, "utf8"),
  );
  assert.ok(t.policies.length >= 3, "expected 3+ policies (account / zone / user)");
  const allNamed = t.policies.flatMap((p: { permission_groups_named: string[] }) =>
    p.permission_groups_named,
  );
  assert.ok(
    allNamed.includes("Workers Scripts Write"),
    "must include Workers Scripts Write",
  );
  assert.ok(
    allNamed.includes("Workers Routes Write"),
    "must include Workers Routes Write",
  );
  assert.ok(
    allNamed.includes("Account Settings Read"),
    "must include Account Settings Read",
  );
});

test("template substitutes ${ACCOUNT_ID} and ${ISO_DATE} placeholders", () => {
  const raw = readFileSync(
    `${TEMPLATES_DIR}/edit-cloudflare-workers.json`,
    "utf8",
  );
  assert.match(raw, /\$\{ACCOUNT_ID\}/, "expected ${ACCOUNT_ID} placeholder");
  assert.match(raw, /\$\{ISO_DATE\}/, "expected ${ISO_DATE} placeholder");
});
