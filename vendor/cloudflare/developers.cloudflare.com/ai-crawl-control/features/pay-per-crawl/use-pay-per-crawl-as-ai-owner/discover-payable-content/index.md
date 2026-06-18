---
title: Discover payable content
description: Find sites offering content via Pay Per Crawl.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Discover payable content

graph LR
A[Set up your<br>Cloudflare Account] --> B[Verify your<br>AI crawler]
B --> C[Discover<br>payable content]:::highlight
C --> D[Connect to<br>Stripe]
D --> E[Crawl pages]
classDef highlight fill:#F6821F,color:white

The Pay Per Crawl Discovery API allows verified AI crawlers to discover which domains offer paid content access. This enables your crawler to proactively identify sites participating in Pay Per Crawl before making crawl requests.

## Prerequisites

Before using the Pay Per Crawl Discovery API, you must:

* [Set up your Cloudflare account](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/set-up-cloudflare-account/)
* [Verify your AI crawler](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/verify-ai-crawler/)

## Authenticate with Web Bot Auth

All requests to the Discovery API must be authenticated using HTTP message signatures with Web Bot Auth headers. This ensures that only verified crawlers can access the list of participating domains.

1. Generate your Web Bot Auth signature following the steps in [Sign your requests](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/#4-after-verification-sign-your-requests).
2. Construct the required headers as described in [Construct the required headers](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/#43-construct-the-required-headers):  
   * `Signature`: The cryptographic signature of the request  
   * `Signature-Input`: The signature metadata and parameters  
   * `Signature-Agent`: Information about the signing agent

## Discover participating domains

### API endpoint

```

GET https://crawlers-api.ai-audit.cfdata.org/charged_zones


```

### Request parameters

* `cursor` (optional): Cursor returned from a previous call for pagination
* `limit` (optional): Number of results to return per request

### Request headers

Include the HTTP message signature headers generated using Web Bot Auth:

```

Signature: <your-signature>

Signature-Input: <signature-metadata>

Signature-Agent: <agent-information>


```

### Example request

Terminal window

```

curl -X GET "https://crawlers-api.ai-audit.cfdata.org/charged_zones?limit=50" \

  -H "Signature: <your-signature>" \

  -H "Signature-Input: <signature-metadata>" \

  -H "Signature-Agent: <agent-information>"


```

### Response format

The API returns a list of zones (domains) that have Pay Per Crawl enabled and are accepting payments from your crawler.

```

{

  "result": {

    "zones": [

      {

        "domain": "example.com"

      },

      {

        "domain": "news-site.com"

      }

    ]

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

### Response fields

* `result.zones`: Array of zone objects containing domains with Pay Per Crawl enabled
* `result.zones[].domain`: The domain name offering Pay Per Crawl content
* `success`: Boolean indicating whether the request was successful
* `errors`: Array of error messages (empty if successful)
* `messages`: Array of informational messages

## Use discovery data

The Discovery API returns domains where site owners have specifically configured your crawler to be charged for content access. If a domain does not appear in the response, the site owner has not enabled Pay Per Crawl charging for your crawler. Site owners may also block or allow your crawler through WAF rules or set directives in their robots.txt file, which you should check and respect.

Cache discovery results locally and refresh periodically to stay up-to-date with domains joining or leaving Pay Per Crawl.

## Additional resources

* [Crawl pages](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/crawl-pages/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/discover-payable-content/#page","headline":"Discover payable content · Cloudflare AI Crawl Control docs","description":"Find sites offering content via Pay Per Crawl.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/discover-payable-content/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/","name":"Pay Per Crawl"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/","name":"Use pay per crawl as an AI owner"}},{"@type":"ListItem","position":6,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/discover-payable-content/","name":"Discover payable content"}}]}
```
