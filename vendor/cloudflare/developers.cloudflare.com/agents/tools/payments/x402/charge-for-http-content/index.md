---
title: Charge for HTTP content
description: Gate HTTP endpoints with x402 payments using a Cloudflare Worker proxy.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Charge for HTTP content

The x402-proxy template is a Cloudflare Worker that sits in front of any HTTP backend. When a request hits a protected route, the proxy returns a 402 response with payment instructions. After the client pays, the proxy verifies the payment and forwards the request to your origin.

Deploy the x402-proxy template to your Cloudflare account:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/x402-proxy-template)

## Prerequisites

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* An HTTP backend to gate
* A wallet address to receive payments

## Configuration

Define protected routes in `wrangler.jsonc`:

```

{

  "vars": {

    "PAY_TO": "0xYourWalletAddress",

    "NETWORK": "base-sepolia",

    "PROTECTED_PATTERNS": [

      {

        "pattern": "/api/premium/*",

        "price": "$0.10",

        "description": "Premium API access"

      }

    ]

  }

}


```

Note

`base-sepolia` is a test network. Change to `base` for production.

## Selective gating with Bot Management

With [Bot Management](https://developers.cloudflare.com/bots/), the proxy can charge crawlers while keeping the site free for humans:

```

{

  "pattern": "/content/*",

  "price": "$0.10",

  "description": "Content access",

  "bot_score_threshold": 30,

  "except_detection_ids": [117479730]

}


```

Requests with a bot score at or below `bot_score_threshold` are directed to the paywall. Use `except_detection_ids` to allowlist specific crawlers by [detection ID](https://developers.cloudflare.com/ai-crawl-control/reference/bots/).

## Deploy

Clone the template, edit `wrangler.jsonc`, and deploy:

Terminal window

```

git clone https://github.com/cloudflare/templates

cd templates/x402-proxy-template

npm install

npx wrangler deploy


```

For full configuration options and Bot Management examples, refer to the [template README ↗](https://github.com/cloudflare/templates/tree/main/x402-proxy-template).

## Custom Worker endpoints

For more control, add x402 middleware directly to your Worker using Hono:

TypeScript

```

import { Hono } from "hono";

import { paymentMiddleware } from "x402-hono";


const app = new Hono<{ Bindings: Env }>();


app.use(

  paymentMiddleware(

    "0xYourWalletAddress" as `0x${string}`,

    {

      "/premium": {

        price: "$0.10",

        network: "base-sepolia",

        config: { description: "Premium content" },

      },

    },

    { url: "https://x402.org/facilitator" },

  ),

);


app.get("/premium", (c) => c.json({ message: "Thanks for paying!" }));


export default app;


```

Refer to the [x402 Workers example ↗](https://github.com/cloudflare/agents/tree/main/examples/x402) for a complete implementation.

## Related

* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/) — Native Cloudflare monetization without custom code
* [Charge for MCP tools](https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-mcp-tools/) — Charge per tool call instead of per request
* [x402.org ↗](https://x402.org) — Protocol specification

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/#page","headline":"Charge for HTTP content · Cloudflare Agents docs","description":"Gate HTTP endpoints with x402 payments using a Cloudflare Worker proxy.","url":"https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/payments/","name":"Agentic Payments"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/payments/x402/","name":"x402"}},{"@type":"ListItem","position":6,"item":{"@id":"/agents/tools/payments/x402/charge-for-http-content/","name":"Charge for HTTP content"}}]}
```
