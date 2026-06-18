---
title: Cloudflare Gateway
description: Reference information for Cloudflare Gateway in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Gateway

[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/), our comprehensive Secure Web Gateway, allows you to set up policies to inspect DNS, network, HTTP, and egress traffic.

You can apply network and HTTP Gateway policies alongside [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) policies (for L3/4 traffic filtering) to Internet-bound traffic or private traffic entering the Cloudflare network through Cloudflare WAN (formerly Magic WAN). Additionally, you can configure Gateway to [resolve DNS queries](#dns-filtering) from Cloudflare WAN.

## HTTPS filtering

To inspect HTTPS traffic, you need to install a Cloudflare root certificate on each client device. A certificate is required for Cloudflare to [decrypt TLS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/).

### Installing certificates

You can use the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/) to [automatically install a Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/automated-deployment/) on supported devices. If your device or application does not support certificate installation through the Cloudflare One Client, you can [manually install a certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/).

### Exempting traffic from inspection

If you cannot or do not want to install the certificate, you can create [Do Not Inspect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) policies to exempt incompatible Cloudflare WAN traffic from inspection or to disable TLS decryption entirely.

Because Gateway cannot discern Cloudflare WAN traffic, you must use [Cloudflare One Client checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/) or the IP addresses associated with Cloudflare WAN to match traffic with Gateway policies.

For example, if your organization onboards devices to Cloudflare WAN using the Cloudflare One Client, you can exempt devices not running the Cloudflare One Client using [OS version checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/):

| Selector                     | Operator | Value                | Logic          | Action         |
| ---------------------------- | -------- | -------------------- | -------------- | -------------- |
| Passed Device Posture Checks | not in   | Windows (OS version) | Or             | Do Not Inspect |
| Passed Device Posture Checks | not in   | macOS (OS version)   | Or             | Do Not Inspect |
| Passed Device Posture Checks | not in   | Linux (OS version)   | Or             | Do Not Inspect |
| Passed Device Posture Checks | not in   | iOS (OS version)     | Or             | Do Not Inspect |
| Passed Device Posture Checks | not in   | Android (OS version) | Do Not Inspect |                |

If your organization onboards users to Cloudflare WAN using an [on-ramp other than the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/on-ramps/), you can exempt devices from inspection using the IP addresses for your IPsec tunnels:

| Selector  | Operator | Value          | Action         |
| --------- | -------- | -------------- | -------------- |
| Source IP | in       | 203.0.113.0/24 | Do Not Inspect |

## DNS filtering

You can configure the DNS resolver for your Cloudflare WAN networks to the shared IP addresses for the Gateway DNS resolver. The Gateway DNS resolver IPs are `172.64.36.1` and `172.64.36.2`.

