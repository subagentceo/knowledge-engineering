/**
 * session-2026-06-03.test.ts
 *
 * Verifies all SessionOutcome records for the 2026-06-03 loop tick:
 *   1. Each outcome parses against SessionOutcomeSchema
 *   2. No two outcomes share the same id
 *   3. All evidence paths exist on disk
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 * @tdd green
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";

import { outcomes, SessionOutcomeSchema } from "./session-2026-06-03.js";

const REPO_ROOT = path.resolve(
  new URL(".", import.meta.url).pathname,
  "../.."
);

describe("session-2026-06-03 outcomes", () => {
  // -------------------------------------------------------------------------
  // 1. Schema validation — one test per outcome
  // -------------------------------------------------------------------------

  for (const outcome of outcomes) {
    test(`outcome ${outcome.id} (${outcome.title}) parses against SessionOutcomeSchema`, () => {
      assert.doesNotThrow(
        () => SessionOutcomeSchema.parse(outcome),
        `SessionOutcomeSchema.parse failed for outcome ${outcome.id}`
      );
    });
  }

  // -------------------------------------------------------------------------
  // 2. No duplicate ids
  // -------------------------------------------------------------------------

  test("no two outcomes share the same id", () => {
    const ids = outcomes.map((o) => o.id);
    const unique = new Set(ids);
    assert.equal(
      unique.size,
      ids.length,
      `Duplicate outcome ids found: ${ids.filter((id, i) => ids.indexOf(id) !== i).join(", ")}`
    );
  });

  // -------------------------------------------------------------------------
  // 3. All evidence paths exist on disk
  // -------------------------------------------------------------------------

  for (const outcome of outcomes) {
    for (const evidencePath of outcome.evidence) {
      test(`outcome ${outcome.id}: evidence path exists — ${evidencePath}`, () => {
        const abs = path.join(REPO_ROOT, evidencePath);
        assert.ok(
          fs.existsSync(abs),
          `Evidence path does not exist on disk: ${abs}`
        );
      });
    }
  }
});
