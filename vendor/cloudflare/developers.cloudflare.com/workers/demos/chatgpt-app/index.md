---
title: Build an Interactive ChatGPT App
description: Build and deploy an interactive ChatGPT App on Cloudflare Workers with real-time multiplayer state using MCP.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build an Interactive ChatGPT App

**Last reviewed:**  7 months ago 

## Deploy your first ChatGPT App

This guide will show you how to build and deploy an interactive ChatGPT App on Cloudflare Workers that can:

* Render rich, interactive UI widgets directly in ChatGPT conversations
* Maintain real-time, multi-user state using Durable Objects
* Enable bidirectional communication between your app and ChatGPT
* Build multiplayer experiences that run entirely within ChatGPT

You will build a real-time multiplayer chess game that demonstrates these capabilities. Players can start or join games, make moves on an interactive chessboard, and even ask ChatGPT for strategic advice—all without leaving the conversation.

Your ChatGPT App will use the **Model Context Protocol (MCP)** to expose tools and UI resources that ChatGPT can invoke on your behalf.

You can view the full code for this example [here ↗](https://github.com/cloudflare/agents/tree/main/openai-sdk/chess-app).

## Prerequisites

Before you begin, you will need:

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* [Node.js ↗](https://nodejs.org/) installed (v18 or later)
* A [ChatGPT Plus or Team account ↗](https://chat.openai.com/) with developer mode enabled
* Basic knowledge of React and TypeScript

## 1\. Enable ChatGPT Developer Mode

To use ChatGPT Apps (also called connectors), you need to enable developer mode:

1. Open [ChatGPT ↗](https://chat.openai.com/).
2. Go to **Settings** \> **Apps & Connectors** \> **Advanced Settings**
3. Toggle **Developer mode ON**

Once enabled, you will be able to install custom apps during development and testing.

## 2\. Create your ChatGPT App project

1. Create a new project for your Chess App:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-chess-app
```

```
yarn create cloudflare my-chess-app
```

```
pnpm create cloudflare@latest my-chess-app
```

1. Navigate into your project:

Terminal window

```

cd my-chess-app


```

1. Install the required dependencies:

Terminal window

```

npm install agents @modelcontextprotocol/sdk chess.js react react-dom react-chessboard


```

1. Install development dependencies:

Terminal window

```

npm install -D @cloudflare/vite-plugin @vitejs/plugin-react vite vite-plugin-singlefile @types/react @types/react-dom


```

## 3\. Configure your project

1. Update your `wrangler.jsonc` to configure Durable Objects and assets:

* [  wrangler.jsonc ](#tab-panel-11543)
* [  wrangler.toml ](#tab-panel-11544)

JSONC

```

{

  "name": "my-chess-app",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["nodejs_compat"],

  "durable_objects": {

    "bindings": [

      {

        "name": "CHESS",

        "class_name": "ChessGame",

      },

    ],

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["ChessGame"],

    },

  ],

  "assets": {

    "directory": "dist",

    "binding": "ASSETS",

  },

}


```

TOML

```

name = "my-chess-app"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[[durable_objects.bindings]]

name = "CHESS"

class_name = "ChessGame"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "ChessGame" ]


[assets]

directory = "dist"

binding = "ASSETS"


```

1. Create a `vite.config.ts` for building your React UI:

TypeScript

```

import { cloudflare } from "@cloudflare/vite-plugin";

import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

import { viteSingleFile } from "vite-plugin-singlefile";


export default defineConfig({

  plugins: [react(), cloudflare(), viteSingleFile()],

  build: {

    minify: false,

  },

});


```

1. Update your `package.json` scripts:

```

{

  "scripts": {

    "dev": "vite",

    "build": "vite build",

    "deploy": "vite build && wrangler deploy"

  }

}


```

## 4\. Create the Chess game engine

1. Create the game logic using Durable Objects at `src/chess.tsx`:

```

import { Agent, callable, getCurrentAgent } from "agents";

import { Chess } from "chess.js";


type Color = "w" | "b";


type ConnectionState = {

  playerId: string;

};


export type State = {

  board: string;

  players: { w?: string; b?: string };

  status: "waiting" | "active" | "mate" | "draw" | "resigned";

  winner?: Color;

  lastSan?: string;

};


export class ChessGame extends Agent<Env, State> {

  initialState: State = {

    board: new Chess().fen(),

    players: {},

    status: "waiting",

  };


  game = new Chess();


  constructor(

    ctx: DurableObjectState,

    public env: Env,

  ) {

    super(ctx, env);

    this.game.load(this.state.board);

  }


  private colorOf(playerId: string): Color | undefined {

    const { players } = this.state;

    if (players.w === playerId) return "w";

    if (players.b === playerId) return "b";

    return undefined;

  }


  @callable()

  join(params: { playerId: string; preferred?: Color | "any" }) {

    const { playerId, preferred = "any" } = params;

    const { connection } = getCurrentAgent();

    if (!connection) throw new Error("Not connected");


    connection.setState({ playerId });

    const s = this.state;


    // Already seated? Return seat

    const already = this.colorOf(playerId);

    if (already) {

      return { ok: true, role: already as Color, state: s };

    }


    // Choose a seat

    const free: Color[] = (["w", "b"] as const).filter((c) => !s.players[c]);

    if (free.length === 0) {

      return { ok: true, role: "spectator" as const, state: s };

    }


    let seat: Color = free[0];

    if (preferred === "w" && free.includes("w")) seat = "w";

    if (preferred === "b" && free.includes("b")) seat = "b";


    s.players[seat] = playerId;

    s.status = s.players.w && s.players.b ? "active" : "waiting";

    this.setState(s);

    return { ok: true, role: seat, state: s };

  }


  @callable()

  move(

    move: { from: string; to: string; promotion?: string },

    expectedFen?: string,

  ) {

    if (this.state.status === "waiting") {

      return {

        ok: false,

        reason: "not-in-game",

        fen: this.game.fen(),

        status: this.state.status,

      };

    }


    const { connection } = getCurrentAgent();

    if (!connection) throw new Error("Not connected");

    const { playerId } = connection.state as ConnectionState;


    const seat = this.colorOf(playerId);

    if (!seat) {

      return {

        ok: false,

        reason: "not-in-game",

        fen: this.game.fen(),

        status: this.state.status,

      };

    }


    if (seat !== this.game.turn()) {

      return {

        ok: false,

        reason: "not-your-turn",

        fen: this.game.fen(),

        status: this.state.status,

      };

    }


    // Optimistic sync guard

    if (expectedFen && expectedFen !== this.game.fen()) {

      return {

        ok: false,

        reason: "stale",

        fen: this.game.fen(),

        status: this.state.status,

      };

    }


    const res = this.game.move(move);

    if (!res) {

      return {

        ok: false,

        reason: "illegal",

        fen: this.game.fen(),

        status: this.state.status,

      };

    }


    const fen = this.game.fen();

    let status: State["status"] = "active";

    if (this.game.isCheckmate()) status = "mate";

    else if (this.game.isDraw()) status = "draw";


    this.setState({

      ...this.state,

      board: fen,

      lastSan: res.san,

      status,

      winner:

        status === "mate" ? (this.game.turn() === "w" ? "b" : "w") : undefined,

    });


    return { ok: true, fen, san: res.san, status };

  }


  @callable()

  resign() {

    const { connection } = getCurrentAgent();

    if (!connection) throw new Error("Not connected");

    const { playerId } = connection.state as ConnectionState;


    const seat = this.colorOf(playerId);

    if (!seat) return { ok: false, reason: "not-in-game", state: this.state };


    const winner = seat === "w" ? "b" : "w";

    this.setState({ ...this.state, status: "resigned", winner });

    return { ok: true, state: this.state };

  }

}


```

## 5\. Create the MCP server and UI resource

1. Create your main worker at `src/index.ts`:

TypeScript

```

import { createMcpHandler } from "agents/mcp";

import { routeAgentRequest } from "agents";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { env } from "cloudflare:workers";


const getWidgetHtml = async (host: string) => {

  let html = await (await env.ASSETS.fetch("http://localhost/")).text();

  html = html.replace(

    "<!--RUNTIME_CONFIG-->",

    `<script>window.HOST = \`${host}\`;</script>`,

  );

  return html;

};


function createServer() {

  const server = new McpServer({ name: "Chess", version: "v1.0.0" });


  // Register a UI resource that ChatGPT can render

  server.registerResource(

    "chess",

    "ui://widget/index.html",

    {},

    async (_uri, extra) => {

      return {

        contents: [

          {

            uri: "ui://widget/index.html",

            mimeType: "text/html+skybridge",

            text: await getWidgetHtml(

              extra.requestInfo?.headers.host as string,

            ),

          },

        ],

      };

    },

  );


  // Register a tool that ChatGPT can call to render the UI

  server.registerTool(

    "playChess",

    {

      title: "Renders a chess game menu, ready to start or join a game.",

      annotations: { readOnlyHint: true },

      _meta: {

        "openai/outputTemplate": "ui://widget/index.html",

        "openai/toolInvocation/invoking": "Opening chess widget",

        "openai/toolInvocation/invoked": "Chess widget opened",

      },

    },

    async (_, _extra) => {

      return {

        content: [

          { type: "text", text: "Successfully rendered chess game menu" },

        ],

      };

    },

  );


  return server;

}


export default {

  async fetch(req: Request, env: Env, ctx: ExecutionContext) {

    const url = new URL(req.url);

    if (url.pathname.startsWith("/mcp")) {

      // Create a new server instance per request

      const server = createServer();

      return createMcpHandler(server)(req, env, ctx);

    }


    return (

      (await routeAgentRequest(req, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


export { ChessGame } from "./chess";


```

## 6\. Build the React UI

1. Create the HTML entry point at `index.html`:

```

<!doctype html>

<html>

  <head>

    <!--RUNTIME_CONFIG-->

  </head>

  <body>

    <div id="root" style="font-family: verdana"></div>

    <script type="module" src="/src/app.tsx"></script>

  </body>

</html>


```

1. Create the React app at `src/app.tsx`:

```

import { useEffect, useRef, useState } from "react";

import { useAgent } from "agents/react";

import { createRoot } from "react-dom/client";

import { Chess, type Square } from "chess.js";

import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";

import type { State as ServerState } from "./chess";


function usePlayerId() {

  const [pid] = useState(() => {

    const existing = localStorage.getItem("playerId");

    if (existing) return existing;

    const id = crypto.randomUUID();

    localStorage.setItem("playerId", id);

    return id;

  });

  return pid;

}


function App() {

  const playerId = usePlayerId();

  const [gameId, setGameId] = useState<string | null>(null);

  const [gameIdInput, setGameIdInput] = useState("");

  const [menuError, setMenuError] = useState<string | null>(null);


  const gameRef = useRef(new Chess());

  const [fen, setFen] = useState(gameRef.current.fen());

  const [myColor, setMyColor] = useState<"w" | "b" | "spectator">("spectator");

  const [pending, setPending] = useState(false);

  const [serverState, setServerState] = useState<ServerState | null>(null);

  const [joined, setJoined] = useState(false);


  const host = window.HOST ?? "http://localhost:5173/";


  const { stub } = useAgent<ServerState>({

    host,

    name: gameId ?? "__lobby__",

    agent: "chess",

    onStateUpdate: (s) => {

      if (!gameId) return;

      gameRef.current.load(s.board);

      setFen(s.board);

      setServerState(s);

    },

  });


  useEffect(() => {

    if (!gameId || joined) return;


    (async () => {

      try {

        const res = await stub.join({ playerId, preferred: "any" });

        if (!res?.ok) return;


        setMyColor(res.role);

        gameRef.current.load(res.state.board);

        setFen(res.state.board);

        setServerState(res.state);

        setJoined(true);

      } catch (error) {

        console.error("Failed to join game", error);

      }

    })();

  }, [playerId, gameId, stub, joined]);


  async function handleStartNewGame() {

    const newId = crypto.randomUUID();

    setGameId(newId);

    setGameIdInput(newId);

    setMenuError(null);

    setJoined(false);

  }


  async function handleJoinGame() {

    const trimmed = gameIdInput.trim();

    if (!trimmed) {

      setMenuError("Enter a game ID to join.");

      return;

    }

    setGameId(trimmed);

    setMenuError(null);

    setJoined(false);

  }


  const handleHelpClick = () => {

    window.openai?.sendFollowUpMessage?.({

      prompt: `Help me with my chess game. I am playing as ${myColor} and the board is: ${fen}. Please only offer written advice.`,

    });

  };


  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {

    if (!gameId || !sourceSquare || !targetSquare || pending) return false;


    const game = gameRef.current;

    if (myColor === "spectator" || game.turn() !== myColor) return false;


    const piece = game.get(sourceSquare as Square);

    if (!piece || piece.color !== myColor) return false;


    const prevFen = game.fen();


    try {

      const local = game.move({

        from: sourceSquare,

        to: targetSquare,

        promotion: "q",

      });

      if (!local) return false;

    } catch {

      return false;

    }


    const nextFen = game.fen();

    setFen(nextFen);

    setPending(true);


    stub

      .move({ from: sourceSquare, to: targetSquare, promotion: "q" }, prevFen)

      .then((r) => {

        if (!r.ok) {

          game.load(r.fen);

          setFen(r.fen);

        }

      })

      .finally(() => setPending(false));


    return true;

  }


  return (

    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh" }}>

      {!gameId ? (

        <div

          style={{

            maxWidth: "420px",

            margin: "0 auto",

            background: "#fff",

            borderRadius: "16px",

            padding: "24px",

          }}

        >

          <h1>Ready to play?</h1>

          <p>Start a new match or join an existing game.</p>

          <button

            onClick={handleStartNewGame}

            style={{

              padding: "12px",

              background: "#2563eb",

              color: "#fff",

              border: "none",

              borderRadius: "8px",

              cursor: "pointer",

              width: "100%",

            }}

          >

            Start a new game

          </button>

          <div style={{ marginTop: "16px" }}>

            <input

              placeholder="Paste a game ID"

              value={gameIdInput}

              onChange={(e) => setGameIdInput(e.target.value)}

              style={{

                width: "100%",

                padding: "10px",

                borderRadius: "8px",

                border: "1px solid #ccc",

              }}

            />

            <button

              onClick={handleJoinGame}

              style={{

                marginTop: "8px",

                padding: "10px",

                background: "#0f172a",

                color: "#fff",

                border: "none",

                borderRadius: "8px",

                cursor: "pointer",

                width: "100%",

              }}

            >

              Join

            </button>

            {menuError && (

              <p style={{ color: "red", fontSize: "0.85rem" }}>{menuError}</p>

            )}

          </div>

        </div>

      ) : (

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>

          <div

            style={{

              background: "#fff",

              padding: "16px",

              borderRadius: "16px",

              marginBottom: "16px",

            }}

          >

            <h2>Game {gameId}</h2>

            <p>Status: {serverState?.status}</p>

            <button

              onClick={handleHelpClick}

              style={{

                padding: "10px",

                background: "#2563eb",

                color: "#fff",

                border: "none",

                borderRadius: "8px",

                cursor: "pointer",

              }}

            >

              Ask for help

            </button>

          </div>

          <div

            style={{

              background: "#fff",

              padding: "16px",

              borderRadius: "16px",

            }}

          >

            <Chessboard

              position={fen}

              onPieceDrop={onPieceDrop}

              boardOrientation={myColor === "b" ? "black" : "white"}

            />

          </div>

        </div>

      )}

    </div>

  );

}


const root = createRoot(document.getElementById("root")!);

root.render(<App />);


```

Note

This is a simplified version of the UI. For the complete implementation with player slots, better styling, and game state management, check out the [full example on GitHub ↗](https://github.com/cloudflare/agents/tree/main/openai-sdk/chess-app/src/app.tsx).

## 7\. Build and deploy

1. Build your React UI:

Terminal window

```

npm run build


```

This compiles your React app into a single HTML file in the `dist` directory.

1. Deploy to Cloudflare:

Terminal window

```

npx wrangler deploy


```

After deployment, you will see your app URL:

```

https://my-chess-app.YOUR_SUBDOMAIN.workers.dev


```

## 8\. Connect to ChatGPT

Now connect your deployed app to ChatGPT:

1. Open [ChatGPT ↗](https://chat.openai.com/).
2. Go to **Settings** \> **Apps & Connectors** \> **Create**
3. Give your app a **name**, and optionally a **description** and **icon**.
4. Enter your MCP endpoint: `https://my-chess-app.YOUR_SUBDOMAIN.workers.dev/mcp`.
5. Select **"No authentication"**.
6. Select **"Create"**.

## 9\. Play chess in ChatGPT

Try it out:

1. In your ChatGPT conversation, type: "Let's play chess".
2. ChatGPT will call the `playChess` tool and render your interactive chess widget.
3. Select **"Start a new game"** to create a game.
4. Share the game ID with a friend who can join via their own ChatGPT conversation.
5. Make moves by dragging pieces on the board.
6. Select **"Ask for help"** to get strategic advice from ChatGPT

Note

You might need to manually select the connector in the prompt box the first time you use it. Select **"+"** \> **"More"** \> **\[App name\]**.

## Key concepts

### MCP Server

The Model Context Protocol (MCP) server defines tools and resources that ChatGPT can access. Note that we create a new server instance per request to prevent cross-client response leakage:

TypeScript

```

function createServer() {

  const server = new McpServer({ name: "Chess", version: "v1.0.0" });


  // Register a UI resource that ChatGPT can render

  server.registerResource(

    "chess",

    "ui://widget/index.html",

    {},

    async (_uri, extra) => {

      return {

        contents: [

          {

            uri: "ui://widget/index.html",

            mimeType: "text/html+skybridge",

            text: await getWidgetHtml(

              extra.requestInfo?.headers.host as string,

            ),

          },

        ],

      };

    },

  );


  // Register a tool that ChatGPT can call to render the UI

  server.registerTool(

    "playChess",

    {

      title: "Renders a chess game menu, ready to start or join a game.",

      annotations: { readOnlyHint: true },

      _meta: {

        "openai/outputTemplate": "ui://widget/index.html",

        "openai/toolInvocation/invoking": "Opening chess widget",

        "openai/toolInvocation/invoked": "Chess widget opened",

      },

    },

    async (_, _extra) => {

      return {

        content: [

          { type: "text", text: "Successfully rendered chess game menu" },

        ],

      };

    },

  );


  return server;

}


```

### Game Engine with Agents

The `ChessGame` class extends `Agent` to create a stateful game engine:

```

export class ChessGame extends Agent<Env, State> {

  initialState: State = {

    board: new Chess().fen(),

    players: {},

    status: "waiting"

  };


  game = new Chess();


  constructor(

    ctx: DurableObjectState,

    public env: Env

  ) {

    super(ctx, env);

    this.game.load(this.state.board);

  }


```

Each game gets its own Agent instance, enabling:

* **Isolated state** per game
* **Real-time synchronization** across players
* **Persistent storage** that survives worker restarts

### Callable methods

Use the `@callable()` decorator to expose methods that clients can invoke:

TypeScript

```

@callable()

join(params: { playerId: string; preferred?: Color | "any" }) {

  const { playerId, preferred = "any" } = params;

  const { connection } = getCurrentAgent();

  if (!connection) throw new Error("Not connected");


  connection.setState({ playerId });

  const s = this.state;


  // Already seated? Return seat

  const already = this.colorOf(playerId);

  if (already) {

    return { ok: true, role: already as Color, state: s };

  }


  // Choose a seat

  const free: Color[] = (["w", "b"] as const).filter((c) => !s.players[c]);

  if (free.length === 0) {

    return { ok: true, role: "spectator" as const, state: s };

  }


  let seat: Color = free[0];

  if (preferred === "w" && free.includes("w")) seat = "w";

  if (preferred === "b" && free.includes("b")) seat = "b";


  s.players[seat] = playerId;

  s.status = s.players.w && s.players.b ? "active" : "waiting";

  this.setState(s);

  return { ok: true, role: seat, state: s };

}


```

### React integration

The `useAgent` hook connects your React app to the Durable Object:

```

const { stub } = useAgent<ServerState>({

  host,

  name: gameId ?? "__lobby__",

  agent: "chess",

  onStateUpdate: (s) => {

    gameRef.current.load(s.board);

    setFen(s.board);

    setServerState(s);

  },

});


```

Call methods on the agent:

```

const res = await stub.join({ playerId, preferred: "any" });

await stub.move({ from: "e2", to: "e4" });


```

### Bidirectional communication

Your app can send messages to ChatGPT:

TypeScript

```

const handleHelpClick = () => {

  window.openai?.sendFollowUpMessage?.({

    prompt: `Help me with my chess game. I am playing as ${myColor} and the board is: ${fen}. Please only offer written advice as there are no tools for you to use.`,

  });

};


```

This creates a new message in the ChatGPT conversation with context about the current game state.

## Next steps

Now that you have a working ChatGPT App, you can:

* Add more tools: Expose additional capabilities and UIs through MCP tools and resources.
* Enhance the UI: Build more sophisticated interfaces with React.

## Related resources

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK. 

[ Durable Objects ](https://developers.cloudflare.com/durable-objects/) Learn about the underlying stateful infrastructure. 

[ Model Context Protocol ](https://modelcontextprotocol.io/) MCP specification and documentation. 

[ OpenAI Apps SDK ](https://developers.openai.com/apps-sdk/) Official OpenAI Apps SDK reference. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/demos/chatgpt-app/#page","headline":"Build an Interactive ChatGPT App · Cloudflare Workers docs","description":"Build and deploy an interactive ChatGPT App on Cloudflare Workers with real-time multiplayer state using MCP.","url":"https://developers.cloudflare.com/workers/demos/chatgpt-app/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/demos/","name":"Demos and architectures"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/demos/chatgpt-app/","name":"Build an Interactive ChatGPT App"}}]}
```
