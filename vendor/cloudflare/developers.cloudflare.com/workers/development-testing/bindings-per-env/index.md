---
title: Supported bindings per development mode
description: Supported bindings per development mode
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Supported bindings per development mode

## Local development

**Local simulations**: During local development, your Worker code always executes locally and bindings connect to locally simulated resources [by default](https://developers.cloudflare.com/workers/development-testing/#remote-bindings). This is supported in [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

**Remote binding connections:**: Allows you to connect to remote resources on a [per-binding basis](https://developers.cloudflare.com/workers/development-testing/#remote-bindings). This is supported in [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

| Binding                                 | Local simulations | Remote binding connections |
| --------------------------------------- | ----------------- | -------------------------- |
| **AI**                                  | ❌                 | ✅                          |
| **Assets**                              | ✅                 | ❌                          |
| **Analytics Engine**                    | ✅                 | ❌                          |
| **Browser Run**                         | ✅                 | ✅                          |
| **D1**                                  | ✅                 | ✅                          |
| **Durable Objects**                     | ✅                 | ❌ [1](#user-content-fn-1)  |
| **Containers**                          | ✅                 | ❌                          |
| **Email Bindings**                      | ✅                 | ✅                          |
| **Hyperdrive**                          | ✅                 | ❌                          |
| **Images**                              | ✅                 | ✅                          |
| **KV**                                  | ✅                 | ✅                          |
| **Media Transformations**               | ❌                 | ✅                          |
| **mTLS**                                | ❌                 | ✅                          |
| **Queues**                              | ✅                 | ✅                          |
| **R2**                                  | ✅                 | ✅                          |
| **Rate Limiting**                       | ✅                 | ❌                          |
| **Service Bindings (multiple Workers)** | ✅                 | ✅                          |
| **Vectorize**                           | ❌                 | ✅                          |
| **Workflows**                           | ✅                 | ❌                          |

## Remote development

During remote development, all of your Worker code is uploaded and executed on Cloudflare's infrastructure, and bindings always connect to remote resources. **We recommend using local development with remote binding connections instead** for faster iteration and debugging.

Supported only in [wrangler dev --remote](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) \- there is **no Vite plugin equivalent**.

| Binding                                 | Remote development |
| --------------------------------------- | ------------------ |
| **AI**                                  | ✅                  |
| **Assets**                              | ✅                  |
| **Analytics Engine**                    | ✅                  |
| **Browser Run**                         | ✅                  |
| **D1**                                  | ✅                  |
| **Durable Objects**                     | ✅                  |
| **Containers**                          | ❌                  |
| **Email Bindings**                      | ✅                  |
| **Hyperdrive**                          | ✅                  |
| **Images**                              | ✅                  |
| **KV**                                  | ✅                  |
| **Media Transformations**               | ✅                  |
| **mTLS**                                | ✅                  |
| **Queues**                              | ❌                  |
| **R2**                                  | ✅                  |
| **Rate Limiting**                       | ✅                  |
| **Service Bindings (multiple Workers)** | ✅                  |
| **Vectorize**                           | ✅                  |
| **Workflows**                           | ❌                  |

## Footnotes

1. Refer to [Using remote resources with Durable Objects and Workflows](https://developers.cloudflare.com/workers/development-testing/#using-remote-resources-with-durable-objects-and-workflows) for recommended workarounds. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/development-testing/bindings-per-env/#page","headline":"Supported bindings per development mode · Cloudflare Workers docs","description":"Supported bindings per development mode","url":"https://developers.cloudflare.com/workers/development-testing/bindings-per-env/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/development-testing/","name":"Development & testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/development-testing/bindings-per-env/","name":"Supported bindings per development mode"}}]}
```
