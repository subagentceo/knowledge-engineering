---
title: Filtering
description: Apply filters to GraphQL Analytics API queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Filtering

Filters constrain queries to a particular account or set of zones, requests by date, or those from a specific user agent, for example. Without filters, queries can suffer performance degradation, results can exceed supported bounds, and the data returned can be noisy.

## Filter Structure

The GraphQL filter is represented by the [GraphQL Input Object ↗](https://graphql.github.io/graphql-spec/June2018/#sec-Input-Objects), which exposes Boolean algebra on nodes.

You can use filters as an argument on the following resources:

* zones
* accounts
* tables (datasets)

### Zone filter

Allows querying zone-related data by zone ID (`zoneTag`).

```

zones(filter: {zoneTag: "your Zone ID"}) {

    ...

}


```

The zone filter must conform to the following grammar:

```

filter

    { zoneTag: t }

    { zoneTag_gt: t }

    { zoneTag_in: [t, ...] }


```

Compound filters (comma-separated, `AND`, `OR`) are not supported.

Use the `zoneTag: t` and `zoneTag_in: [t, ...]` forms when you know the zone IDs. Use the `zoneTag_gt: t` form with limits to traverse all zones if the zone IDs are not known. Zones always sort alphanumerically.

Omit the filter to get results for all zones (up to the supported limit).

### Account filter

The account filter uses the same structure and rules as the zone filter, except that it uses the Account ID (`accountTag`) instead of the Zone ID (`zoneTag`).

You must specify an account filter when making an account-scoped query, and you cannot query multiple accounts simultaneously.

Note

Network Analytics queries require an Account ID (`accountTag`) filter.

### Table (dataset) filter

Table filters require that you query at least one node. Use the `AND` operator to create and combine multi-node filters. Table filters also support the `OR` operator, which you must specify explicitly.

The following grammar describes the table filter, where `k` is the GraphQL node on which to filter and `op` is one of the supported operators for that node:

```

filter

  { kvs }

kvs

  kv

  kv, kvs

kv

  k: v

  k_op: v

  AND: [filters]

  OR: [filters]

filters

  filter

  filter, filters


```

### Operators

Operator support varies, depending on the node type and node name.

#### Array operators

The following operators are supported for all array types:

| Operator | Comparison                                      |
| -------- | ----------------------------------------------- |
| has      | array contains a value                          |
| hasall   | array contains all of a list of values          |
| hasany   | array contains at least one of a list of values |

#### Scalar operators

The following operators are supported for all scalar types:

| Operator | Comparison          |
| -------- | ------------------- |
| gt       | greater than        |
| lt       | less than           |
| geq      | greater or equal to |
| leq      | less or equal to    |
| neq      | not equal           |
| in       | in                  |

#### String operators

The `like` operator is available for string comparisons and supports the `%` character as a wildcard.

## Examples

Note

Filtering times are based on event start timestamps, which means requests that end after the filter may be included in queries (as long as they start within the given time).

### General example

```

query GeneralExample($zoneTag: string, $start: Time) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      httpRequestsAdaptiveGroups(

        filter: { datetime_gt: $start, clientCountryName: "GB" }

        limit: 1

      ) {

        count

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mAdpAhgGwKIA8UFsAOaYAFACQBeA9sgCooDmAXDAM4AuEAlovQDQyl2KCG2Y1OuMAEoYAbwBQMGADdOYAO6Q5ipTCrIWxAGac0bSM1l7qYOkwH7bDGAF8ZC3boAWbNvgBKYKBg7CwAggAmKPhsnMpgcBCUIPiGOp5KJmYWcjBR5rGSAPr0ogJCIvwAxmhqiGwAwsn10AByeGDMAERwAEJdrukZtbicZQCMQ0ruU7pVzWyzLkPLSssuQA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOxx+ADlRiJATgwgAvkA)

### Filter on a specific node

The following GraphQL example shows how to filter a specific node. The SQL equivalent follows.

#### GraphQL

```

httpRequestsAdaptiveGroups(filter: {datetime: "2018-01-01T10:00:00Z"}) {

    ...

}


```

#### SQL

```

WHERE datetime="2018-01-01T10:00:00Z"


```

### Filter on multiple fields

The following GraphQL example shows how to apply a filter to multiple fields, in this case two datetime fields. The SQL equivalent follows.

#### GraphQL

```

httpRequests1hGroups(filter: {datetime_gt: "2018-01-01T10:00:00Z", datetime_lt: "2018-01-01T11:00:00Z"}) {

    ...

}


```

#### SQL

```

WHERE (datetime > "2018-01-01T10:00:00Z") AND (datetime < "2018-01-01T10:00:00Z")


```

### Filter using the `OR` operator

The following GraphQL example demonstrates using the `OR` operator in a filter. This `OR` operator filters for the value `US` or `GB` in the `clientCountryName` field.

#### GraphQL

```

httpRequestsAdaptiveGroups(

        filter: {

          datetime: "2018-01-01T10:00:00Z",

          OR:[{clientCountryName: "US"}, {clientCountryName: "GB"}]) {

    ...

}


```

#### SQL

```

WHERE datetime="2018-01-01T10:00:00Z"

  AND ((clientCountryName = "US") OR (clientCountryName = "GB"))


```

### Filter an array by one value

The following GraphQL examples show how to filter an array field to only return data that includes a specific value. The SQL equivalent follows.

#### GraphQL

```

mnmFlowDataAdaptiveGroups(filter: {ruleIDs_has: "rule-id"}) {

    ...

}


```

#### SQL

```

WHERE has(ruleIDs, 'rule-id')


```

### Filter an array by multiple values

The following GraphQL examples show how to filter an array field to only return data that includes several values. The SQL equivalent follows.

#### GraphQL

```

mnmFlowDataAdaptiveGroups(filter: {ruleIDs_hasall: ["rule-id-1", "rule-id-2"]}) {

    ...

}


```

#### SQL

```

WHERE has(ruleIDs, 'rule-id-1') AND has(ruleIDs, 'rule-id-2')


```

### Filter end users

Add the `requestSource` filter for `eyeball` to return request, data transfer, and visit data about only the end users of your website. This will exclude actions taken by Cloudflare products (for example, cache purge, healthchecks, Workers subrequests) on your zone.

## Subqueries (advanced filters)

Subqueries are not currently supported. You can use two GraphQL queries as a workaround for this limitation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/filtering/#page","headline":"Filtering · Cloudflare Analytics docs","description":"Apply filters to GraphQL Analytics API queries.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/filtering/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/features/","name":"Features"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/features/filtering/","name":"Filtering"}}]}
```
