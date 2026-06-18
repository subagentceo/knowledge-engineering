---
title: Datasets
description: Browse available Logpush dataset fields by category.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Datasets

## Datasets

The datasets below describe the fields available by log category:

* [Zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/)
* [Account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/)

## API

The list of fields can also be accessed directly from the API using the following endpoints:

* For zone-scoped datasets: `https://api.cloudflare.com/client/v4/zones/{zone_id}/logpush/datasets/<DATASET>/fields`
* For account-scoped datasets: `https://api.cloudflare.com/client/v4/accounts/{account_id}/logpush/datasets/<DATASET>/fields`

The `<DATASET>` argument indicates the log category. For example, `http_requests`, `spectrum_events`, `firewall_events`, `nel_reports`, or `dns_logs`.

## Availability

* The availability of Logpush dataset fields depends on your subscription plan.
* Zone-scoped HTTP requests are available in both Logpush and Logpull.
* [Custom fields](https://developers.cloudflare.com/logs/logpush/logpush-job/custom-fields/) for HTTP requests are only available in Logpush.
* All other datasets are only available through Logpush.

## Deprecation

Deprecated fields remain available to prevent breaking existing jobs. They may eventually become empty values if completely removed. Customers are encouraged to migrate away from deprecated fields if they are using them.

## Recommendation

For log field **ClientIPClass**, Cloudflare recommends using [bot tags](https://developers.cloudflare.com/bots/concepts/bot-tags/) to classify IPs.

## Additional resources

For more information on logs available in Cloudflare Zero Trust, refer to [Zero Trust logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/#page","headline":"Datasets · Cloudflare Logs docs","description":"Browse available Logpush dataset fields by category.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/datasets/","name":"Datasets"}}]}
```
