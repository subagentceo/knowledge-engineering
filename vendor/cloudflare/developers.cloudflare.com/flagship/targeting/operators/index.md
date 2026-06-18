---
title: Operators
description: Reference for the 11 comparison operators available in Flagship targeting rule conditions, including equality, comparison, string, and array operators.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Operators

Flagship supports 11 comparison operators for targeting rule conditions. Each operator compares an attribute from the [evaluation context](https://developers.cloudflare.com/flagship/concepts/#evaluation-context) against a specified value.

## Operator reference

| Operator                  | Description                                                                          | Example                                                 | Value type                |
| ------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------- |
| equals                    | Returns true if the attribute value matches the specified value.                     | country equals "US"                                     | String                    |
| not\_equals               | Returns true if the attribute value does not match the specified value.              | plan not\_equals "free"                                 | String                    |
| greater\_than             | Returns true if the attribute value is greater than the specified value.             | age greater\_than 18                                    | Number, ISO 8601 datetime |
| less\_than                | Returns true if the attribute value is less than the specified value.                | loginCount less\_than 5                                 | Number, ISO 8601 datetime |
| greater\_than\_or\_equals | Returns true if the attribute value is greater than or equal to the specified value. | score greater\_than\_or\_equals 90                      | Number, ISO 8601 datetime |
| less\_than\_or\_equals    | Returns true if the attribute value is less than or equal to the specified value.    | createdAt less\_than\_or\_equals "2025-01-01T00:00:00Z" | Number, ISO 8601 datetime |
| contains                  | Returns true if the attribute value contains the specified substring.                | email contains "@cloudflare.com"                        | String                    |
| starts\_with              | Returns true if the attribute value starts with the specified prefix.                | path starts\_with "/api/v2"                             | String                    |
| ends\_with                | Returns true if the attribute value ends with the specified suffix.                  | domain ends\_with ".dev"                                | String                    |
| in                        | Returns true if the attribute value is in the specified array.                       | country in \["US", "CA", "UK"\]                         | Array                     |
| not\_in                   | Returns true if the attribute value is not in the specified array.                   | userId not\_in \["blocked-1", "blocked-2"\]             | Array                     |

## Operator categories

### Equality operators

`equals`, `not_equals`

Use these operators for exact string matching. The comparison is case-sensitive.

### Comparison operators

`greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`

These operators work with numeric values and ISO 8601 datetime strings. When comparing datetimes, provide the value in ISO 8601 format (for example, `"2025-01-01T00:00:00Z"`).

### String operators

`contains`, `starts_with`, `ends_with`

These operators perform substring matching against the attribute value. All string comparisons are case-sensitive.

### Array operators

`in`, `not_in`

The value must be an array. Flagship checks whether the attribute value is a member of the specified array.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/targeting/operators/#page","headline":"Operators · Cloudflare Flagship docs","description":"Reference for the 11 comparison operators available in Flagship targeting rule conditions, including equality, comparison, string, and array operators.","url":"https://developers.cloudflare.com/flagship/targeting/operators/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/targeting/","name":"Targeting rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/flagship/targeting/operators/","name":"Operators"}}]}
```
