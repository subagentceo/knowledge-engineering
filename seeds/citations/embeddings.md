---
slug: embeddings
source: https://platform.claude.com/docs/en/build-with-claude/embeddings.md
local: vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
drives: optional semantic vendor_grep (Phase 11)
---

# embeddings — extract

## Header tree

- # Embeddings
  - ## Before implementing embeddings
  - ## How to get embeddings with Anthropic
  - ## Available models
  - ## Getting started with Voyage AI
    - ### Voyage Python library
    - ### Voyage HTTP API
    - ### AWS Marketplace
  - ## Quickstart example
  - ## FAQ
  - ## Pricing

## Plan-relevant pull quotes

> Text embeddings are numerical representations of text that enable
> measuring semantic similarity. This guide introduces embeddings, their
> applications, and how to use embedding models for tasks like search,
> recommendations, and anomaly detection.

> Anthropic does not offer its own embedding model. One embeddings
> provider that has a wide variety of options and capabilities … is
> **Voyage AI**.

> Voyage embeddings are normalized to length 1, therefore dot-product
> and cosine similarity are the same.

## Why this drives Phase 11 (optional, behind a flag)

Phase 11 builds an optional semantic mode for `vendor_grep` behind the
`KE_VENDOR_GREP_EMBEDDINGS=1` flag. We pre-embed all
`vendor/<name>/<host>/<path>.md` bodies via Voyage (one-time, committed
as `vendor/<name>/.embeddings.bin`) and rank by cosine similarity at
query time. Falls back to plain grep when the flag is off — no
mandatory dependency on a third-party embedding provider.
