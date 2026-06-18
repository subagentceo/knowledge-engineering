> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# MCP server

MCP (Model Context Protocol) lets you connect any compatible tool server to your receptionist. Your receptionist discovers available tools automatically and can call them during conversations.

## What is MCP?

MCP is an open protocol for connecting AI to external tools and data sources. If you have a service that exposes an MCP interface, the receptionist can use its tools during calls without custom integration code.

## Setting up an MCP connection

1. Go to **Integrations** → click **MCP Server**
2. Configure:

| Field                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| **Name**                  | Display name for this integration                      |
| **Description**           | What this MCP server provides                          |
| **Server URL**            | Your MCP server endpoint                               |
| **Transport**             | SSE (Server-Sent Events) or Streamable HTTP            |
| **Disable interruptions** | Prevent caller from interrupting during tool execution |

3. Reception AI connects and discovers available tools
4. Assign tools to your agents

## Transport types

| Transport           | When to use                                            |
| ------------------- | ------------------------------------------------------ |
| **SSE**             | Long-lived connections, real-time streaming responses  |
| **Streamable HTTP** | Standard request/response, stateless, easier to deploy |

## Managing tools

After connecting, Reception AI fetches the list of available tools from your server.

* **Refresh tools** — Re-fetch the tool list when you add new tools to your server
* **Assign tools** — Choose which tools are available to which agent

## Tool assignments

Each discovered tool can be assigned to:

* **Customer-facing receptionist** — Available during phone calls
* **Business assistant** — Available in the dashboard chat
* **Both** — Available everywhere

Unassigned tools are discovered but not used.

## Use cases

* **Custom booking logic** — Connect to your existing reservation system
* **Inventory lookup** — Let the receptionist check stock in real-time
* **CRM queries** — Pull customer data from your internal CRM during calls
* **Custom workflows** — Trigger any backend process based on conversation context
* **Multi-tool servers** — Expose multiple related capabilities from a single server

## Multiple MCP servers

You can connect multiple MCP servers, each providing different tools. All discovered tools appear in the same assignment interface.

MCP integration requires the **Plus** plan or higher. Your MCP server must be accessible from the
internet.