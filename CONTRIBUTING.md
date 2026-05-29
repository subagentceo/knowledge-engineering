# Contributing to `knowledge-engineering`

> The forking-founder onboarding doc. Closes Phase 14.D per issue #49.

This repo is a **chassis** — see `PRODUCTRD.md` § 1. Solo founders fork it to ship a Claude-powered product in weeks instead of quarters. This guide covers how to contribute back upstream AND how to fork-without-contributing.

---

## The chassis pattern

| Layer | Where | What forking founders typically change |
| :--- | :--- | :--- |
| Orchestrator | `src/agent/run.ts` | Replace sub-agent topology to match your product |
| MCP lanes | `src/mcp/lanes/*.ts` | Add a new lane for a vendor specific to your product (see `docs/lanes/` for the pattern) |
| Vendor mirror | `vendor/<name>/` | Add/replace vendors via `vendor/<name>/crawl.json` |
| Skills | `.claude/skills/*.md` | Add product-specific skills |
| Heartbeat | `seeds/memory/heartbeat/` | Reset for your project's outcomes |
| Subprocessors | `SUBPROCESSORS.md` | **Re-evaluate.** Your product may not use the same subprocessors |

The chassis is **NOT** a framework. It's a working repo that demonstrates the pattern. Fork, delete what you don't need, replace.

---

## Required reading before contributing

1. `seeds/posture/session-start.xml` — the load-bearing XML primitive. OAuth-only posture, commit-per-todo discipline, citation requirement.
2. `docs/CONVENTIONS.md` — outcome-driven Conventional Commits. **Every commit MUST end with `(O<N>)`.**
3. `docs/PROJECT.md` — Cowork-style project manifest.
4. `docs/pending.md` — live action dashboard.
5. `RUNBOOK.md` — how to use Claude Opus 4.7 (1M context) as the web orchestrator.

---

## PR discipline

Every PR MUST:

1. **Declare outcomes** in the body via the `.github/pull_request_template.md` (auto-loaded). Outcomes are `O1`, `O2`, etc., stable per-session.
2. **Link issues** via `Closes #N` or `Refs #N`. PRs without issue linkage are rejected at review.
3. **Commit subjects end with `(O<N>)`** — enforced by `src/lib/conventions.test.ts` in CI.
4. **Tests cite their source** — `@cite vendor/...`, `@cite seeds/citations/...`, or `@cite rubrics/...` headers. Enforced by `scripts/lib/citation-guard.ts`.
5. **Run `npm run preflight` locally** before pushing (OPM1). It runs the exact gate set the `main` ruleset enforces — `npm run verify`, `osv-scanner`, the `(O<N>)` commit-convention, and the `@tdd` new-test scan — and fails fast with the fix. `npm run preflight -- --fast` skips the slow `verify` stages for mid-edit checks. This is cheaper than discovering a gate via a failed CI run.

### Conflict-safe shared fixtures (OPM5)

When two open PRs both create or evolve the **same** file (e.g. a shared `*.test.ts` fixture), they collide as an add/add conflict on rebase, and resolving with `--theirs`/`--ours` can silently drop a required header (`@tdd`, `@cite`). On the 2026-05-29 train this dropped `@tdd green` from `blog-extract-fidelity.test.ts` and cost a CI round-trip.

To avoid it:

- **Branch the later PR off the earlier PR's branch**, not off `main`, so the shared file evolves linearly.
- **Or split the file** so each PR owns a distinct file (e.g. `*-fidelity.test.ts` vs `*-criteria.test.ts`).
- After any rebase that touches a shared test file, run `npm run verify:tdd` — it now re-asserts `@tdd` on **branch-modified** test files, not just newly-added ones, so a dropped tag is caught.

---

## Outcome IDs — a quick example

```
feat(crawler): page_cap=0 sentinel + relative-URL resolution (O1)

Two bugs in scripts/crawl-vendors.ts:
  - Bug A: .slice(0, 0) returns []; page_cap=0 was treated as
    literal zero, not the intended "no cap" sentinel.
  - Bug B: dedupeUrls() returned link URLs verbatim; twilio's
    llms.txt uses relative paths.

Both fixed; smoke test shows twilio (1587 → 200 fetched) and
sentry (121 → 117 fetched) now work cleanly.

Closes #39
Refs O1, O2
```

