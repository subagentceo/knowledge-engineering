# Security posture

> How this repo gates dependency vulnerabilities + secrets + supply chain. Grounded in the local `vendor/osv-scanner/` mirror + the OSV.dev database.

## Dependency vulnerability gate — OSV-Scanner

The repo uses **Google's [OSV-Scanner](https://google.github.io/osv-scanner/)** as its single dependency-vuln gate. OSV-Scanner is open-source; it checks lockfiles against the [OSV.dev](https://osv.dev/) database, which aggregates advisories from:

- GitHub Security Advisories (GHSA)
- npm advisory database
- PyPI safety DB
- RustSec
- Go vulndb
- OSS-Fuzz
- A few dozen other ecosystem feeds

The chassis prefers OSV-Scanner over **GitHub Advanced Security / Code Scanning** because:

1. **GHAS Code Scanning is a paid feature** on private repos and orgs of any meaningful size; OSV-Scanner is free.
2. The vuln-gate behavior is **identical** for our purposes — both fail merges when a vulnerable dependency lands.
3. The only thing GHAS adds is the **SARIF Security-tab UI** visualization; the gate itself runs equivalently via the OSV action's exit code.
4. OSV.dev aggregates more ecosystems than GHSA alone (Go, RustSec, OSS-Fuzz, etc.).

Decision recorded in [#36](https://github.com/subagentceo/knowledge-engineering/issues/36) (2026-05-15 won't-fix).

### Wiring

| File | What |
| :--- | :--- |
| `.github/workflows/osv-scanner.yml` | The workflow. Uses `google/osv-scanner-action@v2.3.8` (latest as of 2026-05-15). |
| `vendor/osv-scanner/` | 18 mirrored doc pages from `google.github.io/osv-scanner/`. Citation source for any test or doc that references OSV behavior. |

### Trigger surface

```yaml
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  schedule:
    - cron: "0 6 * * 1"   # Mondays 06:00 UTC
  workflow_dispatch:
```

- **PR jobs (`scan-pr`):** every PR runs the OSV PR-flavored reusable workflow. Fails merge on any new vuln introduced relative to `main`.
- **Push jobs (`scan-main`):** every push to `main` runs the full scan against the merged tree. Plus a weekly Monday cron sweep for newly-disclosed advisories.
- **Manual:** `gh workflow run osv-scanner.yml` for ad-hoc scans.

### Scope

OSV-Scanner auto-discovers lockfiles via `-r ./`. The repo currently has:

- `package-lock.json` (root)
- `frontend/package-lock.json`
- `infra/cloudflare/package-lock.json`

Plus any future lockfile under any subdirectory is auto-picked-up.

`infra/cloudflare/package.json` historically had no lockfile (lockfile is generated at deploy time per `docs/governance.md`). Once a lockfile lands there, OSV-Scanner auto-detects it; no workflow edit needed.

### Upgrade cadence

Track `https://github.com/google/osv-scanner-action/releases`. Bump the `@vX.Y.Z` pin in `.github/workflows/osv-scanner.yml` when:

- A new minor/major release adds advisory feeds we care about
- A security-relevant fix lands in the action itself
- A breaking change in upstream lockfile parsers requires a newer version

The current pin is **`v2.3.8`** (released 2026-04-30). Underlying scanner CLI version: `v4.31.x`.

### What's NOT covered by OSV-Scanner

OSV-Scanner is a **dependency** vuln gate. It does NOT cover:

- **Secret leaks** in committed code — handled by `mcp__github__run_secret_scanning` + the convention of never committing real values (see `seeds/posture/session-start.xml`)
- **First-party code vulns** (e.g., XSS in `src/`) — handled by Claude review (`.github/workflows/claude-review.yml`) + the `PreToolUse(Bash)` safety hook (`src/lib/safety-hooks.ts`)
- **Container image vulns** in `infra/cloudflare/Dockerfile` — not yet gated; future work if/when the Sandbox image stabilizes
- **License compliance** — out of scope here; see `vendor/osv-scanner/google.github.io/osv-scanner/usage/license-scanning/index.md` if/when needed

## SARIF posture

`upload-sarif: false` in both jobs is **intentional**. SARIF upload requires GHAS Code Scanning, which is paid. The action still:

- Runs the full scan
- Fails on any new vulnerability
- Returns a non-zero exit code that gates merges

If/when the operator decides to pay for GHAS, flipping these two flags to `true` is the only change needed.

## OSV.dev primer

Per the [OSV.dev FAQ](vendor/osv-scanner/google.github.io/osv-scanner/) (mirrored):

- OSV ("Open Source Vulnerabilities") is a distributed, ecosystem-neutral vuln schema
- Each vuln has a stable ID (e.g., `OSV-2026-1234`) and aliases to ecosystem IDs (`GHSA-...`, `CVE-...`)
- Data is curated by Google with community contributions
- OSV.dev exposes a free JSON API; OSV-Scanner is the CLI client

The chassis treats OSV.dev as a **service dependency** — listed in `SUBPROCESSORS.md` as a security-critical free service. If OSV.dev had a paid tier we'd discuss; today it does not.

## See also

- `vendor/osv-scanner/` — 18 doc pages, citation source
- `.github/workflows/osv-scanner.yml` — the workflow
- `SUBPROCESSORS.md` — service dependency inventory
- `docs/governance.md` — branch ruleset + auto-merge state machine
- [`google.github.io/osv-scanner/github-action`](../vendor/osv-scanner/google.github.io/osv-scanner/github-action/index.md) — local mirror of the GitHub Action setup guide
- [`google.github.io/osv-scanner/configuration`](../vendor/osv-scanner/google.github.io/osv-scanner/configuration/index.md) — local mirror of the `osv-scanner.toml` config reference
