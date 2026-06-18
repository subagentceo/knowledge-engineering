---
title: MCP
description: Connect agents to external Model Context Protocol servers and use their tools in model calls.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MCP

Agents can use [Model Context Protocol (MCP)](https://developers.cloudflare.com/agents/model-context-protocol/) as clients. Connect an agent to external MCP servers, discover the tools those servers expose, and pass those tools into model calls.

Use MCP when you want an agent to:

* Call tools exposed by external MCP servers.
* Reuse tools across agents, IDEs, and other AI clients.
* Connect to services that already expose an MCP endpoint.
* Add OAuth or token-based authorization around external tool access.

To build an MCP server instead, refer to [Model Context Protocol (MCP)](https://developers.cloudflare.com/agents/model-context-protocol/).

## Basic pattern

Call `addMcpServer()` to connect to a remote MCP server, then pass `this.mcp.getAITools()` to the AI SDK.

* [  JavaScript ](#tab-panel-6511)
* [  TypeScript ](#tab-panel-6512)

JavaScript

```

import { Agent } from "agents";

import { generateText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class ToolAgent extends Agent {

  async onStart() {

    await this.addMcpServer("github", "https://mcp.github.com/mcp");

  }


  async onRequest(request) {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const response = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: "Use available tools to summarize the latest issue activity.",

      tools: this.mcp.getAITools(),

    });


    return new Response(response.text);

  }

}


```

TypeScript

```

import { Agent } from "agents";

import { generateText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class ToolAgent extends Agent<Env> {

  async onStart() {

    await this.addMcpServer("github", "https://mcp.github.com/mcp");

  }


  async onRequest(request: Request) {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const response = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: "Use available tools to summarize the latest issue activity.",

      tools: this.mcp.getAITools(),

    });


    return new Response(response.text);

  }

}


```

If the server requires OAuth, `addMcpServer()` returns an authentication state and authorization URL. The connection is persisted in the agent's [SQL storage](https://developers.cloudflare.com/agents/runtime/lifecycle/state/).

## Configuration

For public MCP servers, no binding configuration is required. Store server URLs, API tokens, or OAuth settings as environment variables or secrets.

For MCP servers that require bearer tokens or Cloudflare Access headers, pass custom transport headers when connecting.

* [  JavaScript ](#tab-panel-6509)
* [  TypeScript ](#tab-panel-6510)

JavaScript

```

await this.addMcpServer("internal", this.env.MCP_SERVER_URL, {

  transport: {

    headers: {

      Authorization: `Bearer ${this.env.MCP_TOKEN}`,

      "CF-Access-Client-Id": this.env.CF_ACCESS_CLIENT_ID,

      "CF-Access-Client-Secret": this.env.CF_ACCESS_CLIENT_SECRET,

    },

  },

});


```

TypeScript

```

await this.addMcpServer("internal", this.env.MCP_SERVER_URL, {

  transport: {

    headers: {

      Authorization: `Bearer ${this.env.MCP_TOKEN}`,

      "CF-Access-Client-Id": this.env.CF_ACCESS_CLIENT_ID,

      "CF-Access-Client-Secret": this.env.CF_ACCESS_CLIENT_SECRET,

    },

  },

});


```

## Related resources

[ McpClient API ](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/) Connect Agents to external MCP servers and use their tools, resources, and prompts. 

[ Connect to an MCP server ](https://developers.cloudflare.com/agents/model-context-protocol/guides/connect-mcp-client/) Create an Agent that connects to an external MCP server and uses its tools. 

[ Model Context Protocol specification ](https://modelcontextprotocol.io/) Learn about the open protocol for connecting AI applications to external tools and data. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/mcp/#page","headline":"MCP · Cloudflare Agents docs","description":"Connect agents to external Model Context Protocol servers and use their tools in model calls.","url":"https://developers.cloudflare.com/agents/tools/mcp/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/mcp/","name":"MCP"}}]}
```
