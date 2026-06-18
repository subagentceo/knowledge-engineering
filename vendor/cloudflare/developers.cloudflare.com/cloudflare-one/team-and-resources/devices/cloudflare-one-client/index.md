---
title: Cloudflare One Client
description: How Cloudflare One Client works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare One Client

## About the Cloudflare One Client

The Cloudflare One Client (formerly WARP) securely and privately sends traffic from your devices to Cloudflare's global network, where [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) can apply advanced web filtering. The client also reports device health information — such as OS version, disk encryption status, and the presence of specific applications — so that you can enforce [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) in your Access and Gateway policies.

## How the Cloudflare One Client works

The Cloudflare One Client creates encrypted connections between your device and Cloudflare's network. It does this in two ways:

* **Proxy tunnel** — Encrypts and routes your device's internet and private network traffic through Cloudflare, using the [WireGuard ↗](https://www.wireguard.com/) or [MASQUE ↗](https://blog.cloudflare.com/zero-trust-warp-with-a-masque) protocol.
* **DNS proxy** — Sends your device's DNS queries to Cloudflare over an encrypted channel ([DNS-over-HTTPS ↗](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/)), where [Gateway DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) can filter them.

The client runs on all major operating systems and can be deployed through common endpoint management tools (such as Intune, JAMF, or JumpCloud).

The Cloudflare One Client consists of:

* **Graphical User Interface (GUI):** A control panel that allows end users to view the client's [status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) and perform actions such as connecting or disconnecting.
* **WARP daemon (or service):** The core background process responsible for establishing the encrypted connections described above and handling all client functionality on your device.

For more information on how the Cloudflare One Client routes traffic, refer to the [client architecture page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/) and watch the video below.

Chapters

* ![Introduction and WARP GUI Basics](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction and WARP GUI Basics** 0s
* ![Consumer vs. Corporate WARP](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=57s)  
 **Consumer vs. Corporate WARP** 57s
* ![Device Profiles Explained](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=95s)  
 **Device Profiles Explained** 1m35s
* ![WARP Operating Modes](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=132s)  
 **WARP Operating Modes** 2m12s
* ![Split Tunneling](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=224s)  
 **Split Tunneling** 3m44s
* ![Conclusion](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/31178cc41d0ec56d42ef892160589635/thumbnails/thumbnail.jpg?fit=crop&time=296s)  
 **Conclusion** 4m56s

## Installation details

The GUI and daemon (or service) have different names and are stored in the following locations:

Windows 

| Windows              |                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Service / Daemon** | C:\\Program Files\\Cloudflare\\Cloudflare WARP\\warp-svc.exe                                                  |
| **GUI application**  | C:\\Program Files\\Cloudflare\\Cloudflare WARP\\Cloudflare WARP.exe                                           |
| **Logs Location**    | DaemonC:\\ProgramData\\Cloudflare\\GUI LogsC:\\Users\\<USER>.WARP\\AppData\\Localor%LOCALAPPDATA%\\Cloudflare |

macOS 

| macOS                |                                                                                   |
| -------------------- | --------------------------------------------------------------------------------- |
| **Service / Daemon** | /Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP               |
| **GUI application**  | /Applications/Cloudflare WARP.app/Contents/MacOS/Cloudflare WARP                  |
| **Logs Location**    | Daemon/Library/Application Support/Cloudflare/GUI Logs\~/Library/Logs/Cloudflare/ |

Linux 

| Linux                |                                                   |
| -------------------- | ------------------------------------------------- |
| **Service / Daemon** | /bin/warp-svc                                     |
| **GUI application**  | /bin/warp-taskbar                                 |
| **Logs Location**    | /var/log/cloudflare-warp//var/lib/cloudflare-warp |

Along with the Cloudflare One Client GUI and daemon, `warp-cli` and `warp-diag` are also [installed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) on the machine and added to the system path for use from any terminal session.

[warp-diag](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) is a command-line diagnostics tool that collects logs, configuration details, and connectivity data from the Cloudflare One Client to help troubleshoot issues.

`warp-cli` is the command-line interface (CLI) for managing and configuring the Cloudflare One Client, allowing users to connect, disconnect, and adjust settings programmatically.

## Key benefits of using the Cloudflare One Client

Deploying the Cloudflare One Client significantly enhances your organization's security and visibility within Cloudflare Zero Trust:

* **Unified security policies everywhere**: With the Cloudflare One Client deployed in the Traffic and DNS mode, [Gateway policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) are not location-dependent — they can be enforced anywhere.
* **Advanced web filtering and threat protection**: Activate Gateway features for your device traffic, including:  
   * [Anti-Virus scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/)  
   * [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/)  
   * [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#isolate)  
   * [Identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/)
* **Application and device-specific insights**: View which SaaS applications your users are accessing and review their approval status on the [Shadow IT Discovery](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/) page. Monitor device and network performance with [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) to detect connectivity or performance issues before users report them.
* **Device posture checks**: The Cloudflare One Client provides advanced Zero Trust protection by making it possible to check for [device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/). By setting up device posture checks, you can build Access or Gateway policies that check for a device's location, disk encryption status, OS version, and more.
* **Secure private and infrastructure access**: Connect devices to internal networks and applications through [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) without exposing them to the public internet. The client is also required for [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/), which provides SSH access using short-lived certificates and detailed audit logging.

## Client modes

The Cloudflare One Client offers flexible [operating modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) to suit your specific needs:

* **Traffic and DNS mode** (default) — Routes device traffic (by default, all ports and protocols) and DNS queries through Cloudflare for filtering, inspection, and policy enforcement. Traffic exclusions can be configured with [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/).
* **DNS-only mode** — Routes only DNS queries through Cloudflare. Use this mode if you only need DNS-level filtering without inspecting web or application traffic.

Other modes (Traffic only, Local proxy, Posture only) are also available. For details, refer to the [operating modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) page.

## Next steps

* Review the [first-time setup](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/) guide to [install](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and [deploy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) the Cloudflare One Client on your corporate devices.
* Review possible [client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) and [settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) to best suit your organization's needs.
* Explore [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) to enforce advanced DNS, network, HTTP, and egress policies with the Cloudflare One Client.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/#page","headline":"About the Cloudflare One Client · Cloudflare One docs","description":"How Cloudflare One Client works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Wireguard","MASQUE","Video"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}}]}
```
