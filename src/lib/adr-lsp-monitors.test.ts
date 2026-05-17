/**
 * Asserts the ADR for the LSP + Monitors + cadence decisions
 * (OPE7/OPE9) exists, names the right outcome IDs, and records the
 * 3-minute cron cadence.
 *
 * Outcome OPE9.
 *
 * @tdd red
 * @cite vendor/agentskills/agentskills.io/specification.md
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const ADR_PATH = resolve(
  REPO_ROOT,
  "docs/decisions/2026-05-16-platform-engineering-lsp-monitors.md",
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

console.log("adr-lsp-monitors:");

check("ADR file exists", () => {
  if (!existsSync(ADR_PATH)) throw new Error(`missing ${ADR_PATH}`);
});

check("ADR references OPE6 + OPE7 (forward refs into LSP+Monitors PRs)", () => {
  const body = readFileSync(ADR_PATH, "utf8");
  for (const tag of ["OPE6", "OPE7"]) {
    if (!body.includes(tag)) throw new Error(`ADR missing reference to ${tag}`);
  }
});

check("ADR references OSL1 (GoogleOSV-only invariant preserved)", () => {
  const body = readFileSync(ADR_PATH, "utf8");
  if (!body.includes("OSL1")) throw new Error("ADR must reference OSL1");
});

check("ADR documents */3 * * * * cron cadence (15m → 3m change)", () => {
  const body = readFileSync(ADR_PATH, "utf8");
  if (!body.includes("*/3 * * * *"))
    throw new Error("ADR must include */3 * * * * cron expression");
  if (!body.includes("15")) throw new Error("ADR should mention 15m prior cadence");
});

check("ADR cites agentskills.io spec + plugins-reference.md", () => {
  const body = readFileSync(ADR_PATH, "utf8");
  if (!body.includes("agentskills"))
    throw new Error("ADR must cite agentskills.io specification");
  if (!body.includes("plugins-reference.md"))
    throw new Error("ADR must cite plugins-reference.md");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
