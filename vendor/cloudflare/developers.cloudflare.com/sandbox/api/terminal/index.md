---
title: Terminal
description: Connect browser-based terminal UIs to sandbox shells via WebSocket.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terminal

Connect browser-based terminal UIs to sandbox shells via WebSocket. The server-side `terminal()` method proxies WebSocket connections to the container, and the client-side `SandboxAddon` integrates with xterm.js for terminal rendering.

## Server-side methods

### `terminal()`

Proxy a WebSocket upgrade request to create a terminal connection.

TypeScript

```

const response = await sandbox.terminal(request: Request, options?: PtyOptions): Promise<Response>


```

**Parameters**:

* `request` \- WebSocket upgrade request from the browser (must include `Upgrade: websocket` header)
* `options` (optional):  
   * `cols` \- Terminal width in columns (default: `80`)  
   * `rows` \- Terminal height in rows (default: `24`)

**Returns**: `Promise<Response>` — WebSocket upgrade response

* [  JavaScript ](#tab-panel-10187)
* [  TypeScript ](#tab-panel-10188)

JavaScript

```

// In your Worker's fetch handler

return await sandbox.terminal(request, { cols: 120, rows: 30 });


```

TypeScript

```

// In your Worker's fetch handler

return await sandbox.terminal(request, { cols: 120, rows: 30 });


```

Works with both [default and explicitly created sessions](https://developers.cloudflare.com/sandbox/concepts/sessions/):

* [  JavaScript ](#tab-panel-10189)
* [  TypeScript ](#tab-panel-10190)

JavaScript

```

// Default session

return await sandbox.terminal(request);


// Specific session

const session = await sandbox.getSession("dev");

return await session.terminal(request);


```

TypeScript

```

// Default session

return await sandbox.terminal(request);


// Specific session

const session = await sandbox.getSession('dev');

return await session.terminal(request);


```

## Client-side addon

The `@cloudflare/sandbox/xterm` module provides `SandboxAddon` for xterm.js, which handles the WebSocket connection, reconnection, and terminal resize forwarding.

### `SandboxAddon`

TypeScript

```

import { SandboxAddon } from '@cloudflare/sandbox/xterm';


const addon = new SandboxAddon(options: SandboxAddonOptions);


```

**Options**:

* `getWebSocketUrl(params)` \- Build the WebSocket URL for each connection attempt. Receives:  
   * `sandboxId` \- Target sandbox ID  
   * `sessionId` (optional) - Target session ID  
   * `origin` \- WebSocket origin derived from `window.location` (for example, `wss://example.com`)
* `reconnect` \- Enable automatic reconnection with exponential backoff (default: `true`)
* `onStateChange(state, error?)` \- Callback for connection state changes

* [  JavaScript ](#tab-panel-10191)
* [  TypeScript ](#tab-panel-10192)

JavaScript

```

import { Terminal } from "@xterm/xterm";

import { SandboxAddon } from "@cloudflare/sandbox/xterm";


const terminal = new Terminal({ cursorBlink: true });

terminal.open(document.getElementById("terminal"));


const addon = new SandboxAddon({

  getWebSocketUrl: ({ sandboxId, sessionId, origin }) => {

    const params = new URLSearchParams({ id: sandboxId });

    if (sessionId) params.set("session", sessionId);

    return `${origin}/ws/terminal?${params}`;

  },

  onStateChange: (state, error) => {

    console.log(`Terminal ${state}`, error);

  },

});


terminal.loadAddon(addon);

addon.connect({ sandboxId: "my-sandbox" });


```

TypeScript

```

import { Terminal } from '@xterm/xterm';

import { SandboxAddon } from '@cloudflare/sandbox/xterm';


const terminal = new Terminal({ cursorBlink: true });

terminal.open(document.getElementById('terminal'));


const addon = new SandboxAddon({

  getWebSocketUrl: ({ sandboxId, sessionId, origin }) => {

    const params = new URLSearchParams({ id: sandboxId });

    if (sessionId) params.set('session', sessionId);

    return `${origin}/ws/terminal?${params}`;

  },

  onStateChange: (state, error) => {

    console.log(`Terminal ${state}`, error);

  }

});


terminal.loadAddon(addon);

addon.connect({ sandboxId: 'my-sandbox' });


```

### `connect()`

Establish a connection to a sandbox terminal.

TypeScript

```

addon.connect(target: ConnectionTarget): void


```

**Parameters**:

* `target`:  
   * `sandboxId` \- Sandbox to connect to  
   * `sessionId` (optional) - Session within the sandbox

Calling `connect()` with a new target disconnects from the current target and connects to the new one. Calling it with the same target while already connected is a no-op.

### `disconnect()`

Close the connection and stop any reconnection attempts.

TypeScript

```

addon.disconnect(): void


```

### Properties

| Property  | Type                           | Description        |                          |
| --------- | ------------------------------ | ------------------ | ------------------------ |
| state     | 'disconnected' \| 'connecting' | 'connected'        | Current connection state |
| sandboxId | string \| undefined            | Current sandbox ID |                          |
| sessionId | string \| undefined            | Current session ID |                          |

## WebSocket protocol

The `SandboxAddon` handles the WebSocket protocol automatically. These details are for building custom terminal clients without the addon. For a complete example, refer to [Connect without xterm.js](https://developers.cloudflare.com/sandbox/guides/browser-terminals/#connect-without-xtermjs).

### Connection lifecycle

1. Client opens a WebSocket to your Worker endpoint. Set `binaryType` to `arraybuffer`.
2. The server replays any **buffered output** from a previous connection as binary frames. This may arrive before the `ready` message.
3. The server sends a `ready` status message — the terminal is now accepting input.
4. Binary frames flow in both directions: UTF-8 encoded keystrokes from the client, terminal output (including ANSI escape sequences) from the server.
5. If the client disconnects, the PTY stays alive. Reconnecting to the same session replays buffered output so the terminal appears unchanged.

### Control messages (client to server)

Send JSON text frames to control the terminal.

**Resize** — update terminal dimensions (both `cols` and `rows` must be positive):

```

{ "type": "resize", "cols": 120, "rows": 30 }


```

### Status messages (server to client)

The server sends JSON text frames for lifecycle events.

**Ready** — the PTY is initialized. Buffered output (if any) has already been sent:

```

{ "type": "ready" }


```

**Exit** — the shell process has terminated:

```

{ "type": "exit", "code": 0, "signal": "SIGTERM" }


```

**Error** — an error occurred (for example, invalid control message or session not found):

```

{ "type": "error", "message": "Session not found" }


```

## Types

TypeScript

```

interface PtyOptions {

  cols?: number;

  rows?: number;

}


type ConnectionState = "disconnected" | "connecting" | "connected";


interface ConnectionTarget {

  sandboxId: string;

  sessionId?: string;

}


interface SandboxAddonOptions {

  getWebSocketUrl: (params: {

    sandboxId: string;

    sessionId?: string;

    origin: string;

  }) => string;

  reconnect?: boolean;

  onStateChange?: (state: ConnectionState, error?: Error) => void;

}


```

## Related resources

* [Terminal connections](https://developers.cloudflare.com/sandbox/concepts/terminal/) — How terminal connections work
* [Browser terminals](https://developers.cloudflare.com/sandbox/guides/browser-terminals/) — Step-by-step setup guide
* [Sessions API](https://developers.cloudflare.com/sandbox/api/sessions/) — Session management
* [Commands API](https://developers.cloudflare.com/sandbox/api/commands/) — Non-interactive command execution

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/terminal/#page","headline":"Terminal · Cloudflare Sandbox SDK docs","description":"Connect browser-based terminal UIs to sandbox shells via WebSocket.","url":"https://developers.cloudflare.com/sandbox/api/terminal/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/terminal/","name":"Terminal"}}]}
```
