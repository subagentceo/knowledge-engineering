---
title: Settings node
description: Query dataset-specific limits via the Settings node.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Settings node

Cloudflare GraphQL API exposes more than 70 datasets to its customers. These datasets represent different Cloudflare products with very different data shapes; thus, each has its configuration of [limits](https://developers.cloudflare.com/analytics/graphql-api/limits/).

Although we allow access to ALL plans for the essential datasets (like`httpRequestsAdaptiveGroups`, `firewallEventsAdaptive`, etc), users on larger plans benefit from an extended set of datasets and wider query limits.

In addition to [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/), users can use the Settings node that is available for both zones and accounts scopes.

## Format

`Settings` node has all datasets from `zones` and `accounts` as fields.

Using a settings node on accounts nodes

```

{

  viewer {

    accounts(filter: { accountTag : $accountTag }) {

      settings {

        # any dataset(s) from accounts

      }

    }

    zones(filter: { zoneTag : $zoneTag }) {

      settings {

        # any dataset(s) from zones

      }

    }

  }

}


```

Every subnode of `settings` node could consist of these fields:

* `enabled` \- shows whether the node is available for a requester or not;
* `availableFields` \- shows the list of fields available for a requester. If it is a nested field, the path will be returned, like `sum_requests`;
* `maxPageSize` \- retrieves the maximum number of records that can be returned
* `maxNumberOfFields` \- answers on how many fields could be used in a single query for that node;
* `notOlderThan` \- returns a number of seconds on how far back in time a query can read;
* `maxDuration` \- shows how wide the requested time range could be.

## A sample query

Get boundaries of firewallEventsAdaptive node

```

query SampleQuery($zoneTag: string) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      settings {

        firewallEventsAdaptive {

          enabled

          maxDuration

          maxNumberOfFields

          maxPageSize

          notOlderThan

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAygQwLYAcA2YCK5oAoAkAXgPYB2YAKggOYBcMAzgC4QCWp1AlDAN4BQMGADdWYAO6ReAwTBLkGuAGas0TSPR6yylGvSLaq1GAF9u-GTIZgmTdtQZSLF5RHEI0aAKJCwpJgwBBABMEFFsfRycLXwQAIwwg6SjBJAQADwAREAgEWzIk5NS0gDkQJFjIAHlFADFRNCCGAqiigAUaMDhWQjBmp1JiJkqGyAoACwRSPsFjPtmLeZM+YyA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAXyA)

firewallEventsAdaptive limits for a given user

```

{

  "data": {

    "viewer": {

      "zones": [

        {

          "settings": {

            "firewallEventsAdaptive": {

              "enabled": true,

              "maxDuration": 259200,

              "maxNumberOfFields": 30,

              "maxPageSize": 10000,

              "notOlderThan": 2678400

            }

          }

        }

      ]

    }

  },

  "errors": null

}


```

To get more details on how to execute queries, please refer to our how to get started [guides](https://developers.cloudflare.com/analytics/graphql-api/getting-started/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/#page","headline":"Settings node · Cloudflare Analytics docs","description":"Query dataset-specific limits via the Settings node.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/features/","name":"Features"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/features/discovery/","name":"Discovery"}},{"@type":"ListItem","position":6,"item":{"@id":"/analytics/graphql-api/features/discovery/settings/","name":"Settings node"}}]}
```
