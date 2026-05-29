# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Streaming a Claude response chunk-by-chunk and capturing the final message for storage.
# Source: "Response Streaming" — projects/courses/building-with-the-claude-api__1p.txt

from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"

messages = [{"role": "user", "content": "Write a short poem about the ocean."}]

# Low-level: returns an event iterator you handle yourself.
#   stream = client.messages.create(model=model, max_tokens=500, messages=messages, stream=True)
#   for event in stream:
#       ...  # inspect event.type: message_start, content_block_delta, message_stop, etc.

# Simplified: text_stream yields just the text chunks.
with client.messages.stream(model=model, max_tokens=500, messages=messages) as stream:
    for text in stream.text_stream:
        print(text, end="")
    final = stream.get_final_message()  # assemble all chunks for DB storage

# You get the live UX *and* a storable record.
print("\n---\nstored:", final.content[0].text[:60])
