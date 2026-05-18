/**
 * Tests OGHW7 — `.github/workflows/neon-branch.yml`:
 *   - Draft-skip gate on create_neon_branch (added 14f5d51).
 *   - delete_neon_branch is INTENTIONALLY NOT draft-gated (cleanup
 *     on close must run regardless of draft state).
 *   - All 3 neondatabase actions SHA-pinned per OGHW-X2.
 *   - timeout-minutes on both jobs.
 *   - The "never log db_url" discipline is preserved.
 *
 * Outcome OGHW7.
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
  resolve(REPO_ROOT, ".github", "workflows", "neon-branch.yml"),
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

console.log("workflows/neon-branch.yml:");

check("create_neon_branch has draft-skip gate", () => {
  const createSection = yaml.split(/^\s+create_neon_branch:/m)[1]!.split(/^\s+delete_neon_branch:/m)[0]!;
  if (!/github\.event\.pull_request\.draft == false/.test(createSection))
    throw new Error("create_neon_branch missing draft gate");
});

check("delete_neon_branch is intentionally NOT draft-gated", () => {
  const deleteSection = yaml.split(/^\s+delete_neon_branch:/m)[1] ?? "";
  if (/draft == false/.test(deleteSection))
    throw new Error(
      "delete_neon_branch must NOT be draft-gated — cleanup on close must fire regardless"
    );
});

check("ready_for_review in trigger types", () => {
  if (!/types:[\s\S]+?ready_for_review/.test(yaml))
    throw new Error("ready_for_review must be in pull_request types");
});

check("neondatabase/create-branch-action SHA-pinned", () => {
  if (!/neondatabase\/create-branch-action@[0-9a-f]{40}\b/.test(yaml))
    throw new Error("create-branch-action must be SHA-pinned");
});

check("neondatabase/schema-diff-action SHA-pinned", () => {
  if (!/neondatabase\/schema-diff-action@[0-9a-f]{40}\b/.test(yaml))
    throw new Error("schema-diff-action must be SHA-pinned");
});

check("neondatabase/delete-branch-action SHA-pinned", () => {
  if (!/neondatabase\/delete-branch-action@[0-9a-f]{40}\b/.test(yaml))
    throw new Error("delete-branch-action must be SHA-pinned");
});

check("both jobs have timeout-minutes", () => {
  const all = yaml.match(/timeout-minutes:\s*(\d+)/g) ?? [];
  if (all.length < 2)
    throw new Error(`expected ≥2 timeout-minutes (create + delete); found ${all.length}`);
});

check("never-log db_url discipline retained", () => {
  if (!/never\s+log\s+db_url/i.test(yaml))
    throw new Error(
      "the comment forbidding db_url logging must remain — credentials leak risk"
    );
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
