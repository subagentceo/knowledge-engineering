#!/usr/bin/env tsx
/**
 * nimbleway-crud CREATE (OIT1, follows OSEC3 pattern)
 *
 * Mint a Nimble admin API key via REST. Endpoint shape assumed from
 * https://docs.nimbleway.com; first-run operator should confirm and
 * update API_BASE + AUTH_SCHEME constants if needed.
 *
 * @cite plugins/macos-it-admin/skills/nimbleway-crud/SKILL.md
 * @cite docs/decisions/2026-05-17-cf-token-mint.md
 */

import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";

const API_BASE = "https://api.webit.live";
const AUTH_SCHEME = "Basic" as "Basic" | "Bearer";
const RESPONSE_KEY_FIELD = "key" as const;

interface NimbleApiKey {
  id: string;
  name: string;
  key?: string;
  value?: string;
  api_key?: string;
  created_at: string;
}

function fail(msg: string): never {
  console.error(`[OIT1-nim] ${msg}`);
  process.exit(1);
}

function keychainRead(service: string): string {
  const r = spawnSync(
    "security",
    ["find-generic-password", "-s", service, "-w"],
    { encoding: "utf8" },
  );
  if (r.status !== 0) {
    fail(`keychain miss for "${service}". Bootstrap: security add-generic-password -a $USER -s ${service} -w`);
  }
  return r.stdout.trim();
}

async function nimFetch<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `${AUTH_SCHEME} ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    fail(`Nimble ${path} → ${res.status}: ${body}`);
  }
  return (await res.json()) as T;
}

function ghSet(name: string, value: string, args: string[]): void {
  const r = spawnSync("gh", ["secret", "set", name, ...args], {
    input: value,
    encoding: "utf8",
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (r.status !== 0) fail(`gh secret set ${name} failed`);
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      name: { type: "string" },
      "secret-name": { type: "string" },
      runtime: { type: "boolean", default: false },
      "dry-run": { type: "boolean", default: false },
    },
  });
  if (!values.name || !values["secret-name"]) {
    fail("usage: --name <key-name> --secret-name <NAME> [--runtime] [--dry-run]");
  }
  const minter = keychainRead("NIMBLEWAY_TOKEN_MINTER");

  if (values["dry-run"]) {
    console.error(`[OIT1-nim] dry-run: would POST /account/api-keys { name: "${values.name}" }`);
    return;
  }

  const created = await nimFetch<NimbleApiKey>(minter, "/account/api-keys", {
    method: "POST",
    body: JSON.stringify({ name: values.name }),
  });

  const tokenValue =
    created[RESPONSE_KEY_FIELD] ?? created.value ?? created.api_key;
  if (!tokenValue) {
    fail(
      `response shape unexpected. Got: ${JSON.stringify(Object.keys(created))}. Update RESPONSE_KEY_FIELD.`,
    );
  }
  console.error(`[OIT1-nim] minted "${created.name}" (id=${created.id})`);

  ghSet(values["secret-name"], tokenValue, [
    "--org", "subagentceo", "--visibility", "selected", "--repos", "knowledge-engineering",
  ]);
  console.error(`[OIT1-nim] gh org set OK`);
  ghSet(values["secret-name"], tokenValue, []);
  console.error(`[OIT1-nim] gh repo set OK`);

  if (values.runtime) {
    const storeId = process.env.CLOUDFLARE_SECRETS_STORE_ID;
    if (!storeId) fail("--runtime requires CLOUDFLARE_SECRETS_STORE_ID env");
    const r = spawnSync(
      "wrangler",
      ["secrets-store", "secret", "create", storeId, "--name", values["secret-name"], "--value", tokenValue, "--scopes", "workers", "--remote"],
      { stdio: ["ignore", "inherit", "inherit"] },
    );
    if (r.status !== 0) fail("wrangler secrets-store create failed");
    console.error(`[OIT1-nim] wrangler secrets-store set OK`);
  }

  const list = await nimFetch<NimbleApiKey[]>(minter, "/account/api-keys");
  const found = list.find((k) => k.id === created.id);
  if (!found) fail(`WRITE VERIFY FAILED: id ${created.id} not in /account/api-keys response`);
  console.error(`[OIT1-nim] verify OK (id ${created.id} present)`);

  console.error(`[OIT1-nim] REMINDER: update the claude.ai "Nimble" connector's stored API key via customize-connectors UI — there is no API path to sync this automatically.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => fail(String(e)));
}
