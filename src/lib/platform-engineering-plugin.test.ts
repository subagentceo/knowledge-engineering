/**
 * Tests for plugins/platform-engineering/.claude-plugin/plugin.json.
 *
 * Outcome OPE1 per issue #175: plugin.json validates against the
 * Claude Code plugin schema and ships ≥4 skills including
 * turbopuffer-embeddings (OPE4), install-alloydb, and
 * docker-platform-engineering (OPE2).
 *
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 * @cite seeds/citations/define-outcomes.md
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_PATH = resolve(
  __dirname,
  "..",
  "..",
  "plugins",
  "platform-engineering",
  ".claude-plugin",
  "plugin.json",
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

interface PluginJson {
  $schema?: string;
  name: string;
  version: string;
  description: string;
  author: { name: string; url?: string };
  license: string;
  repository: { type: string; url: string; directory?: string };
  skills: string[];
  docs?: string[];
}

const raw = readFileSync(PLUGIN_PATH, "utf8");
const plugin = JSON.parse(raw) as PluginJson;

console.log("platform-engineering plugin.json:");

check("has $schema field (OPE1 schema validity)", () => {
  if (!plugin.$schema?.trim()) throw new Error("missing $schema");
});

check("name is platform-engineering", () => {
  if (plugin.name !== "platform-engineering")
    throw new Error(`got "${plugin.name}"`);
});

check("version is semver", () => {
  if (!/^\d+\.\d+\.\d+/.test(plugin.version))
    throw new Error(`got "${plugin.version}"`);
});

check("description is non-empty", () => {
  if (!plugin.description?.trim()) throw new Error("description is empty");
});

check("author.name is present", () => {
  if (!plugin.author?.name?.trim()) throw new Error("missing author.name");
});

check("license is present", () => {
  if (!plugin.license?.trim()) throw new Error("missing license");
});

check("repository.url is git URL", () => {
  if (!plugin.repository?.url?.startsWith("https://"))
    throw new Error(`unexpected url: ${plugin.repository?.url}`);
});

check("skills is an array with ≥4 entries (OPE1)", () => {
  if (!Array.isArray(plugin.skills))
    throw new Error("skills is not an array");
  if (plugin.skills.length < 4)
    throw new Error(`got ${plugin.skills.length} skill(s), need ≥4`);
});

check("turbopuffer-embeddings skill present (OPE4)", () => {
  if (!plugin.skills.some((s) => s.includes("turbopuffer-embeddings")))
    throw new Error("turbopuffer-embeddings not in skills[]");
});

check("install-alloydb skill present (OPE infra)", () => {
  if (!plugin.skills.some((s) => s.includes("install-alloydb")))
    throw new Error("install-alloydb not in skills[]");
});

check("docker-platform-engineering skill present (OPE2)", () => {
  if (!plugin.skills.some((s) => s.includes("docker-platform-engineering")))
    throw new Error("docker-platform-engineering not in skills[]");
});

check("no duplicate skill entries", () => {
  const seen = new Set<string>();
  for (const s of plugin.skills) {
    if (seen.has(s)) throw new Error(`duplicate skill: ${s}`);
    seen.add(s);
  }
});

check("all skill paths are relative (no absolute paths)", () => {
  for (const s of plugin.skills) {
    if (s.startsWith("/") || s.startsWith("~"))
      throw new Error(`absolute skill path: ${s}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
