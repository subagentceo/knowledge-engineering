---
title: Bot tags
description: Tags that explain why Cloudflare assigned a specific bot score to a request.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bot tags

Bot tags provide more detail about _why_ Cloudflare assigned a [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) to a request.

Use these tags to learn more about your bot traffic and better inform security settings.

Note

Bot tags are only available to Enterprise customers who have purchased Bot Management.

## Potential values

Once you [enable bot tags](#enable-bot-tags), you can see more information about bot requests, such as whether a request came from a verified bot (like Bing) or a category of verified bot (like SearchEngine).

The following values are **examples** of what may be present in the `BotTags` log field, but not an exhaustive list:

* api
* google
* bing
* googleAds
* googleMedia
* googleImageProxy
* pinterest
* newRelic
* baidu
* apple
* yandex

## Enable bot tags

To enable bot tags, include the `BotTags` log field when using our [Logpush service](https://developers.cloudflare.com/logs/logpush/).

## Limitations

Currently, bot tags are only available in log fields.

Future work will add more values and extend bot tags to other Cloudflare products.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/concepts/bot-tags/#page","headline":"Bot tags · Cloudflare bot solutions docs","description":"Tags that explain why Cloudflare assigned a specific bot score to a request.","url":"https://developers.cloudflare.com/bots/concepts/bot-tags/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot-tags/","name":"Bot tags"}}]}
```
