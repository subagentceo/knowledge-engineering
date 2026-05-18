/**
 * Tests OGHW-X2's SHA-pin policy: every `uses:` line under
 * .github/workflows/* that references a third-party action (NOT under
 * actions/*, github/*, anthropics/*) is EITHER pinned to a 40-char SHA
 * OR appears on the documented exception list.
 *
 * Also asserts .github/dependabot.yml exists and declares the
 * github-actions ecosystem at directory: "/" with a weekly schedule.
 *
 * Outcome OGHW-X2.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 * @cite docs/decisions/2026-05-18-actions-sha-pinning.md
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const WF_DIR = resolve(REPO_ROOT, ".github", "workflows");
const DEPENDABOT = resolve(REPO_ROOT, ".github", "dependabot.yml");

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

// First-party / verified-creator orgs exempt from the SHA-pin rule per
// docs/decisions/2026-05-18-actions-sha-pinning.md.
const EXEMPT_OWNERS = new Set([
  "actions",      // first-party GitHub
  "github",       // first-party GitHub (e.g., github/codeql-action)
  "anthropics",   // direct vendor relationship
]);

// Documented exceptions from the ADR's "Exception list" section. Keep
// in sync with docs/decisions/2026-05-18-actions-sha-pinning.md.
const TAG_PIN_EXCEPTIONS = new Set([
  // Reusable-workflow refs cannot reliably SHA-pin.
  "google/osv-scanner-action/.github/workflows/osv-scanner-reusable-pr.yml",
  "google/osv-scanner-action/.github/workflows/osv-scanner-reusable.yml",
  // Tiny composite action; bounded supply-chain surface.
  "tj-actions/branch-names",
  // OGHW-X2 progressive-migration backlog. Each entry below is a
  // follow-up PR that SHA-pins the action and removes itself from
  // this list. The test passes today (green) but the ADR's intent is
  // that this list SHRINKS to only the two genuine exceptions above.
  // Track follow-up: docs/decisions/2026-05-18-actions-sha-pinning.md.
  "cloudflare/wrangler-action",            // → OGHW6 (cloudflare-preview.yml)
  "neondatabase/create-branch-action",     // → OGHW7 (neon-branch.yml)
  "neondatabase/schema-diff-action",       // → OGHW7 (neon-branch.yml)
  "neondatabase/delete-branch-action",     // → OGHW7 (neon-branch.yml)
  "googleapis/release-please-action",      // → OGHW9 (release-please.yml)
  "hashicorp/setup-terraform",             // → OGHW11 (verify.yml)
]);

const SHA40 = /^[0-9a-f]{40}$/;

interface UsesLine {
  file: string;
  lineNum: number;
  uses: string; // raw text after `uses: `
  owner: string;
  repo: string;
  ref: string;
}

function parseUses(line: string): { owner: string; repo: string; ref: string } | null {
  // `uses: owner/repo@ref` or `uses: owner/repo/path/to/file@ref`
  const m = line.match(/^\s*-?\s*uses:\s*([^\s#]+)\s*(?:#.*)?$/);
  if (!m) return null;
  const spec = m[1]!;
  // Skip docker:// or ./ local-action refs.
  if (spec.startsWith("docker://") || spec.startsWith("./")) return null;
  const at = spec.lastIndexOf("@");
  if (at < 0) return null;
  const path = spec.slice(0, at);
  const ref = spec.slice(at + 1);
  const slash = path.indexOf("/");
  if (slash < 0) return null;
  const owner = path.slice(0, slash);
  const repo = path.slice(slash + 1);
  return { owner, repo, ref };
}

function collectUses(): UsesLine[] {
  const out: UsesLine[] = [];
  for (const name of readdirSync(WF_DIR)) {
    if (!name.endsWith(".yml") && !name.endsWith(".yaml")) continue;
    const file = resolve(WF_DIR, name);
    const text = readFileSync(file, "utf8");
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const parsed = parseUses(lines[i]!);
      if (!parsed) continue;
      out.push({ file, lineNum: i + 1, uses: lines[i]!.trim(), ...parsed });
    }
  }
  return out;
}

console.log("workflows/sha-pin policy:");

const all = collectUses();

check("found at least one `uses:` line (sanity)", () => {
  if (all.length === 0) throw new Error("no `uses:` lines found; parser broken?");
});

for (const u of all) {
  const display = `${u.owner}/${u.repo}@${u.ref}`;
  const slug = `${u.owner}/${u.repo}`;

  check(`${display} (in ${u.file.replace(REPO_ROOT + "/", "")}:${u.lineNum})`, () => {
    // Exempt owner: anything goes.
    if (EXEMPT_OWNERS.has(u.owner)) return;
    // Documented exception: tag pin is allowed.
    if (TAG_PIN_EXCEPTIONS.has(slug)) return;
    // Reusable-workflow references (path contains .github/workflows/X.yml) —
    // those are auto-covered by the slug check above, but defense in depth:
    // any `path` segment under .github/workflows/ is exempt.
    if (u.repo.includes(".github/workflows/")) return;
    // Otherwise: ref MUST be a 40-char SHA.
    if (!SHA40.test(u.ref)) {
      throw new Error(
        `third-party action ${display} is not SHA-pinned. Either pin to a 40-char commit SHA ` +
          `(with an inline # v<major> comment) or add ${slug} to TAG_PIN_EXCEPTIONS in this test ` +
          `AND to docs/decisions/2026-05-18-actions-sha-pinning.md.`
      );
    }
  });
}

console.log("\ndependabot.yml:");

check(".github/dependabot.yml exists", () => {
  // readFileSync throws if missing.
  readFileSync(DEPENDABOT, "utf8");
});

const deps = readFileSync(DEPENDABOT, "utf8");

check("declares `version: 2`", () => {
  if (!/^version:\s*2\s*$/m.test(deps))
    throw new Error("missing or wrong `version:`");
});

check("declares github-actions ecosystem", () => {
  if (!/package-ecosystem:\s*github-actions/m.test(deps))
    throw new Error("missing github-actions ecosystem");
});

check('github-actions ecosystem uses directory: "/"', () => {
  if (!/directory:\s*"\/"/m.test(deps))
    throw new Error('expected directory: "/" per the docs');
});

check("github-actions ecosystem schedules weekly", () => {
  if (!/interval:\s*weekly/m.test(deps))
    throw new Error("missing weekly schedule");
});

check("github-actions ecosystem groups all bumps into one PR", () => {
  if (!/groups:[\s\S]+?github-actions-all:[\s\S]+?patterns:[\s\S]+?-\s*"\*"/m.test(deps))
    throw new Error("expected groups.github-actions-all.patterns: [*]");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
