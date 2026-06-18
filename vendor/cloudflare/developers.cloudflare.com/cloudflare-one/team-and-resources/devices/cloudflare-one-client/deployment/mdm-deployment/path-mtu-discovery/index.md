---
title: Path MTU Discovery (PMTUD)
description: How Path MTU Discovery (PMTUD) works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Path MTU Discovery (PMTUD)

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode Traffic only mode                                                                                             | All plans                                                       |

| System   | Availability | Minimum WARP version |
| -------- | ------------ | -------------------- |
| Windows  | ✅            | 2025.9.173.1         |
| macOS    | ✅            | 2025.9.173.1         |
| Linux    | ✅            | 2025.9.173.1         |
| iOS      | ❌            |                      |
| Android  | ❌            |                      |
| ChromeOS | ❌            |                      |

The [Maximum Transmission Unit (MTU) ↗](https://www.cloudflare.com/learning/network-layer/what-is-mtu/) is the largest data packet size that a device can send over a network without fragmentation. When you connect to services through the Cloudflare One Client (formerly WARP), your data is encapsulated, which adds extra headers and increases the overall packet size. On some networks, especially cellular or guest Wi-Fi networks, the network's MTU may be smaller than the Cloudflare One Client's [default packet size](#recommended-mtu). This mismatch forces packets to be fragmented or dropped entirely, leading to connection instability or complete connection failures.

The Cloudflare One Client's Path MTU Discovery (PMTUD) feature solves this problem by actively probing for the minimum MTU along the entire network path between the device and Cloudflare. The Cloudflare One Client will then dynamically adjust its [tunnel interface](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#virtual-interface) MTU based on the probe results. This allows the Cloudflare One Client to maintain a stable connection on low MTU networks and take advantage of higher MTUs when available.

Note

Certain features may be disabled or degraded at low MTU thresholds. For details, refer to [Minimum MTUs](#minimum-mtus).

## Prerequisites

* The Cloudflare One Client must be configured to use the [MASQUE tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol).

## Enable Path MTU Discovery

PMTUD is disabled by default. To enable PMTUD on your devices, [deploy an MDM file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#windows) with the `enable_pmtud` key set to `true`. For example:

```

<dict>

  <key>organization</key>

  <string>your-team-name</string>

  <key>warp_tunnel_protocol</key>

  <string>masque</string>

  <key>enable_pmtud</key>

  <true/>

</dict>


```

This configuration enables the PMTUD feature and explicitly configures the MASQUE tunnel protocol.

The Cloudflare One Client will now send active probes to detect the network path MTU and will update its tunnel interface MTU accordingly. You can expect PMTUD probes to generate an extra 25 Mb/day of traffic coming from the device.

## Verify PMTUD is enabled

To check if PMTUD is active on a device, open a terminal and run the following command:

Terminal window

```

warp-cli settings | grep -i pmtu


```

```

(local policy)  PMTUD enabled: true


```

If PMTUD is enabled, the output will show `PMTUD enabled: true`.

## Minimum MTUs

### Recommended MTU

The Cloudflare One Client requires the following MTUs for full functionality and performance:

| Device tunnel protocol | IPv4       | IPv6       |
| ---------------------- | ---------- | ---------- |
| WireGuard              | 1340 bytes | 1360 bytes |
| MASQUE                 | 1361 bytes | 1381 bytes |

### Path MTU Discovery

For the PMTUD feature to work, the network path must support an MTU of at least 1281 bytes. The 1281 bytes consists of:

* 1200 bytes: Minimum QUIC datagram
* 53 bytes: WARP MASQUE encapsulation
* 28 bytes: IP/UDP headers

### IPv6

To send IPv6 traffic through the Cloudflare One Client, the network path must support an MTU of at least 1361 bytes. The 1361 bytes consists of:

* 1280 bytes: Minimum IPv6 packet size
* 53 bytes: WARP MASQUE encapsulation
* 28 bytes: IP/UDP headers

If PMTUD is enabled and the MTU is less than 1361 bytes, then the Cloudflare One Client will automatically disable IPv6 on the tunnel interface.

### WebRTC

To send WebRTC traffic through the Cloudflare One Client, the network path must support an MTU of at least 1361 bytes. Below 1361 bytes, WebRTC connections will experience progressively degraded performance. This minimum MTU impacts [Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) and any other website that uses WebRTC (such as video conferencing and media streaming services).

## Check your MTU

You can check your current network path MTU by collecting [Cloudflare One Client diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/).

1. Run the `warp-diag` command on the device or [collect logs via the the dashboard](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#collect-logs-via-the-dashboard).
2. Open the resulting `warp-debugging-info-<date>-<time>.zip` file.
3. Open `connectivity.txt` and search for `PMTU`.  
connectivity.txt  
```  
====================================================================  
H3 Quic Connect  
====================================================================  
Testing H3 QUIC connectivity to 'https://cloudflare-quic.com/cdn-cgi/l4-stats' result: Successful  
IPv4:  
"  
Headers:  
  server address=104.18.26.14:443  
  ...  
Body:  
  transport=TCP  
  ...  
PMTU:  
  1500 bytes  
"  
```

The example above shows an MTU of 1500 bytes, which meets the [recommended MTU requirements](#recommended-mtu) for the Cloudflare One Client. If your MTU falls below the recommended threshold, consider [enabling Path MTU Discovery](#enable-path-mtu-discovery) to optimize connection performance.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#page","headline":"Path MTU Discovery (PMTUD) · Cloudflare One docs","description":"How Path MTU Discovery (PMTUD) works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MASQUE","IPv6"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/","name":"Path MTU Discovery (PMTUD)"}}]}
```
