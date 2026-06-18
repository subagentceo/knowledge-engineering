---
title: String functions
description: String manipulation SQL functions for Analytics Engine.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# String functions

## length

Usage:

```

length({string})


```

Returns the length of a string. This function is UTF-8 compatible.

Examples:

```

SELECT length('a string') AS s;

SELECT length(blob1) AS s FROM your_dataset;


```

For backwards-compatibility, this function is the equivalent of ClickHouse's `lengthUTF8` function, rather than ClickHouse's `length` function.

## empty

Usage:

```

empty({string})


```

Returns a boolean saying whether the string was empty. This computation can also be done as a binary operation: `{string} = ''`.

Examples:

```

SELECT empty('a string') AS b;

SELECT empty(blob1) AS b FROM your_dataset;


```

For backwards compatibility, this function can also be called using `empty(<string>)`.

## lower

Usage:

```

lower({string})


```

Returns the string converted to lowercase. This function is NOT Unicode compatible - refer to `lowerUTF8` for that.

Examples:

```

SELECT lower('STRING TO DOWNCASE') AS s;

SELECT lower(blob1) AS s FROM your_dataset;


```

## lowerUTF8 New

Usage:

```

lowerUTF8({string})


```

Returns the string converted to lowercase. This function is Unicode compatible. This may not be perfect for all languages and users with stringent needs, should do the operation in their own code.

Examples:

```

SELECT lowerUTF8('STRING TO DOWNCASE') AS s;

SELECT lowerUTF8(blob1) AS s FROM your_dataset;


```

For backwards compatibility, this function can also be called using `toLower({string})`.

## upper

Usage:

```

upper({string})


```

Returns the string converted to uppercase. This function is NOT Unicode compatible - refer to `upperUTF8` for that.

Examples:

```

SELECT upper('string to uppercase') AS s;

SELECT upper(blob1) AS s FROM your_dataset;


```

## upperUTF8 New

Usage:

```

upperUTF8({string})


```

Returns the string converted to uppercase. This function is Unicode compatible. The results may not be perfect for all languages and users with strict needs. These users should do the operation in their own code.

Examples:

```

SELECT upperUTF8('string to uppercase') AS s;

SELECT upperUTF8(blob1) AS s FROM your_dataset;


```

For backwards compatibility, this function can also be called using `toUpper({string})`.

## startsWith

Usage:

```

startsWith({string}, {string})


```

Returns a boolean of whether the first string has the second string at its start.

Examples:

```

SELECT startsWith('prefix ...', 'prefix') AS b;

SELECT startsWith(blob1, 'prefix') AS b FROM your_dataset;


```

## endsWith

Usage:

```

endsWith({string}, {string})


```

Returns a boolean of whether the first string contains the second string at its end.

Examples:

```

SELECT endsWith('prefix suffix', 'suffix') AS b;

SELECT endsWith(blob1, 'suffix') AS b FROM your_dataset;


```

## position

Usage:

```

position({needle:string} IN {haystack:string})


```

Returns the position of one string, `needle`, in another, `haystack`. In SQL, indexes are usually 1-based. That means that position returns `1` if your needle is at the start of the haystack. It only returns `0` if your string is not found.

Examples:

```

SELECT position(':' IN 'hello: world') AS p;

SELECT position(':' IN blob1) AS p FROM your_dataset;


```

## substring

Usage:

```

substring({string}, {offset:integer}[. {length:integer}])


```

Extracts part of a string, starting at the Unicode code point indicated by the offset and returning the number of code points requested by the length. As previously mentioned, in SQL, indexes are usually 1-based. That means that the offset provided to substring should be at least `1`.

Examples:

```

SELECT substring('hello world', 6) AS s;

SELECT substring('hello: world', 1, position(':' IN 'hello: world')-1) AS s;


```

## format

Usage:

```

format({string}[, ...])


```

This function supports formatting strings, integers, floats, datetimes, intervals, etc, except `NULL`. The function does not support literal `{` and `}` characters in the format string.

Examples:

```

SELECT format('blob1: {}', blob1) AS s FROM dataset;


```

The [formatDateTime](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/date-time-functions/#formatdatetime) function might also be useful.

## extract

Usage:

```

extract(<time unit> from <datetime>)


```

`extract` returns an integer number of time units from a datetime. It supports`YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE` and `SECOND`.

Examples:

```

-- extract the number of seconds from a timestamp (returns 15 in this example)

extract(SECOND from toDateTime('2022-06-06 11:30:15'))


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/string-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"String manipulation SQL functions for Analytics Engine.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/string-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/string-functions/","name":"String functions"}}]}
```
