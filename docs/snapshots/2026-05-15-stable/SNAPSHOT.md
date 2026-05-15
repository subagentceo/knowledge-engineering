---
snapshot: 2026-05-15-stable
dist_tag: stable
captured_at: 2026-05-15T02:40:00Z
session_id: 9d8f8432-101f-466f-9c31-b1021ea934e7
transcript_url: https://claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7
platform: claude-code-web (accessed via Claude Desktop Code tab)
phase: 13.B+ (closeout)
---

# Snapshot — 2026-05-15-stable

> The end-of-Phase-13.B+ state. Tag: `stable`. 6 PRs merged in this
> session (O1-O8), one runbook reference added, web-platform context
> captured.

## Originating session

| Property | Value |
|---|---|
| Session ID (env `CLAUDE_CODE_SESSION_ID`) | `9d8f8432-101f-466f-9c31-b1021ea934e7` |
| Account UUID (env `CLAUDE_CODE_ACCOUNT_UUID`) | `ef065bee-0514-44c4-95bd-03840ddc3374` |
| Transcript JSONL | `/root/.claude/projects/-home-user-knowledge-engineering/9d8f8432-101f-466f-9c31-b1021ea934e7.jsonl` |
| First event | `2026-05-10T23:22:24.079Z` |
| Last event (at capture) | `2026-05-15T02:24:47.888Z` |
| **Duration** | **~4 days, 3 hours** |
| Event count | 1,367 |
| Transcript size | 5.05 MB |
| Effort flag (env `CLAUDE_EFFORT`) | `max` |
| Agent SDK version (runtime) | `claude-code 2.1.142` |
| AI agent (env `AI_AGENT`) | `claude-code_2-1-142_agent` |

Linking pattern follows
https://code.claude.com/docs/en/claude-code-on-the-web.md#link-artifacts-back-to-the-session:
the env value uses a `cse_` prefix while the transcript URL takes the
same ID with a `session_` prefix. In this capture the visible session
ID is the bare UUID; the URL above uses the documented prefix
substitution.

## What's captured under this snapshot

```
2026-05-15-stable/
├── SNAPSHOT.md                                   (this file)
├── plans/
│   └── vendor-directory-parallel-taco.md         (1,243-line plan covering Phase 6 → 13.B+)
├── claude/
│   ├── settings.json                             (host /root/.claude/settings.json)
│   ├── stop-hook-git-check.sh                    (host stop-hook from /root/.claude/)
│   └── skills/
│       └── session-start-hook/SKILL.md           (the skill loaded at every session start)
├── installations.md                              (npm trees + global packages)
└── web-environment.md                            (Claude Code Web platform context)
```

What is **NOT** captured (intentional):

- `/root/.claude/.credentials.json` — sensitive
- `/root/.claude/projects/*.jsonl` — session transcripts (private)
- `/root/.claude/sessions/`, `session-env/`, `backups/`, `shell-snapshots/` — session-scoped state (re-generated on each VM)

## Outcomes delivered in this session (O1-O8)

