/**
 * @tdd green
 *
 * OSEC2-1 — operator does not use 1Password. The OSEC1 parity ADR
 *      and the operator-rotation runbook must not reference it.
 *
 * @cite docs/decisions/2026-05-17-secret-store-tiers.md
 * @cite docs/decisions/2026-05-17-secrets-parity.md
 * @cite docs/operator-runbooks/secret-rotation.md
 */

import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

// OSEC1's secrets-parity.md ships in sibling PR #229; this branch only
// owns the new files. Until PR #229 merges, the OSEC1 file isn't here
// — skip rather than fail, so this branch doesn't block its own CI.
// Once #229 is on main, every entry is checked.
const FILES = [
  "docs/decisions/2026-05-17-secrets-parity.md",
  "docs/operator-runbooks/secret-rotation.md",
];

// Match 1password, 1Password, "op:// scheme", and the bare `op read` command.
// We deliberately don't match "operator", "operation", etc.
const FORBIDDEN_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /1password/i, label: "1password" },
  { pattern: /\bop:\/\//, label: "op:// scheme" },
  { pattern: /\bop\s+read\b/, label: "`op read` CLI invocation" },
];

for (const file of FILES) {
  test(`${file} contains no 1Password references`, (t) => {
    if (!existsSync(file)) {
      t.skip(`${file} not present on this branch (sibling PR not merged yet)`);
      return;
    }
    const body = readFileSync(file, "utf8");
    for (const { pattern, label } of FORBIDDEN_PATTERNS) {
      const m = body.match(pattern);
      assert.equal(
        m,
        null,
        `${file} contains forbidden reference (${label}) at "${m?.[0]}". Operator does not use 1Password; see docs/decisions/2026-05-17-secret-store-tiers.md.`,
      );
    }
  });
}
