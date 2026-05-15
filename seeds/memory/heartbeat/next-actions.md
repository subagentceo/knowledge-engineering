---
title: heartbeat next-actions queue
description: Ordered queue. Top = next. Each entry has a rubric reference and a brief why. Heartbeat pops the top one whose rubric gates are green, executes, opens PR, removes the entry, commits.
last-updated: 2026-05-15T03:45:00Z
---

# Next actions

## 1. Fix `scripts/lib/llms-txt.ts` parser to unblock twilio + sentry + sift

**Rubric:** Phase 2.B (`rubrics/phase-2.md`) — vendor crawl coverage.
**Source of evidence:** PR #64 root-cause table.
**Gate status:** READY — no operator action required.
**Estimated scope:** small (~30-line parser change + tests).

The current parser only matches absolute URLs and captures trailing
punctuation (backticks) into the URL string. Three vendors have rich
llms.txt content that we currently throw away:

- `twilio` — 1587 links, all relative (`/docs/authy.md` etc.)
- `sentry` — 121 links, prefixed with backtick from markdown code spans
- `sift` — 674 links, same backtick issue likely

Fix:

1. Strip trailing `\``, `)`, `]`, and `"` from extracted URLs before
   they reach the allow-prefix filter.
2. Resolve relative URLs against the base URL of the llms.txt source
   (e.g. `/docs/authy.md` + `https://www.twilio.com/docs/llms.txt`
   → `https://www.twilio.com/docs/authy.md`).
3. Add unit tests for both cases in `scripts/lib/llms-txt.test.ts`.
4. Re-run `npm run crawl:vendor -- twilio` (and sentry, sift); confirm
   each now produces a `urls.md`.
5. Commit + PR. The vendor content itself will be a separate large
   commit in the same PR (similar to #64 pattern).

## 2. Investigate `migrate-neon.ts` real failure

**Rubric:** Phase 13.B+ O8 (per-PR Neon migrations).
**Source of evidence:** PRs #58/#60/#61/#63/#65 sequence.
**Gate status:** WAITING — depends on a future PR triggering `neon-branch.yml`
to produce a structured `::error::` annotation (PR #65's mechanism).
**Estimated scope:** depends on what the annotation reveals.

After the next PR-with-code-change triggers neon-branch.yml, fetch the
annotation via `mcp__github__pull_request_read get_check_runs` and
write the targeted fix:

- If annotation contains `code=42P07` (relation exists) → unexpected,
  since migrations have `IF NOT EXISTS`. Investigate.
- If `ETIMEDOUT`/`ECONNREFUSED` → add settle delay before connect.
- If `cannot use multi-statement` or similar → split SQL files into
  individual `exec()` calls.
- Other → triage from message.

## 3. Brave-search sitemap fallback

**Rubric:** Phase 13.B O2 (sitemap-based discovery for vendors without
llms.txt).
**Source of evidence:** PR #64 root-cause table; brave-search llms.txt
candidates 404.
**Gate status:** READY — autonomous; depends on action #1 being merged
or on a parser-skip-safe sequence.
**Estimated scope:** small (~10-line crawl.json change + verify).

Add a `sitemap_sources` entry to `vendor/brave-search/crawl.json`
pointing at `https://api-dashboard.search.brave.com/sitemap.xml` (verify
the URL exists first) or scrape the docs index HTML via the
`html_index_sources` mechanism already used by `anthropic-engineering`.

## 4. arkose-labs Phase 2.B finalization

**Rubric:** Phase 2.B finalization for the no-SDK vendor case.
**Gate status:** READY — autonomous; very low priority.
**Estimated scope:** small.

The crawl reports `ok fetched=0 unchanged=26` but no `urls.md` is
produced. Either:
- The 26 unchanged pages reflect an old crawl whose `urls.md` was
  deleted, in which case re-running with a debug flag should resurface
  them; or
- The crawler's "ok" path skips `urls.md` write when `fetched=0`. If
  so, change to always-write (idempotent).

## 5. Slack integration setup (Phase 14 T4)

**Rubric:** Phase 14 T4 (`seeds/prompts/operator-2026-05-15-mcp-multiplatform.md`).
**Source of evidence:** PR #62 decomposition.
**Gate status:** BLOCKED — depends on Phase 14 Q3 (Slack cloud session
OAuth inheritance question; see `open-questions.md`).
**Estimated scope:** medium (multi-step operator runbook).

Defer until operator answers Q3.

## 6. Channels alerting (Phase 14 T6)

**Rubric:** Phase 14 T6 (Telegram/Discord channel for CI failures).
**Gate status:** BLOCKED — depends on Phase 14 Q5 (Telegram vs Discord
choice).
**Estimated scope:** medium.

Defer until operator answers Q5.

---

## Done in 2026-05-15 session (deque'd)

- ✅ Stable chassis snapshot (PR #59 — operator-driven merge pending)
- ✅ Phase 14 decomposition + Neon MCP runbook (PR #62 — operator-driven)
- ✅ Vendor re-sync (PR #64 — operator-driven; added workos + elevenlabs)
- ✅ Neon CI alignment cycle (PRs #60, #61, #63, #65 — all merged)
- ✅ Bootstrap heartbeat memory store (this PR — #66)
