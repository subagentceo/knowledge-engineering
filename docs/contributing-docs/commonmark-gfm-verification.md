# CommonMark/GFM Verification Best Practice

This document captures the implementation plan and tracking inventory for
making repository Markdown pass GitHub's `cmark-gfm` parser while preserving the
repo's existing Markdown fidelity checks.

## Target

Markdown in contributor-authored docs should be compatible with:

- CommonMark 0.31.2: `https://spec.commonmark.org/0.31.2/`
- GitHub Flavored Markdown via `github/cmark-gfm`:
  `https://github.com/github/cmark-gfm`

Use `cmark-gfm` as the parser oracle. Do not implement a CommonMark parser in
this repository.

## Why `cmark-gfm`

CommonMark is intentionally permissive: most byte sequences parse as a
document. A parser gate is therefore not a style linter. Its job is to prove
that Markdown can be parsed and rendered by GitHub's production parser. Style
and repo-specific shape rules must remain separate checks.

The repo already documents the parser lineage in
`docs/reference/commonmark-normalization.md`: CommonMark 0.31.2, `cmark`,
`cmark-gfm`, `swift-cmark`, `swift-markdown`, and Prettier all sit on the same
grammar family. The missing piece is an executable `cmark-gfm` compatibility
gate.

## Current Checks

Already implemented:

- `.claude/skills/format-markdown/SKILL.md` documents the current formatting
  path: `npx prettier --write --prose-wrap preserve <files-or-globs>`.
- `docs/reference/commonmark-normalization.md` documents the intended grammar
  target and the Prettier-based normalization workflow.
- `src/lib/markdown.ts` wraps `mdast-util-from-markdown` and exposes AST helpers
  plus validation rules.
- `src/lib/markdown.test.ts` verifies parser helpers and the existing validation
  rules.
- `src/lib/blog-extract-fidelity.test.ts` enforces crawler fidelity invariants:
  leading H1, no bold-wrapped headings, no external inline links in prose,
  `* ` bullets, no escaped underscores, and sane fence language tokens.
- `scripts/lib/vendor-cleanliness.test.ts` explains why `vendor/commonmark/` is
  the spec anchor and why it is excluded from Prettier.

Not implemented yet:

- No `verify:markdown` package script.
- No `scripts/verify-markdown.ts`.
- No CI gate that invokes `cmark-gfm`.
- No install/bootstrap guidance for the `cmark-gfm` binary.
- No changed-file selector that keeps the check fast for PRs.
- No issue checklist tying the parser gate, formatter gate, and existing
  fidelity tests into one tracked workstream.

## Correct Implementation

Create `scripts/verify-markdown.ts` as a thin orchestrator. It should not parse
Markdown itself.

Responsibilities:

1. Discover Markdown files to check.
2. Resolve a `cmark-gfm` binary from `CMARK_GFM_BIN` or `PATH`.
3. Run each file through `cmark-gfm` with GFM extensions enabled.
4. Run Prettier in `--check` mode for formatting.
5. Preserve existing vendor fidelity checks instead of replacing them.
6. Print concise diagnostics and exit non-zero on failure.

Preferred command shape:

```bash
cmark-gfm \
  --extension table \
  --extension strikethrough \
  --extension autolink \
  --extension tagfilter \
  --extension tasklist \
  <file>
```

The script should discard rendered HTML. The pass/fail signal is the process
exit code plus stderr diagnostics.

Preferred package scripts:

```json
{
  "verify:markdown": "tsx scripts/verify-markdown.ts",
  "verify": "npm run verify:plugin-cache && npm run verify:mcp && npm run verify:tf && npm run verify:citations && npm run verify:markdown && npm run verify:gates && npm run verify:libs && npm run verify:coverage && npm run verify:tdd && npm run verify:freshness && npm run verify:project && npm run verify:security-posture"
}
```

## Scope Rules

Default scope should be fast and contributor-focused:

- `AGENTS.md`
- `CLAUDE.md`
- `plugins/*/CLAUDE.md`
- `.claude/skills/**/*.md`
- `docs/**/*.md`
- `rubrics/**/*.md`
- `seeds/**/*.md`
- Markdown files changed in the current PR

Do not include all of `vendor/**` by default. The vendor mirror is large,
partly generated, and has separate fidelity gates. Add an explicit flag for a
full corpus pass:

```bash
npm run verify:markdown -- --all
```

The `--all` mode may include `vendor/**` except known anchors and intentionally
verbatim mirrors documented in `.prettierignore` and
`scripts/lib/vendor-cleanliness.test.ts`.

