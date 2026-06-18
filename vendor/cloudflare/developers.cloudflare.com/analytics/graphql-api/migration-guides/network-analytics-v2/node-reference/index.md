---
title: NAv2 node reference
description: Reference for Network Analytics v2 GraphQL nodes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# NAv2 node reference

## Main nodes

Main nodes provide deep packet-level information about traffic and attacks for Spectrum customers and Magic Transit customers.

Use the main node to query traffic and attacks at a high level, as seen at the Cloudflare edge:

| Product       | Main node                                  |
| ------------- | ------------------------------------------ |
| Spectrum      | spectrumNetworkAnalyticsAdaptiveGroups     |
| Magic Transit | magicTransitNetworkAnalyticsAdaptiveGroups |

To query more specific details about attacks, use the [attack nodes](#attack-nodes).

Each row represents a packet sample. The sample rate of main nodes is 1/10,000 packets.

If you are using both Magic Transit and Spectrum for IP addresses that overlap, you can use only the Magic Transit node.

## Attack nodes

### `dosdAttackAnalyticsGroups`

This node provides information about DDoS attacks detected and mitigated by Cloudflare's main DDoS protection system, the denial of service daemon (`dosd`). This node includes attack metadata such as:

* `startDatetime`
* `endDatetime`
* `attackType`
* `sourceIp`

Each row represents an attack event. Each attack has a unique ID.

The sample rate is dynamic and based on the volume of packets, ranging from 1/100 to 1/10,000 packets.

Adjusting attack mitigation

To adjust mitigation sensitivities and actions, or to define expression filters that exclude or include traffic from mitigation actions, customize the [Network-layer DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/).

### `dosdNetworkAnalyticsAdaptiveGroups`

This node complements the information in the `dosdAttackAnalyticsGroups` node. Provides deep packet-level information about DDoS attack packets mitigated by `dosd`, including fields such as:

* `ipProtocol`
* `ipv4Checksum`
* `ipv4Options`
* `tcpSequenceNumber`
* `tcpChecksum`
* `icmpCode`
* `ruleId`
* `ruleName`
* `attackVector`

Each row represents a packet sample. The sample rate is 1/10,000 packets.

### `advancedTcpProtectionNetworkAnalyticsAdaptiveGroups`

This node is only available to Magic Transit customers. Provides metadata about out-of-state TCP DDoS attacks mitigated by Cloudflare's [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/) system.

Advanced TCP Protection does not use the following ID fields: attack ID, rule ID, and ruleset ID.

The sample rate is 1/1,000 packets.

### `advancedDnsProtectionNetworkAnalyticsAdaptiveGroups`

This node is only available to Magic Transit customers. Provides metadata about DNS-based DDoS attacks mitigated by Cloudflare's [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/) system.

Samples include information about the following DNS header fields:

* `dnsQueryName`
* `dnsQueryType`

Advanced DNS Protection does not use the following ID fields: attack ID, rule ID, and ruleset ID.

The sample rate is 1/1,000 packets.

### `magicFirewallNetworkAnalyticsAdaptiveGroups`

This node is only available to Magic Transit customers. Provides information about packets that were matched against customer-configured [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) rules.

Each row represents a packet sample that matches a Cloudflare Network Firewall rule.

Cloudflare Network Firewall does not use attack IDs, only rule IDs and ruleset IDs.

The sample rate is dynamic and based on the volume of packets, ranging from 1/100 to 1/1,000,000 packets.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/#page","headline":"NAv2 node reference · Cloudflare Analytics docs","description":"Reference for Network Analytics v2 GraphQL nodes.","url":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/migration-guides/network-analytics-v2/","name":"Network Analytics v1 to Network Analytics v2"}},{"@type":"ListItem","position":6,"item":{"@id":"/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/","name":"NAv2 node reference"}}]}
```
