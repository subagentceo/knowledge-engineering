#!/usr/bin/env tsx
/**
 * parallel-ai-crud CREATE (OIT1, follows OSEC3 pattern)
 *
 * Mint a Parallel.ai API key via REST. The exact endpoint shape is
 * assumed based on https://docs.parallel.ai/api-reference/auth as of
 * 2026-05-17; first-run operator should confirm response field name
 * (key vs value vs api_key) and update RESPONSE_KEY_FIELD constant.
 *
 * @cite plugins/macos-it-admin/skills/parallel-ai-crud/SKILL.md
 * @cite docs/decisions/2026-05-17-cf-token-mint.md
 */

import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";

const API_BASE = "https://api.parallel.ai/v1";
// First-run: confirm against actual Parallel.ai response; update if needed.
const RESPONSE_KEY_FIELD = "key" as const;

interface ParallelApiKey {
  id: string;
  name: string;
  key?: string;
  value?: string;
  api_key?: string;
  created_at: string;
}

function fail(msg: string): never {
  console.error(`[OIT1-par] ${msg}`);
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

async function parFetch<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "x-api-key": token,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    fail(`Parallel ${path} → ${res.status}: ${body}`);
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
  const minter = keychainRead("PARALLEL_TOKEN_MINTER");

  if (values["dry-run"]) {
    console.error(`[OIT1-par] dry-run: would POST /api-keys { name: "${values.name}" }`);
    return;
  }

  const created = await parFetch<ParallelApiKey>(minter, "/api-keys", {
    method: "POST",
    body: JSON.stringify({ name: values.name }),
  });

  const tokenValue =
    created[RESPONSE_KEY_FIELD] ?? created.value ?? created.api_key;
  if (!tokenValue) {
    fail(
      `response shape unexpected — no key/value/api_key field. Got: ${JSON.stringify(Object.keys(created))}. Update RESPONSE_KEY_FIELD in this script.`,
    );
  }
  console.error(`[OIT1-par] minted "${created.name}" (id=${created.id})`);

  ghSet(values["secret-name"], tokenValue, [
    "--org", "subagentceo", "--visibility", "selected", "--repos", "knowledge-engineering",
  ]);
  console.error(`[OIT1-par] gh org set OK`);

  ghSet(values["secret-name"], tokenValue, []);
  console.error(`[OIT1-par] gh repo set OK`);

  if (values.runtime) {
    const storeId = process.env.CLOUDFLARE_SECRETS_STORE_ID;
    if (!storeId) fail("--runtime requires CLOUDFLARE_SECRETS_STORE_ID env");
    const r = spawnSync(
      "wrangler",
      ["secrets-store", "secret", "create", storeId, "--name", values["secret-name"], "--value", tokenValue, "--scopes", "workers", "--remote"],
      { stdio: ["ignore", "inherit", "inherit"] },
    );
    if (r.status !== 0) fail("wrangler secrets-store create failed");
    console.error(`[OIT1-par] wrangler secrets-store set OK`);
  }

  // Read-after-write
  const list = await parFetch<ParallelApiKey[]>(minter, "/api-keys");
  const found = list.find((k) => k.id === created.id);
  if (!found) fail(`WRITE VERIFY FAILED: id ${created.id} not in /api-keys response`);
  console.error(`[OIT1-par] verify OK (id ${created.id} present)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => fail(String(e)));
}
