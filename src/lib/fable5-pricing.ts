// fable5-pricing.ts — deterministic cost math for claude-fable-5 sessions.
//
// All arithmetic is integer, in tenth-micro-USD per token (1 USD = 1e7
// tenth-micro-USD), so identical token counts always yield a bit-identical
// cost_usd — no float accumulation drift across machines or runs.
//
// @cite seeds/citations/fable-5-pricing.md
// @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md

export const FABLE_5_MODEL_ID = "claude-fable-5";

// Tenth-micro-USD per token: $10/MTok input → 100; $50/MTok output → 500;
// cache read 0.1× → 10; 5m cache write 1.25× → 125; 1h cache write 2× → 200.
export const RATE_TENTH_MICRO_USD = {
  uncached_input: 100,
  output: 500,
  cache_read: 10,
  cache_write_5m: 125,
  cache_write_1h: 200,
} as const;

const TENTH_MICRO_USD_PER_USD = 10_000_000;

export interface Fable5Usage {
  uncached_input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_5m_input_tokens: number;
  cache_creation_1h_input_tokens: number;
}

export function costTenthMicroUsd(u: Fable5Usage): number {
  return (
    u.uncached_input_tokens * RATE_TENTH_MICRO_USD.uncached_input +
    u.output_tokens * RATE_TENTH_MICRO_USD.output +
    u.cache_read_input_tokens * RATE_TENTH_MICRO_USD.cache_read +
    u.cache_creation_5m_input_tokens * RATE_TENTH_MICRO_USD.cache_write_5m +
    u.cache_creation_1h_input_tokens * RATE_TENTH_MICRO_USD.cache_write_1h
  );
}

export function costUsd(u: Fable5Usage): number {
  return costTenthMicroUsd(u) / TENTH_MICRO_USD_PER_USD;
}

// Fable-5 tokenizes ~30% heavier than Opus-tier; offline estimate is the
// ~4-bytes-per-token heuristic scaled by 13/10, kept integer-exact.
export function estimateFable5Tokens(utf8Bytes: number): number {
  if (utf8Bytes <= 0) return 0;
  return Math.ceil((utf8Bytes * 13) / 40);
}
