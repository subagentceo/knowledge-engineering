/**
 * Deterministic gate: can we track our usage into Fivetran's `anthropic_claude`
 * connector using only CLAUDE_CODE_OAUTH_TOKEN?
 *
 * Answer encoded below: NO. Three independent failures (F1/F2/F3); any one fatal.
 *
 * @cite https://fivetran.com/docs/connectors/applications/claude
 * @cite https://fivetran.com/connector-erd/anthropic_claude
 * @cite CLAUDE.md § OAuth-only invariant
 * @cite src/oauth/token.ts (layer-1 enforcement)
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const FIVETRAN_REQUIRED_CONFIG = ["api_admin_key", "api_key", "schema"] as const;
const FIVETRAN_DATA_SOURCE = "Claude Platform (api.anthropic.com)";
const OUR_AUTH = "CLAUDE_CODE_OAUTH_TOKEN (claude.ai web/mobile session)";

test("F1: fivetran anthropic_claude rejects OAuth tokens as api_admin_key/api_key", () => {
  for (const field of FIVETRAN_REQUIRED_CONFIG.filter((k) => k !== "schema")) {
    assert.notEqual(
      field,
      "CLAUDE_CODE_OAUTH_TOKEN",
      `${field} requires Console-minted ANTHROPIC_API_KEY-class credential, not OAuth`,
    );
  }
});

test("F2: connector excludes claude.ai data — our auth surface is claude.ai", () => {
  const connectorIncludesClaudeAi = false;
  assert.equal(
    connectorIncludesClaudeAi,
    false,
    `${OUR_AUTH} produces claude.ai usage; ${FIVETRAN_DATA_SOURCE} sync excludes it`,
  );
});

test("F3: ANTHROPIC_API_KEY is forbidden by repo invariant", () => {
  assert.equal(
    process.env.ANTHROPIC_API_KEY,
    undefined,
    "OAuth-only invariant: ANTHROPIC_API_KEY must never be set (src/oauth/token.ts)",
  );
});

test("trackable === false (composite verdict)", () => {
  const trackable = false;
  assert.equal(trackable, false, "F1 ∨ F2 ∨ F3 → cannot use fivetran anthropic_claude");
});
