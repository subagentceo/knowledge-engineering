---
title: McpAgent
description: Build stateful MCP servers on Cloudflare by extending the McpAgent class with persistent storage and agent capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# McpAgent

When you build MCP Servers on Cloudflare, you extend the [McpAgent class ↗](https://github.com/cloudflare/agents/blob/main/packages/agents/src/mcp.ts), from the Agents SDK:

* [  JavaScript ](#tab-panel-5703)
* [  TypeScript ](#tab-panel-5704)

JavaScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({ name: "Demo", version: "1.0.0" });


  async init() {

    this.server.tool(

      "add",

      { a: z.number(), b: z.number() },

      async ({ a, b }) => ({

        content: [{ type: "text", text: String(a + b) }],

      }),

    );

  }

}


```

TypeScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({ name: "Demo", version: "1.0.0" });


  async init() {

    this.server.tool(

      "add",

      { a: z.number(), b: z.number() },

      async ({ a, b }) => ({

        content: [{ type: "text", text: String(a + b) }],

      }),

    );

  }

}


```

This means that each instance of your MCP server has its own durable state, backed by a [Durable Object](https://developers.cloudflare.com/durable-objects/), with its own [SQL database](https://developers.cloudflare.com/agents/runtime/lifecycle/state/).

Your MCP server doesn't necessarily have to be an Agent. You can build MCP servers that are stateless, and just add [tools](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/) to your MCP server using the `@modelcontextprotocol/sdk` package.

But if you want your MCP server to:

* remember previous tool calls, and responses it provided
* provide a game to the MCP client, remembering the state of the game board, previous moves, and the score
* cache the state of a previous external API call, so that subsequent tool calls can reuse it
* do anything that an Agent can do, but allow MCP clients to communicate with it

You can use the APIs below in order to do so.

## API overview

| Property/Method               | Description                                        |
| ----------------------------- | -------------------------------------------------- |
| state                         | Current state object (persisted)                   |
| initialState                  | Default state when instance starts                 |
| setState(state)               | Update and persist state                           |
| onStateChanged(state)         | Called when state changes                          |
| sql                           | Execute SQL queries on embedded database           |
| server                        | The McpServer instance for registering tools       |
| props                         | User identity and tokens from OAuth authentication |
| elicitInput(options, context) | Request structured input from user                 |
| McpAgent.serve(path, options) | Static method to create a Worker handler           |

## Deploying with McpAgent.serve()

The `McpAgent.serve()` static method creates a Worker handler that routes requests to your MCP server:

* [  JavaScript ](#tab-panel-5705)
* [  TypeScript ](#tab-panel-5706)

JavaScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({ name: "my-server", version: "1.0.0" });


  async init() {

    this.server.tool("square", { n: z.number() }, async ({ n }) => ({

      content: [{ type: "text", text: String(n * n) }],

    }));

  }

}


// Export the Worker handler

export default MyMCP.serve("/mcp");


```

TypeScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({ name: "my-server", version: "1.0.0" });


  async init() {

    this.server.tool("square", { n: z.number() }, async ({ n }) => ({

      content: [{ type: "text", text: String(n * n) }],

    }));

  }

}


// Export the Worker handler

export default MyMCP.serve("/mcp");


```

This is the simplest way to deploy an MCP server — about 15 lines of code. The `serve()` method handles Streamable HTTP transport automatically.

### With OAuth authentication

When using the [OAuth Provider Library ↗](https://github.com/cloudflare/workers-oauth-provider), pass your MCP server to `apiHandlers`:

* [  JavaScript ](#tab-panel-5697)
* [  TypeScript ](#tab-panel-5698)

JavaScript

```

import { OAuthProvider } from "@cloudflare/workers-oauth-provider";


export default new OAuthProvider({

  apiHandlers: { "/mcp": MyMCP.serve("/mcp") },

  authorizeEndpoint: "/authorize",

  tokenEndpoint: "/token",

  clientRegistrationEndpoint: "/register",

  defaultHandler: AuthHandler,

});


```

TypeScript

```

import { OAuthProvider } from "@cloudflare/workers-oauth-provider";


export default new OAuthProvider({

  apiHandlers: { "/mcp": MyMCP.serve("/mcp") },

  authorizeEndpoint: "/authorize",

  tokenEndpoint: "/token",

  clientRegistrationEndpoint: "/register",

  defaultHandler: AuthHandler,

});


```

## Data jurisdiction

For GDPR and data residency compliance, specify a jurisdiction to ensure your MCP server instances run in specific regions:

* [  JavaScript ](#tab-panel-5695)
* [  TypeScript ](#tab-panel-5696)

JavaScript

```

// EU jurisdiction for GDPR compliance

export default MyMCP.serve("/mcp", { jurisdiction: "eu" });


```

TypeScript

```

// EU jurisdiction for GDPR compliance

export default MyMCP.serve("/mcp", { jurisdiction: "eu" });


```

With OAuth:

* [  JavaScript ](#tab-panel-5701)
* [  TypeScript ](#tab-panel-5702)

JavaScript

```

export default new OAuthProvider({

  apiHandlers: {

    "/mcp": MyMCP.serve("/mcp", { jurisdiction: "eu" }),

  },

  // ... other OAuth config

});


```

TypeScript

```

export default new OAuthProvider({

  apiHandlers: {

    "/mcp": MyMCP.serve("/mcp", { jurisdiction: "eu" }),

  },

  // ... other OAuth config

});


```

When you specify `jurisdiction: "eu"`:

* All MCP session data stays within the EU
* User data processed by your tools remains in the EU
* State stored in the Durable Object stays in the EU

Available jurisdictions include `"eu"` (European Union) and `"fedramp"` (FedRAMP compliant locations). Refer to [Durable Objects data location](https://developers.cloudflare.com/durable-objects/reference/data-location/) for more options.

## Hibernation support

`McpAgent` instances automatically support [WebSockets Hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), allowing stateful MCP servers to sleep during inactive periods while preserving their state. This means your agents only consume compute resources when actively processing requests, optimizing costs while maintaining the full context and conversation history.

Hibernation is enabled by default and requires no additional configuration.

## Stream resumability

`McpAgent`'s Streamable HTTP transport survives the roughly 5-minute Cloudflare edge idle-stream watchdog so in-flight tool calls are not lost on a flaky connection:

* **GET (standalone listen stream)** — when an `EventStore` is configured, idle drops are recovered by clients reconnecting with a `Last-Event-ID` header (no keepalive needed). Without an `EventStore`, a comment-frame keepalive (`: keepalive`, every 25 seconds) keeps long-lived listeners alive.
* **POST (tool response stream)** — always keepalive, so in-flight tool calls survive the idle watchdog. POST streams can additionally be resumed via `Last-Event-ID` when an `EventStore` is configured; a reconnecting client replays any events it missed up to and including the final response. Each POST stream's events are cleared when its close frame is written.

`DurableObjectEventStore` is exported from `agents/mcp` for stateful `WorkerTransport` callers that embed the transport inside an Agent or Durable Object:

* [  JavaScript ](#tab-panel-5699)
* [  TypeScript ](#tab-panel-5700)

JavaScript

```

import { DurableObjectEventStore } from "agents/mcp";


const eventStore = new DurableObjectEventStore(this.ctx.storage);


```

TypeScript

```

import { DurableObjectEventStore } from "agents/mcp";


const eventStore = new DurableObjectEventStore(this.ctx.storage);


```

Refer to [MCP Transport](https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/) for transport configuration.

## Authentication and authorization

The McpAgent class provides seamless integration with the [OAuth Provider Library ↗](https://github.com/cloudflare/workers-oauth-provider) for [authentication and authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/).

When a user authenticates to your MCP server, their identity information and tokens are made available through the `props` parameter, allowing you to:

* access user-specific data
* check user permissions before performing operations
* customize responses based on user attributes
* use authentication tokens to make requests to external services on behalf of the user

## State synchronization APIs

The `McpAgent` class provides full access to the [Agent state APIs](https://developers.cloudflare.com/agents/runtime/lifecycle/state/):

* [state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) — Current persisted state
* [initialState](https://developers.cloudflare.com/agents/runtime/lifecycle/state/#set-the-initial-state-for-an-agent) — Default state when instance starts
* [setState](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) — Update and persist state
* [onStateChanged](https://developers.cloudflare.com/agents/runtime/lifecycle/state/#synchronizing-state) — React to state changes
* [sql](https://developers.cloudflare.com/agents/runtime/agents-api/#sql-api) — Execute SQL queries on embedded database

State resets after the session ends

Currently, each client session is backed by an instance of the `McpAgent` class. This is handled automatically for you, as shown in the [getting started guide](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/). This means that when the same client reconnects, they will start a new session, and the state will be reset.

For example, the following code implements an MCP server that remembers a counter value, and updates the counter when the `add` tool is called:

* [  JavaScript ](#tab-panel-5709)
* [  TypeScript ](#tab-panel-5710)

JavaScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({

    name: "Demo",

    version: "1.0.0",

  });


  initialState = {

    counter: 1,

  };


  async init() {

    this.server.resource(`counter`, `mcp://resource/counter`, (uri) => {

      return {

        contents: [{ uri: uri.href, text: String(this.state.counter) }],

      };

    });


    this.server.tool(

      "add",

      "Add to the counter, stored in the MCP",

      { a: z.number() },

      async ({ a }) => {

        this.setState({ ...this.state, counter: this.state.counter + a });


        return {

          content: [

            {

              type: "text",

              text: String(`Added ${a}, total is now ${this.state.counter}`),

            },

          ],

        };

      },

    );

  }


  onStateChanged(state) {

    console.log({ stateUpdate: state });

  }

}


```

TypeScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


type State = { counter: number };


export class MyMCP extends McpAgent<Env, State, {}> {

  server = new McpServer({

    name: "Demo",

    version: "1.0.0",

  });


  initialState: State = {

    counter: 1,

  };


  async init() {

    this.server.resource(`counter`, `mcp://resource/counter`, (uri) => {

      return {

        contents: [{ uri: uri.href, text: String(this.state.counter) }],

      };

    });


    this.server.tool(

      "add",

      "Add to the counter, stored in the MCP",

      { a: z.number() },

      async ({ a }) => {

        this.setState({ ...this.state, counter: this.state.counter + a });


        return {

          content: [

            {

              type: "text",

              text: String(`Added ${a}, total is now ${this.state.counter}`),

            },

          ],

        };

      },

    );

  }


  onStateChanged(state: State) {

    console.log({ stateUpdate: state });

  }

}


```

## Elicitation (human-in-the-loop)

MCP servers can request additional user input during tool execution using **elicitation**. The MCP client (like Claude Desktop) renders a form based on your JSON Schema and returns the user's response.

### When to use elicitation

* Request structured input that was not part of the original tool call
* Confirm high-stakes operations before proceeding
* Gather additional context or preferences mid-execution

### `elicitInput(options, context)`

Request structured input from the user during tool execution.

**Parameters:**

| Parameter                | Type        | Description                                  |
| ------------------------ | ----------- | -------------------------------------------- |
| options.message          | string      | Message explaining what input is needed      |
| options.requestedSchema  | JSON Schema | Schema defining the expected input structure |
| context.relatedRequestId | string      | The extra.requestId from the tool handler    |

**Returns:** `Promise<{ action: "accept" | "decline", content?: object }>`

* [  JavaScript ](#tab-panel-5711)
* [  TypeScript ](#tab-panel-5712)

JavaScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class CounterMCP extends McpAgent {

  server = new McpServer({

    name: "counter-server",

    version: "1.0.0",

  });


  initialState = { counter: 0 };


  async init() {

    this.server.tool(

      "increase-counter",

      "Increase the counter by a user-specified amount",

      { confirm: z.boolean().describe("Do you want to increase the counter?") },

      async ({ confirm }, extra) => {

        if (!confirm) {

          return { content: [{ type: "text", text: "Cancelled." }] };

        }


        // Request additional input from the user

        const userInput = await this.server.server.elicitInput(

          {

            message: "By how much do you want to increase the counter?",

            requestedSchema: {

              type: "object",

              properties: {

                amount: {

                  type: "number",

                  title: "Amount",

                  description: "The amount to increase the counter by",

                },

              },

              required: ["amount"],

            },

          },

          { relatedRequestId: extra.requestId },

        );


        // Check if user accepted or cancelled

        if (userInput.action !== "accept" || !userInput.content) {

          return { content: [{ type: "text", text: "Cancelled." }] };

        }


        // Use the input

        const amount = Number(userInput.content.amount);

        this.setState({

          ...this.state,

          counter: this.state.counter + amount,

        });


        return {

          content: [

            {

              type: "text",

              text: `Counter increased by ${amount}, now at ${this.state.counter}`,

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


export class CounterMCP extends McpAgent<Env, State, {}> {

  server = new McpServer({

    name: "counter-server",

    version: "1.0.0",

  });


  initialState: State = { counter: 0 };


  async init() {

    this.server.tool(

      "increase-counter",

      "Increase the counter by a user-specified amount",

      { confirm: z.boolean().describe("Do you want to increase the counter?") },

      async ({ confirm }, extra) => {

        if (!confirm) {

          return { content: [{ type: "text", text: "Cancelled." }] };

        }


        // Request additional input from the user

        const userInput = await this.server.server.elicitInput(

          {

            message: "By how much do you want to increase the counter?",

            requestedSchema: {

              type: "object",

              properties: {

                amount: {

                  type: "number",

                  title: "Amount",

                  description: "The amount to increase the counter by",

                },

              },

              required: ["amount"],

            },

          },

          { relatedRequestId: extra.requestId },

        );


        // Check if user accepted or cancelled

        if (userInput.action !== "accept" || !userInput.content) {

          return { content: [{ type: "text", text: "Cancelled." }] };

        }


        // Use the input

        const amount = Number(userInput.content.amount);

        this.setState({

          ...this.state,

          counter: this.state.counter + amount,

        });


        return {

          content: [

            {

              type: "text",

              text: `Counter increased by ${amount}, now at ${this.state.counter}`,

            },

          ],

        };

      },

    );

  }

}


```

### JSON Schema for forms

The `requestedSchema` defines the form structure shown to the user:

TypeScript

```

const schema = {

  type: "object",

  properties: {

    // Text input

    name: {

      type: "string",

      title: "Name",

      description: "Enter your name",

    },

    // Number input

    amount: {

      type: "number",

      title: "Amount",

      minimum: 1,

      maximum: 100,

    },

    // Boolean (checkbox)

    confirm: {

      type: "boolean",

      title: "I confirm this action",

    },

    // Enum (dropdown)

    priority: {

      type: "string",

      enum: ["low", "medium", "high"],

      title: "Priority",

    },

  },

  required: ["name", "amount"],

};


```

### Handling responses

* [  JavaScript ](#tab-panel-5707)
* [  TypeScript ](#tab-panel-5708)

JavaScript

```

const result = await this.server.server.elicitInput(

  { message: "Confirm action", requestedSchema: schema },

  { relatedRequestId: extra.requestId },

);


switch (result.action) {

  case "accept":

    // User submitted the form

    const { name, amount } = result.content;

    // Process the input...

    break;


  case "decline":

    // User cancelled

    return { content: [{ type: "text", text: "Operation cancelled." }] };

}


```

TypeScript

```

const result = await this.server.server.elicitInput(

  { message: "Confirm action", requestedSchema: schema },

  { relatedRequestId: extra.requestId },

);


switch (result.action) {

  case "accept":

    // User submitted the form

    const { name, amount } = result.content as { name: string; amount: number };

    // Process the input...

    break;


  case "decline":

    // User cancelled

    return { content: [{ type: "text", text: "Operation cancelled." }] };

}


```

MCP client support

Elicitation requires MCP client support. Not all MCP clients implement the elicitation capability. Check the client documentation for compatibility.

For more human-in-the-loop patterns including workflow-based approval, refer to [Human-in-the-loop patterns](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/).

## Next steps

[ Build a Remote MCP server ](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) Get started with MCP servers on Cloudflare. 

[ MCP Tools ](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/) Design and add tools to your MCP server. 

[ Authorization ](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) Set up OAuth authentication. 

[ Securing MCP servers ](https://developers.cloudflare.com/agents/model-context-protocol/guides/securing-mcp-server/) Security best practices for production. 

[ createMcpHandler ](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/) Build stateless MCP servers. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/#page","headline":"McpAgent · Cloudflare Agents docs","description":"Build stateful MCP servers on Cloudflare by extending the McpAgent class with persistent storage and agent capabilities.","url":"https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/apis/","name":"APIs"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/apis/agent-api/","name":"McpAgent"}}]}
```
