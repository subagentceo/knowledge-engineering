---
name: refresh-vendors
description: >
  Re-crawl the local vendor mirror (`vendor/`) on a recurring schedule.
  Emits a `/schedule` SlashCommand for users who want automated weekly
  refreshes. The crawler itself lives at `scripts/crawl-vendors.ts`;
  this skill is the operator-facing wiring + heartbeat-friendly cadence.
disable-model-invocation: false
---

# When to invoke

Invoke this skill when:

- The user asks for "weekly", "scheduled", "automated", or "cron" refresh of the vendor docs mirror.
- The planner emits a `kind: "schedule"` step whose description mentions "vendor", "crawl", "mirror", or "freshness".
- `npm run verify:freshness` reports any vendor as `warn` (≥14d) or `error` (≥30d).
- The user says any of: "refresh vendors", "recrawl docs", "wake up the crawler".

# Citations

- `vendor/anthropics/code.claude.com/docs/en/commands.md` — `/schedule` slash command surface.
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/slash-commands.md` — programmatic emission of slash commands.
- `seeds/prompts/operator-2026-05-10.md` — the working agreement that gates everything to `npm run verify`.
- `rubrics/phase-2.md` — `verify:freshness` thresholds (14d warn, 30d error).
- `rubrics/phase-5.md` — refresh ergonomics rubric.

# Procedure

1. Read the user's intent. If they specify a cadence (e.g., "every Monday"), pass it through verbatim. Otherwise default to **`every Monday 09:00`** (matches the plan).
2. Emit a SlashCommand of the form below via the planner's `emit` callback. **Do not run the crawl yourself in-session** — `/schedule` is the surface that hands the work to Anthropic's managed cloud-cron infrastructure.
3. Surface the routine ID back to the user; record it in `seeds/memory/heartbeat/decisions.md` so the heartbeat orchestrator knows the schedule exists.
4. Mark the planner step `completed` only after `/schedule` confirms the routine was created (the existing `.claude/skills/schedule-bridge.md` procedure handles this).

# Canonical SlashCommand template

```
/schedule every Monday 09:00 run "npm run crawl:vendors && npm run verify:freshness && (git diff --quiet vendor/ || (git checkout -b chore/vendor-refresh-$(date +%Y%m%d) && git add vendor/ && git commit -m 'chore(vendors): weekly mirror refresh' && git push -u origin HEAD && gh pr create --label automerge --title 'chore(vendors): weekly mirror refresh' --body 'Auto-PR from /schedule routine: refresh-vendors. CI gates the merge per docs/governance.md.'))"
```

The pipeline:

1. `npm run crawl:vendors` — re-crawls all 12 vendors per their `crawl.json` (idempotent; mtime preserved on unchanged content).
2. `npm run verify:freshness` — confirms every mirrored vendor has a fresh `last_crawled` timestamp.
3. `git diff --quiet vendor/` — short-circuit if nothing changed.
4. Otherwise: branch + commit + push + draft PR with `automerge` label, so the no-HITL loop merges it (per `docs/governance.md`).

The heartbeat orchestrator (`.claude/skills/heartbeat.md`) already knows how to react to the resulting PR's CI events.

# Examples

```
User: "Set up a weekly refresh of the vendor docs."
Skill: emits /schedule every Monday 09:00 run "...". Returns the routine ID.

User: "Run the crawl every day at 06:00."
Skill: emits /schedule every day 06:00 run "...". (Uncommon; defaults to weekly per the operator-stated cadence.)

verify:freshness reports anthropics warn (15d):
Heartbeat dispatches: emits /loop 1h "npm run crawl:vendor -- anthropics" until age = 0d, then exits.
```

# Why this skill exists

Plan section *Phase 5 — Refresh ergonomics* requires a `/schedule` template that drives weekly recrawls without any operator action between runs. The recrawl itself has no operator gates (Phase 1 ensured `crawl:vendors` is autonomous). The skill is the documented hand-off between operator intent ("keep this fresh") and the cron'd execution.
