---
title: Querying basics
description: Learn the basics of querying with Cloudflare's GraphQL API. Understand query structure, schema, and how to fetch data using GraphQL queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying basics

## Structure of a GraphQL query

GraphQL structures data as a graph. GraphQL uses a schema to define the objects and their hierarchy in your data graph. You can explore the edges of the graph by using queries to get the needed data. These queries must respect the structure of the schema.

A **node**, followed by its **fields**, is at the core of a GraphQL query. A node is an object of a specific **type**; the type specifies the fields that make up the object.

A field can be another node where the appropriate query would contain nested elements. Some nodes look like functions that can take on arguments to limit the scope of what they can act on. You can apply filters at each node.

## Cloudflare GraphQL schema

A typical query against the Cloudflare GraphQL schema is made up of four main components:

* `viewer` \- is the root node,
* `zones` or `accounts` \- indicate the scope of the query, that is the domain area or account you want to query. The `viewer` can access one `zones` or`accounts`, or both,
* **data node** or **dataset** \- represent the data you want to query. `zones`or `accounts` may contain one or more datasets. To find out more about discovering nodes, please refer to [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/),
* **fieldset** \- a set of fields or nested fields of the **dataset**.

The query to Cloudflare GraphQL API must be sent over HTTP POST request with payload in JSON format that consists of these fields:

```

{

  "query": "",

  "variables": {}

}


```

From the above structure, the `query` field must contain a GraphQL query formatted as a **single line** string (meaning all newline symbols should be stripped / escaped), when `variables` is an object that contains all values of used placeholders in the query itself.

## A single dataset example

In the following example, the GraphQL query fetches a `datetime`, `action`, and client request HTTP host as `host` field of 2 WAF events from zone-scoped`firewallEventsAdaptive` dataset.

A GraphQL query

```

query ASingleDatasetExample($zoneTag: string, $start: Time, $end: Time) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      firewallEventsAdaptive(

        filter: { datetime_gt: $start, datetime_lt: $end }

        limit: 2

        orderBy: [datetime_DESC]

      ) {

        action

        datetime

        host: clientRequestHTTPHost

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAggZQJYDsDmAbMARAhgF1wGcx8BRAD1wFsAHLACgBIAvAexTABVc0AuGEXwRUaADQwmQ3BHwCuSamAlMwKACbzFYAJQwA3gCgYMAG5IwAd0gHjJmO05EGAMyQZ8kAfocduvAVY-HjQYAF89I3t7NwgrXAwMMlM1fCI4dVxafCQUhjtokzcPLwMYTM8cpQB9NDlJaVkJCtJtao9AtXVwgsKMRSR6gCZe6LYIdUgAISgBAG0WqrBq7DIEAGEAXVGYSJ2TXABjHI598oJWpTOACzYhAUP+1IAlMFAwIQAJLi4ABU+7vgdmFeiCTCCwkA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOxx+ADlRiJATgwUQMKABNm7LrwGi4bNhPH8ZIAL5A)

In the query above, we have variable placeholders: $zoneTag, $start, and $end. We provide values for those placeholders alongside the query by placing them into`variables` field of the payload. Note that the examples below use the UTC timezone, indicated by the letter "Z".

A set of variables

```

{

  "zoneTag": "<zone-tag>",

  "start": "2020-08-03T02:07:05Z",

  "end": "2020-08-03T17:07:05Z"

}


```

There are multiple ways to send your query to Cloudflare GraphQL API. You can use you favourite GraphQL client or CLI to send a request via curl. We have a[how-to guide](https://developers.cloudflare.com/analytics/graphql-api/getting-started/compose-graphql-query/) about using GraphiQL client, also check a guide on how to execute a query with a curl [here](https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/).

A sample of a response for a query above

```

