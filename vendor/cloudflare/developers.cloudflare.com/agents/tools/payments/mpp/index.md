---
title: MPP (Machine Payments Protocol)
description: Accept and make payments using the Machine Payments Protocol (MPP) on Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MPP (Machine Payments Protocol)

[Machine Payments Protocol (MPP) ↗](https://mpp.dev) is a protocol for machine-to-machine payments, co-authored by [Tempo Labs ↗](https://tempo.xyz) and [Stripe ↗](https://stripe.com). It standardizes the HTTP `402 Payment Required` status code with a formal authentication scheme proposed to the [IETF ↗](https://paymentauth.org). MPP gives agents, apps, and humans a single interface to pay for any service in the same HTTP request.

MPP is payment-method agnostic. A single endpoint can accept stablecoins (Tempo), credit cards (Stripe), or Bitcoin (Lightning).

## How it works

1. A client requests a resource — `GET /resource`.
2. The server returns `402 Payment Required` with a `WWW-Authenticate: Payment` header containing a payment challenge.
3. The client fulfills the payment — signs a transaction, pays an invoice, or completes a card payment.
4. The client retries the request with an `Authorization: Payment` header containing a payment credential.
5. The server verifies the payment and returns the resource with a `Payment-Receipt` header.

## Payment methods

MPP supports multiple payment methods through a single protocol:

| Method                                                   | Description                                                                  | Status     |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------- |
| [Tempo ↗](https://mpp.dev/payment-methods/tempo)         | Stablecoin payments on the Tempo blockchain with sub-second settlement       | Production |
| [Stripe ↗](https://mpp.dev/payment-methods/stripe)       | Cards, wallets, and other Stripe-supported methods via Shared Payment Tokens | Production |
| [Lightning ↗](https://mpp.dev/payment-methods/lightning) | Bitcoin payments over the Lightning Network                                  | Available  |
| [Card ↗](https://mpp.dev/payment-methods/card)           | Card payments via encrypted network tokens                                   | Available  |
| [Custom ↗](https://mpp.dev/payment-methods/custom)       | Build your own payment method using the MPP SDK                              | Available  |

Servers can offer multiple methods simultaneously. Clients choose the method that works for them.

## Payment intents

MPP defines two payment intents:

* **`charge`** — A one-time payment that settles immediately. Use for per-request billing.
* **`session`** — A streaming payment over a payment channel. Use for pay-as-you-go or per-token billing with sub-cent costs and sub-millisecond latency.

## Compatibility with x402

MPP is backwards-compatible with [x402](https://developers.cloudflare.com/agents/tools/payments/x402/). The core x402 `exact` payment flows map directly onto MPP's `charge` intent, so MPP clients can consume existing x402 services without modification.

## Charge for resources

[ HTTP content ](https://developers.cloudflare.com/agents/tools/payments/mpp-charge-for-http-content/) Gate APIs, web pages, and files with MPP middleware 

## SDKs

MPP provides official SDKs in three languages:

| SDK        | Package | Install           |
| ---------- | ------- | ----------------- |
| TypeScript | mppx    | npm install mppx  |
| Python     | pympp   | pip install pympp |
| Rust       | mpp-rs  | cargo add mpp     |

The TypeScript SDK includes framework middleware for [Hono ↗](https://mpp.dev/sdk/typescript/middlewares/hono), [Express ↗](https://mpp.dev/sdk/typescript/middlewares/express), [Next.js ↗](https://mpp.dev/sdk/typescript/middlewares/nextjs), and [Elysia ↗](https://mpp.dev/sdk/typescript/middlewares/elysia), as well as a [CLI ↗](https://mpp.dev/sdk/typescript/cli) for testing paid endpoints.

## Related

* [mpp.dev ↗](https://mpp.dev) — Protocol documentation and quickstart guides
* [IETF specification ↗](https://paymentauth.org) — Full Payment HTTP Authentication Scheme specification
* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/) — Cloudflare-native monetization for web content

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/tools/payments/mpp/#page","headline":"MPP (Machine Payments Protocol) · Cloudflare Agents docs","description":"Accept and make payments using the Machine Payments Protocol (MPP) on Cloudflare Workers.","url":"https://developers.cloudflare.com/agents/tools/payments/mpp/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/payments/","name":"Agentic Payments"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/payments/mpp/","name":"MPP (Machine Payments Protocol)"}}]}
```
