---
title: Ubiquiti
description: Integrate Ubiquiti with Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Ubiquiti

Connect a Ubiquiti UniFi Gateway to Cloudflare's network using Cloudflare WAN (formerly Magic WAN). These steps use the Cloud Gateway Max (UCG-Max) but work with other UniFi gateways supporting route-based IPsec (Internet Protocol Security) VPNs (Virtual Private Networks), like the Dream Machine series.

## Prerequisites

* Cloudflare account with Cloudflare WAN enabled (contact your account team)
* UniFi Cloud Gateway or Dream Machine with IPsec support
* UniFi Network Application (self-hosted or cloud)
* Static public IP from your ISP
* Admin access to both Cloudflare and UniFi
* Gather a **Magic Anycast IPv4** address from the **Leased IPs** section in the dashboard  
   * [ Go to **Address space** ](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space)  
   * Contact your account team if you do not see any IP addresses listed.

## 1\. Configure Cloudflare WAN

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Cloudflare WAN**, and select **Create**.
1. Select **IPsec tunnel** \> **Next**, and fill in the following settings:  
   * **Name**: `unifi-gw-primary`  
   * **IPv4 Interface Address**: `10.252.2.28/31` or refer to the [Tunnel endpoints documentation](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/)  
   * **Customer Endpoint**: This should be your UniFi Gateway's WAN IP (for example, `203.0.113.10`)  
   * **Cloudflare Endpoint**: This should be one of the IPv4 addresses gathered from Leased IPs.  
   * Under **Tunnel Health checks**, select:  
         * **Health check rate**: Set to desired level  
         * **Health check type**: _Request_  
         * **Health check direction**: _Bidirectional_  
         * **Health check target**: _Default_  
   * Under **Pre-shared key**:  
         * Select **Add pre-shared key later**. This key will be given during the UniFi site-to-site VPN configuration.

## 2\. Configure site-to-site VPN on UniFi

1. In UniFi Network, go to **Settings** \> **VPN** \> **Site-to-Site VPN**.
2. Select **Create New**.
3. Configure the following settings:  
   * **VPN Type:** `IPsec`.  
   * **Name:** `Cloudflare-Magic-WAN`.  
   * **Pre-shared key:** Copy this key. You need it for the IPsec tunnel.  
   * **Local IP:** Select the WAN interface (for example, `WAN1`).  
   * **Remote IP:** Enter the Cloudflare endpoint IP from [Step 1](#1-configure-cloudflare-wan).  
   * **VPN Method:** Route Based.  
   * **Tunnel IP:** `10.252.2.29/31` or refer to the [Tunnel endpoints documentation](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/).  
   * **Remote Networks:** Inside Cloudflare tunnel address (for example, `10.252.2.28/31`) and other remote subnets to access through Cloudflare WAN.
4. Set Advanced settings:  
   * **Key Exchange Version**: IKEv2.  
   * **IKE Encryption**: AES-256.  
   * **IKE Hash**: SHA256.  
   * **IKE DH Group**: 14.  
   * **IKE Lifetime**: 28800.  
   * **ESP Encryption**: AES-256.  
   * **ESP Hash**: SHA256.  
   * **ESP DH Group**: 14.  
   * **ESP Lifetime**: 28800.  
   * **PFS**: Enabled.  
   * **Local Authentication ID**: Auto.  
   * **Remote Authentication ID**: Uncheck **Auto**, and enter the Cloudflare Endpoint IP from [Step 1](#1-configure-cloudflare-wan).  
   * **MTU**: 1436.
5. Select **Apply**

## 3\. Add pre-shared key to Cloudflare

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/), and go to **Networks**.
2. In **Cloudflare WAN**, find the IPsec tunnel you have just created.
1. Select your tunnel and then **Edit**.
2. Paste the preshared key from [Step 2](#2-configure-site-to-site-vpn-on-unifi).
3. Select **Save**.

## 4\. Configure Routes

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Routes** \> **WAN routes** \> **Create**.
1. Enter the following settings:  
   * **Prefix**: Your local network (for example, `192.168.1.0/24`).  
   * **Tunnel/Next hop**: Select your tunnel.  
   * **Priority**: `100`.
2. Select **Add routes** to add your static route.

## Verify connections

Wait a few minutes, then access both Cloudflare and UniFi to verify the tunnel's status:

Cloudflare

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/), and go to **Insights**.
2. Go to **Network visibility** \> **WAN connector health**.
3. Find the tunnel you have just created and make sure its status shows **Up**. Refer to [Check tunnel health in the dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard/) for more information.

UniFi

Go to **Settings** \> **VPN**, and make sure the status is **Connected**.

## Troubleshooting

**Tunnel down:**

* Verify Peer IP, pre-shared key, and IPsec settings match on both sides
* Check that the ISP is not blocking UDP ports `500`/`4500`

**Traffic not routing:**

* Verify Remote Subnets setting in UniFi VPN configuration
* Check firewall rules are not blocking VPN traffic

**Health check fails:**

* Allow ICMP from Cloudflare to the customer-side tunnel IP
* Target should be the `/31` interface IP, not your LAN gateway

## Policy-based routing

To route only specific devices through Cloudflare (UniFi Network Application):

1. Remove unnecessary routes from Remote Subnets in your VPN configuration.
2. Go to **Settings** \> **Policy Table**.
3. Under **Policy Engine** select **Create New Policy** with the following settings:  
   * Select `Route`.  
   * **Name**: Provide a name for the policy.  
   * **Type**: _Policy-Based_.  
   * **Interface/VPN Tunnel**: Select the VPN Tunnel (for example, `Cloudflare-Magic-WAN`).  
   * **Kill Switch**: _Enabled_ (recommended).  
   * **Source**: Select `Device/Network` and then choose the Device(s) or Network(s).  
   * **Destination**: _Any_.  
   * **Interface**: Your VPN tunnel.

## Next Steps

* Use [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) for network policies.
* Configure a second tunnel for redundancy.
* Monitor traffic in the Cloudflare WAN dashboard.

---

You are now routing traffic through Cloudflare's network using Cloudflare WAN.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/ubiquiti/#page","headline":"Ubiquiti · Cloudflare One docs","description":"Integrate Ubiquiti with Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/ubiquiti/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPsec"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/","name":"Third-party integration"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/ubiquiti/","name":"Ubiquiti"}}]}
```
