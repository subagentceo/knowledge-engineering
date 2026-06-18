---
title: Cloudflare Tunnel
description: Reference information for Cloudflare Tunnel in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Tunnel

Cloudflare WAN (formerly Magic WAN) can work together with [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) to provide easy access between your networks and applications.

By default, [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) proxies and filters TCP, UDP, and ICMP traffic routed through IPsec/GRE tunnels and destined to routes behind Cloudflare Tunnel.

## Route evaluation and precedence

Cloudflare evaluates private network routes using longest-prefix-match. A prefix combines a base IP address with a prefix length that indicates how many bits define the network portion (for example, `192.168.0.0/24`). When multiple routes could match a destination IP, Cloudflare selects the route with the longest prefix (most specific match).

For example, if you have routes for both `10.0.0.0/16` and `10.0.1.0/24`, traffic destined for `10.0.1.50` matches the `/24` route because it is more specific.

### Route uniqueness

Within a [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/), each prefix can only appear once in the Zero Trust routing table. You cannot create two Zero Trust routes with the same prefix pointing to different tunnels in the same virtual network.

To route the same prefix to different destinations, use separate [virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/).

### Reserved IP ranges

Cloudflare reserves the following IP ranges for Zero Trust services:

| IP range       | Purpose                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 100.64.0.0/12  | [Cloudflare Source IPs](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/)       |
| 100.96.0.0/12  | [Device IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/) |
| 100.80.0.0/16  | [Initial resolved IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/)             |
| 100.112.0.0/16 | [Private Load Balancers](https://developers.cloudflare.com/load-balancing/private-network/)                                           |

Do not configure routes that overlap with these reserved ranges.

### Interaction with WAN routes

If your account also uses WAN connections (IPsec, GRE, and CNI), route selection behavior depends on your routing mode.

For more information, refer to [Route evaluation with Zero Trust connections](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/#route-evaluation-with-zero-trust-connections).

## Interaction with other route selection mechanisms

Longest-prefix-match routing is the default route selection method. Other mechanisms can bypass or augment route evaluation.

### Automatic Return Routing (ARR)

[Automatic Return Routing](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/#automatic-return-routing-beta) bypasses route lookup for return traffic.

When ARR is enabled:

1. Cloudflare tags each flow with the source connection (tunnel or interconnect) when the flow is established.
2. For return traffic, Cloudflare routes packets back to the tagged source connection directly, bypassing the routing table.
3. This allows multiple sites to use identical private IP ranges without NAT or VRF configuration.

ARR requires Unified Routing mode. For more information, refer to [Automatic Return Routing](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/#automatic-return-routing-beta).

### Hostname Routes (Initial resolved IPs)

[Hostname-based routing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/) uses Gateway DNS to resolve hostnames to Initial resolved IPs, which then map to specific next hops.

When Hostname Routes are enabled:

1. Gateway DNS resolves the hostname to an Initial resolved IP (from `100.80.0.0/16`).
2. The client sends traffic to the Initial resolved IP.
3. Cloudflare looks up the Initial resolved IP to determine the real destination IP and the assigned next hop (specific tunnel or interconnect).
4. Traffic is forwarded to the assigned next hop, bypassing route evaluation for next-hop selection.

This enables hostname-based policies for non-HTTP traffic without requiring you to know destination IPs in advance.

## Test `cloudflared` tunnel integration

To verify that a `cloudflared` tunnel works correctly with your Cloudflare WAN connection:

1. From a host behind your customer premises equipment, open a browser.
2. Browse to an IP address or hostname that is reachable through a Cloudflare Tunnel private network route, such as the example destination `10.1.2.3`.
3. Confirm that the application loads as expected. If it does, Cloudflare Tunnel is handling the traffic as configured.

Run `traceroute`

If you connect through [GRE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [IPsec](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [CNI](https://developers.cloudflare.com/network-interconnect/), or [WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and want to run `traceroute` to an endpoint behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you need to change some settings.

Refer to [Run traceroute](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/traceroute/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel/#page","headline":"Cloudflare Tunnel · Cloudflare One docs","description":"Reference information for Cloudflare Tunnel in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/","name":"Cloudflare One integration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel/","name":"Cloudflare Tunnel"}}]}
```
