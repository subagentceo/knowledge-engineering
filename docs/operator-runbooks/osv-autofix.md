# Runbook: keep `main` OSV-clean (OPM2)

> Outcome OPM2 from `docs/postmortems/2026-05-29-merge-train.md`. A medium
> advisory on `main` blocked the **entire** PR queue on 2026-05-29 because
> `OSV-Scanner (PR)` is a required, `--fail-on-vuln` check inherited by every
> branch. This runbook turns that class of outage into a one-command fix.

## When this fires

The weekly `scan-main` job in `.github/workflows/osv-scanner.yml` (Mondays
06:00 UTC) — or any `push` to `main` — goes red. Because the check is
required and strict, **no open PR can merge until `main` is clean again.**
Treat a red `scan-main` as P1.

## Fix (one command)

From the repo root, feed the scanner's own output into the auto-fixer:

```bash
osv-scanner \
  --lockfile=package-lock.json \
  --lockfile=frontend/package-lock.json \
  --lockfile=infra/cloudflare/package-lock.json \
  | npm run -s osv:autofix
```

`osv:autofix` (`scripts/osv-autofix.ts`) replays, per affected lockfile, the
exact move made by hand for #285:

1. `npm update <pkg> --package-lock-only` — bump within the existing range.
2. If a parent hard-pins the dep below the fix (e.g. `ws` under
   `wrangler → miniflare`), add an `overrides` entry (`>=<fixed>`) and relock.

Then commit and open the PR:

```bash
git checkout -b fix/osv-autofix-$(date +%Y%m%d)
git add -A
git commit -m "fix(deps): bump <pkgs> to clear OSV advisories (OPM2)"
npm run preflight        # OPM1 — confirm the gate set locally first
gh pr create --fill && gh pr merge --rebase --auto --delete-branch
```

## Targeted single-package form

When you already know the package and fix version (e.g. from the advisory):

```bash
npm run -s osv:autofix -- --pkg ws --fixed 8.20.1 --lockfile frontend/package-lock.json
```

## Guardrails

- The fixer **acts only on what the scanner reported** — it makes no network
  advisory calls, so CI's `OSV-Scanner (PR)` stays the source of truth.
- It never bumps a major beyond the `fixed` version the advisory names.
- Always run `npm run preflight` before pushing — `verify` must still pass
  after the bump (a transitive bump can, rarely, break a build).

## Why not fully automate the PR?

Opening the PR is left manual (one command) on purpose: a dep bump can change
runtime behavior, so a human/agent should eyeball the lockfile diff and the
`verify` result before it merges. The expensive, error-prone part — figuring
out *which* bump and *whether an override is needed* — is what `osv:autofix`
removes.