When you resolve DNS queries from Cloudflare WAN through Gateway, Gateway will log the queries with the private source IP. You can use the private source IP to create [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) for queries intended for [internal DNS records](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#internal-dns).

The following diagram illustrates how DNS queries from Cloudflare WAN and Cloudflare Mesh flow through Gateway to your internal DNS:


flowchart LR
accTitle: DNS query flow
accDescr: Shows how DNS queries from Cloudflare WAN and Cloudflare Mesh flow through Gateway to internal DNS.
subgraph subGraph0["Data center"]
  direction TB
      InternalDNS(["Internal DNS"])
      ResolverPolicies["Resolver policies"]
      CloudflareGatewayDNSResolver["Gateway DNS resolver"]
end
  ResolverPolicies -- Retain and use</br>Source Internal IP --> InternalDNS
  CloudflareGatewayDNSResolver -- <br> --> ResolverPolicies
  WarpConnector["Cloudflare Mesh"] -- DHCP/DNS resolver --> IPSecTunnel["IPsec tunnel"]
  CloudflareWAN[$Cloudflare WAN] -- DHCP/DNS resolver --> IPSecTunnel
  IPSecTunnel -- Shared IP endpoints --> CloudflareGatewayDNSResolver
  ResolverPolicies@{ shape: proc}
  WarpConnector@{ shape: in-out}
  CloudflareWAN@{ shape: in-out}

## Outbound Internet traffic

By default, the following traffic routed through IPsec/GRE tunnels and destined to public IP addresses is proxied/filtered through Cloudflare Gateway:

* TCP, UDP, and ICMP traffic sourced from [RFC 1918 ↗](https://datatracker.ietf.org/doc/html/rfc1918) IPs or devices.
* TCP and UDP traffic sourced from [BYOIP](https://developers.cloudflare.com/byoip/) or [Leased IPs](https://developers.cloudflare.com/magic-transit/cloudflare-ips/) and destined to a well-known port (`0`\-`1023`).

By default, traffic destined to public IPs will be routed over the public Internet. If you want to configure specific public IP ranges to be routed through your IPsec/GRE tunnels instead of over the public Internet after filtering, contact your account team.

This traffic will egress from Cloudflare according to the [egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/) you define in Cloudflare Gateway. By default, it will egress from a shared Cloudflare public IP range.

## Private traffic

By default, TCP, UDP, and ICMP traffic routed through IPsec/GRE tunnels and destined to routes behind [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) will be proxied/filtered through Cloudflare Gateway.

Contact your account team to enable Gateway filtering for traffic destined to routes behind IPsec/GRE tunnels.

### Default filtering criteria

When enabled, TCP/UDP traffic meeting **all** the following criteria will be proxied and filtered by Cloudflare Gateway:

* **Source and destination IPs**: Both must be part of [RFC1918 ↗](https://datatracker.ietf.org/doc/html/rfc1918) space, [WARP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/), [BYOIP](https://developers.cloudflare.com/byoip/), or [Leased IPs](https://developers.cloudflare.com/magic-transit/cloudflare-ips/).
* **Source port**: Must be a client port strictly higher than `1023`.
* **Destination port**: Must be a well-known port (lower than `1024`).

### Custom filtering criteria

You can specify more specific matches to override the default criteria:

* **Source IP prefix**: A subset of RFC1918 space, [BYOIP](https://developers.cloudflare.com/byoip/), or [Leased IPs](https://developers.cloudflare.com/magic-transit/cloudflare-ips/).
* **Destination IP prefix**: A subset of RFC1918 space, [BYOIP](https://developers.cloudflare.com/byoip/), or [Leased IPs](https://developers.cloudflare.com/magic-transit/cloudflare-ips/).
* **Destination port**: Any port from `0` to `65535`.

Note

Source ports are fixed to `1024`\-`65535` and cannot be overridden.

Run `traceroute`

If you connect through [GRE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [IPsec](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [CNI](https://developers.cloudflare.com/network-interconnect/), or [WARP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/) and want to run `traceroute` to an endpoint behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you need to change some settings.

Refer to [Run traceroute](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/traceroute/) for more information.

## Test Gateway integration

To check if Gateway is working properly with your Cloudflare WAN connection, open a browser from a host behind your customer premise equipment, and browse to `https://ifconfig.me`.

If you are still testing Gateway and Cloudflare is not your default route, configure a policy-based route on your router to send traffic to Cloudflare Gateway first.

Confirm there is an entry for the test in [HTTP Gateway Activity Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#http-logs).

Verify the following details:

* **Destination IP**: Should be the public IP address of `ifconfig.me`.
* **Source IP**: Should be the private (WAN) address of the host with the browser.
* **Outbound connection**: Should be sourced from a Cloudflare WAN IP address, not any public IP address that Cloudflare might be advertising on your behalf.

This applies when using [Magic Transit With Egress Option](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/#magic-transit-with-egress-option-enabled) as well.

Additionally, test both `http://ifconfig.me` (non-TLS) and `https://ifconfig.me` (TLS) to ensure that your [TCP maximum segment size (MSS Clamping)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/get-started/#set-maximum-segment-size) has been set properly.

If the HTTPS query hangs or fails but HTTP works, the MSS value may be too high or not set. Reduce this value on your customer premise equipment to match the overhead introduced by your [IKE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/gre-ipsec-tunnels/#supported-configuration-parameters) and [ESP ↗](https://en.wikipedia.org/wiki/IPsec#Encapsulating%5FSecurity%5FPayload) settings.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-gateway/#page","headline":"Connect to Cloudflare Gateway with Cloudflare WAN · Cloudflare One docs","description":"Reference information for Cloudflare Gateway in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/","name":"Cloudflare One integration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-gateway/","name":"Cloudflare Gateway"}}]}
```
