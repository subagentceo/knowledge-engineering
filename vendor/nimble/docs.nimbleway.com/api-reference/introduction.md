> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Get started with Nimble's API

Nimble API powers Web Search Agents that extract structured knowledge from any website through a simple REST API. Use pre-built agents for popular platforms, create custom agents for any site, search the web, map site structures, and crawl entire websites at scale.

## API Features

<CardGroup cols={3}>
  <Card icon="arrows-to-circle" href="/api-reference/extract/extract" title="Extract">
    Extract clean HTML and structured data from any URL with custom parsing and
    browser actions.
  </Card>

  <Card icon="bullseye-pointer" href="/api-reference/agents/agent-run" title="Agent">
    Run Web Search Agents for any website — pre-built for popular platforms, or
    create your own.
  </Card>

  <Card icon="magnifying-glass" href="/api-reference/search/search" title="Search">
    Search the web and retrieve full content from top results with optional AI
    summaries.
  </Card>

  <Card icon="sitemap" href="/api-reference/map/map" title="Map">
    Discover all URLs on a website with metadata for planning crawl strategies.
  </Card>

  <Card icon="spider" href="/api-reference/crawl/create-crawl" title="Crawl">
    Extract data from entire websites with async crawling across multiple pages.
  </Card>

  <Card icon="list-check" href="/api-reference/tasks/task-status" title="Tasks">
    Retrieve results from async operations (extract, search, map, crawl).
  </Card>
</CardGroup>

## Base URL

All API requests use the following base URL:

```bash theme={"system"}
https://sdk.nimbleway.com/v1
```

## Authentication

All requests require authentication using a Bearer token in the Authorization header:

```bash theme={"system"}
Authorization: Bearer YOUR_API_KEY
```

Get your API key from the [Nimble Dashboard](https://online.nimbleway.com/account-settings/api-keys).

### Example Request

```bash theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "url": "https://www.example.com",
    "render": true
  }'
```

## Response Codes

Nimble uses standard HTTP status codes to indicate the success or failure of requests.

| Status | Description                                              |
| ------ | -------------------------------------------------------- |
| 200    | Request successful.                                      |
| 400    | Bad request - check your parameters.                     |
| 401    | Unauthorized - invalid or missing API key.               |
| 402    | Payment required - insufficient budget or trial expired. |
| 422    | Validation error - invalid request parameters.           |
| 429    | Rate limit exceeded - slow down your requests.           |
| 500    | Internal server error - Nimble infrastructure issue.     |

## Rate Limits

Nimble enforces rate limits to ensure service stability and fair usage across all users.

### Default Rate Limits

| Driver Type          | Rate Limit         |
| -------------------- | ------------------ |
| `vx6`, `vx8`, `vx10` | 83 QPS (5,000 QPM) |

<Check>
  **QPS** = Queries Per Second, **QPM** = Queries Per Minute. Rate limits apply
  per API key.
</Check>

### Rate Limit Headers

Responses include headers showing your current rate limit status:

```bash theme={"system"}
X-RateLimit-Limit: 83
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1609459200
```

### Exceeding Rate Limits

When you exceed the rate limit, you'll receive a 429 status code with retry information:

```json theme={"system"}
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Current limit: 83 QPS",
    "retry_after": 2
  }
}
```

**Need higher limits?** Contact [sales@nimbleway.com](https://login.start-chat.com/modal/601e4da4-50a0-4dc7-8155-bb84f2952c40/27847549-dc04-4144-98a5-d40e568bf6af?magicLinkId=slFQ2j\&UID=65ab324c-ecde-4748-9f52-8e395054774b.1753267174019) for custom rate limits.

## Async Operations

Several endpoints support asynchronous processing for long-running operations:

* `/v1/extract/async` - Async data extraction
* `/v1/agent/async` - Async template extraction
* `/v1/search/async` - Async web search
* `/v1/map/async` - Async site mapping
* `/v1/crawl` - Crawl operations (async only)

### Working with Async Tasks

1. **Start an async operation** - Returns a task ID
2. **Check task status** - Use `/v1/tasks/{id}` to check progress
3. **Retrieve results** - Get results from `/v1/tasks/{id}/results` when complete

```bash theme={"system"}
# Start async extraction
curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{"url": "https://example.com"}'

# Returns: {"task_id": "8e8cfde8-345b-42b8-b3e2-0c61eb11e00f"}

# Check task status
curl 'https://sdk.nimbleway.com/v1/tasks/8e8cfde8-345b-42b8-b3e2-0c61eb11e00f' \
  --header 'Authorization: Bearer YOUR_API_KEY'

# Get results when complete
curl 'https://sdk.nimbleway.com/v1/tasks/8e8cfde8-345b-42b8-b3e2-0c61eb11e00f/results' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```

## Next Steps

<CardGroup cols={2}>
  <Card icon="rocket" href="nimble-sdk/getting-started/quickstart" title="Quickstart Guide">
    Make your first API request in minutes
  </Card>

  <Card icon="gauge" href="nimble-sdk/admin/rate-limits" title="Rate Limits">
    Understand rate limits and technical specifications
  </Card>
</CardGroup>
