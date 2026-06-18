---
title: Zone Analytics
description: Analyze request and bandwidth data per zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zone Analytics

The Cloudflare zone analytics is a major component of the overall Cloudflare Analytics product line. Specifically, this app gives you access to a wide range of metrics, collected at the website or domain level.

Note

Read [Cloudflare Analytics](https://developers.cloudflare.com/analytics/faq/about-analytics/)for general information about all of Cloudflare's analytics offerings. You can also understand the characteristics of the data that Cloudflare captures and processes.

---

## View your website analytics

To view metrics for your website, in the Cloudflare dashboard, go to the **Analytics & Logs** page.

[ Go to **HTTP Traffic** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/traffic) 

Once it loads, you can find tabs for **Traffic**, **Security**, **Performance**, **DNS**, **Workers**, and **Logs** (Enterprise domains only). To understand the various metrics available, refer to _Review your website metrics_ below.

---

## Review your website metrics

This section outlines the metrics available under each Analytics app tab. Before proceeding, note that each tab may contain:

* One or more panels to further categorize the underlying metrics.
* A dropdown (on the panel's top right) to filter metrics for a specific time period. The time period you can select may vary based on the Cloudflare plan that your domain is associated with.

Note

Cloudflare analytics are case sensitive for paths and URIs. Make sure that filters or queries use the correct case.

Below is a summary of each Analytics app tab.

### HTTP Traffic

#### Free plan

These metrics include legitimate user requests as well as crawlers and threats. The HTTP Traffic tab features the following panels: 

* **Web Traffic** \- Displays metrics for _Requests_, _Bandwidth_, and _Unique Visitors_. If you are using Cloudflare Workers, subrequests data will not be visible in zone Traffic Analytics. Instead, you can find subrequests analytics under the **Workers & Pages** tab in the **Overview** section. Refer to [Worker Analytics](https://developers.cloudflare.com/analytics/account-and-zone-analytics/analytics-with-workers/#worker-analytics) for more information.
* **Web Traffic Requests by Country** \- Is an interactive map that breaks down the number of requests by country. This panel also includes a data table for **Top Traffic Countries / Regions** that display the countries with the most number of requests (up to five, if the data exists).

#### Pro, Business, or Enterprise plan

Note

Privacy-first HTTP Traffic Analytics are available on the Pro, Business, and Enterprise plans.

Analytics are based on Cloudflare's edge logs, with no need for third party scripts or trackers. The HTTP Traffic tab features the following metrics:

* **Requests** \- An HTTP request. A typical page view requires many requests. If you are using Cloudflare Workers, subrequests data will not be visible in zone HTTP Traffic Analytics. Instead, you can find subrequests analytics under the **Workers & Pages** tab in the **Overview** section. Refer to [Worker Analytics](https://developers.cloudflare.com/analytics/account-and-zone-analytics/analytics-with-workers/#worker-analytics) for more information.
* **Data Transfer** \- Total HTTP data transferred in responses.
* **Page views** \- A page view is defined as a successful HTTP response with a content-type of HTML.
* **Visits** \- A visit is defined as a [page view](#page-views) that originated from a different website, or direct link. Cloudflare checks where the HTTP referer does not match the hostname. One visit can consist of multiple page views.
* **API Requests** \- An HTTP request for API data.

To receive more detailed metrics, **Add filter**. You can also filter each metric by:

* Cache status
* Data center
* Source ASN
* Country
* Source device type
* Source IP
* Referer host
* Host
* HTTP method
* HTTP version
* Path
* Query string
* Content type
* Edge status code
* Origin status code
* Security Action
* Security Source
* Source browser
* Source operating system
* Source user agent
* X-Requested-With header

In addition, the following filters are available to Enterprise [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) customers only.

* Source JA4 fingerprint
* Source JA3 fingerprint

To change the time period, use the dropdown menu on the right-hand side above the graph. You can also drag to zoom on the graph.

### Security

For this tab, the number and type of charts may vary based on existing data and customer plan. Most of the metrics in this tab come from the Cloudflare Firewall app. The panels available include:

* **Threats** \- Displays a data summary and an area chart showing threats against the site.
* **Threats by Country** \- Is an interactive map highlighting the countries where threats originated. It also includes data tables with statistics on **Top Threat Countries / Regions** and **Top Crawlers / Bots.**
* **Rate Limiting** (add-on service) - Features a line chart highlighting matching and blocked requests, based on rate limits. To learn more, consult [Rate Limiting Analytics](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/#analytics).
* **Overview** \- Displays a set of pie charts for: **Total Threats Stopped**, **Traffic Served Over SSL**, and **Types of Threats Mitigated**. If available, the expandable **Details** link display a table with numerical data.

### Performance

The metrics aggregated under this tab span multiple Cloudflare services. The panels available include:

* **Origin Performance (Argo)** (add-on service) - Displays metrics related to response time between the Cloudflare edge network and origin servers for the last 48 hours. For additional details, refer to [Argo Analytics](https://developers.cloudflare.com/argo-smart-routing/analytics/).
* **Overview** \- Displays a set of pie charts for: **Client HTTP Version Used**, **Bandwidth Saved**, and **Content Type Breakdown**. If available, the expandable **Details** link display a table with numerical data.

### Workers

This panel features metrics for Cloudflare Workers. To learn more, read [Cloudflare analytics with Workers](https://developers.cloudflare.com/analytics/account-and-zone-analytics/analytics-with-workers/).

### Logs

The Logs tab is not a metrics feature. Instead, Customers in the Enterprise plan can enable the [Cloudflare Logs Logpush](https://developers.cloudflare.com/logs/logpush/) service. You can use Logpush to download and analyze data using any analytics tool of your choice. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/#page","headline":"Zone Analytics · Cloudflare Analytics docs","description":"Analyze request and bandwidth data per zone.","url":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/account-and-zone-analytics/","name":"Account and zone analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/account-and-zone-analytics/zone-analytics/","name":"Zone Analytics"}}]}
```
