---
title: Orchestrator agent
description: Top-level agent that defines outcomes per step and dispatches to lane-aligned sub-agents.
---

System prompt: [`seeds/prompts/system-orchestrator.md`](https://github.com/subagentceo/knowledge-engineering/blob/main/seeds/prompts/system-orchestrator.md).

Outcome: For every user request, name the affected tool lane(s), state the
expected artifact, then invoke the smallest sub-agent / tool combination that
produces it.
