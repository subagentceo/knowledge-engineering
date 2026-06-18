---
title: Choose an on-ramp
description: Select a device or network on-ramp.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Choose an on-ramp

Similar to the network onboarding practices in the [Replace your VPN](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/) implementation guide, there are a number of ways to on-ramp your network traffic to the Cloudflare global network. This guide will quickly explore all of the options to on-ramp traffic to Cloudflare Gateway to inspect, apply policies, and filter.

Note

The following steps are identical to [Connect user devices](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-devices/) in the Replace your VPN implementation guide. If you have already completed Replace your VPN, you can skip ahead to [Network on-ramps](#network-on-ramps).

## Device on-ramps

The most common way to protect and filter your end-user traffic is by using a device client. The standard Cloudflare device client supports a number of operating systems and deployment methodologies, but there can still be scenarios in which an alternative path makes sense.

### Cloudflare One Client

The Cloudflare One Client is the most common onramp to send user traffic to Gateway. It is a lightweight device client, which builds proxy tunnels using either Wireguard or MASQUE, and builds a DNS proxy using DNS-over-HTTPS. It supports all major operating systems, supports all common forms of endpoint management tooling, and has a robust series of management parameters and profiles to accurately scope the needs of a diverse user base. It has flexible operating modes and can control device traffic as a proxy, control device DNS traffic as a DNS proxy, or both. It is the most common method to send traffic from user devices to be filtered and decrypted by Cloudflare Gateway.

### PAC files (Enterprise only)

Cloudflare supports filtering HTTP/S traffic sent via a PAC file on a user device. PAC files configured to send traffic to Cloudflare target a domain specific to your account tenant, and receive and process all URL traffic for that device that fits the proxy profile. PAC files are most commonly used in scenarios in which the device client is not appropriate or cannot be installed -- specifically Windows pre-2008 and Windows Server 2012, and devices which cannot install client software at all.

### Clientless Browser Isolation

Cloudflare Browser Isolation runs a headless, Chromium-based browser for your users to accomplish their secure browsing needs. It can be activated via an Access application, a Gateway policy, or by using link-based isolation (reverse proxy). In this model, your users can connect from any device to a proxy website to browse the Internet while applying all your Gateway HTTP policies and inspection requirements.

| Cloudflare One Client                                                                                                                  | PAC Files                            | Clientless Browser Isolation |                                       |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Supported OS                                                                                                                           | macOS, Windows, Linux, iOS, Android  | All desktop OS               | All OS (with HTML5 compliant browser) |
| Configurable via MDM                                                                                                                   | Yes                                  | Yes                          | N/A                                   |
| Gateway policy types supported                                                                                                         | DNS, Network, HTTP, Resolver, Egress | HTTP                         | DNS, Network, HTTP, Resolver, Egress  |
| Identity-based policies supported                                                                                                      | Yes                                  | No                           | Yes                                   |
| [Network Session Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/) | Yes                                  | Yes                          | Yes                                   |

## Network on-ramps

The primary ways to source multi-device or network traffic to Cloudflare Gateway are via Cloudflare WAN (formerly Magic WAN) using GRE or IPsec tunnels, via [Cloudflare Mesh](#cloudflare-mesh) as a software-defined all-ports traffic proxy, or via upstream DNS for a whole network using [DNS filtering locations](#dns-filtering-locations).

### Cloudflare WAN

Note

Only available on Enterprise plans.

[Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) is Cloudflare's offering most analogous to a traditional SD-WAN. Cloudflare WAN is typically deployed via an IPsec or GRE tunnel terminating on customer devices (such as firewalls or routers), or via our Cloudflare One Appliance hardware device. You can also deploy Cloudflare WAN using [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/) (CNI) at private peering locations or some public cloud instances (where compatible).

Cloudflare WAN on-ramps traffic via your connections and can send all network and HTTP traffic through Cloudflare Gateway for inspection.

For more information on how Cloudflare WAN integrates with Zero Trust, refer to [Zero Trust integration](https://developers.cloudflare.com/cloudflare-wan/zero-trust/).

### Cloudflare Mesh Beta

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) (formerly WARP Connector), a software agent similar to our device client, functions as a virtual device to establish a connection between your network and the Cloudflare global network. You can install Cloudflare Mesh on a dedicated Linux server or virtual machine.

Cloudflare Mesh supports egressing traffic from your private network to the Internet as a gateway. This means it can allow traffic initiated from a network to be on-ramped to Cloudflare for either public or private destinations. You can use Cloudflare Mesh to establish a secure egress path for servers or users on a network which may not each be able to run the Cloudflare One Client and still apply Gateway network and HTTP inspection policies. This connection is most analogous to proxy server connectivity or site-to-site VPN.

For more information on setting up Cloudflare Mesh, refer to [Set up Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/).

### DNS filtering locations

DNS locations are a collection of DNS endpoints which can be mapped to physical entities such as offices, homes, or data centers.

The fastest way to start filtering DNS queries from a location is by changing the DNS resolvers at the router or updating the upstream resolution to Cloudflare DNS resolution endpoints. This can also be accomplished from individual devices, or an network or subnet which sets resolver IPs for clients via DHCP.

For more information on setting up DNS locations, refer to [Add locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/).

| Cloudflare WAN                 | Cloudflare Mesh       | DNS Locations         |               |
| ------------------------------ | --------------------- | --------------------- | ------------- |
| Gateway policy types supported | Network, HTTP, Egress | Network, HTTP, Egress | DNS, Resolver |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/choose-on-ramp/#page","headline":"Choose an on-ramp · Cloudflare Learning Paths","description":"Select a device or network on-ramp.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/choose-on-ramp/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/connect-devices-networks/","name":"Connect devices and networks to Cloudflare"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/connect-devices-networks/choose-on-ramp/","name":"Choose an on-ramp"}}]}
```
