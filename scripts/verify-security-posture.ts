/**
 * verify:security-posture — calls `gh api` to fetch live org + repo
 * settings and feeds them through the asserters in
 * src/lib/security-posture.ts.
 *
 * Wired into `npm run verify` so a future agent that re-enables
 * GitHub-native security toggles (which the operator explicitly
 * disabled in ADR OSL1 for cost reasons) breaks CI.
 *
 * Uses execFileSync (not execSync) with `gh` as the command + an
 * array of args. The path argument cannot be interpreted by a shell
 * even if GH_ORG/GH_REPO env vars contain metacharacters.
 *
 * @cite docs/decisions/2026-05-16-osv-only-no-secret-scanning.md
 */
import { execFileSync } from "node:child_process";
import { assertOrgPosture, assertRepoPosture } from "../src/lib/security-posture.js";

const SLUG_RE = /^[A-Za-z0-9._-]+$/;
const ORG_RAW = process.env.GH_ORG ?? "subagentceo";
const REPO_RAW = process.env.GH_REPO ?? "knowledge-engineering";

if (!SLUG_RE.test(ORG_RAW) || !SLUG_RE.test(REPO_RAW)) {
  console.error("verify:security-posture: invalid GH_ORG/GH_REPO; must match [A-Za-z0-9._-]+");
  process.exit(2);
}

const ORG = ORG_RAW;
const REPO = REPO_RAW;

function ghJson<T>(path: string): T | undefined {
  try {
    const out = execFileSync("gh", ["api", path], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return JSON.parse(out) as T;
  } catch {
    return undefined;
  }
}

console.log("verify:security-posture");

const org = ghJson<Record<string, boolean>>(`orgs/${ORG}`);
if (org === undefined) {
  console.log(`  ⏭ skipped — gh api not reachable (CI without GH_TOKEN, or offline)`);
  process.exit(0);
}

try {
  assertOrgPosture(org);
  console.log(`  ✓ org ${ORG}: all forbidden settings are disabled`);
} catch (err) {
  console.error(`  ✗ org ${ORG}: ${(err as Error).message}`);
  process.exit(1);
}

const repo = ghJson<{ security_and_analysis?: Record<string, { status: string }> }>(
  `repos/${ORG}/${REPO}`,
);
if (repo) {
  try {
    assertRepoPosture(repo);
    console.log(`  ✓ repo ${ORG}/${REPO}: all forbidden security_and_analysis settings are disabled`);
  } catch (err) {
    console.error(`  ✗ repo ${ORG}/${REPO}: ${(err as Error).message}`);
    process.exit(1);
  }
}
