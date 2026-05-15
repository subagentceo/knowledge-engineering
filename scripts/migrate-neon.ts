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

import { close, exec, neonEnabled, warmConnection } from "./lib/neon-client.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = resolve(__dirname, "..", "migrations");

async function main(): Promise<void> {
  if (!neonEnabled()) {
    console.error("::error title=migrate-neon::NEON_DATABASE_URL is not set; nothing to do");
    process.exit(1);
  }
  if (!existsSync(MIGRATIONS_DIR)) {
    console.error(`::error title=migrate-neon::migrations dir not found: ${MIGRATIONS_DIR}`);
    process.exit(1);
  }
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  console.log(`[migrate-neon] applying ${files.length} migration(s)`);

  // Absorb the create-branch → compute-ready race. The Neon API can
  // return before the per-PR branch's WebSocket endpoint is accepting
  // connections, surfacing as "All attempts to open a WebSocket to
  // connect to the database failed" on the first query.
  console.log(`[migrate-neon] warming connection (retry up to 5x with exponential backoff)`);
  await warmConnection();
  console.log(`[migrate-neon] connection live`);
  for (const f of files) {
    const path = resolve(MIGRATIONS_DIR, f);
    const sql = readFileSync(path, "utf8");
    console.log(`[migrate-neon] → ${f} (${sql.length} bytes)`);
    try {
      await exec(sql);
      console.log(`[migrate-neon] ✓ applied ${f}`);
    } catch (sqlErr) {
      const e = sqlErr as { code?: string; severity?: string; position?: string; message?: string; name?: string };
      const summary = `${e.name ?? "Error"} applying ${f}: ${e.message ?? String(sqlErr)}`;
      const detail = [
        e.code ? `code=${e.code}` : null,
        e.severity ? `severity=${e.severity}` : null,
        e.position ? `position=${e.position}` : null,
      ].filter(Boolean).join(" ");
      console.error(`::error title=migrate-neon SQL failure::${summary}${detail ? ` (${detail})` : ""}`);
      throw sqlErr;
    }
  }
  await close();
  console.log("[migrate-neon] done");
}

main().catch((err) => {
  const e = err as { name?: string; message?: string; code?: string; stack?: string };
  const summary = `${e.name ?? "Error"}: ${e.message ?? String(err)}`;
  console.error(`::error title=migrate-neon FAILED::${summary}${e.code ? ` (code=${e.code})` : ""}`);
  if (e.stack) {
    // Keep stack on stdout too, in case it's needed for deeper triage.
    console.error("[migrate-neon] stack:", e.stack);
  }
  process.exit(1);
});
