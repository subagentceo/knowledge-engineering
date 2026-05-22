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

### TODOs deferred from this turn (do NOT add to ~/.zshrc yet — discuss first)

- [ ] **Rotate leaked token in `.git/config`.** `git remote set-url origin https://github.com/subagentceo/knowledge-engineering.git` then `gh auth setup-git` so https pushes use keyring instead of an embedded `gho_*`. Blocking before any push.
- [ ] **Per-repo identity switcher.** Operator is all 3 aliases (`alex-jadecli`, `admin-jadecli`, `zhoukalex`). A `gi alex|admin|zhouk` zsh function would let any session set `git config user.email` for the current repo without touching globals. Defer until the token rotation is done — wrong order otherwise.
- [ ] **Decide where the "solve access at the source" fix-record lives** (CLAUDE.md vs new ACCESS.md vs enterprise.json). Open from prior turn.
- [ ] **Reconcile opensubagents repo count** (37 local / 35 in CLAUDE.md / 46 claimed). Refresh `.meta/opensubagents.repos.json` per the snippet above.
