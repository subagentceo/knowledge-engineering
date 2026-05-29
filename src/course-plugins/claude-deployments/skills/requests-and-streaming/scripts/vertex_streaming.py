# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
# ]
# ///
# Source: Course note "Response Streaming" (Vertex) — projects/courses/vertex.
# Platform: Google Cloud Vertex AI — Anthropic SDK streaming.
#
# Notes:
# - Both platforms stream incrementally so the user sees text build instead of a
#   3-30 s spinner. The event FIELD NAMES differ from Bedrock.
# - Option B is cleaner: a context manager exposing a text stream.

# Option A: raw event iterator
for event in client.messages.create(model=MODEL, max_tokens=1024,
                                     messages=messages, stream=True):
    ...  # event types: message_start, content_block_start, content_block_delta,
         # content_block_stop, message_delta, message_stop

# Option B (cleaner): context manager exposing a text stream
with client.messages.stream(model=MODEL, max_tokens=1024, messages=messages) as stream:
    for text in stream.text_stream:
        ...                       # already just the text chunks
    final = stream.get_final_message()   # full message for storage
