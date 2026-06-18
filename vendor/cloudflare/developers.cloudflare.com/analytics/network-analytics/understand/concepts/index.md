---
title: Concepts
description: Understand Network Analytics sampling and enrichment concepts.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Concepts

## Adaptive Bit Rate sampling

With Adaptive Bit Rate (ABR) sampling, every analytics query that supports ABR will be calculated at a resolution matching the query. Depending on the size of your query, the ABR mechanism will choose the best sampling rate and fetch a response from one of the sample tables encapsulated behind each [Network Analytics node](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/). The cardinality and accuracy are preserved even for historical data.

For more background information on Adaptive Bit Rate sampling, refer to the [Explaining Cloudflare's ABR Analytics ↗](https://blog.cloudflare.com/explaining-cloudflares-abr-analytics/) blog post.

## Edge Sample Enrichment

Network Analytics can provide accurate data due to the sample rate and to Edge Sample Enrichment.

Sample rates vary depending on the mitigation service. For example:

* The sample rate for `dosd` changes dynamically from 1/100 to 1/10,000 packets based on the volume of packets.
* The sample rate for Network Firewall events changes dynamically from 1/100 to 1/1,000,000 packets based on the number of packets.
* The sample rate for `flowtrackd` is 1/10,000 packets.

NA uses a data logging pipeline that relies on Edge Sample Enrichment. By delegating the packet sample enrichment and cross-referencing to the global data centers, the data pipeline’s resilience and tolerance against congestion are improved. Using this method, enriched packet samples are immediately stored in Cloudflare's core data centers as soon as they arrive.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/network-analytics/understand/concepts/#page","headline":"Network Analytics concepts · Cloudflare Analytics docs","description":"Understand Network Analytics sampling and enrichment concepts.","url":"https://developers.cloudflare.com/analytics/network-analytics/understand/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/network-analytics/","name":"Network analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/network-analytics/understand/","name":"About"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/network-analytics/understand/concepts/","name":"Concepts"}}]}
```
