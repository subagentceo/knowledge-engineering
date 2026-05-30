// src/agent/corpus-viewer/fleet.test.ts
// @tdd green
//
// Pins the build fleet's model routing + the structured-output boundary.
// Outcome-driven: cites the SDK subagent docs that define the AgentDefinition
// fields the specs set, so doc drift trips citation-guard + freshness.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite seeds/prompts/subagent-verifier.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { BUILD_VERIFIER, FLEET, IOS_BUNDLER, SWIFT_PORTER, specFor } from "./fleet.js";
import { SubagentSpec } from "./primitives.js";
import { buildVerifierGate, OUTPUT_SCHEMAS, parseOutput, type VerifyResult } from "./outputs.js";

test("every fleet member is a valid SubagentSpec", () => {
  for (const s of FLEET) assert.doesNotThrow(() => SubagentSpec.parse(s));
  assert.equal(FLEET.length, 4);
});

test("model routing is deliberate: design work on opus-4-8, mechanical on haiku", () => {
  assert.equal(SWIFT_PORTER.model, "claude-opus-4-8");
  assert.equal(SWIFT_PORTER.thinking, "adaptive");
  assert.equal(IOS_BUNDLER.model, "claude-haiku-4-5-20251001");
  assert.equal(IOS_BUNDLER.thinking, "disabled"); // no thinking burn on rsync work
});

test("the verifier cannot edit the work it grades (read-only + build tools)", () => {
  assert.equal(BUILD_VERIFIER.tools.includes("Edit"), false);
  assert.equal(BUILD_VERIFIER.tools.includes("Write"), false);
  assert.equal(BUILD_VERIFIER.tools.includes("Bash"), true); // it must run swift build / eval
});

test("every subagent declares its beta surfaces (drift is detectable)", () => {
  for (const s of FLEET) {
    assert.ok(s.betas.length >= 1, `${s.name} declares no beta surface`);
    for (const b of s.betas) assert.ok(b.citation.last_fetched.endsWith("Z"));
  }
});

test("budgets are scaled to the work: cheap bundler < design agents", () => {
  assert.ok(IOS_BUNDLER.budget.maxOutputTokens < SWIFT_PORTER.budget.maxOutputTokens);
  assert.ok(BUILD_VERIFIER.budget.maxTurns <= SWIFT_PORTER.budget.maxTurns);
});

test("specFor resolves known and throws on unknown", () => {
  assert.equal(specFor("swift-porter").name, "swift-porter");
  assert.throws(() => specFor("nope"), /unknown subagent/);
});

// ── structured-output boundary ───────────────────────────────────────

test("parseOutput validates a well-formed PortResult and rejects prose", () => {
  const good = parseOutput("PortResult", {
    kind: "PortResult",
    by: "swift-porter",
    usage: { outputTokens: 1200 },
    changedFiles: [{ path: "CorpusScanner.swift", summary: "added CorpusSource enum" }],
    builds: { macOS: true, iOS: true },
  });
  assert.equal(good.kind, "PortResult");
  assert.throws(() => parseOutput("PortResult", { kind: "PortResult", by: "x" }), /usage/);
  assert.throws(() => parseOutput("Nope", {}), /unknown outputSchemaRef/);
});

test("StructuredOutput discriminates on kind", () => {
  assert.ok("PortResult" in OUTPUT_SCHEMAS);
  assert.ok("BundleResult" in OUTPUT_SCHEMAS);
  assert.ok("IndexResult" in OUTPUT_SCHEMAS);
  assert.ok("VerifyResult" in OUTPUT_SCHEMAS);
});

test("buildVerifierGate passes on pass, blocks on fail, warn only when allowed", () => {
  const mk = (verdict: VerifyResult["verdict"]): VerifyResult => ({
    kind: "VerifyResult",
    by: "build-verifier",
    usage: { outputTokens: 1, cacheReadInputTokens: 0, cacheCreationInputTokens: 0 },
    truncated: false,
    verdict,
    rubric: [{ criterion: "swift build", met: verdict !== "fail", evidence: "exit 0" }],
    citations: [],
    notes: "",
  });
  assert.equal(buildVerifierGate(mk("pass")), true);
  assert.equal(buildVerifierGate(mk("fail")), false);
  assert.equal(buildVerifierGate(mk("warn")), false);
  assert.equal(buildVerifierGate(mk("warn"), true), true);
});
