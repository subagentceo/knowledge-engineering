> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Nimble Web Expert

> Turn your AI coding assistant into a web scraping expert

The Nimble Web Expert skill gives your agent the ability to search, extract, scrape, map, crawl, and run pre-built extraction agents across any website. Fast, incremental, and immediately responsive. This is the only way your AI assistant can access live websites.

Powered by the [Nimble CLI](https://www.npmjs.com/package/@nimble-way/nimble-cli) and built on the open-source [Agent Skills](https://agentskills.io) standard for cross-platform agent compatibility.

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/nimble-web-expert" title="View on GitHub">
  Source code for this skill
</Card>

## Tools Overview

| Tool        | Description                                                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Search**  | Accurate, real-time web search. 8 focus modes: general, coding, news, academic, shopping, social, geo, location.                                           |
| **Extract** | Scalable data collection with stealth unblocking. Get clean, real-time HTML and structured data from any URL. Supports JS rendering and browser emulation. |
| **Map**     | Fast URL discovery and site structure mapping. Plan extraction workflows before running them.                                                              |
| **Crawl**   | Extract contents from entire websites in a single request. Collect large volumes of web data automatically.                                                |
| **Agents**  | Run pre-built extraction agents for structured data from popular websites (Amazon, Google, LinkedIn, and hundreds more).                                   |

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

### 1. Nimble CLI

Install the Nimble CLI globally:

```bash theme={"system"}
npm i -g @nimble-way/nimble-cli
```

Verify with:

```bash theme={"system"}
nimble --version
```

### 2. Nimble API Key

Get your key at [online.nimbleway.com](https://online.nimbleway.com/).

Set the `NIMBLE_API_KEY` environment variable using your platform's method:

<Tabs>
  <Tab title="Claude Code">
    Add to `~/.claude/settings.json`:

    ```json theme={"system"}
    {
      "env": {
        "NIMBLE_API_KEY": "your-api-key-here"
      }
    }
    ```
  </Tab>

  <Tab title="Shell / Terminal">
    ```bash theme={"system"}
    export NIMBLE_API_KEY="your-api-key-here"
    ```

    Or add to your shell profile (`~/.bashrc`, `~/.zshrc`):

    ```bash theme={"system"}
    echo 'export NIMBLE_API_KEY="your-api-key-here"' >> ~/.zshrc
    ```
  </Tab>

  <Tab title="VS Code / GitHub Copilot">
    * Add skills to `.github/skills/` in your repository
    * Configure API key using GitHub Actions secrets in the copilot environment
    * Or set as environment variable in your shell
  </Tab>
</Tabs>

## Quick Start

The Nimble Web Expert skill activates automatically when you ask for live web data:

```
"Search for recent AI developments"
  -> nimble search --query "recent AI developments" --search-depth lite

"Extract the content from this URL"
  -> nimble extract --url "https://example.com" --parse --format markdown

"Scrape prices from this product page"
  -> nimble extract --url "https://example.com/product" --render --parse --format markdown

"Map all the pages on this docs site"
  -> nimble map --url "https://docs.example.com" --limit 100

"Crawl the API docs section"
  -> nimble crawl run --url "https://docs.example.com/api" --limit 50
```

<Tip>
  Use this skill for immediate, one-off data needs. For building reusable
  extraction workflows, use the [Nimble Agent
  Builder](/integrations/agent-skills/web-tools-skills/nimble-agent-builder) instead.
</Tip>

## Command Examples

### Search

Accurate, real-time web search with 8 focus modes (general, coding, news, academic, shopping, social, geo, location).

```bash theme={"system"}
# Lite search (default, fast, token-efficient)
nimble search --query "React hooks tutorial" --topic coding --search-depth lite

# Search with AI-generated answer summary
nimble search --query "what is WebAssembly" --include-answer --search-depth lite

# News search with time filter
nimble search --query "AI developments" --topic news --time-range week --search-depth lite

# Domain-filtered search
nimble search --query "auth best practices" \
  --include-domain github.com \
  --include-domain stackoverflow.com \
  --search-depth lite
```

<Tip>
  Use `--search-depth lite` (default) for fast responses (1-3s). Use
  `--search-depth deep` when you need full page content for archiving or
  full-text analysis.
</Tip>

### Extract

Get clean, structured data from any URL with stealth unblocking and JS rendering.

```bash theme={"system"}
# Standard extraction (always use --parse --format markdown)
nimble extract --url "https://example.com/article" --parse --format markdown

# Render JavaScript for SPAs and dynamic content
nimble extract --url "https://example.com/app" --render --parse --format markdown

# Extract with geolocation
nimble extract --url "https://example.com" --country US --city "New York" --parse --format markdown
```

### Map

Discover all URLs on a site to plan extraction workflows.

```bash theme={"system"}
# Map URLs on a site
nimble map --url "https://docs.example.com" --limit 100

# Include subdomains
nimble map --url "https://example.com" --domain-filter subdomains
```

### Crawl

Extract content from entire websites asynchronously.

```bash theme={"system"}
# Start a crawl (always set --limit)
nimble crawl run --url "https://docs.example.com" --limit 50

# Crawl with path filtering
nimble crawl run --url "https://example.com" \
  --include-path "/docs" \
  --include-path "/api" \
  --limit 100

# Check crawl status
nimble crawl status --id "crawl-id"

# List all crawls
nimble crawl list
```

<Tip>
  For LLM-friendly output, prefer `map` + `extract --parse --format markdown` on
  individual pages. Crawl returns raw HTML which can be very large.
</Tip>

## Web Expert vs Agent Builder

|              | **agent-builder**                | **web-expert**         |
| ------------ | -------------------------------- | ---------------------- |
| **Goal**     | Reusable workflow                | Immediate data         |
| **Speed**    | Slower (build/test/refine cycle) | Fast, direct           |
| **Output**   | Published agent                  | Extracted data         |
| **Use when** | "I'll need this repeatedly"      | "Get me this data now" |

## About Agent Skills

This skill follows the [Agent Skills](https://agentskills.io) open-source standard, making it compatible with multiple AI agent platforms. Install using the [Skills CLI](https://www.npmjs.com/package/skills), the standard package manager for the Agent Skills ecosystem.

## Full Command Reference

For the complete list of options, flags, and advanced usage patterns, see the [SKILL.md on GitHub](https://github.com/Nimbleway/agent-skills/blob/main/skills/nimble-web-expert/SKILL.md).
