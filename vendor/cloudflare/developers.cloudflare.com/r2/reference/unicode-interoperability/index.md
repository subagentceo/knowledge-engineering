---
title: Unicode interoperability
description: R2 NFC-normalizes object key names by default to ensure cross-platform Unicode consistency.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Unicode interoperability

R2 is built on top of Workers and supports Unicode natively. One nuance of Unicode that is often overlooked is the issue of [filename interoperability ↗](https://en.wikipedia.org/wiki/Filename#Encoding%5Findication%5Finteroperability) due to [Unicode equivalence ↗](https://en.wikipedia.org/wiki/Unicode%5Fequivalence).

Based on feedback from our users, we have chosen to NFC-normalize key names before storing by default. This means that `Héllo` and `Héllo`, for example, are the same object in R2 but different objects in other storage providers. Although `Héllo` and `Héllo` may be different character byte sequences, they are rendered the same.

R2 preserves the encoding for display though. When you list the objects, you will get back the last encoding you uploaded with.

There are still some platform-specific differences to consider:

* Windows and macOS filenames are case-insensitive while R2 and Linux are not.
* Windows console support for Unicode can be error-prone. Make sure to run `chcp 65001` before using command-line tools or use Cygwin if your object names appear to be incorrect.
* Linux allows distinct files that are unicode-equivalent because filenames are byte streams. Unicode-equivalent filenames on Linux will point to the same R2 object.

If it is important for you to be able to bypass the unicode equivalence and use byte-oriented key names, contact your Cloudflare account team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/reference/unicode-interoperability/#page","headline":"Unicode interoperability · Cloudflare R2 docs","description":"R2 NFC-normalizes object key names by default to ensure cross-platform Unicode consistency.","url":"https://developers.cloudflare.com/r2/reference/unicode-interoperability/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/reference/unicode-interoperability/","name":"Unicode interoperability"}}]}
```
