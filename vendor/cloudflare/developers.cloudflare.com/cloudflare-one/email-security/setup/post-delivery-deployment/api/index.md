---
title: API deployment
description: How API deployment works in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# API deployment

When you choose an API deployment, email messages only reach Email security after they have already reached a user's inbox.

Then, through an integration with your email provider, Email security can [auto-move messages](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) based on your organization's policies.

![With API deployment, messages travel through Email security's email filter after reaching your users.](https://developers.cloudflare.com/_astro/M365_API_Deployment_Graph.Czbz8tQF_ZWYsK4.webp) 

## Benefits

When you choose API deployment, you get the following benefits:

* Easy protection for complex email architectures, without requiring any change to mailflow operations.
* Agentless deployment for Microsoft 365.

## Limitations

However, API deployment also has the following disadvantages:

* Email security is dependent on Microsoft's Graph API, and outages will increase the message dwell time in the inbox.
* Your email provider may throttle API requests from Email security.
* Email security requires read and write access to mailboxes.
* Requires API support from your email provider (does not typically support on-premise providers).
* Detection rates may be lower if multiple solutions exist.
* Messages cannot be modified or quarantined.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/#page","headline":"API deployment · Cloudflare One docs","description":"How API deployment works in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/","name":"Post-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/api/","name":"API deployment"}}]}
```
