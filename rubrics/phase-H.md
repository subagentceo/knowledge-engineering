---
phase: H
title: markdown AST utility — typed parser + visitor triad seeded from anthropics/swift-markdown
status: in-progress
issue: docs/plans/founder-refactor-2026-05-15.md (mid-session dogfood iteration)
pr: pending (this PR)
---

# Phase H — markdown AST utility (rubric)

A small, dogfooded mid-session iteration of the founder refactor plan.
Operator-prompted (2026-05-15 mid-session): "Consider usage of
github.com/anthropics/swift-markdown + swift-markdown-ui."

A pre-flight multi-agent research turn (two parallel sub-agents, one
each for upstream Swift package research + local chassis survey)
confirmed the gap:

- **Upstream shape (research agent A):** swift-markdown ships a
  `Document(parsing:)` entry point + `MarkupVisitor` / `MarkupWalker` /
  `MarkupRewriter` triad over immutable typed nodes (`Heading`,
  `CodeBlock`, `Paragraph`, `Text`, etc.). swift-markdown-ui adds a
  `Theme` / `BlockStyle` configuration-as-value pattern for rendering.
- **Local gap (research agent B):** 7+ scattered regex probes
  (`/^#\s+/`, `/^##\s+/`, lane-specific anchor patterns,
  `@cite` / `@tdd` extractors). Zero AST parser, zero `unified`-family
  deps. `turndown` (HTML→MD) is the only markdown-adjacent dependency.

This phase closes the gap with a TS module that mirrors the
swift-markdown *parser* shape and the swift-markdown-ui
*configuration-as-value* shape, on top of `mdast-util-from-markdown`
+ `unist-util-visit` (the unified ecosystem's parsing + traversal
primitives). The Swift repos themselves are not vendored —
the API shape is the inheritance, not the source.

Cited from:
- github.com/anthropics/swift-markdown (parser + visitor triad)
- github.com/anthropics/swift-markdown-ui (rule/configuration pattern)
- `docs/plans/founder-refactor-2026-05-15.md` (cross-cutting standards)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md`

## Outcomes covered

| Outcome | What | File |
| :---: | :--- | :--- |
| **O-H1** | `src/lib/markdown.ts` — `parseMarkdown(source) → ParsedDoc`; `visitNodes<T>` / `walkNodes` (read + side-effect visitor pair, mirror of swift-markdown's `MarkupVisitor` + `MarkupWalker`); `extractHeadings` / `extractCodeBlocks` / `extractLinks` extractors; `validate(doc, rules)` with built-in `singleTopHeading` + `codeBlocksHaveLanguage` rules. | `src/lib/markdown.ts` + `.test.ts` |

## Follow-ups (deliberately deferred to keep this PR atomic)

- **O-H2** — Refactor `scripts/lib/llms-txt.ts` to consume `parseMarkdown` instead of its line-oriented regex band. The llms.txt format IS markdown-shaped (h1 title + h2 sections + linked list rows), so this is a clean swap.
- **O-H3** — Refactor `scripts/lib/citation-guard.ts` `@cite` extraction to walk the comment AST instead of line-regex. Reduces false positives on multi-line `@cite` blocks.
- **O-H4** — New `vendor_outline` MCP tool: returns the heading + code-block structure of a mirrored vendor doc. Lets the model navigate a doc by section without re-reading the whole body. Bumps `knowledge-bridge` to 18 tools.
- **O-H5** — Wire `validate(doc, [singleTopHeading, codeBlocksHaveLanguage])` into the vendor freshness check so a malformed mirror surfaces in `npm run verify:freshness`.

## Criteria

### C1. Module compiles + test green

```bash
npm run lint
npx tsx src/lib/markdown.test.ts
```

Expected: clean compile + `13 passed, 0 failed`.

### C2. Verify chain passes with module integrated

```bash
unset ANTHROPIC_API_KEY
npm run verify
```

Expected: every stage green. Test count rises from 23 → 24 (`markdown.test.ts` discovered).

### C3. Module is dependency-light + reuses unified ecosystem

```bash
grep -E '"mdast-util-from-markdown"|"unist-util-visit"' package.json
```

Expected: 2 hits. No `unified`/`remark` root deps — the slim
`mdast-util-from-markdown` + `unist-util-visit` pair is enough for
the API surface we expose.

### C4. Module is pure (no I/O)

```bash
grep -E "fetch\(|readFile|writeFile|spawn|exec" src/lib/markdown.ts
```

Expected: no hits. The module parses + queries; consumers do I/O.

### C5. Coverage ≥ 70%

```bash
npm run verify:coverage
```

Expected: `src/lib/markdown.ts` is NOT on the pre-existing-baseline
exemption list and reports ≥70% line coverage.

## Why this matters

The chassis mirrors 30+ vendor doc surfaces as `.md` and runs 5+
queries against each — chunking for embeddings, freshness checks,
citation guards, `support_search`, `vendor_grep`. Today each query
re-scans the byte stream with its own regex. Centralizing on a
typed AST:

1. Cuts duplicate parse cost (one parse per content-hash, shared
   across consumers via `ParsedDoc`).
2. Gives the model typed extractors (`extractHeadings`,
   `extractCodeBlocks`) as building blocks for future MCP tools.
3. Makes validation composable — each `ValidationRule` is a small
   function, not a monolithic linter. Mirrors swift-markdown-ui's
   `BlockStyle` configuration-as-value pattern.

## Dogfooding the result

The follow-up outcomes (O-H2 through O-H5) consume the new module
inside the chassis itself — llms.txt parser, citation guard, a new
`vendor_outline` MCP tool, freshness validation. Each is a small
independent commit; they ship as separate PRs to keep this base
landing small.
