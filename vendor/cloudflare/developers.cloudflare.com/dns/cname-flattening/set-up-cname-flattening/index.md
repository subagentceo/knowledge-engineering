---
title: Setup
description: Configure CNAME flattening for your zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

Note

If the CNAME target is on the same zone as the CNAME record, Cloudflare proceeds with CNAME flattening and ignores the **CNAME Flattening** setting.

## For your zone apex

CNAME flattening occurs by default for all plans when your domain uses a CNAME record for its zone apex (`example.com`, meaning the record **Name** is set to `@`).

## For all CNAME records

For zones on paid plans, you can choose to flatten all CNAME records. This option is useful for DNS-only (unproxied) CNAME records. [Proxied records](https://developers.cloudflare.com/dns/proxy-status/) are flattened by default as they return Cloudflare anycast IPs.

* [ Dashboard ](#tab-panel-8065)
* [ API ](#tab-panel-8066)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Turn on the option **CNAME flattening for all CNAME records**.

Make a `PATCH` request to the [Update DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) endpoint and set `flatten_all_cnames` to `true` in the request body.

Warning

If a CNAME target is being used to verify a domain for a third-party service, turning on [CNAME flattening for all CNAME records](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#for-all-cname-records) may cause the verification to fail since the CNAME record itself will not be returned directly.

## Per record

Paid zones also have the option of flattening specific CNAME records.

If you use this option, a special [tag](https://developers.cloudflare.com/dns/manage-dns-records/reference/record-attributes/) `cf-flatten-cname` will be added to the respective flattened CNAME records in your zone file, allowing you to [export and import records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/) without losing this configuration.

* [ Dashboard ](#tab-panel-8063)
* [ API ](#tab-panel-8064)

1. On the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page, make sure that **CNAME flattening for all CNAME records** is turned off.
2. Go to the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page and find the CNAME record you would like to flatten.
3. Select **Edit** and turn on the **Flatten** option.
4. Select **Save** to confirm.

Unavailable flatten option

For the following cases, **Flatten** will not be available:

* The record is at the [zone apex](#for-your-zone-apex).
* The record is already proxied, which means it will be flattened by default.
* **CNAME flattening for all CNAME records** is turned on, which means you cannot override it per record.

With the available [API endpoints](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/), specify the following for each CNAME record in the request body:

```

"settings": {

  "flatten_cname": true

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#page","headline":"Set up CNAME flattening · Cloudflare DNS docs","description":"Configure CNAME flattening for your zone.","url":"https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/cname-flattening/","name":"CNAME flattening"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/cname-flattening/set-up-cname-flattening/","name":"Setup"}}]}
```
