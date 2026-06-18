---
title: Tunnels FAQ
description: Review frequently asked questions about tunnels in Cloudflare Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnels FAQ

[❮ Back to FAQ](https://developers.cloudflare.com/cloudflare-one/faq/)

## ​Can I create a Tunnel for an apex domain?

Yes. With [Named Tunnels ↗](https://blog.cloudflare.com/argo-tunnels-that-live-forever/) you can create a CNAME at the apex that points to the named tunnel.

## ​Does Cloudflare Tunnel support Websockets?

Yes. Cloudflare Tunnel has full support for Websockets.

## ​Does Cloudflare Tunnel support gRPC?

Yes. 

Cloudflare Tunnel supports gRPC traffic via [private subnet routing](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/). Public hostname deployments are not currently supported.

## How can Tunnel be used with Partial DNS (CNAME Setup)?

Cloudflare offers two modes of setup: [Full Setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/), in which the domain uses Cloudflare DNS nameservers, and [Partial Setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) (also known as CNAME setup) in which the domain uses non-Cloudflare DNS servers.

The best experience with Cloudflare Tunnel is using Full Setup because Cloudflare manages DNS for the domain and can automatically configure DNS records for newly started Tunnels.

You can still use Tunnel with Partial Setup. You will need to create a new DNS record with your current DNS provider for each new hostname connected through Cloudflare Tunnel. The DNS record should be of type CNAME or ALIAS if it is on the root of the domain. The name of the record should be the subdomain it corresponds to (e.g. `example.com` or `tunnel.example.com`) and the value of the record should be `subdomain.domain.tld.cdn.cloudflare.net`. (e.g. `example.com.cdn.cloudflare.net` or `tunnel.example.com.cdn.cloudflare.net`)

For a complete walkthrough of using Access with a partial CNAME setup, refer to [Publish a self-hosted application to the Internet](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/#partial-cname-setup).

## How can origin servers be secured when using Tunnel?

Tunnel can expose web applications to the Internet that sit behind a NAT or firewall. Thus, you can keep your web server otherwise completely locked down. To double check that your origin web server is not responding to requests outside Cloudflare while Tunnel is running you can run netcat in the command line:

Terminal window

```

netcat -zv [your-server's-ip-address] 80

netcat -zv [your-server's-ip-address] 443


```

If your server is still responding on those ports, you will see:

```

[ip-address] 80 (http) open


```

If your server is correctly locked down, you will see:

```

[ip-address] 443 (https): Connection refused


```

## What records are created for routing to a Named Tunnel's hostname?

Named Tunnels can be routed via DNS records, in which case we use CNAME records to point to the `<UUID>.cfargotunnel.com`; Or as Load Balancing endpoints, which also point to `<UUID>.cfargotunnel.com`.

## Does Cloudflare Tunnel send visitor IPs to my origin?

No. When using Cloudflare Tunnel, all requests to the origin are made internally between `cloudflared` and the origin.

To log external visitor IPs, you will need to [configure an alternative method](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/).

## Why does the name 'warp' and 'argo' appear in some legacy materials?

Cloudflare Tunnel was previously named Warp during the beta phase. As Warp was added to the Argo product family, we changed the name to Argo Tunnel to match. Once we no longer required users to purchase Argo to create Tunnels, we renamed Argo Tunnel to Cloudflare Tunnel.

## Is it possible to restore a deleted tunnel?

No. You cannot undo a tunnel deletion. If the tunnel was locally-managed, its [config.yaml file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/#configuration-file) will still be present and you can create a new tunnel with the same configuration. If the tunnel was remotely-managed, both the tunnel and its configuration are permanently deleted.

## How do I contact support?

Before contacting the Cloudflare support team:

1. Take note of any specific error messages and/or problematic behaviors.
2. Make sure that `cloudflared` is updated to the [latest version ↗](https://github.com/cloudflare/cloudflared).
3. Gather any relevant error/access logs from your server.
4. If needed set [\--loglevel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#loglevel) to `debug`, so the Cloudflare support team can get more info from the `cloudflared.log` file.
5. Include your [Cloudflare Tunnel diagnostic logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/) (`cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/faq/cloudflare-tunnels-faq/#page","headline":"Tunnels FAQ · Cloudflare One docs","description":"Review frequently asked questions about tunnels in Cloudflare Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/faq/cloudflare-tunnels-faq/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WebSockets","DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/faq/cloudflare-tunnels-faq/","name":"Tunnels FAQ"}}]}
```
