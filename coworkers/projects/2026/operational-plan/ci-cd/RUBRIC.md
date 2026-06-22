# Skill gate — improved rubric (owner: operator, orchestrator: this session)

Composes the durable CI/CD gate (`durable-agent-ci-cd-rubrics` → `-evals` → `-outcomes`) with the
structured-prompt skills:

- **`structured-prompt-formatter`** — normalize each `SKILL.md` before scoring (frontmatter, sections).
- **`structured-prompt-evaluator`** — score the prompt on its 12-criterion rubric (0–5 each).
- **`structured-prompt-resume`** — recover/re-orient if a scan is interrupted (resume from `grades.jsonl`).

## Hard gates (a fail here = BLOCK, no score)

1. **No XML in `SKILL.md`.** Neither the frontmatter `description` nor the body may contain angle-bracket
   tags (`<...>`). Use bracket-free placeholders (e.g. `FN`, `FUNCTION`). *(This is the gate that caught the
   first cut of `durable-*-crud`.)*
2. **Frontmatter parses** with `name`, `description`, `model`.
3. **Outcome contract present** — the skill names an evaluator/outcome the manager can gate on.

## Scored dimensions (0–5; pass = ≥3 each, weighted total ≥ 3.5)

| dim | from | asks |
|-----|------|------|
| type-safety | durable | typed I/O / schema-backed |
| durability | durable | JSONL/e2m-backed, resumable |
| agent-reuse | durable | reuses skills/plugins, doesn't reinvent |
| packaging | durable | installable (.skill / .mcpb), frontmatter clean |
| triggering | structured-prompt-evaluator | description has concrete trigger phrases |
| determinism | structured-prompt-evaluator | steps are ordered + reproducible |
| io_contract | structured-prompt-evaluator | inputs/outputs explicit |
| traceability | structured-prompt-evaluator | cites sources |

## Verdict (outcomes)

`pass` (all hard gates + weighted ≥ 3.5) · `advisory` (passes hard gates, 3.0–3.5) · `block` (any hard gate
fails or weighted < 3.0). A `block` writes a DurableTask to the engineering queue with the gap list.
