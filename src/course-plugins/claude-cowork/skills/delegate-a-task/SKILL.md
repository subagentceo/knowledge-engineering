---
name: delegate-a-task
description: Write a strong Cowork prompt and run a task end-to-end — delegation, clarifying questions, mid-task steering, and reviewing the deliverable. Trigger when the user is handing Cowork a real task, asks how to write a good Cowork prompt, what to put in it, how to answer Claude's clarifying questions, how to course-correct mid-run, or how to review what Claude produced.
---

# Delegate a Task End-to-End

> Distilled from the *Introduction to Claude Cowork* course.

Working in Cowork is less like prompting a chatbot and more like briefing a smart colleague who's about to disappear into a task and come back with something done.

## Write a prompt that names three things

1. **The deliverable.** *"A one-page brief," "a slide for the QBR," "a ranked list with notes per candidate."* Specifics about format and length save you a regenerate.
2. **The inputs.** Which folder, which channels, which date range, which app. Cowork is only as good as the context you point it at.
3. **The nuance / specifics Claude can't guess.** *"Base, best, and worst case, accounting for the 3 new locations we opened in Q3."* This directs the output type and injects expertise Claude wouldn't see.

A complete delegation has all three. **Leave a row empty and Cowork will usually ask for it.** This is more upfront work than a chatbot — the trade is that the back-and-forth happens *before* Claude starts, instead of across five rounds of "actually, can you also…".

## Answer the clarifying questions

Most non-trivial tasks start with a clarifying question or two — that's how Claude closes context gaps before starting, not friction. Usually it presents a couple of options to click; if none fit, answer in your own words. Questions typically close a specific gap (format, scope, audience, rigor). **Skipping a question = Claude uses its best guess** — sometimes fine, sometimes you find out at the end. Answer specifically when it matters.

## Steer mid-task

Watch Claude's plan and progress as it works. If it's going off-track — wrong source, format, or tone — **interrupt and queue a correction; Cowork picks up from where it was** instead of starting over. You can also stop the run if it's substantially off, refine the prompt, and restart with what you learned. Resist the Chat instinct to wait for the full response then regenerate — **Cowork is built for course corrections and the cost of a redirect is low.**

## Review the finished deliverable

The artifact is the file (in the app preview and in your folder), not the chat. Review it like a draft from someone you trust but don't fully know — discernment on, especially the first few times:

- **Does it meet the actual objective**, or something subtly different?
- **Are facts accurate?** Ask Claude which docs it pulled from, then check them yourself.
- **Does anything sound made up?** A date, name, or quote you can't trace to an input is a flag.

If it's mostly right, **tell Claude what to change rather than starting over** — it remembers the conversation and edits faster than it regenerates. If it's wrong in a load-bearing way, the prompt was missing a load-bearing piece of context — point Claude to it and ask for adjustments.

## Source
Course section(s): "Lesson 4: Hand Claude Cowork your first task" — "Delegate your first task", "Answer the clarifying questions", "Steer mid-task", "Review the finished deliverable" — projects/courses/introduction-to-claude-cowork__cowork.txt
