---
decision: package-lock.json merge conflict resolution
date: 2026-05-15
status: chassis-wide primitive
operator-rule: "the problem is with package-lock. focus on avoiding complex merge conflict issues for all open pull requests by using the correct primitive directive solution for package-lock"
outcomes: O-PRIM-PKGLOCK
related-prs: #109 (first concrete application)
posture-xml: seeds/posture/session-start.xml `<discipline><package-lock-resolution>`
---

# Decision: package-lock.json merge conflict primitive

## Problem

Every PR that adds, removes, or version-bumps a dependency touches
`package-lock.json`. When `main` moves forward with a different
dep delta, the lock conflicts. The conflict is in a deeply nested
JSON tree with non-deterministic key ordering — manual three-way
merge is **error-prone and untestable**: even after the merge
markers are gone, `npm ci` can fail because the lock no longer
matches `package.json`.

Symptoms operators have hit in this repo:
- `mergeable_state: "dirty"` on otherwise-green PRs (PR #109 today)
- CI failure on `npm ci --frozen-lockfile` after a manual lock merge
- Drift between `package.json` deps and lock entries (lock-only
  pins that no longer correspond to any direct/transitive)

## Primitive

**Treat `package-lock.json` as a generated artifact. Regenerate it
from the (resolved) `package.json`. Never merge the lock by hand.**

## Recipe

```bash
# 1. Resolve package.json manually (it's intent-bearing).
git mergetool -- package.json   # or hand-edit; remove conflict markers

# 2. Discard the PR-branch's lock. Take main's lock as the regen base.
git checkout origin/main -- package-lock.json

# 3. Regenerate the lock to satisfy the merged package.json.
npm install

# 4. Stage + commit.
git add package.json package-lock.json
git commit -m "merge(main): resolve package-lock + package.json conflicts (O<N>)"
```

## Rationale

- **Determinism.** `npm install` produces a self-consistent lock given
  `(package.json, npm registry state, node version)`. Manual merge can
  leave a lock that *parses* (no merge markers) but *fails* `npm ci`.
- **No 3-way semantics for nested JSON.** The lock format encodes
  resolved dep trees with non-deterministic key order. Three-way merge
  pretends a textual diff exists where the semantic diff is graph-shaped.
- **Easy verify.** After the recipe, `npm ci` must succeed. If it
  doesn't, the package.json itself is inconsistent — fix that, then
  re-run.

## When NOT to use this primitive

- **Lock-only pins for CVE workarounds.** If the PR pinned a transitive
  via `overrides`/`resolutions` without a corresponding `package.json`
  change, **preserve those overrides in `package.json` before
  regenerating**. Otherwise the regen will drop the pin.
- **Byte-identical reproduction across machines.** Cross-platform
  deterministic builds require a registry snapshot. In that case use
  `npm ci --package-lock-only` from the target `package.json`, not
  `npm install`.

## Enforcement

1. **Posture XML** — codified at `seeds/posture/session-start.xml`
   under `<discipline><package-lock-resolution>`. New sessions read
   the posture at startup and inherit the rule.
2. **PR babysitter routine** — detect a `package-lock.json` conflict
   marker in any open PR's mergeable_state and propose the recipe as
   the first remediation step.
3. **Helper** — `scripts/resolve-package-lock-conflict.ts` (this PR)
   bundles the 4-step recipe behind a single invocation:

   ```bash
   npx tsx scripts/resolve-package-lock-conflict.ts
   ```

   Idempotent; safe to run on a clean tree (no-op if there's no
   conflict).

## Reference applications

- **PR #109** (`unblock/secrets-cli-only-2026-05-15`) — first
  concrete application of this primitive. The merge of main into that
  branch conflicted on `package-lock.json` + `scripts/setup-branch-
  protection.ts`. Resolved via the recipe in commit
  `aa34060` on branch `pr-109-resolve`. The pattern is now
  documented chassis-wide.

## Citations

- `seeds/posture/session-start.xml` (`<discipline><package-lock-resolution>`)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md`
- `docs/CONVENTIONS.md` (outcome ID + atomic commit discipline)
- npm docs on `npm install` vs `npm ci`: https://docs.npmjs.com/cli/v10/commands/npm-ci
