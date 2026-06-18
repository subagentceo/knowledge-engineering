---
title: Proxy
description: How Proxy works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Proxy

You can forward [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/) and [network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/network/) traffic to Gateway for logging and filtering. Gateway can proxy both outbound traffic and traffic directed to resources connected via a Cloudflare Tunnel, Generic Routing Encapsulation (GRE) tunnel, or IPsec tunnel. When a user connects to the Gateway proxy, Gateway will accept the connection and establish a new, separate connection to the origin server.

The Gateway proxy is required for filtering HTTP and network traffic via the Cloudflare One Client in Traffic and DNS mode. To proxy HTTP traffic without deploying the Cloudflare One Client, you can configure [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) on your devices.

## Proxy algorithm

Gateway uses the [Happy Eyeballs algorithm ↗](https://datatracker.ietf.org/doc/html/rfc6555), which tries IPv4 and IPv6 connections with a staggered fallback and uses whichever address family responds first, to proxy traffic in the following order:

1. The user's browser initiates the TCP handshake by sending Gateway a TCP SYN segment.
2. Gateway sends a SYN segment to the origin server.
3. If the origin server sends a SYN-ACK segment back, Gateway establishes separate TCP connections between the user and Gateway and between Gateway and the origin server.
4. Gateway inspects and filters traffic received from the user.
5. If the traffic passes inspection, Gateway proxies traffic bidirectionally between the user and the origin server.

flowchart TD
    %% Accessibility
    accTitle: How Gateway proxy works
    accDescr: Flowchart describing how the Gateway proxy uses the Happy Eyeballs algorithm to establish TCP connections and proxy user traffic.

    %% Flowchart
    A[User's device sends TCP SYN to Gateway] --> B[Gateway sends TCP SYN to origin server]
    B --> C{{Origin server responds with TCP SYN-ACK?}}
    C -->|Yes| E[TCP handshakes completed]
    C -->|No| D[Connection fails]
    E --> F{{Connection allowed?}}
    F -->|Allow policy| G[Gateway proxies traffic bidirectionally]
    F -->|Block policy| H[Connection blocked by firewall policies]

    %% Styling
    style D stroke:#D50000
    style G stroke:#00C853
    style H stroke:#D50000

## Supported protocols

Gateway supports proxying TCP, UDP, and ICMP traffic.

### TCP

When the proxy is enabled, Gateway will always forward TCP traffic.

By default, TCP connection attempts will timeout after 30 seconds and idle connections will disconnect after 8 hours.

### UDP

The UDP proxy forwards UDP traffic such as VoIP, [internal DNS requests](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/private-dns/), and thick client applications.

HTTP/3 uses the QUIC protocol over UDP. To inspect HTTP/3 traffic, turn on both TLS decryption and the UDP proxy. Gateway will then intercept the HTTP/3 connection and connect to the origin server over HTTP/2\. Otherwise, HTTP/3 traffic will bypass inspection. For more information on browser-specific behavior, refer to [HTTP/3 inspection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/http3/).

### ICMP (Internet Control Message Protocol)

The ICMP proxy allows ICMP traffic to reach your private network through Gateway. For example, this would allow a Cloudflare One Client user to run diagnostic commands such as `ping` and `traceroute` to an internal server IP.

Limitation

Gateway cannot log or filter ICMP traffic.

#### Allow ICMP traffic through `cloudflared`

To use the ICMP proxy with Cloudflare Tunnel, you may need to configure the `cloudflared` host to allow ICMP traffic through `cloudflared`.

* [  Linux ](#tab-panel-7690)
* [  Docker ](#tab-panel-7691)

1. Ensure that `ping_group_range` includes the Group ID (GID) of the user running `cloudflared`:  
a. Find the user that owns the `cloudflared` process:  
Terminal window  
```  
ps -aux | grep cloudflared  
```  
```  
johndoe         407  0.8  1.7 1259904 35296 ?       Ssl  21:02   0:00 /usr/bin/cloudflared --no-autoupdate tunnel run --token eyJhI...  
```  
b. Get the Group ID of the `cloudflared` user:  
Terminal window  
```  
id -g johndoe  
```  
```  
10001  
```  
c. Determine the Group IDs that are allowed to use ICMP:  
Terminal window  
```  
sudo sysctl net.ipv4.ping_group_range  
```  
```  
net.ipv4.ping_group_range= 0 10000  
```  
d. Either add the user to a group within that range, or update the range to encompass a group the user is already in. To update `ping_group_range`:  
Terminal window  
```  
echo 0 10001 | sudo tee /proc/sys/net/ipv4/ping_group_range  
```  
e. If you need to make the change apply to an already running process, you need to restart `cloudflared`. To make the change persist on reboot, update your `systcl` parameters:  
Terminal window  
```  
echo "net.ipv4.ping_group_range = 0 10001" | sudo tee -a /etc/sysctl.d/99-cloudflared.conf  
```
2. If you are running multiple network interfaces (for example, `eth0` and `eth1`), configure `cloudflared` to use the external Internet-facing interface:  
Terminal window  
```  
cloudflared tunnel run --icmpv4-src <IP of primary interface>  
```

In your environment, modify the `ping_group_range` parameter to include the Group ID (GID) of the user running `cloudflared`.

By default the [cloudflared Docker container ↗](https://github.com/cloudflare/cloudflared/blob/master/Dockerfile#L29C6-L29C13) executes as a user called `nonroot` inside of the container. `nonroot` is a specific user that exists in the [base image ↗](https://github.com/GoogleContainerTools/distroless/blob/859eeea1f9b3b7d59bdcd7e24a977f721e4a406c/base/base.bzl#L8) we use, and its Group ID is hardcoded to 65532.

## Turn on the Gateway proxy

The Gateway proxy toggle only applies to traffic from Cloudflare One Client devices. Gateway will always proxy traffic sent with [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) or [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) regardless of this setting.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Proxy and inspection settings**, turn on **Allow Secure Web Gateway to proxy traffic**.
3. Select **TCP**.
4. (Optional) Depending on your use case, you can select **UDP** and/or **ICMP**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#page","headline":"Proxy · Cloudflare One docs","description":"How Proxy works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP","UDP","ICMP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/proxy/","name":"Proxy"}}]}
```
