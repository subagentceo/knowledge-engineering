// scripts/verify-dw.ts
//
// B7 — warehouse contract gate, chained into `npm run verify`.
// Fails closed when any data/models/alloydb/*.yaml:
//   - fails the zod table-semantics contract (kind/topology/semver/columns)
//   - has a calculated measure inheriting an undeclared measure
//   - is missing the hardened governance keys: codeowners (non-empty),
//     sla_policy, data_start_date, load_type
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
