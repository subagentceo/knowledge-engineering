# Skills — Teach Cowork a Recurring Process

## What a skill is

A reusable playbook — a folder of files — that teaches Claude how to do a specific kind of work your way. When a task matches, Claude **loads it automatically** (no need to invoke by name; you *can* be explicit: *"use the board memo skill"*).

## What's inside a skill (use any combination — include only what the work needs)

- **Instructions (`SKILL.md`)** — the brief: what it does, when to use it, how to do it. Write it like a runbook for a new colleague.
- **Assets** — logos, brand templates, slide masters, fonts: the raw materials for real-looking output.
- **References** — examples of good output, style guides, clause libraries, past work — how Claude learns what "good" looks like.
- **Scripts** — small code for parts that must happen the same way every time (a variance calc, a chart formatter). The script owns the math; Claude drafts the write-up.

The simplest useful skill is just a `SKILL.md`. The mix follows the work.

## Build a skill with Claude

Fastest path: start a Cowork conversation — *"I want to build a skill for [recurring process]. Walk me through what you need to know."* Claude asks what it should do, when it triggers, what good output looks like, what resources to use. **Answer specifically — point at real examples, templates, prior outputs.** Output is an installable skill folder. Find it in **Customize**; to change it, give Claude the correction and ask it to update in place. A skill works in any conversation, including inside a project.
