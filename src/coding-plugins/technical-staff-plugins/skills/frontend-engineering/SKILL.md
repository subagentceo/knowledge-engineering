---
name: frontend-engineering
description: >
  Review or implement UI/frontend code as a frontend staff engineer would -
  grounded in live framework docs and established UI architecture patterns,
  not memory. Trigger when reviewing or writing React/Vue/frontend component
  code, choosing between component-architecture approaches, checking
  accessibility or performance patterns, or asking "is this the idiomatic way
  to do X in <framework>". Uses mcp__Context7__resolve-library-id +
  query-docs for current framework APIs, mcp__O_Reilly__search_oreilly_content
  for UI/frontend-architecture books, and mcp__Parallel_Search__web_search for
  best-practice sweeps (accessibility, performance) that predate or postdate
  any single book.
---

# frontend-engineering

> Ground frontend review/implementation decisions in current docs and
> established patterns rather than training-data recall, which drifts fastest
> for fast-moving frontend frameworks.

## When to use

- Reviewing a PR that touches component code, styling, or client-side state
- Choosing between component-architecture approaches (e.g. compound
  components vs. render props vs. hooks-based composition)
- Confirming a framework API is still current before writing code against it
- Checking whether a UI pattern (forms, lists, modals) has a well-known
  accessibility or performance pitfall

## Workflow

1. **Resolve the live API first.** Call `mcp__Context7__resolve-library-id`
   for the framework/library in question, then `query-docs` for the specific
   API or pattern. This catches version drift (deprecated hooks, renamed
   props) that training data won't reflect.
2. **Ground the pattern.** If the question is architectural rather than
   API-level (e.g. "how should this component tree be organized"), search
   `mcp__O_Reilly__search_oreilly_content` for the relevant frontend
   architecture or design-pattern book. Use
   `scripts/format_research_query.py "<topic>" <file>` (shared across this
   plugin's skills) to shape the query from a topic + file path.
3. **Fill gaps with a broader sweep.** For fast-moving concerns without a
   single canonical book (current accessibility guidance, Core Web Vitals
   thresholds), use `mcp__Parallel_Search__web_search`.
4. **Cite what you used.** Name the doc version or book in the review
   comment/commit so the recommendation is checkable later, not just
   asserted.

## See also

- `system-architect` - when the question is about overall system layering
  rather than component-level frontend patterns
- `quality-assurance` - for frontend test-coverage and CI-status questions
