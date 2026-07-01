---
name: eval-tool
description: >
  Run Anthropic Console Workbench evaluations: generate prompts, create test
  cases, compare prompt versions, grade outputs with typed graders, and iterate
  via the Prompt Improver. Use whenever the user wants to evaluate a prompt,
  set up an eval suite, grade responses, A/B test system prompts, or asks
  "is prompt v2 better than v1", "eval my prompt", "write a grader for X",
  "set up an eval suite", "test these prompts". Emits a DurableTask to
  engineering.jsonl for each failing grader. Pairs with
  structured-prompt-evaluator (local rubric) and durable-agent-ci-cd-evals
  (skill-level gate). Do NOT use for casual completion requests.
---

<!--
  @cite platform.Codex.com/docs/en/test-and-evaluate/eval-tool.md
  @cite platform.Codex.com/docs/en/build-with-Codex/prompt-engineering/overview.md
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
-->

## Two paths

| Path | Use for | Surface |
|------|---------|---------|
| Console | Fast iteration, 5-30 cases, visual side-by-side | platform.Codex.com → Workbench → Evaluate |
| Programmatic | CI gates, multi-trial variance, regression | Python `scripts/run_eval.py` |

## Grader schema (Zod)

```typescript
import { z } from "zod";
export const GraderResult = z.object({
  eval_id:    z.string(),
  prompt_v:   z.string(),
  case_id:    z.string(),
  grader:     z.enum(["exact_match","llm_judge","regex_present","numeric_tolerance","set_match"]),
  passed:     z.boolean(),
  score:      z.number().min(0).max(1),
  evidence:   z.string(),
  graded_at:  z.string().datetime(),
});
export const EvalRun = z.object({
  eval_id:     z.string(),
  prompt_v:    z.string(),
  pass_rate:   z.number().min(0).max(1),
  cases:       z.array(GraderResult),
  run_at:      z.string().datetime(),
});
export type EvalRun = z.infer<typeof EvalRun>;
```

## Failure → DurableTask

When a grader fails with `pass_rate < 0.8`:

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "eval-tool: <prompt_v> pass_rate=<n> on grader=<grader>",
  "state": "pending", "ke_fit_score": 3,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "eval_id": "<id>", "prompt_v": "<v>", "pass_rate": 0.6,
    "grader": "llm_judge", "resolvable": true,
    "suggested_skill": "structured-prompt-evaluator"
  }
}
```

## Console flow (4 steps)

1. Open Workbench → Evaluate tab → "Generate Prompt" with task description.
2. "Generate Test Cases" (min 5, diverse edge cases).
3. Pick graders: `exact_match` for deterministic, `llm_judge` for quality.
4. "Prompt Improver" on failing cases → compare v1 vs v2 side-by-side.
