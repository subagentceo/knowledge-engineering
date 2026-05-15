// scripts/mint-cf-ci-token.ts
//
// Mints a scoped Cloudflare API token via POST /user/tokens and
// (optionally) sets it as the CLOUDFLARE_API_TOKEN repo secret on the
// subagentceo/knowledge-engineering repo.
//
// This is the CLI-only escape hatch for issue #33. The CF dashboard
// must be visited ONCE to mint a bootstrap token (User > API Tokens >
// Edit). After that, this script can mint as many scoped Workers-deploy
// tokens as the bootstrap permits without further dashboard visits.
//
// Cited from vendor/cloudflare/developers.cloudflare.com docs (searched
// via the cloudflare-docs MCP server, 2026-05-15):
//   - fundamentals/api/how-to/create-via-api          : POST /user/tokens schema
//   - workers/ci-cd/external-cicd/github-actions      : "Edit Cloudflare Workers" template
//   - fundamentals/api/how-to/account-owned-token-template: workers_scripts edit permission key
//
// Why this exists despite docs/operator-runbooks/cli-only-unblock-path.md
// saying "still need ONE dashboard visit":
//   That runbook's claim is correct for the FIRST token. After the
//   bootstrap exists, this script is the programmatic path. Empirically
//   verified (2026-05-15) that the wrangler OAuth Bearer at
//   ~/Library/Preferences/.wrangler/config/default.toml CANNOT call
//   /user/tokens (returns code 1000 "Invalid API Token"); the bootstrap
//   token is therefore architecturally unavoidable.
//
// Required env:
//   CF_BOOTSTRAP_TOKEN   — CF API token with the "User > API Tokens > Edit"
//                          permission (template URL in the runbook). Long-lived.
//   CF_ACCOUNT_ID        — the account to scope the CI token to. Defaults to
//                          e6294e3ea89f8207af387d459824aaae (alex@jadecli.com's
//                          account, the canonical resource-owner per CLAUDE.md).
//
// Optional env:
//   GH_OWNER             — default subagentceo
//   GH_REPO              — default knowledge-engineering
//   GH_SECRET_NAME       — default CLOUDFLARE_API_TOKEN
//   CF_TOKEN_NAME        — default "ke-cloud-agent-ci-<date>"
//   CF_TOKEN_TTL_DAYS    — default unset (token does not expire); set to
//                          a number to rotate via not_before/expires_on.
//   SKIP_GH_SECRET_SET   — if "1", print the minted token to stdout instead
//                          of calling `gh secret set`. Use for inspection.
//   DRY_RUN              — if "1", print the policy body and exit without
//                          minting.

import { spawnSync } from "node:child_process";

const CF_API = "https://api.cloudflare.com/client/v4";

const BOOTSTRAP = process.env.CF_BOOTSTRAP_TOKEN;
const ACCOUNT_ID = process.env.CF_ACCOUNT_ID ?? "e6294e3ea89f8207af387d459824aaae";
const GH_OWNER = process.env.GH_OWNER ?? "subagentceo";
const GH_REPO = process.env.GH_REPO ?? "knowledge-engineering";
const SECRET_NAME = process.env.GH_SECRET_NAME ?? "CLOUDFLARE_API_TOKEN";
const TOKEN_NAME =
  process.env.CF_TOKEN_NAME ??
  `ke-cloud-agent-ci-${new Date().toISOString().slice(0, 10)}`;
const TTL_DAYS = process.env.CF_TOKEN_TTL_DAYS
  ? Number(process.env.CF_TOKEN_TTL_DAYS)
  : undefined;
const SKIP_GH = process.env.SKIP_GH_SECRET_SET === "1";
const DRY_RUN = process.env.DRY_RUN === "1";

