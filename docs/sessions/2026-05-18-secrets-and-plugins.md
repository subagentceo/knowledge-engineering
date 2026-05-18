# Session journal — 2026-05-17/18, secrets posture + plugin dogfood

Single overnight session that started with "/batch execute these open tasks" and ended with 7 PRs shipped covering the auto-merge crisis, the secrets-management posture, two operator-side IT-admin plugins, and a workflow security baseline.

## Outcomes shipped (PRs)

| PR | Outcome | What it does |
|---|---|---|
| #228 | OAUTO12 / ORC7 | auto-rebase re-dispatches verify+osv after `gh pr update-branch` — unblocks 19 of 22 BLOCKED PRs |
| #229 | OSEC1 | Three-plane secrets parity (local/gh-repo/gh-org/cloud-env) + loud verifier + cloud-env-audit Chrome skill |
| #230 | OSEC2 | Two-tier canonical store (Cloudflare Secrets Store + GitHub org secrets) + rotation runbook + no-1Password test |
| #231 | OSEC3 | Scriptable Cloudflare token rotation via long-lived `CF_TOKEN_MINTER` in macOS keychain |
| #232 | OIT1 | `plugins/macos-it-admin/` — 5 vendor CRUD skills (Cloudflare, Turbopuffer, Neon, Parallel, Nimble) |
| #234 | OAUTO13 | Refactor of `.github/workflows/claude*.yml` per upstream `claude-code-action` docs/security.md |
| #235 | OIT2 | `plugins/github-it-admin/` — 5 skills + hooks + monitor + agent + MCP server, dogfooding all above |

## Completed task IDs (cleared from active list)

For historical traceability — these were the TaskList entries marked completed during the session. The work itself is captured by the PRs above and the ADRs they reference.

### From earlier in the session (pre-/batch)
- #127 PR-8 link new ADRs from CLAUDE.md (OCP2)
- #128 PR-9 elevenlabs verbatim transform (OVS3)
- #129 PR-10 gcp allow_prefixes fix (OVS4)
- #130 PR-FU teach walkMd to include .mdx (OVS3-FU)
- #131 INV investigate trailing-2-day code + repo/org automation gaps
- #137 MT-1 rebase-all-behind-prs in current iteration
- #138 MT-2 resolve DIRTY conflicts on PR #132 and #109 OR close them
- #139 MT-3 (OAUTO2) ship auto-rebase workflow — fixes train at the source
- #140 MT-4 (OAUTO3) fix crawler isUnchanged-but-missing-file desync
- #141 MT-5 (OAUTO8) relax strict_required_status_checks_policy investigation
- #142 MT-6 (OAUTO9) test that automerge label is on by default for new PRs
- #143 MT-7 (OAUTO10) pr-queue dashboard at docs/pending-prs.md
- #144 Q-195 babysit OAUTO2 to merge
- #145 Q-190 babysit OAUTO1 to merge
- #146 Q-189 babysit OAUTO0 to merge
- #147 Q-186 babysit OVS3 to merge
- #148 Q-174 babysit OKWP2 to merge
- #149 Q-170 babysit OCI1 to merge
- #150 Q-155 babysit OCP3+OCP4 to merge
- #154 Q-188 babysit feedback-digest-state.json
- #155 CP-1 cherry-pick orchestrator runtime from closed PR #109
- #156 CP-2 cherry-pick turbopuffer-client from closed PR #109
- #157 CP-3 cherry-pick rollup-inspection auto-merge guard
- #158 CP-4 cherry-pick turbopuffer-api-key runbook
- #162 Q-203 babysit OVS4 (gcp allow_prefixes fix)
- #163 EVAL-191 outcome-driven eval harness for OPR2
- #164 EVAL-192 outcome-driven eval harness for OPR3
- #165 EVAL-193 outcome-driven eval harness for OPR4
- #166 CRAWL anthropics + claude-sitemap vendor crawls
- #167 CRAWL-FU investigate 246 anthropics failed URLs
- #168 RESEARCH YouTube transcript extraction packages
- #169 PLAYLIST fetch 13 video IDs via Claude in Chrome
- #170 ADOPT-MA managed-agents strategies
- #171 ADOPT-MSG Messages API + thinking-mode strategies
- #172 ORC4 fix auto-rebase workflow not firing on push-to-main
- #173 ORC1 Remote Control adoption ADR
- #174 ORC2 roving CI-healer agent
- #175 ORC3 roving PR-reviewer agent
- #176 ORC5 per-PR task sync skill
- #177 ORC6 self-test for merge-train infrastructure
- #178 DISPATCH-ORC parallel fan-out plan
- #179 OMA2 dreams: visions.md + heartbeat-dream skill
- #180 OMA3 github: map MA github-event pattern
- #181 OMA4 files: chassis posture
- #182 OMA5 memory: formal map
- #183 OAPI1 install claude-api skill
- #184 OAPI2 model-migration runbook
- #185 OAPI3 SDK adoption test
- #186 OBP1 reduce hallucinations audit
- #187 OBP2 output consistency + jailbreak + prompt-leak
- #188 OBP3 eval discipline conformance test
- #189 OREF1 glossary cross-walk
- #190 DISPATCH-OMA-OAPI-OBP-OREF parallel fan-out plan
- #191 CRAWL-FU2 add prompt-engineering docs to anthropics crawl source

