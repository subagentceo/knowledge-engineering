# Streaming: the per-platform event-shape deltas

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

Both stream incrementally so the user sees text build instead of a 3–30 s spinner. The event
**field names differ**.

## Bedrock — `converse_stream`, iterate `response["stream"]`

See [`scripts/bedrock_streaming.py`](../scripts/bedrock_streaming.py).

- First call returns immediately (acknowledgment, no text).
- Event types: **message start → content block delta → content block stop → message stop →
  metadata** (last). Only **content-block-delta** events carry text; ignore the rest for display.

## Vertex — Anthropic SDK streaming

See [`scripts/vertex_streaming.py`](../scripts/vertex_streaming.py).

- Option A: raw event iterator (event types: `message_start`, `content_block_start`,
  `content_block_delta`, `content_block_stop`, `message_delta`, `message_stop`).
- Option B (cleaner): `client.messages.stream(...)` context manager exposing `stream.text_stream`
  (already just the text chunks); `stream.get_final_message()` returns the full message for storage.
