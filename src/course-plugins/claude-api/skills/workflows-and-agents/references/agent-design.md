# Agent design and worked examples

## Agent design

Agents create plans and combine tools in unexpected ways. The key principle is **abstract tools over specialized ones**: Claude Code uses `bash`, `web_fetch`, `file_write` (generic, composable) rather than `refactor_tool` or `install_dependencies` (single-purpose). A small set of flexible tools (e.g. `get_current_datetime` + `add_duration` + `set_reminder`) can be pieced together to solve many tasks. Agents can request more info when needed.

**Environment inspection:** after each action, agents need feedback beyond the raw tool return to understand the new state. Computer use takes a screenshot after every action since it can't predict a click's result; code editing reads the file before modifying it; a video agent uses Whisper.cpp via bash to verify caption placement and FFmpeg to extract frames and inspect visual results. Inspection lets agents gauge progress, detect errors, and adapt instead of acting blindly.

## Worked examples from the course

- **Computer use** — Claude interacts with interfaces via screenshots + control actions (click, type, navigate) in an isolated Docker container; same tool-use flow as any tool (a small schema expands to actions like mouse-move, left-click, screenshot). Anthropic ships a reference Docker implementation. Good for automated QA/UI testing.
- **Automated debugging** — a daily GitHub Action pulls 24h of CloudWatch logs, Claude Code dedupes errors, analyzes each, generates fixes, and opens a PR. Catches production-only errors (e.g. invalid model IDs between environments).
