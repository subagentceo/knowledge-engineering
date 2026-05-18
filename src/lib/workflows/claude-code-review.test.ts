/**
 * Tests OGHW4 — `.github/workflows/claude-code-review.yml`:
 *   - Draft-skip gate present (added 14f5d51).
 *   - Uses anthropics/claude-code-action@v1 (anthropics is on the
 *     SHA-pin EXEMPT list).
 *   - timeout-minutes bounded.
 *   - persist-credentials: false on checkout (action posts via API, not git push).
 *   - ANTHROPIC_API_KEY is NOT in env (chassis posture).
 *   - sticky comment configured.
 *
 * Outcome OGHW4.
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
  resolve(REPO_ROOT, ".github", "workflows", "claude-code-review.yml"),
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

console.log("workflows/claude-code-review.yml:");

check("draft-skip gate", () => {
  if (!/github\.event\.pull_request\.draft == false/.test(yaml))
    throw new Error("missing draft gate");
});

check("uses anthropics/claude-code-action@v1 (SHA-pin EXEMPT per OGHW-X2)", () => {
  if (!/uses:\s*anthropics\/claude-code-action@v1\b/.test(yaml))
    throw new Error("expected anthropics/claude-code-action@v1");
});

check("timeout-minutes bounded (≤ 60)", () => {
  const m = yaml.match(/timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 60) throw new Error(`timeout-minutes ${t} too large`);
});

check("checkout sets persist-credentials: false", () => {
  if (!/persist-credentials:\s*false/.test(yaml))
    throw new Error("missing persist-credentials: false (review posts via API, not git push)");
});

check("ANTHROPIC_API_KEY is NOT in env (OAuth-only chassis posture)", () => {
  if (/ANTHROPIC_API_KEY:/.test(yaml))
    throw new Error("ANTHROPIC_API_KEY must not be set per chassis posture");
});

check("uses claude_code_oauth_token (correct auth surface)", () => {
  if (!/claude_code_oauth_token:/.test(yaml))
    throw new Error("must use claude_code_oauth_token");
});

check("sticky comment enabled", () => {
  if (!/use_sticky_comment:\s*true/.test(yaml))
    throw new Error("expected use_sticky_comment: true (per OAUTO13)");
});

check("bot exclude list is explicit (not '*[bot]' wildcard)", () => {
  if (!/exclude_comments_by_actor:/.test(yaml))
    throw new Error("missing exclude_comments_by_actor");
  if (/exclude_comments_by_actor:.*\*\[bot\]/.test(yaml))
    throw new Error("must NOT use '*[bot]' wildcard (public-repo risk per security.md)");
});

check("permissions: pull-requests: write (for inline comments)", () => {
  if (!/permissions:[\s\S]+?pull-requests:\s*write/m.test(yaml))
    throw new Error("missing pull-requests: write");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
