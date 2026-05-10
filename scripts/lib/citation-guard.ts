// scripts/lib/citation-guard.ts
//
// Phase 0f. Discovers test files (anything matching *.test.ts or *.spec.ts
// under src/, scripts/, or infra/) and asserts each one carries at least one
// `@cite path/under/<root>/...` header that resolves to a real file under
// one of the canonical citation roots: vendor/, seeds/, rubrics/.
//
// vendor/  — external doc mirrors (Anthropic / Cloudflare / Neon / etc.)
// seeds/   — operator-facing canonical artifacts (prompts, posture XML)
// rubrics/ — per-phase outcome rubrics
//
// Fails closed when:
//   - a test file has no @cite header
//   - an @cite path does not resolve to a real file
//   - an @cite path resolves but is empty
//
// Behavior in Phase 0: there are no test files yet, so this guard exits 0
// trivially. Once Phase 1 lands the first tests, missing or broken citations
// fail the run.
//
// Wired via `npm run verify:citations` (added to package.json scripts in
// the same commit that introduces this file). Chained into the
// `verify:mcp` chain in Phase 9.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const CITATION_ROOTS = ["vendor", "seeds", "rubrics"] as const;
const CITATION_ROOT_PATHS = CITATION_ROOTS.map((r) => resolve(REPO_ROOT, r));

const TEST_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs"]);
const TEST_PATTERNS = [/\.test\.[mc]?[jt]sx?$/, /\.spec\.[mc]?[jt]sx?$/];
const SEARCH_DIRS = ["src", "scripts", "infra"];
const CITE_HEADER_RE = /@cite\s+([^\s*]+)/g;

interface Finding {
  file: string;
  reason: "no-header" | "missing-target" | "empty-target";
  detail: string;
}

function isTestFile(filePath: string): boolean {
  if (!TEST_EXTENSIONS.has(extname(filePath))) return false;
  return TEST_PATTERNS.some((re) => re.test(filePath));
}

function* walk(dir: string): Generator<string> {
  let entries: ReturnType<typeof readdirSync>;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && isTestFile(full)) {
      yield full;
    }
  }
}

function extractCitations(body: string): string[] {
  const out: string[] = [];
  for (const m of body.matchAll(CITE_HEADER_RE)) {
    out.push(m[1]);
  }
  return out;
}

function checkFile(filePath: string): Finding[] {
  const body = readFileSync(filePath, "utf8");
  const cites = extractCitations(body);
  if (cites.length === 0) {
    return [{ file: filePath, reason: "no-header", detail: "no @cite header found" }];
  }
  const findings: Finding[] = [];
  for (const cite of cites) {
    const rootMatch = CITATION_ROOTS.find((r) => cite.startsWith(`${r}/`));
    if (!rootMatch) {
      findings.push({
        file: filePath,
        reason: "missing-target",
        detail: `@cite ${cite} does not start with one of ${CITATION_ROOTS.join("/, ")}/`,
      });
      continue;
    }
    const target = resolve(REPO_ROOT, cite.split("#")[0]);
    if (!CITATION_ROOT_PATHS.some((p) => target.startsWith(p))) {
      findings.push({
        file: filePath,
        reason: "missing-target",
        detail: `@cite ${cite} escapes the canonical citation roots`,
      });
      continue;
    }
    let stat;
    try {
      stat = statSync(target);
    } catch {
      findings.push({
        file: filePath,
        reason: "missing-target",
        detail: `@cite ${cite} → ${relative(REPO_ROOT, target)} not found`,
      });
      continue;
    }
    if (!stat.isFile() || stat.size === 0) {
      findings.push({
        file: filePath,
        reason: "empty-target",
        detail: `@cite ${cite} resolves but is not a non-empty file`,
      });
    }
  }
  return findings;
}

export function runCitationGuard(): { ok: boolean; checked: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let checked = 0;
  for (const dir of SEARCH_DIRS) {
    for (const file of walk(resolve(REPO_ROOT, dir))) {
      checked += 1;
      findings.push(...checkFile(file));
    }
  }
  return { ok: findings.length === 0, checked, findings };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = runCitationGuard();
  if (result.checked === 0) {
    console.log("citation-guard: no test files found yet (trivially green)");
    process.exit(0);
  }
  if (!result.ok) {
    console.error(`citation-guard: ${result.findings.length} issue(s) across ${result.checked} test file(s)`);
    for (const f of result.findings) {
      console.error(`  ${relative(REPO_ROOT, f.file)}: ${f.reason} — ${f.detail}`);
    }
    process.exit(1);
  }
  console.log(`citation-guard: ${result.checked} test file(s) checked, all citations resolve`);
}
