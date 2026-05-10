---
slug: turbopuffer
source: vendor/turbopuffer/turbopuffer.com/docs/
local: vendor/turbopuffer/turbopuffer.com/docs/{architecture,fts,hybrid,auth,namespaces,permissions,byoc,security,regions,warm-cache,limits,recall,quickstart}.md
drives: Phase 11.C (semantic vendor_grep via hybrid FTS + vector); heartbeat dream-memory (Phase 11.D-future)
status: subprocessor under contemplation; not yet provisioned (Voyage AI key gated; Turbopuffer paid + unprovisioned per docs/phase-gates.md)
---

# turbopuffer — extract

Vector + full-text search engine the operator pays for (~$64/mo) but
has not yet used. Phase 11.C lights up `vendor_grep`'s semantic mode
via Turbopuffer; the heartbeat's future "dream sub-routine"
(`seeds/citations/dreams.md`) also lands on Turbopuffer for cross-
session memory recall.

## Header tree (across ingested docs)

- `architecture.md`         — Compute-storage separation; SSD/memory cache; WAL on object storage
- `concepts.md`             — ANN search via SPFresh; attribute indexes; cache hierarchy; filtering
- `auth.md`                 — Bearer-token API key in `Authorization` header
- `permissions.md`          — Row-level RBAC via filterable attributes (`user_id`, `group_ids`)
- `namespaces.md`           — Logical dataset isolation; up to 500M docs / 2TB per namespace
- `fts.md`                  — BM25 full-text search engine built on the same storage engine
- `hybrid.md`               — Vector + BM25 rank fusion + re-rank pipeline
- `byoc.md`                 — Bring Your Own Cloud (K8s on AWS/GCP/Azure); zero customer-data egress
- `security.md`             — SOC 2 Type 2; TLS 1.2+; AES-256 at rest; GDPR/CCPA DPA
- `regions.md`              — 19 regions across AWS + GCP (no Azure regions listed)
- `warm-cache.md`           — `hint_cache_warm` pre-flight; free if already warm
- `limits.md`               — 3.5T+ docs in production; 10M+ writes/s; 25k+ queries/s globally
- `recall.md`               — >90-95% recall@10 with SPFresh ANN

## Plan-relevant pull quotes

> turbopuffer is a multi-tenant service, which means each `./tpuf`
> binary handles requests for multiple tenants. This keeps costs low.
> Enterprise customers can be isolated on request either through
> **single-tenancy clusters, or BYOC**.

> The first query to a namespace reads object storage directly and is
> slow (**p50=343ms for 1M documents**), but subsequent, cached queries
> to that node are faster (**p50=8ms for 1M documents**). Many use-cases
> can send a [pre-flight query to hint that the client will send
> latency-sensitive requests in the near future](/docs/warm-cache).

> turbopuffer's full-text search engine has been written from the ground
> up for the turbopuffer storage engine for low latency searches
> **directly on object storage**.

> turbopuffer supports vector search and BM25 full-text search.
> Combining them produces semantically relevant search results
> (vectors), as well as results matching specific words or strings
> (i.e. product SKUs, email addresses, weighing exact keywords highly).

> All durable state in turbopuffer is stored in object storage.
> Compute nodes are stateless. This means **any node can serve queries
> for any namespace.**

## Why this drives Phase 11.C (semantic `vendor_grep`)

The current `vendor_grep` (Phase 3) is a substring grep over the local
mirror — fast, deterministic, but misses synonyms. Phase 11.C adds
`KE_VENDOR_GREP_EMBEDDINGS=1` semantic mode. Concrete design grounded
in the Turbopuffer docs:

1. **Per-vendor namespace** matches our `vendor/<name>/` layout exactly.
   Use the vendor name as the Turbopuffer namespace name. Each mirror
   doc becomes one document with `{id: relPath, vector, content,
   relPath, url, vendor}` attributes.
2. **Hybrid retrieval, not vector-only.** Per the `hybrid.md` pipeline,
   the right shape for doc lookup is:
   - Vector query (Voyage embedding of the user pattern) → top 50
   - BM25 query (literal pattern from `vendor_grep`'s caller) → top 50
   - Rank fusion → top 20 → return to caller
   This preserves the existing literal-grep semantics while adding
   semantic recall.
3. **Warm-cache before each operator session.** The heartbeat's
   per-tick read of `seeds/memory/heartbeat/last-tick.md` can include
   a single `GET /v1/namespaces/<vendor>/hint_cache_warm` to drop
   first-query latency from 343ms to 8ms.
4. **Region selection.** Pick the region closest to the operator's
   Cloudflare account (likely `gcp-us-east4` or `aws-us-east-1` based
   on the existing CF infrastructure). Track in `vendor/turbopuffer/crawl.json`
   as a new `region` field.
5. **Auth.** Standard Bearer token via `TURBOPUFFER_API_KEY` env var
   (NOT `ANTHROPIC_API_KEY`-shaped; this is a Turbopuffer-issued key,
   stored in `secrets.TURBOPUFFER_API_KEY` after operator action).

## Why this drives the heartbeat dream sub-routine

Per `seeds/citations/dreams.md` + `seeds/citations/memory.md`, the
managed-agents "memory store" + "dreams" pattern lets sessions share
state. Turbopuffer is the operator-side substrate:

- `seeds/memory/heartbeat/` files → upserted as documents into a
  `heartbeat` namespace
- Each tick's `decisions.md` entry → one document with `{tick_iso,
  decision, sha, vector}` 
- Dream sub-routine query: "what did past sessions decide about <X>?"
  → vector search across `heartbeat` namespace → return top-N
  decisions to the new session

This is the explicit Turbopuffer-hypothesis from
`seeds/prompts/operator-2026-05-10-heartbeat.md` made concrete.

## Operator-action surface (already tracked)

- `secrets.VOYAGE_API_KEY` — issue #35 (operator-runbook) — for embeddings
- `secrets.TURBOPUFFER_API_KEY` — **needs a new operator-runbook**
  (paid subscription exists; the dashboard token does not). Track in
  `docs/operator-runbooks/turbopuffer-api-key.md` (TODO; not in this PR).

## Compliance posture

Per `security.md`:
- TLS 1.2+ for transit; AES-256 at rest (object storage AND SSD cache)
- SOC 2 Type 2 audited
- GDPR + CCPA DPA available
- BYOC option keeps data in operator's own AWS/GCP/Azure account with
  zero egress to Turbopuffer (only telemetry/dashboard signals leave)

For our use case (vendor docs are PUBLIC; no PII; no customer data),
the hosted multi-tenant option is appropriate. BYOC is overkill unless
the operator wants to mirror customer data (out of `PRODUCTRD.md` v1
scope per N1).
