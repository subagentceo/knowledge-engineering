---
phase: 11
title: Batched grading + optional embeddings
status: stub
---

# Phase 11 — Batched grading + optional embeddings

Cites `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/batch-processing.md`
and `.../embeddings.md`.

## Criteria

### 1. Batched grading

- `scripts/grade-phase.ts` collects all prose-only criteria across all
  rubrics into one Messages Batches API submission.
- Logged token cost is ≥40% lower than the Phase 9 single-shot baseline.

### 2. Embeddings (optional, behind a flag)

- With the `KE_VENDOR_GREP_EMBEDDINGS=1` flag on, `vendor_grep` returns
  semantically-ranked results.
- Pre-embedded bodies are committed as `vendor/<name>/.embeddings.bin`.
- Without the flag, behavior matches Phase 4 grep.

### 3. Synonym test

- A synonym query returns at least one hit a substring grep would miss.
