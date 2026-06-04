#!/usr/bin/env tsx
/**
 * scripts/ingest-vendor-pages.ts
 *
 * Phase 0 KG Ingestion — index vendor/ markdown pages.
 * Writes JSONL records to stdout. Summary to stderr.
 *
 * Usage:
 *   tsx scripts/ingest-vendor-pages.ts > .kg/vendor-pages.jsonl
 *   tsx scripts/ingest-vendor-pages.ts --vendor cloudflare
 *
 * Output schema per line:
 *   { id, path, vendor, title, word_count, last_modified, ingested_at }
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, basename, sep } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const VENDOR_DIR = join(REPO_ROOT, "vendor");

interface VendorPageRecord {
  id: string;
  path: string;
  vendor: string;
  title: string | null;
  word_count: number;
  last_modified: string | null;
  ingested_at: string;
}

function vendorFromPath(filePath: string): string {
  const rel = relative(VENDOR_DIR, filePath);
  return rel.split(sep)[0] ?? "unknown";
}

function extractTitle(content: string, filePath: string): string | null {
  for (const line of content.split("\n")) {
    const m = line.match(/^#\s+(.+)/);
    if (m) return m[1].trim();
  }
  return basename(filePath, ".md") || null;
}

function countWords(content: string): number {
  return content.split(/\s+/).filter(Boolean).length;
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

async function main(): Promise<void> {
  const vendorFilter = (() => {
    const idx = process.argv.indexOf("--vendor");
    return idx >= 0 ? process.argv[idx + 1] : null;
  })();

  const ingestedAt = new Date().toISOString();
  let total = 0;

  for await (const filePath of walkMd(VENDOR_DIR)) {
    const vendor = vendorFromPath(filePath);
    if (vendorFilter && vendor !== vendorFilter) continue;
    const [content, fileStat] = await Promise.all([
      readFile(filePath, "utf8"),
      stat(filePath),
    ]);
    const relPath = relative(REPO_ROOT, filePath);
    const id = createHash("sha1").update(relPath).digest("hex").slice(0, 16);
    const record: VendorPageRecord = {
      id,
      path: relPath,
      vendor,
      title: extractTitle(content, filePath),
      word_count: countWords(content),
      last_modified: fileStat.mtime.toISOString(),
      ingested_at: ingestedAt,
    };
    process.stdout.write(JSON.stringify(record) + "\n");
    total++;
  }

  process.stderr.write(`[ingest-vendor-pages] ${total} pages indexed\n`);
}

main().catch((err) => {
  process.stderr.write(`[ingest-vendor-pages] FATAL: ${err}\n`);
  process.exit(1);
});
