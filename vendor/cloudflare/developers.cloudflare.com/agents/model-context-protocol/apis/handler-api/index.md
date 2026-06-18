---
title: createMcpHandler
description: Create a stateless MCP server fetch handler for a plain Worker using createMcpHandler and streamable HTTP transport.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# createMcpHandler

The `createMcpHandler` function creates a fetch handler to serve your [MCP server](https://developers.cloudflare.com/agents/model-context-protocol/). Use it when you want a stateless MCP server that runs in a plain Worker (no Durable Object). For stateful MCP servers that persist state across requests, use the [McpAgent](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/) class instead.

It uses an implementation of the MCP Transport interface, `WorkerTransport`, built on top of web standards, which conforms to the [streamable-http ↗](https://modelcontextprotocol.io/specification/draft/basic/transports/#streamable-http) transport specification.

TypeScript

```

import { createMcpHandler, type CreateMcpHandlerOptions } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


function createMcpHandler(

  server: McpServer,

  options?: CreateMcpHandlerOptions,

): (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response>;


```

#### Parameters

* **server** — An instance of [McpServer ↗](https://modelcontextprotocol.io/docs/develop/build-server#node) from the `@modelcontextprotocol/sdk` package
* **options** — Optional configuration object (see [CreateMcpHandlerOptions](#createmcphandleroptions))

#### Returns

A Worker fetch handler function with the signature `(request: Request, env: unknown, ctx: ExecutionContext) => Promise<Response>`.

### CreateMcpHandlerOptions

Configuration options for creating an MCP handler.

TypeScript

```

interface CreateMcpHandlerOptions extends WorkerTransportOptions {

  /**

   * The route path that this MCP handler should respond to.

   * If specified, the handler will only process requests that match this route.

   * @default "/mcp"

   */

  route?: string;


  /**

   * An optional auth context to use for handling MCP requests.

   * If not provided, the handler will look for props in the execution context.

   */

  authContext?: McpAuthContext;


  /**

   * An optional transport to use for handling MCP requests.

   * If not provided, a WorkerTransport will be created with the provided WorkerTransportOptions.

   */

  transport?: WorkerTransport;


  // Inherited from WorkerTransportOptions:

  sessionIdGenerator?: () => string;

  enableJsonResponse?: boolean;

  onsessioninitialized?: (sessionId: string) => void;

  corsOptions?: CORSOptions;

  storage?: MCPStorageApi;

}


```

#### Options

##### route

The URL path where the MCP handler responds. Requests to other paths return a 404 response.

**Default:** `"/mcp"`

* [  JavaScript ](#tab-panel-5757)
* [  TypeScript ](#tab-panel-5758)

JavaScript

```

const handler = createMcpHandler(server, {

  route: "/api/mcp", // Only respond to requests at /api/mcp

});


```

TypeScript

```

const handler = createMcpHandler(server, {

  route: "/api/mcp", // Only respond to requests at /api/mcp

});


```

#### authContext

An authentication context object that will be available to MCP tools via [getMcpAuthContext()](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/#authentication-context).

When using the [OAuthProvider](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) from `@cloudflare/workers-oauth-provider`, the authentication context is automatically populated with information from the OAuth flow. You typically don't need to set this manually.

#### transport

A custom `WorkerTransport` instance. If not provided, a new transport is created on every request.

* [  JavaScript ](#tab-panel-5759)
* [  TypeScript ](#tab-panel-5760)

JavaScript

```

import { createMcpHandler, WorkerTransport } from "agents/mcp";


const transport = new WorkerTransport({

  sessionIdGenerator: () => `session-${crypto.randomUUID()}`,

  storage: {

    get: () => myStorage.get("transport-state"),

    set: (state) => myStorage.put("transport-state", state),

  },

});


const handler = createMcpHandler(server, { transport });


```

TypeScript

```

import { createMcpHandler, WorkerTransport } from "agents/mcp";


const transport = new WorkerTransport({

  sessionIdGenerator: () => `session-${crypto.randomUUID()}`,

  storage: {

    get: () => myStorage.get("transport-state"),

    set: (state) => myStorage.put("transport-state", state),

  },

});


const handler = createMcpHandler(server, { transport });


```

## Stateless MCP Servers

Many MCP Servers are stateless, meaning they do not maintain any session state between requests. The `createMcpHandler` function is a lightweight alternative to the `McpAgent` class that can be used to serve an MCP server straight from a Worker. View the [complete example on GitHub ↗](https://github.com/cloudflare/agents/tree/main/examples/mcp-worker).

Breaking change in MCP SDK 1.26.0

**Important:** If you are upgrading from MCP SDK versions before 1.26.0, you must update how you create `McpServer` instances in stateless servers.

MCP SDK 1.26.0 introduces a guard that prevents connecting to a server instance that has already been connected to a transport. This fixes a security vulnerability ([CVE ↗](https://github.com/modelcontextprotocol/typescript-sdk/security/advisories/GHSA-345p-7cg4-v4c7)) where sharing server or transport instances could leak cross-client response data.

**If your stateless MCP server declares `McpServer` or transport instances in the global scope, you must create new instances per request.**

See the [migration guide](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/#migration-guide-for-mcp-sdk-1260) below for details.

* [  JavaScript ](#tab-panel-5779)
* [  TypeScript ](#tab-panel-5780)

JavaScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


function createServer() {

  const server = new McpServer({

    name: "Hello MCP Server",

    version: "1.0.0",

  });


  server.tool(

    "hello",

    "Returns a greeting message",

    { name: z.string().optional() },

    async ({ name }) => {

      return {

        content: [

          {

            text: `Hello, ${name ?? "World"}!`,

            type: "text",

          },

        ],

      };

    },

  );


  return server;

}


export default {

  fetch: async (request, env, ctx) => {

    // Create new server instance per request

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

    name: "Hello MCP Server",

    version: "1.0.0",

  });


  server.tool(

    "hello",

    "Returns a greeting message",

    { name: z.string().optional() },

    async ({ name }) => {

      return {

        content: [

          {

            text: `Hello, ${name ?? "World"}!`,

            type: "text",

          },

        ],

      };

    },

  );


  return server;

}


export default {

  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {

    // Create new server instance per request

    const server = createServer();

    return createMcpHandler(server)(request, env, ctx);

  },

} satisfies ExportedHandler<Env>;


```

Each request to this MCP server creates a new session and server instance. The server does not maintain state between requests. This is the simplest way to implement an MCP server.

## Stateful MCP Servers

For stateful MCP servers that need to maintain session state across multiple requests, you can use the `createMcpHandler` function with a `WorkerTransport` instance directly in an `Agent`. This is useful if you want to make use of advanced client features like elicitation and sampling.

Provide a custom `WorkerTransport` with persistent storage. View the [complete example on GitHub ↗](https://github.com/cloudflare/agents/tree/main/examples/mcp-elicitation).

* [  JavaScript ](#tab-panel-5781)
* [  TypeScript ](#tab-panel-5782)

JavaScript

```

import { Agent } from "agents";

import { createMcpHandler, WorkerTransport } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


const STATE_KEY = "mcp-transport-state";


export class MyStatefulMcpAgent extends Agent {

  server = new McpServer({

    name: "Stateful MCP Server",

    version: "1.0.0",

  });


  transport = new WorkerTransport({

    sessionIdGenerator: () => this.name,

    storage: {

      get: () => {

        return this.ctx.storage.get(STATE_KEY);

      },

      set: (state) => {

        this.ctx.storage.put(STATE_KEY, state);

      },

    },

  });


  async onRequest(request) {

    return createMcpHandler(this.server, {

      transport: this.transport,

    })(request, this.env, this.ctx);

  }

}


```

TypeScript

```

import { Agent } from "agents";

import {

  createMcpHandler,

  WorkerTransport,

  type TransportState,

} from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


const STATE_KEY = "mcp-transport-state";


type State = { counter: number };


export class MyStatefulMcpAgent extends Agent<Env, State> {

  server = new McpServer({

    name: "Stateful MCP Server",

    version: "1.0.0",

  });


  transport = new WorkerTransport({

    sessionIdGenerator: () => this.name,

    storage: {

      get: () => {

        return this.ctx.storage.get<TransportState>(STATE_KEY);

      },

      set: (state: TransportState) => {

        this.ctx.storage.put(STATE_KEY, state);

      },

    },

  });


  async onRequest(request: Request) {

    return createMcpHandler(this.server, {

      transport: this.transport,

    })(request, this.env, this.ctx as unknown as ExecutionContext);

  }

}


```

In this case we are defining the `sessionIdGenerator` to return the Agent name as the session ID. To make sure we route to the correct Agent we can use `getAgentByName` in the Worker handler:

* [  JavaScript ](#tab-panel-5765)
* [  TypeScript ](#tab-panel-5766)

JavaScript

```

import { getAgentByName } from "agents";


export default {

  async fetch(request, env, ctx) {

    // Extract session ID from header or generate a new one

    const sessionId =

      request.headers.get("mcp-session-id") ?? crypto.randomUUID();


    // Get the Agent instance by name/session ID

    const agent = await getAgentByName(env.MyStatefulMcpAgent, sessionId);


    // Route the MCP request to the agent

    return await agent.onRequest(request);

  },

};


```

TypeScript

```

import { getAgentByName } from "agents";


export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    // Extract session ID from header or generate a new one

    const sessionId =

      request.headers.get("mcp-session-id") ?? crypto.randomUUID();


    // Get the Agent instance by name/session ID

    const agent = await getAgentByName(env.MyStatefulMcpAgent, sessionId);


    // Route the MCP request to the agent

    return await agent.onRequest(request);

  },

} satisfies ExportedHandler<Env>;


```

With persistent storage, the transport preserves:

* Session ID across reconnections
* Protocol version negotiation state
* Initialization status

This allows MCP clients to reconnect and resume their session in the event of a connection loss.

## Migration Guide for MCP SDK 1.26.0

The MCP SDK 1.26.0 introduces a breaking change for stateless MCP servers that addresses a critical security vulnerability where responses from one client could leak to another client when using shared server or transport instances.

### Who is affected?

| Server Type                                 | Affected? | Action Required                                |
| ------------------------------------------- | --------- | ---------------------------------------------- |
| Stateful servers using Agent/Durable Object | No        | No changes needed                              |
| Stateless servers using createMcpHandler    | Yes       | Create new McpServer per request               |
| Stateless servers using raw SDK transport   | Yes       | Create new McpServer and transport per request |

### Why is this necessary?

The previous pattern of declaring `McpServer` instances in the global scope allowed responses from one client to leak to another client. This is a security vulnerability. The new SDK version prevents this by throwing an error if you try to connect a server that is already connected.

### Before (broken with SDK 1.26.0)

* [  JavaScript ](#tab-panel-5771)
* [  TypeScript ](#tab-panel-5772)

JavaScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


// INCORRECT: Global server instance

const server = new McpServer({

  name: "Hello MCP Server",

  version: "1.0.0",

});


server.tool("hello", "Returns a greeting", {}, async () => {

  return {

    content: [{ text: "Hello, World!", type: "text" }],

  };

});


export default {

  fetch: async (request, env, ctx) => {

    // This will fail on second request with MCP SDK 1.26.0+

    return createMcpHandler(server)(request, env, ctx);

  },

};


```

TypeScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


// INCORRECT: Global server instance

const server = new McpServer({

  name: "Hello MCP Server",

  version: "1.0.0",

});


server.tool("hello", "Returns a greeting", {}, async () => {

  return {

    content: [{ text: "Hello, World!", type: "text" }],

  };

});


export default {

  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {

    // This will fail on second request with MCP SDK 1.26.0+

    return createMcpHandler(server)(request, env, ctx);

  },

} satisfies ExportedHandler<Env>;


```

### After (correct)

* [  JavaScript ](#tab-panel-5777)
* [  TypeScript ](#tab-panel-5778)

JavaScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


// CORRECT: Factory function to create server instance

function createServer() {

  const server = new McpServer({

    name: "Hello MCP Server",

    version: "1.0.0",

  });


  server.tool("hello", "Returns a greeting", {}, async () => {

    return {

      content: [{ text: "Hello, World!", type: "text" }],

    };

  });


  return server;

}


export default {

  fetch: async (request, env, ctx) => {

    // Create new server instance per request

    const server = createServer();

    return createMcpHandler(server)(request, env, ctx);

  },

};


```

TypeScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


// CORRECT: Factory function to create server instance

function createServer() {

  const server = new McpServer({

    name: "Hello MCP Server",

    version: "1.0.0",

  });


  server.tool("hello", "Returns a greeting", {}, async () => {

    return {

      content: [{ text: "Hello, World!", type: "text" }],

    };

  });


  return server;

}


export default {

  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {

    // Create new server instance per request

    const server = createServer();

    return createMcpHandler(server)(request, env, ctx);

  },

} satisfies ExportedHandler<Env>;


```

### For raw SDK transport users

If you are using the raw SDK transport directly (not via `createMcpHandler`), you must also create new transport instances per request:

* [  JavaScript ](#tab-panel-5775)
* [  TypeScript ](#tab-panel-5776)

JavaScript

```

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";


function createServer() {

  const server = new McpServer({

    name: "Hello MCP Server",

    version: "1.0.0",

  });


  // Register tools...


  return server;

}


export default {

  async fetch(request) {

    // Create new transport and server per request

    const transport = new WebStandardStreamableHTTPServerTransport();

    const server = createServer();

    server.connect(transport);

    return transport.handleRequest(request);

  },

};


```

TypeScript

```

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";


function createServer() {

  const server = new McpServer({

    name: "Hello MCP Server",

    version: "1.0.0",

  });


  // Register tools...


  return server;

}


export default {

  async fetch(request: Request) {

    // Create new transport and server per request

    const transport = new WebStandardStreamableHTTPServerTransport();

    const server = createServer();

    server.connect(transport);

    return transport.handleRequest(request);

  },

} satisfies ExportedHandler<Env>;


```

### WorkerTransport

The `WorkerTransport` class implements the MCP Transport interface, handling HTTP request/response cycles, Server-Sent Events (SSE) streaming, session management, and CORS.

TypeScript

```

class WorkerTransport implements Transport {

  sessionId?: string;

  started: boolean;

  onclose?: () => void;

  onerror?: (error: Error) => void;

  onmessage?: (message: JSONRPCMessage, extra?: MessageExtraInfo) => void;


  constructor(options?: WorkerTransportOptions);


  async handleRequest(

    request: Request,

    parsedBody?: unknown,

  ): Promise<Response>;

  async send(

    message: JSONRPCMessage,

    options?: TransportSendOptions,

  ): Promise<void>;

  async start(): Promise<void>;

  async close(): Promise<void>;

}


```

#### Constructor Options

TypeScript

```

interface WorkerTransportOptions {

  /**

   * Function that generates a unique session ID.

   * Called when a new session is initialized.

   */

  sessionIdGenerator?: () => string;


  /**

   * Enable traditional Request/Response mode, disabling streaming.

   * When true, responses are returned as JSON instead of SSE streams.

   * @default false

   */

  enableJsonResponse?: boolean;


  /**

   * Callback invoked when a session is initialized.

   * Receives the generated or restored session ID.

   */

  onsessioninitialized?: (sessionId: string) => void;


  /**

   * CORS configuration for cross-origin requests.

   * Configures Access-Control-* headers.

   */

  corsOptions?: CORSOptions;


  /**

   * Optional storage API for persisting transport state.

   * Use this to store session state in Durable Object/Agent storage

   * so it survives hibernation/restart.

   */

  storage?: MCPStorageApi;

}


```

#### sessionIdGenerator

Provides a custom session identifier. This session identifier is used to identify the session in the MCP Client.

* [  JavaScript ](#tab-panel-5761)
* [  TypeScript ](#tab-panel-5762)

JavaScript

```

const transport = new WorkerTransport({

  sessionIdGenerator: () => `user-${Date.now()}-${Math.random()}`,

});


```

TypeScript

```

const transport = new WorkerTransport({

  sessionIdGenerator: () => `user-${Date.now()}-${Math.random()}`,

});


```

#### enableJsonResponse

Disables SSE streaming and returns responses as standard JSON.

* [  JavaScript ](#tab-panel-5763)
* [  TypeScript ](#tab-panel-5764)

JavaScript

```

const transport = new WorkerTransport({

  enableJsonResponse: true, // Disable streaming, return JSON responses

});


```

TypeScript

```

const transport = new WorkerTransport({

  enableJsonResponse: true, // Disable streaming, return JSON responses

});


```

#### onsessioninitialized

A callback that fires when a session is initialized, either by creating a new session or restoring from storage.

* [  JavaScript ](#tab-panel-5767)
* [  TypeScript ](#tab-panel-5768)

JavaScript

```

const transport = new WorkerTransport({

  onsessioninitialized: (sessionId) => {

    console.log(`MCP session initialized: ${sessionId}`);

  },

});


```

TypeScript

```

const transport = new WorkerTransport({

  onsessioninitialized: (sessionId) => {

    console.log(`MCP session initialized: ${sessionId}`);

  },

});


```

#### corsOptions

Configure CORS headers for cross-origin requests.

TypeScript

```

interface CORSOptions {

  origin?: string;

  methods?: string;

  headers?: string;

  maxAge?: number;

  exposeHeaders?: string;

}


```

* [  JavaScript ](#tab-panel-5769)
* [  TypeScript ](#tab-panel-5770)

JavaScript

```

const transport = new WorkerTransport({

  corsOptions: {

    origin: "https://example.com",

    methods: "GET, POST, OPTIONS",

    headers: "Content-Type, Authorization",

    maxAge: 86400,

  },

});


```

TypeScript

```

const transport = new WorkerTransport({

  corsOptions: {

    origin: "https://example.com",

    methods: "GET, POST, OPTIONS",

    headers: "Content-Type, Authorization",

    maxAge: 86400,

  },

});


```

#### storage

Persist transport state to survive Durable Object hibernation or restarts.

TypeScript

```

interface MCPStorageApi {

  get(): Promise<TransportState | undefined> | TransportState | undefined;

  set(state: TransportState): Promise<void> | void;

}


interface TransportState {

  sessionId?: string;

  initialized: boolean;

  protocolVersion?: ProtocolVersion;

}


```

* [  JavaScript ](#tab-panel-5773)
* [  TypeScript ](#tab-panel-5774)

JavaScript

```

// Inside an Agent or Durable Object class method:

const transport = new WorkerTransport({

  storage: {

    get: async () => {

      return await this.ctx.storage.get("mcp-state");

    },

    set: async (state) => {

      await this.ctx.storage.put("mcp-state", state);

    },

  },

});


```

TypeScript

```

// Inside an Agent or Durable Object class method:

const transport = new WorkerTransport({

  storage: {

    get: async () => {

      return await this.ctx.storage.get<TransportState>("mcp-state");

    },

    set: async (state) => {

      await this.ctx.storage.put("mcp-state", state);

    },

  },

});


```

## Authentication Context

When using [OAuth authentication](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) with `createMcpHandler`, user information is made available to your MCP tools through `getMcpAuthContext()`. Under the hood this uses `AsyncLocalStorage` to pass the request to the tool handler, keeping the authentication context available.

TypeScript

```

interface McpAuthContext {

  props: Record<string, unknown>;

}


```

### getMcpAuthContext

Retrieve the current authentication context within an MCP tool handler. This returns user information that was populated by the OAuth provider. Note that if using `McpAgent`, this information is accessible directly on `this.props` instead.

TypeScript

```

import { getMcpAuthContext } from "agents/mcp";


function getMcpAuthContext(): McpAuthContext | undefined;


```

* [  JavaScript ](#tab-panel-5785)
* [  TypeScript ](#tab-panel-5786)

JavaScript

```

import { getMcpAuthContext } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


function createServer() {

  const server = new McpServer({ name: "Auth Server", version: "1.0.0" });


  server.tool("getProfile", "Get the current user's profile", {}, async () => {

    const auth = getMcpAuthContext();

    const username = auth?.props?.username;

    const email = auth?.props?.email;


    return {

      content: [

        {

          type: "text",

          text: `User: ${username ?? "anonymous"}, Email: ${email ?? "none"}`,

        },

      ],

    };

  });


  return server;

}


```

TypeScript

```

import { getMcpAuthContext } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


function createServer() {

  const server = new McpServer({ name: "Auth Server", version: "1.0.0" });


  server.tool("getProfile", "Get the current user's profile", {}, async () => {

    const auth = getMcpAuthContext();

    const username = auth?.props?.username as string | undefined;

    const email = auth?.props?.email as string | undefined;


    return {

      content: [

        {

          type: "text",

          text: `User: ${username ?? "anonymous"}, Email: ${email ?? "none"}`,

        },

      ],

    };

  });


  return server;

}


```

Note

For a complete guide on setting up OAuth authentication with MCP servers, see the [MCP Authorization documentation](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/). View the [complete authenticated MCP server in a Worker example on GitHub ↗](https://github.com/cloudflare/agents/tree/main/examples/mcp-worker-authenticated).

## Error Handling

The `createMcpHandler` automatically catches errors and returns JSON-RPC error responses with code `-32603` (Internal error).

* [  JavaScript ](#tab-panel-5783)
* [  TypeScript ](#tab-panel-5784)

JavaScript

```

server.tool("riskyOperation", "An operation that might fail", {}, async () => {

  if (Math.random() > 0.5) {

    throw new Error("Random failure occurred");

  }

  return {

    content: [{ type: "text", text: "Success!" }],

  };

});


// Errors are automatically caught and returned as:

// {

//   "jsonrpc": "2.0",

//   "error": {

//     "code": -32603,

//     "message": "Random failure occurred"

//   },

//   "id": <request_id>

// }


```

TypeScript

```

server.tool("riskyOperation", "An operation that might fail", {}, async () => {

  if (Math.random() > 0.5) {

    throw new Error("Random failure occurred");

  }

  return {

    content: [{ type: "text", text: "Success!" }],

  };

});


// Errors are automatically caught and returned as:

// {

//   "jsonrpc": "2.0",

//   "error": {

//     "code": -32603,

//     "message": "Random failure occurred"

//   },

//   "id": <request_id>

// }


```

## Related Resources

[ Building MCP Servers ](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) Build and deploy MCP servers on Cloudflare. 

[ MCP Tools ](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/) Add tools to your MCP server. 

[ MCP Authorization ](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) Authenticate users with OAuth. 

[ McpAgent API ](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/) Build stateful MCP servers. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/#page","headline":"createMcpHandler · Cloudflare Agents docs","description":"Create a stateless MCP server fetch handler for a plain Worker using createMcpHandler and streamable HTTP transport.","url":"https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/apis/","name":"APIs"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/apis/handler-api/","name":"createMcpHandler"}}]}
```
