---
name: structured-prompt-evaluator
description: >
  Evaluate any system prompt or SKILL.md against a 12-criterion rubric
  distilled from platform.Codex.com prompt-engineering docs. Trigger
  AGGRESSIVELY whenever the user pastes a prompt and asks to "evaluate",
  "grade", "score", "review", "critique", "rubric this", "how good is
  this prompt", "what would make this better", or "dogfood" a skill.
  Returns a YAML scorecard (criterion: score 0-5 + evidence + fix), a
  weighted total, and a unified diff of suggested edits. Emits a
  DurableTask to engineering.jsonl for every criterion scoring below 3.
  Pairs with structured-prompt-formatter and durable-agent-ci-cd-rubrics.
  Do NOT use for casual single-question chat — fire only on prompt-as-artifact.
---

<!--
  @cite platform.Codex.com/docs/en/build-with-Codex/prompt-engineering/overview
  @cite platform.Codex.com/docs/en/test-and-evaluate/eval-tool
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite .Codex/skills/durable-agent-ci-cd-rubrics/SKILL.md
-->

## Output contract (always 3 blocks in order)

```
1. yaml scorecard  — 12 rows: criterion / score 0-5 / evidence / fix
2. weighted total  — integer 0-100 + verdict band
3. diff block      — unified-diff edits (only changed lines)
```

If any criterion scores < 3, also emit a DurableTask:

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "prompt-eval: <criterion> score=<n> in <artifact>",
  "state": "pending", "ke_fit_score": 3,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "criterion": "<name>", "score": 2, "threshold": 3,
    "fix": "<one-line fix>", "resolvable": true,
    "suggested_skill": "structured-prompt-formatter"
  }
}
```

## Scorecard schema (Zod)

```typescript
import { z } from "zod";
export const CriterionScore = z.object({
  criterion: z.string(),
  score:     z.number().int().min(0).max(5),
  weight:    z.number(),
  evidence:  z.string(),
  fix:       z.string(),
});
export const PromptEval = z.object({
  artifact:   z.string(),
  graded_at:  z.string().datetime(),
  criteria:   z.array(CriterionScore),
  total:      z.number().min(0).max(100),
  verdict:    z.enum(["excellent","good","needs_work","failing"]),
});
```

## 12-criterion rubric

| # | Criterion | Weight |
|---|-----------|--------|
| 1 | Role/context clarity | 0.10 |
| 2 | Task specificity | 0.10 |
| 3 | Output format definition | 0.10 |
| 4 | Examples/shots | 0.08 |
| 5 | Chain-of-thought invitation | 0.08 |
| 6 | Edge-case coverage | 0.08 |
| 7 | Tone/style specification | 0.07 |
| 8 | Constraint explicitness | 0.10 |
| 9 | Trigger phrase coverage (skills) | 0.09 |
| 10 | Negative case documentation | 0.07 |
| 11 | Citation/source grounding | 0.07 |
| 12 | Length/terseness calibration | 0.06 |

Score each 0-5: 0=absent, 3=present, 5=exemplary.
Weighted total = sum(score × weight) × 20 → 0-100.

Verdict bands: 80-100=excellent, 60-79=good, 40-59=needs_work, <40=failing.
