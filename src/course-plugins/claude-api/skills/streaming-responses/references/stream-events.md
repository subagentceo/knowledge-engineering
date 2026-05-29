# How streaming works and the event types

Responses can take 10–30 seconds. Streaming shows text as it is generated so the user sees immediate feedback instead of a spinner.

1. Server sends the user message to Claude.
2. Claude sends an initial acknowledgment (no text yet).
3. A stream of events follows, each carrying a text chunk.
4. Server forwards chunks to the frontend for real-time display.

Event types:

- `message_start` — initial acknowledgment
- `content_block_start` — text generation begins
- `content_block_delta` — carries the actual text chunks (the one you care about)
- `content_block_stop` / `message_stop` — generation complete

Use `stream.get_final_message()` to capture the complete message for persistence — you get the live UX *and* a storable record.
