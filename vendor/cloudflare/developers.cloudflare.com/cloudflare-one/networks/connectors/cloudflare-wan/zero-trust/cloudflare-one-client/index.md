---
title: WARP
description: Use the Cloudflare One Client as an on-ramp to Cloudflare WAN and route traffic from user devices with the Cloudflare One Client installed to any network connected with Cloudflare Tunnel or IP-layer tunnels (anycast GRE, IPsec, or CNI).
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WARP

Note

By default, Cloudflare WAN does not support direct Mesh connectivity for devices with the Cloudflare One Client enabled. Double encapsulation and asymmetric routing prevent these connections.

When a device is behind Cloudflare WAN, avoid enabling the Cloudflare One Client. Instead, access the device using its local LAN IP from remote systems, rather than relying on Mesh IPs.

If you do want to use the Cloudflare One Client on a device behind Cloudflare WAN and connect to its virtual IP (within the `100.96.0.0/12` range), you will need to adjust your Cloudflare One Client profiles. Specifically, exclude the `100.96.0.0/12` subnet from the on-premises Cloudflare One Client profiles, and include it in the off-premises profile.

Use [WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) as an on-ramp to Cloudflare WAN (formerly Magic WAN) and route traffic from user devices with the Cloudflare One Client installed to any network connected with Cloudflare Tunnel or IP-layer tunnels (anycast [GRE, IPsec](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/#add-tunnels), or [CNI](https://developers.cloudflare.com/network-interconnect/)). Take advantage of the integration between Cloudflare WAN and [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) and enforce policies at Cloudflare's global network.

## Prerequisites

Before you can begin using the Cloudflare One Client as an on-ramp to Cloudflare WAN, you must set up your [Zero Trust account](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization).

## IP ranges

When connecting a device to Cloudflare WAN, you will have virtual IP addresses from the Cloudflare One Client, in the `100.96.0.0/12` range.

---

## Set up the Cloudflare One Client with Cloudflare WAN

### 1\. Route packets back to Cloudflare One Client devices

Route packets back to Cloudflare One Client devices from services behind an anycast GRE or other type tunnel. Complete this configuration before installing WARP. Otherwise, your infrastructure will not route packets correctly to Cloudflare global network and connectivity will fail.

Cloudflare will assign IP addresses from the virtual IP (VIP) space to your devices. To view your virtual IP address, go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select **Zero Trust** \> **My Team > Devices**.

All packets with a destination IP in the VIP space need to be routed back through the tunnel. For example, with a single GRE tunnel named `gre1`, in Linux, the following command would add a routing rule that would route such packets:

Terminal window

```

ip route add 100.96.0.0/12 dev gre1


```

Note

After set up, **HTTP** and **Network logs** in Gateway will show the virtual IP address of your device as the **Source IP**. DNS logs will continue to show the original device IP because DNS traffic is sent over the public Internet to Cloudflare's public-facing resolver.

### 2\. Configure Split Tunnels

Configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) from your Zero Trust account to only include traffic from the private IP addresses you want to access.

Optionally, you can configure Split Tunnels to include IP ranges or domains you want to use for connecting to public IP addresses.

### 3\. Install the Cloudflare One Client on your device

Refer to [Deploy the Cloudflare One Client to your organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) for more information on whether to choose a manual or managed deployment.

You can now access private IP addresses specified in the Split Tunnel configuration.

You must log out and log back in with at least one device to ensure the configuration updates on your device.

Run `traceroute`

If you connect through [GRE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/#add-tunnels), [IPsec](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/#add-tunnels), [CNI](https://developers.cloudflare.com/network-interconnect/), or [WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and want to run `traceroute` to an endpoint behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you need to change some settings.

Refer to [Run traceroute](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/traceroute/) for more information.

## Double encapsulation

When a Cloudflare One Client user connects from a location (such as an office) with an IPsec/GRE tunnel already set up, Cloudflare One Client traffic is doubly encapsulated - first by the Cloudflare One Client and then by Cloudflare WAN. This is unnecessary, since each on-ramp method provides full Zero Trust protection.

Since Cloudflare One Client traffic is already protected on its own, set up Cloudflare WAN to exclude Cloudflare One Client traffic, sending it to the Internet through regular connections.

To learn which IP addresses and UDP ports you should exclude to accomplish this, refer to [WARP ingress IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip).

### The Cloudflare One Client and Cloudflare One Appliance

If you have Cloudflare One Appliance (formerly Magic WAN Connector) and Cloudflare One Clients deployed in your premises, Cloudflare One Appliance automatically routes Cloudflare One Client traffic to the Internet rather than Cloudflare WAN IPsec tunnels. This prevents traffic from being encapsulated twice.

You may need to configure your firewall to allow this new traffic. Make sure to allow the following IPs and ports:

* **Destination IPs**: `162.159.193.0/24`, `162.159.197.0/24`
* **Destination ports**: `443`, `500`, `1701`, `2408`, `4443`, `4500`, `8095`, `8443`

Refer to [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/) for more information on this topic.

## Test Cloudflare One Client integration

Before testing, [configure domain fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#add-a-domain) for the server or service in the Cloudflare One Client settings. This is needed because by default Cloudflare Zero Trust excludes common top level domains used for local resolution from being sent to Gateway for processing.

If WARP integration has been enabled for the account within the last day, log off and on again in the Cloudflare One Client before testing.

To check if the Cloudflare One Client is working correctly as an on-ramp, you can do a resolution test on a [fully qualified domain name (FQDN) ↗](https://en.wikipedia.org/wiki/Fully%5Fqualified%5Fdomain%5Fname) for a server or service in the Cloudflare WAN. Test this from a user with a device.

For example:

Terminal window

```

nslookup <SERVER_BEHIND_CLOUDFLARE_WAN>


```

This DNS lookup should return a valid IP address associated with the server or service you are testing for.

Next, test with a browser that you can connect to a service on the WAN by opening a webpage that is only accessible on the WAN. Use the same server from the DNS lookup or another server in the WAN. Connecting using an IP address instead of a domain name should work.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/#page","headline":"Use the Cloudflare One Client as an on-ramp · Cloudflare One docs","description":"Use the Cloudflare One Client as an on-ramp to Cloudflare WAN and route traffic from user devices with the Cloudflare One Client installed to any network connected with Cloudflare Tunnel or IP-layer tunnels (anycast GRE, IPsec, or CNI).","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/","name":"Cloudflare One integration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/","name":"WARP"}}]}
```
