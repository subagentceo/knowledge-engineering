# Twilio MCP server

> \[!IMPORTANT]
>
> Twilio MCP and Twilio Skills are available as Public Beta products, and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the products are declared as Generally Available. Public Beta products are not covered by the Twilio Support Terms or Twilio Service Level Agreement.

The Twilio [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server gives AI coding agents direct, structured access to Twilio's full API surface—over 1,800 endpoints across 30+ products—without leaving your IDE.

Instead of searching docs, copying endpoints, and context-switching between browser tabs, your coding agent queries Twilio's APIs and retrieves exact parameter schemas on demand. This is especially valuable for recent products like Conversation Memory, Conversation Orchestrator, Twilio Agent Connect, and Conversational Intelligence, where LLM training data may not yet have adequate coverage.

## How it works

The MCP server exposes two tools that work together in a **search-then-retrieve** workflow:

| Tool               | What it does                                                                                           |
| :----------------- | :----------------------------------------------------------------------------------------------------- |
| `twilio__search`   | Takes a natural-language query, returns ranked API operations, documentation articles, and IDs         |
| `twilio__retrieve` | Takes one or more API IDs from search results, and returns full parameter schemas and response schemas |

This two-step design intentionally keeps context usage efficient by only fetching full detail for the operations your agent actually needs.

## What's indexed

The MCP server indexes the following content:

* All publicly available Twilio OpenAPI spec including newest product APIs including Conversation Memory, Conversation Orchestrator, Conversational Intelligence, and Twilio Agent Connect
* Twilio Docs and Support articles
* SendGrid Docs and Support articles
* Segment Docs

## Features

* **No authentication required**: The MCP server indexes public API specifications only. No Twilio account or API keys needed.
* **No installation required**: The server is hosted by Twilio at `mcp.twilio.com/docs`—point your IDE at the URL.

## Connection options

| Option            | URL                           | Auth | Best for                      |
| :---------------- | :---------------------------- | :--- | :---------------------------- |
| Hosted MCP server | `https://mcp.twilio.com/docs` | None | All supported IDEs and agents |

## Limitations

* **Read-only**: The server provides API search and documentation retrieval. It does not execute API calls on your behalf.
* **Public specs only**: The server indexes [publicly available API specifications](https://github.com/twilio/twilio-oai). The server includes only APIs in public OpenAPI specs.
* **Model-dependent quality**: Search result quality and how well your agent uses the results depends on the AI model powering your coding agent.
* **Versioning**: When multiple API versions exist (for example, `v2010`, `v1`, `v2`), search returns the latest version by default. You can filter by specific versions using the `filter.version` parameter. For example, Programmable Messaging has both `v2010` (legacy) and `v1` (current) versions—search will return `v1` results unless you explicitly filter for `v2010`.

## What's next

Future releases will include:

* Execute-ready, OAuth-authenticated MCP tools that let agents call Twilio APIs directly
* [Twilio Skills](/docs/ai/skills): structured procedural knowledge packages that teach agents which APIs to use, in what order, and what pitfalls to avoid
* Expanded documentation coverage

## Setup

Connect your AI coding agent to the Twilio MCP server. No Twilio account or authentication is required.

### Prerequisites

* A supported AI coding agent installed
* Network access to `mcp.twilio.com/docs`

### Claude

#### Claude Connector

The Twilio MCP server is available as a [Claude Connector](https://claude.com/connectors/twilio). To install, search for "Twilio" in the connectors directory within Claude (web, desktop, or mobile app). The connector provides MCP server access across all Claude platforms.

#### Claude Code CLI

To add the Twilio MCP server to Claude Code via CLI:

```shell
claude mcp add --transport http twilio-docs https://mcp.twilio.com/docs
```

#### Manage your MCP servers

```shell
claude mcp list              # list all configured servers and their scope
claude mcp get twilio-docs   # show config for a specific server
claude mcp remove twilio-docs --scope user   # remove the server
```

### OpenCode CLI

To configure OpenCode CLI to use the Twilio MCP server, add the following to your `~/.config/opencode/opencode.json` file:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "twilio-docs": {
      "type": "remote",
      "url": "https://mcp.twilio.com/docs",
      "enabled": true,
      "oauth": false
    }
  }
}
```

For project-scoped configuration, add the same block to an `opencode.json` in your project root.

### Cursor

The Twilio MCP server is available in the [Cursor marketplace](https://cursor.com/marketplace/twilio). To install, open Composer (Command+I or Control+I) and run:

```text
/add-plugin twilio-developer-kit
```

Alternatively, manually add the following to your Cursor MCP configuration in **Cursor Settings > MCP Servers**:

```json
{
  "mcpServers": {
    "twilio-docs": {
      "url": "https://mcp.twilio.com/docs"
    }
  }
}
```

### Codex

To add the Twilio MCP server to Codex:

```shell
codex mcp add twilio-docs --url https://mcp.twilio.com/docs
```

### Figma Make

The Twilio MCP server is available as a [Figma Make Connector](https://help.figma.com/hc/en-us/articles/35440096186007-Use-verified-partner-MCP-connectors-in-Figma-Make). Search for "Twilio" in the Figma Make connector directory.

### Replit

The Twilio MCP server is available as a Replit MCP connector. See the [Replit MCP overview](https://docs.replit.com/references/mcp/overview) for setup instructions.

### Verify your connection

To verify your connection, complete the following steps:

1. Confirm the MCP server appears in your IDE's MCP configuration.
2. Ask your coding agent a Twilio question, for example, "How do I send an SMS with Twilio?"
3. Verify the response references specific Twilio API endpoints and invokes the `twilio__search` tool.

## Available products

The MCP server indexes APIs across all Twilio products, including:

Programmable Messaging, Programmable Voice, Verify, Twilio Conversations, Twilio Video, Flex, Twilio Serverless, Studio, Sync, TaskRouter, Elastic SIP Trunking, Content, Events, Monitor, Twilio Frontline, Lookup, Notify, Proxy, Super SIM, Wireless, Trust Hub, Marketplace, Conversation Intelligence, Conversation Memory, Conversation Orchestrator, Twilio Agent Connect (TAC)

## Feedback

We'd love your feedback on the MCP server. Report issues or suggestions by [sending an email to questions-mcp@twilio.com](mailto:questions-mcp@twilio.com).
