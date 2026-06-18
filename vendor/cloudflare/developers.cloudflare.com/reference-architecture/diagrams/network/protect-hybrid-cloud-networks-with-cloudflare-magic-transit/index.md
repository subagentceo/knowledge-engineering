---
title: Protect hybrid cloud networks with Cloudflare Magic Transit
description: Cloudflare Magic Transit provides cloud-native, in-line DDoS protection, and traffic acceleration for all Internet-facing networks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect hybrid cloud networks with Cloudflare Magic Transit

**Last reviewed:**  almost 2 years ago 

## Introduction

Protecting network infrastructure from DDoS attacks demands a unique combination of strength and speed. Volumetric attacks can easily overwhelm on-premise hardware-based DDoS protection appliances and their bandwidth-constrained Internet links.

A cloud-based DDoS protection solution is more agile, efficient and scalable but most solutions on the market lack the global network footprint and scrubbing center density required to maintain good network performance. DDoS protection solutions with such shortcomings require redirecting customer traffic through sparsely located scrubbing centers that are often thousands of miles away from where the traffic was originally ingested into the network, adding significant latency that inevitably impacts the end-to-end network performance and throughput.

Cloudflare Magic Transit provides cloud-native, in-line DDoS protection and traffic acceleration for all your Internet-facing networks that serve incoming user traffic from the Internet, regardless of where they are deployed, whether on-premise, in the cloud, or a combination of the two (that is, hybrid architecture). With data centers spanning hundreds of cities and with hundreds of Tbps in DDoS mitigation capacity, Magic Transit can detect and mitigate attacks close to their source of origin in under 3 seconds globally.

