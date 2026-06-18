---
title: Add custom ingest domains
description: Configure custom RTMPS ingest domains for Cloudflare Stream live inputs instead of using the default URL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add custom ingest domains

With custom ingest domains, you can configure your RTMPS feeds to use an ingest URL that you specify instead of using `live.cloudflare.com.`

Note

Custom Ingest Domains cannot be configured for domains with [zone holds](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) enabled.

1. In the Cloudflare dashboard, go to the **Live inputs** page.  
[ Go to **Live inputs** ](https://dash.cloudflare.com/?to=/:account/stream/inputs)
2. Select **Settings**, above the list. The **Custom Input Domains** page displays.
3. Under **Domain**, add your domain and select **Add domain**.
4. At your DNS provider, add a CNAME record that points to `live.cloudflare.com`. If your DNS provider is Cloudflare, this step is done automatically.

If you are using Cloudflare for DNS, ensure the [**Proxy status**](https://developers.cloudflare.com/dns/proxy-status/) of your ingest domain is **DNS only** (grey-clouded).

## Delete a custom domain

1. From the **Custom Input Domains** page under **Hostnames**, locate the domain.
2. Select the menu icon under **Action**. Select **Delete**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/stream-live/custom-domains/#page","headline":"Add custom ingest domains · Cloudflare Stream docs","description":"Configure custom RTMPS ingest domains for Cloudflare Stream live inputs instead of using the default URL.","url":"https://developers.cloudflare.com/stream/stream-live/custom-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/stream-live/","name":"Stream live video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/stream-live/custom-domains/","name":"Add custom ingest domains"}}]}
```
