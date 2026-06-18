---
title: Hotlink Protection
description: Prevent other sites from linking to your hosted images.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hotlink Protection

Hotlink Protection prevents your images from being used by other sites, which can reduce the bandwidth consumed by your [origin server ↗](https://www.cloudflare.com/learning/cdn/glossary/origin-server/).

The supported file extensions are `gif`, `ico`, `jpg`, `jpeg`, and `png`.

## Background

When Cloudflare receives an image request for your site, we check to ensure the request did not originate from visitors on another site. Visitors to your domain will still be able to download and view images.

Technically, this means that Hotlink Protection denies access to requests when the HTTP referer does not include your website domain name (and is not blank).

Hotlink protection has no impact on crawling, but it will prevent the images from being displayed on sites such as Google images, Pinterest, and Facebook.

## Enable Hotlink Protection

* [  New dashboard ](#tab-panel-11272)
* [ Old dashboard ](#tab-panel-11273)
* [ API ](#tab-panel-11274)

To enable **Hotlink Protection** in the dashboard:

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Client-side abuse**.
3. For **Hotlink Protection**, switch the toggle to **On**.

To enable **Hotlink Protection** in the dashboard:

1. In the Cloudflare dashboard, go to the **Scrape Shield** page.  
[ Go to **Scrape Shield** ](https://dash.cloudflare.com/?to=/:account/:zone/content-protection)
2. For **Hotlink Protection**, switch the toggle to **On**.

To enable **Hotlink Protection** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `hotlink_protection` as the setting name in the URI path, and the `value` parameter set to `"on"`.

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

### SaaS providers using Cloudflare

If you are a SaaS provider using [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/), note that, by default, Hotlink Protection will only allow requests with your zone as referer. To avoid blocking requests from your customers (custom hostnames), consider using [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/settings/#hotlink-protection) or [custom rules](https://developers.cloudflare.com/waf/custom-rules/use-cases/exempt-partners-hotlink-protection/).

---

## Allow hotlinking to specific images

You may want certain images to be hotlinked to, whether by external websites (like Google) or certain situations like when using an RSS feed.

### Configuration rules

To disable Hotlink Protection selectively, create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/) covering the path of an image folder.

### hotlink-ok directory

You can allow certain images to be hotlinked by placing them in a directory named `hotlink-ok`. The `hotlink-ok` directory can be placed anywhere on your website.

To allow another website to use `logo.png` from `example.com`, put `logo.png` in a new folder called `hotlink-ok`.

Some examples of URLs that will not be checked for hotlinking:

* `http://example.com/hotlink-ok/pic.jpg`
* `http://example.com/images/hotlink-ok/pic.jpg`
* `http://example.com/hotlink-ok/images/pic.jpg`
* `http://example.com/images/main-site/hotlink-ok/pic.jpg`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/#page","headline":"Hotlink Protection · Cloudflare Web Application Firewall (WAF) docs","description":"Prevent other sites from linking to your hosted images.","url":"https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/scrape-shield/","name":"Scrape Shield"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/scrape-shield/hotlink-protection/","name":"Hotlink Protection"}}]}
```
