---
title: Aggregate functions
description: SQL aggregate functions for Analytics Engine queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Aggregate functions

## count

Usage:

```

count()

count(DISTINCT column_name)


```

`count` is an aggregation function that returns the number of rows in each group or results set.

`count` can also be used to count the number of distinct (unique) values in each column:

Example:

```

-- return the total number of rows

count()

-- return the number of different values in the column

count(DISTINCT column_name)


```

## sum

Usage:

```

sum([DISTINCT] column_name)


```

`sum` is an aggregation function that returns the sum of column values across all rows in each group or results set. Sum also supports `DISTINCT`, but in this case it will only sum the unique values in the column.

Example:

```

-- return the total cost of all items

sum(item_cost)

-- return the total of all unique item costs

sum(DISTINCT item_cost)


```

## avg

Usage:

```

avg([DISTINCT] column_name)


```

`avg` is an aggregation function that returns the mean of column values across all rows in each group or results set. Avg also supports `DISTINCT`, but in this case it will only average the unique values in the column.

Example:

```

-- return the mean item cost

avg(item_cost)

-- return the mean of unique item costs

avg(DISTINCT item_cost)


```

## min

Usage:

```

min(column_name)


```

`min` is an aggregation function that returns the minimum value of a column across all rows.

Example:

```

-- return the minimum item cost

min(item_cost)


```

## max

Usage:

```

max(column_name)


```

`max` is an aggregation function that returns the maximum value of a column across all rows.

Example:

```

-- return the maximum item cost

max(item_cost)


```

## quantileExactWeighted

Usage:

```

quantileExactWeighted(q)(column_name, weight_column_name)


```

`quantileExactWeighted` is an aggregation function that returns the value at the qth quantile in the named column across all rows in each group or results set. Each row will be weighted by the value in `weight_column_name`. Typically this would be `_sample_interval` (refer to [Sampling](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/#sampling) for more information).

Example:

```

-- estimate the median value of <double1>

quantileExactWeighted(0.5)(double1, _sample_interval)


-- in a table of query times, estimate the 95th centile query time

quantileExactWeighted(0.95)(query_time, _sample_interval)


```

For backwards compatibility, this is also available as `quantileWeighted(q, column_name, weight_column_name)`.

## argMax New

Usage:

```

argMax(arg, val)


```

`argMax` is an aggregation function that returns the `arg` value that corresponds to the maximum value of `val`.

If multiple `arg` values have the maximum value of `val`, any one will be returned.

Example:

```

-- find the <blob1> value for the row with the highest <double1>

argMax(blob1, double1)


-- find the <blob1> value from the most heavily sampled row

argMax(blob1, _sample_interval)


```

## argMin New

Usage:

```

argMin(arg, val)


```

`argMin` is an aggregation function that returns the `arg` value that corresponds to the minimum value of `val`.

If multiple `arg` values have the minimum value of `val`, any one will be returned.

Example:

```

-- find the <blob1> value for the row with the lowest <double1>

argMin(blob1, double1)


-- find the <blob1> value from the least heavily sampled row

argMin(blob1, _sample_interval)


```

## first\_value New

Usage:

```

first_value(column_name)


```

`first_value` is an aggregation function which returns the first value of the provided column.

Example:

```

-- find the oldest value of <blob1>

SELECT first_value(blob1) FROM my_dataset ORDER BY timestamp ASC


```

## last\_value New

Usage:

```

last_value(column_name)


```

`last_value` is an aggregation function which returns the last value of the provided column.

Example:

```

-- find the oldest value of <blob1>

SELECT last_value(blob1) FROM my_dataset ORDER BY timestamp DESC


```

## topK New

Usage:

```

topK(N)(column)


```

`topK` is an aggregation function which returns the most common `N` values of a column.

`N` is optional and defaults to `10`.

Example:

```

-- find the 10 most common values of <double1>

SELECT topK(double1) FROM my_dataset


-- find the 15 most common values of <blob1>

SELECT topK(15)(blob1) FROM my_dataset


```

## topKWeighted New

Usage:

```

topKWeighted(N)(column, weight_column)


```

`topKWeighted` is an aggregation function which returns the most common `N` values of a column, weighted by a second column.

`N` is optional and defaults to `10`.

Example:

```

-- find the 10 most common values of <double1>, weighted by `_sample_interval`

SELECT topKWeighted(double1, _sample_interval) FROM my_dataset


-- find the 15 most common values of <blob1>, weighted by `_sample_interval`

SELECT topKWeighted(15)(blob1, _sample_interval) FROM my_dataset


```

## countIf New

Usage:

```

countIf(<expr>)


```

`countIf` is an aggregation function that returns the number of rows in the results set, but only counting rows where a provided expression evaluates to true.

Example:

```

-- return the number of rows where `double1` is greater than 5

countIf(double1 > 5)


```

## sumIf New

Usage:

```

sumIf(<expr>, <expr>)


```

`sumIf` is an aggregation function that returns the sum of a first expression across all rows in the results set, but only including rows where a second expression evaluates to true.

Example:

```

-- return the sum of column `item_cost` of all items where another column `in_stock` is not zero

sumIf(item_cost, in_stock > 0)


```

## avgIf New

Usage:

```

avgIf(<expr>, <expr>)


```

`avgIf` is an aggregation function that returns the mean of an expression across all rows in the results set, but only including rows where a second expression evaluates to true.

Example:

```

-- return the mean of column `item_cost` where another column `in_stock` is not zero

avgIf(item_cost, in_stock > 0)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/aggregate-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"SQL aggregate functions for Analytics Engine queries.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/aggregate-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/aggregate-functions/","name":"Aggregate functions"}}]}
```
