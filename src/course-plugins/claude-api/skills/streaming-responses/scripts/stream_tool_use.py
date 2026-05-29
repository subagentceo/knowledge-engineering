# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Fine-grained tool calling: stream partial tool-argument JSON immediately.
# Source: "Fine Grained Tool Calling" — projects/courses/building-with-the-claude-api__1p.txt
#
# By default the API buffers tool-argument JSON until a full top-level key-value pair is
# generated and validated against the schema, then releases chunks in delayed bursts.
# fine_grained=True disables that API-side validation and sends chunks immediately
# (smoother stream, but possibly invalid JSON like "undefined" instead of null that you
# must handle client-side).

from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"

tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a city.",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    }
]

with client.messages.stream(
    model=model,
    max_tokens=500,
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
    tools=tools,
    fine_grained=True,  # course note: disables API-side JSON validation buffering
) as stream:
    for event in stream:
        if event.type == "content_block_delta" and event.delta.type == "input_json_delta":
            # partial_json = this chunk; snapshot = cumulative JSON so far.
            print(event.delta.partial_json, end="")
