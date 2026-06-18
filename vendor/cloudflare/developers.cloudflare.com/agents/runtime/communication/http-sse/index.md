---
title: HTTP and Server-Sent Events
description: Handle HTTP requests and stream responses with Server-Sent Events (SSE) from Cloudflare Agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP and Server-Sent Events

Agents can handle HTTP requests and stream responses using Server-Sent Events (SSE). This page covers the `onRequest` method and SSE patterns.

## Handling HTTP requests

Define the `onRequest` method to handle HTTP requests to your agent:

* [  JavaScript ](#tab-panel-5879)
* [  TypeScript ](#tab-panel-5880)

JavaScript

```

import { Agent } from "agents";


export class APIAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);


    // Route based on path

    if (url.pathname.endsWith("/status")) {

      return Response.json({ status: "ok", state: this.state });

    }


    if (url.pathname.endsWith("/action")) {

      if (request.method !== "POST") {

        return new Response("Method not allowed", { status: 405 });

      }

      const data = await request.json();

      await this.processAction(data.action);

      return Response.json({ success: true });

    }


    return new Response("Not found", { status: 404 });

  }


  async processAction(action) {

    // Handle the action

  }

}


```

TypeScript

```

import { Agent } from "agents";


export class APIAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);


    // Route based on path

    if (url.pathname.endsWith("/status")) {

      return Response.json({ status: "ok", state: this.state });

    }


    if (url.pathname.endsWith("/action")) {

      if (request.method !== "POST") {

        return new Response("Method not allowed", { status: 405 });

      }

      const data = await request.json<{ action: string }>();

      await this.processAction(data.action);

      return Response.json({ success: true });

    }


    return new Response("Not found", { status: 404 });

  }


  async processAction(action: string) {

    // Handle the action

  }

}


```

## Server-Sent Events (SSE)

SSE allows you to stream data to clients over a long-running HTTP connection. This is ideal for AI model responses that generate tokens incrementally.

### Manual SSE

Create an SSE stream manually using `ReadableStream`:

* [  JavaScript ](#tab-panel-5883)
* [  TypeScript ](#tab-panel-5884)

JavaScript

```

export class StreamAgent extends Agent {

  async onRequest(request) {

    const encoder = new TextEncoder();


    const stream = new ReadableStream({

      async start(controller) {

        // Send events

        controller.enqueue(encoder.encode("data: Starting...\n\n"));


        for (let i = 1; i <= 5; i++) {

          await new Promise((r) => setTimeout(r, 500));

          controller.enqueue(encoder.encode(`data: Step ${i} complete\n\n`));

        }


        controller.enqueue(encoder.encode("data: Done!\n\n"));

        controller.close();

      },

    });


    return new Response(stream, {

      headers: {

        "Content-Type": "text/event-stream",

        "Cache-Control": "no-cache",

        Connection: "keep-alive",

      },

    });

  }

}


```

TypeScript

```

export class StreamAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const encoder = new TextEncoder();


    const stream = new ReadableStream({

      async start(controller) {

        // Send events

        controller.enqueue(encoder.encode("data: Starting...\n\n"));


        for (let i = 1; i <= 5; i++) {

          await new Promise((r) => setTimeout(r, 500));

          controller.enqueue(encoder.encode(`data: Step ${i} complete\n\n`));

        }


        controller.enqueue(encoder.encode("data: Done!\n\n"));

        controller.close();

      },

    });


    return new Response(stream, {

      headers: {

        "Content-Type": "text/event-stream",

        "Cache-Control": "no-cache",

        Connection: "keep-alive",

      },

    });

  }

}


```

### SSE message format

SSE messages follow a specific format:

```

data: your message here\n\n


```

You can also include event types and IDs:

```

event: update\n

id: 123\n

data: {"count": 42}\n\n


```

### With AI SDK

The [AI SDK ↗](https://ai-sdk.dev/) provides built-in SSE streaming:

* [  JavaScript ](#tab-panel-5877)
* [  TypeScript ](#tab-panel-5878)

JavaScript

```

import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class ChatAgent extends Agent {

  async onRequest(request) {

    const { prompt } = await request.json();


    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: prompt,

    });


    return result.toTextStreamResponse();

  }

}


```

TypeScript

```

import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


interface Env {

  AI: Ai;

}


export class ChatAgent extends Agent<Env> {

  async onRequest(request: Request): Promise<Response> {

    const { prompt } = await request.json<{ prompt: string }>();


    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: prompt,

    });


    return result.toTextStreamResponse();

  }

}


```

## Connection handling

SSE connections can be long-lived. Handle client disconnects gracefully:

* **Persist progress** — Write to [agent state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) so clients can resume
* **Use agent routing** — Clients can [reconnect to the same agent instance](https://developers.cloudflare.com/agents/runtime/communication/routing/) without session stores
* **No timeout limits** — Cloudflare Workers have no effective limit on SSE response duration

* [  JavaScript ](#tab-panel-5881)
* [  TypeScript ](#tab-panel-5882)

JavaScript

```

export class ResumeAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);

    const lastEventId = request.headers.get("Last-Event-ID");


    if (lastEventId) {

      // Client is resuming - send events after lastEventId

      return this.resumeStream(lastEventId);

    }


    return this.startStream();

  }


  async startStream() {

    // Start new stream, saving progress to this.state

  }


  async resumeStream(fromId) {

    // Resume from saved state

  }

}


```

TypeScript

```

export class ResumeAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);

    const lastEventId = request.headers.get("Last-Event-ID");


    if (lastEventId) {

      // Client is resuming - send events after lastEventId

      return this.resumeStream(lastEventId);

    }


    return this.startStream();

  }


  async startStream(): Promise<Response> {

    // Start new stream, saving progress to this.state

  }


  async resumeStream(fromId: string): Promise<Response> {

    // Resume from saved state

  }

}


```

## WebSockets vs SSE

| Feature      | WebSockets             | SSE                                |
| ------------ | ---------------------- | ---------------------------------- |
| Direction    | Bi-directional         | Server → Client only               |
| Protocol     | ws:// / wss://         | HTTP                               |
| Binary data  | Yes                    | No (text only)                     |
| Reconnection | Manual                 | Automatic (browser)                |
| Best for     | Interactive apps, chat | Streaming responses, notifications |

**Recommendation:** Use WebSockets for interactive applications. Use SSE for streaming AI responses or server-push notifications.

Refer to [WebSockets](https://developers.cloudflare.com/agents/runtime/communication/websockets/) for WebSocket documentation.

## Next steps

[ WebSockets ](https://developers.cloudflare.com/agents/runtime/communication/websockets/) Bi-directional real-time communication. 

[ State management ](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) Persist stream progress and agent state. 

[ Build a chat agent ](https://developers.cloudflare.com/agents/examples/chat-agent/) Streaming responses with AI chat. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/communication/http-sse/#page","headline":"HTTP and Server-Sent Events · Cloudflare Agents docs","description":"Handle HTTP requests and stream responses with Server-Sent Events (SSE) from Cloudflare Agents.","url":"https://developers.cloudflare.com/agents/runtime/communication/http-sse/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/communication/","name":"Communication"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/communication/http-sse/","name":"HTTP and Server-Sent Events"}}]}
```
