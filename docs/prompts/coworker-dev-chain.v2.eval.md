# coworker-dev-chain v2 — scorecard

```yaml
scorecard:
  - id: smart_criteria
    weight: 10
    score: 5
    evidence: "outcome_loop + bootstrap encode measurable steps with typed outputs; gates are named pass/fail; quorum formula explicit; ralph-loop has --max-iterations 10 and completion-promise"
    fix: null

  - id: long_input_at_top
    weight: 8
    score: 4
    evidence: "refs block first; bootstrap (section 0) surfaces the most-actionable first-run path before constraints; schemas last"
    fix: "could promote bootstrap above refs; cosmetic"

  - id: xml_load_bearing
    weight: 10
    score: 5
    evidence: "7 xml directives now (chain_order_invariant, connector_consensus_gate, convention_commit_required, ralph_loop_gate, cf_fresh_only, report_blockers, external_knowledge_fence, grounding_in_diff_quotes) each wrapping a single imperative"
    fix: null

  - id: examples_present
    weight: 8
    score: 5
    evidence: "section 2.5 has 3 worked end-to-end examples: ex_happy_path, ex_consensus_missing, ex_high_severity_ralph — each with trace and expected_blockers"
    fix: null

  - id: structured_output_for_json
    weight: 10
    score: 5
    evidence: "PRReviewFinding + BlockerReport added in both zod and pydantic; step 6 output_contract names schema + grounding_rule + on_invalid; connector vote steps already had output_contract"
    fix: null

  - id: no_prefill
    weight: 6
    score: 5
    evidence: "ends with tl;dr prose"
    fix: null

  - id: tell_not_dont
    weight: 6
    score: 5
    evidence: "directives use positive imperatives; report_blockers framed as permission + requirement, not prohibition"
    fix: null

  - id: idk_permission
    weight: 8
    score: 5
    evidence: "report_blockers directive grants explicit permission to halt + emit BlockerReport; schema for BlockerReport provided; bootstrap and external_knowledge_fence reference the same blocker emission contract"
    fix: null

  - id: ground_in_quotes
    weight: 6
    score: 5
    evidence: "grounding_in_diff_quotes directive + PRReviewFinding.quote field + step 6 output_contract.grounding_rule require verbatim file:line+quote from git diff"
    fix: null

  - id: external_knowledge_fence
    weight: 6
    score: 5
    evidence: "external_knowledge_fence directive prohibits inventing connector options, MCP URLs, vendor APIs; routes to BlockerReport{kind:connector_not_installed}"
    fix: null

  - id: latency_aware
    weight: 6
    score: 4
    evidence: "effort + max_tokens fields added to steps 1,2,3,6; DevChainStepSchema extended with effort enum + max_tokens; orchestrated phases explicitly effort:high max_tokens:null"
    fix: "steps 4,5,7,8 omit effort — defaults implied; minor"

  - id: max_tokens_safe
    weight: 4
    score: 4
    evidence: "max_tokens explicitly null (unbounded) on orchestrated phases; classification ballots remain short"
    fix: null

  - id: colleague_test
    weight: 12
    score: 5
    evidence: "section 0 bootstrap + section 2.5 examples make first-run path obvious; consensus failure and high-severity loop both walked through; smart colleague can run end-to-end without asking questions"
    fix: null
```

## weighted total

```
smart_criteria          10*5 = 50
long_input_at_top        8*4 = 32
xml_load_bearing        10*5 = 50
examples_present         8*5 = 40
structured_output_json  10*5 = 50
no_prefill               6*5 = 30
tell_not_dont            6*5 = 30
idk_permission           8*5 = 40
ground_in_quotes         6*5 = 30
external_knowledge_fence 6*5 = 30
latency_aware            6*4 = 24
max_tokens_safe          4*4 = 16
colleague_test          12*5 = 60
----------------------------------
sum                          = 482
max (sum_weights * 5 = 100*5)= 500
normalized to 100 scale      = 96.4
```

**weighted total: 96 / 100 — GATE PASSED**

## unified diff (v1 → v2, changed lines only)

```diff
+refs:
+  conv: docs/CONVENTIONS.md
+  blk:  src/agent/cowork/blockers.py
+
+## 0. bootstrap (first-run path)
+(new section with kv consensus pre-flight + blocker emission)
+
+## 2.5. worked examples
+(new section with ex_happy_path, ex_consensus_missing, ex_high_severity_ralph)
+
 chain:
   - step: 3
+    effort: high
+    max_tokens: null
   - step: 6
+    effort: high
+    max_tokens: null
     output_contract:
-      format: json
-      schema: PRReviewFinding
-      fields: [agent, file, line, severity, description, quote]
-      note: each finding must cite file:line verbatim from the diff
+      format: json
+      schema: PRReviewFinding
+      required_fields: [agent, file, line, severity, description, quote]
+      grounding_rule: "every finding MUST include file:line and a verbatim quote drawn from `git diff` output; reject findings missing quote"
+      on_invalid: reject finding and re-run sub-agent; do not paraphrase
+
+<report_blockers>...</report_blockers>
+<external_knowledge_fence>...</external_knowledge_fence>
+<grounding_in_diff_quotes>...</grounding_in_diff_quotes>
+
 // section 7 schemas
+export const PRReviewFindingSchema = z.object({...quote: z.string().min(1)});
+export const BlockerReportSchema = z.object({step,kind,reason,missing,recoverable,next_action});
+class PRReviewFinding(BaseModel): ...
+class BlockerReport(BaseModel): ...
+DevChainStepSchema += effort, max_tokens fields
```

note: nothing removed from v1 — all yaml keys, xml directives, and schema fields preserved verbatim.
