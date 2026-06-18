---
title: Routing
description: Route HTTP and WebSocket requests to Agents SDK instances using routeAgentRequest() and getAgentByName().
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Routing

This guide explains how requests are routed to agents, how naming works, and patterns for organizing your agents.

## How routing works

When a request comes in, `routeAgentRequest()` examines the URL and routes it to the appropriate agent instance:

```

https://your-worker.dev/agents/{agent-name}/{instance-name}

                               └────┬────┘   └─────┬─────┘

                               Class name     Unique instance ID

                              (kebab-case)


```

**Example URLs:**

| URL                      | Agent Class | Instance |
| ------------------------ | ----------- | -------- |
| /agents/counter/user-123 | Counter     | user-123 |
| /agents/chat-room/lobby  | ChatRoom    | lobby    |
| /agents/my-agent/default | MyAgent     | default  |

## Name resolution

Agent class names are automatically converted to kebab-case for URLs:

| Class Name  | URL Path                 |
| ----------- | ------------------------ |
| Counter     | /agents/counter/...      |
| MyAgent     | /agents/my-agent/...     |
| ChatRoom    | /agents/chat-room/...    |
| AIAssistant | /agents/ai-assistant/... |

The router matches both the original name and kebab-case version, so you can use either:

* `useAgent({ agent: "Counter" })` → `/agents/counter/...`
* `useAgent({ agent: "counter" })` → `/agents/counter/...`

## Using routeAgentRequest()

The `routeAgentRequest()` function is the main entry point for agent routing:

