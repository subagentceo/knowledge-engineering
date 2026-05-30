# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# The eval runner: run_prompt -> run_test_case -> run_eval.
# Source: "Running the Eval" — projects/courses/building-with-the-claude-api__1p.txt
#
# run_prompt    merges a test case into the prompt, sends to Claude, returns the output.
# run_test_case calls run_prompt, grades the result, returns a summary dict.
# run_eval      loops the dataset, calls run_test_case for each, assembles results.

import json
from dotenv import load_dotenv
from anthropic import Anthropic
from graders import grade  # model + code graders, see graders.py

load_dotenv()

client = Anthropic()
model = "claude-haiku-4-5"


def run_prompt(test_case):
    # A v1 prompt can be as simple as "Please solve the following task: [task]".
    prompt = f"Please solve the following task: {test_case['task']}"
    message = client.messages.create(
        model=model,
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}],
    )
    # Return the first text block's text. Guard against an empty or non-text
    # leading block (e.g. a refusal) so one odd response doesn't abort the run.
    for block in message.content:
        if getattr(block, "type", None) == "text":
            return block.text
    return ""


def run_test_case(test_case):
    output = run_prompt(test_case)
    score, reasoning = grade(test_case, output)
    return {"task": test_case["task"], "output": output, "score": score, "reasoning": reasoning}


def run_eval(dataset):
    results = [run_test_case(tc) for tc in dataset]
    # Guard the empty dataset ([] is valid JSON) — divide-by-zero would crash the
    # run instead of reporting "no test cases".
    avg = sum(r["score"] for r in results) / len(results) if results else 0.0
    return {"results": results, "average_score": avg}


if __name__ == "__main__":
    with open("dataset.json") as f:
        dataset = json.load(f)
    summary = run_eval(dataset)
    print("average score:", summary["average_score"])
