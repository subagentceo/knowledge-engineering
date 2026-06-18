---
title: Quick Actions
description: Use Browser Run Quick Actions HTTP endpoints to capture screenshots, extract HTML, generate PDFs, and perform other common browser tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Quick Actions

Quick Actions provide simple interfaces for common browser tasks like capturing screenshots, extracting HTML content, generating PDFs, and more. You can use Quick Actions in two ways:

* **REST API**: HTTP endpoints for one-off requests or external integration.
* **Workers Bindings**: Call Quick Actions directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using `env.BROWSER.quickAction()`.

The following are the available options:

* [ /content - Fetch HTML ](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/)
* [ /screenshot - Capture screenshot ](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/)
* [ /pdf - Render PDF ](https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/)
* [ /markdown - Extract Markdown from a webpage ](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/)
* [ /snapshot - Capture multiple page formats ](https://developers.cloudflare.com/browser-run/quick-actions/snapshot/)
* [ /scrape - Scrape HTML elements ](https://developers.cloudflare.com/browser-run/quick-actions/scrape-endpoint/)
* [ /json - Capture structured data using AI ](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/)
* [ /links - Retrieve links from a webpage ](https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/)
* [ /crawl - Crawl web content ](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)
* [ Reference ](https://developers.cloudflare.com/api/resources/browser%5Frendering/)

Use Quick Actions when you need a fast, simple way to perform common browser tasks such as capturing screenshots, extracting HTML, or generating PDFs without writing complex scripts. For more advanced automation, custom workflows, or persistent browser sessions, use [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or [CDP](https://developers.cloudflare.com/browser-run/cdp/).

## Before you begin

### REST API

To use Quick Actions via the REST API, [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:

* `Browser Rendering - Edit`

### Workers binding

To use Quick Actions from a [Worker](https://developers.cloudflare.com/workers/), configure a [browser binding](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings) in your `wrangler.json`. No API token is needed when using the Workers binding.

JSONC

```

{

  "browser": {

    "binding": "BROWSER"

  }

}


```

Warning

The `.quickAction()` method has two requirements:

* **Compatibility date:** Your Worker must use a compatibility date of `2026-03-24` or later.
* **Remote mode for local development:** The `.quickAction()` method is not yet supported in local development mode. When developing locally with `wrangler dev`, you must use `npx wrangler dev --remote` or set `"remote": true` in your browser binding configuration. Without remote mode, you will receive the error: `The RPC receiver does not implement the method "quickAction"`.

JSONC

```

{

  "compatibility_date": "2026-03-24",

  "browser": {

    "binding": "BROWSER",

    "remote": true

  }

}


```

Note

You can monitor Browser Run (formerly Browser Rendering) usage in two ways:

* In the Cloudflare dashboard, go to the **Browser Run** page to view aggregate metrics, including total Quick Actions requests and total browser hours used.[ Go to **Browser Run** ](https://dash.cloudflare.com/?to=/:account/workers/browser-run)
* `X-Browser-Ms-Used` header: Returned in every Quick Actions response, reporting browser time used for that request (in milliseconds).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/browser-run/quick-actions/#page","headline":"Quick Actions · Cloudflare Browser Run docs","description":"Use Browser Run Quick Actions HTTP endpoints to capture screenshots, extract HTML, generate PDFs, and perform other common browser tasks.","url":"https://developers.cloudflare.com/browser-run/quick-actions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}}]}
```
