---
title: Review inline AI use
description: Monitor AI application usage via Shadow IT.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Review inline AI use

To review how your organization uses AI apps, start with the Cloudflare [Shadow IT dashboard](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/). You can filter the dashboard by application type and sort by Artificial Intelligence, which allows you to take several valuable actions, such as:

* Reviewing application usage: See which applications your users are engaging with and how often, based on traffic from connected devices or sites.
* Accessing application details: Learn more about the applications in use by reviewing their entries in the App Library.
* Designating application status: Use a [status marker](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/#approval-status) to categorize applications, so you can apply specific security policies to them.
![Shadow IT dashboard showing utilization of application statuses \(Approved, Unapproved, In Review, Unreviewed\).](https://developers.cloudflare.com/_astro/shadowit-dashboard-ai-apps.Dbzn4dka_Z277Qkf.webp) 

This approach is most relevant for applications that your organization has not yet sanctioned. For example, if your business uses Google Workspace and its primary AI tool is Gemini, you would likely mark Gemini as _Approved_. While you can configure more specific data loss policies later, you can also target approved applications with greater specificity to detect risks unique to your organization.

![The App Library filtered to show some of the supported Artificial Intelligence applications.](https://developers.cloudflare.com/_astro/ai-app-type-app-library.C5AB815M_Z2MW3F.webp) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/review-inline-ai-use/#page","headline":"Review inline AI use · Cloudflare Learning Paths","description":"Monitor AI application usage via Shadow IT.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/review-inline-ai-use/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/","name":"Monitor AI usage at your organization"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/holistic-ai-security/monitor-ai-use/review-inline-ai-use/","name":"Review inline AI use"}}]}
```
