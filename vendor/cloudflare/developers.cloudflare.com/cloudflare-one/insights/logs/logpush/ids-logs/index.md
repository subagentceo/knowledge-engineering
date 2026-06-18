---
title: IDS logs
description: IDS logs in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IDS logs

You can use Logpush with [Cloudflare Network Firewall IDS](https://developers.cloudflare.com/cloudflare-network-firewall/about/ids/) (Intrusion Detection System) to export logs of detected threats. IDS monitors your network traffic for a wide range of known threat signatures, including attacks such as ransomware, data exfiltration, and network scanning.

## Set up Logpush for IDS

1. Consult the [Logpush Destination docs](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#destination) to learn about what destinations Logpush supports. The documentation will also instruct you on how to correctly format the destination URL for Logpush.
2. Follow the [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/) tutorial to validate your Logpush destination and define a Logpush job.

## Notes on using Logpush with IDS

* Magic IDS is an account-scoped dataset. Unlike zone-specific datasets that apply to a single domain, account-scoped datasets use a different API endpoint. Replace the string `/zone/<ZONE_ID>` in the Cloudflare API URLs in the tutorial with `/account/<ACCOUNT_ID>`.
* Consult the [Magic IDS Detection fields doc](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic%5Fids%5Fdetections/) to know what fields you want configured for the job.
* When creating the Logpush job, the dataset field should equal `magic_ids_detections`.
* Timestamps default to `unixnano` format (nanoseconds since the Unix epoch, January 1, 1970). If your destination expects a different format (such as RFC 3339), refer to [Logpush Options](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#options) for available timestamp formats. In the Logpush API configuration string, options are appended after the field list.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/ids-logs/#page","headline":"IDS logs · Cloudflare One docs","description":"IDS logs in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/ids-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/logs/logpush/","name":"Logpush integration"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/logs/logpush/ids-logs/","name":"IDS logs"}}]}
```
