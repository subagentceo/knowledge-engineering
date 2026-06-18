---
title: Browser terminals
description: Connect browser-based terminals to sandbox shells using xterm.js or raw WebSockets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser terminals

This guide shows you how to connect a browser-based terminal to a sandbox shell. You can use the `SandboxAddon` with xterm.js, or connect directly over WebSockets.

## Prerequisites

You need an existing Cloudflare Worker with a sandbox binding. Refer to [Getting started](https://developers.cloudflare.com/sandbox/get-started/) if you do not have one.

Install the terminal dependencies in your frontend project:

 npm  yarn  pnpm  bun 

```
npm install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox
```

```
yarn install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox
```

```
pnpm install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox
```

```
bun install @xterm/xterm @xterm/addon-fit @cloudflare/sandbox
```

If you are not using xterm.js, you only need `@cloudflare/sandbox` for types.

## Handle WebSocket upgrades in the Worker

Add a route that proxies WebSocket connections to the sandbox terminal. The example below supports both the default session and named sessions via a query parameter:

* [  JavaScript ](#tab-panel-10303)
* [  TypeScript ](#tab-panel-10304)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    if (

      url.pathname === "/ws/terminal" &&

      request.headers.get("Upgrade") === "websocket"

    ) {

      const sandbox = getSandbox(env.Sandbox, "my-sandbox");

      const sessionId = url.searchParams.get("session");


      if (sessionId) {

        const session = await sandbox.getSession(sessionId);

        return await session.terminal(request);

      }


      return await sandbox.terminal(request, { cols: 80, rows: 24 });

    }


    return new Response("Not found", { status: 404 });

  },

};


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    if (url.pathname === '/ws/terminal' && request.headers.get('Upgrade') === 'websocket') {

      const sandbox = getSandbox(env.Sandbox, 'my-sandbox');

      const sessionId = url.searchParams.get('session');


      if (sessionId) {

        const session = await sandbox.getSession(sessionId);

        return await session.terminal(request);

      }


      return await sandbox.terminal(request, { cols: 80, rows: 24 });

    }


    return new Response('Not found', { status: 404 });

  }

};


```

## Connect with xterm.js and SandboxAddon

Create the terminal in your browser code and attach the `SandboxAddon`. The addon manages the WebSocket connection, automatic reconnection, and resize forwarding.

* [  JavaScript ](#tab-panel-10305)
* [  TypeScript ](#tab-panel-10306)

JavaScript

```

import { Terminal } from "@xterm/xterm";

import { FitAddon } from "@xterm/addon-fit";

import { SandboxAddon } from "@cloudflare/sandbox/xterm";

import "@xterm/xterm/css/xterm.css";


const terminal = new Terminal({ cursorBlink: true });

const fitAddon = new FitAddon();

terminal.loadAddon(fitAddon);


const addon = new SandboxAddon({

  getWebSocketUrl: ({ sandboxId, sessionId, origin }) => {

    const params = new URLSearchParams({ id: sandboxId });

    if (sessionId) params.set("session", sessionId);

    return `${origin}/ws/terminal?${params}`;

  },

  onStateChange: (state, error) => {

    console.log(`Terminal ${state}`, error ?? "");

  },

});


terminal.loadAddon(addon);

terminal.open(document.getElementById("terminal"));

fitAddon.fit();


// Connect to the default session

addon.connect({ sandboxId: "my-sandbox" });


// Or connect to a specific session

// addon.connect({ sandboxId: 'my-sandbox', sessionId: 'development' });


window.addEventListener("resize", () => fitAddon.fit());


```

TypeScript

```

import { Terminal } from '@xterm/xterm';

import { FitAddon } from '@xterm/addon-fit';

import { SandboxAddon } from '@cloudflare/sandbox/xterm';

import '@xterm/xterm/css/xterm.css';


const terminal = new Terminal({ cursorBlink: true });

const fitAddon = new FitAddon();

terminal.loadAddon(fitAddon);


const addon = new SandboxAddon({

  getWebSocketUrl: ({ sandboxId, sessionId, origin }) => {

    const params = new URLSearchParams({ id: sandboxId });

    if (sessionId) params.set('session', sessionId);

    return `${origin}/ws/terminal?${params}`;

  },

  onStateChange: (state, error) => {

    console.log(`Terminal ${state}`, error ?? '');

  }

});


terminal.loadAddon(addon);

terminal.open(document.getElementById('terminal'));

fitAddon.fit();


