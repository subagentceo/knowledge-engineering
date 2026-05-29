---
name: controlling-output
description: Steer and shape Claude's output beyond editing the prompt. Trigger when you need raw structured data (JSON/code/regex) with no markdown headers or commentary, want to prefill an assistant message to steer the response, use stop sequences to halt generation at a string, or get clean copy-paste-ready output.
---

# Controlling Model Output

> Distilled from the *Building with the Claude API* course.

## Overview

Two techniques control the response without touching the core prompt: **assistant prefilling** (append a partial assistant message and Claude continues it) and **stop sequences** (halt generation when an exact string is emitted). Combine them to get raw structured data — JSON, code, regex, lists — with none of Claude's automatic markdown headers, commentary, or footers.

## Quick start

```
User message     = the request for structured data
Assistant prefill = the opening delimiter, e.g.  ```json
Stop sequence    = the closing delimiter, e.g.  ```
```

Claude emits only the requested content and stops at the closing delimiter, leaving raw parseable output. See [scripts/prefill_and_stop.py](scripts/prefill_and_stop.py) for runnable prefill, stop-sequence, and JSON-extraction examples.

## References

- [references/prefill-and-stop.md](references/prefill-and-stop.md) — full detail on prefilling, stop sequences, and the prefill+stop structured-data pattern.

## Source
Course notes: "Controlling Model Output", "Structured Data" — projects/courses/building-with-the-claude-api__1p.txt
