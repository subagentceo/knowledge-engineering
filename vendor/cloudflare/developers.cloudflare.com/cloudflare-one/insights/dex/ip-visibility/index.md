---
title: IP visibility
description: Reference information for IP visibility in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IP visibility

Feature availability

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.1.861.0           |
| macOS    | ✅            | 2025.1.861.0           |
| Linux    | ✅            | 2025.1.861.0           |
| iOS      | ❌            |                        |
| Android  | ❌            |                        |
| ChromeOS | ❌            |                        |

DEX's IP visibility gives administrators insight into three different IP types per device:

1. **Device**: The private IP address of an end-user device.
2. **ISP**: The public IP that the ISP assigns when it routes the end-user device's traffic.
3. **Gateway**: The router's private IP (the router the end device is connected to.)

Note

The ISP IP is only visible to users with the [Zero Trust PII role](https://developers.cloudflare.com/cloudflare-one/roles-permissions/#cloudflare-zero-trust-pii).

DEX's IP visibility supports both IPv6 and IPv4 addresses.

IP information helps IT administrators troubleshoot network issues and identify device locations. Common uses include:

* Identifying which access point or network segment a user is connected to
* Verifying that network access control (NAC) policies are applied correctly
* Diagnosing firewall restrictions on specific VLANs (virtual local area networks)
* Troubleshooting Layer 2 (data link layer) and DHCP (Dynamic Host Configuration Protocol) issues
* Indirectly determining user identity and device location

## View a device's IP information

To view IP information for a user device:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Team & Resources** \> **Devices** \> **Your devices**.
2. Select a device, then select **View details**.
3. Go to **IP details**.
4. Review the IP details for your selected device's most recent session.

## View a device's IP history

DEX's IP visibility allows you to review an event log of a device's IP history for the last seven days. To view a device's IP history:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Team & Resources** \> **Devices** \> **Your devices**.
2. Select a device > **View details** \> go to **IP details**.
3. Select **View all ISPs**.

## Troubleshoot with IP visibility

While IP visibility allows you to inspect a device's IP information, use [DEX's live analytics](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#available-metrics) to review which Cloudflare data center the device is connected to. When traffic leaves a Cloudflare One Client-connected end-user device, it will hit a [Cloudflare data center](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#identify-the-cloudflare-data-center-serving-your-request).

To find which Cloudflare data center a device is connected to:

1. Follow the steps listed in [View IP information](#view-a-devices-ip-history) to find a device's IP information.
2. On the device page, select **Colocation & client** or find the **Client** table at the top of the page.
3. In the **Client** table, find **Colocation** to review which Cloudflare data center your selected device's outbound (egress) traffic is routed through.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/ip-visibility/#page","headline":"IP visibility · Cloudflare One docs","description":"Reference information for IP visibility in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/ip-visibility/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPv4","IPv6","Windows","Linux","MacOS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/ip-visibility/","name":"IP visibility"}}]}
```
