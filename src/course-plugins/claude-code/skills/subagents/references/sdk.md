# Launching instances — the Claude Code SDK

A programmatic interface to Claude Code via **CLI, TypeScript, or Python** with the *same tools* as the terminal version. Used to launch the secondary instances behind subagent patterns (review loops, the duplicate-code hook).

- **Default permissions are read-only** (read files/dirs, grep).
- **Add write capability** by listing tools (e.g. `"edit"`) in the query's `allowTools` array, or via `.claude/` settings.
- SDK output shows the raw message-by-message conversation between local Claude Code and the model; the **final message is Claude's answer**.
- Best for helper commands, scripts, and hooks inside existing projects rather than standalone use.
