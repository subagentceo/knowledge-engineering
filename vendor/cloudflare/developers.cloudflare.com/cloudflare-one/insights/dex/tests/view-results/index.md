---
title: View test results
description: View test results in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# View test results

Use the results of a Digital Experience Monitoring (DEX) test to monitor availability and performance for a specific application. DEX stores test results for 7 days on all plans, according to the [log retention policy](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention).

## Prerequisites

* At least one [test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) has been created under **DEX** \> **Tests**.
* Admins must have at least the [Cloudflare Zero Trust Reporting role](https://developers.cloudflare.com/cloudflare-one/roles-permissions/#zero-trust-roles).

## View results for all devices

To view an overview of test results for all devices:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Tests** tab.
3. Select a test to view detailed results.

## View results for an individual device

To view analytics on a per-device level:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Team & Resources** \> **Devices** \> **Your devices**.
2. Select the device you want to view, and then select **View details**.
3. Select the **Tests** tab.
4. Select a test to view detailed results.

## Export DEX application test logs

You can use [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/) to export [DEX application test](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/) data to [R2](https://developers.cloudflare.com/r2/) (Cloudflare's object storage), a third-party cloud storage bucket, or a Security Information and Event Management (SIEM) tool. This is useful if you need to retain test data beyond the [7-day log retention period](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention) or correlate DEX data with other log sources.

## Related resources

* [DEX HTTP test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/) \- Send a `GET` request from enrolled devices to a web application and measure response times.
* [DEX Traceroute test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/) \- Map the network route between a device and a server, showing each hop along the path.
* [DEX rules](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/) \- Define which users or groups a test applies to, using selectors such as user email, user group, operating system, or managed network.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/#page","headline":"View test results · Cloudflare One docs","description":"View test results in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/tests/","name":"Synthetic tests"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/dex/tests/view-results/","name":"View test results"}}]}
```
