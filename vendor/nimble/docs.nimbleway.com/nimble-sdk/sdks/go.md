> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Go

> Official Nimble SDK for Go — type-safe client for web extraction, search, crawl, map, and agents

Install the Nimble Go library to interact with the Nimble API from your Go applications. Built with idiomatic Go patterns, full context support, and automatic retries.

## Installation

```sh theme={"system"}
go get github.com/Nimbleway/nimble-go@latest'
```

<Check>
  Requires **Go 1.22+**. Set your API key via the `NIMBLE_API_KEY` environment
  variable or pass it directly using `option.WithAPIKey()`.
</Check>

## Setup

Import the package and initialize the client:

```go Go theme={"system"}
package main

import (
    "context"
    "fmt"
    "os"

    nimble "github.com/Nimbleway/nimble-go"
    "github.com/Nimbleway/nimble-go/option"
)

func main() {
    client := nimble.NewClient(
        option.WithAPIKey(os.Getenv("NIMBLE_API_KEY")),
    )

    _ = client
    fmt.Println("Client ready")
}
```

## Quick Start

Extract content from a URL:

```go Go theme={"system"}
package main

import (
    "context"
    "fmt"
    "os"

    nimble "github.com/Nimbleway/nimble-go"
    "github.com/Nimbleway/nimble-go/option"
)

func main() {
    client := nimble.NewClient(
        option.WithAPIKey(os.Getenv("NIMBLE_API_KEY")),
    )

    result, err := client.Extract(context.TODO(), nimble.ExtractParams{
        URL: "https://www.example.com",
    })
    if err != nil {
        panic(err)
    }

    fmt.Printf("Task ID: %s\n", result.TaskID)
}
```

## Core Methods

### Extract

Get clean HTML, markdown, or structured data from any URL:

```go Go theme={"system"}
result, err := client.Extract(context.TODO(), nimble.ExtractParams{
    URL:    "https://www.example.com",
    Render: nimble.Bool(true),
})
if err != nil {
    panic(err)
}
fmt.Println(result.TaskID)
```

<Tip>
  Optional fields are wrapped in `param.Opt[T]`. Use the provided constructors —
  `nimble.Bool()`, `nimble.String()`, `nimble.Int()` — to set them.
</Tip>

### Search

Perform real-time web searches:

```go Go theme={"system"}
result, err := client.Search(context.TODO(), nimble.SearchParams{
    Query:   "best web scraping tools",
    Country: nimble.String("US"),
})
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Map

Discover all URLs within a domain or sitemap:

```go Go theme={"system"}
result, err := client.Map(context.TODO(), nimble.MapParams{
    URL:     "https://www.example.com",
    Sitemap: nimble.String("only"),
})
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Crawl

Recursively crawl and extract an entire website:

```go Go theme={"system"}
result, err := client.Crawl.Run(context.TODO(), nimble.CrawlRunParams{
    URL:   "https://www.example.com",
    Limit: nimble.Int(100),
})
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Agents

Run pre-built agents for structured data from popular platforms:

```go Go theme={"system"}
result, err := client.Agent.Run(context.TODO(), nimble.AgentRunParams{
    Agent: "amazon_pdp",
    Params: map[string]interface{}{
        "asin": "B08N5WRWNW",
    },
})
if err != nil {
    panic(err)
}
fmt.Println(result)
```

<Tip>
  Browse the full agent catalog in the [Agent
  Gallery](/nimble-sdk/agentic/agent-gallery).
</Tip>

## Error Handling

Check `err != nil` for any failed request. Use `errors.As` to inspect typed API errors:

```go Go theme={"system"}
import (
    "errors"
    "fmt"

    nimble "github.com/Nimbleway/nimble-go"
)

result, err := client.Extract(context.TODO(), nimble.ExtractParams{
    URL: "https://www.example.com",
})
if err != nil {
    var apiErr *nimble.Error
    if errors.As(err, &apiErr) {
        fmt.Printf("API error — status: %d, message: %s\n",
            apiErr.StatusCode, apiErr.Message)
    }
    panic(err)
}
```

The `*nimble.Error` type exposes:

* `StatusCode int` — HTTP status code
* `Message string` — Human-readable error description

## Configuration

### Retries

The SDK retries automatically on connection errors, timeouts, and server failures (2 retries by default):

```go Go theme={"system"}
// Configure globally
client := nimble.NewClient(
    option.WithAPIKey(os.Getenv("NIMBLE_API_KEY")),
    option.WithMaxRetries(3),
)

// Disable retries for a specific request
result, err := client.Extract(context.TODO(), nimble.ExtractParams{
    URL: "https://www.example.com",
}, option.WithMaxRetries(0))
```

### Timeouts

Use Go's standard `context` package for request timeouts:

```go Go theme={"system"}
import (
    "context"
    "time"
)

ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()

result, err := client.Extract(ctx, nimble.ExtractParams{
    URL: "https://www.example.com",
})
```

Or set a per-request timeout directly:

```go Go theme={"system"}
result, err := client.Extract(context.TODO(), nimble.ExtractParams{
    URL: "https://www.example.com",
}, option.WithRequestTimeout(30*time.Second))
```

## Advanced

### Raw Response Access

Capture the raw HTTP response alongside the parsed result:

```go Go theme={"system"}
import "net/http"

var rawResponse *http.Response

result, err := client.Extract(context.TODO(), nimble.ExtractParams{
    URL: "https://www.example.com",
}, option.WithResponseInto(&rawResponse))
if err != nil {
    panic(err)
}

fmt.Println(rawResponse.Header.Get("x-request-id"))
fmt.Println(result.TaskID)
```

### Custom Request Options

Attach additional headers or query parameters to any request:

```go Go theme={"system"}
result, err := client.Extract(context.TODO(), nimble.ExtractParams{
    URL: "https://www.example.com",
},
    option.WithHeader("X-Custom-Header", "value"),
    option.WithQueryParam("debug", "true"),
)
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
