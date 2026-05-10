---
name: schedule-bridge
description: >
  Translate plan steps with kind="schedule" into /schedule slash commands.
  Use when work must outlive the current session (daily docs refresh,
  weekly verifier sweep, one-shot reminders).
disable-model-invocation: false
---

# When to invoke

Invoke this skill when the planner emits a `kind: "schedule"` step OR
when the user asks for recurring / cloud-managed work.

# Procedure

1. Read `step.schedule.description`.
2. Run `/schedule <description>` and let Claude walk through routine setup.
3. On confirmation, write the routine ID back into the plan step's
   `metadata.routineId` so the verifier can audit it.
4. Mark the step `completed` only after the routine reports a
   successful first run (or, for one-shot routines, after scheduling
   confirmation).
