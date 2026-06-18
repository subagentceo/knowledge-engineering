---
title: Partner domain TLS
description: Partner domain TLS in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Partner domain TLS

To add additional TLS (Transport Layer Security) requirements for emails coming from certain domains, you can enforce higher levels of SSL/TLS inspection. If TLS is required, mail without TLS from the specified domain will be dropped.

Note

To enforce TLS across all emails, you will need to enforce TLS requirements when you are onboarding your domain. To only enforce TLS for specific emails, you can do so by going to **Settings** \> **Partner domain TLS** \> **Add a domain**.

To set up a partner domain:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and select **Email security**.
2. Select **Settings** \> **Partner domain TLS** \> **View**.
3. Select **Add a domain**.
4. Enter a valid domain name. You can also exclude subdomains by selecting **Add exclude**.
5. (Optional) Add an optional note to describe your rule(s).
6. Select **Save**.

To edit a partner domain, select the three dots > **Edit**.

To delete a partner domain, select the three dots > **Delete**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/partner-domain-tls/#page","headline":"Partner domain TLS · Cloudflare One docs","description":"Partner domain TLS in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/partner-domain-tls/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/partner-domain-tls/","name":"Partner domain TLS"}}]}
```
