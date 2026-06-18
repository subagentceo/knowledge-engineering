---
title: Verify local connectivity
description: Learn about verify local connectivity in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verify local connectivity

To verify that your DNS traffic is sent to Gateway:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. Under **Log traffic activity**, enable activity logging for all DNS logs.
3. On your device, open a browser and go to any website.
4. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs** \> **DNS**.
5. Make sure DNS queries from your device appear.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-verify-local-connectivity/#page","headline":"Verify local connectivity · Cloudflare Learning Paths","description":"Learn about verify local connectivity in this guide.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-verify-local-connectivity/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/","name":"Onboarding Cloudflare Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/gateway-verify-local-connectivity/","name":"Verify local connectivity"}}]}
```
