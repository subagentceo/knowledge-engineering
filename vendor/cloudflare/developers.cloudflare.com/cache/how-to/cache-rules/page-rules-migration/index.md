---
title: Migration from Page Rules
description: Migrate caching Page Rules to Cache Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migration from Page Rules

If you are migrating from Page Rules, there is a behavior change between Page Rules and Cache Rules.

When you create a new Cache Rule and select **Eligible for cache**, the Cache Everything feature is enabled by default. With Page Rules, you had to specifically enable the Cache Everything option.

To maintain the same behavior you had with Page Rules (that is, not enabling Cache Everything), you need to create these two specific rules in this order before creating any additional rules.

Multiple matching cache rules can be combined and applied to the same request. After rule 1 matches, Cloudflare will keep evaluating other cache rules checking for matches. For more information, refer to [Order and priority](https://developers.cloudflare.com/cache/how-to/cache-rules/order/).

## Rule 1

* [ Dashboard ](#tab-panel-6963)
* [ visual guide ](#tab-panel-6964)

1. Enter a rule name, for instance `bypass everything`.
2. In **When incoming requests match**, select **All incoming requests**.
3. Under **Then**, in the **Cache eligibility** section, select [Bypass cache](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#bypass-cache).

![Create rule to bypass cache](https://developers.cloudflare.com/_astro/first-rule.DCA_9a45_1jNULw.webp)

## Rule 2

* [ Dashboard ](#tab-panel-6965)
* [ visual guide ](#tab-panel-6966)

1. Enter a rule name, for instance `cache all default cacheable extensions`.
2. In **When incoming requests match**, select **Custom filter expression**.
3. Define the following rule:  
   * **Field**: `File extension`  
   * **Operator**: `is in`  
   * **Value**: `7z, avi, avif, apk, bin, bmp, bz2, class, css, csv, doc, docx, dmg, ejs, eot, eps, exe, flac, gif, gz, ico, iso, jar, jpg, jpeg, js, mid, midi, mkv, mp3, mp4, ogg, otf, pdf, pict, pls, png, ppt, pptx, ps, rar, svg, svgz, swf, tar, tif, tiff, ttf, webm, webp, woff, woff2, xls, xlsx, zip, zst`

If you prefer, you can select **Edit expression** and paste the following expression:

```

(http.request.uri.path.extension in {"7z" "avi" "avif" "apk" "bin" "bmp" "bz2" "class" "css" "csv" "doc" "docx" "dmg" "ejs" "eot" "eps" "exe" "flac" "gif" "gz" "ico" "iso" "jar" "jpg" "jpeg" "js" "mid" "midi" "mkv" "mp3" "mp4" "ogg" "otf" "pdf" "pict" "pls" "png" "ppt" "pptx" "ps" "rar" "svg" "svgz" "swf" "tar" "tif" "tiff" "ttf" "webm" "webp" "woff" "woff2" "xls" "xlsx" "zip" "zst"})


```

1. Under **Then**, in the **Cache eligibility** section, select [**Eligible for cache**](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#eligible-for-cache-settings).

![Create an eligible for cache rule](https://developers.cloudflare.com/_astro/second-rule.88NhnPNI_c13b4.webp)

Note

Remember to create the rules in the specified order: first, the `bypass everything` rule, and then the `cache all default cacheable file extensions` rule.

![Rules order](https://developers.cloudflare.com/_astro/rule-order.wNZiF99u_ZOuxf5.webp)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/#page","headline":"Migration from Page Rules · Cloudflare Cache (CDN) docs","description":"Migrate caching Page Rules to Cache Rules.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/page-rules-migration/","name":"Migration from Page Rules"}}]}
```
