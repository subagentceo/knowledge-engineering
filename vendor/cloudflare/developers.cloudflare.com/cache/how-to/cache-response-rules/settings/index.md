---
title: Available settings
description: Available settings for cache response rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Available settings

These are the settings that you can configure when creating a Cache Response Rule. Because Cache Response Rules execute after Cloudflare receives the origin response, both request and response fields are available for rule matching.

## Expression fields

### Request fields

| Field                            | Type   | Description                                    |
| -------------------------------- | ------ | ---------------------------------------------- |
| http.cookie                      | String | Full cookie header value                       |
| http.host                        | String | The HTTP Host header                           |
| http.referer                     | String | The HTTP Referer header                        |
| http.user\_agent                 | String | The HTTP User-Agent header                     |
| http.request.method              | String | The HTTP request method                        |
| http.request.uri                 | String | The request URI                                |
| http.request.uri.path            | String | The URI path                                   |
| http.request.uri.path.basename   | String | The basename of the URI path                   |
| http.request.uri.path.extension  | String | The file extension from the URI path           |
| http.request.uri.query           | String | The query string                               |
| http.request.uri.args            | Map    | Query string arguments as key-value pairs      |
| http.request.uri.args.names      | Array  | Query string argument names                    |
| http.request.uri.args.values     | Array  | Query string argument values                   |
| http.request.full\_uri           | String | The full request URI including scheme and host |
| http.request.headers             | Map    | Request headers as key-value pairs             |
| http.request.headers.names       | Array  | Request header names                           |
| http.request.headers.values      | Array  | Request header values                          |
| http.request.cookies             | Map    | Parsed cookies as key-value pairs              |
| http.request.accepted\_languages | Array  | Parsed Accept-Language header values           |

### Response fields

| Field                        | Type    | Description                                   |
| ---------------------------- | ------- | --------------------------------------------- |
| http.response.code           | Integer | The HTTP response status code from the origin |
| http.response.headers        | Map     | Response headers as key-value pairs           |
| http.response.headers.names  | Array   | Response header names                         |
| http.response.headers.values | Array   | Response header values                        |

If you select the [Edit expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) option, you can enter any of the above response fields.

## Functions

The following functions are available in this phase:

* all
* any
* concat
* decode\_base64
* ends\_with
* len
* lookup\_json\_integer
* lookup\_json\_string
* lower
* regex\_replace
* remove\_bytes
* remove\_query\_args
* split
* starts\_with
* substring
* to\_string
* upper
* url\_decode
* wildcard\_replace

For descriptions of each function, refer to [Functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/).

## Operators

For the full list of operators, refer to [Operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/).

## Available actions

Cache Response Rules support three actions:

| Action               | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| set\_cache\_settings | Strip headers (ETags, Set-Cookie, Last-Modified) from the origin response before caching. |
| set\_cache\_tags     | Add, remove, or set cache tags on the response for targeted purging.                      |
| set\_cache\_control  | Modify Cache-Control header directives in the origin response.                            |

---

### Action: set\_cache\_settings

Configures settings related to caching on the origin response. The following parameters are available:

| Parameter             | Type    | Description                                                          |
| --------------------- | ------- | -------------------------------------------------------------------- |
| strip\_etags          | Boolean | Strip ETag headers from the origin response before caching.          |
| strip\_set\_cookie    | Boolean | Strip Set-Cookie headers from the origin response before caching.    |
| strip\_last\_modified | Boolean | Strip Last-Modified headers from the origin response before caching. |

Note

If `strip_etags` or `strip_last_modified` is `true` after all matching rules are applied, [Smart Edge Revalidation ↗](https://blog.cloudflare.com/introducing-smart-edge-revalidation/) is disabled for the origin response.

API information

API action: `set_cache_settings`.

API configuration example

```

"action_parameters": {

  "strip_etags": true,

  "strip_set_cookie": true,

  "strip_last_modified": true

}


```

Refer to [Create a rule via API](https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-api/) for complete API examples.

---

### Action: set\_cache\_tags

Modifies the cache tags associated with the response. Cache tags can be used for targeted [cache purging](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/).

| Parameter  | Type   | Description                                                                             |
| ---------- | ------ | --------------------------------------------------------------------------------------- |
| operation  | String | **Required.** One of: add, remove, set.                                                 |
| values     | Array  | A list of cache tag strings. Mutually exclusive with expression.                        |
| expression | String | An expression that evaluates to an array of cache tags. Mutually exclusive with values. |

API information

API action: `set_cache_tags`.

API configuration example (static values)

```

"action_parameters": {

  "operation": "set",

  "values": ["api-response", "dynamic-content"]

}


```

API configuration example (expression)

```

"action_parameters": {

  "operation": "add",

  "expression": "split(http.response.headers[\"Surrogate-Keys\"][0], \",\", 1)"

}


```

Refer to [Create a rule via API](https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-api/) for complete API examples.

---

### Action: set\_cache\_control

Modifies Cache-Control header directives in the origin response.

#### Supported directives

**Directives with duration value (seconds):**

* `max-age`
* `s-maxage`
* `stale-if-error`
* `stale-while-revalidate`

**Directives with optional qualifiers (header names):**

* `private`
* `no-cache`

**Boolean directives:**

* `no-store`
* `no-transform`
* `must-revalidate`
* `proxy-revalidate`
* `must-understand`
* `public`
* `immutable`

#### Directive configuration

The available parameters depend on the directive type.

##### Directives with duration value

Applies to `max-age`, `s-maxage`, `stale-if-error`, and `stale-while-revalidate`.

| Parameter        | Type    | Description                                                                                                                     |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| operation        | String  | **Required.** set or remove.                                                                                                    |
| cloudflare\_only | Boolean | When enabled, this setting only affects how Cloudflare caches your content. Your visitors still receive the original directive. |
| value            | Integer | Duration in seconds. **Required when operation is set.**                                                                        |

##### Directives with optional qualifiers

Applies to `private` and `no-cache`.

| Parameter        | Type    | Description                                                                                                                     |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| operation        | String  | **Required.** set or remove.                                                                                                    |
| cloudflare\_only | Boolean | When enabled, this setting only affects how Cloudflare caches your content. Your visitors still receive the original directive. |
| qualifiers       | Array   | Optional list of header names to qualify the directive.                                                                         |

##### Boolean directives

Applies to `no-store`, `no-transform`, `must-revalidate`, `proxy-revalidate`, `must-understand`, `public`, and `immutable`.

| Parameter        | Type    | Description                                                                                                                     |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| operation        | String  | **Required.** set or remove.                                                                                                    |
| cloudflare\_only | Boolean | When enabled, this setting only affects how Cloudflare caches your content. Your visitors still receive the original directive. |

API information

API action: `set_cache_control`.

API configuration example

```

"action_parameters": {

  "max-age": {

    "operation": "set",

    "value": 3600,

    "cloudflare_only": true

  },

  "stale-if-error": {

    "operation": "remove"

  }

}


```

Refer to [Create a rule via API](https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-api/) for complete API examples.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/settings/#page","headline":"Cache Response Rules settings · Cloudflare Cache (CDN) docs","description":"Available settings for cache response rules.","url":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-response-rules/","name":"Cache Response Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-response-rules/settings/","name":"Available settings"}}]}
```