// Connect to the default session

addon.connect({ sandboxId: 'my-sandbox' });


// Or connect to a specific session

// addon.connect({ sandboxId: 'my-sandbox', sessionId: 'development' });


window.addEventListener('resize', () => fitAddon.fit());


```

For the full addon API, refer to the [Terminal API reference](https://developers.cloudflare.com/sandbox/api/terminal/).

## Connect without xterm.js

If you are building a custom terminal UI or running in an environment without xterm.js, connect directly over WebSockets. The protocol uses binary frames for terminal data and JSON text frames for control messages.

* [  JavaScript ](#tab-panel-10307)
* [  TypeScript ](#tab-panel-10308)

JavaScript

```

const ws = new WebSocket("wss://example.com/ws/terminal?id=my-sandbox");

ws.binaryType = "arraybuffer";


const decoder = new TextDecoder();

const encoder = new TextEncoder();


ws.addEventListener("message", (event) => {

  if (event.data instanceof ArrayBuffer) {

    // Terminal output (binary) — includes ANSI escape sequences

    const text = decoder.decode(event.data);

    appendToDisplay(text);

    return;

  }


  // Control message (JSON text)

  const msg = JSON.parse(event.data);


  switch (msg.type) {

    case "ready":

      // Terminal is accepting input — send initial resize

      ws.send(JSON.stringify({ type: "resize", cols: 80, rows: 24 }));

      break;


    case "exit":

      console.log(`Shell exited: code ${msg.code}`);

      break;


    case "error":

      console.error("Terminal error:", msg.message);

      break;

  }

});


// Send keystrokes as binary

function sendInput(text) {

  if (ws.readyState === WebSocket.OPEN) {

    ws.send(encoder.encode(text));

  }

}


```

TypeScript

```

const ws = new WebSocket('wss://example.com/ws/terminal?id=my-sandbox');

ws.binaryType = 'arraybuffer';


const decoder = new TextDecoder();

const encoder = new TextEncoder();


ws.addEventListener('message', (event) => {

  if (event.data instanceof ArrayBuffer) {

    // Terminal output (binary) — includes ANSI escape sequences

    const text = decoder.decode(event.data);

    appendToDisplay(text);

    return;

  }


  // Control message (JSON text)

  const msg = JSON.parse(event.data);


  switch (msg.type) {

    case 'ready':

      // Terminal is accepting input — send initial resize

      ws.send(JSON.stringify({ type: 'resize', cols: 80, rows: 24 }));

      break;


    case 'exit':

      console.log(`Shell exited: code ${msg.code}`);

      break;


    case 'error':

      console.error('Terminal error:', msg.message);

      break;

  }

});


// Send keystrokes as binary

function sendInput(text: string): void {

  if (ws.readyState === WebSocket.OPEN) {

    ws.send(encoder.encode(text));

  }

}


```

Key protocol details:

* Set `binaryType` to `arraybuffer` before connecting.
* Buffered output from a previous connection arrives as binary frames before the `ready` message.
* Send keystrokes as binary (UTF-8). Send control messages (`resize`) as JSON text.
* The PTY stays alive when a client disconnects. Reconnecting replays buffered output.

For the full protocol specification, refer to the [WebSocket protocol section](https://developers.cloudflare.com/sandbox/api/terminal/#websocket-protocol) in the API reference.

## Best practices

* **Always use FitAddon** — Without it, terminal dimensions do not match the container and text wraps incorrectly.
* **Handle resize events** — Call `fitAddon.fit()` on window resize so the terminal and PTY stay in sync.
* **Clean up on unmount** — Call `addon.disconnect()` when removing the terminal from the page.
* **Scope terminals to a user sandbox** — Use sessions for multiple terminal contexts in the same workspace. Use separate sandboxes for separate users.

## Related resources

* [Terminal API reference](https://developers.cloudflare.com/sandbox/api/terminal/) — Method signatures, addon API, and WebSocket protocol
* [Terminal connections](https://developers.cloudflare.com/sandbox/concepts/terminal/) — How terminal connections work
* [Session management](https://developers.cloudflare.com/sandbox/concepts/sessions/) — How sessions work

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/browser-terminals/#page","headline":"Browser terminals · Cloudflare Sandbox SDK docs","description":"Connect browser-based terminals to sandbox shells using xterm.js or raw WebSockets.","url":"https://developers.cloudflare.com/sandbox/guides/browser-terminals/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/browser-terminals/","name":"Browser terminals"}}]}
```
