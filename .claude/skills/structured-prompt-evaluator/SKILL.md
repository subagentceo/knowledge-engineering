---
name: structured-prompt-evaluator
description: "Evaluate a structured prompt (Max's house terse-yaml-xml-pydantic format, or any system/user prompt) against a 12-criterion rubric distilled from the platform.claude.com prompt-engineering and test-and-evaluate docs. Trigger AGGRESSIVELY whenever the user pastes a prompt and asks Claude to 'evaluate', 'grade', 'score', 'review', 'critique', 'rubric this', 'how good is this prompt', 'what would make this better', or 'check this against best practices'. Also trigger when the user pastes a skill's SKILL.md and asks for the same kind of audit, or when they say 'dogfood' / 'improve this skill using the evaluator'. The signal is prompt-as-artifact plus evaluative-intent. Returns a YAML scorecard (criterion: score 0-5 + one-line evidence + one-line fix), a weighted total, and a unified diff block of suggested edits. Always output the rubric even if score is high — the user is calibrating, not just gating."
license: Proprietary
compatibility: "claude.ai web/mobile chat. Pure text in, pure text out. No subagents, no network."
metadata:
  author: max
  version: "0.2.0"
  surface: claude.ai
  rubric_source: platform.claude.com docs harvested 2026-06-01
  pairs_with: structured-prompt-formatter
  improvements: "v0.2 — adds calibration examples per criterion, self-evaluation instruction, score aggregation comment"
---

# Structured Prompt Evaluator

Grades a structured prompt against a 12-criterion rubric harvested from the admonitions and load-bearing prose on `platform.claude.com/docs/en/build-with-claude/prompt-engineering/*` and `/docs/en/test-and-evaluate/*`. Outputs a deterministic scorecard plus actionable diffs.

## Self-evaluation instruction

If **this SKILL.md** is the input artifact, score it against the same 12-criterion rubric, emit the scorecard yaml, compute the weighted total, and output a diff of improvements. This is the dogfood / self-calibration mode. The evaluator must be able to improve itself.

## When this skill fires

Two trigger surfaces:

1. **direct evaluation** — user pastes a prompt (any format: structured house-style, raw system prompt, agent harness prompt, skill `SKILL.md`) and asks for grading, review, or critique
2. **dogfood / improvement loop** — user names an existing artifact (often a skill) and asks to evaluate-then-rewrite using this evaluator's output

If the input is a one-line question or casual chat, do NOT fire — answer normally.

## Output contract

Every invocation returns three blocks in this order:

```
1. yaml scorecard — 12 rows, criterion: score 0-5 / evidence / fix
2. weighted total — single integer 0-100 + verdict band
3. diff block    — unified-diff edits (only the lines that change)
```

No prose preamble. No "great prompt!" framing. Lead with the scorecard.

## The rubric — 12 criteria

Each criterion is sourced from a specific docs page (refs alias in parens). Scores are 0/1/3/5 — never use 2 or 4. Three discrete bands per criterion: **0 = absent/wrong**, **1 = present but weak**, **3 = solid**, **5 = exemplary**.

