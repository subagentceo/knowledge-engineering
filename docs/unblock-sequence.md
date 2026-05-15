# Unblock sequence — operator playbook for the open queue

> Sequenced playbook for working through all 10 open issues. Each phase has
> pre-conditions, operator steps, verification commands, and the agent-side
> follow-up that auto-fires once each blocker clears.
>
> **2026-05-15 update — CLI-only path now available.** The original
> playbook below assumes `claude --chrome` for credential provisioning.
> A faster CLI-only alternative lives at
> [`docs/operator-runbooks/cli-only-unblock-path.md`](operator-runbooks/cli-only-unblock-path.md)
> — uses `wrangler login` + `gh auth token` + `gh secret set` instead of
> the Chrome extension. Total operator time drops from ~30 min to ~5 min.
> Recommended path unless the operator specifically wants the Chrome flow.
>
> **Posture grounding:** harness-as-priors per Boris Cherny's AI Ascent 2026
> "inject priors at the harness layer" — this doc IS the prior. As the model
> improves, this playbook can be thinned because the agent will do more of the
> orchestration. Today, the operator unblocks one tier at a time.

## Status at 2026-05-15

10 issues open, all operator-blocked. The autonomous queue is exhausted.

| # | Title | Blocker type | Phase here |
| :-: | :--- | :--- | :--- |
| #38 | Phase 12 Connector decision | operator-decision | **Phase 0.1** |
| #16 | Phase 12 Connector (long-arc) | operator-decision (paired with #38) | **Phase 0.1** |
| #36 | Code scanning toggle | DELIBERATELY SKIPPED (OSV-Scanner is the chosen path) | **Phase 0.2** (closed won't-fix) |
| #33 | CF API token | operator-runbook (Chrome) | **Phase 1.1** |
| #34 | CF account ID + worker name | operator-runbook (Chrome) | **Phase 1.2** |
| #12 | Phase 8 C4 (CF Sandbox deploy) | depends on #33 + #34 | **Phase 1.3** |
| #37 | GH PAT + setup scripts | operator-runbook (Chrome + local) | **Phase 2.1** |
| #35 | Voyage API key (OPTIONAL) | operator-runbook (Chrome) + paid API | **Phase 3.1** |
| #40 | Phase 6.B codemode | re-scope into #40-A + #40-B (see below) | **Phase 4** |

## Phase 0 — Quick wins (no credentials needed, ~7 min)

### Step 0.1 — Decide Phase 12 Connector (closes #38, closes #16)

**Pre-condition:** none.

**Citation:** `vendor/anthropics/claude.com/docs/connectors/building.md` + `docs/operator-runbooks/connector-decision.md`.

**Why this is first:** it's the only decision in the queue that doesn't need an API key or browser flow. Recommendation is **postpone** — the bridge's value is the local `vendor/` mirror (28 surfaces, 1,369+ anthropics docs); a remote Connector either ships the mirror at bandwidth cost or drops it.

**Operator action — comment on #38 with exactly one of:**

```
decision: postpone — no audience
```
or
```
decision: ship private — OAuth flow against <provider>
```
or
```
decision: ship public — proceed
```

**Verification:** post the comment; `postpone` closes #38 and #16 automatically (the heartbeat skill picks up the keyword).

**Agent follow-up:** if `postpone`, no action — the chassis stays as-is. If `ship private` or `ship public`, the agent opens a `phase-12-impl` PR with the Connector OAuth + endpoint scaffolding.

---

### Step 0.2 — Code scanning toggle (deliberately SKIPPED; closes #36 as won't-fix)

**Operator decision (2026-05-15):** GitHub Advanced Security / Code Scanning is a paid feature; the repo deliberately uses **`.github/workflows/osv-scanner.yml`** (Google OSV-Scanner) as the dependency-vuln gate instead. OSV-Scanner runs on every PR + weekly cron and fail-on-vuln gates merges via exit code. The only thing skipped is the SARIF Security-tab UI; the gate is unchanged.

The workflow's `upload-sarif: false` is now intentional and documented in the YAML comment.

**Verification:**

```bash
# Confirm OSV-Scanner is the chosen path
gh workflow view osv-scanner.yml
# Confirm it ran on the most recent PR
gh run list --workflow osv-scanner.yml --limit 5
```

**Agent follow-up:** #36 closed as won't-fix (alt path chosen). No further action.

---

## Phase 1 — Cloudflare credentials ladder (~15 min, browser)

