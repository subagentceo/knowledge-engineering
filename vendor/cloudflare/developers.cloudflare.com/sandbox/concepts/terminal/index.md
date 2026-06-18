---
title: Terminal connections
description: Sandbox SDK terminal connections stream bidirectional data between browser UIs and container shells.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terminal connections

Terminal connections let browser-based UIs interact directly with sandbox shells. Instead of executing discrete commands with `exec()`, a terminal connection opens a persistent, bidirectional channel to a bash shell — the same model as SSH or a local terminal emulator.

## How terminal connections work

Terminal connections use WebSockets to stream raw bytes between a browser terminal (like [xterm.js ↗](https://xtermjs.org/)) and a pseudo-terminal (PTY) process running inside the sandbox container.

```

Browser (xterm.js) <-- WebSocket --> Worker <-- proxy --> Container PTY (bash)


```

1. The browser sends a WebSocket upgrade request to your Worker
2. Your Worker calls `sandbox.terminal(request)`, which proxies the upgrade to the container
3. The container spawns a bash shell attached to a PTY
4. Raw bytes flow bidirectionally — keystrokes in, terminal output out

This is fundamentally different from `exec()`:

* **`exec()`** runs a single command to completion and returns the result
* **`terminal()`** opens a persistent shell where users type commands interactively

## Output buffering

The container buffers terminal output in a ring buffer. When a client disconnects and reconnects, the server replays buffered output so the terminal appears unchanged. This means:

* Short network interruptions are invisible to users
* Reconnected terminals show previous output without re-running commands
* The buffer has a fixed size, so very old output may be lost

No client-side code is needed to handle buffering — the container manages it transparently.

## Automatic reconnection

Network interruptions are common in browser-based applications. Terminal connections handle this through a combination of server-side buffering (described above) and client-side reconnection with exponential backoff.

The `SandboxAddon` for xterm.js implements this automatically. If you are building a custom client, you are responsible for your own reconnection logic — the server-side buffering works regardless of which client connects. Refer to the [WebSocket protocol reference](https://developers.cloudflare.com/sandbox/api/terminal/#websocket-protocol) for details on the connection lifecycle.

## Session-specific terminals

Each [session](https://developers.cloudflare.com/sandbox/concepts/sessions/) can have its own terminal with independent shell state:

TypeScript

```

const devSession = await sandbox.createSession({

  id: "dev",

  cwd: "/workspace/frontend",

  env: { NODE_ENV: "development" },

});


const testSession = await sandbox.createSession({

  id: "test",

  cwd: "/workspace",

  env: { NODE_ENV: "test" },

});


// Each session's terminal has its own working directory,

// environment variables, and command history


```

Multiple browser clients can connect to the same session's terminal simultaneously. They all see the same shell output and can send input. Use this pattern for intentional collaboration inside one workspace, not to separate independent users.

## WebSocket protocol

Terminal connections use binary WebSocket frames for terminal I/O (for performance) and JSON text frames for control and status messages (for structure). This keeps the data path fast while still allowing structured communication for operations like terminal resizing.

For the full protocol specification, including the connection lifecycle and message formats, refer to the [Terminal API reference](https://developers.cloudflare.com/sandbox/api/terminal/#websocket-protocol).

## When to use terminals vs commands

| Use case                                   | Approach                              |
| ------------------------------------------ | ------------------------------------- |
| Run a command and get the result           | exec() or execStream()                |
| Interactive shell for end users            | terminal()                            |
| Long-running process with real-time output | startProcess() \+ streamProcessLogs() |
| Collaborative terminal sharing             | terminal() with shared session        |

## Related resources

* [Terminal API reference](https://developers.cloudflare.com/sandbox/api/terminal/) — Method signatures and types
* [Browser terminals](https://developers.cloudflare.com/sandbox/guides/browser-terminals/) — Step-by-step setup guide
* [Session management](https://developers.cloudflare.com/sandbox/concepts/sessions/) — How sessions work
* [Architecture](https://developers.cloudflare.com/sandbox/concepts/architecture/) — Overall SDK design

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/concepts/terminal/#page","headline":"Terminal connections · Cloudflare Sandbox SDK docs","description":"Sandbox SDK terminal connections stream bidirectional data between browser UIs and container shells.","url":"https://developers.cloudflare.com/sandbox/concepts/terminal/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/concepts/terminal/","name":"Terminal connections"}}]}
```
