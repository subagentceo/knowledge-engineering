---
title: Routed subnets
description: Learn how to configure routed subnets on a Connector, including setting static routes and next-hop addresses for complex LAN setups.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Routed subnets

Each LAN interface (physical port + VLAN tag) on Cloudflare One Appliance (formerly Magic WAN Connector) is part of a _directly-attached subnet_ — a subnet that the Appliance connects to directly. When you specify a static address for the LAN interface, you indicate both the interface's address and the subnet it attaches to. For example, `192.168.100.13/24` means the LAN interface has the IP address `192.168.100.13`, and is part of the subnet `192.168.100.0/24`.

Some LANs have additional subnets behind Layer 3 routers that sit between those subnets and the Cloudflare One Appliance. These are routed subnets — the Appliance does not connect to them directly but can reach them through a next-hop router. You need to configure routed subnets so that Cloudflare installs the correct routes to forward traffic to the right Appliance and LAN interface.

Refer to the following diagram for an example of how this might work:

Note

Blue represents directly-attached subnets, and red represents routed subnets.


	flowchart TB
	accTitle: Routed subnets
	accDescr: Some LANs are complex, and might have additional subnets behind L3 routers.

	a((WAN)) --> b

	subgraph b [Cloudflare One Appliance]
	direction TB
	c(LAN 1)
	d(LAN n)
	end

	c --- e(subnet x):::blue
	d --- f(subnet 192.168.100.0/24):::blue

	f---|192.168.100.10|g(Layer 3 router)

	g --- h(routed subnet y):::red
	g --- i(192.168.200.0/24):::red
	g --- j(layer 3 router)
	j --- k(routed subnet z):::red

	classDef blue fill:#add8e6,color: black
	classDef red fill:#ff6900,color: black

  
To add a routed subnet to your LAN, you need:

* **A prefix**: The subnet's CIDR prefix; Cloudflare will automatically install static routes to this prefix in our global network (to forward [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) for this subnet to the right Cloudflare One Appliance), and in your Cloudflare One Appliance (to forward packets for this subnet to the right LAN interface). In the figure above, the routed subnet in the center has the prefix `192.168.200.0/24`.
* **A next-hop address**: The address of the L3 router to which the Cloudflare One Appliance should forward packets for this subnet. In the figure, the routed subnet in the center has the next-hop address `192.168.100.10`.

Optionally, you can also [enable NAT for a subnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/nat-subnet/) by providing a static overlay prefix.

## Create routed subnets

For instructions on creating routed subnets, refer to **Create a LAN** in either [Configure hardware Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-hardware-appliance/#create-a-lan) or [Configure Virtual Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-virtual-appliance/#create-a-lan).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/routed-subnets/#page","headline":"Routed subnets · Cloudflare One docs","description":"Learn how to configure routed subnets on a Connector, including setting static routes and next-hop addresses for complex LAN setups.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/routed-subnets/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/routed-subnets/","name":"Routed subnets"}}]}
```
