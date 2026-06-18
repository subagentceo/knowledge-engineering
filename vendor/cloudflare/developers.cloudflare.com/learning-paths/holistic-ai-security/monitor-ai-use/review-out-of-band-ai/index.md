---
title: Review out-of-band AI use
description: Detect AI usage with CASB integrations.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Review out-of-band AI use

If your organization does not use the Cloudflare device client, or does not proxy HTTP traffic, you can still get valuable data about shadow AI usage if you use the [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/), [Microsoft 365](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/), or [GitHub](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/github/) integrations for the Cloudflare Cloud Access Security Broker (CASB).

The CASB provides detailed information about your SaaS environment, including changes to sensitive data, content, and application settings. It works even if your users do not have the Cloudflare device client installed. By using CASB integrations with your core Single Sign-On (SSO) provider, you can see if users have authenticated to any third-party applications. This offers a clear, non-invasive way to understand tool usage across your organization without needing to deploy a client.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai/#page","headline":"Review out-of-band AI use · Cloudflare Learning Paths","description":"Detect AI usage with CASB integrations.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/","name":"Monitor AI usage at your organization"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai/","name":"Review out-of-band AI use"}}]}
```
