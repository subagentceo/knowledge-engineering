---
title: Redirecting www to domain apex
description: Redirect a www subdomain to your apex domain on Cloudflare Pages using Bulk Redirects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirecting www to domain apex

Learn how to redirect a `www` subdomain to your apex domain (`example.com`).

This setup assumes that you already have a [custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/) attached to your Pages project.

## Setup

To redirect your `www` subdomain to your domain apex:

1. In the Cloudflare dashboard, go to the **Bulk Redirects** page.  
[ Go to **Bulk redirects** ](https://dash.cloudflare.com/?to=/:account/bulk-redirects)
2. [Create a bulk redirect list](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/#1-create-a-bulk-redirect-list) modeled after the following (but replacing the values as appropriate):

| Source URL      | Target URL          | Status | Parameters                                                                  |
| --------------- | ------------------- | ------ | --------------------------------------------------------------------------- |
| www.example.com | https://example.com | 301    | Preserve query stringSubpath matchingPreserve path suffixInclude subdomains |

1. [Create a bulk redirect rule](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/#2-create-a-bulk-redirect-rule) using the list you just created.
2. Go to **DNS**.
3. [Create a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) for the `www` subdomain using the following values:

| Type | Name | IPv4 address | Proxy status |
| ---- | ---- | ------------ | ------------ |
| A    | www  | 192.0.2.1    | Proxied      |

It may take a moment for this DNS change to propagate, but once complete, you can run the following command in your terminal.

Terminal window

```

curl --head -i https://www.example.com/


```

Then, inspect the output to verify that the `location` header and status code are being set as configured.

## Related resources

* [Redirect \*.pages.dev to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)
* [Handle redirects with Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/www-redirect/#page","headline":"Redirecting www to domain apex · Cloudflare Pages docs","description":"Redirect a www subdomain to your apex domain on Cloudflare Pages using Bulk Redirects.","url":"https://developers.cloudflare.com/pages/how-to/www-redirect/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/how-to/www-redirect/","name":"Redirecting www to domain apex"}}]}
```
