#!/usr/bin/env tsx
/**
 * scripts/verify-kg.ts
 *
 * Phase 0 KG Ingestion — verify KG artifact files are present and non-empty.
 * Exits 0 if artifacts present or SKIP_KG_VERIFY=1.
 * Exits 1 if artifacts missing and SKIP_KG_VERIFY is not set.
 *
 * Usage:
 *   tsx scripts/verify-kg.ts
 *   SKIP_KG_VERIFY=1 tsx scripts/verify-kg.ts  # always passes (CI mode)
 */
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const KG_DIR = join(REPO_ROOT, ".kg");

const ARTIFACTS = [
  { name: "vendor-pages.jsonl", description: "vendor page index" },
  { name: "admonitions.jsonl", description: "harvested admonitions" },
] as const;

function countLines(filePath: string): number {
  return readFileSync(filePath, "utf8").split("\n").filter(Boolean).length;
}

function main(): void {
  if (process.env.SKIP_KG_VERIFY === "1") {
    process.stdout.write("[verify:kg] SKIP_KG_VERIFY=1 — skipping\n");
    return;
  }

  let allPresent = true;
  for (const artifact of ARTIFACTS) {
    const filePath = join(KG_DIR, artifact.name);
    if (!existsSync(filePath)) {
      process.stderr.write(`[verify:kg] MISSING: .kg/${artifact.name} (${artifact.description})\n`);
      process.stderr.write(`[verify:kg]   Run: tsx scripts/ingest-vendor-pages.ts > .kg/vendor-pages.jsonl\n`);
      process.stderr.write(`[verify:kg]   Run: tsx scripts/harvest-admonitions.ts > .kg/admonitions.jsonl\n`);
      allPresent = false;
      continue;
    }
    const lines = countLines(filePath);
    if (lines === 0) {
      process.stderr.write(`[verify:kg] EMPTY: .kg/${artifact.name} — run ingest first\n`);
      allPresent = false;
      continue;
    }
    process.stdout.write(`[verify:kg] OK: .kg/${artifact.name} — ${lines} records\n`);
  }

  if (!allPresent) {
    process.stderr.write(`[verify:kg] FAIL — set SKIP_KG_VERIFY=1 to skip in CI\n`);
    process.exit(1);
  }
}

main();
