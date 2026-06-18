---
title: Charge for MCP tools
description: Charge per tool call in an MCP server using paidTool.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Charge for MCP tools

The Agents SDK provides `paidTool`, a drop-in replacement for `tool` that adds x402 payment requirements. Clients pay per tool call, and you can mix free and paid tools in the same server.

## Setup

Wrap your `McpServer` with `withX402` and use `paidTool` for tools you want to charge for:

TypeScript

```

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { McpAgent } from "agents/mcp";

import { withX402, type X402Config } from "agents/x402";

import { z } from "zod";


const X402_CONFIG: X402Config = {

  network: "base",

  recipient: "0xYourWalletAddress",

  facilitator: { url: "https://x402.org/facilitator" }, // Payment facilitator URL

  // To learn more about facilitators: https://docs.x402.org/core-concepts/facilitator

};


export class PaidMCP extends McpAgent<Env> {

  server = withX402(

    new McpServer({ name: "PaidMCP", version: "1.0.0" }),

    X402_CONFIG,

  );


  async init() {

    // Paid tool — $0.01 per call

    this.server.paidTool(

      "square",

      "Squares a number",

      0.01, // USD

      { number: z.number() },

      {},

      async ({ number }) => {

        return { content: [{ type: "text", text: String(number ** 2) }] };

      },

    );


    // Free tool

    this.server.tool(

      "echo",

      "Echo a message",

      { message: z.string() },

      async ({ message }) => {

        return { content: [{ type: "text", text: message }] };

      },

    );

  }

}


```

## Configuration

| Field       | Description                                                |
| ----------- | ---------------------------------------------------------- |
| network     | base for production, base-sepolia for testing              |
| recipient   | Wallet address to receive payments                         |
| facilitator | Payment facilitator URL (use https://x402.org/facilitator) |

## paidTool signature

TypeScript

```

this.server.paidTool(

  name, // Tool name

  description, // Tool description

  price, // Price in USD (e.g., 0.01)

  inputSchema, // Zod schema for inputs

  annotations, // MCP annotations

  handler, // Async function that executes the tool

);


```

When a client calls a paid tool without payment, the server returns 402 with payment requirements. The client pays via x402, retries with payment proof, and receives the result.

## Testing

Use `base-sepolia` and get test USDC from the [Circle faucet ↗](https://faucet.circle.com/).

For a complete working example, refer to [x402-mcp on GitHub ↗](https://github.com/cloudflare/agents/tree/main/examples/x402-mcp).

## Related

* [Pay from Agents SDK](https://developers.cloudflare.com/agents/tools/payments/x402/pay-from-agents-sdk/) — Build clients that pay for tools
* [Charge for HTTP content](https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/) — Gate HTTP endpoints
* [MCP server guide](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) — Build your first MCP server

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-mcp-tools/#page","headline":"Charge for MCP tools · Cloudflare Agents docs","description":"Charge per tool call in an MCP server using paidTool.","url":"https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-mcp-tools/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/payments/","name":"Agentic Payments"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/payments/x402/","name":"x402"}},{"@type":"ListItem","position":6,"item":{"@id":"/agents/tools/payments/x402/charge-for-mcp-tools/","name":"Charge for MCP tools"}}]}
```
