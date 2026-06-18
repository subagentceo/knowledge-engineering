---
title: Cloudflare Community MCP Server
description: Learn how to use the Cloudflare Community MCP server to search topics, read posts, and filter content.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Community MCP Server

The MCP server for the [Cloudflare Community forum ↗](https://community.cloudflare.com) lets AI agents search topics, read posts, look up users, and filter content.

The server is powered by [@discourse/mcp ↗](https://www.npmjs.com/package/@discourse/mcp), the official Discourse MCP server.

## Install

Terminal window

```

npx @discourse/mcp@latest


```

## Configure

### OpenCode

Add to `~/.config/opencode/opencode.jsonc` inside the `"mcp"` block:

```

"discourse": {

  "type": "local",

  "command": ["npx", "-y", "@discourse/mcp@latest"],

  "enabled": true

}


```

### Claude Desktop

Add to `claude_desktop_config.json`:

```

{

  "mcpServers": {

    "discourse": {

      "command": "npx",

      "args": ["-y", "@discourse/mcp@latest"]

    }

  }

}


```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```

{

  "mcpServers": {

    "discourse": {

      "command": "npx",

      "args": ["-y", "@discourse/mcp@latest"]

    }

  }

}


```

## Connect to the Cloudflare Community

After configuring your client, use the `discourse_select_site` tool with:

```

https://community.cloudflare.com


```

No API key is needed for reading public data. An API key is only required for write operations (posting, moderation).

## Available tools

| Tool                         | Description                              |
| ---------------------------- | ---------------------------------------- |
| discourse\_select\_site      | Connect to community.cloudflare.com      |
| discourse\_search            | Full-text search across topics and posts |
| discourse\_filter\_topics    | Filter by category, tags, status, dates  |
| discourse\_read\_topic       | Read a topic's posts and metadata        |
| discourse\_read\_post        | Read a specific post                     |
| discourse\_get\_user         | Look up a user's profile                 |
| discourse\_list\_user\_posts | List posts by a user                     |

## Example usage

Once connected, you can ask your AI assistant things like:

* "Search the Cloudflare community for topics about Error 522"
* "Find unanswered topics in the SSL category from the last 3 days"
* "Read topic 42325 and summarize the issue"
* "Show me recent replies from user sandro"

## Machine-readable discovery

AI agents can automatically discover the MCP server through these endpoints on community.cloudflare.com:

* [/.well-known/mcp.json ↗](https://community.cloudflare.com/.well-known/mcp.json) — MCP Server Card
* [/llms.txt ↗](https://community.cloudflare.com/llms.txt) — LLMs.txt with server info and install instructions
* [/.well-known/agent.json ↗](https://community.cloudflare.com/.well-known/agent.json) — A2A Agent Card

## Related resources

* [Setup guide with detailed configuration instructions ↗](https://community.cloudflare.com/mcp)
* [The official npm: @discourse/mcp package ↗](https://www.npmjs.com/package/@discourse/mcp)
* [Model Context Protocol specification ↗](https://modelcontextprotocol.io)
* [Building AI agents on Cloudflare](https://developers.cloudflare.com/agents/)
* [Cloudflare Community forum ↗](https://community.cloudflare.com)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/community-mcp-server/#page","headline":"Cloudflare Community MCP Server · Cloudflare Agents docs","description":"Learn how to use the Cloudflare Community MCP server to search topics, read posts, and filter content.","url":"https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/community-mcp-server/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/cloudflare/","name":"Cloudflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/cloudflare/servers-for-cloudflare/","name":"Cloudflare's own MCP servers"}},{"@type":"ListItem","position":6,"item":{"@id":"/agents/model-context-protocol/cloudflare/servers-for-cloudflare/community-mcp-server/","name":"Cloudflare Community MCP Server"}}]}
```
