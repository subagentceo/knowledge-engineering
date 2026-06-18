---
title: Network Analytics v1 to Network Analytics v2
description: Migrate from Network Analytics v1 to v2 nodes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network Analytics v1 to Network Analytics v2

In early 2020, Cloudflare released the first version of the Network Analytics dashboard and its corresponding API. The second version (Network Analytics v2) was made available on 2021-09-13.

Warning

**Network Analytics v1 (NAv1) is now deprecated.** For more information on Network Analytics v2 (NAv2), refer to [Cloudflare Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/).

## Before you start

Learn more about the [concepts introduced in Network Analytics v2](https://developers.cloudflare.com/analytics/network-analytics/understand/concepts/).

## Feature comparison

The following table compares the features of NAv1 and NAv2:

| Feature                          | NAv1                                                                                          | NAv2                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Sampling rate                    | 1/8,192 packets                                                                               | Varies between 1/100 and 1/1,000,000 packets, depending on the mitigation service. |
| Sampling method                  | Core Sample Enrichment                                                                        | Edge Sample Enrichment                                                             |
| Historical data retention method | Aggregated roll-ups                                                                           | Adaptive Bit Rate                                                                  |
| Retention period                 | 1-min roll-ups: 30 days1-hour roll-ups: 6 months1-day roll-ups: 1 yearAttack roll-ups: 1 year | All nodes: 16 weeks                                                                |
| Attack mitigation systems        | dosd                                                                                          | dosd, flowtrackd\*, and Cloudflare Network Firewall\*                              |
| Examples of new fields           | n/a                                                                                           | Rule IDGRE tunnel IDPacket size                                                    |

\* _Applicable only for Magic Transit customers._

For more information on the differences in terms of sampling method and historical data retention, refer to [Main differences between Network Analytics v1 and v2](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/differences/).

Note

The `attackId` field value may be different between NAv1 and NAv2 for the same attack.

## Node comparison

NAv2 uses the same API endpoint but makes use of new nodes. While NAv1 has three nodes for aggregated roll-ups for all traffic and attacks, and one node for attacks, NAv2 has one node for all traffic and attacks, and four separate nodes for attacks that vary based on the mitigation system.

| Node type      | NAv1                                          | NAv2 for Magic Transit                                                                                                                            | NAv2 for Spectrum                                            |
| -------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Main node(s)   | ipFlows1mGroupsipFlows1hGroupsipFlows1dGroups | magicTransitNetworkAnalyticsAdaptiveGroups                                                                                                        | spectrumNetworkAnalyticsAdaptiveGroups                       |
| Attack node(s) | ipFlows1mAttacksGroups                        | dosdNetworkAnalyticsAdaptiveGroups dosdAttackAnalyticsGroups flowtrackdNetworkAnalyticsAdaptiveGroups magicFirewallNetworkAnalyticsAdaptiveGroups | dosdNetworkAnalyticsAdaptiveGroups dosdAttackAnalyticsGroups |

Each row represents one packet sample. The data is sampled at Cloudflare’s edge at [various rates](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/). You can also query the sample rate from the nodes using the `sample_interval` field.

For reference information on NAv2 nodes, refer to the [NAv2 node reference](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/).

Obtaining data for ingress traffic only

All the NAv2 `*AnalyticsAdaptiveGroups` nodes include data for ingress and egress traffic. To obtain data about ingress traffic only, include `direction: "ingress"` in your [GraphQL query filter](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/).

## Schema comparison

Refer to [NAv1 to NAv2 schema map](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/schema-map/) for a mapping of schema fields from NAv1 nodes to NAv2 nodes. Follow this recommended mapping when migrating to NAv2.

## Example

The following example queries the top 20 logs of traffic dropped by mitigation systems different from Cloudflare Network Firewall within a given time range, ordered by destination IP address.

```

{

  viewer {

    accounts(filter: { accountTag: "<REDACTED>" }) {

      magicTransitNetworkAnalyticsAdaptiveGroups(

        filter: {

          datetime_gt: "2021-10-01T00:00:00Z"

          datetime_lt: "2021-10-05T00:00:00Z"

          outcome_like: "drop"

          mitigationSystem_neq: "magic-firewall"

        }

        limit: 20

        orderBy: [ipDestinationAddress_ASC]

      ) {

        dimensions {

          outcome

          mitigationSystem

          ipSourceAddress

          ipDestinationAddress

          ipProtocol

          destinationPort

        }

      }

    }

  }

}


```

## Final remarks

The `mitigationSystem` field can take one the following values:

* `dosd` for [DDoS managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/) (Network-layer DDoS Attack Protection or HTTP DDoS Attack Protection).
* `flowtrackd` for [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/).
* `magic-firewall` for [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/).
* Empty string for unmitigated traffic.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/#page","headline":"Network Analytics v1 to Network Analytics v2 · Cloudflare Analytics docs","description":"Migrate from Network Analytics v1 to v2 nodes.","url":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/migration-guides/network-analytics-v2/","name":"Network Analytics v1 to Network Analytics v2"}}]}
```
