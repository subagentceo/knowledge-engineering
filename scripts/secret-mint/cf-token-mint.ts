#!/usr/bin/env tsx
/**
 * cf-token-mint (OSEC3)
 *
 * Mint a Cloudflare API token from a JSON template and dual-write the
 * value into GitHub org+repo secrets and (optionally) Cloudflare
 * Secrets Store — without the value ever touching disk or this
 * process's stdout.
 *
 * Bootstrap:
 *   1. Browser-mint once a tightly-scoped "minter" token with ONLY
 *      `User > API Tokens > Edit` permission at
 *      https://dash.cloudflare.com/profile/api-tokens
 *   2. Store as macOS keychain entry:
 *        security add-generic-password -a $USER -s CF_TOKEN_MINTER -w '<token>'
 *   3. Set CLOUDFLARE_ACCOUNT_ID env var (or have it in gh secrets — script reads either).
 *
 * Rotation (every quarter or on compromise):
 *   tsx scripts/secret-mint/cf-token-mint.ts \
 *     --template infra/cloudflare/token-templates/edit-cloudflare-workers.json \
 *     --secret-name CLOUDFLARE_API_TOKEN
 *
 * What it does:
 *   1. Reads CF_TOKEN_MINTER from keychain (security find-generic-password -w)
 *   2. Substitutes ${ACCOUNT_ID} + ${ISO_DATE} in the template
 *   3. Resolves permission_groups_named → UUIDs via /user/tokens/permission_groups
 *   4. POSTs to /user/tokens (or /accounts/{id}/tokens for account-scoped)
 *   5. Pipes the response token value into:
 *        gh secret set --org subagentceo --visibility selected --repos <repo> NAME
 *        gh secret set NAME (repo scope)
 *        wrangler secrets-store secret create $STORE_ID --name NAME --value @- (if --runtime)
 *   6. The value is held only in the Buffer between fetch() and the child stdin.
 *      It is never written to disk, never logged, never printed.
 *
 * @cite vendor/cloudflare/developers.cloudflare.com/fundamentals/api/get-started/create-token/index.md
 * @cite https://api.cloudflare.com/client/v4/user/tokens/permission_groups
 * @cite docs/decisions/2026-05-17-cf-token-mint.md
 */

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";

interface PermissionGroup {
  id: string;
  name: string;
}

interface TokenResponse {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  result: { id: string; name: string; value: string };
}

function fail(msg: string): never {
  console.error(`[OSEC3] ${msg}`);
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
      `keychain miss for service "${service}". Bootstrap with: security add-generic-password -a $USER -s ${service} -w '<value>'`,
    );
  }
  return r.stdout.trim();
}

async function cfFetch<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    fail(`CF API ${path} → ${res.status}: ${body}`);
  }
  return (await res.json()) as T;
}

async function resolveGroups(
  token: string,
  names: string[],
): Promise<Array<{ id: string }>> {
  const all = await cfFetch<{ result: PermissionGroup[] }>(
    token,
    "/user/tokens/permission_groups",
  );
  const map = new Map(all.result.map((g) => [g.name, g.id]));
  return names.map((n) => {
    const id = map.get(n);
    if (!id) fail(`unknown permission group: "${n}"`);
    return { id };
  });
}

function ghSet(name: string, value: string, args: string[]): void {
  const r = spawnSync("gh", ["secret", "set", name, ...args], {
    input: value,
    encoding: "utf8",
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (r.status !== 0) fail(`gh secret set ${name} failed (${args.join(" ")})`);
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      template: { type: "string" },
      "secret-name": { type: "string" },
      account: { type: "string" },
      runtime: { type: "boolean", default: false },
      "dry-run": { type: "boolean", default: false },
    },
  });

  if (!values.template || !values["secret-name"]) {
    fail("usage: --template <path> --secret-name <NAME> [--account <id>] [--runtime] [--dry-run]");
  }

  const accountId =
    values.account ??
    process.env.CLOUDFLARE_ACCOUNT_ID ??
    fail("CLOUDFLARE_ACCOUNT_ID not set; pass --account");

  const minter = keychainRead("CF_TOKEN_MINTER");

  const tpl = JSON.parse(readFileSync(values.template, "utf8"));
  const isoDate = new Date().toISOString().slice(0, 10);
  const substituted = JSON.parse(
    JSON.stringify(tpl)
      .split("${ACCOUNT_ID}").join(accountId)
      .split("${ISO_DATE}").join(isoDate),
  );

  for (const p of substituted.policies) {
    if (Array.isArray(p.permission_groups_named)) {
      p.permission_groups = await resolveGroups(minter, p.permission_groups_named);
      delete p.permission_groups_named;
    }
  }
  delete substituted.$comment;
  for (const p of substituted.policies) delete p.$comment;

  if (values["dry-run"]) {
    console.log(JSON.stringify(substituted, null, 2));
    return;
  }

  const created = await cfFetch<TokenResponse>(minter, "/user/tokens", {
    method: "POST",
    body: JSON.stringify(substituted),
  });
  if (!created.success) fail(`mint failed: ${JSON.stringify(created.errors)}`);

  const value = created.result.value;
  console.error(`[OSEC3] minted "${created.result.name}" (id=${created.result.id})`);

  ghSet(values["secret-name"], value, [
    "--org",
    "subagentceo",
    "--visibility",
    "selected",
    "--repos",
    "knowledge-engineering",
  ]);
  console.error(`[OSEC3] gh org set OK`);

  ghSet(values["secret-name"], value, []);
  console.error(`[OSEC3] gh repo set OK`);

  if (values.runtime) {
    const storeId = process.env.CLOUDFLARE_SECRETS_STORE_ID;
    if (!storeId) fail("--runtime requires CLOUDFLARE_SECRETS_STORE_ID env var");
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
        value,
        "--scopes",
        "workers",
        "--remote",
      ],
      { stdio: ["ignore", "inherit", "inherit"] },
    );
    if (r.status !== 0) fail("wrangler secrets-store create failed");
    console.error(`[OSEC3] wrangler secrets-store set OK`);
  }

  console.error(`[OSEC3] done. value never written to disk or logged.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => fail(String(e)));
}
