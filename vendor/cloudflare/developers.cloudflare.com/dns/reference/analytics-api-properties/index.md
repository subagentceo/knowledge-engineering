---
title: Analytics API properties
description: API properties that you can use in API requests for Cloudflare DNS analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Analytics API properties

This page describes API properties that you can use in requests to the [DNS analytics API](https://developers.cloudflare.com/api/resources/dns/subresources/analytics/subresources/reports/methods/get/).

Warning

The [DNS analytics API](https://developers.cloudflare.com/api/resources/dns/subresources/analytics/subresources/reports/methods/get/), along with the following [API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/), will be deprecated soon.

To access the new analytics dashboard, go to [**DNS Analytics** ↗](https://dash.cloudflare.com//?to=/:account/:zone/dns/analytics). Refer to [Analytics and logs](https://developers.cloudflare.com/dns/additional-options/analytics/) for details.

## Metrics

A metric is a numerical value based on an attribute of the data, for example a query count.

In API requests, metrics are set in the `metrics` parameter. If you need to list multiple metrics, separate them with commas.

| Metric             | Name                          | Example | Unit                 |
| ------------------ | ----------------------------- | ------- | -------------------- |
| queryCount         | Query count                   | 1000    | Count                |
| uncachedCount      | Uncached query count          | 1       | Count                |
| staleCount         | Stale query count             | 1       | Count                |
| responseTimeAvg    | Average response time         | 1.0     | Time in milliseconds |
| responseTimeMedian | Median response time          | 1.0     | Time in milliseconds |
| responseTime90th   | 90th percentile response time | 1.0     | Time in milliseconds |
| responseTime99th   | 99th percentile response time | 1.0     | Time in milliseconds |

## Dimensions

Dimensions can be used to break down the data by given attributes.

In API requests, dimensions are set in the `dimensions` parameter. If you need to list multiple dimensions, separate them with commas.

| Dimension          | Name                 | Example     | Notes                                                                                                                                       |
| ------------------ | -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| queryName          | Query Name           | example.com |                                                                                                                                             |
| queryType          | Query Type           | AAAA        | [Types defined by IANA ↗](http://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4). Unknown types are empty.   |
| responseCode       | Response Code        | NOERROR     | [Response codes defined by IANA ↗](http://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6). Always uppercase. |
| responseCached     | Response Cached      | Cached      | Either Cached or Uncached.                                                                                                                  |
| coloName           | Colo Name            | SJC         | PoP code.                                                                                                                                   |
| origin             | Origin               | 2001:db8::1 | Origin used to resolve the query. Empty if N/A or if the query was answered from cache.                                                     |
| dayOfWeek          | Day Of Week          | 1           | Break down by day of week. Monday is 1, and Sunday is 7.                                                                                    |
| tcp                | TCP                  | 1           | Either 1 or 0 depending on the protocol used.                                                                                               |
| ipVersion          | IP Version           | 6           | IP protocol version used (currently 4 or 6).                                                                                                |
| querySizeBucket    | Query Size Bucket    | 16-31       | Query size bucket by multiples of 16.                                                                                                       |
| responseSizeBucket | Response Size Bucket | 16-31       | Response size bucket by multiples of 16.                                                                                                    |

## Filters

Filters use the form `dimension operator expression`, where each part corresponds to the following:

* **Dimension**: Specifies the [dimension](#dimensions) to filter on. For example, `queryName`.
* **Operator**: Defines the type of filter match to use. Operators are specific to dimensions.
* **Expression**: States the values to include or exclude from the results. Expressions use regular expression (regex) syntax.

### Filter operators

| Operator | Name                     | Example                | Description                                                        | URL Encoded |
| -------- | ------------------------ | ---------------------- | ------------------------------------------------------------------ | ----------- |
| \==      | Equals                   | queryName==example.com | Return results where queryName is exactly example.com.             | %3D%3D      |
| !=       | Does not equal           | responseCode!=NOERROR  | Return results where responseCode is different from NOERROR.       | !%3D        |
| \>       | Greater than             | dimension>1000         | Return results where a dimension is greater than 1000.             | %3E         |
| <        | Less than                | dimension<1000         | Return results where a dimension is less than 1000.                | %3C         |
| \>=      | Greater than or equal to | dimension>=1000        | Return results where a dimension is greater than or equal to 1000. | %3E%3D      |
| <=       | Less than or equal to    | dimension<=1000        | Return results where a dimension is less than or equal to 1000.    | %3C%3D      |

### Combining filters

Combine filters using `OR` and `AND` boolean logic:

* `AND` takes precedence over `OR` in all expressions.
* The `OR` operator is defined using a comma `,` or the `OR` keyword surrounded by whitespace.
* The `AND` operator is defined using a semicolon `;` or the `AND` keyword surrounded by whitespace.  
Note  
Note that the semicolon is a reserved character in URLs ([RFC 1738 ↗](https://www.rfc-editor.org/rfc/rfc1738)) and should be percent-encoded as `%3B`.

Examples using OR

* `responseCode==NOERROR,responseCode==NXDOMAIN` indicates that response code is either `NOERROR` or `NXDOMAIN`.
* `coloName==SJC OR coloName==LAX` indicates queries in either `SJC` or `LAX`.

Examples using AND

* `responseCode==NOERROR;queryType==AAAA` indicates that response code is `NOERROR` and query type is `AAAA`.
* `queryType==AAAA AND coloName==SJC` indicates `AAAA` queries in `SJC`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/reference/analytics-api-properties/#page","headline":"Analytics API properties · Cloudflare DNS docs","description":"API properties that you can use in API requests for Cloudflare DNS analytics.","url":"https://developers.cloudflare.com/dns/reference/analytics-api-properties/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/reference/analytics-api-properties/","name":"Analytics API properties"}}]}
```
