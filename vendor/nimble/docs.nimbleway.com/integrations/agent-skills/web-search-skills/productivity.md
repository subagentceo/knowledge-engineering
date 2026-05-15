> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Productivity

> Meeting prep with attendee research, and local business discovery

Walk into meetings fully briefed and discover local businesses in any neighborhood. These skills gather live web data and deliver structured, actionable results.

For shared architecture, install instructions, and the Private Local Web Index, see the [Web Search Skills overview](/integrations/agent-skills/web-search-skills/overview).

## Meeting Prep

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/productivity/meeting-prep" title="View on GitHub">
  Source code for this skill
</Card>

Researches meeting attendees and their companies before any meeting. Surfaces roles, recent activity, company context, talking points, and cross-attendee relationships.

**Example prompts:**

```
"prepare me for my meeting with Sarah Chen from Acme Corp"
"who am I meeting with tomorrow"
"brief me on the attendees for my 2pm meeting"
```

**How it works:** Accepts attendee names and companies directly, or parses them from a calendar invite. Researches each person's role, background, recent activity, and social presence. Gathers company context (news, funding, product launches). Maps cross-attendee connections.

**Output includes:**

* Per-attendee profile (role, background, recent activity, published content)
* Company context per organization
* Talking points based on shared interests and recent activity
* Cross-attendee relationships
* Source URLs

***

## Local Places

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/productivity/local-places" title="View on GitHub">
  Source code for this skill
</Card>

Discovers, enriches, and scores local businesses in any neighborhood. Returns a structured, ranked list with an optional interactive map.

**Example prompts:**

```
"find all coffee shops in SoHo"
"map every bar in Austin's 6th Street"
"build a neighborhood guide for Williamsburg, Brooklyn"
```

**How it works:** Identifies business type and location, then searches across Google Maps, Yelp, BBB, and vertical-specific directories in parallel. Enriches each business with reviews, ratings, social presence, and contact info. Assigns confidence scores based on source count and review volume.

**Output includes:**

* Ranked business list with name, address, phone, website, rating, review count, and social links
* Confidence scores per business
* Interactive HTML map (optional)
* Source links
