/**
 * Citations:
 *   @cite rubrics/phase-13.md (O5)
 *   @cite vendor/openfeature/openfeature.dev/docs/reference/intro.md
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { getOpenFeatureClient, resetForTests } from "./openfeature.js";

test("InMemoryProvider returns the local default for color-code", async () => {
  resetForTests();
  const client = getOpenFeatureClient();
  const value = await client.getStringValue("color-code", "fallback");
  assert.equal(value, "cyan");
});

test("InMemoryProvider returns the supplied default for an unknown flag", async () => {
  resetForTests();
  const client = getOpenFeatureClient();
  const value = await client.getStringValue("nonexistent-flag", "fallback-value");
  assert.equal(value, "fallback-value");
});

test("getBooleanValue with default true returns true for unknown flag", async () => {
  resetForTests();
  const client = getOpenFeatureClient();
  const value = await client.getBooleanValue("missing-bool", true);
  assert.equal(value, true);
});

test("client is a singleton across calls", () => {
  resetForTests();
  const a = getOpenFeatureClient();
  const b = getOpenFeatureClient();
  assert.strictEqual(a, b);
});

test("OPENFEATURE_<flag> env override wins over local-flags default", async () => {
  resetForTests();
  process.env.OPENFEATURE_color_code = "red";
  try {
    const client = getOpenFeatureClient();
    const value = await client.getStringValue("color-code", "fallback");
    assert.equal(value, "red");
  } finally {
    delete process.env.OPENFEATURE_color_code;
  }
});

test("OPENFEATURE_<flag> override outside allowed values is ignored", async () => {
  resetForTests();
  process.env.OPENFEATURE_color_code = "chartreuse";
  try {
    const client = getOpenFeatureClient();
    const value = await client.getStringValue("color-code", "fallback");
    assert.equal(value, "cyan"); // default preserved; chartreuse not in allowed[]
  } finally {
    delete process.env.OPENFEATURE_color_code;
  }
});
