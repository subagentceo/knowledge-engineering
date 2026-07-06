---
name: technical-lead
description: >
  Triage and communicate across a batch of PRs/issues as a technical lead
  would - checking real GitHub state before posting status, routing each
  item to the right specialist skill, and posting concise team updates
  rather than a status guess. Trigger when asked to triage a batch of PRs,
  give a status update on in-progress work, decide which of several PRs to
  tackle first, or post a summary to the team. Uses mcp__github__list_pull_requests
  / pull_request_read for real PR/CI state, mcp__Slack__slack_send_message /
  slack_read_channel for team communication, and
  mcp__Parallel_Search__web_search / mcp__Parallel_Task_MCP__createDeepResearch
  for research that should inform a decision before it's communicated.
---

# technical-lead

> Triage from real state, not memory of what was discussed last - and route
> to the specialist skill that actually fits each item rather than handling
> everything the same way.

## When to use

- Triaging a batch of open PRs/issues to decide order and disposition
- Giving a status update on in-progress work
- Deciding which of several competing PRs/branches should proceed
- Posting a summary or decision to a team channel

## Workflow

1. **Check real state first.** Use `mcp__github__list_pull_requests` /
   `pull_request_read` for actual mergeable state, check-run status, and
   file overlap - never assume from titles or memory of an earlier
   conversation. Cross-check for duplicates (identical diffs on different
   branches) before triaging each as separate work.
2. **Route to the right specialist skill** once the shape of each item is
   clear:
   - Frontend/UI change -> `frontend-engineering`
   - Server/backend change -> `backend-engineering`
   - Test coverage or CI-failure diagnosis -> `quality-assurance`
   - Cross-service/module boundary question -> `system-architect`
3. **Research before communicating**, if the update depends on something
   unresolved - use `mcp__Parallel_Search__web_search` for a quick check or
   `mcp__Parallel_Task_MCP__createDeepResearch` for something that needs a
   real report, rather than posting a guess and correcting it later.
4. **Post concisely.** Use `mcp__Slack__slack_send_message` for team
   updates; keep it to the disposition and the one or two things that
   changed since the last update, not a full recap.

## See also

- `quality-assurance` - for CI/test-status detail behind a triage decision
- `system-architect` - for the reasoning behind an architecture-level call
  before it's communicated to the team
