/**
 * AlloyDB table-semantics contract — Kimball topology + semver'd YAML.
 *
 * One YAML document per warehouse table (data/models/alloydb/*.yaml).
 * Strict by design: agents performing data-engineering tasks read these
 * semantics to decide which operations are allowed, so the contract
 * fails closed on anything outside the closed vocabularies.
 *
 * Table kinds (Kimball naming topology):
 *   fact_  — transactional data; `grain` is mandatory and states row granularity
 *   dim_   — dimensional data; `scd_type` ∈ {0, 1, 2, 3, 4}
 *   rpt_   — reporting tables with predefined aggregations over a fact table
 *
 * Column kinds: every column is exactly one of dimension | time_dimension |
 * measure. Measures carry `measure_type` from MEASURE_TYPES. Calculated
 * measures additionally carry a typed `calculation` whose `inherits` lists
 * the source measure columns (inheritance of fields being calculated) —
 * each must resolve to a declared measure on the named table.
 *
 * `version` is semver: MAJOR = breaking downstream change (column removed /
 * retyped / grain changed), MINOR = additive column, PATCH = docs/defaults.
 *
 * Reserved for future use (accepted, optional): codeowners, sla_policy,
 * data_start_date, load_type.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite data/models/model-registry.yaml (house YAML style)
 */

import { z } from "zod";
import { parse as parseYaml } from "yaml";

export const SEMVER_RE = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export const MEASURE_TYPES = [
  "count",
  "sum",
  "min",
  "max",
  "avg",
  "distinct_count",
  "ratio",
  "percentile",
] as const;

export const SCD_TYPES = [0, 1, 2, 3, 4] as const;

export const Calculation = z.object({
  expression: z.string().min(1),
  // measure columns this calculation is derived from: "<table>.<column>"
  inherits: z.array(z.string().regex(/^(fact|dim|rpt)_[a-z0-9_]+\.[a-z0-9_]+$/)).min(1),
  result_type: z.enum(["bigint", "numeric", "double precision"]),
});

const ColumnBase = z.object({
  name: z.string().regex(/^[a-z][a-z0-9_]*$/),
  sql_type: z.string().min(1),
  description: z.string().min(1),
});

export const Column = z.discriminatedUnion("kind", [
  ColumnBase.extend({ kind: z.literal("dimension") }),
  ColumnBase.extend({ kind: z.literal("time_dimension") }),
  ColumnBase.extend({
    kind: z.literal("measure"),
    measure_type: z.enum(MEASURE_TYPES),
    calculation: Calculation.optional(),
  }),
]);

export type Column = z.infer<typeof Column>;

const TableBase = z.object({
  apiVersion: z.literal("anthropic.com/v1"),
  kind: z.literal("AlloyDbTableSemantics"),
  metadata: z.object({
    name: z.string(),
    labels: z.record(z.string(), z.string()).optional(),
  }),
  spec: z.object({
    version: z.string().regex(SEMVER_RE),
    schema: z.string().default("dw"),
    description: z.string().min(1),
    columns: z.array(Column).min(1),
    // reserved future keys — accepted now so adding values later is non-breaking
    codeowners: z.array(z.string()).optional(),
    sla_policy: z.string().optional(),
    data_start_date: z.string().optional(),
    load_type: z.enum(["full", "incremental", "append_only"]).optional(),
  }),
});

export const TableSemantics = z.discriminatedUnion("table_kind", [
  TableBase.extend({
    table_kind: z.literal("fact"),
    grain: z.string().min(1), // data-granularity clarity is mandatory on facts
  }),
  TableBase.extend({
    table_kind: z.literal("dim"),
    scd_type: z.union([
      z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4),
    ]),
  }),
  TableBase.extend({
    table_kind: z.literal("rpt"),
    aggregates: z.string().min(1), // which fact table the aggregation is over
  }),
]);

export type TableSemantics = z.infer<typeof TableSemantics>;

/** name prefix must agree with table_kind — fact_/dim_/rpt_ topology. */
export function parseTableSemantics(yamlText: string): TableSemantics {
  const doc = TableSemantics.parse(parseYaml(yamlText));
  if (!doc.metadata.name.startsWith(`${doc.table_kind}_`)) {
    throw new Error(
      `table-semantics: ${doc.metadata.name} must carry the ${doc.table_kind}_ prefix`,
    );
  }
  return doc;
}

/**
 * Cross-table check: every calculated measure's `inherits` entries resolve
 * to a declared (non-calculated) measure column in the given set of tables.
 */
export function validateInheritance(tables: TableSemantics[]): void {
  const measures = new Set<string>();
  for (const t of tables) {
    for (const c of t.spec.columns) {
      if (c.kind === "measure" && c.calculation === undefined) {
        measures.add(`${t.metadata.name}.${c.name}`);
      }
    }
  }
  for (const t of tables) {
    for (const c of t.spec.columns) {
      if (c.kind !== "measure" || c.calculation === undefined) continue;
      for (const ref of c.calculation.inherits) {
        if (!measures.has(ref)) {
          throw new Error(
            `table-semantics: ${t.metadata.name}.${c.name} inherits unknown measure ${ref}`,
          );
        }
      }
    }
  }
}
