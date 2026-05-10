---
name: routines
description: >
  Umbrella over /loop and /schedule. Use when the user asks for recurring
  or self-paced work — `/routines run "<expr>"` dispatches to /loop for
  intervals (e.g. "5m") or /schedule for cron-style recurrences (e.g.
  "every Monday 09:00"). One user-facing surface, two implementations.
disable-model-invocation: false
---

# When to invoke

Invoke this skill when:

- The user asks to "run X every Y" or "check Y on a schedule".
- The planner emits a `kind: "routine"` step with a free-form `expr`.
- The user types `/routines run "<expr>"` directly.

# Citations

Sources for the dispatch logic:

- `vendor/anthropics/code.claude.com/docs/en/commands.md` — slash command
  surface and how `/loop` / `/schedule` register.
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/slash-commands.md` —
  programmatic emission of slash commands from the planner.

# Dispatch rules

Parse the `<expr>` argument:

| Pattern                                        | Dispatch                              |
| ---------------------------------------------- | ------------------------------------- |
| `<n>(s\|m\|h\|d)` (e.g. `5m`, `2h`, `1d`)      | `/loop <expr> <command>`              |
| `every <weekday> <HH:MM>` or any cron string   | `/schedule <natural-language-string>` |
| Bare interval with no command (e.g. `30s`)     | `/loop <expr>` (uses `.claude/loop.md` default prompt) |
| Empty / unspecified                            | Ask the user to clarify (do NOT guess) |

# Procedure

1. Read the `<expr>` from the user message or `step.routine.expr`.
2. Determine dispatch per the table above.
3. For `/loop`: emit `/loop <expr> <command>`. Defer to `.claude/loop.md`
   when no command is provided.
4. For `/schedule`: emit `/schedule <description>` and follow the existing
   `.claude/skills/schedule-bridge.md` procedure (routine ID writeback,
   first-run audit).
5. Surface the chosen dispatch path back to the user before emitting the
   slash command, so they can correct an ambiguous expression.

# Examples

```
/routines run "5m npm run verify:freshness"
→ /loop 5m npm run verify:freshness

/routines run "every Monday 09:00 run npm run crawl:vendors"
→ /schedule every Monday 09:00 run npm run crawl:vendors and open a PR with the diff

/routines run "30s"
→ /loop 30s   (uses the default prompt at .claude/loop.md)
```

# Why this skill exists

Operator posture (`seeds/prompts/operator-2026-05-10.md`) calls for a single
user-facing surface unifying interval-based loops with cron-style recurrences.
This skill is that surface; `.claude/loop.md` and
`.claude/skills/schedule-bridge.md` remain the implementations and are not
deprecated.
