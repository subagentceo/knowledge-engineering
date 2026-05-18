---
name: pr-audit-body
description: >
  Given a ranked-findings list from waste-analyze, render a standardized
  PR follow-up body + N issue bodies (default 3) using a handlebars-style
  template. Each issue is actionable — names the wasteful pattern,
  quantifies impact, and suggests a concrete fix or workflow change.
license: Apache-2.0
compatibility: Final consumer in the audit chain. Output is markdown ready for `gh pr create --body-file` and `gh issue create --body-file`.
metadata:
  author: alex-jadecli
  version: "0.1.0"
  outcome: OAUDIT4
---

# When to invoke

- After waste-analyze produces ranked findings for a merged PR
- Operator wants the per-PR follow-up audit emitted as a real PR + issues

# Status

**SCAFFOLD ONLY** — implementation lands in OAUDIT4.

# Standardized template (planned)

## PR body

```markdown
# Audit follow-up: PR #<merged-pr>

**Session ID:** <session-uuid>
**Merged at:** <iso-timestamp>
**Total tool calls during PR work:** <count>
**Total wall-clock minutes:** <duration>
**Throughput:** <calls/min>

## Top <N> findings

[N rows from waste-analyze ranked output]

## Linked issues

- <#issue-1> — <finding-1 title>
- <#issue-2> — <finding-2 title>
- <#issue-3> — <finding-3 title>

## Next iteration

[Concrete proposal: workflow change / new skill / lint rule / etc.]
```

## Issue body (per finding)

```markdown
# <finding title>

**Source PR:** #<merged-pr>
**Pattern:** <heuristic name from waste-analyze>
**Impact score:** <score>
**Wasted tool calls:** <count>
**Wasted seconds:** <seconds>

## Evidence

[Specific call signatures + timestamps from transcript-parse]

## Proposed fix

[Concrete change — usually a hook, lint, or skill update]
```

# Citations

- `plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md`
