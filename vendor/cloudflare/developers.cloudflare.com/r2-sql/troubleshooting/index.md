---
title: Troubleshooting guide
description: Troubleshoot common R2 SQL errors including query structure, type, and timeout issues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting guide

This guide covers potential errors and limitations you may encounter when using R2 SQL. R2 SQL is in open beta, and supported functionality will evolve and change over time.

## Query structure errors

### Missing required clauses

**Error**: `expected exactly 1 table in FROM clause`

**Problem**: R2 SQL requires a `FROM` clause in your query.

```

-- Invalid - Missing FROM clause

SELECT user_id WHERE status = 200;


-- Valid

SELECT user_id

FROM my_namespace.http_requests

WHERE status = 200 AND timestamp BETWEEN '2025-09-24T01:00:00Z' AND '2025-09-25T01:00:00Z';


```

**Solution**: Always include `FROM` with a fully qualified table name (`namespace_name.table_name`).

---

## FROM clause issues

### Join performance issues

**Symptom**: Query returns 502 Bad Gateway or times out.

**Problem**: Multi-way joins across large tables can exceed resource limits, especially with `COUNT(DISTINCT)` or other memory-intensive aggregations.

```

-- May timeout: cross-joining two large fact tables

SELECT COUNT(DISTINCT h.ray_id), COUNT(DISTINCT f.event_id)

FROM my_namespace.http_requests h

INNER JOIN my_namespace.firewall_events f ON h.zone_id = f.zone_id


```

**Solution**:

* Add `WHERE` filters to reduce intermediate result sizes.
* Join through dimension tables instead of directly joining fact tables.
* Use `approx_distinct()` instead of `COUNT(DISTINCT)` for approximate counts.
* Break complex multi-way joins into smaller queries using CTEs or sequential queries.

```

-- Better: filter both sides and use approx_distinct

SELECT z.plan,

       approx_distinct(h.ray_id) AS unique_requests

FROM my_namespace.zones z

INNER JOIN my_namespace.http_requests h ON z.zone_id = h.zone_id

WHERE z.plan = 'enterprise'

  AND h.status_code >= 400

GROUP BY z.plan


```

### `NOT IN` on nullable columns

**Symptom**: `NOT IN` subquery returns unexpected results or errors.

**Problem**: `NOT IN` subqueries are not supported when the subquery column can contain `NULL` values.

```

-- Fails: nullable_col may contain NULLs

SELECT zone_id

FROM my_namespace.http_requests

WHERE zone_id NOT IN (

    SELECT nullable_col FROM my_namespace.other_table

)

LIMIT 20


```

**Solution**: Use `NOT EXISTS` with a correlated subquery instead.

```

-- Works: NOT EXISTS handles NULLs correctly

SELECT h.zone_id

FROM my_namespace.http_requests h

WHERE NOT EXISTS (

    SELECT 1 FROM my_namespace.other_table o

    WHERE o.nullable_col = h.zone_id

)

LIMIT 20


```

### Correlated subquery performance

**Symptom**: `EXISTS` or `NOT EXISTS` subquery runs slowly.

**Problem**: Correlated subqueries with complex conditions can be slow because the inner query is evaluated for each row of the outer query.

```

-- Slower: multiple filter conditions in correlated subquery

SELECT z.domain

FROM my_namespace.zones z

WHERE EXISTS (

    SELECT 1 FROM my_namespace.firewall_events f

    WHERE f.zone_id = z.zone_id

      AND f.risk_score > 0.9

      AND f.colo = 'SJC'

)

LIMIT 20


```

**Solution**:

* Simplify correlated conditions where possible.
* Consider rewriting as a `JOIN` with `GROUP BY` instead of `EXISTS`.
* Use an `IN` subquery with pre-aggregated results instead of `EXISTS`.

---

## WHERE clause issues

### JSON object filtering

**Error**: `unsupported binary operator` or `Error during planning: could not parse compound`

**Problem**: JSON functions are not yet implemented. You cannot filter on fields inside JSON objects using JSON path operators.

