---
title: DNS records
description: DNS records in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS records

When you create a tunnel, Cloudflare generates a subdomain at `<UUID>.cfargotunnel.com`. You point a CNAME record at this subdomain to route traffic from your hostname to the tunnel.

The `cfargotunnel.com` subdomain only proxies traffic for DNS records in the same Cloudflare account. If someone discovers your tunnel UUID, they cannot create a DNS record in another account to proxy traffic through it.

## Create a DNS record

To create a DNS record for a Cloudflare Tunnel:

* [ Dashboard ](#tab-panel-7297)
* [ CLI ](#tab-panel-7298)

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **DNS Records** for your domain.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**.
3. Enter the following values:  
   * **Type**: _CNAME_  
   * **Name**: Subdomain of your application  
   * **Target**: `<UUID>.cfargotunnel.com`
4. Select **Save**.

![Example of fields completed to create a new CNAME record.](https://developers.cloudflare.com/_astro/dns-record.B25etJTI_Z1p13KV.webp)

For locally-managed tunnels, run the following command to create a CNAME record pointing to your tunnel subdomain:

Terminal window

```

cloudflared tunnel route dns <UUID or NAME> www.app.com


```

This creates a CNAME record but does not proxy traffic unless the tunnel is running.

Note

To create DNS records using `cloudflared`, the [cert.pem](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#certpem) file must be installed on your system.

The DNS record and the tunnel are independent. You can create DNS records that point to a tunnel that is not running. If a tunnel stops, the DNS record is not deleted — visitors will see a `1016` error.

You can also create multiple DNS records pointing to the same tunnel subdomain. If you route traffic from multiple hostnames to multiple services, create a CNAME entry for each hostname. All entries share the same target.

## Cloudflare settings

Published applications inherit the Cloudflare settings for their hostname, including [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/), [WAF rules](https://developers.cloudflare.com/waf/), and other [Rules](https://developers.cloudflare.com/rules/) configurations. You can change these settings for each hostname in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

If you use a load balancer, settings are applied to the load balancer hostname instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/#page","headline":"DNS records · Cloudflare One docs","description":"DNS records in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/","name":"Published applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/","name":"DNS records"}}]}
```
