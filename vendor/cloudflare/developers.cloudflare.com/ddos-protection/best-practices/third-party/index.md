---
title: Third-party services and DDoS protection
description: DDoS rule interactions with third-party services like Google and payment providers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Third-party services and DDoS protection

## Using a third-party CDN in front of Cloudflare

Some Cloudflare customers choose to use a Content Delivery Network (CDN) in front of Cloudflare to cache and serve their resources.

Cloudflare recommends that you **do not use a third-party CDN in front of Cloudflare**. Some CDN providers may introduce subtleties into HTTP requests that deviate from protocol standards and/or protocol best practices. Additionally, because traffic to Cloudflare will originate from a limited set of IP addresses of the third-party CDN, in rare occasions — such as when using the Akamai CDN in front of Cloudflare — it may appear as if the CDN is launching a DDoS attack against Cloudflare due to the amount of traffic from these limited IP addresses.

Therefore, it is recommended that you **use the [Cloudflare CDN](https://developers.cloudflare.com/cache/)**, which provides the following benefits:

* You remove an additional hop between vendor data centers, thus reducing latency for your users.
* You perform DDoS filtering in the first point of contact from the Internet, which is a recommended best practice.

L3/4 DDoS mitigation accuracy

Using a third-party WAF or CDN service in front of Cloudflare can negatively impact the accuracy of L3/4 DDoS mitigation.

When traffic is proxied through another vendor, the vendor's IP addresses are available to Cloudflare's network-layer protection systems rather than the true client IP addresses. This lack of visibility into the original source can lead to less effective automated mitigation and potential false positives.

If you require specific architectures involving third-party vendors, refer to our [Deployment architectures for Magic Transit](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/#deployment-architectures-for-magic-transit) for detailed guidance on maintaining security posture in complex environments.

If you are using a third-party CDN in front of Cloudflare and Cloudflare mitigates a DDoS attack, you will still pay your first-hop CDN provider for the attack traffic that they processed before it was mitigated by Cloudflare.

### Recommended DDoS configuration adjustments

If you are using a CDN or proxy in front of Cloudflare, it is recommended that you change the action and/or sensitivity level of the following DDoS rules named:

* `HTTP requests with unusual HTTP headers or URI path (signature #1)` with the rule ID ...3486aee1
* `HTTP requests with unusual HTTP headers or URI path (signature #56)` with the rule ID ...e269dfd6
* `HTTP requests with unusual HTTP headers or URI path (signature #57)` with the rule ID ...f35a42a0
* `Requests coming from known bad sources` with the rule ID ...3a679c52

You should change the rule's action to _Log_ (only available on Enterprise plans) to view the flagged traffic in the [analytics dashboard](https://developers.cloudflare.com/ddos-protection/reference/analytics/). Alternatively, change the rule's **Sensitivity Level** to _Essentially Off_ to prevent the rule from being triggered.

For more information, refer to [HTTP DDoS Attack Protection managed ruleset: Ruleset configuration](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/#ruleset-configuration).

## Using VPNs, NATs, and other third-party services

Some Cloudflare Magic Transit customers operate Virtual Private Networks (VPN) so that their remote employees can connect securely to the organization's services. Additionally, larger organizations have Network Addressing Translation (NAT) systems that manage connections in and out of their network.

Cloudflare Magic Transit customers may also use third-party services such as Zoom, Webex, Microsoft Teams, and others for their internal organization communication. Because traffic to Cloudflare will be originating from a limited set of IP addresses belonging to these third-party services, it may appear as if the services are launching a DDoS attack against Cloudflare due to the amount of traffic from limited IP addresses.

Additionally, since this traffic may also be targeting a limited set of destinations (for example, the same designated service ports, VPN endpoints, or NAT IP addresses), it may appear as if the CDN is launching a DDoS attack against Cloudflare due to the amount of traffic from a limited set of IPs _to_ a limited set of IPs.

### Recommended DDoS configuration adjustments

If your organization uses VPNs, NATs, or third-party services at high rates of over 100 Mbps, it is recommended that you one of the following:

* Change the **Sensitivity Level** of the relevant rules to a lower level. Changing the level to _Essentially Off_ will prevent the rules from being triggered. Refer to [HTTP DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/) and [Network-layer DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/) for more information on the available adjustments per ruleset and how to perform them.
* Exclude the desired traffic from the Managed DDoS rule using expression filters. You can exclude a combination of source ports, source IP addresses, destination ports, destination IP addresses, and protocol. For more information, refer to [Configure Network-layer DDoS Attack Protection via API](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/).

If you are on an Enterprise plan, you can change a rule's action to _Log_ to view the flagged traffic in the [analytics dashboard](https://developers.cloudflare.com/ddos-protection/reference/analytics/). After gathering this information, you can later define rule adjustments as previously described.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/best-practices/third-party/#page","headline":"Third-party services and Cloudflare DDoS protection · Cloudflare DDoS Protection docs","description":"DDoS rule interactions with third-party services like Google and payment providers.","url":"https://developers.cloudflare.com/ddos-protection/best-practices/third-party/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/best-practices/third-party/","name":"Third-party services and DDoS protection"}}]}
```
