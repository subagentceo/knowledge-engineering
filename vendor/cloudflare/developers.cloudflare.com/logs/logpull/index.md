---
title: Logpull
description: Pull request logs via the Logpull REST API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Logpull

Cloudflare Logpull is a REST API for consuming request logs over HTTP. These logs contain data related to the connecting client, the request path through the Cloudflare network, and the response from the origin web server. This data is useful for enriching existing logs on an origin server. Logpull is available to customers on the Enterprise plan.

Warning

Logpull is considered a legacy feature and we recommend using [Logpush](https://developers.cloudflare.com/logs/logpush/) or [Logs Engine](https://developers.cloudflare.com/logs/r2-log-retrieval/) instead for better performance and functionality.

Review the following content to learn more about Logpull.

* [ Understanding the basics ](https://developers.cloudflare.com/logs/logpull/understanding-the-basics/)
* [ Enabling log retention ](https://developers.cloudflare.com/logs/logpull/enabling-log-retention/)
* [ Requesting logs ](https://developers.cloudflare.com/logs/logpull/requesting-logs/)
* [ Additional details ](https://developers.cloudflare.com/logs/logpull/additional-details/)

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | No  | No       | No         | Yes |

### Limitation

Logpull is unavailable when the Customer Metadata Boundary (CMB) is set outside the US region. Specifically, it does not work when CMB is restricted to the EU-only setting. For more details, refer to the [Cloudflare Data Localization](https://developers.cloudflare.com/data-localization/) documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpull/#page","headline":"Logpull · Cloudflare Logs docs","description":"Pull request logs via the Logpull REST API.","url":"https://developers.cloudflare.com/logs/logpull/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpull/","name":"Logpull"}}]}
```
