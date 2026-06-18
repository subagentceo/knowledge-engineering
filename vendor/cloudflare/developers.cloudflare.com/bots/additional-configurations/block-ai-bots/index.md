---
title: Block AI Bots
description: Block AI crawlers and scrapers from accessing your website content.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Block AI Bots

Block AI bots availability

The **Block AI bots** feature is only available in the new [application security dashboard](https://developers.cloudflare.com/security/).

You can choose to block AI bots by activating **Block AI bots**. Activating this setting will block [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) that are classified as AI crawlers, as well as a number of unverified bots that behave similarly.

To block [AI bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots):

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Block AI bots**.
4. Under **Configurations**, select the edit icon. Choose from:  
   * **Only block on hostnames with ads**: Use this option if you wish to block AI bots only on portions of your site that show ads. Cloudflare automatically detects whether ads are present on a subdomain, and only block on hostnames that contain those ad units.  
   * **Block on all pages**: Use this option if you wish to block AI bots on all your pages.  
   * **Do not block (off)**: Use this option if you wish to allow AI bots on all your pages.
5. Select **Save** to save your configuration.

To block individual AI crawlers (rather than blocking all crawlers), use [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/#page","headline":"Block AI Bots · Cloudflare bot solutions docs","description":"Block AI crawlers and scrapers from accessing your website content.","url":"https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Scraping"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/block-ai-bots/","name":"Block AI Bots"}}]}
```
