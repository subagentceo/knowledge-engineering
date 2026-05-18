/**
 * Tests for .github/workflows/codeql.yml — asserts OCQ1's shape:
 *   - draft-skip gate matches the verify/osv-scanner pattern,
 *   - languages matrix covers `actions` and `javascript-typescript`,
 *   - init@v3 + analyze@v3 from `github/codeql-action` (first-party-exempt),
 *   - weekly schedule,
 *   - permissions are least-privilege (contents:read, security-events:write, actions:read),
 *   - persist-credentials:false on checkout (CodeQL only reads, no push).
 *
 * Outcome OCQ1.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const WORKFLOW = resolve(REPO_ROOT, ".github", "workflows", "codeql.yml");

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

console.log("workflows/codeql.yml:");

const yaml = readFileSync(WORKFLOW, "utf8");

check("workflow declares `name: codeql`", () => {
  if (!/^name:\s*codeql\s*$/m.test(yaml))
    throw new Error("missing or wrong `name:`");
});

check("triggers include pull_request with ready_for_review", () => {
  if (!/on:\s*[\s\S]*?pull_request:[\s\S]*?ready_for_review/m.test(yaml))
    throw new Error("pull_request types must include ready_for_review");
});

check("triggers include push: main", () => {
  if (!/push:\s*\n\s+branches:\s*\[main\]/m.test(yaml))
    throw new Error("missing push: branches: [main]");
});

check("triggers include weekly schedule", () => {
  // Tolerates a comment line between `schedule:` and `- cron:`.
  if (!/schedule:[\s\S]*?-\s*cron:/m.test(yaml))
    throw new Error("missing schedule: with cron");
});

check("triggers include workflow_dispatch (for manual + auto-rebase redispatch)", () => {
  if (!/workflow_dispatch:/m.test(yaml))
    throw new Error("missing workflow_dispatch");
});

check("draft-skip gate matches verify/osv pattern", () => {
  const want = "github.event.pull_request.draft == false";
  if (!yaml.includes(want))
    throw new Error(`missing draft gate: ${want}`);
});

check("permissions are least-privilege (contents:read, security-events:write, actions:read)", () => {
  for (const k of ["contents: read", "security-events: write", "actions: read"]) {
    if (!yaml.includes(k)) throw new Error(`missing perm: ${k}`);
  }
  // Negative: must NOT have write on contents (CodeQL only reads).
  if (/contents:\s*write/m.test(yaml))
    throw new Error("codeql workflow must not request contents:write");
});

check("checkout step sets persist-credentials: false", () => {
  if (!/persist-credentials:\s*false/m.test(yaml))
    throw new Error("missing persist-credentials: false on checkout");
});

check("uses github/codeql-action/init@v3 (first-party-exempt per SHA-pin ADR)", () => {
  if (!/uses:\s*github\/codeql-action\/init@v3\b/m.test(yaml))
    throw new Error("expected `uses: github/codeql-action/init@v3`");
});

check("uses github/codeql-action/analyze@v3", () => {
  if (!/uses:\s*github\/codeql-action\/analyze@v3\b/m.test(yaml))
    throw new Error("expected `uses: github/codeql-action/analyze@v3`");
});

check("language matrix includes both `actions` and `javascript-typescript`", () => {
  // Matches the Default setup languages at cutover. New languages MUST
  // be added here, not silently fall through to the Default setup.
  if (!yaml.includes("- actions"))
    throw new Error("matrix.language missing `actions`");
  if (!yaml.includes("- javascript-typescript"))
    throw new Error("matrix.language missing `javascript-typescript`");
});

check("query suite is security-extended", () => {
  if (!/queries:\s*security-extended/m.test(yaml))
    throw new Error("expected `queries: security-extended`");
});

check("timeout-minutes is bounded (≤ 60)", () => {
  const m = yaml.match(/timeout-minutes:\s*(\d+)/);
  if (!m) throw new Error("missing timeout-minutes");
  const t = parseInt(m[1]!, 10);
  if (t > 60) throw new Error(`timeout-minutes ${t} too large; cap at 60`);
});

check("concurrency group cancels in-progress runs on same ref", () => {
  if (!/concurrency:\s*\n\s+group:/m.test(yaml))
    throw new Error("missing concurrency group");
  if (!/cancel-in-progress:\s*true/m.test(yaml))
    throw new Error("expected cancel-in-progress: true");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
