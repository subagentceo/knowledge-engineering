---
title: Browser compatibility
description: Review information about browser compatibility for the different Cloudflare SSL/TLS offerings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser compatibility

Cloudflare attempts to provide compatibility for as wide a range of user agents (browsers, API clients, etc.) as possible. However, the specific set of supported clients can vary depending on the different SSL/TLS certificate types, your visitor's [browser version](#non-sni-support), and the [certificate authority (CA)](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) that issues the certificate.

## Universal SSL

Cloudflare Universal SSL only supports browsers and API clients that use the [Server Name Indication (SNI) ↗](https://www.cloudflare.com/learning/ssl/what-is-sni/) extension to the TLS protocol.

Also, for zones on Free plan, Universal SSL is only compatible with browsers that support Elliptic Curve Digital Signature Algorithm (ECDSA).

Paid plans have additional compatibility, also supporting RSA algorithm.

## Other certificate types

Refer to [Certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) for a detailed list of Cloudflare SSL/TLS offerings, the different algorithms available, and browser compatibility for each CA.

## Non-SNI support

Although [SNI extensions ↗](https://www.cloudflare.com/learning/ssl/what-is-sni/) to the TLS protocol were standardized in 2003, some browsers and operating systems only implemented this extension when TLS 1.1 was released in 2006 (or 2011 for mobile browsers). If your visitors use devices that have not been updated since 2011, they may not have SNI support.

To support non-SNI requests, you can:

* [Upload a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate) and specify a value of `Legacy` for its client support.  
Note that `Legacy` custom certificates are not compatible with [BYOIP](https://developers.cloudflare.com/byoip/) and that, unlike [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) or [advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare does not manage issuance and renewal for [custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/).
* (BYOIP customers only) Enterprise customers can choose to bring their own IP prefix to the Cloudflare network and [specify the default SNI used for any non-SNI handshake in the address map](https://developers.cloudflare.com/byoip/address-maps/setup/#non-sni-support).
* (Paid plans only) [Contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) and request a set of non-SNI IPs for your zone.

## HTTPS records

[HTTPS Service (HTTPS) records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#svcb-and-https) allow you to provide a client with information about how it should connect to a server upfront, without the need of an initial plaintext HTTP connection.

If your domain has [HTTP/2 or HTTP/3 enabled](https://developers.cloudflare.com/speed/optimization/protocol/), [proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/), and is also using [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/), Cloudflare automatically generates HTTPS records on the fly, to advertise to clients how they should connect to your server.

Universal SSL required for automatic HTTPS records

Disabling Universal SSL will prevent automatic HTTPS record generation for proxied hostnames, even if you have [Advanced Certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) or [custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) configured. This is because automatic HTTPS record generation is tied specifically to the Universal SSL feature.

If you need HTTPS records without Universal SSL, you can manually add them, but only if **all records with the same name are DNS-only (grey cloud)**. Refer to [SVCB and HTTPS records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#svcb-and-https) for details and examples.

## OCSP and HTTP versions

Cloudflare's OCSP implementation uses HTTP/1.1 by default for plain HTTP connections.

For HTTPS connections, the client automatically attempts to use HTTP/2 if the server supports it through the TLS ALPN (Application-Layer Protocol Negotiation) extension. If HTTP/2 is not available or supported by the server, it will fall back to HTTP/1.1.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/browser-compatibility/#page","headline":"Browser compatibility · Cloudflare SSL/TLS docs","description":"Review information about browser compatibility for the different Cloudflare SSL/TLS offerings.","url":"https://developers.cloudflare.com/ssl/reference/browser-compatibility/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/reference/browser-compatibility/","name":"Browser compatibility"}}]}
```
