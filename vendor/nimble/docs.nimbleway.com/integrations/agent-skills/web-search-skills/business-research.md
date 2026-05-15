> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Business Research

> 360° company research, competitor monitoring, and market discovery

Research companies, monitor competitors, and discover businesses in any market. These skills run parallel web searches, synthesize findings into structured reports, and track changes across runs.

For shared architecture, install instructions, and the Private Local Web Index, see the [Web Search Skills overview](/integrations/agent-skills/web-search-skills/overview).

## Company Deep Dive

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/business-research/company-deep-dive" title="View on GitHub">
  Source code for this skill
</Card>

A sourced 360-degree report on any company covering funding, leadership, product/tech, market position, news, and strategic outlook.

**Example prompts:**

```
"tell me about Stripe"
"due diligence on Figma"
"background on Cloudflare before our partnership call"
```

**How it works:** Confirms the company identity via web search, then runs parallel research across five dimensions (funding, product, leadership, news, market position). Extracts full content from the top 5-8 most informative URLs and delivers a structured report.

**Output includes:**

* Quick assessment (3-5 key takeaways)
* Per-dimension sections with dates and source URLs
* Strategic outlook
* Full source list

**Modes:** Full deep dive (default), quick mode (skips deep extraction), refresh mode (focuses on what changed).

***

## Competitor Intel

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/business-research/competitor-intel" title="View on GitHub">
  Source code for this skill
</Card>

Monitors competitors via live web searches and produces a prioritized intelligence briefing. Compares against previous findings to highlight only what's new.

**Example prompts:**

```
"what are my competitors doing"
"competitor update"
"battlecard for Stripe"
```

**How it works:** Loads known competitors from the business profile (or helps identify them on first run). Researches each competitor in parallel for news, funding, hiring signals, product launches, and social activity. Validates high-priority signals and compares against prior briefings.

**Output includes:**

* TL;DR with top 3-5 signals across all competitors
* Per-competitor section with dated, sourced signals
* Cross-competitor patterns and recommended actions

**Signal priority:**

| Priority        | Examples                                         |
| --------------- | ------------------------------------------------ |
| **P1 (High)**   | M\&A, leadership changes, major funding (\$10M+) |
| **P2 (Medium)** | Product launches, partnerships, major hires      |
| **P3 (Low)**    | Blog posts, minor hires, opinion pieces          |

***

## Market Finder

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/business-research/market-finder" title="View on GitHub">
  Source code for this skill
</Card>

Discovers all businesses of a given type in any geography. Two modes: **Discovery** finds businesses from scratch, **Audit** compares an existing list against fresh discovery to find gaps.

**Example prompts:**

```
"find all dentists in Austin, TX"
"build a list of SaaS companies in the CRM space"
"audit my list of clinics against what's actually out there"
```

**How it works:** Auto-detects the business vertical and loads optimized search strategies. For large areas, tiles the geography into metro areas. Runs parallel searches across Google Maps, Yelp, BBB, and vertical-specific directories. Deduplicates with three-tier matching (place ID, domain, fuzzy name + city).

**Output includes:**

* Ranked business list with name, address, phone, website, rating, review count, and strength score
* Source links per business
* In Audit mode: matched, discovered-only, and reference-only categories with gap analysis

**Vertical presets:** Healthcare, SaaS/Software, Restaurants, Legal/Financial, Auto/Home Services, and a general fallback.
