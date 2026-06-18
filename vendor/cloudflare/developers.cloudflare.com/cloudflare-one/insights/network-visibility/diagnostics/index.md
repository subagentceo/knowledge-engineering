---
title: Diagnostics
description: Capture and analyze network packets passing through Cloudflare to diagnose connectivity and security issues.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Diagnostics

Packet captures allow you to record raw network traffic data passing through Cloudflare's network so you can inspect it offline in tools like Wireshark. This is useful for diagnosing connectivity issues, verifying firewall rules, or investigating unexpected traffic patterns.

Cloudflare supports two types of packet captures: full and sample. Full packet captures are the default behavior.

Note

The maximum packet capture runtime is 24 hours for sample and full packet captures.

## Sample packet captures

Sample packet captures collect historical data on network traffic that has already passed through Cloudflare's network. They will not collect any new traffic sent to Cloudflare's network after the packet capture has started. All sample packet captures will complete immediately after they are started because they query historical traffic data.

Sample packet captures can be viewed in the Cloudflare dashboard. They only include the first 160 bytes of each packet, which is useful for capturing packet headers but will not provide detailed packet data. The sample data is collected across all Cloudflare's data centers to build a PCAP file. This allows you to get a global picture of traffic across all data centers.

You should use full packet captures if you need to collect data on packets that pass through your network less frequently.

## Full packet captures

Full packet captures actively monitor Cloudflare's network for packets that match the selected filters, and capture the complete packet data, including the payload. The matching packet data is saved to a cloud storage bucket that is owned and configured by you. You must [configure a bucket](https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/buckets/) before starting a full packet capture.

Full packet captures will collect new traffic sent to Cloudflare's network after the packet capture has started, and include the full packet data. This type of capture cannot be viewed in the Cloudflare dashboard. You can download them from a cloud storage bucket and analyze them in Wireshark or another packet capture tool.

Refer to the articles in this section to learn how to use packet captures.

* [ Packet captures ](https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/packet-captures/)
* [ Buckets ](https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/buckets/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/#page","headline":"Diagnostics · Cloudflare One docs","description":"Capture and analyze network packets passing through Cloudflare to diagnose connectivity and security issues.","url":"https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/network-visibility/","name":"Network visibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/network-visibility/diagnostics/","name":"Diagnostics"}}]}
```
