---
title: /pdf - Render PDF
description: Generate a PDF from a webpage or custom HTML using the Browser Run /pdf endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# /pdf - Render PDF

The `/pdf` endpoint instructs the browser to generate a PDF of a webpage or custom HTML using Cloudflare's headless Browser Run service.

You can use this endpoint in two ways:

* **REST API**: [Create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.
* **Workers Bindings**: Call the endpoint directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the [Workers Bindings](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). No API token is needed.

For more information, refer to [Quick Actions: Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/pdf


```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

## Common use cases

* Capture a PDF of a webpage
* Generate PDFs, such as invoices, licenses, reports, and certificates, directly from HTML

## Basic usage

### Convert a URL to PDF

* [ curl ](#tab-panel-6912)
* [ TypeScript SDK ](#tab-panel-6913)
* [ Workers binding ](#tab-panel-6914)

Navigate to `https://example.com/` and inject custom CSS and an external stylesheet. Then return the rendered page as a PDF.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/pdf' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/",

    "addStyleTag": [

      { "content": "body { font-family: Arial; }" }

    ]

  }' \

  --output "output.pdf"


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const pdf = await client.browserRendering.pdf.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  url: "https://example.com/",

  addStyleTag: [{ content: "body { font-family: Arial; }" }],

});


console.log(pdf);


const content = await pdf.blob();

console.log(content);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("pdf", {

      url: "https://example.com/",

      addStyleTag: [{ content: "body { font-family: Arial; }" }],

    });

  },

} satisfies ExportedHandler<Env>;


```

### Convert custom HTML to PDF

If you have raw HTML you want to generate a PDF from, use the `html` option. You can still apply custom styles using the `addStyleTag` parameter.

Terminal window

```

curl -X POST https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/pdf \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

  "html": "<html><body>Advanced Snapshot</body></html>",

  "addStyleTag": [

      { "content": "body { font-family: Arial; }" },

      { "url": "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" }

    ]

}' \

  --output "invoice.pdf"


```

Request size limits

The PDF endpoint accepts request bodies up to 50 MB. Requests larger than this will fail with `Error: request entity too large`.

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/pdf/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Advanced page load with custom headers and viewport

Navigate to `https://example.com`, setting additional HTTP headers and configuring the page size (viewport). The PDF generation will wait until there are no more than two network connections for at least 500 ms, or until the maximum timeout of 4500 ms is reached, before rendering.

The `goToOptions` parameter exposes most of [Puppeteer's API ↗](https://pptr.dev/api/puppeteer.gotooptions).

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/pdf' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com/",

    "setExtraHTTPHeaders": {

      "X-Custom-Header": "value"

    },

    "viewport": {

      "width": 1200,

      "height": 800

    },

    "gotoOptions": {

      "waitUntil": "networkidle2",

      "timeout": 45000

    }

  }' \

  --output "advanced-output.pdf"


```

### Blocking images and styles when generating a PDF

The options `rejectResourceTypes` and `rejectRequestPattern` can be used to block requests during rendering. The opposite can also be done, _only_ allow certain requests using `allowResourceTypes` and `allowRequestPattern`.

Terminal window

```

curl -X POST https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/pdf \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

  "url": "https://cloudflare.com/",

  "rejectResourceTypes": ["image"],

  "rejectRequestPattern": ["/^.*\\.(css)"]

}' \

  --output "cloudflare.pdf"


```

### Customize page headers and footers

You can customize page headers and footers with HTML templates using the `headerTemplate` and `footerTemplate` options. Enable `displayHeaderFooter` to include them in your output. This example generates an A5 PDF with a branded header, a footer message, and page numbering.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/pdf' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://example.com",

    "pdfOptions": {

      "format": "a5",

      "headerTemplate": "<div style=\"font-size: 10px; text-align: center; width: 100%; padding: 5px;\"><span>brand name</span></div>",

      "displayHeaderFooter": true,

      "footerTemplate": "<div style=\"color: lightgray; border-top: solid lightgray 1px; font-size: 10px; padding-top: 5px; text-align: center; width: 100%;\"><span>This is a test message</span> - <span class=\"pageNumber\"></span></div>",

      "margin": {

        "top": "70px",

        "bottom": "70px"

      }

    }

  }' \

  --output "header-footer.pdf"


```

### Include dynamic placeholders from page metadata

You can include dynamic placeholders such as `title`, `date`, `pageNumber`, and `totalPages` in the header or footer to display metadata on each page. This example produces an A4 PDF with a company-branded header, current date and title, and page numbering in the footer.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/pdf' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://news.ycombinator.com",

    "pdfOptions": {

      "format": "a4",

      "landscape": false,

      "printBackground": true,

      "preferCSSPageSize": true,

      "displayHeaderFooter": true,

      "scale": 1.0,

      "headerTemplate": "<div style=\"width: 100%; font-size: 10px; padding: 10px; text-align: center;\"><div style=\"border-bottom: 1px solid #ddd;\"><span style=\"color: #666;\">Company Name</span> | <span class=\"date\"></span> | <span class=\"title\"></span></div></div>",

      "footerTemplate": "<div style=\"width: 100%; font-size: 10px; padding: 10px; text-align: center;\"><div style=\"border-top: 1px solid #ddd;\">Page <span class=\"pageNumber\"></span> of <span class=\"totalPages\"></span></div></div>",

      "margin": {

        "top": "100px",

        "bottom": "80px",

        "right": "30px",

        "left": "30px"

      },

      "timeout": 30000

    }

  }' \

  --output "dynamic-header-footer.pdf"


```

### Use custom fonts

If your PDF requires a font that is not pre-installed in the Browser Run environment, you can load custom fonts using the `addStyleTag` parameter. For instructions and examples, refer to [Use your own custom font](https://developers.cloudflare.com/browser-run/features/custom-fonts/#quick-actions).

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/#page","headline":"/pdf - Render PDF · Cloudflare Browser Run docs","description":"Generate a PDF from a webpage or custom HTML using the Browser Run /pdf endpoint.","url":"https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/quick-actions/pdf-endpoint/","name":"/pdf - Render PDF"}}]}
```
