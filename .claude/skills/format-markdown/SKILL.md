---
name: format-markdown
description: Format markdown files to CommonMark/GFM using prettier (commonmark-based parser — the npm analog of cmark-gfm / commonmark.js / swift-markdown). Use when asked to format, normalize, lint, or clean up markdown, or to make .md files CommonMark/GFM-compliant. Preserves the crawler's F1–F6 fidelity invariants (`* ` bullets, leading H1, no inline-link re-adding).
---

# format-markdown

Normalize markdown to CommonMark/GFM with prettier (pinned devDependency).

## Run

Format specific files or globs:

```bash
npx prettier --write --prose-wrap preserve <files-or-globs>
```

Format every markdown file changed in the current PR vs `main`:

```bash
npx prettier --write --prose-wrap preserve $(git diff --name-only origin/main...HEAD -- '*.md')
```

`--prose-wrap preserve` keeps existing line breaks (don't reflow prose).

## Guardrails

- This repo's `vendor/**` mirrors must keep the crawler's F1–F6 fidelity. After
  formatting vendor files, ALWAYS verify:
  ```bash
  npx tsx src/lib/blog-extract-fidelity.test.ts
  ```
  Prettier preserves F1–F6 (keeps `* ` bullets, leading H1, adds no inline links),
  but confirm 17/0 before committing.
- Commit type must be `chore` or `docs` (not `style` — rejected by `conventions.test.ts`).
  End the subject with the active outcome tag `(O<N>)`.

## Lineage

CommonMark/GFM spec chain this aligns to: commonmark.js → cmark-gfm →
anthropics/swift-markdown(-ui) → swiftlang/swift-syntax. Prettier 3 is the
installable formatter whose parser implements the same CommonMark/GFM grammar.
