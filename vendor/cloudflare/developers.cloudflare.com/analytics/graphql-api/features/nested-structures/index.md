---
title: Nested Structures
description: Query arrays and maps in GraphQL Analytics API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Nested Structures

Two kinds of nested structures that are supported: **arrays** and **maps**. Fields of either of these types are arrays; when they are part of a query result, which is already an array of objects, they become nested arrays.

## Arrays

The GraphQL API supports two different sorts of arrays:

* Some arrays contain scalar types (for example, `[String]`) and function like ordinary fields that [can be filtered](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/)
* Some arrays contain more complex types (for example, `[Subrequest]`.) The following section describes their behaviour.

Arrays of non-scalar types behave as a single value. There is no way to paginate through, filter, filter by, group, or group by the array.

On the other hand, you can choose which fields of the underlying type you want fetched.

For example, given arrays like this:

JavaScript

```

type SubRequest {

    url: String!

    status: Int

}


type Request {

    date: Date!

    datetime: DateTime!

    subRequests: [SubRequest!]!

}


```

You can run a query to get the status by subrequest:

JavaScript

```

{

    requests {

        date

        subRequests {

            # discard the url, only need the status

            status

        }

    }

}


```

The results would be:

JavaScript

```

{

    "requests": [

        {

            "date": "2018-01-01",

            "subRequests": [{"status": 404}, {"status": 200}, {"status": 404}]

        },

        {

            "date": "2018-01-01",

            "subRequests": [{"status": 200}]

        }

    ]

}


```

## Maps

Maps behave like arrays, but can be grouped using the `sum` function. They are used in aggregated datasets, such as `httpRequest1dGroups`.

Example maps:

JavaScript

```

type URLStatsMapElem {

    url: String!

    requests: Int

    bytes: Int

}


type Request {

    date: Date!

    datetime: DateTime!

    urlStatsMap: [URLStatsMapElem!]!

}


```

Query:

JavaScript

```

{

    requests {

        sum {

            urlStatsMap {

                url

                requests

                bytes

            }

        }

        dimensions {

            date

        }

    }

}


```

Response:

JavaScript

```

{

    "requests": [

        {

            "sum": {

                "urlStatsMap": [

                    {

                        "url": "hello-world.org/1",

                        "requests": 123,

                        "bytes": 1024

                    },

                    {

                        "url": "hello-world.org/10",

                        "requests": 1230,

                        "bytes": 10240

                    }

                ]

            }

            "dimensions" {

                "date": "2018-10-19"

            }

        },

        ...

    ]

}


```

## Examples

Query array fields in raw datasets:

```

query NestedFields($zoneTag: string, $start: Time, $end: Time) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      events(limit: 2, filter: { datetime_geq: $start, datetime_leq: $end }) {

        matches {

          ruleId

          action

          source

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAcmAzgFzAEwGIEswBs2IAUAJAF4D2AdmACoCGA5gFwwoRaUMA0MxKdEZCxpYAtmB7EwlNMLFgAlDADeAKBgwAbjgDukFeo0wK1IgDMsuVBBbLjVWoxZkH9BjAC+StUaNhN0shEuGJYQjAATDwWVpC2MGh0qMjyAPoMYMDO-II8iclpuJnO0mie3oa+GqJJAMYAFkgGVVUQIEUAkmiVLTB0tSlUPS2I5CAQtWDDRh7Ts77znqoeQA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOxx+ADlRiJATgwUQMKABNm7LrwGi4bNhPH8ZIAL5A)

Example response:

JavaScript

```

{

  "data": {

    "viewer": {

      "zones": [

        {

          "events": [

            {

              "matches": [

                {

                  "action": "allow",

                  "ruleId": "rule-id-one",

                  "source": "asn"

                },

                {

                  "action": "block",

                  "ruleId": "rule-id-two",

                  "source": "asn"

                }

              ]

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

Query maps fields in aggregated datasets:

```

query MapCapacity(

  $zoneTag: string

  $dateStart: Date

  $dateEnd: Date

  $start: Time

  $end: Time

) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      httpRequests1mGroups(

        limit: 10

        filter: {

          date_geq: $dateStart

          date_leq: $dateEnd

          datetime_geq: $start

          datetime_lt: $end

        }

      ) {

        sum {

          countryMap {

            clientCountryName

            requests

            bytes

            threats

          }

        }

        dimensions {

          datetimeHour

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsgQwA4GFkIMYEsAuUAUAUDDACQBeA9gHZgAqCA5gFwwDOOEW1jxZAJghxgAyjgQQcrACJCwfUoOEBRavxlyFHCVJh0sAW3klSYNa31HCAShgBvPgDcsYAO6R7fElVpt8AMywAG2EIVjsYH3omVgoaaMYYAF9bBxJ0mAALHBwkACUwUDAONgBGAwBxCEoQJD8vDJggw1xWUoAGBozAkMhwrsalMAB9RkLYobEdAYyh4aDxgTlVfhn0oZxDEbHgWO1JNZINrfndUzU1pIHUtbYQA09Gxowa6k4oRCRHp+fmsxwUK93gA5BBWH6NCCFcAlQ7pABGUGEbDhJBwmShQhREJIVwheJ+-C21DYWBobG+EOORgAEjUIJcBgTcXwrkkgA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhABMEAXGAZVoQCda0QAmABk4DYAtN0EBGAOwVqdGHihUOPfkNEAOSQGdmbBb0HCB4uCJWpjpgJwZJMOTqX7jcbt1MmRlkAF8gA)

Example response:

JavaScript

```

{

  "data": {

    "viewer": {

      "zones": [

        {

          "httpRequests1mGroups": [

            {

              "dimensions": {

                "datetime": "2019-03-08T17:00:00Z"

              },

              "sum": {

                "countryMap": [

                  {

                    "bytes": 51911317,

                    "clientCountryName": "XK",

                    "requests": 4492,

                    "threats": 0

                  },

                  {

                    "bytes": 1816103586,

                    "clientCountryName": "T1",

                    "requests": 132423,

                    "threats": 0

                  },

                  ...

                ]

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/nested-structures/#page","headline":"Nested Structures · Cloudflare Analytics docs","description":"Query arrays and maps in GraphQL Analytics API.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/nested-structures/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/features/","name":"Features"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/features/nested-structures/","name":"Nested Structures"}}]}
```
