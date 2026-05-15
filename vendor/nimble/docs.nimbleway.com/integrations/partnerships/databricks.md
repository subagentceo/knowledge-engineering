> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Databricks

> Install Nimble MCP Server from the Databricks Marketplace and use it in agents, AI Playground, and notebooks

Nimble MCP Server is available on the [Databricks Marketplace](https://marketplace.databricks.com/details/1fe5e521-e9ef-49d8-97c4-b8c0a448ce15/Nimble_Nimble-MCP-Agentic-Web-Search-Platform) as a one-click install. It creates a secure Unity Catalog connection that gives any Databricks agent access to Nimble's full web data platform — search, extract, map, crawl, and structured data extraction.

<Frame caption="Nimble MCP Server on the Databricks Marketplace">
  <img src="https://mintcdn.com/nimble-f5a8283f/kb8ZqPqVvfxEfmy7/images/partnerships/databricks-marketplace.png?fit=max&auto=format&n=kb8ZqPqVvfxEfmy7&q=85&s=c26a9870f1051ce27b28c6665c4792c1" alt="Nimble MCP: Agentic Web Search Platform listing on the Databricks Marketplace" width="2000" height="1172" data-path="images/partnerships/databricks-marketplace.png" />
</Frame>

## Prerequisites

* A Databricks workspace with the **Managed MCP Servers** preview enabled ([manage previews](https://docs.databricks.com/aws/en/admin/workspace-settings/manage-previews))
* `CREATE CONNECTION` privilege on the Unity Catalog metastore
* A Nimble API key — [sign up](https://online.nimbleway.com/signup) and generate one from [Account Settings > API Keys](/nimble-sdk/admin/account-management#api-keys)

## Install from Databricks Marketplace

<Steps>
  <Step title="Find Nimble MCP Server">
    In your Databricks workspace, go to **Marketplace** and search for **Nimble**.
  </Step>

  <Step title="Install and configure the connection">
    Click **Install**. In the installation dialog, configure:

    | Field               | Value                                                                       |
    | ------------------- | --------------------------------------------------------------------------- |
    | **Connection name** | A name for the Unity Catalog connection (default: `nimble-mcp-marketplace`) |
    | **Host**            | Pre-populated                                                               |
    | **Base path**       | Pre-populated                                                               |
    | **Bearer token**    | Your Nimble API key                                                         |

    <Frame caption="Databricks Marketplace install dialog">
      <img src="https://mintcdn.com/nimble-f5a8283f/kb8ZqPqVvfxEfmy7/images/partnerships/databricks-install-dialog.png?fit=max&auto=format&n=kb8ZqPqVvfxEfmy7&q=85&s=0be31166e0bfbe9ccfc5f785e77521ce" alt="Install dialog for Nimble MCP Server showing connection name, host, base path, and bearer token fields" width="1288" height="1512" data-path="images/partnerships/databricks-install-dialog.png" />
    </Frame>
  </Step>

  <Step title="Verify the installation">
    Go to **Agents > MCP Servers** tab and confirm `nimble-mcp-marketplace` appears with status **Active**.
  </Step>
</Steps>

## Share the Connection

Grant access so team members can use the Nimble MCP server:

1. Go to **Catalog > Connections** and click the Nimble connection.
2. Open the **Permissions** tab and grant **USE CONNECTION** to the principals that need access.

## Test in Databricks

### AI Playground

<Steps>
  <Step title="Open AI Playground">
    Choose a model with the **Tools enabled** label.
  </Step>

  <Step title="Add Nimble MCP tools">
    Click **Tools > + Add tool > MCP Servers > External MCP servers** and select the `nimble-mcp-marketplace` connection.
  </Step>

  <Step title="Chat">
    Ask the model to search the web, extract a page, or map a site to verify the tools work.
  </Step>
</Steps>

### Databricks Assistant

1. Open **Databricks Assistant** and click the **Settings** icon.
2. Under **MCP Servers**, click **+ Add MCP Server > External MCP servers** and select the `nimble-mcp-marketplace` connection.

## Use in Agent Code

### Verify the connection

Use `DatabricksMCPClient` to list available tools through the Databricks-managed proxy.

```python theme={"system"}
import nest_asyncio
nest_asyncio.apply()  # Required in Databricks notebooks

from databricks.sdk import WorkspaceClient
from databricks_mcp import DatabricksMCPClient

w = WorkspaceClient()
host = w.config.host

NIMBLE_MCP_PROXY_URL = f"{host}/api/2.0/mcp/external/nimble-mcp-marketplace"

mcp_client = DatabricksMCPClient(
    server_url=NIMBLE_MCP_PROXY_URL,
    workspace_client=w
)
tools = mcp_client.list_tools()

print(f"Loaded {len(tools)} Nimble tools:")
for tool in tools:
    print(f"  - {tool.name}")
```

<Note>
  `DatabricksMCPClient.list_tools()` calls `asyncio.run()` internally. Databricks notebooks already have a running event loop, so `nest_asyncio.apply()` is required to avoid a `RuntimeError`.
</Note>

### Build a LangGraph agent

Connect a Databricks-hosted LLM to Nimble tools using `MultiServerMCPClient` and LangGraph.

```python theme={"system"}
import os
from langchain_core.utils.function_calling import convert_to_openai_tool
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from databricks_langchain import ChatDatabricks

# Generate a short-lived Databricks token
os.environ["DATABRICKS_HOST"] = w.config.host
os.environ["DATABRICKS_TOKEN"] = w.tokens.create(
    comment="nimble-mcp-demo", lifetime_seconds=1200
).token_value

llm = ChatDatabricks(endpoint="databricks-meta-llama-3-3-70b-instruct")

# Connect to Nimble MCP via the Databricks proxy
client = MultiServerMCPClient({
    "nimble": {
        "url": NIMBLE_MCP_PROXY_URL,
        "transport": "streamable_http",
        "headers": {
            "Authorization": f"Bearer {os.environ['DATABRICKS_TOKEN']}"
        }
    }
})

langchain_tools = await client.get_tools()
```

<Warning>
  Databricks model serving rejects tool schemas that contain `additionalProperties`. The `ChatDatabricks.bind_tools()` method adds this field via Pydantic serialization. Strip it before creating the agent:

  ```python theme={"system"}
  def _strip_additional_properties(obj):
      if isinstance(obj, dict):
          obj.pop("additionalProperties", None)
          for value in obj.values():
              _strip_additional_properties(value)
      elif isinstance(obj, list):
          for item in obj:
              _strip_additional_properties(item)

  clean_tool_defs = [convert_to_openai_tool(t) for t in langchain_tools]
  for td in clean_tool_defs:
      _strip_additional_properties(td)

  object.__setattr__(
      llm, 'bind_tools',
      lambda tools, **kw: llm.bind(tools=clean_tool_defs)
  )
  ```
</Warning>

Create the agent and run a query:

```python theme={"system"}
agent = create_react_agent(llm, langchain_tools)

response = await agent.ainvoke({
    "messages": [{"role": "user", "content": (
        "Search for the latest news about AI agents in enterprise workflows. "
        "Summarize the top 5 results with their sources."
    )}]
})

print(response["messages"][-1].content)
```

### Call tools directly

Skip the agent framework and call Nimble tools directly through the MCP client.

```python theme={"system"}
response = mcp_client.call_tool(
    "nimble_search",
    {"query": "latest AI research breakthroughs"}
)
print(response.content[0].text)
```

### Required packages

```bash theme={"system"}
pip install databricks-mcp langchain-mcp-adapters mcp databricks-langchain langgraph langchain nest_asyncio
```

## Sample Notebook

A complete walkthrough with four use cases (web search, page extraction, competitive pricing research, and site mapping) is available in the Nimble cookbook:

<Card title="Nimble MCP + Databricks Notebook" icon="book" href="https://github.com/Nimbleway/cookbook/blob/main/nimble-mcp-server/databricks-agent/nimble-mcp-databricks-marketplace.ipynb">
  End-to-end notebook: install packages, verify connection, build a LangGraph agent, and run queries
</Card>

## Resources

<CardGroup cols={2}>
  <Card title="Databricks Marketplace Listing" icon="store" href="https://marketplace.databricks.com/details/1fe5e521-e9ef-49d8-97c4-b8c0a448ce15/Nimble_Nimble-MCP-Agentic-Web-Search-Platform">
    Install Nimble MCP Server directly from the Marketplace
  </Card>

  <Card title="Nimble MCP Server Docs" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP Server setup for Claude, Cursor, and other clients
  </Card>

  <Card title="Databricks External MCP Docs" icon="book-open" href="https://docs.databricks.com/aws/en/generative-ai/mcp/external-mcp">
    Databricks documentation for external MCP server connections
  </Card>

  <Card title="Nimble Studio" icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder">
    Create Web Search Agents visually — no coding required
  </Card>
</CardGroup>
