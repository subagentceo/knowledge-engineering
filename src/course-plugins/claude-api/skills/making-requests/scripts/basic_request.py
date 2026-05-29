# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Basic Anthropic Messages API request.
# Source: "Accessing the API", "Making a Request" — projects/courses/building-with-the-claude-api__1p.txt
# Setup: pip install anthropic python-dotenv; store ANTHROPIC_API_KEY in a git-ignored .env file.

from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()  # reads ANTHROPIC_API_KEY from the environment
model = "claude-sonnet-4-5"

message = client.messages.create(
    model=model,
    max_tokens=1000,  # safety cap on length, not a target
    messages=[{"role": "user", "content": "What is quantum computing?"}],
)
text = message.content[0].text  # extract just the generated text
print(text)
