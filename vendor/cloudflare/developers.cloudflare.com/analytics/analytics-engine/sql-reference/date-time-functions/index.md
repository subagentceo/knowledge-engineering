---
title: Date and Time functions
description: Date and time SQL functions for Analytics Engine.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Date and Time functions

## formatDateTime

Usage:

```

formatDateTime(<datetime expression>, <format string>[, <timezone string>])


```

`formatDateTime` prints a datetime as a string according to a provided format string. Refer to[ClickHouse's documentation ↗](https://clickhouse.com/docs/en/sql-reference/functions/date-time-functions/#formatdatetime)for a list of supported formatting options.

Examples:

```

-- prints the current YYYY-MM-DD in UTC

formatDateTime(now(), '%Y-%m-%d')


-- prints YYYY-MM-DD in the datetime's timezone

formatDateTime(<a datetime with a timezone>, '%Y-%m-%d')

formatDateTime(toDateTime('2022-12-01 16:17:00', 'America/New_York'), '%Y-%m-%d')


-- prints YYYY-MM-DD in UTC

formatDateTime(<a datetime with a timezone>, '%Y-%m-%d', 'Etc/UTC')

formatDateTime(toDateTime('2022-12-01 16:17:00', 'America/New_York'), '%Y-%m-%d', 'Etc/UTC')


```

## now

Usage:

```

now()


```

Returns the current time as a DateTime.

## today New

Usage:

```

today()


```

Returns the current date as a `Date`.

## toDateTime

Usage:

```

toDateTime(<expression>[, 'timezone string'])


```

`toDateTime` converts an expression to a datetime. This function does not support ISO 8601-style timezones; if your time is not in UTC then you must provide the timezone using the second optional argument.

Examples:

```

-- double1 contains a unix timestamp in seconds

toDateTime(double1)


-- blob1 contains an datetime in the format 'YYYY-MM-DD hh:mm:ss'

toDateTime(blob1)


-- literal values:

toDateTime(355924804) -- unix timestamp

toDateTime('355924804') -- string containing unix timestamp

toDateTime('1981-04-12 12:00:04') -- string with datetime in 'YYYY-MM-DD hh:mm:ss' format


-- interpret a date relative to New York time

toDateTime('2022-12-01 16:17:00', 'America/New_York')


```

## toYear New

Usage:

```

toYear(<datetime>)


```

`toYear` returns the year of a datetime.

Examples:

```

-- returns the number 2025

toYear(toDateTime('2025-10-27 00:00:00'))


```

## toMonth New

Usage:

```

toMonth(<datetime>)


```

`toMonth` returns the year of a datetime.

Examples:

```

-- returns the number 10

toMonth(toDateTime('2025-10-27 00:00:00'))


```

## toDayOfWeek New

Usage:

```

toDayOfWeek(<datetime>)


```

`toDayOfWeek` takes a datetime and returns its numerical day of the week.

Returns `1` to indicate Monday, `2` to indicate Tuesday, and so on.

Examples:

```

-- returns the number 1 for Monday 27th October 2025

toDayOfWeek(toDateTime('2025-10-27 00:00:00'))


-- returns the number 2 for Tuesday 28th October 2025

toDayOfWeek(toDateTime('2025-10-28 00:00:00'))


-- returns the number 7 for Sunday 2nd November 2025

toDayOfWeek(toDateTime('2025-11-02 00:00:00'))


```

## toDayOfMonth New

Usage:

```

toDayOfMonth(<datetime>)


```

`toDayOfMonth` returns the day of the month from a datetime.

Examples:

```

-- returns the number 27

toDayOfMonth(toDateTime('2025-10-27 00:00:00'))


```

## toHour New

Usage:

```

toHour(<datetime>)


```

`toHour` returns the hour of the day from a datetime.

Examples:

```

-- returns the number 9

toHour(toDateTime('2025-10-27 09:11:13'))


```

## toMinute New

Usage:

```

toMinute(<datetime>)


```

`toMinute` returns the minute of the hour from a datetime.

Examples:

```

-- returns the number 11

toMinute(toDateTime('2025-10-27 09:11:13'))


```

## toSecond New

Usage:

```

toSecond(<datetime>)


```

`toSecond` returns the second of the minute from a datetime.

Examples:

```

-- returns the number 13

toSecond(toDateTime('2025-10-27 09:11:13'))


```

## toUnixTimestamp

Usage:

```

toUnixTimestamp(<datetime>)


```

`toUnixTimestamp` converts a datetime into an integer unix timestamp.

Examples:

```

-- get the current unix timestamp

toUnixTimestamp(now())


```

## toStartOfInterval

Usage:

```

toStartOfInterval(<datetime>, INTERVAL '<n>' <unit>[, <timezone string>])


```

`toStartOfInterval` rounds down a datetime to the nearest offset of a provided interval. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round the current time down to the nearest 15 minutes

toStartOfInterval(now(), INTERVAL '15' MINUTE)


-- round a timestamp down to the day

toStartOfInterval(timestamp, INTERVAL '1' DAY)


-- count the number of datapoints filed in each hourly window

SELECT

  toStartOfInterval(timestamp, INTERVAL '1' HOUR) AS hour,

  sum(_sample_interval) AS count

FROM your_dataset

GROUP BY hour

ORDER BY hour ASC


```

## toStartOfYear New

Usage:

```

toStartOfYear(<datetime>)


```

`toStartOfYear` rounds down a datetime to the nearest start of year. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-01-01 00:00:00

toStartOfYear(toDateTime('2025-10-27 00:00:00'))


```

## toStartOfMonth New

Usage:

```

toStartOfMonth(<datetime>)


```

`toStartOfMonth` rounds down a datetime to the nearest start of month. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-10-01 00:00:00

toStartOfMonth(toDateTime('2025-10-27 00:00:00'))


```

## toStartOfWeek New

Usage:

```

toStartOfWeek(<datetime>)


```

`toStartOfWeek` rounds down a datetime to the start of the week. This can be useful for grouping data into equal-sized time ranges.

Treats Monday as the first day of the week.

Examples:

```

-- round a time on a Monday down to Monday 2025-10-27 00:00:00

toStartOfWeek(toDateTime('2025-10-27 00:00:00'))


-- round a time on a Wednesday down to Monday 2025-10-27 00:00:00

toStartOfWeek(toDateTime('2025-10-29 00:00:00'))


```

## toStartOfDay New

Usage:

```

toStartOfDay(<datetime>)


```

`toStartOfDay` rounds down a datetime to the nearest start of day. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-10-27 00:00:00

toStartOfDay(toDateTime('2025-10-27 00:00:00'))


```

## toStartOfHour New

Usage:

```

toStartOfHour(<datetime>)


```

`toStartOfHour` rounds down a datetime to the nearest start of hour. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-10-27 16:00:00

toStartOfHour(toDateTime('2025-10-27 16:55:25'))


```

## toStartOfFifteenMinutes New

Usage:

```

toStartOfFifteenMinutes(<datetime>)


```

`toStartOfFifteenMinutes` rounds down a datetime to the nearest fifteen minutes. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-10-27 16:45:00

toStartOfFifteenMinutes(toDateTime('2025-10-27 16:55:25'))


```

## toStartOfTenMinutes New

Usage:

```

toStartOfTenMinutes(<datetime>)


```

`toStartOfTenMinutes` rounds down a datetime to the nearest ten minutes. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-10-27 16:50:00

toStartOfTenMinutes(toDateTime('2025-10-27 16:55:25'))


```

## toStartOfFiveMinutes New

Usage:

```

toStartOfFiveMinutes(<datetime>)


```

`toStartOfFiveMinutes` rounds down a datetime to the nearest five minutes. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-10-27 16:55:00

toStartOfFiveMinutes(toDateTime('2025-10-27 16:55:25'))


```

## toStartOfMinute New

Usage:

```

toStartOfMinute(<datetime>)


```

`toStartOfMinute` rounds down a datetime to the nearest minute. This can be useful for grouping data into equal-sized time ranges.

Examples:

```

-- round a timestamp down to 2025-10-27 16:55:00

toStartOfMinute(toDateTime('2025-10-27 16:55:25'))


```

## toYYYYMM New

Usage:

```

toYYYYMM(<datetime>)


```

`toYYYYMM` returns a number representing year and month of a datetime. For instance a datetime on `2025-05-03` would return the number `202505`.

Examples:

```

-- returns the number 202510

toYYYYMM(toDateTime('2025-10-27 16:55:25'))


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/date-time-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Date and time SQL functions for Analytics Engine.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/date-time-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/date-time-functions/","name":"Date and Time functions"}}]}
```
