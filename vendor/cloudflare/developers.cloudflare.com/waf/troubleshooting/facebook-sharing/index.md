---
title: Issues sharing to Facebook
description: Fix issues sharing your site content to Facebook.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Issues sharing to Facebook

Cloudflare does not block or challenge requests from Facebook by default. However, a post of a website to Facebook returns an _Attention Required_ error in the following situations:

* You have globally [enabled Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/).
* There is a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/) or [page rule](https://developers.cloudflare.com/rules/page-rules/) setting turning on Under Attack mode.
* There is a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) with a challenge or block action that includes a Facebook IP address.

A country challenge can block a Facebook IP address. Facebook is known to crawl from both the US and Ireland.

## Resolution

To resolve issues sharing to Facebook, do one of the following:

* Remove the corresponding IP, ASN, or country custom rule that challenges or blocks Facebook IPs.
* Create a [skip rule](https://developers.cloudflare.com/waf/custom-rules/skip/) for ASNs `AS32934` and `AS63293` (use the _Skip_ action and configure the rule to skip **Security Level**).
* Review existing configuration rules and Page Rules and make sure they are not affecting requests from Facebook IPs.

If you experience issues with Facebook sharing, you can re-scrape pages via the **Fetch New Scrape Information** option on Facebook's Object Debugger. Facebook [provides an API ↗](https://developers.facebook.com/docs/sharing/opengraph/using-objects) to help update a large number of resources.

If you continue to have issues, you can [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) with the URLs of your website that cannot share to Facebook, and confirming that you have re-scraped the URLs.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/troubleshooting/facebook-sharing/#page","headline":"Issues sharing to Facebook · Cloudflare Web Application Firewall (WAF) docs","description":"Fix issues sharing your site content to Facebook.","url":"https://developers.cloudflare.com/waf/troubleshooting/facebook-sharing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/troubleshooting/facebook-sharing/","name":"Issues sharing to Facebook"}}]}
```
