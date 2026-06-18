> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Web Search Agents

> Intelligent agents that search, extract, and structure knowledge from any website at scale

Nimble **Web Search Agents (WSA)** are intelligent agents that search, extract, and structure real-time knowledge from any website. Describe what data you need, and Nimble builds an agent that delivers structured results at scale — no CSS selectors, no scraping expertise, no maintenance headaches.

A growing library of pre-built agents covers popular sites like Amazon, Google, and Walmart with zero configuration. For any other website, create a custom agent in seconds using natural language.

<CardGroup cols={2}>
  <Card icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder" title="Try Nimble Studio">
    Create a Web Search Agent for any website — no coding required
  </Card>

  <Card icon="plug" href="/integrations/agent-skills/plugin-installation" title="Install Plugin">
    Use Nimble directly in Claude Code or Cursor
  </Card>
</CardGroup>

## Quick Start

### Example Request

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.agent.run(
      agent="amazon_pdp",
      params={
          "asin": "B0DLKFK6LR"
      }
  )

  parsed = result.data.parsing
  print(f"Product: {parsed['product_title']}")
  print(f"Price: ${parsed['web_price']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.agent.run({
    agent: "amazon_pdp",
    params: {
      asin: "B0DLKFK6LR",
    },
  });

  const parsed = result.data.parsing;
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
          "asin": "B0DLKFK6LR"
      }
  }'
  ```
</CodeGroup>

### Example Response

```json theme={"system"}
{
  "url": "https://www.amazon.com/dp/B08N5WRWNW",
  "task_id": "b1fa7943-cba5-4ec2-a88c-4d2d6799c794",
  "status": "success",
  "data": {
    "parsing": {
      "asin": "B08N5WRWNW",
      "product_title": "Apple AirPods Pro (2nd Generation)",
      "brand": "Apple",
      "web_price": 249.0,
      "list_price": 279.0,
      "average_of_reviews": 4.7,
      "number_of_reviews": 125432,
      "availability": true
    }
  },
  "status_code": 200
}
```

## How it works

<Steps>
  <Step title="Select an agent and provide inputs">
    Choose an agent by name (e.g., `amazon_pdp`, `google_search`) and pass the
    required parameters like product ID, search query, or URL
  </Step>

  <Step title="Nimble handles everything">
    The agent fetches the page, handles anti-bot protection, and extracts data
    using battle-tested selectors maintained by Nimble
  </Step>

  <Step title="Receive structured data">
    Get clean, normalized JSON with consistent field names - ready to use in
    your application immediately
  </Step>
</Steps>

## Any website. Structured data. One API.

Every Web Search Agent — whether pre-built or custom — works through the same simple API. Pick a site, describe what you need, and get production-ready structured data.

<CardGroup cols={2}>
  <Card icon="bullseye-pointer" title="Pre-Built Agents">
    A growing library of agents for popular websites — maintained by Nimble
    24/7, auto-healing when sites change. Browse the
    [Gallery](/nimble-sdk/agentic/agent-gallery).
  </Card>

  <Card icon="wand-magic-sparkles" title="Custom Agents">
    Create an agent for **any website** using [Nimble
    Studio](https://online.nimbleway.com/workflow-builder) or the [Nimble
    plugin](/integrations/agent-skills/plugin-installation) in your IDE.
    Describe what you need in plain English.
  </Card>
</CardGroup>

## Parameters

Supported input parameters:

<AccordionGroup>
  <Accordion icon="puzzle-piece" title="agent - Required">
    <ParamField path="agent" type="string" required>
      The name of the pre-built agent to use. Each agent is designed for a specific platform or data type.

      **Popular agents:**

      * `amazon_pdp` - Amazon product pages
      * `amazon_serp` - Amazon search results
      * `google_search` - Google search results
      * `google_maps_search` - Google Maps locations
      * `walmart_pdp` - Walmart products
      * `chatgpt` - ChatGPT prompt results
      * `perplexity` - Perplexity prompt results

      [Browse all agents →](/nimble-sdk/agentic/agent-gallery)
    </ParamField>
  </Accordion>

  <Accordion icon="sliders" title="params - Required">
    <ParamField path="params" type="object" required>
      Agent-specific parameters that tell the agent what data to fetch. Each agent has different requirements.

      **Common param types:**

      * Product IDs (ASINs, SKUs)
      * Search queries
      * URLs or usernames
      * Page numbers for pagination

      **Shared params (available to all agents):**

      In addition to agent-specific fields, `params` also accepts the following [Extract API](/nimble-sdk/web-tools/extract/quickstart) parameters:

      * `country` - Country used to access the target URL. Use [ISO Alpha-2](https://www.iban.com/country-codes) codes.
      * `locale` - Language preference for the results. Use the [LCID](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-lcid/a9eac961-e77d-41a6-90a5-ce1a8b0cdb9c) standard.
      * `tag` - User-defined tag for request identification.
      * `parse` - Whether to enable or disable parsing. Enabled by default.

      **Example:**

      ```json theme={"system"}
      {
        "asin": "B08N5WRWNW"
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="location-dot" title="localization">
    <ParamField path="localization" default="false" type="boolean">
      Enable location-based pricing and availability. **Required** when passing `zip_code` or `store_id` in params.

      Only available for agents that support localization (check agent details).

      **Example:**

      ```json theme={"system"}
      {
        "agent": "amazon_pdp",
        "localization": true,
        "params": {
          "asin": "B08N5WRWNW",
          "zip_code": "90210"
        }
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="file-lines" title="formats">
    <ParamField path="formats" type="array" default="[]">
      Output formats to include in the response alongside `data.parsing`. By default, only structured parsed data is returned.

      **Available formats:**

      * `html` - Raw HTML source of the extracted page
      * `markdown` - Clean markdown version of the page
      * `headers` - HTTP response headers as a key-value object under `data.headers`
      * `links` - All URLs found on the page as an array under `data.links`

      **Example:**

      ```json theme={"system"}
      "formats": ["html", "markdown", "links"]
      ```
    </ParamField>
  </Accordion>
</AccordionGroup>

<Warning>
  **Breaking change:** `data.html` is no longer returned by default. To receive
  HTML in the response, pass `"html"` in the `formats` array.
</Warning>

<Tip>
  Each agent has unique parameter requirements. Check the [Agent
  Gallery](/nimble-sdk/agentic/agent-gallery) for exact parameters for each
  agent.
</Tip>

## Usage

### E-commerce product extraction

Extract product data from Amazon, Walmart, and other retailers:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Amazon product
  result = nimble.agent.run(
      agent="amazon_pdp",
      params={
          "asin": "B08N5WRWNW"
      }
  )

  parsed = result.data.parsing
  print(f"Product: {parsed['product_title']}")
  print(f"Price: ${parsed['web_price']}")
  print(f"Rating: {parsed['average_of_reviews']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Amazon product
  const result = await nimble.agent.run({
    agent: "amazon_pdp",
    params: {
      asin: "B08N5WRWNW",
    },
  });

  const parsed = result.data.parsing;
  console.log(`Product: ${parsed.product_title}`);
  console.log(`Price: $${parsed.web_price}`);
  console.log(`Rating: ${parsed.average_of_reviews}`);
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

### Search results extraction

Get search results from Google, Amazon, and other platforms:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Amazon search
  result = nimble.agent.run(
      agent="amazon_serp",
      params={
          "keyword": "wireless headphones"
      }
  )

  products = result.data.parsing
  print(f"Found {len(products)} products")
  for product in products:
      print(f"- {product['product_name']}: ${product['price']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Amazon search
  const result = await nimble.agent.run({
    agent: "amazon_serp",
    params: {
      keyword: "wireless headphones",
    },
  });

  const products = result.data.parsing;
  console.log(`Found ${products.length} products`);
  products.forEach((product) => {
    console.log(`- ${product.product_name}: $${product.price}`);
  });
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "amazon_serp",
      "params": {
          "keyword": "wireless headphones"
      }
  }'
  ```
</CodeGroup>

### Google Maps extraction

Find businesses and locations:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.agent.run(
      agent="google_maps_search",
      params={
          "query": "coffee shops near Times Square"
      }
  )

  parsed = result.data.parsing
  for place in parsed["entities"]["SearchResult"]:
      print(f"- {place['title']} ({place['rating']} stars)")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.agent.run({
    agent: "google_maps_search",
    params: {
      query: "coffee shops near Times Square",
    },
  });

  const parsed = result.data.parsing;
  parsed.entities.SearchResult.forEach((place) => {
    console.log(`- ${place.title} (${place.rating} stars)`);
  });
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "google_maps_search",
      "params": {
          "query": "coffee shops near Times Square"
      }
  }'
  ```
</CodeGroup>

### LLM platform extraction

Get responses from AI platforms like ChatGPT and Perplexity:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.agent.run(
      agent="chatgpt",
      params={
          "prompt": "What are the best practices for web scraping?"
      }
  )

  parsed = result.data.parsing
  print(parsed["response"])
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.agent.run({
    agent: "chatgpt",
    params: {
      prompt: "What are the best practices for web scraping?",
    },
  });

  console.log(result.data.parsing.response);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "chatgpt",
      "params": {
          "prompt": "What are the best practices for web scraping?"
      }
  }'
  ```
