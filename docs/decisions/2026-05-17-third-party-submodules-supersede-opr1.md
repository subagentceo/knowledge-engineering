---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OPR2
supersedes: 2026-05-16-polyrepo-sibling-pattern.md
---

# ADR — third_party/ submodules for read-only upstream pins (supersedes OPR1)

## Context

[OPR1](./2026-05-16-polyrepo-sibling-pattern.md) rejected git submodules
categorically for the polyrepo problem. The reasons given there
(`.gitmodules` leaks into every PR; sibling repos need to be writable;
cross-repo edits should not entangle commit graphs) are correct **for
sibling working repos** like `knowledge-work-profiles` and
`knowledge-work-routines` — repos the operator edits in parallel with
`knowledge-engineering`.

A different use case has now surfaced: **read-only upstream pins**.

The chassis depends on Cloudflare upstream sources for grounding,
search, and reference — `workerd`, `workers-sdk`, `dynamic-workflows`,
`agents`, `mcp`, `skills`, etc. These are:

- never edited locally
- pinned to specific tags matching the npm packages we install
- updated in batched bump PRs, not ambiently
- needed as **source trees**, not just doc mirrors, because `vendor/`
  crawls cover docs but not implementation source we want to grep

OPR1's rejection-of-submodules was framed too broadly. The
sibling-working-repo argument does not apply to read-only pinning.

## Decision

**Adopt git submodules under `third_party/` for read-only upstream
pins.** Retain OPR1's sibling-with-env-var-abstraction pattern for the
writable sibling-repo case. The two are different problems with
different right answers.

`third_party/` rules:

1. Every entry pinned to a specific tag/SHA, never a moving branch
2. CODEOWNERS marks `third_party/**` as requiring the operator to
   approve any change — Claude cannot self-merge bumps
3. CI guard rejects PRs that modify files **inside** any submodule
   (only the submodule pointer in the superproject may change)
4. `third_party/README.md` documents the pinning policy and bump
   procedure
5. `cloudflare-docs` is **excluded** (1.3 GB clone cost; the existing
   `vendor/` mirror via `scripts/crawl-vendors.ts` already covers what
   we need from that source)

## Consequences

**Positive**

- Source-level grep across Cloudflare upstream from inside the chassis
- Pinning is explicit, audit-able, and review-gated
- `vendor/` keeps its role for docs-only mirrors; `third_party/` is for
  source trees we want to read but never edit
- OPR1's sibling pattern is preserved unchanged for its own use case

**Negative**

- `.gitmodules` is tracked; PRs that bump a pin will touch it. This is
  acceptable for read-only pins because bumps are intentional + batched
- Initial clone larger (mitigated: shallow clones, `.gitmodules`
  entries with `shallow = true` where possible)
- Contributors must remember `git submodule update --init` after clone

## When to use which

| Use case | Pattern | ADR |
|---|---|---|
| Read-only upstream pin (workerd, workers-sdk, …) | `third_party/<name>` submodule | OPR2 (this) |
| Writable sibling repo (knowledge-work-profiles, …) | Sibling clone + env-var abstraction | OPR1 |
| Docs-only mirror | `vendor/<name>/` via `crawl-vendors.ts` | existing |

## Citations

@cite docs/decisions/2026-05-16-polyrepo-sibling-pattern.md
@cite vendor/docs-github/docs.github.com/repositories/working-with-files/managing-files/about-submodules-and-large-files-in-git.md
