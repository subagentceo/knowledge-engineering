---
name: custom-slash-commands
description: Automate repetitive Claude Code tasks by defining your own /commands as markdown files in .claude/commands/ — the filename becomes the command name, the file body is the instructions, and $ARGUMENTS injects runtime parameters. Trigger when you keep retyping the same multi-step prompt (dependency audits, test generation, vulnerability fixes) and want it as a reusable command.
---

# Custom slash commands

> Distilled from the *Claude Code in Action* course. Grounded in `src/commands/` and `src/utils/markdownConfigLoader.ts`.

Custom commands are user-defined automations invoked with a forward slash and backed by a markdown file.

## Quick reference

- **Where:** `.claude/commands/` in the project.
- **Name:** filename = command name (`audit.md` → `/audit`).
- **Body:** the file body is the instructions Claude runs.
- **Args:** `$ARGUMENTS` injects the runtime parameter string.
- **Activate:** restart Claude Code after adding a command file.
- **Run:** `/commandname [args]`.

## Going deeper

- Full anatomy and typical use cases (dependency audits, test generation, vulnerability fixes): see [command anatomy](references/command-anatomy.md).
- Sample command to copy into `.claude/commands/`: [`scripts/audit.md`](scripts/audit.md).

## Grounded in src/
- `src/commands/` — the command registry where built-in and user commands surface (e.g. `commit.ts`, `init.ts`).
- `src/utils/markdownConfigLoader.ts`, `src/utils/frontmatterParser.ts` — load markdown command files (body + frontmatter) from the project's `.claude/` directory.

## Source
Course note(s): "Custom Commands" — projects/courses/claude-code-in-action__claudecode.txt
