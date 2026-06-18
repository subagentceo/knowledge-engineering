---
title: Encoding functions
description: Encoding SQL functions for Analytics Engine queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Encoding functions

## bin New

Usage:

```

bin(<expression>)


```

`bin` returns a string containing the binary representation of its argument.

Examples:

```

-- get the binary representation of 1

bin(1)

-- get the binary representation of a string`

bin('abc')


```

## hex New

Usage:

```

hex(<expression>)


```

`hex` returns a string containing the hexadecimal representation of its argument.

Examples:

```

-- get the hexadecimal representation of 1

hex(1)

-- get the hexadecimal representation of a string`

hex('abc')


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/encoding-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Encoding SQL functions for Analytics Engine queries.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/encoding-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/encoding-functions/","name":"Encoding functions"}}]}
```
