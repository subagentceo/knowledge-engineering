> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Smithery

> Connect any AI agent to Nimble web tools via the Smithery MCP registry

Give AI agents real-time web data by connecting to Nimble through the [Smithery](https://smithery.ai) MCP registry — no manual server configuration needed.

Smithery is an MCP registry that hosts and manages MCP server connections. The `nimble/nimble-mcp` package exposes all Nimble tools — search, extract, crawl, map, and agents — to any MCP-compatible client.

## Prerequisites

```bash theme={"system"}
npm install -g @smithery/cli@latest
```

Set environment variables:

```bash theme={"system"}
export NIMBLE_API_KEY="your-nimble-api-key"
```

Get a Nimble API key from the [dashboard](https://online.nimbleway.com/account-settings/api-keys) (free trial available).

## Quick Start — CLI

Connect to the Nimble MCP server using the Smithery CLI in three steps.

<Steps>
  <Step title="Create a namespace">
    ```bash theme={"system"}
    smithery namespace create {your-namespace}
    ```
  </Step>

  <Step title="Add the Nimble MCP server">
    ```bash theme={"system"}
    smithery mcp add nimble/nimble-mcp --headers '{"NIMBLE_API_KEY":"Bearer your-NIMBLE_API_KEY"}'
    ```
  </Step>

  <Step title="Call tools">
    List available tools and call them directly from the CLI:

    ```bash theme={"system"}
    smithery tool list {connection}
    smithery tool call {connection} {tool_name} '{"key": "value"}'
    ```
  </Step>
</Steps>

## Programmatic Usage

Use the `@smithery/api` package to connect programmatically and call Nimble tools from any TypeScript application or AI framework.

### Install

<Tabs>
  <Tab title="AI SDK">
    ```bash theme={"system"}
    npm install @smithery/api @ai-sdk/mcp @ai-sdk/anthropic ai
    ```
  </Tab>

  <Tab title="TypeScript">
    ```bash theme={"system"}
    npm install @smithery/api @modelcontextprotocol/sdk
    ```
  </Tab>
</Tabs>

### Connect and Call Tools

<Tabs>
  <Tab title="AI SDK">
    ```typescript theme={"system"}
    import Smithery from "@smithery/api"
    import { createMCPClient } from "@ai-sdk/mcp"
    import { generateText } from "ai"
    import { anthropic } from "@ai-sdk/anthropic"
    import { createConnection } from "@smithery/api/mcp"

    const smithery = new Smithery()

    // Create a connection with server config
    const conn = await smithery.connections.create(
      "{your-namespace}",
      {
        mcpUrl: "https://nimble.run.tools",
        headers: {
          // Authorization Header: "Bearer {NIMBLE_API_KEY}" — required
          "NIMBLE_API_KEY": "Bearer your-NIMBLE_API_KEY"
        },
      }
    )

    // Connect using the returned connection ID
    const { transport } = await createConnection({
      client: smithery,
      namespace: "{your-namespace}",
      connectionId: conn.connectionId,
    })

    const mcpClient = await createMCPClient({ transport })
    const tools = await mcpClient.tools()

    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-20250514"),
      tools,
      prompt: "Use the available tools to help me.",
    })

    await mcpClient.close()
    ```
  </Tab>

  <Tab title="TypeScript">
    ```typescript theme={"system"}
    import Smithery from "@smithery/api"
    import { Client } from "@modelcontextprotocol/sdk/client/index.js"
    import { createConnection } from "@smithery/api/mcp"

    const smithery = new Smithery()

    // Create a connection with server config
    const conn = await smithery.connections.create(
      "{your-namespace}",
      {
        mcpUrl: "https://nimble.run.tools",
        headers: {
          // Authorization Header: "Bearer {NIMBLE_API_KEY}" — required
          "NIMBLE_API_KEY": "Bearer your-NIMBLE_API_KEY"
        },
      }
    )

    // Connect using the returned connection ID
    const { transport } = await createConnection({
      client: smithery,
      namespace: "{your-namespace}",
      connectionId: conn.connectionId,
    })

    const mcpClient = new Client(
      { name: "my-app", version: "1.0.0" },
      { capabilities: {} }
    )
    await mcpClient.connect(transport)

    const { tools } = await mcpClient.listTools()
    const result = await mcpClient.callTool({
      name: "tool_name",
      arguments: { key: "value" }
    })
    ```
  </Tab>
</Tabs>

## Available Tools

Smithery auto-discovers all tools from the Nimble MCP server:

| Tool      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `search`  | Web search with configurable depth and focus modes             |
| `extract` | Extract content from any URL with rendering support            |
| `map`     | Discover all URLs on a website via sitemaps and link crawling  |
| `crawl`   | Crawl multiple pages with path filtering and progress tracking |
| `agents`  | Run pre-built extraction agents for structured data            |

<Tip>
  See the [Nimble MCP Server](/integrations/mcp-server/mcp-server) docs for the
  full list of available tools and configuration options.
</Tip>

## Next Steps

<CardGroup cols={2}>
  <Card title="Nimble MCP Server" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP server setup for Cursor, Claude Desktop, and other clients
  </Card>

  <Card title="Search" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Web search with depth levels, filtering, and AI answers
  </Card>

  <Card title="Google ADK" icon="google" href="/integrations/connectors/google-adk">
    Use Nimble with Google ADK agents via MCP
  </Card>

  <Card title="OpenAI" icon="bolt" href="/integrations/connectors/openai">
    Use Nimble with OpenAI function calling and the Agents SDK
  </Card>
</CardGroup>
