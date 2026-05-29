# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Controlling output: assistant prefilling, stop sequences, and structured-data extraction.
# Source: "Controlling Model Output", "Structured Data" — projects/courses/building-with-the-claude-api__1p.txt

import json
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"


def prefill_example():
    # Prefill: Claude continues from its exact endpoint, not a clean sentence boundary.
    messages = [
        {"role": "user", "content": "Is coffee or tea better?"},
        {"role": "assistant", "content": "Coffee is better because"},  # prefill
    ]
    message = client.messages.create(model=model, max_tokens=200, messages=messages)
    # Stitch the prefill + the generated continuation together yourself.
    return "Coffee is better because" + message.content[0].text


def stop_sequence_example():
    # When Claude generates the stop string, generation halts and the stop text is NOT included.
    message = client.messages.create(
        model=model,
        max_tokens=100,
        messages=[{"role": "user", "content": "Count from one to ten."}],
        stop_sequences=[", five"],  # clean output "one, two, three, four"
    )
    return message.content[0].text


def extract_json():
    # Structured data = user request + assistant prefill of opening delimiter + stop on closing delimiter.
    messages = [
        {"role": "user", "content": "Give me three fruits with their colors."},
        {"role": "assistant", "content": "```json"},  # opening delimiter
    ]
    message = client.messages.create(
        model=model,
        max_tokens=500,
        messages=messages,
        stop_sequences=["```"],  # closing delimiter
    )
    return json.loads(message.content[0].text)  # raw, parseable output


if __name__ == "__main__":
    print(prefill_example())
    print(stop_sequence_example())
    print(extract_json())
