---
title: Report phish
description: Set up PhishNet for user phish reporting.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Report phish

Before deploying Email security to production, you will have to consider reporting any phishing attacks, evaluating which disposition to assign a specific message, and using different screen criteria to search through your inbox.

PhishNet is an add-in button that helps users to submit phish samples missed by Email security detection.

### PhishNet for Microsoft 365

To set up PhishNet Microsoft 365:

1. Log in to the Microsoft admin panel. Go to **Microsoft 365 admin center** \> **Settings** \> **Integrated Apps**.
2. Select **Upload custom apps**.
3. Choose **Provide link to manifest file** and paste the following URL:

```

https://phishnet-o365.area1cloudflare-webapps.workers.dev?clientId=ODcxNDA0MjMyNDM3NTA4NjQwNDk1Mzc3MDIxNzE0OTcxNTg0Njk5NDEyOTE2NDU5ODQyNjU5NzYzNjYyNDQ3NjEwMzIxODEyMDk1NQ


```

1. Verify and complete the wizard.

### PhishNet for Google Workspace

To set up PhishNet for Google Workspace:

1. Log in to the Google Workspace Marketplace using an administrator account.
2. Select **Admin install** to install Cloudflare PhishNet.

Refer to [Set up PhishNet for Google Workspace](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/phishnet-google-workspace/#set-up-phishnet-for-google-workspace) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/report-phish/#page","headline":"Report phish · Cloudflare Learning Paths","description":"Set up PhishNet for user phish reporting.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/report-phish/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/","name":"Configure Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/report-phish/","name":"Report phish"}}]}
```
