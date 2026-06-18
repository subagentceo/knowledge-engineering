---
title: Reference zones
description: Learn about reference zones. Cloudflare Internal DNS allows zones to reference others for query resolution when no direct record is found.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Reference zones

During an [internal DNS query resolution](https://developers.cloudflare.com/dns/internal-dns/#architecture-overview), if no internal record is found within a matching internal zone, Cloudflare will check if the matching internal zone is referencing another internal zone. Successive references can be followed with a maximum of five references in a chain.

Note

A wildcard record (`*.example.local`) in the matching internal zone will take precedence over an exact match in a reference zone.

## Configuration conditions

* Each internal zone can only reference one other zone.
* The same zone can be referenced by multiple internal zones.
* Public zones cannot be used as reference zones.
* Reference zones do not have to be linked to the same [DNS view](https://developers.cloudflare.com/dns/internal-dns/dns-views/) as the zone referencing them. They may also not be linked to any view at all.

## Set up

* [ Dashboard ](#tab-panel-8087)
* [ API ](#tab-panel-8088)

1. In the Cloudflare dashboard, go to the **Internal DNS** page.  
[ Go to **Internal DNS** ](https://dash.cloudflare.com/?to=/:account/internal-dns)
2. Select a zone.
3. Within the selected zone, go to **Reference zone**.
4. Select **Add reference zone**. If your zone already has a reference zone set up, you must first remove it. As explained in the [configuration conditions](#configuration-conditions), each internal zone can only reference one other zone at a time.
5. Find the zone you want to use as reference and choose **Select** in the respective row.

Use the [Update DNS settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) endpoint. In `--json`, specify the `internal_dns` object with the parameter `reference_zone_id`.

In the following example, internal zone A (ID `8a904aeb565c42cfa207d98f6edea2f3`) is referencing internal zone B (ID `8e64c6fb4b514f3faf64de81efc11e51`).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone DNS Settings Write`
* `DNS Write`

Update DNS Settings

```

curl "https://api.cloudflare.com/client/v4/zones/8a904aeb565c42cfa207d98f6edea2f3/dns_settings" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "internal_dns": {

        "reference_zone_id": "8e64c6fb4b514f3faf64de81efc11e51"

    }

  }'


```

A third zone (C) could also point to zone B as a reference, but zone A cannot add another zone as a reference while also having zone B configured as its reference zone.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/reference-zones/#page","headline":"Reference zones · Cloudflare DNS docs","description":"Learn about reference zones. Cloudflare Internal DNS allows zones to reference others for query resolution when no direct record is found.","url":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/reference-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/internal-zones/","name":"Internal zones"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/internal-dns/internal-zones/reference-zones/","name":"Reference zones"}}]}
```
