/**
 * Tests OGHW3 + OAUTO16 — `.github/workflows/auto-rebase.yml`:
 *   - The OAUTO12 invariant (post-rebase redispatch of verify + osv) is
 *     preserved.
 *   - OGHW3: timeout-minutes set on each job, concurrency group declared.
 *   - OAUTO16: new `rescue-blocked-prs` job scans for BLOCKED PRs missing
 *     required contexts and dispatches verify/osv against them.
 *
 * Outcome OGHW3 + OAUTO16.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const WORKFLOW = resolve(REPO_ROOT, ".github", "workflows", "auto-rebase.yml");

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

console.log("workflows/auto-rebase.yml:");

const yaml = readFileSync(WORKFLOW, "utf8");

check("workflow declares `name: auto-rebase`", () => {
  if (!/^name:\s*auto-rebase\s*$/m.test(yaml))
    throw new Error("missing or wrong `name:`");
});

check("OAUTO12 invariant: post-rebase redispatch of verify.yml is present", () => {
  if (!/gh workflow run verify\.yml\s+--ref\s+"?\$branch"?/m.test(yaml))
    throw new Error(
      "missing `gh workflow run verify.yml --ref $branch` — required by OAUTO12"
    );
});

check("OAUTO12 invariant: post-rebase redispatch of osv-scanner.yml is present", () => {
  if (!/gh workflow run osv-scanner\.yml\s+--ref\s+"?\$branch"?/m.test(yaml))
    throw new Error(
      "missing `gh workflow run osv-scanner.yml --ref $branch` — required by OAUTO12"
    );
});

check("rebase-behind-prs job has timeout-minutes (OGHW3)", () => {
  // Match within the rebase-behind-prs block.
  const m = yaml.match(/rebase-behind-prs:[\s\S]+?timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("rebase-behind-prs is missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 30) throw new Error(`timeout-minutes ${t} too large; cap at 30`);
});

check("concurrency group is declared at workflow level (OGHW3)", () => {
  if (!/^concurrency:\s*\n\s+group:/m.test(yaml))
    throw new Error("missing top-level concurrency group");
});

check("concurrency does NOT cancel in-progress (rebase must complete)", () => {
  if (!/cancel-in-progress:\s*false/m.test(yaml))
    throw new Error(
      "auto-rebase must NOT cancel in-progress runs — rebase loops are not idempotent mid-flight"
    );
});

check("workflow declares `actions: write` permission (required for workflow_dispatch via gh)", () => {
  if (!/permissions:[\s\S]+?actions:\s*write/m.test(yaml))
    throw new Error("missing `actions: write` permission for `gh workflow run`");
});

check("OAUTO16: rescue-blocked-prs job exists", () => {
  if (!/^\s+rescue-blocked-prs:/m.test(yaml))
    throw new Error("missing rescue-blocked-prs job (OAUTO16)");
});

check("OAUTO16: scans for mergeStateStatus==BLOCKED", () => {
  if (!/mergeStateStatus=="BLOCKED"/.test(yaml))
    throw new Error("rescue job must filter to mergeStateStatus==BLOCKED");
});

check("OAUTO16: cross-references the required check names from the branch ruleset", () => {
  if (!/npm run verify/.test(yaml))
    throw new Error("rescue job must reference `npm run verify` (required context)");
  if (!/OSV-Scanner \(PR\) \/ osv-scan/.test(yaml))
    throw new Error(
      "rescue job must reference `OSV-Scanner (PR) / osv-scan` (required context)"
    );
});

check("OAUTO16: dispatches verify.yml against PR branch when missing", () => {
  // The rescue block dispatches conditionally; the actual line lives in
  // the same `gh workflow run verify.yml --ref` form.
  const rescueSection = yaml.split(/^\s+rescue-blocked-prs:/m)[1];
  if (!rescueSection) throw new Error("rescue-blocked-prs section not found");
  if (!/gh workflow run verify\.yml\s+--ref/.test(rescueSection))
    throw new Error("rescue job must dispatch verify.yml");
  if (!/gh workflow run osv-scanner\.yml\s+--ref/.test(rescueSection))
    throw new Error("rescue job must dispatch osv-scanner.yml");
});

check("OAUTO16: rescue-blocked-prs job has timeout-minutes (OGHW3)", () => {
  const sec = yaml.split(/^\s+rescue-blocked-prs:/m)[1];
  if (!sec) throw new Error("rescue-blocked-prs section not found");
  if (!/timeout-minutes:\s*\d+/.test(sec))
    throw new Error("rescue-blocked-prs is missing timeout-minutes");
});

check("schedule cron is every 10 minutes (recovery backstop)", () => {
  if (!/cron:\s*'\*\/10 \* \* \* \*'/.test(yaml))
    throw new Error("expected schedule cron */10 * * * *");
});

check("workflow_run on auto-merge completion is retained (ORC4)", () => {
  if (!/workflow_run:[\s\S]+?workflows:\s*\[auto-merge\][\s\S]+?types:\s*\[completed\]/m.test(yaml))
    throw new Error("missing workflow_run on auto-merge");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
