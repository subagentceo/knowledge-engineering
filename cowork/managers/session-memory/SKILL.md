---
name: session-memory
description: >
  Operator/manager skill — consolidate Cowork sessions on this macOS into token-minimized memory
  stores + self-contained HTML artifacts. Use when the operator says "session memory", "remember this
  session", "index my sessions", "summarize all sessions", "what did I do across sessions", or when a
  nightly manager runs the consolidation/dreams pass. Two modes: `index` (cheap, cross-session map from
  list_sessions metadata — no transcript reads) and `session` (deep per-session store; reads ONE
  transcript and consolidates it). Output schema = Anthropic Messages API + e2m envelope. Pairs with
  agent-hierarchy.md (manager tier) and durable-lru-dreams (consolidation).
license: Apache-2.0
metadata:
  author: ADMIN_JADECLI
  version: "0.1.0"
  tier: manager
---

# session-memory

Turn long Cowork transcripts into a **token-minimized memory store** the operator (or a new session)
can recall cheaply. The memory store is a curated *episode index* — not the raw transcript — modeled on
the Messages API + e2m envelope shape. The HTML artifact embeds its data inline, so it costs **0 tokens
to view** and works offline.

> Lives in the manager tier (`cowork/managers/`) because consolidation is a scheduled job. The operator
> can also invoke it on demand.
>
> @cite cowork/standards/agent-hierarchy.md (manager tier; nightly consolidation = dreams)
> @cite cowork/artifacts/session-memory/ (the reference output, this session)
> @cite cowork/schemas/envelope.ts (e2m envelope shape)

## The token economics (why two modes)

A faithful per-session store needs the transcript to summarize each turn — and reading a transcript
costs tokens *once*. So:

- **`index`** (cheap) — a cross-session map from `session_info.list_sessions` metadata only. No
  transcript reads. Run it over **all** sessions any time; the whole index is a few KB.
- **`session`** (one transcript = one token cost) — the agent reads a single session's transcript
  **once**, summarizes each exchange into an episode (`user.summary`, `assistant.summary`, structured
  `io`), then this script renders it. Going forward you read the ~KB store, never the transcript again.

Do **not** deep-process all sessions in one interactive context (token explosion). Deep-process
incrementally, or let the nightly **midnight-session manager** do one per night (the dreams pass).

## Run

```bash
# 1) index — all sessions (cheap). Agent writes sessions.json from session_info.list_sessions:
python3 cowork/managers/session-memory/scripts/build_session_memory.py \
  index --sessions sessions.json --out cowork/artifacts/session-memory/all-sessions

# 2) session — deep store for ONE session. Agent reads its transcript ONCE, writes turns.json:
python3 cowork/managers/session-memory/scripts/build_session_memory.py \
  session --turns turns.json --out cowork/artifacts/session-memory/<session-id>
```

Each run writes `memory.json` (the store) + `index.html` (the artifact). Register the HTML with
`mcp__cowork__create_artifact` to pin it in the Cowork sidebar.

## Inputs

- `sessions.json` (index): `[{ "id", "title", "status", "cwd" }, …]` — straight from `list_sessions`.
- `turns.json` (session): `{ "session": {id,title,surface,model,date,operator}, "turns": [
  { "seq", "user": {"summary"}, "assistant": {"summary","model"},
    "io": {"tools":[],"files":[],"envelopes":[],"queues":[]}, "tokens_est" } ] }`.

## Manager wiring (nightly)

The `Coworkers midnight session` scheduled manager should: `list_sessions` → run `index` (refresh the
map) → pick the highest-value un-deep'd session → read its transcript once → run `session` → emit an
e2m `summary` envelope to `operator.jsonl` (surfaced at the morning summary). That is the dreams
consolidation applied to your own sessions: one transcript read per night, the corpus stays recalled
for ~KB.

## Activation

`.claude/skills/` is a managed cache (write-protected); enable this as a live Cowork skill via
**Settings → Capabilities**. The files here are the source of truth.
