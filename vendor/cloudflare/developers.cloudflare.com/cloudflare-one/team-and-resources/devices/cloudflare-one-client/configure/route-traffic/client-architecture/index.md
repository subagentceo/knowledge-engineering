---
title: Client architecture
description: Explore how the Cloudflare One Client routes DNS and IP traffic to apply your Zero Trust policies.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client architecture

This guide explains how the Cloudflare One Client (formerly WARP) interacts with a device's operating system to route traffic in [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-and-dns-mode-default) mode.

In [DNS only mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) mode, the IP traffic information does not apply. In [Traffic only mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-only-mode) mode, the DNS traffic information does not apply.

## Client traffic flow

The Cloudflare One Client allows organizations to have granular control over the applications an end user device can access. The client forwards DNS and network traffic from the device to Cloudflare's global network, where Zero Trust policies are applied in the cloud. On all operating systems, the WARP daemon maintains three connections between the device and Cloudflare:

| Connection                                                                                                                                                                            | Protocol | Purpose                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| WARP tunnel ([via WireGuard or MASQUE](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol)) | UDP      | Send IP packets to Gateway for network policy enforcement, HTTP policy enforcement, and private network access.      |
| [DoH ↗](https://www.cloudflare.com/learning/dns/dns-over-tls/)                                                                                                                        | HTTPS    | Send DNS requests to Gateway for DNS policy enforcement. The DoH connection is maintained inside of the WARP tunnel. |
| Device orchestration                                                                                                                                                                  | HTTPS    | Perform user registration, check device posture, apply device client profile settings.                               |

flowchart LR
subgraph Device
W[Cloudflare One Client] -.-> D
D[DNS proxy]
W -.-> V[Virtual interface]
end
subgraph Cloudflare
A[Zero Trust account]
subgraph Gateway
N[L3/L4 firewall]
G[DNS resolver]
end
end
W<--"Device
orchestration"-->A
subgraph tunnel["WARP tunnel"]
 ip@{ shape: text, label: "Network traffic" }
  dns@{ shape: text, label: "DNS traffic" }
end
V --- ip-->N
D --- dns-->G
N --> O[(Application)]

Your [Split Tunnel](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) configuration determines what IP traffic is sent down the WARP tunnel. Your [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) configuration determines which DNS requests are sent to Gateway via DoH. Traffic to the [device orchestration API](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#client-orchestration-api) endpoint does not obey Split Tunnel rules since the connection always operates outside of the WARP tunnel.

Next, you will learn how the Cloudflare One Client configures your operating system to apply your Local Domain Fallback and Split Tunnel routing rules. Implementation details differ between desktop and mobile clients.

## Windows, macOS, and Linux

The desktop client consists of two components: a service/daemon that handles all client functionality on your device, and a GUI wrapper that makes it easier for a user to interact with the daemon.

### DNS traffic

When you connect the Cloudflare One Client, the client creates a local DNS proxy on the device and binds it to these IP addresses on port 53 (the port designated for DNS traffic):

* **IPv4**: `127.0.2.2` and `127.0.2.3`
* **IPv6**:  
   * macOS and Linux: `fd01:db8:1111::2` and `fd01:db8:1111::3`  
   * Windows: `::ffff:127.0.2.2`

The Cloudflare One Client then configures the operating system to send all DNS requests to these IP addresses. All network interfaces on the device will now use this local DNS proxy for DNS resolution. In other words, all DNS traffic will now be handled by the Cloudflare One Client.

Note

Browsers with DoH configured will bypass the local DNS proxy. You may need to disable DoH settings in the browser.

Based on your Local Domain Fallback configuration, the Cloudflare One Client will either forward the request to Gateway for DNS policy enforcement or forward the request to your private DNS resolver.

* Requests to Gateway are sent over our [DoH connection](#overview) inside the WARP tunnel.
* Requests to your private DNS resolver are sent either inside or outside of the tunnel depending on your Split Tunnel configuration. For more information, refer to [How the Cloudflare One Client handles DNS requests](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/#how-the-cloudflare-one-client-handles-dns-requests).

flowchart LR
D{{DNS request}}-->L["Local DNS proxy <br> (127.0.2.2 and 127.0.2.3)"]-->R{In local domain fallback?}
R -- Yes --> F[Private DNS resolver]
R -- No --> G[Cloudflare Gateway]

You can verify that the operating system is using the Cloudflare One Client's local DNS proxy:

* [ macOS ](#tab-panel-7440)
* [ Windows ](#tab-panel-7441)
* [ Linux ](#tab-panel-7442)

On macOS, open a terminal window and run `scutil --dns`. The DNS servers should be set to the Cloudflare One Client's local DNS proxy IPs.

Terminal window

```

scutil --dns


```

```

DNS configuration (for scoped queries)

resolver #1

  search domain[0] : <DNS-SEARCH-DOMAIN>

  nameserver[0] : 127.0.2.2

  nameserver[1] : 127.0.2.3

  if_index : 15 (en0)

  flags    : Scoped, Request A records

  reach    : 0x00030002 (Reachable,Local Address,Directly Reachable Address)

resolver #2

  nameserver[0] : 127.0.2.2

  nameserver[1] : 127.0.2.3

  nameserver[2] : fd01:db8:1111::2

  nameserver[3] : fd01:db8:1111::3

  if_index : 23 (utun3)

  flags    : Scoped, Request A records, Request AAAA records

  reach    : 0x00030002 (Reachable,Local Address,Directly Reachable Address)


```

On Windows, open a PowerShell window and run `ipconfig`. The DNS servers should be set to the Cloudflare One Client's local DNS proxy IPs.

PowerShell

```

ipconfig


```

```

Windows IP Configuration


Unknown adapter CloudflareWARP:


   Connection-specific DNS Suffix  . :

   Description . . . . . . . . . . . : Cloudflare WARP Interface Tunnel

   Physical Address. . . . . . . . . :

   DHCP Enabled. . . . . . . . . . . : No

   Autoconfiguration Enabled . . . . : Yes

   IPv6 Address. . . . . . . . . . . : 2606:4700:110:8f79:145:f180:fc4:8106(Preferred)

   Link-local IPv6 Address . . . . . : fe80::83b:d647:4bed:d388%49(Preferred)

   IPv4 Address. . . . . . . . . . . : 172.16.0.2(Preferred)

   Subnet Mask . . . . . . . . . . . : 255.255.255.255

   Default Gateway . . . . . . . . . :

   DNS Servers . . . . . . . . . . . : 127.0.2.2

                                       127.0.2.3

   NetBIOS over Tcpip. . . . . . . . : Enabled


```

On Linux, check the `/etc/resolv.conf` file. The DNS servers should be set to the Cloudflare One Client's local DNS proxy IPs.

Terminal window

```

cat /etc/resolv.conf


```

```

# This file was generated by cloudflare-warp.

nameserver 127.0.2.2

nameserver 127.0.2.3

nameserver fd01:db8:1111::2

nameserver fd01:db8:1111::3

search <DNS-SEARCH-DOMAIN>

options edns0

options trust-ad


```

### IP traffic

When you connect the Cloudflare One Client, it makes three changes on the device to control if traffic is sent inside or outside of the WARP tunnel:

* Creates a [virtual network interface](#virtual-interface).
* Modifies the operating system [routing table](#routing-table) according to your Split Tunnel rules.
* Modifies the operating system [firewall](#system-firewall) according to your Split Tunnel rules.

flowchart LR
P{{IP packet}}-->R["OS routing table"]-->F["OS firewall"] --> S{Excluded from Split Tunnels?}
S -- Yes --> A[(Application)]
S -- No --> U["Virtual interface<br> (172.16.0.2)"] --> G[Cloudflare Gateway]

#### Virtual interface

Virtual interfaces allow the operating system to logically subdivide a physical interface, such as a network interface controller (NIC), into separate interfaces for the purposes of routing IP traffic. The Cloudflare One Client's virtual interface is what maintains the WireGuard/MASQUE connection between the device and Cloudflare. By default, its IPv4 address is hardcoded as `172.16.0.2` for devices using WireGuard, whereas devices using MASQUE are [assigned a unique IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#assign-a-unique-ip-address-to-each-device) from the CGNAT IP space (`100.96.0.0/12`). You can override the default virtual interface IP with a [custom device IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/).

To view a list of all network interfaces on the operating system:

* [ Windows ](#tab-panel-7446)
* [ macOS ](#tab-panel-7447)
* [ Linux ](#tab-panel-7448)

On Windows, run `ipconfig`. When the Cloudflare One Client is turned on, you will see an adapter called `CloudflareWARP` with your device IP.

PowerShell

```

ipconfig


```

```

Windows IP Configuration


Unknown adapter CloudflareWARP:


   Connection-specific DNS Suffix  . :

   Description . . . . . . . . . . . : Cloudflare WARP Interface Tunnel

   Physical Address. . . . . . . . . :

   DHCP Enabled. . . . . . . . . . . : No

   Autoconfiguration Enabled . . . . : Yes

   IPv6 Address. . . . . . . . . . . : 2606:4700:110:8f79:145:f180:fc4:8106(Preferred)

   Link-local IPv6 Address . . . . . : fe80::83b:d647:4bed:d388%49(Preferred)

   IPv4 Address. . . . . . . . . . . : 172.16.0.2(Preferred)

   Subnet Mask . . . . . . . . . . . : 255.255.255.255

   Default Gateway . . . . . . . . . :

   DNS Servers . . . . . . . . . . . : 127.0.2.2

                                       127.0.2.3

   NetBIOS over Tcpip. . . . . . . . : Enabled


```

On macOS, run `ifconfig`. When the Cloudflare One Client is turned on, you will see a `utun` interface with your device IP.

Terminal window

```

ifconfig


```

```

<redacted>

utun3: flags=8051<UP,POINTOPOINT,RUNNING,MULTICAST> mtu 1280

  inet 172.16.0.2 --> 172.16.0.2 netmask 0xffffffff

  inet6 fe80::f6d4:88ff:fe82:6d9e%utun3 prefixlen 64 scopeid 0x17

  inet6 2606:4700:110:8c7d:7369:7526:a59b:5636 prefixlen 128

  nd6 options=201<PERFORMNUD,DAD>


```

On Linux, run `ifconfig` or `ip addr`. When the Cloudflare One Client is turned on, you will see a `utun` interface with your device IP.

Terminal window

```

ip addr


```

```

<redacted>

3: CloudflareWARP: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1280 qdisc mq state UNKNOWN group default qlen 500

    link/none

    inet 172.16.0.2/32 scope global CloudflareWARP

       valid_lft forever preferred_lft forever

    inet6 2606:4700:110:8a2e:a5f7:a8de:a1f9:919/128 scope global

       valid_lft forever preferred_lft forever

    inet6 fe80::117e:276b:8a79:c498/64 scope link stable-privacy

       valid_lft forever preferred_lft forever


```

In the example above, the device IPv4 address is `172.16.0.2`.

#### Routing table

The Cloudflare One Client edits the system routing table to control what IP traffic goes to Gateway. The routing table indicates which network interface should handle packets to a particular IP address. By default, all traffic routes through the Cloudflare One Client's virtual interface except for the IPs and domains on your Split Tunnel exclude list (which use the default interface on your device).

You can verify that the routing table matches your Split Tunnel rules:

* [ macOS ](#tab-panel-7443)
* [ Windows ](#tab-panel-7444)
* [ Linux ](#tab-panel-7445)

To view the entire routing table on macOS, run `netstat -r`.

You can also search the routing table for a domain or IP address. In this example, we see that traffic to `google.com` is sent through `utun3`, which is the Cloudflare One Client's virtual interface on this device:

Terminal window

```

route get google.com


```

```

   route to: lga25s81-in-f14.1e100.net

destination: 136.0.0.0

       mask: 248.0.0.0

  interface: utun3

      flags: <UP,DONE,PRCLONING>

 recvpipe  sendpipe  ssthresh  rtt,msec    rttvar  hopcount      mtu     expire

       0         0         0         0         0         0      1280         0


```

In contrast, this DHCP address is excluded from the Cloudflare One Client and uses the default interface:

Terminal window

```

route get 169.254.0.0


```

```

   route to: 169.254.0.0

destination: 169.254.0.0

       mask: 255.255.0.0

  interface: en0

      flags: <UP,DONE,CLONING,STATIC>

 recvpipe  sendpipe  ssthresh  rtt,msec    rttvar  hopcount      mtu     expire

       0         0         0         0         0         0      1500   -210842


```

To view the entire routing table on Windows, run `netstat -r`.

You can also search the routing table for an IP address. In this example, we see that traffic to `1.1.1.1` is sent through the Cloudflare One Client's virtual interface:

PowerShell

```

Find-NetRoute -RemoteIPAddress "1.1.1.1" | Select-Object InterfaceAlias -Last 1


```

```

InterfaceAlias

--------------

CloudflareWARP


```

In contrast, this DHCP address is excluded from the Cloudflare One Client and uses the default interface:

PowerShell

```

Find-NetRoute -RemoteIPAddress "169.254.0.0" | Select-Object InterfaceAlias -Last 1


```

```

InterfaceAlias

--------------

Wi-Fi


```

To view the entire routing table on Linux, run `ip -6 route show table all` or `ip -4 route show table all`.

You can also search the routing table for an IP address. In this example, we see that traffic to `1.1.1.1` is sent through the Cloudflare One Client's virtual interface:

Terminal window

```

ip route get 1.1.1.1


```

```

1.1.1.1 dev CloudflareWARP table 65743 src 172.16.0.2 uid 1000

    cache


```

In contrast, this DHCP address is excluded from the Cloudflare One Client and uses the default interface:

Terminal window

```

ip route get 169.254.0.0


```

```

169.254.0.0 dev ens18 src 172.24.8.6 uid 1000

    cache


```

#### System firewall

The Cloudflare One Client modifies the operating system firewall to enforce your Split Tunnel rules. This adds a layer of protection in case a service bypasses the routing table and tries to send traffic directly through another interface. For example, if traffic to `203.0.113.0` is supposed to be inspected by Gateway, we create a firewall rule that blocks `203.0.113.0` on all interfaces except for `utun`.

## iOS, Android, and ChromeOS

On iOS and Android/ChromeOS, the Cloudflare One Agent installs itself as a VPN client to capture and route all traffic. The app is built on the official VPN framework for iOS and Android. For more information, refer to Apple's [NetworkExtension documentation ↗](https://developer.apple.com/documentation/networkextension) and Google's [Android developer documentation ↗](https://developer.android.com/guide/topics/connectivity/vpn).

Note that ChromeOS runs the Android app in a virtual machine, rather than running a native Chrome app.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#page","headline":"Client architecture · Cloudflare One docs","description":"Explore how the Cloudflare One Client routes DNS and IP traffic to apply your Zero Trust policies.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Wireguard"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/","name":"Route traffic"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/","name":"Client architecture"}}]}
```
