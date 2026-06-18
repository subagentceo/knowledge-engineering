---
title: Use cases
description: Explore common use cases and configurations.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use cases

The most common uses cases are:

* When creating a rule, using a list is easier and less error-prone than adding a long list of items such as IP addresses to a rule expression.
* When updating a set of rules that target the same group of IP addresses (or hostnames), using an IP list (or a hostname list) is easier and less error prone than editing multiple rules.
* Lists are easier to read and more informative, particularly when you use descriptive names for your lists.

When you update the content of a list, any rules that use the list are automatically updated, so you can make a single change to your list rather than modify rules individually.

Cloudflare stores your lists at the account level. You can use the same list in rules of different zones in your Cloudflare account.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/application-security/lists/use-cases/#page","headline":"Use cases · Cloudflare Learning Paths","description":"Explore common use cases and configurations.","url":"https://developers.cloudflare.com/learning-paths/application-security/lists/use-cases/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/lists/","name":"Lists"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/lists/use-cases/","name":"Use cases"}}]}
```
