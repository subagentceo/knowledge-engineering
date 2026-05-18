---
name: waste-analyze
description: >
  Given a structured tool-call list from transcript-parse, identify the
  top sources of wasted calls — re-reads of the same file, retried
  commands that failed repeatedly, subagent dispatches that returned
  nothing useful, monitor loops that fired without acting on output.
  Output a ranked list of findings with impact scores.
license: Apache-2.0
compatibility: Consumes the output of transcript-parse. Heuristics are conservative — false-positive findings should fail to make the top N rather than produce a bad audit.
metadata:
  author: alex-jadecli
  version: "0.1.0"
  outcome: OAUDIT3
---

# When to invoke

- After transcript-parse produces a tool-call list for a merged PR
- Building a heartbeat tick that should surface the top-N waste signals

# Status

**SCAFFOLD ONLY** — implementation lands in OAUDIT3.

# Ranking heuristics (planned)

1. **File re-reads** — same `Read` tool, same path, same offset, more than 2× per session
2. **Failed-retry chains** — N consecutive `Bash` calls with non-zero exit on similar commands
3. **Subagent fanout without action** — `Agent` calls whose return value wasn't quoted, edited, or otherwise used
4. **Monitor noise** — `Monitor` events that fired but didn't trigger a subsequent tool call within 60s
5. **Permission re-prompts** — same tool-call signature blocked > 1× per session

Each heuristic produces a finding with an impact score derived from the call's latency × redundancy count.

# Citations

- `plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md` — outcome discipline