* [  JavaScript ](#tab-panel-5935)
* [  TypeScript ](#tab-panel-5936)

JavaScript

```

import { routeAgentRequest } from "agents";


export default {

  async fetch(request, env, ctx) {

    // Route to agents - returns Response or undefined

    const agentResponse = await routeAgentRequest(request, env);


    if (agentResponse) {

      return agentResponse;

    }


    // No agent matched - handle other routes

    return new Response("Not found", { status: 404 });

  },

};


```

TypeScript

```

import { routeAgentRequest } from "agents";


export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    // Route to agents - returns Response or undefined

    const agentResponse = await routeAgentRequest(request, env);


    if (agentResponse) {

      return agentResponse;

    }


    // No agent matched - handle other routes

    return new Response("Not found", { status: 404 });

  },

} satisfies ExportedHandler<Env>;


```

## Instance naming patterns

The instance name (the last part of the URL) determines which agent instance handles the request. Each unique name gets its own isolated agent with its own state.

### Per-user agents

Each user gets their own agent instance:

* [  JavaScript ](#tab-panel-5929)
* [  TypeScript ](#tab-panel-5930)

JavaScript

```

// Client

const agent = useAgent({

  agent: "UserProfile",

  name: `user-${userId}`, // e.g., "user-abc123"

});


```

TypeScript

```

// Client

const agent = useAgent({

  agent: "UserProfile",

  name: `user-${userId}`, // e.g., "user-abc123"

});


```

```

/agents/user-profile/user-abc123 → User abc123's agent

/agents/user-profile/user-xyz789 → User xyz789's agent (separate instance)


```

### Shared rooms

Multiple users share the same agent instance:

* [  JavaScript ](#tab-panel-5931)
* [  TypeScript ](#tab-panel-5932)

JavaScript

```

// Client

const agent = useAgent({

  agent: "ChatRoom",

  name: roomId, // e.g., "general" or "room-42"

});


```

TypeScript

```

// Client

const agent = useAgent({

  agent: "ChatRoom",

  name: roomId, // e.g., "general" or "room-42"

});


```

```

/agents/chat-room/general → All users in "general" share this agent


```

### Global singleton

A single instance for the entire application:

* [  JavaScript ](#tab-panel-5933)
* [  TypeScript ](#tab-panel-5934)

JavaScript

```

// Client

const agent = useAgent({

  agent: "AppConfig",

  name: "default", // Or any consistent name

});


```

TypeScript

```

// Client

const agent = useAgent({

  agent: "AppConfig",

  name: "default", // Or any consistent name

});


```

### Dynamic naming

Generate instance names based on context:

* [  JavaScript ](#tab-panel-5939)
* [  TypeScript ](#tab-panel-5940)

JavaScript

```

// Per-session

const agent = useAgent({

  agent: "Session",

  name: sessionId,

});


// Per-document

const agent = useAgent({

  agent: "Document",

  name: `doc-${documentId}`,

});


// Per-game

const agent = useAgent({

  agent: "Game",

  name: `game-${gameId}-${Date.now()}`,

});


```

TypeScript

```

// Per-session

const agent = useAgent({

  agent: "Session",

  name: sessionId,

});


// Per-document

const agent = useAgent({

  agent: "Document",

  name: `doc-${documentId}`,

});


// Per-game

const agent = useAgent({

  agent: "Game",

  name: `game-${gameId}-${Date.now()}`,

});


```

## Custom URL routing

For advanced use cases where you need control over the URL structure, you can bypass the default `/agents/{agent}/{name}` pattern.

### Using basePath (client-side)

The `basePath` option lets clients connect to any URL path:

* [  JavaScript ](#tab-panel-5937)
* [  TypeScript ](#tab-panel-5938)

JavaScript

```

// Client connects to /user instead of /agents/user-agent/...

const agent = useAgent({

  agent: "UserAgent", // Required but ignored when basePath is set

  basePath: "user", // → connects to /user

});


```

TypeScript

```

// Client connects to /user instead of /agents/user-agent/...

const agent = useAgent({

  agent: "UserAgent", // Required but ignored when basePath is set

  basePath: "user", // → connects to /user

});


```

This is useful when:

* You want clean URLs without the `/agents/` prefix
* The instance name is determined server-side (for example, from auth/session)
* You are integrating with an existing URL structure

### Server-side instance selection

When using `basePath`, the server must handle routing. Use `getAgentByName()` to get the agent instance, then forward the request with `fetch()`:

* [  JavaScript ](#tab-panel-5949)
* [  TypeScript ](#tab-panel-5950)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // Custom routing - server determines instance from session

    if (url.pathname.startsWith("/user/")) {

      const session = await getSession(request);

      const agent = await getAgentByName(env.UserAgent, session.userId);

      return agent.fetch(request); // Forward request directly to agent

    }


    // Default routing for standard /agents/... paths

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);


    // Custom routing - server determines instance from session

    if (url.pathname.startsWith("/user/")) {

      const session = await getSession(request);

      const agent = await getAgentByName(env.UserAgent, session.userId);

      return agent.fetch(request); // Forward request directly to agent

    }


    // Default routing for standard /agents/... paths

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

### Custom path with dynamic instance

Route different paths to different instances:

* [  JavaScript ](#tab-panel-5943)
* [  TypeScript ](#tab-panel-5944)

JavaScript

```

// Route /chat/{room} to ChatRoom agent

if (url.pathname.startsWith("/chat/")) {

  const roomId = url.pathname.replace("/chat/", "");

  const agent = await getAgentByName(env.ChatRoom, roomId);

  return agent.fetch(request);

}


// Route /doc/{id} to Document agent

if (url.pathname.startsWith("/doc/")) {

  const docId = url.pathname.replace("/doc/", "");

  const agent = await getAgentByName(env.Document, docId);

  return agent.fetch(request);

}


```

TypeScript

```

// Route /chat/{room} to ChatRoom agent

if (url.pathname.startsWith("/chat/")) {

  const roomId = url.pathname.replace("/chat/", "");

  const agent = await getAgentByName(env.ChatRoom, roomId);

  return agent.fetch(request);

}


// Route /doc/{id} to Document agent

if (url.pathname.startsWith("/doc/")) {

  const docId = url.pathname.replace("/doc/", "");

  const agent = await getAgentByName(env.Document, docId);

  return agent.fetch(request);

}


```

### Receiving the instance identity (client-side)

When using `basePath`, the client does not know which instance it connected to until the server returns this information. The agent automatically sends its identity on connection:

* [  JavaScript ](#tab-panel-5951)
* [  TypeScript ](#tab-panel-5952)

JavaScript

```

const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentity: (name, agentType) => {

    console.log(`Connected to ${agentType} instance: ${name}`);

    // e.g., "Connected to user-agent instance: user-123"

  },

});


// Reactive state - re-renders when identity is received

return (

  <div>

    {agent.identified ? `Connected to: ${agent.name}` : "Connecting..."}

  </div>

);


```

TypeScript

```

const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentity: (name, agentType) => {

    console.log(`Connected to ${agentType} instance: ${name}`);

    // e.g., "Connected to user-agent instance: user-123"

  },

});


// Reactive state - re-renders when identity is received

return (

  <div>

    {agent.identified ? `Connected to: ${agent.name}` : "Connecting..."}

  </div>

);


```

For `AgentClient`:

* [  JavaScript ](#tab-panel-5953)
* [  TypeScript ](#tab-panel-5954)

JavaScript

```

const agent = new AgentClient({

  agent: "UserAgent",

  basePath: "user",

  host: "example.com",

  onIdentity: (name, agentType) => {

    // Update UI with actual instance name

    setInstanceName(name);

  },

});


// Wait for identity before proceeding

await agent.ready;

console.log(agent.name); // Now has the server-determined name


```

TypeScript

```

const agent = new AgentClient({

  agent: "UserAgent",

  basePath: "user",

  host: "example.com",

  onIdentity: (name, agentType) => {

    // Update UI with actual instance name

    setInstanceName(name);

  },

});


// Wait for identity before proceeding

await agent.ready;

console.log(agent.name); // Now has the server-determined name


```

### Handling identity changes on reconnect

If the identity changes on reconnect (for example, session expired and user logs in as someone else), you can handle it with `onIdentityChange`:

* [  JavaScript ](#tab-panel-5947)
* [  TypeScript ](#tab-panel-5948)

JavaScript

```

const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentityChange: (oldName, newName, oldAgent, newAgent) => {

    console.log(`Session changed: ${oldName} → ${newName}`);

    // Refresh state, show notification, etc.

  },

});


```

TypeScript

```

const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentityChange: (oldName, newName, oldAgent, newAgent) => {

    console.log(`Session changed: ${oldName} → ${newName}`);

    // Refresh state, show notification, etc.

  },

});


```

If `onIdentityChange` is not provided and identity changes, a warning is logged to help catch unexpected session changes.

### Disabling identity for security

If your instance names contain sensitive data (session IDs, internal user IDs), you can disable identity sending:

* [  JavaScript ](#tab-panel-5941)
* [  TypeScript ](#tab-panel-5942)

JavaScript

```

class SecureAgent extends Agent {

  // Do not expose instance names to clients

  static options = { sendIdentityOnConnect: false };

}


```

TypeScript

```

class SecureAgent extends Agent {

  // Do not expose instance names to clients

  static options = { sendIdentityOnConnect: false };

}


```

When identity is disabled:

* `agent.identified` stays `false`
* `agent.ready` never resolves (use state updates instead)
* `onIdentity` and `onIdentityChange` are never called

### When to use custom routing

| Scenario                        | Approach                            |
| ------------------------------- | ----------------------------------- |
| Standard agent access           | Default /agents/{agent}/{name}      |
| Instance from auth/session      | basePath \+ getAgentByName \+ fetch |
| Clean URLs (no /agents/ prefix) | basePath \+ custom routing          |
| Legacy URL structure            | basePath \+ custom routing          |
| Complex routing logic           | Custom routing in Worker            |

## Routing options

Both `routeAgentRequest()` and `getAgentByName()` accept options for customizing routing behavior.

### CORS

For cross-origin requests (common when your frontend is on a different domain):

* [  JavaScript ](#tab-panel-5945)
* [  TypeScript ](#tab-panel-5946)

JavaScript

```

const response = await routeAgentRequest(request, env, {

  cors: true, // Enable default CORS headers

});


```

TypeScript

```

const response = await routeAgentRequest(request, env, {

  cors: true, // Enable default CORS headers

});


```

Or with custom CORS headers:

* [  JavaScript ](#tab-panel-5955)
* [  TypeScript ](#tab-panel-5956)

JavaScript

```

const response = await routeAgentRequest(request, env, {

  cors: {

    "Access-Control-Allow-Origin": "https://myapp.com",

    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",

    "Access-Control-Allow-Headers": "Content-Type, Authorization",

  },

});


```

TypeScript

```

const response = await routeAgentRequest(request, env, {

  cors: {

    "Access-Control-Allow-Origin": "https://myapp.com",

    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",

    "Access-Control-Allow-Headers": "Content-Type, Authorization",

  },

});


```

### Location hints

For latency-sensitive applications, hint where the agent should run:

* [  JavaScript ](#tab-panel-5957)
* [  TypeScript ](#tab-panel-5958)

JavaScript

```

// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  locationHint: "enam", // Eastern North America

});


// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  locationHint: "enam",

});


```

TypeScript

```

// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  locationHint: "enam", // Eastern North America

});


// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  locationHint: "enam",

});


```

Available location hints: `wnam`, `enam`, `sam`, `weur`, `eeur`, `apac`, `oc`, `afr`, `me`

### Jurisdiction

For data residency requirements:

* [  JavaScript ](#tab-panel-5961)
* [  TypeScript ](#tab-panel-5962)

JavaScript

```

// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  jurisdiction: "eu", // EU jurisdiction

});


// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  jurisdiction: "eu",

});


```

TypeScript

```

// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  jurisdiction: "eu", // EU jurisdiction

});


// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  jurisdiction: "eu",

});


```

### Props

Since agents are instantiated by the runtime rather than constructed directly, `props` provides a way to pass initialization arguments:

* [  JavaScript ](#tab-panel-5959)
* [  TypeScript ](#tab-panel-5960)

JavaScript

```

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  props: {

    userId: session.userId,

    config: { maxRetries: 3 },

  },

});


```

TypeScript

```

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  props: {

    userId: session.userId,

    config: { maxRetries: 3 },

  },

});


```

Props are passed to the agent's `onStart` lifecycle method:

* [  JavaScript ](#tab-panel-5963)
* [  TypeScript ](#tab-panel-5964)

JavaScript

```

class MyAgent extends Agent {

  userId;

  config;


  async onStart(props) {

    this.userId = props?.userId;

    this.config = props?.config;

  }

}


```

TypeScript

```

class MyAgent extends Agent<Env, State> {

  private userId?: string;

  private config?: { maxRetries: number };


  async onStart(props?: { userId: string; config: { maxRetries: number } }) {

    this.userId = props?.userId;

    this.config = props?.config;

  }

}


```

When using `props` with `routeAgentRequest`, the same props are passed to whichever agent matches the URL. This works well for universal context like authentication:

* [  JavaScript ](#tab-panel-5967)
* [  TypeScript ](#tab-panel-5968)

JavaScript

```

export default {

  async fetch(request, env) {

    const session = await getSession(request);

    return routeAgentRequest(request, env, {

      props: { userId: session.userId, role: session.role },

    });

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const session = await getSession(request);

    return routeAgentRequest(request, env, {

      props: { userId: session.userId, role: session.role },

    });

  },

} satisfies ExportedHandler<Env>;


```

For agent-specific initialization, use `getAgentByName` instead where you control exactly which agent receives the props.

Note

For `McpAgent`, props are automatically stored and accessible via `this.props`. Refer to [MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/) for details.

### Routing retry

Use `routingRetry` with `getAgentByName()` when server-side code should retry transient Durable Object routing failures:

* [  JavaScript ](#tab-panel-5965)
* [  TypeScript ](#tab-panel-5966)

JavaScript

```

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  routingRetry: {

    maxAttempts: 3,

  },

});


```

TypeScript

```

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  routingRetry: {

    maxAttempts: 3,

  },

});


```

This option is useful for request forwarding and RPC paths where a short-lived routing failure should be retried before returning an error to the caller.

### Hooks

`routeAgentRequest` supports hooks for intercepting requests before they reach agents:

* [  JavaScript ](#tab-panel-5969)
* [  TypeScript ](#tab-panel-5970)

JavaScript

```

const response = await routeAgentRequest(request, env, {

  onBeforeConnect: (req, lobby) => {

    // Called before WebSocket connections

    // Return a Response to reject, Request to modify, or void to continue

  },

  onBeforeRequest: (req, lobby) => {

    // Called before HTTP requests

    // Return a Response to reject, Request to modify, or void to continue

  },

});


```

TypeScript

```

const response = await routeAgentRequest(request, env, {

  onBeforeConnect: (req, lobby) => {

    // Called before WebSocket connections

    // Return a Response to reject, Request to modify, or void to continue

  },

  onBeforeRequest: (req, lobby) => {

    // Called before HTTP requests

    // Return a Response to reject, Request to modify, or void to continue

  },

});


```

These hooks are useful for authentication and validation. Refer to [Cross-domain authentication](https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/) for detailed examples.

## Server-side agent access

You can access agents from your Worker code using `getAgentByName()` for RPC calls:

* [  JavaScript ](#tab-panel-5975)
* [  TypeScript ](#tab-panel-5976)

JavaScript

```

import { getAgentByName, routeAgentRequest } from "agents";


export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // API endpoint that interacts with an agent

    if (url.pathname === "/api/increment") {

      const counter = await getAgentByName(env.Counter, "global-counter");

      const newCount = await counter.increment();

      return Response.json({ count: newCount });

    }


    // Regular agent routing

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { getAgentByName, routeAgentRequest } from "agents";


export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);


    // API endpoint that interacts with an agent

    if (url.pathname === "/api/increment") {

      const counter = await getAgentByName(env.Counter, "global-counter");

      const newCount = await counter.increment();

      return Response.json({ count: newCount });

    }


    // Regular agent routing

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

For options like `locationHint`, `jurisdiction`, and `props`, refer to [Routing options](#routing-options).

## Sub-paths and HTTP methods

Requests can include sub-paths after the instance name. These are passed to your agent's `onRequest()` handler:

```

/agents/api/v1/users     → agent: "api", instance: "v1", path: "/users"

/agents/api/v1/users/123 → agent: "api", instance: "v1", path: "/users/123"


```

Handle sub-paths in your agent:

* [  JavaScript ](#tab-panel-5977)
* [  TypeScript ](#tab-panel-5978)

JavaScript

```

export class API extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);


    // url.pathname contains the full path including /agents/api/v1/...

    // Extract the sub-path after your agent's base path

    const path = url.pathname.replace(/^\/agents\/api\/[^/]+/, "");


    if (request.method === "GET" && path === "/users") {

      return Response.json(await this.getUsers());

    }


    if (request.method === "POST" && path === "/users") {

      const data = await request.json();

      return Response.json(await this.createUser(data));

    }


    return new Response("Not found", { status: 404 });

  }

}


```

TypeScript

```

export class API extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);


    // url.pathname contains the full path including /agents/api/v1/...

    // Extract the sub-path after your agent's base path

    const path = url.pathname.replace(/^\/agents\/api\/[^/]+/, "");


    if (request.method === "GET" && path === "/users") {

      return Response.json(await this.getUsers());

    }


    if (request.method === "POST" && path === "/users") {

      const data = await request.json();

      return Response.json(await this.createUser(data));

    }


    return new Response("Not found", { status: 404 });

  }

}


```

## Multiple agents

You can have multiple agent classes in one project. Each gets its own namespace:

* [  JavaScript ](#tab-panel-5973)
* [  TypeScript ](#tab-panel-5974)

JavaScript

```

// server.ts

export { Counter } from "./agents/counter";

export { ChatRoom } from "./agents/chat-room";

export { UserProfile } from "./agents/user-profile";


export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

// server.ts

export { Counter } from "./agents/counter";

export { ChatRoom } from "./agents/chat-room";

export { UserProfile } from "./agents/user-profile";


export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

* [  wrangler.jsonc ](#tab-panel-5927)
* [  wrangler.toml ](#tab-panel-5928)

JSONC

```

{

  "durable_objects": {

    "bindings": [

      { "name": "Counter", "class_name": "Counter" },

      { "name": "ChatRoom", "class_name": "ChatRoom" },

      { "name": "UserProfile", "class_name": "UserProfile" },

    ],

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["Counter", "ChatRoom", "UserProfile"],

    },

  ],

}


```

TOML

```

[[durable_objects.bindings]]

name = "Counter"

class_name = "Counter"


[[durable_objects.bindings]]

name = "ChatRoom"

class_name = "ChatRoom"


[[durable_objects.bindings]]

name = "UserProfile"

class_name = "UserProfile"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "Counter", "ChatRoom", "UserProfile" ]


```

Each agent is accessed via its own path:

```

/agents/counter/...

/agents/chat-room/...

/agents/user-profile/...


```

## Request flow

Here is how a request flows through the system:

flowchart TD
    A["HTTP Request<br/>or WebSocket"] --> B["routeAgentRequest<br/>Parse URL path"]
    B --> C["Find binding in<br/>env by name"]
    C --> D["Get/create DO<br/>by instance ID"]
    D --> E["Agent Instance"]
    E --> F{"Protocol?"}
    F -->|WebSocket| G["onConnect(), onMessage"]
    F -->|HTTP| H["onRequest()"]

## Routing with authentication

There are several ways to authenticate requests before they reach your agent.

### Using authentication hooks

The `routeAgentRequest()` function provides `onBeforeConnect` and `onBeforeRequest` hooks for authentication:

* [  JavaScript ](#tab-panel-5983)
* [  TypeScript ](#tab-panel-5984)

JavaScript

```

import { Agent, routeAgentRequest } from "agents";


export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env, {

        // Run before WebSocket connections

        onBeforeConnect: async (request) => {

          const token = new URL(request.url).searchParams.get("token");

          if (!(await verifyToken(token, env))) {

            // Return a response to reject the connection

            return new Response("Unauthorized", { status: 401 });

          }

          // Return nothing to allow the connection

        },

        // Run before HTTP requests

        onBeforeRequest: async (request) => {

          const auth = request.headers.get("Authorization");

          if (!auth || !(await verifyAuth(auth, env))) {

            return new Response("Unauthorized", { status: 401 });

          }

        },

        // Optional: prepend a prefix to agent instance names

        prefix: "user-",

      })) ?? new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Agent, routeAgentRequest } from "agents";


export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env, {

        // Run before WebSocket connections

        onBeforeConnect: async (request) => {

          const token = new URL(request.url).searchParams.get("token");

          if (!(await verifyToken(token, env))) {

            // Return a response to reject the connection

            return new Response("Unauthorized", { status: 401 });

          }

          // Return nothing to allow the connection

        },

        // Run before HTTP requests

        onBeforeRequest: async (request) => {

          const auth = request.headers.get("Authorization");

          if (!auth || !(await verifyAuth(auth, env))) {

            return new Response("Unauthorized", { status: 401 });

          }

        },

        // Optional: prepend a prefix to agent instance names

        prefix: "user-",

      })) ?? new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

### Manual authentication

Check authentication before calling `routeAgentRequest()`:

* [  JavaScript ](#tab-panel-5979)
* [  TypeScript ](#tab-panel-5980)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // Protect agent routes

    if (url.pathname.startsWith("/agents/")) {

      const user = await authenticate(request, env);

      if (!user) {

        return new Response("Unauthorized", { status: 401 });

      }


      // Optionally, enforce that users can only access their own agents

      const instanceName = url.pathname.split("/")[3];

      if (instanceName !== `user-${user.id}`) {

        return new Response("Forbidden", { status: 403 });

      }

    }


    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);


    // Protect agent routes

    if (url.pathname.startsWith("/agents/")) {

      const user = await authenticate(request, env);

      if (!user) {

        return new Response("Unauthorized", { status: 401 });

      }


      // Optionally, enforce that users can only access their own agents

      const instanceName = url.pathname.split("/")[3];

      if (instanceName !== `user-${user.id}`) {

        return new Response("Forbidden", { status: 403 });

      }

    }


    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

### Using a framework (Hono)

If you are using a framework like [Hono ↗](https://hono.dev/), authenticate in middleware before calling the agent:

* [  JavaScript ](#tab-panel-5981)
* [  TypeScript ](#tab-panel-5982)

JavaScript

```

import { Agent, getAgentByName } from "agents";

import { Hono } from "hono";


const app = new Hono();


// Authentication middleware

app.use("/agents/*", async (c, next) => {

  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token, c.env))) {

    return c.json({ error: "Unauthorized" }, 401);

  }

  await next();

});


// Route to a specific agent

app.all("/agents/code-review/:id/*", async (c) => {

  const id = c.req.param("id");

  const agent = await getAgentByName(c.env.CodeReviewAgent, id);

  return agent.fetch(c.req.raw);

});


export default app;


```

TypeScript

```

import { Agent, getAgentByName } from "agents";

import { Hono } from "hono";


const app = new Hono<{ Bindings: Env }>();


// Authentication middleware

app.use("/agents/*", async (c, next) => {

  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token, c.env))) {

    return c.json({ error: "Unauthorized" }, 401);

  }

  await next();

});


// Route to a specific agent

app.all("/agents/code-review/:id/*", async (c) => {

  const id = c.req.param("id");

  const agent = await getAgentByName(c.env.CodeReviewAgent, id);

  return agent.fetch(c.req.raw);

});


export default app;


```

For WebSocket authentication patterns (tokens in URLs, JWT refresh), refer to [Cross-domain authentication](https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/).

## Troubleshooting

### Agent namespace not found

The error message lists available agents. Check:

1. Agent class is exported from your entry point.
2. Class name in code matches `class_name` in `wrangler.jsonc`.
3. URL uses correct kebab-case name.

### Request returns 404

1. Verify the URL pattern: `/agents/{agent-name}/{instance-name}`.
2. Check that `routeAgentRequest()` is called before your 404 handler.
3. Ensure the response from `routeAgentRequest()` is returned (not just called).

### WebSocket connection fails

1. Do not modify the response from `routeAgentRequest()` for WebSocket upgrades.
2. Ensure CORS is enabled if connecting from a different origin.
3. Check browser dev tools for the actual error.

### `basePath` not working

1. Ensure your Worker handles the custom path and forwards to the agent.
2. Use `getAgentByName()` \+ `agent.fetch(request)` to forward requests.
3. The `agent` parameter is still required but ignored when `basePath` is set.
4. Check that the server-side route matches the client's `basePath`.

## API reference

### `routeAgentRequest(request, env, options?)`

Routes a request to the appropriate agent.

| Parameter               | Type                    | Description                                     |
| ----------------------- | ----------------------- | ----------------------------------------------- |
| request                 | Request                 | The incoming request                            |
| env                     | Env                     | Environment with agent bindings                 |
| options.cors            | boolean \| HeadersInit  | Enable CORS headers                             |
| options.props           | Record<string, unknown> | Props passed to whichever agent handles request |
| options.locationHint    | string                  | Preferred location for agent instances          |
| options.jurisdiction    | string                  | Data jurisdiction for agent instances           |
| options.onBeforeConnect | Function                | Callback before WebSocket connections           |
| options.onBeforeRequest | Function                | Callback before HTTP requests                   |

**Returns:** `Promise<Response | undefined>` \- Response if matched, undefined if no agent route.

### `getAgentByName(namespace, name, options?)`

Get an agent instance by name for server-side RPC or request forwarding.

| Parameter            | Type                      | Description                                                       |
| -------------------- | ------------------------- | ----------------------------------------------------------------- |
| namespace            | DurableObjectNamespace<T> | Agent binding from env                                            |
| name                 | string                    | Instance name                                                     |
| options.locationHint | string                    | Preferred location                                                |
| options.jurisdiction | string                    | Data jurisdiction                                                 |
| options.props        | Record<string, unknown>   | Initialization properties for onStart                             |
| options.routingRetry | object                    | Retry configuration for transient Durable Object routing failures |

**Returns:** `Promise<DurableObjectStub<T>>` \- Typed stub for calling agent methods or forwarding requests.

### `useAgent(options)` / `AgentClient` options

Client connection options for custom routing:

| Option           | Type                                           | Description                                          |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------- |
| agent            | string                                         | Agent class name (required)                          |
| name             | string                                         | Instance name (default: "default")                   |
| basePath         | string                                         | Full URL path - bypasses agent/name URL construction |
| path             | string                                         | Additional path to append to the URL                 |
| onIdentity       | (name, agent) => void                          | Called when server sends identity                    |
| onIdentityChange | (oldName, newName, oldAgent, newAgent) => void | Called when identity changes on reconnect            |

**Return value properties (React hook):**

| Property   | Type          | Description                                   |
| ---------- | ------------- | --------------------------------------------- |
| name       | string        | Current instance name (reactive)              |
| agent      | string        | Current agent class name (reactive)           |
| identified | boolean       | Whether identity has been received (reactive) |
| ready      | Promise<void> | Resolves when identity is received            |

### `Agent.options` (server)

Static options for agent configuration:

| Option                     | Type    | Default | Description                                          |
| -------------------------- | ------- | ------- | ---------------------------------------------------- |
| hibernate                  | boolean | true    | Whether the agent should hibernate when inactive     |
| sendIdentityOnConnect      | boolean | true    | Whether to send identity to clients on connect       |
| hungScheduleTimeoutSeconds | number  | 30      | Timeout before a running schedule is considered hung |

* [  JavaScript ](#tab-panel-5971)
* [  TypeScript ](#tab-panel-5972)

JavaScript

```

class SecureAgent extends Agent {

  static options = { sendIdentityOnConnect: false };

}


```

TypeScript

```

class SecureAgent extends Agent {

  static options = { sendIdentityOnConnect: false };

}


```

## Next steps

[ Client SDK ](https://developers.cloudflare.com/agents/communication-channels/chat/client-sdk/) Connect from browsers with useAgent and AgentClient. 

[ Cross-domain authentication ](https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/) WebSocket authentication patterns. 

[ Callable methods ](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/) RPC from clients over WebSocket. 

[ Configuration ](https://developers.cloudflare.com/agents/runtime/operations/configuration/) Set up agent bindings in wrangler.jsonc. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/communication/routing/#page","headline":"Routing · Cloudflare Agents docs","description":"Route HTTP and WebSocket requests to Agents SDK instances using routeAgentRequest() and getAgentByName().","url":"https://developers.cloudflare.com/agents/runtime/communication/routing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/communication/","name":"Communication"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/communication/routing/","name":"Routing"}}]}
```
