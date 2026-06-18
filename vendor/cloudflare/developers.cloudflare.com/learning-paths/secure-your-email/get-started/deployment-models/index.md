---
title: Deployment models
description: Compare API, BCC, and inline email deployments.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deployment models

Email security offers multiple deployment models:

* API for Microsoft 365 users.
* BCC for Google Workspace users.
* MX/Inline for all email providers.

When you choose the [API deployment](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/), Email security can both scan and take actions on emails after they have reached a user's inbox.

If you are a Google Workspace user, you can enable Email security via [BCC setup](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/gmail-bcc-setup/). Email security scans a copy of your email after it lands in your inbox.

![Google Workspace BCC deployment diagram](https://developers.cloudflare.com/_astro/Gmail_Deployment_BCC.YSoTUoiz_Z1MxITR.webp) 

With MX/Inline, Email security scans your email before they land in your inbox, giving you the highest level of protection.

![Microsoft 365 and Google Workspace MX/Inline](https://developers.cloudflare.com/_astro/Email_security_Deployment_Inline.Dsh4g8YD_fMdlm.webp) 

Refer to [Before you begin](https://developers.cloudflare.com/cloudflare-one/email-security/setup/) for a comprehensive comparison of each deployment method, and [Understanding Email Security Deployments](https://developers.cloudflare.com/reference-architecture/architectures/email-security-deployments/) to learn about each deployment method.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/get-started/deployment-models/#page","headline":"Deployment models · Cloudflare Learning Paths","description":"Compare API, BCC, and inline email deployments.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/get-started/deployment-models/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/get-started/","name":"Get started with Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/get-started/deployment-models/","name":"Deployment models"}}]}
```
