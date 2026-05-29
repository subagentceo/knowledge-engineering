# The eval workflow and dataset generation

Engineers commonly under-test prompts: testing once and deploying, or hand-tweaking for a few corner cases. The recommended third path is running prompts through an **evaluation pipeline** that produces objective scores, so you can iterate and compare versions systematically. The pipeline core is just: dataset + prompt + LLM + grader.

## The eval workflow (6 steps)

1. Write an initial prompt draft (your baseline).
2. Create an evaluation dataset (3 examples or thousands; hand-written or LLM-generated).
3. Generate prompt variations by interpolating each dataset input into the prompt template.
4. Get Claude's response for each variation.
5. Grade each response (e.g. 1–10) and average for an overall prompt score.
6. Iterate — modify the prompt, rerun, compare versions.

There is no standard methodology; many tools exist, but you can start with a small custom implementation.

## Generating a test dataset

A dataset is an array of JSON objects, each with a `task` describing a user request. Generate it automatically with a fast/cheap model (Haiku): prompt Claude to produce test cases, prefill the assistant message with ` ```json `, set stop sequence ` ``` `, parse the response as JSON, and save to `dataset.json` via a `generate_dataset()` function. Add a `format` key (JSON/Python/RegEx) per case if you will do code-based grading.

## Running the eval

Three functions:

- `run_prompt` — merges a test case into the prompt, sends to Claude, returns the output.
- `run_test_case` — calls `run_prompt`, grades the result, returns a summary dict.
- `run_eval` — loops the dataset, calls `run_test_case` for each, assembles results.

A v1 prompt can be as simple as `"Please solve the following task: [task]"` with a hardcoded `score=10` placeholder — then replace the placeholder with real grading. (Full-dataset run was ~31s on Haiku in the course.)
