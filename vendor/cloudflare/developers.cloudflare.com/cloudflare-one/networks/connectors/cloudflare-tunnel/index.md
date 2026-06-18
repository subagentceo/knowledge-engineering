---
title: Cloudflare Tunnel
description: How Cloudflare Tunnel works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Tunnel

Looking to expose public applications?

This documentation covers Cloudflare Tunnel use cases for private networking and Zero Trust, like VPN replacement and private network access. For publishing public web applications, APIs, and services to the Internet through Cloudflare refer to the [Cloudflare Tunnel documentation](https://developers.cloudflare.com/tunnel).

Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address. With Tunnel, you do not send traffic to an external IP — instead, a lightweight daemon in your infrastructure (`cloudflared`) creates [outbound-only connections](#outbound-only-connections) to Cloudflare's global network. Cloudflare Tunnel can connect HTTP web servers, [SSH servers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/), [remote desktops](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/), and other protocols safely to Cloudflare. This way, your origins can serve traffic through Cloudflare without being vulnerable to attacks that bypass Cloudflare.

Refer to our [reference architecture](https://developers.cloudflare.com/reference-architecture/architectures/sase/) for details on how to implement Cloudflare Tunnel into your existing infrastructure.

## How it works

`cloudflared` establishes [outbound connections](#outbound-only-connections) (tunnels) between your resources and Cloudflare's global network. A tunnel is a persistent object identified by a UUID — it serves as the logical link between your origin and Cloudflare. Within the same tunnel, you can run as many `cloudflared` processes ([connectors](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/#connector)) as needed. Each connector sends traffic to the nearest Cloudflare data center.

![How an HTTP request reaches a private application connected with Cloudflare Tunnel](https://developers.cloudflare.com/_astro/handshake.eh3a-Ml1_26dKUX.webp) 

### Outbound-only connections

Cloudflare Tunnel uses an outbound-only connection model to enable bidirectional communication. When you install and run `cloudflared`, `cloudflared` initiates an outbound connection through your firewall from the origin to the Cloudflare global network.

Once the connection is established, traffic flows in both directions over the tunnel between your origin and Cloudflare. Most firewalls allow outbound traffic by default. `cloudflared` takes advantage of this standard by connecting out to the Cloudflare network from the server you installed `cloudflared` on. You can then configure your firewall to allow only these outbound connections and block all inbound traffic, effectively blocking access to your origin from anything other than Cloudflare. This setup ensures that all traffic to your origin is securely routed through the tunnel.

## Next steps

* Create a tunnel using the [Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or [API](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/).
* [Download cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/), the server-side daemon that connects your infrastructure to Cloudflare.
* Review useful [Tunnel terms](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/) to familiarize yourself with the concepts used in Tunnel documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/#page","headline":"Cloudflare Tunnel · Cloudflare One docs","description":"How Cloudflare Tunnel works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Video","Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}}]}
```
