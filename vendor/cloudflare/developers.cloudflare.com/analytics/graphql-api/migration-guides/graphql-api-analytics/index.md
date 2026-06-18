---
title: HTTP Requests by Colo Groups to HTTP Requests by Adaptive Groups
description: Migrate colo groups queries to adaptive groups.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP Requests by Colo Groups to HTTP Requests by Adaptive Groups

This guide shares considerations when migrating from the deprecated `httpRequests1mByColoGroups` and `httpRequests1dByColoGroups` GraphQL API nodes to the `httpRequestsAdaptiveGroups` GraphQL API node.

For example, if you wanted to see which five data centers had the most number of requests, the total number of those requests, and the total amount of data transfer, in the past you used the `httpRequests1mByColoGroups` GraphQL API node as in the following example:

```

{

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      series: httpRequests1mByColoGroups(

        limit: 5

        orderBy: [sum_requests_DESC]

        filter: { datetime_geq: $start, datetime_lt: $end }

      ) {

        sum {

          requests

          bytes

        }

        dimensions {

          coloCode

        }

      }

    }

  }

}


```

Response

```

{

  "data": {

    "viewer": {

      "zones": [

        {

          "series": [

            {

              "dimensions": {

                "coloCode": "LHR"

              },

              "sum": {

                "bytes": 18260055,

                "requests": 4404

              }

            },

            {

              "dimensions": {

                "coloCode": "AMS"

              },

              "sum": {

                "bytes": 17563009,

                "requests": 4302

              }

            },

            {

              "dimensions": {

                "coloCode": "CDG"

              },

              "sum": {

                "bytes": 17200434,

                "requests": 4032

              }

            },

            {

              "dimensions": {

                "coloCode": "PTY"

              },

              "sum": {

                "bytes": 10400209,

                "requests": 2707

              }

            },

            {

              "dimensions": {

                "coloCode": "JIB"

              },

              "sum": {

                "bytes": 9040105,

                "requests": 2601

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

## `httpRequestsAdaptiveGroups` GraphQL API node

With the deprecation of the `httpRequests1mByColoGroups` and `httpRequests1dByColoGroups` GraphQL API nodes, use the `httpRequestsAdaptiveGroups` GraphQL API node to access the same data (`count`, `sum(edgeResponseBytes)`, and `visits`).

**Request**

```

query MigrationSample($zoneTag: string, $start: Time, $end: Time) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      series: httpRequestsAdaptiveGroups(

        limit: 5

        orderBy: [count_DESC]

        filter: {

          datetime_geq: $start

          datetime_lt: $end

          requestSource: "eyeball"

        }

      ) {

        count

        avg {

          sampleInterval

        }

        sum {

          visits

          edgeResponseBytes

        }

        dimensions {

          coloCode

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsgSwOYQIYBcEHsB2BlVAWwAcAbMACgBIAvXMAFVSQC4YBndCBHJAGhhVOqCOjYMEhMAKpgcAE3GSwAShgBvAFAwYANwRgA7pA3adMOjjDsKAMwSl0kNuov0mrQZcbMYAXzUtc3N2SAN2NgALdHRiACUwUGt0dgBBeVRiTF0wAHEILBBiGzNgnVJJBDEYAFZSsqwIeUgAISg2AG0AY0KcdAB9ABEAUTwAYQBdeuD7R2dTMrKMp0wpfqREtiF0EXRppYwwVbB+xy25eX3giETwTjxCiC6wNgAiMCgwACNUUlJXq7+faBQE9EB9QGoXRIBaLEJEMhgACSfUgul+gL8gPYIEIsLhegQ7Cq7EBOjA8g2CXYxFwoTaTlJBKxBPkyhwxLp+LhPVIWDGWGamP2LPMoqxfiAA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOxx+ADlRiJATgwUQMKABNm7LrwGi4bNhPH8ZIAL5A)

Response

```

{

  "data": {

    "viewer": {

      "zones": [

        {

          "series": [

            {

              "avg": {

                "sampleInterval": 10

              },

              "count": 4350,

              "dimensions": {

                "coloCode": "LHR"

              },

              "sum": {

                "edgeResponseBytes": 17860000,

                "visits": 4120

              }

            },

            {

              "avg": {

                "sampleInterval": 10

              },

              "count": 4210,

              "dimensions": {

                "coloCode": "AMS"

              },

              "sum": {

                "edgeResponseBytes": 17110000,

                "visits": 3910

              }

            },

            {

              "avg": {

                "sampleInterval": 10

              },

              "count": 3890,

              "dimensions": {

                "coloCode": "CDG"

              },

              "sum": {

                "edgeResponseBytes": 17050000,

                "visits": 3700

              }

            },

            {

              "avg": {

                "sampleInterval": 10

              },

              "count": 2550,

              "dimensions": {

                "coloCode": "PTY"

              },

              "sum": {

                "edgeResponseBytes": 10286000,

                "visits": 2130

              }

            },

            {

              "avg": {

                "sampleInterval": 10

              },

              "count": 2410,

              "dimensions": {

                "coloCode": "JIB"

              },

              "sum": {

                "edgeResponseBytes": 9029000,

                "visits": 2080

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

This query says:

* Given the indicated `zones`, `limit`, and `time range`.
* Fetch the total number of requests (as `count`), the total amount of data transfer (as `edgeResponseBytes` of `sum` object), and the total number of `visits` per data center.

A few points to note:

* Adding the `requestSource` filter for `eyeball` returns request, data transfer, and visit data about only the end users of your website.
* Instead of `requests`, the `httpRequestsAdaptiveGroups` node reports `count`, which indicates the number of requests per data center.
* To measure data transfer, use `sum(edgeResponseBytes)`. Note that in the old API this was called `bandwidth` even though it actually measured data transfer.
* `unique visitors per colocation` is not supported in `httpRequestsAdaptiveGroups`, but the `httpRequestsAdaptiveGroups` API does support `visits`. A visit is defined as a page view that originated from a different website or direct link. Cloudflare checks where the HTTP referer does not match the hostname. One visit can consist of multiple page views.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/graphql-api-analytics/#page","headline":"HTTP Requests by Colo Groups to HTTP Requests by Adaptive Groups · Cloudflare Analytics docs","description":"Migrate colo groups queries to adaptive groups.","url":"https://developers.cloudflare.com/analytics/graphql-api/migration-guides/graphql-api-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/migration-guides/graphql-api-analytics/","name":"HTTP Requests by Colo Groups to HTTP Requests by Adaptive Groups"}}]}
```
