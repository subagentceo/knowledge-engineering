---
title: Objects
description: Manage objects stored in Cloudflare R2 buckets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Objects

Objects are individual files or data that you store in an R2 bucket. Each object is identified by its key, a string like `images/photo.png`.

## Prefixes and folders

R2 uses a flat storage structure. There are no real directories or folders. The `/` character in an object key is used as a delimiter to group objects by prefix.

The R2 dashboard groups objects that share a common prefix into folders when the **View prefixes as directories** checkbox is selected. For example, objects with keys `logs/jan.csv` and `logs/feb.csv` appear under a `logs/` folder. These folders are a visual grouping and do not exist as separate resources in your bucket.

## Manage objects

* [ Upload objects ](https://developers.cloudflare.com/r2/objects/upload-objects/)
* [ Download objects ](https://developers.cloudflare.com/r2/objects/download-objects/)
* [ Delete objects ](https://developers.cloudflare.com/r2/objects/delete-objects/)

## Other resources

For information on R2 Workers Binding API, refer to [R2 Workers API reference](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/r2/objects/#page","headline":"Objects · Cloudflare R2 docs","description":"Manage objects stored in Cloudflare R2 buckets.","url":"https://developers.cloudflare.com/r2/objects/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/objects/","name":"Objects"}}]}
```
