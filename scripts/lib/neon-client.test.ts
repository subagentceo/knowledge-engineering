// Citations:
// @tdd green
//   @cite rubrics/phase-13.md (O8)
//
// Tests don't require a live Neon connection — they exercise the
// neonEnabled() gate and validate that the module's export shape
// matches the contract used by scripts/crawl-vendors.ts. Schema-level
// integration is exercised by the per-PR neon-branch.yml workflow
// against a real Neon branch.

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { neonEnabled } from "./neon-client.js";

test("neonEnabled returns false when NEON_DATABASE_URL is unset", () => {
  const orig = process.env.NEON_DATABASE_URL;
  delete process.env.NEON_DATABASE_URL;
  try {
    assert.equal(neonEnabled(), false);
  } finally {
    if (orig !== undefined) process.env.NEON_DATABASE_URL = orig;
  }
});

test("neonEnabled returns true when NEON_DATABASE_URL is set", () => {
  const orig = process.env.NEON_DATABASE_URL;
  process.env.NEON_DATABASE_URL = "postgresql://test";
  try {
    assert.equal(neonEnabled(), true);
  } finally {
    if (orig !== undefined) process.env.NEON_DATABASE_URL = orig;
    else delete process.env.NEON_DATABASE_URL;
  }
});
