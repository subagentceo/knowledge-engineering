---
title: Set up zone custom nameservers
description: With zone-level custom nameservers, each custom nameserver name must be a subdomain of the zone where the custom nameservers are configured. These custom nameservers can only be used within the respective zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up zone custom nameservers

With zone custom nameservers (ZCNS), each custom nameserver name must be a subdomain of the zone where the custom nameservers are configured.

For example, for a zone `domain.test`, the ZCNS can be `ns1.domain.test` and `ns2.domain.test` but they cannot use a different TLD (`ns1.domain.org`) nor a different domain (`ns1.example.com`).

## Availability

Zone custom nameservers are available for zones on Business or Enterprise plans. Via API or on the dashboard.

## Use zone custom nameservers

### Primary zones (full setup)

To create zone custom nameservers:

* [ Dashboard ](#tab-panel-8115)
* [ API ](#tab-panel-8116)

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. On **Custom nameservers**, select **Configure**.
3. Select **Create custom nameservers just for `your-domain.com`** and enter the subdomains used for the ZCNS names (for example, `ns1`, `ns2`, `ns3`).
4. Select **Save** to confirm.

Use the [Edit zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/edit/) and specify the custom nameservers in the payload:

```

"vanity_name_servers": ["ns1.example.com","ns2.example.com"]


```

Cloudflare will assign an IPv4 and an IPv6 address to each ZCNS name and automatically create the associated `A` or `AAAA` records.

The next step depends on whether you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/) for your domain:

* If you are using Cloudflare Registrar for your domain, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to add the custom nameservers and IP addresses as glue records to the domain.
* If you are not using Cloudflare Registrar for your domain, add the zone custom nameservers at your registrar as your authoritative nameservers and as glue (A and AAAA) records ([RFC 1912 ↗](https://www.rfc-editor.org/rfc/rfc1912.html)). If you do not add these records, DNS lookups for your domain will fail.

### Secondary zones

If you are using [Cloudflare as a secondary DNS provider](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), you can still set up zone custom nameservers. After following the [steps above](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/zone-custom-nameservers/#primary-zones-full-setup) to create zone custom nameservers, do the following:

1. Get the ZCNS IPs. You can find them on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page or you can use the [Zone details endpoint](https://developers.cloudflare.com/api/resources/zones/methods/get/) to get the `vanity_name_servers_ips`.
2. At your primary DNS provider, add [NS records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ns) and, on the subdomains that you used as ZCNS names, add `A/AAAA` records.
3. At your registrar, add the zone custom nameservers as your authoritative nameservers and as glue (A and AAAA) records ([RFC 1912 ↗](https://www.rfc-editor.org/rfc/rfc1912.html)).

## Remove zone custom nameservers

To remove zone custom nameservers (and their associated, read-only DNS records):

* [ Dashboard ](#tab-panel-8117)
* [ API ](#tab-panel-8118)

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. On **Custom nameservers**, select **Disable**.

Use the [Edit zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/edit/) and include an empty array in the payload:

```

"vanity_name_servers": []


```

Cloudflare will remove your ZCNS and their associated read-only `A` or `AAAA` records.

If you are not using Cloudflare Registrar for your domain, make sure to adjust your nameservers at the registrar, parent zone, or Primary DNS provider accordingly.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/zone-custom-nameservers/#page","headline":"Zone custom nameservers · Cloudflare DNS docs","description":"With zone-level custom nameservers, each custom nameserver name must be a subdomain of the zone where the custom nameservers are configured. These custom nameservers can only be used within the respective zone.","url":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/zone-custom-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/nameservers/","name":"Nameservers"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/nameservers/custom-nameservers/","name":"Custom nameservers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/nameservers/custom-nameservers/zone-custom-nameservers/","name":"Set up zone custom nameservers"}}]}
```
