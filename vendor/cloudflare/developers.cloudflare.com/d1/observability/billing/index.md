---
title: Billing
description: Track D1 billing metrics including rows read, rows written, and storage usage across your account.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Billing

D1 exposes analytics to track billing metrics (rows read, rows written, and total storage) across all databases in your account.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) are sourced from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](https://developers.cloudflare.com/d1/observability/metrics-analytics/#query-via-the-graphql-api) via GraphQL or HTTP client.

## View metrics in the dashboard

Total account billable usage analytics for D1 are available in the Cloudflare dashboard. To view current and past metrics for an account:

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to **Billable Usage**.

From here you can view charts of your account's D1 usage on a daily or month-to-date timeframe.

Note that billable usage history is stored for a maximum of 30 days.

## Billing Notifications

Usage-based billing notifications are available within the [Cloudflare dashboard ↗](https://dash.cloudflare.com) for users looking to monitor their total account usage.

Notifications on the following metrics are available:

* Rows Read
* Rows Written

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/observability/billing/#page","headline":"Billing · Cloudflare D1 docs","description":"Track D1 billing metrics including rows read, rows written, and storage usage across your account.","url":"https://developers.cloudflare.com/d1/observability/billing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/observability/billing/","name":"Billing"}}]}
```
