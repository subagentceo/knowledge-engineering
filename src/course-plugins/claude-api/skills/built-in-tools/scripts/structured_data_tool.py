# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Tools for structured data: force a tool call whose input_schema IS the data structure.
# Source: "Tools for Structured Data" — projects/courses/building-with-the-claude-api__1p.txt
#
# More reliable than prefill+stop extraction. tool_choice forces the call; read the result
# straight from the tool-use block (no tool-result round-trip needed).

from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"

# Define a tool whose input_schema is the data structure you want.
article_tool = {
    "name": "save_article",
    "description": "Save the structured details of a news article.",
    "input_schema": {
        "type": "object",
        "properties": {
            "title": {"type": "string"},
            "author": {"type": "string"},
            "sentiment": {"type": "string", "enum": ["positive", "neutral", "negative"]},
        },
        "required": ["title", "author", "sentiment"],
    },
}

message = client.messages.create(
    model=model,
    max_tokens=1000,
    messages=[{"role": "user", "content": "Extract details from: <article>...</article>"}],
    tools=[article_tool],
    tool_choice={"type": "tool", "name": "save_article"},  # FORCE the call
)

data = message.content[0].input  # read structured data straight from the tool-use block
print(data)
