---
title: Get started
description: Get started for Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Cloudflare WAN (formerly Magic WAN) allows you to achieve any-to-any connectivity across branch and retail sites and data centers, with the Cloudflare connectivity cloud.

If you are migrating from MPLS or a traditional WAN, refer to [WAN transformation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/wan-transformation/) to compare approaches and plan an incremental migration.

## Before you begin

Cloudflare WAN is an Enterprise-only product. [Contact Cloudflare ↗](https://www.cloudflare.com/magic-wan/) to acquire Cloudflare WAN. If you plan on using Cloudflare One Appliance to automatically onboard your locations to Cloudflare, you will need to purchase Cloudflare WAN first.

## Set up method

Cloudflare WAN supports an automatic setup and a manual setup. The automatic setup through Cloudflare One Appliance is the preferred method.

### Automatic setup

Setting up Cloudflare WAN automatically is done through Cloudflare One Appliance, and is the preferred method. You can choose between the hardware version and the virtual version of Cloudflare One Appliance. The virtual version can be installed on your own machines.

If you plan on using Cloudflare One Appliance, you can skip the prerequisites below, and refer to [Configure with Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/) for more information on how to continue.

### Manual setup

Setting up Cloudflare WAN manually is done through a combination of third-party devices in your premises and the Cloudflare dashboard. To be successful, you need to:

1. Read the [Prerequisites](#prerequisites) below.
2. Follow the steps in [Manual configuration](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/).

## Prerequisites

Note

The list of prerequisites below is only for customers planning to connect manually to Cloudflare with a third-party device. If you plan on using Cloudflare One Appliance, skip this section and refer to [Configure with Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/).

### Use compatible tunnel endpoint routers

Cloudflare WAN relies on [GRE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/gre-ipsec-tunnels/) and [IPsec tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/gre-ipsec-tunnels/#ipsec-tunnels) to transmit [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) from Cloudflare's global network to your origin network. To ensure compatibility with Cloudflare WAN, the routers at your tunnel endpoints must:

* Allow configuration of at least one tunnel per Internet service provider (ISP).
* Support maximum segment size (MSS) clamping.
* Support the configuration parameters for IPsec mentioned in [IPsec tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/gre-ipsec-tunnels/#supported-configuration-parameters).

### Set maximum segment size

Before enabling Cloudflare WAN, you must make sure that you set up the maximum segment size on your network. Cloudflare Cloudflare WAN uses tunnels to deliver [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) from our global network to your data centers. Cloudflare encapsulates these packets adding new headers. You must account for the space consumed by these headers when configuring the maximum transmission unit (MTU) and maximum segment size (MSS) values for your network.

#### MSS clamping recommendations

##### GRE tunnels as off-ramp

The MSS value depends on how your network is set up.

* **On your edge router**: Apply the clamp to the GRE tunnel internal interface (meaning where the egress traffic will traverse). Set the MSS clamp to 1,436 bytes. Your devices may do this automatically once the tunnel is configured, but it depends on your devices.

##### IPsec tunnels

For IPsec tunnels, the value you need to specify depends on how your network is set up. The MSS clamping value is lower than for GRE tunnels because the physical interface sees IPsec-encrypted packets, not TCP packets, and MSS clamping does not apply to those.

* **On your edge router**: Apply this on your IPsec tunnel internal interface (meaning where the egress traffic will traverse). Your devices may do this automatically once the tunnel is configured, but it depends on your devices. Set the TCP MSS clamp to 1,360 bytes maximum.

Important

Refer to your device documentation to check if it sets IPsec MSS clamping automatically. If that is not the case and you are using IPsec inside GRE, you have to set MSS clamp manually.

Refer to [Maximum transmission unit and maximum segment size](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/mtu-mss/) for more details.

### Follow router vendor guidelines

Instructions to adjust MSS by applying MSS clamps vary depending on the vendor of your router.

The following table lists several commonly used router vendors with links to MSS clamping instructions:

| Router device | URL                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cisco         | [TCP IP Adjust MSS ↗](https://www.cisco.com/en/US/docs/ios-xml/ios/ipapp/command/ip%5Ftcp%5Fadjust-mss%5Fthrough%5Fip%5Fwccp%5Fweb-cache%5Faccelerated.html#GUID-68044D35-A53E-42C1-A7AB-9236333DA8C4) |
| Juniper       | [TCP MSS - Edit System ↗](https://www.juniper.net/documentation/en%5FUS/junos/topics/reference/configuration-statement/tcp-mss-edit-system.html)                                                       |

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/get-started/#page","headline":"Get started · Cloudflare One docs","description":"Get started for Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/get-started/","name":"Get started"}}]}
```
