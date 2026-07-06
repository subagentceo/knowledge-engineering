> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Use case library

> Shapes of work teams hand Claude Tag in Slack, each with prompts to paste. See triage, catch-up, docs and tickets, project tracking, data, deals, monitoring, and bug fixes.

export const BetaNote = () => <Info>Claude Tag is in public beta. Features and behavior described here may change before general availability.</Info>;

<BetaNote />

Each use case below links to a page with prompts to paste, what it needs connected, and how to set it up to [run on a schedule or watch the channel](/claude-tag/users/proactivity) instead of asking each time.

<Note>If `@Claude` doesn't autocomplete in your workspace, your admin hasn't enabled Claude Tag. Send them the [setup guide](/claude-tag/admins/setup-overview).</Note>

## All use cases

| Use case                                                                             | Who it's for                                       | What Claude does                                                                                                        | Connections needed                                                                                                  |
| :----------------------------------------------------------------------------------- | :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| [Catch up](/claude-tag/users/use-cases/catch-up)                                     | Anyone                                             | Summarizes a thread, a channel, or what's waiting on you                                                                | Nothing                                                                                                             |
| [Work from your own channel](/claude-tag/users/use-cases/your-own-channel)           | Anyone                                             | Answers scratch questions, digests channels you don't follow, and chases what you said you'd do                         | Nothing (issue tracker or GitHub optional)                                                                          |
| [Triage requests](/claude-tag/users/use-cases/triage-requests)                       | Support, ops, IT, any intake channel               | Answers what it can, flags duplicates, routes the rest, rolls up themes                                                 | Nothing (issue tracker optional for filing)                                                                         |
| [Turn threads into docs and tickets](/claude-tag/users/use-cases/create-artifacts)   | Anyone                                             | Produces a decision doc, status memo, ticket, or send-ready reply from a discussion                                     | Nothing (Drive or issue tracker optional)                                                                           |
| [Track projects and chase approvals](/claude-tag/users/use-cases/track-projects)     | PMs, leads, anyone running a project channel       | Posts standing status digests; follows up on stalled sign-offs                                                          | Nothing (issue tracker optional)                                                                                    |
| [Find answers in your docs](/claude-tag/users/use-cases/find-answers)                | Anyone                                             | Looks up policies, runbooks, prior decisions; replies with the source                                                   | Google Drive, Notion, or Confluence                                                                                 |
| [Review documents against a checklist](/claude-tag/users/use-cases/review-documents) | Ops, compliance, anyone reviewing against criteria | Checks documents in a connected tool against a checklist or policy; posts findings per item                             | Google Drive, Notion, or Confluence                                                                                 |
| [Answer data questions](/claude-tag/users/use-cases/answer-data-questions)           | Analysts, data-adjacent teams                      | Runs warehouse queries, returns charts; or charts from Slack history alone                                              | BigQuery, Snowflake, or Redshift (charts from Slack need none)                                                      |
| [Fix bugs](/claude-tag/users/use-cases/fix-bugs)                                     | Engineering                                        | Reproduces the bug, opens a draft PR, follows CI to green                                                               | GitHub (Datadog, Sentry optional)                                                                                   |
| [Work with GitHub](/claude-tag/users/use-cases/work-with-github)                     | Engineering, anyone with repository questions      | Answers repository questions in-thread, watches pull requests for you, turns postponed chores into draft PRs            | GitHub                                                                                                              |
| [Watch monitors and alerts](/claude-tag/users/use-cases/watch-monitors)              | On-call, SRE                                       | Checks dashboards on a schedule; investigates alerts before anyone asks                                                 | Datadog, Sentry, or PagerDuty                                                                                       |
| [Pull deal and account state](/claude-tag/users/use-cases/pull-deal-state)           | Sales, customer success                            | Answers account questions in-thread; pre-call briefs; weekly pipeline digest                                            | Salesforce, HubSpot, or Gong                                                                                        |
| [Claude Tag for marketing teams](/claude-tag/users/use-cases/marketing-team)         | Marketing                                          | Answers policy questions from team docs, drafts from campaign threads, checks lead state, posts a weekly metrics digest | HubSpot or Salesforce, plus Google Drive or Notion; BigQuery or Snowflake for the metrics digest (varies by recipe) |

## Use cases by connection

A connection is a tool an admin linked for the channel. Each one adds a category of work; ask `@Claude what can you access from this channel?` to see which your channel has.

| Connection         | Examples                         | What it adds                                                                                                                            |
| :----------------- | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Knowledge and docs | Google Drive, Notion, Confluence | [Find answers in your docs](/claude-tag/users/use-cases/find-answers)                                                                   |
| Issue tracking     | Linear, Jira, Asana              | [Turn threads into tickets](/claude-tag/users/use-cases/create-artifacts), [track projects](/claude-tag/users/use-cases/track-projects) |
| Data warehouse     | BigQuery, Snowflake              | [Answer data questions](/claude-tag/users/use-cases/answer-data-questions) with charts                                                  |
| Go-to-market       | Salesforce, HubSpot, Gong        | [Pull deal and account state](/claude-tag/users/use-cases/pull-deal-state)                                                              |
| Monitoring         | Datadog, Sentry, PagerDuty       | [Watch monitors and alerts](/claude-tag/users/use-cases/watch-monitors)                                                                 |
| Code               | GitHub                           | [Fix bugs](/claude-tag/users/use-cases/fix-bugs), open pull requests, follow CI                                                         |

If a connection your work needs is missing, an admin can [add it](/claude-tag/admins/add-connections).

## Related resources

* [Prompt library](/claude-tag/users/prompt-library): the prompts from every entry, plus the operational ones, on one page
* [Good habits](/claude-tag/users/good-habits): make any of these reliable
* [Set up routines](/claude-tag/users/proactivity): turn any entry into a scheduled job
