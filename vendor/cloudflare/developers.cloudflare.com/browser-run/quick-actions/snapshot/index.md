---
title: /snapshot - Capture multiple page formats
description: Capture HTML, screenshots, Markdown, and the accessibility tree from a webpage in a single Browser Run /snapshot request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# /snapshot - Capture multiple page formats

Browser Run provides individual endpoints for [HTML content](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/), [screenshots](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/), [Markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/), and more. The `/snapshot` endpoint combines multiple formats into a single request, so you do not need to call each endpoint separately. By default, it returns HTML content and a screenshot. You can use the `formats` parameter to customize which formats are included, such as adding Markdown and the accessibility tree to the response.

You can use this endpoint in two ways:

* **REST API**: [Create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.
* **Workers Bindings**: Call the endpoint directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the [Workers Bindings](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). No API token is needed.

For more information, refer to [Quick Actions: Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/snapshot


```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

## Common use cases

* Capture both the rendered HTML and a visual screenshot in a single API call
* Archive pages with visual and structural data together
* Build monitoring tools that compare visual and DOM differences over time

## Basic usage

### Capture a snapshot from a URL

* [ curl ](#tab-panel-6921)
* [ TypeScript SDK ](#tab-panel-6922)
* [ Workers Bindings ](#tab-panel-6923)

1. Go to `https://example.com/`.
2. Inject custom JavaScript.
3. Capture the rendered HTML.
4. Take a screenshot.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/snapshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/",

    "addScriptTag": [

      { "content": "document.body.innerHTML = \"Snapshot Page\";" }

    ]

  }'


```

```

{

  "success": true,

  "result": {

    "screenshot": "Base64EncodedScreenshotString",

    "content": "<html>...</html>"

  }

}


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const snapshot = await client.browserRendering.snapshot.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  url: "https://example.com/",

  addScriptTag: [{ content: 'document.body.innerHTML = "Snapshot Page";' }],

});


console.log(snapshot.content);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("snapshot", {

      url: "https://example.com/",

      addScriptTag: [{ content: 'document.body.innerHTML = "Snapshot Page";' }],

    });

  },

} satisfies ExportedHandler<Env>;


```

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/snapshot/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Create a snapshot from custom HTML

This example uses the `html` property to render `<html><body>Advanced Snapshot</body></html>` and does the following:

1. Disable JavaScript.
2. Sets the screenshot to `fullPage`.
3. Changes the page size `(viewport)`.
4. Waits up to `30000ms` or until the `DOMContentLoaded` event fires.
5. Returns the rendered HTML content and a base-64 encoded screenshot of the page.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/snapshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "html": "<html><body>Advanced Snapshot</body></html>",

    "setJavaScriptEnabled": false,

    "screenshotOptions": {

       "fullPage": true

    },

    "viewport": {

      "width": 1200,

      "height": 800

    },

    "gotoOptions": {

      "waitUntil": "domcontentloaded",

      "timeout": 30000

    }

  }'


```

```

{

  "success": true,

  "result": {

    "screenshot": "Base64EncodedScreenshotString",

    "content": "<html><body>Advanced Snapshot</body></html>"

  }

}


```

### Choose which formats to return

Use the `formats` parameter to control which representations of the page are included in the response. Accepted values are `"content"`, `"screenshot"`, `"markdown"`, and `"accessibilityTree"`. If omitted, the default is `["content", "screenshot"]`.

You must request at least two formats. If you only need a single format, use the corresponding single-format endpoint instead: [/content](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/), [/screenshot](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/), or [/markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/). A single-format endpoint for the accessibility tree is not yet available.

The following example requests a screenshot, Markdown, and the accessibility tree in one call:

* [ curl ](#tab-panel-6924)
* [ TypeScript SDK ](#tab-panel-6925)
* [ Workers Bindings ](#tab-panel-6926)

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/snapshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/",

    "formats": ["screenshot", "markdown", "accessibilityTree"]

  }'


```

```

{

  "success": true,

  "result": {

    "accessibilityTree": {

      "role": "RootWebArea",

      "name": "Example Domain",

      "children": [

        {

          "role": "heading",

          "name": "Example Domain",

          "level": 1

        },

        {

          "role": "StaticText",

          "name": "This domain is for use in documentation examples without needing permission. Avoid use in operations."

        },

        {

          "role": "link",

          "name": "Learn more"

        }

      ]

    },

    "screenshot": "iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAIAAAB...",

    "markdown": "# Example Domain\n\nThis domain is for use in documentation examples without needing permission. Avoid use in operations.\n\n[Learn more](https://iana.org/domains/example)"

  },

  "meta": {

    "status": 200,

    "title": "Example Domain"

  }

}


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const snapshot = await client.browserRendering.snapshot.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  url: "https://example.com/",

  formats: ["screenshot", "markdown", "accessibilityTree"],

});


console.log(snapshot.markdown);

console.log(snapshot.accessibilityTree);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("snapshot", {

      url: "https://example.com/",

      formats: ["screenshot", "markdown", "accessibilityTree"],

    });

  },

} satisfies ExportedHandler<Env>;


```

### Improve blurry screenshot resolution

If you set a large viewport width and height, your screenshot may appear blurry or pixelated. This can happen if your browser's default `deviceScaleFactor` (which defaults to 1) is not high enough for the viewport.

To fix this, increase the value of the `deviceScaleFactor`.

```

{

  "url": "https://cloudflare.com/",

  "viewport": {

    "width": 3600,

    "height": 2400,

    "deviceScaleFactor": 2

  }

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/snapshot/#page","headline":"/snapshot - Capture multiple page formats · Cloudflare Browser Run docs","description":"Capture HTML, screenshots, Markdown, and the accessibility tree from a webpage in a single Browser Run /snapshot request.","url":"https://developers.cloudflare.com/browser-run/quick-actions/snapshot/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-11","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/quick-actions/snapshot/","name":"/snapshot - Capture multiple page formats"}}]}
```
