# Nimble Web Data

Nimble gives Claude the ability to fetch, search, scrape, and crawl the live web. It provides two complementary skills: a **Web Expert** for immediate data retrieval and a reusable **Agent Builder** for creating structured extraction workflows that run at scale. The toolkit connects to Nimble's cloud infrastructure via MCP and the Nimble CLI, with pre-built agents covering 50+ popular websites for structured data extraction out of the box.

The Web Expert skill handles one-off fetches, real-time lookups, and live research. It can extract content from any URL, run web searches across eight focus modes (general, coding, news, academic, shopping, social, geo, and location), discover URLs with site mapping, and bulk-crawl entire website sections. Results are returned as structured data tables with automatic render-tier escalation for difficult pages.

The Agent Builder skill lets you create, refine, and publish reusable extraction agents for recurring data needs. It searches existing agents first, supports interactive testing with schema previews, and can generate batch scripts for large-scale runs (50+ items). Built agents automatically become available to the Web Expert, forming a feedback loop between ad-hoc extraction and repeatable pipelines.

**How to use:** Ask Claude to fetch or scrape a webpage (e.g., "scrape the product listings from this URL"), search the web ("search for recent funding rounds in AI startups"), discover URLs on a site ("map all blog post URLs on example.com"), or build a reusable extractor ("build an agent to extract job listings from LinkedIn"). You can also use the `/search` command for quick web lookups (e.g., `/search latest Python release notes`).
