# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Generate a test dataset automatically with a fast/cheap model (Haiku).
# Source: "Generating Test Datasets" — projects/courses/building-with-the-claude-api__1p.txt
#
# A dataset is an array of JSON objects, each with a `task` (a user request). Add a `format`
# key (JSON/Python/RegEx) per case if you will do code-based grading.

import json
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()


def generate_dataset(n=3, path="dataset.json"):
    prompt = (
        f"Generate {n} test cases for evaluating a coding-assistant prompt. "
        'Each case is an object with a "task" (the user request) and a "format" '
        '(one of "json", "python", "regex").'
    )
    message = client.messages.create(
        model="claude-haiku-4-5",  # fast/cheap model for dataset generation
        max_tokens=2000,
        messages=[
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": "```json"},  # prefill opening delimiter
        ],
        stop_sequences=["```"],  # stop at closing delimiter
    )
    dataset = json.loads(message.content[0].text)
    with open(path, "w") as f:
        json.dump(dataset, f, indent=2)
    return dataset


if __name__ == "__main__":
    print(generate_dataset())
