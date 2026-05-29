# CLAUDE.md and its tiers

Context management is the single biggest lever on Claude Code's effectiveness. Too much irrelevant text *lowers* quality — the goal is "just enough relevant information."

## `/init`

On first run in a project, `/init` analyzes the whole codebase and writes a `CLAUDE.md` summarizing the project, architecture, and key files. That file's contents are then included in every request automatically.

## Three CLAUDE.md tiers (pick deliberately)

- **Project** — shared with the team, committed to source control.
- **Local** — personal instructions, not committed.
- **Machine / global** — applies to all projects on this machine.

## Best practice

Reference critical, always-relevant files (e.g. a database schema) inside CLAUDE.md so they are guaranteed to be in context every turn.
