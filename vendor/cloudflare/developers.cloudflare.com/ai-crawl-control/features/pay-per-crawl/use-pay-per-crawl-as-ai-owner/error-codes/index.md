---
title: Error codes
description: Reference for Pay Per Crawl error response codes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error codes

Pay per crawl error responses include a `crawler-error` header with a specific error code. The following table provides a complete reference of all possible error codes:

| Error Code               | HTTP Status | What to do                                                                                                                                                                                  |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CrawlerForbidden         | 403         | The site owner has blocked your crawler. You cannot access this content.                                                                                                                    |
| StrongAuthRequired       | 400         | Include valid Web Bot Auth headers with strong authentication in your request.                                                                                                              |
| InvalidSignature         | 400         | Include both signature-input and signature headers in your request. Refer to [Web Bot Auth documentation](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/). |
| InvalidCrawlerPriceValue | 400         | Check that your crawler-exact-price or crawler-max-price header value is properly formatted (for example, USD 0.01).                                                                        |
| MissingCrawlerPrice      | 402         | Include either crawler-exact-price or crawler-max-price header in your request.                                                                                                             |
| PaymentFailed            | 403         | Verify your payment processing is configured correctly in Pay Per Crawl settings. Contact Cloudflare support if the issue persists.                                                         |
| InvalidCrawlerExactPrice | 402         | Update your crawler-exact-price to match the crawler-price value from the response header.                                                                                                  |
| InvalidCrawlerMaxPrice   | 402         | Increase your crawler-max-price to meet or exceed the crawler-price value from the response header.                                                                                         |
| ConflictingPriceHeaders  | 400         | Use only one price header per request. Remove either crawler-max-price or crawler-exact-price.                                                                                              |
| InvalidContentPrice      | 502         | The origin returned an invalid price. This is a site owner configuration issue. Try again later or contact the site owner.                                                                  |
| InternalError            | 500         | A server error occurred. Retry your request with exponential backoff.                                                                                                                       |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/error-codes/#page","headline":"Error codes · Cloudflare AI Crawl Control docs","description":"Reference for Pay Per Crawl error response codes.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/error-codes/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/","name":"Pay Per Crawl"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/","name":"Use pay per crawl as an AI owner"}},{"@type":"ListItem","position":6,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/error-codes/","name":"Error codes"}}]}
```
