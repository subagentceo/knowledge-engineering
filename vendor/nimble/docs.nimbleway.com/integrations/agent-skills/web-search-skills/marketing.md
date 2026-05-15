> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Marketing

> Track competitor positioning, messaging shifts, pricing changes, and content gaps

Analyze how competitors position themselves online. These skills scrape competitor websites, extract messaging and value props, and track positioning shifts over time.

For shared architecture, install instructions, and the Private Local Web Index, see the [Web Search Skills overview](/integrations/agent-skills/web-search-skills/overview).

## Competitor Positioning

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/marketing/competitor-positioning" title="View on GitHub">
  Source code for this skill
</Card>

Tracks how competitors position themselves online. Scrapes homepages, features pages, pricing pages, and blogs to extract messaging, value props, CTAs, and pricing models. Compares against previous snapshots to surface positioning shifts with before/after tracking.

**Example prompts:**

```
"competitor positioning analysis"
"messaging comparison across competitors"
"content gap analysis"
"battlecard for Stripe"
```

**How it works:** Loads the competitor list from the business profile (limits to 4 with API credit estimates). Captures your own positioning as a baseline, then researches competitors in parallel -- extracting homepage/features/pricing, analyzing blog content, and reviewing social proof. Compares against prior snapshots.

**Output includes:**

### Full Snapshot (first run or 14+ days since last)

* TL;DR for marketing (3-5 actionable insights)
* Messaging matrix (tagline, primary CTA, value props, target audience, pricing model) with verbatim quotes
* Per-competitor positioning profile
* Content gap analysis and positioning white space
* Recommended actions

### Delta Mode (under 14 days since last run)

* Before/after per competitor (tagline shifts, new features, pricing changes, blog themes)
* Marketing implications

### Battlecard Mode

Triggered by `"battlecard [competitor]"`. Produces a structured document with competitor overview, key claims with source URLs, counter-positioning, feature comparison, objection handling, and talking points.
