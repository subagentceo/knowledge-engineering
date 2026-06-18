---
title: Certificate and hostname priority
description: Learn about how Cloudflare decides which certificate and associated SSL/TLS settings to apply to individual hostnames.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Certificate and hostname priority

When a new certificate is created, Cloudflare first deploys the certificate and then serves it.

---

## Certificate deployment

For any given hostname, Cloudflare uses the following order to determine which certificate (and associated TLS settings) to apply to that hostname:

1. **Hostname specificity**: A specific subdomain certificate (`www.example.com`) would take precedence over a wildcard certificate (`*.example.com`) for requests to `www.example.com`.
2. **Zone specificity**: A specific subdomain certificate (`www.example.com`) would take precedence over a custom hostname certificate if the domain is active as a zone on Cloudflare.
3. **Certificate priority**: If the hostname is the same, certain types of certificates take precedence over others.  
| Priority | Certificate Type                                                                                                         |  
| -------- | ------------------------------------------------------------------------------------------------------------------------ |  
| 1        | [Keyless SSL](https://developers.cloudflare.com/ssl/keyless-ssl/)                                                        |  
| 2        | [Custom Legacy](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/)                            |  
| 3        | [Custom Modern](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/)                            |  
| 4        | [Custom Hostname (Cloudflare for SaaS)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) |  
| 5        | [Advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/)                        |  
| 6        | [Advanced - Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/)            |  
| 7        | [Universal](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/)                                      |
4. **Certificate expiration**: The most recently ordered certificate takes precedence unless a certificate deletion has occurred. If and when a certificate is deleted, the certificate with the latest expiration date is deployed.

Note

In this case, when the certificate with the closest expiration date is renewed, it will then become the one with the latest expiration date and get presented.

---

## Certificate presentation

Cloudflare uses the following order to determine the certificate and settings used during a TLS handshake:

1. **SNI match**: Certificates and settings that match the SNI hostname _exactly_ take precedence.
2. **SNI wildcard match**: If there is not an exact match between the hostname and SNI hostname, Cloudflare uses certificates and settings that match an SNI wildcard.
3. **IP address**: If no SNI is presented, Cloudflare uses certificate based on the IP address (the hostname can support TLS handshakes made without SNI).

---

## Hostname priority

When multiple proxied DNS records exist for a hostname, in multiple zones — usually due to [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) — only one record will control the zone settings and associated origin server.

Cloudflare determines this priority in the following order, assuming each record exists and is proxied (orange-clouded):

1. **Exact hostname match**:  
   1. [New custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) (belonging to a SaaS provider)  
   2. [Legacy custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/reference/versioning/) (belonging to a SaaS provider)  
   3. [DNS](https://developers.cloudflare.com/dns/proxy-status/) (belonging to the logical DNS zone)
2. **Wildcard hostname match**:  
   1. DNS (belonging to the logical DNS zone)  
   2. New custom hostname (belonging to a SaaS provider)

If a hostname resource record is not proxied (gray-clouded) for a zone on Cloudflare, that zone's settings are not applied and any settings configured at the associated origin are applied instead. This origin could be another zone on Cloudflare or any other server.

### Example scenarios

#### Scenario 1

Customer1 uses Cloudflare as authoritative DNS for the zone `shop.example.com`. Customer2 is a SaaS provider that creates and successfully [verifies the new custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/) `shop.example.com`. Afterward, traffic starts routing over Customer2's zone:

* If Customer1 wants to regain control of their zone, Customer1 contacts Customer2 and requests them to delete the custom hostname record. Customer1 should make sure to have their record target updated to something other than the SaaS provider target, otherwise Customer1 would get a [1014 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/).
* If Customer1 already has a proxied record for `www.example.com` when Customer2 creates and verifies a new custom hostname `www.example.com`, [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) applies.
* If Customer1 already has a proxied record for `www.example.com` in a legacy custom hostname setup (with another SaaS provider, Customer3) and Customer2 creates and verifies a new wildcard custom hostname for `*.example.com`, legacy custom hostname on Customer3 platform takes precedence due to exact hostname match.

#### Scenario 2

A customer has a [proxied](https://developers.cloudflare.com/dns/proxy-status/) DNS record for their domain. The customer's zone on Cloudflare is using a Free plan.

This customer is also using a SaaS provider that uses Cloudflare for SaaS. The SaaS provider is using a Cloudflare Enterprise plan.

If the provider is using a wildcard custom hostname, then the original customer's plan limits will take precedence over the provider's plan limits (Cloudflare will treat the zone as a Free zone). To apply the Enterprise limits through Cloudflare for SaaS, the original customer's zone would need to either use a [DNS-only](https://developers.cloudflare.com/dns/proxy-status/) record or the SaaS provider would need to use an exact hostname match.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/#page","headline":"Certificate and hostname priority · Cloudflare SSL/TLS docs","description":"Learn about how Cloudflare decides which certificate and associated SSL/TLS settings to apply to individual hostnames.","url":"https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/reference/certificate-and-hostname-priority/","name":"Certificate and hostname priority"}}]}
```
