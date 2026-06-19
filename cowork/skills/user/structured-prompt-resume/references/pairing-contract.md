# structured-prompt-resume — reference

## Interrupt signals (trigger table)

| signal | where it appears | action |
|---|---|---|
| `[SAFELY_RESUME]` | user message | fire skill, parse resume_state from conversation |
| `SAFELY_RESUME` (bare) | user message | same |
| HTML comment `<!-- SAFELY_RESUME: ... -->` | trailing output | parse `InterruptMarker`, reconstruct `ResumeState` |
| `stop_reason: max_tokens` | API harness | emit interrupt marker before halting |
| STATUS.md contains `interrupted` | plan-file surface | resume from `blocked_on` |
| `iter_count >= iter_max` | loop counter | emit `max_iterations_reached` + final fallback |

## Pairing contract with structured-prompt-formatter

On resume completion, if the final artifact is prose or code:
1. Call `/structured-prompt-formatter` → serialise to house format
2. Feed result to `/structured-prompt-evaluator`

If the artifact is already in house format (YAML refs + XML directives + schema):
Skip formatter; go directly to evaluator.

## Pairing contract with structured-prompt-evaluator

Evaluator is always called on the final completed artifact.
Pass the full artifact text. Append the evaluator scorecard
(YAML scorecard + weighted total + diff) to the conversation output.

## Citation invariant on resume

```
resumed_payload.citations.length >= resume_state.citations_carried
```

Citations must not be dropped across an interrupt boundary. If the
resumed artifact cannot recover citations from context, surface a warning:

```yaml
citations_warning: "N citations from prior run not recoverable from context; re-inject manually"
```

## Status file append format

Every iteration appends one line to PLAN.md or ITER.md:

```
iter=<n> status=<terminal_state> stopped_at=<atomic_unit> citations=<count> ts=<iso8601>
```

Example:
```
iter=2 status=needs_revision stopped_at=rung-4-schemaRef citations=3 ts=2026-06-04T14:22:11Z
```

## Eval tail scoring guide

| id | 0 | 1 | 3 | 5 |
|---|---|---|---|---|
| context_recovered | nothing recovered | artifact title only | artifact + rung + status | full state + plan file |
| citations_preserved | citations dropped | partial | all carried forward | all + sidecar intact |
| loop_position_correct | wrong rung | off by one | correct rung | correct + iter count |
| no_restart | restarted from scratch | re-ran completed rungs | resumed correctly | resumed + no duplication |
| evaluator_re_run | not run | run but scorecard not shown | scorecard shown | scorecard + diff shown |

## Source citations

- Anthropic Outcomes API terminal states: https://platform.claude.com/docs/en/managed-agents/define-outcomes
- Ralph loop interrupt/plan-file pattern: https://ghuntley.com/ralph/
- Self-service analytics correction-harvesting loop: https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude
- structured-prompt-formatter: .claude/skills/structured-prompt-formatter/SKILL.md
- structured-prompt-evaluator: .claude/skills/structured-prompt-evaluator/SKILL.md
