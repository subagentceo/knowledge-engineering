> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Copilot Studio

> Manually configure the Nimble MCP server as a tool in a Microsoft Copilot Studio agent

Microsoft Copilot Studio agents can call Nimble's web data toolkit — search, extract, map, crawl, and Web Search Agents — through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). This page covers the manual setup: add the Nimble MCP server to an agent using the built-in MCP onboarding wizard.

## What you get

* **Nimble's web data toolkit** in any Copilot Studio agent — search, extract, map, crawl, and Web Search Agents
* **Dynamic tool discovery** — the agent picks up every Nimble MCP tool automatically; new tools appear without reconfiguration
* **OAuth 2.1 sign-in** — authenticate in the browser during setup; no API key to paste, manage, or rotate
* **Streamable HTTP transport** at `https://mcp.nimbleway.com/mcp`

## Prerequisites

* A **Microsoft Copilot Studio** environment with an agent you can edit ([licensing details](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions))
* A **Nimble account** — [sign up free](https://online.nimbleway.com/signup). Sign-in happens through OAuth during setup; no API key to paste.

<Note>
  MCP routes tool results through the agent's context window and can consume tokens
  quickly. For high-volume retrieval, consider the [Nimble API](/nimble-sdk/web-tools/search) directly.
</Note>

## Add Nimble MCP to your agent

The MCP onboarding wizard is the fastest way to connect an existing MCP server. It lives inside Copilot Studio — no trip to Power Apps required.

<Steps>
  <Step title="Open the Tools page and add a tool">
    In Copilot Studio, open your agent and go to the **Tools** page. Select **Add a tool**.

    <Frame caption="Add a tool to a Copilot Studio agent">
      <img src="https://mintcdn.com/nimble-f5a8283f/TTect1weOPKCiBpe/images/partnerships/copilot-studio-add-tool.png?fit=max&auto=format&n=TTect1weOPKCiBpe&q=85&s=64c30703f5579f2671c1eb9b63632aa1" alt="Copilot Studio agent Tools page with the Add a tool button" width="2000" height="1196" data-path="images/partnerships/copilot-studio-add-tool.png" />
    </Frame>
  </Step>

  <Step title="Choose Model Context Protocol">
    In the **Add tool** dialog, under **Create new**, select **Model Context Protocol**.

    <Frame caption="Select Model Context Protocol in the Add tool dialog">
      <img src="https://mintcdn.com/nimble-f5a8283f/TTect1weOPKCiBpe/images/partnerships/copilot-studio-select-mcp.png?fit=max&auto=format&n=TTect1weOPKCiBpe&q=85&s=e9ee653469f408d408d7e63797d993c6" alt="Copilot Studio Add tool dialog with the Model Context Protocol card highlighted" width="2000" height="1471" data-path="images/partnerships/copilot-studio-select-mcp.png" />
    </Frame>
  </Step>

  <Step title="Enter the Nimble server details and authentication">
    Fill in the server fields, then set authentication to **OAuth 2.0** with type **Dynamic discovery**. Nimble MCP supports OAuth 2.0 Dynamic Client Registration (DCR), so it advertises its endpoints automatically — there's nothing else to configure. Select **Create**.

    | Field                  | Value                                                                                                                                                                                  |
    | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **Server name**        | `Nimble MCP`                                                                                                                                                                           |
    | **Server description** | `Nimble turns the live internet into structured, reliable data for AI — search, extract, map, and crawl any website, plus purpose-built Web Search Agents for your use case at scale.` |
    | **Server URL**         | `https://mcp.nimbleway.com/mcp`                                                                                                                                                        |
    | **Authentication**     | `OAuth 2.0` → `Dynamic discovery`                                                                                                                                                      |

    The agent orchestrator uses the description to decide when to call Nimble — keep it clear and specific.

    <Frame caption="Nimble MCP server details with OAuth 2.0 Dynamic discovery selected">
      <img src="https://mintcdn.com/nimble-f5a8283f/TTect1weOPKCiBpe/images/partnerships/copilot-studio-server-details.png?fit=max&auto=format&n=TTect1weOPKCiBpe&q=85&s=c4d10291e7f91a4d4ef03dcc74860396" alt="Copilot Studio Add a Model Context Protocol server form with server name, description, server URL, and OAuth 2.0 Dynamic discovery authentication" width="2000" height="1474" data-path="images/partnerships/copilot-studio-server-details.png" />
    </Frame>
  </Step>

  <Step title="Create a connection">
    Copilot Studio creates the custom connector. On the **Add tool** dialog, open the **Connection** dropdown and select **Create new connection**.

    <Frame caption="Create a new connection for the Nimble MCP connector">
      <img src="https://mintcdn.com/nimble-f5a8283f/TTect1weOPKCiBpe/images/partnerships/copilot-studio-create-connection.png?fit=max&auto=format&n=TTect1weOPKCiBpe&q=85&s=bbd27369ed116e59ba97eedd84ba25ba" alt="Copilot Studio Add tool dialog showing the Nimble MCP connector created and the Create new connection option" width="2000" height="1467" data-path="images/partnerships/copilot-studio-create-connection.png" />
    </Frame>
  </Step>

  <Step title="Approve the OAuth consent">
    A browser window opens to authorize with your Nimble workspace. Review the requested permissions — verify identity, maintain access when offline, search and extract, and manage Web Search Agents — and select **Approve**. Copilot Studio stores the tokens and refreshes them automatically.

    <Frame caption="Approve the Nimble OAuth consent">
      <img src="https://mintcdn.com/nimble-f5a8283f/TTect1weOPKCiBpe/images/partnerships/copilot-studio-oauth-consent.png?fit=max&auto=format&n=TTect1weOPKCiBpe&q=85&s=1467fdb2b7c1d24a6d3fede62fbe667a" alt="Nimble OAuth consent screen requesting access with permissions to verify identity, maintain offline access, search and extract data, and manage web search agents" width="1480" height="1408" data-path="images/partnerships/copilot-studio-oauth-consent.png" />
    </Frame>
  </Step>

  <Step title="Add to the agent">
    Back on the **Add tool** dialog, select **Add and configure**. Copilot Studio discovers the Nimble tools and lists them under the agent's tools.
  </Step>
</Steps>

## Verify the connection

Open a test chat with your agent and send a prompt that forces a Nimble tool call:

```text theme={"system"}
Search the web for the latest Microsoft Build 2026 announcements,
then extract the full text of the top result as clean data.
```

The agent calls Nimble **Search**, then **Extract**, and returns results grounded in live web data. If the tools run and return content, the connection works end to end.

<Frame caption="The agent running nimble_search then nimble_extract in the Copilot Studio test pane">
  <img src="https://mintcdn.com/nimble-f5a8283f/TTect1weOPKCiBpe/images/partnerships/copilot-studio-test-agent.png?fit=max&auto=format&n=TTect1weOPKCiBpe&q=85&s=e5cc77b73f4fdf6455204930c985ea1b" alt="Copilot Studio test pane showing the agent invoking nimble_search and nimble_extract and returning live web results about Microsoft Build 2026" width="2000" height="1101" data-path="images/partnerships/copilot-studio-test-agent.png" />
</Frame>

<Tip>
  Expand the activity map in the test pane to confirm the agent invoked the Nimble tools (`nimble_search` and `nimble_extract`) rather than answering from its own knowledge.
</Tip>

## Resources

<CardGroup cols={2}>
  <Card title="Nimble MCP Server Docs" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP server setup for Cursor, Claude, and other clients
  </Card>

  <Card title="Azure MCP Center" icon="store" href="/integrations/partnerships/microsoft/azure-mcp-center">
    One-click Nimble MCP install for VS Code with GitHub Copilot
  </Card>

  <Card title="MCP in Copilot Studio" icon="microsoft" href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp">
    Microsoft's docs for extending agents with MCP servers
  </Card>

  <Card title="Nimble Web Tools" icon="toolbox" href="/nimble-sdk/web-tools/search">
    Reference for the Search, Extract, Map, and Crawl APIs behind the tools
  </Card>
</CardGroup>
