// Citations:
//   @cite rubrics/phase-13.md (O6)

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { ALLOWED_COLORS, coerceColor, colorize, isColor } from "./ansi-color.js";

test("ALLOWED_COLORS has exactly 8 entries", () => {
  assert.equal(ALLOWED_COLORS.length, 8);
});

test("isColor accepts each of the 8 allowed values", () => {
  for (const c of ALLOWED_COLORS) {
    assert.equal(isColor(c), true, `expected ${c} to be allowed`);
  }
});

test("isColor rejects values outside the allowed list", () => {
  assert.equal(isColor("chartreuse"), false);
  assert.equal(isColor(""), false);
  assert.equal(isColor("RED"), false); // case-sensitive
});

test("coerceColor returns the supplied color when valid", () => {
  for (const c of ALLOWED_COLORS) {
    assert.equal(coerceColor(c), c);
  }
});

test("coerceColor falls back to cyan for invalid values", () => {
  assert.equal(coerceColor("chartreuse"), "cyan");
  assert.equal(coerceColor(""), "cyan");
  assert.equal(coerceColor(undefined), "cyan");
});

test("colorize wraps text in 256-color ANSI prefix when isTty=true", () => {
  const out = colorize("red", "hi", true);
  assert.equal(out, "[38;5;196mhi[0m");
});

test("colorize wraps text in cyan ANSI prefix", () => {
  const out = colorize("cyan", "[x]", true);
  assert.equal(out, "[38;5;51m[x][0m");
});

test("colorize returns plain text when isTty=false", () => {
  for (const c of ALLOWED_COLORS) {
    assert.equal(colorize(c, "icon", false), "icon");
  }
});

test("each of 8 colors yields a unique ANSI prefix", () => {
  const seen = new Set<string>();
  for (const c of ALLOWED_COLORS) {
    const out = colorize(c, "x", true);
    assert.equal(seen.has(out), false, `duplicate ANSI for color=${c}`);
    seen.add(out);
  }
  assert.equal(seen.size, 8);
});