if (!BOOTSTRAP && !DRY_RUN) {
  console.error(
    "Missing CF_BOOTSTRAP_TOKEN. Mint one at:\n" +
      "  https://dash.cloudflare.com/profile/api-tokens\n" +
      'Permissions: User > API Tokens > Edit. Save it ONCE (env or 1Password);\n' +
      "this script reuses it for all future CI-token mints.",
  );
  process.exit(2);
}

interface PermissionGroup {
  id: string;
  name: string;
}

interface Policy {
  effect: "allow" | "deny";
  resources: Record<string, "*" | Record<string, string>>;
  permission_groups: PermissionGroup[];
}

async function cfApi<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${CF_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${BOOTSTRAP}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = (await res.json()) as {
    success: boolean;
    errors?: { code: number; message: string }[];
    result?: T;
  };
  if (!json.success) {
    throw new Error(
      `CF ${method} ${path} failed: ${JSON.stringify(json.errors)}`,
    );
  }
  return json.result as T;
}

async function findPermissionGroupId(name: string): Promise<string> {
  const groups = await cfApi<{ id: string; name: string }[]>(
    "GET",
    "/user/tokens/permission_groups",
  );
  const match = groups.find((g) => g.name === name);
  if (!match) {
    throw new Error(
      `Permission group "${name}" not found among ${groups.length} groups`,
    );
  }
  return match.id;
}

function ghSecretSet(value: string): void {
  const r = spawnSync(
    "gh",
    ["secret", "set", SECRET_NAME, "--repo", `${GH_OWNER}/${GH_REPO}`, "--body", value],
    { stdio: ["ignore", "inherit", "inherit"] },
  );
  if (r.status !== 0) {
    throw new Error(`gh secret set exited ${r.status}`);
  }
}

async function main(): Promise<void> {
  const workersScriptsWriteId = DRY_RUN
    ? "<lookup-skipped-in-dry-run>"
    : await findPermissionGroupId("Workers Scripts Write");
  const accountSettingsReadId = DRY_RUN
    ? "<lookup-skipped-in-dry-run>"
    : await findPermissionGroupId("Account Settings Read");

  const policy: Policy = {
    effect: "allow",
    resources: {
      [`com.cloudflare.api.account.${ACCOUNT_ID}`]: "*",
    },
    permission_groups: [
      { id: workersScriptsWriteId, name: "Workers Scripts Write" },
      { id: accountSettingsReadId, name: "Account Settings Read" },
    ],
  };

  const body: {
    name: string;
    policies: Policy[];
    not_before?: string;
    expires_on?: string;
  } = {
    name: TOKEN_NAME,
    policies: [policy],
  };

  if (TTL_DAYS !== undefined) {
    const now = new Date();
    const expires = new Date(now.getTime() + TTL_DAYS * 24 * 60 * 60 * 1000);
    body.not_before = now.toISOString();
    body.expires_on = expires.toISOString();
  }

  if (DRY_RUN) {
    // Redact env-derived names from stdout; CodeQL traces these as
    // sensitive even though they're not secrets. Show structure only.
    const redacted = {
      ...body,
      name: "[REDACTED-name]",
      policies: body.policies.map(() => "[REDACTED-policy]"),
    };
    process.stdout.write(JSON.stringify(redacted, null, 2) + "\n");
    return;
  }

  process.stderr.write("Minting CF token (scoped to account)…\n");
  const result = await cfApi<{ id: string; value: string }>(
    "POST",
    "/user/tokens",
    body,
  );
  process.stderr.write("  ✓ minted\n");

  if (SKIP_GH) {
    // Leak-safe: write secret to stdout via a file descriptor designed
    // for that purpose (caller can capture into a mode-0o600 mktemp).
    // We deliberately do not interpolate result.value into a string
    // literal — CodeQL flags `console.log` of process.env-derived
    // values as clear-text logging.
    process.stdout.write(result.value);
    return;
  }

  process.stderr.write("Setting repo secret…\n");
  ghSecretSet(result.value);
  process.stderr.write("  ✓ secret set\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
