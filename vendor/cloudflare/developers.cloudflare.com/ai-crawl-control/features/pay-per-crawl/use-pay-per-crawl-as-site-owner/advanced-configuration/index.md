---
title: Advanced configuration
description: Configure advanced Pay Per Crawl settings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advanced configuration

## Disable Pay Per Crawl by URI pattern

You may want to offer free access to certain pages while charging for others:

* Allow free access to **homepages, category pages, or navigation** to help crawlers discover paid content.
* Exclude functional pages like **login, search, or API endpoints** that don't contain chargeable content.
* Start with Pay Per Crawl on **a small section of your site** before expanding.
* Offer free access to **promotional or archived content** while charging for premium articles.

To get started, use [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/) to exclude specific URI patterns from charging.

1. Go to **Rules** \> **Overview** in the Cloudflare dashboard.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Configuration Rule**.
3. **When incoming requests match**: Set your URI pattern.  
   * Field: `URI Full`  
   * Operator: `wildcard`  
   * Value: `https://*example.com/public/*`
4. Select **Disable Pay Per Crawl** \> **Add**
5. Select **Deploy**.

**Example patterns:**

* Free homepage: `URI Full` equals `https://example.com/`
* Free directory: `URI Full` wildcard `https://*example.com/public/*`

Note

Some paths are always free to crawl. These paths are: `/robots.txt`, `/sitemap.xml`, `/security.txt`, `/.well-known/security.txt`, `/crawlers.json`

## Additional resources

* [Configuration Rules documentation](https://developers.cloudflare.com/rules/configuration-rules/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/#page","headline":"Advanced configuration · Cloudflare AI Crawl Control docs","description":"Configure advanced Pay Per Crawl settings.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/","name":"Pay Per Crawl"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/","name":"Use pay per crawl as a site owner"}},{"@type":"ListItem","position":6,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/","name":"Advanced configuration"}}]}
```
