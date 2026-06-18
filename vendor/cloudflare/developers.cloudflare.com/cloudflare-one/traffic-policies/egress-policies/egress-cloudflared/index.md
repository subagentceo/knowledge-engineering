---
title: Egress through Cloudflare Tunnel
description: Egress through Cloudflare Tunnel in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Egress through Cloudflare Tunnel

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) |
| ---------------------------------------------------------------------------------------------------------------------------------- |
| Traffic and DNS mode                                                                                                               |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.4.929.0           |
| macOS    | ✅            | 2025.4.929.0           |
| Linux    | ✅            | 2025.4.929.0           |
| iOS      | ✅            | 1.11                   |
| Android  | ✅            | 2.4.2                  |
| ChromeOS | ✅            | 2.4.2                  |

Some third-party services only accept connections from specific source IPs listed in an Access Control List (ACL). If a non-Cloudflare IP (for example, an IP from your ISP or a cloud provider like AWS) is already on their allowlist, you can route traffic through a Cloudflare Tunnel so that it exits using that same IP. This is called source IP anchoring — it allows you to keep your existing egress IPs without purchasing [Cloudflare dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/).

For example, assume your banking service at `app.bank.com` expects traffic from an AWS IP. You install `cloudflared` in your AWS environment and add a public hostname route for `app.bank.com`. When users connect to `app.bank.com` through the Cloudflare One Client, Gateway applies your network policies and routes the filtered traffic through the Cloudflare Tunnel to AWS. The traffic then exits to the public Internet using your AWS egress IP.

    flowchart LR
      subgraph aws["AWS VPC"]
				cloudflared["cloudflared"]
      end
			subgraph cloudflare[Cloudflare]
			  gateway["Gateway"]
			end
			subgraph internet[Internet]
				resolver[1.1.1.1]
				app[Application]
			end
      warp["Cloudflare One
				Client"]--"app.bank.com"-->gateway--"Network traffic"-->cloudflared
			gateway<-.DNS lookup.->resolver
			aws--AWS egress IP -->app

To learn more about how Gateway applies hostname-based egress policies, refer to the [Cloudflare blog ↗](https://blog.cloudflare.com/egress-policies-by-hostname/).

## Prerequisites

User traffic must be on-ramped to Gateway using one of the following methods:

| On-ramp method                                                                                                              | Compatibility             |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) | ✅                         |
| [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/)               | ✅                         |
| [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/)                             | ✅                         |
| [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)                    | ✅                         |
| [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/)                           | 🚧[1](#user-content-fn-1) |

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) |
| ---------------------------------------------------------------------------------------------------------------------------------- |
| Traffic and DNS mode                                                                                                               |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.4.929.0           |
| macOS    | ✅            | 2025.4.929.0           |
| Linux    | ✅            | 2025.4.929.0           |
| iOS      | ✅            | 1.11                   |
| Android  | ✅            | 2.4.2                  |
| ChromeOS | ✅            | 2.4.2                  |

## Footnotes

1. Not compatible with [ECMP routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#equal-cost-multi-path-routing). For hostname-based routing to work, DNS queries and the resulting network traffic must reach Cloudflare over the same IPsec/GRE tunnel.  
[↩](#user-content-fnref-1)

## 1\. Connect your private network

[Connect your private network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/) to Cloudflare using `cloudflared`. For example, if you want traffic to egress from AWS, connect the private CIDR block of your AWS VPC.

Note

Requires `cloudflared` version 2025.7.0 or later.

## 2\. Add a public hostname route

To route a public hostname through Cloudflare Tunnel:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Routes** \> **Hostname routes**.
2. Select **Create hostname route**.
3. In **Hostname**, enter the public hostname that represents the application (for example, `app.bank.com`). The hostname should be accessible from the public Internet.
4. For **Tunnel**, select the Cloudflare Tunnel that is being used to connect the private network to Cloudflare.
5. Select **Create route**.

## 3\. Route network traffic through the Cloudflare One Client

In your WARP [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) configuration, route the following IP addresses through the WARP tunnel to Gateway.

### Initial resolved IPs

When users connect to a public hostname route, Gateway will assign an initial resolved IP to the DNS query from the following range:

Gateway's network engine operates at Layer 3/Layer 4 of the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/), where only IP addresses are available — not hostnames. The initial resolved IP acts as a signal: when a packet's destination IP falls within the `100.80.0.0/16` Carrier-Grade NAT (CGNAT) range, Gateway recognizes that the IP maps to a public hostname route and sends the traffic through the corresponding Cloudflare Tunnel.

To route initial resolved IPs through the Cloudflare One Client:

In your WARP [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/), configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) such that the initial resolved IPs route through the WARP tunnel. Configuration depends on your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode):

* **Exclude mode**: Delete `100.64.0.0/10` from your Split Tunnels list. We recommend [adding back the IP ranges](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) that are not explicitly used for Cloudflare One services. This reduces the risk of conflicts with existing private network configurations that may use the CGNAT address space.
* **Include mode**: Add Split Tunnel entries for the following IP addresses:  
   * **IPv4**: `100.80.0.0/16`  
   * **IPv6**: `2606:4700:0cf1:4000::/64`

### Private network IPs

Your private network's CIDR block should also route through the WARP tunnel. For a detailed configuration example, refer to [Connect a private network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/#3-route-private-network-ips-through-the-cloudflare-one-client).

## 4\. (Optional) Configure network policies

You can build [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to filter HTTPS traffic to your public hostname on port `443`. For example, to restrict `app.bank.com` so that only certain users or groups can access it through your AWS egress IP, create two policies: one to allow authorized users, and one to block everyone else.

1. Allow company employees:  
| Selector   | Operator      | Value           | Logic | Action |  
| ---------- | ------------- | --------------- | ----- | ------ |  
| SNI        | in            | app.bank.com    | And   | Allow  |  
| User Email | matches regex | .\*@example.com |       |        |
2. Block everyone else on port `443`:  
| Selector | Operator | Value        | Action |  
| -------- | -------- | ------------ | ------ |  
| SNI      | in       | app.bank.com | Block  |

Gateway does not support hostname-based filtering for traffic on non-`443` ports. To block traffic to `app.bank.com` on all ports, use the [Destination IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#destination-ip) selector and specify the public IP range of `app.bank.com`.

## 5\. Test the connection

From a device, open a browser and go to `app.bank.com`.

You can search for `app.bank.com` in your [Gateway DNS logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/); the **DNS response details** section should show the public resolved IPs as well as an initial resolved IP. You can also check your [Cloudflare Tunnel logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) to confirm that requests are routing through the tunnel to the public resolved IPs.

## Limitations

### Google Chrome restricts local network access

Starting with [Chrome 142 ↗](https://developer.chrome.com/release-notes/142), the browser restricts requests from websites to local IP addresses, including the Gateway initial resolved IP CGNAT range (`100.80.0.0/16`). Because this range falls within `100.64.0.0/10`, Chrome categorizes these addresses as belonging to a local network. When a website loaded from a public IP makes subrequests to a domain resolved through an initial resolved IP, Chrome treats this as a public-to-local network request and displays a prompt asking the user to allow access to devices on the local network. Chrome will block requests to these domains until the user accepts this prompt.

This commonly occurs when an Egress policy matches broadly used domains (such as `cloudfront.net` or `github.com`), causing subrequests from public pages to resolve to the `100.80.0.0/16` range.

#### Iframes

If the affected request originates from within an iframe (for example, an application embedded in a third-party portal), the iframe must declare the `local-network-access` permission for the browser prompt to appear in the parent frame:

* **Chrome 142-144**: Use the `allow="local-network-access"` attribute on the iframe element.
* **Chrome 145+**: The permission was split into `allow="local-network"` and `allow="loopback-network"`.

If iframes are nested, every iframe in the chain must include the appropriate attribute. Since third-party applications control their own iframe attributes, this may not be configurable by the end user.

#### Workarounds

To avoid this issue, choose one of the following options:

* **Override IP address space classification (Chrome 146+)**: Use the [LocalNetworkAccessIpAddressSpaceOverrides ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessIpAddressSpaceOverrides) Chrome Enterprise policy to reclassify the `100.80.0.0/16` range as public. This is the most targeted fix because it only changes the classification for the initial resolved IP range rather than disabling security checks entirely.
* **Allow specific URLs (Chrome 140+)**: Use the [LocalNetworkAccessAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessAllowedForUrls) Chrome Enterprise policy to exempt specific websites from Local Network Access checks. Note that `https://*` is a valid entry to disable checks for all URLs.
* **Allow specific URLs (Chrome 146+)**: Use the [LocalNetworkAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAllowedForUrls) Chrome Enterprise policy, which replaces `LocalNetworkAccessAllowedForUrls` starting in Chrome 146.
* **Opt out of Local Network Access restrictions (Chrome 142-152)**: Use the [LocalNetworkAccessRestrictionsTemporaryOptOut ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessRestrictionsTemporaryOptOut) Chrome Enterprise policy to completely opt out of Local Network Access restrictions. This is a temporary policy and will be removed after Chrome 152.
* **Disable the Chrome feature flag**: Go to `chrome://flags` and set the **Local Network Access Checks** flag to _Disabled_. This approach is suitable for individual users but not for enterprise-wide deployment.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/#page","headline":"Egress through Cloudflare Tunnel · Cloudflare One docs","description":"Egress through Cloudflare Tunnel in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AWS","Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/egress-policies/","name":"Egress policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/","name":"Egress through Cloudflare Tunnel"}}]}
```
