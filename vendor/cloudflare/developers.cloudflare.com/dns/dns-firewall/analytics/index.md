---
title: Analytics and logs
description: Access DNS Firewall query analytics and configure Logpush for DNS logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Analytics and logs

Consider the sections below to learn how to access analytics and logs for your DNS Firewall.

## Analytics

DNS Firewall analytics allow you to evaluate data about DNS queries to your account.

### Availability and limits

The historical data available covers 62 days and the maximum time interval you can get data for is also 62 days.

### Dashboard

For a quick summary, view your DNS Firewall analytics on the dashboard. The DNS analytics dashboard contains [four main panels](#panels). The filters and time frame that you specify at the top of the page apply to all of them.

In the Cloudflare dashboard, go to the **DNS Firewall Analytics** page.

[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/dns-firewall/analytics) 

#### Available dimensions

* Query name
* Query type (same as DNS record type)
* Cluster
* Cluster IP
* Response code
* Response reason (refer to [descriptions](#response-reasons) below)
* Response cached (cached or uncached)
* Response stale (stale or fresh)
* Data center
* Source IP
* Upstream nameserver IP
* Protocol (UDP or TCP)
* IP version (IPv4 or IPv6)

#### Panels

The filters and time frame that you specify at the top of the page apply to all of the available panels.

* **Query summary**: the number of queries and their distribution over time. This information is segmented by each of the [available dimensions](#available-dimensions). You can select the dimensions through the different tabs above the graph and quickly filter for or exclude a certain value from the results by hovering over it and selecting **Filter** or **Exclude**.
* **Query statistics**: an overview of query metrics. Namely, **Total queries**, **Cached queries**, **Uncached queries**, and **Stale cache queries**.  
Processing time and response time  
Processing time refers to the total time taken to handle a query within DNS Firewall, meaning cached queries served directly from Cloudflare's servers. For uncached queries, the metric used is response time, which considers the time to get the answers from your upstream nameservers. The processing and response times are displayed in milliseconds.  
90th percentile (p90)  
 Aside from the average for both processing and response times, `p90` values show you the maximum time that 90% of queries took to resolve. For example, if the p90 is 1 millisecond, it means 90% of the queries were resolved in 1 millisecond or less.
* **DNS queries by data center**: a map indicating which Cloudflare data centers have handled DNS queries to your account. You can also find a list of the top ten results and quickly filter for or exclude a certain data center from the results by hovering over it and selecting **Filter** or **Exclude**.
* **Top query statistics**: a breakdown of the top queries grouped by the [available dimensions](#available-dimensions). You can expand each card to list more results and search for specific values.

### GraphQL

Use the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/) to access DNS Firewall analytics. Refer to the GraphQL Analytics API documentation for guidance on how to [get started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/).

The DNS Firewall analytics has two [schemas](https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/):

* `dnsFirewallAnalyticsAdaptive`: Retrieve information about individual DNS Firewall queries.
* `dnsFirewallAnalyticsAdaptiveGroups`: Get reports on aggregate information only.

### API Legacy

You can also use the DNS Firewall API [reports endpoint](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/subresources/analytics/subresources/reports/).

---

## Logs

You can [set up Logpush](https://developers.cloudflare.com/logs/logpush/) to deliver [DNS Firewall logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dns%5Ffirewall%5Flogs/) to a storage service, SIEM, or log management provider.

## Response reasons

When analyzing why Cloudflare DNS Firewall responded in one way or another to a specific query, consider the `responseReason` log field.

The following table provides a description for each of the values that might be returned as a response reason:

| Value                     | Description                                                                                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| success                   | Response was successfully served, either from Cloudflare cache or forwarded from the upstream.                                                                                                  |
| upstream\_failure         | Response could not be fetched from the upstream due to the upstream failing to respond.                                                                                                         |
| upstream\_servfail        | Response could not be fetched from the upstream due to the upstream responding with SERVFAIL.                                                                                                   |
| invalid\_query            | Query is invalid and cannot be processed.                                                                                                                                                       |
| any\_type\_blocked        | Query of type ANY was blocked according to your [DNS Firewall settings](https://developers.cloudflare.com/dns/dns-firewall/setup/) ([RFC 8482 ↗](https://www.rfc-editor.org/rfc/rfc8482.html)). |
| rate\_limit               | Query was rate limited according to your [DNS Firewall settings](https://developers.cloudflare.com/dns/dns-firewall/setup/).                                                                    |
| chaos\_success            | Response for [Chaos class ↗](https://en.wikipedia.org/wiki/Chaosnet) was successfully served.                                                                                                   |
| attack\_mitigation\_block | Query was blocked as part of [random prefix attack mitigation](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/).                                                      |
| unknown                   | There was an unknown error.                                                                                                                                                                     |

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/dns/dns-firewall/analytics/#page","headline":"Analytics and logs · Cloudflare DNS docs","description":"Access DNS Firewall query analytics and configure Logpush for DNS logs.","url":"https://developers.cloudflare.com/dns/dns-firewall/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics","GraphQL","Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dns-firewall/","name":"DNS Firewall"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dns-firewall/analytics/","name":"Analytics and logs"}}]}
```
