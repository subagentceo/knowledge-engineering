> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Search

> Real-time web search with AI-powered agents that understand intent and return structured data

Nimble **Search** delivers **real-time web search** powered by Web Search Agents (WSAs) that understand query intent and return structured, agent-ready data. Unlike generic search engines, WSAs navigate websites directly to extract deeper insights and format results for seamless AI integration.

Perfect for AI agents, research automation, competitive intelligence, content monitoring, and any application that needs real-time web data with structured outputs.

## Quick Start

### Example Request

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.search(
      query="latest developments in AI agents 2026",
      max_results=5,
      search_depth="lite"
  )

  print(f"Found {len(result.results)} results")
  for item in result.results:
      print(f"- {item.title}: {item.url}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.search({
    query: "latest developments in AI agents 2026",
    max_results: 5,
    search_depth: "lite",
  });

  console.log(`Found ${result.results.length} results`);
  result.results.forEach(item => {
    console.log(`- ${item.title}: ${item.url}`);
  });
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/search' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "query": "latest developments in AI agents 2026",
      "max_results": 5,
      "search_depth": "lite"
  }'
  ```
</CodeGroup>

### Example Response

```json theme={"system"}
{
  "total_results": 5,
  "results": [
    {
      "title": "AI Agents: The Next Frontier in 2026",
      "description": "Exploring the latest breakthroughs in autonomous AI agents...",
      "url": "https://example.com/ai-agents-2026",
      "metadata": {
        "position": 1,
        "entity_type": "OrganicResult",
        "country": "US",
        "locale": "en"
      }
    },
    {
      "title": "Autonomous Agents and Tool Use",
      "description": "How modern AI agents interact with external tools and APIs...",
      "url": "https://example2.com/agent-tools",
      "metadata": {
        "position": 2,
        "entity_type": "OrganicResult",
        "country": "US",
        "locale": "en"
      }
    },
    {...}
  ],
  "request_id": "84f08ac1-bb5f-4b6f-8447-2d21cb930416"
}
```

## Search Depth

The `search_depth` parameter controls how much content each search returns. Choose the right depth for your use case.

| Depth            | Content Returned               | Credits        | Best For                                              |
| ---------------- | ------------------------------ | -------------- | ----------------------------------------------------- |
| `lite` (default) | Titles, URLs, snippets         | 1 per search   | URL discovery, high-volume pipelines, quick filtering |
| `fast`           | Rich content                   | 2 per search   | RAG, chatbots, real-time AI agent workflows           |
| `deep`           | Full real-time page extraction | 1 + 1 per page | Research, due diligence, comprehensive analysis       |

<Warning>
  **`fast` mode is an enterprise feature.** [Contact sales](https://www.nimbleway.com/contact) to enable it for your account. Currently supported with `focus: "general"` only.
</Warning>

<Card title="Search Depth Best Practices" icon="lightbulb" href="/nimble-sdk/web-tools/search-depth">
  Learn when to use each depth mode, optimization tips, and cost strategies.
</Card>

<AccordionGroup>
  <Accordion title="Lite — metadata only" icon="feather" defaultOpen>
    Get titles, URLs, and snippets for fast, token-efficient pipelines. **1 credit per search.**

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.search(
          query="best web scraping tools 2026",
          max_results=10,
          search_depth="lite"
      )

      for item in result.results:
          print(f"{item.title}: {item.url}")
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.search({
        query: "best web scraping tools 2026",
        max_results: 10,
        search_depth: "lite"
      });

      result.results.forEach(item => {
        console.log(`${item.title}: ${item.url}`);
      });
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "best web scraping tools 2026",
          "max_results": 10,
          "search_depth": "lite"
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Fast — rich content, low latency (Enterprise)" icon="bolt">
    Rich content at low latency, optimized for AI agents. **2 credits per search.**

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.search(
          query="python async best practices",
          max_results=5,
          search_depth="fast"
      )

      for item in result.results:
          print(f"Title: {item.title}")
          print(f"Content: {item.description[:200]}...")
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.search({
        query: "python async best practices",
        max_results: 5,
        search_depth: "fast"
      });

      result.results.forEach(item => {
        console.log(`Title: ${item.title}`);
        console.log(`Content: ${item.description.substring(0, 200)}...`);
      });
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "python async best practices",
          "max_results": 5,
          "search_depth": "fast"
      }'
      ```
    </CodeGroup>

    <Note>
      `fast` mode requires an enterprise account and only works with `focus: "general"`. [Contact sales](https://www.nimbleway.com/contact) to get access.
    </Note>
  </Accordion>

  <Accordion title="Deep — full page extraction" icon="magnifying-glass-plus">
    Extract full page content from every result for comprehensive analysis. **1 credit per search + 1 credit per page extracted.**

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.search(
          query="python web scraping tutorial",
          max_results=5,
          search_depth="deep",
          output_format="markdown"
      )

      for item in result.results:
          print(f"Title: {item.title}")
          print(f"URL: {item.url}")
          print(f"Content: {item.content[:200]}...")
          print("---")
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.search({
        query: "python web scraping tutorial",
        max_results: 5,
        search_depth: "deep",
        output_format: "markdown"
      });

      result.results.forEach(item => {
        console.log(`Title: ${item.title}`);
        console.log(`URL: ${item.url}`);
        console.log(`Content: ${item.content.substring(0, 200)}...`);
        console.log("---");
      });
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "python web scraping tutorial",
          "max_results": 5,
          "search_depth": "deep",
          "output_format": "markdown"
      }'
      ```
    </CodeGroup>
  </Accordion>
</AccordionGroup>

## Parameters

<Card title="API Parameters" icon="brackets-curly" href="/api-reference/search/search">
  For detailed parameter documentation, see the Search API Reference.
</Card>

## Key Features

<AccordionGroup>
  <Accordion title="Search with LLM answer" icon="sparkles">
    Get an AI-generated answer based on search results. Returns an instant summary with inline citations, perfect for Q\&A systems, chatbots, and research assistants.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.search(
          query="what are the benefits of TypeScript over JavaScript",
          max_results=10,
          include_answer=True
      )

      print("AI Answer:")
      print(result.answer)

      print("\nSources:")
      for item in result.results:
          print(f"- {item.title}: {item.url}")
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.search({
        query: "what are the benefits of TypeScript over JavaScript",
        max_results: 10,
        include_answer: true
      });

      console.log("AI Answer:");
      console.log(result.answer);

      console.log("\nSources:");
      result.results.forEach(item => {
        console.log(`- ${item.title}: ${item.url}`);
      });
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "what are the benefits of TypeScript over JavaScript",
          "max_results": 10,
          "include_answer": true
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Time-based filtering" icon="clock">
    Filter results by recency using `time_range` or specify exact date ranges. Essential for news monitoring, tracking recent developments, or analyzing historical data within specific timeframes.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Filter by time range
      result = nimble.search(
          query="AI news",
          max_results=20,
          time_range="week"
      )

      # Or use specific date range
      result = nimble.search(
          query="machine learning advances",
          max_results=15,
          start_date="2026-01-01",
          end_date="2026-01-31"
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Filter by time range
      const result1 = await nimble.search({
        query: "AI news",
        max_results: 20,
        time_range: "week"
      });

      // Or use specific date range
      const result2 = await nimble.search({
        query: "machine learning advances",
        max_results: 15,
        start_date: "2026-01-01",
        end_date: "2026-01-31"
      });

      console.log(result1);
      ```

      ```bash cURL theme={"system"}
      # Filter by time range
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "AI news",
          "max_results": 20,
          "time_range": "week"
      }'

      # Or use specific date range
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "machine learning advances",
          "max_results": 15,
          "start_date": "2026-01-01",
          "end_date": "2026-01-31"
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Domain filtering" icon="globe">
    Filter results to specific domains or exclude unwanted ones. Focus on trusted sources, exclude noise (social media, ads), or search within curated lists of authoritative sites.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Only search within specific domains
      result = nimble.search(
          query="python async patterns",
          max_results=10,
          include_domains=["github.com", "stackoverflow.com", "docs.python.org"]
      )

      # Or exclude specific domains
      result = nimble.search(
          query="web scraping tutorial",
          max_results=10,
          exclude_domains=["pinterest.com", "youtube.com"]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Only search within specific domains
      const result1 = await nimble.search({
        query: "python async patterns",
        max_results: 10,
        include_domains: ["github.com", "stackoverflow.com", "docs.python.org"]
      });

      // Or exclude specific domains
      const result2 = await nimble.search({
        query: "web scraping tutorial",
        max_results: 10,
        exclude_domains: ["pinterest.com", "youtube.com"]
      });

      console.log(result1);
      ```

      ```bash cURL theme={"system"}
      # Only search within specific domains
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "python async patterns",
          "max_results": 10,
          "include_domains": ["github.com", "stackoverflow.com", "docs.python.org"]
      }'

      # Or exclude specific domains
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "web scraping tutorial",
          "max_results": 10,
          "exclude_domains": ["pinterest.com", "youtube.com"]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Document type filtering" icon="file-lines">
    Search for specific document types like PDFs, spreadsheets, or presentations (only works with `focus: "general"`). Perfect for academic research, finding reports, whitepapers, or structured data files.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Search for PDF documents
      result = nimble.search(
          query="machine learning research papers",
          max_results=10,
          focus="general",
          content_type=["pdf"]
      )

      # Search for multiple document types
      result = nimble.search(
          query="financial reports 2026",
          max_results=15,
          focus="general",
          content_type=["pdf", "xlsx", "docx"]
      )

      # Use semantic groups for broader filtering
      result = nimble.search(
          query="quarterly earnings",
          max_results=10,
          focus="general",
          content_type=["documents", "spreadsheets"]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Search for PDF documents
      const result1 = await nimble.search({
        query: "machine learning research papers",
        max_results: 10,
        focus: "general",
        content_type: ["pdf"]
      });

      // Search for multiple document types
      const result2 = await nimble.search({
        query: "financial reports 2026",
        max_results: 15,
        focus: "general",
        content_type: ["pdf", "xlsx", "docx"]
      });

      // Use semantic groups for broader filtering
      const result3 = await nimble.search({
        query: "quarterly earnings",
        max_results: 10,
        focus: "general",
        content_type: ["documents", "spreadsheets"]
      });

      console.log(result1);
      ```

      ```bash cURL theme={"system"}
      # Search for PDF documents
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "machine learning research papers",
          "max_results": 10,
          "focus": "general",
          "content_type": ["pdf"]
      }'

      # Use semantic groups for broader filtering
      curl -X POST 'https://sdk.nimbleway.com/v1/search' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "query": "quarterly earnings",
          "max_results": 10,
          "focus": "general",
          "content_type": ["documents", "spreadsheets"]
      }'
      ```
    </CodeGroup>

    <Note>
      `content_type` only works with `focus: "general"`. Supported formats: `pdf`, `docx`, `xlsx`, `pptx`, and semantic groups: `documents`, `spreadsheets`, `presentations`.
    </Note>
  </Accordion>
