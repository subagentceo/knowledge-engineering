---
title: Readonly connections
description: Restrict WebSocket clients to view-only access so they receive state updates without modifying Agent state.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Readonly connections

Readonly connections restrict certain WebSocket clients from modifying agent state while still letting them receive state updates and call non-mutating RPC methods.

## Overview

When a connection is marked as readonly:

* It **receives** state updates from the server
* It **can call** RPC methods that do not modify state
* It **cannot** call `this.setState()` — neither via client-side `setState()` nor via a `@callable()` method that calls `this.setState()` internally

This is useful for scenarios like:

* **View-only modes**: Users who should only observe but not modify
* **Role-based access**: Restricting state modifications based on user roles
* **Multi-tenant scenarios**: Some tenants have read-only access
* **Audit and monitoring connections**: Observers that should not affect the system

* [  JavaScript ](#tab-panel-5893)
* [  TypeScript ](#tab-panel-5894)

JavaScript

```

import { Agent } from "agents";


export class DocAgent extends Agent {

  shouldConnectionBeReadonly(connection, ctx) {

    const url = new URL(ctx.request.url);

    return url.searchParams.get("mode") === "view";

  }

}


```

TypeScript

```

import { Agent, type Connection, type ConnectionContext } from "agents";


export class DocAgent extends Agent<Env, DocState> {

  shouldConnectionBeReadonly(connection: Connection, ctx: ConnectionContext) {

    const url = new URL(ctx.request.url);

    return url.searchParams.get("mode") === "view";

  }

}


```

* [  JavaScript ](#tab-panel-5895)
* [  TypeScript ](#tab-panel-5896)

JavaScript

```

// Client - view-only mode

const agent = useAgent({

  agent: "DocAgent",

  name: "doc-123",

  query: { mode: "view" },

  onStateUpdateError: (error) => {

    toast.error("You're in view-only mode");

  },

});


```

TypeScript

```

// Client - view-only mode

const agent = useAgent({

  agent: "DocAgent",

  name: "doc-123",

  query: { mode: "view" },

  onStateUpdateError: (error) => {

    toast.error("You're in view-only mode");

  },

});


```

## Marking connections as readonly

### On connect

Override `shouldConnectionBeReadonly` to evaluate each connection when it first connects. Return `true` to mark it readonly.

* [  JavaScript ](#tab-panel-5899)
* [  TypeScript ](#tab-panel-5900)

JavaScript

```

export class MyAgent extends Agent {

  shouldConnectionBeReadonly(connection, ctx) {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");

    return role === "viewer" || role === "guest";

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env, State> {

  shouldConnectionBeReadonly(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");

    return role === "viewer" || role === "guest";

  }

}


```

This hook runs before the initial state is sent to the client, so the connection is readonly from the very first message.

### At any time

Use `setConnectionReadonly` to change a connection's readonly status dynamically:

* [  JavaScript ](#tab-panel-5905)
* [  TypeScript ](#tab-panel-5906)

JavaScript

```

export class GameAgent extends Agent {

  @callable()

  async startSpectating() {

    const { connection } = getCurrentAgent();

    if (connection) {

      this.setConnectionReadonly(connection, true);

    }

  }


  @callable()

  async joinAsPlayer() {

    const { connection } = getCurrentAgent();

    if (connection) {

      this.setConnectionReadonly(connection, false);

    }

  }

}


```

TypeScript

```

export class GameAgent extends Agent<Env, GameState> {

  @callable()

  async startSpectating() {

    const { connection } = getCurrentAgent();

    if (connection) {

      this.setConnectionReadonly(connection, true);

    }

  }


  @callable()

  async joinAsPlayer() {

    const { connection } = getCurrentAgent();

    if (connection) {

      this.setConnectionReadonly(connection, false);

    }

  }

}


```

### Letting a connection toggle its own status

A connection can toggle its own readonly status via a callable. This is useful for lock/unlock UIs where viewers can opt into editing mode:

* [  JavaScript ](#tab-panel-5901)
* [  TypeScript ](#tab-panel-5902)

JavaScript

```

import { Agent, callable, getCurrentAgent } from "agents";


export class CollabAgent extends Agent {

  @callable()

  async setMyReadonly(readonly) {

    const { connection } = getCurrentAgent();

    if (connection) {

      this.setConnectionReadonly(connection, readonly);

    }

  }

}


```

TypeScript

```

import { Agent, callable, getCurrentAgent } from "agents";


export class CollabAgent extends Agent<Env, State> {

  @callable()

  async setMyReadonly(readonly: boolean) {

    const { connection } = getCurrentAgent();

    if (connection) {

      this.setConnectionReadonly(connection, readonly);

    }

  }

}


```

On the client:

* [  JavaScript ](#tab-panel-5897)
* [  TypeScript ](#tab-panel-5898)

JavaScript

```

// Toggle between readonly and writable

await agent.call("setMyReadonly", [true]); // lock

await agent.call("setMyReadonly", [false]); // unlock


```

TypeScript

```

// Toggle between readonly and writable

await agent.call("setMyReadonly", [true]); // lock

await agent.call("setMyReadonly", [false]); // unlock


```

### Checking status

Use `isConnectionReadonly` to check a connection's current status:

* [  JavaScript ](#tab-panel-5903)
* [  TypeScript ](#tab-panel-5904)

JavaScript

```

export class MyAgent extends Agent {

  @callable()

  async getPermissions() {

    const { connection } = getCurrentAgent();

    if (connection) {

      return { canEdit: !this.isConnectionReadonly(connection) };

    }

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env, State> {

  @callable()

  async getPermissions() {

    const { connection } = getCurrentAgent();

    if (connection) {

      return { canEdit: !this.isConnectionReadonly(connection) };

    }

  }

}


```

## Handling errors on the client

Errors surface in two ways depending on how the write was attempted:

* **Client-side `setState()`** — the server sends a `cf_agent_state_error` message. Handle it with the `onStateUpdateError` callback.
* **`@callable()` methods** — the RPC call rejects with an error. Handle it with a `try`/`catch` around `agent.call()`.

Note

`onStateUpdateError` also fires when `validateStateChange` rejects a client-originated state update (with the message `"State update rejected"`). This makes the callback useful for handling any rejected state write, not just readonly errors.

* [  JavaScript ](#tab-panel-5907)
* [  TypeScript ](#tab-panel-5908)

JavaScript

```

const agent = useAgent({

  agent: "MyAgent",

  name: "instance",

  // Fires when client-side setState() is blocked

  onStateUpdateError: (error) => {

    setError(error);

  },

});


// Fires when a callable that writes state is blocked

try {

  await agent.call("updateSettings", [newSettings]);

} catch (e) {

  setError(e instanceof Error ? e.message : String(e)); // "Connection is readonly"

}


```

TypeScript

```

const agent = useAgent({

  agent: "MyAgent",

  name: "instance",

  // Fires when client-side setState() is blocked

  onStateUpdateError: (error) => {

    setError(error);

  },

});


// Fires when a callable that writes state is blocked

try {

  await agent.call("updateSettings", [newSettings]);

} catch (e) {

  setError(e instanceof Error ? e.message : String(e)); // "Connection is readonly"

}


```

To avoid showing errors in the first place, check permissions before rendering edit controls:

```

function Editor() {

  const [canEdit, setCanEdit] = useState(false);

  const agent = useAgent({ agent: "MyAgent", name: "instance" });


  useEffect(() => {

    agent.call("getPermissions").then((p) => setCanEdit(p.canEdit));

  }, []);


  return <button disabled={!canEdit}>{canEdit ? "Edit" : "View Only"}</button>;

}


```

## API reference

### `shouldConnectionBeReadonly`

An overridable hook that determines if a connection should be marked as readonly when it connects.

| Parameter   | Type              | Description                  |
| ----------- | ----------------- | ---------------------------- |
| connection  | Connection        | The connecting client        |
| ctx         | ConnectionContext | Contains the upgrade request |
| **Returns** | boolean           | true to mark as readonly     |

Default: returns `false` (all connections are writable).

### `setConnectionReadonly`

Mark or unmark a connection as readonly. Can be called at any time.

| Parameter  | Type       | Description                           |
| ---------- | ---------- | ------------------------------------- |
| connection | Connection | The connection to update              |
| readonly   | boolean    | true to make readonly (default: true) |

### `isConnectionReadonly`

Check if a connection is currently readonly.

| Parameter   | Type       | Description             |
| ----------- | ---------- | ----------------------- |
| connection  | Connection | The connection to check |
| **Returns** | boolean    | true if readonly        |

### `onStateUpdateError` (client)

Callback on `AgentClient` and `useAgent` options. Called when the server rejects a state update.

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| error     | string | Error message from the server |

## Examples

### Query parameter based access

* [  JavaScript ](#tab-panel-5911)
* [  TypeScript ](#tab-panel-5912)

JavaScript

```

export class DocumentAgent extends Agent {

  shouldConnectionBeReadonly(connection, ctx) {

    const url = new URL(ctx.request.url);

    const mode = url.searchParams.get("mode");

    return mode === "view";

  }

}


// Client connects with readonly mode

const agent = useAgent({

  agent: "DocumentAgent",

  name: "doc-123",

  query: { mode: "view" },

  onStateUpdateError: (error) => {

    toast.error("Document is in view-only mode");

  },

});


```

TypeScript

```

export class DocumentAgent extends Agent<Env, DocumentState> {

  shouldConnectionBeReadonly(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    const mode = url.searchParams.get("mode");

    return mode === "view";

  }

}


// Client connects with readonly mode

const agent = useAgent({

  agent: "DocumentAgent",

  name: "doc-123",

  query: { mode: "view" },

  onStateUpdateError: (error) => {

    toast.error("Document is in view-only mode");

  },

});


```

### Role-based access control

* [  JavaScript ](#tab-panel-5921)
* [  TypeScript ](#tab-panel-5922)

JavaScript

```

export class CollaborativeAgent extends Agent {

  shouldConnectionBeReadonly(connection, ctx) {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");

    return role === "viewer" || role === "guest";

  }


  onConnect(connection, ctx) {

    const url = new URL(ctx.request.url);

    const userId = url.searchParams.get("userId");


    console.log(

      `User ${userId} connected (readonly: ${this.isConnectionReadonly(connection)})`,

    );

  }


  @callable()

  async upgradeToEditor() {

    const { connection } = getCurrentAgent();

    if (!connection) return;


    // Check permissions (pseudo-code)

    const canUpgrade = await checkUserPermissions();

    if (canUpgrade) {

      this.setConnectionReadonly(connection, false);

      return { success: true };

    }


    throw new Error("Insufficient permissions");

  }

}


```

TypeScript

```

export class CollaborativeAgent extends Agent<Env, CollabState> {

  shouldConnectionBeReadonly(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    const role = url.searchParams.get("role");

    return role === "viewer" || role === "guest";

  }


  onConnect(connection: Connection, ctx: ConnectionContext) {

    const url = new URL(ctx.request.url);

    const userId = url.searchParams.get("userId");


    console.log(

      `User ${userId} connected (readonly: ${this.isConnectionReadonly(connection)})`,

    );

  }


  @callable()

  async upgradeToEditor() {

    const { connection } = getCurrentAgent();

    if (!connection) return;


    // Check permissions (pseudo-code)

    const canUpgrade = await checkUserPermissions();

    if (canUpgrade) {

      this.setConnectionReadonly(connection, false);

      return { success: true };

    }


    throw new Error("Insufficient permissions");

  }

}


```

### Admin dashboard

* [  JavaScript ](#tab-panel-5923)
* [  TypeScript ](#tab-panel-5924)

JavaScript

```

export class MonitoringAgent extends Agent {

  shouldConnectionBeReadonly(connection, ctx) {

    const url = new URL(ctx.request.url);

    // Only admins can modify state

    return url.searchParams.get("admin") !== "true";

  }


  onStateChanged(state, source) {

    if (source !== "server") {

      // Log who modified the state

      console.log(`State modified by connection ${source.id}`);

    }

  }

}


// Admin client (can modify)

const adminAgent = useAgent({

  agent: "MonitoringAgent",

  name: "system",

  query: { admin: "true" },

});


// Viewer client (readonly)

const viewerAgent = useAgent({

  agent: "MonitoringAgent",

  name: "system",

  query: { admin: "false" },

  onStateUpdateError: (error) => {

    console.log("Viewer cannot modify state");

  },

});


```

TypeScript

```

export class MonitoringAgent extends Agent<Env, SystemState> {

  shouldConnectionBeReadonly(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    // Only admins can modify state

    return url.searchParams.get("admin") !== "true";

  }


  onStateChanged(state: SystemState, source: Connection | "server") {

    if (source !== "server") {

      // Log who modified the state

      console.log(`State modified by connection ${source.id}`);

    }

  }

}


// Admin client (can modify)

const adminAgent = useAgent({

  agent: "MonitoringAgent",

  name: "system",

  query: { admin: "true" },

});


// Viewer client (readonly)

const viewerAgent = useAgent({

  agent: "MonitoringAgent",

  name: "system",

  query: { admin: "false" },

  onStateUpdateError: (error) => {

    console.log("Viewer cannot modify state");

  },

});


```

### Dynamic permission changes

* [  JavaScript ](#tab-panel-5925)
* [  TypeScript ](#tab-panel-5926)

JavaScript

```

export class GameAgent extends Agent {

  @callable()

  async startSpectatorMode() {

    const { connection } = getCurrentAgent();

    if (!connection) return;


    this.setConnectionReadonly(connection, true);

    return { mode: "spectator" };

  }


  @callable()

  async joinAsPlayer() {

    const { connection } = getCurrentAgent();

    if (!connection) return;


    const canJoin = this.state.players.length < 4;

    if (canJoin) {

      this.setConnectionReadonly(connection, false);

      return { mode: "player" };

    }


    throw new Error("Game is full");

  }


  @callable()

  async getMyPermissions() {

    const { connection } = getCurrentAgent();

    if (!connection) return null;


    return {

      canEdit: !this.isConnectionReadonly(connection),

      connectionId: connection.id,

    };

  }

}


```

TypeScript

```

export class GameAgent extends Agent<Env, GameState> {

  @callable()

  async startSpectatorMode() {

    const { connection } = getCurrentAgent();

    if (!connection) return;


    this.setConnectionReadonly(connection, true);

    return { mode: "spectator" };

  }


  @callable()

  async joinAsPlayer() {

    const { connection } = getCurrentAgent();

    if (!connection) return;


    const canJoin = this.state.players.length < 4;

    if (canJoin) {

      this.setConnectionReadonly(connection, false);

      return { mode: "player" };

    }


    throw new Error("Game is full");

  }


  @callable()

  async getMyPermissions() {

    const { connection } = getCurrentAgent();

    if (!connection) return null;


    return {

      canEdit: !this.isConnectionReadonly(connection),

      connectionId: connection.id,

    };

  }

}


```

Client-side React component:

```

function GameComponent() {

  const [canEdit, setCanEdit] = useState(false);


  const agent = useAgent({

    agent: "GameAgent",

    name: "game-123",

    onStateUpdateError: (error) => {

      toast.error("Cannot modify game state in spectator mode");

    },

  });


  useEffect(() => {

    agent.call("getMyPermissions").then((perms) => {

      setCanEdit(perms?.canEdit ?? false);

    });

  }, [agent]);


  return (

    <div>

      <button onClick={() => agent.call("joinAsPlayer")} disabled={canEdit}>

        Join as Player

      </button>


      <button

        onClick={() => agent.call("startSpectatorMode")}

        disabled={!canEdit}

      >

        Switch to Spectator

      </button>


      <div>{canEdit ? "You can modify the game" : "You are spectating"}</div>

    </div>

  );

}


```

## How it works

Readonly status is stored in the connection's WebSocket attachment, which persists through the WebSocket Hibernation API. The flag is namespaced internally so it cannot be accidentally overwritten by `connection.setState()`. The same mechanism is used by [protocol message control](https://developers.cloudflare.com/agents/runtime/communication/protocol-messages/) — both flag coexist safely in the attachment. This means:

* **Survives hibernation** — the flag is serialized and restored when the agent wakes up
* **No cleanup needed** — connection state is automatically discarded when the connection closes
* **Zero overhead** — no database tables or queries, just the connection's built-in attachment
* **Safe from user code** — `connection.state` and `connection.setState()` never expose or overwrite the readonly flag

When a readonly connection tries to modify state, the server blocks it — regardless of whether the write comes from client-side `setState()` or from a `@callable()` method:

```

Client (readonly)                     Agent

       │                                │

       │  setState({ count: 1 })        │

       │ ─────────────────────────────▶ │  Check readonly → blocked

       │  ◀───────────────────────────  │

       │  cf_agent_state_error          │

       │                                │

       │  call("increment")             │

       │ ─────────────────────────────▶ │  increment() calls this.setState()

       │                                │  Check readonly → throw

       │  ◀───────────────────────────  │

       │  RPC error: "Connection is     │

       │              readonly"         │

       │                                │

       │  call("getPermissions")        │

       │ ─────────────────────────────▶ │  getPermissions() — no setState()

       │  ◀───────────────────────────  │

       │  RPC result: { canEdit: false }│


```

### What readonly does and does not restrict

| Action                                             | Allowed? |
| -------------------------------------------------- | -------- |
| Receive state broadcasts                           | Yes      |
| Call @callable() methods that do not write state   | Yes      |
| Call @callable() methods that call this.setState() | **No**   |
| Send state updates via client-side setState()      | **No**   |

The enforcement happens inside `setState()` itself. When a `@callable()` method tries to call `this.setState()` and the current connection context is readonly, the framework throws an `Error("Connection is readonly")`. This means you do not need manual permission checks in your RPC methods — any callable that writes state is automatically blocked for readonly connections.

## Caveats

### Side effects in callables still run

The readonly check happens inside `this.setState()`, not at the start of the callable. If your method has side effects before the state write, those will still execute:

* [  JavaScript ](#tab-panel-5909)
* [  TypeScript ](#tab-panel-5910)

JavaScript

```

export class MyAgent extends Agent {

  @callable()

  async processOrder(orderId) {

    await sendConfirmationEmail(orderId); // runs even for readonly connections

    await chargePayment(orderId); // runs too

    this.setState({ ...this.state, orders: [...this.state.orders, orderId] }); // throws

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env, State> {

  @callable()

  async processOrder(orderId: string) {

    await sendConfirmationEmail(orderId); // runs even for readonly connections

    await chargePayment(orderId); // runs too

    this.setState({ ...this.state, orders: [...this.state.orders, orderId] }); // throws

  }

}


```

To avoid this, either check permissions before side effects or structure your code so the state write comes first:

* [  JavaScript ](#tab-panel-5913)
* [  TypeScript ](#tab-panel-5914)

JavaScript

```

export class MyAgent extends Agent {

  @callable()

  async processOrder(orderId) {

    // Write state first — throws immediately for readonly connections

    this.setState({ ...this.state, orders: [...this.state.orders, orderId] });

    // Side effects only run if setState succeeded

    await sendConfirmationEmail(orderId);

    await chargePayment(orderId);

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env, State> {

  @callable()

  async processOrder(orderId: string) {

    // Write state first — throws immediately for readonly connections

    this.setState({ ...this.state, orders: [...this.state.orders, orderId] });

    // Side effects only run if setState succeeded

    await sendConfirmationEmail(orderId);

    await chargePayment(orderId);

  }

}


```

## Best practices

### Combine with authentication

* [  JavaScript ](#tab-panel-5917)
* [  TypeScript ](#tab-panel-5918)

JavaScript

```

export class SecureAgent extends Agent {

  shouldConnectionBeReadonly(connection, ctx) {

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");


    // Verify token and get permissions

    const permissions = this.verifyToken(token);

    return !permissions.canWrite;

  }

}


```

TypeScript

```

export class SecureAgent extends Agent<Env, State> {

  shouldConnectionBeReadonly(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");


    // Verify token and get permissions

    const permissions = this.verifyToken(token);

    return !permissions.canWrite;

  }

}


```

### Provide clear user feedback

* [  JavaScript ](#tab-panel-5915)
* [  TypeScript ](#tab-panel-5916)

JavaScript

```

const agent = useAgent({

  agent: "MyAgent",

  name: "instance",

  onStateUpdateError: (error) => {

    // User-friendly messages

    if (error.includes("readonly")) {

      showToast("You are in view-only mode. Upgrade to edit.");

    }

  },

});


```

TypeScript

```

const agent = useAgent({

  agent: "MyAgent",

  name: "instance",

  onStateUpdateError: (error) => {

    // User-friendly messages

    if (error.includes("readonly")) {

      showToast("You are in view-only mode. Upgrade to edit.");

    }

  },

});


```

### Check permissions before UI actions

```

function EditButton() {

  const [canEdit, setCanEdit] = useState(false);

  const agent = useAgent({

    /* ... */

  });


  useEffect(() => {

    agent.call("checkPermissions").then((perms) => {

      setCanEdit(perms.canEdit);

    });

  }, []);


  return <button disabled={!canEdit}>{canEdit ? "Edit" : "View Only"}</button>;

}


```

### Log access attempts

* [  JavaScript ](#tab-panel-5919)
* [  TypeScript ](#tab-panel-5920)

JavaScript

```

export class AuditedAgent extends Agent {

  onStateChanged(state, source) {

    if (source !== "server") {

      this.audit({

        action: "state_update",

        connectionId: source.id,

        readonly: this.isConnectionReadonly(source),

        timestamp: Date.now(),

      });

    }

  }

}


```

TypeScript

```

export class AuditedAgent extends Agent<Env, State> {

  onStateChanged(state: State, source: Connection | "server") {

    if (source !== "server") {

      this.audit({

        action: "state_update",

        connectionId: source.id,

        readonly: this.isConnectionReadonly(source),

        timestamp: Date.now(),

      });

    }

  }

}


```

## Limitations

* Readonly status only applies to state updates using `setState()`
* RPC methods can still be called (implement your own checks if needed)
* Readonly is a per-connection flag, not tied to user identity

## Related resources

* [Store and sync state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/)
* [Protocol messages](https://developers.cloudflare.com/agents/runtime/communication/protocol-messages/) — suppress JSON protocol frames for binary-only clients (can be combined with readonly)
* [WebSockets](https://developers.cloudflare.com/agents/runtime/communication/websockets/)
* [Callable methods](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/communication/readonly-connections/#page","headline":"Readonly connections · Cloudflare Agents docs","description":"Restrict WebSocket clients to view-only access so they receive state updates without modifying Agent state.","url":"https://developers.cloudflare.com/agents/runtime/communication/readonly-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/communication/","name":"Communication"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/communication/readonly-connections/","name":"Readonly connections"}}]}
```
