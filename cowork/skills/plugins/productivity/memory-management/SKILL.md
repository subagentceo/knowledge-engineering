---
name: productivity:memory-management
description: >-
  Read and write heartbeat memory: last-tick decisions, open questions, next-actions.
  Use when: "what did we decide last session", "save this decision", "open questions",
  "update heartbeat", "what's in memory".
coworker_affinity: [pm-coworker]
plugin: productivity
---

<!--
  @cite seeds/memory/heartbeat/               (last-tick, next-actions, decisions, open-questions)
  @cite CLAUDE.md                             (loaded primitives section)
-->

<memory_protocol>
READ:
  Read seeds/memory/heartbeat/last-tick.md     → what previous tick decided
  Read seeds/memory/heartbeat/next-actions.md  → what comes next
  Read seeds/memory/heartbeat/decisions.md     → architectural decisions
  Read seeds/memory/heartbeat/open-questions.md → unresolved questions

WRITE (after each session):
  Append to seeds/memory/heartbeat/last-tick.md:
    ---
    tick: <ISO-8601>
    coworker: <id>
    completed: [<task-subjects>]
    decided: [<decision strings>]
    next: [<next-action strings>]

SEARCH:
  Grep seeds/memory/heartbeat/*.md for keywords → return matching entries with file + line
</memory_protocol>

<heartbeat_invariants>
- last-tick.md is append-only. Never rewrite prior entries.
- Decisions in decisions.md require @cite pointing at rubrics/, vendor/, or seeds/.
- open-questions.md entries must have a due_date or assigned_coworker.
</heartbeat_invariants>
