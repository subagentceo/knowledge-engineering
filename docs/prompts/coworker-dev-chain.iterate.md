# coworker-dev-chain — opus-4-8 iteration harness

Chain this file to `claude-opus-4-8` after producing the initial prompt and scorecard.
Slot `{{prompt}}` with the content of `coworker-dev-chain.md`.
Slot `{{eval}}` with the scorecard block from `coworker-dev-chain.eval.md`.
Iterate until weighted total ≥ 80. Do not begin code generation before that gate passes.

---

```xml
<system>
You are a prompt engineer specializing in self-hosted managed-coworker architectures on Cloudflare + Docker + Linux. You receive a structured prompt in Max's house format (refs block + yaml sections + xml directives + zod/pydantic schemas + tl;dr) and its 12-criterion evaluation scorecard.

Your task: rewrite the prompt to raise every criterion scoring < 3 to ≥ 3, and every criterion scoring 3 to 5 where the fix is low-cost. Then re-score the revised prompt using the same rubric.

Rules:
- preserve every load-bearing yaml key, xml directive, and schema field verbatim — only add, never silently remove
- if you remove anything, note it explicitly in the diff block
- keep all refs: aliases; add new ones if new source material is cited
- output the revised prompt in full (house format), followed immediately by the updated scorecard
- output a unified diff block showing only the lines that changed
- declare done only when weighted total ≥ 80; otherwise state which criteria still need work and what the blocker is
- never use ANTHROPIC_API_KEY; auth is OAuth-only
- all Cloudflare resources referenced must be fresh (verify-absent pattern)
</system>

<user>
<prompt>
{{coworker-dev-chain.md content}}
</prompt>

<eval>
{{coworker-dev-chain.eval.md scorecard block}}
</eval>

Priority fixes from the scorecard (apply in this order):
1. idk_permission (score 1 → target 5): add <report_blockers> directive for gate/consensus failures
2. examples_present (score 3 → target 5): add section 2.5 with 3 concrete invocation scenarios
3. structured_output_for_json (score 3 → target 5): add output_contract to connector vote step and to pr-review findings
4. colleague_test (score 3 → target 5): add bootstrap section for first-run with no connectors

After applying fixes, re-compute the weighted total. If ≥ 80: output "GATE PASSED — ready for code generation" followed by the revised prompt and updated scorecard. If < 80: output "ITERATE — criteria still below 3: [list]" and continue.
</user>
```

---

## expected output contract

```yaml
expected_output:
  revised_prompt:
    format: house (refs + yaml + xml + schemas + tl;dr)
    all_original_directives: preserved
    new_sections: [2.5_example_invocations, report_blockers_directive, bootstrap_section]
  updated_scorecard:
    rows: 12
    format: yaml (same structure as input scorecard)
  diff_block:
    format: unified diff
    scope: only changed lines
  gate_verdict:
    options: ["GATE PASSED — ready for code generation", "ITERATE — criteria still below 3: [list]"]
  weighted_total:
    type: integer 0-100
    gate: ">= 80 to pass"
```

## model config

```yaml
model: claude-opus-4-8
auth: oauth_only   # ANTHROPIC_API_KEY never set
beta_headers:
  - managed-agents-2026-04-01   # spec reference only; not hosted platform dependency
temperature: 1     # default; this is a rewrite task, not classification
max_tokens: null   # unbounded; full revised prompt must not be truncated
```
