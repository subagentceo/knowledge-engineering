# third_party/

Read-only git submodules pinned to specific upstream tags. Per
[ADR OPR2](../docs/decisions/2026-05-17-third-party-submodules-supersede-opr1.md)
this is the **read-only upstream pin** pattern — distinct from the
sibling-working-repo pattern in [ADR OPR1](../docs/decisions/2026-05-16-polyrepo-sibling-pattern.md)
(superseded by OPR2 for this case).

## Pins

| Submodule | Upstream | Pinned to | Matches npm |
|---|---|---|---|
| `workerd` | https://github.com/cloudflare/workerd | tag `v1.20260517.1` | `workerd@1.20260517.1` |
| `workers-sdk` | https://github.com/cloudflare/workers-sdk | tag `miniflare@4.20260515.0` | `miniflare@4.20260515.0` |
| `dynamic-workflows` | https://github.com/cloudflare/dynamic-workflows | SHA `9726985a` (main) | `@cloudflare/dynamic-workflows@0.1.1` [TODO-OPERATOR: upstream has no release tags; pinned to main HEAD at submodule add time. Confirm bump policy] |

## Excluded by policy

- **`cloudflare-docs`** — 1.3 GB clone cost. The existing `vendor/`
  mirror via `scripts/crawl-vendors.ts` already covers the docs we
  need from this source. Re-evaluate only if we need full source
  access to non-mirrored assets. [TODO-OPERATOR]

## Rules

1. **Read-only.** Never edit files inside a submodule directory. The
   CI guard at `.github/workflows/third-party-guard.yml` rejects PRs
   that modify any path under `third_party/<name>/` except the pointer
   in the superproject.
2. **Pinned, never floating.** Each entry must point at a tag or SHA,
   never a moving branch.
3. **Bumps are intentional and batched.** Use `scripts/bump-refs.sh`
   to bump a pin; the operator (per CODEOWNERS) must approve the
   resulting PR.
4. **No imports from `src/` yet.** Packages installed via npm are the
   execution surface. The submodules are for source-level grep and
   reference reading only. Wiring imports against the submodule tree
   is a separate future PR.

## Working with submodules

```bash
# After cloning the superproject:
git submodule update --init --recursive

# Bump a pin (operator-gated via CODEOWNERS):
./scripts/bump-refs.sh workerd v1.20260518.0
```

## Why submodules, not vendor/

`vendor/<name>/` is for **docs-only mirrors** via crawl transforms.
`third_party/<name>/` is for **source trees** we want to grep but
never edit. The two answer different questions and do not overlap.
