/**
 * Citations:
 *   @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/token-counting.md
 *   @cite seeds/posture/session-start.xml
 *
 * These tests assert shape, not live API behavior — `countTokens()` requires
 * a live OAuth token and network. We cover the OAuth-only failure path here;
 * the live path is exercised end-to-end by `scripts/context-budget.ts`.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { DEFAULT_MODEL } from "./token-counting.js";

test("DEFAULT_MODEL targets claude-opus-4-7", () => {
  assert.equal(DEFAULT_MODEL, "claude-opus-4-7");
});

test("countTokens refuses without CLAUDE_CODE_OAUTH_TOKEN", async () => {
  const prev = process.env.CLAUDE_CODE_OAUTH_TOKEN;
  const prevKey = process.env.ANTHROPIC_API_KEY;
  delete process.env.CLAUDE_CODE_OAUTH_TOKEN;
  delete process.env.ANTHROPIC_API_KEY;
  try {
    const { countTokens } = await import(`./token-counting.js?${Date.now()}`);
    await assert.rejects(
      countTokens({ system: "x", messages: [{ role: "user", content: "y" }] }),
      /CLAUDE_CODE_OAUTH_TOKEN|oauth/i,
    );
  } finally {
    if (prev !== undefined) process.env.CLAUDE_CODE_OAUTH_TOKEN = prev;
    if (prevKey !== undefined) process.env.ANTHROPIC_API_KEY = prevKey;
  }
});
