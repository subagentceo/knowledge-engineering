---
title: Cloudflare One Client with legacy VPNs
description: Reference information for Cloudflare One Client with legacy VPNs in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare One Client with legacy VPNs

The Cloudflare One Client (formerly WARP) can run alongside most legacy third-party VPNs. However, both the Cloudflare One Client and your VPN try to control the same things on the device: which traffic goes where (routing), which DNS server answers queries, and which firewall rules apply. To prevent conflicts, you must split these responsibilities between the two products:

* IP traffic is split tunneled between the Cloudflare One Client and the VPN. All VPN traffic must bypass the Cloudflare One Client and vice versa.
* The VPN bypasses/allows/excludes all domains, IPs, and ports listed in [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).
* DNS resolution is handled by either the Cloudflare One Client or the VPN. You must disable DNS filtering in one of the two products.

For the most stable and consistent connection, we recommend connecting your [private network or individual applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) to Cloudflare instead of using a legacy VPN. However, until you can migrate, the following guidelines will help get your Zero Trust deployment up and running.

## Traffic and DNS mode

In [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-and-dns-mode-default), the Cloudflare One Client must be allowed to capture and route all DNS traffic on the device. You can use [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) to send DNS requests to a server behind your third-party VPN or firewall, but the request must first go through the client's local DNS proxy. Refer to [client architecture](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/) for more information about this requirement.

If you cannot disable DNS on your VPN, switch to [Traffic only mode](#secure-web-gateway-without-dns-filtering) mode to disable DNS in the Cloudflare One Client.

### 1\. Configure the VPN

Perform these steps in your third-party VPN software. Refer to your VPN's documentation for specific instructions on how to configure these settings.

1. Enable split tunneling in the third-party VPN.
2. Disable DNS configuration in the third-party VPN.

### 2\. Configure WARP

Perform these steps in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.

1. Set your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) to **Exclude IPs and domains**.
2. [Add the following entries](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to your Split Tunnel Exclude list:  
   * Private IP address range exposed by your third-party VPN client. For example,  
   | Selector   | Value         |  
   | ---------- | ------------- |  
   | IP Address | 172.16.0.0/12 |  
   * Server that your third-party VPN client connects to. For example,  
   | Selector | Value                                                         |  
   | -------- | ------------------------------------------------------------- |  
   | Domain   | \*.cvpn-endpoint-xxxxx.prod.clientvpn.us-west-2.amazonaws.com |
1. (Optional) In [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/), add the domains that you want to resolve using your VPN's private DNS servers. For example,  
| Domain                 | DNS Servers                  |  
| ---------------------- | ---------------------------- |  
| internal.wiki.intranet | 172.31.26.130, 172.31.23.120 |

You can now [test](#test-the-configuration) if WARP runs alongside the VPN.

## Traffic only mode

In [Traffic only mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-only-mode), the Cloudflare One Client only controls IP routing — it does not manage DNS. This is the simpler option when your VPN must retain DNS control, because you only need to split tunnel IP traffic.

### 1\. Configure the VPN

Enable split tunneling in your third-party VPN software. Refer to your VPN's documentation for specific instructions on how to configure this setting.

### 2\. Configure WARP

Perform these steps in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.

1. Set your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) to **Exclude IPs and domains**.
2. [Add the following entries](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to your Split Tunnel Exclude list:  
   * Private IP address range exposed by your third-party VPN client. For example,  
   | Selector   | Value         |  
   | ---------- | ------------- |  
   | IP Address | 172.16.0.0/12 |  
   * Server that your third-party VPN client connects to. For example,  
   | Selector | Value                                                         |  
   | -------- | ------------------------------------------------------------- |  
   | Domain   | \*.cvpn-endpoint-xxxxx.prod.clientvpn.us-west-2.amazonaws.com |
1. In your device profile, verify that **Service mode** is set to **Traffic only mode**.

## Test the configuration

We recommend enabling the Cloudflare One Client before enabling your third-party VPN. Some third-party VPNs must be the last to edit a network's configuration or they will fail.

1. Connect the Cloudflare One Client.
2. Connect the third-party VPN client.
3. To test your Split Tunnel configuration, connect to a private IP address that is behind the VPN. For example, you can open a terminal and run `ping <SERVER-IP>`.
4. To test your DNS configuration, connect to an internal domain that is behind the VPN. For example, you can open a browser and go to `internal.wiki.intranet`.

Test before updates

Once you have a configuration in place and working, make sure to thoroughly test compatibility before updating your VPN software. Compatibility testing with what are essentially competing software will need to be done with each new version.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/vpn/#page","headline":"Cloudflare One Client with legacy VPNs · Cloudflare One docs","description":"Reference information for Cloudflare One Client with legacy VPNs in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/vpn/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks","DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/vpn/","name":"Cloudflare One Client with legacy VPNs"}}]}
```
