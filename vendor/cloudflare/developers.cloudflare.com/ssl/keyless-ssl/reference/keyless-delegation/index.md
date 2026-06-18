---
title: Keyless delegation
description: Delegate certificate signing to downstream key servers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Keyless delegation

Keyless Delegation is Cloudflare's implementation of the emerging delegated credentials standard ([RFC 9345 ↗](https://www.rfc-editor.org/rfc/rfc9345.html)). When you upload a certificate for use with Keyless that has the special extension permitting the use of delegated credentials, Cloudflare will automatically produce a delegated credential and use it at the edge with clients that support this feature. The handshakes will complete without the extra latency induced by reaching back to the Keyless Server, and there are [additional advantages to flexibility in algorithm choice ↗](https://blog.cloudflare.com/keyless-delegation/).

Behind the scenes we periodically create delegated credentials and sign them via Keyless, through the same mechanism used to sign the Certificate Verify messages our servers send when using Keyless. These credentials have a short lifetime, ensuring that if you disable Keyless the credentials created will become invalid within 24 hours. Supporting clients validate the credential, and the server can use the key it generated to sign the response to the TLS handshake without the round trip.

For security reasons certificates must contain a special identifier for use with delegated credentials. This takes the form of an optional X509 extension with NULL contents and the OID 1.3.6.1.4.1.44363.44\. Your CA may need to make code changes to support delegated credentials.

Currently very few clients support delegated credentials, and only a handful of certificate authorities will issue certificates with the extension. We have had success with DigiCert. Firefox 77 and later support delegated credentials.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/reference/keyless-delegation/#page","headline":"Keyless delegation · Cloudflare SSL/TLS docs","description":"Delegate certificate signing to downstream key servers.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/reference/keyless-delegation/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/reference/keyless-delegation/","name":"Keyless delegation"}}]}
```
