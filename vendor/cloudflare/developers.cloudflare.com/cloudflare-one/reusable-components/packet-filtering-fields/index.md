---
title: Packet filtering (Cloudflare Network Firewall) fields
description: Reference information for Packet filtering (Cloudflare Network Firewall) fields in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Packet filtering (Cloudflare Network Firewall) fields

Note

Some Cloudflare Network Firewall fields are available only to customers who purchased Cloudflare Network Firewall's advanced features. Refer to [Cloudflare Network Firewall plans](https://developers.cloudflare.com/cloudflare-network-firewall/plans/) for more information.

## `cf.colo.name`

`cf.colo.name` ` String `

The data center that is handling this traffic.

Example value: `sfo06`

---

## `cf.colo.region`

`cf.colo.region` ` String `

Region of the data center that is handling this traffic.

Example value: `WNAM`

---

## `icmp`

`icmp` ` String `

The raw ICMP packet as a list of bytes. It should be used in conjunction with the bit\_slice function when other structured fields are lacking.

---

## `icmp.type`

`icmp.type` ` Number `

The [ICMP type ↗](https://en.wikipedia.org/wiki/Internet%5FControl%5FMessage%5FProtocol#header%5Ftype). Only applies to ICMP packets.

Example value: `8`

---

## `icmp.code`

`icmp.code` ` Number `

The [ICMP code ↗](https://en.wikipedia.org/wiki/Internet%5FControl%5FMessage%5FProtocol#header%5Fcode). Only applies to ICMP packets.

Example value: `2`

---

## `ip`

`ip` ` String `

The raw IP packet as a list of bytes. It should be used in conjunction with the bit\_slice function when other structured fields are lacking.

---

## `ip.dst`

`ip.dst` ` IP address `

The destination address as specified in the IP packet.

Example value: `192.0.2.2`

---

## `ip.dst.country`

`ip.dst.country` ` String `

Represents the 2-letter country code associated with the server IP address in [ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) format.

Example value: `GB`

For more information on the ISO 3166-1 Alpha 2 format, refer to [ISO 3166-1 Alpha 2 ↗](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) on Wikipedia.

---

## `ip.src.country`

`ip.src.country` ` String `

Represents the 2-letter country code associated with the client IP address in [ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) format.

Example value: `GB`

For more information on the ISO 3166-1 Alpha 2 format, refer to [ISO 3166-1 Alpha 2 ↗](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) on Wikipedia.

For Cloudflare Network Firewall, the `ip.geoip.country` field (which is deprecated) will match on either source or destination address. The `ip.geoip.country` field is still available for new and existing rules, but you should use the `ip.src.country` and/or `ip.dst.country` fields instead.

---

## `ip.hdr_len`

`ip.hdr_len` ` Number `

The length of the IPv4 header in bytes.

Example value: `5`

---

## `ip.len`

`ip.len` ` Number `

The length of the packet including the header.

Example value: `60`

---

## `ip.opt.type`

`ip.opt.type` ` Number `

The first byte of [IP options field ↗](https://en.wikipedia.org/wiki/IPv4#Options), if the options field is set.

Example value: `25`

---

## `ip.proto`

`ip.proto` ` String `

The transport layer for the packet, if it can be determined.

Example values: `icmp`, `tcp`

---

## `ip.src`

`ip.src` ` IP address `

The source address of the IP Packet.

---

## `ip.src.country`

`ip.src.country` ` String `

Represents the 2-letter country code associated with the client IP address in [ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) format.

Example value: `GB`

For more information on the ISO 3166-1 Alpha 2 format, refer to [ISO 3166-1 Alpha 2 ↗](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) on Wikipedia.

---

## `ip.ttl`

`ip.ttl` ` Number `

The time-to-live of the IP Packet.

Example values: `54`

---

## `sip`

`sip` ` Boolean `

Determines if packets are valid L7 protocol [SIP ↗](https://datatracker.ietf.org/doc/html/rfc2543). Requires UDP packets to operate.

Use a guard clause as shown below to ensure the packet is UDP (wirefilter):

`ip.proto == "udp"`

---

## `tcp`

`tcp` ` String `

The raw TCP packet as a list of bytes. It should be used in conjunction with the bit\_slice function when other structured fields are lacking.

---

## `tcp.flags`

`tcp.flags` ` Number `

The numeric value of the TCP flags byte.

---

## `tcp.flags.ack`

`tcp.flags.ack` ` Boolean `

TCP acknowledgment flag.

---

## `tcp.flags.cwr`

`tcp.flags.cwr` ` Boolean `

TCP congestion window reduced flag.

---

## `tcp.flags.ecn`

`tcp.flags.ecn` ` Boolean `

TCP ECN-Echo flag.

---

## `tcp.flags.fin`

`tcp.flags.fin` ` Boolean `

TCP flag indicating this is the last packet from sender.

---

## `tcp.flags.push`

`tcp.flags.push` ` Boolean `

TCP push flag.

---

## `tcp.flags.reset`

`tcp.flags.reset` ` Boolean `

TCP reset flag.

---

## `tcp.flags.syn`

`tcp.flags.syn` ` Boolean `

TCP synchronize flag.

---

## `tcp.flags.urg`

`tcp.flags.urg` ` Boolean `

TCP urgent flag.

---

## `tcp.srcport`

`tcp.srcport` ` Number `

Source port number of the IP packet. Only applies to TCP packets.

---

## `tcp.dstport`

`tcp.dstport` ` Number `

Destination port number of the IP packet. Only applies to TCP packets.

---

## `udp`

`udp` ` String `

The raw UDP packet as a list of bytes. It should be used in conjunction with the bit\_slice function when other structured fields are lacking.

---

## `udp.dstport`

`udp.dstport` ` Number `

Destination port number of the IP packet. Only applies to UDP packets.

---

## `udp.srcport`

`udp.srcport` ` Number `

Source port number of the IP packet. Only applies to UDP packets.

---

_GeoIP is the registered trademark of MaxMind, Inc._

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/packet-filtering-fields/#page","headline":"Packet filtering fields · Cloudflare One docs","description":"Reference information for Packet filtering (Cloudflare Network Firewall) fields in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/packet-filtering-fields/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP","UDP","ICMP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/packet-filtering-fields/","name":"Packet filtering (Cloudflare Network Firewall) fields"}}]}
```
