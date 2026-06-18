---
title: Validity periods and renewal
description: Learn about Cloudflare SSL certificate validity periods, auto renewal processes, and the benefits of shorter validity periods for enhanced security.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Validity periods and renewal

For certificates managed by Cloudflare, attempts to renew start at the auto renewal period and continue up until 24 hours before expiration. The auto renewal period varies according to the certificate validity period, as explained in the sections below.

If a certificate fails to renew and another valid certificate exists for the hostname, Cloudflare will deploy the valid certificate within the last 24 hours before expiration.

## Certificate types

### Universal SSL

For Universal certificates, Cloudflare controls the validity periods and certificate authorities (CAs), making sure that renewal always occur.

Partial setup and DCV

If you are on a [CNAME setup (partial)](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#partial-dns-setup), make sure [Domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) is configured correctly. Refer to [Troubleshooting DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/troubleshooting/) for further help.

Universal certificates have a 90-day validity period. The auto renewal period starts 30 days before expiration.

### Advanced certificates

When you order an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/), you can select different certificate validity periods. Each certificate validity period has a corresponding auto renewal period, when [attempts to renew](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/) will start.

| Certificate validity period | Auto renewal period | Notes                                                                                                                                                                                                                                                |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 year                      | 30 days             | Limited to Enterprise customers using [advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) with [SSL.com](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#sslcom) |
| 3 months                    | 30 days             |                                                                                                                                                                                                                                                      |
| 1 month                     | 7 days              | Not supported by [Let's Encrypt](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#lets-encrypt)                                                                                                                              |
| 2 weeks                     | 3 days              | Not supported by [Let's Encrypt](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#lets-encrypt)                                                                                                                              |

Note

For more details on the `validity_days` parameter used in API calls, refer to [Order Advanced Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/create/).

### Custom certificates

For information regarding custom certificates (managed by you), consider this other page on [renewal and expiration](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/renewing/).

### SSL for SaaS

For SSL for SaaS certificates, refer to [Renew certificates](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/).

## Domain control validation (DCV)

Before a certificate authority (CA) will issue a certificate for a domain, the requester must prove they have control over that domain. This process is known as domain control validation (DCV).

[HTTP validation](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/http/) is attempted on renewals but will fall back to TXT validation depending on the certificate validity period:

* 90-days certificates: after failing for 15 days
* 30-days certificates: after failing for 7 days
* 14-days certificates: after failing for 3 days

## Benefits of shorter validity periods

Cloudflare only issues certificates with validity periods of three months or less for two reasons.

First, shorter-lived certificates limit the damage from key compromise and mistaken issuance. Any compromised key material will be valid for a shorter period of time.

Second, shorter certificates encourage automation. The more frequently you have to do a task, the more likely you will want to automate it. Automation also means that you are less likely to let a certificate expire in production or give a person access to key material.

For more details on the benefits of shorter validity periods, refer to our [blog post introducing Advanced Certificate Manager ↗](https://blog.cloudflare.com/advanced-certificate-manager/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/#page","headline":"Validity periods and renewal · Cloudflare SSL/TLS docs","description":"Learn about Cloudflare SSL certificate validity periods, auto renewal processes, and the benefits of shorter validity periods for enhanced security.","url":"https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/reference/certificate-validity-periods/","name":"Validity periods and renewal"}}]}
```
