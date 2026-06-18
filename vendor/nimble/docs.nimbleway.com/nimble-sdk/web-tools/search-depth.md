> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Search Depth

> Choose the right search depth mode for your use case — optimize for speed, cost, or content richness

The `search_depth` parameter controls the tradeoff between latency, cost, and content richness. Pick the right depth for each query instead of over-fetching.

## Overview

| Depth  | Latency | Content                        | Credits        | Best For                                        |
| ------ | ------- | ------------------------------ | -------------- | ----------------------------------------------- |
| `lite` | Lowest  | Titles, URLs, snippets         | 1 per search   | URL discovery, filtering, high-volume pipelines |
| `fast` | Low     | Rich content                   | 2 per search   | RAG, chatbots, AI agent loops                   |
| `deep` | Higher  | Full real-time page extraction | 1 + 1 per page | Research, due diligence, knowledge bases        |

<Warning>
  **`fast` mode is an enterprise feature.** [Contact sales](https://www.nimbleway.com/contact) to enable it for your account.
</Warning>

## When to use each depth

### Lite — scan and filter

Use `lite` when you need to scan many results quickly without reading full content. Returns titles, URLs, and short snippets.

**Good for:**

* URL discovery before targeted extraction
* Filtering results by title or domain before deeper processing
* High-volume monitoring where you only need to detect new mentions
* Building URL lists for downstream tools like [Extract](/nimble-sdk/web-tools/extract/quickstart) or [Crawl](/nimble-sdk/web-tools/crawl)

```json theme={"system"}
{
  "query": "competitor product launches 2026",
  "search_depth": "lite",
  "max_results": 20
}
```

### Fast — rich content for AI agents

Use `fast` when you need enough content to answer questions or feed an LLM, without the latency of scraping every page in real time. Returns rich content optimized for AI consumption.

**Good for:**

* RAG pipelines and chatbot grounding
* Real-time agent workflows where latency matters
* Q\&A systems that need context beyond snippets
* Any AI application that needs content, not just links

```json theme={"system"}
{
  "query": "python async best practices",
  "search_depth": "fast",
  "max_results": 5
}
```

<Note>
  `fast` mode requires an enterprise account and only works with `focus: "general"`. [Contact sales](https://www.nimbleway.com/contact) to get access.
</Note>

### Deep — full page extraction

Use `deep` when you need complete source material from every result. Each page is scraped in real time and returned as full content.

**Good for:**

* Research and due diligence requiring complete source text
* Building comprehensive knowledge bases
* Content analysis where snippets are insufficient
* Legal or compliance workflows needing full page archives

```json theme={"system"}
{
  "query": "GDPR compliance requirements for SaaS",
  "search_depth": "deep",
  "max_results": 5,
  "output_format": "markdown"
}
```

## Cost optimization

### Start lite, go deeper when needed

The most cost-effective pattern: search with `lite` first, then use [Extract](/nimble-sdk/web-tools/extract/quickstart) on the specific URLs that matter.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Step 1: Lite search to find relevant URLs
  results = nimble.search(
      query="AI agent frameworks comparison",
      search_depth="lite",
      max_results=20
  )

  # Step 2: Extract full content from the top results only
  for item in results.results[:3]:
      page = nimble.extract(
          url=item.url,
          output_format="markdown"
      )
      print(page.content)
  ```

  ```javascript Node theme={"system"}
  import Nimble from '@nimble-way/nimble-js';

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Step 1: Lite search to find relevant URLs
  const results = await nimble.search({
    query: "AI agent frameworks comparison",
    search_depth: "lite",
    max_results: 20
  });

  // Step 2: Extract full content from the top results only
  for (const item of results.results.slice(0, 3)) {
    const page = await nimble.extract({
      url: item.url,
      output_format: "markdown"
    });
    console.log(page.content);
  }
  ```

  ```bash cURL theme={"system"}
  # Step 1: Lite search
  curl -X POST 'https://sdk.nimbleway.com/v1/search' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "query": "AI agent frameworks comparison",
      "search_depth": "lite",
      "max_results": 20
  }'

  # Step 2: Extract specific URLs from the results
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://example.com/ai-frameworks",
      "output_format": "markdown"
  }'
  ```
</CodeGroup>

### Choose depth by query type

Not every query needs the same depth. Match depth to intent:

| Query intent                   | Recommended depth | Why                                            |
| ------------------------------ | ----------------- | ---------------------------------------------- |
| "Find URLs about X"            | `lite`            | Only need links, not content                   |
| "What is X?"                   | `fast`            | Rich content is enough for a summary           |
| "Summarize everything about X" | `deep`            | Need full page text for comprehensive analysis |
| "Monitor mentions of X"        | `lite`            | High-volume, only need detection               |
| "Research X for a report"      | `deep`            | Need complete source material                  |

## Combining depth with other features

### Depth + domain filtering

Narrow your search to trusted sources before extracting content:

```json theme={"system"}
{
  "query": "kubernetes best practices",
  "search_depth": "deep",
  "max_results": 5,
  "include_domains": ["kubernetes.io", "cloud.google.com", "docs.aws.amazon.com"]
}
```

### Depth + time filtering

Combine depth with recency filters for targeted research:

```json theme={"system"}
{
  "query": "AI regulation updates",
  "search_depth": "lite",
  "max_results": 20,
  "time_range": "week"
}
```

### Depth + LLM answer

Add `include_answer: true` to any depth for an AI-generated summary with citations:

```json theme={"system"}
{
  "query": "benefits of TypeScript over JavaScript",
  "search_depth": "lite",
  "max_results": 10,
  "include_answer": true
}
```

## Next steps

<CardGroup cols={2}>
  <Card icon="magnifying-glass" href="/nimble-sdk/web-tools/search" title="Search">
    Full Search documentation with all features and focus modes
  </Card>

  <Card icon="code" href="/api-reference/search/search" title="API Reference">
    Complete parameter documentation and response schemas
  </Card>
</CardGroup>
