---
name: adding-context
description: Seed and curate the context Claude Code works from — run /init to generate a CLAUDE.md, choose the right CLAUDE.md tier (project / local / machine), use the # memory shortcut to edit those files in natural language, and use @ to inject specific files. Trigger when starting work in a new codebase, when Claude keeps missing project conventions, or when you want to point Claude at a specific file (schema, config) instead of letting it search.
---

# Adding context

> Distilled from the *Claude Code in Action* course. Grounded in `src/commands/init.ts` and `src/commands/memory`.

Context management is the single biggest lever on Claude Code's effectiveness. Too much irrelevant text *lowers* quality — the goal is "just enough relevant information."

## Quick reference

- **`/init`** — analyze the codebase and write a `CLAUDE.md` that is then included in every request.
- **Tiers** — Project (committed), Local (personal, uncommitted), Machine/global (all projects).
- **`#`** — start a request with `#` to have Claude edit the right CLAUDE.md in natural language.
- **`@path`** — inject that exact file as targeted context instead of letting Claude search.

## Going deeper

- `/init`, the three CLAUDE.md tiers, and the best practice of referencing always-relevant files: see [CLAUDE.md and its tiers](references/claude-md-tiers.md).
- The `#` memory shortcut and `@` file mention in detail: see [injecting context](references/memory-and-mentions.md).

## Grounded in src/
- `src/commands/init.ts` — implements the `/init` command that scans the codebase and generates CLAUDE.md.
- `src/commands/memory` — backs the memory/`#` editing of CLAUDE.md files.
- `src/utils/markdownConfigLoader.ts` — loads the CLAUDE.md / markdown config that becomes per-request context.

## Source
Course note(s): "Adding Context" — projects/courses/claude-code-in-action__claudecode.txt
