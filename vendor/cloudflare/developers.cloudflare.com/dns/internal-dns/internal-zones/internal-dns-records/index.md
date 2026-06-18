---
title: Manage internal DNS records
description: Manage internal DNS records in Cloudflare. Learn about supported DNS record types and CNAME flattening.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage internal DNS records

Internal zones can contain the same [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/) that Cloudflare supports for public zones.

You can manage internal DNS records in the same way as you would manage public DNS records, with the difference that [proxy status](https://developers.cloudflare.com/dns/proxy-status/) does not apply to internal DNS records.

Refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) or to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/) for further guidance.

## CNAME flattening in Internal DNS

With [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/), Cloudflare finds the final target content that a CNAME points to and then returns this content instead of a CNAME record. With Internal DNS, CNAME flattening is applied by default and cannot be turned off.

Cloudflare will try to flatten the CNAME record considering both the specified [DNS view](https://developers.cloudflare.com/dns/internal-dns/dns-views/) and any existing [reference zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/reference-zones/). If the reference zone then has another CNAME, the record will again be considered from the perspective of the original view.

Example

* Query for the `A` record on `abc.example.local` with view ID 111.
* Zone 600 references zone 700, which is not linked to any view.

flowchart LR
accTitle: Internal DNS zones and CNAME flattening example
accDescr: Diagram exemplifying Internal DNS zones and containing CNAME and A records

subgraph Internal DNS
subgraph Zone 700 - net
A["@ A 192.0.2.10"]
B["xyz CNAME def.example.local"]
end
subgraph View 111 - London
subgraph Zone 600 - example.local
X["@ A 192.0.2.1"]
Y["abc CNAME xyz.net"]
U["def TXT 15192-51"]
Z["def A 192.0.2.9"]
end
end
end

After finding the CNAME record that points to `xyz.net`, Cloudflare cannot resolve it within zone 600\. However, since this zone is referencing zone 700, this will be considered in the resolution.

The record in zone 700 points to `def.example.local`, which Cloudflare will then try to resolve in the original view. As an `A` record can be found for `def.example.local`, Cloudflare will return the corresponding IP address - in this example, `192.0.2.9`.

If it is not possible to flatten the CNAME record, the following will happen:

1. The CNAME record is returned to [Gateway resolver](https://developers.cloudflare.com/dns/internal-dns/#architecture-overview) as-is.
2. Gateway resolver will process the returned record, depending on the **Fallback through public DNS** configuration:  
   * On: Gateway will try to resolve the query by sending it to Cloudflare's public DNS resolver ([1.1.1.1](https://developers.cloudflare.com/1.1.1.1/)).  
   * Off: Gateway will return the response as-is to the client.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/internal-dns-records/#page","headline":"Manage internal DNS records · Cloudflare DNS docs","description":"Manage internal DNS records in Cloudflare. Learn about supported DNS record types and CNAME flattening.","url":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/internal-dns-records/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/internal-zones/","name":"Internal zones"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/internal-dns/internal-zones/internal-dns-records/","name":"Manage internal DNS records"}}]}
```
