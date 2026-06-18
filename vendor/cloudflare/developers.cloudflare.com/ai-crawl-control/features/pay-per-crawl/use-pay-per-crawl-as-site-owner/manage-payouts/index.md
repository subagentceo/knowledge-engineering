---
title: Manage payouts
description: Manage Stripe payouts for Pay Per Crawl revenue.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage payouts

graph LR
A[Enable in<br>account settings] --> B[Set a pay per <br/>crawl price ]
B --> C[Select crawlers<br>to charge]
C --> D[Monitor<br>activity]
D --> E[Manage<br>payouts]:::highlight
classDef highlight fill:#F6821F,color:white

click A "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/enable-in-account-settings/"
click B "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/"
click C "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/"
click D "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/monitor-activity/"

When you're ready to receive payments for your accrued crawler activity, connect your Cloudflare account to Stripe. This step can be completed at any time after enabling pay per crawl.

## Create a new Stripe account

A person with **Administrator** or **Super Administrator** access must set up the Stripe connection:

1. In the Cloudflare dashboard, go to **Manage Account** \> **Settings**.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Select **Pay Per Crawl**.
3. In the **Stripe account** section, select **Connect**.
4. Select **Continue to Stripe**.
5. Complete Stripe's onboarding process, including:  
   * Basic business information  
   * Bank account details for payouts

Pay Per Crawl Stripe account required

You must create a dedicated Cloudflare Stripe Connect account through the dashboard. Pre-existing Stripe accounts are not compatible with this feature.

## Billing lifecycle

Cloudflare manages the complete billing lifecycle:

1. **Charge initiation**: AI crawlers indicate payment intent via request headers
2. **Charge recording**: A charge event is recorded upon successful content delivery (HTTP 200 response)
3. **Aggregation**: Cloudflare aggregates and reconciles all recorded charges
4. **Payout**: Monthly payments to publishers in good standing

### Limitations

* Your accrued balance is not currently visible in the dashboard. You can request balance updates from your Cloudflare team.
* Payouts are subject to settlement periods and minimum payout thresholds.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/#page","headline":"Manage payouts · Cloudflare AI Crawl Control docs","description":"Manage Stripe payouts for Pay Per Crawl revenue.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Stripe"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/","name":"Pay Per Crawl"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/","name":"Use pay per crawl as a site owner"}},{"@type":"ListItem","position":6,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/","name":"Manage payouts"}}]}
```
