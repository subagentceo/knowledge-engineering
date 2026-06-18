---
title: Agentic Payments
description: Let AI agents pay for services programmatically using payment protocols like MPP and x402 with Cloudflare's Agents SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Agentic Payments

AI agents need to discover, pay for, and consume resources and services programmatically. Traditional onboarding requires account creation, a payment method, and an API key before an agent can pay for a service. Agentic payments let AI agents purchase resources and services directly through the HTTP `402 Payment Required` response code.

Cloudflare's [Agents SDK](https://developers.cloudflare.com/agents/) supports agentic payments through two protocols built on the HTTP `402 Payment Required` status code: **x402** and **Machine Payments Protocol (MPP)**. Both follow the same core flow:

1. A client requests a resource or calls a tool.
2. The server responds with `402` and a payment challenge describing what to pay, how much, and where.
3. The client fulfills the payment and retries the request with a payment credential.
4. The server verifies the payment (optionally through a facilitator service) and returns the resource along with a receipt.

No accounts, sessions, or pre-shared API keys are required. Agents handle the entire exchange programmatically.

## x402 and Machine Payments Protocol

### x402

[x402 ↗](https://www.x402.org/) is a payment standard created by Coinbase. It uses on-chain stablecoin payments (USDC on Base, Ethereum, Solana, and other networks) and defines three HTTP headers — `PAYMENT-REQUIRED`, `PAYMENT-SIGNATURE`, and `PAYMENT-RESPONSE` — to carry challenges, credentials, and receipts. Servers can offload verification and settlement to a **facilitator** service so they do not need direct blockchain connectivity. It is governed by Coinbase and Cloudflare, two of the founding members of the x402 Foundation.

The Agents SDK provides first-class x402 integration:

* **Server-side**: `withX402` and `paidTool` for MCP servers, plus `x402-hono` middleware for HTTP Workers.
* **Client-side**: `withX402Client` wraps MCP client connections with automatic 402 handling and optional human-in-the-loop confirmation.

### Machine Payments Protocol

[Machine Payments Protocol (MPP) ↗](https://mpp.dev) is a protocol co-authored by Tempo Labs and Stripe. It extends the HTTP `402` pattern with a formal `WWW-Authenticate: Payment` / `Authorization: Payment` header scheme and is on the IETF standards track.

MPP supports multiple payment methods beyond blockchain — including cards (via Stripe), Bitcoin Lightning, and stablecoins — and introduces **sessions** for streaming and pay-as-you-go use cases with sub-millisecond latency and sub-cent costs. MPP is backwards-compatible with x402: MPP clients can consume existing x402 services without modification.

## Charge for resources

[ HTTP content (x402) ](https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/) Gate APIs, web pages, and files with a Worker proxy 

[ HTTP content (MPP) ](https://developers.cloudflare.com/agents/tools/payments/mpp-charge-for-http-content/) Gate APIs, web pages, and files with a Worker proxy 

## Related

* [x402.org ↗](https://x402.org) — x402 protocol specification
* [mpp.dev ↗](https://mpp.dev) — MPP protocol specification
* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/) — Cloudflare-native monetization for web content
* [x402 examples ↗](https://github.com/cloudflare/agents/tree/main/examples) — Complete working code

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/tools/payments/#page","headline":"Agentic Payments · Cloudflare Agents docs","description":"Let AI agents pay for services programmatically using payment protocols like MPP and x402 with Cloudflare's Agents SDK.","url":"https://developers.cloudflare.com/agents/tools/payments/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/payments/","name":"Agentic Payments"}}]}
```
