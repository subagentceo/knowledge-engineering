> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Exa

## Overview

Connect your ElevenLabs AI agents with Exa to perform semantic web searches during conversations. Your agents can find relevant web content, research topics, and retrieve up-to-date information — with optional filtering by category (news, research papers, companies, GitHub, LinkedIn, and more), domain, and date range.

## Setup

This integration uses an **Exa API key** for authentication.

Sign up at [exa.ai](https://exa.ai) if you do not already have an account.

Navigate to your [Exa Dashboard API Keys page](https://dashboard.exa.ai/api-keys) and copy your API key.

In the ElevenLabs integration setup, paste your Exa API key in the **API Key** field.

## Search options

The integration exposes several parameters that control how searches are performed.

### Categories

Searches can optionally be scoped to a content category, which focuses results on a specific type of source. Below are some example categories — refer to the [Exa documentation](https://docs.exa.ai) for the full set of supported categories:

| Category         | What it covers                 |
| ---------------- | ------------------------------ |
| `company`        | Company pages and metadata     |
| `research paper` | Academic and scientific papers |
| `news`           | Current events and journalism  |
| `github`         | GitHub repositories and code   |
| `tweet`          | Posts on X (Twitter)           |

### Content retrieval

Each search result can include one or more content types, which control what information is extracted from the page:

* **Highlights** (recommended) — returns the most relevant text snippets from the page. Token-efficient and suitable for most use cases.
* **Text** — returns the full page text. Use when you need complete content rather than just the relevant parts.
* **Summary** — returns an LLM-generated summary of the page. Higher latency than other options.

### Filtering

Results can be further narrowed by including or excluding specific domains, and by filtering to a published date range (ISO 8601).

## Useful links

* [Exa API documentation](https://exa.ai/docs/reference/search-api-guide)
* [Exa Dashboard](https://dashboard.exa.ai)