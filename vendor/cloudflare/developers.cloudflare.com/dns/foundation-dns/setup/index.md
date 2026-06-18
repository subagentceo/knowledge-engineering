---
title: Set up advanced nameservers
description: Set up advanced nameservers for your Foundation DNS zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up advanced nameservers

Advanced nameservers included with [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/) are an opt-in configuration.

Note

After enabling advanced nameservers, standard nameservers still respond to DNS queries.

## Before you begin

Before opting in for advanced nameservers, consider the following:

* The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

### Differences from standard nameservers

Some behaviors are different from standard Cloudflare nameservers:

* Wildcard records are still supported but, with advanced nameservers, a wildcard record (`*.example.com`) will not apply to a subdomain that is an empty non-terminal. An empty non-terminal is a node in the DNS tree that has no records associated with it but has descendants that do, as exemplified below. This behavior is in compliance with [RFC 4592 ↗](https://www.rfc-editor.org/rfc/rfc4592.html), which defines the role of empty non-terminals in wildcard resolution.

Example

DNS management for **example.com**

| **Type** | **Name** | **Content** |
| -------- | -------- | ----------- |
| A        | \*       | 192.0.2.1   |
| A        | a.b      | 192.0.2.5   |

In this example, `a.b.example.com` is a descendant of `b.example.com`, and `b.example.com` is an empty non-terminal. This means that the wildcard `*.example.com` will not apply to `b.example.com`.

* Subdomain delegation: once a subdomain is delegated via NS records, Cloudflare will not serve any other records (such as A, TXT, or CNAME) on that subdomain from the parent zone, even if those records exist.

Example

DNS management for **example.com**

| **Type** | **Name** | **Content**                        |
| -------- | -------- | ---------------------------------- |
| NS       | www      | ns1.externalhost.com               |
| NS       | www      | ns2.externalhost.com               |
| TXT      | www      | "5bb16e6b5a444eedb48ace40c471bcc9" |
| A        | www      | 192.0.2.1                          |

In this example, the TXT record and the A record for `www.example.com` will not be served.

## Enable on a zone

To enable advanced nameservers on an existing zone:

1. Opt for advanced nameservers on your zone:  
   * [ Dashboard ](#tab-panel-8073)  
   * [ API ](#tab-panel-8074)  
   1. In the Cloudflare dashboard, go to the **DNS Records** page.  
   [ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)  
   2. In the **Cloudflare nameservers** card, enable **Advanced nameservers**.  
   3. After you refresh the page, the card will display the values for your advanced nameservers `NS` records.  
Use the [Update DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) endpoint to send a PATCH request like the following:  
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
    "foundation_dns": true  
  }'  
```  
The response body will contain your assigned nameservers in the `nameservers` object. You will use these nameservers in the next step.
2. Update the authoritative nameservers at your registrar. This step depends on whether you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/):  
   * If you are using Cloudflare Registrar, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to have your nameservers updated.  
   * If you are using a different registrar or if your zone is delegated, [manually update your nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/#specific-processes).  
   Warning  
   Make sure the values for your assigned nameservers are copied exactly.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/foundation-dns/setup/#page","headline":"Set up advanced nameservers · Cloudflare DNS docs","description":"Set up advanced nameservers for your Foundation DNS zone.","url":"https://developers.cloudflare.com/dns/foundation-dns/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/foundation-dns/","name":"Foundation DNS"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/foundation-dns/setup/","name":"Set up advanced nameservers"}}]}
```
