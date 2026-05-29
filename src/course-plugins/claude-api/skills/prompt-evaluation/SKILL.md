---
name: prompt-evaluation
description: Build an automated prompt-evaluation pipeline to score prompts objectively before deploying. Trigger when the user wants to test/eval a prompt, generate a test dataset, run a prompt over many inputs, grade outputs with a model grader or code-based syntax checks, or compare prompt versions (A/B) instead of eyeballing a couple of runs.
---

# Prompt Evaluation

> Distilled from the *Building with the Claude API* course.

## Overview

Instead of testing a prompt once and deploying, run it through an evaluation pipeline that produces objective scores so you can iterate and compare versions. The pipeline core is just **dataset + prompt + LLM + grader**: generate a test dataset, run the prompt over each case, grade with a model grader and/or code-based syntax checks, average, then iterate.

## Quick start

The 6-step workflow: draft prompt → build dataset → interpolate inputs → get Claude's responses → grade (1–10) and average → iterate. The runner is three functions:

- `run_prompt` — merge a test case into the prompt, return Claude's output.
- `run_test_case` — call `run_prompt`, grade, return a summary dict.
- `run_eval` — loop the dataset, assemble results, average the scores.

Scripts: [scripts/generate_dataset.py](scripts/generate_dataset.py) (Haiku + prefill/stop JSON dataset), [scripts/run_eval.py](scripts/run_eval.py) (the run_prompt/run_test_case/run_eval loop), [scripts/graders.py](scripts/graders.py) (model grader + `validate_json`/`validate_python`/`validate_regex` and the combined score).

## References

- [references/eval-workflow.md](references/eval-workflow.md) — the 6-step workflow, dataset generation, and the run_prompt/run_test_case/run_eval structure.
- [references/grading.md](references/grading.md) — code vs model vs human graders, model-grading best practice, and `final = (model_score + syntax_score) / 2`.

## Source
Course notes: "Prompt Evaluation", "A Typical Eval Workflow", "Generating Test Datasets", "Running the Eval", "Model Based Grading", "Code Based Grading" — projects/courses/building-with-the-claude-api__1p.txt
