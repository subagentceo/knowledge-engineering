/**
 * @tdd green
 * @cite seeds/citations/fable-5-pricing.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  FABLE_5_MODEL_ID,
  RATE_TENTH_MICRO_USD,
  costTenthMicroUsd,
  costUsd,
  estimateFable5Tokens,
  type Fable5Usage,
} from "./fable5-pricing.js";

const ZERO: Fable5Usage = {
  uncached_input_tokens: 0,
  output_tokens: 0,
  cache_read_input_tokens: 0,
  cache_creation_5m_input_tokens: 0,
  cache_creation_1h_input_tokens: 0,
};

test("model id is the exact published string", () => {
  assert.equal(FABLE_5_MODEL_ID, "claude-fable-5");
});

test("published per-MTok prices map exactly to integer rates", () => {
  // $10/MTok input, $50/MTok output, 0.1× read, 1.25× 5m write, 2× 1h write
  assert.equal(RATE_TENTH_MICRO_USD.uncached_input, 100);
  assert.equal(RATE_TENTH_MICRO_USD.output, 500);
  assert.equal(RATE_TENTH_MICRO_USD.cache_read, 10);
  assert.equal(RATE_TENTH_MICRO_USD.cache_write_5m, 125);
  assert.equal(RATE_TENTH_MICRO_USD.cache_write_1h, 200);
});

test("one MTok of each lane costs the published dollar figure", () => {
  const MTOK = 1_000_000;
  assert.equal(costUsd({ ...ZERO, uncached_input_tokens: MTOK }), 10);
  assert.equal(costUsd({ ...ZERO, output_tokens: MTOK }), 50);
  assert.equal(costUsd({ ...ZERO, cache_read_input_tokens: MTOK }), 1);
  assert.equal(costUsd({ ...ZERO, cache_creation_5m_input_tokens: MTOK }), 12.5);
  assert.equal(costUsd({ ...ZERO, cache_creation_1h_input_tokens: MTOK }), 20);
});

test("cost is deterministic: identical usage gives bit-identical results", () => {
  const usage: Fable5Usage = {
    uncached_input_tokens: 123_457,
    output_tokens: 89_321,
    cache_read_input_tokens: 1_204_553,
    cache_creation_5m_input_tokens: 44_021,
    cache_creation_1h_input_tokens: 7,
  };
  const a = costTenthMicroUsd(usage);
  const b = costTenthMicroUsd({ ...usage });
  assert.equal(a, b);
  assert.ok(Number.isInteger(a));
  assert.equal(costUsd(usage), a / 10_000_000);
});

test("token estimate applies the +30% Fable-5 tokenizer factor", () => {
  assert.equal(estimateFable5Tokens(0), 0);
  assert.equal(estimateFable5Tokens(-5), 0);
  // 40 bytes → 10 tokens at 4 bytes/token → 13 after the 1.3× factor
  assert.equal(estimateFable5Tokens(40), 13);
  // ceiling: 41 bytes → ceil(41*13/40) = ceil(13.325) = 14
  assert.equal(estimateFable5Tokens(41), 14);
});
