---
title: Statements
description: SQL statements supported by Analytics Engine.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Statements

## SHOW TABLES statement

`SHOW TABLES` can be used to list the tables on your account. The table name is the name you specified as `dataset` when configuring the workers binding (refer to [Get started with Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/get-started/), for more information). The table is automatically created when you write event data in your worker.

```

SHOW TABLES

[FORMAT <format>]


```

Refer to [FORMAT clause](#format-clause) for the available `FORMAT` options.

## SHOW TIMEZONES statement

`SHOW TIMEZONES` can be used to list all of the timezones supported by the SQL API. Most common timezones are supported.

```

SHOW TIMEZONES

[FORMAT <format>]


```

## SHOW TIMEZONE statement

`SHOW TIMEZONE` responds with the current default timezone in use by SQL API. This should always be `Etc/UTC`.

```

SHOW TIMEZONE

[FORMAT <format>]


```

## SELECT statement

`SELECT` is used to query tables.

Usage:

```

SELECT <expression_list>

[FROM <table>|(<subquery>)]

[WHERE <expression>]

[GROUP BY <expression>, ...]

[HAVING <expression>]

[ORDER BY <expression_list>]

[LIMIT <n>|ALL]

[FORMAT <format>]


```

Below you can find the syntax of each clause. Refer to the [SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/) documentation for some example queries.

### SELECT clause

The `SELECT` clause specifies the list of columns to be included in the result. Columns can be aliased using the `AS` keyword.

Usage:

```

SELECT <expression> [AS <alias>], ...


```

Examples:

```

-- return the named columns

SELECT blob2, double3


-- return all columns

SELECT *


-- alias columns to more descriptive names

SELECT

    blob2 AS probe_name,

    double3 AS temperature


```

Additionally, expressions using supported functions and [operators](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/operators/) can be used in place of column names:

```

SELECT

    blob2 AS probe_name,

    double3 AS temp_c,

    double3*1.8+32 AS temp_f -- compute a value


SELECT

    blob2 AS probe_name,

    if(double3 <= 0, 'FREEZING', 'NOT FREEZING') AS description -- use of functions


SELECT

    blob2 AS probe_name,

    avg(double3) AS avg_temp -- aggregation function


```

### FROM clause

`FROM` is used to specify the source of the data for the query.

Usage:

```

FROM <table_name>|(subquery)


```

Examples:

```

-- query data written to a workers dataset called "temperatures"

FROM temperatures


-- use a subquery to manipulate the table

FROM (

    SELECT

        blob1 AS probe_name,

        count() as num_readings

    FROM

        temperatures

    GROUP BY

        probe_name

)


```

Note that queries can only operate on a single table. `UNION`, `JOIN` etc. are not currently supported.

### WHERE clause

`WHERE` is used to filter the rows returned by a query before grouping and aggregation.

Usage:

```

WHERE <condition>


```

`<condition>` can be any expression that evaluates to a boolean.

[Comparison operators](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/operators/#comparison-operators) can be used to compare values and [boolean operators](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/operators/#boolean-operators) can be used to combine conditions.

Expressions containing functions and [operators](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/operators/) are supported.

To filter results after grouping and aggregation, use the [HAVING clause](#having-clause) instead.

Examples:

```

-- simple comparisons

WHERE blob1 = 'test'

WHERE double1 = 4


-- inequalities

WHERE double1 > 4


-- use of operators (see below for supported operator list)

WHERE double1 + double2 > 4

WHERE blob1 = 'test1' OR blob2 = 'test2'


-- expression using inequalities, functions and operators

WHERE if(unit = 'f', (temp-32)/1.8, temp) <= 0


```

### GROUP BY clause

When using aggregate functions, `GROUP BY` specifies the groups over which the aggregation is run.

Usage:

```

GROUP BY <expression>, ...


```

For example, if you had a table of temperature readings:

```

-- return the average temperature for each probe

SELECT

    blob1 AS probe_name,

    avg(double1) AS average_temp

FROM temperature_readings

GROUP BY probe_name


```

In the usual case the `<expression>` can just be a column name but it is also possible to supply a complex expression here. Multiple expressions or column names can be supplied separated by commas.

### HAVING clause New

`HAVING` is used to filter the results after grouping and aggregation.

Usage:

```

HAVING <condition>


```

`<condition>` can be any expression that evaluates to a boolean, and can reference aggregate functions or grouped columns.

Unlike `WHERE`, which filters rows before grouping, `HAVING` filters groups after aggregation. This allows you to filter based on aggregate values.

[Comparison operators](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/operators/#comparison-operators) can be used to compare values and [boolean operators](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/operators/#boolean-operators) can be used to combine conditions.

Examples:

```

-- filter groups where the average is greater than 10

SELECT

    blob1 AS probe_name,

    avg(double1) AS average_temp

FROM temperature_readings

GROUP BY probe_name

HAVING average_temp > 10


-- filter groups with more than 100 readings

SELECT

    blob1 AS probe_name,

    count() AS num_readings

FROM temperature_readings

GROUP BY probe_name

HAVING num_readings > 100


-- combine multiple conditions

SELECT

    blob1 AS city,

    avg(double1) AS avg_temp,

    count() AS readings

FROM weather_data

GROUP BY city

HAVING avg_temp > 20 AND readings >= 50


```

### ORDER BY clause

`ORDER BY` can be used to control the order in which rows are returned.

Usage:

```

ORDER BY <expression> [ASC|DESC], ...


```

`<expression>` can just be a column name.

`ASC` or `DESC` determines if the ordering is ascending or descending. `ASC` is the default, and can be omitted.

Examples:

```

-- order by double2 then double3, both in ascending order

ORDER BY double2, double3


-- order by double2 in ascending order then double3 is descending order

ORDER BY double2, double3 DESC


```

### LIMIT clause

`LIMIT` specifies a maximum number of rows to return.

Usage:

```

LIMIT <n>|ALL


```

Supply the maximum number of rows to return or `ALL` for no restriction.

For example:

```

LIMIT 10 -- return at most 10 rows


```

### OFFSET clause

`OFFSET` specifies a number of rows to skip in the query result.

Usage:

```

OFFSET <n>


```

For example:

```

OFFSET 10 -- skip the first 10 result rows


```

### FORMAT clause

`FORMAT` controls how to the returned data is encoded.

Usage:

```

FORMAT [JSON|JSONEachRow|TabSeparated]


```

If no format clause is included then the default format of `JSON` will be used.

Override the default by setting a format. For example:

```

FORMAT JSONEachRow


```

The following formats are supported:

#### JSON

Data is returned as a single JSON object with schema data included:

```

{

    "meta": [

        {

            "name": "<column 1 name>",

            "type": "<column 1 type>"

        },

        {

            "name": "<column 2 name>",

            "type": "<column 2 type>"

        },

        ...

    ],

    "data": [

        {

            "<column 1 name>": "<column 1 value>",

            "<column 2 name>": "<column 2 value>",

            ...

        },

        {

            "<column 1 name>": "<column 1 value>",

            "<column 2 name>": "<column 2 value>",

            ...

        },

        ...

    ],

    "rows": 10

}


```

#### JSONEachRow

Data is returned with a separate JSON object per row. Rows are newline separated and there is no header line or schema data:

```

{"<column 1 name>": "<column 1 value>", "<column 2 name>": "<column 2 value>"}

{"<column 1 name>": "<column 1 value>", "<column 2 name>": "<column 2 value>"}

...


```

#### TabSeparated

Data is returned with newline separated rows. Columns are separated with tabs. There is no header.

```

column 1 value  column 2 value

column 1 value  column 2 value

...


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/statements/#page","headline":"Workers Analytics Engine SQL Reference · Cloudflare Analytics docs","description":"SQL statements supported by Analytics Engine.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/statements/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/statements/","name":"Statements"}}]}
```
