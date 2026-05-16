---
tick: 14
iso: 2026-05-16T05:00:00Z
git_sha: cd663ef (PR #161 squash) on main
session: claude-code/2026-05-16-fix-claude-blog-clean-markdown
trigger: operator-direct ("fix this broken vendor/claude-blog/")
prev_tick: 13 (2026-05-15 autonomous queue sweep)
---

# Tick 14 — vendor mirror consolidation (PRs #160, #161 merged)

Operator-driven session that started as a bug fix for one vendor mirror
and ended up restructuring how this chassis organizes first-party
Anthropic content surfaces.

## What changed

Two PRs landed on `main` within ~3 minutes:

- **PR #160 — `vendor/claude-sitemap/`** (squash `ace3e25`)
  Replaces 6 mirrors: `claude-{blog,connectors,customers,plugins,support,tutorials}`.
  One sitemap.xml-driven crawl, topology layout (`<vendor>/<first-path-segment>/<slug>.md`),
  per-host transform dispatch (support.claude.com still uses `support-mdfirst`).
  PDF mirror lane lives at `vendor/claude-sitemap/_pdfs/`.
  Total: 1579 URLs + 4 PDFs.

- **PR #161 — `vendor/anthropic-sitemap/`** (squash `cd663ef`)
  Replaces `vendor/anthropic-engineering/` (which only had 25 posts via
  html-index regex discovery and dumped Next.js site nav into every file
  because the selector `"article|main"` wasn't valid CSS).
  Now covers all of anthropic.com (engineering 24 + news 211 + research
  120 + others ~14). Selector `"article, main"` (proper cheerio
  comma-list).
  Total: 369 URLs.

## Why it matters

Before: 6 separate `claude-*` mirrors + 1 `anthropic-engineering/`
mirror duplicated discovery work, missed topologies the sitemap already
exposed, and the `anthropic-engineering` selector was broken.

After: 2 consolidated mirrors organized by URL topology. One config to
maintain per first-party site. New mirror primitives in
`scripts/lib/url-to-path.ts` (`layout: "topology"`) and per-host
transform dispatch in `scripts/crawl-vendors.ts` (`makeTransform`) are
reusable for any future site.

## Reading order for the next Claude

If you're picking up after this tick, read:
1. `vendor/claude-sitemap/crawl.json` — the new pattern, with
   `layout: "topology"`, `sitemap_xml_sources`, priority-list selector,
   `pdf_allow_prefixes`.
2. `scripts/lib/url-to-path.ts` — the `layout` option (host vs topology).
3. `scripts/crawl-vendors.ts` `makeTransform` — per-host dispatch for
   support.claude.com.
4. `scripts/lib/pdf-mirror.ts` + `.test.ts` — PDF lane (gated by
   `pdf_allow_prefixes`).

## What `support_search` looks like now

The MCP lane in `src/mcp/lanes/support-claude.ts` reads
`getVendor("claude-sitemap")` and filters the urlSet to
`support.claude.com/en/articles/`. 341 articles still searchable, just
inside the consolidated manifest.

## Stale references cleaned by this tick

The doc-sweep PR after these (PR #162) updates `CLAUDE.md`,
`rubrics/phase-{13,16,E}.md`, `docs/pending.md`, and this heartbeat
entry to remove references to the 7 deleted vendor directories.

---

# Tick 13 — autonomous queue sweep (5 PRs, 5 issues closed, queue truly exhausted)

This tick records the second autonomous sweep of 2026-05-15. The
operator's directive: dogfood the chassis, add all open issues to a
todo queue, complete them with atomic commits, treat the user prompt
as a starting point — and explicitly: "if an api key is needed for it
to pass, it cannot pass until that's accessible."

## Outcomes achieved

### Merged PRs (sequential, all automerge-labeled, all green)

| # | PR | Closes | Subject |
| :--: | :---: | :---: | :--- |
| 1 | #95 | #94 | Phase 18 — context management dogfood (token counting + cache boundary + budget) |
| 2 | #97 | #96 | Phase 19 — Claude Code features dogfood (settingSources + skills + safety hooks) |
| 3 | #98 | (#48 loose end) | Fix claude-tutorials sitemap discovery — 118 tutorial pages crawled |
| 4 | #99 | #49 | Phase 14.C README refresh — current chassis state |
| 5 | (#93 from prior tick) | — | tick 12 record |

### Issues closed (7)

- #41 — Phase 7.B install-plugins.ts materializer (verified DONE via PR #86, closed with explicit reference)
- #42 — Phase 11.B `--batch-submit` + `--batch-collect` (verified DONE via PR #88)
- #47 — Phase 13.C claude-blog (verified DONE via PR #90 — 23 posts)
- #48 — Phase 13.D 4 new vendors (PR #91 = 3 vendors + PR #98 = claude-tutorials fix at 118 pages)
- #49 — Phase 14 docs (PR #99 = README refresh, completing the 5-doc sweep)
- #94 — Phase 18 (PR #95 — auto-close didn't fire; closed explicitly)
- #96 — Phase 19 (PR #97 — same)

### Bug fix surfaced during queue sweep

`vendor/claude-tutorials/crawl.json` pointed at `www.claude.com/tutorials/<slug>`,
which is wrong — the canonical English tutorial URLs live at
`claude.com/resources/tutorials/<slug>`. PR #91's first crawl returned
0 pages silently. Per "no silent failures", PR #98:

- Swapped `html_index_sources` → `sitemap_xml_sources`
- Fixed `allow_prefixes` to the correct path
- Added i18n `deny_prefixes` (sitemap lists each tutorial 5×)
- Resulted in 118 tutorial pages crawled cleanly

### Substantive status comments posted (3)

Per "no silent failures", explicit blocker comments on:

- **#40** (Phase 6.B codemode wiring): re-investigated. `@cloudflare/codemode@0.3.6` is published but is CF-Agents-runtime coupled (peer deps `ai@^6.0.0`, `@tanstack/ai`). The AC's ≥40% token reduction requires live OAuth-funded baseline + post-refactor runs — agent in sandboxed session cannot fund these. Phase 19 (PR #97) `skills: "all"` partially overlaps the progressive-disclosure goal. Recommended re-scope into #40-A (operator-gated on #12+#33+#34) and #40-B (allowlist trim, agent-actionable).
- **#12** (Phase 8 C4): chassis ready; deployment blocked on #33+#34 operator action.
- **#38** (Phase 12 Connector decision): operator-decision; recommendation is postpone.

## Open issues at session end (10, ALL operator-blocked or operator-gated)

| # | Type | Blocker |
| :---: | :--- | :--- |
| #12 | Phase 8 C4 | Operator action (#33 + #34) |
| #16 | Phase 12 Connector | Operator decision (paired with #38) |
| #33 | CF API token runbook | Operator runs Claude-in-Chrome |
| #34 | CF account ID runbook | Operator runs Claude-in-Chrome |
| #35 | Voyage key (OPTIONAL) | Operator runs Claude-in-Chrome + paid API |
| #36 | Code scanning toggle | Operator runs Claude-in-Chrome |
| #37 | GH PAT runbook | Operator runs Claude-in-Chrome + local script |
| #38 | Connector decision | Operator decides ship/postpone |
| #40 | Phase 6.B codemode | Agent — blocked on billing for baseline measurement; partial overlap with #12 deploy path |
| (none) | — | All Phase 14 / 13 / 18 / 19 issues closed |

**The autonomous queue is genuinely exhausted.** Every remaining open
issue requires either operator action (Claude-in-Chrome runbook),
operator decision, or operator-funded billing (the codemode 40%
measurement). No silent degradation; each blocker is documented.

## What this PR ships

Just this `last-tick.md` update + `next-actions.md` cleared.

## Next tick (whenever the operator triggers it)

Top of the queue:

1. **Operator runs the 5 active runbooks** (#33, #34, #36, #37; #35 optional).
   - Unblocks Phase 8 C4 (#12)
   - Unblocks #40-A (codemode in Cloudflare Sandbox)
   - Unblocks branch protection (Layer 2)
   - Unblocks Phase 11.C embeddings (if #35 ran)
2. **Operator decides Phase 12** (#16, #38). Postpone is the recommendation.
3. **Agent: #40-B** (allowlist trim) once operator splits #40. No deploy needed.
4. **Agent: spotify-confidence 38-failure investigation** (tick 11 leftover).
5. **Agent: gcp 100-URL failure investigation** (tick 8 leftover).

## Session metadata

- Session ID: `9d8f8432-101f-466f-9c31-b1021ea934e7` (continuation of tick 12)
- Total ticks recorded: 13
- PRs opened this tick: 5 (#95, #97, #98, #99, this one)
- Issues closed this tick: 7 (#41, #42, #47, #48, #49, #94, #96)
- Issues with explicit blocker comments: 3 (#12, #38, #40)
- Final main HEAD pre-tick-13-PR: `fac8365 docs(phase-14): refresh README.md` (PR #99 squash-merged)
- All commits this session use the `(O<N>)` outcome-ID convention (with one exception in PR #97's commit body — already merged to main).

## Boris Cherny pattern — operationalized further

Tick 12 demonstrated the scaffolded-agent-writes-100%-of-codebase loop.
Tick 13 closes the remaining autonomous surface:

- Operator writes one prompt ("work through all open issues, no silent
  failures, no gradual degradation")
- Agent reads the issue queue, categorizes by blocker type, decomposes
  agent-actionable work into atomic PRs, verifies prior work, ships
  fixes for genuine bugs surfaced during the sweep
- CI gates merge; auto-merge fires when green
- Heartbeat persists the arc

The session has now consumed every issue the agent can complete
autonomously. The chassis is honest about what it can't do.

This file IS the handoff. A fresh session reading it knows the
queue is operator-gated, what's actionable when each blocker
clears, and where to start.
