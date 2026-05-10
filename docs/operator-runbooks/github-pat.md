---
runbook: github-pat
outcome: Fine-grained GITHUB_TOKEN PAT created; setup:project + setup:branch-protection scripts run; GitHub Project v2 + main ruleset live
unblocks: All future heartbeat work (issues/PRs/milestones); branch protection on main
operator-manual-steps: confirm 2FA on github.com; run 2 npm scripts locally
---

# Runbook: GitHub PAT + setup scripts

Cited from:
- `vendor/anthropics/code.claude.com/docs/en/chrome.md`
- `scripts/setup-github-project.ts` (Phase 4 — needs PAT)
- `scripts/setup-branch-protection.ts` (Phase 4 — needs PAT)
- `docs/governance.md` — branch ruleset spec

## Outcome

Two things land:

1. **A fine-grained Personal Access Token** scoped to
   `subagentceo/knowledge-engineering` with:
   - Repository: Contents: write, Issues: write, Pull requests: write
   - Repository: Administration: write (for ruleset creation)
   - Organization: Projects: write (for Project v2)
2. **`setup:project` + `setup:branch-protection` run**, which create:
   - GitHub Project v2 "Knowledge Engineering"
   - 12 milestones (Phase 1 through Phase 12)
   - The `Protect main — no HITL` Repository Ruleset
   - Links existing issues #5-#16 to milestones

## Paste-into-`claude --chrome` prompt

```
You are Claude in Chrome (model: Opus 4.7), running in the operator's
authenticated browser session. Your outcome is to create a fine-grained
GitHub PAT scoped to subagentceo/knowledge-engineering with the
permissions needed by scripts/setup-github-project.ts and
scripts/setup-branch-protection.ts.

Citations:
- vendor/anthropics/code.claude.com/docs/en/chrome.md
- scripts/setup-github-project.ts (consumer)
- scripts/setup-branch-protection.ts (consumer)

## Steps

1. Open a new tab to https://github.com/settings/personal-access-tokens
2. Confirm I'm signed in. Click "Generate new token" (fine-grained).
3. Set Token name: "knowledge-engineering setup (one-time)".
4. Set Expiration: 30 days from today (this is one-time setup; doesn't
   need to be long-lived).
5. Set "Resource owner" to the operator's primary identity (the one with
   admin on subagentceo) — pause and ask if ambiguous.
6. Set "Repository access" to "Only select repositories" →
   subagentceo/knowledge-engineering.
7. Under "Repository permissions", set these to "Read and write":
   - Administration  (for ruleset creation)
   - Contents
   - Issues
   - Pull requests
   And leave "Read-only" for everything else (Actions, Metadata).
8. Under "Organization permissions", set "Projects" to "Read and write".
9. Click "Generate token".
10. The token only appears once. Copy it to clipboard via the "Copy"
    button. DO NOT print the token value to chat output.
11. Pause and tell the operator to:

    Run these two commands locally with the token in env:
    ```
    cd ~/path/to/knowledge-engineering
    git pull origin main
    GITHUB_TOKEN=<paste> npm run setup:project
    GITHUB_TOKEN=<paste> npm run setup:branch-protection
    ```

    Both scripts are idempotent — re-running them is safe.

12. Once the operator confirms both scripts ran cleanly, return summary:
    - "✓ PAT created (expires <date>)"
    - "✓ setup:project ran: <output summary>"
    - "✓ setup:branch-protection ran: <output summary>"

## Safety

- If GitHub prompts for 2FA, pause and tell the operator to confirm.
- The PAT has Administration:write on the repo — this is powerful.
  Confirm the operator wants this scope before generating. (It's
  required for `scripts/setup-branch-protection.ts` to create the
  Repository Ruleset.)
- 30-day expiry: this is intentionally short. The operator can
  re-fire this runbook if a 60+ day project needs the PAT longer.
- NEVER print the token value to chat. Even when telling the operator
  to paste it into the npm command, reference "the token you just
  copied" rather than echoing the value.
```

## Verification

After the operator runs both scripts:

```bash
# Project should exist
gh project list --owner subagentceo | grep -i "Knowledge Engineering"

# Milestones should exist
gh api repos/subagentceo/knowledge-engineering/milestones --jq '.[].title'
# expected: "Crawler infrastructure", "Crawl all 12 + commit", ...

# Ruleset should exist
gh api repos/subagentceo/knowledge-engineering/rulesets --jq '.[].name'
# expected: "Protect main — no HITL"
```

After verification, the operator can DELETE the PAT
(<https://github.com/settings/personal-access-tokens> → token name → Revoke).
The heartbeat doesn't need a long-lived PAT for routine work — `gh`
auth or the workflow-scoped `GITHUB_TOKEN` covers it.
