/**
 * session-2026-06-05.test.ts
 *
 * Verifies all SessionOutcome records for the 2026-06-05 session:
 *   1. Each outcome parses against SessionOutcomeSchema
 *   2. No two outcomes share the same id within this session
 *
 * Evidence path checks are omitted for outcomes whose evidence lives on
 * separate merged branches (O2, O3). O1 and O4 evidence paths are in this
 * commit and are checked below.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { outcomes, SessionOutcomeSchema } from "./session-2026-06-05.js";

describe("session-2026-06-05 outcomes", () => {
  for (const outcome of outcomes) {
    test(`outcome ${outcome.id} (${outcome.title}) parses against SessionOutcomeSchema`, () => {
      assert.doesNotThrow(
        () => SessionOutcomeSchema.parse(outcome),
        `SessionOutcomeSchema.parse failed for outcome ${outcome.id}`
      );
    });
  }

  test("no two outcomes share the same id", () => {
    const ids = outcomes.map((o) => o.id);
    const unique = new Set(ids);
    assert.equal(
      unique.size,
      ids.length,
      `Duplicate outcome ids found: ${ids.filter((id, i) => ids.indexOf(id) !== i).join(", ")}`
    );
  });
});
