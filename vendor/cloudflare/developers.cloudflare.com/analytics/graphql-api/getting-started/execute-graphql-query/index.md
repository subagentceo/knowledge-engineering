---
title: Execute a GraphQL query with curl
description: Learn about execute a graphql query with curl in Cloudflare analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Execute a GraphQL query with curl

Using a plain curl to send a query provides the ability to slice-n-dice with the results and apply post-processing if needed. For example, converting results received from GraphQL API into a CSV format.

For more functionality, like auto-completion, schema exploring, etc., you can look at GraphQL [clients](https://developers.cloudflare.com/analytics/graphql-api/getting-started/compose-graphql-query/).

GraphQL API expects JSON with two essentials fields: "query" and "variables".

A query should be stripped from newline symbols and sent as a single-line string when the variables is an object full of values for all placeholders used in the query:

A payload structure for GraphQL API

```

{

  "query": "{viewer { ... }}",

  "variables": {}

}


```

It is still possible to use a human-friendly query though. In the example below you can see how `echo` piped together with `tr` to provide a proper payload with`curl`:

Example bash script that uses curl to query Analytics API

```

echo '{ "query":

  "{

    viewer {

      zones(filter: { zoneTag: $zoneTag }) {

        firewallEventsAdaptive(

          filter: $filter

          limit: 10

          orderBy: [datetime_DESC]

        ) {

          action

          clientAsn

          clientCountryName

          clientIP

          clientRequestPath

          clientRequestQuery

          datetime

          source

          userAgent

        }

      }

    }

  }",

  "variables": {

    "zoneTag": "<zone-tag>",

    "filter": {

      "datetime_geq": "2022-07-24T11:00:00Z",

      "datetime_leq": "2022-07-24T12:00:00Z"

    }

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data @-


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/#page","headline":"Execute a GraphQL query with curl · Cloudflare Analytics docs","description":"Learn about execute a graphql query with curl in Cloudflare analytics.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/getting-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/getting-started/execute-graphql-query/","name":"Execute a GraphQL query with curl"}}]}
```
