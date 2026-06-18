---
title: WebSockets
description: Handle real-time WebSocket connections, messages, broadcasts, and lifecycle hooks in the Agents SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WebSockets

Agents support WebSocket connections for real-time, bi-directional communication. This page covers server-side WebSocket handling. For client-side connection, refer to the [Client SDK](https://developers.cloudflare.com/agents/communication-channels/chat/client-sdk/).

## Lifecycle hooks

Agents have several lifecycle hooks that fire at different points:

| Hook                                        | When called                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| onStart(props?)                             | Once when the agent first starts (before any connections)                                  |
| onRequest(request)                          | When an HTTP request is received (non-WebSocket)                                           |
| onConnect(connection, ctx)                  | When a new WebSocket connection is established                                             |
| onMessage(connection, message)              | When a WebSocket message is received                                                       |
| onClose(connection, code, reason, wasClean) | When a WebSocket connection closes                                                         |
| onError(connection, error)                  | When a WebSocket error occurs on a connection                                              |
| onError(error)                              | When a server-level error occurs (not tied to a specific connection)                       |
| shouldSendProtocolMessages(connection, ctx) | Whether to send protocol messages (identity, state, MCP) to this connection. Default: true |

### `onStart`

`onStart()` is called once when the agent first starts, before any connections are established:

* [  JavaScript ](#tab-panel-5987)
* [  TypeScript ](#tab-panel-5988)

JavaScript

```

export class MyAgent extends Agent {

  async onStart() {

    // Initialize resources

    console.log(`Agent ${this.name} starting...`);


    // Load data from storage

    const savedData = this.sql`SELECT * FROM cache`;

    for (const row of savedData) {

      // Rebuild in-memory state from persistent storage

    }

  }


  onConnect(connection) {

    // By the time connections arrive, onStart has completed

  }

}


```

TypeScript

```

export class MyAgent extends Agent {

  async onStart() {

    // Initialize resources

    console.log(`Agent ${this.name} starting...`);


    // Load data from storage

    const savedData = this.sql`SELECT * FROM cache`;

    for (const row of savedData) {

      // Rebuild in-memory state from persistent storage

    }

  }


  onConnect(connection: Connection) {

    // By the time connections arrive, onStart has completed

  }

}


```

## Handling connections

Define `onConnect` and `onMessage` methods on your Agent to accept WebSocket connections:

* [  JavaScript ](#tab-panel-5993)
* [  TypeScript ](#tab-panel-5994)

JavaScript

```

import { Agent, Connection, ConnectionContext, WSMessage } from "agents";


export class ChatAgent extends Agent {

  async onConnect(connection, ctx) {

    // Connections are automatically accepted

    // Access the original request for auth, headers, cookies

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");


    if (!token) {

      connection.close(4001, "Unauthorized");

      return;

    }


    // Store user info on this connection

    connection.setState({ authenticated: true });

  }


  async onMessage(connection, message) {

    if (typeof message === "string") {

      // Handle text message

      const data = JSON.parse(message);

      connection.send(JSON.stringify({ received: data }));

    }

  }

}


```

TypeScript

```

import { Agent, Connection, ConnectionContext, WSMessage } from "agents";


export class ChatAgent extends Agent {

  async onConnect(connection: Connection, ctx: ConnectionContext) {

    // Connections are automatically accepted

    // Access the original request for auth, headers, cookies

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");


    if (!token) {

      connection.close(4001, "Unauthorized");

      return;

    }


    // Store user info on this connection

    connection.setState({ authenticated: true });

  }


  async onMessage(connection: Connection, message: WSMessage) {

    if (typeof message === "string") {

      // Handle text message

      const data = JSON.parse(message);

      connection.send(JSON.stringify({ received: data }));

    }

  }

}


```

## Connection object

Each connected client has a unique `Connection` object:

| Property/Method       | Type                | Description                                                                             |
| --------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| id                    | string              | Unique identifier for this connection                                                   |
| uri                   | string \| null      | URL of the original WebSocket upgrade request. Persists across hibernation              |
| state                 | State               | Per-connection state object                                                             |
| setState(state)       | void                | Update connection state                                                                 |
| send(message)         | void                | Send message to this client                                                             |
| close(code?, reason?) | void                | Close the connection                                                                    |
| tags                  | readonly string\[\] | Tags assigned via getConnectionTags. Always includes the connection ID as the first tag |
| server                | string              | The agent instance name (same as this.name on the Agent)                                |

### Per-connection state

Store data specific to each connection (user info, preferences, etc.):

* [  JavaScript ](#tab-panel-5997)
* [  TypeScript ](#tab-panel-5998)

JavaScript

```

export class ChatAgent extends Agent {

  async onConnect(connection, ctx) {

    const userId = new URL(ctx.request.url).searchParams.get("userId");


    connection.setState({

      userId: userId || "anonymous",

      role: "user",

      joinedAt: Date.now(),

    });

  }


  async onMessage(connection, message) {

    // Access connection-specific state

    console.log(`Message from ${connection.state.userId}`);

  }

}


```

TypeScript

```

interface ConnectionState {

  userId: string;

  role: "admin" | "user";

  joinedAt: number;

}


export class ChatAgent extends Agent {

  async onConnect(

    connection: Connection<ConnectionState>,

    ctx: ConnectionContext,

  ) {

    const userId = new URL(ctx.request.url).searchParams.get("userId");


    connection.setState({

      userId: userId || "anonymous",

      role: "user",

      joinedAt: Date.now(),

    });

  }


  async onMessage(connection: Connection<ConnectionState>, message: WSMessage) {

    // Access connection-specific state

    console.log(`Message from ${connection.state.userId}`);

  }

}


```

## Broadcasting to all clients

Use `this.broadcast()` to send a message to all connected clients:

* [  JavaScript ](#tab-panel-5991)
* [  TypeScript ](#tab-panel-5992)

JavaScript

```

export class ChatAgent extends Agent {

  async onMessage(connection, message) {

    // Broadcast to all connected clients

    this.broadcast(

      JSON.stringify({

        from: connection.id,

        message: message,

        timestamp: Date.now(),

      }),

    );

  }


  // Broadcast from any method

  async notifyAll(event, data) {

    this.broadcast(JSON.stringify({ event, data }));

  }

}


```

TypeScript

```

export class ChatAgent extends Agent {

  async onMessage(connection: Connection, message: WSMessage) {

    // Broadcast to all connected clients

    this.broadcast(

      JSON.stringify({

        from: connection.id,

        message: message,

        timestamp: Date.now(),

      }),

    );

  }


  // Broadcast from any method

  async notifyAll(event: string, data: unknown) {

    this.broadcast(JSON.stringify({ event, data }));

  }

}


```

### Excluding connections

Pass an array of connection IDs to exclude from the broadcast:

* [  JavaScript ](#tab-panel-5985)
* [  TypeScript ](#tab-panel-5986)

JavaScript

```

// Broadcast to everyone except the sender

this.broadcast(

  JSON.stringify({ type: "user-typing", userId: "123" }),

  [connection.id], // Do not send to the originator

);


```

TypeScript

```

// Broadcast to everyone except the sender

this.broadcast(

  JSON.stringify({ type: "user-typing", userId: "123" }),

  [connection.id], // Do not send to the originator

);


```

## Connection tags

Tag connections for easy filtering. Override `getConnectionTags()` to assign tags when a connection is established:

* [  JavaScript ](#tab-panel-5999)
* [  TypeScript ](#tab-panel-6000)

JavaScript

```

export class ChatAgent extends Agent {

  getConnectionTags(connection, ctx) {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");


    const tags = [];

    if (role === "admin") tags.push("admin");

    if (role === "moderator") tags.push("moderator");


    return tags; // Up to 9 tags, max 256 chars each

  }


  // Later, broadcast only to admins

  notifyAdmins(message) {

    for (const conn of this.getConnections("admin")) {

      conn.send(message);

    }

  }

}


```

TypeScript

```

export class ChatAgent extends Agent {

  getConnectionTags(connection: Connection, ctx: ConnectionContext): string[] {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");


    const tags: string[] = [];

    if (role === "admin") tags.push("admin");

    if (role === "moderator") tags.push("moderator");


    return tags; // Up to 9 tags, max 256 chars each

  }


  // Later, broadcast only to admins

  notifyAdmins(message: string) {

    for (const conn of this.getConnections("admin")) {

      conn.send(message);

    }

  }

}


```

### Connection management methods

| Method                      | Signature                               | Description                                                                                                               |
| --------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| getConnections              | (tag?: string) => Iterable<Connection>  | Get all connections, optionally by tag                                                                                    |
| getConnection               | (id: string) => Connection \| undefined | Get connection by ID                                                                                                      |
| getConnectionTags           | (connection, ctx) => string\[\]         | Override to tag connections                                                                                               |
| broadcast                   | (message, without?: string\[\]) => void | Send to all connections                                                                                                   |
| isConnectionReadonly        | (connection) => boolean                 | Check if a connection is [readonly](https://developers.cloudflare.com/agents/runtime/communication/readonly-connections/) |
| isConnectionProtocolEnabled | (connection) => boolean                 | Check if protocol messages are enabled for this connection                                                                |

## Handling binary data

Messages can be strings or binary (`ArrayBuffer` / `ArrayBufferView`):

* [  JavaScript ](#tab-panel-5995)
* [  TypeScript ](#tab-panel-5996)

JavaScript

```

export class FileAgent extends Agent {

  async onMessage(connection, message) {

    if (message instanceof ArrayBuffer) {

      // Handle binary upload

      const bytes = new Uint8Array(message);

      await this.processFile(bytes);

      connection.send(

        JSON.stringify({ status: "received", size: bytes.length }),

      );

    } else if (typeof message === "string") {

      // Handle text command

      const command = JSON.parse(message);

      // ...

    }

  }

}


```

TypeScript

```

export class FileAgent extends Agent {

  async onMessage(connection: Connection, message: WSMessage) {

    if (message instanceof ArrayBuffer) {

      // Handle binary upload

      const bytes = new Uint8Array(message);

      await this.processFile(bytes);

      connection.send(

        JSON.stringify({ status: "received", size: bytes.length }),

      );

    } else if (typeof message === "string") {

      // Handle text command

      const command = JSON.parse(message);

      // ...

    }

  }

}


```

Note

Agents automatically send JSON text frames (identity, state, MCP servers) to every connection. If your client only handles binary data and cannot process these frames, use [shouldSendProtocolMessages](https://developers.cloudflare.com/agents/runtime/communication/protocol-messages/) to suppress them.

## Error and close handling

Handle connection errors and disconnections. The `onError` method has two overloads — one for WebSocket connection errors and one for server-level errors:

* [  JavaScript ](#tab-panel-6005)
* [  TypeScript ](#tab-panel-6006)

JavaScript

```

export class ChatAgent extends Agent {

  // WebSocket connection error


  // Server-level error (not tied to a specific connection)


  onError(connectionOrError, error) {

    if (error) {

      console.error(`Connection ${connectionOrError.id} error:`, error);

    } else {

      console.error("Server error:", connectionOrError);

    }

  }


  async onClose(connection, code, reason, wasClean) {

    console.log(`Connection ${connection.id} closed: ${code} ${reason}`);


    this.broadcast(

      JSON.stringify({

        event: "user-left",

        userId: connection.state?.userId,

      }),

    );

  }

}


```

TypeScript

```

export class ChatAgent extends Agent {

  // WebSocket connection error

  onError(connection: Connection, error: unknown): void;

  // Server-level error (not tied to a specific connection)

  onError(error: unknown): void;

  onError(connectionOrError: Connection | unknown, error?: unknown) {

    if (error) {

      console.error(

        `Connection ${(connectionOrError as Connection).id} error:`,

        error,

      );

    } else {

      console.error("Server error:", connectionOrError);

    }

  }


  async onClose(

    connection: Connection,

    code: number,

    reason: string,

    wasClean: boolean,

  ) {

    console.log(`Connection ${connection.id} closed: ${code} ${reason}`);


    this.broadcast(

      JSON.stringify({

        event: "user-left",

        userId: connection.state?.userId,

      }),

    );

  }

}


```

The default `onError` implementation logs the error and rethrows it. Override it to add custom error handling, reporting, or recovery logic.

## Message types

| Type            | Description                     |
| --------------- | ------------------------------- |
| string          | Text message (typically JSON)   |
| ArrayBuffer     | Binary data                     |
| ArrayBufferView | Typed array view of binary data |

## Hibernation

Agents support hibernation — they can sleep when inactive and wake when needed. This saves resources while maintaining WebSocket connections.

### Enabling hibernation

Hibernation is enabled by default. To disable:

* [  JavaScript ](#tab-panel-5989)
* [  TypeScript ](#tab-panel-5990)

JavaScript

```

export class AlwaysOnAgent extends Agent {

  static options = { hibernate: false };

}


```

TypeScript

```

export class AlwaysOnAgent extends Agent {

  static options = { hibernate: false };

}


```

### How hibernation works

1. Agent is active, handling connections
2. After a period of inactivity with no messages, the agent hibernates (sleeps)
3. WebSocket connections remain open (handled by Cloudflare)
4. When a message arrives, the agent wakes up
5. `onMessage` is called as normal

### What persists across hibernation

| Persists                 | Does not persist    |
| ------------------------ | ------------------- |
| this.state (agent state) | In-memory variables |
| connection.state         | Timers/intervals    |
| SQLite data (this.sql)   | Promises in flight  |
| Connection metadata      | Local caches        |

Store important data in `this.state` or SQLite, not in class properties:

* [  JavaScript ](#tab-panel-6001)
* [  TypeScript ](#tab-panel-6002)

JavaScript

```

export class MyAgent extends Agent {

  initialState = { counter: 0 };


  // Do not do this - lost on hibernation

  localCounter = 0;


  onMessage(connection, message) {

    // Persists across hibernation

    this.setState({ counter: this.state.counter + 1 });


    // Lost after hibernation

    this.localCounter++;

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env, { counter: number }> {

  initialState = { counter: 0 };


  // Do not do this - lost on hibernation

  private localCounter = 0;


  onMessage(connection: Connection, message: WSMessage) {

    // Persists across hibernation

    this.setState({ counter: this.state.counter + 1 });


    // Lost after hibernation

    this.localCounter++;

  }

}


```

## Common patterns

### Presence tracking

Track who is online using per-connection state. Connection state is automatically cleaned up when users disconnect:

* [  JavaScript ](#tab-panel-6009)
* [  TypeScript ](#tab-panel-6010)

JavaScript

```

export class PresenceAgent extends Agent {

  onConnect(connection, ctx) {

    const url = new URL(ctx.request.url);

    const name = url.searchParams.get("name") || "Anonymous";


    connection.setState({

      name,

      joinedAt: Date.now(),

      lastSeen: Date.now(),

    });


    // Send current presence to new user

    connection.send(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );


    // Notify others that someone joined

    this.broadcastPresence();

  }


  onClose(connection) {

    // No manual cleanup needed - connection state is automatically gone

    this.broadcastPresence();

  }


  onMessage(connection, message) {

    if (message === "ping") {

      connection.setState((prev) => ({

        ...prev,

        lastSeen: Date.now(),

      }));

      connection.send("pong");

    }

  }


  getPresence() {

    const users = {};

    for (const conn of this.getConnections()) {

      if (conn.state) {

        users[conn.id] = {

          name: conn.state.name,

          lastSeen: conn.state.lastSeen,

        };

      }

    }

    return users;

  }


  broadcastPresence() {

    this.broadcast(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );

  }

}


```

TypeScript

```

type UserState = {

  name: string;

  joinedAt: number;

  lastSeen: number;

};


export class PresenceAgent extends Agent {

  onConnect(connection: Connection<UserState>, ctx: ConnectionContext) {

    const url = new URL(ctx.request.url);

    const name = url.searchParams.get("name") || "Anonymous";


    connection.setState({

      name,

      joinedAt: Date.now(),

      lastSeen: Date.now(),

    });


    // Send current presence to new user

    connection.send(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );


    // Notify others that someone joined

    this.broadcastPresence();

  }


  onClose(connection: Connection) {

    // No manual cleanup needed - connection state is automatically gone

    this.broadcastPresence();

  }


  onMessage(connection: Connection<UserState>, message: WSMessage) {

    if (message === "ping") {

      connection.setState((prev) => ({

        ...prev!,

        lastSeen: Date.now(),

      }));

      connection.send("pong");

    }

  }


  private getPresence() {

    const users: Record<string, { name: string; lastSeen: number }> = {};

    for (const conn of this.getConnections<UserState>()) {

      if (conn.state) {

        users[conn.id] = {

          name: conn.state.name,

          lastSeen: conn.state.lastSeen,

        };

      }

    }

    return users;

  }


  private broadcastPresence() {

    this.broadcast(

      JSON.stringify({

        type: "presence",

        users: this.getPresence(),

      }),

    );

  }

}


```

### Chat room with broadcast

* [  JavaScript ](#tab-panel-6007)
* [  TypeScript ](#tab-panel-6008)

JavaScript

```

export class ChatRoom extends Agent {

  onConnect(connection, ctx) {

    const url = new URL(ctx.request.url);

    const username = url.searchParams.get("username") || "Anonymous";


    connection.setState({ username });


    // Notify others

    this.broadcast(

      JSON.stringify({

        type: "join",

        user: username,

        timestamp: Date.now(),

      }),

      [connection.id], // Do not send to the joining user

    );

  }


  onMessage(connection, message) {

    if (typeof message !== "string") return;


    const { username } = connection.state;


    this.broadcast(

      JSON.stringify({

        type: "message",

        user: username,

        text: message,

        timestamp: Date.now(),

      }),

    );

  }


  onClose(connection) {

    const { username } = connection.state || {};

    if (username) {

      this.broadcast(

        JSON.stringify({

          type: "leave",

          user: username,

          timestamp: Date.now(),

        }),

      );

    }

  }

}


```

TypeScript

```

type Message = {

  type: "message" | "join" | "leave";

  user: string;

  text?: string;

  timestamp: number;

};


export class ChatRoom extends Agent {

  onConnect(connection: Connection, ctx: ConnectionContext) {

    const url = new URL(ctx.request.url);

    const username = url.searchParams.get("username") || "Anonymous";


    connection.setState({ username });


    // Notify others

    this.broadcast(

      JSON.stringify({

        type: "join",

        user: username,

        timestamp: Date.now(),

      } satisfies Message),

      [connection.id], // Do not send to the joining user

    );

  }


  onMessage(connection: Connection, message: WSMessage) {

    if (typeof message !== "string") return;


    const { username } = connection.state as { username: string };


    this.broadcast(

      JSON.stringify({

        type: "message",

        user: username,

        text: message,

        timestamp: Date.now(),

      } satisfies Message),

    );

  }


  onClose(connection: Connection) {

    const { username } = (connection.state as { username: string }) || {};

    if (username) {

      this.broadcast(

        JSON.stringify({

          type: "leave",

          user: username,

          timestamp: Date.now(),

        } satisfies Message),

      );

    }

  }

}


```

## Suppressing protocol messages

By default, agents send JSON text frames (identity, state sync, MCP server lists) to every connection. Override `shouldSendProtocolMessages` to suppress them for specific connections — for example, binary-only clients that cannot handle JSON text frames:

* [  JavaScript ](#tab-panel-6003)
* [  TypeScript ](#tab-panel-6004)

JavaScript

```

export class IoTAgent extends Agent {

  shouldSendProtocolMessages(connection, ctx) {

    const url = new URL(ctx.request.url);

    return url.searchParams.get("protocol") !== "binary";

  }

}


```

TypeScript

```

export class IoTAgent extends Agent {

  shouldSendProtocolMessages(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    return url.searchParams.get("protocol") !== "binary";

  }

}


```

When this returns `false`, the connection does not receive identity, state, or MCP server list frames — neither on connect nor via broadcasts. The connection can still send and receive regular messages, use RPC, and participate in all non-protocol communication.

Use `isConnectionProtocolEnabled(connection)` to check the status of any connection at runtime.

## Agent properties

These properties are available on `this` inside any Agent method:

| Property   | Type               | Description                                                               |
| ---------- | ------------------ | ------------------------------------------------------------------------- |
| this.name  | string             | The instance name of this agent                                           |
| this.state | State              | The current agent state (lazy-loaded from SQLite)                         |
| this.env   | Env                | Worker environment bindings                                               |
| this.ctx   | DurableObjectState | Durable Object context (storage, alarms, etc.)                            |
| this.sql   | template tag       | SQL template tag for executing queries against the agent's SQLite storage |
| this.mcp   | MCPClientManager   | MCP client manager for connecting to external MCP servers                 |

## Connecting from clients

For browser connections, use the Agents client SDK:

* **Vanilla JS**: `AgentClient` from `agents/client`
* **React**: `useAgent` hook from `agents/react`

Refer to [Client SDK](https://developers.cloudflare.com/agents/communication-channels/chat/client-sdk/) for full documentation.

## Next steps

[ State synchronization ](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) Sync state between agents and clients. 

[ Callable methods ](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/) RPC over WebSockets for method calls. 

[ Cross-domain authentication ](https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/) Secure WebSocket connections across domains. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/communication/websockets/#page","headline":"WebSockets · Cloudflare Agents docs","description":"Handle real-time WebSocket connections, messages, broadcasts, and lifecycle hooks in the Agents SDK.","url":"https://developers.cloudflare.com/agents/runtime/communication/websockets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/communication/","name":"Communication"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/communication/websockets/","name":"WebSockets"}}]}
```