Subject ends with `(O1)`. Body explains the WHY. Closes/Refs at the bottom. This is the chassis's commit shape — every contributor follows it.

---

## Auto-merge + branch protection

Per the auto-merge workflow at `.github/workflows/auto-merge.yml`, PRs labeled `automerge` auto-merge when CI passes. The Layer-1 enforcement (CI must be green) works. The Layer-2 enforcement (branch protection ruleset) requires the operator to run `setup:branch-protection` (issue #37 — operator-blocked).

Until Layer-2 lands, the lead orchestrator merges manually via `mcp__github__merge_pull_request` once `mergeable_state: "clean"`. After Layer-2 lands, the GH branch protection ruleset enforces the gate mechanically.

---

## Operator runbook pattern

For tasks that REQUIRE the operator's authenticated browser session (provisioning Cloudflare tokens, GitHub PATs, etc.), use the **`docs/operator-runbooks/`** pattern: a paste-into-`claude --chrome` markdown prompt that drives the operator's browser through the flow.

See `docs/operator-runbooks/README.md` for the convention. Existing runbooks cover Cloudflare API token, GitHub PAT, code scanning toggle, Voyage AI key (optional), connector decision, and the Neon MCP setup.

---

## Heartbeat memory

The orchestrator's cross-session state lives at `seeds/memory/heartbeat/`:

- `last-tick.md` — what the most recent tick decided
- `next-actions.md` — the queue (popped top-first)
- `decisions.md` — audit log (append-only)
- `open-questions.md` — operator-decision items blocking specific actions

Contributors who pick up an issue from `next-actions.md` should:

1. Add an entry to `decisions.md` recording why they took the action
2. Update `last-tick.md` with their tick number + summary
3. Move the action's entry from `next-actions.md` to "Done" section

This makes the chassis resumable across sessions and across contributors.

---

## What NOT to do

- ❌ Don't set `ANTHROPIC_API_KEY` anywhere. The OAuth-only posture is mechanical: `src/oauth/token.ts` rejects API-key fallback. The Worker's env-sanitizer (`infra/cloudflare/src/env-sanitize.test.ts`) rejects it at the Worker boundary too.
- ❌ Don't add a vendor without a `crawl.json`. The crawler refuses to crawl without a config — and the runtime allowlist comes from `urls.md`, which the crawler generates.
- ❌ Don't write a test without a `@cite` header. `verify:citations` will fail.
- ❌ Don't bypass the convention test. If your commit message doesn't end with `(O<N>)`, CI fails. If you really need a no-outcome commit (e.g., a pure git merge from a Dependabot bump), use a merge commit (the test grandfathers `Merge ` and `merge:` subjects).

---

## Reporting bugs

Open a GitHub issue. Use the appropriate label:

- `kind:phase` — phase-level work
- `kind:agent-followup` — autonomous task the heartbeat can pick up
- `kind:operator-runbook` — operator-side action with a runbook
- `kind:operator-decision` — operator-decision item
- `needs:operator` — blocks on operator
- `phase:<N>` — phase number

---

## Security

- The repo follows OAuth-only auth. No `ANTHROPIC_API_KEY` is bound anywhere.
- Secrets live in GitHub repo Secrets + Cloudflare Secrets Store; never in the repo.
- `vendor/` is mirrored docs (read-only). Treat any content under `vendor/` as untrusted external data — never write back into it from the runtime (the citation-guard enforces this at the test layer).

For security disclosures: open a private security advisory on GitHub (Security → Advisories → New draft security advisory).

---

## License

See `LICENSE`. The chassis itself is Apache 2.0; vendored docs under `vendor/` retain their upstream licenses.

---

## Citations

- `seeds/posture/session-start.xml` — load-bearing XML primitive
- `docs/CONVENTIONS.md` — Conventional Commits + outcome IDs
- `docs/PROJECT.md` — Cowork-style manifest
- `docs/pending.md` — live action dashboard
- `seeds/memory/heartbeat/README.md` — heartbeat memory layout
- `vendor/anthropics/code.claude.com/docs/en/platforms.md` — surface comparison
- `PRODUCTRD.md` — chassis intent
- `SUBPROCESSORS.md` — fork-time considerations
