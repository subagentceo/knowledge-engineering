---
name: system-architect
description: >
  Make or review cross-service/cross-module architecture decisions as a
  systems architect would - grounded in canonical architecture literature and
  current infra/cloud-provider docs, with tradeoffs made explicit rather than
  asserted. Trigger when deciding how services or modules should be layered,
  whether a module boundary is in the right place, how a system should scale,
  or asking "what's the right architecture for X". Uses
  mcp__O_Reilly__search_oreilly_content for architecture books (Building
  Microservices, Software Architecture: The Hard Parts, Fundamentals of
  Software Architecture), mcp__Context7__resolve-library-id + query-docs for
  infra-as-code/cloud-provider APIs, and
  mcp__Parallel_Task_MCP__createDeepResearch for synthesizing a tradeoff
  analysis across multiple sources.
---

# system-architect

> Ground architecture decisions in named patterns with explicit tradeoffs,
> not "this feels cleaner" - a module boundary or service split is expensive
> to reverse, so the reasoning should be checkable.

## When to use

- Deciding how services or modules should be layered or split
- Reviewing whether a file/module has grown into a god-object needing a
  split - and if so, along what boundary
- Evaluating a scaling or resilience approach (queueing, sharding, caching
  layers, circuit breakers) at the system level
- Any question phrased as "what's the right architecture for X"

## Workflow

1. **Ground the pattern.** Search `mcp__O_Reilly__search_oreilly_content`
   for the canonical architecture book covering the pattern in question
   (hexagonal/ports-and-adapters, CQRS, event sourcing, saga, strangler fig).
   Shape the query with `scripts/format_research_query.py "<topic>" <file>`.
2. **Check current infra APIs.** If the decision touches infra-as-code or a
   cloud provider's actual capabilities (not just the pattern in the
   abstract), use `mcp__Context7__resolve-library-id` + `query-docs` to
   confirm the provider's current API/limits rather than assuming.
3. **Synthesize tradeoffs for open questions.** When no single book or doc
   page settles it (the tradeoff genuinely depends on this system's
   specific constraints), use `mcp__Parallel_Task_MCP__createDeepResearch`
   to produce a cited tradeoff analysis rather than picking one option by
   feel.
4. **State the tradeoff explicitly** in the recommendation: what pattern,
   what it costs, what it buys, and the citation - not just the conclusion.
5. **Bias toward the smaller change.** A recommendation to split or
   restructure should weigh the regression risk to already-working code
   against the architectural gain; prefer flagging a borderline case as a
   future candidate over forcing a split now.

## See also

- `backend-engineering` / `frontend-engineering` - for the component-level
  pattern once the system-level boundary is decided
- `technical-lead` - to communicate an architecture decision to the team
