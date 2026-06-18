---
title: Build a WebSocket server
description: Build a WebSocket server using Durable Objects and Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a WebSocket server

**Last reviewed:**  over 2 years ago 

Build a WebSocket server using Durable Objects and Workers.

This example shows how to build a WebSocket server using Durable Objects and Workers. The example exposes an endpoint to create a new WebSocket connection. This WebSocket connection echos any message while including the total number of WebSocket connections currently established. For more information, refer to [Use Durable Objects with WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Warning

WebSocket connections pin your Durable Object to memory, and so duration charges will be incurred so long as the WebSocket is connected (regardless of activity). To avoid duration charges during periods of inactivity, use the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/), which only charges for duration when JavaScript is actively executing.

* [  JavaScript ](#tab-panel-8364)
* [  TypeScript ](#tab-panel-8365)
* [  Python ](#tab-panel-8366)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Worker

export default {

  async fetch(request, env, ctx) {

    if (request.url.endsWith("/websocket")) {

      // Expect to receive a WebSocket Upgrade request.

      // If there is one, accept the request and return a WebSocket Response.

      const upgradeHeader = request.headers.get("Upgrade");

      if (!upgradeHeader || upgradeHeader !== "websocket") {

        return new Response("Worker expected Upgrade: websocket", {

          status: 426,

        });

      }


      if (request.method !== "GET") {

        return new Response("Worker expected GET method", {

          status: 400,

        });

      }


      // Since we are hard coding the Durable Object ID by providing the constant name 'foo',

      // all requests to this Worker will be sent to the same Durable Object instance.

      let id = env.WEBSOCKET_SERVER.idFromName("foo");

      let stub = env.WEBSOCKET_SERVER.get(id);


      return stub.fetch(request);

    }


    return new Response(

      `Supported endpoints:

/websocket: Expects a WebSocket upgrade request`,

      {

        status: 200,

        headers: {

          "Content-Type": "text/plain",

        },

      },

    );

  },

};


// Durable Object

export class WebSocketServer extends DurableObject {

  // Keeps track of all WebSocket connections

  sessions;


  constructor(ctx, env) {

    super(ctx, env);

    this.sessions = new Map();

  }


  async fetch(request) {

    // Creates two ends of a WebSocket connection.

    const webSocketPair = new WebSocketPair();

    const [client, server] = Object.values(webSocketPair);


    // Calling `accept()` tells the runtime that this WebSocket is to begin terminating

    // request within the Durable Object. It has the effect of "accepting" the connection,

    // and allowing the WebSocket to send and receive messages.

    server.accept();


    // Generate a random UUID for the session.

    const id = crypto.randomUUID();

    // Add the WebSocket connection to the map of active sessions.

    this.sessions.set(server, { id });


    server.addEventListener("message", (event) => {

      this.handleWebSocketMessage(server, event.data);

    });


    // When the client closes the connection, clean up the server side.

    server.addEventListener("close", () => {

      this.handleConnectionClose(server);

    });


    return new Response(null, {

      status: 101,

      webSocket: client,

    });

  }


  async handleWebSocketMessage(ws, message) {

    const connection = this.sessions.get(ws);


    // Reply back with the same message to the connection

    ws.send(

      `[Durable Object] message: ${message}, from: ${connection.id}, to: the initiating client. Total connections: ${this.sessions.size}`,

    );


    // Broadcast the message to all the connections,

    // except the one that sent the message.

    this.sessions.forEach((_, session) => {

      if (session !== ws) {

        session.send(

          `[Durable Object] message: ${message}, from: ${connection.id}, to: all clients except the initiating client. Total connections: ${this.sessions.size}`,

        );

      }

    });


    // Broadcast the message to all the connections,

    // including the one that sent the message.

    this.sessions.forEach((_, session) => {

      session.send(

        `[Durable Object] message: ${message}, from: ${connection.id}, to: all clients. Total connections: ${this.sessions.size}`,

      );

    });

  }


  async handleConnectionClose(ws) {

    this.sessions.delete(ws);

    // With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime

    // auto-replies to Close frames. Calling close() is safe but no longer required.

    ws.close(1000, "Durable Object is closing WebSocket");

  }

}


```

TypeScript

```

import { DurableObject } from 'cloudflare:workers';


// Worker

export default {

    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

        if (request.url.endsWith('/websocket')) {

            // Expect to receive a WebSocket Upgrade request.

            // If there is one, accept the request and return a WebSocket Response.

            const upgradeHeader = request.headers.get('Upgrade');

            if (!upgradeHeader || upgradeHeader !== 'websocket') {

                return new Response('Worker expected Upgrade: websocket', {

                    status: 426,

                });

            }


            if (request.method !== 'GET') {

                return new Response('Worker expected GET method', {

                    status: 400,

                });

            }


            // Since we are hard coding the Durable Object ID by providing the constant name 'foo',

            // all requests to this Worker will be sent to the same Durable Object instance.

            let id = env.WEBSOCKET_SERVER.idFromName('foo');

            let stub = env.WEBSOCKET_SERVER.get(id);


            return stub.fetch(request);

        }


        return new Response(

            `Supported endpoints:

/websocket: Expects a WebSocket upgrade request`,

            {

                status: 200,

                headers: {

                    'Content-Type': 'text/plain',

                },

            }

        );

    },

};


// Durable Object

export class WebSocketServer extends DurableObject {

    // Keeps track of all WebSocket connections

    sessions: Map<WebSocket, { [key: string]: string }>;


    constructor(ctx: DurableObjectState, env: Env) {

        super(ctx, env);

        this.sessions = new Map();

    }


    async fetch(request: Request): Promise<Response> {

        // Creates two ends of a WebSocket connection.

        const webSocketPair = new WebSocketPair();

        const [client, server] = Object.values(webSocketPair);


        // Calling `accept()` tells the runtime that this WebSocket is to begin terminating

        // request within the Durable Object. It has the effect of "accepting" the connection,

        // and allowing the WebSocket to send and receive messages.

        server.accept();


        // Generate a random UUID for the session.

        const id = crypto.randomUUID();

        // Add the WebSocket connection to the map of active sessions.

        this.sessions.set(server, { id });


        server.addEventListener('message', (event) => {

            this.handleWebSocketMessage(server, event.data);

        });


        // When the client closes the connection, clean up the server side.

        server.addEventListener('close', () => {

            this.handleConnectionClose(server);

        });


        return new Response(null, {

            status: 101,

            webSocket: client,

        });

    }


    async handleWebSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {

        const connection = this.sessions.get(ws)!;


        // Reply back with the same message to the connection

        ws.send(`[Durable Object] message: ${message}, from: ${connection.id}, to: the initiating client. Total connections: ${this.sessions.size}`);


        // Broadcast the message to all the connections,

        // except the one that sent the message.

        this.sessions.forEach((_, session) => {

            if (session !== ws) {

                session.send(`[Durable Object] message: ${message}, from: ${connection.id}, to: all clients except the initiating client. Total connections: ${this.sessions.size}`);

            }

        });


        // Broadcast the message to all the connections,

        // including the one that sent the message.

        this.sessions.forEach((_, session) => {

            session.send(`[Durable Object] message: ${message}, from: ${connection.id}, to: all clients. Total connections: ${this.sessions.size}`);

        });

    }


    async handleConnectionClose(ws: WebSocket) {

        this.sessions.delete(ws);

        // With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime

        // auto-replies to Close frames. Calling close() is safe but no longer required.

        ws.close(1000, 'Durable Object is closing WebSocket');

    }

}


```

Python

```

from workers import DurableObject, Response, WorkerEntrypoint

from js import WebSocketPair

from pyodide.ffi import create_proxy

import uuid


class Session:

  def __init__(self, *, ws):

    self.ws = ws


# Worker

class Default(WorkerEntrypoint):

  async def fetch(self, request):

    if request.url.endswith('/websocket'):

      # Expect to receive a WebSocket Upgrade request.

      # If there is one, accept the request and return a WebSocket Response.

      upgrade_header = request.headers.get('Upgrade')

      if not upgrade_header or upgrade_header != 'websocket':

        return Response('Worker expected Upgrade: websocket', status=426)


      if request.method != 'GET':

        return Response('Worker expected GET method', status=400)


      # Since we are hard coding the Durable Object ID by providing the constant name 'foo',

      # all requests to this Worker will be sent to the same Durable Object instance.

      id = self.env.WEBSOCKET_SERVER.idFromName('foo')

      stub = self.env.WEBSOCKET_SERVER.get(id)


      return await stub.fetch(request)


    return Response(

      """Supported endpoints:

/websocket: Expects a WebSocket upgrade request""",

      status=200,

      headers={'Content-Type': 'text/plain'}

    )


# Durable Object

class WebSocketServer(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)

    # Keeps track of all WebSocket connections, keyed by session ID

    self.sessions = {}


  async def fetch(self, request):

    # Creates two ends of a WebSocket connection.

    client, server = WebSocketPair.new().object_values()


    # Calling `accept()` tells the runtime that this WebSocket is to begin terminating

    # request within the Durable Object. It has the effect of "accepting" the connection,

    # and allowing the WebSocket to send and receive messages.

    server.accept()


    # Generate a random UUID for the session.

    id = str(uuid.uuid4())


    # Create proxies for event handlers (must be destroyed when socket closes)

    async def on_message(event):

      await self.handleWebSocketMessage(id, event.data)


    message_proxy = create_proxy(on_message)

    server.addEventListener('message', message_proxy)


    # When the client closes the connection, clean up the server side.

    async def on_close(event):

      await self.handleConnectionClose(id)

      # Clean up proxies

      message_proxy.destroy()

      close_proxy.destroy()


    close_proxy = create_proxy(on_close)

    server.addEventListener('close', close_proxy)


    # Add the WebSocket connection to the map of active sessions, keyed by session ID.

    self.sessions[id] = Session(ws=server)


    return Response(None, status=101, web_socket=client)


  async def handleWebSocketMessage(self, session_id, message):

    session = self.sessions[session_id]


    # Reply back with the same message to the connection

    session.ws.send(f"[Durable Object] message: {message}, from: {session_id}, to: the initiating client. Total connections: {len(self.sessions)}")


    # Broadcast the message to all the connections,

    # except the one that sent the message.

    for id, conn in self.sessions.items():

      if id != session_id:

        conn.ws.send(f"[Durable Object] message: {message}, from: {session_id}, to: all clients except the initiating client. Total connections: {len(self.sessions)}")


    # Broadcast the message to all the connections,

    # including the one that sent the message.

    for id, conn in self.sessions.items():

      conn.ws.send(f"[Durable Object] message: {message}, from: {session_id}, to: all clients. Total connections: {len(self.sessions)}")


  async def handleConnectionClose(self, session_id):

    session = self.sessions.pop(session_id, None)

    if session:

      # With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime

      # auto-replies to Close frames. Calling close() is safe but no longer required.

      session.ws.close(1000, 'Durable Object is closing WebSocket')


```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* [  wrangler.jsonc ](#tab-panel-8362)
* [  wrangler.toml ](#tab-panel-8363)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "websocket-server",

  "main": "src/index.ts",

  "durable_objects": {

    "bindings": [

      {

        "name": "WEBSOCKET_SERVER",

        "class_name": "WebSocketServer"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "WebSocketServer"

      ]

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "websocket-server"

main = "src/index.ts"


[[durable_objects.bindings]]

name = "WEBSOCKET_SERVER"

class_name = "WebSocketServer"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "WebSocketServer" ]


```

### Related resources

* [Durable Objects: Edge Chat Demo ↗](https://github.com/cloudflare/workers-chat-demo).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/websocket-server/#page","headline":"Build a WebSocket server · Cloudflare Durable Objects docs","description":"Build a WebSocket server using Durable Objects and Workers.","url":"https://developers.cloudflare.com/durable-objects/examples/websocket-server/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WebSockets"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/websocket-server/","name":"Build a WebSocket server"}}]}
```
