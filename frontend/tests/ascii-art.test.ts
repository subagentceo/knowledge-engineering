// Citations:
//   @cite seeds/citations/pretext.md
//   @cite rubrics/phase-13.md (O7)

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { __test } from "../src/ascii-art.js";

const opts = { cols: 20, rows: 10, particleCount: 3, attractorRadius: 4 };

test("LUMA ramp covers the full brightness range", () => {
  assert.equal(__test.LUMA[0], " ");
  assert.equal(__test.LUMA[__test.LUMA.length - 1], "@");
  assert.equal(__test.LUMA.length, 11);
});

test("seedParticles returns the requested particle count", () => {
  const ps = __test.seedParticles(opts);
  assert.equal(ps.length, 3);
  for (const p of ps) {
    assert.ok(p.x >= 0 && p.x < opts.cols);
    assert.ok(p.y >= 0 && p.y < opts.rows);
  }
});

test("step keeps particles inside the bounds (after wrapping)", () => {
  const ps = __test.seedParticles(opts);
  for (let i = 0; i < 30; i++) __test.step(ps, opts);
  for (const p of ps) {
    assert.ok(p.x >= 0 && p.x < opts.cols, `x=${p.x}`);
    assert.ok(p.y >= 0 && p.y < opts.rows, `y=${p.y}`);
  }
});

test("rasterize accumulates non-zero brightness around particles", () => {
  const ps = [{ x: 5, y: 5, vx: 0, vy: 0 }];
  const buf = new Float32Array(opts.cols * opts.rows);
  __test.rasterize(ps, buf, opts);
  // The center cell should have the maximum brightness (1.0).
  assert.equal(buf[5 * opts.cols + 5], 1);
  // A cell at distance 4 (= attractorRadius) should have 0 contribution.
  assert.equal(buf[(5 + 4) * opts.cols + 5], 0);
});

test("render emits opts.rows lines, each opts.cols wide", () => {
  const buf = new Float32Array(opts.cols * opts.rows);
  buf[0] = 1;
  const out = __test.render(buf, opts);
  const lines = out.split("\n");
  assert.equal(lines.length, opts.rows);
  for (const line of lines) assert.equal(line.length, opts.cols);
});

test("render maps zero brightness to space, max to '@'", () => {
  const buf = new Float32Array(opts.cols * opts.rows);
  buf[0] = 1;
  const out = __test.render(buf, opts);
  const firstLine = out.split("\n")[0];
  assert.ok(firstLine !== undefined);
  assert.equal(firstLine[0], "@");
  // The rest is normalized (0 / 1 = 0), so spaces.
  assert.equal(firstLine[1], " ");
});
