/**
 * Asserts the docs.github.com vendor mirror lands on disk under
 * vendor/docs-github/ — crawl.json, .checksums.json, and at least one
 * .md file from the live crawl.
 *
 * Dogfoods the LEGACY_ALLOW + crawl-vendors pattern established by
 * vendor/agentskills and vendor/wellarchitected-github earlier this
 * session — no new primitives, just a new mirror.
 *
 * Outcome OPE5.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 * @cite seeds/posture/session-start.xml
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const MIRROR_ROOT = resolve(REPO_ROOT, "vendor/docs-github");

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

console.log("docs-github-mirror:");

check("crawl.json exists and parses", () => {
  const p = resolve(MIRROR_ROOT, "crawl.json");
  if (!existsSync(p)) throw new Error(`missing ${p}`);
  const cfg = JSON.parse(readFileSync(p, "utf8"));
  if (cfg.name !== "docs-github") throw new Error(`name should be docs-github, got ${cfg.name}`);
  if (!Array.isArray(cfg.allow_prefixes) || cfg.allow_prefixes.length === 0)
    throw new Error("allow_prefixes must be a non-empty array");
});

check(".checksums.json exists", () => {
  const p = resolve(MIRROR_ROOT, ".checksums.json");
  if (!existsSync(p)) throw new Error(`missing ${p} — run: npm run crawl:vendor -- docs-github`);
});

check("at least one .md mirrored under docs.github.com/", () => {
  const host = resolve(MIRROR_ROOT, "docs.github.com");
  if (!existsSync(host)) throw new Error(`missing ${host}`);
  function* walkMd(dir: string): Generator<string> {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, e.name);
      if (e.isDirectory()) yield* walkMd(full);
      else if (e.isFile() && e.name.endsWith(".md")) yield full;
    }
  }
  let count = 0;
  for (const _ of walkMd(host)) {
    count++;
    if (count >= 1) break;
  }
  if (count === 0) throw new Error("no .md files under docs.github.com/");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
