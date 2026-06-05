<!-- @cite vendor/cloudflare/developers.cloudflare.com/flagship/index.md -->
<!-- Outcome: 2026-06-05-O13 -->

# Cloudflare AI Free Tier — Capabilities Analysis

Research date: 2026-06-05. Sources: CF API live data + developers.cloudflare.com.

## Workers AI

### Free tier limits

| Metric | Workers Free | Workers Paid |
|---|---|---|
| Neurons/day | **10,000** (hard cap, resets 00:00 UTC) | 10,000 included + $0.011/1,000 additional |
| Credit card required | No | No (for free tier) |
| Model count | 50+ | 50+ |
| API compatibility | OpenAI SDK-compatible via REST | Same |

### What a neuron buys

- ~500-token Llama 3 text response costs 400–600 neurons
- Free tier supports ~15–25 text generation calls/day (Llama 3.3 70B)
- Smaller models (Llama 3.2 3B, Mistral 7B) stretch further — ~100+ calls/day
- Embeddings are cheaper: `@cf/baai/bge-base-en-v1.5` (768-dim) costs ~1–5 neurons per text

### Available models on free tier (selected)

| Model | Context | Capabilities |
|---|---|---|
| `@cf/meta/llama-3.3-70b-instruct-fp8-fast` | 131K | Chat, tools, code, streaming |
| `@cf/meta/llama-4-scout-17b-16e-instruct` | 10M | Chat, tools, streaming |
| `@cf/meta/llama-3.2-11b-vision-instruct` | 131K | Vision, chat |
| `@cf/mistralai/mistral-small-3.1-24b-instruct` | 128K | Chat, tools |
| `@cf/google/gemma-4-26b-a4b-it` | 256K | Chat |
| `@cf/moonshotai/kimi-k2.5` | 256K | Chat |
| `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` | 32K | Reasoning, code |
| `@cf/baai/bge-base-en-v1.5` | — | Embeddings (768-dim) |
| `@cf/stabilityai/stable-diffusion-xl-base-1.0` | — | Image generation |
| `@cf/openai/whisper-large-v3-turbo` | — | Speech-to-text |

Full catalog: `developers.cloudflare.com/workers-ai/models/`

### Invocation pattern (Workers binding)

```typescript
// wrangler.toml: [ai] binding = "AI"
const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
  messages: [{ role: "user", content: "..." }],
  max_tokens: 512,
  stream: true,
});
```

## AI Gateway

### Free tier (Workers Free plan)

| Feature | Workers Free |
|---|---|
| Core features (analytics, caching, rate limiting) | **Free, unlimited** |
| Persistent log storage | 100,000 logs total across all gateways |
| DLP scanning | Free (2 predefined profiles) |
| Guardrails | Billed as Workers AI neurons |
| Logpush | Paid only |

Workers Paid raises log storage to 1,000,000 logs/gateway.

### How to use AI Gateway

AI Gateway adds one URL prefix — zero code change for existing OpenAI-compatible calls:

```
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/
```

Benefits on free tier: request caching (saves neurons), rate limiting, dashboard analytics.

## Vectorize

### Free tier (Workers Free)

| Metric | Workers Free | Workers Paid |
|---|---|---|
| Queried vector dimensions/month | **30 million** | 50M included + $0.01/M |
| Stored vector dimensions | **5 million** | 10M included + $0.05/100M |
| Number of indexes | Unlimited | Unlimited |
| CPU/memory/active hours | Not billed | Not billed |

### Practical capacity (free tier)

- 5M stored dimensions ÷ 768-dim embeddings = ~6,500 vectors
- 5M stored dimensions ÷ 1,536-dim embeddings (OpenAI-compatible) = ~3,260 vectors
- 30M queried dimensions/month with 768-dim index of 6,500 vectors: ~4,600 queries/month

### Billing formula

```
queried_cost = (queried_vectors + stored_vectors) * dimensions * ($0.01 / 1,000,000)
storage_cost = stored_vectors * dimensions * ($0.05 / 100,000,000)
```

## Maximizing the free tier for this project

### Strategy 1: Embedding pipeline (Vectorize + Workers AI)

Use `@cf/baai/bge-base-en-v1.5` (768-dim) for vendor doc embeddings. At 768 dimensions,
the free tier stores ~6,500 chunks. With ~500 tokens/chunk this covers ~3.25M tokens of
vendor docs — enough for all `vendor/` markdown files.

```typescript
const { data } = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
  text: chunkText,
});
await env.VECTORIZE.upsert([{ id: docId, values: data[0] }]);
```

### Strategy 2: AI Gateway caching for repeated vendor doc queries

Route all `env.AI.run()` calls through AI Gateway. Identical prompts (same vendor doc
question asked multiple times) hit the cache and cost zero neurons.

### Strategy 3: Use `llama-3.2-3b-instruct` for classification tasks

3B parameter models cost ~5–10x fewer neurons per call. Reserve 70B for complex synthesis;
use 3B for routing/classification.

### Strategy 4: Neuron budget allocation

| Task | Model | Est. neurons/call | Daily calls on free tier |
|---|---|---|---|
| Chat/synthesis | `llama-3.3-70b-instruct-fp8-fast` | 500 | ~20 |
| Classification/routing | `llama-3.2-3b-instruct` | 50 | ~200 |
| Embeddings | `bge-base-en-v1.5` | 5 | ~2,000 |
| Speech-to-text | `whisper-large-v3-turbo` | 30 | ~333 |

Mixed workload (10% 70B + 30% 3B + 60% embeddings): ~1,000 net neurons → ~10 mixed sessions/day.

### Strategy 5: claude-telemetry D1 worker (already deployed)

The account has `claude-telemetry` worker with D1 binding. Use this to track neuron
consumption per invocation — log to D1 with model ID and neuron estimate to stay under the
10,000/day cap without hitting the API limit.

## Current account status

- AI binding: present on `coworkers-agent` and `sandbox-agent` (both deployed)
- AI Gateway: not yet configured (t8-3 task — dashboard action)
- Vectorize: not yet used in this account's deployed workers

## Paid tier upgrade path

Workers Paid ($5/month) provides:
- Workers AI: $5 compute credit (~450K additional neurons/month beyond free 10K/day)
- AI Gateway: 1M log storage/gateway
- Vectorize: 10M stored dimensions, 50M queried/month
- Workers requests: 10M requests/month included

For this project's scale (38 workers, agent orchestration), Workers Paid is recommended
once neuron consumption exceeds ~300K/month.
