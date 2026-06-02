---
name: eval-tool
description: Use the Anthropic Console Evaluation tool and the Workbench prompt-improver workflow to test, grade, and iterate on Claude prompts. Fire whenever the user wants to evaluate a prompt, generate test cases, compare prompt versions, grade outputs, set up an eval suite, score prompts on a 5-point scale, or use Workbench's Generate Prompt / Generate Test Case / Prompt Improver features. Also fires on requests to write graders (exact_match, set_match, numeric_tolerance, llm_judge, action_taken, regex_present, efficiency, wall_budget, ranked_mention, composite), CSV-import test cases, side-by-side prompt comparison, or anything from platform.claude.com/docs/en/test-and-evaluate. Triggers on "eval my prompt", "test these prompts", "grade this response", "compare prompts", "A/B test the system prompt", "is prompt v2 better than v1", "how do I know my prompt works", "set up an eval suite", "write a grader for X". Prefer this over a hand-rolled ad-hoc evaluator.
license: MIT
compatibility: Console-based workflow assumes platform.claude.com Workbench access. The programmatic path requires Python 3.10+, anthropic>=0.40.0, and pyyaml. Works in claude.ai chat, Claude Desktop, Claude Code, and any IDE — the skill is reference + scripts, no MCP server needed.
metadata:
  author: alexzh
  version: "0.1.0"
  source_docs:
    - https://platform.claude.com/docs/en/test-and-evaluate/eval-tool
    - https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools
---

# eval-tool

Pair this skill with any prompt you intend to ship. It collapses the **prompt
generator → eval set → prompt improver → re-eval** loop into one canonical
flow, with both a Console path (clicky, fast iteration) and a programmatic
path (CI, regression, multi-trial variance).

## When to load this skill

- The user wants to test a prompt across many inputs
- The user has v1 of a prompt and wants v2 to be measurably better
- The user is staring at a "blank page" and needs help writing the first
  draft (→ prompt generator)
- The user has a prompt that mostly works but fails on edge cases (→ prompt
  improver)
- The user mentions any of: eval suite, test cases, regression test,
  side-by-side, A/B compare, score, grade, rubric, LLM-as-judge

If the user just wants a one-shot completion with no notion of "is this
good," this skill is overkill — point them at the standard Messages API.

## The two paths

| Path | Best for | Where |
|---|---|---|
| **Console** | Fast clicky iteration on a single prompt template, 5–30 test cases, visual side-by-side | `platform.claude.com/dashboard → Workbench → Evaluate tab` |
| **Programmatic** | CI gates, large eval suites, multi-trial variance, custom graders, automatic regression | Python: see `scripts/run_eval.py` |

Default to **Console** when the user is exploring; switch to **programmatic**
when (a) the suite is going into version control, (b) graders need to be
deterministic and reproducible, (c) the user wants trial counts > 1, or (d)
the graders mix programmatic checks with LLM judges.

## The triad: generator → eval → improver

These three Workbench tools are designed to chain. Treat them as one
workflow, not three separate features:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Prompt          │ ──▶ │ Evaluation tool │ ──▶ │ Prompt improver │
│ generator       │     │ (test cases +   │     │ (CoT, XML tags, │
│ (blank page)    │     │  side-by-side)  │     │  better examples)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       ▲                       │
        │                       │                       │
        └───────── re-evaluate against same test set ◀──┘
```

Every prompt of consequence should make at least one trip around this loop
before it ships.

## Console workflow (canonical)

The Console eval tool requires every prompt under test to declare at least
1–2 dynamic variables via the **double-brace syntax**: `{{variable}}`. Test
cases are rows where each variable gets a concrete value.

1. **Generate the prompt** — In the Workbench, click *Generate Prompt*,
   describe the task. Opus 4.1 drafts a template that already includes
   variables in the right places.
2. **Add test cases** — Open the *Evaluate* tab. Three ways to populate it:
   - **+ Add Row** for manual cases (use for edge cases you specifically
     want covered)
   - **Generate Test Case** for synthetic ones (Claude infers from the
     prompt; click *Show generation logic* to steer it)
   - **Import CSV** — see `assets/sample_test_cases.csv` for the format
3. **Run the suite** — Click *Run* on each row, or *Run All*. Outputs
   stream into the column for the current prompt version.
4. **Grade outputs** — Use the 5-point scale per response. The scale is:
   1 = unusable, 2 = wrong, 3 = mediocre, 4 = good, 5 = excellent.
5. **Improve the prompt** — Click *Improve Prompt*. Feed it feedback from
   your low-score rows. It produces v2 with CoT, XML tags, and step-by-step
   examples.
6. **Compare side-by-side** — The Evaluate tab keeps both versions; re-run
   the suite, look for green deltas (v2 > v1) and red ones (regressions).
7. **Repeat** until v_n is uniformly ≥4 across the suite.

Detailed walkthrough with screenshots-equivalent text in
`references/console-workflow.md`.

## Programmatic workflow

When the suite leaves a notebook and enters a repo, switch to the
programmatic path. The minimal shape is two files:

```
your-project/
├── evals/
│   ├── tasks.yaml          # one entry per test case (prompt + grader + expected)
│   └── graders.py          # the grader functions imported by tasks.yaml
└── scripts/
    └── run_eval.py         # the runner (provided in this skill)
