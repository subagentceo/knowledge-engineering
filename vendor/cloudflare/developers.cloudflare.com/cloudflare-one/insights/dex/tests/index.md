---
title: Synthetic tests
description: Synthetic tests resources and guides for Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Synthetic tests

With Digital Experience Monitoring (DEX), you can test if your devices can connect to a private or public endpoint through the Cloudflare One Client. Tests allow you to monitor availability for a given application and investigate performance issues reported by your end users.

DEX tests will only run when the Cloudflare One Client is turned on, whereas [fleet status](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#fleet-status) metrics are always available.

To control which users or groups run a test, use [DEX rules](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/).

* [ HTTP test ](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/)
* [ Traceroute test ](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/)
* [ View test results ](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/)

## Export DEX application test logs

You can use [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/) to export [DEX application test](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/) data to [R2](https://developers.cloudflare.com/r2/) (Cloudflare's object storage), a third-party cloud storage bucket, or a Security Information and Event Management (SIEM) tool. This is useful if you need to retain test data beyond the [7-day log retention period](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention) or correlate DEX data with other log sources.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/#page","headline":"Synthetic tests · Cloudflare One docs","description":"Synthetic tests resources and guides for Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/tests/","name":"Synthetic tests"}}]}
```
