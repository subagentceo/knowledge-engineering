---
title: Client certificate variables
description: Variables available in WAF rules when using client certificates.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client certificate variables

When a request includes a client certificate for [mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/), Cloudflare exposes certificate details as variables in the Ruleset Engine and as properties on the Workers `request.cf` object.

## Ruleset Engine fields

Client certificate fields are available as [mTLS fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=mTLS) in Ruleset Engine-based products such as [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [request header modification rules](https://developers.cloudflare.com/rules/transform/request-header-modification/).

## Workers variables

These variables are also available as part of the [request.cf.tlsClientAuth](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) object via Cloudflare Workers. Refer to the linked Rules language field for the full definition.

Note

Some `tlsClientAuth` properties have a different type than their Rules language field equivalent. Those differences are called out in the following list.

* [request.cf.tlsClientAuth.certRevoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/) — Indicates whether the mTLS client presented a valid but revoked client certificate. In Workers, this is a string (`"1"` for revoked, `"0"` for not revoked) rather than a boolean.
* [request.cf.tlsClientAuth.certVerified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) — Indicates whether the mTLS client presented a valid client certificate. In Workers, this is a string (`"SUCCESS"` when valid, `"NONE"` when not present) rather than a boolean. On failure, the string contains the error reason (for example, `"FAILED:unable to get local issuer certificate"`).
* [request.cf.tlsClientAuth.certPresented](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fpresented/) — Indicates whether the mTLS client presented a certificate (valid or not). In Workers, this is a string (`"1"` when a certificate is presented, `"0"` otherwise) rather than a boolean.
* [request.cf.tlsClientAuth.certIssuerDN](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fdn/) — The Distinguished Name (DN) of the Certificate Authority (CA) that issued the mTLS client certificate.
* [request.cf.tlsClientAuth.certSubjectDN](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fsubject%5Fdn/) — The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate.
* [request.cf.tlsClientAuth.certIssuerDNRFC2253](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fdn%5Frfc2253/) — The Distinguished Name (DN) of the Certificate Authority (CA) that issued the mTLS client certificate in [RFC 2253 ↗](https://www.rfc-editor.org/rfc/rfc2253) format.
* [request.cf.tlsClientAuth.certSubjectDNRFC2253](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fsubject%5Fdn%5Frfc2253/) — The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate in [RFC 2253 ↗](https://www.rfc-editor.org/rfc/rfc2253) format.
* [request.cf.tlsClientAuth.certIssuerDNLegacy](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fdn%5Flegacy/) — The Distinguished Name (DN) of the Certificate Authority (CA) that issued the mTLS client certificate in a legacy format.
* [request.cf.tlsClientAuth.certSubjectDNLegacy](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fsubject%5Fdn%5Flegacy/) — The Distinguished Name (DN) of the owner (or requester) of the mTLS client certificate in a legacy format.
* [request.cf.tlsClientAuth.certSerial](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fserial/) — Serial number of the mTLS client certificate.
* [request.cf.tlsClientAuth.certIssuerSerial](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fserial/) — Serial number of the direct issuer of the mTLS client certificate.
* [request.cf.tlsClientAuth.certFingerprintSHA256](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Ffingerprint%5Fsha256/) — The SHA-256 fingerprint of the mTLS client certificate.
* [request.cf.tlsClientAuth.certFingerprintSHA1](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Ffingerprint%5Fsha1/) — The SHA-1 fingerprint of the mTLS client certificate.
* [request.cf.tlsClientAuth.certNotBefore](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fnot%5Fbefore/) — The mTLS client certificate is not valid before this date.
* [request.cf.tlsClientAuth.certNotAfter](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fnot%5Fafter/) — The mTLS client certificate is not valid after this date.
* [request.cf.tlsClientAuth.certSKI](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fski/) — The Subject Key Identifier (SKI) of the mTLS client certificate.
* [request.cf.tlsClientAuth.certIssuerSKI](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fissuer%5Fski/) — The Subject Key Identifier (SKI) of the direct issuer of the mTLS client certificate.
* [request.cf.tlsClientAuth.certRFC9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440/) — The client leaf certificate encoded in [RFC 9440 ↗](https://www.rfc-editor.org/rfc/rfc9440) format (DER, Base64-encoded, colon-wrapped).
* [request.cf.tlsClientAuth.certRFC9440TooLarge](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440%5Ftoo%5Flarge/) — `true` if the leaf certificate exceeded the 10 KiB encoding limit and was omitted from `certRFC9440`.
* [request.cf.tlsClientAuth.certChainRFC9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fchain%5Frfc9440/) — The intermediate certificate chain in [RFC 9440 ↗](https://www.rfc-editor.org/rfc/rfc9440) format as a comma-separated list.
* [request.cf.tlsClientAuth.certChainRFC9440TooLarge](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fchain%5Frfc9440%5Ftoo%5Flarge/) — `true` if the intermediate chain exceeded the 16 KiB encoding limit and was omitted from `certChainRFC9440`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/client-certificate-variables/#page","headline":"Client certificate variables · Cloudflare SSL/TLS docs","description":"Variables available in WAF rules when using client certificates.","url":"https://developers.cloudflare.com/ssl/client-certificates/client-certificate-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/client-certificate-variables/","name":"Client certificate variables"}}]}
```