{

  "data": {

    "viewer": {

      "zones": [

        {

          "firewallEventsAdaptive": [

            {

              "action": "log",

              "host": "cloudflare.guru",

              "datetime": "2020-08-03T17:07:03Z"

            },

            {

              "action": "log",

              "host": "cloudflare.guru",

              "datetime": "2020-08-03T17:07:01Z"

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

## Query multiple datasets in a single GraphQL API request

As previously mentioned, a query might contain one or multiple nodes (datasets). At the API level, the data extraction would be done simultaneously, but the response would be delayed until all dataset queries got their results. If any fails during the execution, the entire query will be terminated, and the error will be returned.

A sample query for two datasets in a one go

```

query MultipleDatasetsExample(

  $zoneTag: string

  $start: Time

  $end: Time

  $ts: Date

) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      last10Events: firewallEventsAdaptive(

        filter: { datetime_gt: $start, datetime_lt: $end }

        limit: 10

        orderBy: [datetime_DESC]

      ) {

        action

        datetime

        host: clientRequestHTTPHost

      }

      top3DeviceTypes: httpRequestsAdaptiveGroups(

        filter: { date: $ts }

        limit: 10

        orderBy: [count_DESC]

      ) {

        count

        dimensions {

          device: clientDeviceType

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsiANgFwJYAdFgCIENm4DOYyhAogB64C2mYAFAFAwwAkAXgPYB2YAKrgDmALhiFkEVN0HM243BGSi+qamFmsw3ACbLV6lq1Ki8ydQEoYAb1kA3VGADuka7JZdehegDNUKSKJWMB78QqIcPKGCMAC+ljYsiTCIRMgAjAAMZLZaxjC+EE64iIjZuYQAgtq46Gg5TElJvv4QgTDVZmhqAPqCSnIEigA07fgk+t0o4VrasW6NiKqo-ZnzSZwQ2pAAQlCiANod4z3YZADKAMIAumsw8bcsuADGaDwPo5367wAWnOKiT0WuQASmBQGBxAAJPh8AAKkL+yFuMVuyE46AAzNgwPYnvwoOgIaJvshkOhQeDxJVqrVUDkAOIQTggdBed7NMytawfMDhUhzRqJRbUZaiVaClgbLYQXYHJ7M7jIbqnS43QX3CUweUgRXvbT6biEVA8QiuTUsLa43laoGK7FWvgEgwSlGC12Jd0omJAA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOxx+ADlRiJATgwUQMKABNm7LrwGi4bNhPH8ZcmlRUcefbmJABfIA)

A set of variables for the query above

```

{

  "zoneTag": "<zone-tag>",

  "start": "2022-10-02T00:26:49Z",

  "end": "2022-10-04T14:26:49Z",

  "ts": "2022-10-04"

}


```

A sample response for the query with variables above

```

{

  "data": {

    "viewer": {

      "zones": [

        {

          "last10Events": [

            {

              "action": "block",

              "country": "TR",

              "datetime": "2022-10-04T08:41:09Z"

            },

            {

              "action": "block",

              "country": "TR",

              "datetime": "2022-10-04T08:41:09Z"

            },

            {

              "action": "block",

              "country": "RU",

              "datetime": "2022-10-04T01:09:36Z"

            },

            {

              "action": "block",

              "country": "US",

              "datetime": "2022-10-03T14:26:49Z"

            },

            {

              "action": "block",

              "country": "US",

              "datetime": "2022-10-03T14:26:46Z"

            },

            {

              "action": "block",

              "country": "CN",

              "datetime": "2022-10-02T23:51:26Z"

            },

            {

              "action": "block",

              "country": "TR",

              "datetime": "2022-10-02T23:39:41Z"

            },

            {

              "action": "block",

              "country": "TR",

              "datetime": "2022-10-02T23:39:41Z"

            }

          ],

          "top3DeviceTypes": [

            {

              "count": 4580,

              "dimensions": {

                "device": "desktop"

              }

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

## Helpful Resources

Here are some helpful articles about working with the Cloudflare Analytics API and GraphQL.

### Cloudflare specific

* [How to find your zoneTag using the API](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)

### General info on the GraphQL framework

* [How to use GraphQL (tutorials) ↗](https://www.howtographql.com/)
* [Thinking in Graphs ↗](https://graphql.org/learn/thinking-in-graphs/)
* [What data can you can query in the GraphQL type system (schemas) ↗](https://graphql.org/learn/schema/)
* [How to pass variables in GraphiQL (Medium article with quick tips) ↗](https://medium.com/graphql-mastery/graphql-quick-tip-how-to-pass-variables-into-a-mutation-in-graphiql-23ecff4add57)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/#page","headline":"Querying basics · Cloudflare Analytics docs","description":"Learn the basics of querying with Cloudflare's GraphQL API. Understand query structure, schema, and how to fetch data using GraphQL queries.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/getting-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/getting-started/querying-basics/","name":"Querying basics"}}]}
```
