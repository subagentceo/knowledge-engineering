---
title: Mintlify documentation strategy
description: How this repo's docs site is namespaced from the upstream llms.txt sources.
---

## Outcome

A Mintlify site whose information architecture is a 1:1 reflection of the
**tool lanes** identified in `code.claude.com/docs/llms.txt` and
`platform.claude.com/docs/llms.txt`. Each lane is one page; each page is the
canonical entry point for everything we know about that lane (tools,
docs links, blog, engineering posts, support).

## Namespacing rules

| Source | Mintlify path prefix | Notes |
|---|---|---|
| `code.claude.com/docs/en/...` | `lanes/<lane>` | The CLI / agent-runtime perspective. |
| `platform.claude.com/docs/en/...` | `lanes/<lane>` (Platform section) | The Messages / Managed Agents API perspective. |
| `claude.com/docs/...` | cross-linked inline | Connectors, Skills authoring. |
| `claude.com/blog/...` | "Further reading" block on the lane page | Curated, not mirrored. |
| `support.claude.com/...` | "Support" block | Linked, not mirrored. |

## Per-lane page template

```
# <Lane name>

> Outcome of this lane: <one sentence>

## Tools in this lane
<bullets, each linking to a Reference page if we ship one>

## Canonical docs
- code.claude.com: ...
- platform.claude.com: ...

## Further reading
- Blog: ...
- Engineering: ...
- Support: ...
```

## Lanes shipped in v0.1

`subagent-team`, `filesystem-edit`, `shell`, `mcp`, `skill`,
`plan-worktree`, `task-todo`, `scheduling`, `web`, `onboarding` — exactly the
ten lanes enumerated in the session artifact.

## Build

```
npm run docs:dev   # mintlify dev
```

CI: a future workflow will run `mintlify broken-links` on PRs that touch `docs/**`.