</CodeGroup>

### Extraction with Localization

Use the `localization` parameter to get location-specific pricing and availability. Pass a `zip_code` or `store_id` in params to target a specific locale.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Get New York pricing
  result = nimble.agent.run(
      agent="amazon_pdp",
      localization=True,
      params={
          "asin": "B08N5WRWNW",
          "zip_code": "10001"
      }
  )

  parsed = result.data.parsing
  print(f"Price in NYC: ${parsed['web_price']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Get New York pricing
  const result = await nimble.agent.run({
    agent: "amazon_pdp",
    localization: true,
    params: {
      asin: "B08N5WRWNW",
      zip_code: "10001",
    },
  });

  console.log(`Price in NYC: $${result.data.parsing.web_price}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "amazon_pdp",
      "localization": true,
      "params": {
          "asin": "B08N5WRWNW",
          "zip_code": "10001"
      }
  }'
  ```
</CodeGroup>

***

## Pagination

Some agents support pagination — check the agent's [input properties](/nimble-sdk/agentic/agent-gallery#input-properties) for a field with `is_pagination_param: true`, or `feature_flags.is_pagination_supported: true` on the agent metadata.

Pagination is client-driven: call the agent once per page by incrementing the pagination field (commonly `page`) in `params`. Nimble does not return a "last page" signal — you decide when to stop.

<Warning>
  Some sites return placeholder or "fake" content for page numbers that do not
  exist instead of an empty response. Always validate results (e.g., check for
  expected fields, compare against the previous page) before saving or acting on
  them.
</Warning>

### Example: Paginate Amazon search results

The `amazon_serp` agent accepts a `page` parameter. Call the agent once per page, incrementing `page` each run. The example below fetches 10 pages of results for the keyword `iphone 17`.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  all_products = []

  for page in range(1, 11):  # pages 1 through 10
      result = nimble.agent.run(
          agent="amazon_serp",
          params={
              "keyword": "iphone 17",
              "page": page
          }
      )

      products = result.data.parsing
      print(f"Page {page}: {len(products)} products")
      all_products.extend(products)

  print(f"Total products across 10 pages: {len(all_products)}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const allProducts = [];

  for (let page = 1; page <= 10; page++) {
    const result = await nimble.agent.run({
      agent: "amazon_serp",
      params: {
        keyword: "iphone 17",
        page,
      },
    });

    const products = result.data.parsing;
    console.log(`Page ${page}: ${products.length} products`);
    allProducts.push(...products);
  }

  console.log(`Total products across 10 pages: ${allProducts.length}`);
  ```

  ```bash cURL theme={"system"}
  # Run once per page, incrementing page: 1, 2, 3, ..., 10
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "amazon_serp",
      "params": {
          "keyword": "iphone 17",
          "page": 1
      }
  }'
  ```

  ```bash CLI theme={"system"}
  # Run once per page, incrementing page: 1, 2, 3, ..., 10
  nimble agent run --agent amazon_serp --params '{"keyword": "iphone 17", "page": 1}'
  ```
</CodeGroup>

<Note>
  Remember to validate results page-by-page — some sites return placeholder
  content for pages beyond the real total instead of an empty response.
</Note>

<Tip>
  For bulk paginated extraction, use [Agent Batch](#batch) with one input per
  page to run requests in parallel.
</Tip>

***

## Async & Batch

Run agent extractions in the background or submit multiple agent requests at once. Both modes return immediately with a task or batch ID — no waiting while Nimble processes the work.

<Tabs>
  <Tab title="Async Example">
    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      response = nimble.agent.run_async(
          agent="amazon_pdp",
          params={"asin": "B0DLKFK6LR"}
      )

      print(f"Task created: {response.task_id}")
      # Poll GET /v1/tasks/{task_id} until state == "success"
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const response = await nimble.agent.runAsync({
        agent: "amazon_pdp",
        params: { asin: "B0DLKFK6LR" },
      });

      console.log(`Task created: ${response.task_id}`);
      // Poll GET /v1/tasks/{taskId} until state === "success"
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/agents/async' \
        --header 'Authorization: Bearer YOUR-API-KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "agent": "amazon_pdp",
          "params": {"asin": "B0DLKFK6LR"}
        }'
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Batch Example">
    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      response = nimble.agent.batch(
          inputs=[
              {"params": {"keyword": "iphone 15"}},
              {"params": {"keyword": "iphone 16"}},
              {"params": {"keyword": "iphone 17"}},
          ],
          shared_inputs={
              "agent": "amazon_serp",
          }
      )

      print(f"Batch created: {response.batch_id} ({response.batch_size} tasks)")
      # Poll GET /v1/batches/{batch_id}/progress until completed == true
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const response = await nimble.agent.batch({
        inputs: [
          { params: { keyword: "iphone 15" } },
          { params: { keyword: "iphone 16" } },
          { params: { keyword: "iphone 17" } },
        ],
        shared_inputs: {
          agent: "amazon_serp",
        },
      });

      console.log(`Batch created: ${response.batch_id} (${response.batch_size} tasks)`);
      // Poll GET /v1/batches/{batchId}/progress until completed === true
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/agents/batch' \
        --header 'Authorization: Bearer YOUR-API-KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "inputs": [
            {"params": {"keyword": "iphone 15"}},
            {"params": {"keyword": "iphone 16"}},
            {"params": {"keyword": "iphone 17"}}
          ],
          "shared_inputs": {
            "agent": "amazon_serp"
          }
        }'
      ```
    </CodeGroup>
  </Tab>
</Tabs>

Use async or batch when you need to:

* Run agents without blocking your application
* Process multiple agent requests in parallel
* Deliver results to cloud storage (S3 / GCS) automatically
* Receive webhook notifications when tasks complete
* Integrate agents into scheduled or queued workflows

### How it works

<Steps>
  <Step title="Submit a request">
    Send a POST request to the async or batch endpoint. The API returns
    immediately with a `task_id` (async) or `batch_id` (batch) — no waiting for
    the agent to finish.
  </Step>

  <Step title="Nimble processes in the background">
    The agent runs asynchronously. For batch, each input becomes an independent
    task processed in parallel.
  </Step>

  <Step title="Receive results your way">
    Choose how results are delivered:

    * **Polling** — check task status and fetch results on demand
    * **Webhook** — get notified automatically when a task completes
    * **Cloud storage** — results saved directly to your S3 or GCS bucket

    <Tip>
      For setup instructions and code examples, see the [Callbacks & Delivery](/nimble-sdk/admin/callbacks-and-delivery) guide.
    </Tip>
  </Step>
</Steps>

***

### Async

Submit a single agent request and receive a `task_id` immediately. Retrieve results via polling, webhook, or cloud storage.

```bash theme={"system"}
POST https://sdk.nimbleway.com/v1/agents/async
```

#### Parameters

Accepts all [Agents API parameters](#parameters), plus async-specific delivery options:

* `agent` (required) — The agent to run
* `params` (required) — Agent-specific input parameters
* `localization` — Enable location-based data
* `formats` — Output formats: `html`, `markdown`, `headers`

**Async-specific parameters:**

<AccordionGroup>
  <Accordion icon="cloud" title="storage_type">
    <ParamField path="storage_type" type="string">
      Storage provider for results. When specified, results are saved to your cloud storage instead of Nimble's servers.

      **Options:** `s3` (Amazon S3), `gs` (Google Cloud Storage)
    </ParamField>
  </Accordion>

  <Accordion icon="folder" title="storage_url">
    <ParamField path="storage_url" type="string">
      Bucket path where results will be saved. Results are stored as `{task_id}.json` at the specified location.

      **Format:** `s3://your-bucket/path/prefix/`
    </ParamField>
  </Accordion>

  <Accordion icon="file-zipper" title="storage_compress">
    <ParamField path="storage_compress" type="boolean" default="false">
      Compress results with GZIP before saving. When `true`, results are saved as `{task_id}.json.gz`.
    </ParamField>
  </Accordion>

  <Accordion icon="tag" title="storage_object_name">
    <ParamField path="storage_object_name" type="string">
      Custom filename for the stored object instead of the default task ID.

      **Example:** `"my-custom-name"` saves as `my-custom-name.json`
    </ParamField>
  </Accordion>

  <Accordion icon="webhook" title="callback_url">
    <ParamField path="callback_url" type="string">
      Webhook URL to receive a POST request when the task completes. Nimble sends task metadata (without result data) to this URL when the agent finishes.

      **Example:** `https://your-api.com/webhook/complete`
    </ParamField>
  </Accordion>
</AccordionGroup>

The endpoint returns immediately with a task ID:

```json theme={"system"}
{
  "status": "success",
  "task": {
    "id": "8e8cfde8-345b-42b8-b3e2-0c61eb11e00f",
    "state": "pending",
    "created_at": "2026-01-24T12:36:24.685Z",
    "modified_at": "2026-01-24T12:36:24.685Z",
    "input": {}
  }
}
```

#### Status & Results

When **polling**, the typical flow is:

1. Poll `GET /v1/tasks/{task_id}` until `state: "success"`
2. Call `GET /v1/tasks/{task_id}/results` to retrieve the extracted data

**Task states:**

| State     | Description                            |
| --------- | -------------------------------------- |
| `pending` | Task queued, waiting to start          |
| `success` | Extraction complete, results available |
| `error`   | Extraction failed                      |

***

### Batch

Submit up to **1,000 agent requests in a single request**. Each input runs as an independent async task. Use `shared_inputs` to set the agent and common settings — individual items in `inputs` can override `params` per item.

```bash theme={"system"}
POST https://sdk.nimbleway.com/v1/agents/batch
```

#### Parameters

<AccordionGroup>
  <Accordion icon="list" title="inputs — Required">
    <ParamField path="inputs" type="array" required>
      Array of per-item inputs. Supports up to **1,000 items** per batch. `agent` is not set here — it must be in `shared_inputs` and applies to all items.

      Each item supports:

      * `params` — Agent-specific inputs for this item (e.g. `asin`, `keyword`). Merged with `shared_inputs.params` — keys in `inputs[i].params` take priority on conflicts.
      * `localization` — Override the shared localization setting for this item
      * `formats` — Override the shared formats setting for this item

      ```json theme={"system"}
      "inputs": [
        { "params": { "keyword": "iphone 15" } },
        { "params": { "keyword": "iphone 16" }, "localization": true }
      ]
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="layer-group" title="shared_inputs — Required">
    <ParamField path="shared_inputs" type="object" required>
      Shared configuration applied to all items in the batch. Each batch runs a single agent — `agent` is required here and cannot be set per item.

      * `agent` (required) — The agent to run for all items
      * `params` — Default agent params and delivery options, merged with each item's `params`. Per-item values win on conflicts.
      * `localization` — Default localization setting for all items (overridable per item)
      * `formats` — Default output formats for all items (overridable per item)

      **Delivery options** (set inside `params`):

      * `storage_type` — `s3` or `gs`
      * `storage_url` — bucket path for results
      * `storage_compress` — GZIP compress results
      * `callback_url` — webhook on completion

      ```json theme={"system"}
      "shared_inputs": {
        "agent": "amazon_serp",
        "params": {
          "storage_type": "s3",
          "storage_url": "s3://your-bucket/results/",
          "callback_url": "https://your-api.com/webhooks/complete"
        },
        "formats": ["markdown"]
      }
      ```
    </ParamField>
  </Accordion>
</AccordionGroup>

#### Examples

<AccordionGroup>
  <Accordion icon="list" title="Example 1: Batch multiple keywords">
    Run the same agent for multiple search terms with S3 delivery:

    <CodeGroup>
      ```python Python theme={"system"}
      response = nimble.agent.batch(
          inputs=[
              {"params": {"keyword": "iphone 15"}},
              {"params": {"keyword": "samsung galaxy s24"}},
              {"params": {"keyword": "pixel 9"}},
          ],
          shared_inputs={
              "agent": "amazon_serp",
              "params": {
                  "storage_type": "s3",
                  "storage_url": "s3://your-bucket/results/",
                  "callback_url": "https://your-api.com/webhooks/batch-complete",
              },
          }
      )

      print(f"Batch ID: {response.batch_id}")
      print(f"Tasks submitted: {response.batch_size}")
      ```

      ```javascript Node theme={"system"}
      const response = await nimble.agent.batch({
        inputs: [
          { params: { keyword: "iphone 15" } },
          { params: { keyword: "samsung galaxy s24" } },
          { params: { keyword: "pixel 9" } },
        ],
        shared_inputs: {
          agent: "amazon_serp",
          params: {
            storage_type: "s3",
            storage_url: "s3://your-bucket/results/",
            callback_url: "https://your-api.com/webhooks/batch-complete",
          },
        },
      });

      console.log(`Batch ID: ${response.batch_id}`);
      console.log(`Tasks submitted: ${response.batch_size}`);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/agents/batch' \
        --header 'Authorization: Bearer YOUR-API-KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "inputs": [
            {"params": {"keyword": "iphone 15"}},
            {"params": {"keyword": "samsung galaxy s24"}},
            {"params": {"keyword": "pixel 9"}}
          ],
          "shared_inputs": {
            "agent": "amazon_serp",
            "params": {
              "storage_type": "s3",
              "storage_url": "s3://your-bucket/results/",
              "callback_url": "https://your-api.com/webhooks/batch-complete"
            }
          }
        }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion icon="box" title="Example 2: Batch multiple product ASINs">
    Extract product details for many ASINs at once:

    <CodeGroup>
      ```python Python theme={"system"}
      response = nimble.agent.batch(
          inputs=[
              {"params": {"asin": "B0DLKFK6LR"}},
              {"params": {"asin": "B08N5WRWNW"}},
              {"params": {"asin": "B09XS7JWHH"}},
          ],
          shared_inputs={
              "agent": "amazon_pdp",
              "params": {
                  "callback_url": "https://your-api.com/webhooks/batch-complete",
              },
          }
      )

      print(f"Batch ID: {response.batch_id}")
      ```

      ```javascript Node theme={"system"}
      const response = await nimble.agent.batch({
        inputs: [
          { params: { asin: "B0DLKFK6LR" } },
          { params: { asin: "B08N5WRWNW" } },
          { params: { asin: "B09XS7JWHH" } },
        ],
        shared_inputs: {
          agent: "amazon_pdp",
          params: {
            callback_url: "https://your-api.com/webhooks/batch-complete",
          },
        },
      });

      console.log(`Batch ID: ${response.batch_id}`);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/agents/batch' \
        --header 'Authorization: Bearer YOUR-API-KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "inputs": [
            {"params": {"asin": "B0DLKFK6LR"}},
            {"params": {"asin": "B08N5WRWNW"}},
            {"params": {"asin": "B09XS7JWHH"}}
          ],
          "shared_inputs": {
            "agent": "amazon_pdp",
            "params": {
              "callback_url": "https://your-api.com/webhooks/batch-complete"
            }
          }
        }'
      ```
    </CodeGroup>
  </Accordion>
</AccordionGroup>

The endpoint returns immediately with a `batch_id` and the initial task list:

```json theme={"system"}
{
  "batch_id": "4b0a90bf-c951-42e4-95b3-a95a65ba69fc",
  "batch_size": 3,
  "tasks": [
    { "id": "task-001-uuid", "state": "pending", "batch_id": "4b0a90bf-..." },
    { "id": "task-002-uuid", "state": "pending", "batch_id": "4b0a90bf-..." },
    { "id": "task-003-uuid", "state": "pending", "batch_id": "4b0a90bf-..." }
  ]
}
```

#### Status & Results

When **polling**, the typical flow is:

1. Poll `/v1/batches/{batch_id}/progress` until `completed: true`
2. Fetch `/v1/batches/{batch_id}` to get all task IDs and states
3. For each `success` task, call `GET /v1/tasks/{task_id}/results`

**Batch states:**

| State         | Description                            |
| ------------- | -------------------------------------- |
| `pending`     | Task queued, waiting to start          |
| `in_progress` | Task is currently being processed      |
| `success`     | Extraction complete, results available |
| `error`       | Extraction failed                      |

<Steps>
  <Step>
    #### Poll for batch completion

    Call `/v1/batches/{batch_id}/progress` repeatedly until `completed: true`. This is a lightweight endpoint — use it for polling.

    ```bash theme={"system"}
    GET https://sdk.nimbleway.com/v1/batches/{batch_id}/progress
    ```

    ```json theme={"system"}
    {
      "id": "4b0a90bf-c951-42e4-95b3-a95a65ba69fc",
      "completed": false,
      "completed_count": 47,
      "progress": 0.47,
      "completed_at": null
    }
    ```
  </Step>

  <Step>
    #### Fetch the full batch details

    Once `completed: true`, fetch the batch details to get all task IDs, states, and download URLs.

    ```bash theme={"system"}
    GET https://sdk.nimbleway.com/v1/batches/{batch_id}
    ```

    ```json theme={"system"}
    {
      "id": "4b0a90bf-c951-42e4-95b3-a95a65ba69fc",
      "completed": true,
      "completed_count": 3,
      "progress": 1.0,
      "tasks": [
        {
          "id": "task-001-uuid",
          "state": "success",
          "download_url": "https://sdk.nimbleway.com/v1/tasks/task-001-uuid/results"
        },
        {
          "id": "task-002-uuid",
          "state": "error",
          "error": "Connection timeout"
        }
      ]
    }
    ```
  </Step>

  <Step>
    #### Retrieve results per task

    Iterate over the task list and call `GET /v1/tasks/{task_id}/results` for each `success` task.

    <CodeGroup>
      ```python Python theme={"system"}
      import requests

      batch = requests.get(
          f"https://sdk.nimbleway.com/v1/batches/{batch_id}",
          headers={"Authorization": "Bearer YOUR-API-KEY"}
      ).json()

      for task in batch["tasks"]:
          if task["state"] == "success":
              result = requests.get(
                  task["download_url"],
                  headers={"Authorization": "Bearer YOUR-API-KEY"}
              ).json()
              print(result["data"]["parsing"])
      ```

      ```javascript Node theme={"system"}
      const batch = await fetch(`https://sdk.nimbleway.com/v1/batches/${batchId}`, {
        headers: { Authorization: "Bearer YOUR-API-KEY" },
      }).then((r) => r.json());

      for (const task of batch.tasks) {
        if (task.state === "success") {
          const result = await fetch(task.download_url, {
            headers: { Authorization: "Bearer YOUR-API-KEY" },
          }).then((r) => r.json());
          console.log(result.data.parsing);
        }
      }
      ```

      ```bash cURL theme={"system"}
      # Fetch results for a single task (repeat per task_id)
      curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}/results' \
        --header 'Authorization: Bearer YOUR-API-KEY'
      ```
    </CodeGroup>
  </Step>
</Steps>

***

## Agent Gallery

Browse pre-built agents **maintained by Nimble** for popular platforms:

<Card icon="grid" href="https://online.nimbleway.com/pipeline-gallery" title="Explore Full Gallery">
  Browse all agents with interactive documentation and live testing
</Card>

### E-commerce

| Agent            | Platform | Description                       |
| ---------------- | -------- | --------------------------------- |
| `amazon_pdp`     | Amazon   | Product details, pricing, reviews |
| `amazon_serp`    | Amazon   | Search results with products      |
| `walmart_pdp`    | Walmart  | Product details and pricing       |
| `walmart_search` | Walmart  | Search results                    |
| `target_pdp`     | Target   | Product details                   |
| `best_buy_pdp`   | Best Buy | Product details                   |

### Search Engines

| Agent                | Platform    | Description                     |
| -------------------- | ----------- | ------------------------------- |
| `google_search`      | Google      | Search results with snippets    |
| `google_maps_search` | Google Maps | Business listings and locations |
| `google_search_aio`  | Google      | AI Overview results             |

### LLM Platforms

| Agent        | Platform      | Description           |
| ------------ | ------------- | --------------------- |
| `chatgpt`    | ChatGPT       | Prompt responses      |
| `perplexity` | Perplexity    | Search + AI responses |
| `gemini`     | Google Gemini | Prompt responses      |
| `grok`       | Grok          | Prompt responses      |

### Social Media

| Agent            | Platform | Description                 |
| ---------------- | -------- | --------------------------- |
| `tiktok_account` | TikTok   | Account profiles and videos |
| `facebook_page`  | Facebook | Page information            |
| `youtube_shorts` | YouTube  | Short-form videos           |

## Create Custom Agents

Can't find an agent for your target website? Create your own using **Nimble Studio** - no coding required.

<Steps>
  <Step title="Open Nimble Studio">
    Go to the [Nimble Studio](https://online.nimbleway.com/workflow-builder) in Nimble Platform
  </Step>

  <Step title="Provide URL and describe your needs">
    Enter the website URL and describe what data you need in plain English:

    *"Extract product name, price, rating, and all review comments"*
  </Step>

  <Step title="AI creates your agent">
    Our AI analyzes the page and builds an extraction agent automatically - no CSS selectors needed
  </Step>

  <Step title="Test and refine">
    Preview extracted data and refine your description if needed
  </Step>

  <Step title="Use via API">
    Your custom agent is available via the same Agent API with your chosen name
  </Step>
</Steps>

### Custom agent example

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Use your custom agent just like a public one
  result = nimble.agent.run(
      agent="my_custom_store_pdp",  # Your custom agent name
      params={
          "url": "https://www.nike.com/t/air-max-90-mens-shoes"
      }
  )

  parsed = result.data.parsing
  print(f"Product: {parsed['product_name']}")
  print(f"Price: ${parsed['price']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Use your custom agent just like a public one
  const result = await nimble.agent.run({
    agent: "my_custom_store_pdp", // Your custom agent name
    params: {
      url: "https://www.nike.com/t/air-max-90-mens-shoes",
    },
  });

  const parsed = result.data.parsing;
  console.log(`Product: ${parsed.product_name}`);
  console.log(`Price: $${parsed.price}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "my_custom_store_pdp",
      "params": {
          "url": "https://www.nike.com/t/air-max-90-mens-shoes"
      }
  }'
  ```
</CodeGroup>

<Tip>
  Pre-built agents are maintained by Nimble 24/7 and auto-heal when sites
  change. Custom agents can be updated anytime in [Nimble
  Studio](https://online.nimbleway.com/workflow-builder). For popular sites,
  check the [Gallery](/nimble-sdk/agentic/agent-gallery) first — a pre-built
  agent may already exist.
</Tip>

## Response Fields

| Field           | Type   | Description                                                       |
| --------------- | ------ | ----------------------------------------------------------------- |
| `url`           | string | The URL that was extracted                                        |
| `task_id`       | string | Unique identifier for the request                                 |
| `status`        | string | `success` or `failed`                                             |
| `data.parsing`  | object | Structured extracted data (always returned)                       |
| `data.html`     | string | Raw HTML — only included when `formats: ["html"]`                 |
| `data.markdown` | string | Markdown — only included when `formats: ["markdown"]`             |
| `data.headers`  | object | HTTP response headers — only included when `formats: ["headers"]` |
| `status_code`   | number | HTTP status code from target                                      |

## Use cases

<CardGroup cols={2}>
  <Card icon="chart-line" title="Price Monitoring">
    Track prices across Amazon, Walmart, and other retailers with consistent
    data formats
  </Card>

  <Card icon="magnifying-glass" title="Product Research">
    Gather comprehensive product data from major e-commerce platforms
  </Card>

  <Card icon="ranking-star" title="Search Tracking">
    Monitor Google, Bing, and marketplace search results for SEO and visibility
  </Card>

  <Card icon="chess" title="Competitive Intelligence">
    Extract competitor data from any website using public or custom agents
  </Card>
</CardGroup>

## Agents vs other tools

| What you need                                  | Use                                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Data from popular sites (Amazon, Google, etc.) | **Public Agents** - [browse gallery](/nimble-sdk/agentic/agent-gallery)                   |
| Data from sites not in the gallery             | **Custom Agents** - [create in Studio](/nimble-sdk/agentic/studio)                        |
| Data from specific URLs (expert users)         | [**Extract**](/nimble-sdk/web-tools/extract/quickstart) - full control with CSS selectors |
| Data from entire website                       | [**Crawl**](/nimble-sdk/web-tools/crawl)                                                  |
| Search web + extract content from results      | [**Search**](/nimble-sdk/web-tools/search)                                                |

<Tip>
  **Web Search Agents work with any website.** Pre-built agents cover popular
  sites with zero configuration. For everything else, [create a custom
  agent](https://online.nimbleway.com/workflow-builder) in seconds — or install
  the [Nimble plugin](/integrations/agent-skills/plugin-installation) and let
  your AI coding assistant handle it.
</Tip>

## Next steps

<CardGroup cols={2}>
  <Card icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder" title="Try Nimble Studio">
    Create a Web Search Agent for any website — see the value in minutes
  </Card>

  <Card icon="plug" href="/integrations/agent-skills/plugin-installation" title="Install Plugin">
    Use Nimble in Claude Code or Cursor — your AI assistant builds agents for
    you
  </Card>

  <Card icon="grid" href="/nimble-sdk/agentic/agent-gallery" title="Agent Gallery">
    Browse pre-built agents for popular sites
  </Card>

  <Card icon="code" href="/api-reference/agents/agent-run" title="API Reference">
    Explore the Agents API for direct integration
  </Card>
</CardGroup>
