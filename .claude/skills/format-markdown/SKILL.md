---
name: format-markdown
description: >
  Format markdown files to CommonMark/GFM using prettier. Use when asked to
  format, normalize, lint, or clean up markdown, or to make .md files
  CommonMark-compliant. Preserves the crawler F1-F6 fidelity invariants.
  Emits a DurableTask to engineering.jsonl if prettier exits non-zero or
  fidelity tests fail. Trigger on: "format markdown", "normalize md",
  "lint markdown", "CommonMark", "GFM format", "clean up the docs".
  Pairs with refresh-vendors (vendor/ fidelity gate).
  Do NOT use for non-markdown files.
---

<!--
  @cite src/lib/blog-extract-fidelity.test.ts    (F1-F6 fidelity invariants)
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
-->

## Run

```bash
# format changed files only
npx prettier --write --prose-wrap preserve   $(git diff --name-only origin/main...HEAD -- "*.md")

# format specific glob
npx prettier --write --prose-wrap preserve "docs/**/*.md"
```

## Failure → DurableTask

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "format-markdown: prettier exited non-zero or F1-F6 fidelity failed",
  "state": "pending", "ke_fit_score": 3,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "files": ["vendor/anthropics/..."],
    "fidelity_test": "F3_star_bullets",
    "resolvable": true,
    "suggested_skill": "format-markdown"
  }
}
```

## Fidelity gate (vendor/ only)

After formatting vendor files, always verify:

```bash
npx tsx src/lib/blog-extract-fidelity.test.ts
# expect: 17 pass / 0 fail
```

F1-F6 invariants: `* ` bullets preserved, leading H1 intact, no inline-link injection,
no prose reflowing that breaks crawled structure.

## Commit convention

```
chore(docs): normalize vendor markdown to CommonMark
```

Not `style` — `conventions.test.ts` rejects that type.
