> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Crawl

> Extract structured data from entire websites automatically

Nimble **Crawl** (async) systematically visits and extracts content from entire websites. Give it a starting URL, and it automatically discovers pages through sitemaps and internal links, then extracts clean structured data from every page it visits.

## Quick Start

### Example Request

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.crawl.run(
      url="https://www.nimbleway.com",
      limit=10
  )

  print(f"Crawl started with ID: {result.crawl_id}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.crawl.run({
    url: "https://www.nimbleway.com",
    limit: 10,
  });

  console.log(`Crawl started with ID: ${result.crawl_id}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "limit": 10
  }'
  ```
</CodeGroup>

### Example Response

```json theme={"system"}
{
  "crawl_id": "e3ca2ff1-b82a-472b-b1a9-ef4d29cc549f",
  "name": null,
  "url": "https://www.nimbleway.com",
  "status": "queued",
  "account_name": "your-account",
  "created_at": "2026-02-09T23:15:40.785Z",
  "updated_at": "2026-02-09T23:15:40.785Z",
  "completed_at": null,
  "crawl_options": {
    "sitemap": "include",
    "crawl_entire_domain": false,
    "limit": 10,
    "max_discovery_depth": 5,
    "ignore_query_parameters": false,
    "allow_external_links": false,
    "allow_subdomains": false
  },
  "extract_options": null
}
```

## How it works

<Steps>
  <Step title="You submit a crawl request">
    Provide a starting URL and configure crawl options (limits, filters,
    extraction settings)
  </Step>

  <Step title="An async crawl job is created">
    * Returns immediately with a `crawl_id` to track progress - The crawl runs
      in the background on Nimble's infrastructure - Optional: Configure webhooks
      to receive real-time notifications
  </Step>

  <Step title="Crawl discovers and processes pages">
    * Reads sitemaps and follows internal links - Creates individual tasks for
      each discovered URL - Extracts content from pages as they're visited -
      Status updates live: track `pending`, `completed`, and `failed` counts
  </Step>

  <Step title="Retrieve results anytime">
    * Poll crawl status to monitor progress - Fetch extracted content for
      completed tasks using `task_id` - Results persist after crawl completes for
      later retrieval
  </Step>
</Steps>

## Parameters

Supported input parameters:

<AccordionGroup>
  <Accordion icon="link" title="url - Required">
    <ParamField path="url" type="string" required>
      The starting point for your crawl. The crawler will begin here and discover other pages from this URL.

      **Example:** `https://www.nimbleway.com`
    </ParamField>
  </Accordion>

  <Accordion icon="tag" title="name">
    <ParamField path="name" type="string">
      Give your crawl a memorable name. This helps you identify it later when you have multiple crawls running.

      **Example:** `my-zillow-crawl`
    </ParamField>
  </Accordion>

  <Accordion icon="hashtag" title="limit">
    <ParamField path="limit" default="5000" type="integer">
      Stop the crawl after finding this many pages.

      * Min: `1`
      * Max: `10000`
      * Default: `5000`
    </ParamField>
  </Accordion>

  <Accordion icon="wand-magic-sparkles" title="extract_options">
    <ParamField path="extract_options" type="object">
      Automatically extract content from each page as you crawl it. Accepts all [Extract API](/nimble-sdk/web-tools/extract/quickstart) options.

      \*\*Example: \*\*

      ```json theme={"system"}
      {
      	"extract_options":{
      		"driver":"vx10",
      		"parse":true,
      		"formats": ["html", "markdown"]
      	}
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="sitemap" title="sitemap">
    <ParamField path="sitemap" default="include" type="string">
      Decide how to use the website's sitemap for discovering pages.

      **Options:**

      * `include` (default) - Use both the sitemap and discovered links
      * `only` - Just use the sitemap (fastest)
      * `skip` - Ignore the sitemap and only follow links
    </ParamField>
  </Accordion>

  <Accordion icon="globe" title="crawl_entire_domain">
    <ParamField path="crawl_entire_domain" default="false" type="boolean">
      Let the crawler explore the entire domain, not just pages "under" your starting URL.

      For example, if you start at `/blog`, enabling this lets it also crawl `/about` and `/contact`.
    </ParamField>
  </Accordion>

  <Accordion icon="link" title="allow_subdomains">
    <ParamField path="allow_subdomains" default="false" type="boolean">
      Allow the crawler to follow links to subdomains.

      For example, from `www.example.com` to `blog.example.com` or `shop.example.com`.
    </ParamField>
  </Accordion>

  <Accordion icon="filter-circle-dollar" title="include_paths">
    <ParamField path="include_paths" type="array">
      Only crawl pages whose URLs match these regex patterns.

      **Example:** `["/blog/.*", "/articles/.*"]`
    </ParamField>
  </Accordion>

  <Accordion icon="ban" title="exclude_paths">
    <ParamField path="exclude_paths" type="array">
      Skip pages whose URLs match these regex patterns.

      **Example:** `[".*/tag/.*", ".*/page/[0-9]+"]`
    </ParamField>
  </Accordion>

  <Accordion icon="layer-group" title="max_discovery_depth">
    <ParamField path="max_discovery_depth" default="5" type="integer">
      Control how many "clicks away" from the starting page the crawler can go.

      * Min: `1`
      * Max: `20`
      * Default: `5`
    </ParamField>
  </Accordion>

  <Accordion icon="question" title="ignore_query_parameters">
    <ParamField path="ignore_query_parameters" default="false" type="boolean">
      Treat URLs with different query parameters as the same page, preventing duplicate crawls.
    </ParamField>
  </Accordion>

  <Accordion icon="webhook" title="callback">
    <ParamField path="callback" type="object">
      Get notified when your crawl completes or as pages are discovered.

      **Configuration:**

      * `url` (required) - String | Webhook URL to receive notifications
      * `headers` - Object | Custom headers for authentication
      * `metadata` - Object | Extra data to include in payloads
      * `events` - Array | Which events trigger notifications: `started`, `page`, `completed`, `failed`

      **Example:**

      ```json theme={"system"}
      {
      	"callback":{
      		"url":"",
      		"headers":{},
      		"metadata":{},
      		"events":["started", "completed"]
      	}
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="globe" title="country">
    <ParamField path="country" default="ALL" type="string">
      Crawl the site as if you're browsing from a specific country.

      Use ISO Alpha-2 country codes like `US`, `GB`, `FR`, `DE`, `CA`, `JP`, etc. Use `ALL` for random country selection.
    </ParamField>
  </Accordion>

  <Accordion icon="language" title="locale">
    <ParamField path="locale" type="string">
      Set the language preference for crawling. Use LCID standard.

      **Locale Examples:**

      * `en-US` - English (United States)
      * `en-GB` - English (United Kingdom)
      * `fr-FR` - French (France)
      * `de-DE` - German (Germany)
    </ParamField>
  </Accordion>
</AccordionGroup>

## Usage

### Basic crawl

Crawl a website using default settings:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.crawl.run(url="https://www.nimbleway.com")

  print(f"Crawl started with ID: {result.crawl_id}")
  print(f"Status: {result.status}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.crawl.run({
    url: "https://www.nimbleway.com",
  });

  console.log(`Crawl started with ID: ${result.crawl_id}`);
  console.log(`Status: ${result.status}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com"
  }'
  ```
</CodeGroup>

### Filter with URL patterns

Use include and exclude patterns to control which URLs are crawled:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.crawl.run(
      url="https://www.nimbleway.com",
      include_paths=["/blog/.*", "/use-cases/.*"],
      exclude_paths=[".*/careers/.*"],
      limit=500
  )

  print(f"Crawl ID: {result.crawl_id}")
  print(f"Status: {result.status}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.crawl.run({
    url: "https://www.nimbleway.com",
    include_paths: ["/blog/.*", "/use-cases/.*"],
    exclude_paths: [".*/careers/.*"],
    limit: 500,
  });

  console.log(`Crawl ID: ${result.crawl_id}`);
  console.log(`Status: ${result.status}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "include_paths": ["/blog/.*", "/use-cases/.*"],
      "exclude_paths": [".*/careers/.*"],
      "limit": 500
  }'
  ```
</CodeGroup>

### Crawl entire domain

Allow crawler to follow all internal links beyond the starting path:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.crawl.run(
      url="https://www.nimbleway.com/blog",
      crawl_entire_domain=True,
      limit=2000
  )

  print(f"Crawl ID: {result.crawl_id}")
  print(f"Status: {result.status}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.crawl.run({
    url: "https://www.nimbleway.com/blog",
    crawl_entire_domain: true,
    limit: 2000,
  });

  console.log(`Crawl ID: ${result.crawl_id}`);
  console.log(`Status: ${result.status}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com/blog",
      "crawl_entire_domain": true,
      "limit": 2000
  }'
  ```
</CodeGroup>

### Crawl with extraction

Extract structured data from each page during the crawl:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.crawl.run(
      url="https://www.nimbleway.com",
      limit=500,
      extract_options={
          "driver": "vx10",
          "parse": True,
          "formats": ["html", "markdown"]
      }
  )

  print(f"Crawl ID: {result.crawl_id}")
  print(f"Status: {result.status}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.crawl.run({
    url: "https://www.nimbleway.com",
    limit: 500,
    extract_options: {
      driver: "vx10",
      parse: true,
      formats: ["html", "markdown"],
    },
  });

  console.log(`Crawl ID: ${result.crawl_id}`);
  console.log(`Status: ${result.status}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "limit": 500,
      "extract_options": {
          "driver": "vx10",
          "parse": true,
          "formats": ["html", "markdown"]
      }
  }'
  ```
</CodeGroup>

### Combined parameters

Crawl with multiple parameters for precise control:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.crawl.run(
      url="https://www.nimbleway.com",
      name="Nimble Website Crawl",
      sitemap="include",
      allow_subdomains=True,
      include_paths=["/use-cases/.*"],
      limit=1000,
      callback={
          "url": "https://your-server.com/webhook",
          "events": ["completed"]
      }
  )

  print(f"Crawl started: {result.crawl_id}")
  print(f"Status: {result.status}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.crawl.run({
    url: "https://www.nimbleway.com",
    name: "Nimble Website Crawl",
    sitemap: "include",
    allow_subdomains: true,
    include_paths: ["/use-cases/.*"],
    limit: 1000,
    callback: {
      url: "https://your-server.com/webhook",
      events: ["completed"],
    },
  });

  console.log(`Crawl started: ${result.crawl_id}`);
  console.log(`Status: ${result.status}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "name": "Nimble Website Crawl",
      "sitemap": "include",
      "allow_subdomains": true,
      "include_paths": ["/use-cases/.*"],
      "limit": 1000,
      "callback": {
          "url": "https://your-server.com/webhook",
          "events": ["completed"]
      }
  }'
  ```
</CodeGroup>

## Managing Crawls

<Steps>
  <Step title="List crawls" stepNumber={0} titleSize="h3">
    Get all your crawls filtered by status using the REST API:

    * **Available status filters:** `pending`, `in_progress`, `completed`, `failed`, `canceled`

          <CodeGroup>
            ```python Python theme={"system"}
            from nimble_python import Nimble

            nimble = Nimble(api_key="YOUR-API-KEY")

            # List crawls by status
            my_crawls = nimble.crawl.list()

            for crawl in my_crawls.data:
                print(f"Crawl {crawl.crawl_id}: {crawl.name} - {crawl.status}")
            ```

            ```javascript Node theme={"system"}
            import Nimble from '@nimble-way/nimble-js';

            const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

            // List crawls by status
            const myCrawls = await nimble.crawl.list();

            myCrawls.data.forEach(crawl => {
              console.log(`Crawl ${crawl.crawl_id}: ${crawl.name} - ${crawl.status}`);
            });
            ```

            ```bash cURL theme={"system"}
            # Filter by status: pending, in_progress, completed, failed, canceled
            curl -X GET 'https://sdk.nimbleway.com/v1/crawl?status=completed' \
            --header 'Authorization: Bearer <YOUR-API-KEY>'
            ```
          </CodeGroup>
  </Step>

  <Step title="Get crawl status (by crawl_id)" titleSize="h3">
    Check progress and get the list of task IDs for a specific crawl using the REST API:

    <CodeGroup>
      ```python Python theme={"system"}
      my_crawl = nimble.crawl.status(crawl_id)

      print(f"Status: {my_crawl.status}")
      ```

      ```javascript Node theme={"system"}
      const myCrawl = await nimble.crawl.status(crawlId);

      console.log(`Status: ${myCrawl.status}`);
      ```

      ```bash cURL theme={"system"}
      curl -X GET 'https://sdk.nimbleway.com/v1/crawl/e3ca2ff1-b82a-472b-b1a9-ef4d29cc549f' \
      --header 'Authorization: Bearer <YOUR-API-KEY>'
      ```
    </CodeGroup>
  </Step>

  <Step title="Get task results" titleSize="h3">
    Use the `task_id` from the crawl status response to fetch extracted content for each page using the REST API:

    <CodeGroup>
      ```python Python theme={"system"}
      # my_crawl["tasks"] from step #2 contains list of task IDs from status response
      for task in my_crawl.tasks:
          if task.status == "completed":
              task_result = nimble.tasks.get(task_id)

              print(f"URL: {task_result['url']}")
              print(f"HTML length: {len(task_result['data'].get('html', ''))}")
      ```

      ```javascript Node theme={"system"}
      // myCrawl.tasks from step #2 contains list of task IDs from status response
      for (const task of myCrawl.tasks) {
        if (task.status === "completed") {
          const taskResponse =  await nimble.tasks.get(taskId);

          console.log(`URL: ${taskResult.url}`);
          console.log(`HTML length: ${taskResult.data?.html?.length || 0}`);
        }
      }
      ```

      ```bash cURL theme={"system"}
      # Get results for each task_id from the crawl status response
      curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}/results' \
      --header 'Authorization: Bearer YOUR-API-KEY'
      ```
    </CodeGroup>

    <Accordion title="Example Task Results Response">
      ```json theme={"system"}
      {
          "url": "https://www.nimbleway.com/blog/post",
          "task_id": "ec89b1f7-1cf2-40eb-91b4-78716093f9ed",
          "status": "success",
          "task": {
              "id": "ec89b1f7-1cf2-40eb-91b4-78716093f9ed",
              "state": "success",
              "created_at": "2026-02-09T23:15:43.549Z",
              "modified_at": "2026-02-09T23:16:39.094Z",
              "account_name": "your-account"
          },
          "data": {
              "html": "<!DOCTYPE html>...",
              "markdown": "# Page Title\n\nContent...",
              "headers": { ... }
          },
          "metadata": {
              "query_time": "2026-02-09T23:15:43.549Z",
              "query_duration": 1877,
              "response_parameters": {
                  "input_url": "https://www.nimbleway.com/blog/post"
              },
      		"driver": "vx6"
          },
          "status_code": 200
      }
      ```
    </Accordion>
  </Step>

  <Step title="Cancel crawl" titleSize="h3">
    Stop a running crawl using the REST API. Completed tasks remain available for result retrieval:

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      response = nimble.crawl.terminate(crawl_id)

      print(response)  # {"status": "canceled"}
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const response = await nimble.crawl.terminate(crawlId);

      console.log(await response);  // { status: "canceled" }
      ```

      ```bash cURL theme={"system"}
      curl -X DELETE 'https://sdk.nimbleway.com/v1/crawl/e3ca2ff1-b82a-472b-b1a9-ef4d29cc549f' \
      --header 'Authorization: Bearer <YOUR-API-KEY>'
      ```
    </CodeGroup>
  </Step>
</Steps>

## Response Fields

When you use **Crawl**, you receive:

* **Async operation** - Crawl jobs run in the background, check status or receive webhooks
* **Progress tracking** - Monitor `total`, `pending`, `completed`, and `failed` counts
* **Task-based results** - Each page becomes a task with extractable content
* **Webhook support** - Get notified in real-time as pages are processed

### Create Crawl Response

Returns immediate response with crawl job details

<Accordion title="Example Response">
  ```json theme={"system"}
  {
      "crawl_id": "e3ca2ff1-b82a-472b-b1a9-ef4d29cc549f",
      "name": null,
      "url": "https://www.nimbleway.com",
      "status": "queued",
      "account_name": "your-account",
      "created_at": "2026-02-09T23:15:40.785Z",
      "updated_at": "2026-02-09T23:15:40.785Z",
      "completed_at": null,
      "crawl_options": {
          "sitemap": "include",
          "crawl_entire_domain": false,
          "limit": 10,
          "max_discovery_depth": 5,
          "ignore_query_parameters": false,
          "allow_external_links": false,
          "allow_subdomains": false
      },
      "extract_options": null
  }
  ```
</Accordion>

| Field             | Type   | Description                                            |
| ----------------- | ------ | ------------------------------------------------------ |
| `crawl_id`        | string | Unique identifier for the crawl job                    |
| `name`            | string | Optional name you assigned to the crawl                |
| `url`             | string | Starting URL for the crawl                             |
| `status`          | string | `queued`, `running`, `succeeded`, `failed`, `canceled` |
| `account_name`    | string | Your account identifier                                |
| `created_at`      | string | Timestamp when crawl was created                       |
| `updated_at`      | string | Timestamp of last status update                        |
| `completed_at`    | string | Timestamp when crawl completed (null if in progress)   |
| `crawl_options`   | object | Configuration settings applied to this crawl           |
| `extract_options` | object | Extraction settings (null if not configured)           |

### Get Crawl Status by ID Response

Returns the crawl object wrapped in a `crawl` key, with progress counters and task list:

<Accordion title="Example Response">
  ```json theme={"system"}
  {
      "crawl": {
          "crawl_id": "e3ca2ff1-b82a-472b-b1a9-ef4d29cc549f",
          "name": null,
          "url": "https://www.nimbleway.com",
          "status": "succeeded",
          "account_name": "your-account",
          "total": 10,
          "pending": 0,
          "completed": 10,
          "failed": 0,
          "created_at": "2026-02-09T23:15:40.785Z",
          "updated_at": "2026-02-09T23:17:08.083Z",
          "completed_at": "2026-02-09T23:17:08.079Z",
          "crawl_options": {
              "sitemap": "include",
              "crawl_entire_domain": false,
              "limit": 10,
              "max_discovery_depth": 5
          },
          "extract_options": null,
          "tasks": [
              {
                  "task_id": "ec89b1f7-1cf2-40eb-91b4-78716093f9ed",
                  "status": "completed",
                  "updated_at": "2026-02-09T23:16:39.094Z",
                  "created_at": "2026-02-09T23:15:43.549Z"
              },
              {
                  "task_id": "3f6c136c-4bb5-44af-a21b-c8f1db708c2f",
                  "status": "completed",
                  "updated_at": "2026-02-09T23:16:45.033Z",
                  "created_at": "2026-02-09T23:15:42.966Z"
              }
          ]
      }
  }
  ```
</Accordion>

| Field                   | Type    | Description                                      |
| ----------------------- | ------- | ------------------------------------------------ |
| `crawl.crawl_id`        | string  | Unique identifier for the crawl job              |
| `crawl.status`          | string  | Current crawl status                             |
| `crawl.total`           | integer | Total URLs discovered                            |
| `crawl.pending`         | integer | URLs waiting to be processed                     |
| `crawl.completed`       | integer | Successfully processed URLs                      |
| `crawl.failed`          | integer | Failed URL extractions                           |
| `crawl.tasks`           | array   | List of individual page tasks                    |
| `crawl.tasks[].task_id` | string  | Task ID to use with `GET /v1/tasks/{id}/results` |
| `crawl.tasks[].status`  | string  | `pending`, `processing`, `completed`, `failed`   |

## SDK and API methods

| Method                            | Availability | Description                      |
| :-------------------------------- | :----------- | :------------------------------- |
| `nimble.crawl.run(url=..., ...)`  | Python SDK   | Create a new crawl job           |
| `GET /v1/crawl`                   | REST API     | List all crawls with pagination  |
| `GET /v1/crawl/{crawl_id}`        | REST API     | Get crawl status and task list   |
| `DELETE /v1/crawl/{crawl_id}`     | REST API     | Stop a running crawl             |
| `GET /v1/tasks/{task_id}/results` | REST API     | Get extracted content for a page |

<Note>
  The Python SDK currently supports creating crawl jobs via
  `nimble.crawl.run()`. For crawl management operations (listing, status,
  cancellation) and retrieving task results, use the REST API directly as shown
  in the examples above.
</Note>

## Use cases

<CardGroup cols={2}>
  <Card icon="database" title="Full Site Data Collection">
    Extract data from hundreds or thousands of pages across an entire website
  </Card>

  <Card icon="store" title="Product Catalog Scraping">
    Gather all product information from e-commerce sites automatically
  </Card>

  <Card icon="box-archive" title="Content Archiving">
    Create complete snapshots of websites for analysis or backup
  </Card>

  <Card icon="dollar-sign" title="Price Monitoring">
    Track pricing across entire catalogs over time
  </Card>
</CardGroup>

### Real-world examples

<AccordionGroup>
  <Accordion icon="store" title="E-commerce product discovery">
    **Scenario:** You need to gather all product information from a competitor's online store.

    **How Crawl helps:**

    * Discovers all product pages through sitemaps and navigation
    * Extracts product details, prices, and descriptions from each page
    * Handles pagination and category structures automatically
    * Filters out cart, checkout, and account pages

    **Result:** Complete product catalog data without manual URL collection.
  </Accordion>

  <Accordion icon="newspaper" title="Blog content migration">
    **Scenario:** You're migrating a blog to a new platform and need all content.

    **How Crawl helps:**

    * Finds all blog posts through sitemap and internal links
    * Extracts post content, metadata, and images
    * Excludes tag pages, author archives, and pagination
    * Preserves URL structure for redirects

    **Result:** Complete content export ready for migration.
  </Accordion>

  <Accordion icon="book" title="Documentation site backup">
    **Scenario:** You want to create an offline backup of documentation.

    **How Crawl helps:**

    * Maps entire documentation structure
    * Extracts content from all pages
    * Maintains hierarchy and navigation structure
    * Captures code examples and technical content

    **Result:** Complete documentation archive for offline access.
  </Accordion>

  <Accordion icon="chart-line" title="Competitive price monitoring">
    **Scenario:** You need to track competitor pricing across their entire catalog.

    **How Crawl helps:**

    * Discovers all product pages automatically
    * Extracts pricing information from each page
    * Runs on schedule to track changes over time
    * Handles dynamic pricing and regional variations

    **Result:** Comprehensive price intelligence data.
  </Accordion>

  <Accordion icon="magnifying-glass-chart" title="SEO site audit">
    **Scenario:** You're auditing a website's content for SEO optimization.

    **How Crawl helps:**

    * Discovers all indexable pages
    * Extracts titles, meta descriptions, and headings
    * Identifies orphaned pages and broken links
    * Maps internal linking structure

    **Result:** Complete SEO audit data for analysis.
  </Accordion>
</AccordionGroup>

## Crawl vs Map

| Need                              | Use                            |
| --------------------------------- | ------------------------------ |
| Extract content from pages        | **Crawl**                      |
| Deep link following               | **Crawl**                      |
| Complex filtering patterns        | **Crawl**                      |
| Webhook notifications             | **Crawl**                      |
| Quick URL discovery only          | **Map** - completes in seconds |
| URL list with titles/descriptions | **Map**                        |

<Tip>
  **Try Use Map first** - Discover URLs quickly with Map, then use Crawl to
  extract content from the pages you need.
</Tip>

## Next steps

<CardGroup cols={2}>
  <Card icon="code" href="/api-reference/crawl/create-crawl" title="API Reference">
    Explore endpoints, request parameters, and response schemas for the Crawl
    API
  </Card>
</CardGroup>
