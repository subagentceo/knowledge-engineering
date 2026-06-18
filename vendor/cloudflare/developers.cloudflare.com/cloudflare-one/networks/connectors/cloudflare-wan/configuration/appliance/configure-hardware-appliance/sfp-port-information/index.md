---
title: SFP+ port information
description: Reference information for SFP+ port information in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SFP+ port information

The hardware version of Cloudflare One Appliance (formerly Magic WAN Connector) includes two [SFP+ ports ↗](https://en.wikipedia.org/wiki/Small%5FForm-factor%5FPluggable) that support 10G throughput. These ports can be configured as either a WAN or a LAN port, like all of the 1G RJ45 ports in the machine. Because a 10G WAN uplink will often be bottlenecked by IPsec tunnel speeds, the SFP+ ports are most useful for configuring high speed LANs, and for using fiber connections.

Virtual Appliance and SFP+ ports

Since you decide and set up the hardware where Virtual Appliance runs, you can ignore the information on this page.

## Port configuration

SFP+ ports are next to the regular LAN ports. They are represented as follows in the dashboard:

* SFP+ **port 1** is represented by **port 7** in the dashboard
* SFP+ **port 2** is represented by **port 8** in the dashboard
![The left port, SFP+ 1, is port 7. The right port, SFP+ 2, is port 8.](https://developers.cloudflare.com/_astro/sfp-ports.B7f8iPPa_ZGbggv.webp) 

_The left port, SFP+ 1, is port 7\. The right port, SFP+ 2, is port 8._

## SFP+ module compatibility

Cloudflare One Appliance only supports 10Gbps SFP+ modules, including RJ45, DAC, and fiber, among others. Many 1 Gbps modules are incompatible with the Intel driver used internally, and thus are not supported.

Cloudflare supports the following SFP+ inputs:

* 10 Gbps Intel-compatible optics using 10GBase-SR, LR, ER. This includes Intel-compatible active optical cables (AOC) cables at 10 Gbps.
* 10 Gbps DAC Twinax cables, compatible with SFF-8431 v4.1 and SFF-8472 v10.4
* 10GBASE-T RJ45 converter modules

Cloudflare successfully deployed commonly available 10G modules that are also compatible across many vendors:

* StarTech Dell EMC Twinax SFP+ DAC
* Ubiquiti multi-mode, duplex, 10 Gbps fiber transceiver modules

Keep in mind that SFP+ modules/cables have to be compatible at both ends, that is, both sides of the connection should be 10 Gbps, and it should really be the same module/cable that is compatible with both hardware stacks. The choice of module/optic/cable ultimately depends on your specific interoperability needs, and it is much less of a "plug and play" situation as one expects from RJ45.

## Recover from unsupported SFP+ inputs

SFP+ modules should be installed and tested prior to deploying Cloudflare One Appliance into production usage.

An unsupported SFP+ input is indicated by the interface failing to come up (that is, the Cloudflare One Appliance has no status lights), and also by the port (7 or 8) going offline until the hardware is rebooted.

When an unsupported module is plugged, the module should be removed and then the Cloudflare One Appliance rebooted by removing power for five seconds. The module should not remain plugged during reboot, or the Cloudflare One Appliance will have to be rebooted again after the module is removed.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-hardware-appliance/sfp-port-information/#page","headline":"SFP+ port information · Cloudflare One docs","description":"Reference information for SFP+ port information in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-hardware-appliance/sfp-port-information/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-hardware-appliance/","name":"Configure hardware Connector"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-hardware-appliance/sfp-port-information/","name":"SFP+ port information"}}]}
```
