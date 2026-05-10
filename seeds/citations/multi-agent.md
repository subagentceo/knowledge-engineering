---
slug: multi-agent
source: https://platform.claude.com/docs/en/managed-agents/multi-agent.md
local: vendor/anthropics/platform.claude.com/docs/en/managed-agents/multi-agent.md
drives: sub-agent decomposition (Phase 10)
---

# multi-agent — extract

## Header tree

- # Multiagent sessions
  - ## How it works
    - ### What to delegate
  - ## Configure the coordinator
  - ## Create the session
  - ## Threads
    - ### Primary thread events
    - ### Session thread events
    - ### Tool permissions and custom tools

## Plan-relevant pull quotes

> All agents share the same container and filesystem, but each agent runs
> in its own **session thread**, a context-isolated event stream with its
> own conversation history. The coordinator reports activity in the
> **primary thread** … additional threads are spawned at runtime when the
> coordinator decides to delegate.

> Multiagent coordination is best-suited for complex tasks that either
> require work across a variety of surfaces, or where multiple
> well-scoped tasks contribute to an overall goal.

> **Specialization:** Route to agents with domain-focused system prompts
> and tools, such as a security agent or a documentation agent, rather
> than loading a single agent with every capability.

## Why this drives Phase 10

Phase 10 refines `src/agent/run.ts` into three sub-agents (`npm-research`,
`verifier`, `crawl-curator`), each with one outcome and a citation-cited
rubric. We borrow the **specialization** and **delegation** patterns
without using the Managed Agents API — same orchestrator/sub-agent
topology as the existing Claude Agent SDK setup, just with rubric-gated
outcomes.
