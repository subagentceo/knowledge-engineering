---
title: Cloudflare One Client with firewall
description: Reference information for Cloudflare One Client with firewall in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare One Client with firewall

If your organization uses a firewall or other policies to restrict or intercept Internet traffic, you may need to exempt the following IP addresses and domains to allow the Cloudflare One Client (formerly WARP) to connect.

## Client orchestration API

The Cloudflare One Client connects to Cloudflare via a standard HTTPS connection outside the tunnel for operations like registration or settings changes. To perform these operations, you must allow the following IPs and domains:

* IPv4 API endpoints: `162.159.137.105` and `162.159.138.105`
* IPv6 API endpoints: `2606:4700:7::a29f:8969` and `2606:4700:7::a29f:8a69`
* SNIs for Cloudflare One Client version 2026.6.0 and later: `api.devices.cloudflare.com`
* SNIs for versions earlier than 2026.6.0: `zero-trust-client.cloudflareclient.com` and `notifications.cloudflareclient.com`

Cloudflare One Client version 2026.6.0 and later uses `api.devices.cloudflare.com`. Versions earlier than 2026.6.0 use `zero-trust-client.cloudflareclient.com` and `notifications.cloudflareclient.com`.

These domains may resolve to different IP addresses. The Cloudflare One Client overrides the resolved IPs with the IPs listed above. To avoid connectivity issues, allow those IPs through your firewall.

FedRAMP High requirements

To deploy the Cloudflare One Client in FedRAMP High environments, you will need to allow a different set of IPs and domains through your firewall:

* IPv4 API endpoints: `162.159.213.1` and `172.64.98.1`
* IPv6 API endpoints: `2606:54c1:11::` and `2a06:98c1:4b::`
* SNIs: `api.devices.fed.cloudflare.com` and `notifications.devices.fed.cloudflare.com`

## DoH IP

Note

Only required for [DNS only mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) mode.

In [DNS only mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) mode, the Cloudflare One Client sends DNS requests to Gateway over an HTTPS connection. For DNS to work correctly, you must allow the following IPs and domains:

* IPv4 DoH addresses: `162.159.36.1` and `162.159.46.1`
* IPv6 DoH addresses: `2606:4700:4700::1111` and `2606:4700:4700::1001`
* SNIs: `<ACCOUNT_ID>.cloudflare-gateway.com`

Even though `<ACCOUNT_ID>.cloudflare-gateway.com` may resolve to different IP addresses, the Cloudflare One Client overrides the resolved IPs with the IPs listed above. To avoid connectivity issues, ensure that the above IPs are permitted through your firewall.

FedRAMP High requirements

To deploy the Cloudflare One Client in FedRAMP High environments, you will need to allow a different set of IPs and domains through your firewall:

* IPv4 DoH addresses: `172.64.100.3` and `172.64.101.3`
* IPv6 DoH addresses: `2606:54c1:13::2`
* SNIs: `<ACCOUNT_ID>.fed.cloudflare-gateway.com`

### Android devices

