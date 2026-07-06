---
name: backend-engineering
description: >
  Review or implement server-side/backend code as a backend staff engineer
  would - grounded in live framework/driver docs, distributed-systems
  patterns, and (when the backend serves or embeds a model) current
  model/dataset context. Trigger when reviewing or writing server code,
  database access layers, queue/cache logic, API design, or asking "is this
  the right pattern for X" about backend concerns (caching, retries,
  idempotency, schema design). Uses mcp__Context7__resolve-library-id +
  query-docs for server framework/ORM/driver APIs, mcp__O_Reilly__search_oreilly_content
  for distributed-systems and backend design-pattern books,
  mcp__Hugging_Face__hub_repo_search / hub_repo_details only when the backend
  serves or embeds an ML model, and mcp__Parallel_Task_MCP__createDeepResearch
  for open-ended scaling/architecture research.
---

# backend-engineering

> Ground backend review/implementation decisions in current library APIs and
> established distributed-systems patterns rather than recall - especially
> for concerns (caching, retries, idempotency) where a subtly wrong pattern
> only fails under load.

## When to use

- Reviewing a PR that touches server code, a database/cache access layer, a
  queue, or an API contract
- Deciding how to handle caching, retries, idempotency, or schema evolution
- Confirming a driver/ORM API is current before writing code against it
- The backend serves, embeds, or calls an ML model and you need to know
  which model/dataset fits

## Workflow

1. **Resolve the live API first.** `mcp__Context7__resolve-library-id` +
   `query-docs` for the exact server framework, ORM, or DB driver in
   question - driver APIs change across major versions in ways that matter
   for connection pooling and transaction semantics.
2. **Ground the pattern.** For a named pattern (cache-aside, saga,
   outbox, circuit breaker), search `mcp__O_Reilly__search_oreilly_content`
   for the canonical distributed-systems or backend-design-pattern book.
   Shape the query with `scripts/format_research_query.py "<topic>" <file>`.
3. **Model/dataset lookup, only if relevant.** If the code serves or embeds
   an ML model, use `mcp__Hugging_Face__hub_repo_search` /
   `hub_repo_details` to confirm the model choice or find a better-fitting
   one. Skip this step entirely for ordinary CRUD/API backend work.
4. **Deep research for open-ended questions.** For a genuinely open
   scaling/architecture question (not answerable from one book or doc page),
   use `mcp__Parallel_Task_MCP__createDeepResearch` rather than guessing.
5. **Cite what you used** in the review comment or commit.

## See also

- `system-architect` - for cross-service architecture and layering decisions
  above the level of a single backend component
- `quality-assurance` - for backend test-coverage and CI-status questions
