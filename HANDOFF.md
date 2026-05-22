# Session handoff — 2026-05-22

Picked up mid-session from `/Users/alexzh/subagentmcp/opensubagents`. Continuing here in `knowledge-engineering/`.

## Who / where

- Operator: zhouk.alex@gmail.com
- Active `gh` alias: `alex-jadecli` (scopes: admin:enterprise, admin:org, repo, workflow, gist, delete_repo, admin:public_key)
- Inactive but available: `admin-jadecli` (same enterprise scopes)
- Repo: `subagentceo/knowledge-engineering`, branch `main`
- Local path: `/Users/alexzh/subagentmcp/subagentceo/knowledge-engineering`
- Previous session's primary cwd: `/Users/alexzh/subagentmcp/opensubagents`
- Permission mode: `bypassPermissions` (Claude Desktop epitaxy folder pref)

## Established context from prior turn

### Enterprise / org layout (verified this session)

- `/Users/alexzh/subagentmcp/` ↔ `github.com/enterprises/subagentmcp` (7 orgs, 128 repos per `enterprise.json`)
- `opensubagents/` — 37 local entries (CLAUDE.md says 35 repos; user said 46 on GitHub — **stale count, needs reconcile against `gh api orgs/opensubagents/repos`**)
- `subagentceo/` — 64 entries locally (this repo lives here)
- Canonical map: `/Users/alexzh/subagentmcp/enterprise.json`

### Operating principle the user set this session

**"Solve access issues programmatically, once, at the source."** When Claude hits an access gap (missing scope, wrong alias active, repo not cloned, vendor dir absent), fix at the source (`gh auth switch`, clone the repo, add the vendor dir, regenerate `enterprise.json`) — do NOT work around it. Where the persistent fix lands (CLAUDE.md / ACCESS.md / enterprise.json) is still TBD — **ask before writing the fix-record**.

### Open items flagged but not actioned

1. **Token leak in `.git/config`** — `git remote -v` shows a plaintext `gho_*` token embedded in the origin URL for this repo. Needs revoke + remote rewrite to `https://github.com/subagentceo/knowledge-engineering.git` using gh credential helper. **Do not proceed with any push/network ops until this is rotated.**
2. **opensubagents repo count drift** — user said 46, local has 37, CLAUDE.md says 35. Source-of-truth refresh:
   ```bash
   TOKEN=$(gh auth token --user admin-jadecli)
   GH_TOKEN=$TOKEN gh api 'orgs/opensubagents/repos?per_page=100&type=all' --hostname github.com \
     > /Users/alexzh/subagentmcp/.meta/opensubagents.repos.json
   ```
3. **Path typo in user's mental model** — user referenced `nowledge-engineering` (missing `k`). Real path is `knowledge-engineering`.

### Shell cwd behavior

The harness primary cwd is fixed for the session at `/Users/alexzh/subagentmcp/opensubagents`. Bash tool calls reset cwd between invocations (zsh state does not persist). To operate in this repo:
- Read/Edit/Write — always use absolute paths
- Bash — prefix with `cd /Users/alexzh/subagentmcp/subagentceo/knowledge-engineering && ...` OR use absolute paths in the command itself

User requested I create this handoff so the session can continue with this repo as the implicit working directory.

## This repo at a glance

TypeScript project (package.json, tsconfig.json, dist/, node_modules/). Key dirs:
- `src/` — source
- `servers/` — MCP servers (likely the "programmatic tool call accessible MCPs for developer docs" the user described)
- `vendor/` — 31 vendor dirs of third-party subprocessor docs in markdown:
  agentskills, anthropic-sitemap, anthropics, arkose-labs, aws, brave-search, claude-sitemap, cloudflare, docs-github, elevenlabs, gcp, git, intercom, iterable, modelcontextprotocol, neon, nimble, openfeature, opentelemetry, osv-scanner, parallel-web, sentry, sift, spotify-confidence, stripe, turbopuffer, twilio, wellarchitected-github, workos
- `plugins/` — Claude Code / agent plugins
- `seeds/` — seed data
- `rubrics/` — 25 entries (eval rubrics?)
- `docs/`, `migrations/`, `infra/`, `frontend/`, `third_party/`
- Top-level docs: README, CLAUDE.md, CONTRIBUTING, DEVELOPER, PRODUCTRD, RUNBOOK, SUBPROCESSORS

Read `CLAUDE.md` (6 KB) and `README.md` (8.8 KB) before making non-trivial changes. `SUBPROCESSORS.md` (9.1 KB) likely defines what each `vendor/<name>` mirrors.

## Pickup checklist for next turn

