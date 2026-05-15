---
session: 2026-05-15
loop_skill: .claude/loop.md
checker: scripts/check-goals.ts
---

# Active goals — operator's open-queue unblock

Each goal has a **deterministic pass/fail check** runnable via
`npx tsx scripts/check-goals.ts`. The `/loop` skill polls the
checker; goals flip from `pending` → `pass` once their condition
holds. The session ends when every required goal is `pass`.

## G1 — PR #107 merged (CLI-only workarounds playbook)

- **Outcome:** the playbook lives in `main`
- **Check:** `gh pr view 107 --json state --jq .state` returns `MERGED`
- **Status:** pending (auto-merge waiting on CI)
- **Owner:** automerge workflow

## G2 — @xenova/transformers swap shipped (closes #35)

- **Outcome:** `src/lib/embeddings.ts` exists, exports `embed()` + `cosineSimilarity()`, citing the Voyage-replacement issue (#35), with passing tests, AND `@xenova/transformers@^2.17.2` is in `package.json` `dependencies`
- **Check:** file exists; `package.json` deps include the dep; `npx tsx src/lib/embeddings.test.ts` returns 0
- **Status:** pending (this PR)
- **Owner:** agent

## G3 — CF account ID + worker name set (closes #34)

- **Outcome:** `gh secret list` shows `CLOUDFLARE_ACCOUNT_ID` AND `gh variable list` shows `CLOUDFLARE_WORKER_NAME=ke-cloud-agent`
- **Check:** `gh secret list --repo subagentceo/knowledge-engineering` includes `CLOUDFLARE_ACCOUNT_ID`; `gh variable list` includes `CLOUDFLARE_WORKER_NAME`
- **Status:** pending — needs operator (`gh secret set`, 2 commands)
- **Owner:** operator (CLI, ~30 sec)

## G4 — CF API token set (closes #33)

- **Outcome:** `gh secret list` shows `CLOUDFLARE_API_TOKEN`
- **Check:** secret named `CLOUDFLARE_API_TOKEN` is set
- **Status:** pending — needs operator (`wrangler login` + dashboard tab + `gh secret set`)
- **Owner:** operator (CLI + 1 browser tab, ~3 min)

## G5 — GH project + branch protection set (closes #37)

- **Outcome:** `gh project list --owner subagentceo` includes "Knowledge Engineering"; `gh api repos/.../rulesets` includes "Protect main — no HITL"
- **Check:** project exists; ruleset present
- **Status:** pending — needs operator (`GITHUB_TOKEN=$(gh auth token) npm run setup:project setup:branch-protection`)
- **Owner:** operator (CLI, ~1 min)

## G6 — CF Sandbox deployed (closes #12)

- **Outcome:** `cloudflare-preview.yml` workflow succeeds on a recent PR; worker `ke-cloud-agent` exists per CF MCP `workers_list`
- **Check:** workflow status `success`; worker is listed
- **Status:** blocked on G3 + G4 (cascading)
- **Owner:** auto-fires when G3 + G4 pass

## G7 — Codemode wired in Sandbox (closes #102)

- **Outcome:** `infra/cloudflare/src/worker.ts` uses `@cloudflare/codemode`; baseline + post token measurements committed to `seeds/memory/heartbeat/baselines/phase-6-tokens.json`
- **Check:** `@cloudflare/codemode` in `infra/cloudflare/package.json`; baselines file exists with ≥40% reduction
- **Status:** blocked on G6
- **Owner:** agent (post-G6)

## Loop semantics

Each `/loop` tick runs `npx tsx scripts/check-goals.ts`. The
checker emits one line per goal: `<id> <pass|fail|blocked> <reason>`.
Exit code 0 if every NON-blocked goal passes; 1 otherwise.

When all required goals pass, write a final tick to
`seeds/memory/heartbeat/last-tick.md` and yield. The `/loop` skill
recognizes the all-pass terminal state and stops.
