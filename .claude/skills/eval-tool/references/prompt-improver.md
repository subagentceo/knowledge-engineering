# Prompt improver

The Workbench's prompt improver is for **complex prompts where accuracy
matters more than speed**. It produces longer, more thorough, more
structured prompts. If you care about latency or token cost, use the
prompt generator and stop — don't run improver on top.

## Inputs

Required:
- A prompt template (with at least one `{{variable}}`)

Highly recommended:
- Feedback about what's currently wrong (1–3 sentences is plenty)
- 2–5 example (input, ideal_output) pairs

Without the feedback, the improver does its best guess at what "better"
means — usually "more structured." With feedback, it targets specifically
what's broken.

## What it produces

A new prompt with these additions:
1. **Chain-of-thought scaffolding** — explicit "think through these steps"
   instructions before the answer
2. **XML tags** — `<input>`, `<reasoning>`, `<answer>` sections
3. **Standardized examples** — same input/output shape as the live call
4. **Prefills** — strategic first-token sequences that anchor the response
   format

## When to use it

| Scenario | Use improver? |
|---|---|
| Prompt works on simple cases, fails on complex ones | Yes |
| Outputs are inconsistent across runs | Yes |
| Outputs hallucinate facts | Yes |
| Outputs are too verbose | No — write a *concise* instruction instead |
| Latency budget is tight | No — improver adds tokens |
| You don't have a clear failure mode | Generate test cases first |

## When NOT to use it

The improver makes prompts longer. For:
- Real-time / streaming use cases where TTFB matters
- High-volume / cost-sensitive paths
- Models with smaller context windows

…take the structural ideas from an improver output and **hand-shrink them**
into a tighter prompt. The improver is a teaching tool as much as a
production one.

## How to feed it good feedback

The improver works on patterns, not single rows. Aggregate before feeding:

**Bad feedback (single row):**
> "The summary of doc #47 missed that the Q3 revenue was misreported."

**Good feedback (pattern):**
> "Summaries of financial docs miss inline corrections (e.g., 'revenue
> was $4.2B (corrected from $4.1B)') — they pick up the first number and
> ignore the correction."

The improver will add reasoning steps for *correction handling* in
general, not just for doc #47.

## After running

1. Diff v1 → v2 — understand what changed
2. Re-run your **entire eval suite** against v2, not just the failures
3. Look for regressions: a row that was 4 in v1 and 2 in v2 means the
   improvement broke something else
4. If regressions appear, decide:
   - Roll back specific additions (e.g., drop a CoT step that was making
     it overthink)
   - Add a new rule that handles both the original case and the new
     regression
   - Keep the regression if the gains outweigh it (document the tradeoff)

## The four-step internal flow (for transparency)

The improver shows these in real-time in the modal:
1. **Example identification** — extracts any `Examples:` or `<example>`
   blocks from the existing prompt
2. **Initial draft** — adds XML structure, sectioned by role/input/
   reasoning/output
3. **Chain-of-thought refinement** — adds the "think step by step"
   scaffolding
4. **Example enhancement** — updates the extracted examples to show the
   new reasoning format end-to-end

If any step looks off (e.g., it extracted the wrong examples), cancel and
restart with a cleaner template — fighting partial output is slower than
restarting.

## Don't have examples?

Use the Test Case Generator in the Evaluate tab first:
1. Generate 5–10 test cases
2. Run them against v1
3. Edit the v1 outputs to match the ideal (this is the most valuable 15
   minutes you can spend)
4. Paste 2–3 of the edited ones into the improver's *Examples* field
5. Run the improver
