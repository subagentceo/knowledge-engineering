---
title: Conditional functions
description: Scalar functions to implement conditional logic
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Conditional functions

_Cloudflare Pipelines scalar function implementations are based on[Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `coalesce`

Returns the first of its arguments that is not _null_. Returns _null_ if all arguments are _null_. This function is often used to substitute a default value for _null_ values.

```

coalesce(expression1[, ..., expression_n])


```

**Arguments**

* **expression1, expression\_n**: Expression to use if previous expressions are _null_. Can be a constant, column, or function, and any combination of arithmetic operators. Pass as many expression arguments as necessary.

## `nullif`

Returns _null_ if _expression1_ equals _expression2_; otherwise it returns _expression1_. This can be used to perform the inverse operation of [coalesce](#coalesce).

```

nullif(expression1, expression2)


```

**Arguments**

* **expression1**: Expression to compare and return if equal to expression2\. Can be a constant, column, or function, and any combination of arithmetic operators.
* **expression2**: Expression to compare to expression1\. Can be a constant, column, or function, and any combination of arithmetic operators.

## `nvl`

Returns _expression2_ if _expression1_ is NULL; otherwise it returns _expression1_.

```

nvl(expression1, expression2)


```

**Arguments**

* **expression1**: return if expression1 not is NULL. Can be a constant, column, or function, and any combination of arithmetic operators.
* **expression2**: return if expression1 is NULL. Can be a constant, column, or function, and any combination of arithmetic operators.

## `nvl2`

Returns _expression2_ if _expression1_ is not NULL; otherwise it returns _expression3_.

```

nvl2(expression1, expression2, expression3)


```

**Arguments**

* **expression1**: conditional expression. Can be a constant, column, or function, and any combination of arithmetic operators.
* **expression2**: return if expression1 is not NULL. Can be a constant, column, or function, and any combination of arithmetic operators.
* **expression3**: return if expression1 is NULL. Can be a constant, column, or function, and any combination of arithmetic operators.

## `ifnull`

_Alias of [nvl](#nvl)._

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/conditional/#page","headline":"Conditional functions · Cloudflare Pipelines Docs","description":"Scalar functions to implement conditional logic","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/conditional/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/scalar-functions/","name":"Scalar functions"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sql-reference/scalar-functions/conditional/","name":"Conditional functions"}}]}
```