</AccordionGroup>

## Focus Modes

Focus modes route your searches to specialized sources optimized for different use cases. Each mode uses dedicated Web Search Agents to retrieve the most relevant results.

### Available Pre-defined Modes

Pre-defined focus modes automatically route your search to specialized Nimble Web Search Agents (WSA) based on your query type. Simply specify the mode that matches your use case.

| Focus Mode          | Best For                                      |
| ------------------- | --------------------------------------------- |
| `general` (default) | General information, broad topics, web pages  |
| `news`              | Current events, breaking stories, journalism  |
| `coding`            | Code examples, debugging, API documentation   |
| `academic`          | Scientific research, peer-reviewed studies    |
| `shopping`          | Product comparison, pricing, merchant reviews |
| `social`            | Social content, influencers, trending topics  |
| `geo`               | AI-generated answers, synthetic insights      |
| `location`          | Places, businesses, geographic information    |

### Example: Shopping search

Compare products across e-commerce platforms:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.search(
      query="wireless noise canceling headphones",
      focus="shopping",
      max_results=20,
      max_subagents=5  # Search more platforms in parallel
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.search({
    query: "wireless noise canceling headphones",
    focus: "shopping",
    max_results: 20,
    max_subagents: 5,
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/search' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "query": "wireless noise canceling headphones",
      "focus": "shopping",
      "max_results": 20,
      "max_subagents": 5
  }'
  ```
</CodeGroup>

### Custom Focus Mode

For advanced use cases, you can explicitly specify which search agents to use by passing an array of subagent names to the `focus` parameter. This gives you full control over data sources and enables mixing agents from different focus modes.

**Example:**

```json theme={"system"}
{
  "query": "best wireless headphones",
  "focus": ["amazon_serp", "walmart_serp", "reddit_discover_posts"],
  "max_results": 10
}
```

<Card title="Available Web Search Agents (WSA)" icon="wand-magic-sparkles" href="/nimble-sdk/agentic/agent-gallery">
  View the complete list of Web Search Agents you can use in custom focus modes.
</Card>

## Use cases

<CardGroup cols={2}>
  <Card title="Research & Data Collection" icon="magnifying-glass">
    Gather comprehensive information on any topic from multiple sources
    automatically
  </Card>

  <Card title="AI Agent Tasks" icon="robot">
    Get quick web answers with optional LLM-generated summaries for your
    applications
  </Card>

  <Card title="Content Monitoring" icon="newspaper">
    Track mentions, news, or updates about specific topics, brands, or keywords
  </Card>

  <Card title="Competitive Intelligence" icon="chart-line">
    Monitor what's being said about competitors or track industry trends
  </Card>
</CardGroup>

## Search vs other tools

| Need                                      | Use                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| Search web + extract content from results | **Search**                                                                    |
| Domain-specific agents                    | [**Public Agent**](/nimble-sdk/agentic/agent-gallery) - maintained by Nimble  |
| Data from sources not in the gallery      | [**Custom Agent**](/nimble-sdk/agentic/studio) - create with natural language |
| Data from specific URLs                   | **Extract**                                                                   |
| URLs with context for AI planning         | **Map**                                                                       |
| Data from entire website                  | **Crawl**                                                                     |

## Next steps

<CardGroup cols={2}>
  <Card icon="code" href="/api-reference/search/search" title="API Reference">
    Explore endpoints, request parameters, and response schemas for the Search
    API
  </Card>

  <Card title="Web Tools Skill" icon="rectangle-terminal" href="/integrations/agent-skills/web-tools-skills/nimble-web-expert">
    Add real-time web intelligence tools to Claude Code and other AI agents
  </Card>

  <Card title="LangChain Integration" icon="link" href="/integrations/connectors/langchain">
    Connect Nimble Search to your LangChain applications
  </Card>
</CardGroup>
