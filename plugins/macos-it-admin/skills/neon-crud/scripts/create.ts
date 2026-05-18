#!/usr/bin/env tsx
/**
 * neon-crud CREATE (OIT1, follows OSEC3 pattern)
 *
 * Mint a Neon API key via REST and dual-write into gh org+repo secrets.
 * The value is held only in the Buffer between fetch() and child stdin —
 * never written to disk, never logged.
 *
 * @cite plugins/macos-it-admin/skills/neon-crud/SKILL.md
 * @cite docs/decisions/2026-05-17-cf-token-mint.md
 */

import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";

interface NeonApiKey {
  id: number;
  name: string;
  key: string;
  created_at: string;
}

function fail(msg: string): never {
  console.error(`[OIT1-neon] ${msg}`);
  process.exit(1);
}

function keychainRead(service: string): string {
  const r = spawnSync(
    "security",
    ["find-generic-password", "-s", service, "-w"],
    { encoding: "utf8" },
  );
  if (r.status !== 0) {
    fail(
      `keychain miss for "${service}". Bootstrap: security add-generic-password -a $USER -s ${service} -w`,
    );
  }
  return r.stdout.trim();
}

async function neonFetch<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`https://console.neon.tech/api/v2${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    fail(`Neon ${path} → ${res.status}: ${body}`);
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

  const minter = keychainRead("NEON_TOKEN_MINTER");

  if (values["dry-run"]) {
    console.error(`[OIT1-neon] dry-run: would POST /api_keys { key_name: "${values.name}" }`);
    return;
  }

  const created = await neonFetch<NeonApiKey>(minter, "/api_keys", {
    method: "POST",
    body: JSON.stringify({ key_name: values.name }),
  });

  const tokenValue = created.key;
  console.error(`[OIT1-neon] minted "${created.name}" (id=${created.id})`);

  ghSet(values["secret-name"], tokenValue, [
    "--org",
    "subagentceo",
    "--visibility",
    "selected",
    "--repos",
    "knowledge-engineering",
  ]);
  console.error(`[OIT1-neon] gh org set OK`);

  ghSet(values["secret-name"], tokenValue, []);
  console.error(`[OIT1-neon] gh repo set OK`);

  if (values.runtime) {
    const storeId = process.env.CLOUDFLARE_SECRETS_STORE_ID;
    if (!storeId) fail("--runtime requires CLOUDFLARE_SECRETS_STORE_ID env");
    const r = spawnSync(
      "wrangler",
      [
        "secrets-store",
        "secret",
        "create",
        storeId,
        "--name",
        values["secret-name"],
        "--value",
        tokenValue,
        "--scopes",
        "workers",
        "--remote",
      ],
      { stdio: ["ignore", "inherit", "inherit"] },
    );
    if (r.status !== 0) fail("wrangler secrets-store create failed");
    console.error(`[OIT1-neon] wrangler secrets-store set OK`);
  }

  // Read-after-write
  const list = await neonFetch<NeonApiKey[]>(minter, "/api_keys");
  const found = list.find((k) => k.id === created.id);
  if (!found) fail(`WRITE VERIFY FAILED: id ${created.id} not in /api_keys response`);
  console.error(`[OIT1-neon] verify OK (id ${created.id} present)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => fail(String(e)));
}
