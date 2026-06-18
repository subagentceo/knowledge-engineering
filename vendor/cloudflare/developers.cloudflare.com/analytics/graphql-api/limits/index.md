---
title: Limits
description: Review GraphQL Analytics API query limits.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

Cloudflare GraphQL API exposes more than 70 datasets representing products with different configurations and data availability for different zones and accounts plans.

To support this variety of products, Cloudflare GraphQL API has three layers of limits:

* global limits
* user limits
* node (dataset) limits

## Global limits

These limits are applied to every query for every plan:

* A zone-scoped query can include up to **10 zones**
* An account-scoped query can include only **1 account**

Additionally, there is a limited number of queries you can make per request. The total number of queries in a request is equal to the number of zone/account scopes, multiplied by the number of nodes to which they are applied.

## User limits

Cloudflare GraphQL API limits the number of GraphQL requests each user can send. The default quota is **300 GraphQL queries over 5-minute window**. It allows a user to run at least **1 query every second** or do a burst of 300 queries and then wait 5 minutes before issuing another query.

That rate limit is applied in addition to the [general rate limits enforced by the Cloudflare API](https://developers.cloudflare.com/fundamentals/api/reference/limits/).

## Node limits and availability

Each data node has its limits, such as:

* how far back in time can data be requested,
* the maximum time period (in seconds) that can be requested in one query,
* the maximum number of fields that can be requested in one query,
* the maximum number of records that can be returned in one query.

Node limits are tied to requested `zoneTag` or `accountTag`. Higher plans have access to a greater selection of datasets or fields, and can query over broader historical intervals.

To get exact boundaries and availability for your zone(s) or account, please refer to [settings](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/limits/#page","headline":"GraphQL API - Limits · Cloudflare Analytics docs","description":"Review GraphQL Analytics API query limits.","url":"https://developers.cloudflare.com/analytics/graphql-api/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/limits/","name":"Limits"}}]}
```
