---
title: Protocol messages
description: Control the identity, state, and MCP protocol messages sent to WebSocket clients on Agent connect.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protocol messages

When a WebSocket client connects to an Agent, the framework automatically sends several JSON text frames — identity, state, and MCP server lists. You can suppress these per-connection protocol messages for clients that cannot handle them.

## Overview

On every new connection, the Agent sends three protocol messages:

| Message type            | Content                   |
| ----------------------- | ------------------------- |
| cf\_agent\_identity     | Agent name and class      |
| cf\_agent\_state        | Current agent state       |
| cf\_agent\_mcp\_servers | Connected MCP server list |

State and MCP messages are also broadcast to all connections whenever they change.

For most web clients this is fine — the [Client SDK](https://developers.cloudflare.com/agents/communication-channels/chat/client-sdk/) and `useAgent` hook consume these messages automatically. However, some clients cannot handle JSON text frames:

* **Binary-only clients** — MQTT devices, IoT sensors, custom binary protocols
* **Lightweight clients** — Embedded systems with minimal WebSocket stacks
* **Non-browser clients** — Hardware devices connecting via WebSocket

For these connections, you can suppress protocol messages while keeping everything else (RPC, regular messages, broadcasts via `this.broadcast()`) working normally.

## Suppressing protocol messages

Override `shouldSendProtocolMessages` to control which connections receive protocol messages. Return `false` to suppress them.

* [  JavaScript ](#tab-panel-5885)
* [  TypeScript ](#tab-panel-5886)

JavaScript

```

import { Agent } from "agents";


export class IoTAgent extends Agent {

  shouldSendProtocolMessages(connection, ctx) {

    const url = new URL(ctx.request.url);

    return url.searchParams.get("protocol") !== "false";

  }

}


```

TypeScript

```

import { Agent, type Connection, type ConnectionContext } from "agents";


export class IoTAgent extends Agent<Env, State> {

  shouldSendProtocolMessages(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    return url.searchParams.get("protocol") !== "false";

  }

}


```

This hook runs during `onConnect`, before any messages are sent. When it returns `false`:

* No `cf_agent_identity`, `cf_agent_state`, or `cf_agent_mcp_servers` messages are sent on connect
* The connection is excluded from state and MCP broadcasts going forward
* RPC calls, regular `onMessage` handling, and `this.broadcast()` still work normally

### Using WebSocket subprotocol

You can also check the WebSocket subprotocol header, which is the standard way to negotiate protocols over WebSocket:

* [  JavaScript ](#tab-panel-5887)
* [  TypeScript ](#tab-panel-5888)

JavaScript

```

export class MqttAgent extends Agent {

  shouldSendProtocolMessages(connection, ctx) {

    // MQTT-over-WebSocket clients negotiate via subprotocol

    const subprotocol = ctx.request.headers.get("Sec-WebSocket-Protocol");

    return subprotocol !== "mqtt";

  }

}


```

TypeScript

```

export class MqttAgent extends Agent<Env, State> {

  shouldSendProtocolMessages(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    // MQTT-over-WebSocket clients negotiate via subprotocol

    const subprotocol = ctx.request.headers.get("Sec-WebSocket-Protocol");

    return subprotocol !== "mqtt";

  }

}


```

## Checking protocol status

Use `isConnectionProtocolEnabled` to check whether a connection has protocol messages enabled:

* [  JavaScript ](#tab-panel-5889)
* [  TypeScript ](#tab-panel-5890)

JavaScript

```

export class MyAgent extends Agent {

  @callable()

  async getConnectionInfo() {

    const { connection } = getCurrentAgent();

    if (!connection) return null;


    return {

      protocolEnabled: this.isConnectionProtocolEnabled(connection),

      readonly: this.isConnectionReadonly(connection),

    };

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env, State> {

  @callable()

  async getConnectionInfo() {

    const { connection } = getCurrentAgent();

    if (!connection) return null;


    return {

      protocolEnabled: this.isConnectionProtocolEnabled(connection),

      readonly: this.isConnectionReadonly(connection),

    };

  }

}


```

## What is and is not suppressed

The following table shows what still works when protocol messages are suppressed for a connection:

| Action                                                    | Works? |
| --------------------------------------------------------- | ------ |
| Receive cf\_agent\_identity on connect                    | **No** |
| Receive cf\_agent\_state on connect and broadcasts        | **No** |
| Receive cf\_agent\_mcp\_servers on connect and broadcasts | **No** |
| Send and receive regular WebSocket messages               | Yes    |
| Call @callable() RPC methods                              | Yes    |
| Receive this.broadcast() messages                         | Yes    |
| Send binary data                                          | Yes    |
| Mutate agent state via RPC                                | Yes    |

## Combining with readonly

A connection can be both readonly and protocol-suppressed. This is useful for binary devices that should observe but not modify state:

* [  JavaScript ](#tab-panel-5891)
* [  TypeScript ](#tab-panel-5892)

JavaScript

```

export class SensorHub extends Agent {

  shouldSendProtocolMessages(connection, ctx) {

    const url = new URL(ctx.request.url);

    // Binary sensors don't handle JSON protocol frames

    return url.searchParams.get("type") !== "sensor";

  }


  shouldConnectionBeReadonly(connection, ctx) {

    const url = new URL(ctx.request.url);

    // Sensors can only report data via RPC, not modify shared state

    return url.searchParams.get("type") === "sensor";

  }


  @callable()

  async reportReading(sensorId, value) {

    // This RPC still works for readonly+no-protocol connections

    // because it writes to SQL, not agent state

    this

      .sql`INSERT INTO readings (sensor_id, value, ts) VALUES (${sensorId}, ${value}, ${Date.now()})`;

  }

}


```

TypeScript

```

export class SensorHub extends Agent<Env, SensorState> {

  shouldSendProtocolMessages(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    // Binary sensors don't handle JSON protocol frames

    return url.searchParams.get("type") !== "sensor";

  }


  shouldConnectionBeReadonly(

    connection: Connection,

    ctx: ConnectionContext,

  ): boolean {

    const url = new URL(ctx.request.url);

    // Sensors can only report data via RPC, not modify shared state

    return url.searchParams.get("type") === "sensor";

  }


  @callable()

  async reportReading(sensorId: string, value: number) {

    // This RPC still works for readonly+no-protocol connections

    // because it writes to SQL, not agent state

    this

      .sql`INSERT INTO readings (sensor_id, value, ts) VALUES (${sensorId}, ${value}, ${Date.now()})`;

  }

}


```

Both flags are stored in the connection's WebSocket attachment and hidden from `connection.state` — they do not interfere with each other or with user-defined connection state.

## API reference

### `shouldSendProtocolMessages`

An overridable hook that determines if a connection should receive protocol messages when it connects.

| Parameter   | Type              | Description                         |
| ----------- | ----------------- | ----------------------------------- |
| connection  | Connection        | The connecting client               |
| ctx         | ConnectionContext | Contains the upgrade request        |
| **Returns** | boolean           | false to suppress protocol messages |

Default: returns `true` (all connections receive protocol messages).

This hook is evaluated once on connect. The result is persisted in the connection's WebSocket attachment and survives [hibernation](https://developers.cloudflare.com/agents/runtime/communication/websockets/#hibernation).

### `isConnectionProtocolEnabled`

Check if a connection currently has protocol messages enabled.

| Parameter   | Type       | Description                           |
| ----------- | ---------- | ------------------------------------- |
| connection  | Connection | The connection to check               |
| **Returns** | boolean    | true if protocol messages are enabled |

Safe to call at any time, including after the agent wakes from hibernation.

## How it works

Protocol status is stored as an internal flag in the connection's WebSocket attachment — the same mechanism used by [readonly connections](https://developers.cloudflare.com/agents/runtime/communication/readonly-connections/). This means:

* **Survives hibernation** — the flag is serialized and restored when the agent wakes up
* **No cleanup needed** — connection state is automatically discarded when the connection closes
* **Zero overhead** — no database tables or queries, just the connection's built-in attachment
* **Safe from user code** — `connection.state` and `connection.setState()` never expose or overwrite the flag

Unlike [readonly](https://developers.cloudflare.com/agents/runtime/communication/readonly-connections/) which can be toggled dynamically with `setConnectionReadonly()`, protocol status is set once on connect and cannot be changed afterward. To change a connection's protocol status, the client must disconnect and reconnect.

## Related resources

* [Readonly connections](https://developers.cloudflare.com/agents/runtime/communication/readonly-connections/)
* [WebSockets](https://developers.cloudflare.com/agents/runtime/communication/websockets/)
* [Store and sync state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/)
* [MCP Client API](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/communication/protocol-messages/#page","headline":"Protocol messages · Cloudflare Agents docs","description":"Control the identity, state, and MCP protocol messages sent to WebSocket clients on Agent connect.","url":"https://developers.cloudflare.com/agents/runtime/communication/protocol-messages/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/communication/","name":"Communication"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/communication/protocol-messages/","name":"Protocol messages"}}]}
```
