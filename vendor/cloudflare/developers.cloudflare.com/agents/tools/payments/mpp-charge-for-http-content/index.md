---
title: Charge for HTTP content
description: Gate HTTP endpoints with MPP payments using the mpp-proxy template on Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Charge for HTTP content

The [mpp-proxy ↗](https://github.com/cloudflare/mpp-proxy) template is a Cloudflare Worker that sits in front of any HTTP backend. When a request hits a protected route, the proxy returns a `402` response with an MPP payment challenge. After the client pays, the proxy verifies the payment, forwards the request to your origin, and issues a 1-hour session cookie.

Deploy the mpp-proxy template to your Cloudflare account:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/mpp-proxy)

## Prerequisites

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* An HTTP backend to gate
* A wallet address to receive payments

## Configuration

Define protected routes in `wrangler.jsonc`:

JSONC

```

{

  "vars": {

    "PAY_TO": "0xYourWalletAddress",

    "TEMPO_TESTNET": false,

    "PAYMENT_CURRENCY": "0x20c000000000000000000000b9537d11c60e8b50",

    "PROTECTED_PATTERNS": [

      {

        "pattern": "/premium/*",

        "amount": "0.01",

        "description": "Access to premium content for 1 hour"

      }

    ]

  }

}


```

Note

Set `TEMPO_TESTNET` to `true` and `PAYMENT_CURRENCY` to `0x20c0000000000000000000000000000000000000` for testnet development.

## Selective gating with Bot Management

With [Bot Management](https://developers.cloudflare.com/bots/), the proxy can charge crawlers while keeping the site free for humans:

JSONC

```

{

  "pattern": "/content/*",

  "amount": "0.25",

  "description": "Content access for 1 hour",

  "bot_score_threshold": 30,

  "except_detection_ids": [120623194, 117479730]

}


```

Requests with a bot score at or below `bot_score_threshold` are directed to the paywall. Use `except_detection_ids` to allowlist specific crawlers by [detection ID](https://developers.cloudflare.com/ai-crawl-control/reference/bots/).

## Deploy

Clone the template, edit `wrangler.jsonc`, and deploy:

Terminal window

```

git clone https://github.com/cloudflare/mpp-proxy

cd mpp-proxy

npm install

npx wrangler secret put JWT_SECRET

npx wrangler secret put MPP_SECRET_KEY

npx wrangler deploy


```

For full configuration options, proxy modes, and Bot Management examples, refer to the [mpp-proxy README ↗](https://github.com/cloudflare/mpp-proxy).

## Custom Worker endpoints

For more control, add MPP middleware directly to your Worker using Hono:

TypeScript

```

import { Hono } from "hono";

import { Mppx, tempo } from "mppx/hono";


const app = new Hono();


const mppx = Mppx.create({

  methods: [

    tempo({

      currency: "0x20c0000000000000000000000000000000000000",

      recipient: "0xYourWalletAddress",

    }),

  ],

});


app.get("/premium", mppx.charge({ amount: "0.10" }), (c) =>

  c.json({ data: "Thanks for paying!" }),

);


export default app;


```

Refer to the [Hono middleware reference ↗](https://mpp.dev/sdk/typescript/middlewares/hono) for the full API, including session payments and payer identification.

## Related

* [mpp.dev ↗](https://mpp.dev) — Protocol specification
* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/) — Cloudflare-native monetization without custom code

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/payments/mpp-charge-for-http-content/#page","headline":"Charge for HTTP content · Cloudflare Agents docs","description":"Gate HTTP endpoints with MPP payments using the mpp-proxy template on Cloudflare Workers.","url":"https://developers.cloudflare.com/agents/tools/payments/mpp-charge-for-http-content/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/payments/","name":"Agentic Payments"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/payments/mpp-charge-for-http-content/","name":"Charge for HTTP content"}}]}
```
