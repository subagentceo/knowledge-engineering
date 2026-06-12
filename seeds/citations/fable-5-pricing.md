# Citation extract — Claude Fable 5 pricing & tokenizer

Source: https://platform.claude.com/docs/en/about-claude/models/overview#claude-fable-5-and-claude-mythos-5
Extracted: 2026-06-11 (session pr branch claude/gracious-shannon-bz4gqn)

## Model

| Field | Value |
| :--- | :--- |
| Model ID | `claude-fable-5` |
| Context window | 1M tokens (default = maximum) |
| Max output | 128K tokens |

## Pricing (USD per million tokens, standard tier)

| Lane | $/MTok | µUSD/token |
| :--- | ---: | ---: |
| Uncached input | $10.00 | 10.0 |
| Output | $50.00 | 50.0 |
| Cache read (0.1× input) | $1.00 | 1.0 |
| Cache write, 5-minute TTL (1.25× input) | $12.50 | 12.5 |
| Cache write, 1-hour TTL (2× input) | $20.00 | 20.0 |

## Tokenizer

Claude Fable 5 uses a new tokenizer: the same content tokenizes to roughly
**30% more tokens** than on Opus-tier models. Token counts measured on other
models do not transfer; re-baseline with `count_tokens` passing
`model: "claude-fable-5"`. For offline deterministic estimation this repo uses
`ceil(utf8_bytes / 4 * 1.3)` = `ceil(utf8_bytes * 13 / 40)` — the standard
~4-bytes-per-token heuristic scaled by the Fable-5 +30% factor.

## Determinism note

All cost math in `src/lib/fable5-pricing.ts` is integer arithmetic in
tenth-micro-USD per token (input=100, output=500, cache_read=10,
cache_write_5m=125, cache_write_1h=200), so the same token counts always
produce the bit-identical `cost_usd`.
