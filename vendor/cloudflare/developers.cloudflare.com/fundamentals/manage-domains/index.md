---
title: Domains
description: Add, configure, and manage your domains (zones) on Cloudflare, including DNS setup, subdomains, and SSL certificates.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Domains

A _domain_ or _domain name_ (also known as a _zone_) is the location of a website or application, or what an end user types into their browser to get to your website (`example.com`).

## Get a domain name

You can purchase domain names for your website from a variety of places. Cloudflare offers an at-cost registrar service to [purchase new domain names](https://developers.cloudflare.com/registrar/get-started/register-domain/) or [transfer existing domain names](https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare/).

Refer to [Account and domain management best practices](https://developers.cloudflare.com/fundamentals/reference/best-practices/) for a detailed list of ways to protect your account and domain.

## Host your domain

A web host keeps your website online so visitors can reach it via the domain name.

Cloudflare does not offer web hosting for most websites, though you can deploy and host JAMstack sites with [Cloudflare Pages](https://developers.cloudflare.com/pages/).

## Add a domain to Cloudflare

For help onboarding a domain to Cloudflare's CDN, refer to our [setup guide](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).

You will need to [update your domain's nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/) and [proxy](https://developers.cloudflare.com/dns/proxy-status/) your web traffic to benefit from caching, DDoS protection, Argo Smart Routing, and other [application security and performance products](https://developers.cloudflare.com/directory/?product-group=Application+performance%2CApplication+security).

## Get free SSL certificates

Cloudflare offers free, unshared, publicly trusted [Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) to all Cloudflare domains.

## Manage subdomains

For more details about subdomains (`www.example.com` or `blog.example.com`), refer to [Manage subdomains](https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/#page","headline":"Domains · Cloudflare Fundamentals docs","description":"Add, configure, and manage your domains (zones) on Cloudflare, including DNS setup, subdomains, and SSL certificates.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}}]}
```
