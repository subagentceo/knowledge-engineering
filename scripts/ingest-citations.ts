// scripts/ingest-citations.ts
//
// Citation pipeline for the researcher-facing frontend. Walks the
// mirrored Anthropic research corpus (vendor/anthropic-sitemap/research
// + vendor/anthropic-sitemap/_pdfs), extracts one CSL-JSON item per doc
// via src/lib/csl.ts, and emits:
//
//   1. frontend/public/citations.json  — static dataset the citations
//      table on outcomesdk.com fetches (vite copies public/ → dist).
//   2. (--pg) `csl_items` table in PostgreSQL — researchers query it
//      directly; the durable half of the pipeline. Connection from
//      DATABASE_URL, defaulting to the local socket.
//
// Wired as `npm run ingest:citations`. Idempotent: re-runs upsert.
//
// @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
// @cite https://github.com/citation-style-language/schema

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { researchDocToCslItem, type CslItem } from "../src/lib/csl.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CORPUS_DIRS = [
  "vendor/anthropic-sitemap/research",
  "vendor/anthropic-sitemap/_pdfs",
];
const OUT_JSON = resolve(REPO_ROOT, "frontend", "public", "citations.json");

export const CSL_ITEMS_DDL = `
CREATE TABLE IF NOT EXISTS csl_items (
  id          text PRIMARY KEY,
  type        text NOT NULL,
  title       text NOT NULL,
  item        jsonb NOT NULL,
  source_path text NOT NULL,
  issued_year int,
  ingested_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS csl_items_year_idx ON csl_items (issued_year);
`.trim();

function* walkMarkdown(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMarkdown(path);
    else if (entry.isFile() && entry.name.endsWith(".md")) yield path;
  }
}

function buildItems(): CslItem[] {
  const items: CslItem[] = [];
  for (const dir of CORPUS_DIRS) {
    for (const abs of walkMarkdown(resolve(REPO_ROOT, dir))) {
      const rel = relative(REPO_ROOT, abs);
      items.push(researchDocToCslItem(rel, readFileSync(abs, "utf8")));
    }
  }
  return items.sort((a, b) => a.id.localeCompare(b.id));
}

async function upsertPg(items: CslItem[]): Promise<void> {
  const { default: pg } = await import("pg");
  const pool = new pg.Pool(
    process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
  );
  try {
    await pool.query(CSL_ITEMS_DDL);
    for (const item of items) {
      await pool.query(
        `INSERT INTO csl_items (id, type, title, item, source_path, issued_year)
         VALUES ($1, $2, $3, $4::jsonb, $5, $6)
         ON CONFLICT (id) DO UPDATE
           SET type = EXCLUDED.type, title = EXCLUDED.title,
               item = EXCLUDED.item, source_path = EXCLUDED.source_path,
               issued_year = EXCLUDED.issued_year, ingested_at = now()`,
        [
          item.id,
          item.type,
          item.title,
          JSON.stringify(item),
          item.source ?? "",
          item.issued?.["date-parts"][0][0] ?? null,
        ],
      );
    }
  } finally {
    await pool.end();
  }
}

async function main(): Promise<void> {
  const items = buildItems();
  mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(items, null, 2) + "\n");
  console.log(`citations: wrote ${items.length} CSL items → ${relative(REPO_ROOT, OUT_JSON)}`);

  if (process.argv.includes("--pg")) {
    await upsertPg(items);
    console.log(`citations: upserted ${items.length} rows into csl_items`);
  }
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
