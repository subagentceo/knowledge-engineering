# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Web search tool: Claude runs the search itself (no custom code).
# Source: "The Web Search Tool" — projects/courses/building-with-the-claude-api__1p.txt

from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"

tools = [
    {
        "type": "web_search_20250305",
        "name": "web_search",
        "max_uses": 5,  # caps total searches, default 5
        "allowed_domains": ["nih.gov"],  # optional: restrict to specific domains
    }
]

message = client.messages.create(
    model=model,
    max_tokens=1000,
    messages=[{"role": "user", "content": "What are the latest guidelines on vitamin D intake?"}],
    tools=tools,
)

# Response contains text blocks (prose), tool-use blocks (queries run),
# web-search-result blocks (title + URL), and citation blocks (exact source text).
for block in message.content:
    print(block.type)
