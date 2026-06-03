# Console workflow

The detailed flow for using the Workbench Evaluation tool at
`platform.claude.com/dashboard`.

## Step 1 — Open the Workbench and write or generate a prompt

1. Go to `platform.claude.com` and sign in.
2. Open the **Workbench** (left nav).
3. Either write your prompt manually, or click **Generate Prompt** to use
   the Opus 4.1-powered prompt generator.

**Prompt generator inputs:**
- Task description (one paragraph is fine; more detail produces a more
  tailored template)
- Click *Generate Prompt*

**Prompt generator outputs:**
- A system prompt that follows Anthropic's prompt-engineering best
  practices (role, XML structure, CoT cue, example placeholder)
- Variables in `{{double_brace}}` form, ready for the eval tool

## Step 2 — Confirm variables exist

The eval tool will reject prompts with **zero** variables. Even a stub
like `{{input}}` is enough. If you wrote the prompt by hand, scan it now
and add at least one variable for the thing that changes across calls.

Common patterns:
```
{{input}}                                # user-supplied text
{{document}}                             # RAG context
{{conversation_history}}                 # prior turns
{{tool_result}}                          # output from a previous tool call
{{COLOR}}, {{SOUND}}, {{TOPIC}}          # short uppercase for single fields
```

The eval docs themselves use this template as the canonical example:

```
In this task, you will generate a cute one sentence story that
incorporates two elements: a color and a sound.
The color to include in the story is:
<color>
{{COLOR}}
</color>
The sound to include in the story is:
<sound>
{{SOUND}}
</sound>
...
```

## Step 3 — Open the Evaluate tab

At the top of the Workbench you'll see tabs. Click **Evaluate**.

The grid appears with one column per variable plus columns for prompt
versions (v1 by default).

## Step 4 — Populate test cases

Three options. Use all three in combination for a robust suite:

### + Add Row (manual)
- Click *+ Add Row* in the bottom-left
- Fill in each variable cell
- Use for **edge cases** that you know matter (empty input, very long
  input, hostile input, multilingual input)

### Generate Test Case (synthetic)
- Click *Generate Test Case* (top of grid)
- Each click generates one row with Claude inferring sensible values
- For control: click the dropdown arrow → *Show generation logic* → edit
  the meta-prompt that drives generation
- Use for **breadth** — covering input shapes you didn't think of

### Import CSV (bulk)
- Format: header row of variable names matching the prompt template
- One row per test case
- See `assets/sample_test_cases.csv` for the canonical shape
- Use for **production-derived** cases — paste real inputs from your logs

## Step 5 — Run the suite

- Per-row: click the play button on a row to run just that case
- All rows: click *Run All*
- Outputs stream into the column for the active prompt version

## Step 6 — Grade outputs

Use the **5-point scale** on each row:
- **1** — Unusable (wrong format, hallucinated, refused inappropriately)
- **2** — Wrong content but plausibly formatted
- **3** — Mediocre (partially correct, missing key piece)
- **4** — Good (correct, well-formatted, minor stylistic improvements
  possible)
- **5** — Excellent (correct, well-formatted, would ship as-is)

Be honest. A suite of 4s isn't a green light — it means you have not yet
found the cases that break your prompt. Generate more.

## Step 7 — Make a v2 with the Prompt Improver

Click **Improve Prompt** at the top. The improver does four things:
1. **Example identification** — pulls existing examples out of the template
2. **Initial draft** — adds clear XML structure and section headers
3. **Chain-of-thought refinement** — adds explicit reasoning steps
4. **Example enhancement** — updates examples to show the new reasoning

Feed it your **lowest-scoring rows** as feedback ("the prompt is too brief
when the input is technical; needs to expand acronyms").

## Step 8 — Side-by-side comparison

After saving v2, the Evaluate grid now has columns for both versions. Run
*Run All* again. For each row, scan v1 → v2:
- **Green delta** (v2 better) — keep
- **Red delta** (v2 worse) — read the v2 output, understand why, decide
  whether v3 needs to walk back a change
- **Tie** — note for later; if many rows tie, the improvement may not be
  load-bearing

## Step 9 — Iterate to convergence

Repeat steps 6–8 until:
- No row scores below 4
- v_n vs v_(n-1) shows no green deltas (you've plateaued)
- Generating new test cases reveals new failures (your suite was too narrow
  — back to step 4)

## Step 10 — Export and version-control

When the prompt is shipping:
1. Copy v_n into your codebase (or use the Workbench API)
2. Export the eval suite as CSV
3. Commit both. The eval suite is part of the prompt's source code.

The point of doing the work in the Console is speed, not residence. Eval
suites should not live in the Console long-term.
