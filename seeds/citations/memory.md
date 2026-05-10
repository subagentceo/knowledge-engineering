---
slug: memory
source: https://platform.claude.com/docs/en/managed-agents/memory.md
local: vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
drives: heartbeat skill; cross-session persisted state; Phase 11 Turbopuffer-backed memory work
---

# memory — extract

## Header tree

- # Using agent memory
  - ## Overview
  - ## Create a memory store
    - ### Seed it with content (optional)
  - ## Attach a memory store to a session
    - ### How the agent accesses memory
  - ## View and edit memories
    - ### List memories
    - ### Read a memory
    - ### Create a memory
    - ### Update a memory
    - ### Delete a memory
  - ## Audit memory changes
    - ### List versions
    - ### Retrieve a version
    - ### Redact a version
  - ## Manage memory stores
    - ### List stores
    - ### Archive a store
  - ## Limits

## Plan-relevant pull quotes

> Give your agents **persistent memory that survives across sessions**
> using memory stores.

> A **memory store** is a workspace-scoped collection of text documents
> optimized for Claude. When you attach a store to a session, it is
> **mounted as a directory inside the session's container**. The agent
> reads and writes it with the same file tools it uses for the rest of
> the filesystem, and a note describing each mount is automatically
> added to the system prompt so the agent knows where to look.

> Memory stores attach with `read_write` access by default. **If the
> agent processes untrusted input (user-supplied prompts, fetched web
> content, or third-party tool output), a successful prompt injection
> could write malicious content into the store. Later sessions then
> read that content as trusted memory.** Use `read_only` for reference
> material, shared lookups, and any store the agent does not need to
> modify.

> Writes are persisted back to the store and **stay in sync across
> sessions that share it**.

## Turbopuffer hypothesis (operator-stated, unverified)

Same hypothesis as `seeds/citations/dreams.md`. The cited memory doc
emphasizes "workspace-scoped collection of text documents optimized for
Claude" and "stay in sync across sessions that share it" — both
consistent with a vector-backed store, though the doc itself describes
the agent-facing surface as plain file I/O under `/mnt/memory/`.

## Why this drives the heartbeat skill

`.claude/skills/heartbeat.md` operationalizes "memory store" as:

- A directory under `seeds/memory/<store-name>/` of markdown files
  (the operator-side equivalent of `/mnt/memory/<store>/`).
- Each heartbeat session reads the store at start, writes structured
  notes at the end, commits to git (atomic, reviewable).
- Phase 11 layers Turbopuffer on top: pre-embed the memory store,
  query semantically when the heartbeat session asks "what do I
  remember about X?".
- The `read_only` discipline maps to "shared lookup tables live in
  `seeds/memory/_shared/` and are git-protected against in-session
  writes."

## Untrusted-input warning translation

The cited doc's prompt-injection warning is directly relevant: the
crawler in Phase 1 will ingest external markdown bodies. **Do NOT**
let those bodies feed the heartbeat memory store directly. Untrusted
bodies live under `vendor/` only; the memory store is for
agent-curated structured notes.
