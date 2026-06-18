---
title: Access event analytics
description: Reference information for Access event analytics in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access event analytics

Access event analytics allows you to review login attempts to the applications you protect behind [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). Access event analytics are powered by [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/).

To view Access event analytics:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Go to **Dashboards**.
3. Select **Access event analytics**.

Access Event Analytics aggregates authentication activity based on your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/).

The [Application Access Report](https://developers.cloudflare.com/cloudflare-one/insights/analytics/application-access/) dashboard offers a summary of overall Access activity, while [Access event analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/access/) dashboard provides a view of login events. You can export the Application Access Report to a PDF to share with stakeholders.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Available insights

The Access event analytics dashboard includes a time-series chart of authentication events, allowing you to identify spikes in login activity over a selected period.

* Events are displayed on the vertical axis.
* Time (in your local timezone) is shown along the horizontal axis.

The Access event analytics dashboard also shows data on your usage patterns with metrics including:

* Top used applications
* Top users
* Top IP addresses
* Top identities
* Top countries
* Top application types

These insights help you detect anomalies, and optimize policy rules.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/access/#page","headline":"Access event analytics · Cloudflare One docs","description":"Reference information for Access event analytics in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/access/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics/","name":"Dashboards"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/analytics/access/","name":"Access event analytics"}}]}
```
