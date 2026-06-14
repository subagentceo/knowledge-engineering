/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  MEASURE_TYPES,
  SEMVER_RE,
  parseTableSemantics,
  validateInheritance,
} from "./table-semantics.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOYDB_DIR = resolve(REPO_ROOT, "data", "models", "alloydb");

// ── the shipped contracts parse and cross-validate (O6/O7 green path) ────────
const tables = readdirSync(ALLOYDB_DIR)
  .filter((f) => f.endsWith(".yaml"))
  .map((f) => parseTableSemantics(readFileSync(resolve(ALLOYDB_DIR, f), "utf8")));

// Deliberate friction: adding a contract means adding its name here, so
// new tables get reviewed. A name list fails with WHICH table drifted,
// where the old bare count only said "10 !== 11".
const EXPECTED_TABLES = [
  "dim_cache_key",
  "dim_ecosystem_artifact",
  "dim_memory",
  "dim_research_doc",
  "dim_vendor",
  "events_cache_access",
  "events_cache_promotion",
  "events_memory_access",
  "fact_cache_hits",
  "fact_doc_ingest",
  "fact_memory_access",
  "fact_vendor_crawl",
  "rpt_citations_by_team",
  "rpt_citations_by_year",
  "rpt_vendor_freshness",
];
assert.deepEqual(tables.map((t) => t.metadata.name).sort(), EXPECTED_TABLES);
validateInheritance(tables);

const byName = new Map(tables.map((t) => [t.metadata.name, t]));
const fact = byName.get("fact_doc_ingest");
assert.ok(fact?.table_kind === "fact" && fact.grain.includes("per ingest run"));
const dim = byName.get("dim_research_doc");
assert.ok(dim?.table_kind === "dim" && dim.scd_type === 2);
const rpt = byName.get("rpt_citations_by_year");
assert.ok(rpt?.table_kind === "rpt" && rpt.aggregates === "fact_doc_ingest");

// every column is exactly one of the three kinds; measures carry measure_type
for (const t of tables) {
  assert.ok(SEMVER_RE.test(t.spec.version));
  for (const c of t.spec.columns) {
    assert.ok(["dimension", "time_dimension", "measure"].includes(c.kind));
    if (c.kind === "measure") {
      assert.ok((MEASURE_TYPES as readonly string[]).includes(c.measure_type));
    }
  }
}

// ── fail-closed paths ─────────────────────────────────────────────────────────
const minimal = (over: string) => `
apiVersion: anthropic.com/v1
kind: AlloyDbTableSemantics
${over}
metadata: { name: fact_x }
spec:
  version: 1.0.0
  description: x
  columns:
    - { name: n, kind: measure, measure_type: count, sql_type: bigint, description: x }
`;

// fact without grain
assert.throws(() => parseTableSemantics(minimal("table_kind: fact")));
// dim with invalid scd_type
assert.throws(() =>
  parseTableSemantics(minimal("table_kind: dim\nscd_type: 5").replace("fact_x", "dim_x")),
);
// name/prefix topology mismatch
assert.throws(() => parseTableSemantics(minimal("table_kind: rpt\naggregates: fact_y")));
// bad semver
assert.throws(() =>
  parseTableSemantics(minimal("table_kind: fact\ngrain: g").replace("1.0.0", "1.0")),
);
// measure_type outside the enum
assert.throws(() =>
  parseTableSemantics(minimal("table_kind: fact\ngrain: g").replace("count", "median")),
);
// calculated measure inheriting an unknown field
const dangling = parseTableSemantics(
  minimal("table_kind: fact\ngrain: g").replace(
    "description: x }",
    `description: x,
        calculation: { expression: e, inherits: [fact_other.gone], result_type: numeric } }`,
  ),
);
assert.throws(() => validateInheritance([dangling]));

console.log("table-semantics.test.ts OK");
