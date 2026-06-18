---
title: Cloudflare for SaaS
description: Extend Cloudflare security and performance to your customers' custom hostnames.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare for SaaS

Cloudflare for SaaS allows you to extend the security and performance benefits of Cloudflare's network to your customers via their own custom or vanity domains.

  
As a SaaS provider, you may want to support subdomains under your own zone in addition to letting your customers use their own domain names with your services. For example, a customer may want to use their vanity domain `app.customer.com` to point to an application hosted on your Cloudflare zone `service.saas.com`. Cloudflare for SaaS allows you to increase security, performance, and reliability of your customers' domains.

Note

Eligible enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## Benefits

When you use Cloudflare for SaaS, it helps you to:

* Provide custom domain support.
* Keep your customers' traffic encrypted.
* Keep your customers online.
* Facilitate fast load times of your customers' domains.
* Gain insight through traffic analytics.

## Limitations

If your customers already have their applications on Cloudflare, they cannot control some Cloudflare features for hostnames managed by your Custom Hostnames configuration, including:

* Argo
* Early Hints
* Client-side security (formerly known as Page Shield)
* Spectrum
* Wildcard DNS

## How it works

As the SaaS provider, you can extend Cloudflare's products to customer-owned custom domains by adding them to your zone [as custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/). Through a suite of easy-to-use products, Cloudflare for SaaS routes traffic from custom hostnames to an origin, set up on your domain. Cloudflare for SaaS is highly customizable. Three possible configurations are shown below.

### Standard Cloudflare for SaaS configuration:

Custom hostnames are routed to a default origin server called fallback origin. This configuration is available on all plans.

![Standard case](https://developers.cloudflare.com/_astro/Standard.DlPYrpsG_Z1aQodp.webp) 

### Cloudflare for SaaS with Apex Proxying:

This allows you to support apex domains even if your customers are using a DNS provider that does not allow a CNAME at the apex. This is available as an add-on for Enterprise plans. For more details, refer to [Apex Proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/).

![Advanced case](https://developers.cloudflare.com/_astro/Advanced.BaQXgT8v_Z1DP3hz.webp) 

### Cloudflare for SaaS with BYOIP:

This allows you to support apex domains even if your customers are using a DNS provider that does not allow a CNAME at the apex. Also, you can point to your own IPs if you want to bring an IP range to Cloudflare (instead of Cloudflare provided IPs). This is available as an add-on for Enterprise plans.

![Pro Case](https://developers.cloudflare.com/_astro/Pro.DTAC_nZK_Z23M1FF.webp) 

## Availability

Cloudflare for SaaS is bundled with non-Enterprise plans and available as an add-on for Enterprise plans. For more details, refer to [Plans](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/).

## Next steps

[ Get started ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) [ Learn more ](https://blog.cloudflare.com/introducing-ssl-for-saas/) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/#page","headline":"Cloudflare for SaaS · Cloudflare for Platforms docs","description":"Extend Cloudflare security and performance to your customers' custom hostnames.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}}]}
```
