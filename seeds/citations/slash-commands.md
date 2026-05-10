---
slug: slash-commands
source: https://code.claude.com/docs/en/agent-sdk/slash-commands.md
local: vendor/anthropics/code.claude.com/docs/en/agent-sdk/slash-commands.md
drives: /routines skill (Phase 0e), src/agent/planning.ts SlashCommand emission
---

# slash-commands — extract

## Header tree

- # Slash Commands in the SDK
  - ## Discovering Available Slash Commands
  - ## Sending Slash Commands
  - ## Common Slash Commands
    - ### `/compact` — Compact Conversation History
    - ### Clearing the conversation
  - ## Creating Custom Slash Commands
    - ### File Locations
    - ### File Format
    - ### Using Custom Commands in the SDK
    - ### Advanced Features
  - ## Context / Task / Changed Files / Detailed Changes / Review Checklist

## Plan-relevant pull quotes

> Slash commands provide a way to control Claude Code sessions with
> special commands that start with `/`. These commands can be sent
> through the SDK to perform actions like compacting context, listing
> context usage, or invoking custom commands. **Only commands that work
> without an interactive terminal are dispatchable through the SDK**;
> the `system/init` message lists the ones available in your session.

> The Claude Agent SDK provides information about available slash
> commands in the system initialization message. Access this
> information when your session starts.

> In addition to using built-in slash commands, you can **create your
> own custom commands** that are available through the SDK. Custom
> commands are defined as markdown files in specific directories,
> similar to how subagents are configured.

## Why this drives Phase 0e

`.claude/skills/routines.md` is exactly the "custom command as markdown
file" pattern this doc describes. The umbrella's dispatch logic
(`/loop` vs `/schedule`) is the kind of programmatic emission the
existing `src/agent/planning.ts` already does for `kind: "schedule"`
plan steps; the routines skill extends that to `kind: "routine"` with
a unified surface. The "discoverable via system/init" property gives
us the audit handle we need for `verify:planner`.
