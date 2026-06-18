---
title: Type conversion functions
description: Type conversion SQL functions for Analytics Engine.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Type conversion functions

## toUInt8 New

Usage:

```

toUInt8(<expression>)


```

Converts any numeric expression, or expression resulting in a string representation of a decimal, into an unsigned 8 bit integer.

Behaviour for negative numbers is undefined.

## toUInt32

Usage:

```

toUInt32(<expression>)


```

Converts any numeric expression, or expression resulting in a string representation of a decimal, into an unsigned 32 bit integer.

Behaviour for negative numbers is undefined.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/type-conversion-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Type conversion SQL functions for Analytics Engine.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/type-conversion-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/type-conversion-functions/","name":"Type conversion functions"}}]}
```
