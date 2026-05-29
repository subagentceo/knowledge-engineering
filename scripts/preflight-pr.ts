/**
 * preflight-pr — run the EXACT gate set the `main` branch ruleset enforces,
 * locally, in seconds, before pushing. Mirrors the required status checks
 * (`npm run verify`, `OSV-Scanner (PR)`) plus the two repo conventions that
 * are inside verify but cost a full CI round-trip to discover the hard way:
 * the `@tdd` test-header tag and the `(O<N>)` commit-message suffix.
 *
 * This is the OPM1 outcome from docs/postmortems/2026-05-29-merge-train.md:
 * the 2026-05-29 train burned ~20 wasted CI runs discovering these gates one
 * failed run at a time. Running them locally collapses that to one pass.
 *
 * Source of truth, NOT a re-implementation:
 *   - verify        → `npm run verify` (the same script CI runs)
 *   - osv           → `osv-scanner` binary if on PATH, else SKIP with a notice
 *   - convention    → CONVENTIONAL_RE copied verbatim from src/lib/conventions.test.ts
 *   - tdd           → delegates to `npm run verify:tdd`
 *
 * Exit non-zero on the first failing gate with the specific fix. `--fast`
 * skips the full verify chain (slow tf/coverage) and runs only the cheap
 * string gates — useful mid-edit; CI still runs the full set.
 *
 * @cite src/lib/conventions.test.ts (CONVENTIONAL_RE is the canonical pattern)
 * @cite scripts/verify-tdd-stage.ts (the @tdd gate this shells into)
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 */
import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

// Verbatim from src/lib/conventions.test.ts:78 — keep in sync. A drift here
// would make preflight lie; the conventions test remains the CI backstop.
const CONVENTIONAL_RE =
  /^(feat|fix|perf|refactor|chore|docs|test|build|ci|revert)(\([^)]+\))?!?:\s+.+\s+\(O[0-9A-Za-z][0-9A-Za-z-]*((?:[,+]\s*)(?:O[0-9A-Za-z][0-9A-Za-z-]*|[0-9]+))*\)(\s+\(#[0-9]+\))?\s*$/;
const MERGE_RE = /^(Merge |merge:)/;
const BOT_RE = /^chore\(deps\)\(deps\):|^chore\(main\): release /;

interface GateResult {
  name: string;
  ok: boolean;
  detail: string;
  skipped?: boolean;
}

function sh(cmd: string): string {
  return execSync(cmd, { cwd: REPO_ROOT, encoding: "utf8" });
}

function hasBinary(bin: string): boolean {
  try {
    sh(`command -v ${bin}`);
    return true;
  } catch {
    return false;
  }
}

function branchCommitSubjects(): string[] {
  const base = sh("git merge-base HEAD origin/main").trim();
  const raw = sh(`git log ${base}..HEAD --no-merges --pretty=format:%s`);
  return raw.split("\n").filter((s) => s.trim().length > 0);
}

function gateConvention(): GateResult {
  let subjects: string[];
  try {
    subjects = branchCommitSubjects();
  } catch {
    return { name: "convention", ok: true, detail: "no origin/main to diff against", skipped: true };
  }
  const offenders = subjects
    .filter((s) => !MERGE_RE.test(s) && !BOT_RE.test(s))
    .filter((s) => !CONVENTIONAL_RE.test(s));
  if (offenders.length === 0) {
    return { name: "convention", ok: true, detail: `${subjects.length} commit(s) conform` };
  }
  return {
    name: "convention",
    ok: false,
    detail:
      `${offenders.length} commit subject(s) missing "<type>(<scope>): <subject> (O<N>)":\n` +
      offenders.map((s) => `      ✗ ${s}`).join("\n") +
      `\n    Fix: git rebase -i and amend each subject to end with an outcome id, e.g. " (OPM1)".`,
  };
}

function gateTdd(): GateResult {
  try {
    sh("npm run --silent verify:tdd");
    return { name: "tdd", ok: true, detail: "all new test files carry @tdd <state>" };
  } catch (e) {
    const out = (e as { stdout?: Buffer }).stdout?.toString() ?? "";
    const missing = out.split("\n").filter((l) => l.includes("missing @tdd") || l.trimStart().startsWith("- "));
    return {
      name: "tdd",
      ok: false,
      detail:
        "verify:tdd failed — a new test file lacks an @tdd tag:\n" +
        missing.map((l) => `      ${l.trim()}`).join("\n") +
        "\n    Fix: add `* @tdd green` (or red/refactor) to the file's JSDoc header.",
    };
  }
}

function gateVerify(): GateResult {
  try {
    sh("npm run --silent verify");
    return { name: "verify", ok: true, detail: "npm run verify chain green" };
  } catch (e) {
    const out = (e as { stdout?: Buffer }).stdout?.toString() ?? "";
    const tail = out.split("\n").slice(-15).join("\n");
    return { name: "verify", ok: false, detail: "npm run verify FAILED. Tail:\n" + tail };
  }
}

function gateOsv(): GateResult {
  if (!hasBinary("osv-scanner")) {
    return {
      name: "osv",
      ok: true,
      skipped: true,
      detail: "osv-scanner not on PATH — SKIPPED locally; CI's OSV-Scanner (PR) is the backstop. " +
        "Install: `brew install osv-scanner` or see github.com/google/osv-scanner.",
    };
  }
  try {
    sh("osv-scanner --lockfile=package-lock.json --lockfile=frontend/package-lock.json --lockfile=infra/cloudflare/package-lock.json");
    return { name: "osv", ok: true, detail: "no known vulnerabilities" };
  } catch (e) {
    const out = (e as { stdout?: Buffer }).stdout?.toString() ?? "";
    const vulns = out.split("\n").filter((l) => l.includes("osv.dev") || l.includes("GHSA"));
    return {
      name: "osv",
      ok: false,
      detail:
        "osv-scanner found advisories (CI's required OSV-Scanner (PR) will block):\n" +
        vulns.map((l) => `      ${l.trim()}`).join("\n") +
        "\n    Fix: bump the flagged package(s); add an `overrides` entry if a parent hard-pins it.",
    };
  }
}

const fast = process.argv.includes("--fast");

const gates = fast
  ? [gateConvention(), gateTdd(), gateOsv()]
  : [gateConvention(), gateOsv(), gateTdd(), gateVerify()];

let failed = false;
for (const g of gates) {
  const mark = g.skipped ? "⏭" : g.ok ? "✓" : "✗";
  process.stdout.write(`${mark} ${g.name}: ${g.detail}\n`);
  if (!g.ok) failed = true;
}

if (failed) {
  process.stdout.write("\npreflight: BLOCKED — fix the above before pushing.\n");
  process.exit(1);
}
process.stdout.write(`\npreflight: OK${fast ? " (fast — full verify deferred to CI)" : ""}.\n`);
