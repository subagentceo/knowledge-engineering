---
title: E-commerce
description: Protect and accelerate online stores with Cloudflare WAF, DDoS protection, caching, image optimization, and Waiting Room.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# E-commerce

E-commerce applications require exceptional performance, security, and reliability. Cloudflare protects and accelerates online stores with application security against attacks, bot security against credential stuffing and fraud, cache and image optimization for fast global delivery of product pages, load balancing and Waiting Room for handling traffic spikes, and Zaraz for server-side analytics and marketing tags.

* [ Protect your store ](https://developers.cloudflare.com/use-cases/e-commerce/protect/)
* [ Accelerate your store's performance ](https://developers.cloudflare.com/use-cases/e-commerce/performance/)
* [ Handle traffic at scale ](https://developers.cloudflare.com/use-cases/e-commerce/traffic-at-scale/)
* [ Observe traffic patterns and analytics ](https://developers.cloudflare.com/use-cases/e-commerce/analytics/)

## Architecture patterns

### Self-hosted storefront

Protect and accelerate a store running on your own infrastructure:

* **SSL/TLS** encrypts all traffic between shoppers and your store
* **Cache** serves static assets from 300+ edge locations
* **Application security** blocks attacks before they reach your origin
* **Images** optimizes product images on-the-fly

### SaaS-hosted storefront

Add Cloudflare on top of a platform like Shopify, BigCommerce, or Salesforce Commerce Cloud:

* **Cloudflare for SaaS** (Orange-to-Orange setup) layers your Cloudflare zone over your provider's existing Cloudflare configuration
* **Application security** adds protection beyond what the platform provides
* **Zaraz** loads analytics and marketing tags server-side to improve page speed

### High-traffic store

Handle flash sales, seasonal peaks, and viral demand:

* **Load Balancing** distributes traffic across multiple origin servers
* **Waiting Room** queues excess visitors to prevent origin overload
* **Cache** and **Argo Smart Routing** reduce origin load and improve response times
* **Health Checks** detect unhealthy origins and reroute traffic automatically

---

## Prerequisites

### Create a new application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) with DNS records proxied through Cloudflare. All solutions in this use case require traffic to pass through Cloudflare's network.

### Use an existing application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) with DNS records proxied through Cloudflare's network.
* If your store is hosted on a SaaS platform that already uses Cloudflare — such as [Shopify](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/), [BigCommerce](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/bigcommerce/), or [Salesforce Commerce Cloud](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/salesforce-commerce-cloud/) — follow the setup steps in the provider guide for your platform to add your own Cloudflare zone on top of your provider's existing configuration.

---

## Related resources

[E-commerce case studies](https://www.cloudflare.com/case-studies/?industry=Ecommerce%20%26%20Retail) 

Explore how e-commerce companies use Cloudflare.

[Reference architectures](https://developers.cloudflare.com/reference-architecture/) 

Detailed diagrams and design patterns for enterprise deployments.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/use-cases/e-commerce/#page","headline":"E-commerce · Use cases · Cloudflare use cases","description":"Protect and accelerate online stores with Cloudflare WAF, DDoS protection, caching, image optimization, and Waiting Room.","url":"https://developers.cloudflare.com/use-cases/e-commerce/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/e-commerce/","name":"E-commerce"}}]}
```
