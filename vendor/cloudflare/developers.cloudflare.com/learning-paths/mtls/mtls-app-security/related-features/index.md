---
title: mTLS related features
description: Learn about mtls related features in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# mTLS related features

## Label Client Certificates

To make it easier to differentiate between Client Certificates, you can generate your own private key and CSR, and enter information that will be incorporated into your certificate request, essentially [labeling your Client Certificates](https://developers.cloudflare.com/ssl/client-certificates/label-client-certificate/).

## Certificate Revocation

In cases of noticing excessive traffic, anomalous traffic (strange sequences of requests), or generally too many attack attempts registered from specific devices using your Client Certificates, it is best to [revoke](https://developers.cloudflare.com/ssl/client-certificates/revoke-client-certificate/) those.

Additionally, ensure to have a WAF [Custom Rule](https://developers.cloudflare.com/waf/custom-rules/) in place to block [revoked](https://developers.cloudflare.com/api-shield/security/mtls/configure/#check-for-revoked-certificates) Client Certificates. Review the available [cf.tls\_\*](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=mTLS&field-category=SSL/TLS) fields.

Example WAF Custom Rule with action block:

![Example expression for certification revocation using a WAF custom rule in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/certification-revocation-custom-rule.Dl80dwDN_J2GCH.webp) 

```

(cf.tls_client_auth.cert_revoked)


```

A better approach may be to check for unverified or revoked client certificates:

```

(not cf.tls_client_auth.cert_verified) or cf.tls_client_auth.cert_revoked


```

Generally, ensure client certificates are rotated regularly and safely to reduce the risk of compromise.

## Forward a client certificate

There are multiple ways to [forward a client certificate](https://developers.cloudflare.com/ssl/client-certificates/forward-a-client-certificate/) to your origin server.

## Bring your own CA for mTLS

If you already have mTLS implemented, client certificates are already installed on devices, and therefore you would like to use your own Certificate Authority (CA), this is possible by [bringing your own CA for mTLS](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/).

You can associate your uploaded CAs with specific hostnames via the dashboard or the [Replace Hostname Associations API endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/update/).

Note

Each Enterprise account can upload up to five CAs. This quota is shared across [API Shield](https://developers.cloudflare.com/api-shield/security/mtls/configure/), [Workers mTLS](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls/), and [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/). Contact your account team to request an increase.

## Client Certificate Deployment

There are different ways to safely and securely deploy Client Certificates across devices.

Some of the most used methods are [embedding](https://developers.cloudflare.com/ssl/client-certificates/configure-your-mobile-app-or-iot-device/#3-embed-the-client-certificate-in-your-mobile-app) the Client Certificate into an application and allowing user devices to download and install that app, or use mobile device management (MDM) to distribute certificates across devices, or to allow user devices to directly download and install the Client Certificate into a device's Certificate Store.

Issuing a certificate is an important step, so if possible, perform thorough client verification.

In complex microservices environments, you can leverage Service Mesh to automate and enforce mTLS at scale. For example, Cloudflare services can handle external traffic security, while Service Mesh technologies enforce mTLS for east-west traffic within your network. This ensures that external traffic is secured by Cloudflare, while internal microservice communication is protected using mTLS via the Service Mesh.

## Customize Cipher Suites

It is generally recommended to [customize the cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) of your Cloudflare [Edge Certificates](https://developers.cloudflare.com/ssl/edge-certificates/). This only applies to the Edge Certificates, not Client Certificates.

The recommended TLS versions for mTLS are:

* TLS 1.2: still broadly compatible and secure.
* TLS 1.3: preferred for new implementations due to its enhanced security and efficiency.

Using outdated versions like TLS 1.0 or 1.1 is not recommended due to known vulnerabilities.

Note

For modern mTLS implementations, Elliptic Curve Cryptography (EC) and [modern cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/) are recommended because it offers faster handshakes and better performance, uses smaller key sizes which result in reduced computational overhead while maintaining strong security, and EC is more scalable for large-scale deployments, such as in cloud-native applications, microservices, and mobile networks. RSA is only recommended if you have legacy systems that cannot support EC or if you require compatibility with systems that only work with RSA.

## TLS Session Resumption

Browsers connecting to a domain with a [wildcard](https://developers.cloudflare.com/dns/manage-dns-records/reference/wildcard-dns-records/) [Edge Certificate](https://developers.cloudflare.com/ssl/edge-certificates/) in place, connecting to the same domain's mTLS subdomain could cause a non-authentication event, due to TLS Session Resumption, or also called [Connection Resumption](https://developers.cloudflare.com/speed/optimization/protocol/0-rtt-connection-resumption/).

It is generally not recommended to use wildcard certificates.

Review the [troubleshooting documentation](https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/) for more info.

## TLS Session Renegotiation

Note

Resumption and renegotiation are essentially opposites. Resumption re-establishes a previous TLS session over a new TCP connection, keeping the same TLS parameters. In contrast, renegotiation updates certain TLS parameters within an existing session, continuing over the same TCP connection.

If you need to use Client Certificates after the TLS handshake via renegotiation, you will need to use a prior TLS version than 1.3\. This is because TLS 1.3 does not support renegotiation.

For example, if you are using mTLS and you are restricting requests to certain folders, based on a URL path in the request, rather than all content on your origin server, a TLS renegotiation may be triggered. Connections using TLS 1.3 do not support renegotiation.

## Chain of Trust

Customers create Client Certificates and select the option to _use my private key and CSR_. The customer provides the CSR supplied by end-customers to generate the client certificates shared with end-customers. However, if your end-customers request the Certificate Chain, this can potentially be shared by the Cloudflare account team.

Contact your account team for more information.

## WAF for Client Certificates

Note

[Revoked](https://developers.cloudflare.com/api-shield/security/mtls/configure/#check-for-revoked-certificates) Client Certificates are not automatically blocked unless you have an active WAF Custom Rule specifically checking for and blocking them. This check only applies to Client Certificates issued by the Cloudflare-managed CA. Cloudflare currently does not check certificate revocation lists (CRL) for CAs that have been uploaded by the customer ([BYO CA](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/)). One can opt for Workers to manage a custom business logic and block revoked Client Certificates. See the [Workers section](https://developers.cloudflare.com/learning-paths/mtls/mtls-workers/) for more information.

In order to effectively implement mTLS with Cloudflare, it is strongly recommended to properly configure the [Cloudflare WAF](https://developers.cloudflare.com/waf/). Review the available [cf.tls\_\*](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=mTLS&field-category=SSL/TLS) fields.

Example WAF Custom Rule with action block:

![Example expression for configure a WAF Custom Rule with action block ](https://developers.cloudflare.com/_astro/configure-waf-custom-rule.BGsSBYj1_Otwj6.webp) 

```

(http.host in {"mtls.example.com" "mtls2.example.com"} and (not cf.tls_client_auth.cert_verified or cf.tls_client_auth.cert_revoked))


```

This expression will check if the request is coming from one of the hostnames and will block the request if the Client Certificate is either not verified or revoked.

Another example WAF Custom Rule with action block, using the [cf.tls\_client\_auth.cert\_fingerprint\_sha256](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Ffingerprint%5Fsha256/) field, for a specific Client Certificate (replace `ADD_STRING_OF_CLIENT_CERT_SHA256_FINGERPRINT`):

![Example expression of a WAF Custom Rule with action block using the cf.tls_client_auth.cert_fingerprint_sha256 field](https://developers.cloudflare.com/_astro/waf-client-certificates-fingerprint.BqsBG7GT_hgTk0.webp) 

```

(http.request.uri.path in {"/headers"} and http.host in {"mtls.example.com" "mtls2.example.com"} and not cf.tls_client_auth.cert_verified and cf.tls_client_auth.cert_fingerprint_sha256 ne "ADD_STRING_OF_CLIENT_CERT_SHA256_FINGERPRINT")


```

Here is another example of a WAF custom rule to associate a serial number with a hostname:

![Example expression of a WAF Custom Rule to associate a serial number with a hostname](https://developers.cloudflare.com/_astro/waf-custom-rule.BVo7j0Y-_CKTwN.webp) 

```

(http.host in {"mtls.example.com" "mtls2.example.com"} and cf.tls_client_auth.cert_serial ne "ADD_STRING_OF_CLIENT_CERT_SERIAL")


```

This expression will check for a specific [Client Certificate serial number](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.tls%5Fclient%5Fauth.cert%5Fserial/) linked to specific hostnames, allowing for more granular control.

## Rate Limiting by Client Certificates

By enabling [forwarding a certificate](https://developers.cloudflare.com/ssl/client-certificates/forward-a-client-certificate/#cloudflare-api) via the Cloudflare API, every request of an mTLS connection will include the following headers:

* `Cf-Client-Cert-Der-Base64` (raw certificate in DER format, encoded as base64)
* `Cf-Client-Cert-Sha256` (SHA256 fingerprint of the certificate)

The header `Cf-Client-Cert-Sha256` can be used within the [Rate Limiting characteristics](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-same-characteristics) "Header value of".

Example [Rate Limiting Rule](https://developers.cloudflare.com/waf/rate-limiting-rules/):

![Example exmpression of a rate limiting rule from the Cloudflare dashboard](https://developers.cloudflare.com/_astro/rate-limiting-rule.DDXdodgO_1uReTg.webp) 

```

(http.host in {"mtls.example.com" "mtls2.example.com"} and cf.tls_client_auth.cert_verified)


With the same characteristics...

"Header value of": "Cf-Client-Cert-Sha256"


```

## Cloudflare API Shield

In addition to mTLS, customers can purchase [API Shield](https://developers.cloudflare.com/api-shield/) features, such as API Discovery, API Routing, Volumetric Abuse Detection, Sequence Mitigation, JWT Validation, Schema Validation, and more.

## Cloudflare Workers

Cloudflare Workers can provide details around the Client Certificate, such as returning information via headers to the client or to the origin server. Learn more in the [mTLS with Workers section](https://developers.cloudflare.com/learning-paths/mtls/mtls-workers/) below.

Note

Snippets do not support any [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and do not work with mTLS. However, you can [validate JSON web tokens (JWT)](https://developers.cloudflare.com/rules/snippets/examples/jwt-validation/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/mtls/mtls-app-security/related-features/#page","headline":"mTLS related features · Cloudflare Learning Paths","description":"Learn about mtls related features in this guide.","url":"https://developers.cloudflare.com/learning-paths/mtls/mtls-app-security/related-features/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/mtls/mtls-app-security/","name":"mTLS with Application Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/mtls/mtls-app-security/related-features/","name":"mTLS related features"}}]}
```
