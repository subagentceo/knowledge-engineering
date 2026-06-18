---
title: Chat agent
description: Build a streaming AI chat agent with tools using Workers AI — no API keys required.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Chat agent

Build a chat agent that streams AI responses, calls server-side tools, executes client-side tools in the browser, and asks for user approval before sensitive actions.

**What you will build:** A chat agent powered by Workers AI with three tool types — automatic, client-side, and approval-gated.

**Time:** \~15 minutes

This tutorial starts from a minimal Hello World Worker so you can see each moving part. If you want a complete starter app with the same core pieces already wired together, start with the [quick start](https://developers.cloudflare.com/agents/getting-started/quick-start/) and then return here to understand how the chat pieces fit together.

**Prerequisites:**

* Node.js 18+
* A Cloudflare account (free tier works)

## 1\. Create the project

Terminal window

```

npm create cloudflare@latest chat-agent


```

Select **"Hello World" Worker** when prompted. Then install the dependencies:

Terminal window

```

cd chat-agent

npm install agents @cloudflare/ai-chat ai workers-ai-provider zod


```

## 2\. Configure Wrangler

Replace your `wrangler.jsonc` with:

* [  wrangler.jsonc ](#tab-panel-5443)
* [  wrangler.toml ](#tab-panel-5444)

JSONC

```

{

  "name": "chat-agent",

  "main": "src/server.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["nodejs_compat"],

  "ai": { "binding": "AI" },

  "durable_objects": {

    "bindings": [{ "name": "ChatAgent", "class_name": "ChatAgent" }],

  },

  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["ChatAgent"] }],

}


```

TOML

```

name = "chat-agent"

main = "src/server.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[ai]

binding = "AI"


[[durable_objects.bindings]]

name = "ChatAgent"

class_name = "ChatAgent"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "ChatAgent" ]


```

Key settings:

* `ai` binds Workers AI — no API key needed
* `durable_objects` registers your chat agent class
* `new_sqlite_classes` enables SQLite storage for message persistence

## 3\. Write the server

Create `src/server.ts`. This is where your agent lives:

* [  JavaScript ](#tab-panel-5445)
* [  TypeScript ](#tab-panel-5446)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { routeAgentRequest } from "agents";

import { createWorkersAI } from "workers-ai-provider";

import {

  streamText,

  convertToModelMessages,

  pruneMessages,

  tool,

  stepCountIs,

} from "ai";

import { z } from "zod";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/meta/llama-4-scout-17b-16e-instruct"),

      system:

        "You are a helpful assistant. You can check the weather, " +

        "get the user's timezone, and run calculations.",

      messages: pruneMessages({

        messages: await convertToModelMessages(this.messages),

        toolCalls: "before-last-2-messages",

      }),

      tools: {

        // Server-side tool: runs automatically on the server

        getWeather: tool({

          description: "Get the current weather for a city",

          inputSchema: z.object({

            city: z.string().describe("City name"),

          }),

          execute: async ({ city }) => {

            // Replace with a real weather API in production

            const conditions = ["sunny", "cloudy", "rainy"];

            const temp = Math.floor(Math.random() * 30) + 5;

            return {

              city,

              temperature: temp,

              condition:

                conditions[Math.floor(Math.random() * conditions.length)],

            };

          },

        }),


        // Client-side tool: no execute function — the browser handles it

        getUserTimezone: tool({

          description: "Get the user's timezone from their browser",

          inputSchema: z.object({}),

        }),


        // Approval tool: requires user confirmation before executing

        calculate: tool({

          description:

            "Perform a math calculation with two numbers. " +

            "Requires user approval for large numbers.",

          inputSchema: z.object({

            a: z.coerce.number().describe("First number"),

            b: z.coerce.number().describe("Second number"),

            operator: z

              .enum(["+", "-", "*", "/", "%"])

              .describe("Arithmetic operator"),

          }),

          needsApproval: async ({ a, b }) =>

            Math.abs(a) > 1000 || Math.abs(b) > 1000,

          execute: async ({ a, b, operator }) => {

            const ops = {

              "+": (x, y) => x + y,

              "-": (x, y) => x - y,

              "*": (x, y) => x * y,

              "/": (x, y) => x / y,

              "%": (x, y) => x % y,

            };

            if (operator === "/" && b === 0) {

              return { error: "Division by zero" };

            }

            return {

              expression: `${a} ${operator} ${b}`,

              result: ops[operator](a, b),

            };

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env)) ||

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { routeAgentRequest } from "agents";

import { createWorkersAI } from "workers-ai-provider";

import {

  streamText,

  convertToModelMessages,

  pruneMessages,

  tool,

  stepCountIs,

} from "ai";

import { z } from "zod";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/meta/llama-4-scout-17b-16e-instruct"),

      system:

        "You are a helpful assistant. You can check the weather, " +

        "get the user's timezone, and run calculations.",

      messages: pruneMessages({

        messages: await convertToModelMessages(this.messages),

        toolCalls: "before-last-2-messages",

      }),

      tools: {

        // Server-side tool: runs automatically on the server

        getWeather: tool({

          description: "Get the current weather for a city",

          inputSchema: z.object({

            city: z.string().describe("City name"),

          }),

          execute: async ({ city }) => {

            // Replace with a real weather API in production

            const conditions = ["sunny", "cloudy", "rainy"];

            const temp = Math.floor(Math.random() * 30) + 5;

            return {

              city,

              temperature: temp,

              condition:

                conditions[Math.floor(Math.random() * conditions.length)],

            };

          },

        }),


        // Client-side tool: no execute function — the browser handles it

        getUserTimezone: tool({

          description: "Get the user's timezone from their browser",

          inputSchema: z.object({}),

        }),


        // Approval tool: requires user confirmation before executing

        calculate: tool({

          description:

            "Perform a math calculation with two numbers. " +

            "Requires user approval for large numbers.",

          inputSchema: z.object({

            a: z.coerce.number().describe("First number"),

            b: z.coerce.number().describe("Second number"),

            operator: z

              .enum(["+", "-", "*", "/", "%"])

              .describe("Arithmetic operator"),

          }),

          needsApproval: async ({ a, b }) =>

            Math.abs(a) > 1000 || Math.abs(b) > 1000,

          execute: async ({ a, b, operator }) => {

            const ops: Record<string, (x: number, y: number) => number> = {

              "+": (x, y) => x + y,

              "-": (x, y) => x - y,

              "*": (x, y) => x * y,

              "/": (x, y) => x / y,

              "%": (x, y) => x % y,

            };

            if (operator === "/" && b === 0) {

              return { error: "Division by zero" };

            }

            return {

              expression: `${a} ${operator} ${b}`,

              result: ops[operator](a, b),

            };

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env)) ||

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

### What each tool type does

| Tool            | execute? | needsApproval?      | Behavior                                        |
| --------------- | -------- | ------------------- | ----------------------------------------------- |
| getWeather      | Yes      | No                  | Runs on the server automatically                |
| getUserTimezone | No       | No                  | Sent to the client; browser provides the result |
| calculate       | Yes      | Yes (large numbers) | Pauses for user approval, then runs on server   |

## 4\. Write the client

Create `src/client.tsx`:

* [  JavaScript ](#tab-panel-5447)
* [  TypeScript ](#tab-panel-5448)

JavaScript

```

import { useAgent } from "agents/react";

import { useAgentChat, getToolApproval } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "ChatAgent" });


  const {

    messages,

    sendMessage,

    clearHistory,

    addToolApprovalResponse,

    status,

  } = useAgentChat({

    agent,

    // Handle client-side tools (tools with no server execute function)

    onToolCall: async ({ toolCall, addToolOutput }) => {

      if (toolCall.toolName === "getUserTimezone") {

        addToolOutput({

          toolCallId: toolCall.toolCallId,

          output: {

            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

            localTime: new Date().toLocaleTimeString(),

          },

        });

      }

    },

  });


  return (

    <div>

      <div>

        {messages.map((msg) => (

          <div key={msg.id}>

            <strong>{msg.role}:</strong>

            {msg.parts.map((part, i) => {

              if (part.type === "text") {

                return <span key={i}>{part.text}</span>;

              }


              // Render approval UI for tools that need confirmation

              if (part.state === "approval-requested") {

                const approval = getToolApproval(part);

                if (!approval) return null;

                return (

                  <div key={part.toolCallId}>

                    <p>

                      Approve <strong>{part.toolName}</strong>?

                    </p>

                    <pre>{JSON.stringify(part.input, null, 2)}</pre>

                    <button

                      onClick={() =>

                        addToolApprovalResponse({

                          id: approval.id,

                          approved: true,

                        })

                      }

                    >

                      Approve

                    </button>

                    <button

                      onClick={() =>

                        addToolApprovalResponse({

                          id: approval.id,

                          approved: false,

                        })

                      }

                    >

                      Reject

                    </button>

                  </div>

                );

              }


              // Show completed tool results

              if (part.state === "output-available") {

                return (

                  <details key={part.toolCallId}>

                    <summary>{part.toolName} result</summary>

                    <pre>{JSON.stringify(part.output, null, 2)}</pre>

                  </details>

                );

              }


              return null;

            })}

          </div>

        ))}

      </div>


      <form

        onSubmit={(e) => {

          e.preventDefault();

          const input = e.currentTarget.elements.namedItem("message");

          sendMessage({ text: input.value });

          input.value = "";

        }}

      >

        <input name="message" placeholder="Try: What's the weather in Paris?" />

        <button type="submit" disabled={status === "streaming"}>

          Send

        </button>

      </form>


      <button onClick={clearHistory}>Clear history</button>

    </div>

  );

}


export default function App() {

  return <Chat />;

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useAgentChat, getToolApproval } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "ChatAgent" });


  const { messages, sendMessage, clearHistory, addToolApprovalResponse, status } =

    useAgentChat({

      agent,

      // Handle client-side tools (tools with no server execute function)

      onToolCall: async ({ toolCall, addToolOutput }) => {

        if (toolCall.toolName === "getUserTimezone") {

          addToolOutput({

            toolCallId: toolCall.toolCallId,

            output: {

              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

              localTime: new Date().toLocaleTimeString(),

            },

          });

        }

      },

    });


  return (

    <div>

      <div>

        {messages.map((msg) => (

          <div key={msg.id}>

            <strong>{msg.role}:</strong>

            {msg.parts.map((part, i) => {

              if (part.type === "text") {

                return <span key={i}>{part.text}</span>;

              }


              // Render approval UI for tools that need confirmation

              if (part.state === "approval-requested") {

                const approval = getToolApproval(part);

                if (!approval) return null;

                return (

                  <div key={part.toolCallId}>

                    <p>

                      Approve <strong>{part.toolName}</strong>?

                    </p>

                    <pre>{JSON.stringify(part.input, null, 2)}</pre>

                    <button

                      onClick={() =>

                        addToolApprovalResponse({

                          id: approval.id,

                          approved: true,

                        })

                      }

                    >

                      Approve

                    </button>

                    <button

                      onClick={() =>

                        addToolApprovalResponse({

                          id: approval.id,

                          approved: false,

                        })

                      }

                    >

                      Reject

                    </button>

                  </div>

                );

              }


              // Show completed tool results

              if (part.state === "output-available") {

                return (

                  <details key={part.toolCallId}>

                    <summary>{part.toolName} result</summary>

                    <pre>{JSON.stringify(part.output, null, 2)}</pre>

                  </details>

                );

              }


              return null;

            })}

          </div>

        ))}

      </div>


      <form

        onSubmit={(e) => {

          e.preventDefault();

          const input = e.currentTarget.elements.namedItem(

            "message",

          ) as HTMLInputElement;

          sendMessage({ text: input.value });

          input.value = "";

        }}

      >

        <input name="message" placeholder="Try: What's the weather in Paris?" />

        <button type="submit" disabled={status === "streaming"}>

          Send

        </button>

      </form>


      <button onClick={clearHistory}>Clear history</button>

    </div>

  );

}


export default function App() {

  return <Chat />;

}


```

### Key client concepts

* **`useAgent`** connects to your `ChatAgent` over WebSocket
* **`useAgentChat`** manages the chat lifecycle (messages, streaming, tools)
* **`onToolCall`** handles client-side tools — when the LLM calls `getUserTimezone`, the browser provides the result and the conversation auto-continues
* **`addToolApprovalResponse`** approves or rejects tools that have `needsApproval`
* Messages, streaming, and resumption are all handled automatically

## 5\. Run locally

Generate types and start the dev server:

Terminal window

```

npx wrangler types

npm run dev


```

Try these prompts:

* **"What is the weather in Tokyo?"** — calls the server-side `getWeather` tool
* **"What timezone am I in?"** — calls the client-side `getUserTimezone` tool (the browser provides the answer)
* **"What is 5000 times 3?"** — triggers the approval UI before executing (numbers over 1000)

## 6\. Deploy

Terminal window

```

npx wrangler deploy


```

Your agent is now live on Cloudflare's global network. Messages persist in SQLite, streams resume on disconnect, and the agent hibernates when idle to save resources.

## What you built

Your chat agent has:

* **Streaming AI responses** via Workers AI (no API keys)
* **Message persistence** in SQLite — conversations survive restarts
* **Server-side tools** that execute automatically
* **Client-side tools** that run in the browser and feed results back to the LLM
* **Human-in-the-loop approval** for sensitive operations
* **Resumable streaming** — if a client disconnects mid-stream, it picks up where it left off

## Next steps

[ Chat agents API reference ](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) Full reference for AIChatAgent and useAgentChat — providers, storage, advanced patterns. 

[ Store and sync state ](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) Add real-time state beyond chat messages. 

[ Callable methods ](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/) Expose agent methods as typed RPC for your client. 

[ Human-in-the-loop ](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/) Deeper patterns for approval flows and manual intervention. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/examples/chat-agent/#page","headline":"Chat agent · Cloudflare Agents docs","description":"Build a streaming AI chat agent with tools using Workers AI — no API keys required.","url":"https://developers.cloudflare.com/agents/examples/chat-agent/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/examples/chat-agent/","name":"Chat agent"}}]}
```