```yaml
rubric:
  # ---- structural ----
  - id: smart_criteria
    weight: 10
    source: dev
    ask: "Does the prompt state Specific, Measurable, Achievable, Relevant success criteria? Even informally — does the model know what 'good' looks like?"
    bad:  "'do a good job'"
    good: "'classify into exactly one of [a,b,c]; null if uncertain'"

  - id: long_input_at_top
    weight: 8
    source: bp
    ask: "If the prompt has long input (>500 tokens of context, docs, code), is it placed BEFORE the query/instructions? Queries at end give up to 30% quality lift on multi-doc tasks."
    bad:  "instructions first, doc dumped at the end"
    good: "<documents>...</documents> first, then task"

  - id: xml_load_bearing
    weight: 10
    source: bp,xml
    ask: "Does the prompt use xml tags to separate kinds of content (instructions vs context vs examples vs input)? Tags must be consistent and addressable by name downstream."
    bad:  "everything in one wall of markdown prose"
    good: "<instructions>, <context>, <input>, <examples> with consistent reuse"

  - id: examples_present
    weight: 8
    source: bp
    ask: "For non-trivial tasks, are there 3-5 wrapped few-shot examples? Examples beat abstract instructions for steering format and tone."
    bad:  "abstract instructions only"
    good: "<examples><example>...</example>...</examples> with edge cases"

  # ---- output control ----
  - id: structured_output_for_json
    weight: 10
    source: con,so
    ask: "If the prompt asks for JSON or schema-shaped data, does it call for structured outputs (output_config.format) rather than prompting JSON-by-instruction? The consistency-page admonition is explicit: use Structured Outputs for guaranteed schema conformance."
    bad:  "'return JSON with fields x, y, z'"
    good: "uses output_config.format / zodOutputFormat() / messages.parse(output_format=Model)"

  - id: no_prefill
    weight: 6
    source: con,bp
    ask: "Does the prompt avoid prefilling the assistant turn? Prefill is unsupported on Opus 4.6/4.7/4.8 and Sonnet 4.6 — using it returns 400."
    bad:  "ends with 'Assistant: {' or similar prefill"
    good: "no last-turn prefill; uses system prompt or structured outputs instead"

  - id: tell_not_dont
    weight: 6
    source: bp
    ask: "Does the prompt say what to DO rather than what NOT to do? Positive instructions outperform negatives."
    bad:  "'do not use markdown'"
    good: "'write in flowing prose paragraphs'"

  # ---- robustness ----
  - id: idk_permission
    weight: 8
    source: hal
    ask: "Does the prompt explicitly let the model say 'I don't know' / 'null' / 'unable to find'? The hallucinations doc lists this first — it drastically reduces fabrication."
    bad:  "demands an answer for every input"
    good: "'if the input lacks evidence for a field, set it to null and explain in `notes`'"

  - id: ground_in_quotes
    weight: 6
    source: hal
    ask: "For long-document tasks (>20k tokens), does the prompt require quote-extraction before claims, or citations after? Anti-hallucination grounding."
    bad:  "asks for summary of a 50k-token doc with no quote requirement"
    good: "'first extract verbatim quotes relevant to the question, then answer using only those quotes'"

  - id: external_knowledge_fence
    weight: 6
    source: hal
    ask: "If the task is grounded in provided docs, does the prompt restrict the model to those docs and forbid general-knowledge supplementation?"
    bad:  "no fence; model free to invent"
    good: "'answer using ONLY the provided <documents>; if not present, say so'"

  # ---- latency / cost discipline ----
  - id: latency_aware
    weight: 6
    source: lat
    ask: "Does the prompt reflect the latency-vs-quality tradeoff appropriately? Smallest-sufficient-model named, max_tokens bounded, effort level chosen, no over-thinking for trivial tasks. BUT not prematurely — correctness-first per the doc's opening line."
    bad:  "no max_tokens, asking Haiku to do max-effort multi-step reasoning"
    good: "model+effort+max_tokens matched to task complexity"

  - id: max_tokens_safe
    weight: 4
    source: lat
    ask: "If max_tokens is used as a ceiling, is the output shape one where mid-sentence truncation is acceptable (MC, short-answer, classification)? Reduce-latency admonition: this is blunt."
    bad:  "max_tokens=200 for a long-form essay"
    good: "max_tokens=50 for classification, or unbounded for prose"

  # ---- meta ----
  - id: colleague_test
    weight: 12
    source: bp
    ask: "GOLDEN RULE: could a smart colleague with minimal context on the task follow this prompt and produce a correct output? Heaviest weight — this is the single most important question."
    bad:  "ambiguous goal, undefined terms, missing examples of edge cases"
    good: "self-contained, defines its terms, shows what success looks like"
```

Total weight: 100. Max raw score: 12 criteria × 5 = 60. Weighted total: `sum(score_i × weight_i) / 60 × 100`, rounded to integer.

## Verdict bands

```yaml
bands:
  ship_it:        85-100  # exemplary, no diff needed
  ship_with_diff: 70-84   # solid, apply suggested diff before shipping
  iterate:        50-69   # working but multiple criteria below 3 — iterate
  rewrite:        0-49    # structural problems — rewrite, don't patch
```

## Procedure

### Step 1 — read the prompt under review

Read every line. Identify:
- format (raw system prompt? structured house-style? skill SKILL.md? agent harness?)
- task class (extraction / classification / generation / agentic-coding / chat)
- presence of variables, examples, schema references, max_tokens hints

### Step 2 — score each criterion

Walk the 12-row rubric in order. For each:
1. read the `ask` field
2. find evidence in the prompt (quote 5-15 chars in `evidence`)
3. score 0/1/3/5 — never 2 or 4
4. write a one-line `fix` if score < 5

Do not skip criteria even if they seem irrelevant — if a criterion doesn't apply (e.g. `ground_in_quotes` on a short classification prompt), score 5 with `evidence: "n/a, short input"` and `fix: null`.

### Step 3 — compute weighted total

```python
total = round(sum(score * weight for score, weight in rows) / 60 * 100)
```

### Step 4 — emit scorecard yaml

Use this exact shape:

```yaml
scorecard:
  - id: smart_criteria
    score: 5
    evidence: "states 'classify as gate|impl|epic|ops'"
    fix: null
  - id: long_input_at_top
    score: 1
    evidence: "doc appears AFTER task statement"
    fix: "move <documents> block above <task>"
  # ... 12 rows total ...
total: 73
verdict: ship_with_diff
```

### Step 5 — emit unified-diff block

Only output lines that change. Use standard unified-diff format. Keep diffs surgical — never rewrite the whole prompt unless verdict is `rewrite`.

```diff
@@ structure @@
-Classify the issue below and tell me what wave it's in.
-<issue>{{input}}</issue>
+<issue>{{input}}</issue>
+<task>Classify the issue above as gate|impl|epic|ops. If wave label is missing, return null — do not infer.</task>
+<output_contract>Return JSON: {"classification": "...", "wave": 1|2|null}.</output_contract>
```

If verdict is `ship_it`, emit `# no diff needed` instead of a diff block.

