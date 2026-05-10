---
slug: commands
source: https://code.claude.com/docs/en/commands.md
local: vendor/anthropics/code.claude.com/docs/en/commands.md
drives: /routines skill (Phase 0e)
---

# commands — extract

## Header tree

- # Commands
  - ## Commands across a typical workflow
  - ## All commands
  - ## MCP prompts
  - ## See also

## Plan-relevant pull quotes

> `/loop [interval] [prompt]` — **[Skill]**. Run a prompt repeatedly
> while the session stays open. Omit the interval and Claude self-paces
> between iterations. Omit the prompt and Claude runs an autonomous
> maintenance check, or the prompt in `.claude/loop.md` if present.
> Example: `/loop 5m check if the deploy finished`. … Alias:
> `/proactive`.

> `/schedule [description]` — Create, update, list, or run [routines],
> which execute on **Anthropic-managed cloud infrastructure**. Claude
> walks you through the setup conversationally. Alias: `/routines`.

> `/web-setup` — Connect your GitHub account to [Claude Code on the
> web] using your local `gh` CLI credentials. **`/schedule` prompts for
> this automatically if GitHub isn't connected**.

## Why this drives Phase 0e

The `/routines` umbrella in `.claude/skills/routines.md` dispatches to
`/loop` (interval) or `/schedule` (cron-style recurrence) based on the
parsed expression. The cited doc confirms `/routines` is already a
documented alias of `/schedule`; our umbrella extends the alias to also
cover `/loop` so the user has one verb. The cited doc also confirms
`/schedule` runs on Anthropic-managed cloud infrastructure — relevant
to the long-arc Workers-resident goal.
