---
name: workflows-and-agents
description: Decide between a deterministic workflow and a flexible tool-using agent for tasks Claude can't do in one request. Trigger when designing multi-step Claude systems, choosing chaining vs routing vs parallelization vs evaluator-optimizer, designing abstract tools for an agent, or when comparing reliability/testability of workflows vs agents.
---

# Workflows and Agents

> Distilled from the *Building with the Claude API* course.

## Overview

Both handle tasks that need more than one Claude request. Use a **workflow** (a predetermined series of calls) when you know the exact steps — higher completion rates, easy to test. Use an **agent** (Claude dynamically plans using your tools) only when task details are unclear and flexibility is essential — lower completion, harder to test. Core principle: prioritize workflows for reliability; reach for agents only when flexibility is essential.

## Quick start

The four workflow patterns:

- **Chaining** — sequential distinct steps (draft → rewrite based on violations found).
- **Routing** — categorize the input, then route to a specialized pipeline.
- **Parallelization** — independent subtasks run simultaneously → aggregator.
- **Evaluator-optimizer** — producer generates, evaluator assesses, loop until accepted.

For agents, the key principle is **abstract tools over specialized ones** (`bash`/`web_fetch`/`file_write`, not `refactor_tool`), plus **environment inspection** after each action.

## References

- [references/workflow-vs-agent.md](references/workflow-vs-agent.md) — the decision rule and reliability/testability tradeoffs.
- [references/workflow-patterns.md](references/workflow-patterns.md) — chaining, routing, parallelization, evaluator-optimizer with course examples.
- [references/agent-design.md](references/agent-design.md) — abstract tools, environment inspection, and the computer-use and automated-debugging worked examples.

## Source
Course notes: "Agents and Workflows", "Parallelization Workflows", "Chaining Workflows", "Routing Workflows", "Agents and Tools", "Environment Inspection", "Workflows vs Agents", "Computer Use", "How Computer Use Works", "Automated Debugging" — projects/courses/building-with-the-claude-api__1p.txt
