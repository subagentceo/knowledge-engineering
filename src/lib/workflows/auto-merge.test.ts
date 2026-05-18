/**
 * Tests OGHW2 — `.github/workflows/auto-merge.yml`:
 *   - Uses `pull_request_target` (intentional: fires on label events
 *     from forks too).
 *   - Draft-skip gate present.
 *   - timeout-minutes bounded.
 *   - concurrency group per-PR.
 *   - No checkout step (defense in depth — workflow runs against base
 *     ref under pull_request_target; checkout would expose the base
 *     secrets to PR contents).
 *
 * Outcome OGHW2.
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
  resolve(REPO_ROOT, ".github", "workflows", "auto-merge.yml"),
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

console.log("workflows/auto-merge.yml:");

check("uses pull_request_target (intentional, for label events from forks)", () => {
  if (!/pull_request_target:/.test(yaml))
    throw new Error("expected pull_request_target trigger");
});

check("draft-skip gate", () => {
  if (!/!github\.event\.pull_request\.draft/.test(yaml))
    throw new Error("missing draft gate");
});

check("requires `automerge` label", () => {
  if (!/contains\(github\.event\.pull_request\.labels\.\*\.name,\s*'automerge'\)/.test(yaml))
    throw new Error("must gate on the automerge label");
});

check("timeout-minutes bounded (≤ 10)", () => {
  const m = yaml.match(/timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 10) throw new Error(`timeout-minutes ${t} too large`);
});

check("concurrency group is declared", () => {
  if (!/^concurrency:\s*\n\s+group:/m.test(yaml))
    throw new Error("missing concurrency group");
});

check("no checkout step (pull_request_target safety)", () => {
  if (/actions\/checkout/.test(yaml))
    throw new Error(
      "auto-merge must NOT checkout under pull_request_target — that would expose base secrets to PR contents"
    );
});

check("permissions: pull-requests: write + contents: write", () => {
  if (!/permissions:[\s\S]+?pull-requests:\s*write/m.test(yaml))
    throw new Error("missing pull-requests: write");
  if (!/permissions:[\s\S]+?contents:\s*write/m.test(yaml))
    throw new Error("missing contents: write (required by `gh pr merge --auto`)");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
