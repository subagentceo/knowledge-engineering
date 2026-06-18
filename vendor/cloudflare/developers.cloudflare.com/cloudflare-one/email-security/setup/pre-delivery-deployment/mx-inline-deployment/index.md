---
title: MX/Inline deployment
description: How MX/Inline deployment works in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MX/Inline deployment

With pre-delivery deployment, also known as Inline deployment, Email security evaluates email messages before they reach a user's inbox.

![Inline deployment diagram](https://developers.cloudflare.com/_astro/Email_security_Deployment_Inline.Dsh4g8YD_fMdlm.webp) 

Before you change your MX records, you will have to set up the [Time to Live (TTL)](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) on your DNS records. If you do not set up the TTL, the DNS propagation will take longer to happen.

Cloudflare recommends to decrease the TTL to five minutes (also known as [Auto](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/#proxied-records)) 3 to 5 days prior to the planned MX record change. Reducing the TTL allows the DNS record to propagate ahead of time, so changes take effect rapidly. Once you have completed your onboarding process, you can choose to increase the TTL.

When you have configured your TTL, you can deploy Email security via MX/Inline. An MX record is a [DNS record](https://developers.cloudflare.com/dns/manage-dns-records/).

If your DNS records are hosted by Cloudflare (or any other provider, except for Google), you can [edit your DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) via the dashboard or the API to point your MX records to Cloudflare.

By changing your MX records, Email security will be positioned between your incoming emails and Microsoft 0365 or Gmail.

Email security becomes a hop in the [SMTP ↗](https://www.cloudflare.com/en-gb/learning/email-security/what-is-smtp/) processing chain and physically interacts with incoming email messages. Based on your policies, various messages are blocked before reaching the inbox.

When you choose an inline deployment, you get the following benefits:

* Messages are processed and physically blocked before arriving in a user's mailbox.
* Your deployment is simpler, because any complex processing can happen downstream and without modification.
* Email security can modify delivered messages, adding subject or body mark-ups.
* Email security can offer high availability and adaptive message pooling.
* You can set up advanced handling downstream for non-quarantined messages with added X-headers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment/#page","headline":"MX/Inline deployment · Cloudflare One docs","description":"How MX/Inline deployment works in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment/","name":"MX/Inline deployment"}}]}
```
