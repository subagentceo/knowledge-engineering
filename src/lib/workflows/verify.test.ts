/**
 * Tests OGHW11 — `.github/workflows/verify.yml`:
 *   - Draft-skip gate present (added 14f5d51).
 *   - ANTHROPIC_API_KEY: "" env asserts chassis OAuth-only posture
 *     at the runtime boundary.
 *   - persist-credentials: false on checkout (verify is read-only).
 *   - fetch-depth: 0 retained (required by conventions.test.ts).
 *   - timeout-minutes bounded.
 *   - concurrency group cancels in-progress on PRs.
 *   - workflow_dispatch present (required by auto-rebase redispatch).
 *   - JOB name is exactly `npm run verify` (matches the branch-ruleset
 *     required-check context).
 *
 * Outcome OGHW11.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 * @cite seeds/posture/session-start.xml
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const yaml = readFileSync(
  resolve(REPO_ROOT, ".github", "workflows", "verify.yml"),
  "utf8"
);

let passed = 0;
let failed = 0;
function check(name: string, fn: () => void): void {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("workflows/verify.yml:");

check("draft-skip gate", () => {
  if (!/github\.event\.pull_request\.draft == false/.test(yaml))
    throw new Error("missing draft gate");
});

check("JOB name is exactly `npm run verify` (required-check context)", () => {
  // Job name is the GitHub check-run context. Must match
  // scripts/setup-branch-protection.ts's `requiredChecks` literal.
  if (!/name:\s*npm run verify/.test(yaml))
    throw new Error(
      "job name must be `npm run verify` to match the branch-ruleset required-check context"
    );
});

check("workflow_dispatch is present (auto-rebase redispatch needs it)", () => {
  if (!/workflow_dispatch:/.test(yaml))
    throw new Error("must declare workflow_dispatch (used by auto-rebase OAUTO12+OAUTO16)");
});

check("ready_for_review trigger type present", () => {
  if (!/types:[\s\S]*?ready_for_review/.test(yaml))
    throw new Error("must include ready_for_review in pull_request types");
});

check("ANTHROPIC_API_KEY: \"\" present at run env (OAuth-only chassis posture)", () => {
  if (!/ANTHROPIC_API_KEY:\s*""/.test(yaml))
    throw new Error("must explicitly empty ANTHROPIC_API_KEY at the run env boundary");
});

check("checkout sets persist-credentials: false", () => {
  if (!/persist-credentials:\s*false/.test(yaml))
    throw new Error("missing persist-credentials: false");
});

check("checkout retains fetch-depth: 0 (conventions.test.ts dep)", () => {
  if (!/fetch-depth:\s*0/.test(yaml))
    throw new Error("fetch-depth: 0 must be preserved for conventions.test.ts");
});

check("timeout-minutes bounded (≤ 20)", () => {
  const m = yaml.match(/timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 20) throw new Error(`timeout-minutes ${t} too large`);
});

check("concurrency group with cancel-in-progress: true (PR sync should cancel old run)", () => {
  if (!/concurrency:[\s\S]+?group:/m.test(yaml))
    throw new Error("missing concurrency group");
  if (!/cancel-in-progress:\s*true/.test(yaml))
    throw new Error("expected cancel-in-progress: true on PR-driven runs");
});

check("permissions: contents: read (read-only)", () => {
  if (!/permissions:[\s\S]+?contents:\s*read/m.test(yaml))
    throw new Error("missing contents: read");
  if (/contents:\s*write/.test(yaml))
    throw new Error("verify must not request contents:write");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
