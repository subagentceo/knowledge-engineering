/**
 * Asserts the 3 Code Intelligence SKILL.md entries land under
 * plugins/platform-engineering/skills/ following the agentskills.io
 * spec already conformed to in OPE3 (sibling skills like
 * citations-tests-outcomes, manage-local-container, etc.).
 *
 * Outcome OPE6.
 *
 * @tdd green
 * @cite vendor/agentskills/agentskills.io/specification.md
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins.md
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const SKILLS_ROOT = resolve(REPO_ROOT, "plugins/platform-engineering/skills");
const PLUGIN_JSON = resolve(REPO_ROOT, "plugins/platform-engineering/.claude-plugin/plugin.json");

const EXPECTED_SKILLS = [
  "code-intelligence-lsp-setup",
  "code-intelligence-monitors",
  "code-intelligence-plugins-discover",
] as const;

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

console.log("code-intelligence-skills:");

for (const id of EXPECTED_SKILLS) {
  check(`${id}/SKILL.md exists with required frontmatter`, () => {
    const p = resolve(SKILLS_ROOT, id, "SKILL.md");
    if (!existsSync(p)) throw new Error(`missing ${p}`);
    const body = readFileSync(p, "utf8");
    if (!body.startsWith("---")) throw new Error("no frontmatter");
    // Agentskills spec: name (kebab-case ≤64), description (1-1024),
    // license, compatibility (≤500). Quick presence check.
    for (const field of ["name:", "description:", "license:", "compatibility:"]) {
      if (!body.includes(field)) throw new Error(`missing field: ${field}`);
    }
    const nameMatch = body.match(/^name:\s*([a-z0-9-]+)$/m);
    if (!nameMatch || nameMatch[1] !== id)
      throw new Error(`frontmatter name must equal '${id}', got: ${nameMatch?.[1]}`);
  });
}

check("plugin.json skills list registers all 3 new SKILL.md entries", () => {
  const manifest = JSON.parse(readFileSync(PLUGIN_JSON, "utf8"));
  const skills: string[] = manifest.skills ?? [];
  for (const id of EXPECTED_SKILLS) {
    const ref = `skills/${id}`;
    if (!skills.includes(ref)) throw new Error(`plugin.json skills missing: ${ref}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