The details of how Magic Transit works and how it can be architected for various use cases are documented in the related resources at the end of this document - [Cloudflare Magic Transit](https://developers.cloudflare.com/magic-transit/) and [Magic Transit Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/).

This document will focus specifically on, for a few common scenarios, the reference architectures of using Magic Transit to protect a hybrid cloud based network infrastructure.

## Scenario 1 - Customer BYOIP for both on-premise and cloud network deployments

In this scenario, there are multiple /24 or larger network prefixes that need to be protected by Magic Transit. These networks are deployed at on-premise locations as well as across multiple cloud providers’ regions.

For illustration purposes, below is an example list of the locations of Internet-facing networks and their respective IP prefixes.

```

AWS VPC: 192.0.2.0/24

GCP VPC: 198.51.100.0/24

Azure vNet: 203.0.113.0/26

On-premise data center 1: 203.0.113.64/26

On-premise data center 2: 203.0.113.128/25


```

![Figure 1: Customer BYOIP for all Cloud and on-premises networks.](https://developers.cloudflare.com/_astro/figure-1.TMcvFAT6_ZcHntR.svg "Figure 1: Customer BYOIP for all Cloud and on-premises networks.")

Figure 1: Customer BYOIP for all Cloud and on-premises networks.

_Note: Labels in this image may reflect a previous product name._

1. Using Border Gateway Protocol ([BGP ↗](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/)), Cloudflare advertises customer’s protected IP prefixes to the Internet from all of Cloudflare’s global data centers, enabling [IP Anycast ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/), so that Internet traffic destined to these protected IP prefixes will always be routed to the Cloudflare data center that is closest to the source of the traffic.

At the same time, on-premise network(s) and cloud provider network(s) would stop advertising the same exact prefixes from their respective on-premises border routers and cloud border routers. This ensures all Internet traffic destined to the Magic Transit protected IP prefixes will be routed through the Cloudflare network.

You can instead advertise less-specific IP prefixes from their border routers to the Internet. This way, if the Magic Transit service ever experiences a failure in a very unlikely event, traffic can be quickly re-routed directly to network locations from the Internet.

1. Traffic originated from the Internet and destined to the protected IP prefixes is ingested into Cloudflare network globally.
2. All traffic is scrubbed, that is, DDoS attack traffic is removed and mitigated in-line at every Cloudflare data center using advanced and automated [DDoS mitigation](https://developers.cloudflare.com/ddos-protection/) technologies.
3. Traffic that passes DDoS mitigation is subjected to additional network firewall filtering using the included [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) service.
4. Clean, filtered traffic is routed to the protected networks either through private connections called [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/) (CNI), or through the public Internet using standard IP tunnels such as GRE or IPsec tunnels. More specific details on Magic Transit IP tunnels can be found in the [Magic Transit Tunnels and Encapsulation documentation](https://developers.cloudflare.com/magic-transit/reference/gre-ipsec-tunnels/).
5. The server return traffic from protected IP prefixes to the Internet users are routed directly over the Internet from the hybrid cloud locations, bypassing the Cloudflare network. This is called direct server return (DSR). Note you must have BYOIP with your Cloud Service Provider to use DSR.

With Magic Transit service being the single, consolidated cloud-native network protection solution running globally on the Cloudflare network, your global, hybrid cloud based Internet-facing networks are well protected from DDoS and other malicious attacks, regardless where and what environments they are deployed in.

One other added benefit of using such consolidated, cloud-native network protection solutions is that you can easily migrate or relocate Internet-facing networks between the various hybrid cloud environments without ever losing protection to these networks. They can do so by simply changing routes in the Magic Transit configuration to route traffic to the new location.

## Scenario 2 - Customer lease IP address from Cloudflare for both on-premise and cloud network deployments

In the case where you do not own any network prefixes that are equal to or larger than /24, but would still like to use Magic Transit to protect their networks, you can [lease IPs](https://developers.cloudflare.com/magic-transit/cloudflare-ips/) from Cloudflare to assign to these smaller networks. The following diagram illustrates the architecture of such a deployment. Similar to the previous scenario, these customer networks are deployed at on-premise locations as well as across multiple cloud providers’ regions.

For illustration purposes, below is an example list of the locations of Internet-facing networks and their respective IP prefixes.

```

AWS VPC: 192.0.2.0/28

GCP VPC: 192.0.2.16/28

Azure vNet: 192.0.2.32/28

On-premise data center 1: 192.0.2.48/28

On-premise data center 2: 192.0.2.64/28


```

![Figure 2: Customer lease IPs from Cloudflare for both on-premise and cloud network deployments.](https://developers.cloudflare.com/_astro/figure-2.DGu8Lrrt_Z2lxTsf.svg "Figure 2: Customer lease IPs from Cloudflare for both on-premise and cloud network deployments.")

Figure 2: Customer lease IPs from Cloudflare for both on-premise and cloud network deployments.

_Note: Labels in this image may reflect a previous product name._

1. Using Border Gateway Protocol (BGP), Cloudflare advertises its owned IP prefixes to the Internet, which includes the IP addresses that you lease.

\[Steps 2 through 5 are the same as those of scenario 1 above\]

1. The server return traffic, with leased Cloudflare IP addresses as their source IP addresses, cannot be routed to the Internet directly via the various sites’ border routers. This traffic has to be routed back through Cloudflare network to reach the Internet, using [Magic Transit Egress](https://developers.cloudflare.com/magic-transit/reference/egress/) functionality. It can be sent to the Cloudflare network via the same CNIs or IP tunnels that the Ingress traffic traversed, using routing techniques such as policy-based routing (PBR) at your sites.
2. Magic Transit Egress traffic is subject to Network Firewall filtering before being routed out to the Internet towards the users.

## Scenario 3 - Customer BYOIP for on-premise networks and lease IP address from Cloudflare for cloud network deployments

In this scenario, you can deploy larger on-premise networks and smaller cloud-based networks. You assign your own /24 IP prefixes to the on-premise networks while leasing IPs from Cloudflare for your cloud-based networks.

For illustration purposes, below is an example list of the locations of Internet-facing networks and their respective IP prefixes.

```

AWS VPC: 192.0.2.0/28

GCP VPC: 192.0.2.16/28

Azure vNet: 192.0.2.32/28

On-premise data center 1: 198.51.100.0/24

On-premise data center 2: 203.0.113.0/24


```

![Figure 3: Customer BYOIP for on-premise networks and lease IP from Cloudflare for cloud network deployments.](https://developers.cloudflare.com/_astro/figure-3.h9hJOj7g_Z2d2T9O.svg "Figure 3: Customer BYOIP for on-premise networks and lease IP from Cloudflare for cloud network deployments.")

Figure 3: Customer BYOIP for on-premise networks and lease IP from Cloudflare for cloud network deployments.

_Note: Labels in this image may reflect a previous product name._

1. Using Border Gateway Protocol (BGP), Cloudflare advertises both customer-owned and Cloudflare-owned IP prefixes to the Internet.

\[Steps 2 through 5 are the same as those of scenario 1 above\]

1. The server return traffic from your cloud-based networks is routed back through Cloudflare network to reach the Internet, using Magic Transit Egress functionality. It can be sent to the Cloudflare network via the same CNIs or IP tunnels that the Ingress traffic traversed, using routing techniques such as policy-based routing (PBR) at your physical sites.
2. This Magic Transit Egress traffic is subject to Network Firewall filtering before being routed out to the Internet towards the users.
3. The server return traffic from on-premises networks to the Internet users are direct server returned (DSR), bypassing the Cloudflare network.

_Note_: Alternatively, customers can choose to also route the on-premise networks’ server return traffic through Cloudflare via policy-based routing and Magic Transit Egress functionality. This adds an additional layer of security and control for the egress traffic with Network Firewall filtering. For example, it can block traffic destined to questionable IP addresses and sites, prohibited destinations, or countries.

## Related resources

* [Magic Transit Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/)
* [Cloudflare Magic Transit](https://developers.cloudflare.com/magic-transit/)
* [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/)
* [Cloudflare DDoS Protection](https://developers.cloudflare.com/ddos-protection/)
* [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)
* [Cloudflare IPsec Device Compatibility Matrix](https://developers.cloudflare.com/cloudflare-wan/reference/device-compatibility/)
* [Cloudflare Magic Transit Leased IP](https://developers.cloudflare.com/magic-transit/cloudflare-ips/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/network/protect-hybrid-cloud-networks-with-cloudflare-magic-transit/#page","headline":"Protect hybrid cloud networks with Cloudflare Magic Transit · Cloudflare Reference Architecture docs","description":"Cloudflare Magic Transit provides cloud-native, in-line DDoS protection, and traffic acceleration for all Internet-facing networks.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/network/protect-hybrid-cloud-networks-with-cloudflare-magic-transit/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-02-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/network/","name":"Network"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/network/protect-hybrid-cloud-networks-with-cloudflare-magic-transit/","name":"Protect hybrid cloud networks with Cloudflare Magic Transit"}}]}
```
