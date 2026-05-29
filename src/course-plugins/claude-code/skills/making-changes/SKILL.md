---
name: making-changes
description: Drive concrete code and UI changes with Claude Code — paste a screenshot with Control-V (not Command-V on macOS) so Claude can see the exact UI element to modify, describe the desired change, optionally enable Plan/Thinking modes for complex work, then let Claude stage and commit with a descriptive message. Trigger when changing visual UI, fixing something you can screenshot, or committing work.
---

# Making changes

> Distilled from the *Claude Code in Action* course. Grounded in `src/utils/imagePaste.ts` and `src/commands/commit.ts`.

The change-management workflow from the course:

1. **Screenshot the problematic area.**
2. **Paste with Control-V** — on macOS use **Control-V**, *not* Command-V, to paste the screenshot into Claude Code. The image helps Claude understand exactly which UI element to modify.
3. **Describe the desired change** in words.
4. **Optionally enable Plan and/or Thinking mode** for complex tasks (see the `plan-and-think-modes` skill).
5. **Review and accept** the implementation.

**Git integration** — Claude Code can stage and commit changes for you and write descriptive commit messages, so the change ends up captured in history without hand-writing the message.

## Grounded in src/
- `src/utils/imagePaste.ts`, `src/utils/pasteStore.ts`, `src/utils/screenshotClipboard.ts`, `src/hooks/usePasteHandler.ts` — clipboard/screenshot paste handling (the Control-V path).
- `src/commands/commit.ts`, `src/commands/commit-push-pr.ts` — commit (and commit+push+PR) generation with descriptive messages.
- `src/utils/git.ts`, `src/utils/gitDiff.ts` — underlying git staging/diff support.

## Source
Course note(s): "Making Changes" — projects/courses/claude-code-in-action__claudecode.txt
