/**
 * Tests OGHW9 — `.github/workflows/release-please.yml`:
 *   - Triggers on push: main (canonical) + workflow_dispatch (manual).
 *   - permissions scoped at JOB level, not workflow level
 *     (least-privilege per security-hardening guide).
 *   - timeout-minutes bounded.
 *   - concurrency group per branch (no two release-please runs racing).
 *
 * `googleapis/release-please-action@v4` is intentionally still tag-pinned
 * — tracked in OGHW-X2's progressive-migration backlog.
 *
 * Outcome OGHW9.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const yaml = readFileSync(
  resolve(REPO_ROOT, ".github", "workflows", "release-please.yml"),
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

console.log("workflows/release-please.yml:");

check("trigger: push to main", () => {
  if (!/push:\s*\n\s+branches:\s*\[main\]/m.test(yaml))
    throw new Error("missing push: branches: [main]");
});

check("trigger: workflow_dispatch (manual kick)", () => {
  if (!/workflow_dispatch:/.test(yaml))
    throw new Error("missing workflow_dispatch");
});

check("permissions are scoped at the JOB level (not workflow level)", () => {
  // Workflow-level permissions: would appear OUTSIDE the jobs: block.
  // Job-level: appears INSIDE a jobs.<id> block.
  const jobs = yaml.split(/^jobs:/m)[1] ?? "";
  if (!/permissions:[\s\S]+?contents:\s*write/m.test(jobs))
    throw new Error("permissions: must be declared at the job level");
});

check("workflow-level permissions block is ABSENT (least-privilege)", () => {
  const head = yaml.split(/^jobs:/m)[0] ?? "";
  // The head may contain on:, name:, concurrency:, but NOT permissions:.
  if (/^permissions:/m.test(head))
    throw new Error(
      "workflow-level permissions: should be removed; declare at job level only"
    );
});

check("timeout-minutes bounded (≤ 30)", () => {
  const m = yaml.match(/timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 30) throw new Error(`timeout-minutes ${t} too large`);
});

check("concurrency group is declared, keyed on github.ref", () => {
  if (!/concurrency:[\s\S]+?group:[\s\S]+?\$\{\{\s*github\.ref\s*\}\}/m.test(yaml))
    throw new Error("missing concurrency group keyed on github.ref");
});

check("does NOT cancel in-progress (release runs are not idempotent mid-flight)", () => {
  if (!/cancel-in-progress:\s*false/.test(yaml))
    throw new Error("expected cancel-in-progress: false");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
