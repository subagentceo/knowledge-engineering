---
title: Troubleshooting
description: Resolve domain control validation failures.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

If your certificate is stuck in **Pending Validation** or failing to issue, the certificate authority (CA) may be unable to complete [domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/dcv-flow/). This page helps you identify and resolve common DCV issues.

Note

If you are using the Cloudflare API, error messages are presented under the `validation_errors` parameter.

## Quick checklist

Use this checklist to identify common DCV issues:

* [No rules blocking the validation URL](#blocked-validation-url) \- WAF rules, IP access rules, or Under Attack mode can block the CA
* [No redirects on the validation path](#redirection) \- The `/.well-known/*` path must not redirect (especially HTTP to HTTPS in partial setups)
* [DNS records are resolvable](#dns-settings-and-records) \- DNSSEC must be valid, and records must resolve from all locations
* [CAA records allow the CA](#caa-records) \- CAA records must permit Cloudflare's partner CAs to issue certificates
* [No CA-side errors](#ca-errors) \- Rate limits, policy blocks, or temporary CA issues

---

## Blocked validation URL

If you have issues while HTTP DCV is in place, review the following settings:

* **Anything affecting `/.well-known/*`**: Review [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/), and other [configuration rules](https://developers.cloudflare.com/rules/configuration-rules/) to make sure that your rules _do not_ enable interactive challenge on the validation URL.
* **Cloudflare Account Settings** and **Page Rules**: Review your [account settings](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/), [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/), and [Page Rules](https://developers.cloudflare.com/rules/page-rules/) to ensure you have not enabled Under Attack mode on the validation URL.  
Warning  
When your certificate is in `pending_validation` and valid tokens are in place, some security features targeting your zone's path for `/.well-known/*` can be automatically bypassed.

## Redirection

Enabling [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) does not impact the validation process.

In a [Partial (CNAME) setup](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/#partial-dns-setup---action-sometimes-required) where you are managing the token on the origin side, please ensure that no redirection from HTTP to HTTPS occurs on the `/.well-known/*` path.

When using [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/), exclude the `/.well-known/*` path from redirections by adding a condition to your rule:

```

not starts_with(http.request.uri.path, "/.well-known/")


```

For example, if you have a rule that redirects all HTTP traffic to HTTPS, modify the rule expression to:

```

(http.request.scheme eq "http") and not starts_with(http.request.uri.path, "/.well-known/")


```

## DNS settings and records

The errors below refer to situations that have to be addressed at the authoritative DNS provider:

* `the Certificate Authority had trouble performing a DNS lookup: dns problem: looking up caa for <hostname>: dnssec: bogus`
* `Certificate authority encountered a SERVFAIL during DNS lookup, please check your DNS reachability.`

Consider the following when troubleshooting:

* [DNSSEC ↗](https://www.cloudflare.com/learning/dns/dns-security/) must be configured correctly. You can use [DNSViz ↗](https://dnsviz.net/) to understand and troubleshoot the deployment of DNSSEC.
* The HTTP verification process is done preferably over **IPv6**, so if any AAAA record exists and does not point to the same dual-stack location as the A record, the validation will fail.
* If an [NS record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ns) is present for the hostname or its parent, DNS resolution will be managed externally by the DNS provider defined in the NS target. In this case, you must either add the DCV TXT record at the external DNS provider, or remove the NS record at Cloudflare.

### CAA records

* Your [CAA records](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/) must be resolvable from all locations.
* Your [CAA records](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/) should allow Cloudflare's partner [certificate authorities (CAs)](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) to issue certificates on your behalf.
* If you are using a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) (`subdomain.example.com`) and Cloudflare is not the authoritative DNS provider for the parent domain (`example.com`), you should make sure that the parent domain (`example.com`) either has CAA records that allow [Cloudflare's partner CAs](https://developers.cloudflare.com/ssl/reference/certificate-authorities/), or has no CAA records at all.

You can check the CAA records by running the following command:

* [ macOS and Linux ](#tab-panel-10608)
* [ Windows ](#tab-panel-10609)

Terminal window

```

dig example.com CAA +short


```

PowerShell

```

Resolve-DnsName -Name example.com -Type CAA


```

## Certificate authority (CA) errors

A [certificate authority (CA)](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) is the organization that issues your SSL/TLS certificate. Cloudflare partners with multiple CAs to provide certificates for your domain.

Note

Selecting a different CA is only available with [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) or [SSL for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/). [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) customers cannot change the CA.

### Rate limiting

As mentioned in [Certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/), specific CAs may have their own limitations. If you use Let’s Encrypt and receive the error below, it means you hit the [duplicate certificate limit ↗](https://letsencrypt.org/docs/duplicate-certificate-limit/) imposed by Let's Encrypt.

`The authority has rate limited these domains. Please wait for the rate limit to expire or try another authority.`

A certificate is considered a duplicate of an earlier certificate if it contains the exact same set of hostnames.

In this case, you can either wait for the rate limit window to end or choose a different certificate authority.

When you see `The authority has rate limited these domains. Please wait for the rate limit to expire or try another authority`, the certificate authority has temporarily blocked certificate issuance for your domain due to too many recent requests.

Rate limit windows vary by CA:

* **Let's Encrypt**: 7 days for most rate limits (refer to [Let's Encrypt rate limits ↗](https://letsencrypt.org/docs/rate-limits/))
* **Google Trust Services**: Varies by limit type (refer to [Google Trust Services documentation ↗](https://pki.goog/faq/))

**Resolution**: Wait for the rate limit window to expire, or select a different CA.

### CAA records block issuance

The error `CAA records block issuance. Please remove all CAA records or add records for this authority` indicates that your domain's [CAA records](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/) do not allow the selected certificate authority to issue certificates.

**Resolution**: Either remove all CAA records from your domain, or add CAA records that explicitly allow [Cloudflare's partner certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/).

### Multiple perspective validation errors

Certificate authorities perform domain validation from multiple geographic locations to prevent certain attacks. You may encounter one of these errors:

* `Certificate authority encountered a multiple perspective CAA check error, please ensure your DNS is configured to allow CAA queries from all geographic perspectives`
* `Certificate authority was unable to verify domain ownership from multiple geographic locations (MPIC failure). Please ensure your DNS records are reachable from all geographic perspectives and try again.`

**Resolution**: Ensure your DNS records (including CAA records) are consistently resolvable from all geographic locations. You can investigate resolution errors using the [ping.pe tool ↗](https://dig.ping.pe/). For example, for a [Google Trust Services](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#google-trust-services) certificate, check: `<hostname>:CAA:8.8.8.8`.

Read more from certificate authority documentation: [SSL.com ↗](https://www.ssl.com/blogs/multi-perspective-issuance-corroboration-mpic-arrives/), [Let's Encrypt ↗](https://letsencrypt.org/2020/02/19/multi-perspective-validation), and [Google Trust Services ↗](https://pki.goog/faq/#faq-mpic).

### DNS lookup errors

The error `the Certificate Authority had trouble performing a DNS lookup` indicates that the CA could not resolve your domain's DNS records. Common causes include SERVFAIL responses, NXDOMAIN, or DNSSEC validation failures.

**Resolution**: Verify that your DNS records are correctly configured and resolvable. Use tools like [DNSViz ↗](https://dnsviz.net/) to check for DNSSEC issues, and ensure your authoritative nameservers are responding correctly.

### Rejected identifier

The error `The certificate authority will not issue for this domain. Please check your input or try another authority` means the CA has policies that prevent issuing certificates for your specific domain.

**Resolution**: Verify that your domain name is correctly spelled and does not violate the CA's issuance policies. If the domain is valid, try selecting a different CA.

### Internal errors

When you see `Internal error with Certificate Authority. Please check later`, the certificate authority encountered a temporary issue during validation.

**Resolution**: Wait a few minutes and retry. If the issue persists, try selecting a different CA. Cloudflare will automatically retry validation according to the [validation backoff schedule](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/troubleshooting/#page","headline":"Troubleshooting Domain Control Validation · Cloudflare SSL/TLS docs","description":"Resolve domain control validation failures.","url":"https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/changing-dcv-method/","name":"Domain control validation (DCV)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/changing-dcv-method/troubleshooting/","name":"Troubleshooting"}}]}
```
