---
title: Manage subdomains
description: Create subdomains, set up redirects between subdomains and apex domains, and configure SSL/TLS for subdomains on Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage subdomains

Once you have [added your domain to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) and [updated your nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/), you also might want to set up a subdomain.

Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.

## Create a subdomain

If you have already added a subdomain at your host, create a corresponding [DNS A or CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for that subdomain (`blog`, `store`).

## Set up redirects

### Redirect a subdomain to the apex domain

Sometimes, you might want all traffic to a subdomain (`www.example.com`) to actually go to your apex domain (`example.com`).

1. Create a [proxied DNS A record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for your subdomain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.  
| **Type** | **Name** | **IPv4 address** | **Proxy status** |  
| -------- | -------- | ---------------- | ---------------- |  
| A        | www      | 192.0.2.1        | Proxied          |
2. Create a [Single Redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) to forward traffic from your subdomain to your apex domain.

**When incoming requests match**

Using the Expression Editor:  
`(http.request.full_uri contains "www.example.com")`

**Then**

* **Type:** _Dynamic_
* **Expression:** `concat("https://","example.com",http.request.uri.path)`
* **Status code:** _301_

### Redirect the apex domain to a subdomain

Sometimes, you might want all traffic to your apex domain (`example.com`) to actually go to a subdomain (`www.example.com`).

1. If you have already added that subdomain at your host, create a corresponding [DNS A or CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for that subdomain.
2. Create a proxied DNS A record for your apex domain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.  
| **Type** | **Name** | **IPv4 address** | **Proxy status** |  
| -------- | -------- | ---------------- | ---------------- |  
| A        | @        | 192.0.2.1        | Proxied          |
3. Create a [Single Redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) to forward traffic from your apex domain to your subdomain.

**When incoming requests match**

Using the Expression Editor:  
`(lower(http.host) eq "example.com")`

**Then**

* **Type:** _Dynamic_
* **Expression:** `concat("https://","www.example.com",http.request.uri.path)`
* **Status code:** _301_

## SSL/TLS for subdomains

If your main domain is using Cloudflare's [Universal SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/), that certificate also covers all first-level subdomains (`blog.example.com`).

For deeper subdomains (`dev.blog.example.com`), use a [different type of certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/#full-setup).

Proxy status

Cloudflare can only serve an SSL/TLS certificate for a DNS record when you set the record's [proxy status](https://developers.cloudflare.com/dns/proxy-status/) to **Proxied**. If you do not do this, the origin server your record points to will be responsible for supporting SSL/TLS connections.

## Customize subdomain behavior

If you want to customize Cloudflare settings for individual subdomains, your approach will vary depending on your plan.

Enterprise customers can set up custom settings and access for a specific subdomain within Cloudflare with [Subdomain support](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

All other customers can set up subdomain-specific [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/) or [Page Rules](https://developers.cloudflare.com/rules/page-rules/) to alter Cloudflare settings.

If you want a subdomain's DNS settings managed totally outside of Cloudflare — meaning this subdomain can be managed by individuals without access to your Cloudflare account — refer to [Delegating subdomains outside of Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/#page","headline":"Manage subdomains · Cloudflare Fundamentals docs","description":"Create subdomains, set up redirects between subdomains and apex domains, and configure SSL/TLS for subdomains on Cloudflare.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-domains/manage-subdomains/","name":"Manage subdomains"}}]}
```
