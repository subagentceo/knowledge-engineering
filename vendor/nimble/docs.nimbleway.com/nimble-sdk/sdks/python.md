> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Python

> Official Nimble Python SDK — sync and async client for web extraction, search, crawl, map, and agents

Install the Nimble Python library to interact with the Nimble API from your Python applications. Supports both synchronous and asynchronous usage with full type hints.

## Installation

<CodeGroup>
  ```bash pip theme={"system"}
  pip install nimble_python
  ```

  ```bash pip (async HTTP backend) theme={"system"}
  pip install "nimble_python[aiohttp]"
  ```
</CodeGroup>

<Check>
  Requires **Python 3.9+**. Never hardcode your API key — use environment
  variables instead.
</Check>

## Setup

Initialize the client with your API key. We recommend loading it from the environment:

```python Python theme={"system"}
import os
from nimble_python import Nimble

client = Nimble(api_key=os.environ.get("NIMBLE_API_KEY"))
```

## Quick Start

Extract clean content from a URL in one call:

```python Python theme={"system"}
import os
from nimble_python import Nimble

client = Nimble(api_key=os.environ.get("NIMBLE_API_KEY"))

result = client.extract(url="https://www.example.com", render=True)
print(result.task_id)
```

## Core Methods

### Extract

Get clean HTML, markdown, or structured data from any URL. Supports JavaScript rendering, stealth mode, browser actions, and more.

```python Python theme={"system"}
result = client.extract(
    url="https://www.example.com",
    render=True
)

print(result.task_id)
```

<Tip>
  See the [Extract docs](/nimble-sdk/web-tools/extract/quickstart) for the full
  parameter list — geo-targeting, output formats, parsing schemas, and more.
</Tip>

### Search

Perform real-time web searches and get structured results:

```python Python theme={"system"}
result = client.search(
    query="best web scraping tools",
    country="US"
)

print(result)
```

### Map

Discover all URLs within a domain or sitemap:

```python Python theme={"system"}
result = client.map(
    URL="https://www.example.com",
    sitemap="only"
)

print(result)
```

### Crawl

Recursively crawl and extract an entire website at scale:

```python Python theme={"system"}
result = client.crawl.run(
    url="https://www.example.com",
    limit=100
)

print(result)
```

### Agents

Run pre-built agents for structured data from popular platforms:

```python Python theme={"system"}
result = client.agent.run(
    agent="amazon_pdp",
    params={"asin": "B08N5WRWNW"}
)

print(result)
```

<Tip>
  Browse the full agent catalog in the [Agent
  Gallery](/nimble-sdk/agentic/agent-gallery).
</Tip>

## Async Client

Use `AsyncNimble` for non-blocking, concurrent operations:

```python Python theme={"system"}
import asyncio
import os
from nimble_python import AsyncNimble

client = AsyncNimble(api_key=os.environ.get("NIMBLE_API_KEY"))

async def main():
    result = await client.extract(url="https://www.example.com", render=True)
    print(result.task_id)

asyncio.run(main())
```

### aiohttp Backend

For high-concurrency workloads, use the `aiohttp` HTTP backend (requires `pip install "nimble_python[aiohttp]"`):

```python Python theme={"system"}
import asyncio
import os
from nimble_python import AsyncNimble, DefaultAioHttpClient

async def main():
    async with AsyncNimble(
        api_key=os.environ.get("NIMBLE_API_KEY"),
        http_client=DefaultAioHttpClient(),
    ) as client:
        result = await client.extract(url="https://www.example.com", render=True)
        print(result.task_id)

asyncio.run(main())
```

<Tip>
  Always use `async with` when working with `DefaultAioHttpClient` to ensure
  proper resource cleanup.
</Tip>

## Error Handling

The SDK maps API failures to typed exception classes:

```python Python theme={"system"}
import nimble_python
import os
from nimble_python import Nimble

client = Nimble(api_key=os.environ.get("NIMBLE_API_KEY"))

try:
    result = client.extract(url="https://www.example.com")
except nimble_python.APIConnectionError as e:
    print("Connection failed:", e)
except nimble_python.AuthenticationError as e:
    print("Invalid API key — check NIMBLE_API_KEY")
except nimble_python.RateLimitError as e:
    print("Rate limited — back off and retry:", e)
except nimble_python.APIStatusError as e:
    print(f"API error {e.status_code}:", e.message)
```

| Exception               | HTTP Status | When it occurs                   |
| ----------------------- | ----------- | -------------------------------- |
| `APIConnectionError`    | —           | Network failure or timeout       |
| `AuthenticationError`   | 401         | Invalid or missing API key       |
| `PermissionDeniedError` | 403         | Insufficient account permissions |
| `RateLimitError`        | 429         | Request rate exceeded            |
| `InternalServerError`   | 500+        | Server-side error                |

## Configuration

### Timeouts & Retries

The SDK retries automatically on connection errors and server failures. Defaults: **2 retries**, **3-minute timeout**.

```python Python theme={"system"}
import os
from nimble_python import Nimble

# Configure globally
client = Nimble(
    api_key=os.environ.get("NIMBLE_API_KEY"),
    max_retries=3,
    timeout=60.0,  # seconds
)

# Override per-request
result = client.with_options(max_retries=0).extract(
    url="https://www.example.com"
)
```

### Logging

Enable SDK-level debug logging via environment variable:

```bash theme={"system"}
export NIMBLE_LOG=debug
```

Or configure programmatically:

```python Python theme={"system"}
import logging

logging.basicConfig()
logging.getLogger("nimble_python").setLevel(logging.DEBUG)
```

## Advanced

### Raw Response Access

Access HTTP headers and response metadata alongside the parsed result:

```python Python theme={"system"}
response = client.with_raw_response.extract(url="https://www.example.com")
print(response.headers.get("x-request-id"))

result = response.parse()
print(result.task_id)
```

### Streaming Response

Stream large response bodies instead of buffering them in memory:

```python Python theme={"system"}
with client.with_streaming_response.extract(url="https://www.example.com") as response:
    for chunk in response.iter_bytes():
        process(chunk)
```

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
