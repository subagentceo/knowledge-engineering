/**
 * Conditional-assertion eval for OAPI3 — Anthropic SDK adoption policy.
 *
 * Two independent conditional groups:
 *
 *   Group A — @anthropic-ai/sdk pin
 *     IF present in dependencies, its range must include >=0.95.0
 *     (the version pinned today). Absent → SKIP.
 *
 *   Group B — OAuth-only invariant (OSL1)
 *     IF @anthropic-ai/claude-agent-sdk is present, no .ts file under
 *     src/ may USE `process.env.ANTHROPIC_API_KEY`. A reference is
 *     considered a USE unless one of these escape hatches applies:
 *       (a) the file is a *.test.ts that itself throws/rejects (the
 *           remaining references are save/restore scaffolding for the
 *           rejection test, not real SDK auth reads), or
 *       (b) within 5 lines of the reference, the file contains one of
 *           "throw", "reject", "delete process.env", or "oauth-only"
 *           — i.e. the site is a rejection guard or teardown.
 *
 * Absent deps → SKIPPED, never failed.
 *
 * @tdd green
 * @cite seeds/citations/define-outcomes.md
 * @cite seeds/posture/session-start.xml
 *
 * Related ADRs (referenced informationally; citation-guard scopes the
 * @ cite marker to vendor/seeds/rubrics only):
 *   - docs/decisions/2026-05-16-osv-only-no-secret-scanning.md (OSL1) —
 *     OAuth-only invariant rationale.
 *   - TODO-OPERATOR: docs/decisions/2026-05-17-messages-api-strategy-adoption.md
 *     (OMSG1) — promote to a real citation when the ADR merges to main
 *     AND the citation-guard allowlist is widened to docs/decisions/.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

let passed = 0;
let failed = 0;
let skipped = 0;

function check(name: string, fn: () => "ok" | "skip"): void {
  try {
    const result = fn();
    if (result === "skip") {
      skipped += 1;
      console.log(`  • SKIP ${name}`);
    } else {
      passed += 1;
      console.log(`  ✓ ${name}`);
    }
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

interface PackageJson {
  dependencies?: Record<string, string>;
}

const pkg = JSON.parse(
  readFileSync(resolve(REPO_ROOT, "package.json"), "utf8"),
) as PackageJson;
const deps = pkg.dependencies ?? {};

console.log("Anthropic SDK adoption policy eval (OAPI3)\n");

// ── Group A ────────────────────────────────────────────────────────────────
check("@anthropic-ai/sdk range covers >=0.95.0", () => {
  const range = deps["@anthropic-ai/sdk"];
  if (!range) return "skip";
  // Accept caret/tilde/explicit ranges of the form X.Y.Z; require major.minor
  // such that the lower bound is >= 0.95.0. Pragmatic parser (no semver dep):
  // strip leading ^~>=v, take first numeric triple.
  const m = range.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!m) throw new Error(`unparseable range: ${range}`);
  const [, majS, minS, patS] = m;
  const maj = Number(majS);
  const min = Number(minS);
  const pat = Number(patS);
  // For 0.x, caret/tilde lock minor; require minor>=95.
  if (maj === 0 && min < 95)
    throw new Error(`range ${range} excludes >=0.95.0`);
  if (maj === 0 && min === 95 && pat > 0 && !range.startsWith("^"))
    throw new Error(`range ${range} may exclude 0.95.0`);
  return "ok";
});

// ── Group B ────────────────────────────────────────────────────────────────

function listTsFiles(): string[] {
  // Use git ls-files for speed + .gitignore correctness.
  const out = execFileSync("git", ["ls-files", "src"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  return out
    .split("\n")
    .filter((p) => p.endsWith(".ts"))
    .map((p) => resolve(REPO_ROOT, p));
}

const USE_PATTERN = "process.env.ANTHROPIC_API_KEY";

interface Violation {
  file: string;
  line: number;
  text: string;
}

function findViolations(): Violation[] {
  const violations: Violation[] = [];
  for (const file of listTsFiles()) {
    const content = readFileSync(file, "utf8");
    if (!content.includes(USE_PATTERN)) continue;
    const lower = content.toLowerCase();
    // File-level exemption: a *.test.ts that exercises the OAuth-only
    // rejection path inevitably save/restores the env var in try/finally.
    // If the file itself contains a rejection-throw against the key, the
    // remaining references are scaffolding for that very test.
    const fileIsRejectionTest =
      file.endsWith(".test.ts") &&
      (lower.includes("throw") || lower.includes("reject"));
    if (fileIsRejectionTest) continue;
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].includes(USE_PATTERN)) continue;
      const start = Math.max(0, i - 5);
      const end = Math.min(lines.length, i + 6);
      const window = lines.slice(start, end).join("\n").toLowerCase();
      if (
        window.includes("throw") ||
        window.includes("reject") ||
        window.includes("delete process.env") ||
        window.includes("oauth-only")
      )
        continue;
      violations.push({
        file: relative(REPO_ROOT, file),
        line: i + 1,
        text: lines[i].trim(),
      });
    }
  }
  return violations;
}

check(
  "no USE of process.env.ANTHROPIC_API_KEY in src/ (OAuth-only invariant, OSL1)",
  () => {
    if (!deps["@anthropic-ai/claude-agent-sdk"]) return "skip";
    const vios = findViolations();
    if (vios.length > 0) {
      const detail = vios
        .map((v) => `      ${v.file}:${v.line}  ${v.text}`)
        .join("\n");
      throw new Error(
        `${vios.length} non-rejection USE site(s) found:\n${detail}`,
      );
    }
    return "ok";
  },
);

console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped`);
if (failed > 0) process.exit(1);
