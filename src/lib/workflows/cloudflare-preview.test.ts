/**
 * Tests OGHW6 — `.github/workflows/cloudflare-preview.yml`:
 *   - Draft-skip gate present on both jobs (added 14f5d51).
 *   - cloudflare/wrangler-action is SHA-pinned per OGHW-X2.
 *   - timeout-minutes bounded.
 *   - concurrency group per-PR.
 *   - Path filter still restricts triggers to infra/cloudflare/**.
 *   - ANTHROPIC_API_KEY-absence assertion is preserved (the bootstrap
 *     job actively rejects it in the Secrets Store).
 *
 * Outcome OGHW6.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 * @cite docs/decisions/2026-05-18-actions-sha-pinning.md
 * @cite seeds/posture/session-start.xml
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const yaml = readFileSync(
  resolve(REPO_ROOT, ".github", "workflows", "cloudflare-preview.yml"),
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

console.log("workflows/cloudflare-preview.yml:");

check("draft-skip gate on both jobs", () => {
  const occurrences = (yaml.match(/github\.event\.pull_request\.draft == false/g) ?? []).length;
  if (occurrences < 2)
    throw new Error(`expected draft gate on both jobs; found ${occurrences}`);
});

check("paths filter restricts to infra/cloudflare/**", () => {
  if (!/paths:[\s\S]+?infra\/cloudflare\/\*\*/.test(yaml))
    throw new Error("paths filter must include infra/cloudflare/**");
});

check("cloudflare/wrangler-action SHA-pinned (per OGHW-X2)", () => {
  const m = yaml.match(/uses:\s*cloudflare\/wrangler-action@([0-9a-f]{40})\b/);
  if (!m) throw new Error("cloudflare/wrangler-action must be pinned to a 40-char SHA");
});

check("concurrency group is declared", () => {
  if (!/^concurrency:\s*\n\s+group:/m.test(yaml))
    throw new Error("missing concurrency group");
});

check("timeout-minutes bounded on both jobs", () => {
  const all = yaml.match(/timeout-minutes:\s*(\d+)/g) ?? [];
  if (all.length < 2) throw new Error(`expected ≥2 timeout-minutes; found ${all.length}`);
  for (const t of all) {
    const v = parseInt(t.match(/(\d+)/)![1]!, 10);
    if (v > 30) throw new Error(`timeout-minutes ${v} too large`);
  }
});

check("ready_for_review in trigger types", () => {
  if (!/types:\s*\[[^\]]*ready_for_review[^\]]*\]/.test(yaml))
    throw new Error("ready_for_review must be in pull_request types");
});

check("bootstrap job asserts ANTHROPIC_API_KEY is absent from Secrets Store", () => {
  if (!/Assert ANTHROPIC_API_KEY is absent/.test(yaml))
    throw new Error("the ANTHROPIC_API_KEY-absence assertion step must remain");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
