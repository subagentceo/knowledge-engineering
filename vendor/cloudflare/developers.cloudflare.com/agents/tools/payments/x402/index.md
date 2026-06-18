---
title: x402
description: Accept and make machine-to-machine payments using the x402 HTTP payment protocol on Cloudflare Workers and the Agents SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# x402

[x402 ↗](https://www.x402.org/) is a payment standard built around HTTP 402 (Payment Required). Services return a 402 response with payment instructions, and clients pay programmatically without accounts, sessions, or API keys.

## How it works

1. A client requests a resource — `GET /resource`.
2. The server returns `402 Payment Required` with a `PAYMENT-REQUIRED` header containing Base64-encoded payment details: the price, accepted token, network, and merchant address.
3. The client constructs a signed payment payload and retries the request with a `PAYMENT-SIGNATURE` header.
4. The server verifies the payment payload — directly or by calling a [facilitator](#the-facilitator) — and settles the transaction on-chain.
5. The server returns the resource with a `PAYMENT-RESPONSE` header containing settlement confirmation.

## Key components

### Client

The client is any entity that requests a paid resource: a human-operated app, an AI agent, or a programmatic service. Clients need only a crypto wallet — no accounts, credentials, or session tokens to manage.

### Server

The server defines payment requirements in the `402` response, verifies incoming payment payloads, settles the transaction, and serves the resource. The x402 SDKs and a facilitator handle most of this automatically.

### The facilitator

The facilitator is an optional but recommended third-party service that abstracts blockchain interaction. Rather than connecting to a node directly, the server delegates two operations:

* **`POST /verify`** — Confirms the client's payment payload is valid before the server fulfills the request.
* **`POST /settle`** — Submits the verified payment transaction to the blockchain.

The facilitator does not hold funds. It verifies and broadcasts the client's pre-signed transaction on behalf of the server. `https://x402.org/facilitator` is the public facilitator operated by Coinbase and is used in all Cloudflare examples. [Multiple facilitators ↗](https://www.x402.org/ecosystem?filter=facilitators) are available across different networks.

## Payment schemes and networks

x402 uses payment **schemes** to define how a payment is constructed and settled on a given network.

| Scheme                                                                                             | Networks                                 | Description                                                                                                                         |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [exact ↗](https://github.com/x402-foundation/x402/blob/main/specs/schemes/exact/scheme%5Fexact.md) | EVM, Solana, Aptos, Stellar, Hedera, Sui | Transfers a fixed token amount — typically [ERC-20 ↗](https://eips.ethereum.org/EIPS/eip-20) USDC on EVM — to the merchant address. |
| [upto ↗](https://github.com/x402-foundation/x402/blob/main/specs/schemes/upto/scheme%5Fupto.md)    | EVM                                      | Authorizes a maximum amount; the actual charge is determined at settlement time based on resource consumption.                      |

Supported networks include Base, Ethereum, Polygon, Optimism, Arbitrum, Avalanche, Solana, Aptos, Stellar, and Sui. Use `base-sepolia` for testing with free test USDC from the [Circle Faucet ↗](https://faucet.circle.com/).

## Charge for resources

[ HTTP content ](https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/) Gate APIs, web pages, and files with a Worker proxy 

[ MCP tools ](https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-mcp-tools/) Charge per tool call using paidTool 

## Pay for resources

[ Agents SDK ](https://developers.cloudflare.com/agents/tools/payments/x402/pay-from-agents-sdk/) Wrap MCP clients with withX402Client 

[ Coding tools ](https://developers.cloudflare.com/agents/tools/payments/x402/pay-with-tool-plugins/) OpenCode plugin and Claude Code hook 

## SDKs

| Package     | Install                 | Use                                           |
| ----------- | ----------------------- | --------------------------------------------- |
| x402-hono   | npm install x402-hono   | Hono middleware for Worker servers            |
| @x402/fetch | npm install @x402/fetch | Fetch wrapper with automatic payment handling |
| @x402/evm   | npm install @x402/evm   | EVM payment scheme support                    |
| agents/x402 | Included in agents      | MCP client with x402 payment support          |

## Related

* [x402.org ↗](https://x402.org) — Protocol specification
* [x402 GitHub ↗](https://github.com/x402-foundation/x402) — Open source SDK
* [x402 examples ↗](https://github.com/cloudflare/agents/tree/main/examples) — Complete working code
* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/) — Cloudflare-native monetization

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/tools/payments/x402/#page","headline":"x402 · Cloudflare Agents docs","description":"Accept and make machine-to-machine payments using the x402 HTTP payment protocol on Cloudflare Workers and the Agents SDK.","url":"https://developers.cloudflare.com/agents/tools/payments/x402/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/payments/","name":"Agentic Payments"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/payments/x402/","name":"x402"}}]}
```
