// scripts/audit-neon-extensions.ts
//
// Audit the chassis's Neon project: report current pg_version, branches,
// and which documented extensions have vendor/ mirrors vs which are
// citation gaps. Outputs a structured JSON report suitable for snapshotting.
//
// Companion to docs/operator-runbooks/neon-pg18-extensions.md.
//
// Auth: reads neonctl OAuth access_token from ~/.config/neonctl/credentials.json
// (same path as scripts/mint-neon-api-secret.ts). The bearer never appears
// in stdout/argv.
//
// Citations:
//   - vendor/neon/neon.com/docs/reference/api-reference.md (GET /projects/{id}
//     with pg_version field per Explore agent 2026-05-15)
//   - vendor/neon/neon.com/docs/extensions/pgvector.md (cross-references the
//     5 other extensions we treat as documented-but-not-mirrored)
//   - scripts/mint-neon-api-secret.ts (same OAuth-bearer pattern)
//
// Usage:
//   npm run audit:neon
//   PROJECT_ID=<id> npm run audit:neon

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PROJECT_ID = process.env.PROJECT_ID ?? "divine-cloud-27295848";
const NEON_CREDS = join(homedir(), ".config", "neonctl", "credentials.json");
const VENDOR_NEON_EXT_DIR = join(
  process.cwd(),
  "vendor",
  "neon",
  "neon.com",
  "docs",
  "extensions",
);

// The 5 extensions referenced from vendor/neon/.../extensions/pgvector.md
// (per Explore agent 2026-05-15) that we treat as documented-but-not-yet-mirrored.
// Update this list if pgvector.md's cross-references change.
const REFERENCED_EXTENSIONS = [
  "pgvector",
  "pgrag",
  "pg_graphql",
  "pg_partman",
  "postgis",
  "timescaledb",
];

interface ProjectResponse {
  project: {
    id: string;
    name: string;
    pg_version: number;
    region_id: string;
    created_at: string;
    branch_logical_size_limit?: number;
  };
}

interface BranchesResponse {
  branches: Array<{
    id: string;
    name: string;
    primary?: boolean;
    created_at: string;
  }>;
}

function readBearer(): string {
  if (!existsSync(NEON_CREDS)) {
    console.error(
      `[audit-neon-extensions] FATAL: ${NEON_CREDS} not found. Run "neonctl auth" first.`,
    );
    process.exit(2);
  }
  const creds = JSON.parse(readFileSync(NEON_CREDS, "utf8"));
  const token = creds.access_token;
  if (typeof token !== "string" || !token) {
    console.error(
      `[audit-neon-extensions] FATAL: ${NEON_CREDS} missing .access_token. Re-run "neonctl auth".`,
    );
    process.exit(2);
  }
  return token;
}

interface NeonErrorResponse {
  code?: string;
  message?: string;
  request_id?: string;
}

function neonGet<T>(bearer: string, path: string): T {
  const result = spawnSync(
    "curl",
    [
      "-sS",
      "-H",
      `Authorization: Bearer ${bearer}`,
      "-H",
      "Accept: application/json",
      `https://console.neon.tech/api/v2${path}`,
    ],
    { stdio: ["ignore", "pipe", "inherit"] },
  );
  if (result.status !== 0) {
    console.error(`[audit-neon-extensions] curl ${path} exit=${result.status}`);
    process.exit(1);
  }
  const body = result.stdout?.toString() ?? "";
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    console.error(`[audit-neon-extensions] non-JSON response from ${path}`);
    process.exit(1);
  }
  // Surface Neon error shape explicitly — common cause: expired bearer
  if (
    parsed &&
    typeof parsed === "object" &&
    "code" in parsed &&
    "message" in parsed &&
    !("project" in parsed || "branches" in parsed)
  ) {
    const err = parsed as NeonErrorResponse;
    console.error(
      `[audit-neon-extensions] Neon API error on GET ${path}:\n` +
        `  code: ${err.code}\n  message: ${err.message}\n  request_id: ${err.request_id}\n`,
    );
    if (err.message?.includes("authentication") || err.message?.includes("credentials")) {
      console.error(
        "  -> Hint: the neonctl OAuth bearer may be expired. Run `neonctl auth` to refresh.",
      );
    }
    process.exit(1);
  }
  return parsed as T;
}

function mirroredExtensions(): string[] {
  if (!existsSync(VENDOR_NEON_EXT_DIR)) {
    return [];
  }
  return readdirSync(VENDOR_NEON_EXT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function main(): void {
  const bearer = readBearer();

  const projectRes = neonGet<ProjectResponse>(bearer, `/projects/${PROJECT_ID}`);
  const branchesRes = neonGet<BranchesResponse>(
    bearer,
    `/projects/${PROJECT_ID}/branches`,
  );

  const pg = projectRes.project.pg_version;
  const branches = branchesRes.branches.map((b) => ({
    id: b.id,
    name: b.name,
    primary: !!b.primary,
    created_at: b.created_at,
  }));
  const primary = branches.find((b) => b.primary);

  const mirrored = mirroredExtensions();
  const documentedAndMirrored = REFERENCED_EXTENSIONS.filter((e) =>
    mirrored.includes(e),
  );
  const documentedButNotMirrored = REFERENCED_EXTENSIONS.filter(
    (e) => !mirrored.includes(e),
  );

  const report = {
    project_id: PROJECT_ID,
    project_name: projectRes.project.name,
    pg_version: pg,
    is_pg18: pg === 18,
    region: projectRes.project.region_id,
    primary_branch: primary ?? null,
    branch_count: branches.length,
    branches_sample: branches.slice(0, 5),
    documented_extensions: REFERENCED_EXTENSIONS,
    mirrored_extensions: documentedAndMirrored,
    citation_gaps: documentedButNotMirrored,
    citation_gap_for_pg18: pg !== 18, // when pg is upgraded, we'd want a pg18 mirror
    audited_at: new Date().toISOString(),
    vendor_neon_extensions_dir: VENDOR_NEON_EXT_DIR.replace(process.cwd() + "/", ""),
  };

  console.log(JSON.stringify(report, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
