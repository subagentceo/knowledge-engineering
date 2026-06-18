---
title: Bring your own IP space to Cloudflare
description: Cloudflare allows enterprises to bring their IP space to the Cloudflare network. This allows them to gain the security and performance of the platform while still appearing to the rest of the world via their own public IP space.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bring your own IP space to Cloudflare

**Last reviewed:**  over 1 year ago 

## Introduction

Cloudflare brings security and performance to our customers' digital estates. However, one of the characteristics of proxying services is that interactions on the web that go to Cloudflare (DNS queries or requests to SaaS providers, for example) will appear to the world as coming from the Cloudflare IP space. This can create challenges for some enterprises.

For example, partners or other B2B relationships may use the public IP space owned by a customer for attestation and attribution in various transactions. They may look at the resolved address for a public hostname (for example, `www.example.com`) and expect that IP to match a specific range or address known to be owned by the customer.

[Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/) allows enterprises to bring their IP space to Cloudflare, thus gaining the security and performance of the Cloudflare platform while still appearing to the rest of the world via their own public IP space. This reference architecture diagram highlights the different ways customers can bring their IP space to the Cloudflare network and the benefits that are achieved.

## BYOIP scenario one - Cloudflare proxy services

The default behavior when a DNS query is made to a Cloudflare proxied hostname will be to return one of Cloudflare's [default anycast IP addresses ↗](https://www.cloudflare.com/ips/). The traffic is then accelerated, protected, and, if not served by Cloudflare cache, sent to the customer's origin server.

In the diagram below, instead of the default behavior, traffic will proxy through Cloudflare's application services platform but DNS queries will return an IP address that is owned by the customer while also benefiting from Cloudflare's anycast network.

There are two different network ranges used in this example:

* `152.3.15.0/24` \- Customer owned IP range that will be associated with the Cloudflare network.
* `152.3.14.0/24` \- Customer owned IP range that will continue to be associated with their origin network.

![Figure 1: Cloudflare announces customer IP range and proxies it to the origin server IP.](https://developers.cloudflare.com/_astro/figure1.BXY13mGX_196m46.svg "Figure 1: Cloudflare announces customer IP range and proxies it to the origin server IP.")

Figure 1: Cloudflare announces customer IP range and proxies it to the origin server IP.

1. In order for Cloudflare to respond to DNS queries with addresses from the customer's space, a Letter of Agency (LOA) must be provided by the customer to Cloudflare, so that the addresses can be provisioned and advertised. This address space (in the example, `152.3.15.0/24`) must be dedicated for Cloudflare's configuration and not used anywhere within the customer environment.
2. The Cloudflare DNS configuration for the origin server `www.abc.com` is configured with the IP address `152.3.14.10/32`.
3. A DNS query for `www.abc.com` is made.
4. Cloudflare returns an address from the customer's space that was previously configured from a BYOIP space provided by the customer. In this case, the response was `152.2.15.200`, which is a part of the `/24` prefix of `152.2.15.0/24`.
5. The eyeball sends a request to `152.2.15.200` which is routed to Cloudflare.
6. Cloudflare proxies the connection, using the SNI (`www.abc.com`) to determine the actual origin IP, `152.3.14.10`. The request is then routed through Cloudflare's proxy services, such as DDoS protection, Web Application Firewall, and Bot Management.
7. Successful requests are sent to origin (if not served by cache) to `152.3.14.10` with a source IP of the Cloudflare network.

## BYOIP scenario two - network DDoS protection

Cloudflare is well known for its DDoS mitigation services protecting public websites and APIs. The same technologies can also be used to protect entire networks. Cloudflare's [Magic Transit](https://developers.cloudflare.com/magic-transit/) service offers a cloud-based network DDoS mitigation service for our customers' public IP space.

![Figure 2: Protection against DDoS attacks can be placed in front of the BYOIP range in front of your Cloudflare tunneled network.](https://developers.cloudflare.com/_astro/figure2.D70IrQeq_guoPn.svg "Figure 2: Protection against DDoS attacks can be placed in front of the BYOIP range in front of your Cloudflare tunneled network.")

Figure 2: Protection against DDoS attacks can be placed in front of the BYOIP range in front of your Cloudflare tunneled network.

1. In order for Cloudflare to attract traffic destined for customer network prefixes, a Letter of Agency (LOA) must be provided by the customer to Cloudflare, so that the network prefixes can be provisioned and advertised.
2. Once provisioned, Cloudflare will advertise the customer prefixes to the Internet, attracting traffic destined for those networks to the Cloudflare network.
3. All traffic destined for those prefixes is routed to Cloudflare.
4. DDoS traffic is mitigated by Cloudflare and legitimate traffic is directed back to customer networks via [tunnels](https://developers.cloudflare.com/cloudflare-wan/), or via [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/) (CNI) on ramps to the customer environment.

More detailed information about Magic Transit capabilities can be found in the [Magic Transit Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/).

## Related resources

* [Protect hybrid cloud networks with Cloudflare Magic Transit](https://developers.cloudflare.com/reference-architecture/diagrams/network/protect-hybrid-cloud-networks-with-cloudflare-magic-transit/)
* [Protect public networks with Cloudflare](https://developers.cloudflare.com/reference-architecture/diagrams/network/protect-public-networks-with-cloudflare/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/network/bring-your-own-ip-space-to-cloudflare/#page","headline":"Bring your own IP space to Cloudflare · Cloudflare Reference Architecture docs","description":"Cloudflare allows enterprises to bring their IP space to the Cloudflare network. This allows them to gain the security and performance of the platform while still appearing to the rest of the world via their own public IP space.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/network/bring-your-own-ip-space-to-cloudflare/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-02-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/network/","name":"Network"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/network/bring-your-own-ip-space-to-cloudflare/","name":"Bring your own IP space to Cloudflare"}}]}
```