| Outcome | PR | Status |
|---|---|---|
| **O1** — `vendor/anthropic-engineering/` + html_index_sources + daily `/schedule` | [#53](https://github.com/subagentceo/knowledge-engineering/pull/53) | ✅ merged |
| **O2** — `sitemap_xml_sources` discovery primitive | [#54](https://github.com/subagentceo/knowledge-engineering/pull/54) | ✅ merged |
| **O3** — `vendor/openfeature/` mirror via sitemap.xml | [#54](https://github.com/subagentceo/knowledge-engineering/pull/54) | ✅ merged |
| **O4** — `vendor/cloudflare/` extended with Flagship docs | [#54](https://github.com/subagentceo/knowledge-engineering/pull/54) | ✅ merged |
| **O5** — `@openfeature/server-sdk` + Cloudflare Flagship provider wiring | [#55](https://github.com/subagentceo/knowledge-engineering/pull/55) | ✅ merged |
| **O6** — color-code demo (8 colors) gated by OpenFeature flag | [#56](https://github.com/subagentceo/knowledge-engineering/pull/56) | ✅ merged |
| **O7** — outcomesdk.com pretext frontend (ASCII art + sane accordion) | [#57](https://github.com/subagentceo/knowledge-engineering/pull/57) | ✅ merged |
| **O8** — Neon `vendor_pages` schema + per-PR migrations | [#58](https://github.com/subagentceo/knowledge-engineering/pull/58) | ✅ merged |
| (anchor) — Phase 13.A conditional GET + content-hash skip-write | [#52](https://github.com/subagentceo/knowledge-engineering/pull/52) | ✅ merged |
| (project) — Phase 15 PROJECT.md + pending.md + Cowork mapping | [#50](https://github.com/subagentceo/knowledge-engineering/pull/50) | ✅ merged |

## Remaining work tracked by open issues

### Autonomous (no operator gate)

- **#39** — Phase 2.B: crawl 4 deferred vendors (brave-search, sentry, sift, twilio)
- **#40** — Phase 6.B: codemode wiring + token-cost measurement
- **#41** — Phase 7.B: install-plugins.ts real materializer
- **#42** — Phase 11.B: `--batch-submit` + `--batch-collect`
- **#47** — Phase 13.C: `vendor/claude-blog/` 4 categories
- **#48** — Phase 13.D: 4 marketing surfaces
- **#49** — Phase 14: docs refresh + RUNBOOK.md
- **#51** — Phase 15.D + 15.E: `verify-project.ts` + `render-pending.ts`

### Operator-gated

- **#12** — Phase 8: Cloudflare Sandbox full deploy
- **#16** — Phase 12: Bridge as Connector
- **#33** — Provision `CLOUDFLARE_API_TOKEN`
- **#34** — Provision `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_WORKER_NAME`
- **#35** — (optional) Provision `VOYAGE_API_KEY`
- **#36** — Enable Code scanning + flip `upload-sarif:true`
- **#37** — Create GH PAT + run `setup:project` + `setup:branch-protection`
- **#38** — Decision: ship bridge as Connector

### New operator runbooks added by this session

- `docs/operator-runbooks/cf-flagship-setup.md` — Cloudflare Flagship app + `color-code` flag (~5 min)
- `docs/operator-runbooks/outcomesdk-domain.md` — verify `Zone:Edit` on outcomesdk.com (~3 min)
- `docs/operator-runbooks/neon-hyperdrive-setup.md` — Cloudflare Hyperdrive config for sub-ms edge reads (~5 min)

### Discrepancy

**#46** still open despite PR [#53](https://github.com/subagentceo/knowledge-engineering/pull/53) declaring `Closes #46`. Squash-merge sometimes misses closing keywords in PR descriptions. Issue is unambiguously satisfied; manual close recommended.

## What gets the `next` tag

Two candidates for the next snapshot bump:

1. **Phase 14 docs refresh** (issue [#49](https://github.com/subagentceo/knowledge-engineering/issues/49)) — `CLAUDE.md` / `DEVELOPER.md` / `README.md` refresh + new `CONTRIBUTING.md` + new `RUNBOOK.md`. Highest-leverage for forking-founder onboarding.
2. **Agent SDK `0.2.x → 0.3.x` minor bump** — the chassis currently pins `@anthropic-ai/claude-agent-sdk@^0.2.0` (installed 0.2.138). npm `latest` is `0.3.142` (operator-noted: jumped from 0.2.141 → 0.3.142 yesterday, 2026-05-14). This is a minor bump — likely contains breaking changes. Requires read-through of the SDK changelog before bumping.

Suggestion: ship Phase 14 docs first (no breaking-change risk), then schedule the agent-sdk bump as its own PR with a dedicated rubric for the breaking-change audit.

## How to restore from this snapshot

The snapshot is read-only documentation, not a runnable rollback. To
restore the chassis to this state:

```sh
git checkout <merge-commit-of-the-stable-snapshot>
npm install
cd frontend && npm install
cd ../infra/cloudflare && npm install   # currently has 6 unmet deps (see installations.md)
```

Then copy `claude/settings.json`, `claude/stop-hook-git-check.sh`, and
`claude/skills/session-start-hook/SKILL.md` from this snapshot
directory into `~/.claude/` (preserving paths).

Plan file: copy `plans/vendor-directory-parallel-taco.md` into
`~/.claude/plans/` if a fresh session needs to resume from the same
plan.
