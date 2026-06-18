---
title: DevTools
description: Use Chrome DevTools to debug, profile, and inspect Cloudflare Workers locally.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DevTools

## Using DevTools

When running your Worker locally using the [Wrangler CLI ↗](https://developers.cloudflare.com/workers/wrangler/) (`wrangler dev`) or using [Vite ↗](https://vite.dev/) with the [Cloudflare Vite plugin ↗](https://developers.cloudflare.com/workers/vite-plugin/), you automatically have access to [Cloudflare's implementation ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/chrome-devtools-patches) of [Chrome DevTools ↗](https://developer.chrome.com/docs/devtools/overview).

You can use Chrome DevTools to:

* View logs directly in the Chrome console
* [Debug code by setting breakpoints](https://developers.cloudflare.com/workers/observability/dev-tools/breakpoints/)
* [Profile CPU usage](https://developers.cloudflare.com/workers/observability/dev-tools/cpu-usage/)
* [Observe memory usage and debug memory leaks in your code that can cause out-of-memory (OOM) errors](https://developers.cloudflare.com/workers/observability/dev-tools/memory-usage/)

## Opening DevTools

### Wrangler

* Run your Worker locally, by running `wrangler dev`
* Press the `D` key from your terminal to open DevTools in a browser tab

### Vite

* Run your Worker locally by running `vite`
* In a new Chrome tab, open the debug URL that shows in your console (for example, `http://localhost:5173/__debug`)

### Dashboard editor & playground

Both the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and the [Worker's Playground ↗](https://workers.cloudflare.com/playground) include DevTools in the UI.

## Related resources

* [Local development](https://developers.cloudflare.com/workers/development-testing/) \- Develop your Workers and connected resources locally via Wrangler and workerd, for a fast, accurate feedback loop.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/dev-tools/#page","headline":"DevTools · Cloudflare Workers docs","description":"Use Chrome DevTools to debug, profile, and inspect Cloudflare Workers locally.","url":"https://developers.cloudflare.com/workers/observability/dev-tools/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/dev-tools/","name":"DevTools"}}]}
```
