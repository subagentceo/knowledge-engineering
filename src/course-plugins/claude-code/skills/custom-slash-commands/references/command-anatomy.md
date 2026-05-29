# Custom slash command anatomy

Custom commands are user-defined automations invoked with a forward slash.

- **Location:** the `.claude/commands/` folder in the project directory.
- **Naming:** the filename becomes the command name — `audit.md` creates `/audit`.
- **Structure:** the markdown file body is the instructions Claude executes when the command runs.
- **Arguments:** use the `$ARGUMENTS` placeholder in the command text to accept a runtime parameter string (file paths, descriptive text — any string).
- **Activation:** restart Claude Code after creating new command files so they're picked up.
- **Run:** type `/commandname` in the interface, optionally followed by the argument string.

Typical use cases: dependency auditing, test generation, and routine vulnerability fixes.

A runnable sample command is in [`scripts/audit.md`](../scripts/audit.md) — drop it into `.claude/commands/` to get `/audit`.
