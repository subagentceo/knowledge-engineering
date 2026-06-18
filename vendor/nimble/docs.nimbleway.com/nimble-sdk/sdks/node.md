> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Node

> Official Nimble SDK for Node.js and TypeScript — async client for web extraction, search, crawl, map, and agents

Install the Nimble JavaScript/TypeScript library to interact with the Nimble API from Node.js, Deno, Bun, Cloudflare Workers, and modern browsers. All methods are async and return typed responses.

## Installation

```bash theme={"system"}
npm install @nimble-way/sdk
```

<Check>
  Requires **Node.js 20 LTS+** (also supports Deno v1.28+, Bun 1.0+, and
  Cloudflare Workers). Never hardcode your API key — use environment variables.
</Check>

## Setup

Initialize the client with your API key:

```typescript TypeScript theme={"system"}
import Nimble from "@nimble-way/nimble-js";

const nimble = new Nimble({
  apiKey: process.env.NIMBLE_API_KEY,
});
```

## Quick Start

Extract content from a URL in one call:

```typescript TypeScript theme={"system"}
import Nimble from "@nimble-way/nimble-js";

const nimble = new Nimble({ apiKey: process.env.NIMBLE_API_KEY });

const result = await nimble.extract({
  url: "https://www.example.com",
  render: true,
});

console.log(result.task_id);
```

## TypeScript Types

The SDK ships full TypeScript definitions for all request parameters and responses, with IDE autocompletion:

```typescript TypeScript theme={"system"}
import Nimble from "@nimble-way/nimble-js";

const nimble = new Nimble({ apiKey: process.env.NIMBLE_API_KEY });

const params: Nimble.ExtractParams = {
  url: "https://www.example.com",
  render: true,
};

const result: Nimble.ExtractResponse = await nimble.extract(params);
console.log(result.task_id);
```

## Core Methods

### Extract

Get clean HTML, markdown, or structured data from any URL. Supports JavaScript rendering, stealth mode, browser actions, and more.

```typescript TypeScript theme={"system"}
const result = await nimble.extract({
  url: "https://www.example.com",
  render: true,
});

console.log(result.task_id);
```

<Tip>
  See the [Extract docs](/nimble-sdk/web-tools/extract/quickstart) for the full
  parameter list — geo-targeting, output formats, parsing schemas, and more.
</Tip>

### Search

Perform real-time web searches and get structured results:

```typescript TypeScript theme={"system"}
const result = await nimble.search({
  query: "best web scraping tools",
  country: "US",
});

console.log(result);
```

### Map

Discover all URLs within a domain or sitemap:

```typescript TypeScript theme={"system"}
const result = await nimble.map({
  URL: "https://www.example.com",
  sitemap: "only",
});

console.log(result);
```

### Crawl

Recursively crawl and extract an entire website at scale:

```typescript TypeScript theme={"system"}
const result = await nimble.crawl.run({
  url: "https://www.example.com",
  limit: 100,
});

console.log(result);
```

### Agents

Run pre-built agents for structured data from popular platforms:

```typescript TypeScript theme={"system"}
const result = await nimble.agent.run({
  agent: "amazon_pdp",
  params: {
    asin: "B08N5WRWNW",
  },
});

console.log(result);
```

<Tip>
  Browse the full agent catalog in the [Agent
  Gallery](/nimble-sdk/agentic/agent-gallery).
</Tip>

## Error Handling

The SDK throws typed `APIError` subclasses for failed requests:

```typescript TypeScript theme={"system"}
import Nimble, { APIError } from "nimble-js";

const nimble = new Nimble({ apiKey: process.env.NIMBLE_API_KEY });

try {
  const result = await nimble.extract({ url: "https://www.example.com" });
} catch (error) {
  if (error instanceof APIError) {
    console.log(`Status: ${error.status}`);
    console.log(`Message: ${error.message}`);
  }
  throw error;
}
```

| Error Class             | HTTP Status | When it occurs                   |
| ----------------------- | ----------- | -------------------------------- |
| `BadRequestError`       | 400         | Invalid request parameters       |
| `AuthenticationError`   | 401         | Invalid or missing API key       |
| `PermissionDeniedError` | 403         | Insufficient account permissions |
| `NotFoundError`         | 404         | Resource not found               |
| `RateLimitError`        | 429         | Request rate exceeded            |
| `InternalServerError`   | 500+        | Server-side error                |

## Configuration

### Timeouts & Retries

The SDK retries automatically on connection errors and server failures. Defaults: **2 retries**, **3-minute timeout**.

```typescript TypeScript theme={"system"}
// Configure globally
const nimble = new Nimble({
  apiKey: process.env.NIMBLE_API_KEY,
  maxRetries: 3,
  timeout: 60 * 1000, // 60 seconds in ms
});

// Override per-request
const result = await nimble.extract(
  { url: "https://www.example.com" },
  { maxRetries: 0 },
);
```

### Logging

Control log verbosity via environment variable:

```bash theme={"system"}
export NIMBLE_LOG=debug
```

Or configure programmatically using any compatible logger (pino, winston, consola, etc.):

```typescript TypeScript theme={"system"}
import Nimble from "@nimble-way/nimble-js";
import pino from "pino";

const nimble = new Nimble({
  apiKey: process.env.NIMBLE_API_KEY,
  logger: pino(),
  logLevel: "debug",
});
```

## Advanced

### Raw Response Access

Access HTTP headers and status alongside the parsed response:

```typescript TypeScript theme={"system"}
// Get just the raw Response object
const raw = await nimble
  .extract({ url: "https://www.example.com" })
  .asResponse();
console.log(raw.headers.get("x-request-id"));

// Get both parsed result and raw response
const { data, response } = await nimble
  .extract({ url: "https://www.example.com" })
  .withResponse();

console.log(response.headers.get("x-request-id"));
console.log(data.task_id);
```

### Custom Fetch / Proxy

Provide a custom fetch implementation or configure proxies for Node.js, Bun, and Deno:

```typescript TypeScript theme={"system"}
import Nimble from "@nimble-way/nimble-js";

const nimble = new Nimble({
  apiKey: process.env.NIMBLE_API_KEY,
  fetchOptions: {
    proxy: "http://proxy.example.com:8080",
  },
});
```

### MCP Server

The SDK includes a built-in [MCP Server](https://modelcontextprotocol.io) for AI assistant integrations, enabling API exploration and request testing directly from tools like Claude.

## Next Steps

<CardGroup cols={2}>
  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Full REST API documentation for all endpoints
  </Card>

  <Card title="Extract" icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart">
    Rendering, formats, stealth mode, and more
  </Card>

  <Card title="Search" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Real-time web search with structured results
  </Card>

  <Card title="Agents" icon="bullseye-pointer" href="/nimble-sdk/agentic/agents">
    Pre-built extraction agents for popular platforms
  </Card>
</CardGroup>
