---
title: Device compatibility
description: Reference information for Device compatibility in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device compatibility

Cloudflare WAN (formerly Magic WAN) is compatible with any device that supports IPsec with the [supported configuration parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/gre-ipsec-tunnels/#supported-configuration-parameters) or supports GRE.

The matrix below includes example devices and links to the integration guides.

| Appliance                                                                                                                                                               | GRE tunnel                                       | IPsec tunnel                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| [Aruba EdgeConnect](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/aruba-edgeconnect/)                   | ✅                                                | ✅                                                |
| Cisco ASA                                                                                                                                                               | Compatibility on roadmap                         | Specifications compatible[1](#user-content-fn-1) |
| [Cisco IOS XE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/cisco-ios-xe/)                             | ✅                                                | ✅                                                |
| [Cisco Meraki MX (static routing)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/cisco-meraki-static/)  | \-                                               | ✅                                                |
| [Cisco SD-WAN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/viptela/)                                  | ✅                                                | ✅                                                |
| [Fortinet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/fortinet/)                                     | Specifications compatible[1](#user-content-fn-1) | ✅                                                |
| [Furukawa Electric FITELnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/fitelnet/)                   | \-                                               | ✅                                                |
| [HPE Juniper Networking SRX Series Firewalls](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/juniper/)   | Specifications compatible[1](#user-content-fn-1) | ✅                                                |
| [Palo Alto Networks Next-Generation Firewall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/palo-alto/) | Specifications compatible[1](#user-content-fn-1) | ✅                                                |
| [pfSense](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/pfsense/)                                       | ✅                                                | ✅                                                |
| Prisma SD-WAN (Palo Alto)                                                                                                                                               | Specifications compatible[1](#user-content-fn-1) | Specifications compatible[1](#user-content-fn-1) |
| Riverbed                                                                                                                                                                | Specifications compatible[1](#user-content-fn-1) | Specifications compatible[1](#user-content-fn-1) |
| [SonicWall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/sonicwall/)                                   | \-                                               | ✅                                                |
| [Sophos Firewall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/sophos-firewall/)                       | ✅                                                | ✅                                                |
| [strongSwan](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/strongswan/)                                 | \-                                               | ✅                                                |
| [Ubiquiti](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/ubiquiti/)                                     | \-                                               | ✅                                                |
| [Velocloud](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/velocloud/)                                   | \-                                               | ✅                                                |
| Versa                                                                                                                                                                   | Specifications compatible[1](#user-content-fn-1) | Compatibility on roadmap                         |
| [VyOS](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/vyos/)                                             | ✅                                                | ✅                                                |
| [Yamaha RTX Router](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/yamaha/)                              | \-                                               | ✅                                                |

| VPN                                                                                                                                                       | GRE tunnel | IPsec tunnel |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ |
| [Alibaba Cloud VPN Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/alibaba-cloud/) | \-         | ✅            |
| [Amazon AWS Transit Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/aws/)          | \-         | ✅            |
| [Azure VPN Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/azure/)                 | \-         | ✅            |
| [GCP Cloud VPN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/google/)                    | \-         | ✅            |
| [Oracle Cloud](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/oracle/)                     | \-         | ✅            |

## Footnotes

1. Specifications compatible per vendor documentation [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3) [↩4](#user-content-fnref-1-4) [↩5](#user-content-fnref-1-5) [↩6](#user-content-fnref-1-6) [↩7](#user-content-fnref-1-7) [↩8](#user-content-fnref-1-8) [↩9](#user-content-fnref-1-9)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/device-compatibility/#page","headline":"Device compatibility · Cloudflare One docs","description":"Reference information for Device compatibility in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/device-compatibility/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPsec"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/reference/","name":"Reference"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/reference/device-compatibility/","name":"Device compatibility"}}]}
```
