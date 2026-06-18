---
title: Sampling
description: Understand sampling in GraphQL Analytics API datasets.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sampling

For a deep-dive on how sampling at Cloudflare works, see [Understanding sampling in Cloudflare Analytics](https://developers.cloudflare.com/analytics/sampling/).

## Overview

In a small number of cases, the analytics provided on the Cloudflare dashboard and GraphQL Analytics API are based on a **sample** — a subset of the dataset. In these cases, Cloudflare Analytics returns an estimate derived from the sampled value. For example, suppose that during an attack the sampling rate is 10% and 5,000 events are sampled. Cloudflare will estimate 50,000 total events (5,000 × 10) and report this value in Analytics.

## Sampled datasets

Cloudflare GraphQL API exposes datasets that powered by adaptive sampling. These nodes have **Adaptive** in the name and can be discovered through[introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

The presence of sampled data is also called out in the Cloudflare dashboard and in the description of the dataset in the API.

## Why sampling is applied

Analytics is designed to provide requested data, at the appropriate level of detail, as quickly as possible. Sampling allows Cloudflare to deliver analytics within seconds, even when datasets scale quickly and unpredictably, such as a burst of Firewall events generated during an attack. And because the volume of underlying data is large, the value estimated from the sample should still be statistically significant – meaning you can rely on sampled data with a high degree of confidence. Without sampling, it might take several minutes or longer to answer a query — a long time to wait when validating mitigation efforts.

## Types of sampling

### Adaptive sampling

Cloudflare almost always uses **adaptive sampling**, which means the sample rate fluctuates depending on the volume of data ingested or queried. If the number of records is relatively small, sampling is not used. However, as the volume of records grows larger, progressively lower sample rates are applied. Security Events (also known as Firewall Events) and the Security Event Log follow this model. Data nodes that use adaptive sampling are easy to identify by the `Adaptive` suffix in the node name, as in `firewallEventsAdaptive`.

### Fixed sampling

The following data nodes are based on fixed sampling, where the sample rate does not vary:

| Data set                                                                                       | Rate   | Notes                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Firewall Rules Preview**Nodes:**firewallRulePreviewGroups                                      | 1%     | Use with caution. A 1% sample rate does not provide accurate estimates for datasets smaller than a certain threshold, a scenario the Cloudflare dashboard calls out explicitly but the API does not. |
| Network Analytics**Nodes:**ipFlows1mGroupsipFlows1hGroupsipFlows1dGroupsipFlows1mAttacksGroups | 0.012% | Sampling rate is in terms of packet count (1 of every 8,192 packets).                                                                                                                                |

## Access to raw data

Because sampling is primarily adaptive and automatically adjusts to provide an accurate estimate, the sampling rate cannot be directly controlled. Enterprise customers have access to raw data via Cloudflare Logs.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/sampling/#page","headline":"Sampling · Cloudflare Analytics docs","description":"Understand sampling in GraphQL Analytics API datasets.","url":"https://developers.cloudflare.com/analytics/graphql-api/sampling/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/sampling/","name":"Sampling"}}]}
```
