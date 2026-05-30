---
runbook: jira-key-rename-and-github-integration
outcome: The Jira project is renamed SCRUM -> KENG with issue numbering starting at 1000, and the Jira Software + GitHub integration is installed, so branches named <git-user>/KENG-NNNN-<desc> auto-link bidirectionally between GitHub and Jira.
unblocks: The canonical branch-naming topology (src/lib/branch-topology.ts) auto-linking; traceability from branch -> commit -> PR -> Jira issue -> OTel session.id
operator-manual-steps:
  - rename the Jira project key (Jira admin, browser)
  - set issue numbering to start at 1000
  - install the Jira Software + GitHub app and grant the repo
  - add a GitHub-native autolink reference as belt-and-suspenders
outcome_id: O1
---

# Operator runbook: Jira SCRUM -> KENG rename + Jira<->GitHub integration

These are the **browser/admin steps** the Atlassian MCP cannot perform (its 25
tools cover issue create/update/get/search/transition + read-only project
queries, but no project-admin or app-install actions). Tracking: SCRUM-37
(becomes KENG-37 after step 1).

The branch convention (PR1, `src/lib/branch-topology.ts`) is already bound to
`JIRA_BOARD = "KENG"` with `ISSUE_MIN = 1000`. These steps make the live Jira +
GitHub match it.

## Why KENG + start-at-1000

- **KENG** (KNOWledge-ENGineering) is a fixed 4-char key — type-safe width,
  and signals a configured project rather than Jira's default `SCRUM` sample.
- **Numbering from 1000** makes every key naturally 4 digits
  (`KENG-1000`..`KENG-9999`). The literal key is the 4-digit key, so it
  auto-links with **no zero-padding and no special matcher config**. ~9000
  tickets of headroom.

## 1. Rename the project key SCRUM -> KENG

Jira admin, in a browser:

1. Go to `https://subagentceo.atlassian.net/jira/software/projects/SCRUM/settings/details`
2. Change **Key** from `SCRUM` to `KENG`. (Name can stay
   `subagentceo__knowledge-engineering__` or become "Knowledge Engineering".)
3. Save. Jira migrates existing issues `SCRUM-32..37` -> `KENG-32..37` and
   leaves `SCRUM-*` redirects, so old links keep working.

> Existing issues 32-37 stay 2-digit (pre-1000). That is fine; the 4-digit
> convention applies to **new** work from KENG-1000 onward.

## 2. Start new issue numbering at 1000

Jira Cloud does not expose a "next issue number" field in the standard UI. Two
options:

- **Simple:** create throwaway issues until the counter reaches 999, then the
  next real issue is `KENG-1000`. Delete the throwaways (numbers are not
  reused, so the counter stays >= 1000). Tedious but no API needed.
- **API (preferred):** there is no public endpoint to set the counter
  directly; the supported path is bulk-creating to advance it, or contacting
  Atlassian support for a counter reset. Document whichever you use here.

If neither is practical, relax the convention floor: set `ISSUE_MIN` in
`src/lib/branch-topology.ts` to the current max issue number rounded up, and
zero-pad in display only. (The start-at-1000 approach is preferred precisely
because it avoids padding.)

## 3. Install Jira Software + GitHub

GitHub org admin + Jira admin, in a browser:

1. Go to <https://github.com/marketplace/jira-software-github>
2. Click **Set up a plan** / **Install it for free** -> choose the
   **subagentceo** organization.
3. Grant access to **knowledge-engineering** (or all repos).
4. Complete the OAuth consent linking the GitHub org to the
   `subagentceo.atlassian.net` Jira site (you must be admin on both).
5. In Jira: **Settings -> Apps -> GitHub** confirm the connection shows the
   subagentceo org and the knowledge-engineering repo.

After this, commits/branches/PRs containing a `KENG-NNNN` key appear in the
Jira issue's Development panel, and Jira smart commits work
(`KENG-1000 #comment ...`, `#time`, `#transition`).

## 4. Add a GitHub-native autolink reference (belt-and-suspenders)

Repo admin, in a browser (independent of the Jira app — makes `KENG-NNNN`
clickable in GitHub even before/without the app):

1. Go to
   `https://github.com/subagentceo/knowledge-engineering/settings/key_links`
2. **Add autolink reference**:
   - Reference prefix: `KENG-`
   - Target URL: `https://subagentceo.atlassian.net/browse/KENG-<num>`
   - (Numeric)
3. Save. Now `KENG-1037` anywhere in a PR/issue/commit on GitHub links to the
   Jira issue.

## Verification

- `git checkout -b "$(npx tsx scripts/branch/generate.ts --issue 1000 --desc 'smoke test')"`
  yields `alexjadecli/KENG-1000-smoke-test` and `npx tsx scripts/branch/validate.ts`
  prints a conforming check.
- Push a commit referencing `KENG-1000`; confirm it appears in the Jira issue's
  Development panel and that `KENG-1000` is clickable in the GitHub PR.

## Related

- `src/lib/branch-topology.ts` — the convention this runbook makes live.
- `docs/CONVENTIONS.md` — branch-topology section (PR2).
- `vendor/anthropics/code.claude.com/docs/en/github-enterprise-server.md` —
  note: the GitHub MCP server does NOT support GHES; use `gh` for GHES hosts.
