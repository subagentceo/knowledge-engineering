---
title: Other functions
description: Miscellaneous scalar functions
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Other functions

_Cloudflare Pipelines scalar function implementations are based on[Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `arrow_cast`

Casts a value to a specific Arrow data type:

```

arrow_cast(expression, datatype)


```

**Arguments**

* **expression**: Expression to cast. Can be a constant, column, or function, and any combination of arithmetic or string operators.
* **datatype**: [Arrow data type ↗](https://docs.rs/arrow/latest/arrow/datatypes/enum.DataType.html) name to cast to, as a string. The format is the same as that returned by \[`arrow_typeof`\]

**Example**

```

> select arrow_cast(-5, 'Int8') as a,

  arrow_cast('foo', 'Dictionary(Int32, Utf8)') as b,

  arrow_cast('bar', 'LargeUtf8') as c,

  arrow_cast('2023-01-02T12:53:02', 'Timestamp(Microsecond, Some("+08:00"))') as d

  ;

+----+-----+-----+---------------------------+

| a  | b   | c   | d                         |

+----+-----+-----+---------------------------+

| -5 | foo | bar | 2023-01-02T12:53:02+08:00 |

+----+-----+-----+---------------------------+

1 row in set. Query took 0.001 seconds.


```

## `arrow_typeof`

Returns the name of the underlying [Arrow data type ↗](https://docs.rs/arrow/latest/arrow/datatypes/enum.DataType.html) of the expression:

```

arrow_typeof(expression)


```

**Arguments**

* **expression**: Expression to evaluate. Can be a constant, column, or function, and any combination of arithmetic or string operators.

**Example**

```

> select arrow_typeof('foo'), arrow_typeof(1);

+---------------------------+------------------------+

| arrow_typeof(Utf8("foo")) | arrow_typeof(Int64(1)) |

+---------------------------+------------------------+

| Utf8                      | Int64                  |

+---------------------------+------------------------+

1 row in set. Query took 0.001 seconds.


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/other/#page","headline":"Other functions · Cloudflare Pipelines Docs","description":"Miscellaneous scalar functions","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/other/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/scalar-functions/","name":"Scalar functions"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sql-reference/scalar-functions/other/","name":"Other functions"}}]}
```
