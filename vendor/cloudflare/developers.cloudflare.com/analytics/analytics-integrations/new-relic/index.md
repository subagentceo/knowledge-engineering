---
title: New Relic
description: This tutorial explains how to analyze Cloudflare metrics using the New Relic One Cloudflare Quickstart.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# New Relic

This tutorial explains how to analyze Cloudflare metrics using the [New Relic One Cloudflare Quickstart ↗](https://newrelic.com/instant-observability/cloudflare/fc2bb0ac-6622-43c6-8c1f-6a4c26ab5434).

## Prerequisites

Before sending your Cloudflare log data to New Relic, make sure that you:

* Have a Cloudflare Enterprise account with Cloudflare Logs enabled.
* Have a New Relic account.
* Configure [Logpush to New Relic](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/new-relic/).

## Task 1 - Install the Cloudflare Network Logs quickstart

1. Log in to New Relic.
2. Click the Instant Observability button (top right).
3. Search for **Cloudflare Network Logs**.
![Cloudflare Network Logs install screen](https://developers.cloudflare.com/_astro/cloudflare-network-logs.CYJYSb1Z_1A3d0x.webp) 
1. Click **Install this quickstart**.
2. Follow the steps to deploy.

## Task 2 - View the Cloudflare Dashboards

You can view your dashboards on the New Relic dashboard page. The dashboards include the following information:

### Overview

Get a quick overview of the most important metrics from your websites and applications on the Cloudflare network.

![Cloudflare Network Logs install screen](https://developers.cloudflare.com/_astro/dash-1.CTd2mveX_ZpWmkd.webp) 

### Security

Get insights on threats to your websites and applications, including number of threats taken action on by the Web Application Firewall (WAF), threats over time, top threat countries, and more.

![Cloudflare Network security metrics screen](https://developers.cloudflare.com/_astro/dash-2.DpiyWwxC_Z1KLMnK.webp) 

### Performance

Identify and address performance issues and caching misconfigurations. Metrics include total requests, total versus cached requests, total versus origin requests.

![Cloudflare Network Logs performance metrics screen](https://developers.cloudflare.com/_astro/dash-3.DMdRroU0_ZLKqKd.webp) 

### Reliability

Get insights on the availability of your websites and Applications. Metrics include, edge response status over time, percentage of `3xx`/`4xx`/`5xx` errors over time, and more.

![Cloudflare Network Logs reliability metrics screen](https://developers.cloudflare.com/_astro/dash-4.BIqk6bUl_wxIpq.webp) 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-integrations/new-relic/#page","headline":"New Relic · Cloudflare Analytics docs","description":"This tutorial explains how to analyze Cloudflare metrics using the New Relic One Cloudflare Quickstart.","url":"https://developers.cloudflare.com/analytics/analytics-integrations/new-relic/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-integrations/","name":"Analytics integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-integrations/new-relic/","name":"New Relic"}}]}
```
