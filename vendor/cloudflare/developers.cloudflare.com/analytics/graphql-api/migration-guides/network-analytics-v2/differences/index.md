---
title: Main differences
description: Compare Network Analytics v1 and v2 sampling and retention.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Main differences

## Aggregated roll-ups versus Adaptive Bit Rate

In Network Analytics v1 (NAv1), the data is rolled up into one minute roll-up tables, then one hour roll-ups, and finally one day roll-ups. Users can then query either the `ipFlows1mGroups` node for high-resolution data on traffic and attacks in the past 30 days, or query the `ipFlows1hGroups` or `ipFlows1dGroups` nodes for historical data. However, the data available through these nodes is aggregate data, and that means that the accuracy and cardinality of the results are limited. For example, short traffic spikes will not be visible in the data obtained from these nodes due to the aggregation of samples in the roll-ups.

On the other hand, Network Analytics v2 (NAv2) uses [Adaptive Bit Rate (ABR)](https://developers.cloudflare.com/analytics/network-analytics/understand/concepts/#adaptive-bit-rate-sampling) sampling. This means that users do not need to choose a node based on their query timeframe. Furthermore, the cardinality and accuracy is preserved even for historical data. Depending on the size of the query, the ABR mechanism will choose the best sampling rate and fetch a response from one of the sample tables encapsulated behind each node.

## Sampling improvements

Network Analytics v2 provides more accurate data due to the better sample rate and [Edge Sample Enrichment](https://developers.cloudflare.com/analytics/network-analytics/understand/concepts/#edge-sample-enrichment). NAv1 samples 1/8,192 packets (that is, one in every 8,192 packets), while NAv2 sample rates vary depending on the mitigation service. For example:

* The sample rate for `dosd` changes dynamically from 1/100 to 1/10,000 packets based on the volume of packets.
* The sample rate for Cloudflare Network Firewall events changes dynamically from 1/100 to 1/1,000,000 packets based on the number of packets.
* The sample rate for `flowtrackd` is 1/10,000 packets.

The NAv2 data pipeline is also more resilient compared to NAv1\. NAv1 uses Core Sample Enrichment, where raw packet samples are sent from all of Cloudflare's edge data centers to the Core data centers. In the Core data centers, the packet samples are cross-referenced with additional databases and infused with the associated customer account ID, attack ID, attack type, and other metadata. Then, the packet samples are inserted into storage. One of the main shortcomings of this method is the potential congestion of samples when cross-referencing information, which could, in rare cases, cause temporary data lag.

To eliminate this potential data lag, NAv2 uses a new data logging pipeline which relies on Edge Sample Enrichment. By delegating the packet sample enrichment and cross-referencing to the edge data centers, we improve the data pipeline's resilience and tolerance against congestion. Using this method, enriched packet samples are immediately stored in Cloudflare's core data centers as soon as they arrive.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/differences/#page","headline":"Main differences between Network Analytics v1 and Network Analytics v2 · Cloudflare Analytics docs","description":"Compare Network Analytics v1 and v2 sampling and retention.","url":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/differences/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/migration-guides/network-analytics-v2/","name":"Network Analytics v1 to Network Analytics v2"}},{"@type":"ListItem","position":6,"item":{"@id":"/analytics/graphql-api/migration-guides/network-analytics-v2/differences/","name":"Main differences"}}]}
```
