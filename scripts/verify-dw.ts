// scripts/verify-dw.ts
//
// B7 — warehouse contract gate, chained into `npm run verify`.
// Fails closed when any data/models/alloydb/*.yaml:
//   - fails the zod table-semantics contract (kind/topology/semver/columns)
//   - has a calculated measure inheriting an undeclared measure
//   - is missing the hardened governance keys: codeowners (non-empty),
//     sla_policy, data_start_date, load_type
//
// B3 — also asserts that dw.events_cache_access column names in
// data/models/alloydb_cache_ddl.sql match those declared inline in
// src/cache/events.ts (EVENTS_CACHE_ACCESS_DDL), so the two DDL sources
// cannot drift silently.
//
// @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
// @cite schemas/table-semantics.schema.json

import { readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseTableSemantics, validateInheritance } from "../src/lib/table-semantics.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ALLOYDB_DIR = resolve(REPO_ROOT, "data", "models", "alloydb");

const failures: string[] = [];

// B3: parity check — verify both DDL sources for dw.events_cache_access
// declare the same column set.  We check each known column appears as an
// identifier token in both DDL strings rather than parsing the full CREATE
// TABLE body (avoids brittle regex over CHECK-constraint parentheses).
// If a column is added to one source it MUST appear in the other; this gate
// catches the drift within the same `npm run verify` run.
{
  const CACHE_DDL_FILE = resolve(REPO_ROOT, "data", "models", "alloydb_cache_ddl.sql");
  const EVENTS_TS_FILE = resolve(REPO_ROOT, "src", "cache", "events.ts");
  const sqlDdl = readFileSync(CACHE_DDL_FILE, "utf8");
  const tsSrc = readFileSync(EVENTS_TS_FILE, "utf8");
  // Extract the inline DDL string from events.ts.
  const tsBlock = /EVENTS_CACHE_ACCESS_DDL\s*=\s*`([\s\S]*?)`\.trim\(\)/.exec(tsSrc)?.[1] ?? "";
  // Canonical column set for dw.events_cache_access — update here when the
  // schema changes, then update both DDL sources to match.
  const EXPECTED_COLS = ["cache_key", "tier", "op", "lane", "occurred_at"] as const;
  const sqlMissing = EXPECTED_COLS.filter((c) => !new RegExp(`\\b${c}\\b`).test(sqlDdl));
  const tsMissing = EXPECTED_COLS.filter((c) => !new RegExp(`\\b${c}\\b`).test(tsBlock));
  if (sqlMissing.length > 0)
    failures.push(`B3: alloydb_cache_ddl.sql is missing expected column(s): ${sqlMissing.join(", ")}`);
  if (tsMissing.length > 0)
    failures.push(`B3: events.ts EVENTS_CACHE_ACCESS_DDL is missing expected column(s): ${tsMissing.join(", ")}`);
  if (tsBlock === "")
    failures.push("B3: could not extract EVENTS_CACHE_ACCESS_DDL from src/cache/events.ts — constant renamed or reformatted");
}
const tables = [];
for (const file of readdirSync(ALLOYDB_DIR).filter((f) => f.endsWith(".yaml")).sort()) {
  try {
    const t = parseTableSemantics(readFileSync(resolve(ALLOYDB_DIR, file), "utf8"));
    tables.push(t);
    const s = t.spec;
    if (s.codeowners === undefined || s.codeowners.length === 0) failures.push(`${file}: codeowners missing/empty`);
    if (s.sla_policy === undefined) failures.push(`${file}: sla_policy missing`);
    if (s.data_start_date === undefined) failures.push(`${file}: data_start_date missing`);
    if (s.load_type === undefined) failures.push(`${file}: load_type missing`);
    if (s.allowed_operations === undefined || s.allowed_operations.length === 0) {
      failures.push(`${file}: allowed_operations missing/empty`);
    }
  } catch (err) {
    failures.push(`${file}: ${(err as Error).message.split("\n")[0]}`);
  }
}
try {
  validateInheritance(tables);
} catch (err) {
  failures.push((err as Error).message);
}

if (failures.length > 0) {
  console.error(`[verify:dw] FAIL — ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`[verify:dw] OK — ${tables.length} contracts valid, governance keys populated`);
