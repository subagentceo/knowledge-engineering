---
title: Optimizing device roaming experience with geolocated IPs
description: Cloudflare can use private mobile networks (APNs) to connect devices roaming across multiple countries through regional Internet breakouts.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Optimizing device roaming experience with geolocated IPs

**Last reviewed:**  over 1 year ago 

## Introduction

A private [Access Point Name ↗](https://en.wikipedia.org/wiki/Access%5FPoint%5FName) (APN) enables devices, like connected vehicles, connected containers, healthcare devices or drones, to be connected while roaming across different countries. The device connects with a SIM or eSIM card to a dedicated network, and as the device moves to a new country, it automatically selects the appropriate private APN for the local provider.

APN traffic, typically managed by a third party provider such as a telecommunications company, is routed through specific regional Internet breakouts to get access to the Internet. This architecture can create challenges in regards to the localization of that traffic. For example, a device roaming in France might have traffic exit to the Internet from a UK-based Internet breakout. Therefore web sites and other Internet services will treat the device as if it is in the UK and deliver content in the wrong language or apply regional restrictions.

In this document, we'll discuss how Cloudflare can be used to solve this problem and will use the example of a service provider using private mobile networks (APNs) to connect devices roaming across multiple countries through regional Internet breakouts. This use case is relevant to global enterprises with regional offices, transportation fleets with connected vehicles, or any organization needing to maintain consistent, secure, and region-specific connectivity for roaming devices.

![Figure 1: Showing how Internet breakouts can present an egress IP that doesn't match the country the device is in.](https://developers.cloudflare.com/_astro/figure1.CJM1DAO-_Z1g51kL.svg "Figure 1: Showing how Internet breakouts can present an egress IP that doesn't match the country the device is in.")

Figure 1: Showing how Internet breakouts can present an egress IP that doesn't match the country the device is in.

# Correctly locate and secure devices by connecting them to the Cloudflare global network

Cloudflare addresses these challenges by routing device traffic from the Internet breakout to our global network, where traffic is processed at a Cloudflare data center close to the Internet breakout. This allows for two benefits:

1. Cloudflare can analyse the traffic, determine the original country of origin, and then ensure that traffic egresses onto the Internet from an IP address that is geolocated to the same country of origin.
2. Cloudflare can filter traffic based on [secure web gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) policies, allowing you to protect devices from accessing risky Internet hosts. It also allows you to lock down access for devices to specific Internet hosts, such as only allow devices to make requests to APIs that support their function.

The architecture diagram below provides a visual representation of this solution, showing how traffic from various countries — routed via different mobile network APN — is directed through Internet breakouts. Cloudflare optimizes and secures the Internet connection by leveraging [geolocated public IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/), ensuring that the traffic is secure and regionally localized to the device location.

This diagram is intended for network engineers, IT architects, and decision-makers looking to improve service relevance and performance for end-users. Key use cases include multinational corporations aiming to provide faster, region-specific Internet access and services in users' native languages, ensuring a superior user experience across diverse geographical locations.

![Figure 2: Using Cloudflare you can ensure the egress IP as seen by Internet sites matches the country the device is roaming in.](https://developers.cloudflare.com/_astro/figure2.7C-teMEC_Z2qI5pf.svg "Figure 2: Using Cloudflare you can ensure the egress IP as seen by Internet sites matches the country the device is roaming in.")

Figure 2: Using Cloudflare you can ensure the egress IP as seen by Internet sites matches the country the device is roaming in.

_Note: Labels in this image may reflect a previous product name._

1. **Data collection and regional routing**.  
Traffic from roaming devices is securely collected through the service provider's private APN and routed to third-party regional Internet breakouts. Each country in the network is assigned a specific RFC1918 IP subnet, simplifying traffic segmentation and management.
2. **Traffic sorting**.  
The Internet breakout will categorize the traffic into separate buckets to identify its country of origin - in this example each country's APN is given a dedicated private IP subnet.
3. **Connectivity options**.  
Cloudflare supports multiple connection methods to integrate with the regional breakout architecture:  
   * [**GRE tunnels**](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/) for ease of use.  
   * [**IPsec tunnels**](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/) for encrypted communication.  
   * [**Cloudflare Network Interconnect (CNI)**](https://developers.cloudflare.com/cloudflare-wan/network-interconnect/) for direct, high-performance connections.
4. **Localized Internet breakout using [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) (formerly Magic WAN) and [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)**.  
With Cloudflare WAN and using [dedicated egress](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/) with our [secure web gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/), Cloudflare enables Internet traffic to exit with source IPs registered in the desired country. This ensures end-users benefit from geolocalized content and services, such as access to region-specific platforms, tailored to their location.
5. **Advanced security and filtering options**.  
Cloudflare enhances the security of Internet breakouts with advanced features, including:  
   * [**DNS filtering**](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/) to manage and block access to unwanted, high risk domains.  
   * [**Network firewalling**](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) for enforcing detailed security policies. For example, you can restrict vehicles to only send data over the Internet to a designated set of cloud telemetry systems while blocking all other traffic.  
   * [**Full SSL inspection**](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) to protect against sophisticated threats and provide traffic visibility on encrypted traffic. It enables additional protections such as antivirus scanning, malware prevention, and file sandboxing.

# Related Resources

* [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)
* [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/)
* [Cloudflare servers don't own IPs anymore ↗](https://blog.cloudflare.com/cloudflare-servers-dont-own-ips-anymore/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/network/optimizing-roaming-experience-with-geolocated-ips/#page","headline":"Optimizing device roaming experience with geolocated IPs · Cloudflare Reference Architecture docs","description":"Cloudflare can use private mobile networks (APNs) to connect devices roaming across multiple countries through regional Internet breakouts.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/network/optimizing-roaming-experience-with-geolocated-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-02-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/network/","name":"Network"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/network/optimizing-roaming-experience-with-geolocated-ips/","name":"Optimizing device roaming experience with geolocated IPs"}}]}
```
