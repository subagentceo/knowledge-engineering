---
title: Release notes
description: Latest changes, improvements, and fixes for Workers KV.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Release notes

[ Subscribe to RSS ](https://developers.cloudflare.com/kv/platform/release-notes/index.xml)

## 2024-11-14

**Workers KV REST API bulk operations provide granular errors**

The REST API endpoints for bulk operations ([write](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fupdate/), [delete](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fdelete/)) now return the keys of operations that failed during the bulk operation. The updated response bodies are documented in the [REST API documentation](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/list/) and contain the following information in the `result` field:

```
{
  "successful_key_count": number,
  "unsuccessful_keys": string[]
}

```

The unsuccessful keys are an array of keys that were not written successfully to all storage backends and therefore should be retried.

## 2024-08-08

**New KV Analytics API**

Workers KV now has a new [metrics dashboard](https://developers.cloudflare.com/kv/observability/metrics-analytics/#view-metrics-in-the-dashboard) and [analytics API](https://developers.cloudflare.com/kv/observability/metrics-analytics/#query-via-the-graphql-api) that leverages the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) used by many other Cloudflare products. The new analytics API provides per-account and per-namespace metrics for both operations and storage, including latency metrics for read and write operations to Workers KV.

The legacy Workers KV analytics REST API will be turned off as of January 31st, 2025\. Developers using this API will receive a series of email notifications prior to the shutdown of the legacy API.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/kv/platform/release-notes/#page","headline":"Release notes · Cloudflare Workers KV docs","description":"Latest changes, improvements, and fixes for Workers KV.","url":"https://developers.cloudflare.com/kv/platform/release-notes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/platform/release-notes/","name":"Release notes"}}]}
```