```

-- Invalid - JSON path operators not supported

SELECT * FROM my_namespace.requests WHERE json_data->>'level' = 'error'


-- Valid - Filter on the entire JSON column

SELECT * FROM my_namespace.logs WHERE json_data IS NOT NULL LIMIT 100


```

**Solution**:

* Denormalize frequently queried JSON fields into separate columns.
* Filter on the entire JSON field, and handle parsing in your application.

Note

Struct columns are supported and can be filtered using bracket notation. Refer to [Complex types](https://developers.cloudflare.com/r2-sql/sql-reference/complex-types/) for details.

```

SELECT * FROM my_namespace.products WHERE pricing['price'] > 50 LIMIT 100


```

---

## LIMIT clause issues

### Invalid limit values

**Error**: `maximum LIMIT is 10000`

**Problem**: LIMIT values must be between 1 and 10,000.

```

-- Invalid - Out of range

SELECT * FROM my_namespace.events LIMIT 50000


-- Valid

SELECT * FROM my_namespace.events LIMIT 10000


```

**Solution**: Use LIMIT values between 1 and 10,000.

### Pagination attempts

**Error**: `unsupported feature: OFFSET clause is not supported`

**Problem**: OFFSET is not supported.

```

-- Invalid - Pagination not supported

SELECT * FROM my_namespace.events LIMIT 100 OFFSET 200


-- Valid - Use cursor-based pagination with ORDER BY and WHERE

-- Page 1

SELECT * FROM my_namespace.events

WHERE timestamp >= '2024-01-01'

ORDER BY timestamp

LIMIT 100


-- Page 2 - Use the last timestamp from the previous page

SELECT * FROM my_namespace.events

WHERE timestamp > '2024-01-01T10:30:00Z'

ORDER BY timestamp

LIMIT 100


```

**Solution**: Implement cursor-based pagination using `ORDER BY` and `WHERE` conditions.

---

## Schema issues

### DDL and DML operations

**Error**: `only read-only queries are allowed`

**Problem**: R2 SQL is a read-only query engine. DDL and DML statements are not supported.

```

-- Invalid - Schema changes not supported

ALTER TABLE my_namespace.events ADD COLUMN new_field STRING

UPDATE my_namespace.events SET status = 200 WHERE user_id = '123'

CREATE TABLE my_namespace.test (id INT)

DROP TABLE my_namespace.events


```

**Solution**: Manage your schema through your data ingestion pipeline and R2 Data Catalog.

---

## Performance optimization

### Query performance issues

If your queries are running slowly:

1. **Always include partition (timestamp) filters**: This is the most important optimization.  
```  
-- Good - Narrows data scan to one day  
SELECT * FROM my_namespace.events  
WHERE timestamp BETWEEN '2024-01-01' AND '2024-01-02'  
LIMIT 100  
```
2. **Use selective filtering**: Include specific conditions to reduce result sets.  
```  
-- Good - Multiple filters reduce scanned data  
SELECT * FROM my_namespace.events  
WHERE status = 200 AND region = 'US' AND timestamp > '2024-01-01'  
LIMIT 100  
```
3. **Select specific columns**: Avoid `SELECT *` when you only need a few fields.  
```  
-- Good - Only reads the columns you need  
SELECT user_id, status, timestamp  
FROM my_namespace.events  
WHERE timestamp > '2024-01-01'  
LIMIT 100  
```
4. **Use EXPLAIN to inspect the execution plan**: Verify that predicate pushdown and file pruning are working.  
```  
EXPLAIN SELECT user_id, status  
FROM my_namespace.events  
WHERE timestamp > '2024-01-01' AND status = 200  
```
5. **Enable compaction**: Enable compaction in R2 Data Catalog to reduce the number of small files scanned per query.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-sql/troubleshooting/#page","headline":"Troubleshooting guide · R2 SQL docs","description":"Troubleshoot common R2 SQL errors including query structure, type, and timeout issues.","url":"https://developers.cloudflare.com/r2-sql/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2-sql/","name":"R2 SQL"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2-sql/troubleshooting/","name":"Troubleshooting guide"}}]}
```
