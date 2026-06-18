---
title: Quick start
description: Build your first agent in 10 minutes — a counter with persistent state that syncs to a React frontend in real-time.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Quick start

Build AI agents that persist, think, and act. Agents run on Cloudflare's global network, maintain state across requests, and connect to clients in real-time via WebSockets.

**What you will build:** A counter agent with persistent state that syncs to a React frontend in real-time.

**Time:** \~10 minutes

## Create a new project

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- --template cloudflare/agents-starter
```

```
yarn create cloudflare --template cloudflare/agents-starter
```

```
pnpm create cloudflare@latest --template cloudflare/agents-starter
```

Then install dependencies and start the dev server:

Terminal window

```

cd agents-starter

npm install

npm run dev


```

This creates a project with:

* `src/server.ts` — Your agent code
* `src/client.tsx` — React frontend
* `wrangler.jsonc` — Cloudflare configuration
* `tsconfig.json` — Extends `agents/tsconfig` for correct decorator and module settings
* `vite.config.ts` — Includes the `agents/vite` plugin for decorator support

The starter template includes two important SDK integrations. If you are setting up a project manually, add both:

**tsconfig.json** — extends `agents/tsconfig`, which sets `target: "ES2021"` and other recommended options:

```

{

  "extends": "agents/tsconfig"

}


```

**vite.config.ts** — includes the `agents()` plugin, which handles TC39 decorator transforms (required for `@callable()` in Vite 8):

TypeScript

```

import { cloudflare } from "@cloudflare/vite-plugin";

import react from "@vitejs/plugin-react";

import agents from "agents/vite";

import { defineConfig } from "vite";


export default defineConfig({

  plugins: [agents(), react(), cloudflare()],

});


```

Open [http://localhost:5173 ↗](http://localhost:5173) to see your agent in action.

## Your first agent

Build a simple counter agent from scratch. Replace `src/server.ts`:

* [  JavaScript ](#tab-panel-5541)
* [  TypeScript ](#tab-panel-5542)

JavaScript

```

import { Agent, routeAgentRequest, callable } from "agents";


// Define the state shape


// Create the agent

export class CounterAgent extends Agent {

  // Initial state for new instances

  initialState = { count: 0 };


  // Methods marked with @callable can be called from the client

  @callable()

  increment() {

    this.setState({ count: this.state.count + 1 });

    return this.state.count;

  }


  @callable()

  decrement() {

    this.setState({ count: this.state.count - 1 });

    return this.state.count;

  }


  @callable()

  reset() {

    this.setState({ count: 0 });

  }

}


// Route requests to agents

export default {

  async fetch(request, env, ctx) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Agent, routeAgentRequest, callable } from "agents";


// Define the state shape

export type CounterState = {

  count: number;

};


// Create the agent

export class CounterAgent extends Agent<Env, CounterState> {

  // Initial state for new instances

  initialState: CounterState = { count: 0 };


  // Methods marked with @callable can be called from the client

  @callable()

  increment() {

    this.setState({ count: this.state.count + 1 });

    return this.state.count;

  }


  @callable()

  decrement() {

    this.setState({ count: this.state.count - 1 });

    return this.state.count;

  }


  @callable()

  reset() {

    this.setState({ count: 0 });

  }

}


// Route requests to agents

export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

Update `wrangler.jsonc` to register the agent:

* [  wrangler.jsonc ](#tab-panel-5537)
* [  wrangler.toml ](#tab-panel-5538)

JSONC

```

{

  "name": "my-agent",

  "main": "src/server.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["nodejs_compat"],

  "durable_objects": {

    "bindings": [

      {

        "name": "CounterAgent",

        "class_name": "CounterAgent",

      },

    ],

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["CounterAgent"],

    },

  ],

}


```

TOML

```

name = "my-agent"

main = "src/server.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[[durable_objects.bindings]]

name = "CounterAgent"

class_name = "CounterAgent"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "CounterAgent" ]


```

**Key points:**

* `name` in bindings becomes the property on `env` (for example, `env.CounterAgent`)
* `class_name` must exactly match your exported class name
* `new_sqlite_classes` enables SQLite storage for state persistence
* `nodejs_compat` flag is required for the agents package

## Connect from React

Replace `src/client.tsx`:

src/client.tsx

```

import "./styles.css";

import { createRoot } from "react-dom/client";

import { useState } from "react";

import { useAgent } from "agents/react";

import type { CounterAgent, CounterState } from "./server";


export default function App() {

  const [count, setCount] = useState(0);


  // Connect to the Counter agent

  const agent = useAgent<CounterAgent, CounterState>({

    agent: "CounterAgent",

    onStateUpdate: (state) => setCount(state.count),

  });


  return (

    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>

      <h1>Counter Agent</h1>

      <p style={{ fontSize: "3rem" }}>{count}</p>

      <div style={{ display: "flex", gap: "1rem" }}>

        <button onClick={() => agent.stub.decrement()}>-</button>

        <button onClick={() => agent.stub.reset()}>Reset</button>

        <button onClick={() => agent.stub.increment()}>+</button>

      </div>

    </div>

  );

}


const root = createRoot(document.getElementById("root")!);

root.render(<App />);


```

Key points:

* `useAgent` connects to your agent via WebSocket
* `onStateUpdate` fires whenever the agent's state changes
* `agent.stub.methodName()` calls methods marked with `@callable()` on your agent

## How it works

When you clicked the button:

1. **Client** called `agent.stub.increment()` over WebSocket
2. **Agent** ran `increment()`, updated state with `setState()`
3. **State** persisted to SQLite automatically
4. **Broadcast** sent to all connected clients
5. **React** updated via `onStateUpdate`

flowchart LR
    A["Browser<br/>(React)"] <-->|WebSocket| B["Agent<br/>(Counter)"]
    B --> C["SQLite<br/>(State)"]

### Key concepts

| Concept              | What it means                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Agent instance**   | Each unique name gets its own agent. CounterAgent:user-123 is separate from CounterAgent:user-456 |
| **Persistent state** | State survives restarts, deploys, and hibernation. It is stored in SQLite                         |
| **Real-time sync**   | All clients connected to the same agent receive state updates instantly                           |
| **Hibernation**      | When no clients are connected, the agent hibernates (no cost). It wakes on the next request       |

## Connect from vanilla JavaScript

If you are not using React:

* [  JavaScript ](#tab-panel-5539)
* [  TypeScript ](#tab-panel-5540)

JavaScript

```

import { AgentClient } from "agents/client";


const agent = new AgentClient({

  agent: "CounterAgent",

  name: "my-counter", // optional, defaults to "default"

  onStateUpdate: (state) => {

    console.log("New count:", state.count);

  },

});


// Call methods

await agent.call("increment");

await agent.call("reset");


```

TypeScript

```

import { AgentClient } from "agents/client";


const agent = new AgentClient({

  agent: "CounterAgent",

  name: "my-counter", // optional, defaults to "default"

  onStateUpdate: (state) => {

    console.log("New count:", state.count);

  },

});


// Call methods

await agent.call("increment");

await agent.call("reset");


```

## Deploy to Cloudflare

Terminal window

```

npm run deploy


```

Your agent is now live on Cloudflare's global network, running close to your users.

## Common integration patterns

### Agents behind authentication

Check auth before routing to agents:

* [  JavaScript ](#tab-panel-5553)
* [  TypeScript ](#tab-panel-5554)

JavaScript

```

export default {

  async fetch(request, env) {

    // Check auth for agent routes

    if (request.url.includes("/agents/")) {

      const authResult = await checkAuth(request, env);

      if (!authResult.valid) {

        return new Response("Unauthorized", { status: 401 });

      }

    }


    const agentResponse = await routeAgentRequest(request, env);

    if (agentResponse) return agentResponse;


    // ... rest of routing

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env) {

    // Check auth for agent routes

    if (request.url.includes("/agents/")) {

      const authResult = await checkAuth(request, env);

      if (!authResult.valid) {

        return new Response("Unauthorized", { status: 401 });

      }

    }


    const agentResponse = await routeAgentRequest(request, env);

    if (agentResponse) return agentResponse;


    // ... rest of routing

  },

} satisfies ExportedHandler<Env>;


```

### Custom agent path prefix

By default, agents are routed at `/agents/{agent-name}/{instance-name}`. You can customize this:

* [  JavaScript ](#tab-panel-5547)
* [  TypeScript ](#tab-panel-5548)

JavaScript

```

import { routeAgentRequest } from "agents";


const agentResponse = await routeAgentRequest(request, env, {

  prefix: "/api/agents", // Now routes at /api/agents/{agent-name}/{instance-name}

});


```

TypeScript

```

import { routeAgentRequest } from "agents";


const agentResponse = await routeAgentRequest(request, env, {

  prefix: "/api/agents", // Now routes at /api/agents/{agent-name}/{instance-name}

});


```

Refer to [Routing](https://developers.cloudflare.com/agents/runtime/communication/routing/) for more options including CORS, custom instance naming, and location hints.

### Accessing agents from server code

You can interact with agents directly from your Worker code:

* [  JavaScript ](#tab-panel-5557)
* [  TypeScript ](#tab-panel-5558)

JavaScript

```

import { getAgentByName } from "agents";


export default {

  async fetch(request, env) {

    if (request.url.endsWith("/api/increment")) {

      // Get a specific agent instance

      const counter = await getAgentByName(env.CounterAgent, "shared-counter");

      const newCount = await counter.increment();

      return Response.json({ count: newCount });

    }

    // ...

  },

};


```

TypeScript

```

import { getAgentByName } from "agents";


export default {

  async fetch(request: Request, env: Env) {

    if (request.url.endsWith("/api/increment")) {

      // Get a specific agent instance

      const counter = await getAgentByName(env.CounterAgent, "shared-counter");

      const newCount = await counter.increment();

      return Response.json({ count: newCount });

    }

    // ...

  },

} satisfies ExportedHandler<Env>;


```

### Adding multiple agents

Add more agents by extending the configuration:

* [  JavaScript ](#tab-panel-5551)
* [  TypeScript ](#tab-panel-5552)

JavaScript

```

// src/agents/chat.ts

export class Chat extends Agent {

  // ...

}


// src/agents/scheduler.ts

export class Scheduler extends Agent {

  // ...

}


```

TypeScript

```

// src/agents/chat.ts

export class Chat extends Agent {

  // ...

}


// src/agents/scheduler.ts

export class Scheduler extends Agent {

  // ...

}


```

Update the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-5543)
* [  wrangler.toml ](#tab-panel-5544)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "durable_objects": {

    "bindings": [

      {

        "name": "CounterAgent",

        "class_name": "CounterAgent"

      },

      {

        "name": "Chat",

        "class_name": "Chat"

      },

      {

        "name": "Scheduler",

        "class_name": "Scheduler"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "CounterAgent",

        "Chat",

        "Scheduler"

      ]

    }

  ]

}


```

TOML

```

[[durable_objects.bindings]]

name = "CounterAgent"

class_name = "CounterAgent"


[[durable_objects.bindings]]

name = "Chat"

class_name = "Chat"


[[durable_objects.bindings]]

name = "Scheduler"

class_name = "Scheduler"


[[migrations]]

tag = "v1"

new_sqlite_classes = ["CounterAgent", "Chat", "Scheduler"]


```

Export all agents from your entry point:

* [  JavaScript ](#tab-panel-5549)
* [  TypeScript ](#tab-panel-5550)

JavaScript

```

export { CounterAgent } from "./agents/counter";

export { Chat } from "./agents/chat";

export { Scheduler } from "./agents/scheduler";


```

TypeScript

```

export { CounterAgent } from "./agents/counter";

export { Chat } from "./agents/chat";

export { Scheduler } from "./agents/scheduler";


```

## Troubleshooting

### Agent not found, or 404 errors

1. **Check the export** \- Agent class must be exported from your main entry point.
2. **Check the binding** \- `class_name` in the Wrangler configuration file must exactly match the exported class name.
3. **Check the route** \- Default route is `/agents/{'{agent-name}'}/{'{instance-name}'}`. Agent name in client matches the class name (case-insensitive).

### No such Durable Object class error

Add the migration to the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-5545)
* [  wrangler.toml ](#tab-panel-5546)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "YourAgentClass"

      ]

    }

  ]

}


```

TOML

```

[[migrations]]

tag = "v1"

new_sqlite_classes = ["YourAgentClass"]


```

### WebSocket connection fails

Ensure your routing passes the response unchanged:

* [  JavaScript ](#tab-panel-5555)
* [  TypeScript ](#tab-panel-5556)

JavaScript

```

// Correct - return the response directly

const agentResponse = await routeAgentRequest(request, env);

if (agentResponse) return agentResponse;


// Wrong - this breaks WebSocket connections

if (agentResponse) return new Response(agentResponse.body);


```

TypeScript

```

// Correct - return the response directly

const agentResponse = await routeAgentRequest(request, env);

if (agentResponse) return agentResponse;


// Wrong - this breaks WebSocket connections

if (agentResponse) return new Response(agentResponse.body);


```

### State not persisting

Check that:

1. You are calling `this.setState()`, not mutating `this.state` directly.
2. The agent class is in `new_sqlite_classes` in migrations.
3. You are connecting to the same agent instance name.
4. The `onStateUpdate` callback is wired up in your client.
5. WebSocket connection is established (check browser dev tools).

### "Method X is not callable" errors

Make sure your methods are decorated with `@callable()`:

* [  JavaScript ](#tab-panel-5559)
* [  TypeScript ](#tab-panel-5560)

JavaScript

```

import { Agent, callable } from "agents";


export class MyAgent extends Agent {

  @callable()

  increment() {

    // ...

  }

}


```

TypeScript

```

import { Agent, callable } from "agents";


export class MyAgent extends Agent {

  @callable()

  increment() {

    // ...

  }

}


```

### Type errors with `agent.stub`

Add the agent and state type parameters:

* [  JavaScript ](#tab-panel-5561)
* [  TypeScript ](#tab-panel-5562)

JavaScript

```

import { useAgent } from "agents/react";


// Pass the agent and state types to useAgent

const agent = useAgent({

  agent: "CounterAgent",

  onStateUpdate: (state) => setCount(state.count),

});


// Now agent.stub is fully typed

agent.stub.increment();


```

TypeScript

```

import { useAgent } from "agents/react";

import type { CounterAgent, CounterState } from "./server";


// Pass the agent and state types to useAgent

const agent = useAgent<CounterAgent, CounterState>({

  agent: "CounterAgent",

  onStateUpdate: (state) => setCount(state.count),

});


// Now agent.stub is fully typed

agent.stub.increment();


```

### `SyntaxError: Invalid or unexpected token` with `@callable()`

If your dev server fails with `SyntaxError: Invalid or unexpected token`, set `"target": "ES2021"` in your `tsconfig.json`. This ensures that Vite's esbuild transpiler downlevels TC39 decorators instead of passing them through as native syntax.

```

{

  "compilerOptions": {

    "target": "ES2021"

  }

}


```

Warning

Do not set `"experimentalDecorators": true` in your `tsconfig.json`. The Agents SDK uses [TC39 standard decorators ↗](https://github.com/tc39/proposal-decorators), not TypeScript legacy decorators. Enabling `experimentalDecorators` applies an incompatible transform that silently breaks `@callable()` at runtime.

## Next steps

Now that you have a working agent, explore these topics:

### Common next steps

| Learn how to             | Refer to                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Add AI/LLM capabilities  | [Using AI models](https://developers.cloudflare.com/agents/runtime/operations/using-ai-models/) |
| Expose tools via MCP     | [MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/)  |
| Run background tasks     | [Schedule tasks](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/)    |
| Handle emails            | [Email routing](https://developers.cloudflare.com/agents/communication-channels/email/)         |
| Use Cloudflare Workflows | [Run Workflows](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/)      |

### Explore more

[ State management ](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) Deep dive into setState(), initialState, and onStateChanged(). 

[ Client SDK ](https://developers.cloudflare.com/agents/communication-channels/chat/client-sdk/) Full useAgent and AgentClient API reference. 

[ Callable methods ](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/) Expose methods to clients with @callable(). 

[ Schedule tasks ](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) Run tasks on a delay, schedule, or cron. 

[ Agent class internals ](https://developers.cloudflare.com/agents/runtime/lifecycle/agent-class/) Full lifecycle and methods reference. 

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/getting-started/quick-start/#page","headline":"Quick start · Cloudflare Agents docs","description":"Build your first agent in 10 minutes — a counter with persistent state that syncs to a React frontend in real-time.","url":"https://developers.cloudflare.com/agents/getting-started/quick-start/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/getting-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/getting-started/quick-start/","name":"Quick start"}}]}
```
