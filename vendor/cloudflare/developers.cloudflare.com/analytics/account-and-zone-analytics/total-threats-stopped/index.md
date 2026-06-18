---
title: Total threats stopped
description: Understand how total threat counts are calculated.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Total threats stopped

Total Threats Stopped measures the number of 'suspicious' and 'bad' requests that were aimed at your site. Requests receive these labels as they enter Cloudflare's network:

* **Legitimate:** Request passed directly to your site.
* **Suspicious:** Request has been challenged with a [Cloudflare challenge](https://developers.cloudflare.com/cloudflare-challenges/).
* **Bad:** Request has been blocked because our Browser Integrity Check, or because of user configured settings like WAF rules or IP Access rules.

In addition to threat analytics you can also monitor search engine crawlers going to your websites. For most websites, threats and crawlers make up 20% to 50% of traffic.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/total-threats-stopped/#page","headline":"Total threats stopped · Cloudflare Analytics docs","description":"Understand how total threat counts are calculated.","url":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/total-threats-stopped/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/account-and-zone-analytics/","name":"Account and zone analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/account-and-zone-analytics/total-threats-stopped/","name":"Total threats stopped"}}]}
```
