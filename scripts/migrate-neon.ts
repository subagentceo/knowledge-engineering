#!/usr/bin/env tsx
/**
 * scripts/migrate-neon.ts
 *
 * Phase 13.B+ (O8). Applies the SQL files in migrations/ in lexical
 * order to the Neon database identified by NEON_DATABASE_URL.
 *
 * Idempotent: each migration uses IF NOT EXISTS guards so re-running
 * against an existing branch is safe. Per-PR branches are ephemeral —
 * the .github/workflows/neon-branch.yml workflow runs this on every
 * branch creation.
 *
 * Citations:
 *   @cite vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
 *   @cite migrations/README.md
 *   @cite rubrics/phase-13.md (O8)
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { close, exec, neonEnabled } from "./lib/neon-client.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = resolve(__dirname, "..", "migrations");

async function main(): Promise<void> {
  if (!neonEnabled()) {
    console.error("[migrate-neon] NEON_DATABASE_URL is not set; nothing to do");
    process.exit(1);
  }
  if (!existsSync(MIGRATIONS_DIR)) {
    console.error(`[migrate-neon] migrations dir not found: ${MIGRATIONS_DIR}`);
    process.exit(1);
  }
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  console.log(`[migrate-neon] applying ${files.length} migration(s)`);
  for (const f of files) {
    const path = resolve(MIGRATIONS_DIR, f);
    const sql = readFileSync(path, "utf8");
    console.log(`[migrate-neon] → ${f}`);
    await exec(sql);
  }
  await close();
  console.log("[migrate-neon] done");
}

main().catch((err) => {
  console.error("[migrate-neon] FAILED:", err);
  process.exit(1);
});
