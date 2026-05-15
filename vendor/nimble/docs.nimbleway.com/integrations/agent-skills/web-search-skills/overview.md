> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> One-command web intelligence workflows for any AI agent

One-command workflows that turn any AI agent into a web intelligence powerhouse. Web Search Skills spawn parallel sub-agents, gather live web data via Nimble APIs, synthesize findings, and deliver structured reports with dates and source URLs.

Compatible with any AI agent or platform that supports the [Agent Skills](https://agentskills.io) protocol -- including [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Cursor](https://www.cursor.com/), and the [Vercel Agent Skills CLI](https://www.npmjs.com/package/skills). Powered by the [Nimble CLI](/nimble-sdk/sdks/cli).

<Card icon="github" href="https://github.com/Nimbleway/agent-skills" title="View on GitHub">
  Source code for all skills
</Card>

## Skills Categories

<CardGroup cols={2}>
  <Card title="Business Research" icon="building" href="/integrations/agent-skills/web-search-skills/business-research">
    360° company research, competitor monitoring, and market discovery
  </Card>

  <Card title="Marketing" icon="crosshairs" href="/integrations/agent-skills/web-search-skills/marketing">
    Track competitor positioning, messaging shifts, pricing changes, and content
    gaps
  </Card>

  <Card title="Productivity" icon="calendar-check" href="/integrations/agent-skills/web-search-skills/productivity">
    Meeting prep with attendee research, and local business discovery
  </Card>

  <Card title="SEO" icon="chart-line" href="/integrations/agent-skills/web-search-skills/seo">
    Live SEO intelligence from keyword research to AI search visibility
  </Card>
</CardGroup>

### Individual Skills

Web Search Skills also extend into vertical-specific workflows:

| Category                                                                            | Skill                                                                                                                 | Description                                                                                                                                 |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Business Research](/integrations/agent-skills/web-search-skills/business-research) | [Company Deep Dive](https://github.com/Nimbleway/agent-skills/tree/main/skills/business-research/company-deep-dive)   | Sourced 360° report on any company                                                                                                          |
|                                                                                     | [Competitor Intel](https://github.com/Nimbleway/agent-skills/tree/main/skills/business-research/competitor-intel)     | Monitor competitor news, funding, hiring, and product launches                                                                              |
|                                                                                     | [Market Finder](https://github.com/Nimbleway/agent-skills/tree/main/skills/business-research/market-finder)           | Discover companies in any market or segment                                                                                                 |
| [Marketing](/integrations/agent-skills/web-search-skills/marketing)                 | [Competitor Positioning](https://github.com/Nimbleway/agent-skills/tree/main/skills/marketing/competitor-positioning) | Track messaging shifts, pricing changes, and content gaps                                                                                   |
| [Productivity](/integrations/agent-skills/web-search-skills/productivity)           | [Meeting Prep](https://github.com/Nimbleway/agent-skills/tree/main/skills/productivity/meeting-prep)                  | Research attendees and their companies before any meeting                                                                                   |
|                                                                                     | [Local Places](https://github.com/Nimbleway/agent-skills/tree/main/skills/productivity/local-places)                  | Discover local businesses in any neighborhood                                                                                               |
| [SEO](/integrations/agent-skills/web-search-skills/seo)                             | [SEO Intel](https://github.com/Nimbleway/agent-skills/tree/main/skills/seo/seo-intel)                                 | Live SEO intelligence across keyword research, rank tracking, site audits, content gaps, competitor keywords, AI visibility, and GitHub SEO |

## How It Works

Under the hood, Web Search Skills intelligently orchestrate Nimble's [Web Tools](/integrations/agent-skills/web-tools-skills/nimble-web-expert) -- [Search](/nimble-sdk/web-tools/search), [Extract](/nimble-sdk/web-tools/extract/quickstart), [Map](/nimble-sdk/web-tools/map), and [Crawl](/nimble-sdk/web-tools/crawl) -- to fetch data from the web as needed. They also discover and trigger the best [Web Search Agents (WSAs)](/nimble-sdk/agentic/agents) for the task at hand, choosing from hundreds of pre-built extraction agents optimized for specific websites and data types.

For bulk operations like table enrichments, skills automatically create batch background tasks -- processing rows in parallel without blocking the conversation.

Every Web Search Skill follows the same pattern:

<Steps>
  <Step title="Preflight">
    Checks the Nimble CLI is installed and loads the business profile.
  </Step>

  <Step title="Parse request and clarify">
    Understands the task, asks clarifying questions, and aligns on scope before
    starting.
  </Step>

  <Step title="Parallel research">
    Spawns sub-agents that orchestrate Web Tools and WSAs for concurrent data
    gathering across multiple web sources.
  </Step>

  <Step title="Analysis">
    Synthesizes findings and deduplicates against previous runs.
  </Step>

  <Step title="Report">
    Delivers structured output with verified dates and source URLs.
  </Step>

  <Step title="Distribute">
    Detects connected integrations (Notion, Slack, Google Drive, and more) and
    proposes where to store the report. Can also generate interactive apps or
    trigger follow-up skills.
  </Step>
</Steps>

Skills learn from previous runs and only surface what's new. Run the same skill twice and the second run highlights changes, not repeats.

## Private Local Web Index

Skills maintain a local web knowledge index at `~/.nimble/memory/` -- live web intelligence that compounds across sessions, so your agent never starts from scratch.

* **Local-first indexes** -- per-directory entity catalogs for instant lookup, no vector DB needed
* **[Obsidian](https://obsidian.md/)-compatible** -- `[[wiki links]]` cross-reference people, companies, and competitors. Open `~/.nimble/memory/` in Obsidian to browse the intelligence graph
* **Cross-entity synthesis** -- patterns across competitors, pricing trends, and market signals surface automatically
* **Ad-hoc insights** -- say "remember this" mid-conversation and it compounds into the right entity page
* **Activity log** -- grep-friendly record of what was learned, when, and by which skill

Every finding carries a verified event date and source URL. Stale signals are dropped, not reported.

## Quick Install

<Tabs>
  <Tab title="Claude Code">
    ```bash theme={"system"}
    claude plugin marketplace add Nimbleway/agent-skills && \
    claude plugin install nimble@nimble-plugin-marketplace
    ```
  </Tab>

  <Tab title="Cursor">
    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills -a cursor
    ```
  </Tab>

  <Tab title="Vercel Agent Skills CLI">
    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills
    ```
  </Tab>
</Tabs>

## Prerequisites

Requires the [Nimble CLI](/nimble-sdk/sdks/cli) and a [Nimble API key](https://online.nimbleway.com/account-settings/api-keys). See [Plugin Installation](/integrations/agent-skills/plugin-installation) for full setup instructions.
