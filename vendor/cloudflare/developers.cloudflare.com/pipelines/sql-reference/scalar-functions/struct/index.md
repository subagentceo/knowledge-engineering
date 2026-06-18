---
title: Struct functions
description: Scalar functions for manipulating structs
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Struct functions

_Cloudflare Pipelines scalar function implementations are based on[Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `struct`

Returns an Arrow struct using the specified input expressions. Fields in the returned struct use the `cN` naming convention. For example: `c0`, `c1`, `c2`, etc.

```

struct(expression1[, ..., expression_n])


```

For example, this query converts two columns `a` and `b` to a single column with a struct type of fields `c0` and `c1`:

```

select * from t;

+---+---+

| a | b |

+---+---+

| 1 | 2 |

| 3 | 4 |

+---+---+


select struct(a, b) from t;

+-----------------+

| struct(t.a,t.b) |

+-----------------+

| {c0: 1, c1: 2}  |

| {c0: 3, c1: 4}  |

+-----------------+


```

#### Arguments

* **expression\_n**: Expression to include in the output struct. Can be a constant, column, or function, and any combination of arithmetic or string operators.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/struct/#page","headline":"Struct functions · Cloudflare Pipelines Docs","description":"Scalar functions for manipulating structs","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/struct/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/scalar-functions/","name":"Scalar functions"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sql-reference/scalar-functions/struct/","name":"Struct functions"}}]}
```