```

`scripts/run_eval.py` in this skill is a working starting point. It runs
each task through the Anthropic API, applies its grader, and prints a
pass/fail table with optional `--trials N` for variance.

Grader options (each is a function in `graders.py`):

| Grader | Use when |
|---|---|
| `exact_match` | The answer is a specific value (number, ID, name) |
| `set_match` | The answer is a set of items (e.g., all SKUs below reorder) |
| `numeric_tolerance` | The answer is a number within ±X% (forecasts, estimates) |
| `regex_present` | The output must contain a pattern (e.g., `confidence: 0.\d\d`) |
| `action_taken` | The agent must have triggered a side effect (PO created, alert sent) |
| `llm_judge` | The output is prose — grade with a rubric via a second Claude call |
| `efficiency` | Correct AND within a turn/token budget (catches over-orchestration) |
| `wall_budget` | Correct AND within a wall-clock budget (catches slow loops) |
| `ranked_mention` | A target item must appear in the top-N of a ranked list |
| `composite` | AND multiple sub-graders into one verdict |

The full implementations live in `assets/grader_recipes/graders.py` — copy
into the user's project as a starting point. Each is annotated with the
failure modes it catches.

## When to write each grader

The hardest question is "which grader for which task?" Use this table:

| If the expected output is… | Pick |
|---|---|
| One number, exact | `exact_match` |
| One number, approximate | `numeric_tolerance` |
| A set of IDs/strings | `set_match` |
| Free-form prose | `llm_judge` |
| A side-effect (call made, file written) | `action_taken` |
| A pattern that must appear somewhere | `regex_present` |
| A ranked list | `ranked_mention` |
| Multiple of the above ANDed | `composite` |

Bias toward **programmatic graders over `llm_judge`** when possible.
Programmatic graders are cheap, deterministic, and don't drift between
model versions. Use `llm_judge` only for genuinely subjective qualities
(tone, helpfulness, structural quality).

## The five iteration anti-patterns

Watch for these — they're the reason most "we have evals" projects produce
prompts that don't actually improve:

1. **Grading the prompt against itself.** If a single Claude call writes
   the test cases, runs the prompt, AND grades the output, the test set
   never disagrees with the prompt. Use the prompt generator for cases and
   `llm_judge` with a *different* rubric.
2. **No baseline.** v2 looks better than v1 → great. But did v2 break R1
   while fixing F2? Always re-run the full suite, not just the failures.
3. **Cherry-picked test cases.** Hand-written cases drift toward what the
   prompt already handles well. Use *Generate Test Case* or import a CSV
   from real production logs.
4. **One trial.** LLM outputs vary. A "fix" that passes once and fails
   twice is not a fix. Run `--trials 3` minimum on borderline tasks.
5. **No regression suite.** The eval set should live in version control
   next to the prompt. If it doesn't, it stops being run.

## CSV import format

For bulk loading the Console with cases, export from CSV. Format:

```
variable_1,variable_2,...,expected_answer
"value 1a","value 1b",...,"expected output 1"
"value 2a","value 2b",...,"expected output 2"
```

See `assets/sample_test_cases.csv` for a 6-row working example
(English→Spanish translation, the same one the eval-tool docs use).

## Bundled resources

| Path | Read when |
|---|---|
| `references/console-workflow.md` | User wants step-by-step Console walkthrough |
| `references/prompt-improver.md` | User has v1 and wants v2 |
| `references/programmatic-graders.md` | User wants code-based evals or CI |
| `assets/sample_test_cases.csv` | User wants a CSV template |
| `assets/grader_recipes/graders.py` | User wants ready-to-copy grader implementations |
| `assets/grader_recipes/tasks.yaml` | User wants a task-spec example |
| `scripts/run_eval.py` | User wants to run a programmatic suite from the CLI |
| `scripts/seed_test_cases.py` | User wants to scaffold a test set from a prompt |

## The single most important habit

After every prompt change of consequence, ask: **"What's the row in my
eval suite that proves this is better?"** If you can't point at one, the
change is a vibe, not an improvement. Add the row, re-run, then ship.
