/**
 * Extracts JSX admonition blocks (<Note>, <Warning>, <Tip>, <Callout>, <Caution>, <Info>)
 * from all .md files under vendor/. Caches by file sha256 in Redis. Writes dist/admonitions.jsonl.
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/extensions/overview.md
 * @cite rubrics/phase-0.md
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { getString, setString } from "../src/lib/redis-client.js";
import { hashBody } from "./lib/checksums.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const VENDOR_DIR = join(REPO_ROOT, "vendor");
const DIST_DIR = join(REPO_ROOT, "dist");
const OUTPUT_FILE = join(DIST_DIR, "admonitions.jsonl");

const DRY_RUN = process.argv.includes("--dry-run");

// Not a module-level stateful regex — each call creates its own instance so
// concurrent callers don't share lastIndex state.
const ADMONITION_PATTERN = /<(Note|Warning|Tip|Callout|Caution|Info)[^>]*>([\s\S]*?)<\/\1>/gm;

export interface AdmonitionRecord {
  file: string;      // relative path from repo root e.g. "vendor/modelcontextprotocol/..."
  lineStart: number; // 1-indexed line number of opening tag
  type: string;      // "Note" | "Warning" | "Tip" | "Callout" | "Caution" | "Info"
  text: string;      // inner content, trimmed
  sha256: string;    // sha256 of the source file content (for dedup)
}

function walkMdFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMdFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

function countNewlines(str: string): number {
  let n = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\n") n++;
  }
  return n;
}

export async function harvestAdmonitions(filePath: string, prefetchedContent?: string): Promise<AdmonitionRecord[]> {
  const content = prefetchedContent ?? readFileSync(filePath, "utf8");
  const sha256 = hashBody(content);
  const relPath = relative(REPO_ROOT, filePath);
  // Include relPath so two files with identical content don't share a cache entry
  // (records contain file-specific relPath in the `file` field).
  const cacheKey = "admonitions:" + relPath + ":" + sha256;

  const cached = await getString(cacheKey);
  if (cached !== null) {
    try {
      return JSON.parse(cached) as AdmonitionRecord[];
    } catch {
      // Treat corrupt cache entry as a miss and recompute.
    }
  }

  const records: AdmonitionRecord[] = [];
  // Local regex instance: avoids shared lastIndex state with concurrent callers.
  const re = new RegExp(ADMONITION_PATTERN.source, ADMONITION_PATTERN.flags);
  let match: RegExpExecArray | null;

  while ((match = re.exec(content)) !== null) {
    const lineStart = countNewlines(content.slice(0, match.index)) + 1;
    records.push({
      file: relPath,
      lineStart,
      type: match[1],
      text: match[2].trim(),
      sha256,
    });
  }

  if (!DRY_RUN) {
    await setString(cacheKey, JSON.stringify(records), { ex: 86400 });
  }

  return records;
}

async function main(): Promise<void> {
  const mdFiles = walkMdFiles(VENDOR_DIR);
  const allRecords: AdmonitionRecord[] = [];
  let cacheHits = 0;
  let cacheMisses = 0;

  for (const filePath of mdFiles) {
    const content = readFileSync(filePath, "utf8");
    const sha256 = hashBody(content);
    const relPath = relative(REPO_ROOT, filePath);
    const cacheKey = "admonitions:" + relPath + ":" + sha256;

    const cached = await getString(cacheKey);
    let records: AdmonitionRecord[] | null = null;
    if (cached !== null) {
      try {
        records = JSON.parse(cached) as AdmonitionRecord[];
        cacheHits++;
      } catch {
        // fall through to recompute
      }
    }
    if (records === null) {
      cacheMisses++;
      records = await harvestAdmonitions(filePath, content);
    }
    allRecords.push(...records);
  }

  if (!DRY_RUN) {
    mkdirSync(DIST_DIR, { recursive: true });
    const jsonl = allRecords.map((r) => JSON.stringify(r)).join("\n");
    writeFileSync(OUTPUT_FILE, jsonl + (allRecords.length > 0 ? "\n" : ""));
  }

  console.log(
    `[harvest] ${allRecords.length} admonitions in ${mdFiles.length} files (${cacheHits} Redis hits, ${cacheMisses} misses)`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
