// Citations:
//   @cite rubrics/phase-13.md (O7)
//   @cite ../../data/models/alloydb/fact_doc_ingest.yaml

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { columnBadge, topologyNote, type SemanticTable, type SemanticColumn } from "../src/warehouse.js";

const fact: SemanticTable = {
  table_kind: "fact",
  grain: "one row per doc per ingest run",
  metadata: { name: "fact_doc_ingest" },
  spec: { version: "1.0.0", description: "d", columns: [] },
};

test("topologyNote states fact grain, dim SCD type, rpt aggregation source", () => {
  assert.equal(topologyNote(fact), "grain: one row per doc per ingest run");
  assert.equal(
    topologyNote({ ...fact, table_kind: "dim", scd_type: 2 }),
    "SCD Type 2",
  );
  assert.equal(
    topologyNote({ ...fact, table_kind: "rpt", aggregates: "fact_doc_ingest" }),
    "aggregates fact_doc_ingest",
  );
});

test("columnBadge distinguishes plain vs calculated measures", () => {
  const dim: SemanticColumn = { name: "csl_id", kind: "dimension", sql_type: "text", description: "d" };
  assert.equal(columnBadge(dim), "dimension");
  assert.equal(
    columnBadge({ ...dim, kind: "measure", measure_type: "sum" }),
    "measure · sum",
  );
  assert.equal(
    columnBadge({
      ...dim,
      kind: "measure",
      measure_type: "ratio",
      calculation: { expression: "e", inherits: ["fact_doc_ingest.fields_extracted"], result_type: "numeric" },
    }),
    "measure · ratio · calculated",
  );
});
