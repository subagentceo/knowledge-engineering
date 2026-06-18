---
title: Connect an IP/CIDR
description: Connect an IP/CIDR in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect an IP/CIDR

This guide covers how to enable secure remote access to private IP addresses using `cloudflared` and the Cloudflare One Client. You can connect an entire private network, a subnet, or an application defined by a static IP.

## 1\. Connect the server to Cloudflare

To connect your infrastructure with Cloudflare Tunnel:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. [Create a new tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or edit an existing `cloudflared` tunnel.
1. In the **CIDR** tab for the tunnel, enter the IP/CIDR range that you wish to route through the tunnel (for example, `10.0.0.1` or `10.0.0.0/8`).
2. (Optional) Under **Additional settings**, select a [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) for this tunnel route. This step is only needed if the route's IP/CIDR range overlaps with another route in your account. If you do not select a virtual network, the IP route will be assigned to the `default` network.  
Note  
To create a new virtual network, select **Manage virtual networks**.

## 2\. Set up the client

To connect your devices to Cloudflare:

1. [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your devices in Traffic and DNS mode or [generate a proxy endpoint](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) and deploy a PAC file.
2. [Create device enrollment rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to determine which devices can enroll to your Zero Trust organization.

## 3\. Route private network IPs through the Cloudflare One Client

By default, WARP excludes traffic bound for [RFC 1918 space ↗](https://datatracker.ietf.org/doc/html/rfc1918), which are IP addresses typically used in private networks and not reachable from the Internet. In order for the Cloudflare One Client to send traffic to your private network, you must configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that the IP/CIDR of your private network routes through the Cloudflare One Client.

1. First, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include** mode.
2. Edit your Split Tunnel routes depending on the mode:  
   * [ Exclude IPs and domains ](#tab-panel-7286)  
   * [ Include IPs and domains ](#tab-panel-7287)  
If you are using **Exclude** mode:  
a. [Delete the route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#remove-a-route) containing your private network's IP/CIDR range. For example, if your network uses the default AWS range of `172.31.0.0/16`, delete `172.16.0.0/12`.  
b. [Re-add IP/CIDR ranges](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) that are not explicitly used by your private network. For the AWS example above, you would add new entries for `172.16.0.0/13`, `172.24.0.0/14`, `172.28.0.0/15`, and `172.30.0.0/16`. This ensures that only traffic to `172.31.0.0/16` routes through the Cloudflare One Client.  
You can use the following calculator to determine which IP addresses to re-add:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
Calculator instructions  
   1. In **Base CIDR**, enter the RFC 1918 range that you deleted from Split Tunnels.  
   2. In **Subtracted CIDRs**, enter the IP/CIDR range used by your private network.  
   3. Re-add the calculator results to your Split Tunnel Exclude mode list.  
By tightening the private IP range included in the Cloudflare One Client, you reduce the risk of breaking a user's [access to local resources](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion).  
If you are using **Include** mode:  
   1. Add the required [Zero Trust domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-domains) or [IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-ip-addresses) to your Split Tunnel include list.  
   2. [Add a route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to include your private network's IP/CIDR range.

## 4\. (Recommended) Filter network traffic with Gateway

By default, all devices enrolled in your Zero Trust organization can connect to your private network through Cloudflare Tunnel. You can configure Gateway to inspect your network traffic and either block or allow access based on user identity and device posture. To learn more about policy design, refer to [Secure your first application](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/).

### Enable the Gateway proxy

* [ Dashboard ](#tab-panel-7284)
* [ Terraform (v5) ](#tab-panel-7285)

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

### Zero Trust policies

To prevent Cloudflare One Client users from accessing your entire private network, we recommend creating a [catch-all Gateway block policy](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/#catch-all-policy) for your private IP space. You can then layer on higher priority Allow policies (in either Access or Gateway) which grant users access to specific applications or IPs.

If you have applications clearly defined by IPs or hostnames, we recommend [creating an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) and managing user access alongside your SaaS and other web apps. Alternatively, if you prefer to secure a private network using a traditional firewall model, you can build Gateway network and DNS policies for IP ranges and domains.

For more information on building Gateway policies, refer to [Secure your first application](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/create-policy/) and [Common network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies/#restrict-access-to-private-networks).

## 5\. Connect as a user

End users can now reach HTTP or TCP-based services on your network by visiting any IP address in the range you have specified.

To allow users to reach the service using its private hostname instead of its IP, refer to [Private DNS](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/private-dns/).

### Troubleshooting

#### Device configuration

To check that their device is properly configured, the user can visit `https://help.teams.cloudflare.com/` to ensure that:

* The page returns **Your network is fully protected**.
* In **HTTP filtering**, both **WARP** and **Gateway Proxy** are enabled.
* The **Team name** matches the Zero Trust organization from which you created the tunnel.

#### Router configuration

Check the local IP address of the device and ensure that it does not fall within the IP/CIDR range of your private network. For example, some home routers will make DHCP assignments in the `10.0.0.0/24` range, which overlaps with the `10.0.0.0/8` range used by most corporate private networks. When a user's home network shares the same IP addresses as the routes in your tunnel, their device will be unable to connect to your application.

To resolve the IP conflict, you can either:

* Reconfigure the user's router to use a non-overlapping IP range. Compatible routers typically use `192.168.1.0/24`, `192.168.0.0/24` or `172.16.0.0/24`.
* Tighten the IP range in your Split Tunnel configuration to exclude the `10.0.0.0/24` range. This will only work if your private network does not have any hosts within `10.0.0.0/24`.
* Change the IP/CIDR of your private network so that it does not overlap with a range commonly used by home networks.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/#page","headline":"Connect an IP/CIDR · Cloudflare One docs","description":"Connect an IP/CIDR in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/","name":"Connect with cloudflared"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/","name":"Connect an IP/CIDR"}}]}
```
