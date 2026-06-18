---
title: Vitest integration
description: Run unit and integration tests for Cloudflare Workers inside the Workers runtime using the Vitest integration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vitest integration

For most users, Cloudflare recommends using the Workers Vitest integration for testing Workers and [Pages Functions](https://developers.cloudflare.com/pages/functions/) projects. [Vitest ↗](https://vitest.dev/) is a popular JavaScript testing framework featuring a very fast watch mode, Jest compatibility, and out-of-the-box support for TypeScript. In this integration, Cloudflare provides a custom pool that allows your Vitest tests to run _inside_ the Workers runtime.

The Workers Vitest integration:

* Supports both **unit tests** and **integration tests**.
* Provides direct access to Workers runtime APIs and bindings.
* Implements isolated per-test-file storage.
* Runs tests fully-locally using [Miniflare ↗](https://miniflare.dev/).
* Leverages Vitest's hot-module reloading for near instant reruns.
* Supports projects with multiple Workers.
[ Write your first test ](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/#page","headline":"Vitest integration · Cloudflare Workers docs","description":"Run unit and integration tests for Cloudflare Workers inside the Workers runtime using the Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/vitest-integration/","name":"Vitest integration"}}]}
```
