/**
 * @cite seeds/citations/boris-cherny-ai-ascent-2026.md
 * @cite seeds/posture/session-start.xml
 * @tdd green
 *
 * Phase A / O-A2 — typed XML loader for seeds/posture/session-start.xml v3.
 * Returns { borisPrimitives, borisDirectives, sdkPrimitives, ... }.
 *
 * Pure-TS reader, no xml2js — the file is hand-edited and well-formed by
 * contract, and a tight regex is sufficient.
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  loadPosture,
  type BorisPrimitive,
  type BorisDirective,
  type PostureNode,
} from "./posture.js";

test("loadPosture parses v3 posture XML without error", () => {
  const p = loadPosture();
  assert.equal(p.version, "3");
  assert.ok(p.date.length > 0);
});

test("loadPosture returns 11 Boris primitives (P1..P11)", () => {
  const p = loadPosture();
  assert.equal(p.borisPrimitives.length, 11);
  const ids = p.borisPrimitives.map((b) => b.id).sort();
  assert.deepEqual(
    ids,
    ["P1", "P10", "P11", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
  );
});

test("loadPosture returns 11 Boris directives (D1..D11)", () => {
  const p = loadPosture();
  assert.equal(p.borisDirectives.length, 11);
  const ids = p.borisDirectives.map((b) => b.id).sort();
  assert.deepEqual(
    ids,
    ["D1", "D10", "D11", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
  );
});

test("every Boris primitive has at least one cite (ch + ts)", () => {
  const p = loadPosture();
  for (const prim of p.borisPrimitives) {
    assert.ok(prim.cites.length >= 1, `${prim.id} has no cites`);
    for (const c of prim.cites) {
      assert.match(c.chapter, /^\d+$/, `${prim.id} cite ch is not numeric`);
      assert.match(c.ts, /^\d+:\d{2}-\d+:\d{2}$/, `${prim.id} cite ts shape: ${c.ts}`);
    }
  }
});

test("every Boris directive has applies and at least one cite", () => {
  const p = loadPosture();
  for (const d of p.borisDirectives) {
    assert.ok(d.applies.length >= 1, `${d.id} has no applies`);
    assert.ok(d.cites.length >= 1, `${d.id} has no cites`);
    for (const ref of d.applies) {
      assert.match(ref, /^P[0-9]+$/, `${d.id} applies has invalid primitive ref: ${ref}`);
    }
  }
});

test("PostureNode discriminant: primitives have kind='primitive'", () => {
  const p = loadPosture();
  const nodes: PostureNode[] = [...p.borisPrimitives, ...p.borisDirectives];
  const primCount = nodes.filter((n) => n.kind === "primitive").length;
  const dirCount = nodes.filter((n) => n.kind === "directive").length;
  assert.equal(primCount, 11);
  assert.equal(dirCount, 11);
});

test("primitive lookup by id works", () => {
  const p = loadPosture();
  const P3 = p.borisPrimitives.find((x) => x.id === "P3");
  assert.ok(P3, "P3 not found");
  assert.equal(P3.name, "loops-over-one-shots");
  assert.ok(P3.cites.length >= 2, "P3 expected 2 cites");
});

test("typed inheritance: BorisPrimitive extends PostureNode", () => {
  const p = loadPosture();
  // PostureNode union narrows correctly via `kind` discriminant
  for (const node of p.borisPrimitives) {
    if (node.kind === "primitive") {
      const _p: BorisPrimitive = node;
      assert.equal(_p.kind, "primitive");
    }
  }
  for (const node of p.borisDirectives) {
    if (node.kind === "directive") {
      const _d: BorisDirective = node;
      assert.equal(_d.kind, "directive");
      assert.ok(Array.isArray(_d.applies));
    }
  }
});
