---
title: Connect a private hostname
description: Connect a private hostname in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect a private hostname

Instead of managing static IP lists and routes, you can connect users to private HTTP and non-HTTP applications using their hostnames (for example, `wiki.internal.local`). Private hostname routes are especially useful when the application has an unknown or ephemeral IP, which often occurs when infrastructure is provisioned by a third-party cloud provider.

When a user requests a private hostname, Cloudflare Gateway assigns an initial resolved IP from a CGNAT range to route the traffic through your tunnel to the correct private IP address. For a deep dive into the architecture and packet flow, refer to our [announcement blog post ↗](https://blog.cloudflare.com/tunnel-hostname-routing/).

## Supported on-ramps/off-ramps

The table below summarizes the Cloudflare One products that are compatible with private hostname routing. Refer to the table legend for guidance on interpreting the table.

✅ Product works with no caveats   
🚧 Product can be used with some caveats   
❌ Product cannot be used   

### Device connectivity

End users can connect to private hostnames using the following traffic on-ramps:

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

### Private network connectivity

Private hostname routing only works for applications connected with `cloudflared`. Other traffic off-ramps require IP-based routes.

| Connector                                                                                                                      | Compatibility | Minimum version |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------- | --------------- |
| [cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) | ✅             | 2025.7.0        |
| [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)                       | ❌             |                 |
| [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/)                              | ❌             |                 |

## Connect a private hostname

This section covers how to enable remote access to a private hostname application using `cloudflared`.

### Prerequisites

Before you can connect to private hostnames, you must enable the Gateway proxy.

* [ Dashboard ](#tab-panel-7288)
* [ Terraform (v5) ](#tab-panel-7289)

1. Go to **Traffic policies** \> **Traffic settings**.
2. In **Proxy and inspection**, turn on **Allow Secure Web Gateway to proxy traffic**.
3. Select **TCP**.
4. Select **UDP** (required to proxy traffic to internal DNS resolvers).
5. (Recommended) To proxy traffic for diagnostic tools such as `ping` and `traceroute`, select **ICMP**. You may also need to [update your system](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#icmp) to allow ICMP traffic through `cloudflared`.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Turn on the TCP and/or UDP proxy using the [cloudflare\_zero\_trust\_device\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fsettings) resource:  
```  
resource "cloudflare_zero_trust_device_settings "global_warp_settings" {  
  account_id            = var.cloudflare_account_id  
  gateway_proxy_enabled = true  
  gateway_udp_proxy_enabled = true  
}  
```

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#3-route-private-network-ips-through-the-cloudflare-one-client). For more information on how Gateway forwards traffic, refer to [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/).

Your devices must also forward the following traffic to Cloudflare:

* Initial resolved IPs:  
   * **IPv4**: `100.80.0.0/16`  
   * **IPv6**: `2606:4700:0cf1:4000::/64`
* DNS queries for your private hostname

Configuration steps vary depending on your [device on-ramp](#device-connectivity):

Cloudflare One Clients

1. In your WARP [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/), configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) such that the initial resolved IPs route through the WARP tunnel. Configuration depends on your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode):  
   * **Exclude mode**: Delete `100.64.0.0/10` from your Split Tunnels list. We recommend [adding back the IP ranges](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) that are not explicitly used for Cloudflare One services. This reduces the risk of conflicts with existing private network configurations that may use the CGNAT address space.  
   * **Include mode**: Add Split Tunnel entries for the following IP addresses:  
         * **IPv4**: `100.80.0.0/16`  
         * **IPv6**: `2606:4700:0cf1:4000::/64`
2. In [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/), delete the top-level domain for your private hostname. This configures WARP to send the DNS query to Cloudflare Gateway for resolution.

Cloudflare Mesh

1. In your [mesh node device profile](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/), ensure that the initial resolved IP listed above route through the tunnel.
2. Depending on where you installed the mesh node, you may also need to route those destination IPs through the node and point your DNS resolver to Cloudflare Gateway. Refer to [Routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/).

Cloudflare WAN

1. Ensure that the initial resolved IP listed above [route through Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/) to Cloudflare.
2. [Point the DNS resolver](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/#dns-filtering) for your Cloudflare WAN network to Cloudflare Gateway.

### 1\. Connect the application to Cloudflare

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
5. Select **Save tunnel**.
6. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
7. Once the command has finished running, your connector will appear in Cloudflare One.  
![Connector appearing in the UI after cloudflared has run](https://developers.cloudflare.com/_astro/connector.BnVS4T_M_ZxLFu6.webp)
8. Select **Next**.
1. In the **Hostname routes** tab, enter the fully qualified domain name (FQDN) that represents your application (for example, `wiki.internal.local`).  
Hostname format restrictions  
   * **Character limit:** Must be less than 255 characters.  
   * **Supported wildcards:** A single wildcard (`*`) is allowed, and it must represent a full DNS label. Example: `*.internal.local`  
   * **Unsupported wildcards:** The following wildcard formats are not supported:  
         * Partial wildcards such as `*-dev.internal.local` or `dev-*.internal.local`.  
         * Wildcards in the middle, such as `foo*bar.internal.local` or `foo.*.internal.local`.  
         * Multiple wildcards in the hostname, such as `*.*.internal.local`.  
   * **Wildcard trimming**: Leading wildcards (`*`) are trimmed off and an implicit dot (`.`) is assumed. For example, `*.internal.local` is saved as `internal.local` but will match all subdomains at the wildcard level (covers `foo.internal.local` but not `foo.bar.internal.local`).  
   * **Dot trimming:** Leading and ending dots (`.`) are allowed but trimmed off.
2. Select **Complete setup**.

### 2\. Configure DNS resolution

When Gateway receives a request for your private hostname, it must resolve the hostname to a private IP address. There are two ways to configure this, depending on your network topology.

#### Scenario A: Use the system resolver (Default)

By default, `cloudflared` uses the private DNS resolver configured on its host machine (for example, in `/etc/resolv.conf` on Linux).

If the machine running `cloudflared` can already resolve `wiki.internal.local` to its private IP using the local system resolver, no further configuration is required. You can skip to [Step 3](#3-recommended-filter-network-traffic-with-gateway).

#### Scenario B: Use a specific private DNS server (Advanced)

If you need `cloudflared` to use a specific internal DNS server that is different from the host's default resolver, you must explicitly connect that DNS server to Cloudflare via an [IP/CIDR route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/). You will also need to configure a [Gateway resolver policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to route queries to this specific private DNS server.

1. To create an IP/CIDR route for the DNS server:  
   1. Go to **Networks** \> **Routes** \> **CIDR**.  
   2. Select **Add CIDR route**.  
   3. Enter the private IP address of your internal DNS resolver.  
   4. Select the Cloudflare Tunnel that connects to the network where this DNS server resides.  
   5. Select **Create**.
2. To create a resolver policy:  
   1. Go to **Traffic policies** \> **Resolver policies**.  
   2. Select **Create a policy**.  
   3. Create an expression that matches the private hostname:  
   | Selector | Operator | Value               |  
   | -------- | -------- | ------------------- |  
   | Host     | in       | wiki.internal.local |  
   4. Under **Configure custom DNS resolvers**, enter the private IP address of your internal DNS server.  
   5. From the dropdown menu, select the `- Private` routing option and the [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) assigned to the tunnel you selected in the previous step.  
   6. Select **Create policy**.

### 3\. (Recommended) Filter network traffic with Gateway

By default, all devices enrolled in your Zero Trust organization can connect to your private network through Cloudflare Tunnel. You can configure Gateway to inspect your network traffic and either block or allow access based on user identity and device posture. To learn more about policy design, refer to [Secure your first application](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/).

To prevent Cloudflare One Client users from accessing your entire private network, we recommend creating a [catch-all Gateway block policy](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/#catch-all-policy) for your private IP space. You can then layer on higher priority Allow policies (in either Access or Gateway) which grant users access to specific applications or IPs.

#### Option 1: Access application (recommended)

You can create an [Access self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) for your private hostname and configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) within that application. This option allows you to manage user access alongside your SaaS and other web apps.

#### Option 2: Gateway firewall policies

If you prefer to secure the application using a traditional firewall model, you can build Gateway network policies using the [SNI](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#sni) or [SNI Domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#sni-domain) selector. For an additional layer of protection, add a Gateway DNS policy to allow or block the [Host](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#host) or [Domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#domain) from resolving.

Example network policies

The following example consists of two policies: the first allows specific users to reach your application, and the second blocks all other traffic.

1. Allow company employees

| Selector   | Operator      | Value               | Logic | Action |
| ---------- | ------------- | ------------------- | ----- | ------ |
| SNI        | in            | wiki.internal.local | And   | Allow  |
| User Email | matches regex | .\*@example.com     |       |        |

1. Catch-all block policy

| Selector       | Operator | Value      | Action |
| -------------- | -------- | ---------- | ------ |
| Destination IP | in       | 10.0.0.0/8 | Block  |

Example DNS policy

| Selector   | Operator      | Value               | Logic | Action |
| ---------- | ------------- | ------------------- | ----- | ------ |
| Host       | in            | wiki.internal.local | And   | Allow  |
| User Email | matches regex | .\*@example.com     |       |        |

SNI selector limitations

By default, SNI selectors only apply to HTTPS traffic on port `443`. To inspect traffic on every port, turn on [protocol detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) and choose to [inspect on all ports](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports).

Additionally, SNI selectors will only apply to Cloudflare One Client traffic. If your users will be connecting from other [on-ramps](#device-connectivity), you can allow or block network traffic using the [Destination IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#destination-ip) selector instead of SNI.

### 4\. Test the connection

End users can now reach the application by going to its private hostname. For example, to connect to a private web application, open a browser and go to `wiki.internal.local`.

#### Troubleshooting

If you cannot connect, verify the following:

1. **Confirm DNS resolution** \- From the device, confirm that you can successfully resolve the private hostname:  
Terminal window  
```  
nslookup wiki.internal.local  
```  
```  
Server:    127.0.2.2  
Address:  127.0.2.2#53  
Non-authoritative answer:  
Name:  wiki.internal.local  
Address: 100.80.200.48  
```  
The query should resolve using [WARP's DNS proxy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#dns-traffic) and return a Gateway initial resolved IP. If the query fails to resolve or returns a different IP, check your [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) configuration and [Gateway resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/).
2. **Check Gateway logs** \- Review your [Gateway network logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) to see if the connection is being blocked by a policy.
3. **Verify tunnel status** \- Confirm that your tunnel is healthy and connected by checking [tunnel status](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/).
4. **Test connectivity to initial resolved IP** \- When you connect to the application using its private hostname, the device should make a connection to the initial resolved IP:  
Terminal window  
```  
curl -v4 http://wiki.internal.local  
```  
```  
* Trying 100.80.200.48:80...  
* Connected to wiki.internal.local (100.80.200.48) port 80  
...  
```  
If the request fails, confirm that the initial resolved IP [routes through the WARP tunnel](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/). You can also check your [tunnel logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) to confirm that requests are routing to the application's private IP.

## Limitations

### Google Chrome restricts access to private hostnames

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/#page","headline":"Connect a private hostname · Cloudflare One docs","description":"Connect a private hostname in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/","name":"Connect with cloudflared"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/","name":"Connect a private hostname"}}]}
```
