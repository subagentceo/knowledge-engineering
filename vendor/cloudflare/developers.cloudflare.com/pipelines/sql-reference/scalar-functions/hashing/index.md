---
title: Hashing functions
description: Scalar functions for hashing values
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hashing functions

_Cloudflare Pipelines scalar function implementations are based on[Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `digest`

Computes the binary hash of an expression using the specified algorithm.

```

digest(expression, algorithm)


```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.
* **algorithm**: String expression specifying algorithm to use. Must be one of:  
   * md5  
   * sha224  
   * sha256  
   * sha384  
   * sha512  
   * blake2s  
   * blake2b  
   * blake3

## `md5`

Computes an MD5 128-bit checksum for a string expression.

```

md5(expression)


```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha224`

Computes the SHA-224 hash of a binary string.

```

sha224(expression)


```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha256`

Computes the SHA-256 hash of a binary string.

```

sha256(expression)


```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha384`

Computes the SHA-384 hash of a binary string.

```

sha384(expression)


```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha512`

Computes the SHA-512 hash of a binary string.

```

sha512(expression)


```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/hashing/#page","headline":"Hashing functions · Cloudflare Pipelines Docs","description":"Scalar functions for hashing values","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/hashing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/scalar-functions/","name":"Scalar functions"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sql-reference/scalar-functions/hashing/","name":"Hashing functions"}}]}
```
