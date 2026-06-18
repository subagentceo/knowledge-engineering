---
title: AI Labyrinth
description: Trap unauthorized AI crawlers with invisible honeypot links to waste their resources.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI Labyrinth

The AI Labyrinth adds invisible links on your webpage with specific `Nofollow` tags to block AI crawlers that do not adhere to the recommended guidelines and crawl without permission. AI crawlers that scrape your website content without permission will be stuck in a maze of never-ending links, and their details are recorded and used by all Cloudflare customers who choose to block [AI bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots).

These links do not impact your search engine optimization (SEO) or your website's appearance, and are only seen by bots. AI bots that respect no-crawl instructions will safely ignore this honeypot.

To enable AI Labyrinth:

* [  New dashboard ](#tab-panel-6818)
* [ Old dashboard ](#tab-panel-6819)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **AI Labyrinth**.
4. Turn **AI Labyrinth** on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Bot Fight Mode**.
4. Enable **AI Labyrinth**.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/#page","headline":"AI Labyrinth · Cloudflare bot solutions docs","description":"Trap unauthorized AI crawlers with invisible honeypot links to waste their resources.","url":"https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/ai-labyrinth/","name":"AI Labyrinth"}}]}
```
