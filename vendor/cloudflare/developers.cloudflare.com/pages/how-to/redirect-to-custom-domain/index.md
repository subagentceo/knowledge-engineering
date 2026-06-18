---
title: Redirecting *.pages.dev to a Custom Domain
description: Use Bulk Redirects to redirect your pages.dev subdomain to a custom domain.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirecting \*.pages.dev to a Custom Domain

Learn how to use [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/) to redirect your `*.pages.dev` subdomain to your [custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/).

You may want to do this to ensure that your site's content is served only on the custom domain, and not the `<project>.pages.dev` site automatically generated on your first Pages deployment.

## Setup

To redirect a `<project>.pages.dev` subdomain to your custom domain:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Custom domains** and make sure that your custom domain is listed. If it is not, add it by clicking **Set up a custom domain**.
4. Go **Bulk Redirects**.
5. [Create a bulk redirect list](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/#1-create-a-bulk-redirect-list) modeled after the following (but replacing the values as appropriate):

| Source URL          | Target URL          | Status | Parameters                                                                  |
| ------------------- | ------------------- | ------ | --------------------------------------------------------------------------- |
| <project>.pages.dev | https://example.com | 301    | Preserve query stringSubpath matchingPreserve path suffixInclude subdomains |

1. [Create a bulk redirect rule](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/create-dashboard/#2-create-a-bulk-redirect-rule) using the list you just created.

To test that your redirect worked, go to your `<project>.pages.dev` domain. If the URL is now set to your custom domain, then the rule has propagated.

## Related resources

* [Redirect www to domain apex](https://developers.cloudflare.com/pages/how-to/www-redirect/)
* [Handle redirects with Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/#page","headline":"Redirecting *.pages.dev to a Custom Domain · Cloudflare Pages docs","description":"Use Bulk Redirects to redirect your pages.dev subdomain to a custom domain.","url":"https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/how-to/redirect-to-custom-domain/","name":"Redirecting *.pages.dev to a Custom Domain"}}]}
```
