// src/agent/knowledge-agent/schemas.test.ts
// @tdd green
//
// Pins the Zod schemas + the schema→JSON-Schema (outputFormat) mapping.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  KnowledgeAnswer,
  KnowledgeOutput,
  PackageReport,
  VerifyVerdict,
  schemaFor,
  toOutputFormat,
} from "./schemas.js";

test("KnowledgeAnswer requires at least one cited claim", () => {
  assert.throws(() =>
    KnowledgeAnswer.parse({ kind: "KnowledgeAnswer", answer: "x", claims: [], confidence: "high" }),
  );
  const ok = KnowledgeAnswer.parse({
    kind: "KnowledgeAnswer",
    answer: "Structured outputs validate the reply.",
    claims: [{ statement: "outputFormat forces a schema", citation: { source: "vendor/x.md", last_fetched: "2026-05-30" } }],
    confidence: "high",
  });
  assert.equal(ok.openQuestions.length, 0); // defaulted
});

test("PackageReport requires a recommendation + citations", () => {
  assert.throws(() =>
    PackageReport.parse({ kind: "PackageReport", packageName: "p", latestVersion: "1.0.0", recommendation: { useIt: true, rationale: "ok" }, citations: [] }),
  );
});

test("schemaFor resolves by name and throws on unknown", () => {
  assert.equal(schemaFor("KnowledgeAnswer"), KnowledgeAnswer);
  assert.equal(schemaFor("VerifyVerdict"), VerifyVerdict);
  assert.throws(() => schemaFor("Nope"), /unknown schema/);
});

test("toOutputFormat emits the SDK json_schema shape with a real schema", () => {
  const of = toOutputFormat(KnowledgeAnswer);
  assert.equal(of.type, "json_schema");
  assert.equal(typeof of.schema, "object");
  // The mapped JSON Schema must describe an object with the model-owned fields.
  const props = (of.schema as { properties?: Record<string, unknown> }).properties ?? {};
  assert.ok("answer" in props);
  assert.ok("claims" in props);
  assert.ok("confidence" in props);
});

test("KnowledgeOutput discriminates on kind", () => {
  const v = KnowledgeOutput.parse({
    kind: "VerifyVerdict",
    verdict: "pass",
    rubric: [{ criterion: "cited", met: true, evidence: "all claims have sources" }],
  });
  assert.equal(v.kind, "VerifyVerdict");
});
