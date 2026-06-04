#!/usr/bin/env tsx
/**
 * scripts/harvest-admonitions.ts
 *
 * Phase 0 KG Ingestion — extract admonitions from vendor/ markdown files.
 * Writes JSONL records to stdout. Summary to stderr.
 *
 * Usage:
 *   tsx scripts/harvest-admonitions.ts > .kg/admonitions.jsonl
 *   tsx scripts/harvest-admonitions.ts --vendor anthropics
 *
 * Output schema per line:
 *   { id, page_path, vendor, kind, content, line_number, extracted_at }
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const VENDOR_DIR = join(REPO_ROOT, "vendor");

const ADMONITION_KINDS = ["NOTE", "TIP", "WARNING", "CAUTION", "IMPORTANT"] as const;
type AdmonitionKind = typeof ADMONITION_KINDS[number];

const ADMONITION_RE = /^>\s*\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]/i;

interface AdmonitionRecord {
  id: string;
  page_path: string;
  vendor: string;
  kind: AdmonitionKind;
  content: string;
  line_number: number;
  extracted_at: string;
}

function vendorFromPath(filePath: string): string {
  const rel = relative(VENDOR_DIR, filePath);
  return rel.split(sep)[0] ?? "unknown";
}

async function* walkMd(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMd(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield full;
    }
  }
}

function extractAdmonitions(filePath: string, content: string, extractedAt: string): AdmonitionRecord[] {
  const lines = content.split("\n");
  const results: AdmonitionRecord[] = [];
  const vendor = vendorFromPath(filePath);
  const relPath = relative(REPO_ROOT, filePath);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(ADMONITION_RE);
    if (!m) continue;
    const kind = m[1].toUpperCase() as AdmonitionKind;
    // collect continuation lines (lines starting with ">")
    const contentLines: string[] = [];
    let j = i + 1;
    while (j < lines.length && lines[j].trimStart().startsWith(">")) {
      contentLines.push(lines[j].replace(/^>\s?/, ""));
      j++;
    }
    const text = contentLines.join(" ").trim() || line;
    const id = createHash("sha1")
      .update(`${relPath}:${i}:${kind}`)
      .digest("hex")
      .slice(0, 16);
    results.push({ id, page_path: relPath, vendor, kind, content: text, line_number: i + 1, extracted_at: extractedAt });
  }
  return results;
}

async function main(): Promise<void> {
  const vendorFilter = (() => {
    const idx = process.argv.indexOf("--vendor");
    return idx >= 0 ? process.argv[idx + 1] : null;
  })();

  const extractedAt = new Date().toISOString();
  let totalFiles = 0;
  let totalAdmonitions = 0;

  for await (const filePath of walkMd(VENDOR_DIR)) {
    const vendor = vendorFromPath(filePath);
    if (vendorFilter && vendor !== vendorFilter) continue;
    const content = await readFile(filePath, "utf8");
    const records = extractAdmonitions(filePath, content, extractedAt);
    for (const rec of records) {
      process.stdout.write(JSON.stringify(rec) + "\n");
      totalAdmonitions++;
    }
    totalFiles++;
  }

  process.stderr.write(`[harvest-admonitions] ${totalFiles} files, ${totalAdmonitions} admonitions\n`);
}

main().catch((err) => {
  process.stderr.write(`[harvest-admonitions] FATAL: ${err}\n`);
  process.exit(1);
});
