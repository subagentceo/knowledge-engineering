---
title: Locations
description: Locations in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Locations

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
1. Change the DNS resolvers on your router, browser, or OS by following the setup instructions in the UI.
2. Select **Go to DNS Location**. Your location will appear in your list of locations.

You can now apply [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) to your location using the [Location selector](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#location).

## DNS endpoints

### IPv4 and IPv6 DNS

Cloudflare will prefill the [**Source IPv4 Address**](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#source-ip) based on the network you are on. Additionally, Enterprise users can use [dedicated DNS resolver IP addresses](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-resolver-ip) assigned to their account or [resolver IP addresses they provide (BYOIP)](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#bring-your-own-dns-resolver-ip).

You do not need to configure the IPv4 DNS endpoint if:

* Your network only uses IPv6.
* Your users will send all DNS requests from this location using [DNS over HTTPS](#dns-over-https-doh) via a browser.
* You will deploy the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/).

Your IPv4 address is taken error

When you try to configure a DNS location over IPv4, Gateway may display a **Your source IPv4 address is taken** error. This may mean someone else in the same network configured Gateway before you did. If your network supports IPv6, you can still use Gateway's DNS filtering by sending DNS queries over IPv6\. You can also use the DNS over HTTPS hostname to send queries using a DNS over HTTPS client.

If you think someone else is wrongfully using this IPv4 address, [contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/#getting-help-with-an-issue).

### DNS over TLS (DoT)

DNS over TLS (DoT) is a standard for encrypting DNS traffic using its own port (`853`) and TLS encryption.

For more information, refer to [DNS over TLS](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-tls/).

### DNS over HTTPS (DoH)

DNS over HTTPS (DoH) is a standard for encrypting DNS traffic via the HTTPS protocol, preventing tracking and spoofing of DNS queries.

Gateway requires a DoH endpoint for default DNS locations. For more information, refer to [DNS over HTTPS](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-https/).

## Secure DNS locations

Secure DNS locations provide additional protection against malicious domains for use in services such as [protective DNS (PDNS)](https://developers.cloudflare.com/reference-architecture/diagrams/sase/gateway-for-protective-dns/). For a DNS location to be considered secure, Gateway requires that:

* Your IPv4 and IPv6 endpoints use your [BYOIP addresses](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#bring-your-own-dns-resolver-ip) (if any).
* [Source network filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) is configured for your IPv4, IPv6, and DoT endpoints.
* Source network filtering or token authentication are configured for your DoH endpoints.
* Any enabled endpoints for a DNS location meet security permissions.

You can assign users the [**Cloudflare Zero Trust DNS Locations Write** role](https://developers.cloudflare.com/cloudflare-one/roles-permissions/#zero-trust-roles) to grant them the permission to create and edit secure DNS locations. To allow users to view locations, you must also assign the **Cloudflare Zero Trust Read Only** role. Users with these roles can view any DNS location, but can only create or edit secure locations.

Roles that supersede **Cloudflare Zero Trust DNS Locations Write** include:

* Cloudflare Gateway
* Cloudflare Zero Trust
* Super Administrator

## Limitations

### Captive portals

Deploying Gateway DNS filtering using static IP addresses may prevent users from connecting to public Wi-Fi networks through captive portals. If users are experiencing connectivity issues related to captive portals, they should:

1. Remove the static IP addresses from the device.
2. Connect to the Wi-Fi network.
3. Once the connection has been established, add the static IP addresses back.

To avoid this issue, use the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) to connect your devices to Cloudflare One.

### Third-party filtering

Gateway will not properly filter traffic sent through third-party VPNs or other Internet filtering software, such as [iCloud Private Relay ↗](https://support.apple.com/102602) or [Google Chrome IP Protection ↗](https://github.com/GoogleChrome/ip-protection#ip-protection). To ensure your DNS policies apply to your traffic, Cloudflare recommends turning off software that may interfere with Gateway.

To turn off iCloud Private Relay, refer to the Apple user guides for [macOS ↗](https://support.apple.com/guide/mac-help/use-icloud-private-relay-mchlecadabe0/) or [iOS ↗](https://support.apple.com/guide/iphone/protect-web-browsing-icloud-private-relay-iph499d287c2/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/#page","headline":"Locations · Cloudflare One docs","description":"Locations in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPv6"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/","name":"Resolvers and proxies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/dns/","name":"DNS"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/dns/locations/","name":"Locations"}}]}
```
