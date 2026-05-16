---
name: turbopuffer-embeddings
description: >
  Embed text via Voyage AI (Anthropic's publicly recommended embeddings
  provider), upsert vectors to a Turbopuffer namespace, and mirror
  id+content+metadata to AlloyDB Omni for relational lookups. One
  bridge, three stores, idempotent upserts.
disable-model-invocation: false
---

# When to invoke

- Indexing a new document corpus that needs vector search
- Backfilling vectors into Turbopuffer after a content refresh
- Adding metadata that needs to JOIN against other Postgres tables

# Architecture

```
text content
    │
    ▼
Voyage AI /v1/embeddings   ← Anthropic publicly recommends Voyage
    │                        (vendor/anthropics/.../embeddings.md)
    ▼
{ id, vector, attributes } ─► Turbopuffer namespace ─► vector search
    │
    └► AlloyDB embeddings_mirror ─► relational JOINs, jsonb filters
```

**Default model**: `voyage-3.5-lite` (cost-optimized, 1024-dim).
Switch via `model:` option:
- `voyage-code-3` — code retrieval
- `voyage-4-large` — highest quality general purpose
- `voyage-context-3` — long-context

# Usage

```ts
import { createVoyageClient } from "../../../../src/lib/voyage-client.js";
import { createBridge } from "../../../../src/lib/turbopuffer-alloydb-bridge.js";

const voyage = createVoyageClient({ apiKey: process.env.VOYAGE_API_KEY! });
const bridge = createBridge({
  voyage,
  turbopuffer: yourTurbopufferNamespace,
  alloydb: yourPgPool,
  namespace: "engineering-blog",
});

await bridge.upsert([
  { id: "post-1", content: "…full body…", metadata: { author: "Alex" } },
  { id: "post-2", content: "…", metadata: { author: "Alex" } },
]);
```

# Guarantees

- **Batched embedding**: 1 Voyage API call per `upsert([...])` regardless of batch size
- **Idempotent**: `ON CONFLICT (id) DO UPDATE` on AlloyDB; Turbopuffer upsert is idempotent by spec
- **OAuth-only posture**: constructor throws if `ANTHROPIC_API_KEY` is set — this bridge never calls Anthropic, so the key has no business being present
- **No partial writes**: if Voyage fails, neither store is touched; if Turbopuffer fails, AlloyDB is not touched

# Schema

See the [`install-alloydb`](../install-alloydb/SKILL.md) skill for the
`CREATE TABLE embeddings_mirror` migration.

# Environment

| Variable | Source | Purpose |
|---|---|---|
| `VOYAGE_API_KEY` | https://dash.voyageai.com/ | Voyage auth (free tier 50M tokens) |
| `TURBOPUFFER_API_KEY_WRITE` | https://turbopuffer.com/dashboard | Turbopuffer auth (operator pays $64/mo) |
| `ALLOYDB_OMNI_PASSWORD` | Cloud-env UI | AlloyDB superuser (see install-alloydb skill) |
| `ANTHROPIC_API_KEY` | **MUST NOT BE SET** | OAuth-only invariant |

# Citations

- [`src/lib/voyage-client.ts`](../../../../src/lib/voyage-client.ts) — minimal Voyage client
- [`src/lib/turbopuffer-alloydb-bridge.ts`](../../../../src/lib/turbopuffer-alloydb-bridge.ts) — the bridge module
- [`vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md`](../../../../vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md) — Anthropic publicly recommends Voyage
- [`vendor/turbopuffer/turbopuffer.com/docs/performance.md`](../../../../vendor/turbopuffer/turbopuffer.com/docs/performance.md) — Turbopuffer names Voyage as reference provider
- [`vendor/turbopuffer/turbopuffer.com/docs/namespaces.md`](../../../../vendor/turbopuffer/turbopuffer.com/docs/namespaces.md) — namespace semantics
- [`vendor/turbopuffer/turbopuffer.com/docs/metadata.md`](../../../../vendor/turbopuffer/turbopuffer.com/docs/metadata.md) — attribute filters
