---
title: DNS filtering solution for Internet service providers
description: Learn how to use Cloudflare Gateway as a DNS filtering solution for Internet service providers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS filtering solution for Internet service providers

**Last reviewed:**  over 1 year ago 

## Introduction

Internet service providers are constantly exploring new revenue opportunities to expand their business, and many are now turning to security as a value-added service alongside their connectivity offerings. Traditionally, integrating security with connectivity posed significant challenges due to the reliance on legacy solutions that required costly on-premises hardware. This makes it difficult to deploy and manage and introduces post-deployment struggles with scalability and availability.

Today these limitations can be addressed through cloud-based solutions like [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/), our Secure Web Gateway service. Cloudflare Gateway's DNS filtering capabilities allow service providers to offer enhanced security as a value-added service for residential and mobile subscribers or B2B clients. With easy-to-create policies backed by Cloudflare's [extensive threat intelligence ↗](https://www.cloudflare.com/en-gb/security/), service providers can effectively safeguard their customers from accessing potentially [harmful domains](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories).

Moreover, Cloudflare Gateway eliminates concerns around availability, performance, and scalability, as it is built on [Cloudflare's 1.1.1.1 public DNS resolver](https://developers.cloudflare.com/1.1.1.1/), one of the [fastest ↗](https://www.dnsperf.com/#!dns-providers) and most widely-used DNS resolvers in the world.

Furthermore, this solution opens up opportunities for developing additional services beyond security, such as parental controls or tailored filtering profiles for B2B clients.

## Solution

Providing DNS security to the service providers' end customers with Cloudflare is straightforward. Service providers simply forward their public DNS requests to their Cloudflare tenant, and Cloudflare will filter DNS queries in accordance with the configured DNS filtering policies.

![Figure 1: The service provider subscribers send DNS queries to the service provider DNS server, which will forward them to Cloudflare Gateway to apply DNS filtering policies.](https://developers.cloudflare.com/_astro/gateway-dns-for-isp-image-01.CA9DVOGS_jcv6x.svg) 

Cloudflare Gateway, like all Cloudflare services, utilizes [anycast technology ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/), ensuring that all service provider DNS queries are directed to the nearest Cloudflare point of presence.

To distinguish queries originating from the service provider from those coming from other customers, admins configure a [location](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) in their Cloudflare tenant dashboard. When a DNS location is created, Gateway assigns IPv4/IPv6 addresses and DoT/DoH hostnames for that location. These assigned IP addresses and hostnames are then used by the service provider to send DNS queries for resolution. In turn, the service provider configures the location object with the public IP addresses of their on-premises DNS servers, allowing Cloudflare to accurately associate queries with the corresponding location.

On Locations

If stable and defined source IPv4 addresses cannot be assigned to the on-premises DNS servers, service providers can instead use unique destination location endpoints. Each location is assigned a distinct [DoT](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-over-tls-dot) and [DoH](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-over-https-doh) hostname, as well as a unique [destination IPv6 address](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#ipv4ipv6-address). Additionally, Cloudflare can provide unique [destination IPv4 addresses upon request](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-resolver-ip).

DNS filtering is then enforced through DNS policies set up by the service provider to detect domains linked to [security risks](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories). Cloudflare continuously updates the list of risky domains using [its extensive threat intelligence ↗](https://www.cloudflare.com/en-gb/security/). When a DNS query matches a flagged domain, the corresponding action specified in the DNS policy is executed. This action can be a '[Block](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#block),' where Gateway responds with `0.0.0.0` for IPv4 queries or `::` for IPv6 queries, or displays a [custom block page hosted by Cloudflare](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/). Alternatively, an `[Override](/cloudflare-one/traffic-policies/dns-policies/#override)` action or [block page URL redirect](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page) can redirect the DNS query to a block page hosted by the service provider.

![Figure 2: A DNS policy to prevent users from navigating to malicious domains. The action is to override and redirect the DNS query to a block page hosted by the service provider.](https://developers.cloudflare.com/_astro/gateway-dns-for-isp-image-02.BLGXVL4a_Z1Mnjow.svg) 

To achieve more precise control over which domains are allowed or blocked, the service provider can configure additional Allowed Domain and Blocked Domains policies. By setting these policies with [lower precedence](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence) than the Security Risks policy, the service provider can override the Security Risks policy for specific domains.

To streamline the management of allowed and blocked domains, use [lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/). Lists are easily updated through the dashboard or via [APIs](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/update/), making policy adjustments more efficient.

![Figure 3: DNS policies are applied according to their order of precedence. In this example, the 'Allow List Policy' and 'Block List Policy' will be considered before the 'Security List' policy.](https://developers.cloudflare.com/_astro/gateway-dns-for-isp-image-03.Dy2ZZQ-9_Z7o2FY.svg) 

Additionally, all DNS queries forwarded to Cloudflare Gateway are logged and can be exported to external systems using [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

Miscategorization of domains

In cases of a miscategorization of domains, raise a [categorization change request](https://developers.cloudflare.com/security-center/investigate/change-categorization/#via-the-cloudflare-dashboard) directly from the Cloudflare dashboard.

## Additional offerings based on DNS filtering capabilities

Service providers can enhance their offerings by using Cloudflare Gateway DNS policies to deliver additional value-added services alongside the base DNS security service. By using the same solution, service providers can develop customized content category filtering services. These services can be easily constructed using Cloudflare's built-in [content categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#content-categories) and [application types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/), as well as the service provider's own custom allow and block lists.

Some potential applications include:

* **Parental Control Services**: This service can block categories such as adult themes, child abuse, violence, and questionable content to ensure a safer online environment for children.
* **Educational Services**: Designed for schools and educational organizations, this service can extend beyond parental controls by blocking additional categories like CIPA, gambling, and entertainment, thereby promoting a focused learning atmosphere.
* **Enterprise Services**: This offering allows businesses to easily restrict access to non-work-related domains, including categories such as entertainment, social networking, gambling, shopping & auctions, society & lifestyle, and sports.

To differentiate these additional services from the core DNS security offering, the service provider would create additional DNS locations, one for each service. Cloudflare would be able to distinguish DNS queries for these services if the service provider sends them to one of the unique identifiers of a location. Each location has a unique [DoH](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-over-https-doh) and [DoT](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-over-tls-dot) hostname and a unique [destination IPv6 address](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#ipv4ipv6-address). Cloudflare can also provision [dedicated destination IPv4 addresses](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-resolver-ip) per location.

## Related resources

* [Cloudflare Gateway DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/)
* [Cloudflare Blog: Using the power of Cloudflare's global network to detect malicious domains using machine learning ↗](https://blog.cloudflare.com/threat-detection-machine-learning-models/)
* [Protect ISP and telecommunications networks from DDoS attacks](https://developers.cloudflare.com/reference-architecture/diagrams/network/protecting-sp-networks-from-ddos/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/sase/gateway-dns-for-isp/#page","headline":"DNS filtering solution for Internet service providers · Cloudflare Reference Architecture docs","description":"Learn how to use Cloudflare Gateway as a DNS filtering solution for Internet service providers.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/sase/gateway-dns-for-isp/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-11-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/sase/","name":"Secure Access Service Edge (SASE)"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/sase/gateway-dns-for-isp/","name":"DNS filtering solution for Internet service providers"}}]}
```
