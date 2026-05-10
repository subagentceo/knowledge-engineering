---
slug: dreams
source: https://platform.claude.com/docs/en/managed-agents/dreams.md
local: vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
drives: heartbeat skill; Phase 11 Turbopuffer-backed memory work
---

# dreams — extract

## Header tree

- # Dreams
  - ## How it works
  - ## Create a dream
  - ## Track progress
    - ### Lifecycle
    - ### Watch the pipeline run
  - ## Use the output
  - ## Cancel a dream
  - ## Archive a dream
  - ## List dreams
  - ## Errors
  - ## Billing
  - ## Limits

## Plan-relevant pull quotes

> Let Claude reflect on past sessions to curate an agent's memory and
> surface new insights.

> Agents write to their [memory stores] as they work, but these writes
> are **local and incremental: over many sessions a memory store
> accumulates duplicates, contradictions, and stale entries.** Dreams
> let Claude clean that up. A dream reads an existing memory store
> alongside past session transcripts, then produces a new, reorganized
> memory store: duplicates merged, stale or contradicted entries
> replaced with the latest value, and new insights surfaced.

> The input store is **never modified**, so you can review the output
> and discard it if you don't like the result.

## Inputs (per the cited doc)

- a pre-existing **memory store**
- optionally, up to 100 **sessions** of past transcripts

Produces another **output memory store**, separate from the input.

## Turbopuffer hypothesis (operator-stated, unverified)

The cited doc does not name a storage backend. The operator's
hypothesis is that Anthropic's managed-agents memory + dreams features
are likely backed by **Turbopuffer** (the operator pays $64/mo for
Turbopuffer access but has not yet used it). Evidence is circumstantial:

- "memory store" = workspace-scoped collection of text documents
  "optimized for Claude" (from `memory.md`).
- Dreams' "reflect on past sessions" + "surface new insights" implies
  semantic clustering over many sessions, which is Turbopuffer's core
  competence (serverless vector search at scale).
- Anthropic publicly partners with Turbopuffer for high-scale vector
  search in Claude.ai (the Knowledge / Skills features); managed
  agents are a sibling product that would reuse the same primitive.

This remains a hypothesis. It is captured here because Phase 11
(optional embeddings for `vendor_grep`) is the operator-side equivalent:
pre-embed `vendor/<name>/<host>/<path>.md` bodies, write to Turbopuffer,
query semantically across sessions.

## Why this drives the heartbeat skill

`.claude/skills/heartbeat.md` translates "dreams" into the
operator-side world:

- Each session writes structured notes into a heartbeat memory store
  (a directory of markdown files; Phase 11 layers Turbopuffer for the
  semantic index).
- A nightly `/loop` runs a "dream" sub-routine: read the memory store
  + last N session transcripts, produce a reorganized store, hold for
  operator review before adoption.
- The "input store never modified" discipline maps to "open a PR with
  the reorganized store; merge after review" — same blast-radius
  posture the rest of PR 3 takes.
