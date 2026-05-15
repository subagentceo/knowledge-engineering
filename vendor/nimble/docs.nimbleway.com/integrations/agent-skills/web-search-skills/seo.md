> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SEO

> Live SEO intelligence from keyword research to AI search visibility

Answer any SEO question about a website with live data, not checklist advice. This skill routes natural language SEO queries to the right workflow, gathers evidence from live SERPs and real pages, and delivers structured reports with source URLs.

For shared architecture, install instructions, and the Private Local Web Index, see the [Web Search Skills overview](/integrations/agent-skills/web-search-skills/overview).

## SEO Intel

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/seo/seo-intel" title="View on GitHub">
  Source code for this skill
</Card>

A single SEO skill that covers the full lifecycle from keyword research to AI search visibility. Detects intent from natural language and dispatches to one of seven workflows. Every finding is grounded in live web data, not LLM guesses.

**Example prompts:**

```
"find keyword opportunities for my SaaS product"
"run an SEO audit on example.com"
"check our AI visibility vs competitors"
"track rankings for these 5 keywords"
"what content gaps do we have vs competitor.com"
"audit the SEO on our GitHub repo"
```

**How it works:** Parses the request and classifies it against seven workflow intents. Loads the matching workflow reference, gathers live data via Nimble Search, Extract, Map, Crawl, or dedicated AI platform agents, then synthesizes a structured report with evidence and source URLs. Compares against prior runs in the local memory index to surface only what changed.

**Output includes:**

* TL;DR with the top findings and recommended actions
* Per-workflow sections with dated, sourced evidence
* Confidence tiers on every finding
* Source URLs for every claim
* Delta mode across runs (what changed since last time)

### Workflows

| Workflow            | What it does                                                                                                                  | Example trigger                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Keyword Research    | Discovers opportunities via live SERP analysis, evidence-based difficulty scoring, and GEO/AEO surface classification         | `"find keyword opportunities for my SaaS product"` |
| Rank Tracker        | Tracks live SERP positions with JSON snapshots, smart date windowing, and delta reports across runs                           | `"track rankings for these 5 keywords"`            |
| Site Audit          | Full-crawl technical and on-page audit with JavaScript rendering, structured metadata parsing, and confidence-tiered findings | `"run an SEO audit on example.com"`                |
| Content Gap         | Parallel domain mapping, topic coverage comparison, and tiered SERP validation                                                | `"what content gaps do we have vs competitor.com"` |
| Competitor Keywords | Full-site crawl with body-only anchor extraction, theme clustering, and per-domain delta snapshots                            | `"reverse-engineer competitor.com's SEO"`          |
| AI Visibility       | Brand visibility measurement across ChatGPT, Perplexity, Google AI, Gemini, and Grok via dedicated agents                     | `"check our AI visibility vs competitors"`         |
| GitHub SEO          | Repository discoverability audit covering metadata, README quality, community health, and AI discoverability                  | `"audit the SEO on our GitHub repo"`               |

### AI Visibility

Measures brand presence where users increasingly start their searches: AI answer engines. Queries five dedicated agents in parallel -- ChatGPT, Perplexity, Google AI Overview, Gemini, and Grok -- then attributes mentions, citations, and source URLs per platform. Applies Princeton's GEO optimization methodology to recommend content changes that improve citation likelihood.

### Workflow Chaining

Workflows feed into each other. The skill suggests natural next steps after every run:

* **Site Audit → Keyword Research → Content Gap → Rank Tracker** (full SEO setup)
* **Keyword Research → Competitor Keywords → Content Gap** (editorial planning)
* **AI Visibility → Content Gap → Keyword Research** (generative search optimization)

Context carries across runs -- discovered domains, keyword lists, and business profile data do not get re-asked.
