# Calibration — three example scorings

Reference scorings for self-anchoring. Reread these before scoring a new prompt if you're uncertain about banding.

## Example A — minimal prompt (rewrite verdict)

Input under review:
```
Look at these issues and tell me what's important.
{paste}
```

Expected scorecard:
```yaml
scorecard:
  - id: smart_criteria
    score: 0
    evidence: "'tell me what's important' — undefined"
    fix: "define 'important' (e.g. wave-2-impl with no gating tdd)"
  - id: long_input_at_top
    score: 1
    evidence: "input below task line, but only by one line"
    fix: "move {paste} into <issues> block before task"
  - id: xml_load_bearing
    score: 0
    evidence: "no tags at all"
    fix: "wrap input in <issues>, task in <task>, output in <output_contract>"
  - id: examples_present
    score: 0
    evidence: "no examples"
    fix: "add 2-3 example issue-classifications"
  - id: structured_output_for_json
    score: 5
    evidence: "n/a, free-form text task"
    fix: null
  - id: no_prefill
    score: 5
    evidence: "no prefill present"
    fix: null
  - id: tell_not_dont
    score: 3
    evidence: "no negatives, but instructions sparse"
    fix: null
  - id: idk_permission
    score: 0
    evidence: "no permission to abstain"
    fix: "add 'if you cannot determine importance, return null and explain in notes'"
  - id: ground_in_quotes
    score: 5
    evidence: "n/a, short input"
    fix: null
  - id: external_knowledge_fence
    score: 0
    evidence: "no fence; model free to invent context"
    fix: "add 'use only information present in <issues>; do not infer from outside knowledge'"
  - id: latency_aware
    score: 3
    evidence: "no model/effort/max_tokens specified, but task is small"
    fix: null
  - id: max_tokens_safe
    score: 5
    evidence: "n/a, no max_tokens"
    fix: null
  - id: colleague_test
    score: 0
    evidence: "'what's important' is meaningless without context"
    fix: "define classification criteria; provide 1 example"
total: 36
verdict: rewrite
```

## Example B — well-formed extraction prompt (ship_with_diff)

Input under review:
```
<task>Extract contact info from the email below. Return JSON.</task>
<email>{{email_text}}</email>
Output: {"name": ..., "email": ..., "company": ...}
```

Expected scorecard:
```yaml
scorecard:
  - id: smart_criteria
    score: 3
    evidence: "fields defined, but 'company' ambiguous (sender? mentioned?)"
    fix: "disambiguate company: 'sender's employer per signature block'"
  - id: long_input_at_top
    score: 5
    evidence: "<email> precedes output spec"
    fix: null
  - id: xml_load_bearing
    score: 3
    evidence: "uses <task> and <email>, but output spec is loose"
    fix: "wrap output spec in <output_contract>"
  - id: examples_present
    score: 1
    evidence: "no few-shot examples"
    fix: "add 2 example email→json pairs in <examples>"
  - id: structured_output_for_json
    score: 1
    evidence: "asks for JSON via instruction, not output_config.format"
    fix: "use output_config.format with zodOutputFormat() / messages.parse(output_format=Model)"
  - id: no_prefill
    score: 5
    evidence: "no prefill"
    fix: null
  - id: tell_not_dont
    score: 5
    evidence: "all positive instructions"
    fix: null
  - id: idk_permission
    score: 0
    evidence: "no null/missing field handling"
    fix: "add 'if a field is not present in the email, set it to null'"
  - id: ground_in_quotes
    score: 5
    evidence: "n/a, short input"
    fix: null
  - id: external_knowledge_fence
    score: 3
    evidence: "implicit (extraction task) but not stated"
    fix: "add 'use only information in <email>'"
  - id: latency_aware
    score: 3
    evidence: "no max_tokens; extraction is short so OK"
    fix: null
  - id: max_tokens_safe
    score: 5
    evidence: "n/a"
    fix: null
  - id: colleague_test
    score: 3
    evidence: "mostly clear, but company ambiguity + null handling missing"
    fix: "address smart_criteria + idk_permission fixes"
total: 67
verdict: iterate
```

## Example C — production-grade extraction prompt (ship_it)

Input under review:
```python
from pydantic import BaseModel
from typing import Optional
class Contact(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    company: Optional[str] = None  # sender's employer per signature block

SYSTEM = """\
You are an email extraction service.
<output_contract>
Use the Contact schema. If a field is not present, set it to null.
Use ONLY information in <email>. Do not infer from external knowledge.
</output_contract>
<examples>
<example>
<email>Hi, I'm Jane Doe from Acme. jane@acme.com</email>
<output>{"name": "Jane Doe", "email": "jane@acme.com", "company": "Acme"}</output>
</example>
<example>
<email>Just checking in. -Bob</email>
<output>{"name": "Bob", "email": null, "company": null}</output>
</example>
</examples>
"""

resp = client.messages.parse(
    model="claude-haiku-4-5",
    max_tokens=256,
    system=SYSTEM,
    messages=[{"role": "user", "content": f"<email>{raw}</email>"}],
    output_format=Contact,
    output_config={"effort": "low"},
)
```

Expected scorecard: every criterion 3 or 5, total ≥85, verdict `ship_it`. No diff.

## Banding rules of thumb

- **0**: criterion is absent or actively wrong
- **1**: criterion is present in name only, weak execution
- **3**: criterion is satisfied at the level of a competent first draft
- **5**: criterion is satisfied at the level of a production-ready prompt, or genuinely n/a

When in doubt between two adjacent bands, score the LOWER one and write a precise `fix`. Under-scoring is more useful to the user than inflating.
