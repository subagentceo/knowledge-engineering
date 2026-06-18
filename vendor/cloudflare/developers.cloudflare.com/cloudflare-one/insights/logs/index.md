---
title: Logs
description: Logs resources and guides for Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Logs

Review detailed logs for your Zero Trust organization.

* [ Dashboard logs ](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/)
* [ Logpush integration ](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/)

## Log retention

Cloudflare stores Zero Trust logs for different periods of time based on the service and plan type:

| Free                    | Standard  | Access    | Gateway   | Enterprise |                                 |
| ----------------------- | --------- | --------- | --------- | ---------- | ------------------------------- |
| **Admin logs**          | 18 months | 18 months | 18 months | 18 months  | 18 months                       |
| **Access logs**         | 24 hours  | 30 days   | 30 days   | 24 hours   | 180 days                        |
| **DNS logs**            | 24 hours  | 30 days   | 24 hours  | 30 days    | 180 days[1](#user-content-fn-1) |
| **Network logs**        | 24 hours  | 30 days   | 24 hours  | 30 days    | 30 days                         |
| **HTTP logs**           | 24 hours  | 30 days   | 24 hours  | 30 days    | 30 days                         |
| **DEX logs**            | 7 days    | 7 days    | 7 days    | 7 days     | 7 days                          |
| **Device posture logs** | 30 days   | 30 days   | 30 days   | 30 days    | 30 days                         |

## Log Explorer Beta

Log Explorer users can store Zero Trust logs directly within Cloudflare in an [R2 bucket](https://developers.cloudflare.com/r2/) and access them with the dashboard or API. Log Explorer supports the following Zero Trust datasets:

* [Access requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/access%5Frequests/) (`FROM access_requests`)
* [CASB Findings](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb%5Ffindings/) (`FROM casb_findings`)
* [Device posture results](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/device%5Fposture%5Fresults/) (`FROM device_posture_results`)
* [Gateway DNS](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fdns/) (`FROM gateway_dns`)
* [Gateway HTTP](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fhttp/) (`FROM gateway_http`)
* [Gateway Network](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fnetwork/) (`FROM gateway_network`)
* [Zero Trust Network Session Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/) (`FROM zero_trust_network_sessions`)

For more information, refer to [Log Explorer](https://developers.cloudflare.com/log-explorer/).

## Customer Metadata Boundary

You can use Cloudflare Zero Trust with the Data Localization Suite to restrict data storage to a specific geographic region. For more information, refer to [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/).

## Data privacy

For more information on how we use this data, refer to our [Privacy Policy ↗](https://www.cloudflare.com/application/privacypolicy/).

## Footnotes

1. Enterprise users on per query plans cannot store DNS logs via Cloudflare. You can still export logs via [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). For more information, contact your account team. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/#page","headline":"Zero Trust logs · Cloudflare One docs","description":"Logs resources and guides for Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}}]}
```
