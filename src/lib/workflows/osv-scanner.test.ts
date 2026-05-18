/**
 * Tests OGHW8 — `.github/workflows/osv-scanner.yml`:
 *   - Draft-skip gate on scan-pr (added 14f5d51).
 *   - OAUTO14 invariant: scan-pr runs on workflow_dispatch (so the
 *     auto-rebase redispatch produces the required "OSV-Scanner (PR) /
 *     osv-scan" context — without this, auto-merge-recovery breaks).
 *   - Reusable workflow tag-pin is documented exception (OGHW-X2).
 *   - Job name is `OSV-Scanner (PR)` (matches first part of the
 *     required-check context).
 *   - --experimental-exclude=third_party retained (OHYG1).
 *   - ready_for_review in trigger types.
 *
 * Outcome OGHW8.
 *
 * @tdd green
 * @cite seeds/citations/github-actions-best-practices-2026-05-18.md
 * @cite docs/decisions/2026-05-17-auto-merge-recovery.md
 * @cite docs/decisions/2026-05-18-actions-sha-pinning.md
 * @cite vendor/osv-scanner/google.github.io/osv-scanner/github-action/index.md
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const yaml = readFileSync(
  resolve(REPO_ROOT, ".github", "workflows", "osv-scanner.yml"),
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

console.log("workflows/osv-scanner.yml:");

check("scan-pr job name is `OSV-Scanner (PR)` (first half of required-check context)", () => {
  if (!/name:\s*OSV-Scanner \(PR\)/.test(yaml))
    throw new Error("scan-pr job name must be `OSV-Scanner (PR)`");
});

check("OAUTO14 invariant: scan-pr runs on workflow_dispatch (auto-rebase redispatch)", () => {
  // The if: must accept workflow_dispatch OR pull_request.
  if (!/github\.event_name\s*==\s*'workflow_dispatch'/.test(yaml))
    throw new Error("scan-pr must accept workflow_dispatch (OAUTO14)");
});

check("draft-skip gate on scan-pr", () => {
  if (!/github\.event\.pull_request\.draft == false/.test(yaml))
    throw new Error("scan-pr missing draft gate");
});

check("ready_for_review in trigger types", () => {
  if (!/types:\s*\[[^\]]*ready_for_review[^\]]*\]/.test(yaml))
    throw new Error("ready_for_review must be in pull_request types");
});

check("--experimental-exclude=third_party retained (OHYG1)", () => {
  if (!/--experimental-exclude=third_party/.test(yaml))
    throw new Error("OHYG1's third_party exclude flag must remain");
});

check("reusable workflows are tag-pinned (documented OGHW-X2 exception)", () => {
  // Per the SHA-pin ADR, reusable workflows cannot be reliably SHA-
  // pinned today. Confirm we still use the @v2.3.8 tag form.
  if (!/google\/osv-scanner-action\/\.github\/workflows\/osv-scanner-reusable(-pr)?\.yml@v\d+\.\d+\.\d+/.test(yaml))
    throw new Error(
      "osv-scanner reusable workflow must be tag-pinned (per OGHW-X2 exception)"
    );
});

check("upload-sarif: false (intentional — paid feature)", () => {
  if (!/upload-sarif:\s*false/.test(yaml))
    throw new Error("upload-sarif must be false per ADR 2026-05-16-osv-only-no-secret-scanning");
});

check("schedule cron is weekly (recovery + audit cadence)", () => {
  if (!/cron:\s*"0 6 \* \* 1"/.test(yaml))
    throw new Error("expected weekly cron at Mondays 06:00 UTC");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
