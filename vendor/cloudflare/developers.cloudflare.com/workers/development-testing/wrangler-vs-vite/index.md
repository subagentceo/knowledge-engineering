---
title: Choosing between Wrangler &amp; Vite
description: Choosing between Wrangler and Vite for local development
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Choosing between Wrangler & Vite

# When to use Wrangler vs Vite

Deciding between Wrangler and the Cloudflare Vite plugin depends on your project's focus and development workflow. Here are some quick guidelines to help you choose:

## When to use Wrangler

* **Backend & Workers-focused:**If you're primarily building APIs, serverless functions, or background tasks, use Wrangler.
* **Remote development:**If your project needs the ability to run your worker remotely on Cloudflare's network, use Wrangler's `--remote` flag.
* **Simple frontends:**If you have minimal frontend requirements and don’t need hot reloading or advanced bundling, Wrangler may be sufficient.

## When to use the Cloudflare Vite Plugin

Use the [Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) for:

* **Frontend-centric development:**If you already use Vite with modern frontend frameworks like React, Vue, Svelte, or Solid, the Vite plugin integrates into your development workflow.
* **React Router v7:**If you are using [React Router v7 ↗](https://reactrouter.com/) (the successor to Remix), it is officially supported by the Vite plugin as a full-stack SSR framework.
* **Rapid iteration (HMR):**If you need near-instant updates in the browser, the Vite plugin provides [Hot Module Replacement (HMR) ↗](https://vite.dev/guide/features.html#hot-module-replacement) during local development.
* **Advanced optimizations:**If you require more advanced optimizations (code splitting, efficient bundling, CSS handling, build time transformations, etc.), Vite is a strong fit.
* **Greater flexibility:**Due to Vite's advanced configuration options and large ecosystem of plugins, there is more flexibility to customize your development experience and build output.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/development-testing/wrangler-vs-vite/#page","headline":"Choosing between Wrangler & Vite · Cloudflare Workers docs","description":"Choosing between Wrangler and Vite for local development","url":"https://developers.cloudflare.com/workers/development-testing/wrangler-vs-vite/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/development-testing/","name":"Development & testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/development-testing/wrangler-vs-vite/","name":"Choosing between Wrangler & Vite"}}]}
```
