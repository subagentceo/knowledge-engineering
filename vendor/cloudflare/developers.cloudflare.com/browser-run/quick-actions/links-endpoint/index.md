---
title: /links - Retrieve links from a webpage
description: Extract all links from a webpage, including hidden ones, using the Browser Run /links endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# /links - Retrieve links from a webpage

The `/links` endpoint retrieves all links from a webpage. It can be used to extract all links from a page, including those that are hidden.

You can use this endpoint in two ways:

* **REST API**: [Create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.
* **Workers Bindings**: Call the endpoint directly from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) using the [Workers Bindings](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). No API token is needed.

For more information, refer to [Quick Actions: Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## Endpoint

```

https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/links


```

## Required fields

You must provide either `url` or `html`:

* `url` (string)
* `html` (string)

## Common use cases

* Collect only user-visible links for UX or SEO analysis
* Crawl a site by discovering links on seed pages
* Validate navigation/footers and detect broken or external links

## Basic usage

### Get all links on a page

* [ curl ](#tab-panel-6906)
* [ TypeScript SDK ](#tab-panel-6907)
* [ Workers binding ](#tab-panel-6908)

This example grabs all links from the [Cloudflare Doc's homepage ↗](https://developers.cloudflare.com/). The response will be a JSON array containing the links found on the page.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/links' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://developers.cloudflare.com/"

  }'


```

```

{

  "success": true,

  "result": [

    "https://developers.cloudflare.com/",

    "https://developers.cloudflare.com/products/",

    "https://developers.cloudflare.com/api/",

    "https://developers.cloudflare.com/fundamentals/api/reference/sdks/",

    "https://dash.cloudflare.com/",

    "https://developers.cloudflare.com/fundamentals/subscriptions-and-billing/",

    "https://developers.cloudflare.com/api/",

    "https://developers.cloudflare.com/changelog/",

64 collapsed lines

    "https://developers.cloudflare.com/glossary/",

    "https://developers.cloudflare.com/reference-architecture/",

    "https://developers.cloudflare.com/web-analytics/",

    "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/",

    "https://developers.cloudflare.com/registrar/",

    "https://developers.cloudflare.com/1.1.1.1/setup/",

    "https://developers.cloudflare.com/workers/",

    "https://developers.cloudflare.com/pages/",

    "https://developers.cloudflare.com/r2/",

    "https://developers.cloudflare.com/images/",

    "https://developers.cloudflare.com/stream/",

    "https://developers.cloudflare.com/products/?product-group=Developer+platform",

    "https://developers.cloudflare.com/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/",

    "https://developers.cloudflare.com/workers-ai/",

    "https://developers.cloudflare.com/vectorize/",

    "https://developers.cloudflare.com/ai-gateway/",

    "https://playground.ai.cloudflare.com/",

    "https://developers.cloudflare.com/products/?product-group=AI",

    "https://developers.cloudflare.com/cloudflare-one/access-controls/policies/",

    "https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/",

    "https://developers.cloudflare.com/cloudflare-one/traffic-policies/",

    "https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/",

    "https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/",

    "https://developers.cloudflare.com/products/?product-group=Cloudflare+One",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAmAIyiAzMIAsATlmi5ALhYs2wDnC40+AkeKlyFcgLAAoAMLoqEAKY3sAESgBnGOhdRo1pSXV4CYhIqOGBbBgAiKBpbAA8AOgArFwjSVCgwe1DwqJiE5IjzKxt7CGwAFToYW184GBgwPgIoa2REuAA3OBdeBFgIAGpgdFxwW3NzOPckElxbVDhwCBIAbzMSEm66Kl4-WwheAAsACgRbAEcQWxcIAEpV9Y2SXmsbkkOIYDASBhIAAwAPABCRwAeQs5QAmgAFACi70+YAAfI8NgCKLg6Cink8AYdREiABK2MBgdAkADqmDAuAByHx2JxJABMCR5UOrhIwEQAGsQDASAB3bokADm9lsCAItlw5DomxIFjJIFwqDAiFslMwPMl8TprNRzOQGKxfyIZkNZwgIAQVGCtkFJAAStd3FQXLZjh8vgAaB5M962OBzBAuXxrAMbCIvEoOCBVWwRXwROyxFDesBEI6ID0QBgAVXKADFsAAOCI+w0bAC+lZx1du5prlerRHMqmY6k02h4-CEYkkMnkilkRWsdgczjcHi8LSovn8mlIITCkTChE0qT8GSyq4iZDJZEKlnHpQqCdq9UavGarWS1gmZhWEW50QA+sNRpkk7k5vkUtW7Ydl2gQ9ro-YGEOxiyMwQA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwB2AMwAWAKyCAjMICc8meIBcLFm2Ac4XGnwEiJ0uYuUBYAFABhdFQgBTO9gAiUAM4x0bqNFsqSmngExCRUcMD2DABEUDT2AB4AdABWblGkqFBgjuGRMXFJqVGWNnaOENgAKnQw9v5wMDBgfARQtsjJcABucG68CLAQANTA6Ljg9paWCZ5IJLj2qHDgECQA3hYkJL10VLwB9hC8ABYAFAj2AI4g9m4QAJTrm1skvLZ388EkDE8vL8f2MBgdD+KIAd0wYFwUQANM8tgBfIgWeEkC4QEAIKgkABKt08VDc9hSblsp2092RiLhSMs6mYmm0uh4-CEYiksgUSnEJVsDicrg8Xh8bSo-kC2lIYQi0QihG06QCWRyMqiZGBZGK1j55SqNTq20azV4rXaqVsUwsayiwDgsQA+qNxtkoip8gtCmkEXT6Yzgsz9GyjJzTOJmEA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBWABwBGAOyjRANgDMAFgCcygFwsWbYBzhcafASInS5S1QFgAUAGF0VCAFMH2ACJQAzjHQeo0e2ok2ngExCRUcMCODABEUDSOAB4AdABWHjGkqFBgzpHRcQkp6THWdg7OENgAKnQwjoFwMDBgfARQ9sipcABucB68CLAQANTA6LjgjtbWSd5IJLiOqHDgECQA3lYkJP10VLxBjhC8ABYAFAiOAI4gjh4QAJSb2zskyABUH69vHyQASo4WnBeI4SAADK7jJzgkgAdz8pxIEFOYNOPnWdEo8M8SIg6BIHmcuBIV1u9wgHmR6B+Ow+yFpvHsD1JjmhYIYJBipwgEBgHjUyGQSUiLUcySZwEyVlpVwgIAQVF2cLgfiOJwuUPQTgANKzyQ9HkRXgBfHVWE1EayaZjaXT6Hj8IRiKQyBQqZRlexOFzuLw+PwdKiBYK6UgRKKxKKEXSZII5PKRmJkMDoMilWzeyo1OoNXbNVq8dqddL2GZWDYxYCqqgAfXGk1yMTUhSWxQyJutNrtoQdhmdJjd5mUzCAA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBmACyiAnBMFSAbIICMALhYs2wDnC40+AkeKkyJ8hQFgAUAGF0VCAFNb2ACJQAzjHSuo0G0pLq8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLC3iPJBJcO1Q4cAgSAG9zEhIeuipefzsIXgALAAoEOwBHEDtXCABKNY3Nkl4bW7mb6FCfKgBVACUADIkBgkSJHCAQGCuJTIZDxMKNOwJV7ANJPTavKjvW4EECuazzEEkYSKIgYkjnCAgBBUEj-G4ebHI848c68CAnea3GItGwAwEAGhIuOpBNGdju5M2AF9BeYZUQLKpmOpNNoePwhGJJNI5IpijZ7I4XO5PN5WlQ-AFNKRQuEouFCJo0v5MtkHZEyGB0GQilYjWVKtValsGk1eHyqO1XDZJuZVpFgHAYgB9EZjLKRJR5eYFVIy5UqtVBDW6bUGPXGRTMIA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOAJwBmAIyiATKMkB2AKwyAXCxZtgHOFxp8BIidLmKVAWABQAYXRUIAU3vYAIlADOMdO6jQ7qki08AmISKjhgBwYAIigaBwAPADoAK3do0lQoMCcIqNj45LToq1t7JwhsABU6GAcAuBgYMD4CKDtkFLgANzh3XgRYCABqYHRccAcrK0SvJBJcB1Q4cAgSAG9LEhI+uipeQIcIXgALAAoEBwBHEAd3CABKDa3tnfc9g9RqXj8qEgBZI4ncYAOXQEAAgmAwOgAO4OXAXa63e5PTavV6XCAgBB-KgOWEkABKdy8VHcDjOAANARBgbgSAASdaXG53CBJSJ08YAXzC4J20LhCKSVIANM8MRj7gQQO4AgAWQRKMUvKUkE4OOCLBDyyXq15QmGwgLRADiAFEqtFVQaSDzbVKeQ8iGr7W7kMgSAB5KhgOgkS1VEislEQdwkWGYADWkd8JxIdI8JBgCHQCToSTdUFQJCRbPunKB4xIAEIGAwSOardEnlicX9afSwZChfDEaH2S63fXcYdjucqScIBAYPLPYkIs0HEleOhgFTu9sHZYeUQrBpmFodHoePwhGIpLJ5MoZKU7I5nG5PN5fO0qAEgjpSOFIjEudqQhlAtlcm-omQMJkCUNgXhU1S1PUOxNC0vBtB0aR2NMljrNEwBwHEAD6YwTDk0SqAUixFOkPIbpu24hLuBgHsYx5mDIzBAA",

    "https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/",

    "https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/",

    "https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/",

    "https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/",

    "https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/",

    "https://discord.cloudflare.com/",

    "https://x.com/CloudflareDev",

    "https://community.cloudflare.com/",

    "https://github.com/cloudflare",

    "https://developers.cloudflare.com/sponsorships/",

    "https://developers.cloudflare.com/style-guide/",

    "https://blog.cloudflare.com/",

    "https://developers.cloudflare.com/fundamentals/",

    "https://support.cloudflare.com/",

    "https://www.cloudflarestatus.com/",

    "https://www.cloudflare.com/trust-hub/compliance-resources/",

    "https://www.cloudflare.com/trust-hub/gdpr/",

    "https://www.cloudflare.com/",

    "https://www.cloudflare.com/people/",

    "https://www.cloudflare.com/careers/",

    "https://radar.cloudflare.com/",

    "https://speed.cloudflare.com/",

    "https://isbgpsafeyet.com/",

    "https://rpki.cloudflare.com/",

    "https://ct.cloudflare.com/",

    "https://x.com/cloudflare",

    "https://discord.cloudflare.com/",

    "https://www.youtube.com/cloudflare",

    "https://github.com/cloudflare/cloudflare-docs",

    "https://www.cloudflare.com/privacypolicy/",

    "https://www.cloudflare.com/website-terms/",

    "https://www.cloudflare.com/disclosure/",

    "https://www.cloudflare.com/trademark/"

  ]

}


```

TypeScript

```

import Cloudflare from "cloudflare";


const client = new Cloudflare({

  apiToken: process.env["CLOUDFLARE_API_TOKEN"],

});


const links = await client.browserRendering.links.create({

  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"],

  url: "https://developers.cloudflare.com/",

});


console.log(links);


```

TypeScript

```

interface Env {

  BROWSER: BrowserRun;

}


export default {

  async fetch(request, env): Promise<Response> {

    return await env.BROWSER.quickAction("links", {

      url: "https://developers.cloudflare.com/",

    });

  },

} satisfies ExportedHandler<Env>;


```

## Advanced usage

Looking for more parameters?

Visit the [Browser Run API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/subresources/links/methods/create/) for all available parameters, such as setting HTTP credentials using `authenticate`, setting `cookies`, and customizing load behavior using `gotoOptions`.

### Retrieve only visible links

Set the `visibleLinksOnly` parameter to `true` to only return links that are visible on the page. By default, this is set to `false`.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/links' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://developers.cloudflare.com/",

    "visibleLinksOnly": true

  }'


```

```

{

  "success": true,

  "result": [

    "https://developers.cloudflare.com/",

    "https://developers.cloudflare.com/products/",

    "https://developers.cloudflare.com/api/",

    "https://developers.cloudflare.com/fundamentals/api/reference/sdks/",

    "https://dash.cloudflare.com/",

    "https://developers.cloudflare.com/fundamentals/subscriptions-and-billing/",

    "https://developers.cloudflare.com/api/",

    "https://developers.cloudflare.com/changelog/",

64 collapsed lines

    "https://developers.cloudflare.com/glossary/",

    "https://developers.cloudflare.com/reference-architecture/",

    "https://developers.cloudflare.com/web-analytics/",

    "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/",

    "https://developers.cloudflare.com/registrar/",

    "https://developers.cloudflare.com/1.1.1.1/setup/",

    "https://developers.cloudflare.com/workers/",

    "https://developers.cloudflare.com/pages/",

    "https://developers.cloudflare.com/r2/",

    "https://developers.cloudflare.com/images/",

    "https://developers.cloudflare.com/stream/",

    "https://developers.cloudflare.com/products/?product-group=Developer+platform",

    "https://developers.cloudflare.com/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/",

    "https://developers.cloudflare.com/workers-ai/",

    "https://developers.cloudflare.com/vectorize/",

    "https://developers.cloudflare.com/ai-gateway/",

    "https://playground.ai.cloudflare.com/",

    "https://developers.cloudflare.com/products/?product-group=AI",

    "https://developers.cloudflare.com/cloudflare-one/access-controls/policies/",

    "https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/",

    "https://developers.cloudflare.com/cloudflare-one/traffic-policies/",

    "https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/",

    "https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/",

    "https://developers.cloudflare.com/products/?product-group=Cloudflare+One",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAmAIyiAzMIAsATlmi5ALhYs2wDnC40+AkeKlyFcgLAAoAMLoqEAKY3sAESgBnGOhdRo1pSXV4CYhIqOGBbBgAiKBpbAA8AOgArFwjSVCgwe1DwqJiE5IjzKxt7CGwAFToYW184GBgwPgIoa2REuAA3OBdeBFgIAGpgdFxwW3NzOPckElxbVDhwCBIAbzMSEm66Kl4-WwheAAsACgRbAEcQWxcIAEpV9Y2SXmsbkkOIYDASBhIAAwAPABCRwAeQs5QAmgAFACi70+YAAfI8NgCKLg6Cink8AYdREiABK2MBgdAkADqmDAuAByHx2JxJABMCR5UOrhIwEQAGsQDASAB3bokADm9lsCAItlw5DomxIFjJIFwqDAiFslMwPMl8TprNRzOQGKxfyIZkNZwgIAQVGCtkFJAAStd3FQXLZjh8vgAaB5M962OBzBAuXxrAMbCIvEoOCBVWwRXwROyxFDesBEI6ID0QBgAVXKADFsAAOCI+w0bAC+lZx1du5prlerRHMqmY6k02h4-CEYkkMnkilkRWsdgczjcHi8LSovn8mlIITCkTChE0qT8GSyq4iZDJZEKlnHpQqCdq9UavGarWS1gmZhWEW50QA+sNRpkk7k5vkUtW7Ydl2gQ9ro-YGEOxiyMwQA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwB2AMwAWAKyCAjMICc8meIBcLFm2Ac4XGnwEiJ0uYuUBYAFABhdFQgBTO9gAiUAM4x0bqNFsqSmngExCRUcMD2DABEUDT2AB4AdABWblGkqFBgjuGRMXFJqVGWNnaOENgAKnQw9v5wMDBgfARQtsjJcABucG68CLAQANTA6Ljg9paWCZ5IJLj2qHDgECQA3hYkJL10VLwB9hC8ABYAFAj2AI4g9m4QAJTrm1skvLZ388EkDE8vL8f2MBgdD+KIAd0wYFwUQANM8tgBfIgWeEkC4QEAIKgkABKt08VDc9hSblsp2092RiLhSMs6mYmm0uh4-CEYiksgUSnEJVsDicrg8Xh8bSo-kC2lIYQi0QihG06QCWRyMqiZGBZGK1j55SqNTq20azV4rXaqVsUwsayiwDgsQA+qNxtkoip8gtCmkEXT6Yzgsz9GyjJzTOJmEA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBWABwBGAOyjRANgDMAFgCcygFwsWbYBzhcafASInS5S1QFgAUAGF0VCAFMH2ACJQAzjHQeo0e2ok2ngExCRUcMCODABEUDSOAB4AdABWHjGkqFBgzpHRcQkp6THWdg7OENgAKnQwjoFwMDBgfARQ9sipcABucB68CLAQANTA6LjgjtbWSd5IJLiOqHDgECQA3lYkJP10VLxBjhC8ABYAFAiOAI4gjh4QAJSb2zskyABUH69vHyQASo4WnBeI4SAADK7jJzgkgAdz8pxIEFOYNOPnWdEo8M8SIg6BIHmcuBIV1u9wgHmR6B+Ow+yFpvHsD1JjmhYIYJBipwgEBgHjUyGQSUiLUcySZwEyVlpVwgIAQVF2cLgfiOJwuUPQTgANKzyQ9HkRXgBfHVWE1EayaZjaXT6Hj8IRiKQyBQqZRlexOFzuLw+PwdKiBYK6UgRKKxKKEXSZII5PKRmJkMDoMilWzeyo1OoNXbNVq8dqddL2GZWDYxYCqqgAfXGk1yMTUhSWxQyJutNrtoQdhmdJjd5mUzCAA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBmACyiAnBMFSAbIICMALhYs2wDnC40+AkeKkyJ8hQFgAUAGF0VCAFNb2ACJQAzjHSuo0G0pLq8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLC3iPJBJcO1Q4cAgSAG9zEhIeuipefzsIXgALAAoEOwBHEDtXCABKNY3Nkl4bW7mb6FCfKgBVACUADIkBgkSJHCAQGCuJTIZDxMKNOwJV7ANJPTavKjvW4EECuazzEEkYSKIgYkjnCAgBBUEj-G4ebHI848c68CAnea3GItGwAwEAGhIuOpBNGdju5M2AF9BeYZUQLKpmOpNNoePwhGJJNI5IpijZ7I4XO5PN5WlQ-AFNKRQuEouFCJo0v5MtkHZEyGB0GQilYjWVKtValsGk1eHyqO1XDZJuZVpFgHAYgB9EZjLKRJR5eYFVIy5UqtVBDW6bUGPXGRTMIA",

    "https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOAJwBmAIyiATKMkB2AKwyAXCxZtgHOFxp8BIidLmKVAWABQAYXRUIAU3vYAIlADOMdO6jQ7qki08AmISKjhgBwYAIigaBwAPADoAK3do0lQoMCcIqNj45LToq1t7JwhsABU6GAcAuBgYMD4CKDtkFLgANzh3XgRYCABqYHRccAcrK0SvJBJcB1Q4cAgSAG9LEhI+uipeQIcIXgALAAoEBwBHEAd3CABKDa3tnfc9g9RqXj8qEgBZI4ncYAOXQEAAgmAwOgAO4OXAXa63e5PTavV6XCAgBB-KgOWEkABKdy8VHcDjOAANARBgbgSAASdaXG53CBJSJ08YAXzC4J20LhCKSVIANM8MRj7gQQO4AgAWQRKMUvKUkE4OOCLBDyyXq15QmGwgLRADiAFEqtFVQaSDzbVKeQ8iGr7W7kMgSAB5KhgOgkS1VEislEQdwkWGYADWkd8JxIdI8JBgCHQCToSTdUFQJCRbPunKB4xIAEIGAwSOardEnlicX9afSwZChfDEaH2S63fXcYdjucqScIBAYPLPYkIs0HEleOhgFTu9sHZYeUQrBpmFodHoePwhGIpLJ5MoZKU7I5nG5PN5fO0qAEgjpSOFIjEudqQhlAtlcm-omQMJkCUNgXhU1S1PUOxNC0vBtB0aR2NMljrNEwBwHEAD6YwTDk0SqAUixFOkPIbpu24hLuBgHsYx5mDIzBAA",

    "https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/",

    "https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/",

    "https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/",

    "https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/",

    "https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/",

    "https://discord.cloudflare.com/",

    "https://x.com/CloudflareDev",

    "https://community.cloudflare.com/",

    "https://github.com/cloudflare",

    "https://developers.cloudflare.com/sponsorships/",

    "https://developers.cloudflare.com/style-guide/",

    "https://blog.cloudflare.com/",

    "https://developers.cloudflare.com/fundamentals/",

    "https://support.cloudflare.com/",

    "https://www.cloudflarestatus.com/",

    "https://www.cloudflare.com/trust-hub/compliance-resources/",

    "https://www.cloudflare.com/trust-hub/gdpr/",

    "https://www.cloudflare.com/",

    "https://www.cloudflare.com/people/",

    "https://www.cloudflare.com/careers/",

    "https://radar.cloudflare.com/",

    "https://speed.cloudflare.com/",

    "https://isbgpsafeyet.com/",

    "https://rpki.cloudflare.com/",

    "https://ct.cloudflare.com/",

    "https://x.com/cloudflare",

    "https://discord.cloudflare.com/",

    "https://www.youtube.com/cloudflare",

    "https://github.com/cloudflare/cloudflare-docs",

    "https://www.cloudflare.com/privacypolicy/",

    "https://www.cloudflare.com/website-terms/",

    "https://www.cloudflare.com/disclosure/",

    "https://www.cloudflare.com/trademark/"

  ]

}


```

### Retrieve only links from the same domain

Set the `excludeExternalLinks` parameter to `true` to exclude links pointing to external domains. By default, this is set to `false`.

Terminal window

```

curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/links' \

  -H 'Authorization: Bearer <apiToken>' \

  -H 'Content-Type: application/json' \

  -d '{

    "url": "https://developers.cloudflare.com/",

    "excludeExternalLinks": true

  }'


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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/#page","headline":"/links - Retrieve links from a webpage · Cloudflare Browser Run docs","description":"Extract all links from a webpage, including hidden ones, using the Browser Run /links endpoint.","url":"https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/quick-actions/","name":"Quick Actions"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/quick-actions/links-endpoint/","name":"/links - Retrieve links from a webpage"}}]}
```
