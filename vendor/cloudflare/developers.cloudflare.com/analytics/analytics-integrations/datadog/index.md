---
title: Datadog
description: This tutorial explains how to analyze Cloudflare metrics using the Cloudflare Integration tile for Datadog
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Datadog

This tutorial explains how to analyze Cloudflare metrics using the [Cloudflare Integration tile for Datadog ↗](https://docs.datadoghq.com/integrations/cloudflare/).

## Overview

Before viewing the Cloudflare dashboard in Datadog, note that this integration:

* Is available to all Cloudflare customer plans (Free, Pro, Business and Enterprise)
* Is based on the Cloudflare Analytics API
* Provides Cloudflare web traffic and DNS metrics only
* Does not feature data coming from request logs stored in Cloudflare Logs

## Task 1 - Install the Cloudflare App

To install the Cloudflare App for Datadog:

1. Log in to **Datadog**.
2. Click the **Integrations** tab.
3. In the **search box**, start typing _Cloudflare_. The app tile should appear below the search box.![Searching for Cloudflare App in the Datadog Integrations tab](https://developers.cloudflare.com/_astro/datadog-integrations.BJs60jr6_ZMH8eb.webp)
4. Click the **Cloudflare** tile to begin the installation.
5. Next, click **Configuration** and then complete the following:  
   * **Account name**: (Optional) This can be any value. It has not impact on the site data pulled from Cloudflare.  
   * **Email**: This value helps keep your account safe. We recommend creating a dedicated Cloudflare user for analytics with the [_Analytics_ role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) (read-only). Note that the _Analytics_ role is available to Enterprise customers only.  
   * **API Key**: Enter your Cloudflare Global API key. For details refer to [API Keys](https://developers.cloudflare.com/fundamentals/api/get-started/keys/).
6. Click **Install Integration**.![Configuring and installing the Datadog integration](https://developers.cloudflare.com/_astro/cloudflare-tile-datadog-fill-details.Bd14uPIs_Z1Rb82I.webp)

The Cloudflare App for Datadog should be installed now and you can view the dashboard.

## Task 2 - View the dashboard

By default, the dashboard displays metrics for all sites in your Cloudflare account. Use the dashboard filters see metrics for a specific domain.

The dashboard displays the following metrics:

* **Threats** (threats by type, threats by country)
* **Requests** (total requests, cached requests, uncached requests, top countries by request, requests by IP class, top content types)
* **Bandwidth** (total bandwidth, encrypted and unencrypted traffic cached bandwidth, uncached bandwidth)
* **Caching** (Cache hit rate, request caching rate over time)
* **HTTP response status errors**
* **Page views**
* **Search Engine Bot Traffic**
* **DNS** (DNS queries, response time, top hostnames, queries by type, stale vs. uncached queries)
![Dashboard displaying metrics for a site on a Cloudflare account](https://developers.cloudflare.com/_astro/cloudflare-dashboard-datadog.BETjd10H_1ROw9T.webp) 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-integrations/datadog/#page","headline":"Datadog · Cloudflare Analytics docs","description":"This tutorial explains how to analyze Cloudflare metrics using the Cloudflare Integration tile for Datadog","url":"https://developers.cloudflare.com/analytics/analytics-integrations/datadog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-integrations/","name":"Analytics integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-integrations/datadog/","name":"Datadog"}}]}
```
