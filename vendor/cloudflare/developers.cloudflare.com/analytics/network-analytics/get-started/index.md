---
title: Get started
description: Learn how to view and use data from Network Analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Requirements

Network Analytics requires the following:

* A Cloudflare Enterprise plan.
* Cloudflare Magic Transit or Spectrum.
* Cloudflare WAN.

## View the Network Analytics dashboard

1. In the Cloudflare dashboard, go to the **Network Analytics** page.  
[ Go to **Network analytics** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics)
2. Select an account that has access to Magic Transit or Spectrum.
3. Configure the displayed data. You can [adjust the time range](https://developers.cloudflare.com/analytics/network-analytics/configure/time-range/), [select the main metric](https://developers.cloudflare.com/analytics/network-analytics/configure/displayed-data/#select-high-level-metric) (total packets or total bytes), [apply filters](https://developers.cloudflare.com/analytics/network-analytics/configure/displayed-data/#apply-filters), and more.

## Get Network Analytics data via API

Use the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) to query data using the available [Network Analytics nodes](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/).

## Send Network Analytics logs to a third-party service

[Create a Logpush job](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/) that sends Network analytics logs to your storage service, SIEM solution, or log management provider.

## Limitations

Users with the `Analytics` role will have visibility to IDs but will not see the following on the Network Analytics dashboard:

* Tunnel names
* Prefix names
* [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) rules
* [DDoS managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/)
* Override names

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/network-analytics/get-started/#page","headline":"Get started with Network Analytics · Cloudflare Analytics docs","description":"Learn how to view and use data from Network Analytics.","url":"https://developers.cloudflare.com/analytics/network-analytics/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/network-analytics/","name":"Network analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/network-analytics/get-started/","name":"Get started"}}]}
```
