---
title: /markdown - Extract Markdown from a webpage
description: Convert webpage content to Markdown format using the Browser Run /markdown endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# /markdown - Extract Markdown from a webpage

The `/markdown` endpoint retrieves a webpage's content and converts it into Markdown format. You can specify a URL and optional parameters to refine the extraction process.

You can use this endpoint in two ways:

* **REST API**: [Create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.
* **Workers Bindings**: Call the endpoint directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the [Workers Bindings](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). No API token is needed.

For more information, refer to [Quick Actions: Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/markdown


```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

## Common use cases

* Normalize content for downstream processing (summaries, diffs, embeddings)
* Save articles or docs for editing or storage
* Strip styling/scripts and keep readable content + links

## Basic usage

### Convert a URL to Markdown

* [ curl ](#tab-panel-6909)
* [ TypeScript SDK ](#tab-panel-6910)
* [ Workers binding ](#tab-panel-6911)

This example fetches the Markdown representation of a webpage.

Terminal window

```

curl -X 'POST' 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/markdown' \

  -H 'Content-Type: application/json' \

  -H 'Authorization: Bearer <apiToken>' \

  -d '{

    "url": "https://example.com"

  }'


```

```

{

  "success": true,

  "result": "# Example Domain\n\nThis domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.\n\n[More information...](https://www.iana.org/domains/example)"

}


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const markdown = await client.browserRendering.markdown.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  url: "https://developers.cloudflare.com/",

});


console.log(markdown);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("markdown", {

      url: "https://example.com",

    });

  },

} satisfies ExportedHandler<Env>;


```

### Convert raw HTML to Markdown

Instead of fetching the content by specifying the URL, you can provide raw HTML content directly.

Terminal window

```

curl -X 'POST' 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/markdown' \

  -H 'Content-Type: application/json' \

  -H 'Authorization: Bearer <apiToken>' \

  -d '{

    "html": "<div>Hello World</div>"

  }'


```

```

{

  "success": true,

  "result": "Hello World"

}


```

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/markdown/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Exclude unwanted requests (for example, CSS)

You can refine the Markdown extraction by using the `rejectRequestPattern` parameter. In this example, requests matching the given regex pattern (such as CSS files) are excluded.

Terminal window

```

curl -X 'POST' 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/markdown' \

  -H 'Content-Type: application/json' \

  -H 'Authorization: Bearer <apiToken>' \

  -d '{

    "url": "https://example.com",

    "rejectRequestPattern": ["/^.*\\.(css)/"]

  }'


```

```

{

  "success": true,

  "result": "# Example Domain\n\nThis domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.\n\n[More information...](https://www.iana.org/domains/example)"

}


```

### Handling JavaScript-heavy pages

For JavaScript-heavy pages or Single Page Applications (SPAs), the default page load behavior may return empty or incomplete results. This happens because the browser considers the page loaded before JavaScript has finished rendering the content.

The simplest solution is to use the `gotoOptions.waitUntil` parameter set to `networkidle0` or `networkidle2`:

```

{

  "url": "https://example.com",

  "gotoOptions": {

    "waitUntil": "networkidle0"

  }

}


```

For faster responses, advanced users can use `waitForSelector` to wait for a specific element instead of waiting for all network activity to stop. This requires knowing which CSS selector indicates the content you need has loaded. For more details, refer to [Quick Actions timeouts](https://developers.cloudflare.com/browser-run/reference/timeouts/).

### Set a custom user agent

You can change the user agent at the page level by passing `userAgent` as a top-level parameter in the JSON body. This is useful if the target website serves different content based on the user agent.

Note

The `userAgent` parameter does not bypass bot protection. Requests from Browser Run will always be identified as a bot. Because the User-Agent is configurable, destination servers looking to identify or block Browser Run requests should use the [non-configurable headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#non-configurable-headers) rather than relying on the User-Agent string.

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

## Other Markdown conversion features

* Workers AI [AI.toMarkdown()](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) supports multiple document types and summarization.
* [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) allows real-time document conversion for Cloudflare zones using content negotiation headers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/#page","headline":"/markdown - Extract Markdown from a webpage · Cloudflare Browser Run docs","description":"Convert webpage content to Markdown format using the Browser Run /markdown endpoint.","url":"https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/quick-actions/markdown-endpoint/","name":"/markdown - Extract Markdown from a webpage"}}]}
```
