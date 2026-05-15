// scripts/mint-neon-api-secret.ts
//
// Leak-safe rotation of NEON_API_KEY in both the Cloudflare Secrets Store
// AND the GitHub repo secret. Mirrors the proven inline pipeline used
// 2026-05-15 03:32Z (post-leak rotation) and the structure of the parallel
// scripts/mint-claude-oauth-secret.ts (landed via #109).
//
// Closes sub-issue #116.
//
// The hard rule: the key value MUST NOT appear in stdout, terminal
// scrollback, shell history, or any captured agent transcript. Pipeline:
//
//   1. Read neonctl OAuth access_token from ~/.config/neonctl/credentials.json
//      into a mode-0600 mktemp file (Node fs.writeFileSync).
//   2. POST https://console.neon.tech/api/v2/api_keys with the bearer.
//      Response (including .key) lands in a SECOND mode-0600 mktemp.
//   3. Validate response by parsing JSON and checking .key shape — never
//      log the value.
//   4. Pipe .key via stdin to:
//      - `wrangler secrets-store secret update <store> --secret-id <id> --remote`
//      - `gh secret set NEON_API_KEY --repo subagentceo/knowledge-engineering`
//   5. EXIT trap overwrites + unlinks both mktemps.
//
// Citations:
//   - vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
//     (the parent pattern for spawn + stdio piping)
//   - docs/outcomes/desktop-driven-unblock-2026-05-15.md § F1 (post-mortem
//     of the leaked Neon key 3075742; the plumbing change this script codifies)
//   - https://api-docs.neon.tech/reference/createapikey (REST endpoint)
//   - docs/operator-runbooks/cloud-env-vars-contract.md (canonical inventory)
//   - infra/cloudflare/src/worker.ts:127-140 (createNeonBranch consumer)
//
// Required env: none (uses neonctl OAuth from ~/.config/neonctl/credentials.json)
// Required state: `neonctl auth` has been run; credentials.json contains a
//   fresh .access_token. If expired, the script surfaces the error.
//
// Defaults match the deployed Worker:
//   CLOUDFLARE_SECRETS_STORE_ID = 565244614fc34be7aa8488ce46112f60
//   CLOUDFLARE_NEON_SECRET_ID   = f3d15d4730494d48834481ced8dc0b4e
//   GH_OWNER = subagentceo, GH_REPO = knowledge-engineering, GH_SECRET = NEON_API_KEY
//
// Usage:
//   npm run rotate:neon              # mint + rotate both stores
//   COMMENT="post-leak-2026-05-15" npm run rotate:neon
//   SKIP_GH=1 npm run rotate:neon    # only update CF Secrets Store
//   DRY_RUN=1 npm run rotate:neon    # print plan, don't act

import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  writeFileSync,
  readFileSync,
  rmSync,
  chmodSync,
  statSync,
  existsSync,
} from "node:fs";
import { randomBytes } from "node:crypto";
import { tmpdir, homedir } from "node:os";
import { join } from "node:path";

const STORE_ID =
  process.env.CLOUDFLARE_SECRETS_STORE_ID ?? "565244614fc34be7aa8488ce46112f60";
const SECRET_ID =
  process.env.CLOUDFLARE_NEON_SECRET_ID ?? "f3d15d4730494d48834481ced8dc0b4e";
const GH_OWNER = process.env.GH_OWNER ?? "subagentceo";
const GH_REPO = process.env.GH_REPO ?? "knowledge-engineering";
const GH_SECRET = process.env.GH_SECRET ?? "NEON_API_KEY";
const KEY_NAME =
  process.env.NEON_KEY_NAME ??
  `ke-cloud-agent-rotation-${new Date().toISOString().slice(0, 10)}`;
const COMMENT =
  process.env.COMMENT ??
  `rotation-${new Date().toISOString().replace(/[:.]/g, "-")}`;
const SKIP_GH = process.env.SKIP_GH === "1";
const DRY_RUN = process.env.DRY_RUN === "1";

const NEON_CREDS = join(homedir(), ".config", "neonctl", "credentials.json");

function makeSecretDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "neon-rotation-"));
  chmodSync(dir, 0o700);
  return dir;
}

function overwriteAndRemove(path: string): void {
  // macOS lacks `shred`; manually overwrite with random bytes (same size)
  // before unlinking. Best-effort: APFS is COW so this isn't a guarantee,
  // but it shrinks the window where the value lives readable on disk.
  try {
    const size = statSync(path).size;
    if (size > 0) {
      for (let i = 0; i < 3; i++) {
        writeFileSync(path, randomBytes(size));
      }
    }
  } catch {
    /* file may not exist */
  }
  try {
    rmSync(path, { force: true });
  } catch {
    /* ignore */
  }
}

interface NeonMintResponse {
  /** The new API key value (a `napi_...` prefixed string). NEVER LOG. */
  key: string;
  /** The numeric id assigned by Neon (loggable). */
  id: number;
  /** The name we gave it (loggable). */
  name: string;
  created_at: string;
}

