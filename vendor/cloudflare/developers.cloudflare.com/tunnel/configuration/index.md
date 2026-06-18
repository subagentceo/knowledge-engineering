---
title: Configuration
description: Configure tunnel ingress rules, origins, and protocol settings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configuration

This page covers the most common configuration options for `cloudflared` tunnels, including high availability, firewall rules, and runtime parameters.

## Replicas and high availability

When you run a tunnel, `cloudflared` establishes four outbound-only, [post-quantum encrypted](https://developers.cloudflare.com/ssl/post-quantum-cryptography/) connections to at least two distinct Cloudflare data centers. If any connection, server, or data center goes offline, your resources remain available.

A replica is an additional `cloudflared` instance that points to the same tunnel. Each replica creates four new connections, providing additional ingress points to your origin. You can run up to 25 replicas (100 connections) per tunnel. Traffic routes to the geographically closest replica.

graph LR
    C((Cloudflare))
    subgraph E[Your network]
        cf1["cloudflared <br> (Replica for tunnel-01)"]
        cf2["cloudflared <br> (Replica for tunnel-01)"]
        S1[Application]
        cf1-->S1
        cf2-->S1
    end
    C -- "Connections x 4 <br>"--> cf1
    C --> cf1
    C --> cf1
    C --> cf1
    C -- Connections x 4--> cf2
    C --> cf2
    C --> cf2
    C --> cf2

### Deploy a replica

* [ Dashboard ](#tab-panel-10980)
* [ CLI ](#tab-panel-10981)

To deploy a replica for a remotely-managed tunnel:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** \> **Tunnels**.  
[ Go to **Tunnels** ](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select your tunnel.
3. Select **Add a replica**.
4. Select the operating system of the host where you want to deploy a replica.
5. Copy the installation command and run it on the host.

To deploy a replica for a [locally-managed tunnel](https://developers.cloudflare.com/tunnel/advanced/local-management/), run `cloudflared tunnel run <NAME>` on an additional host using the same [tunnel credentials](https://developers.cloudflare.com/tunnel/advanced/local-management/tunnel-permissions/).

Note

For intelligent traffic steering, failover logic, or health alerts, use [Cloudflare Load Balancing](https://developers.cloudflare.com/tunnel/routing/#load-balancing) instead of replicas.

## Firewall rules

`cloudflared` connects outbound to Cloudflare on port `7844`. Your firewall must allow egress to the following destinations. Block all ingress traffic for a positive security model — only the services in your tunnel configuration will be exposed.

### Required ports

#### `region1.v2.argotunnel.com`

| IPv4                                                                                                                                          | IPv6                                                                                                                                                             | Port | Protocols            |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------- |
| 198.41.192.167 198.41.192.67 198.41.192.57 198.41.192.107 198.41.192.27 198.41.192.7 198.41.192.227 198.41.192.47 198.41.192.37 198.41.192.77 | 2606:4700:a0::1 2606:4700:a0::2 2606:4700:a0::3 2606:4700:a0::4 2606:4700:a0::5 2606:4700:a0::6 2606:4700:a0::7 2606:4700:a0::8 2606:4700:a0::9 2606:4700:a0::10 | 7844 | TCP/UDP (http2/quic) |

#### `region2.v2.argotunnel.com`

| IPv4                                                                                                                                           | IPv6                                                                                                                                                             | Port | Protocols            |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------- |
| 198.41.200.13 198.41.200.193 198.41.200.33 198.41.200.233 198.41.200.53 198.41.200.63 198.41.200.113 198.41.200.73 198.41.200.43 198.41.200.23 | 2606:4700:a8::1 2606:4700:a8::2 2606:4700:a8::3 2606:4700:a8::4 2606:4700:a8::5 2606:4700:a8::6 2606:4700:a8::7 2606:4700:a8::8 2606:4700:a8::9 2606:4700:a8::10 | 7844 | TCP/UDP (http2/quic) |

US region IPs

When using the [\--region us](#region) flag, ensure your firewall allows outbound connections to these US-region destinations on port `7844` (TCP/UDP).

#### `us-region1.v2.argotunnel.com`

| IPv4                                                                                                                               | IPv6                                                                                                                                                             | Port | Protocol             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------- |
| 198.41.218.1 198.41.218.2 198.41.218.3 198.41.218.4 198.41.218.5 198.41.218.6 198.41.218.7 198.41.218.8 198.41.218.9 198.41.218.10 | 2606:4700:a1::1 2606:4700:a1::2 2606:4700:a1::3 2606:4700:a1::4 2606:4700:a1::5 2606:4700:a1::6 2606:4700:a1::7 2606:4700:a1::8 2606:4700:a1::9 2606:4700:a1::10 | 7844 | TCP/UDP (http2/quic) |

#### `us-region2.v2.argotunnel.com`

| IPv4                                                                                                                               | IPv6                                                                                                                                                             | Port | Protocol             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------- |
| 198.41.219.1 198.41.219.2 198.41.219.3 198.41.219.4 198.41.219.5 198.41.219.6 198.41.219.7 198.41.219.8 198.41.219.9 198.41.219.10 | 2606:4700:a9::1 2606:4700:a9::2 2606:4700:a9::3 2606:4700:a9::4 2606:4700:a9::5 2606:4700:a9::6 2606:4700:a9::7 2606:4700:a9::8 2606:4700:a9::9 2606:4700:a9::10 | 7844 | TCP/UDP (http2/quic) |

FedRAMP High IPs

When deploying `cloudflared` in a [FedRAMP High ↗](https://www.cloudflare.com/cloudflare-for-government/) environment, `cloudflared` automatically routes to FedRAMP data centers based on the [tunnel token](https://developers.cloudflare.com/tunnel/advanced/tunnel-tokens/). Ensure your firewall allows outbound connections to these FedRAMP-specific destinations on port `7844` (TCP/UDP).

#### `fed-region1.v2.argotunnel.com`

| IPv4                                                                                                                                         | IPv6                                                                                                                                                             | Port | Protocols            |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------- |
| 162.159.234.1 162.159.234.2 162.159.234.3 162.159.234.4 162.159.234.5 162.159.234.6 162.159.234.7 162.159.234.8 162.159.234.9 162.159.234.10 | 2a06:98c1:4d::1 2a06:98c1:4d::2 2a06:98c1:4d::3 2a06:98c1:4d::4 2a06:98c1:4d::5 2a06:98c1:4d::6 2a06:98c1:4d::7 2a06:98c1:4d::8 2a06:98c1:4d::9 2a06:98c1:4d::10 | 7844 | TCP/UDP (http2/quic) |

#### `fed-region2.v2.argotunnel.com`

| IPv4                                                                                                                               | IPv6                                                                                                                                                             | Port | Protocols            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------- |
| 172.64.234.1 172.64.234.2 172.64.234.3 172.64.234.4 172.64.234.5 172.64.234.6 172.64.234.7 172.64.234.8 172.64.234.9 172.64.234.10 | 2606:4700:f6::1 2606:4700:f6::2 2606:4700:f6::3 2606:4700:f6::4 2606:4700:f6::5 2606:4700:f6::6 2606:4700:f6::7 2606:4700:f6::8 2606:4700:f6::9 2606:4700:f6::10 | 7844 | TCP/UDP (http2/quic) |

SNI-enforcing firewalls

If your firewall enforces Server Name Indication (SNI), also allow these hostnames on port `7844`:

| Hostname                                | Port | Protocols            |
| --------------------------------------- | ---- | -------------------- |
| \_v2-origintunneld.\_tcp.argotunnel.com | 7844 | TCP (http2)          |
| cftunnel.com                            | 7844 | TCP/UDP (http2/quic) |
| h2.cftunnel.com                         | 7844 | TCP (http2)          |
| quic.cftunnel.com                       | 7844 | UDP (quic)           |

Optional port 443 destinations

Opening port `443` enables optional features like software auto-updates and Access JWT validation. `cloudflared` runs correctly without these connections.

| Destination                           | Purpose                                   |
| ------------------------------------- | ----------------------------------------- |
| api.cloudflare.com                    | Software update checks                    |
| update.argotunnel.com                 | Software update checks                    |
| github.com                            | Download latest release                   |
| <team-name>.cloudflareaccess.com      | Access JWT validation (if Access enabled) |
| pqtunnels.cloudflareresearch.com      | Post-quantum error reporting              |
| cfd-features.argotunnel.com (DNS TXT) | UDP datagram version negotiation          |

To verify your firewall allows tunnel traffic, refer to [Connection errors](https://developers.cloudflare.com/tunnel/troubleshooting/#connection-errors).

## Run parameters

These flags apply to the `cloudflared tunnel run` command. They control how the tunnel runs on your operating system.

The most commonly used parameters:

| Parameter                                                                                 | Default               | Description                                                         |
| ----------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------- |
| [\--loglevel](https://developers.cloudflare.com/tunnel/advanced/run-parameters/#loglevel) | info                  | Log verbosity: debug, info, warn, error, fatal                      |
| [\--logfile](https://developers.cloudflare.com/tunnel/advanced/run-parameters/#logfile)   | stdout                | Path to write log output                                            |
| [\--metrics](https://developers.cloudflare.com/tunnel/advanced/run-parameters/#metrics)   | 127.0.0.1:20241–20245 | Prometheus metrics endpoint address (first available port in range) |
| [\--protocol](https://developers.cloudflare.com/tunnel/advanced/run-parameters/#protocol) | auto                  | Connection protocol: auto, quic, http2                              |
| [\--region](https://developers.cloudflare.com/tunnel/advanced/run-parameters/#region)     | global                | Route through US-only data centers with us                          |
| [\--token](https://developers.cloudflare.com/tunnel/advanced/run-parameters/#token)       | —                     | Tunnel token (remotely-managed tunnels)                             |

The following example shows how to manually run a tunnel with configuration flags:

Terminal window

```

cloudflared tunnel --loglevel info --logfile /var/log/cloudflared/cloudflared.log run --token <TOKEN VALUE>


```

For the complete list of run parameters and instructions on how to add them to a tunnel service, refer to [Run parameters](https://developers.cloudflare.com/tunnel/advanced/run-parameters/).

## Origin parameters

Origin configuration parameters control how `cloudflared` proxies traffic to your origin server.

The most commonly used parameters:

| Parameter                                                                                                 | Default | Description                               |
| --------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| [originServerName](https://developers.cloudflare.com/tunnel/advanced/origin-parameters/#originservername) | ""      | Hostname expected from origin certificate |
| [noTLSVerify](https://developers.cloudflare.com/tunnel/advanced/origin-parameters/#notlsverify)           | false   | Disable TLS certificate verification      |
| [httpHostHeader](https://developers.cloudflare.com/tunnel/advanced/origin-parameters/#httphostheader)     | ""      | Override HTTP Host header                 |
| [connectTimeout](https://developers.cloudflare.com/tunnel/advanced/origin-parameters/#connecttimeout)     | 30s     | TCP connection timeout to origin          |

For the complete list of origin parameters and setup instructions, refer to [Origin parameters](https://developers.cloudflare.com/tunnel/advanced/origin-parameters/).

## Permissions

You can scope Cloudflare member permissions to individual [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances instead of granting account-wide access. This lets you delegate management of specific Tunnels — for example, letting an application team manage one Tunnel without exposing the rest of your account.

Refer to [Granular permissions](https://developers.cloudflare.com/tunnel/advanced/granular-permissions/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/configuration/#page","headline":"Configuration · Cloudflare Docs","description":"Configure tunnel ingress rules, origins, and protocol settings.","url":"https://developers.cloudflare.com/tunnel/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Post-quantum","QUIC"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/configuration/","name":"Configuration"}}]}
```
