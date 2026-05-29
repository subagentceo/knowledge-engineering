---
name: match-task-to-mode
description: Decide whether a given task belongs in Chat, Cowork, or Code, and spot the three patterns that make a task a good Cowork fit. Trigger when the user is unsure which mode to use, asks "should I do this in Chat or Cowork", describes a task and wants to know if it's right for Cowork, or is choosing how to hand off a piece of work.
---

# Match the Task to the Mode

> Distilled from the *Introduction to Claude Cowork* course.

## The decision rule

Ask: **does the task touch your files or tools and end in a real deliverable?** If yes → Cowork. If the answer *is* the conversation → Chat. If you're operating inside a codebase (editing source, running tests, managing git) → Code.

Two traps to remember:
- **A connector being involved isn't what makes something Cowork.** Chat pulls from connectors too. The question is what you want *delivered* — insight you absorb in conversation (Chat) vs. a saved artifact (Cowork).
- **The presence of a real file and a real save location is the signal** for Cowork — even for something small like a one-page brief, if the data lives in a spreadsheet on your drive and you want the result saved to a folder.

## The three patterns that suit Cowork

A task is a good Cowork fit when it matches one or more:

1. **Multi-step.** Several steps in one prompt — gather context, compare sources, research, draft, format. Hand the whole arc to Claude. *e.g. triage a week of customer-feedback emails into themes with quotes; pull figures from three reports plus a spreadsheet into a dashboard.*
2. **File-based.** The output is a real artifact (Word doc, spreadsheet, deck, PDF) and the inputs are real files you already have. Cowork works on the files you already have, not just creating new ones. *e.g. a client proposal from your template + meeting notes; a monthly metrics report from raw spreadsheets with charts.*
3. **Multi-tool.** The work spans Gmail, Slack, M365, calendar, CRM. Cowork plans across them and runs the whole sequence as one delegation instead of you stitching prompts together. *e.g. follow-up emails in Outlook from the calendar invite + attendees + notes; synthesize everything Slack said about a launch into an update.*

The through-line: **work that used to mean juggling steps, files, and tools in your own head can now be handed off as one task.** When you spot that shape, give it to Cowork.

## Worked calls

- "Read five vendor PDFs, compare on price/SLA, output a spreadsheet." → **Cowork** (files, multi-step, deliverable).
- "Refactor the auth module across five files and run the test suite." → **Code** (repo work).
- "Brainstorm 10 tagline directions." → **Chat** (the ideas are the answer).
- "Spot themes in this week's #product-feedback Slack." → **Chat** (you want insight, not a saved file — even though it uses a connector).
- "One-page Q1 brief; numbers in a Desktop spreadsheet, save to Reports/." → **Cowork** (real file + real save location).
- "Trace a React bug, fix it, push." → **Code** (inside a codebase).

## Source
Course section(s): "Lesson 1: What is Claude Cowork" — "Match the task to the mode"; "Lesson 3: What Claude Cowork can do for you" — "What makes a task right for Claude Cowork" — projects/courses/introduction-to-claude-cowork__cowork.txt
