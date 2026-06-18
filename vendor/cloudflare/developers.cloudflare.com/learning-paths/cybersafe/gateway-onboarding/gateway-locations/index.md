---
title: Gateway locations
description: Set up Gateway DNS locations.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gateway locations

DNS locations are a collection of DNS endpoints which can be mapped to physical entities such as offices, homes, or data centers.

The fastest way to start filtering DNS queries from a location is by changing the DNS resolvers at the router.

## Add a DNS location

To add a DNS location to Gateway:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Resolvers & Proxies** \> **DNS locations**.
2. Select **Add a location**.
3. Choose a name for your DNS location.
4. Choose at least one [DNS endpoint](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/#dns-endpoints) to resolve your organization's DNS queries.
5. (Optional) Toggle the following settings:  
   * **Enable EDNS client subnet** sends a user's IP geolocation to authoritative DNS nameservers. [EDNS Client Subnet (ECS)](https://developers.cloudflare.com/cloudflare-one/glossary/?term=ecs) helps reduce latency by routing the user to the closest origin server. Cloudflare enables EDNS in a privacy preserving way by not sending the user's exact IP address but rather the first `/24` range of the larger range that contains their IP address. This `/24` range will share the same geographic location as the user's exact IP address.  
   * **Set as Default DNS Location** sets this location as the default DoH endpoint for DNS queries.
6. Select **Continue**.
7. (Optional) Turn on source IP filtering for your configured endpoints, then add any source IPv4/IPv6 addresses to validate.  
   * Endpoint authentication is required for standard IPv4 addresses and optional for dedicated IPv4 addresses.  
   * **DoH endpoint filtering & authentication** lets you restrict DNS resolution to only valid identities or user tokens in addition to IPv4/IPv6 addresses.
8. Select **Continue**.
9. Review the settings for your DNS location, then choose **Done**.

Captive portal limitation

Deploying Gateway DNS filtering using static IP addresses may prevent users from connecting to public Wi-Fi networks through captive portals. If users are experiencing connectivity issues related to captive portals, they should:

1. Remove the static IP addresses from the device.
2. Connect to the Wi-Fi network.
3. Once the connection has been established, add the static IP addresses back.

To avoid this issue, use the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) to connect your devices to Cloudflare One.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-locations/#page","headline":"Gateway locations · Cloudflare Learning Paths","description":"Set up Gateway DNS locations.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-locations/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/","name":"Onboarding Cloudflare Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/gateway-locations/","name":"Gateway locations"}}]}
```
