---
phase: 0
title: Seed and posture
status: in-progress
self-graded: true
---

# Phase 0 — Seed and posture

Establishes the working agreement, cited-doc seeds, rubric stubs, the
`/routines` umbrella, the citation guard, and the Full-Stack Cloud Agent
runner scaffolding. **No `src/` runtime changes, no MCP tool changes.**

## Criteria

### 1. Operator-prompt seeds exist and are honest about provenance

- `seeds/prompts/operator-2026-05-10.md` exists.
- `seeds/prompts/operator-2026-05-10-followup.md` exists (Neon × Cloudflare
  Sandbox addendum).
- Each file's frontmatter declares `verbatim: false` with a `note` explaining
  the reconstruction limitation, and `status: load-bearing`.
- SHA-256 of each file is recorded in its commit message body.

### 2. Posture XML parses and matches the documented schema

- `seeds/posture/session-start.xml` is well-formed XML.
- Top-level `<posture>` contains the load-bearing children: `<auth>`,
  `<discipline>`, `<routines>`, `<execution>`, `<doc-rules>`, `<connectors>`,
  `<accounts>`, `<sources>`.
- `<auth>` includes `<forbid key="ANTHROPIC_API_KEY">` with the env-sanitizer
  cross-reference.

### 3. The 11 cited URLs exist as local mirrors with correct path encoding

- All URLs land at `vendor/anthropics/<host>/<path>.md`.
- `developers.cloudflare.com` URLs end in `/index.md`; the four other
  `.md`-first hosts (`code.claude.com`, `platform.claude.com`,
  `claude.com/docs`, `neon.com/guides`) end in `.md`.
- `seeds/citations/<slug>.md` exists for each, listing at least the H1+H2
  of the source doc plus three pull quotes that map to the corresponding
  rubric.
- **Phase 0 acceptance note.** Phase 0c is committed in incremental commits
  on this branch; the rubric is satisfied when the per-doc commits land.
  Until then, this criterion is partially met (operator-prompt seeds and
  posture XML reference the eventual paths).

### 4. Rubric stubs exist for all 13 phases

- `rubrics/phase-0.md` through `rubrics/phase-12.md` exist.
- Each has at least three measurable criteria.
- Phase 0's own rubric (this file) is fully populated.

### 5. `/routines` umbrella skill exists and cites its sources

- `.claude/skills/routines.md` exists.
- The body cites at least the two ingested `code.claude.com/docs` files
  (commands.md and slash-commands.md).
- Invoking the skill (or otherwise reading it) does not require Phase 1+
  infrastructure.

### 6. Citation guard is wired

- `scripts/lib/citation-guard.ts` exists.
- `npm run verify:citations` runs and exits 0 (no test files yet → trivially
  green; once test files land, missing `@cite` headers fail the run).
- The guard's behavior is described inline in the file's header comment.

### 7. Full-Stack Cloud Agent runner is scaffolded with OAuth substitution

- `infra/cloudflare/wrangler.jsonc` exists; passes
  `wrangler deploy --dry-run` (when `wrangler` is available).
- `infra/cloudflare/Dockerfile` exists; declares the Cloudflare sandbox
  base image plus `gh` CLI plus `@anthropic-ai/claude-code`.
- `infra/cloudflare/src/worker.ts` exists; typechecks under `tsc --noEmit`.
- The Worker contains an env-sanitizer that rejects any `setEnvVars` call
  including `ANTHROPIC_API_KEY`, and only forwards `CLAUDE_CODE_OAUTH_TOKEN`
  to the sandbox.
- `infra/cloudflare/.dev.vars.example` lists the four expected secret keys
  (`NEON_API_KEY`, `NEON_PROJECT_ID`, `GITHUB_TOKEN`,
  `CLAUDE_CODE_OAUTH_TOKEN`) — and **not** `ANTHROPIC_API_KEY`.
- The runner is **not deployed** in this PR.

### 8. Architecture doc captures the conflict resolution and account ledger

- `docs/architecture.md` includes a `## Cloud agents` section describing the
  cited Neon guide, the OAuth substitution, and the env-sanitizer.
- `docs/architecture.md` includes the operator account ledger.
- `docs/architecture.md` references the Boris Cherny long-arc subagent loop
  + routines pattern.

## Self-grading

This phase is self-graded by the author of PR #3. Phase 9 introduces
`scripts/grade-phase.ts`; once available, this rubric will be re-graded
mechanically.
