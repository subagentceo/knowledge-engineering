---
title: Redirect one domain to another
description: Set up domain redirects in Cloudflare to forward traffic from an alias domain to your primary domain using DNS records and redirect rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirect one domain to another

If you have an alias domain that only forwards traffic to another domain (that is, the domain does not have an associated origin server of its own), you can set up redirects directly within Cloudflare.

1. [Add](https://developers.cloudflare.com/fundamentals/manage-domains/#add-a-domain-to-cloudflare) your alias domain (for example, `previous.com`) to Cloudflare.
2. Make sure that your alias domain has a proxied [DNS A or CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) that properly resolves DNS queries. You may also want to include a subdomain DNS record for `www`.  
Use the IP address `192.0.2.1` for the `A` record. This address does not route traffic to an origin server but allows Cloudflare to apply rules, redirects, and Workers to incoming traffic. The equivalent IP address for an `AAAA` record is `100::`.  
| **Type** | **Name** | **IPv4 address** | **Proxy status** |  
| -------- | -------- | ---------------- | ---------------- |  
| A        | @        | 192.0.2.1        | Proxied          |  
| A        | www      | 192.0.2.1        | Proxied          |
3. Use [Redirect rules](https://developers.cloudflare.com/rules/url-forwarding/) to forward traffic from your alias domain to your other domain.

This example will redirect all requests for `smallshop.example.com` to a different hostname using HTTPS, keeping the original path and query string.

**When incoming requests match**

* **Field:** _Hostname_
* **Operator:** _equals_
* **Value:** `smallshop.example.com`

If you are using the Expression Editor, enter the following expression:  
`(http.host eq "smallshop.example.com")`

**Then**

* **Type:** _Dynamic_
* **Expression:** `concat("https://globalstore.example.net", http.request.uri.path)`
* **Status code:** _301_
* **Preserve query string:** Enabled

For example, the redirect rule would perform the following redirects:

| Request URL                                          | Target URL                                              | Status code |
| ---------------------------------------------------- | ------------------------------------------------------- | ----------- |
| http://smallshop.example.com/                        | https://globalstore.example.net/                        | 301         |
| http://smallshop.example.com/admin/?logged\_out=true | https://globalstore.example.net/admin/?logged\_out=true | 301         |
| https://smallshop.example.com/?all\_items=1          | https://globalstore.example.net/?all\_items=1           | 301         |
| http://example.com/about/                            | (unchanged)                                             | n/a         |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/redirect-domain/#page","headline":"Redirect one domain to another · Cloudflare Fundamentals docs","description":"Set up domain redirects in Cloudflare to forward traffic from an alias domain to your primary domain using DNS records and redirect rules.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/redirect-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-domains/redirect-domain/","name":"Redirect one domain to another"}}]}
```
