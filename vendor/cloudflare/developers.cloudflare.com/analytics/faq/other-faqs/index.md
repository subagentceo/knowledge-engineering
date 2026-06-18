---
title: Other FAQs
description: Additional frequently asked questions about analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Other FAQs

## Why do I see a large amount of traffic from CLOUDFLARENET ASN 13335 in Analytics? Does this indicate a DDoS attack?

There is a number of different types of traffic which may originate from **CLOUDFLARENET ASN 13335**; just because there is a lot of traffic from this AS, it likely does not indicate a DDoS attack.

Some sources of traffic from ASN13335 include:

* [Workers subrequests](https://developers.cloudflare.com/workers/runtime-apis/fetch/)
* [WARP](https://developers.cloudflare.com/warp-client/known-issues-and-faq/#does-warp-reveal-my-ip-address-to-websites-i-visit)
* [iCloud Private Relay ↗](https://blog.cloudflare.com/icloud-private-relay/) (For reference, iCloud Private Relay’s egress IP addresses are available in this [CSV form ↗](https://mask-api.icloud.com/egress-ip-ranges.csv))
* [Cloudflare Privacy Proxy ↗](https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/)
* Other Cloudflare features like [Health Checks](https://developers.cloudflare.com/health-checks/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/faq/other-faqs/#page","headline":"Other FAQs · Cloudflare Analytics docs","description":"Additional frequently asked questions about analytics.","url":"https://developers.cloudflare.com/analytics/faq/other-faqs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/faq/","name":"FAQs"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/faq/other-faqs/","name":"Other FAQs"}}]}
```
