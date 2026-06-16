/**
 * @cite vendor/anthropics/code.claude.com/docs/en/env-vars.md
 * @cite vendor/anthropics/code.claude.com/docs/en/settings.md
 * @tdd green
 *
 * The OAuth-only invariant is the repo's hard rule: ANTHROPIC_API_KEY must
 * never be honored, and the stack must fail loud rather than silently fall
 * back to API-key billing. These tests pin that gate.
 */

import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { assertOAuthOnly, requireOAuth } from "./token.js";

const KEYS = [
  "ANTHROPIC_API_KEY",
  "CLAUDE_CODE_OAUTH_TOKEN",
  "CLAUDE_CODE_SESSION_INHERIT",
] as const;

let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));
  for (const k of KEYS) delete process.env[k];
});

afterEach(() => {
  for (const k of KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

test("assertOAuthOnly passes when ANTHROPIC_API_KEY is absent", () => {
  assert.doesNotThrow(() => assertOAuthOnly());
});

test("assertOAuthOnly throws when ANTHROPIC_API_KEY is set", () => {
  process.env.ANTHROPIC_API_KEY = "sk-ant-leaked";
  assert.throws(() => assertOAuthOnly(), /oauth-only.*ANTHROPIC_API_KEY/s);
});

test("assertOAuthOnly treats an empty-string ANTHROPIC_API_KEY as absent", () => {
  // The gate uses truthiness: an exported-but-empty key is harmless (no real
  // key value), so it does not trip the guard. Locks that boundary so a future
  // refactor to `'ANTHROPIC_API_KEY' in process.env` is a conscious choice.
  process.env.ANTHROPIC_API_KEY = "";
  assert.doesNotThrow(() => assertOAuthOnly());
});

test("requireOAuth returns the env token with source=env", () => {
  process.env.CLAUDE_CODE_OAUTH_TOKEN = "oauth-tok-123";
  assert.deepEqual(requireOAuth(), { token: "oauth-tok-123", source: "env" });
});

test("requireOAuth still enforces OAuth-only before reading a token", () => {
  process.env.ANTHROPIC_API_KEY = "sk-ant-leaked";
  process.env.CLAUDE_CODE_OAUTH_TOKEN = "oauth-tok-123";
  assert.throws(() => requireOAuth(), /oauth-only/);
});

test("requireOAuth falls back to the inherited CLI session", () => {
  process.env.CLAUDE_CODE_SESSION_INHERIT = "1";
  assert.deepEqual(requireOAuth(), { token: "", source: "cli-session" });
});

test("requireOAuth prefers an explicit env token over CLI-session inheritance", () => {
  process.env.CLAUDE_CODE_OAUTH_TOKEN = "explicit";
  process.env.CLAUDE_CODE_SESSION_INHERIT = "1";
  assert.equal(requireOAuth().source, "env");
});

test("requireOAuth fails loud when no token and no session are present", () => {
  assert.throws(() => requireOAuth(), /No OAuth token/);
});

test("an empty CLAUDE_CODE_OAUTH_TOKEN is not accepted as an env token", () => {
  process.env.CLAUDE_CODE_OAUTH_TOKEN = "";
  assert.throws(() => requireOAuth(), /No OAuth token/);
});
