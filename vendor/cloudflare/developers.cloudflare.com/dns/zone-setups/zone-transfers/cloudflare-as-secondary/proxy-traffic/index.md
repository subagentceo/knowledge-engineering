---
title: Proxy traffic
description: Proxy traffic through Cloudflare on secondary zones.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Proxy traffic

When you set up [incoming zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) on a secondary zone, you cannot enable the proxy on any transferred DNS records by default.

With Secondary DNS override, you can use Cloudflare as your secondary DNS provider but still get the [performance and security benefits](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy) of Cloudflare's proxy. Additionally it lets you override any A and AAAA records on your zone apex with a CNAME record.

Note

Only A, AAAA, and CNAME records can be proxied.

## Prerequisites

Before you set up Secondary DNS override, make sure that you have:

* [Set up a secondary DNS zone](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) and confirmed your DNS records are transferred correctly.
* Set your [DNSSEC with Secondary DNS ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings/) option to either **Unsigned** or **Live Signing**. If set to [Pre-signed](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/#set-up-pre-signed-dnssec), Cloudflare will treat all your DNS records as unproxied (DNS only).
* Removed all nameservers from your registrar except for those provided by Cloudflare (highly recommended).  
Warning  
If you use Secondary DNS override and keep other nameservers at your registrar, DNS responses will be inconsistent across DNS providers, which goes against [official standards ↗](https://www.iana.org/help/nameserver-requirements).

## Set up Secondary DNS override

* [ Dashboard ](#tab-panel-8159)
* [ API ](#tab-panel-8160)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Enable **Secondary DNS override**.
3. On the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page, for specific A, AAAA, or CNAME records, select the grey cloud icon to set their **Proxy status** to **Proxied**.

1. To enable Secondary DNS override on a zone, use the following PATCH request:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone DNS Settings Write`
* `DNS Write`

Update DNS Settings

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "secondary_overrides": true

  }'


```

1. For specific A, AAAA, or CNAME records, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) request with the `proxied` status as `true`.  
   * Make sure the added record has the same name as the transferred record you intend to proxy. Cloudflare only looks at the name and the proxy status, so the record content does not matter.

Zone transfers interaction

Zone transfers from the primary (including content or TTL changes) do not change the proxy status of records you set to proxied. The override persists until the record is deleted on the primary.

## Proxied A and AAAA records

After proxying (orange clouding) a Secondary DNS record, any additional records under that hostname transferred from the primary DNS provider are automatically proxied. This applies to all A and AAAA records under that domain.

## CNAME record on the zone apex

You can also add a CNAME record on the zone apex (supported through [CNAME Flattening](https://developers.cloudflare.com/dns/cname-flattening/)) and either proxy that record or keep it on DNS Only.

Once you create a CNAME record at the apex, existing A or AAAA records on the zone apex will be deactivated. You can view those deactivated records by clicking **View Inactive Records**. To re-activate the A or AAAA records at the root, remove the CNAME record.

## Verify that your records are proxied

Query DNS at your assigned Secondary DNS nameserver to confirm the DNS response Cloudflare returns. Records proxied by Cloudflare return [Cloudflare IPs ↗](https://www.cloudflare.com/ips/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/#page","headline":"Proxy traffic with Secondary DNS override · Cloudflare DNS docs","description":"Proxy traffic through Cloudflare on secondary zones.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/","name":"Cloudflare as Secondary"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/","name":"Proxy traffic"}}]}
```
