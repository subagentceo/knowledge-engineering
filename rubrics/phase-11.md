---
phase: 11
title: Batched grading + optional embeddings
status: in-progress
sub-phases:
  - 11.A: --batch-prepare + --all (DONE this PR)
  - 11.B: --batch-submit + --batch-collect (DEFERRED; live submission to Anthropic Batches API)
  - 11.C: optional embeddings (DEFERRED; needs Voyage AI key + Turbopuffer)
issue: 15
prs:
  - 30  # this PR
---

# Phase 11 — Batched grading + optional embeddings

Cites:
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/batch-processing.md`
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md`

## Phase 11.A — DONE this PR

- ✅ `scripts/grade-phase.ts --all`: grade every `rubrics/phase-N.md`
  in sequence (still per-criterion `messages.create` calls, but
  one CLI invocation iterates the full backfill).
- ✅ `scripts/grade-phase.ts --batch-prepare`: builds the canonical
  Anthropic Batches API request payload (one per criterion, skipping
  DEFERRED) and writes `/tmp/grade-batch.jsonl`. **Does not submit.**
  Verified shape: each row is `{custom_id, params: {model, max_tokens,
  messages}}` per the cited `batch-processing.md`.

## Phase 11.B — DEFERRED

- 🟡 `--batch-submit`: actually call `anthropic.messages.batches.create()`
  with the prepared payload; persist the batch ID.
- 🟡 `--batch-collect <id>`: poll `batches.retrieve(id)` until done; parse
  `batches.results(id)` JSONL stream; emit per-criterion verdicts.
- 🟡 Cost-reduction assertion: log token totals for live vs batched
  to confirm the cited "≥40% reduction" (the doc says 50% pricing).

Defer rationale: live batch submission consumes operator quota
non-trivially per run; needs a one-time live test before being
committed to CI.

## Phase 11.C — DEFERRED (operator-gated)

- 🟡 Optional embeddings: `vendor_grep` semantic mode behind
  `KE_VENDOR_GREP_EMBEDDINGS=1`. Requires:
  - `secrets.VOYAGE_API_KEY` (operator action; pending in `docs/phase-gates.md`; runbook at `docs/operator-runbooks/voyage-api-key.md`)
  - `secrets.TURBOPUFFER_API_KEY` (operator action; pending; runbook TBD)

### Phase 11.C concrete plan (per `seeds/citations/turbopuffer.md`)

Hybrid retrieval, not vector-only — per
`vendor/turbopuffer/turbopuffer.com/docs/hybrid.md`:

1. **Per-vendor namespace** matching `vendor/<name>/` layout (`anthropics`,
   `cloudflare`, `neon`, `stripe`, `turbopuffer`, etc.).
2. **Document shape**: `{id: relPath, vector: <Voyage 1024-dim>,
   content: <body>, relPath, url, vendor}`.
3. **Query pipeline** per `hybrid.md`:
   - Vector query (Voyage embedding of operator pattern) → top 50
   - BM25 query (literal pattern; preserves Phase 4 substring semantics) → top 50
   - Rank fusion → top 20 → return to caller
4. **Warm-cache pre-flight** via `GET /v1/namespaces/<vendor>/hint_cache_warm`
   (`warm-cache.md`) at heartbeat tick start — drops first-query latency
   from 343ms to 8ms.
5. **Region selection** via `vendor/turbopuffer/crawl.json#region` (new
   field) — recommend `gcp-us-east4` or `aws-us-east-1` to colocate
   with the operator's Cloudflare PoP per `regions.md`.
6. **Auth** via `secrets.TURBOPUFFER_API_KEY` (Bearer token in
   `Authorization` header per `auth.md`).
7. **No customer data** — vendor mirror bodies are PUBLIC docs; hosted
   multi-tenant Turbopuffer is appropriate. BYOC (`byoc.md`) is overkill
   for our scope per `SUBPROCESSORS.md`.

## Criteria

### 1. Batched grading — ⚠️ PARTIAL (prepare done; submit/collect deferred)

- `--batch-prepare` produces a valid Batches API payload (verified by
  reading the JSONL output; each row matches the documented shape).
- `--batch-submit` + `--batch-collect` are stubbed in the rubric and
  documented as Phase 11.B.

### 2. Embeddings (optional, behind a flag) — 🟡 DEFERRED (Phase 11.C)

### 3. Synonym test — 🟡 DEFERRED (depends on C2)
