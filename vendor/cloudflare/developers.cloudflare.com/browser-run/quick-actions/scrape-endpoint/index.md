---
title: /scrape - Scrape HTML elements
description: Extract structured data from specific webpage elements using the Browser Run /scrape endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# /scrape - Scrape HTML elements

The `/scrape` endpoint extracts structured data from specific elements on a webpage, returning details such as element dimensions and inner HTML.

You can use this endpoint in two ways:

* **REST API**: [Create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.
* **Workers Bindings**: Call the endpoint directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the [Workers Bindings](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). No API token is needed.

For more information, refer to [Quick Actions: Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/scrape


```

## Required fields

You must provide either `url` or `elements`:

* `url` (string)
* `elements` (array of objects) — each object must include `selector` (string)

## Common use cases

* Extract headings, links, prices, or other repeated content with CSS selectors
* Collect metadata (for example, titles, descriptions, canonical links)

## Basic usage

### Extract headings and links from a URL

* [ curl ](#tab-panel-6915)
* [ TypeScript SDK ](#tab-panel-6916)
* [ Workers binding ](#tab-panel-6917)

Go to `https://example.com` and extract metadata from all `h1` and `a` elements in the DOM.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/scrape' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

  "url": "https://example.com/",

  "elements": [{

    "selector": "h1"

  },

  {

    "selector": "a"

  }]

}'


```

```

{

  "success": true,

  "result": [

    {

      "results": [

        {

          "attributes": [],

          "height": 39,

          "html": "Example Domain",

          "left": 100,

          "text": "Example Domain",

          "top": 133.4375,

          "width": 600

        }

      ],

      "selector": "h1"

    },

    {

      "results": [

        {

          "attributes": [

            { "name": "href", "value": "https://www.iana.org/domains/example" }

          ],

          "height": 20,

          "html": "More information...",

          "left": 100,

          "text": "More information...",

          "top": 249.875,

          "width": 142

        }

      ],

      "selector": "a"

    }

  ]

}


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const scrapes = await client.browserRendering.scrape.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  elements: [{ selector: "h1" }, { selector: "a" }],

});


console.log(scrapes);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("scrape", {

      url: "https://example.com/",

      elements: [{ selector: "h1" }, { selector: "a" }],

    });

  },

} satisfies ExportedHandler<Env>;


```

Many more options exist, like setting HTTP credentials using `authenticate`, setting `cookies`, and using `gotoOptions` to control page load behaviour - check the endpoint [reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/scrape/methods/create/) for all available parameters.

### Response fields

* `results` _(array of objects)_ \- Contains extracted data for each selector.  
   * `selector` _(string)_ \- The CSS selector used.  
   * `results` _(array of objects)_ \- List of extracted elements matching the selector.  
         * `text` _(string)_ \- Inner text of the element.  
         * `html` _(string)_ \- Inner HTML of the element.  
         * `attributes` _(array of objects)_ \- List of extracted attributes such as `href` for links.  
         * `height`, `width`, `top`, `left` _(number)_ \- Position and dimensions of the element.

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/scrape/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/scrape-endpoint/#page","headline":"/scrape - Scrape HTML elements · Cloudflare Browser Run docs","description":"Extract structured data from specific webpage elements using the Browser Run /scrape endpoint.","url":"https://developers.cloudflare.com/browser-run/quick-actions/scrape-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/quick-actions/scrape-endpoint/","name":"/scrape - Scrape HTML elements"}}]}
```
