---
title: Add a prefix
description: Add an IP prefix to Advanced DDoS Protection for monitoring and mitigation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add a prefix

To add a [prefix](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#prefixes) to Advanced DDoS Protection:

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection**.
3. Under **General settings** \> **Prefixes**, select **Edit**.
4. Expand the **Add existing prefix** section and select **Add** next to the prefix you wish to add.  
Alternatively, enter a prefix and (optionally) a description in **Prefix** and **Description**, respectively, and select **Add**.

Note

The **Add existing prefix** list will not display leased prefixes, but you can add them manually in the Cloudflare dashboard or [using the API](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/). You cannot add [delegated prefixes](https://developers.cloudflare.com/byoip/concepts/prefix-delegations/) to Advanced TCP Protection.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix/#page","headline":"Add a prefix to Advanced DDoS Protection · Cloudflare DDoS Protection docs","description":"Add an IP prefix to Advanced DDoS Protection for monitoring and mitigation.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/add-prefix/","name":"Add a prefix"}}]}
```
