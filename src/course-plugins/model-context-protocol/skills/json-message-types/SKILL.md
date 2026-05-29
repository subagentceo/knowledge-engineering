---
name: json-message-types
description: The JSON-RPC message taxonomy MCP uses — request/result pairs vs. notifications, and client-vs-server direction — including why servers needing to message clients constrains HTTP transport. Trigger when reasoning about the wire protocol, debugging message flow, or explaining why a feature breaks over HTTP.
---

# JSON Message Types

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

MCP clients and servers exchange **JSON-RPC messages** (method, params, id fields). Each message type has a distinct purpose.

## Categories
- **Request / Result pairs** — always travel together: `call_tool_request` + `call_tool_result`, `initialize_request` + `initialize_result`.
- **Notifications** — fire-and-forget events that need no response: `progress_notification`, `logging_message_notification`, `tool_change_notification` (tool list changed).

## Direction
- **Client messages** — sent by the client to the server.
- **Server messages** — sent by the server to the client.

Key insight: **servers can send messages to clients** (server requests and server notifications). This directional capability is exactly what becomes the critical limitation in the StreamableHTTP transport — HTTP naturally favors client→server only.

## Where the schema lives
The full type set is a **TypeScript file (`schema.ts`) in the MCP spec repository**. It is not executable code — just type descriptions for convenience/reference.

## Grounded in src/
- `src/services/mcp/InProcessTransport.ts` — implements the SDK `Transport` interface over `JSONRPCMessage`, showing the raw message-passing layer (`send()` on one side delivers to `onmessage` on the other).

## Source
Course note: "JSON Message Types" — projects/courses/mcp_advanced file
