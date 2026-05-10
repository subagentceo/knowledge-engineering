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
  - `secrets.VOYAGE_API_KEY` (operator action; pending in `docs/phase-gates.md`)
  - Turbopuffer workspace + API token (paid, unprovisioned)

## Criteria

### 1. Batched grading — ⚠️ PARTIAL (prepare done; submit/collect deferred)

- `--batch-prepare` produces a valid Batches API payload (verified by
  reading the JSONL output; each row matches the documented shape).
- `--batch-submit` + `--batch-collect` are stubbed in the rubric and
  documented as Phase 11.B.

### 2. Embeddings (optional, behind a flag) — 🟡 DEFERRED (Phase 11.C)

### 3. Synonym test — 🟡 DEFERRED (depends on C2)
