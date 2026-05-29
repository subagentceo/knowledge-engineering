# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Model-based and code-based grading.
# Source: "Model Based Grading", "Code Based Grading" — projects/courses/building-with-the-claude-api__1p.txt
#
# Combined score: final = (model_score + syntax_score) / 2 — pairs semantic quality with
# technical validity.

import ast
import json
import re
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()


# --- Code graders: each returns 10 on success, 0 on error. ---

def validate_json(text):
    try:
        json.loads(text)
        return 10
    except Exception:
        return 0


def validate_python(text):
    try:
        ast.parse(text)
        return 10
    except Exception:
        return 0


def validate_regex(text):
    try:
        re.compile(text)
        return 10
    except Exception:
        return 0


def syntax_score(test_case, output):
    # Pick the validator from the case's `format` key.
    validator = {"json": validate_json, "python": validate_python, "regex": validate_regex}
    fn = validator.get(test_case.get("format"))
    return fn(output) if fn else 10


# --- Model grader: ask for strengths/weaknesses/reasoning AND a score, never the score alone. ---

def model_score(test_case, output):
    prompt = (
        f"Task: {test_case['task']}\n\nOutput to evaluate:\n{output}\n\n"
        "Evaluate the output. Return strengths, weaknesses, reasoning, and a score from 1-10."
    )
    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1000,
        messages=[
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": "```json"},  # structured JSON via prefill + stop
        ],
        stop_sequences=["```"],
    )
    parsed = json.loads(message.content[0].text)
    return parsed["score"], parsed.get("reasoning", "")


def grade(test_case, output):
    m_score, reasoning = model_score(test_case, output)
    s_score = syntax_score(test_case, output)
    final = (m_score + s_score) / 2
    return final, reasoning
