---
title: Build a WebSocket server with WebSocket Hibernation
description: Build a WebSocket server using WebSocket Hibernation on Durable Objects and Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a WebSocket server with WebSocket Hibernation

**Last reviewed:**  over 2 years ago 

Build a WebSocket server using WebSocket Hibernation on Durable Objects and Workers.

This example is similar to the [Build a WebSocket server](https://developers.cloudflare.com/durable-objects/examples/websocket-server/) example, but uses the WebSocket Hibernation API. The WebSocket Hibernation API should be preferred for WebSocket server applications built on Durable Objects, since it significantly decreases duration charge, and provides additional features that pair well with WebSocket applications. For more information, refer to [Use Durable Objects with WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Note

WebSocket Hibernation is unavailable for outgoing WebSocket use cases. Hibernation is only supported when the Durable Object acts as a server. For use cases where outgoing WebSockets are required, refer to [Write a WebSocket client](https://developers.cloudflare.com/workers/examples/websockets/#write-a-websocket-client).

* [  JavaScript ](#tab-panel-8359)
* [  TypeScript ](#tab-panel-8360)
* [  Python ](#tab-panel-8361)

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

      let stub = env.WEBSOCKET_HIBERNATION_SERVER.getByName("foo");


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

export class WebSocketHibernationServer extends DurableObject {

  // Keeps track of all WebSocket connections

  // When the DO hibernates, gets reconstructed in the constructor

  sessions;


  constructor(ctx, env) {

    super(ctx, env);

    this.sessions = new Map();


    // As part of constructing the Durable Object,

    // we wake up any hibernating WebSockets and

    // place them back in the `sessions` map.


    // Get all WebSocket connections from the DO

    this.ctx.getWebSockets().forEach((ws) => {

      let attachment = ws.deserializeAttachment();

      if (attachment) {

        // If we previously attached state to our WebSocket,

        // let's add it to `sessions` map to restore the state of the connection.

        this.sessions.set(ws, { ...attachment });

      }

    });


    // Sets an application level auto response that does not wake hibernated WebSockets.

    this.ctx.setWebSocketAutoResponse(

      new WebSocketRequestResponsePair("ping", "pong"),

    );

  }


  async fetch(request) {

    // Creates two ends of a WebSocket connection.

    const webSocketPair = new WebSocketPair();

    const [client, server] = Object.values(webSocketPair);


    // Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating

    // request within the Durable Object. It has the effect of "accepting" the connection,

    // and allowing the WebSocket to send and receive messages.

    // Unlike `ws.accept()`, `this.ctx.acceptWebSocket(ws)` informs the Workers Runtime that the WebSocket

    // is "hibernatable", so the runtime does not need to pin this Durable Object to memory while

    // the connection is open. During periods of inactivity, the Durable Object can be evicted

    // from memory, but the WebSocket connection will remain open. If at some later point the

    // WebSocket receives a message, the runtime will recreate the Durable Object

    // (run the `constructor`) and deliver the message to the appropriate handler.

    this.ctx.acceptWebSocket(server);


    // Generate a random UUID for the session.

    const id = crypto.randomUUID();


    // Attach the session ID to the WebSocket connection and serialize it.

    // This is necessary to restore the state of the connection when the Durable Object wakes up.

    server.serializeAttachment({ id });


    // Add the WebSocket connection to the map of active sessions.

    this.sessions.set(server, { id });


    return new Response(null, {

      status: 101,

      webSocket: client,

    });

  }


  async webSocketMessage(ws, message) {

    // Get the session associated with the WebSocket connection.

    const session = this.sessions.get(ws);


    // Upon receiving a message from the client, the server replies with the same message, the session ID of the connection,

    // and the total number of connections with the "[Durable Object]: " prefix

    ws.send(

      `[Durable Object] message: ${message}, from: ${session.id}, to: the initiating client. Total connections: ${this.sessions.size}`,

    );


    // Send a message to all WebSocket connections, loop over all the connected WebSockets.

    this.sessions.forEach((attachment, connectedWs) => {

      connectedWs.send(

        `[Durable Object] message: ${message}, from: ${session.id}, to: all clients. Total connections: ${this.sessions.size}`,

      );

    });


    // Send a message to all WebSocket connections except the connection (ws),

    // loop over all the connected WebSockets and filter out the connection (ws).

    this.sessions.forEach((attachment, connectedWs) => {

      if (connectedWs !== ws) {

        connectedWs.send(

          `[Durable Object] message: ${message}, from: ${session.id}, to: all clients except the initiating client. Total connections: ${this.sessions.size}`,

        );

      }

    });

  }


  async webSocketClose(ws, code, reason, wasClean) {

    // With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime

    // auto-replies to Close frames. Calling close() is safe but no longer required.

    ws.close(code, reason);

    this.sessions.delete(ws);

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

      let stub = env.WEBSOCKET_HIBERNATION_SERVER.getByName("foo");


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

export class WebSocketHibernationServer extends DurableObject {

  // Keeps track of all WebSocket connections

  // When the DO hibernates, gets reconstructed in the constructor

  sessions: Map<WebSocket, { [key: string]: string }>;


  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

    this.sessions = new Map();


    // As part of constructing the Durable Object,

    // we wake up any hibernating WebSockets and

    // place them back in the `sessions` map.


    // Get all WebSocket connections from the DO

    this.ctx.getWebSockets().forEach((ws) => {

      let attachment = ws.deserializeAttachment();

      if (attachment) {

        // If we previously attached state to our WebSocket,

        // let's add it to `sessions` map to restore the state of the connection.

        this.sessions.set(ws, { ...attachment });

      }

    });


    // Sets an application level auto response that does not wake hibernated WebSockets.

    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'));

  }


  async fetch(request: Request): Promise<Response> {

    // Creates two ends of a WebSocket connection.

    const webSocketPair = new WebSocketPair();

    const [client, server] = Object.values(webSocketPair);


    // Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating

    // request within the Durable Object. It has the effect of "accepting" the connection,

    // and allowing the WebSocket to send and receive messages.

    // Unlike `ws.accept()`, `this.ctx.acceptWebSocket(ws)` informs the Workers Runtime that the WebSocket

    // is "hibernatable", so the runtime does not need to pin this Durable Object to memory while

    // the connection is open. During periods of inactivity, the Durable Object can be evicted

    // from memory, but the WebSocket connection will remain open. If at some later point the

    // WebSocket receives a message, the runtime will recreate the Durable Object

    // (run the `constructor`) and deliver the message to the appropriate handler.

    this.ctx.acceptWebSocket(server);


    // Generate a random UUID for the session.

    const id = crypto.randomUUID();


    // Attach the session ID to the WebSocket connection and serialize it.

    // This is necessary to restore the state of the connection when the Durable Object wakes up.

    server.serializeAttachment({ id });


    // Add the WebSocket connection to the map of active sessions.

    this.sessions.set(server, { id });


    return new Response(null, {

      status: 101,

      webSocket: client,

    });

  }


  async webSocketMessage(ws: WebSocket, message: ArrayBuffer | string) {

    // Get the session associated with the WebSocket connection.

    const session = this.sessions.get(ws)!;


    // Upon receiving a message from the client, the server replies with the same message, the session ID of the connection,

    // and the total number of connections with the "[Durable Object]: " prefix

    ws.send(`[Durable Object] message: ${message}, from: ${session.id}, to: the initiating client. Total connections: ${this.sessions.size}`);


    // Send a message to all WebSocket connections, loop over all the connected WebSockets.

    this.sessions.forEach((attachment, connectedWs) => {

      connectedWs.send(`[Durable Object] message: ${message}, from: ${session.id}, to: all clients. Total connections: ${this.sessions.size}`);

    });


    // Send a message to all WebSocket connections except the connection (ws),

    // loop over all the connected WebSockets and filter out the connection (ws).

    this.sessions.forEach((attachment, connectedWs) => {

      if (connectedWs !== ws) {

          connectedWs.send(`[Durable Object] message: ${message}, from: ${session.id}, to: all clients except the initiating client. Total connections: ${this.sessions.size}`);

      }

    });

  }


  async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {

    // With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime

    // auto-replies to Close frames. Calling close() is safe but no longer required.

    ws.close(code, reason);

    this.sessions.delete(ws);

  }

}


```

Python

```

from workers import DurableObject, Response, WorkerEntrypoint

from js import WebSocketPair, WebSocketRequestResponsePair

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

      stub = self.env.WEBSOCKET_HIBERNATION_SERVER.getByName("foo")


      return await stub.fetch(request)


    return Response(

      """Supported endpoints:

/websocket: Expects a WebSocket upgrade request""",

      status=200,

      headers={'Content-Type': 'text/plain'}

    )


# Durable Object

class WebSocketHibernationServer(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)

    # Keeps track of all WebSocket connections, keyed by session ID

    # When the DO hibernates, gets reconstructed in the constructor

    self.sessions = {}


    # As part of constructing the Durable Object,

    # we wake up any hibernating WebSockets and

    # place them back in the `sessions` map.


    # Get all WebSocket connections from the DO

    for ws in self.ctx.getWebSockets():

      attachment = ws.deserializeAttachment()

      if attachment:

        # If we previously attached state to our WebSocket,

        # let's add it to `sessions` map to restore the state of the connection.

        # Use the session ID as the key

        self.sessions[attachment] = Session(ws=ws)


    # Sets an application level auto response that does not wake hibernated WebSockets.

    self.ctx.setWebSocketAutoResponse(WebSocketRequestResponsePair.new('ping', 'pong'))


  async def fetch(self, request):

    # Creates two ends of a WebSocket connection.

    client, server = WebSocketPair.new().object_values()


    # Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating

    # request within the Durable Object. It has the effect of "accepting" the connection,

    # and allowing the WebSocket to send and receive messages.

    # Unlike `ws.accept()`, `this.ctx.acceptWebSocket(ws)` informs the Workers Runtime that the WebSocket

    # is "hibernatable", so the runtime does not need to pin this Durable Object to memory while

    # the connection is open. During periods of inactivity, the Durable Object can be evicted

    # from memory, but the WebSocket connection will remain open. If at some later point the

    # WebSocket receives a message, the runtime will recreate the Durable Object

    # (run the `constructor`) and deliver the message to the appropriate handler.

    self.ctx.acceptWebSocket(server)


    # Generate a random UUID for the session.

    id = str(uuid.uuid4())


    # Attach the session ID to the WebSocket connection and serialize it.

    # This is necessary to restore the state of the connection when the Durable Object wakes up.

    server.serializeAttachment(id)


    # Add the WebSocket connection to the map of active sessions, keyed by session ID.

    self.sessions[id] = Session(ws=server)


    return Response(None, status=101, web_socket=client)


  async def webSocketMessage(self, ws, message):

    # Get the session ID associated with the WebSocket connection.

    session_id = ws.deserializeAttachment()


    # Upon receiving a message from the client, the server replies with the same message, the session ID of the connection,

    # and the total number of connections with the "[Durable Object]: " prefix

    ws.send(f"[Durable Object] message: {message}, from: {session_id}, to: the initiating client. Total connections: {len(self.sessions)}")


    # Send a message to all WebSocket connections, loop over all the connected WebSockets.

    for session in self.sessions.values():

      session.ws.send(f"[Durable Object] message: {message}, from: {session_id}, to: all clients. Total connections: {len(self.sessions)}")


    # Send a message to all WebSocket connections except the connection (ws),

    # loop over all the connected WebSockets and filter out the connection (ws).

    for session in self.sessions.values():

      if session.ws != ws:

        session.ws.send(f"[Durable Object] message: {message}, from: {session_id}, to: all clients except the initiating client. Total connections: {len(self.sessions)}")


  async def webSocketClose(self, ws, code, reason, wasClean):

    # With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime

    # auto-replies to Close frames. Calling close() is safe but no longer required.

    ws.close(code, reason)

    # Get the session ID from the WebSocket attachment to remove it from sessions

    session_id = ws.deserializeAttachment()

    if session_id:

      self.sessions.pop(session_id, None)


```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* [  wrangler.jsonc ](#tab-panel-8357)
* [  wrangler.toml ](#tab-panel-8358)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "websocket-hibernation-server",

  "main": "src/index.ts",

  "durable_objects": {

    "bindings": [

      {

        "name": "WEBSOCKET_HIBERNATION_SERVER",

        "class_name": "WebSocketHibernationServer"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "WebSocketHibernationServer"

      ]

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "websocket-hibernation-server"

main = "src/index.ts"


[[durable_objects.bindings]]

name = "WEBSOCKET_HIBERNATION_SERVER"

class_name = "WebSocketHibernationServer"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "WebSocketHibernationServer" ]


```

### Related resources

* [Durable Objects: Edge Chat Demo with Hibernation ↗](https://github.com/cloudflare/workers-chat-demo/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/#page","headline":"Build a WebSocket server with WebSocket Hibernation · Cloudflare Durable Objects docs","description":"Build a WebSocket server using WebSocket Hibernation on Durable Objects and Workers.","url":"https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WebSockets"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/websocket-hibernation-server/","name":"Build a WebSocket server with WebSocket Hibernation"}}]}
```
