> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Installation

> Get started with Nimble by installing our SDK or CLI and setting up your environment

<Check>
  **Using the API directly?** If you prefer HTTP requests (cURL, fetch, axios,
  etc.) you can skip installation and go straight to the [API
  Reference](/api-reference/introduction).
</Check>

## Prerequisites

* A valid [Nimble API key](https://online.nimbleway.com/account-settings/api-keys)
* One of the following runtimes for your chosen SDK:
  * **Python**: 3.9+
  * **Node.js**: 20 LTS+
  * **Go**: 1.22+

## Python

<CodeGroup>
  ```bash httpx theme={"system"}
  pip install nimble_python
  ```

  ```bash aiohttp theme={"system"}
  pip install "nimble_python[aiohttp]"
  ```
</CodeGroup>

[View Python SDK docs →](/nimble-sdk/sdks/python)

## Node.js

```bash theme={"system"}
npm install @nimble-way/nimble-js
```

Works with Node.js 20+, Deno v1.28+, Bun 1.0+, and Cloudflare Workers.

[View Node SDK docs →](/nimble-sdk/sdks/node)

## Go

```bash theme={"system"}
go get github.com/Nimbleway/nimble-go@latest'
```

[View Go SDK docs →](/nimble-sdk/sdks/go)

## CLI

The Nimble CLI lets you interact with the API directly from your terminal (requires Go 1.22+):

```bash theme={"system"}
npm -g i @nimble-way/nimble-cli
```

Add the Go bin directory to your PATH if needed:

```bash theme={"system"}
export PATH="$PATH:$(go env GOPATH)/bin"
```

[View CLI docs →](/nimble-sdk/sdks/cli)

## Authentication

All SDKs and the CLI read your API key from the `NIMBLE_API_KEY` environment variable:

<CodeGroup>
  ```bash macOS / Linux theme={"system"}
  export NIMBLE_API_KEY="your-api-key"
  ```

  ```bash Windows (PowerShell) theme={"system"}
  $env:NIMBLE_API_KEY="your-api-key"
  ```
</CodeGroup>

You can also pass it directly when initializing the client (not recommended for production):

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  client = Nimble(api_key="your-api-key")
  ```

  ```typescript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "your-api-key" });
  ```

  ```go Go theme={"system"}
  import (
      nimble "github.com/Nimbleway/nimble-go"
      "github.com/Nimbleway/nimble-go/option"
  )

  client := nimble.NewClient(option.WithAPIKey("your-api-key"))
  ```
</CodeGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Quickstart Guide" icon="forward-step" href="/nimble-sdk/getting-started/quickstart">
    Make your first request in minutes
  </Card>

  <Card title="Python SDK" icon="python" href="/nimble-sdk/sdks/python">
    Sync and async Python client
  </Card>

  <Card title="Node SDK" icon="node-js" href="/nimble-sdk/sdks/node">
    TypeScript/JavaScript client
  </Card>

  <Card title="Go SDK" icon="golang" href="/nimble-sdk/sdks/go">
    Idiomatic Go client
  </Card>

  <Card title="CLI" icon="terminal" href="/nimble-sdk/sdks/cli">
    Use Nimble from your terminal
  </Card>

  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Full REST API documentation
  </Card>
</CardGroup>
