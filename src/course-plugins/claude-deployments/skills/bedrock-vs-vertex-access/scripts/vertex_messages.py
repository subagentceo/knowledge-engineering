# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
# ]
# ///
# Source: Course note "Making a Request" (Vertex) — projects/courses/vertex.
# Platform: Google Cloud Vertex AI — Anthropic SDK.
#
# Notes:
# - This is the NATIVE Anthropic call (client.messages.create), so `content` is
#   a plain string on input and you read message.content[0].text on output —
#   exactly as in claude-api.
# - max_tokens is required here (it's a safety ceiling, not a target).
# - Once the Vertex client exists, the rest matches claude-api almost
#   line-for-line.

# pip install "anthropic[vertex]"
from anthropic import AnthropicVertex

client = AnthropicVertex(region="global", project_id="my-gcp-project")

MODEL = "claude-3-5-sonnet-v2@20241022"  # a model VERSION string

message = client.messages.create(
    model=MODEL,
    max_tokens=1024,                       # required on Vertex (Anthropic-shape call)
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
text = message.content[0].text
