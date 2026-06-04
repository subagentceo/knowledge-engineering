/**
 * Green-when-integrated spec for Fivetran's `anthropic_claude` connector.
 * Each test passes ONLY when its precondition is satisfied live; no mocks.
 * Red today (by design) → flips green when the integration is wired end-to-end.
 *
 * Required env (any missing = that test fails fast with a clear message):
 *   ANTHROPIC_ADMIN_API_KEY    Console Admin API key (org-scoped)
 *   ANTHROPIC_API_KEY          Console standard API key (workspace-scoped)
 *   FIVETRAN_API_KEY           Fivetran account key
 *   FIVETRAN_API_SECRET        Fivetran account secret
 *   FIVETRAN_GROUP_ID          Fivetran destination group id
 *   FIVETRAN_DEST_SCHEMA       Destination schema name for this connection
 *
 * Note: P2 + P5 require ANTHROPIC_API_KEY to be set, which conflicts with the
 * OAuth-only invariant in CLAUDE.md / src/oauth/token.ts. Green here implies
 * the invariant has been scoped/relaxed for the Fivetran credential lane.
 *
 * @cite https://fivetran.com/docs/connectors/applications/claude-platform
 * @cite https://www.fivetran.com/connectors/anthropic-claude
 * @cite https://github.com/fivetran/fivetran_connector_sdk/blob/main/all_things_ai/tutorials/README.md
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const FIVETRAN = "https://api.fivetran.com/v1";
const ANTHROPIC = "https://api.anthropic.com/v1";

const need = (k: string): string => {
  const v = process.env[k];
  assert.ok(v && v.length > 0, `${k} missing — required for Fivetran anthropic_claude`);
  return v;
};

const basic = (key: string, secret: string) =>
  `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`;

test("P1: Anthropic Admin API key resolves /v1/organizations/me", async () => {
  const r = await fetch(`${ANTHROPIC}/organizations/me`, {
    headers: { "x-api-key": need("ANTHROPIC_ADMIN_API_KEY"), "anthropic-version": "2023-06-01" },
  });
  assert.equal(r.status, 200, `admin key rejected: ${r.status} ${await r.text()}`);
});

test("P2: Anthropic standard API key accepted by /v1/messages", async () => {
  const r = await fetch(`${ANTHROPIC}/messages`, {
    method: "POST",
    headers: {
      "x-api-key": need("ANTHROPIC_API_KEY"),
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1,
      messages: [{ role: "user", content: "ok" }],
    }),
  });
  assert.equal(r.status, 200, `standard key rejected: ${r.status} ${await r.text()}`);
});

test("P3: Fivetran credentials authorize against /v1/groups", async () => {
  const r = await fetch(`${FIVETRAN}/groups`, {
    headers: { Authorization: basic(need("FIVETRAN_API_KEY"), need("FIVETRAN_API_SECRET")) },
  });
  assert.equal(r.status, 200, `fivetran auth rejected: ${r.status}`);
});

test("P4: Fivetran group_id exists and is reachable", async () => {
  const r = await fetch(`${FIVETRAN}/groups/${need("FIVETRAN_GROUP_ID")}`, {
    headers: { Authorization: basic(need("FIVETRAN_API_KEY"), need("FIVETRAN_API_SECRET")) },
  });
  assert.equal(r.status, 200, `group not found: ${r.status}`);
});

test("P5: Fivetran accepts service=anthropic_claude with setup tests PASSED", async () => {
  const r = await fetch(`${FIVETRAN}/connections`, {
    method: "POST",
    headers: {
      Authorization: basic(need("FIVETRAN_API_KEY"), need("FIVETRAN_API_SECRET")),
      "content-type": "application/json",
    },
    body: JSON.stringify({
      group_id: need("FIVETRAN_GROUP_ID"),
      service: "anthropic_claude",
      run_setup_tests: true,
      paused: true,
      config: {
        api_admin_key: need("ANTHROPIC_ADMIN_API_KEY"),
        api_key: need("ANTHROPIC_API_KEY"),
        schema: need("FIVETRAN_DEST_SCHEMA"),
      },
    }),
  });
  const body = (await r.json()) as { data?: { setup_tests?: Array<{ status: string }> } };
  assert.ok(r.status === 200 || r.status === 201, `create failed: ${r.status} ${JSON.stringify(body)}`);
  const tests = body.data?.setup_tests ?? [];
  assert.ok(tests.length > 0, "no setup_tests returned");
  assert.ok(
    tests.every((t) => t.status === "PASSED"),
    `setup tests failed: ${JSON.stringify(tests)}`,
  );
});

test("P6: fivetran_connector_sdk tutorial scaffolding is reachable upstream", async () => {
  const r = await fetch(
    "https://raw.githubusercontent.com/fivetran/fivetran_connector_sdk/main/all_things_ai/tutorials/README.md",
  );
  assert.equal(r.status, 200, `tutorial unreachable: ${r.status}`);
  assert.match(await r.text(), /fivetran/i);
});
