---
name: plan-and-think-modes
description: Boost Claude on hard work by spending tokens before executing — Plan Mode (Shift+Tab twice) makes Claude research more files and produce a detailed implementation plan first; Thinking Mode (phrases like "ultrathink") grants an extended reasoning budget. Trigger Plan Mode for broad multi-step changes across a codebase, Thinking Mode for tricky logic or debugging, and combine both for complex tasks.
---

# Plan and Think modes

> Distilled from the *Claude Code in Action* course. Grounded in `src/tools/EnterPlanModeTool/`, `src/tools/ExitPlanModeTool/`, and `src/utils/thinking.ts`.

Two complementary "spend more compute up front" modes:

- **Plan Mode** — Enter with **Shift + Tab twice**. Claude researches more files and writes a detailed implementation plan *before* executing. Handles **breadth** — best for multi-step tasks that need wide codebase understanding.
- **Thinking Mode** — Triggered by phrases like **"ultrathink"**. Gives Claude an extended reasoning budget. Handles **depth** — best for tricky logic or debugging a specific issue.

Guidance:
- Planning = breadth; Thinking = depth.
- They can be **combined** for complex tasks (research broadly, then reason deeply on the hard parts).
- Both consume additional tokens, so use them where the payoff justifies the cost.

## Grounded in src/
- `src/tools/EnterPlanModeTool/` — enters Plan Mode (research-then-plan loop).
- `src/tools/ExitPlanModeTool/` — exits Plan Mode to begin executing the plan.
- `src/commands/plan` and `src/commands/ultraplan.tsx` — the `/plan` command surface.
- `src/utils/thinking.ts`, `src/components/ThinkingToggle.tsx` — extended-thinking budget and toggle.

## Source
Course note(s): "Making Changes" — projects/courses/claude-code-in-action__claudecode.txt
