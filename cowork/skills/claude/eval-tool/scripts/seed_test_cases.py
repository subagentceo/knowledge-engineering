#!/usr/bin/env python3
"""Seed an eval suite by asking Claude to generate diverse test cases.

This is the programmatic equivalent of the Workbench's "Generate Test
Case" button — useful when you want to bootstrap a suite from a prompt
template without clicking through the Console.

Usage:
    python seed_test_cases.py \
      --prompt-file system.txt \
      --variables COLOR,SOUND \
      --n 10 \
      --out test_cases.yaml

The output is a tasks.yaml-compatible file with `grader: llm_judge` and
a stub rubric. Edit the rubric per task, then run with run_eval.py.

Requirements:
    pip install anthropic pyyaml
    export ANTHROPIC_API_KEY=...
"""
from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path

import anthropic
import yaml

GEN_SYSTEM = """\
You are a test-case generator for evaluating LLM prompts. You receive:
1. A prompt template with {{variable}} placeholders.
2. A list of variable names.
3. A count N.

Produce N diverse test cases. Cover edge cases: empty input, very long
input, hostile input, multilingual input, ambiguous input. Each test case
is a JSON object with one key per variable. Return a JSON array. No prose,
no markdown fences, just the JSON array.
"""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt-file", required=True, type=Path)
    ap.add_argument("--variables", required=True,
                    help="Comma-separated variable names matching {{var}} placeholders")
    ap.add_argument("--n", type=int, default=10, help="Number of cases to generate")
    ap.add_argument("--model", default=os.environ.get("EVAL_GEN_MODEL", "claude-opus-4-7"))
    ap.add_argument("--out", required=True, type=Path)
    args = ap.parse_args()

    prompt_template = args.prompt_file.read_text()
    variables = [v.strip() for v in args.variables.split(",")]

    # Sanity: every declared variable must appear in the template.
    missing = [v for v in variables if f"{{{{{v}}}}}" not in prompt_template]
    if missing:
        raise SystemExit(f"Variables not found in template: {missing}")

    client = anthropic.Anthropic()
    user = (
        f"PROMPT TEMPLATE:\n{prompt_template}\n\n"
        f"VARIABLES: {variables}\n\n"
        f"Generate {args.n} diverse test cases as a JSON array."
    )
    msg = client.messages.create(
        model=args.model, max_tokens=4096,
        system=GEN_SYSTEM,
        messages=[{"role": "user", "content": user}],
    )
    text = "".join(b.text for b in msg.content if getattr(b, "type", "") == "text").strip()

    # Tolerate Claude wrapping the JSON in ```json fences despite the instruction.
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    cases = json.loads(text)
    if not isinstance(cases, list):
        raise SystemExit(f"Generator returned non-list: {type(cases).__name__}")

    # Build tasks.yaml structure
    tasks = []
    for i, case in enumerate(cases, 1):
        # Render the prompt with the variables substituted
        rendered = prompt_template
        for k, v in case.items():
            rendered = rendered.replace(f"{{{{{k}}}}}", str(v))
        tasks.append({
            "id": f"S{i:02d}",
            "name": f"seed case {i}",
            "prompt": rendered,
            "grader": "llm_judge",
            "expected": {
                "rubric": (
                    "EDIT ME: PASS if the response correctly handles the input "
                    "and follows the prompt's stated output format. FAIL otherwise."
                ),
            },
            "_variables": case,    # leading underscore: ignored by runner, kept for review
            "tags": ["seed"],
        })

    args.out.write_text(yaml.safe_dump({"tasks": tasks}, sort_keys=False))
    print(f"  → wrote {len(tasks)} cases to {args.out}")
    print(f"  Next: edit each task's rubric, then:")
    print(f"        python run_eval.py --tasks {args.out} --prompt-file {args.prompt_file}")


if __name__ == "__main__":
    main()
