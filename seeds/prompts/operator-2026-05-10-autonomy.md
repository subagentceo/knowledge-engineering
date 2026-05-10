---
kind: operator-prompt-seed-autonomy
date: 2026-05-10
verbatim: false
note: |
  Operator's fourth directive (autonomy + governance). Same caveat as
  the parent file. Captures the directive that the operator should be
  removed from PR-review human-in-the-loop, main is protected with a
  ruleset, GitHub workflow actions become primitives, and the heartbeat
  aims for auto-merge with sub-agent dispatch on CI failure.
status: load-bearing
parent: operator-2026-05-10.md
siblings:
  - operator-2026-05-10-followup.md
  - operator-2026-05-10-heartbeat.md
---

# Operator autonomy directive — 2026-05-10 (fourth turn)

The operator's fourth directive. **Treat as starting point, layer into
planned phases after decomposition. Do not override any in-progress
todos.** Safely added to in-session decomposition when the previous
todo cleared.

## Directives (paraphrased)

### 1. Remove operator from PR-review HITL

Dogfood the established phases. Auto-merge PRs when CI passes.
The operator no longer reviews each PR; the agent is responsible for
opening, watching, and merging via the workflow system.

### 2. Protect main with a ruleset

`main` is protected. Direct pushes blocked. PRs required. Required
status checks include the `verify` workflow added below.

### 3. GitHub workflow actions are established primitives

Workflows are reusable, proven strategies. PR 4 adds:

- **`verify.yml`** — `npm run verify` on every PR; required check.
- **`osv-scanner.yml`** — Google's OSV-Scanner against the npm lockfile.
  Cited from <https://osv.dev/>, <https://google.github.io/osv-scanner/>,
  and <https://github.com/google/osv-scanner>. Catches CVE-equivalent
  advisories from GHSA, npm, PyPI, RustSec, Go vulndb, OSS-Fuzz.
- **`neon-branch.yml`** — Neon database branch per PR (creates on open,
  comments the connection string on the PR, deletes on close). Maps
  directly onto the Phase 0g cloud-agent runner pattern, just driven by
  Actions instead of the Worker.
- **`cloudflare-preview.yml`** — Cloudflare Worker preview deploy per
  PR. Pairs with `neon-branch.yml` so reviewers can hit a live preview
  bound to a fresh DB branch.
- **`copilot.yml`** — Copilot Autofix workflow, gated on the repo
  variable `vars.COPILOT_ENABLED == 'true'`. Inert when Copilot is not
  enabled; opt-in via the operator setting the variable.
- **`auto-merge.yml`** — Enables auto-merge on PRs labeled
  `automerge` once required checks pass. Combined with the branch
  ruleset, this completes the no-HITL loop.

### 4. Heartbeat dispatches sub-agents on CI failure

The cross-session orchestrator (`.claude/skills/heartbeat.md`) gains
two responsibilities:

- **Open a PR → enable auto-merge.** When the heartbeat opens a PR, it
  labels it `automerge` and calls `mcp__github__enable_pr_auto_merge`
  (squash method).
- **CI failure → dispatch a fixer sub-agent.** The
  `github-mcp:subscribe_pr_activity` event listener (already declared
  in `.claude/plugins.json`) surfaces CI failures. The heartbeat reads
  the failure, classifies it (lint / typecheck / test / OSV
  vulnerability / etc.), spawns a single-task fixer sub-agent, and
  pushes the fix to the same branch. If the fix is non-trivial or
  ambiguous, the heartbeat posts a question to the PR for the operator
  instead of pushing — preserving the operator's role as a tiebreaker
  without making them the default reviewer.

### 5. Layer into phases

| Item | Belongs in | Implementation site |
|---|---|---|
| Branch ruleset on `main` | new, cross-cutting | PR 4 (`scripts/setup-branch-protection.ts`, operator-run) |
| `verify.yml` | Phase 0 retroactively | PR 4 (`.github/workflows/verify.yml`) |
| `osv-scanner.yml` | Phase 0 retroactively | PR 4 (`.github/workflows/osv-scanner.yml`) |
| `neon-branch.yml` | Phase 8 (runs immediately as scaffold) | PR 4 scaffold; activates when Neon Console install completes |
| `cloudflare-preview.yml` | Phase 8 | PR 4 scaffold; activates when CF secrets sync completes |
| `copilot.yml` | independent | PR 4 (conditional on `vars.COPILOT_ENABLED`) |
| `auto-merge.yml` | new, cross-cutting | PR 4 |
| Heartbeat dispatch | Phase 0e/d extension | PR 4 (update `.claude/skills/heartbeat.md`) |
| `scripts/setup-branch-protection.ts` | new, cross-cutting | PR 4 |

The scaffolds for Neon + Cloudflare + Copilot do nothing until the
operator-side secrets (per `docs/phase-gates.md`) are in place. They
are committed as plain-text YAML that the operator can `enable` simply
by adding the right secrets, which is a strictly smaller operator
burden than "review every PR."

### 6. Boris Cherny long-arc dogfooded

The long-arc objective (Workers-resident agents writing the codebase
end-to-end) becomes concrete when:

- Main is protected (only the agent can land changes, via PRs).
- CI gates merges automatically.
- Auto-merge fires on green CI.
- Heartbeat dispatches sub-agents on failure.
- Operator becomes a tiebreaker, not a reviewer.

This is exactly the publicly-documented Anthropic pattern.

## In-session todo discipline

The operator's directive included: **"Do not allow user prompts to
override any todos that are mod commit or in progress. Safely add it to
todo in session for task, subtask and todo decomposition when safe."**

This file was authored AFTER the in-progress "Posting issue-link comment
on PR 4" todo cleared. New todos were appended, not overriding. Future
operator prompts that arrive mid-commit are handled identically by the
heartbeat: queue, don't preempt.

## What's NOT in this PR

- **Actually creating the branch ruleset** — requires `GITHUB_TOKEN` /
  org admin in env. `scripts/setup-branch-protection.ts` is the
  operator-run bridge, mirroring `scripts/setup-github-project.ts`.
- **Actually enabling Copilot** — repo setting, operator-side.
- **Wiring the heartbeat into a cron** — that's a `/schedule` routine
  the operator activates once.

These are all surfaced as operator action items in
`docs/phase-gates.md`.
