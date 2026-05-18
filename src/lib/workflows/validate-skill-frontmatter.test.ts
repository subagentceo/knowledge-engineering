/**
 * Tests OGHW10 — `.github/workflows/validate-skill-frontmatter.yml`:
 *   - Draft-skip gate present (added 14f5d51).
 *   - persist-credentials: false on checkout (read-only workflow).
 *   - timeout-minutes bounded.
 *   - concurrency group per-PR.
 *   - paths filter is intact (only SKILL.md + plugin.json changes
 *     trigger the workflow).
 *
 * Outcome OGHW10.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 * @cite vendor/agentskills/agentskills.io/specification.md
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const yaml = readFileSync(
  resolve(REPO_ROOT, ".github", "workflows", "validate-skill-frontmatter.yml"),
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

console.log("workflows/validate-skill-frontmatter.yml:");

check("draft-skip gate", () => {
  if (!/github\.event\.pull_request\.draft == false/.test(yaml))
    throw new Error("missing draft gate");
});

check("ready_for_review in trigger types", () => {
  if (!/types:\s*\[[^\]]*ready_for_review[^\]]*\]/.test(yaml))
    throw new Error("ready_for_review must be in pull_request types");
});

check("paths filter limits to SKILL.md + plugin.json", () => {
  if (!/paths:[\s\S]+?plugins\/\*\/skills\/\*\/SKILL\.md/.test(yaml))
    throw new Error("paths filter must include SKILL.md glob");
  if (!/paths:[\s\S]+?plugins\/\*\/\.claude-plugin\/plugin\.json/.test(yaml))
    throw new Error("paths filter must include plugin.json glob");
});

check("checkout sets persist-credentials: false (read-only workflow)", () => {
  if (!/persist-credentials:\s*false/.test(yaml))
    throw new Error("missing persist-credentials: false on checkout");
});

check("timeout-minutes bounded (≤ 15)", () => {
  const m = yaml.match(/timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 15) throw new Error(`timeout-minutes ${t} too large`);
});

check("concurrency group is declared", () => {
  if (!/^concurrency:\s*\n\s+group:/m.test(yaml))
    throw new Error("missing concurrency group");
});

check("permissions: contents: read (read-only)", () => {
  if (!/permissions:[\s\S]+?contents:\s*read/m.test(yaml))
    throw new Error("missing contents: read");
  if (/contents:\s*write/.test(yaml))
    throw new Error("validate-skill-frontmatter must not request contents:write");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