### From the secrets+plugins thread (this session's core work)
- #192 Mint 4 missing API keys via Claude in Chrome — superseded by OSEC3 script approach after the 2026-05-18 incident (token value captured in screenshot, forcing rotation)
- #193 Switch CLAUDE_CODE_OAUTH_TOKEN to alex-jadecli — completed via `claude setup-token` + `/install-github-app` + `pbpaste`-based dual-write script. Both gh org + repo timestamps moved 2026-05-18T00:33:07Z → 00:38:20Z.
- #194 Build github-it-admin/ plugin (OIT2) — completed; landed as PR #235.

## Still-pending tasks (intentionally left for operator decision)

- #151 Q-191 babysit OPR2 (workerd/workers-sdk/dynamic-workflows submodules) — operator-review required (CODEOWNERS on third_party/)
- #152 Q-192 babysit OPR3 (docs-mirrors consumption layer) — operator-review required
- #153 Q-193 babysit OPR4 (agent-skills + terragrunt submodules) — operator-review required
- #159 Q-198 babysit OAUTO10 (pr-queue dashboard) — auto-recovers once OAUTO12 lands
- #160 Q-201 babysit OCP5 (orchestrator runtime cherry-pick) — DRAFT, operator-review
- #161 Q-202 babysit OCP6 (turbopuffer-client cherry-pick) — DRAFT, operator-review

## Key incidents codified

### 2026-05-17/18 — Cloudflare token screenshot leak

While running `claude setup-token`–style mint via Claude in Chrome, screenshotted the dashboard's one-shot token display to read the value. That put the literal token into conversation context, forcing immediate rotation. The fix codified in OSEC3 generalized in OIT1: **never browser-mint via screenshot; use the long-lived-minter-in-keychain + REST POST + pipe-to-gh pattern instead**. Browser-only is reserved for Turbopuffer (no admin API).

### 2026-05-18 — CLAUDE_CODE_OAUTH_TOKEN 41-char wrong-value

First `claude setup-token` run captured 41 chars to clipboard — that was the OAuth `code` query param, not the exchanged access token. The action rejected with `401 Invalid bearer token`. Resolution: `/install-github-app` followed by re-mint produced the correct long-form value. The lesson is encoded in the OIT2 `claude-oauth-rotate` script's `MIN_LEN=50` check — aborts if the value looks like a code rather than a token.

## Reusable patterns established

- **Long-lived minter in macOS keychain** + REST mint + pipe to `gh secret set` via stdin (OSEC3 → OIT1 → OIT2)
- **Operator-paste via `pbpaste` only** (never `read -p` which echoes to scrollback); wipe clipboard immediately after; self-delete one-shot scripts (OIT2 rotate.sh)
- **Read-after-write verification on every CREATE** (every vendor script in OIT1; every gh-secret-set in OIT2; every PUT in OIT2 branch-protection-crud)
- **Smoke-then-delete on UPDATE sequences** (never delete old credential before validating new one in a real downstream consumer)
- **Anti-leak tests as code** (`src/lib/macos-it-admin-plugin.test.ts`, `src/lib/github-it-admin-plugin.test.ts`, `src/lib/claude-action-workflows.test.ts`) — grep every script for forbidden patterns
- **Plugin spec full exercise**: skills + hooks + monitors + agents + MCP server + userConfig, not just skills (OIT2)
- **Tolerant cross-PR tests**: skip-not-fail when a sibling PR's file isn't merged yet (OSEC2's no-1password test; OIT2's live workflow lint test)

## Worktree cleanup

Cleaned up 4 orphaned `.claude/worktrees/agent-*` directories from the `/batch` run earlier in the session. Branches preserved (they have PRs open); only the worktree registrations + on-disk directories removed.
