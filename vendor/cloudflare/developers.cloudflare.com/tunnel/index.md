---
title: Cloudflare Tunnel
description: Securely connect your origin servers, APIs, and services to Cloudflare with post-quantum encrypted tunnels — no public IPs required.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Tunnel

Securely connect your origin servers, APIs, and services to Cloudflare with post-quantum encrypted tunnels — no public IPs required.

 Available on all plans 

Looking for private networking or Zero Trust?

This documentation covers Cloudflare Tunnel use cases for public applications. For VPN replacement, private network access, and network traffic filtering, refer to the [Cloudflare One Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

Cloudflare Tunnel connects your infrastructure to Cloudflare through an outbound-only, [post-quantum encrypted](https://developers.cloudflare.com/ssl/post-quantum-cryptography/) connection. Instead of exposing a public IP, you install a lightweight daemon called `cloudflared` on your server. It creates a persistent tunnel to Cloudflare's global network, so all traffic to your origins flows through Cloudflare — where CDN caching, WAF, Bot Management, and DDoS protection are applied automatically.

No open inbound ports. No public IPs. No attack surface.

## How it works

1. Install `cloudflared` on your server or network.
2. `cloudflared` establishes outbound, post-quantum encrypted connections to Cloudflare — no inbound ports or firewall changes required.
3. Map public hostnames to local services (for example, `app.example.com` to `http://localhost:8080`).
4. Traffic flows through Cloudflare's network to your origin, with full CDN and security applied.

Each tunnel maintains four long-lived connections to two Cloudflare data centers for built-in redundancy. You can run multiple `cloudflared` [replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) for additional high availability.

![How an HTTP request reaches an origin connected with Cloudflare Tunnel](https://developers.cloudflare.com/_astro/handshake.eh3a-Ml1_26dKUX.webp) 

## Use cases

* **Secure origin connectivity** — Eliminate public origin IPs. All traffic flows through Cloudflare with CDN, WAF, and DDoS protection applied.
* **Public ingress routing** — Publish internal applications to the internet by mapping public hostnames to local services. Supports HTTP, HTTPS, TCP, SSH, RDP, and [more](https://developers.cloudflare.com/tunnel/routing/#supported-protocols).
* **Workers VPC** — Enable [Cloudflare Workers](https://developers.cloudflare.com/workers-vpc/) to securely access private databases, APIs, and services through your tunnel.
* **Load Balancing** — Use tunnels as origin endpoints in [Cloudflare Load Balancer](https://developers.cloudflare.com/load-balancing/) pools for high availability and intelligent traffic steering.

## Get started

[Create your first tunnel](https://developers.cloudflare.com/tunnel/setup/) 

Set up a tunnel in under 5 minutes using the dashboard or API.

[Routing](https://developers.cloudflare.com/tunnel/routing/) 

DNS records, protocols, and load balancing for published applications.

[Integrations](https://developers.cloudflare.com/tunnel/integrations/) 

Cloudflare One, Workers VPC, Load Balancing, Access, and more.

[Configuration](https://developers.cloudflare.com/tunnel/configuration/) 

Replicas, firewall rules, tokens, and runtime parameters.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/tunnel/#page","headline":"Cloudflare Tunnel · Cloudflare Docs","description":"Securely connect your origin servers, APIs, and services to Cloudflare with post-quantum encrypted tunnels — no public IPs required.","url":"https://developers.cloudflare.com/tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Post-quantum"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}}]}
```
