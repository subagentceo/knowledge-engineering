---
title: Total TLS
description: Issue individual certificates for every proxied subdomain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Total TLS

Total TLS allows Cloudflare to issue individual certificates for your proxied hostnames. These certificates will protect proxied hostnames not covered by [Universal certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/).

Warning

Total TLS certificates follow the Common Name (CN) restriction of 64 characters ([RFC 5280 ↗](https://www.rfc-editor.org/rfc/rfc5280.html)). If you have a hostname that exceeds this length, you can create an [Advanced Certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) via API to cover it.

When issued, these certificates will have a type of **Advanced - Total TLS**, and their default validity period is 90 days.

## Reference

* [ Enable ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/enable/)
* [ Error messages ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/error-messages/)

## Availability

Total TLS is available for domains that have purchased [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) and are currently using a [full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/).

## Limitations

### Hostnames used with other Cloudflare products

Total TLS does not issue certificates for any hostnames used with:

* [Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/)
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/)
* [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/)

You can use other types of certificates or manually [order advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) for these hostnames.

### Deleting certificates

Once you [enable Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/enable/), be careful deleting any Total TLS certificates associated with proxied hostnames.

If you do, our system assumes you want to opt that hostname out of Total TLS certificate and will not order new certificates for the hostname in the future. This behavior applies even if you delete and re-create the hostname's DNS record.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/#page","headline":"Total TLS · Cloudflare SSL/TLS docs","description":"Issue individual certificates for every proxied subdomain.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/total-tls/","name":"Total TLS"}}]}
```