function mintNewKey(bearerPath: string, responsePath: string): NeonMintResponse {
  const bearer = readFileSync(bearerPath, "utf8").trim();
  if (!bearer) {
    console.error(
      "[mint-neon-api-secret] ERROR: empty bearer in " + bearerPath,
    );
    process.exit(1);
  }

  const args = [
    "-sS",
    "-X",
    "POST",
    "-H",
    `Authorization: Bearer ${bearer}`,
    "-H",
    "Content-Type: application/json",
    "-d",
    JSON.stringify({ key_name: KEY_NAME }),
    "https://console.neon.tech/api/v2/api_keys",
    "-o",
    responsePath,
    "-w",
    "%{http_code}",
  ];

  const result = spawnSync("curl", args, {
    stdio: ["ignore", "pipe", "inherit"],
  });
  if (result.status !== 0) {
    console.error("[mint-neon-api-secret] curl exit code:", result.status);
    process.exit(1);
  }
  const httpCode = (result.stdout?.toString() ?? "").trim();
  if (httpCode !== "200" && httpCode !== "201") {
    console.error(
      `[mint-neon-api-secret] ERROR: Neon API returned HTTP ${httpCode}.`,
    );
    try {
      const raw = readFileSync(responsePath, "utf8");
      const parsed = JSON.parse(raw);
      delete (parsed as { key?: unknown }).key;
      console.error("[mint-neon-api-secret] response (redacted):", parsed);
    } catch {
      console.error("[mint-neon-api-secret] response unreadable.");
    }
    process.exit(1);
  }

  const raw = readFileSync(responsePath, "utf8");
  let parsed: NeonMintResponse;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("[mint-neon-api-secret] ERROR: response is not JSON");
    process.exit(1);
  }
  if (typeof parsed.key !== "string" || !parsed.key.startsWith("napi_")) {
    console.error(
      "[mint-neon-api-secret] ERROR: response missing .key or wrong shape",
    );
    process.exit(1);
  }
  console.log(
    `[mint-neon-api-secret] minted Neon key id=${parsed.id} name="${parsed.name}" created_at=${parsed.created_at}`,
  );
  return parsed;
}

function updateCfSecretsStore(responsePath: string): void {
  console.log(
    `[mint-neon-api-secret] piping .key to wrangler secrets-store update (id=${SECRET_ID})`,
  );
  const args = [
    "-c",
    `jq -r '.key' "$0" | npx wrangler secrets-store secret update ${STORE_ID} --secret-id ${SECRET_ID} --comment "${COMMENT}" --remote`,
    responsePath,
  ];
  const result = spawnSync("bash", args, {
    stdio: ["inherit", "inherit", "inherit"],
    cwd: join(process.cwd(), "infra", "cloudflare"),
  });
  if (result.status !== 0) {
    console.error("[mint-neon-api-secret] wrangler exit code:", result.status);
    process.exit(1);
  }
}

function updateGhSecret(responsePath: string): void {
  if (SKIP_GH) {
    console.log("[mint-neon-api-secret] SKIP_GH=1: skipping GH secret update");
    return;
  }
  console.log(
    `[mint-neon-api-secret] piping .key to gh secret set ${GH_SECRET} (${GH_OWNER}/${GH_REPO})`,
  );
  const args = [
    "-c",
    `jq -r '.key' "$0" | gh secret set ${GH_SECRET} --repo ${GH_OWNER}/${GH_REPO}`,
    responsePath,
  ];
  const result = spawnSync("bash", args, {
    stdio: ["inherit", "inherit", "inherit"],
  });
  if (result.status !== 0) {
    console.error("[mint-neon-api-secret] gh exit code:", result.status);
    process.exit(1);
  }
}

function main(): void {
  if (!existsSync(NEON_CREDS)) {
    console.error(
      `[mint-neon-api-secret] FATAL: ${NEON_CREDS} not found. Run "neonctl auth" first.`,
    );
    process.exit(2);
  }

  const secretDir = makeSecretDir();
  const bearerPath = join(secretDir, "neon-bearer.tmp");
  const responsePath = join(secretDir, "neon-mint-response.json");

  const cleanup = (): void => {
    overwriteAndRemove(bearerPath);
    overwriteAndRemove(responsePath);
    try {
      rmSync(secretDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });
  process.on("SIGTERM", () => {
    cleanup();
    process.exit(143);
  });

  const creds = JSON.parse(readFileSync(NEON_CREDS, "utf8"));
  const accessToken = creds.access_token;
  if (typeof accessToken !== "string" || !accessToken) {
    console.error(
      `[mint-neon-api-secret] FATAL: ${NEON_CREDS} missing .access_token. Re-run "neonctl auth".`,
    );
    process.exit(2);
  }
  writeFileSync(bearerPath, accessToken, { mode: 0o600 });

  if (DRY_RUN) {
    console.log("[mint-neon-api-secret] DRY_RUN=1 — would mint:");
    console.log(`  key_name: ${KEY_NAME}`);
    console.log(`  CF Secrets Store: ${STORE_ID} / ${SECRET_ID}`);
    console.log(`  GH secret: ${GH_OWNER}/${GH_REPO}/${GH_SECRET}`);
    console.log(`  comment: ${COMMENT}`);
    return;
  }

  console.log("[mint-neon-api-secret] step 1/3: minting via POST /api/v2/api_keys");
  mintNewKey(bearerPath, responsePath);

  console.log("[mint-neon-api-secret] step 2/3: updating CF Secrets Store");
  updateCfSecretsStore(responsePath);

  console.log("[mint-neon-api-secret] step 3/3: updating GH repo secret");
  updateGhSecret(responsePath);

  console.log("");
  console.log("[mint-neon-api-secret] DONE");
  console.log("  Verify with:");
  console.log(
    `    npx --prefix infra/cloudflare wrangler secrets-store secret list ${STORE_ID} --remote | grep ${GH_SECRET}`,
  );
  console.log(`    gh secret list --repo ${GH_OWNER}/${GH_REPO} | grep ${GH_SECRET}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
