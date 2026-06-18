---
title: Private network routing
description: Route DNS record traffic to private origins through tunnels.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Private network routing

Private network routing allows you to proxy HTTP/HTTPS traffic from public hostnames to origins in your private network. When you enable this setting on a DNS record, Cloudflare routes traffic through your configured tunnel instead of over the public Internet.

For an end-to-end setup walkthrough using Cloudflare WAN (formerly Magic WAN) IPsec, refer to [Set up a private origin via Cloudflare WAN](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-wan/).

Closed beta

This feature is in closed beta. Contact your account team to request access.

## Aspects to consider

Before you enable private network routing, consider the following:

* You need an active tunnel connection to Cloudflare through one of the supported on-ramp methods. Refer to [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/on-ramps/) for further guidance.
* Private network routing is available for `A` (IPv4) and `AAAA` (IPv6) records only. Records must be [proxied](https://developers.cloudflare.com/dns/proxy-status/).
* If you have multiple `A` or `AAAA` records on the same name, and at least one of them has private network routing enabled, all records on that name will use private network routing. This is consistent with the [proxy status behavior](https://developers.cloudflare.com/dns/proxy-status/#mix-proxied-and-unproxied) in these cases.

## IP ranges

The following private address ranges are automatically detected:

| Range          | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| 10.0.0.0/8     | Private ([RFC 1918 ↗](https://www.rfc-editor.org/rfc/rfc1918.html)) |
| 172.16.0.0/12  | Private ([RFC 1918 ↗](https://www.rfc-editor.org/rfc/rfc1918.html)) |
| 192.168.0.0/16 | Private ([RFC 1918 ↗](https://www.rfc-editor.org/rfc/rfc1918.html)) |
| fc00::/7       | Private ([RFC 4193 ↗](https://www.rfc-editor.org/rfc/rfc4193.html)) |
| 100.64.0.0/10  | CGNAT ([RFC 6598 ↗](https://www.rfc-editor.org/rfc/rfc6598.html))   |

When you use an IP address from one of these ranges, the **Use private network routing** toggle turns on automatically. You can also turn it on manually for public IP addresses that are only reachable through your tunnel.

## Enable private network routing

Virtual networks

Traffic routes through your default virtual network. Selecting a specific virtual network is not supported.

* [ Dashboard ](#tab-panel-8119)
* [ API ](#tab-panel-8120)

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record** or select **Edit** on an existing `A` or `AAAA` record.
3. Enter the origin IP address.
4. Verify that **Proxy status** is enabled (orange cloud).
5. Turn on **Use private network routing**.  
For [private IP addresses](#ip-ranges) (for example, `10.0.0.50`), the toggle turns on automatically. For public IP addresses used with private infrastructure, turn on the toggle manually.
6. Select **Save**.

To create a record with private routing enabled, use a [POST request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) and set `private_routing` to `true`:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Create DNS Record

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "A",

    "name": "app.example.com",

    "content": "10.0.0.50",

    "proxied": true,

    "private_routing": true

  }'


```

To enable private routing on an existing record, use a [PATCH request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/edit/):

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Update DNS Record

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$DNS_RECORD_ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "private_routing": true

  }'


```

### API field behavior

If you use the API to create or edit DNS records with private network routing, consider the following:

| Scenario                              | private\_routing value |
| ------------------------------------- | ---------------------- |
| Proxied A/AAAA record with private IP | Auto-set to true       |
| Proxied A/AAAA record with public IP  | Defaults to false      |
| Non-A/AAAA record types               | Field not supported    |

Also, if you manually set `private_routing: false` on a proxied `A`/`AAAA` record with private IP, the API will return an error.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/private-origins/private-network-routing/#page","headline":"Private network routing · Cloudflare DNS docs","description":"Route DNS record traffic to private origins through tunnels.","url":"https://developers.cloudflare.com/dns/private-origins/private-network-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/private-origins/","name":"Private origins (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/private-origins/private-network-routing/","name":"Private network routing"}}]}
```
