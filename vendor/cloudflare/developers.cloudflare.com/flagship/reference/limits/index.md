---
title: Limits
description: Platform limits for Flagship, including maximum apps per account, flags per app, condition nesting depth, and configuration size.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

Flagship enforces the following limits.

## Platform limits

| Feature                         | Limit    |
| ------------------------------- | -------- |
| Apps per account                | 10,000   |
| Flags per app                   | 5,000    |
| Condition nesting depth         | 6 levels |
| Flag configuration size per app | 25 MB    |

Note

The apps-per-account and flags-per-app limits are soft limits. If your use case requires higher limits, contact Cloudflare support.

## Notes

* Condition nesting depth counts from the top-level condition group. A flat list of conditions (no nesting) has a depth of 1.
* Flag configuration size refers to the total serialized size of all flags within a single app, including their variations and rules.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/reference/limits/#page","headline":"Limits · Cloudflare Flagship docs","description":"Platform limits for Flagship, including maximum apps per account, flags per app, condition nesting depth, and configuration size.","url":"https://developers.cloudflare.com/flagship/reference/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/flagship/reference/limits/","name":"Limits"}}]}
```
