---
title: Troubleshooting
description: Troubleshoot common private network routing and private origin issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

## Error 1002: DNS points to prohibited IP

This error occurs when you proxy a private IP address without the necessary entitlement. Contact your account team to request access.

## Setting seems off but traffic routes through tunnel

Check for other records on the same name.

Private network routing applies per name, not per record. If you have multiple `A` or `AAAA` records on the same name and at least one of them has private network routing enabled, all records on that name will use private network routing.

## Traffic not reaching origin

If traffic is not reaching your private origin:

1. Verify your tunnel is active and healthy in the Cloudflare dashboard.
2. Confirm the origin IP is routable within your private network.
3. Check that `private_routing` is set to `true` on the DNS record.
4. Verify the record has proxy status enabled.

## Connection timeouts from clients

Cloudflare Source IP is set to a public range. Set it to a private `/12`. Refer to [Configure Cloudflare source IPs](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/).

## Request times out with no response on the origin

The network where your origin lives has no return route for the Cloudflare Source IP range. Add a route that sends that range back through the tunnel.

## Tunnel shows IKE established but health checks fail

ICMP is blocked on the path or the health check is misconfigured. Allow ICMP between the tunnel endpoints and confirm the health check direction is `bidirectional` and type is `reply`.

## Traffic tries to route over the public Internet

The **Use private network routing** toggle is not turned on for the DNS record. Edit the record and turn the toggle on. Refer to [Private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/) for dashboard and API steps.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/private-origins/troubleshooting/#page","headline":"Troubleshooting · Cloudflare DNS docs","description":"Troubleshoot common private network routing and private origin issues.","url":"https://developers.cloudflare.com/dns/private-origins/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/private-origins/","name":"Private origins (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/private-origins/troubleshooting/","name":"Troubleshooting"}}]}
```