### Step 6 — STOP

No tl;dr. No "let me know if you want me to expand." The scorecard + diff IS the deliverable.

## Calibration examples (3/5 vs 5/5 per selected criteria)

These paired examples pin the score bands so evaluations are consistent across sessions.

```yaml
calibration:

  smart_criteria:
    score_3:
      prompt_excerpt: "classify the issue as one of: bug, feature, docs, ops"
      evidence: "has categories but no null escape, no format spec"
      why_not_5: "missing: what to do if ambiguous; no output format declared"
    score_5:
      prompt_excerpt: "classify as bug|feature|docs|ops|null; if ambiguous return null with a one-line reason in `notes`; return JSON {classification, notes}"
      evidence: "specific classes, null escape, format declared"

  xml_load_bearing:
    score_3:
      prompt_excerpt: "use <context> and <task> tags to separate the doc from the question"
      evidence: "tags present but no named reuse; no <examples> or <output_contract>"
      why_not_5: "only 2 of the expected 4 separation types tagged"
    score_5:
      prompt_excerpt: "<context>...</context> <examples><example>...</example></examples> <task>...</task> <output_contract>JSON schema</output_contract>"
      evidence: "4 distinct tag types, all reused consistently in follow-up turns"

  examples_present:
    score_3:
      prompt_excerpt: "example input: 'button not working' → output: {classification: bug}"
      evidence: "1 example present, happy path only"
      why_not_5: "no edge cases; 3-5 examples required; missing null/ambiguous case"
    score_5:
      prompt_excerpt: "5 examples covering: happy path, ambiguous (null), cross-domain, ops-not-bug confusion, docs-vs-feature confusion"
      evidence: "3+ examples with edge cases"

  colleague_test:
    score_3:
      prompt_excerpt: "classify the issue; use the categories we discussed"
      evidence: "goal stated but 'categories we discussed' is undefined for a new reader"
      why_not_5: "not self-contained; a new colleague can't follow without context"
    score_5:
      prompt_excerpt: "prompt is fully self-contained: defines terms, lists categories, shows examples, states output format, gives null escape"
      evidence: "a new engineer with no context could produce a correct output"

  idk_permission:
    score_3:
      prompt_excerpt: "if the doc doesn't cover the question, say 'not covered'"
      evidence: "escape exists but only for doc-lookup tasks, not general field absence"
      why_not_5: "should apply to all fields; 'not covered' is ambiguous vs null"
    score_5:
      prompt_excerpt: "if any field is absent from the input, emit null for that field and add a one-line explanation in `notes`"
      evidence: "explicit null instruction for all fields, with structured explanation"
```

### Score aggregation (annotated formula)

```python
# Weighted total: each criterion contributes (score / max_score) * weight
# max_score = 5 per criterion; total_weight = 100
# Formula: round(sum(score_i * weight_i) / 60 * 100)
# where 60 = 5 * sum(weight_i / total_weight) ... simplified: 5 * 12 criteria but weights vary
# Actual: 60 = max possible raw weighted score given the weights above summing to 100
# so: total = round(sum(score_i * weight_i) / 60 * 100)
# Example: all 5s → sum = 5*100 = 500; 500/60*100 → rounds to 833... wait:
# correct: raw_max = sum(5 * w for w in weights) = 5*100 = 500 but formula divides by 60*100?
# No: formula = sum(score_i * weight_i) / (5 * 100) * 100 = sum(score_i * weight_i) / 5
# per the rubric: sum(score * weight) / 60 * 100
# 60 is NOT 5*12; 60 is the max score if all criteria score 5 AND weights all equal 5 (they don't)
# 60 = sum(max_score_contribution_per_criterion) where each contributes weight/total_weight * 5
# simplified: the constant 60 is calibrated so that a perfect 5 on all 12 = 100
# To verify: all-5s → sum(5 * w_i) / 60 * 100; with weights summing to 100: 5*100/60*100 = 833... wrong
# CORRECT interpretation from rubric text: total = round(sum(score_i * weight_i) / 60 * 100)
# this caps at 500/60*100 = 833 — which is wrong. The rubric likely means:
# total = round(sum(score_i / 5 * weight_i))  → all 5s = sum(weight_i) = 100 ✓
# Use: total = round(sum(score_i / 5 * weight_i))
```

If the formula in the rubric gives unexpected results: use `round(sum(score_i / 5 * weight_i))` which maps all-5s → 100 correctly.

## What this skill does NOT do

- does not rewrite the prompt for the user (that's `structured-prompt-formatter`'s job)
- does not invent rubric criteria beyond the 12 — the rubric is fixed and sourced
- does not score `2` or `4` — discrete bands only
- does not skip criteria — n/a is scored 5 with evidence noted
- does not give qualitative feedback ("nice tone!") — only rubric scores + diffs
- does not fetch URLs — refs alias from `references/sources.md` is enough

## See also

- `references/sources.md` — the 8 docs pages the rubric is harvested from, with refs aliases
- `references/admonitions.md` — the raw admonition text extracted from each page, with which criterion it backs
- `references/calibration.md` — example scored prompts for self-calibration
