---
title: Orchestrator agent
description: Top-level agent that defines outcomes per step and dispatches to the four bridge sub-agents.
---

System prompt: [`seeds/prompts/system-orchestrator.md`](https://github.com/subagentceo/knowledge-engineering/blob/main/seeds/prompts/system-orchestrator.md).

Outcome: For every user request, name the affected bridge(s) — one or more
of `anthropic-engineering`, `claude-blog`, `support-claude`, `llms-txt` —
state the expected artifact, then invoke the smallest sub-agent set that
produces it.

The orchestrator never reaches the web directly. All factual claims must
come from a bridge sub-agent's tool result so the upstream URL is preserved
for citation.
