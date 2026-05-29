---
name: context-control
description: Keep the conversation focused as it grows — interrupt with Escape to redirect mid-response, Escape-then-# to record a recurring mistake as memory, double-Escape to rewind to an earlier message, /compact to summarize history while keeping learned task knowledge, and /clear to wipe history for an unrelated task. Trigger in long sessions, when Claude is going the wrong direction, repeating an error, or when you switch tasks.
---

# Context control

> Distilled from the *Claude Code in Action* course. Grounded in `src/commands/compact` and `src/commands/clear`.

Long conversations accumulate clutter that distracts Claude. Use these controls to maintain focus and preserve only the relevant knowledge.

- **Escape (once)** — Interrupt Claude mid-response to redirect the flow.
- **Escape + memory (`#`)** — Powerful error prevention: stop Claude, then add a memory with `#` about a repeated mistake so it doesn't happen again.
- **Double Escape** — Rewind the conversation. Shows previous messages and lets you jump back to an earlier point, keeping the relevant context and skipping the irrelevant debugging back-and-forth.
- **`/compact`** — Summarizes the entire conversation history while preserving what Claude has learned about the current task. Use when Claude has gained useful expertise but the transcript is cluttered.
- **`/clear`** — Deletes the whole conversation for a fresh start. Use when switching to a completely unrelated task.

Rule of thumb: `/compact` keeps task knowledge, `/clear` discards everything; reach for double-Escape when you only need to drop a recent detour.

## Grounded in src/
- `src/commands/compact` — implements `/compact` (summarize-and-preserve).
- `src/commands/clear` — implements `/clear` (fresh start).
- `src/commands/memory` — backs the `#` memory used in the Escape+memory move.
- `src/hooks/useCancelRequest.ts`, `src/hooks/useDoublePress.ts` — interrupt (Escape) and double-press (double-Escape rewind) handling.

## Source
Course note(s): "Controlling Context" — projects/courses/claude-code-in-action__claudecode.txt
