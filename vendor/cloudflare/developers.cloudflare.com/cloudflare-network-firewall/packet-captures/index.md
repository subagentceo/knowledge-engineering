---
title: Packet captures
description: Capture and analyze network packets.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Packet captures

Cloudflare supports two types of packet captures (PCAPs): **full** and **sample**. A packet capture records raw network traffic data so you can inspect it offline in tools like Wireshark. Full packet captures are the default.

Note

Both capture types have a maximum runtime of 300 seconds. Refer to [Packet capture limits](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/collect-pcaps/#packet-capture-limits) for the full list of limits.

## Sample packet captures

Use sample packet captures when you want to inspect recent traffic quickly. Packet captures query historical traffic that has already passed through Cloudflare's network — not new traffic — so they complete immediately after you start them.

You can view sample captures in the Cloudflare dashboard. They only include the first 160 bytes of each packet, which is useful for capturing packet headers but will not provide detailed packet data. Cloudflare collects this data across all of its data centers and assembles it into a PCAP file, giving you a global view of traffic across the network.

Use full packet captures instead if you need complete packet payloads, or if the traffic you want to capture occurs infrequently.

## Full packet captures

Full packet captures actively monitor Cloudflare's network for new traffic that matches filters you configure. Unlike sample captures, they capture packets that arrive after the capture starts, not historical data.

Full captures include the complete packet data, not just headers. The matching packet data is saved directly to a cloud storage bucket that you own and configure. You cannot view it in the Cloudflare dashboard. You can download the resulting PCAP file and analyze it in Wireshark or another packet capture tool.

Before starting a full packet capture, make sure you have a cloud storage bucket set up and configured. Refer to the articles in this section for setup instructions.

* [ PCAPs bucket setup ](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/pcaps-bucket-setup/)
* [ Collect PCAPs ](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/collect-pcaps/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/#page","headline":"Packet captures · Cloudflare Network Firewall docs","description":"Capture and analyze network packets.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/packet-captures/","name":"Packet captures"}}]}
```
