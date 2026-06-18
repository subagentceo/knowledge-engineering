---
title: JSON functions
description: Scalar functions for manipulating JSON
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JSON functions

Cloudflare Pipelines provides two set of JSON functions, the first based on PostgreSQL's SQL functions and syntax, and the second based on the[JSONPath ↗](https://jsonpath.com/) standard.

## SQL functions

The SQL functions provide basic JSON parsing functions similar to those found in PostgreSQL.

### json\_contains

Returns `true` if the JSON string contains the specified key(s).

```

SELECT json_contains('{"a": 1, "b": 2, "c": 3}', 'a') FROM source;

true


```

Also available via the `?` operator:

```

SELECT '{"a": 1, "b": 2, "c": 3}' ? 'a' FROM source;

true


```

### json\_get

Retrieves the value from a JSON string by the specified path (keys). Returns the value as its native type (string, int, etc.).

```

SELECT json_get('{"a": {"b": 2}}', 'a', 'b') FROM source;

2


```

Also available via the `->` operator:

```

SELECT '{"a": {"b": 2}}'->'a'->'b' FROM source;

2


```

Various permutations of `json_get` functions are available for retrieving values as a specific type, or you can use SQL type annotations:

```

SELECT json_get('{"a": {"b": 2}}', 'a', 'b')::int FROM source;

2


```

### json\_get\_str

Retrieves a string value from a JSON string by the specified path. Returns an empty string if the value does not exist or is not a string.

```

SELECT json_get_str('{"a": {"b": "hello"}}', 'a', 'b') FROM source;

"hello"


```

### json\_get\_int

Retrieves an integer value from a JSON string by the specified path. Returns `0`if the value does not exist or is not an integer.

```

SELECT json_get_int('{"a": {"b": 42}}', 'a', 'b') FROM source;

42


```

### json\_get\_float

Retrieves a float value from a JSON string by the specified path. Returns `0.0`if the value does not exist or is not a float.

```

SELECT json_get_float('{"a": {"b": 3.14}}', 'a', 'b') FROM source;

3.14


```

### json\_get\_bool

Retrieves a boolean value from a JSON string by the specified path. Returns`false` if the value does not exist or is not a boolean.

```

SELECT json_get_bool('{"a": {"b": true}}', 'a', 'b') FROM source;

true


```

### json\_get\_json

Retrieves a nested JSON string from a JSON string by the specified path. The value is returned as raw JSON.

```

SELECT json_get_json('{"a": {"b": {"c": 1}}}', 'a', 'b') FROM source;

'{"c": 1}'


```

### json\_as\_text

Retrieves any value from a JSON string by the specified path and returns it as a string, regardless of the original type.

```

SELECT json_as_text('{"a": {"b": 42}}', 'a', 'b') FROM source;

"42"


```

Also available via the `->>` operator:

```

SELECT '{"a": {"b": 42}}'->>'a'->>'b' FROM source;

"42"


```

### json\_length

Returns the length of a JSON object or array at the specified path. Returns `0`if the path does not exist or is not an object/array.

```

SELECT json_length('{"a": [1, 2, 3]}', 'a') FROM source;

3


```

## Json path functions

JSON functions provide basic json parsing functions using[JsonPath ↗](https://goessner.net/articles/JsonPath/), an evolving standard for querying JSON objects.

### extract\_json

Returns the JSON elements in the first argument that match the JsonPath in the second argument. The returned value is an array of json strings.

```

SELECT extract_json('{"a": 1, "b": 2, "c": 3}', '$.a') FROM source;

['1']


```

### extract\_json\_string

Returns an unescaped String for the first item matching the JsonPath, if it is a string.

```

SELECT extract_json_string('{"a": "a", "b": 2, "c": 3}', '$.a') FROM source;

'a'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/json/#page","headline":"JSON functions · Cloudflare Pipelines Docs","description":"Scalar functions for manipulating JSON","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/json/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/scalar-functions/","name":"Scalar functions"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sql-reference/scalar-functions/json/","name":"JSON functions"}}]}
```
