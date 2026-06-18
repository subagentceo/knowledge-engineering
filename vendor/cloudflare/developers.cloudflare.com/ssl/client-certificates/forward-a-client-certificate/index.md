---
title: Forward certificate to server
description: Forward client certificate details to your origin server.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Forward certificate to server

## Add Client-Cert and Client-Cert-Chain headers (RFC 9440)

[RFC 9440 ↗](https://datatracker.ietf.org/doc/html/rfc9440) defines the `Client-Cert` and `Client-Cert-Chain` HTTP header fields for passing client certificate information to origin servers. You can construct these headers using [request header modification rules](https://developers.cloudflare.com/rules/transform/request-header-modification/) with the following Ruleset Engine fields:

* [cf.tls\_client\_auth.cert\_rfc9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440/) — The client leaf certificate encoded in RFC 9440 formatting (see reference).
* [cf.tls\_client\_auth.cert\_chain\_rfc9440](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fchain%5Frfc9440/) — The certificate chain (excluding the leaf certificate) encoded in RFC 9440 formatting (see reference).

As indicated in field definitions, the fields may be set to either an empty string or a valid RFC 9440 encoding. Proper usage depends on a couple of factors discussed in the following sections.

### Security considerations

Important

Before constructing `Client-Cert` or `Client-Cert-Chain` headers, you must address the following security concerns. Failing to do so can expose your origin server to forged or unverified certificate data.

The `cert_rfc9440` and `cert_chain_rfc9440` fields are populated **regardless of the certificate validation result**. This means a client can present an invalid, expired, or self-signed certificate, and the fields will still contain the encoded certificate data. Always check the following fields before trusting the values:

* [cf.tls\_client\_auth.cert\_verified](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fverified/) — Returns `true` when the client certificate is valid.
* [cf.tls\_client\_auth.cert\_revoked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frevoked/) — Returns `true` when the client certificate has been revoked.

A client can also include its own `Client-Cert` or `Client-Cert-Chain` headers on a request to inject arbitrary values. As described in the [RFC 9440 security considerations ↗](https://datatracker.ietf.org/doc/html/rfc9440#name-security-considerations), you must unconditionally remove any existing `Client-Cert` and `Client-Cert-Chain` headers from incoming requests, regardless of certificate validity. This prevents a client from injecting forged certificate data that your origin would trust.

See [Enable mTLS](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/) for details on how to configure mTLS and certificate validation.

### Size limits

The encoded leaf certificate is limited to 10 KiB and the encoded chain is limited to 16 KiB. If the encoded value exceeds the limit, the corresponding field contains an empty string. Use the following fields to check for this condition:

* [cf.tls\_client\_auth.cert\_rfc9440\_too\_large](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Frfc9440%5Ftoo%5Flarge/) — Returns `true` when the encoded certificate exceeds 10 KiB.
* [cf.tls\_client\_auth.cert\_chain\_rfc9440\_too\_large](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fchain%5Frfc9440%5Ftoo%5Flarge/) — Returns `true` when the encoded chain exceeds 16 KiB.

### Example Transform Rules

Here we provide an example on how to securely use these fields to construct trusted `Client-Cert` and `Client-Cert-Chain` headers to be forwarded to your origin. The origin can then rely on the presence of the headers to be certain the client presented a valid certificate. Note: the `Client-Cert-Chain` header may be omitted when the client did not present any intermediates (only a leaf certificate).

You need to create the following request header modification rules. The **Remove** rules must be placed before the **Set dynamic** rules so that client-injected headers are stripped on every request before the validated values are set.

#### Rule 1 — Remove Client-Cert header

This rule unconditionally removes any `Client-Cert` header sent by the client.

Text in **Expression Editor**:

```

true


```

Selected operation under **Modify request header**: _Remove_

**Header name**: `Client-Cert`

#### Rule 2 — Remove Client-Cert-Chain header

This rule unconditionally removes any `Client-Cert-Chain` header sent by the client.

Text in **Expression Editor**:

```

true


```

Selected operation under **Modify request header**: _Remove_

**Header name**: `Client-Cert-Chain`

#### Rule 3 — Set Client-Cert header

This rule sets the `Client-Cert` header only when the client presented a valid, non-revoked certificate that is within the size limit.

Text in **Expression Editor**:

```

cf.tls_client_auth.cert_verified

and not cf.tls_client_auth.cert_revoked

and not cf.tls_client_auth.cert_rfc9440_too_large


```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Client-Cert`

**Value**: `cf.tls_client_auth.cert_rfc9440`

#### Rule 4 — Set Client-Cert-Chain header

This rule sets the `Client-Cert-Chain` header only when the client presented a valid, non-revoked certificate and the chain is non-empty and within the size limit.

Text in **Expression Editor**:

```

cf.tls_client_auth.cert_verified

and not cf.tls_client_auth.cert_revoked

and cf.tls_client_auth.cert_chain_rfc9440 ne ""

and not cf.tls_client_auth.cert_chain_rfc9440_too_large


```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Client-Cert-Chain`

**Value**: `cf.tls_client_auth.cert_chain_rfc9440`

### Cloudflare Workers

You can also construct RFC 9440 headers in a [Cloudflare Worker](https://developers.cloudflare.com/workers/)using the [tlsClientAuth](https://developers.cloudflare.com/ssl/client-certificates/client-certificate-variables/#workers-variables)properties on the incoming request.

The same security considerations mentioned above apply.

## Forward a client certificate (legacy)

In addition to enforcing mTLS authentication for your host, you can also forward a client certificate to your origin server as an HTTP header. This setup is often helpful for server logging.

To avoid adding the certificate to every single request, the certificate is only forwarded on the first request of an mTLS connection.

Warning

This process is only available on accounts with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/).

### Cloudflare API

The most common approach to forwarding a certificate is to use the Cloudflare API to [update an mTLS certificate's hostname settings](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/certificates/subresources/settings/methods/update/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Mutual TLS Certificates Write`

Update an mTLS certificate's hostname settings

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/access/certificates/settings" \

  --request PUT \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "settings": [

        {

            "hostname": "<HOSTNAME>",

            "china_network": false,

            "client_certificate_forwarding": true

        }

    ]

  }'


```

Once `client_certificate_forwarding` is set to `true`, every request within an mTLS connection will now include the following headers:

* `Cf-Client-Cert-Der-Base64`
* `Cf-Client-Cert-Sha256`

Note

The `Cf-Client-Cert-Der-Base64` and `Cf-Client-Cert-Sha256` headers are a Cloudflare-proprietary mechanism. For a standardized approach, use [RFC 9440 Client-Cert and Client-Cert-Chain headers](https://developers.cloudflare.com/ssl/client-certificates/forward-a-client-certificate/#add-client-cert-and-client-cert-chain-headers-rfc-9440).

### Managed Transforms

You can also [modify HTTP response headers](https://developers.cloudflare.com/rules/transform/response-header-modification/) using Managed Transforms to pass along **TLS client auth headers**.

### Cloudflare Workers

Additionally, Workers can provide details around the [client certificate](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls/).

JavaScript

```

const tlsHeaders = {

  "X-CERT-ISSUER-DN": request.cf.tlsClientAuth.certIssuerDN,

  "X-CERT-SUBJECT-DN": request.cf.tlsClientAuth.certSubjectDN,

  "X-CERT-ISSUER-DN-L": request.cf.tlsClientAuth.certIssuerDNLegacy,

  "X-CERT-SUBJECT-DN-L": request.cf.tlsClientAuth.certSubjectDNLegacy,

  "X-CERT-SERIAL": request.cf.tlsClientAuth.certSerial,

  "X-CERT-FINGER": request.cf.tlsClientAuth.certFingerprintSHA1,

  "X-CERT-VERIFY": request.cf.tlsClientAuth.certVerify,

  "X-CERT-NOTBE": request.cf.tlsClientAuth.certNotBefore,

  "X-CERT-NOTAF": request.cf.tlsClientAuth.certNotAfter,

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/forward-a-client-certificate/#page","headline":"Forward certificate to server · Cloudflare SSL/TLS docs","description":"Forward client certificate details to your origin server.","url":"https://developers.cloudflare.com/ssl/client-certificates/forward-a-client-certificate/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS","Headers"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/forward-a-client-certificate/","name":"Forward certificate to server"}}]}
```