If you are deploying the Cloudflare One Agent on Android/ChromeOS, you must also add `cloudflare-dns.com` to your firewall exception list. On Android/ChromeOS devices, the Cloudflare One Client uses `cloudflare-dns.com` to resolve domains on your [Split Tunnel list](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#domain-based-split-tunnels).

## Client authentication endpoint

When you [log in to your Cloudflare One organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/), you will have to complete the authentication steps required by your organization in the browser window that opens. To perform these operations, you must allow the following domains:

* The IdP used to authenticate to Cloudflare One
* `<your-team-name>.cloudflareaccess.com`

FedRAMP High requirements

To deploy WARP in FedRAMP High environments, you will need to allow different domains through your firewall:

* FedRAMP High IdP used to authenticate to Cloudflare One
* `<your-team-name>.fed.cloudflareaccess.com`.

## WARP ingress IP

The Cloudflare One Client connects to the following IP addresses, depending on which [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) is configured for your device (WireGuard or MASQUE). All network traffic from your device to Cloudflare goes through these IPs and ports over UDP.

### WireGuard

| IPv4 address   | 162.159.193.0/24          |
| -------------- | ------------------------- |
| IPv6 address   | 2606:4700:100::/48        |
| Default port   | UDP 2408                  |
| Fallback ports | UDP 500 UDP 1701 UDP 4500 |

### MASQUE

| IPv4 address   | 162.159.197.0/24                                                                     |
| -------------- | ------------------------------------------------------------------------------------ |
| IPv6 address   | 2606:4700:102::/48                                                                   |
| Default port   | UDP 443                                                                              |
| Fallback ports | UDP 500 UDP 1701 UDP 4500 UDP 4443 UDP 8443 UDP 8095 TCP 443 [1](#user-content-fn-1) |

Note

Before you [log in to your Cloudflare One organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/), you may see the IPv4 range `162.159.192.0/24`. This IP is used for the consumer WARP client ([1.1.1.1 with WARP](https://developers.cloudflare.com/warp-client/)) and is not required for Zero Trust services.

FedRAMP High requirements

Devices will use the MASQUE protocol in FedRAMP High environments. To deploy the Cloudflare One Client for FedRAMP High, you will need to allow the following IPs and ports:

| IPv4 address   | 162.159.239.0/24                                                                     |
| -------------- | ------------------------------------------------------------------------------------ |
| IPv6 address   | 2606:4700:105::/48                                                                   |
| Default port   | UDP 443                                                                              |
| Fallback ports | UDP 500 UDP 1701 UDP 4500 UDP 4443 UDP 8443 UDP 8095 TCP 443 [1](#user-content-fn-1) |

## Captive portal

The following domains are used as part of our captive portal check:

* `cloudflareportal.com`
* `cloudflareok.com`
* `cloudflarecp.com`
* `www.msftconnecttest.com`
* `captive.apple.com`
* `connectivitycheck.gstatic.com`

## Connectivity checks

As part of establishing the WARP tunnel, the client runs connectivity checks inside and outside of the tunnel.

### Outside tunnel

The client connects to the following destinations to verify general Internet connectivity outside of the WARP tunnel. Make sure that these IPs and domains are on your firewall allowlist.

* `162.159.197.3`
* `2606:4700:102::3`
* `engage.cloudflareclient.com`: The client will always send requests directly to an IP in the [WARP ingress IPv4 or IPv6 range](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip) (or to your [override\_warp\_endpoint](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#override%5Fwarp%5Fendpoint) if set). Requests will not use a proxy server, even if one is configured for the system.

Even though `engage.cloudflareclient.com` may resolve to different IP addresses, the Cloudflare One Client overrides the resolved IPs with the IPs listed above. To avoid connectivity issues, ensure that the above IPs are permitted through your firewall.

### Inside tunnel

The Cloudflare One Client connects to the following destinations to verify connectivity inside of the WARP tunnel:

* `162.159.197.4`
* `2606:4700:102::4`
* `connectivity.cloudflareclient.com`

Because this check happens inside of the tunnel, you do not need to add these IPs and domains to your firewall allowlist. However, since the requests go through Gateway, ensure that they are not blocked by a Gateway HTTP or Network policy.

## NEL reporting (optional)

The Cloudflare One Client reports connectivity issues to the Network Error Logging (NEL) endpoint via `a.nel.cloudflare.com`. This is not technically required to operate but will result in errors in our logs if not excluded properly.

## Latency statistics (optional)

The Cloudflare One Client generates ICMP traffic to the [WARP ingress IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip) when running tunnel latency tests. This is not technically required to operate but will result in errors in our logs if not excluded properly.

## Time synchronization (optional)

The Cloudflare One Client attempts to synchronize the exact time by NTP (`UDP 123`) to [Cloudflare's Time Service](https://developers.cloudflare.com/time-services/ntp/usage/) via `time.cloudflare.com`. This is not technically required to operate but will result in errors in our logs if not excluded properly.

## Scope of firewall rules

### Required scopes

If your organization does not currently allow inbound/outbound communication over the IP addresses, ports, and domains described above, you must manually add an exception. The rule at a minimum needs to be scoped to the following process based on your platform:

* Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`
* macOS: You must explicitly allow both the core networking daemon and GUI component as shown in the following instructions.  
   1. Core networking daemon: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`  
   This binary does not have a Bundle ID and must be allowed via full path.  
   2. GUI component, choose one of the following three identifiers depending on your MDM or firewall vendor's preferred format:  
   `/Applications/Cloudflare WARP.app` (Path)  
   `/Applications/Cloudflare WARP.app/Contents/MacOS/Cloudflare WARP` (Path)  
   `com.cloudflare.1dot1dot1dot1.macos` (Bundle ID)  
macOS 15.0 through 15.4  
Due to changes in macOS Sequoia versions 15.0 through 15.4, you must update your [macOS firewall settings ↗](https://support.apple.com/guide/mac-help/change-firewall-settings-on-mac-mh11783/mac) to allow the Cloudflare One Client to manage your device's firewall. Later versions of macOS are not affected because of changes Apple introduced to fix the unexpected breaking changes in their firewall.  
To allow the Cloudflare One Client to function on macOS Sequoia versions 15.0 through 15.4 while still blocking unwanted incoming traffic, follow these steps:  
   1. Turn off the following [macOS firewall settings ↗](https://support.apple.com/guide/mac-help/change-firewall-settings-on-mac-mh11783/mac):  
   * **Block all incoming connections**  
   * **Automatically allow built-in software to receive incoming connections**  
   * **Automatically allow downloaded signed software to receive incoming connections**  
   1. Add the [WARP daemon and GUI processes](#required-scopes) to the firewall exceptions list and set them to _Allow incoming connections_.  
   2. Restrict the other allow exceptions to only the processes you want receiving traffic.  
   3. (Optional) Do not grant users administrative privileges, otherwise they will be able to modify firewall settings and exceptions.

### Optional scopes

#### DEX tests

To run [Digital Experience Monitoring tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/), you will need to allow the `warp-dex` process to generate network traffic to your target destinations:

* Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-dex.exe`
* macOS: `/Applications/Cloudflare WARP.app/Contents/Resources/warp-dex`

#### Network statistics

To use the network connectivity tests built into the Cloudflare One Client GUI, you will need to allow the GUI application to generate network traffic:

* Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\Cloudflare WARP.exe`
* macOS: `/Applications/Cloudflare WARP.app`

## Related resources

* [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) \- Resolve selected domains via local DNS instead of Cloudflare Gateway.
* [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) \- Control which traffic goes through the Cloudflare One Client by including or excluding specific IPs or domains.

## Footnotes

1. Required for HTTP/2 fallback [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#page","headline":"Cloudflare One Client with firewall · Cloudflare One docs","description":"Reference information for Cloudflare One Client with firewall in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Wireguard","MASQUE"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/","name":"Cloudflare One Client with firewall"}}]}
```
