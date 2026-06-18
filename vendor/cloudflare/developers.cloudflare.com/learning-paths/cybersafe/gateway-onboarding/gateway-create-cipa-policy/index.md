---
title: Create CIPA policy
description: Learn about create cipa policy in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create CIPA policy

## Create CIPA policy

1. Go to **Traffic policies** \> **Firewall policies**.
2. Create a policy to block using the CIPA filter:  
| Selector           | Operator | Value         | Action |  
| ------------------ | -------- | ------------- | ------ |  
| Content Categories | in       | _CIPA Filter_ | Block  |
3. In **Logs** \> **Gateway** \> **DNS**, verify that you see the blocked domain.

Your environment is now protected against all of the subcategories listed in [Configuration](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cybersafe/#configuration).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-create-cipa-policy/#page","headline":"Create CIPA policy · Cloudflare Learning Paths","description":"Learn about create cipa policy in this guide.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-create-cipa-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/","name":"Onboarding Cloudflare Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/gateway-create-cipa-policy/","name":"Create CIPA policy"}}]}
```
