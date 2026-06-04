# ADR: Polyrepo engineering adoption

**Date**: 2026-06-04  
**Status**: Accepted  
**Outcome**: O6

## Context

Cited from: `vendor/wellarchitected-github/wellarchitected.github.com/library/architecture/recommendations/implementing-polyrepo-engineering/index.md`

The Well-Architected polyrepo pattern defines:

1. **Integration layer (meta-repo)** — a coordination repo that holds manifests pointing at versioned artifacts in service repos. Changes spanning multiple repos are batched into a single change set with a stable ID (e.g. `CHG-1042`).
2. **Orchestrator/executor split** — the meta-repo *orchestrates* (plans, gates, sequences); individual service repos *execute* (build, test, deploy). No cross-repo coupling in hot paths.
3. **Reusable workflow governance** — shared CI primitives are versioned with semver and pinned by consumers; breaking changes require a major bump.
4. **Branching model** — integration branches in the meta-repo mirror the feature branches of member repos. Merge gating is enforced at the meta-repo level: a feature branch merges to main only when all member PRs pass required checks.

This repo (`knowledge-engineering`) already implements the orchestrator role for the `subagentceo` org (see `enterprise-mirror/`). The pattern formalises what exists.

## Decision

Adopt the polyrepo practices enumerated below. Implementation is incremental; the ADR records intent.

### Already implemented (grandfathered)

- `enterprise-mirror/` as integration layer for 10 orgs / 239 repos
- `orchestrator/executor` in agent code (`src/agent/`, sub-agent dispatch)
- Branch-naming convention `claude/<slug>` (enforced by branch-guard)
- Conventional Commits with outcome markers `(O<N>)` as change-set identifiers

### Newly adopted

1. **Change-set IDs on cross-repo PRs.** When a feature spans this repo plus a sibling (e.g. `knowledge-engineering-worker`), the PR descriptions in both repos carry the same `CHG-<N>` tag. Format: `CHG-YYYYMMDD-<slug>`. Enforced by convention (not tooling yet).

2. **Reusable workflow pinning.** Shared workflows in `.github/workflows/` that callee repos depend on are tagged with `vMAJOR.MINOR` releases before consumers pin. Breaking changes in `verify.yml` or `osv-scanner.yml` require a new major tag.

3. **Meta-repo manifest.** `enterprise-mirror/.meta/manifest.json` is the canonical list of member repos with their pinned SHAs. Claude sessions reading this file can determine which repos are in scope for a given change set.

4. **Integration branch naming.** Cross-repo feature branches use `claude/chg-<slug>` in all member repos so PR searches across orgs return the full change set.

## Consequences

- No breaking changes to existing tooling. The patterns are additive.
- `enterprise-mirror/.meta/manifest.json` becomes load-bearing for multi-repo orchestration; the `refresh-manifest` skill must keep it current.
- The `auto-rebase.yml` workflow (OAUTO19) now fires on `pull_request: closed` in addition to schedule, providing PAT-based rebase events that satisfy required checks — this is the CI substrate for the integration-layer merge gate.
