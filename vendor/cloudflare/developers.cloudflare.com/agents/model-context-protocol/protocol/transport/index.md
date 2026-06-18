---
title: Transport
description: Configure Streamable HTTP transport for remote MCP servers built with the Agents SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Transport

The Model Context Protocol (MCP) specification defines two standard [transport mechanisms ↗](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports) for communication between clients and servers:

1. **stdio** — Communication over standard in and standard out, designed for local MCP connections.
2. **Streamable HTTP** — The standard transport method for remote MCP connections, [introduced ↗](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) in March 2025\. It uses a single HTTP endpoint for bidirectional messaging.

Note

Server-Sent Events (SSE) was previously used for remote MCP connections but has been deprecated in favor of Streamable HTTP. If you need SSE support for legacy clients, use the [McpAgent](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/) class.

MCP servers built with the [Agents SDK](https://developers.cloudflare.com/agents) use [createMcpHandler](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/) to handle Streamable HTTP transport.

## Implementing remote MCP transport

Use [createMcpHandler](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/) to create an MCP server that handles Streamable HTTP transport. This is the recommended approach for new MCP servers.

#### Get started quickly

You can use the "Deploy to Cloudflare" button to create a remote MCP server.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/mcp-worker)

#### Remote MCP server (without authentication)

Create an MCP server using `createMcpHandler`. View the [complete example on GitHub ↗](https://github.com/cloudflare/agents/tree/main/examples/mcp-worker).

* [  JavaScript ](#tab-panel-5859)
* [  TypeScript ](#tab-panel-5860)

JavaScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


function createServer() {

  const server = new McpServer({

    name: "My MCP Server",

    version: "1.0.0",

  });


  server.registerTool(

    "hello",

    {

      description: "Returns a greeting message",

      inputSchema: { name: z.string().optional() },

    },

    async ({ name }) => {

      return {

        content: [{ text: `Hello, ${name ?? "World"}!`, type: "text" }],

      };

    },

  );


  return server;

}


export default {

  fetch: (request, env, ctx) => {

    // Create a new server instance per request

    const server = createServer();

    return createMcpHandler(server)(request, env, ctx);

  },

};


```

TypeScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


function createServer() {

  const server = new McpServer({

    name: "My MCP Server",

    version: "1.0.0",

  });


  server.registerTool(

    "hello",

    {

      description: "Returns a greeting message",

      inputSchema: { name: z.string().optional() },

    },

    async ({ name }) => {

      return {

        content: [{ text: `Hello, ${name ?? "World"}!`, type: "text" }],

      };

    },

  );


  return server;

}


export default {

  fetch: (request: Request, env: Env, ctx: ExecutionContext) => {

    // Create a new server instance per request

    const server = createServer();

    return createMcpHandler(server)(request, env, ctx);

  },

} satisfies ExportedHandler<Env>;


```

#### MCP server with authentication

If your MCP server implements authentication & authorization using the [Workers OAuth Provider ↗](https://github.com/cloudflare/workers-oauth-provider) library, use `createMcpHandler` with the `apiRoute` and `apiHandler` properties. View the [complete example on GitHub ↗](https://github.com/cloudflare/agents/tree/main/examples/mcp-worker-authenticated).

* [  JavaScript ](#tab-panel-5849)
* [  TypeScript ](#tab-panel-5850)

JavaScript

```

export default new OAuthProvider({

  apiRoute: "/mcp",

  apiHandler: {

    fetch: (request, env, ctx) => {

      // Create a new server instance per request

      const server = createServer();

      return createMcpHandler(server)(request, env, ctx);

    },

  },

  // ... other OAuth configuration

});


```

TypeScript

```

export default new OAuthProvider({

  apiRoute: "/mcp",

  apiHandler: {

    fetch: (request: Request, env: Env, ctx: ExecutionContext) => {

      // Create a new server instance per request

      const server = createServer();

      return createMcpHandler(server)(request, env, ctx);

    },

  },

  // ... other OAuth configuration

});


```

### Stateful MCP servers

If your MCP server needs to maintain state across requests, use `createMcpHandler` with a `WorkerTransport` inside an [Agent](https://developers.cloudflare.com/agents/) class. This allows you to persist session state in Durable Object storage and use advanced MCP features like [elicitation ↗](https://modelcontextprotocol.io/specification/draft/client/elicitation) and [sampling ↗](https://modelcontextprotocol.io/specification/draft/client/sampling).

See [Stateful MCP Servers](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/#stateful-mcp-servers) for implementation details.

Streamable HTTP streams are resumable: configure an `EventStore` so clients can reconnect with a `Last-Event-ID` header and replay missed events, keeping in-flight tool calls alive across the edge idle-stream watchdog. `DurableObjectEventStore` is exported from `agents/mcp` for stateful `WorkerTransport` callers. Refer to [McpAgent: Stream resumability](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/#stream-resumability).

## RPC transport

The **RPC transport** is designed for internal applications where your MCP server and agent are both running on Cloudflare — they can even run in the same Worker. It sends JSON-RPC messages directly over Cloudflare's [RPC bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/) without going over the public internet.

* **Faster** — no network overhead, direct function calls between Durable Objects
* **Simpler** — no HTTP endpoints, no connection management
* **Internal only** — perfect for agents calling MCP servers within the same Worker

RPC transport does not support authentication. Use Streamable HTTP for external connections that require OAuth.

### Connecting an Agent to an McpAgent via RPC

#### 1\. Define your MCP server

Create your `McpAgent` with the tools you want to expose:

* [  JavaScript ](#tab-panel-5861)
* [  TypeScript ](#tab-panel-5862)

JavaScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({ name: "MyMCP", version: "1.0.0" });

  initialState = { counter: 0 };


  async init() {

    this.server.tool(

      "add",

      "Add to the counter",

      { amount: z.number() },

      async ({ amount }) => {

        this.setState({ counter: this.state.counter + amount });

        return {

          content: [

            {

              type: "text",

              text: `Added ${amount}, total is now ${this.state.counter}`,

            },

          ],

        };

      },

    );

  }

}


```

TypeScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


type State = { counter: number };


export class MyMCP extends McpAgent<Env, State> {

  server = new McpServer({ name: "MyMCP", version: "1.0.0" });

  initialState: State = { counter: 0 };


  async init() {

    this.server.tool(

      "add",

      "Add to the counter",

      { amount: z.number() },

      async ({ amount }) => {

        this.setState({ counter: this.state.counter + amount });

        return {

          content: [

            {

              type: "text",

              text: `Added ${amount}, total is now ${this.state.counter}`,

            },

          ],

        };

      },

    );

  }

}


```

#### 2\. Connect your Agent to the MCP server

In your `Agent`, call `addMcpServer()` with the Durable Object binding in `onStart()`:

* [  JavaScript ](#tab-panel-5855)
* [  TypeScript ](#tab-panel-5856)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";


export class Chat extends AIChatAgent {

  async onStart() {

    // Pass the DO namespace binding directly

    await this.addMcpServer("my-mcp", this.env.MyMCP);

  }


  async onChatMessage(onFinish) {

    const allTools = this.mcp.getAITools();


    const result = streamText({

      model,

      tools: allTools,

      // ...

    });


    return createUIMessageStreamResponse({ stream: result });

  }

}


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";


export class Chat extends AIChatAgent<Env> {

  async onStart(): Promise<void> {

    // Pass the DO namespace binding directly

    await this.addMcpServer("my-mcp", this.env.MyMCP);

  }


  async onChatMessage(onFinish) {

    const allTools = this.mcp.getAITools();


    const result = streamText({

      model,

      tools: allTools,

      // ...

    });


    return createUIMessageStreamResponse({ stream: result });

  }

}


```

RPC connections are automatically restored after Durable Object hibernation, just like HTTP connections. The binding name and props are persisted to storage so the connection can be re-established without any extra code.

For RPC transport, if `addMcpServer` is called with a name that already has an active connection, the existing connection is returned instead of creating a duplicate. For HTTP transport, deduplication matches on both server name and URL (refer to [MCP Client API](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/) for details). This makes it safe to call in `onStart()`.

#### 3\. Configure Durable Object bindings

In your `wrangler.jsonc`, define bindings for both Durable Objects:

JSONC

```

{

  "durable_objects": {

    "bindings": [

      { "name": "Chat", "class_name": "Chat" },

      { "name": "MyMCP", "class_name": "MyMCP" }

    ]

  },

  "migrations": [

    {

      "new_sqlite_classes": ["MyMCP", "Chat"],

      "tag": "v1"

    }

  ]

}


```

#### 4\. Set up your Worker fetch handler

Route requests to your Chat agent:

* [  JavaScript ](#tab-panel-5853)
* [  TypeScript ](#tab-panel-5854)

JavaScript

```

import { routeAgentRequest } from "agents";


export default {

  async fetch(request, env, ctx) {

    const url = new URL(request.url);


    // Optionally expose the MCP server via HTTP as well

    if (url.pathname.startsWith("/mcp")) {

      return MyMCP.serve("/mcp").fetch(request, env, ctx);

    }


    const response = await routeAgentRequest(request, env);

    if (response) return response;


    return new Response("Not found", { status: 404 });

  },

};


```

TypeScript

```

import { routeAgentRequest } from "agents";


export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    const url = new URL(request.url);


    // Optionally expose the MCP server via HTTP as well

    if (url.pathname.startsWith("/mcp")) {

      return MyMCP.serve("/mcp").fetch(request, env, ctx);

    }


    const response = await routeAgentRequest(request, env);

    if (response) return response;


    return new Response("Not found", { status: 404 });

  },

} satisfies ExportedHandler<Env>;


```

### Passing props to the MCP server

Since RPC transport does not have an OAuth flow, you can pass user context directly as props:

* [  JavaScript ](#tab-panel-5851)
* [  TypeScript ](#tab-panel-5852)

JavaScript

```

await this.addMcpServer("my-mcp", this.env.MyMCP, {

  props: { userId: "user-123", role: "admin" },

});


```

TypeScript

```

await this.addMcpServer("my-mcp", this.env.MyMCP, {

  props: { userId: "user-123", role: "admin" },

});


```

Your `McpAgent` can then access these props:

* [  JavaScript ](#tab-panel-5857)
* [  TypeScript ](#tab-panel-5858)

JavaScript

```

export class MyMCP extends McpAgent {

  async init() {

    this.server.tool("whoami", "Get current user info", {}, async () => {

      const userId = this.props?.userId || "anonymous";

      const role = this.props?.role || "guest";


      return {

        content: [{ type: "text", text: `User ID: ${userId}, Role: ${role}` }],

      };

    });

  }

}


```

TypeScript

```

export class MyMCP extends McpAgent<

  Env,

  State,

  { userId?: string; role?: string }

> {

  async init() {

    this.server.tool("whoami", "Get current user info", {}, async () => {

      const userId = this.props?.userId || "anonymous";

      const role = this.props?.role || "guest";


      return {

        content: [

          { type: "text", text: `User ID: ${userId}, Role: ${role}` },

        ],

      };

    });

  }

}


```

Props are type-safe (TypeScript extracts the Props type from your `McpAgent` generic), persistent (stored in Durable Object storage), and available immediately before any tool calls are made.

### Configuring RPC transport server timeout

The RPC transport has a configurable timeout for waiting for tool responses. By default, the server waits **60 seconds** for a tool handler to respond. You can customize this by overriding `getRpcTransportOptions()` in your `McpAgent`:

* [  JavaScript ](#tab-panel-5863)
* [  TypeScript ](#tab-panel-5864)

JavaScript

```

export class MyMCP extends McpAgent {

  server = new McpServer({ name: "MyMCP", version: "1.0.0" });


  getRpcTransportOptions() {

    return { timeout: 120000 }; // 2 minutes

  }


  async init() {

    this.server.tool(

      "long-running-task",

      "A tool that takes a while",

      { input: z.string() },

      async ({ input }) => {

        await longRunningOperation(input);

        return {

          content: [{ type: "text", text: "Task completed" }],

        };

      },

    );

  }

}


```

TypeScript

```

export class MyMCP extends McpAgent<Env, State> {

  server = new McpServer({ name: "MyMCP", version: "1.0.0" });


  protected getRpcTransportOptions() {

    return { timeout: 120000 }; // 2 minutes

  }


  async init() {

    this.server.tool(

      "long-running-task",

      "A tool that takes a while",

      { input: z.string() },

      async ({ input }) => {

        await longRunningOperation(input);

        return {

          content: [{ type: "text", text: "Task completed" }],

        };

      },

    );

  }

}


```

## Choosing a transport

| Transport           | Use when                              | Pros                                     | Cons                                  |
| ------------------- | ------------------------------------- | ---------------------------------------- | ------------------------------------- |
| **Streamable HTTP** | External MCP servers, production apps | Standard protocol, secure, supports auth | Slight network overhead               |
| **RPC**             | Internal agents on Cloudflare         | Fastest, simplest setup                  | No auth, Durable Object bindings only |
| **SSE**             | Legacy compatibility                  | Backwards compatible                     | Deprecated, use Streamable HTTP       |

### Migrating from McpAgent

If you have an existing MCP server using the `McpAgent` class:

* **Not using state?** Replace your `McpAgent` class with `McpServer` from `@modelcontextprotocol/sdk` and use `createMcpHandler(server)` in a Worker `fetch` handler.
* **Using state?** Use `createMcpHandler` with a `WorkerTransport` inside an [Agent](https://developers.cloudflare.com/agents/) class. See [Stateful MCP Servers](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/#stateful-mcp-servers) for details.
* **Need SSE support?** Continue using `McpAgent` with `serveSSE()` for legacy client compatibility. See the [McpAgent API reference](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/).

### Testing with MCP clients

You can test your MCP server using an MCP client that supports remote connections, or use [mcp-remote ↗](https://www.npmjs.com/package/mcp-remote), an adapter that lets MCP clients that only support local connections work with remote MCP servers.

Follow [this guide](https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/) for instructions on how to connect to your remote MCP server to Claude Desktop, Cursor, Windsurf, and other MCP clients.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/#page","headline":"Transport · Cloudflare Agents docs","description":"Configure Streamable HTTP transport for remote MCP servers built with the Agents SDK.","url":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/protocol/","name":"Protocol"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/protocol/transport/","name":"Transport"}}]}
```
