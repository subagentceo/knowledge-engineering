---
title: Enable Universal SSL certificates
description: Turn on Universal SSL certificates for your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Universal SSL certificates

By default, Cloudflare issues — and [renews](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/#universal-ssl) — free, unshared, publicly trusted SSL certificates to all domains [added to](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) and [activated on](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) Cloudflare.

---

The process for activating a Universal SSL certificate depends on your domain's DNS setup.

## Full DNS setup

For domains on a [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/)[1](#user-content-fn-1), your domain should **automatically** receive its Universal SSL certificate within **15 minutes to 24 hours** of domain activation[2](#user-content-fn-2).

This certificate will cover your zone apex (`example.com`) and all first-level subdomains (`subdomain.example.com`), and is provisioned even if your records are DNS only. However, the certificate will only be presented if your domain or subdomains are [proxied](https://developers.cloudflare.com/dns/proxy-status/).

## Footnotes

1. The most common Cloudflare setup that involves changing your authoritative nameservers. [↩](#user-content-fnref-1)
2. Provisioning time depends on certain security checks and other requirements mandated by Certificate Authorities (CA). [↩](#user-content-fnref-2)

### Minimize downtime

If your website or application is already live and cannot be uncovered while the Universal certificate is provisioned, consider the following:

* Order an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) before proxying traffic to Cloudflare.
* Upload a [custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) prior to migrating and then delete the certificate after your [Universal certificate is active](#verify-your-certificate-is-active).
* Keep DNS records [**unproxied**](https://developers.cloudflare.com/dns/proxy-status/) until your [certificate is active](#verify-your-certificate-is-active).

Note

If your domain is using a **partial setup**, you will need to add [Domain Control Validation (DCV) records](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) to your authoritative DNS.

## Partial DNS setup

For non-authoritative or [partial domains](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), Universal SSL will be:

* Provisioned once the DNS record is [proxied through Cloudflare](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/#3-add-dns-records).
* Validated:  
   * Immediately if you add [Domain Control Validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) records to your authoritative DNS.  
   * After a brief period of downtime if you **do not** add DCV records (once your traffic is proxied).

Unless you cover and validate multiple subdomains with an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/), you will need to proxy and validate new subdomains as they are added.

---

## Verify your certificate is active

Once you enable Universal SSL, you can review the [activation status](https://developers.cloudflare.com/ssl/reference/certificate-statuses/) on the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page or via the API with a [GET request](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/list/).

---

## Universal SSL renewal

For Universal certificates, Cloudflare controls the validity periods and certificate authorities (CAs), making sure that renewal always occur.

Partial setup and DCV

If you are on a [CNAME setup (partial)](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#partial-dns-setup), make sure [Domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) is configured correctly. Refer to [Troubleshooting DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/troubleshooting/) for further help.

Universal certificates have a 90-day validity period. The auto renewal period starts 30 days before expiration.

For details, refer to [Validity periods and renewal](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#page","headline":"Enable Universal SSL certificates · Cloudflare SSL/TLS docs","description":"Turn on Universal SSL certificates for your domain.","url":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/universal-ssl/","name":"Universal SSL"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/universal-ssl/enable-universal-ssl/","name":"Enable Universal SSL certificates"}}]}
```
