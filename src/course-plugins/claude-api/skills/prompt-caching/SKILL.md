---
name: prompt-caching
description: Speed up Claude and cut token cost by caching repeated input. Trigger when adding prompt caching, placing cache_control ephemeral breakpoints on tools / system prompts / message prefixes, reasoning about cache invalidation or the 1024-token minimum, or reading cache_creation_input_tokens vs cache_read_input_tokens in usage.
---

# Prompt Caching

> Distilled from the *Building with the Claude API* course.

## Overview

Prompt caching stores Claude's input-processing work temporarily so an identical follow-up retrieves it instead of reprocessing, cutting latency and cost. You place manual `cache_control` breakpoints (`type: "ephemeral"`) on tool schemas, system prompts, or message blocks. Caching follows the processing order tools → system prompt → messages; anything before a changed breakpoint invalidates the cache.

## Quick start

```python
# System prompt: wrap in a text-block dict with cache_control (longhand required)
system = [{"type": "text", "text": "...", "cache_control": {"type": "ephemeral"}}]

# Tools: add cache_control to the LAST tool in the list (clone, don't mutate originals)
tools[-1]["cache_control"] = {"type": "ephemeral"}
```

Key constraints: content must be ≥ 1024 tokens; max 4 breakpoints/request; cache lasts up to 1 hour. See [scripts/caching_in_action.py](scripts/caching_in_action.py) for a `chat()` that caches tools + system by default and reads `cache_creation_input_tokens` / `cache_read_input_tokens`.

## References

- [references/caching-rules.md](references/caching-rules.md) — full rules (duration, breakpoint placement, scope, invalidation, longhand, 1024-token minimum) and how to read cache usage.

## Source
Course notes: "Prompt Caching", "Rules of Prompt Caching", "Prompt Caching in Action" — projects/courses/building-with-the-claude-api__1p.txt
