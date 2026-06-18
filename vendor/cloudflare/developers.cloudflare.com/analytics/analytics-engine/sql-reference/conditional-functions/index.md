---
title: Conditional functions
description: Conditional SQL functions for Analytics Engine queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Conditional functions

## if

Usage:

```

if(<condition>, <true_expression>, <false_expression>)


```

Returns `<true_expression>` if `<condition>` evaluates to true, else returns `<false_expression>`.

Example:

```

if(temp > 20, 'It is warm', 'Bring a jumper')


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/conditional-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Conditional SQL functions for Analytics Engine queries.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/conditional-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/conditional-functions/","name":"Conditional functions"}}]}
```
