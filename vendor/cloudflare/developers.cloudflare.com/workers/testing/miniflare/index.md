---
title: Miniflare
description: Simulate and test Cloudflare Workers locally with Miniflare, a fully-local development simulator.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Miniflare

Warning

This documentation describes the Miniflare API, which is only relevant for advanced use cases. Instead, most users should use [Wrangler](https://developers.cloudflare.com/workers/wrangler) to build, run & deploy their Workers locally

**Miniflare** is a simulator for developing and testing[**Cloudflare Workers** ↗](https://workers.cloudflare.com/). It's written in TypeScript, and runs your code in a sandbox implementing Workers' runtime APIs.

* 🎉 **Fun:** develop Workers easily with detailed logging, file watching and pretty error pages supporting source maps.
* 🔋 **Full-featured:** supports most Workers features, including KV, Durable Objects, WebSockets, modules and more.
* ⚡ **Fully-local:** test and develop Workers without an Internet connection. Reload code on change quickly.
[ Get Started ](https://developers.cloudflare.com/workers/testing/miniflare/get-started) [ GitHub ](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare) [ NPM ](https://npmjs.com/package/miniflare) 

---

These docs primarily cover Miniflare specific things. For more information on runtime APIs, refer to the[Cloudflare Workers docs](https://developers.cloudflare.com/workers).

If you find something that doesn't behave as it does in the production Workers environment (and this difference isn't documented), or something's wrong in these docs, please[open a GitHub issue ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose).

* [ Get Started ](https://developers.cloudflare.com/workers/testing/miniflare/get-started/) :  Install and configure the Miniflare API to dispatch events and test Cloudflare Workers locally.
* [ Writing tests ](https://developers.cloudflare.com/workers/testing/miniflare/writing-tests/) :  Write integration tests against Workers using Miniflare.
* [ Core ](https://developers.cloudflare.com/workers/testing/miniflare/core/) :  Core Miniflare features for testing Cloudflare Workers, including fetch events and compatibility settings.
* [ Developing ](https://developers.cloudflare.com/workers/testing/miniflare/developing/) :  Development tools for Miniflare, including debugger support and live reload for Cloudflare Workers.
* [ Migrations ](https://developers.cloudflare.com/workers/testing/miniflare/migrations/) :  Review migration guides for specific versions of Miniflare.
* [ Storage ](https://developers.cloudflare.com/workers/testing/miniflare/storage/) :  Configure and manage local storage simulators in Miniflare for Workers bindings like KV, R2, and D1\.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/testing/miniflare/#page","headline":"Miniflare · Cloudflare Workers docs","description":"Simulate and test Cloudflare Workers locally with Miniflare, a fully-local development simulator.","url":"https://developers.cloudflare.com/workers/testing/miniflare/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}}]}
```
