# coworker-dev-chain — structured-prompt-evaluator scorecard

Prompt under review: `docs/prompts/coworker-dev-chain.md`
Rubric: `.claude/skills/structured-prompt-evaluator/SKILL.md` (12 criteria, weights total 100)
Scores: 0/1/3/5 only.

## scorecard

```yaml
scorecard:
  - id: smart_criteria
    weight: 10
    score: 5
    evidence: "outcome_loop yaml encodes measurable steps with typed outputs; gates are named pass/fail conditions; connector consensus has a quorum formula; ralph-loop has --max-iterations 10 and --completion-promise 'ALL CHECKS PASS'"
    fix: null

  - id: long_input_at_top
    weight: 8
    score: 3
    evidence: "runtime constraints + hierarchy sections appear before the chain definition, which is correct; schemas appear last which is correct; refs block is at the very top"
    fix: "the outcome_loop (section 6) appears after connectors (section 4) and CF resources (section 5) — it could be earlier since it's the summary readers want first; low priority"

  - id: xml_load_bearing
    weight: 10
    score: 5
    evidence: "5 xml directives: chain_order_invariant, connector_consensus_gate, convention_commit_required, ralph_loop_gate, cf_fresh_only — each wraps a single, addressable, imperative constraint; tag names are snake_case and unambiguous"
    fix: null

  - id: examples_present
    weight: 8
    score: 3
    evidence: "the 8-step chain yaml block is a worked example of the full chain; connector_categories yaml shows a concrete quorum formula; commit convention shows an example string"
    fix: "no <examples> block with 2-3 concrete end-to-end invocation scenarios (e.g. 'given PR #42 has a silent-failure finding, steps 6→8 execute as follows'); adding this would raise to 5"

  - id: structured_output_for_json
    weight: 10
    score: 3
    evidence: "DevChainStep + ConnectorCategory + CoworkerConsensusBallot schemas present in both zod and pydantic; schema shapes are well-typed with discriminated enums"
    fix: "the prompt does not specify output_config.format or zodOutputFormat() for any runtime call; schemas describe the data contract but don't wire it to a structured output call — add output_contract directive or note which steps use structured outputs vs prose"

  - id: no_prefill
    weight: 6
    score: 5
    evidence: "no assistant-turn prefill anywhere; prompt ends with tl;dr prose block"
    fix: null

  - id: tell_not_dont
    weight: 6
    score: 5
    evidence: "all directives are positive imperatives ('verify absence before creating', 'write votes to CF KV', 'only invoke ralph-loop when...'); no 'do not' phrasing in load-bearing positions"
    fix: null

  - id: idk_permission
    weight: 8
    score: 1
    evidence: "no explicit permission for the coworker to report 'unable to complete step N due to missing connector vote' or 'consensus not reached'; the connector_consensus_gate directive blocks but doesn't specify what to emit"
    fix: "add a <report_blockers> directive: 'when a gate or consensus check cannot pass, emit a structured blocker report: {step, reason, missing_votes[]} and halt — do not attempt to proceed past a hard gate'"

  - id: ground_in_quotes
    weight: 6
    score: 3
    evidence: "refs block cites all source files; inline (refs: alias) citations on every chain step; tl;dr cites parity reference vs runtime distinction"
    fix: "for the code-review and pr-review sub-agents, the prompt doesn't require quoting the specific file+line evidence for each finding — add 'cite file:line for every finding' to the pr_review step"

  - id: external_knowledge_fence
    weight: 6
    score: 3
    evidence: "runtime constraints section explicitly states managed-agents API is 'schema specification only — not a dependency on Anthropic's hosted platform'; OAuth-only constraint stated"
    fix: "no explicit fence for the coworker not inventing connector options — if a category has no installed MCP server, the coworker should say so rather than inferring one; add fence directive"

  - id: latency_aware
    weight: 6
    score: 3
    evidence: "model: claude-opus-4-7 named explicitly; ralph-loop has --max-iterations 10; feature-dev sub-agent counts (2-3 per phase) keep parallelism bounded"
    fix: "no max_tokens guidance for the code-review step; no effort level set on the orchestrator; adding effort: high + max_tokens: null (unbounded) for the orchestrated phases would make the latency contract explicit"

  - id: max_tokens_safe
    weight: 4
    score: 3
    evidence: "no truncation risk — prompt does not set max_tokens on prose-heavy steps; classification steps (connector vote) are short-answer"
    fix: null

  - id: colleague_test
    weight: 12
    score: 3
    evidence: "a smart colleague can follow the 8-step chain, the connector consensus logic, and the CF provisioning order; the runtime constraint section is clear about what is self-hosted vs spec-only; the outcome_loop provides the execution order"
    fix: "missing: what happens when a user runs /feature-dev for the first time with no connectors provisioned — the chain has no 'first-run setup' path; add a bootstrap section describing how to check for missing votes and prompt the user to provision connectors before starting step 3"
```

## weighted total

```
score = sum(score_i × weight_i) / (max_score_per_criterion × total_weight) × 100
      = (5×10 + 3×8 + 5×10 + 3×8 + 3×10 + 5×6 + 5×6 + 1×8 + 3×6 + 3×6 + 3×6 + 3×4 + 3×12)
        / (5 × 100) × 100
      = (50+24+50+24+30+30+30+8+18+18+18+12+36) / 500 × 100
      = 348 / 500 × 100
      = 70

verdict: ship_with_diff
```

## priority fixes (unified diff targets)

Three issues that most affect the score, in order of impact:

**fix 1 — idk_permission (raises score +8 → band shift if combined with fix 2)**

Add after the `<cf_fresh_only>` directive:

```diff
+<report_blockers>
+When any gate, consensus check, or CF resource verification cannot pass, emit a structured
+blocker report and halt. Format: {step: N, gate: "<name>", reason: "<why blocked>",
+missing_votes: ["<coworker_id>", ...], action_required: "<what user must do>"}.
+Do not attempt to advance past a hard gate by assumption.
+</report_blockers>
```

**fix 2 — examples_present (raises score from 3→5, +16 weighted points)**

Add a section 2.5 before the directives:

```diff
+## 2.5. example invocations
+
+```yaml
+examples:
+  - scenario: first-run, no connectors provisioned
+    input: /feature-dev "add SSE streaming to CoworkerSession"
+    step_1_result: security hook registered
+    step_2_result: sourcekit-lsp attached (swift build succeeds)
+    step_3_blocker: project_tracker connector not provisioned; emit blocker report
+    expected: halt at step 3; prompt user to vote on project_tracker in kv-coworker-votes
+
+  - scenario: all connectors approved, severity-high pr-review finding
+    input: /review-pr (after /commit)
+    step_6_result: silent-failure-hunter returns severity:high on ManagedAgentsClient.swift:42
+    step_8_trigger: ralph-loop fires; max-iterations 10; completion-promise "ALL CHECKS PASS"
+    expected: ralph iterates; sourcekit-lsp go-to-def used to locate fix; step 5→6 repeats
+
+  - scenario: commit without convention suffix rejected
+    input: /commit (message "add streaming support")
+    expected: pre-commit hook rejects; prompt for (O<N>) suffix; retry
+```
```

**fix 3 — structured_output_for_json (output_contract for connector vote step)**

Add to section 4 after the consensus note:

```diff
+    output_contract:
+      format: json
+      schema: CoworkerConsensusBallot   # pydantic/zod schema from section 7
+      on_invalid: reject and re-prompt; do not guess vote value
```
