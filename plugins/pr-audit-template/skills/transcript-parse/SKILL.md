---
name: transcript-parse
description: >
  Read a Claude Code session JSONL transcript and emit a structured
  list of tool calls with start/end timestamps, inputs (redacted), and
  duration. Use when computing throughput metrics for a merged PR — call
  this first, then pass its output to waste-analyze.
license: Apache-2.0
compatibility: Designed for Claude Code 2.x transcripts at ~/.claude/projects/<slug>/<session-id>.jsonl. Schema may shift; verify against the file before reasoning about it.
metadata:
  author: alex-jadecli
  version: "0.1.0"
  outcome: OAUDIT2
---

# When to invoke

- Auditing a merged PR's tool-call efficiency
- Building a heartbeat tick that reports session-level throughput
- Investigating a specific slow tool call retrospectively

# Status

**SCAFFOLD ONLY** — implementation lands in OAUDIT2.

The plugin manifest references this skill so the plugin is loadable, but the actual `transcript-parse` implementation (script + tests) is a follow-up PR. See `../../CLAUDE.md` for the OAUDIT family decomposition.

# Citations

- `~/.claude/projects/-Users-alexzh/<session-id>.jsonl` — live transcript format reference
- `plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md` — outcome + @cite discipline
