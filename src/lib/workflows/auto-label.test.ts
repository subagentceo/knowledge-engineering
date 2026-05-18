/**
 * Tests OGHW1 — `.github/workflows/auto-label.yml`:
 *   - Draft-skip gate present (already shipped in OAUTO9 / 14f5d51).
 *   - timeout-minutes bounded.
 *   - concurrency group per-PR.
 *   - permissions least-privilege (pull-requests: write ONLY).
 *   - No injection surface (every github.event.* flows through env:).
 *
 * Outcome OGHW1.
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
  resolve(REPO_ROOT, ".github", "workflows", "auto-label.yml"),
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

console.log("workflows/auto-label.yml:");

check("draft-skip gate", () => {
  if (!/!github\.event\.pull_request\.draft/.test(yaml))
    throw new Error("missing draft gate");
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

check("permissions: pull-requests: write ONLY (least-privilege)", () => {
  if (!/permissions:[\s\S]+?pull-requests:\s*write/m.test(yaml))
    throw new Error("missing pull-requests: write");
  if (/permissions:[\s\S]+?contents:/.test(yaml))
    throw new Error("auto-label must NOT request contents permission");
});

check("no direct ${{ github.event.* }} interpolation in run: blocks", () => {
  // Find lines starting with `run:` blocks and check for github.event references.
  // The chassis policy is: pass via env: + reference as a shell var.
  const runBlocks = yaml.match(/run:\s*\|[\s\S]*?(?=\n[a-z-]+:|\n\s*-|\nname:|\nconcurrency:|$)/gm) ?? [];
  for (const block of runBlocks) {
    if (/\$\{\{\s*github\.event\./.test(block))
      throw new Error("github.event.* interpolated directly in run:; route via env:");
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
