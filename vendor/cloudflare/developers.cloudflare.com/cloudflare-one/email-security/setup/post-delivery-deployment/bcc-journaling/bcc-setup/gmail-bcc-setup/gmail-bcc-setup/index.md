---
title: Overview
description: Overview in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Overview

For customers using Gmail as their email provider, setting up Email security is quick and easy.

You will need to [create an integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/), [add BCC rules](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/add-bcc-rules/), and [connect your domain(s)](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/). You can choose to [add additional domains](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/#add-additional-domains) at a later stage.

Once you set up Google integration, Email security will receive a copy of your email messages. You will need a Google integration to enable [auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/).

The following email flow shows how this works:

![Gmail BCC deployment flow](https://developers.cloudflare.com/_astro/Gmail_Deployment_BCC.YSoTUoiz_Z1MxITR.webp) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/gmail-bcc-setup/#page","headline":"Overview · Cloudflare One docs","description":"Overview in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/gmail-bcc-setup/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/","name":"Post-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/","name":"BCC/Journaling"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/","name":"BCC setup"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/gmail-bcc-setup/","name":"Overview"}}]}
```
