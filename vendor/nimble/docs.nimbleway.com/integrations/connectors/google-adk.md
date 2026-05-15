> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Google ADK

> Connect Google ADK agents to the Nimble web data platform via the MCP server.

Give Google ADK agents real-time web data by connecting to the Nimble MCP server — no extra SDK wiring needed.

[Google ADK (Agent Development Kit)](https://google.github.io/adk-docs/) uses the [Model Context Protocol](https://modelcontextprotocol.io/) to connect agents to external tools. Since Nimble provides a hosted MCP server, ADK agents can discover and use all Nimble tools automatically.

## Prerequisites

```bash theme={"system"}
pip install google-adk
```

Set environment variables:

```bash theme={"system"}
export GOOGLE_API_KEY="your-google-api-key"
export NIMBLE_API_KEY="your-nimble-api-key"
```

Get a Nimble API key from the [dashboard](https://online.nimbleway.com/account-settings/api-keys) (free trial available).

## Quick Start

Connect an ADK agent to the Nimble MCP server using `McpToolset` with `StreamableHTTPConnectionParams`. ADK auto-discovers all available Nimble tools — search, extract, crawl, map, and agents.

```python Python theme={"system"}
import os
from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams

NIMBLE_API_KEY = os.environ["NIMBLE_API_KEY"]

root_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="web_research_agent",
    instruction=(
        "You are a research assistant with access to real-time web data. "
        "Use the available tools to search the web, extract content from URLs, "
        "crawl sites, and discover URLs."
    ),
    tools=[
        McpToolset(
            connection_params=StreamableHTTPConnectionParams(
                url="https://mcp.nimbleway.com/mcp",
                headers={"Authorization": f"Bearer {NIMBLE_API_KEY}"}
            )
        )
    ],
)
```

### Run the Agent

```python Python theme={"system"}
import asyncio
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService

async def main():
    session_service = InMemorySessionService()
    session = await session_service.create_session(
        app_name="nimble_app", user_id="user"
    )

    runner = Runner(
        agent=root_agent,
        app_name="nimble_app",
        session_service=session_service,
    )

    from google.genai import types

    response = await runner.run_async(
        user_id="user",
        session_id=session.id,
        new_message=types.Content(
            role="user",
            parts=[types.Part(text="What are the latest trends in AI agents?")]
        ),
    )

    for event in response:
        if event.content and event.content.parts:
            for part in event.content.parts:
                if part.text:
                    print(part.text)

asyncio.run(main())
```

## Filter Tools

By default, ADK discovers all Nimble MCP tools. Use `tool_filter` to expose only the tools the agent needs:

```python Python theme={"system"}
McpToolset(
    connection_params=StreamableHTTPConnectionParams(
        url="https://mcp.nimbleway.com/mcp",
        headers={"Authorization": f"Bearer {NIMBLE_API_KEY}"}
    ),
    tool_filter=["search", "extract"]
)
```

## Available Tools

ADK auto-discovers these tools from the Nimble MCP server:

| Tool      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `search`  | Web search with configurable depth and focus modes             |
| `extract` | Extract content from any URL with rendering support            |
| `map`     | Discover all URLs on a website via sitemaps and link crawling  |
| `crawl`   | Crawl multiple pages with path filtering and progress tracking |
| `agents`  | Run pre-built extraction agents for structured data            |

<Tip>
  See the [Nimble MCP Server](/integrations/mcp-server/mcp-server) docs for setup details and the full list of 18 available tools.
</Tip>

## Next Steps

<CardGroup cols={2}>
  <Card title="Nimble MCP Server" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP server setup for Cursor, Claude Desktop, and other clients
  </Card>

  <Card title="Search" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Web search with depth levels, filtering, and AI answers
  </Card>

  <Card title="OpenAI" icon="bolt" href="/integrations/connectors/openai">
    Use Nimble with OpenAI function calling and the Agents SDK
  </Card>

  <Card title="Anthropic" icon="microchip" href="/integrations/connectors/anthropic">
    Use Nimble with Claude's tool-use API and Tool Runner
  </Card>
</CardGroup>
