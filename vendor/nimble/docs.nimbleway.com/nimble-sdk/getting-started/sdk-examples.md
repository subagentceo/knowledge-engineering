> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SDK Code Examples

> Quick code examples for every Nimble API — Extract, Agents, Search, Map, and Crawl

Ready-to-use code snippets for every Nimble API. Copy, paste, and run.

<Tip>
  **Prefer not to write code?** Install the [Nimble
  plugin](/integrations/agent-skills/plugin-installation) and describe what you
  need in plain language — your AI assistant handles the rest. See the
  [Quickstart Guide](/nimble-sdk/getting-started/quickstart) for prompt
  examples.
</Tip>

## Installation

<CodeGroup>
  ```bash Python theme={"system"}
  pip install nimble_python
  ```

  ```bash Node theme={"system"}
  npm install @nimble-way/sdk
  ```
</CodeGroup>

## Web Search Agents

Run pre-built agents for popular sites, or [create one for any website](https://online.nimbleway.com/workflow-builder):

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.agent.run(
      agent="amazon_pdp",
      params={
          "asin": "B08N5WRWNW"
      }
  )

  parsed = result.data.parsing["parsed"]
  print(f"Product: {parsed['product_title']}")
  print(f"Price: ${parsed['web_price']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.agent.run({
    agent: "amazon_pdp",
    params: {
      asin: "B08N5WRWNW",
    },
  });

  const parsed = result.data.parsing.parsed;
  console.log(`Product: ${parsed.product_title}`);
  console.log(`Price: $${parsed.web_price}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "amazon_pdp",
      "params": {
          "asin": "B08N5WRWNW"
      }
  }'
  ```
</CodeGroup>

## Extract

Get clean HTML and structured data from any URL:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      render=True,
      formats=["html", "markdown"]
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    formats: ["html", "markdown"],
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "render": true,
      "formats": ["html", "markdown"]
  }'
  ```
</CodeGroup>

## Search

Real-time web search with structured results:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.search(
      query="latest developments in AI agents",
      max_results=5,
      include_answer=True
  )

  print(f"AI Answer: {result.answer}")
  for r in result.results:
      print(f"- {r.title}: {r.url}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.search({
    query: "latest developments in AI agents",
    max_results: 5,
    include_answer: true,
  });

  console.log(`AI Answer: ${result.answer}`);
  result.results.forEach((r) => {
    console.log(`- ${r.title}: ${r.url}`);
  });
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/search' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "query": "latest developments in AI agents",
      "max_results": 5,
      "include_answer": true
  }'
  ```
</CodeGroup>

## Map

Fast URL discovery and site structure mapping:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(
      url="https://www.example.com",
      sitemap="include"
  )

  for link in result.links:
      print(f"{link.title}: {link.url}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://www.example.com",
    sitemap: "include",
  });

  result.links.forEach((link) => {
    console.log(`${link.title}: ${link.url}`);
  });
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "sitemap": "include"
  }'
  ```
</CodeGroup>

## Crawl

Extract content from entire websites:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.crawl.run(
      url="https://docs.example.com",
      limit=10
  )

  print(f"Crawl started: {result.crawl_id}")
  print(f"Tasks: {len(result.tasks)}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.crawl.run({
    url: "https://docs.example.com",
    limit: 10,
  });

  console.log(`Crawl started: ${result.crawl_id}`);
  console.log(`Tasks: ${result.tasks.length}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://docs.example.com",
      "limit": 10
  }'
  ```
</CodeGroup>

## Next steps

<CardGroup cols={2}>
  <Card icon="bullseye-pointer" href="/nimble-sdk/agentic/agents" title="Web Search Agents">
    Learn about intelligent agents that work with any website
  </Card>

  <Card icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart" title="Extract Docs">
    Full Extract API documentation with all parameters
  </Card>

  <Card icon="code" href="/api-reference/introduction" title="API Reference">
    Complete API reference for all endpoints
  </Card>

  <Card icon="plug" href="/integrations/agent-skills/plugin-installation" title="Install Plugin">
    Use Nimble in Claude Code or Cursor instead of writing code
  </Card>
</CardGroup>
