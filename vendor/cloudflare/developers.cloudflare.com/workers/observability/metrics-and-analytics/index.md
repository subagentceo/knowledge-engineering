---
title: Metrics and analytics
description: Diagnose issues with Workers metrics, and review request data for a zone with Workers analytics.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics and analytics

There are two graphical sources of information about your Workers traffic at a given time: Workers metrics and zone-based Workers analytics.

Workers metrics can help you diagnose issues and understand your Workers' workloads by showing the performance and usage of your Workers. If your Worker runs on a route on a zone, or on a few zones, Workers metrics will show how much traffic your Worker is handling on a per-zone basis, and how many requests your site is getting.

Zone analytics show how much traffic all Workers assigned to a zone are handling.

## Workers metrics

Workers metrics aggregate request data for an individual Worker (if your Worker is running across multiple domains, and on `*.workers.dev`, metrics will aggregate requests across them). To view your Worker's metrics:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker to view its metrics.

There are two metrics that can help you understand the health of your Worker in a given moment: requests success and error metrics, and invocation statuses.

### Requests

The first graph shows historical request counts from the Workers runtime broken down into successful requests, errored requests, and subrequests.

* **Total**: All incoming requests registered by a Worker. Requests blocked by [WAF ↗](https://www.cloudflare.com/waf/) or other security features will not count.
* **Success**: Requests that returned a Success or Client Disconnected invocation status.
* **Errors**: Requests that returned a Script Threw Exception, Exceeded Resources, or Internal Error invocation status — refer to [Invocation Statuses](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/#invocation-statuses) for a breakdown of where your errors are coming from.

Request traffic data may display a drop off near the last few minutes displayed in the graph for time ranges less than six hours. This does not reflect a drop in traffic, but a slight delay in aggregation and metrics delivery.

### Subrequests

Subrequests are requests triggered by calling `fetch` from within a Worker. A subrequest that throws an uncaught error will not be counted.

* **Total**: All subrequests triggered by calling `fetch` from within a Worker.
* **Cached**: The number of cached responses returned.
* **Uncached**: The number of uncached responses returned.

### Wall time per execution

Wall time represents the elapsed time in milliseconds between the start of a Worker invocation, and when the Workers runtime determines that no more JavaScript needs to run. Specifically, wall time per execution chart measures the wall time that the JavaScript context remained open — including time spent waiting on I/O, and time spent executing in your Worker's[waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) handler. Wall time is not the same as the time it takes your Worker to send the final byte of a response back to the client - wall time can be higher, if tasks within`waitUntil()` are still running after the response has been sent, or it can be lower. For example, when returning a response with a large body, the Workers runtime can, in some cases, determine that no more JavaScript needs to run, and closes the JavaScript context before all the bytes have passed through and been sent.

The Wall Time per execution chart shows historical wall time data broken down into relevant quantiles using [reservoir sampling ↗](https://en.wikipedia.org/wiki/Reservoir%5Fsampling). Learn more about [interpreting quantiles ↗](https://www.statisticshowto.com/quantile-definition-find-easy-steps/).

### CPU Time per execution

The CPU Time per execution chart shows historical CPU time data broken down into relevant quantiles using [reservoir sampling ↗](https://en.wikipedia.org/wiki/Reservoir%5Fsampling). Learn more about [interpreting quantiles ↗](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). In some cases, higher quantiles may appear to exceed [CPU time limits](https://developers.cloudflare.com/workers/platform/limits/#cpu-time) without generating invocation errors because of a mechanism in the Workers runtime that allows rollover CPU time for requests below the CPU limit.

### Execution duration (GB-seconds)

The Duration per request chart shows historical [duration](https://developers.cloudflare.com/workers/platform/limits/#duration) per Worker invocation. The data is broken down into relevant quantiles, similar to the CPU time chart. Learn more about [interpreting quantiles ↗](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). Understanding duration on your Worker is especially useful when you are intending to do a significant amount of computation on the Worker itself.

### Invocation statuses

To review invocation statuses:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker.
3. Find the **Summary** graph in **Metrics**.
4. Select **Errors**.

Worker invocation statuses indicate whether a Worker executed successfully or failed to generate a response in the Workers runtime. Invocation statuses differ from [HTTP status codes](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/). In some cases, a Worker invocation succeeds but does not generate a successful HTTP status because of another error encountered outside of the Workers runtime. Some invocation statuses result in a [Workers error code](https://developers.cloudflare.com/workers/observability/errors/#error-pages-generated-by-workers) being returned to the client.

| Invocation status      | Definition                                                                   | Workers error code | GraphQL field        |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------ | -------------------- |
| Success                | Worker executed successfully                                                 | success            |                      |
| Client disconnected    | HTTP client (that is, the browser) disconnected before the request completed | clientDisconnected |                      |
| Worker threw exception | Worker threw an unhandled JavaScript exception                               | 1101               | scriptThrewException |
| Exceeded resources¹    | Worker exceeded runtime limits                                               | 1102, 1027         | exceededResources    |
| Internal error²        | Workers runtime encountered an error                                         | internalError      |                      |

¹ The Exceeded Resources status may appear when the Worker exceeds a [runtime limit](https://developers.cloudflare.com/workers/platform/limits/#request-and-response-limits). The most common cause is excessive CPU time, but is also caused by a Worker exceeding startup time or free tier limits.

² The Internal Error status may appear when the Workers runtime fails to process a request due to an internal failure in our system. These errors are not caused by any issue with the Worker code nor any resource limit. While requests with Internal Error status are rare, some may appear during normal operation. These requests are not counted towards usage for billing purposes. If you notice an elevated rate of requests with Internal Error status, review [www.cloudflarestatus.com ↗](https://www.cloudflarestatus.com/).

To further investigate exceptions, use [wrangler tail](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail).

### Request duration

The request duration chart shows how long it took your Worker to respond to requests, including code execution and time spent waiting on I/O. The request duration chart is currently only available when your Worker has [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) enabled.

In contrast to [execution duration](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/#execution-duration-gb-seconds), which measures only the time a Worker is active, request duration measures from the time a request comes into a data center until a response is delivered.

The data shows the duration for requests with Smart Placement enabled compared to those with Smart Placement disabled (by default, 1% of requests are routed with Smart Placement disabled). The chart shows a histogram with duration across the x-axis and the percentage of requests that fall into the corresponding duration on the y-axis.

### Metrics retention

Worker metrics can be inspected for up to three months in the past in maximum increments of one week.

## Zone analytics

Zone analytics aggregate request data for all Workers assigned to any [routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) defined for a zone.

To review zone metrics:

In the Cloudflare dashboard, go to the **Workers Analytics** page for your zone.

[ Go to **Workers** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/workers) 

Zone data can be scoped by time range within the last 30 days. The dashboard includes charts and information described below.

### Subrequests

This chart shows subrequests — requests triggered by calling `fetch` from within a Worker — broken down by cache status.

* **Uncached**: Requests answered directly by your origin server or other servers responding to subrequests.
* **Cached**: Requests answered by Cloudflare’s [cache ↗](https://www.cloudflare.com/learning/cdn/what-is-caching/). As Cloudflare caches more of your content, it accelerates content delivery and reduces load on your origin.

### Bandwidth

This chart shows historical bandwidth usage for all Workers on a zone broken down by cache status.

### Status codes

This chart shows historical requests for all Workers on a zone broken down by HTTP status code.

### Total requests

This chart shows historical data for all Workers on a zone broken down by successful requests, failed requests, and subrequests. These request types are categorized by HTTP status code where `200`\-level requests are successful and `400` to `500`\-level requests are failed.

## GraphQL

Worker metrics are powered by GraphQL. Learn more about querying our data sets in the [Querying Workers Metrics with GraphQL tutorial](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/).

## Custom analytics with Analytics Engine

The metrics described above provide insight into Worker performance and runtime behavior. For custom, application-specific analytics, use [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/).

Analytics Engine is useful for:

* **Custom business metrics** \- Track events specific to your application, such as signups, purchases, or feature usage.
* **Per-customer analytics** \- Record data with high-cardinality dimensions like customer IDs or API keys.
* **Usage-based billing** \- Count API calls, compute units, or other billable events per customer.
* **Performance tracking** \- Measure response times, cache hit rates, or error rates with custom dimensions.

Writes to Analytics Engine are non-blocking and do not add latency to your Worker. Query your data using SQL through the [Analytics Engine SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/) or visualize it in [Grafana](https://developers.cloudflare.com/analytics/analytics-engine/grafana/).

Refer to the [Analytics Engine example](https://developers.cloudflare.com/workers/examples/analytics-engine/) to get started.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/metrics-and-analytics/#page","headline":"Metrics and analytics · Cloudflare Workers docs","description":"Diagnose issues with Workers metrics, and review request data for a zone with Workers analytics.","url":"https://developers.cloudflare.com/workers/observability/metrics-and-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/metrics-and-analytics/","name":"Metrics and analytics"}}]}
```
