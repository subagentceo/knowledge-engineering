---
title: Create subdomain records
description: Add DNS records for subdomains.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create subdomain records

Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.

Even if you do not require specific subdomains, you might want to set up at least a subdomain record on `www`. It will usually point to the same content as what you have on the apex domain (`example.com`) or use a [redirect](https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/#redirect-a-subdomain-to-the-apex-domain). Having a subdomain DNS record on `www` helps guarantee that a visitor who types `www.` in front of your domain address can still find your website or application.

## Subdomain records

To host content on a subdomain of your domain, first ensure that your [hosting provider](https://developers.cloudflare.com/fundamentals/manage-domains/#host-your-domain) can serve content for the given hostname (`<subdomain>.example.com`).

Then, you would create a corresponding [IP address resolution record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ip-address-resolution) (`A`, `AAAA`, or `CNAME`), specifying the label for your subdomain (`blog`, `www`, or `store`, for example) as the record **Name**.

| Type | Name | IPv4 address | Proxy status |
| ---- | ---- | ------------ | ------------ |
| A    | blog | 192.0.2.1    | Proxied      |

* [ Dashboard ](#tab-panel-8097)
* [ API ](#tab-panel-8098)

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**.
3. Select `A`, `AAAA`, or `CNAME` as the record **Type**, according to your needs:  
   * To point to an IPv4 address, select `A`, use your subdomain (`blog`) for the record **Name**, and insert the IPv4 address in the respective field.  
   * To point to an IPv6 address, select `AAAA`, use your subdomain (`blog`) for the record **Name**, and insert the IPv6 address in the respective field.  
   * To point to a [fully qualified domain name (FQDN) ↗](https://en.wikipedia.org/wiki/Fully%5Fqualified%5Fdomain%5Fname) (such as `your-site.host.example.com`), select `CNAME`, use your subdomain (`blog`) for the record **Name**, and insert the fully qualified domain name in the **Target** field.
4. Specify the [**Proxy status**](https://developers.cloudflare.com/dns/proxy-status/) and [**TTL**](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) according to your needs.
5. Select **Save** to confirm.

Use the [Create DNS Record API endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

* To point to an IPv4 address, select **A Record**, use your subdomain (`blog`) for the field `name`, and use the IPv4 address for the field `content`.
* To point to an IPv6 address, select **AAAA Record**, use your subdomain (`blog`) for the field `name`, and use the IPv6 address for the field `content`.
* To point to a [fully qualified domain name (FQDN) ↗](https://en.wikipedia.org/wiki/Fully%5Fqualified%5Fdomain%5Fname) (such as `your-site.host.example.com`), select **CNAME Record**, use your subdomain (`blog`) for the field `name`, and use the fully qualified domain name for the field `content`.

## Subdomain redirects

For more guidance on redirecting a subdomain — either to your main domain or another location — refer to [Set up subdomain redirects](https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/#set-up-redirects).

## SSL/TLS for subdomains

While DNS is what communicates where your website or application can be reached, SSL/TLS is what enables websites and applications to establish connections in a secure way.

If your subdomains are not correctly covered by an SSL/TLS certificate, your visitors will find a warning on their browser stating that your website or application is not secure.

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/#page","headline":"Create subdomain records · Cloudflare DNS docs","description":"Add DNS records for subdomains.","url":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/how-to/create-subdomain/","name":"Create subdomain records"}}]}
```
