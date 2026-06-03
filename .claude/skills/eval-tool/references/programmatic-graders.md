# Programmatic graders

This is the reference doc for the graders in `assets/grader_recipes/graders.py`.
Each grader is one function. Each catches a different class of failure mode.
Use this doc to pick the right grader for a given task; copy the
implementation from `graders.py` into your project.

## The grader signature

Every grader returns `(status, why)` where:
- `status` ∈ `{PASS, FAIL, PASS_SLOW}` — `PASS_SLOW` is correct but
  over budget (used by `efficiency` and `wall_budget`)
- `why` is a one-line human-readable reason

```python
def grader_name(result: AgentResult, spec: dict) -> tuple[str, str]:
    ...
```

`result` carries `final_text`, `actions`, `turns`, `tokens_in`,
`tokens_out`, `wall_ms`. `spec` is the per-task config (the expected
value, tolerance, pattern, etc.).

## The graders

### `exact_match`
**Use when:** The expected output is one specific value (number, string,
ID). The model must produce *exactly* that value.

**Spec:**
```yaml
grader: exact_match
expected:
  source: lookup    # or a literal value
  sku: SKU-0042
  warehouse: WH-EAST
  field: on_hand
```

**Catches:** Wrong answer, hallucinated answer, off-by-one.
**Misses:** Right answer in a malformed wrapper. Combine with
`regex_present` if format matters.

---

### `set_match`
**Use when:** Expected output is a *set* of items (SKU codes, supplier
IDs, category names). Order doesn't matter; completeness does.

**Spec:**
```yaml
grader: set_match
expected:
  source: computed_low_stock     # function that returns the ground-truth set
```

**Catches:** Missing items (under-recall), extra items (over-recall).
**Misses:** Items embedded in prose without clear delimiters — use a
regex pattern in the grader to extract.

---

### `numeric_tolerance`
**Use when:** Expected output is a number where a range is acceptable
(forecasts, estimates, rounded recommendations).

**Spec:**
```yaml
grader: numeric_tolerance
expected:
  source: reorder_qty
  sku: SKU-0042
  tolerance_pct: 30
  must_mention: ["promo"]    # optional list of phrases that must appear
```

**Catches:** Answers off by more than tolerance, answers that ignore
required context (the `must_mention` check).
**Misses:** Wildly wrong numbers that happen to fall in range — set
tolerance based on the *business* tolerance, not the model's variance.

---

### `regex_present`
**Use when:** The output must contain a specific pattern. Most useful
when there's a structured token (e.g., `confidence: 0.NN`) that
downstream code parses.

**Spec:**
```yaml
grader: regex_present
expected:
  pattern: 'confidence[^A-Za-z]{0,10}0?\.\d{1,2}\b'
  why: "confidence stated qualitatively, not as a number"
```

**Catches:** Format drift, prose where structured output was required.
**Misses:** Correct format with wrong value — pair with another grader.

---

### `action_taken`
**Use when:** The model is supposed to trigger a side effect (call a
tool, create a PO, send an alert). You're grading the *action log*,
not just the text.

**Spec:**
```yaml
grader: action_taken
expected:
  kind: po                       # or 'notify', 'erp'
  sku: SKU-0017                  # optional filter
  qty: 200                       # optional exact match on qty
  min_qty: 100                   # optional lower bound
  min_count: 3                   # optional: at least N distinct SKUs
  not_kind: po                   # optional negative: must NOT do X
```

**Catches:** Model that talks the talk but doesn't call the tool.
Model that calls the wrong tool. Model that creates a PO when escalation
was correct.
**Misses:** Tool call with right name but wrong arguments — add explicit
arg checks via `min_qty`, `qty`.

---

### `llm_judge`
**Use when:** Output is prose that requires subjective judgment (tone,
helpfulness, structural quality, multi-paragraph reasoning).

**Spec:**
```yaml
grader: llm_judge
expected:
  rubric: "PASS if the response is a structured report covering WH-EAST
           that lists at-risk SKUs with on-hand quantities and includes
           at least one concrete reorder recommendation. FAIL if it's
           vague, missing quantities, or covers the wrong warehouse."
```

**Catches:** Subjective quality failures.
**Misses:** Reliability — LLM judges vary. Always pair with at least one
programmatic grader for the same row, or run with `--trials 3` and
take majority vote.

**Cost note:** `llm_judge` costs another API call per row. For large
suites this dominates the eval cost. Use programmatic graders wherever
possible.

---

### `efficiency`
**Use when:** Correctness is binary, but you also care about turn count
or output tokens (over-orchestration, runaway loops).

**Spec:**
```yaml
grader: efficiency
expected:
  kind: notify       # underlying action check
  min_count: 8
budget_turns: 25
budget_tokens: 5000
```

**Returns:** `PASS` if correct AND within budget, `PASS_SLOW` if correct
but over budget, `FAIL` if incorrect.

**Catches:** Agent that handles a 10-item batch by making 10 round-trips
instead of one script.

---

### `wall_budget`
**Use when:** Latency is a product requirement. The task fails if it
takes longer than X seconds.

**Spec:**
```yaml
grader: wall_budget
expected:
  budget_ms: 270000   # 4.5 min
```

**Catches:** Slow loops, agents that re-fetch the same data many times.

---

### `ranked_mention`
**Use when:** Output is a ranked list and a known item must appear in
the top N positions.

**Spec:**
```yaml
grader: ranked_mention
expected:
  sku: SKU-0183
  top: 3
```

**Catches:** Critical items buried at position 47. Tests prioritization
logic, not just retrieval.

---

### `composite`
**Use when:** A task needs multiple checks ANDed together.

**Spec:**
```yaml
grader: composite
expected:
  checks:
    - { grader: action_taken, kind: po, sku: SKU-0183, min_qty: 100 }
    - { grader: wall_budget, budget_ms: 270000 }
    - { grader: ranked_mention, sku: SKU-0183, top: 3 }
```

**Behavior:** FAIL if any sub-grader fails. PASS_SLOW if all pass but
any is SLOW. PASS only if all PASS.

## The scoring formula

`score = (PASS_count + 0.5 × PASS_SLOW_count) / total`

`PASS_SLOW` counts as half-credit because correctness matters more than
speed, but speed still matters. Tune the weight if your product weights
differently (e.g., real-time UIs may need `PASS_SLOW = 0`).

## Reference ranges (variance)

LLM outputs vary by ±8 percentage points between runs even with
identical prompts. Capture this explicitly:

1. Run your suite 3–5 times on a known-good prompt
2. Record min and max scores
3. Treat any new score *inside that range* as no-change
4. Treat scores below the min as a regression worth investigating

The cwc-workshops `agent-decomposition` repo ships
`evals/reference_scores.json` with this shape:

```json
{
  "before": [0.63, 0.75],
  "starter": [0.63, 0.75]
}
```

Copy that pattern.