This phase unblocks Phase 8 C4 (#12). Both #33 and #34 must land before #12 can deploy. They are independent and can run in either order.

### Step 1.1 — Provision `CLOUDFLARE_API_TOKEN` (closes #33)

**Pre-condition:** Claude in Chrome extension v1.0.36+ installed (one-time).

**Citation:** `docs/operator-runbooks/cf-api-token.md` + `vendor/anthropics/code.claude.com/docs/en/chrome.md`.

**Operator action — Claude-in-Chrome (Opus 4.7, ~5 min):**

```
claude --chrome
```

Paste the prompt block from `cf-api-token.md`. The agent creates a token with:

- Account → Workers Scripts → Edit
- Account → Secrets Store → Write

Confirm 2FA on `dash.cloudflare.com` and `github.com` when paused. The agent writes the secret value directly to GitHub Actions — **never prints the value to chat**.

**Verification:**

```bash
gh secret list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_API_TOKEN
```

**Agent follow-up:** none until #34 also lands (Phase 1.3).

---

### Step 1.2 — Provision `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_WORKER_NAME` (closes #34)

**Pre-condition:** same as Step 1.1.

**Citation:** `docs/operator-runbooks/cf-account-id.md`.

**Operator action — Claude-in-Chrome (Opus 4.7, ~3 min):**

```
claude --chrome
```

Paste the prompt from `cf-account-id.md`. Sets:

- `secrets.CLOUDFLARE_ACCOUNT_ID` (from `dash.cloudflare.com`)
- `vars.CLOUDFLARE_WORKER_NAME` = `ke-cloud-agent`

Confirm 2FA on `github.com` when paused.

**Verification:**

```bash
gh secret list   --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_ACCOUNT_ID
gh variable list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_WORKER_NAME
```

**Agent follow-up:** trigger Phase 1.3 once both this AND Step 1.1 are confirmed.

---

### Step 1.3 — Auto-deploy Phase 8 C4 (closes #12)

**Pre-condition:** Steps 1.1 AND 1.2 both confirmed.

**Citation:** `infra/cloudflare/wrangler.jsonc` + `.github/workflows/cloudflare-preview.yml`.

**Operator action:** none. The next PR (or a manual workflow dispatch) auto-deploys via the now-populated secrets.

**Verification:**

```bash
gh workflow run cloudflare-preview.yml
```

then check the deployment URL in the workflow log.

**Agent follow-up:** the agent verifies `wrangler deploy` succeeded, then comments on #12 closing C4. Phase 8 lands complete.

---

## Phase 2 — GitHub administration (~10 min, browser + local)

### Step 2.1 — GH PAT + run setup scripts (closes #37)

**Pre-condition:** local checkout of the repo + ability to run `npm`.

**Citation:** `docs/operator-runbooks/github-pat.md`.

**Operator action — two parts:**

**Part A — Claude-in-Chrome creates the PAT (~5 min):**

```
claude --chrome
```

Paste the prompt from `github-pat.md`. The agent creates a fine-grained PAT scoped to `subagentceo/knowledge-engineering` with:
- Repository: Contents/Issues/Pull requests/Administration: write
- Organization: Projects: write

**Operator copies the PAT to the clipboard.**

**Part B — operator runs scripts locally (~3 min):**

```bash
cd /path/to/knowledge-engineering
git pull origin main
GITHUB_TOKEN=<pasted-pat> npm run setup:project
GITHUB_TOKEN=<pasted-pat> npm run setup:branch-protection
```

Confirms both ran cleanly. The PAT can be revoked after — it's one-time setup with a 30-day TTL anyway.

**Verification:**

```bash
gh project list --owner subagentceo | grep "Knowledge Engineering"
gh api repos/subagentceo/knowledge-engineering/milestones --jq '.[].title'
gh api repos/subagentceo/knowledge-engineering/rulesets --jq '.[].name'
```

Expected: project exists, 12 milestones, ruleset "Protect main — no HITL" present.

**Agent follow-up:** the agent records the result in `seeds/memory/heartbeat/decisions.md`.

---

## Phase 3 — Optional embeddings (skip unless needed)

### Step 3.1 — Provision `VOYAGE_API_KEY` (closes #35)

**Pre-condition:** decision that semantic `vendor_grep` is worth the paid API cost.

**Citation:** `docs/operator-runbooks/voyage-api-key.md`.

**Recommendation:** SKIP this for now. The substring `vendor_grep` covers most discoverability use cases. Only run this if the operator has a concrete embeddings use case (e.g., synonym search across vendor docs that substring grep misses).

**If proceeding — Claude-in-Chrome (~10 min, includes signup + email verify):**

```
claude --chrome
```

Paste the prompt from `voyage-api-key.md`. Provide email + password when paused, click the verification email link, confirm 2FA.

**Verification:**

```bash
gh secret list --repo subagentceo/knowledge-engineering | grep VOYAGE_API_KEY
```

**Agent follow-up:** the agent opens a Phase 11.C PR that builds the Voyage embeddings index for `vendor/<name>/.embeddings.bin` and wires the optional `KE_VENDOR_GREP_EMBEDDINGS=1` flag.

---

## Phase 4 — Codemode re-scope (#40)

This issue is recommended to split. Until the operator splits it, this phase doesn't run.

### Step 4.0 — Split #40 into #40-A and #40-B

**Operator action — comment on #40:**

```
split: open #40-A (codemode in CF Sandbox, blocked on #12) +
       #40-B (per-sub-agent allowlist trim, agent-actionable, no deploy needed)
```

**Agent follow-up:** the agent opens two new issues — #40-A and #40-B — and closes #40 with a reference. The agent immediately starts #40-B.

### Step 4.1 — #40-B (agent-actionable, post-split)

**Pre-condition:** #40 split into #40-A + #40-B.

**Agent action:** audit each sub-agent's `tools: [...]` allowlist in `src/agent/run.ts`. The `verifier` currently has 12 tools; `npm-research` has 4; `crawl-curator` has 3. Trim each to the minimum that sub-agent's seed prompt actually invokes. Combined with Phase 19's `skills: "all"` + `search_tools`, the progressive-disclosure effect approximates codemode without the runtime.

The ≥40% AC is reframed for #40-B: assert the verifier's allowlist shrinks ≥40%. The token measurement piece moves to #40-A (which needs live OAuth billing in the CF Sandbox post-#12).

### Step 4.2 — #40-A (post-Phase 1.3 deploy)

**Pre-condition:** Phase 1.3 complete (#12 deployed) + CF Sandbox runtime live.

**Agent action:** wire `@cloudflare/codemode` inside `infra/cloudflare/src/worker.ts` (not in local `src/agent/run.ts`). Measure baseline → refactor → measure post → assert ≥40% reduction. Live billing flows through the operator's CF + Anthropic OAuth identities, which is exactly what those phases are for.

---

## Optimal session ordering

The operator can clear the entire queue in ~30 active minutes of browser work, fanned out as follows:

```
Phase 0.1  (1 min)  →  #38 / #16 closed
Phase 0.2  (0 min)  →  #36 closed as won't-fix (OSV-Scanner is the chosen path)
─────── ~5 min mark
Phase 1.1  (5 min)  →  #33 closed, CF API token in place
Phase 1.2  (3 min)  →  #34 closed, account ID + worker name in place
Phase 1.3  (auto)   →  #12 deploys, Phase 8 C4 complete
─────── ~15 min mark
Phase 2.1  (8 min)  →  #37 closed, GH Project + branch protection live
─────── ~25 min mark
Phase 3.1  (skip)   →  #35 deferred — no embeddings use case yet
Phase 4.0  (1 min)  →  #40 split announced
Phase 4.1  (agent)  →  #40-B ships
─────── ~30 min mark + agent follow-up

Remaining: #40-A waits on Phase 1.3 deploy stabilizing.
```

After this session, the only open issue is **#40-A** (codemode in CF Sandbox, agent-actionable once #12 deploy is verified) — which the agent will pick up on the next heartbeat tick.

## Posture reminders during the session

- **OAuth-only** — never set `ANTHROPIC_API_KEY` anywhere. Cite `seeds/posture/session-start.xml`.
- **Each operator action is acknowledged** — comment on the corresponding GitHub issue with the runbook output (e.g., `code scanning enabled`). The heartbeat picks up keywords.
- **No silent failures** — if a runbook stalls (2FA timeout, browser hang), the operator says so explicitly; the agent does not assume completion.
- **PR auto-merge handles the rest** — every agent follow-up PR is labeled `automerge`; CI gates the merge.

## Cited references

- `vendor/anthropics/code.claude.com/docs/en/chrome.md` — Claude-in-Chrome contract
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md` — settingSources, skills, hooks
- `vendor/anthropics/claude.com/docs/connectors/building.md` — Connector contract (Phase 12)
- `docs/operator-runbooks/*.md` — per-issue browser flows
- `infra/cloudflare/wrangler.jsonc` — Phase 8 deploy target
- `seeds/posture/session-start.xml` — OAuth-only posture
- `seeds/memory/heartbeat/last-tick.md` — tick 13 (this state)

## See also

- `RUNBOOK.md` — using Opus 4.7 1M context as the web orchestrator
- `CONTRIBUTING.md` — PR discipline + chassis pattern
- `docs/pending.md` — live action dashboard