## Binary Strategy

Use a real `cmark-gfm` binary.

Resolution order:

1. `CMARK_GFM_BIN`
2. `cmark-gfm` on `PATH`

If missing, fail with setup guidance, not a silent skip. Example:

```text
verify-markdown: cmark-gfm not found.
Install github/cmark-gfm and set CMARK_GFM_BIN=/absolute/path/to/cmark-gfm,
or place cmark-gfm on PATH.
```

Do not vendor a parser implementation into this repository unless there is a
separate issue justifying the maintenance cost.

## Tracking Inventory

Use these as the related issues/work items for this workstream. If GitHub
issues already exist, link them here instead of creating duplicates.

Existing related GitHub issue found during setup:

- `#259` — Outcome: deterministic full-sitemap crawl for Anthropic+Claude
  properties (OBLOG). This is related through the crawler fidelity side of the
  Markdown workstream, not through the missing `cmark-gfm` parser gate.

### MD-GFM-1: Add `cmark-gfm` binary discovery

Outcome: `scripts/verify-markdown.ts` resolves `CMARK_GFM_BIN` or `cmark-gfm`
on `PATH`, fails loudly when missing, and prints installation guidance.

Acceptance:

- Unit or script-level test covers missing binary.
- No network download during `npm run verify`.
- No parser fallback to regex or `mdast-util-from-markdown`.

### MD-GFM-2: Add parser compatibility check

Outcome: `scripts/verify-markdown.ts` runs selected Markdown files through
`cmark-gfm` with GFM extensions enabled.

Acceptance:

- Checks `AGENTS.md`, root `CLAUDE.md`, plugin `CLAUDE.md` files, and selected
  docs by default.
- Emits per-file diagnostics.
- Exits non-zero on parser/render failure.

### MD-GFM-3: Add Prettier check to Markdown verification

Outcome: `verify:markdown` also runs `prettier --check --prose-wrap preserve`
for the same selected files.

Acceptance:

- Formatting failure is reported separately from parser failure.
- Existing `format-markdown` skill remains the write/fix path.
- No prose reflow is introduced.

### MD-GFM-4: Wire `verify:markdown` into the verify chain

Outcome: `package.json` exposes `verify:markdown` and the top-level
`npm run verify` calls it.

Acceptance:

- CI fails when checked Markdown fails parser or formatter checks.
- The check runs before slower tests so docs failures are cheap to diagnose.

### MD-GFM-5: Add changed-file and `--all` modes

Outcome: the verifier checks contributor-authored Markdown by default and can
run a full corpus pass explicitly.

Acceptance:

- Default mode is fast enough for PRs.
- `--all` mode is documented.
- `vendor/**` behavior matches `.prettierignore` and vendor cleanliness rules.

### MD-GFM-6: Preserve crawler fidelity gates

Outcome: cmark-gfm verification is additive and does not replace
`blog-extract-fidelity.test.ts`.

Acceptance:

- Vendor formatting guidance still requires `src/lib/blog-extract-fidelity.test.ts`
  after vendor normalization.
- The doc explains that parser compatibility is not fidelity.

### MD-GFM-7: Document local setup

Outcome: contributor docs explain how to install or point to `cmark-gfm`.

Acceptance:

- `DEVELOPER.md` or this document contains the setup path.
- Missing binary failures tell developers exactly which env var to set.

## Open Questions

- Should CI install `cmark-gfm` from source, use a package manager, or use a
  prebuilt artifact?
- Should `verify:markdown` check only changed files in CI, or all
  contributor-authored Markdown every time?
- Should `vendor/**` ever be part of required CI, or stay as an explicit
  maintainer-only corpus pass?
- Should the repo keep describing Prettier as "CommonMark/GFM compliant" once
  `cmark-gfm` becomes the actual parser oracle, or reword it as "formatter
  aligned with the CommonMark/GFM grammar family"?

## Implementation Order

1. Create GitHub issues or update existing issues using the MD-GFM tracking
   inventory above.
2. Implement MD-GFM-1 and MD-GFM-2 together.
3. Add MD-GFM-3 once parser diagnostics are stable.
4. Wire MD-GFM-4 into CI.
5. Add MD-GFM-5 only after the default file set is proven fast.
6. Update contributor setup docs for MD-GFM-7.

## Notes for Agents

- Do not solve this by adding regex checks for CommonMark syntax.
- Do not silently skip `cmark-gfm` in CI.
- Do not run full `vendor/**` checks by default.
- Keep parser compatibility, formatting, and crawler fidelity as separate
  failure categories.
