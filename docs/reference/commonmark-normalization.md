# CommonMark normalization of the `vendor/` corpus

> Why the whole `vendor/` mirror is normalized to **CommonMark 0.31.2**, and the
> parser lineage that makes that normalization the same one Anthropic uses for
> its iOS/desktop surfaces.

## The goal

The `vendor/` corpus (30+ vendors, ~135 MB, grounded in Anthropic's published
[subprocessors](https://trust.anthropic.com/subprocessors) — i.e. the
development surfaces behind how Claude is built) is consumed by Swift apps
(`apps/corpus-viewer`) that render markdown with `anthropics/swift-markdown-ui`
and parse it with `anthropics/swift-markdown`. For that rendering to be
faithful and deterministic on a device surface, every `.md` in the corpus must
conform to one strict grammar: **CommonMark 0.31.2** (with GFM extensions).
Mixed or loose markdown renders inconsistently; normalized CommonMark does not.

This is the same grammar Anthropic's own first-party surfaces (Claude desktop,
Claude iOS) align to, because they sit on the same parser chain.

## The parser lineage (one grammar, many implementations)

```
spec.commonmark.org/0.31.2  ── the spec (mirrored at vendor/commonmark/)
        │
        ├─ commonmark.js      reference JS implementation (study clone)
        ├─ cmark / cmark-gfm  reference C implementation + GitHub's GFM superset
        │        │
        │        └─ swift-cmark            cmark-gfm vendored for Swift
        │                 │
        │                 ├─ anthropics/swift-markdown      AST parser (Document/Heading…)
        │                 └─ anthropics/swift-markdown-ui    SwiftUI renderer (MarkdownUI)
        │
        └─ prettier 3 (markdown)  the installable formatter whose parser
                                   implements the same CommonMark/GFM grammar
```

Every node on this tree parses the **same** grammar. Normalizing with one
implementation (prettier) produces output that round-trips cleanly through the
others (cmark-gfm, swift-markdown) — which is the property the Swift apps rely
on. The CommonMark study clones live at
`/Users/alexzh/subagentmcp/subagentceo/commonmark/` (commonmark.js,
commonmark-spec, commonmark-java, cmark, …) as the reference anchor.

## The mechanism (already in the repo)

Normalization is **not** new code. It is the `format-markdown` skill
(`.claude/skills/format-markdown/SKILL.md`), which runs:

```bash
npx prettier --write --prose-wrap preserve <files-or-globs>
```

`--prose-wrap preserve` keeps the crawler's line breaks (no reflow), so
normalization is a grammar-level cleanup, not a rewrite.

## The fidelity contract (F1–F6)

The crawler writes each page under six fidelity invariants
(`src/lib/blog-extract-fidelity.test.ts`): F1 leading H1, F2 plain headings,
F3 inline links flattened to text, F4 `* ` bullets, F5 unescaped code
identifiers, F6 fenced code with a language hint. Prettier's CommonMark
normalization **preserves** all six. After any normalization pass over
`vendor/**`, confirm:

```bash
npx tsx src/lib/blog-extract-fidelity.test.ts   # expect 17 passed / 0 failed
npx prettier --check --prose-wrap preserve "vendor/**/*.md"
```

So the corpus is simultaneously (a) faithful to the upstream source (F1–F6) and
(b) conformant to CommonMark 0.31.2 (prettier) — the two properties a
device-surface Swift renderer needs.

## What's mirrored here

- `vendor/commonmark/spec.commonmark.org/0.31.2/spec.md` — the canonical 0.31.2
  spec (authored as a CommonMark document; dated 2024-01-28).
- `vendor/commonmark/spec.commonmark.org/0.31.2/changelog.md` — the spec changelog.

Source of truth is the `commonmark/commonmark-spec` study clone's `spec.txt`,
not the rendered HTML — the `.txt` is what the rendered page is generated from.
