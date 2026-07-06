# technical-staff-plugins

Role-based **technical-staff skills** - frontend engineering, backend
engineering, quality assurance, system architecture, and technical
leadership - packaged as Claude Code skills that ground review/implementation
decisions in live documentation and research connectors instead of recall.

## Skills

| Skill                 | Use when                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------ |
| `frontend-engineering` | Reviewing/writing UI code, choosing a component-architecture approach                 |
| `backend-engineering`  | Reviewing/writing server code, caching/retry/idempotency/schema decisions             |
| `quality-assurance`    | Test-coverage review, CI-failure diagnosis, testing-framework comparisons             |
| `system-architect`     | Cross-service/module layering decisions, evaluating a proposed split                  |
| `technical-lead`       | Triaging a batch of PRs/issues, posting team status updates, routing to a specialist  |

## Connector mapping

| Connector                         | Used by                                             | For                                                        |
| :--------------------------------- | :--------------------------------------------------- | :----------------------------------------------------------- |
| `mcp__O_Reilly__search_oreilly_content` | frontend, backend, quality-assurance, system-architect | Canonical pattern/architecture/testing books                 |
| `mcp__Context7__*`                  | frontend, backend, system-architect                   | Live framework/driver/infra-provider API docs                 |
| `mcp__Hugging_Face__*`               | backend (conditional)                                 | Model/dataset selection, only when the code embeds/serves ML  |
| `mcp__Parallel_Search__*`            | all five                                              | Best-practice sweeps a single book/doc page won't have        |
| `mcp__Parallel_Task_MCP__*`          | backend, system-architect, technical-lead              | Open-ended deep research / batch task groups                  |
| `mcp__github__*`                     | quality-assurance, technical-lead                      | Real PR/CI/check-run state - never assume from titles alone   |
| `mcp__Slack__*`                      | technical-lead                                        | Team status updates                                           |

All six connectors are account-level (already installed) - these skills
reference them by tool name rather than bundling `mcpServers`, matching this
repo's existing plugin pattern (see `anduril-crawl-plugin`).

## Scripts

`scripts/format_research_query.py` - shapes a raw "topic + file path" input
into a focused query, shared across every skill's research step so query
quality doesn't depend on how the request was phrased:

```bash
uv run scripts/format_research_query.py "cache-aside pattern" src/lib/cache.ts
```

## First use of the O'Reilly connector

This account has never called `mcp__O_Reilly__search_oreilly_content`
before this plugin. Treat its first real invocation (from any skill above)
as a smoke test - confirm it returns usable, citable results before relying
on it for a real review.
