> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

> Stay up to date with the latest Nimble SDK updates and improvements

Track new features, improvements, and updates to the Nimble SDK and Web Tools. We ship updates regularly to enhance performance, add capabilities, and improve your developer experience.

<Callout icon="headset" color="#d87dff">
  Have feedback or questions about a release? [Reach out to our
  team](https://portal.usepylon.com/nimble)
</Callout>

<Update label="May, 2026">
  ### Release Notes for May, 2026

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Domain Knowledge API

  Look up the recommended driver and detected antibot systems for any domain or agent before running at scale. Returns the driver tier, a list of detected antibots (e.g. `cloudflare`, `perimeterx`, `akamai`), and whether JavaScript rendering is required.

  ```bash theme={"system"}
  GET /v1/domain-knowledge/driver?url=www.lowes.com
  GET /v1/domain-knowledge/driver?agent=target_serp
  ```

  [View Documentation](/nimble-sdk/web-tools/domain-knowledge)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Media Download API

  Download images, video, audio, and documents directly via the Nimble SDK. Two modes available: **Realtime** for instant binary downloads, and **Async** for large files delivered to your storage bucket.

  ```json theme={"system"}
  {
    "url": "https://example.com/image.jpg",
    "country": "US"
  }
  ```

  [View Documentation](/nimble-sdk/web-tools/media)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Jobs

  Run any Web Search Agent as a managed, recurring workload — no orchestration code required. Point a job at an agent, upload your input list (CSV, Parquet, or JSON), set a schedule, and Nimble fans out one agent invocation per row on every tick.

  * **Any scale** — thousands to millions of inputs per run, with concurrency and retries handled automatically
  * **Flexible scheduling** — manual trigger, daily, weekly, monthly, or a custom cron expression
  * **Structured output** — results assembled into a single JSON, CSV, or Parquet file per run
  * **Run monitoring** — per-run success rate, completeness score, and error samples in the Nimble Platform UI

  Available now at [online.nimbleway.com/jobs](https://online.nimbleway.com/jobs).

  [View Documentation](/nimble-sdk/agentic/jobs)

  ### <Badge color="yellow" shape="pill" icon="plug" iconType="sharp-solid">Integrations</Badge>

  #### Azure MCP Center

  Nimble MCP is now an officially onboarded partner on [Azure MCP Center](https://mcp.azure.com/detail/nimble-mcp) — Microsoft's curated registry of enterprise-ready MCP servers. Install directly into VS Code with one click, authenticate via OAuth 2.1 (no API key to paste), and use Nimble's full web data toolkit in GitHub Copilot Agent Mode.

  * One-click install from the Azure MCP Center listing
  * OAuth 2.1 sign-in with PKCE — tokens managed and refreshed automatically by VS Code
  * Available to all Azure API Center enterprise registries automatically

  [View Documentation](/integrations/partnerships/microsoft/azure-mcp-center)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### SERP API

  Submit search engine queries and receive structured results. Supports Google Search, Google Images, Google News, Google Maps (search, place, reviews), and Google AIO.

  ```json theme={"system"}
  {
    "search_engine": "google_search",
    "query": "nimble web data",
    "country": "US",
    "locale": "en"
  }
  ```

  Async and Batch endpoints are also available — submit up to 1,000 queries in a single request using `inputs` + `shared_inputs`.

  [View Documentation](/nimble-sdk/web-tools/serp)
</Update>

<Update label="April, 2026">
  ### Release Notes for April, 2026

  ### <Badge color="yellow" shape="pill" icon="plug" iconType="sharp-solid">New Skills</Badge>

  #### Web Search Skills for Agent Skills

  New verticalized web search skills for AI coding assistants, organized into four categories:

  * **[Business Research](/integrations/agent-skills/web-search-skills/business-research)** -- Company Deep Dive (sourced 360° company reports), Competitor Intel (news, funding, hiring, product launches), Market Finder (discover businesses in any market or geography)
  * **[Marketing](/integrations/agent-skills/web-search-skills/marketing)** -- Competitor Positioning (messaging, pricing, CTAs, content gaps with before/after tracking)
  * **[Productivity](/integrations/agent-skills/web-search-skills/productivity)** -- Meeting Prep (attendee and company research before any meeting), Local Places (discover, enrich, and score local businesses in any neighborhood)
  * **[SEO](/integrations/agent-skills/web-search-skills/seo)** -- SEO Intel (keyword research, rank tracking, site audits, content gaps, competitor keywords, AI visibility, GitHub SEO)

  Install via the [Nimble plugin](/integrations/agent-skills/plugin-installation) for Claude Code or Cursor.

  [View Documentation](/integrations/agent-skills/web-search-skills/overview)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Agents API: Pagination Support

  Run agents with pagination to collect results across multiple pages. Call the agent once per page, incrementing the pagination field (commonly `page`) in `params`.

  ```json theme={"system"}
  {
    "agent": "amazon_serp",
    "params": { "keyword": "iphone 17", "page": 1 }
  }
  ```

  [View Documentation](/nimble-sdk/agentic/agents#pagination)

  ### <Badge color="yellow" shape="pill" icon="plug" iconType="sharp-solid">Integrations</Badge>

  #### Databricks Marketplace

  Nimble MCP Server is now available on the [Databricks Marketplace](https://marketplace.databricks.com/details/1fe5e521-e9ef-49d8-97c4-b8c0a448ce15/Nimble_Nimble-MCP-Agentic-Web-Search-Platform) as a one-click install. Creates a Unity Catalog connection that gives Databricks agents, AI Playground, and notebooks direct access to Nimble's search, extract, map, and crawl tools.

  [View Documentation](/integrations/partnerships/databricks/marketplace-mcp)

  ### <Badge color="blue" shape="pill" icon="book-open-cover" iconType="sharp-solid">Documentation</Badge>

  #### Extract API: Advanced Options

  New Advanced Options page documenting low-level request controls for the Extract API. Covers `referrer_type`, `expected_status_codes`, `http2`, `session`, `tag`, `device`, and `render_options` (with nested fields for render type, timeout, iframe handling, resource blocking, and retry behavior).

  [View Documentation](/nimble-sdk/web-tools/extract/features/advanced-options)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Custom Agent Creation via API, SDK, and CLI

  Create custom extraction agents programmatically. Describe what data you need, provide a sample URL, and Nimble generates a production-ready agent. Iterate with natural language prompts to refine the output. Available via REST API (`POST /v1/agents/generations`), Python/Node SDKs, and CLI.

  [View Documentation](/nimble-sdk/agentic/agent-creation)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### New Links Format

  New `links` format option for both the **Extract API** and **Agents API**. Pass `"links"` in the `formats` array to extract all URLs found on the page. Links are returned as an array of URL strings under `data.links`.

  ```json theme={"system"}
  "formats": ["html", "links"]
  ```

  ```json theme={"system"}
  "data": {
    "links": [
      "https://www.example.com/about",
      "https://www.example.com/contact",
      "https://external-site.com/resource"
    ]
  }
  ```

  [Extract Documentation](/nimble-sdk/web-tools/extract/features/formats) | [Agents Documentation](/nimble-sdk/agentic/agents)
</Update>

<Update label="March, 2026">
  ### Release Notes for March, 2026

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Agents API: Batch Endpoint

  Submit up to **1,000 agent requests in a single request** with `POST /v1/agents/batch`. Each input runs as an independent async task. Use `shared_inputs` to set the agent and common delivery settings, and override per item in `inputs` as needed.

  ```json theme={"system"}
  {
    "inputs": [
      { "params": { "keyword": "iphone 15" } },
      { "params": { "keyword": "iphone 16" } }
    ],
    "shared_inputs": { "agent": "amazon_serp" }
  }
  ```

  [View Documentation](/nimble-sdk/agentic/agents#batch)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge> <Badge color="orange" shape="pill" icon="triangle-exclamation" iconType="sharp-solid">Breaking Change</Badge>

  #### Agents API: Formats Parameter

  New `formats` parameter for `POST /v1/agents/run` and `POST /v1/agents/async`. Pass `"html"`, `"markdown"`, or `"headers"` to include additional data alongside `data.parsing`.

  ```json theme={"system"}
  "formats": ["html", "markdown"]
  ```

  **Breaking change:** `data.html` is no longer returned by default. To continue receiving HTML in the response, add `"html"` to the `formats` array.

  **Before:**

  ```json theme={"system"}
  { "agent": "amazon_pdp", "params": { "asin": "B08N5WRWNW" } }
  // → data.html was included automatically
  ```

  **After:**

  ```json theme={"system"}
  {
    "agent": "amazon_pdp",
    "params": { "asin": "B08N5WRWNW" },
    "formats": ["html"]
  }
  // → data.html included only when explicitly requested
  ```

  [View Documentation](/nimble-sdk/agentic/agents)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge> <Badge color="orange" shape="pill" icon="triangle-exclamation" iconType="sharp-solid">Breaking Change</Badge>

  #### Extract API: New Headers Format

  New `headers` format option. Pass `"headers"` in the `formats` array to include the HTTP response headers returned by the server. Headers are returned as a key-value object under `data.headers`.

  ```json theme={"system"}
  "formats": ["html", "headers"]
  ```

  **Breaking change:** Headers are no longer returned by default. Previously, `data.headers` was included in every response automatically. To continue receiving headers, add `"headers"` to your `formats` array.

  **Before:**

  ```json theme={"system"}
  { "url": "https://example.com" }
  // → data.headers was included automatically
  ```

  **After:**

  ```json theme={"system"}
  { "url": "https://example.com", "formats": ["html", "headers"] }
  // → data.headers included only when explicitly requested
  ```

  [View Documentation](/nimble-sdk/web-tools/extract/features/formats)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Batch Extract API

  Submit up to **1,000 URLs in a single request** with `POST /v1/extract/batch`. Each URL runs as an independent async task. Use `shared_inputs` to set common settings (render, country, cloud delivery) across the batch, and override per item in `inputs` as needed.

  [View Documentation](/nimble-sdk/web-tools/extract/features/async)

  ### <Badge color="yellow" shape="pill" icon="plug" iconType="sharp-solid">Integrations</Badge>

  #### Integration Connectors

  New connector guides for plugging Nimble web tools into popular AI frameworks and platforms:

  * [**Smithery**](/integrations/connectors/smithery) — Connect via the Smithery MCP registry with AI SDK and TypeScript examples.
  * [**OpenAI**](/integrations/connectors/openai) — Use Nimble with OpenAI function calling and the Agents SDK.
  * [**Anthropic**](/integrations/connectors/anthropic) — Integrate with Claude tool-use API and Tool Runner.
  * [**Google ADK**](/integrations/connectors/google-adk) — Use Nimble with Google ADK agents via MCP.
  * [**LangChain**](/integrations/connectors/langchain) — LangChain tools and retrievers for Nimble web data.

  ### <Badge color="blue" shape="pill" icon="book-open-cover" iconType="sharp-solid">Documentation</Badge>

  #### Nimble Docs MCP

  Ask questions about Nimble directly from Claude, Cursor, VS Code, or any MCP-compatible tool. The Nimble Docs MCP server exposes the full documentation knowledge base including API references, guides, and code examples, all via the `search_nimble_docs` tool. No API key required.

  **Server URL:** `https://docs.nimbleway.com/mcp`

  [View Documentation](/integrations/mcp-server/mcp-docs)
</Update>

<Update label="February, 2026">
  ### Release Notes for February, 2026

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### GET Agents API

  New endpoints for discovering and exploring available web search agents. List all available agent templates with `GET /agents` or retrieve detailed information about a specific agent including its input/output schema with `GET /agents/{agent_name}`. \
  Perfect for building dynamic agent selections or understanding agent capabilities programmatically. [View Documentation](/nimble-sdk/agentic/agent-gallery)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Screenshot Format

  New `screenshot` format option for the Extract API. Capture full-page screenshots as base64-encoded PNG images for visual verification, monitoring, and archival. Screenshots automatically enable JavaScript rendering (VX8/VX10 driver). [View Documentation](/nimble-sdk/web-tools/extract/features/formats)

  ### <Badge color="blue" shape="pill" icon="book-open-cover" iconType="sharp-solid">Documentation</Badge>

  #### Documentation Updates

  * **Callbacks & Delivery Guide**: Comprehensive guide covering all async result delivery options - polling, webhooks, and cloud delivery to S3/GCS. Includes setup instructions for bucket permissions. [View Guide](/nimble-sdk/admin/callbacks-and-delivery)
  * **Integration Documentation**: New guide covering all available integration and AI connectors to Nimble SDK capabilities. [View Integrations](/integrations)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Agent Skills API

  Advanced web search skills powered by Nimble Search API. Built on the open-source [Agent Skills](https://agentskills.io/) standard for cross-platform agent compatibility, connected to you Claude, Cursor and more.

  Features 8 specialized focus modes (general, coding, news, academic, shopping, social, geo, location) with AI-powered answer generation and smart result filtering. [Try Now](/integrations/agent-skills/web-tools-skills/nimble-web-expert)
</Update>

<Update label="January, 2026">
  ### Release Notes for January, 2026

  ### <Badge color="blue" shape="pill" icon="book-open-cover" iconType="sharp-solid">Documentation</Badge>

  #### Comprehensive Guides

  * **Quickstart Pages**: New quickstart guides for all Web Tools with installation steps, basic usage examples, common patterns, and next steps. Get started in under 5 minutes.
  * **Usage Documentation**: Detailed usage pages for each Web Tool covering all parameters, response formats, best practices, common use cases, and limitations.
  * **API Reference**: Complete API reference with request/response schemas, error codes, rate limits, and authentication methods for all endpoints. [Try Now](/api-reference/introduction)
  * **Account Management**: New guide covering API key generation, team member management, permissions, and security best practices. [View Guide](/nimble-sdk/admin/account-management)
  * **Integration Documentation**: New guide covering all available integration and AI connectors to Nimble SDK capabilities. [View Integrations](/integrations)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Extract API

  The `/extract` retrieves clean HTML, text, and structured data from any webpage. Supports JavaScript rendering, stealth mode for anti-bot protection, custom parsing with CSS selectors, browser actions, screenshots, and network request capture. [Try Now](/nimble-sdk/web-tools/extract/quickstart)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Web Search Agents API

  The `/agent` are ready-to-use web search agent extractors for popular websites like Amazon, Google, LinkedIn, and hundreds more. No coding or CSS selectors required - just provide the template name, and template inputs such as search term or product ID and get structured data instantly. Agents are maintained 24/7 by Nimble and automatically updated when sites change. [Try Now](/nimble-sdk/agentic/agents)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Search API

  The `/search` performs web searches and retrieves parsed content from top results. Supports three search depth modes (`lite`, `fast`, `deep`) for flexible cost/quality tradeoffs, and AI-powered answer summaries from search results. [Try Now](/nimble-sdk/web-tools/search)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Map API

  The `/map` perform fast URL discovery and site structure mapping. Ideal for discovering all pages on a website, extracting sitemap URLs, and understanding site architecture without deep crawling overhead. Supports subdomain filtering and exact domain matching. [Try Now](/nimble-sdk/web-tools/map)

  ### <Badge color="green" shape="pill" icon="feather-pointed" iconType="sharp-solid">New Features</Badge>

  #### Crawl API

  The `/crawl` perform deep website crawling for comprehensive data extraction across multiple pages. Features smart navigation, data normalization, and multi-page scraping with automatic traversing handling. [Try Now](/nimble-sdk/web-tools/crawl)
</Update>
