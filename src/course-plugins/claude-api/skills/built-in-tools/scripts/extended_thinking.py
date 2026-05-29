# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Extended thinking: let Claude reason before answering.
# Source: "Extended Thinking" — projects/courses/building-with-the-claude-api__1p.txt
#
# Set thinking with a thinking_budget (minimum 1024 tokens) and ensure max_tokens > thinking_budget
# (budget 1024 -> max_tokens >= 1025). Response has a thinking block (reasoning + a cryptographic
# signature) and a text block. Safety-flagged reasoning comes back as a redacted thinking block.

from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"

message = client.messages.create(
    model=model,
    max_tokens=2000,  # must exceed thinking_budget
    thinking={"type": "enabled", "budget_tokens": 1024},  # minimum 1024 tokens
    messages=[{"role": "user", "content": "Solve: a train leaves at..."}],
)

for block in message.content:
    if block.type == "thinking":
        print("REASONING:", block.thinking)  # carries a tamper-proof signature
    elif block.type == "text":
        print("ANSWER:", block.text)