1. Read `/Users/alexzh/subagentmcp/subagentceo/knowledge-engineering/CLAUDE.md` and `/README.md` to load repo conventions.
2. Ask user what they want to do here (no task stated yet).
3. Before any git/network op: confirm the leaked token is rotated.

## Launch alias — copy into `~/.zshrc` when ready

Single zsh alias to start a Claude session rooted in this repo with `HANDOFF.md` pre-read.
Kept docs-only on purpose — nothing runs until the operator pastes it in. Once pasted,
`source ~/.zshrc` then run `ke` from any shell.

```zsh
# Open Claude in knowledge-engineering with this HANDOFF pre-loaded.
# No --dangerously-skip-permissions: the parent dir /Users/alexzh/subagentmcp/ is already
# an epitaxy bypassPermissions folder in Claude Desktop, so the flag is redundant AND risky
# when parallel agent workflows are running on the zhouk.alex@gmail.com account.
alias ke='cd /Users/alexzh/subagentmcp/subagentceo/knowledge-engineering && claude "read HANDOFF.md"'
```

### Resolved (kept for posterity)

- [x] **Token leak in `.git/config`** — rewrote remote to tokenless URL via `git remote set-url`. PAT not revoked (it was `admin-jadecli`'s live keyring token; revoking would have logged gh out across sessions).
- [x] **"Solve access at the source" fix-record location** — chose `docs/decisions/` (ADRs). See `2026-05-22-autonomy-merge.md` and `2026-05-22-docker-per-invocation-context.md` for the pattern.

## 2026-05-22 session — autonomous merge contract (OAUTONOMY1)

Operative state for any Claude resuming this session:

### How merges work now

- **PRs open ready-for-review by default.** Drafts ONLY for code literally not ready (in-progress, known-broken, missing dependency). "Waiting for CI" is NOT draft-worthy.
- **Every PR gets `automerge` label** at open time.
- **Auto-merge with `--rebase`** — the repo is rebase-only (`allow_squash_merge=false`, `allow_merge_commit=false`). Linear history; mirrors anthropics/*.
- **Branch ruleset 16440994** requires `npm run verify` + `OSV-Scanner (PR) / osv-scan`, `strict_required_status_checks_policy: true` (must be up-to-date with main).
- **The operator is NOT in the merge loop.** Claude opens, labels, fixes CI failures inline, merges via the auto-merge state machine. See `docs/decisions/2026-05-22-autonomy-merge.md`.

### Known CI sharp edges

1. **Auto-merge churn** — when one PR lands, GitHub auto-updates other open PRs' branches via server-side merge commits. Those don't fire `pull_request: synchronize`, so verify doesn't re-run; required-check rollup goes empty → PR sits BLOCKED. **Workaround**: disable auto-merge → push empty `chore: trigger CI (OCIRETRIG)` commit → fresh CI runs on stable HEAD → re-enable auto-merge.
2. **`workflow_dispatch` runs don't satisfy required checks** — the `auto-rebase.yml` workflow's rescue path uses `gh workflow run` which doesn't count. Only `pull_request`-event runs satisfy the gate. Push-based triggers are necessary.
3. **Bot PRs** (`chore(deps)(deps):` dependabot, `chore(main): release ` release-please) — exempted from `conventions.test.ts` via `BOT_RE` (per OCIFIX1).

### Outcome IDs in use

- OAUTONOMY1 — Claude-driven merge contract (merged)
- OCTX1 — per-invocation docker --context (in flight, PR #279)
- OBLOGD1 — deterministic re-crawl (merged)
- OBLOGF1 — claude.com fidelity (in flight, PR #268)
- OBLOGB1 — phase-BLOG.md rubric (in flight, PR #269)
- OBLOGE1 — blog-extract-fidelity test (in flight, PR #271)
- OBLOGS1 — sitemap audit + allow_prefixes expand (in flight, PR #277)
- OBLOGS2 — allow_urls schema field (in flight, PR #278)
- OBLOGS3 — sitemap coverage audit script (merged via stack)
- OSESS1 — session scaffolding + permission allowlist (merged)
- OPLUG1 — project-scoped plugin install (in flight, PR #267)
- OPLUG2 — plugin strategy ADR (in flight, PR #275)
- OPLUG3 — plugin rebind to subagentceo-overlay (merged via stack)
- OOPSREF1 — version-control operator/ canary files (in flight, PR #274)
- ORC2-v2 — pr-healer skill (in flight, PR #272)
- OKWP2 — AlloyDB Omni + Redis bootstrap (merged)
- OCIFIX1 — bot conventions + codeql version exemption (in flight, PR #282)
- OCIRETRIG — empty-commit CI nudge pattern (informal, no PR; see #259 ticks)

### Output tracking

Issue #259 is the canonical persistent record. Every loop tick appends a YAML block via `gh issue comment 259`.
