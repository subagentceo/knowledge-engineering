---
title: /screenshot - Capture screenshot
description: Capture a screenshot of a fully rendered webpage using the Browser Run /screenshot endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# /screenshot - Capture screenshot

The `/screenshot` endpoint renders the webpage by processing its HTML and JavaScript, then captures a screenshot of the fully rendered page.

You can use this endpoint in two ways:

* **REST API**: [Create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.
* **Workers Bindings**: Call the endpoint directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the [Workers Bindings](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). No API token is needed.

For more information, refer to [Quick Actions: Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot


```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

## Common use cases

* Generate previews for websites, dashboards, or reports
* Capture screenshots for automated testing, QA, or visual regression

## Basic usage

### Take a screenshot from custom HTML

* [ curl ](#tab-panel-6918)
* [ TypeScript SDK ](#tab-panel-6919)
* [ Workers binding ](#tab-panel-6920)

Sets the HTML content of the page to `Hello World!` and then takes a screenshot. The option `omitBackground` hides the default white background and allows capturing screenshots with transparency.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "html": "Hello World!",

    "screenshotOptions": {

      "omitBackground": true

    }

  }' \

  --output "screenshot.png"


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const screenshot = await client.browserRendering.screenshot.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  html: "Hello World!",

  screenshotOptions: {

    omitBackground: true,

  },

});


console.log(screenshot.status);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("screenshot", {

      html: "Hello World!",

      screenshotOptions: {

        omitBackground: true,

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

### Take a screenshot from a URL

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com"

  }' \

  --output "screenshot.png"


```

For more options to control the final screenshot, like `clip`, `captureBeyondViewport`, `fullPage` and others, check the endpoint [reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/screenshot/methods/create/).

Notes for basic usage

* The `quality` parameter is not compatible with the default `.png` format and will return a 400 error. If you set `quality`, you must also set `type` to `.jpeg` or another supported format.
* By default, the browser viewport is set to **1920×1080**. You can override the default via request options.

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/screenshot/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Capture a screenshot of an authenticated page

Some webpages require authentication before you can view their content. Browser Run supports three authentication methods, which work across all [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) endpoints. For a quick reference of all methods, refer to [How do I render authenticated pages using Quick Actions?](https://developers.cloudflare.com/browser-run/faq/#how-do-i-render-authenticated-pages-using-quick-actions).

#### Cookie-based authentication

Provide valid session cookies to access pages that require login:

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/protected-page",

    "cookies": [

      {

        "name": "session_id",

        "value": "your-session-cookie-value",

        "domain": "example.com",

        "path": "/"

      }

    ]

  }' \

  --output "authenticated-screenshot.png"


```

#### HTTP Basic Auth

Use the `authenticate` parameter for pages behind HTTP Basic Authentication:

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/protected-page",

    "authenticate": {

      "username": "user",

      "password": "pass"

    }

  }' \

  --output "authenticated-screenshot.png"


```

#### Token-based authentication

Add custom authorization headers using `setExtraHTTPHeaders`:

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/protected-page",

    "setExtraHTTPHeaders": {

      "Authorization": "Bearer your-token"

    }

  }' \

  --output "authenticated-screenshot.png"


```

### Navigate and capture a full-page screenshot

Navigate to `https://cloudflare.com/`, change the page size (`viewport`) and wait until there are no active network connections (`waitUntil`) or up to a maximum of `4500ms` (`timeout`) before capturing a `fullPage` screenshot.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://cloudflare.com/",

    "screenshotOptions": {

       "fullPage": true

    },

    "viewport": {

      "width": 1280,

      "height": 720

    },

    "gotoOptions": {

      "waitUntil": "networkidle0",

      "timeout": 45000

    }

  }' \

  --output "advanced-screenshot.png"


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

### Customize CSS and embed custom JavaScript

Instruct the browser to go to `https://example.com`, embed custom JavaScript (`addScriptTag`) and add extra styles (`addStyleTag`), both inline (`addStyleTag.content`) and by loading an external stylesheet (`addStyleTag.url`).

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/",

    "addScriptTag": [

      { "content": "document.querySelector(`h1`).innerText = `Hello World!!!`" }

    ],

    "addStyleTag": [

      {

        "content": "div { background: linear-gradient(45deg, #2980b9  , #82e0aa  ); }"

      },

      {

        "url": "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"

      }

    ]

  }' \

  --output "screenshot.png"


```

### Capture a specific element using the selector option

To capture a screenshot of a specific element on a webpage, use the `selector` option with a valid CSS selector. You can also configure the `viewport` to control the page dimensions during rendering.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com",

    "selector": "#example_element_name",

    "viewport": {

      "width": 1200,

      "height": 1600

    }

  }' \

  --output "screenshot.png"


```

Many more options exist, like setting HTTP credentials using `authenticate`, setting `cookies`, and using `gotoOptions` to control page load behaviour - check the endpoint [reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/screenshot/methods/create/) for all available parameters.

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/#page","headline":"/screenshot - Capture screenshot · Cloudflare Browser Run docs","description":"Capture a screenshot of a fully rendered webpage using the Browser Run /screenshot endpoint.","url":"https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/quick-actions/screenshot-endpoint/","name":"/screenshot - Capture screenshot"}}]}
```
