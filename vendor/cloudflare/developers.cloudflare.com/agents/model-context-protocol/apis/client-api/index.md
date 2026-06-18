---
title: McpClient
description: Connect Agents to external MCP servers to use their tools, resources, and prompts over the Model Context Protocol.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# McpClient

Connect your agent to external [Model Context Protocol (MCP)](https://developers.cloudflare.com/agents/model-context-protocol/) servers to use their tools, resources, and prompts. This enables your agent to interact with GitHub, Slack, databases, and other services through a standardized protocol.

## Overview

The MCP client capability lets your agent:

* **Connect to external MCP servers** \- GitHub, Slack, databases, AI services
* **Use their tools** \- Call functions exposed by MCP servers
* **Access resources** \- Read data from MCP servers
* **Use prompts** \- Leverage pre-built prompt templates

Note

This page covers connecting to MCP servers as a client. To create your own MCP server, refer to [Creating MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/).

## Quick start

* [  JavaScript ](#tab-panel-5721)
* [  TypeScript ](#tab-panel-5722)

JavaScript

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  async onRequest(request) {

    // Add an MCP server

    const result = await this.addMcpServer(

      "github",

      "https://mcp.github.com/mcp",

    );


    if (result.state === "authenticating") {

      // Server requires OAuth - redirect user to authorize

      return Response.redirect(result.authUrl);

    }


    // Server is ready - tools are now available

    const state = this.getMcpServers();

    console.log(`Connected! ${state.tools.length} tools available`);


    return new Response("MCP server connected");

  }

}


```

TypeScript

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  async onRequest(request: Request) {

    // Add an MCP server

    const result = await this.addMcpServer(

      "github",

      "https://mcp.github.com/mcp",

    );


    if (result.state === "authenticating") {

      // Server requires OAuth - redirect user to authorize

      return Response.redirect(result.authUrl);

    }


    // Server is ready - tools are now available

    const state = this.getMcpServers();

    console.log(`Connected! ${state.tools.length} tools available`);


    return new Response("MCP server connected");

  }

}


```

Connections persist in the agent's [SQL storage](https://developers.cloudflare.com/agents/runtime/lifecycle/state/), and when an agent connects to an MCP server, all tools from that server become available automatically.

## Adding MCP servers

Use `addMcpServer()` to connect to an MCP server. For non-OAuth servers, no options are needed:

* [  JavaScript ](#tab-panel-5715)
* [  TypeScript ](#tab-panel-5716)

JavaScript

```

// Non-OAuth server — no options required

await this.addMcpServer("notion", "https://mcp.notion.so/mcp");


// OAuth server — callbackHost is auto-derived from the incoming request,

// but you can set it explicitly if needed (e.g. custom domains)

await this.addMcpServer("github", "https://mcp.github.com/mcp", {

  callbackHost: "https://my-worker.workers.dev",

});


```

TypeScript

```

// Non-OAuth server — no options required

await this.addMcpServer("notion", "https://mcp.notion.so/mcp");


// OAuth server — callbackHost is auto-derived from the incoming request,

// but you can set it explicitly if needed (e.g. custom domains)

await this.addMcpServer("github", "https://mcp.github.com/mcp", {

  callbackHost: "https://my-worker.workers.dev",

});


```

### Stable server IDs

By default, each connection is assigned a generated `nanoid(8)` ID. Pass `id` for connector-style integrations so tools surface as readable keys instead of opaque connection IDs.

* [  JavaScript ](#tab-panel-5713)
* [  TypeScript ](#tab-panel-5714)

JavaScript

```

await this.addMcpServer("GitHub", env.MCP_SESSION, {

  id: "github",

  props: { token: "..." },

});

// tools surface as `tool_github_<name>`


```

TypeScript

```

await this.addMcpServer("GitHub", env.MCP_SESSION, {

  id: "github",

  props: { token: "..." },

});

// tools surface as `tool_github_<name>`


```

When provided, this `id` replaces the generated value as the server's ID in storage, restore, `listServers()`, `listTools()`, `getAITools()`, and OAuth state. The supplied ID is normalized via the exported `normalizeServerId` helper, so values like `"GitHub MCP!"` become `"github-mcp"` — guaranteeing the ID is safe to embed in AI SDK tool names and storage keys.

Stable IDs are fully additive — no existing code breaks. If you add `{ id: "github" }` to an `addMcpServer` call for a server already registered under an auto-generated ID, the SDK transparently migrates the existing storage row, in-memory connection, and OAuth-related storage keys to the new stable ID. No `removeMcpServer` step is required. `addMcpServer` only throws on a genuinely ambiguous collision: the same stable ID already belongs to a _different_ `(name, url)` server.

### Transport options

MCP supports multiple transport types:

* [  JavaScript ](#tab-panel-5717)
* [  TypeScript ](#tab-panel-5718)

JavaScript

```

await this.addMcpServer("server", "https://mcp.example.com/mcp", {

  transport: {

    type: "streamable-http",

  },

});


```

TypeScript

```

await this.addMcpServer("server", "https://mcp.example.com/mcp", {

  transport: {

    type: "streamable-http",

  },

});


```

| Transport       | Description                                         |
| --------------- | --------------------------------------------------- |
| auto            | Auto-detect based on server response (default)      |
| streamable-http | HTTP with streaming                                 |
| sse             | Server-Sent Events - legacy/compatibility transport |

### Custom headers

For servers behind authentication (like Cloudflare Access) or using bearer tokens:

* [  JavaScript ](#tab-panel-5719)
* [  TypeScript ](#tab-panel-5720)

JavaScript

```

await this.addMcpServer("internal", "https://internal-mcp.example.com/mcp", {

  transport: {

    headers: {

      Authorization: "Bearer my-token",

      "CF-Access-Client-Id": "...",

      "CF-Access-Client-Secret": "...",

    },

  },

});


```

TypeScript

```

await this.addMcpServer("internal", "https://internal-mcp.example.com/mcp", {

  transport: {

    headers: {

      Authorization: "Bearer my-token",

      "CF-Access-Client-Id": "...",

      "CF-Access-Client-Secret": "...",

    },

  },

});


```

### URL security

MCP server URLs are validated before connection to prevent Server-Side Request Forgery (SSRF). The following URL targets are blocked:

* Private/internal IP ranges (RFC 1918: `10.x`, `172.16-31.x`, `192.168.x`)
* Unspecified addresses (`0.0.0.0`, `[::]`)
* Link-local addresses (`169.254.x`, `fe80::`)
* IPv6 unique-local addresses (`fc00::/7`)
* IPv4-mapped IPv6 addresses that resolve to private ranges (for example, `[::ffff:10.0.0.1]`)
* Cloud metadata endpoints (`metadata.google.internal`)

Loopback addresses (`localhost`, `127.x.x.x`, `[::1]`) are **allowed** for local development.

For production connections to internal services, use the [RPC transport](https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/) with a Durable Object binding instead of HTTP.

### Return value

`addMcpServer()` returns the connection state:

* `ready` \- Server connected and tools discovered
* `authenticating` \- Server requires OAuth; redirect user to `authUrl`

## OAuth authentication

Many MCP servers require OAuth authentication. The agent handles the OAuth flow automatically.

### How it works

sequenceDiagram
    participant Client
    participant Agent
    participant MCPServer

    Client->>Agent: addMcpServer(name, url)
    Agent->>MCPServer: Connect
    MCPServer-->>Agent: Requires OAuth
    Agent-->>Client: state: authenticating, authUrl
    Client->>MCPServer: User authorizes
    MCPServer->>Agent: Callback with code
    Agent->>MCPServer: Exchange for token
    Agent-->>Client: onMcpUpdate (ready)

### Handling OAuth in your agent

* [  JavaScript ](#tab-panel-5723)
* [  TypeScript ](#tab-panel-5724)

JavaScript

```

class MyAgent extends Agent {

  async onRequest(request) {

    const result = await this.addMcpServer(

      "github",

      "https://mcp.github.com/mcp",

    );


    if (result.state === "authenticating") {

      // Redirect the user to the OAuth authorization page

      return Response.redirect(result.authUrl);

    }


    return Response.json({ status: "connected", id: result.id });

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async onRequest(request: Request) {

    const result = await this.addMcpServer(

      "github",

      "https://mcp.github.com/mcp",

    );


    if (result.state === "authenticating") {

      // Redirect the user to the OAuth authorization page

      return Response.redirect(result.authUrl);

    }


    return Response.json({ status: "connected", id: result.id });

  }

}


```

### OAuth callback

The callback URL is automatically constructed:

```

https://{host}/{agentsPrefix}/{agent-name}/{instance-name}/callback


```

For example: `https://my-worker.workers.dev/agents/my-agent/default/callback`

OAuth tokens are securely stored in SQLite, and persist across agent restarts.

### Protecting instance names in OAuth callbacks

When using `sendIdentityOnConnect: false` to hide sensitive instance names (like session IDs or user IDs), the default OAuth callback URL would expose the instance name. To prevent this security issue, you must provide a custom `callbackPath`.

* [  JavaScript ](#tab-panel-5747)
* [  TypeScript ](#tab-panel-5748)

JavaScript

```

import { Agent, routeAgentRequest, getAgentByName } from "agents";


export class SecureAgent extends Agent {

  static options = { sendIdentityOnConnect: false };


  async onRequest(request) {

    // callbackPath is required when sendIdentityOnConnect is false

    const result = await this.addMcpServer(

      "github",

      "https://mcp.github.com/mcp",

      {

        callbackPath: "mcp-oauth-callback", // Custom path without instance name

      },

    );


    if (result.state === "authenticating") {

      return Response.redirect(result.authUrl);

    }


    return new Response("Connected!");

  }

}


// Route the custom callback path to the agent

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // Route custom MCP OAuth callback to agent instance

    if (url.pathname.startsWith("/mcp-oauth-callback")) {

      // Implement this to extract the instance name from your session/auth mechanism

      const instanceName = await getInstanceNameFromSession(request);


      const agent = await getAgentByName(env.SecureAgent, instanceName);

      return agent.fetch(request);

    }


    // Standard agent routing

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Agent, routeAgentRequest, getAgentByName } from "agents";


export class SecureAgent extends Agent {

  static options = { sendIdentityOnConnect: false };


  async onRequest(request: Request) {

    // callbackPath is required when sendIdentityOnConnect is false

    const result = await this.addMcpServer(

      "github",

      "https://mcp.github.com/mcp",

      {

        callbackPath: "mcp-oauth-callback", // Custom path without instance name

      },

    );


    if (result.state === "authenticating") {

      return Response.redirect(result.authUrl);

    }


    return new Response("Connected!");

  }

}


// Route the custom callback path to the agent

export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);


    // Route custom MCP OAuth callback to agent instance

    if (url.pathname.startsWith("/mcp-oauth-callback")) {

      // Implement this to extract the instance name from your session/auth mechanism

      const instanceName = await getInstanceNameFromSession(request);


      const agent = await getAgentByName(env.SecureAgent, instanceName);

      return agent.fetch(request);

    }


    // Standard agent routing

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

How callback matching works

OAuth callbacks are matched by the `state` query parameter (format: `{serverId}:{stateValue}`), not by URL path. This means your custom `callbackPath` can be any path you choose, as long as requests to that path are routed to the correct agent instance.

### Custom OAuth callback handling

Configure how OAuth completion is handled. By default, successful authentication redirects to your application origin, while failed authentication displays an HTML error page.

* [  JavaScript ](#tab-panel-5735)
* [  TypeScript ](#tab-panel-5736)

JavaScript

```

export class MyAgent extends Agent {

  onStart() {

    this.mcp.configureOAuthCallback({

      // Redirect after successful auth

      successRedirect: "https://myapp.com/success",


      // Redirect on error with error message in query string

      errorRedirect: "https://myapp.com/error",


      // Or use a custom handler

      customHandler: () => {

        // Close popup window after auth completes

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }

}


```

TypeScript

```

export class MyAgent extends Agent {

  onStart() {

    this.mcp.configureOAuthCallback({

      // Redirect after successful auth

      successRedirect: "https://myapp.com/success",


      // Redirect on error with error message in query string

      errorRedirect: "https://myapp.com/error",


      // Or use a custom handler

      customHandler: () => {

        // Close popup window after auth completes

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }

}


```

## Using MCP capabilities

Once connected, access the server's capabilities:

### Getting available tools

* [  JavaScript ](#tab-panel-5725)
* [  TypeScript ](#tab-panel-5726)

JavaScript

```

const state = this.getMcpServers();


// All tools from all connected servers

for (const tool of state.tools) {

  console.log(`Tool: ${tool.name}`);

  console.log(`  From server: ${tool.serverId}`);

  console.log(`  Title: ${tool.title ?? tool.name}`);

  console.log(`  Description: ${tool.description}`);

}


```

TypeScript

```

const state = this.getMcpServers();


// All tools from all connected servers

for (const tool of state.tools) {

  console.log(`Tool: ${tool.name}`);

  console.log(`  From server: ${tool.serverId}`);

  console.log(`  Title: ${tool.title ?? tool.name}`);

  console.log(`  Description: ${tool.description}`);

}


```

### Resources and prompts

* [  JavaScript ](#tab-panel-5731)
* [  TypeScript ](#tab-panel-5732)

JavaScript

```

const state = this.getMcpServers();


// Available resources

for (const resource of state.resources) {

  console.log(`Resource: ${resource.name} (${resource.uri})`);

}


// Available prompts

for (const prompt of state.prompts) {

  console.log(`Prompt: ${prompt.name}`);

}


```

TypeScript

```

const state = this.getMcpServers();


// Available resources

for (const resource of state.resources) {

  console.log(`Resource: ${resource.name} (${resource.uri})`);

}


// Available prompts

for (const prompt of state.prompts) {

  console.log(`Prompt: ${prompt.name}`);

}


```

### Server status

* [  JavaScript ](#tab-panel-5729)
* [  TypeScript ](#tab-panel-5730)

JavaScript

```

const state = this.getMcpServers();


for (const [id, server] of Object.entries(state.servers)) {

  console.log(`${server.name}: ${server.state}`);

  // state: "ready" | "authenticating" | "connecting" | "connected" | "discovering" | "failed"

}


```

TypeScript

```

const state = this.getMcpServers();


for (const [id, server] of Object.entries(state.servers)) {

  console.log(`${server.name}: ${server.state}`);

  // state: "ready" | "authenticating" | "connecting" | "connected" | "discovering" | "failed"

}


```

### Integration with AI SDK

To use MCP tools with the AI SDK, use `this.mcp.getAITools()` which converts MCP tools to AI SDK format:

* [  JavaScript ](#tab-panel-5737)
* [  TypeScript ](#tab-panel-5738)

JavaScript

```

import { generateText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends Agent {

  async onRequest(request) {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const response = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: "What's the weather in San Francisco?",

      tools: this.mcp.getAITools(),

    });


    return new Response(response.text);

  }

}


```

TypeScript

```

import { generateText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends Agent<Env> {

  async onRequest(request: Request) {

    const workersai = createWorkersAI({ binding: this.env.AI });

    const response = await generateText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: "What's the weather in San Francisco?",

      tools: this.mcp.getAITools(),

    });


    return new Response(response.text);

  }

}


```

Note

`getMcpServers().tools` returns raw MCP `Tool` objects for inspection. Use `this.mcp.getAITools()` when passing tools to the AI SDK.

## Managing servers

### Removing a server

* [  JavaScript ](#tab-panel-5727)
* [  TypeScript ](#tab-panel-5728)

JavaScript

```

await this.removeMcpServer(serverId);


```

TypeScript

```

await this.removeMcpServer(serverId);


```

This disconnects from the server and removes it from storage.

### Persistence

MCP servers persist across agent restarts:

* Server configuration stored in SQLite
* OAuth tokens stored securely
* Connections restored automatically when agent wakes

### Listing all servers

* [  JavaScript ](#tab-panel-5733)
* [  TypeScript ](#tab-panel-5734)

JavaScript

```

const state = this.getMcpServers();


for (const [id, server] of Object.entries(state.servers)) {

  console.log(`${id}: ${server.name} (${server.server_url})`);

}


```

TypeScript

```

const state = this.getMcpServers();


for (const [id, server] of Object.entries(state.servers)) {

  console.log(`${id}: ${server.name} (${server.server_url})`);

}


```

## Client-side integration

Connected clients receive real-time MCP updates via WebSocket:

* [  JavaScript ](#tab-panel-5753)
* [  TypeScript ](#tab-panel-5754)

JavaScript

```

import { useAgent } from "agents/react";

import { useState } from "react";


function Dashboard() {

  const [tools, setTools] = useState([]);

  const [servers, setServers] = useState({});


  const agent = useAgent({

    agent: "MyAgent",

    onMcpUpdate: (mcpState) => {

      setTools(mcpState.tools);

      setServers(mcpState.servers);

    },

  });


  return (

    <div>

      <h2>Connected Servers</h2>

      {Object.entries(servers).map(([id, server]) => (

        <div key={id}>

          {server.name}: {server.state}

        </div>

      ))}


      <h2>Available Tools ({tools.length})</h2>

      {tools.map((tool) => (

        <div key={`${tool.serverId}-${tool.name}`}>{tool.name}</div>

      ))}

    </div>

  );

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useState } from "react";


function Dashboard() {

  const [tools, setTools] = useState([]);

  const [servers, setServers] = useState({});


  const agent = useAgent({

    agent: "MyAgent",

    onMcpUpdate: (mcpState) => {

      setTools(mcpState.tools);

      setServers(mcpState.servers);

    },

  });


  return (

    <div>

      <h2>Connected Servers</h2>

      {Object.entries(servers).map(([id, server]) => (

        <div key={id}>

          {server.name}: {server.state}

        </div>

      ))}


      <h2>Available Tools ({tools.length})</h2>

      {tools.map((tool) => (

        <div key={`${tool.serverId}-${tool.name}`}>{tool.name}</div>

      ))}

    </div>

  );

}


```

## API reference

### `addMcpServer()`

Add a connection to an MCP server and make its tools available to your agent.

Calling `addMcpServer` is idempotent when both the server name **and** URL match an existing active connection — the existing connection is returned without creating a duplicate. This makes it safe to call in `onStart()` without worrying about duplicate connections on restart.

If you call `addMcpServer` with the same name but a **different** URL, a new connection is created. Both connections remain active and their tools are merged in `getAITools()`. To replace a server, call `removeMcpServer(oldId)` first.

URLs are normalized before comparison (trailing slashes, default ports, and hostname case are handled), so `https://MCP.Example.com` and `https://mcp.example.com/` are treated as the same URL.

TypeScript

```

// HTTP transport (Streamable HTTP, SSE)

async addMcpServer(

  serverName: string,

  url: string,

  options?: {

    id?: string;

    callbackHost?: string;

    callbackPath?: string;

    agentsPrefix?: string;

    client?: ClientOptions;

    transport?: {

      headers?: HeadersInit;

      type?: "sse" | "streamable-http" | "auto";

    };

    retry?: RetryOptions;

  }

): Promise<

  | { id: string; state: "authenticating"; authUrl: string }

  | { id: string; state: "ready" }

>


// RPC transport (Durable Object binding — no HTTP overhead)

async addMcpServer(

  serverName: string,

  binding: DurableObjectNamespace,

  options?: {

    id?: string;

    props?: Record<string, unknown>;

    client?: ClientOptions;

    retry?: RetryOptions;

  }

): Promise<{ id: string; state: "ready" }>


```

#### Parameters (HTTP transport)

* `serverName` (string, required) — Display name for the MCP server
* `url` (string, required) — URL of the MCP server endpoint
* `options` (object, optional) — Connection configuration:  
   * `id` — Optional stable, caller-supplied server ID for connector-style integrations. When provided, it replaces the generated `nanoid(8)` across storage, `listServers()`, `listTools()`, `getAITools()` (so tool keys become readable, for example `tool_github_create_pull_request`), and OAuth state. Refer to [Stable server IDs](#stable-server-ids)  
   * `callbackHost` — Host for OAuth callback URL. Only needed for OAuth-authenticated servers. If omitted, automatically derived from the incoming request or WebSocket connection URI — you typically do not need to set this unless you are using a custom domain that differs from the Worker's hostname  
   * `callbackPath` — Custom callback URL path that bypasses the default `/agents/{class}/{name}/callback` construction. **Required when `sendIdentityOnConnect` is `false`** to prevent leaking the instance name. When set, the callback URL becomes `{callbackHost}/{callbackPath}`. You must route this path to the agent instance via `getAgentByName`  
   * `agentsPrefix` — URL prefix for OAuth callback path. Default: `"agents"`. Ignored when `callbackPath` is provided  
   * `client` — MCP client configuration options (passed to `@modelcontextprotocol/sdk` Client constructor). By default, includes `CfWorkerJsonSchemaValidator` for validating tool parameters against JSON schemas  
   * `transport` — Transport layer configuration:  
         * `headers` — Custom HTTP headers for authentication  
         * `type` — Transport type: `"auto"` (default), `"streamable-http"`, or `"sse"`  
   * `retry` — Retry options for connection and reconnection attempts. Persisted and used when restoring connections after hibernation or after OAuth completion. Default: 3 attempts, 500ms base delay, 5s max delay. Refer to [Retries](https://developers.cloudflare.com/agents/runtime/execution/retries/) for details on `RetryOptions`.

#### Parameters (RPC transport)

* `serverName` (string, required) — Display name for the MCP server
* `binding` (`DurableObjectNamespace`, required) — The Durable Object binding for the `McpAgent` class
* `options` (object, optional) — Connection configuration:  
   * `id` — Optional stable, caller-supplied server ID. Refer to [Stable server IDs](#stable-server-ids)  
   * `props` — Initialization data passed to the `McpAgent`'s `onStart(props)`. Use this to pass user context, configuration, or other data to the MCP server instance  
   * `client` — MCP client configuration options  
   * `retry` — Retry options for the connection

RPC transport connects your Agent directly to an `McpAgent` via Durable Object bindings without HTTP overhead. Refer to [MCP Transport](https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/) for details on configuring RPC transport.

#### Returns

A Promise that resolves to a discriminated union based on connection state:

* When `state` is `"authenticating"`:  
   * `id` (string) — Unique identifier for this server connection  
   * `state` (`"authenticating"`) — Server is waiting for OAuth authorization  
   * `authUrl` (string) — OAuth authorization URL for user authentication
* When `state` is `"ready"`:  
   * `id` (string) — Unique identifier for this server connection  
   * `state` (`"ready"`) — Server is fully connected and operational

### `removeMcpServer()`

Disconnect from an MCP server and clean up its resources.

TypeScript

```

async removeMcpServer(id: string): Promise<void>


```

#### Parameters

* `id` (string, required) — Server connection ID returned from `addMcpServer()`

### `getMcpServers()`

Get the current state of all MCP server connections.

TypeScript

```

getMcpServers(): MCPServersState


```

#### Returns

TypeScript

```

type MCPServersState = {

  servers: Record<

    string,

    {

      name: string;

      server_url: string;

      auth_url: string | null;

      state:

        | "authenticating"

        | "connecting"

        | "connected"

        | "discovering"

        | "ready"

        | "failed";

      capabilities: ServerCapabilities | null;

      instructions: string | null;

      error: string | null;

    }

  >;

  tools: Array<Tool & { serverId: string }>;

  prompts: Array<Prompt & { serverId: string }>;

  resources: Array<Resource & { serverId: string }>;

  resourceTemplates: Array<ResourceTemplate & { serverId: string }>;

};


```

The `state` field indicates the connection lifecycle:

* `authenticating` — Waiting for OAuth authorization to complete
* `connecting` — Establishing transport connection
* `connected` — Transport connection established
* `discovering` — Discovering server capabilities (tools, resources, prompts)
* `ready` — Fully connected and operational
* `failed` — Connection failed (see `error` field for details)

The `error` field contains an error message when `state` is `"failed"`. Error messages from external OAuth providers are automatically escaped to prevent XSS attacks, making them safe to display directly in your UI.

### `configureOAuthCallback()`

Configure OAuth callback behavior for MCP servers requiring authentication. This method allows you to customize what happens after a user completes OAuth authorization.

TypeScript

```

this.mcp.configureOAuthCallback(options: {

  successRedirect?: string;

  errorRedirect?: string;

  customHandler?: () => Response | Promise<Response>;

}): void


```

#### Parameters

* `options` (object, required) — OAuth callback configuration:  
   * `successRedirect` (string, optional) — URL to redirect to after successful authentication  
   * `errorRedirect` (string, optional) — URL to redirect to after failed authentication. Error message is appended as `?error=<message>` query parameter  
   * `customHandler` (function, optional) — Custom handler for complete control over the callback response. Must return a Response

#### Default behavior

When no configuration is provided:

* **Success**: Redirects to your application origin
* **Failure**: Displays an HTML error page with the error message

If OAuth fails, the connection state becomes `"failed"` and the error message is stored in the `server.error` field for display in your UI.

#### Usage

Configure in `onStart()` before any OAuth flows begin:

* [  JavaScript ](#tab-panel-5743)
* [  TypeScript ](#tab-panel-5744)

JavaScript

```

export class MyAgent extends Agent {

  onStart() {

    // Option 1: Simple redirects

    this.mcp.configureOAuthCallback({

      successRedirect: "/dashboard",

      errorRedirect: "/auth-error",

    });


    // Option 2: Custom handler (e.g., for popup windows)

    this.mcp.configureOAuthCallback({

      customHandler: () => {

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }

}


```

TypeScript

```

export class MyAgent extends Agent {

  onStart() {

    // Option 1: Simple redirects

    this.mcp.configureOAuthCallback({

      successRedirect: "/dashboard",

      errorRedirect: "/auth-error",

    });


    // Option 2: Custom handler (e.g., for popup windows)

    this.mcp.configureOAuthCallback({

      customHandler: () => {

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }

}


```

## Custom OAuth provider

Override the default OAuth provider used when connecting to MCP servers by implementing `createMcpOAuthProvider()` on your Agent class. This enables custom authentication strategies such as pre-registered client credentials or mTLS, beyond the built-in dynamic client registration.

The override is used for both new connections (`addMcpServer`) and restored connections after a Durable Object restart.

* [  JavaScript ](#tab-panel-5749)
* [  TypeScript ](#tab-panel-5750)

JavaScript

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  createMcpOAuthProvider(callbackUrl) {

    const env = this.env;

    return {

      get redirectUrl() {

        return callbackUrl;

      },

      get clientMetadata() {

        return {

          client_id: env.MCP_CLIENT_ID,

          client_secret: env.MCP_CLIENT_SECRET,

          redirect_uris: [callbackUrl],

        };

      },

      clientInformation() {

        return {

          client_id: env.MCP_CLIENT_ID,

          client_secret: env.MCP_CLIENT_SECRET,

        };

      },

    };

  }

}


```

TypeScript

```

import { Agent } from "agents";

import type { AgentMcpOAuthProvider } from "agents";


export class MyAgent extends Agent<Env> {

  createMcpOAuthProvider(callbackUrl: string): AgentMcpOAuthProvider {

    const env = this.env;

    return {

      get redirectUrl() {

        return callbackUrl;

      },

      get clientMetadata() {

        return {

          client_id: env.MCP_CLIENT_ID,

          client_secret: env.MCP_CLIENT_SECRET,

          redirect_uris: [callbackUrl],

        };

      },

      clientInformation() {

        return {

          client_id: env.MCP_CLIENT_ID,

          client_secret: env.MCP_CLIENT_SECRET,

        };

      },

    };

  }

}


```

If you do not override this method, the agent uses the default provider which performs [OAuth 2.0 Dynamic Client Registration ↗](https://datatracker.ietf.org/doc/html/rfc7591) with the MCP server.

### Custom storage backend

To keep the built-in OAuth logic (CSRF state, PKCE, nonce generation, token management) but route token storage to a different backend, import `DurableObjectOAuthClientProvider` and pass your own storage adapter:

* [  JavaScript ](#tab-panel-5739)
* [  TypeScript ](#tab-panel-5740)

JavaScript

```

import { Agent, DurableObjectOAuthClientProvider } from "agents";


export class MyAgent extends Agent {

  createMcpOAuthProvider(callbackUrl) {

    return new DurableObjectOAuthClientProvider(

      myCustomStorage, // any DurableObjectStorage-compatible adapter

      this.name,

      callbackUrl,

    );

  }

}


```

TypeScript

```

import { Agent, DurableObjectOAuthClientProvider } from "agents";

import type { AgentMcpOAuthProvider } from "agents";


export class MyAgent extends Agent {

  createMcpOAuthProvider(callbackUrl: string): AgentMcpOAuthProvider {

    return new DurableObjectOAuthClientProvider(

      myCustomStorage, // any DurableObjectStorage-compatible adapter

      this.name,

      callbackUrl,

    );

  }

}


```

## Advanced: MCPClientManager

For fine-grained control, use `this.mcp` directly:

### Step-by-step connection

* [  JavaScript ](#tab-panel-5755)
* [  TypeScript ](#tab-panel-5756)

JavaScript

```

// 1. Register the server (saves to storage and creates in-memory connection)

const id = "my-server";

await this.mcp.registerServer(id, {

  url: "https://mcp.example.com/mcp",

  name: "My Server",

  callbackUrl: "https://my-worker.workers.dev/agents/my-agent/default/callback",

  transport: { type: "auto" },

});


// 2. Connect (initializes transport, handles OAuth if needed)

const connectResult = await this.mcp.connectToServer(id);


if (connectResult.state === "failed") {

  console.error("Connection failed:", connectResult.error);

  return;

}


if (connectResult.state === "authenticating") {

  console.log("OAuth required:", connectResult.authUrl);

  return;

}


// 3. Discover capabilities (transitions from "connected" to "ready")

if (connectResult.state === "connected") {

  const discoverResult = await this.mcp.discoverIfConnected(id);


  if (!discoverResult?.success) {

    console.error("Discovery failed:", discoverResult?.error);

  }

}


```

TypeScript

```

// 1. Register the server (saves to storage and creates in-memory connection)

const id = "my-server";

await this.mcp.registerServer(id, {

  url: "https://mcp.example.com/mcp",

  name: "My Server",

  callbackUrl: "https://my-worker.workers.dev/agents/my-agent/default/callback",

  transport: { type: "auto" },

});


// 2. Connect (initializes transport, handles OAuth if needed)

const connectResult = await this.mcp.connectToServer(id);


if (connectResult.state === "failed") {

  console.error("Connection failed:", connectResult.error);

  return;

}


if (connectResult.state === "authenticating") {

  console.log("OAuth required:", connectResult.authUrl);

  return;

}


// 3. Discover capabilities (transitions from "connected" to "ready")

if (connectResult.state === "connected") {

  const discoverResult = await this.mcp.discoverIfConnected(id);


  if (!discoverResult?.success) {

    console.error("Discovery failed:", discoverResult?.error);

  }

}


```

### Event subscription

* [  JavaScript ](#tab-panel-5741)
* [  TypeScript ](#tab-panel-5742)

JavaScript

```

// Listen for state changes (onServerStateChanged is an Event<void>)

const disposable = this.mcp.onServerStateChanged(() => {

  console.log("MCP server state changed");

  this.broadcastMcpServers(); // Notify connected clients

});


// Clean up the subscription when no longer needed

// disposable.dispose();


```

TypeScript

```

// Listen for state changes (onServerStateChanged is an Event<void>)

const disposable = this.mcp.onServerStateChanged(() => {

  console.log("MCP server state changed");

  this.broadcastMcpServers(); // Notify connected clients

});


// Clean up the subscription when no longer needed

// disposable.dispose();


```

Note

MCP server list broadcasts (`cf_agent_mcp_servers`) are automatically filtered to exclude connections where [shouldSendProtocolMessages](https://developers.cloudflare.com/agents/runtime/communication/protocol-messages/) returned `false`.

### Lifecycle methods

#### `this.mcp.registerServer()`

Register a server without immediately connecting.

TypeScript

```

async registerServer(

  id: string,

  options: {

    url: string;

    name: string;

    callbackUrl: string;

    clientOptions?: ClientOptions;

    transportOptions?: TransportOptions;

  }

): Promise<string>


```

#### `this.mcp.connectToServer()`

Establish a connection to a previously registered server.

TypeScript

```

async connectToServer(id: string): Promise<MCPConnectionResult>


type MCPConnectionResult =

  | { state: "failed"; error: string }

  | { state: "authenticating"; authUrl: string }

  | { state: "connected" }


```

#### `this.mcp.discoverIfConnected()`

Check server capabilities if a connection is active.

TypeScript

```

async discoverIfConnected(

  serverId: string,

  options?: { timeoutMs?: number }

): Promise<MCPDiscoverResult | undefined>


type MCPDiscoverResult = {

  success: boolean;

  state: MCPConnectionState;

  error?: string;

}


```

#### `this.mcp.waitForConnections()`

Wait for all in-flight MCP connection and discovery operations to settle. This is useful when you need `this.mcp.getAITools()` to return the full set of tools immediately after the agent wakes from hibernation.

TypeScript

```

// Wait indefinitely

await this.mcp.waitForConnections();


// Wait with a timeout (milliseconds)

await this.mcp.waitForConnections({ timeout: 10_000 });


```

Note

`AIChatAgent` calls this automatically via its [waitForMcpConnections](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#waitformcpconnections) property (defaults to `{ timeout: 10_000 }`). You only need `waitForConnections()` directly when using `Agent` with MCP, or when you want finer control inside `onChatMessage`.

#### `this.mcp.closeConnection()`

Close the connection to a specific server while keeping it registered.

TypeScript

```

async closeConnection(id: string): Promise<void>


```

#### `this.mcp.closeAllConnections()`

Close all active server connections while preserving registrations.

TypeScript

```

async closeAllConnections(): Promise<void>


```

#### `this.mcp.getAITools()`

Get all discovered MCP tools in a format compatible with the AI SDK.

TypeScript

```

getAITools(filter?: MCPServerFilter): ToolSet


```

Tools are automatically namespaced by server ID to prevent conflicts when multiple MCP servers expose tools with the same name.

Pass an `MCPServerFilter` to scope the returned tools to a subset of connected servers:

* [  JavaScript ](#tab-panel-5745)
* [  TypeScript ](#tab-panel-5746)

JavaScript

```

// Tools from a specific server only

const githubTools = this.mcp.getAITools({ serverId: "github" });


// Tools from multiple servers

const tools = this.mcp.getAITools({ serverId: ["github", "notion"] });


// Tools from servers matching a name

const tools = this.mcp.getAITools({ serverName: "GitHub" });


// Only tools from servers that are ready

const tools = this.mcp.getAITools({ state: "ready" });


```

TypeScript

```

// Tools from a specific server only

const githubTools = this.mcp.getAITools({ serverId: "github" });


// Tools from multiple servers

const tools = this.mcp.getAITools({ serverId: ["github", "notion"] });


// Tools from servers matching a name

const tools = this.mcp.getAITools({ serverName: "GitHub" });


// Only tools from servers that are ready

const tools = this.mcp.getAITools({ state: "ready" });


```

The filter type is available from `agents/mcp/client`:

TypeScript

```

import type { MCPServerFilter } from "agents/mcp/client";


type MCPServerFilter = {

  serverId?: string | string[];

  serverName?: string | string[];

  state?: MCPConnectionState | MCPConnectionState[];

};


```

All specified filter criteria are AND'd together. The same filter parameter is accepted by `listTools()`, `listPrompts()`, `listResources()`, and `listResourceTemplates()`.

## Error handling

Use error detection utilities to handle connection errors:

* [  JavaScript ](#tab-panel-5751)
* [  TypeScript ](#tab-panel-5752)

JavaScript

```

import { isUnauthorized, isTransportNotImplemented } from "agents";


export class MyAgent extends Agent {

  async onRequest(request) {

    try {

      await this.addMcpServer("Server", "https://mcp.example.com/mcp");

    } catch (error) {

      if (isUnauthorized(error)) {

        return new Response("Authentication required", { status: 401 });

      } else if (isTransportNotImplemented(error)) {

        return new Response("Transport not supported", { status: 400 });

      }

      throw error;

    }

  }

}


```

TypeScript

```

import { isUnauthorized, isTransportNotImplemented } from "agents";


export class MyAgent extends Agent {

  async onRequest(request: Request) {

    try {

      await this.addMcpServer("Server", "https://mcp.example.com/mcp");

    } catch (error) {

      if (isUnauthorized(error)) {

        return new Response("Authentication required", { status: 401 });

      } else if (isTransportNotImplemented(error)) {

        return new Response("Transport not supported", { status: 400 });

      }

      throw error;

    }

  }

}


```

## Next steps

[ Creating MCP servers ](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/) Build your own MCP server. 

[ Client SDK ](https://developers.cloudflare.com/agents/communication-channels/chat/client-sdk/) Connect from browsers with onMcpUpdate. 

[ Store and sync state ](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) Learn about agent persistence. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/#page","headline":"McpClient · Cloudflare Agents docs","description":"Connect Agents to external MCP servers to use their tools, resources, and prompts over the Model Context Protocol.","url":"https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/apis/","name":"APIs"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/apis/client-api/","name":"McpClient"}}]}
```
