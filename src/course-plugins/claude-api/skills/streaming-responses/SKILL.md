---
name: streaming-responses
description: How to stream Claude's response chunk-by-chunk instead of waiting for the full reply. Trigger when adding streaming to an Anthropic app, handling stream events (message_start, content_block_delta), using messages.stream() or stream=True, capturing the final message for storage, or streaming partial tool-call JSON.
---

# Streaming Responses

> Distilled from the *Building with the Claude API* course.

## Overview

Responses can take 10–30 seconds. Streaming shows text as it is generated so the user sees immediate feedback instead of a spinner. The SDK gives you a low-level event iterator (`stream=True`) or a simplified `text_stream`; either way you can call `get_final_message()` to keep a storable record. Tool arguments can also be streamed, with an optional fine-grained mode for immediate chunks.

## Quick start

```python
# Simplified: text_stream yields just the text chunks
with client.messages.stream(...) as stream:
    for text in stream.text_stream:
        print(text, end="")
    final = stream.get_final_message()   # assemble all chunks for DB storage
```

See [scripts/stream_response.py](scripts/stream_response.py) for the full text-streaming + final-message pattern, and [scripts/stream_tool_use.py](scripts/stream_tool_use.py) for fine-grained tool-argument streaming.

## References

- [references/stream-events.md](references/stream-events.md) — how streaming works and the event types (`message_start`, `content_block_delta`, etc.).
- [references/fine-grained-tool-calling.md](references/fine-grained-tool-calling.md) — `input_json_delta`, default buffering vs `fine_grained: true`, and the validity tradeoff.

## Source
Course notes: "Response Streaming", "Fine Grained Tool Calling" — projects/courses/building-with-the-claude-api__1p.txt
