---
title: Playwright MCP
description: Deploy a Playwright MCP server that uses Browser Run to provide browser automation capabilities to your agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Playwright MCP

[@cloudflare/playwright-mcp ↗](https://github.com/cloudflare/playwright-mcp) is a [Playwright MCP ↗](https://github.com/microsoft/playwright-mcp) server fork that provides browser automation capabilities using Playwright and Browser Run.

This server enables LLMs to interact with web pages through structured accessibility snapshots, bypassing the need for screenshots or visually-tuned models. Its key features are:

* Fast and lightweight. Uses Playwright's accessibility tree, not pixel-based input.
* LLM-friendly. No vision models needed, operates purely on structured data.
* Deterministic tool application. Avoids ambiguity common with screenshot-based approaches.

Note

The current version of Cloudflare Playwright MCP [v1.1.1 ↗](https://github.com/cloudflare/playwright/releases/tag/v1.1.1) is in sync with upstream Playwright MCP [v0.0.30 ↗](https://github.com/microsoft/playwright-mcp/releases/tag/v0.0.30).

## Quick start

If you are already familiar with Cloudflare Workers and you want to get started with Playwright MCP right away, select this button:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/playwright-mcp/tree/main/cloudflare/example)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers. Use this option if you are familiar with Cloudflare Workers, and wish to skip the step-by-step guidance.

Check our [GitHub page ↗](https://github.com/cloudflare/playwright-mcp) for more information on how to build and deploy Playwright MCP.

## Deploying

Follow these steps to deploy `@cloudflare/playwright-mcp`:

1. Install the Playwright MCP [npm package ↗](https://www.npmjs.com/package/@cloudflare/playwright-mcp).

 npm  yarn  pnpm  bun 

```
npm i -D @cloudflare/playwright-mcp
```

```
yarn add -D @cloudflare/playwright-mcp
```

```
pnpm add -D @cloudflare/playwright-mcp
```

```
bun add -d @cloudflare/playwright-mcp
```

1. Make sure you have the [Browser Run](https://developers.cloudflare.com/browser-run/) and [Durable Object](https://developers.cloudflare.com/durable-objects/) bindings and [migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) in your Wrangler configuration file.

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

* [  wrangler.jsonc ](#tab-panel-6896)
* [  wrangler.toml ](#tab-panel-6897)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "playwright-mcp-example",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["nodejs_compat"],

  "browser": {

    "binding": "BROWSER",

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["PlaywrightMCP"],

    },

  ],

  "durable_objects": {

    "bindings": [

      {

        "name": "MCP_OBJECT",

        "class_name": "PlaywrightMCP",

      },

    ],

  },

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "playwright-mcp-example"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[browser]

binding = "BROWSER"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "PlaywrightMCP" ]


[[durable_objects.bindings]]

name = "MCP_OBJECT"

class_name = "PlaywrightMCP"


```

1. Edit the code.

src/index.ts

```

import { env } from "cloudflare:workers";

import { createMcpAgent } from "@cloudflare/playwright-mcp";


export const PlaywrightMCP = createMcpAgent(env.BROWSER);


export default {

  fetch(request: Request, env: Env, ctx: ExecutionContext) {

    const { pathname } = new URL(request.url);


    switch (pathname) {

      case "/sse":

      case "/sse/message":

        return PlaywrightMCP.serveSSE("/sse").fetch(request, env, ctx);

      case "/mcp":

        return PlaywrightMCP.serve("/mcp").fetch(request, env, ctx);

      default:

        return new Response("Not Found", { status: 404 });

    }

  },

};


```

1. Deploy the server.

Terminal window

```

npx wrangler deploy


```

The server is now available at `https://[my-mcp-url].workers.dev/sse` and you can use it with any MCP client.

## Using Playwright MCP

![Screenshot of the AI Playground](https://developers.cloudflare.com/_astro/playground-ai-screenshot.v44jFMBu_Z1xgc6e.webp) 

[Cloudflare AI Playground ↗](https://playground.ai.cloudflare.com/) is a great way to test MCP servers using LLM models available in Workers AI.

1. Go to [https://playground.ai.cloudflare.com/ ↗](https://playground.ai.cloudflare.com/).
2. Ensure that the model is set to `llama-3.3-70b-instruct-fp8-fast`.
3. In **MCP Servers**, set **URL** to `https://[my-mcp-url].workers.dev/sse`.
4. Click **Connect**.
5. Status should update to **Connected** and it should list 23 available tools.

You can now start to interact with the model, and it will run necessary the tools to accomplish what was requested.

Note

For best results, give simple instructions consisting of one single action. For example, "Create a new todo entry", "Go to cloudflare site", "Take a screenshot".

Try this sequence of instructions to see Playwright MCP in action:

1. "Go to demo.playwright.dev/todomvc"
2. "Create some todo entry"
3. "Nice. Now create a todo in parrot style"
4. "And create another todo in Yoda style"
5. "Take a screenshot"

You can also use other MCP clients like [Claude Desktop ↗](https://github.com/cloudflare/playwright-mcp/blob/main/cloudflare/example/README.md#use-with-claude-desktop).

Check our [GitHub page ↗](https://github.com/cloudflare/playwright-mcp) for more examples and MCP client configuration options, and refer to the developer documentation on how to [build Agents on Cloudflare](https://developers.cloudflare.com/agents/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/playwright/playwright-mcp/#page","headline":"Playwright MCP · Cloudflare Browser Run docs","description":"Deploy a Playwright MCP server that uses Browser Run to provide browser automation capabilities to your agents.","url":"https://developers.cloudflare.com/browser-run/playwright/playwright-mcp/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/playwright/","name":"Playwright"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/playwright/playwright-mcp/","name":"Playwright MCP"}}]}
```
