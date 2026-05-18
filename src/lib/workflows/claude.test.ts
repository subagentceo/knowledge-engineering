/**
 * Tests OGHW5 — `.github/workflows/claude.yml`:
 *   - Triggers on @claude mention only.
 *   - Uses anthropics/claude-code-action@v1.
 *   - timeout-minutes bounded.
 *   - ANTHROPIC_API_KEY is NOT in env.
 *   - persist-credentials is INTENTIONALLY NOT set to false here
 *     (action creates branches and pushes commits).
 *
 * Outcome OGHW5.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/github-actions.md
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 * @cite seeds/posture/session-start.xml
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const yaml = readFileSync(
  resolve(REPO_ROOT, ".github", "workflows", "claude.yml"),
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

console.log("workflows/claude.yml:");

check("trigger gate: @claude mention required", () => {
  if (!/contains\(github\.event\.comment\.body,\s*'@claude'\)/.test(yaml))
    throw new Error("must filter on @claude mention");
});

check("uses anthropics/claude-code-action@v1", () => {
  if (!/uses:\s*anthropics\/claude-code-action@v1\b/.test(yaml))
    throw new Error("expected anthropics/claude-code-action@v1");
});

check("timeout-minutes bounded (≤ 60)", () => {
  const m = yaml.match(/timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 60) throw new Error(`timeout-minutes ${t} too large`);
});

check("ANTHROPIC_API_KEY is NOT in env (OAuth-only chassis posture)", () => {
  if (/ANTHROPIC_API_KEY:/.test(yaml))
    throw new Error("ANTHROPIC_API_KEY must not be set per chassis posture");
});

check("uses claude_code_oauth_token (correct auth surface)", () => {
  if (!/claude_code_oauth_token:/.test(yaml))
    throw new Error("must use claude_code_oauth_token");
});

check("permissions include contents:write and pull-requests:write", () => {
  if (!/permissions:[\s\S]+?contents:\s*write/m.test(yaml))
    throw new Error("missing contents: write (required: action pushes branches)");
  if (!/permissions:[\s\S]+?pull-requests:\s*write/m.test(yaml))
    throw new Error("missing pull-requests: write");
});

check("no pull_request_target trigger (would expand prompt-injection surface)", () => {
  if (/pull_request_target:/.test(yaml))
    throw new Error(
      "must NOT trigger on pull_request_target — pwn-request surface per security.md"
    );
});

check("concurrency group is per-issue/PR", () => {
  if (!/concurrency:[\s\S]+?group:/m.test(yaml))
    throw new Error("missing concurrency group");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
