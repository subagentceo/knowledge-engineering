---
date: 2026-05-16
status: superseded
superseded_by: 2026-05-17-third-party-submodules-supersede-opr1.md
deciders: alex-jadecli
outcome_id: OPR1
---

> **SUPERSEDED 2026-05-17 by [OPR2](./2026-05-17-third-party-submodules-supersede-opr1.md).**
> OPR1 rejected git submodules categorically. OPR2 narrows that rejection to
> the sibling-working-repo case (writable, parallel-developed) and explicitly
> accepts submodules for the read-only upstream-pin case (`third_party/`).

# ADR — Polyrepo sibling pattern for knowledge-work-profiles and knowledge-work-routines

## Context

Operator needs two new sibling repos under `subagentceo/`:

- `knowledge-work-profiles` — Docker MCP Toolkit profile exports (starting with `platform-engineering` from `~/.docker/mcp/`), the matching cloud-env setup script, a SessionStart hook, a service-start script, and the env-var contract.
- `knowledge-work-routines` — claude.ai code routine manifests (cron, run_once_at, GitHub triggers), companion to `knowledge-work-profiles`.

Constraints from the operator:

- Sibling repos must be referenceable from `knowledge-engineering` locally
- They must be updateable locally without polluting PRs against `knowledge-engineering`
- Use the established polyrepo abstraction (cited from
  [`subagentceo/polyrepo-engineering`](https://github.com/subagentceo/polyrepo-engineering)'s
  README: "integration layer (meta-repo) pattern; reusable workflows
  as a versioned platform interface")

## Decision

Adopt the **sibling-clone-with-relative-path-abstraction** pattern.

1. Each repo is a top-level child of `subagentceo/` on disk:
   ```
   $ENTERPRISE_ROOT/subagentceo/knowledge-engineering/
   $ENTERPRISE_ROOT/subagentceo/knowledge-work-profiles/
   $ENTERPRISE_ROOT/subagentceo/knowledge-work-routines/
   ```
2. No submodule, no `.gitmodules`, no npm `file:` dep between them.
   Submodules add a tracked `.gitmodules` pin that **must** show up
   in PRs, which violates the "no PR pollution" requirement.
3. References between sibling repos go through environment variables:
   - `KWP_ROOT` → `knowledge-work-profiles` checkout
   - `KWR_ROOT` → `knowledge-work-routines` checkout
   - Defaults computed from `$ENTERPRISE_ROOT/subagentceo/<name>` if unset.
4. Scripts that need a sibling no-op gracefully when the sibling is
   not present (e.g. inside a CCR cloud session where only one repo
   was cloned).
5. Per-repo Claude Code artifacts (`.claude/settings.json`,
   `scripts/start_services.sh`) are duplicated by design — each repo's
   `.claude/` is local to that repo per
   [`vendor/anthropics/code.claude.com/docs/en/settings.md`](../../vendor/anthropics/code.claude.com/docs/en/settings.md).
   Duplication is the **versioned platform interface** from the
   polyrepo-engineering meta-repo pattern.
6. If file-level coupling becomes necessary later, the upgrade path
   is **reusable GitHub Actions workflows** (versioned by tag),
   **not** git submodules.

## Why not a submodule

A submodule's pin lives in `.gitmodules` which is a tracked file by
definition. Any change to the submodule's pinned SHA produces a diff
in PRs. The operator explicitly requested PR invisibility, which
forecloses submodules.

## Why not an npm `file:` dep

`package.json` is tracked. `npm install ../knowledge-work-profiles`
adds a `file:` entry that produces a diff. Same constraint as
submodules.

## Why not sparse-checkout

Sparse-checkout is for trimming **one** repo's working tree, not for
referencing **another** repo. Different problem.

## Consequences

- Operators must clone each sibling repo manually. Documented in
  `CLAUDE.md`.
- Cross-repo refactors require coordinated PRs in each repo. This is
  the polyrepo trade-off and is explicitly preferred over a monorepo
  per the operator's enterprise design.
- CI in `knowledge-engineering` cannot consume profile or routine
  files from siblings at build time. CI that needs them resolves the
  sibling via `actions/checkout` with `repository:` parameter and
  a pinned `ref:` tag — a tracked pin in CI config, not in submodule
  metadata.

## String of PRs

This ADR is the gating artifact for a sequence of small PRs. Each PR
is atomic and scoped:

| # | Title | What lands |
|---|---|---|
| 1 | `docs(adr): polyrepo sibling pattern (OPR1)` | this ADR — gate the rest |
| 2 | `feat(skill): refresh-claude-oauth (OCI2)` | already open as #171 |
| 3 | `ci: harden auto-merge gate (OCI1)` | already open as #170 (draft) |
| 4 | `feat: create subagentceo/knowledge-work-profiles repo (OKWP1)` | bootstrap new sibling repo with README + 4-artifact scaffold; this is in the NEW repo, not here |
| 5 | `feat(cloud-env): Setup + SessionStart hook + service-start + env vars (OKWP2)` | adds the 4 artifacts inside knowledge-engineering, pointing at $KWP_ROOT via env var |
| 6 | `docs(claude): document $KWP_ROOT / $KWR_ROOT abstraction (OKWP3)` | updates CLAUDE.md only |
| 7 | `feat: create subagentceo/knowledge-work-routines repo (OKWR1)` | mirrors PR 4 for routines |
| 8 | `feat(cowork-plugin): vendor docker platform-engineering profile (OKWP4)` | exports the live `platform-engineering` profile YAML into knowledge-work-profiles repo |

Each PR ends with `(O<N>)` per `docs/CONVENTIONS.md`.

## Citations

- [`subagentceo/polyrepo-engineering`](https://github.com/subagentceo/polyrepo-engineering) — meta-repo + versioned platform interface pattern
- [`vendor/anthropics/code.claude.com/docs/en/best-practices.md`](../../vendor/anthropics/code.claude.com/docs/en/best-practices.md) — CLAUDE.md cascade behavior
- [`vendor/anthropics/code.claude.com/docs/en/settings.md`](../../vendor/anthropics/code.claude.com/docs/en/settings.md) — `.claude/settings.json` is per-repo
- [`/Users/alexzh/subagentmcp/CLAUDE.md`](file:///Users/alexzh/subagentmcp/CLAUDE.md) — enterprise mirror layout
- Git submodule docs — `.gitmodules` is always tracked
